'use client'

import { useEffect, useState } from "react";
import TicketCard from "@/components/shared/TicketCard";
import { getTicketById } from "@/lib/actions/ticket.action";
import { notFound } from "next/navigation";
import Loader from "@/app/loading";

const TicketDetails = ({ params: { id } }: { params: { id: string }}) => {
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      setLoading(true);
      try {
        const ticketData = await getTicketById(id);
        if (!ticketData) {
          notFound();
        } else {
          setTicket(ticketData);
        }
      } catch (error) {
        console.error("Failed to fetch ticket:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  if (loading) {
    return <Loader/>
  }

  if (!ticket) {
    return notFound();
  }

  const mappedTicketData = {
    imageUrl: ticket.imageUrl,
    eventTitle: ticket.eventTitle,
    memberName: ticket.memberName,
    date: ticket.date,
    time: ticket.time,
    admit: ticket.admit,
    venue: ticket.venue,
    bookingId: ticket.bookingId,
  };

  return (
    <div className="container mx-auto py-12">
      <TicketCard ticketData={mappedTicketData} loading={loading} />
    </div>
  );
}

export default TicketDetails;
