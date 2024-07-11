'use client'

import Loader from "@/app/loading";
import TicketCard from "@/components/shared/TicketCard";
import { useState, useEffect } from "react";

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

const CreateTicket = () => {
  const [ticketData, setTicketData] = useState<TicketData | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchTicketData = async () => {
      setLoading(true); // Set loading to true when starting fetch
      try {
        const response = await fetch('/api/ticket/createTicket', {
          method: 'POST',
        });

        if (response.ok) {
          const data = await response.json();
          setTicketData(data.ticketData);
        } else {
          console.error('Failed to fetch ticket data');
        }
      } catch (error) {
        console.error('An error occurred while fetching ticket data', error);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchTicketData();
  }, []);

  return (
    <div>
      {ticketData ? <TicketCard ticketData={ticketData} loading={false} /> : <Loader />}
    </div>
  );
};

export default CreateTicket;
