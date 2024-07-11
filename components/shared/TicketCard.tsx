'use client'

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";
import Loader from '@/app/loading';

interface TicketCardProps {
  ticketData: {
    imageUrl: string;
    eventTitle: string;
    memberName: string;
    date: string;
    time: string;
    admit: string;
    venue: string;
    bookingId: string;
  };
  loading: boolean;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticketData, loading }) => {
  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className="shadow-md rounded-xl mb-24 mt-16 max-w-md mx-auto"
      style={{
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Card className="flex flex-col p-4 bg-gradient-to-br from-primary-500 to-acent-500 text-white">
        <CardHeader className="flex flex-row justify-center items-center gap-8">
          <div className="w-36 h-36 flex-shrink-0">
            <img
              src={ticketData.imageUrl}
              alt="Event Image"
              className="w-full h-full object-cover rounded-2xl"
              loading="eager"
            />
          </div>
          <div className="flex-grow">
            <CardTitle>
              <h1 className="text-2xl font-semibold">{ticketData.eventTitle}</h1>
            </CardTitle>
            <CardDescription className="mt-4 text-white">
              <h2>Member Name:</h2>
              <h2 className="text-lg font-medium">{ticketData.memberName}</h2>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-8 mt-4 mb-4">
          <div>
            <p className="font-bold">Date:</p>
            <p>{ticketData.date}</p>
          </div>
          <div>
            <p className="font-bold">Time:</p>
            <p>{ticketData.time}</p>
          </div>
          <div>
            <p className="font-bold">Admit:</p>
            <p>{ticketData.admit}</p>
          </div>
          <div>
            <p className="font-bold">Venue:</p>
            <p>{ticketData.venue}</p>
          </div>
        </CardContent>
        <Separator className="border border-white mt-2 mb-2" />
        <CardFooter className="flex flex-col items-center gap-4 mt-8 mb-4">
          <div className="w-32 h-32">
            <img src="/assets/images/qrcode.png" alt="QR Code" className="w-full h-full object-cover" />
          </div>
          <p className="text-center mt-4">{ticketData.bookingId}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TicketCard;
