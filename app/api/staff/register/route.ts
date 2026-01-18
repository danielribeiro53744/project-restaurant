import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';
import { Department } from '@/lib/generated/prisma/wasm';

export async function POST(request: Request) {
  try {
    const { password, ...staffData } = await request.json();
    
    // Check if staff already exists
    if(staffData.id !== undefined) {
      const existingStaff = await prisma.staff.findUnique({
        where: { id: staffData.id },
      });
    
      if (existingStaff) {
        return NextResponse.json(
          { error: 'Staff with this email already exists' },
          { status: 400 }
        );
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new staff
    const newStaff = await prisma.staff.create({
      data: {
        name: staffData.name!,
        email: staffData.email!,
        // password: staffData.password,
        password: hashedPassword,
        // teste: hashedPassword,
        phone: staffData.phone,
        position: staffData.position!,
        experience: staffData.experience!,
        department: (staffData.department as Department),
        salary: staffData.salary,
        hireDate: staffData.hireDate,
        status: staffData.status,
        bio: staffData.bio,
        image: staffData.image ,
        schedule: staffData.schedule,
        performance: staffData.performance,
        specialties: staffData.specialties ,
        certifications: staffData.certifications,
        awards: staffData.awards,
        notes: staffData.notes
        
      },
    });

    // Return staff data without password
    const { name: _, ...staffWithoutPassword } = newStaff;
    return NextResponse.json(staffWithoutPassword, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}