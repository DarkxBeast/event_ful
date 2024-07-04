import { getOrdersByUser } from '@/lib/actions/order.actions';
import { CreateTicketParams } from '@/types';
import Ticket from '../database/models/ticket.model';
import { connectToDatabase } from '../database';
import { handleError } from '../utils';


export const createTicket = async (ticket: CreateTicketParams) => {
    try{
        await connectToDatabase();

        const newTicket = await Ticket.create({
            ...ticket,
            event: ticket.eventId,
            buyer: ticket.buyerId,
            razorpayId: ticket.razorpayId,
        })

        return JSON.parse(JSON.stringify(newTicket));

    } catch (error) {
        handleError(error);
    }
}
