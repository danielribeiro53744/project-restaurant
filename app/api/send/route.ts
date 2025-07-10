export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import  prisma  from '../../../lib/db';
import bcrypt from 'bcryptjs';


export async function GET(request: Request) {
  try {
    // Verify database connection first
    await prisma.$connect()
   
    // Check if user already exists
    const existingUser = await prisma.staff.create({ data: {
    //   id: '1',
      name: 'Marco Rossi',
      email: 'marco@bellavista.com',
      phone: '(555) 123-4567',
      position: 'Executive Chef',
      department: 'Kitchen',
      salary: 75000,
      hireDate: '2020-01-15',
      status: 'active',
      schedule: {
        monday: { start: '10:00', end: '22:00' },
        tuesday: { start: '10:00', end: '22:00' },
        wednesday: { start: '10:00', end: '22:00' },
        thursday: { start: '10:00', end: '22:00' },
        friday: { start: '10:00', end: '23:00' },
        saturday: { start: '10:00', end: '23:00' },
        sunday: { off: true, start: '', end: '' }
      },
      performance: { rating: 4.9, reviews: 24, lastReview: '2024-01-15' },
      certifications: 'ServSafe Manager,Culinary Arts Degree',
      notes: 'Excellent leadership skills and culinary expertise.'
    }});

    

    return NextResponse.json(
      { user: existingUser, message: 'User created successfully' },
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