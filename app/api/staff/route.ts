export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import  prisma  from '../../../lib/db';


export async function GET(request: Request) {
  try {
    // Verify database connection first
    await prisma.$connect()

    // Find user
    const staff = await prisma.staff.findMany();

    if (!staff) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { staff: staff },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get staff members error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(
  request: Request,
) {
  try {
    // Verify database connection first
    await prisma.$connect()

    const { staffMember } = await request.json();
    
    // Validation
    
   

    const staff = await prisma.staff.create({ data: 
        {
          id: staffMember.id || 'oooo',
          name: staffMember.name,
          email: staffMember.email || 'marco@bellavista.com',
          phone: staffMember.phone || "988998",
          position: staffMember.position,
          experience: staffMember.experience,
          department: staffMember.department,
          salary: staffMember.salary,
          hireDate: staffMember.hireDate,
          status: staffMember.staff,
          bio: staffMember.bio,
          schedule: staffMember.schedule,
          performance: staffMember.performance,
          specialties: staffMember.specialties,
          certifications: staffMember.certifications,
          awards: staffMember.awards,
          notes: staffMember.notes
    }});

    

    return NextResponse.json(
      { staff: staff, message: 'Staff member created successfully' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Staff member creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * @swagger
 * tags:
 *   - name: Staff
 *     description: Endpoints for managing all staff members
 *
 * /api/staff:
 *   get:
 *     tags:
 *       - Staff
 *     summary: Get all staff members
 *     description: Retrieve a list of all staff members in the database.
 *     responses:
 *       200:
 *         description: A list of staff members
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 staff:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/StaffMember'
 *       401:
 *         description: No staff members found or invalid credentials
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     tags:
 *       - Staff
 *     summary: Create a new staff member
 *     description: Add a new staff member to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               staffMember:
 *                 $ref: '#/components/schemas/StaffMember'
 *     responses:
 *       201:
 *         description: Staff member created successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     StaffMember:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         position:
 *           type: string
 *         experience:
 *           type: string
 *         department:
 *           type: string
 *         salary:
 *           type: number
 *         hireDate:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *         bio:
 *           type: string
 *         schedule:
 *           type: string
 *         performance:
 *           type: string
 *         specialties:
 *           type: array
 *           items:
 *             type: string
 *         certifications:
 *           type: array
 *           items:
 *             type: string
 *         awards:
 *           type: array
 *           items:
 *             type: string
 *         notes:
 *           type: string
 */
