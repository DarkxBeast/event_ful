
import TicketCard from "@/components/shared/TicketCard";
import { getOrdersByTicket} from "@/lib/actions/order.actions";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs/server";


const TicketPage = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  
  const orders = await getOrdersByTicket({ userId })

  return (
    <div>
        <TicketCard
          imageUrl={orders?.data[0]?.event?.imageUrl || ''}
          eventTitle={orders?.data[0]?.event?.title || ''}
          memberName={orders?.data[1]?.buyer?.firstName || ''}
          date={orders?.data[0]?.event?.startDateTime.split('T')[0] || ''}
          time={orders?.data[0]?.event?.startDateTime.split('T')[1].substring(0, 5).replace(':', ':') || ''}
          admit="01 only" // Assuming this is fixed or calculated
          venue={orders?.data[0]?.event?.location || ''}
          bookingId={orders?.data[0]?.razorpayId || ''}
        />
    </div>
  );
}

export default TicketPage;
