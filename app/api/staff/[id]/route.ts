export const dynamic = 'force-dynamic';

import prisma from '@/lib/db';
import { NextResponse } from 'next/server';


export async function GET(
  request: Request,
  { params }: { params: { staffMemberId: string } }
) {
  try {
    // Verify database connection first
    await prisma.$connect()

    const id = params.staffMemberId;

    // Find staff Member
    const result = await prisma.staff.findUnique({
      where: { id: parseInt(id) }
    });

    if (!result) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { staffMember: result },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get costumer error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { staffMemberId: string } }
) {
  try {
   // Verify database connection first
    await prisma.$connect()

    const id = params.staffMemberId;

     const { staffMember } = await request.json();

    // Find staff member
    const result = await prisma.staff.findUnique({
      where: { id: parseInt(id) }
    });

    if (!result) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    
    const changedStaff = await prisma.staff.update({
      where: {
          id: parseInt(id)
      },
      data: {
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
    }
    });

    return NextResponse.json(
      { staffMember: changedStaff, message: 'Staff Member updated successfully' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Staff Member update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { staffMemberId: string } }
) {
  try {
    // Verify database connection first
    await prisma.$connect()

    const id = params.staffMemberId;

    // Find Staff Member
    const result = await prisma.staff.delete({
      where: { id: parseInt(id) }
    });

    if (!result) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { staffMember: result },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete staff member error:', error);
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
 *     description: Endpoints for managing staff members
 *
 * /api/staff/{staffMemberId}:
 *   get:
 *     tags:
 *       - Staff
 *     summary: Get a staff member by ID
 *     description: Retrieve detailed information for a single staff member using their unique ID.
 *     parameters:
 *       - in: path
 *         name: staffMemberId
 *         required: true
 *         description: The unique ID of the staff member.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Staff member retrieved successfully.
 *       401:
 *         description: Staff member not found or invalid ID.
 *       500:
 *         description: Internal server error.
 *
 *   put:
 *     tags:
 *       - Staff
 *     summary: Update a staff member
 *     description: Update the details of an existing staff member by ID.
 *     parameters:
 *       - in: path
 *         name: staffMemberId
 *         required: true
 *         description: The ID of the staff member to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               staffMember:
 *                 type: object
 *                 required:
 *                   - name
 *                   - position
 *                   - department
 *                   - salary
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   position:
 *                     type: string
 *                   experience:
 *                     type: string
 *                   department:
 *                     type: string
 *                   salary:
 *                     type: number
 *                   hireDate:
 *                     type: string
 *                     format: date
 *                   status:
 *                     type: string
 *                   bio:
 *                     type: string
 *                   schedule:
 *                     type: string
 *                   performance:
 *                     type: string
 *                   specialties:
 *                     type: array
 *                     items:
 *                       type: string
 *                   certifications:
 *                     type: array
 *                     items:
 *                       type: string
 *                   awards:
 *                     type: array
 *                     items:
 *                       type: string
 *                   notes:
 *                     type: string
 *     responses:
 *       201:
 *         description: Staff member updated successfully.
 *       401:
 *         description: Staff member not found or invalid ID.
 *       500:
 *         description: Internal server error.
 *
 *   delete:
 *     tags:
 *       - Staff
 *     summary: Delete a staff member
 *     description: Remove a staff member from the system by their ID.
 *     parameters:
 *       - in: path
 *         name: staffMemberId
 *         required: true
 *         description: The unique ID of the staff member.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Staff member deleted successfully.
 *       500:
 *         description: Internal server error.
 */
