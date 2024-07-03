import { model } from 'mongoose';
import { usePathname } from 'next/navigation';
"use server";

import { CreateOrderParams, GetOrdersByEventParams, GetOrdersByTicketParams, GetOrdersByUserParams } from "@/types";
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import Event from '../database/models/event.model';
import User from '../database/models/user.model';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { ObjectId } from 'mongodb';
import Order from "../database/models/order.model";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

// Function to create a Razorpay order
export async function createRazorpayOrder(amount: number) {
  const options = {
    amount,
    currency: 'INR',
    receipt: 'order_rcptid_11',
    payment_capture: 1,
  };

  try {
    const order = await razorpay.orders.create(options);
    return { order, error: null };
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return { order: null, error: 'Failed to create Razorpay order' };
  }
}

// Function to verify a Razorpay payment
export async function verifyRazorpayPayment(
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string
) {
  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    return { success: true, message: null };
  } else {
    return { success: false, message: 'Invalid signature' };
  }
}

// Function to create an order in the database
export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase();
    
    const newOrder = await Order.create({
      ...order,

      event: order.eventId,
      buyer: order.buyerId,
      razorpayId: order.razorpayId,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
};

// GET ORDERS BY EVENT
export async function getOrdersByEvent({ searchString, eventId }: GetOrdersByEventParams) {
  try {
    await connectToDatabase();

    if (!eventId) throw new Error('Event ID is required');
    const eventObjectId = new ObjectId(eventId);

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'buyer',
          foreignField: '_id',
          as: 'buyer',
        },
      },
      {
        $unwind: '$buyer',
      },
      {
        $lookup: {
          from: 'events',
          localField: 'event',
          foreignField: '_id',
          as: 'event',
        },
      },
      {
        $unwind: '$event',
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          eventTitle: '$event.title',
          eventId: '$event._id',
          buyer: {
            $concat: ['$buyer.firstName', ' ', '$buyer.lastName'],
          },
        },
      },
      {
        $match: {
          $and: [{ eventId: eventObjectId }, { buyer: { $regex: RegExp(searchString, 'i') } }],
        },
      },
    ]);

    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    handleError(error);
  }
}

// GET ORDERS BY USER
export async function getOrdersByUser({ userId, limit = 3, page }: GetOrdersByUserParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = { buyer: userId };

    const orders = await Order.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: 'event',
        model: Event,
      })
      .populate({
        path:'buyer',
        model:User,
        select:'_id firstName lastName'
      })

    const ordersCount = await Order.countDocuments(conditions);

    return { data: JSON.parse(JSON.stringify(orders)), totalPages: Math.ceil(ordersCount / limit) };
  } catch (error) {
    handleError(error);
  }
}

// GET ORDERS BY TICKET
export async function getOrdersByTicket({ userId }: GetOrdersByTicketParams) {
  try {
    await connectToDatabase();

    const conditions = { buyer: userId };

    const orders = await Order.find(conditions)
      .sort({ createdAt: 'desc' })
      .populate({
        path: 'event',
        model: Event,
        populate: {
          path: 'organizer',
          model: User,
        },
      });

    return { data: JSON.parse(JSON.stringify(orders)) };
  } catch (error) {
    handleError(error);
  }
}