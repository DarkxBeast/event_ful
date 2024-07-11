import { getOrdersByTicket } from "@/lib/actions/order.actions";
import { createTicket } from "@/lib/actions/ticket.action";
import { sendTicketEmail } from "@/lib/sendTicketEmail";
import { formatDateTime, handleError } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { sessionClaims } = await auth();
    const userId = sessionClaims?.userId as string;

    const orders = await getOrdersByTicket({ userId });

    if (orders && orders.data && orders.data.length > 0) {
      const data = {
        imageUrl: orders.data[0].event.imageUrl || '',
        eventTitle: orders.data[0].event.title || '',
        memberName: `${orders.data[0].buyer.firstName} ${orders.data[0].buyer.lastName}` || '',
        date: formatDateTime(orders.data[0].event.startDateTime).dateOnly || '',
        time: formatDateTime(orders.data[0].event.startDateTime).timeOnly || '',
        admit: '01 only', // Assuming this is fixed or calculated
        venue: orders.data[0].event.location || '',
        bookingId: orders.data[0].razorpayId || '',
        eventId: orders.data[0].event._id,
        userId: userId,
      };

      const ticket = await createTicket(data);

      if (ticket) {
        const emailResponse = await sendTicketEmail(data);
        if (emailResponse.success) {
          console.log('Email sent successfully');
        } else {
          console.error('Error sending email:', emailResponse.message);
        }

        return NextResponse.json({ ticketData: data }, { status: 200 });
      } else {
        return NextResponse.json({ error: 'Failed to create Razorpay order' }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: 'No orders found or order data is undefined' }, { status: 500 });
    }
  } catch (error) {
    handleError(error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
};
