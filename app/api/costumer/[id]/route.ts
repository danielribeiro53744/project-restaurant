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
    const costumer = await prisma.customer.findUnique({
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

    // Find customer
    const costumer = await prisma.customer.findUnique({
      where: { id }
    });

    if (!costumer) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    
    const changedCostumer = await prisma.customer.update({
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
    const costumer = await prisma.customer.delete({
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
 *   - name: Customer
 *     description: Operations for individual customers
 *
 * /api/costumer/{costumerId}:
 *   get:
 *     summary: Get a customer by ID
 *     tags: [Customer]
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
 *               $ref: '#/components/schemas/Customer'
 *       401:
 *         description: Customer not found or invalid credentials
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     summary: Update a customer by ID
 *     tags: [Customer]
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
 *         description: Customer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       401:
 *         description: Invalid customer ID
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a customer by ID
 *     tags: [Customer]
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
 *     Customer:
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

