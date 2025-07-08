import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../lib/generated/prisma';

const prisma = new PrismaClient()
export async function GET(request: Request) {
  try {
    // const { searchParams } = new URL(request.url);
    
    // // Handle different query parameters
    // const id = searchParams.get('id');
    // const category = searchParams.get('category');
    // const gender = searchParams.get('gender');
    // const featured = searchParams.get('featured');
    // const newArrivals = searchParams.get('newArrivals');
    // const bestSellers = searchParams.get('bestSellers');
    // const search = searchParams.get('search');

    // if (id) {
    //   const product = await ProductRepository.getProductById(id);
      
    //   if (!product) {
    //     return NextResponse.json(
    //       { error: 'Product not found' },
    //       { status: 404 }
    //     );
    //   }
      
    //   return NextResponse.json(product);
    // }

    // const products = await ProductRepository.getProducts({
    //   category: category || undefined,
    //   gender: gender || undefined,
    //   featured: featured === 'true',
    //   newArrivals: newArrivals === 'true',
    //   bestSellers: bestSellers === 'true',
    //   search: search || undefined
    // });
    const results = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      
    },
  })

  // const allUsers = await prisma.user.findMany({
  //   include: {
  //     // posts: true,
  //     // profile: true,
  //   },
  // })
    console.log(results);
    return NextResponse.json(results);
    
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
