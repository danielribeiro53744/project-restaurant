export const dynamic = 'force-dynamic';

import prisma from '@/lib/db';
import { NextResponse } from 'next/server';


export async function GET(
  request: Request,
  { params }: { params: { costumerId: number } }
) {
  try {
    // Verify database connection first
    await prisma.$connect()

    const id = params.costumerId;

    // Find user
    const costumer = await prisma.costumer.findUnique({
      where: { id }
    });

    if (!costumer) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { costumer: costumer },
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
  { params }: { params: { costumerId: number } }
) {
  try {
   // Verify database connection first
    await prisma.$connect()

    const id = params.costumerId;

    // Find costumer
    const costumer = await prisma.costumer.findUnique({
      where: { id }
    });

    if (!costumer) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    
    const changedCostumer = await prisma.costumer.update({
      where: {
          id
      },
      data: {
          email: 'marco@bellavista.com',
          password: 'teste123',
          firstName: 'marco',
          lastName: 'bellaVista',
          username: 'teste',
          avatar: '',
          role:'admin'
      }
    });

    return NextResponse.json(
      { costumer: changedCostumer, message: 'Costumer updated successfully' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Costumer update error:', error);
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
  { params }: { params: { costumerId: number } }
) {
  try {
    // Verify database connection first
    await prisma.$connect()

    const id = params.costumerId;

    // Find user
    const costumer = await prisma.costumer.delete({
      where: { id }
    });

    if (!costumer) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { costumer: costumer },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete costumer error:', error);
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
 *   - name: Costumer
 *     description: Operations for individual costumers
 *
 * /api/costumer/{costumerId}:
 *   get:
 *     summary: Get a costumer by ID
 *     tags: [Costumer]
 *     parameters:
 *       - name: costumerId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Costumer found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Costumer'
 *       401:
 *         description: Costumer not found or invalid credentials
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     summary: Update a costumer by ID
 *     tags: [Costumer]
 *     parameters:
 *       - name: costumerId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CostumerInput'
 *     responses:
 *       201:
 *         description: Costumer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Costumer'
 *       401:
 *         description: Invalid costumer ID
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a costumer by ID
 *     tags: [Costumer]
 *     parameters:
 *       - name: costumerId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Costumer deleted successfully
 *       401:
 *         description: Costumer not found or invalid ID
 *       500:
 *         description: Internal server error
 *
 * components:
 *   schemas:
 *     Costumer:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         username:
 *           type: string
 *         avatar:
 *           type: string
 *         role:
 *           type: string
 *     CostumerInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: user@example.com
 *         password:
 *           type: string
 *           example: securepassword123
 *         firstName:
 *           type: string
 *           example: John
 *         lastName:
 *           type: string
 *           example: Doe
 *         username:
 *           type: string
 *           example: johndoe
 *         avatar:
 *           type: string
 *           example: https://example.com/avatar.png
 *         role:
 *           type: string
 *           example: user
 */

