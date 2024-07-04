import { Document, Schema, model, models } from "mongoose";

export interface ITicket extends Document {
    createdAt: Date;
    razorpayId: string;
    event: {
        _id: string;
        title: string;
        imageUrl: string;
        location: string;
        startDateTime: Date;
    };
    buyer: {
        _id: string;
        firstName: string;
        lastName: string;
    };
}

export type ITicketItem = {
    _id: string;
    eventId: string;
    eventTitle: string;
    buyer: string;
};

const TicketSchema = new Schema({
    razorpayId: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

TicketSchema.index({ razorpayId: 1 })

const Ticket = models.Ticket || model<ITicket>('Ticket', TicketSchema);

export default Ticket;
