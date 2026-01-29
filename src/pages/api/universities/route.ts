import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const items = await prisma.university.findMany();

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error('GET /api/universities error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

//TODO: add POST to add new university as an admin
// export async function POST(request: Request) {
//   try {
//     const { name } = await request.json();

//     if (!name) {
//       return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
//     }

//     await prisma.university.create({ data: { name } });

//     return NextResponse.json({ message: 'University added successfully' }, { status: 200 });
//   } catch (error) {
//     console.error('POST /api/universities error:', error);
//     return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
//   }
// }
