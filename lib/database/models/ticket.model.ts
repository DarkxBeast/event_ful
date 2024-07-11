import { Schema, Document, model, models } from 'mongoose';

export interface ITicket extends Document {
  _id: string;
  imageUrl: string;
  eventTitle: string;
  memberName: string;
  date: string;
  time: string;
  admit: string;
  venue: string;
  bookingId: string;
  eventId: { _id: string, title: string }
  userId: { _id: string, firstName: string, lastName: string }
}

const TicketSchema: Schema = new Schema({
  imageUrl: { type: String, required: true },
  eventTitle: { type: String, required: true },
  memberName: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  admit: { type: String, required: true },
  venue: { type: String, required: true },
  bookingId: { type: String, required: true, unique: true },
  eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
}, {
  timestamps: true,
});

TicketSchema.index({ bookingId: 1 });

const Ticket = models.Ticket || model<ITicket>('Ticket', TicketSchema);

export default Ticket;
