import TicketEmail from '@/app/(root)/emails/ticket/page';
import { getOrdersByTicket } from '@/lib/actions/order.actions';
import User from '@/lib/database/models/user.model';
import { resend } from '@/lib/resend';
import { formatDateTime } from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

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

      const emailHtml = TicketEmail({ params: data });
      const user = await User.findById(userId);

      if (!user) {
        throw new Error('User not found');
      }

      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: user.email,
        subject: `Your Ticket for ${data.eventTitle}`,
        react: emailHtml,
      });

      return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'No orders found or order data is undefined' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
};
