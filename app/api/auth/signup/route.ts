export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import  prisma  from '../../../../lib/db';
import bcrypt from 'bcryptjs';


export async function POST(request: Request) {
  try {
    // Verify database connection first
    await prisma.$connect()
    const { email, password, name } = await request.json();

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }
    // Check if user already exists
    const existingUser = await prisma.costumer.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.costumer.create({
        data: {
            firstName: name,
            email,
            password: hashedPassword,
            avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=f59e0b&color=fff`,
            role: 'customer'
        }
    });

    return NextResponse.json(
      { user: newUser, message: 'User created successfully' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}