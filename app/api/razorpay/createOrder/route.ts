import { createRazorpayOrder } from '@/lib/actions/order.actions';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json(); // Read amount from request body
    const { order, error } = await createRazorpayOrder(amount);

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ error: 'Failed to create Razorpay order' }, { status: 500 });
  }
}
