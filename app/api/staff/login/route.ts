import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { id,email, password } = await request.json();
    
    const staff = await prisma.staff.findUnique({ where: { id } });
    if (!staff) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, staff.name);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      { id: staff.id, email: staff.email, role: staff.department },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    // Return staff data without password and with token
    const { name: _, ...staffWithoutPassword } = staff;
    return NextResponse.json({
      staff: staffWithoutPassword,
      token,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}