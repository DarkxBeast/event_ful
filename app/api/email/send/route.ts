import TicketEmail from '@/app/(root)/emails/ticket/page';
import { Resend } from 'resend';
import User from '@/lib/database/models/user.model';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTicketEmail = async (ticketData: any) => {
  try {
    const emailHtml = TicketEmail(ticketData);
    const user = await User.findById(ticketData.userId);

    if (!user) {
      throw new Error('User not found');
    }

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: user.email,
      subject: `Your Ticket for ${ticketData.eventTitle}`,
      react: emailHtml,
    });

    return { success: true, message: 'Email sent successfully' };
    
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Error sending email' };
  }
};
