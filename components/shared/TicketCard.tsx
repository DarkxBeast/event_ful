'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";

interface TicketCardProps {
  imageUrl: string;
  eventTitle: string;
  memberName: string;
  date: string;
  time: string;
  admit: string;
  venue: string;
  bookingId: string;
}

const TicketCard: React.FC<TicketCardProps> = ({
  imageUrl,
  eventTitle,
  memberName,
  date,
  time,
  admit,
  venue,
  bookingId,
}) => {
  return (
    <div
      className="shadow-md rounded-xl mb-24 mt-16 max-w-md mx-auto"
      style={{
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Card className="flex flex-col p-4 bg-gradient-to-br from-primary-500 to-acent-500 text-white">
        <CardHeader className="flex flex-row justify-center items-center gap-12">
          <div className="w-36 h-36 flex-shrink-0">
            <img
              src={imageUrl}
              alt="Event Image"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="flex-grow">
            <CardTitle>
              <h1 className="text-lg h2-bold">{eventTitle}</h1>
            </CardTitle>
            <CardDescription className="mt-4 text-white">
              <h2>Member Name:</h2>
              <h2 className="text-lg font-bold">{memberName}</h2>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-8 mt-4">
          <div>
            <p className="font-bold">Date:</p>
            <p>{date}</p>
          </div>
          <div>
            <p className="font-bold">Time:</p>
            <p>{time}</p>
          </div>
          <div>
            <p className="font-bold">Admit:</p>
            <p>{admit}</p>
          </div>
          <div>
            <p className="font-bold">Venue:</p>
            <p>{venue}</p>
          </div>
        </CardContent>
        <Separator className="border border-white mt-2 mb-2" />
        <CardFooter className="flex flex-col items-center gap-4 mt-6">
          <div className="w-32 h-32">
            <img src="/assets/images/qrcode.png" alt="QR Code" className="w-full h-full object-cover" />
          </div>
          <p className="text-center">BOOKING ID - {bookingId}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TicketCard;
