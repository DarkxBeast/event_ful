// lib/database/models/ticket.js
import { Document, Schema, model, models } from "mongoose";

const TicketSchema = new Schema({
    ticketNumber: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    eventId: { type: String, required: true },
    paymentId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Ticket = models.Ticket || model('Ticket', TicketSchema);

export default Ticket;
