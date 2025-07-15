export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import  prisma  from '../../../lib/db';


export async function GET(request: Request) {
  try {
    // Verify database connection first
    await prisma.$connect()

    // Find user
    const costumers = await prisma.costumer.findMany();

    if (!costumers) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { costumers: costumers },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get costumers error:', error);
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

    const { email, password, firstName, lastName, username, avatar, role } = await request.json();
    
    // Validate 
    if (!email || !password ) {
      return NextResponse.json(
        { error: 'Email or password are required' },
        { status: 400 }
      );
    }
   

    const costumer = await prisma.costumer.create({ data: 
        {
      email: email || 'marco@bellavista.com',
      password: password || 'teste123',
      firstName: firstName || 'marco',
      lastName: lastName || 'bellaVista',
      username: username || 'teste',
      avatar: avatar || '',
      role: role || 'admin'
    }});

    

    return NextResponse.json(
      { costumer: costumer, message: 'User created successfully' },
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

/**
 * @swagger
 * tags:
 *   - name: Costumer
 *     description: Endpoints for managing customers
 *
 * /api/costumer:
 *   get:
 *     tags:
 *       - Costumer
 *     summary: Get all customers
 *     description: Retrieve a list of all registered customers.
 *     responses:
 *       200:
 *         description: A list of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 costumers:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Costumer'
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     tags:
 *       - Costumer
 *     summary: Register a new customer
 *     description: Creates a new customer account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CostumerInput'
 *     responses:
 *       201:
 *         description: Customer created successfully
 *       400:
 *         description: Email or password missing
 *       500:
 *         description: Internal server error
 *
 * components:
 *   schemas:
 *     Costumer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
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
 *
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
 *           example: password123
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
 *           example: user
 */
