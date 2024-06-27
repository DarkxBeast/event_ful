import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

export async function POST(req: NextRequest) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

  // Verify the payment signature
  const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    // Payment is verified
    return NextResponse.json({ success: true }, { status: 200 });

  } else {
    // Payment verification failed
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export const runtime = {
  runtime: 'nodejs',
};
