'use server'

import { GetTicketByUserAndEventParams } from "@/types";
import { connectToDatabase } from "../database";
import Event from "../database/models/event.model";
import Ticket, { ITicket } from "../database/models/ticket.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";
import { ObjectId } from "mongodb";

interface TicketData {
  imageUrl: string;
  eventTitle: string;
  memberName: string;
  date: string;
  time: string;
  admit: string;
  venue: string;
  bookingId: string;
  eventId: string;
  userId: string;
}


export const createTicket = async (ticketData: TicketData) => {
  try {
    await connectToDatabase();

    const ticket = new Ticket(ticketData);
    await ticket.save();
    return ticket;
  } catch (error) {
    handleError(error);
  }
};

export async function getTicketById(ticketId: string) {
  try {
    await connectToDatabase();

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) throw new Error('Ticket not found');

    return JSON.parse(JSON.stringify(ticket));
  } catch (error) {
    handleError(error);
  }
}

export async function getTicketIdByUserAndEvent({ userId, eventId }: GetTicketByUserAndEventParams): Promise<string | null> {
  try {
    await connectToDatabase();

    if (!ObjectId.isValid(userId)) {
      throw new Error('Invalid userId');
    }
    if (!ObjectId.isValid(eventId)) {
      throw new Error('Invalid eventId');
    }

    // Convert userId and eventId to ObjectId
    const userObjectId = new ObjectId(userId);
    const eventObjectId = new ObjectId(eventId);

    // Find the ticket
    const ticket: ITicket | null = await Ticket.findOne({ userId: userObjectId, eventId: eventObjectId })
      .populate({
        path: 'eventId',
        model: 'Event',
      })
      .populate({
        path: 'userId',
        model: 'User',
        select: '_id firstName lastName',
      });

    return ticket ? (ticket._id as string).toString() : null;
  } catch (error) {
    handleError(error);
    return null;
  }
}
