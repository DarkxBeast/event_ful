"use client";

import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { Button } from "../ui/button";
import { getTicketIdByUserAndEvent } from "@/lib/actions/ticket.action";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hasTicketLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({ event, hasOrderLink, hasTicketLink, hidePrice }: CardProps) => {
  const { user } = useUser();

  const userId = user?.publicMetadata.userId as string;

  const [ticketId, setTicketId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicketId = async () => {
      try {
        if (userId) {
          const fetchedTicketId = await getTicketIdByUserAndEvent({
            userId,
            eventId: event._id,
          });
          setTicketId(fetchedTicketId);
        }
      } catch (error) {
        console.error("Failed to fetch ticket ID:", error);
      }
    };

    if (hasTicketLink && userId) {
      fetchTicketId();
    }
  }, [userId, event._id, hasTicketLink]);

  const isEventCreator = userId === event.organizer._id;

  return (
    <div className="group relative flex h-5/6 w-auto max-w-[400px] flex-col overflow-visible rounded-xl bg-clip-border bg-white shadow-xl transition-all hover:scale-105 hover:shadow-stroke-500 md:min-h-[438px] border border-gray-200">
      {/* Event Image */}
      <div className="relative w-auto h-1/2 mx-4 -mt-6 overflow-hidden rounded-xl bg-clip-border text-white shadow-md shadow-gray-400">
        <Link href={`/events/${event._id}`}>
          <Image
            src={event.imageUrl}
            alt="image"
            width={400}
            height={200}
            loading="eager"
          />
        </Link>
      </div>

      {/* Event Creator Options */}
      {isEventCreator && !hidePrice && (
        <div className="absolute right-2  flex flex-col gap-4 rounded-xl mr-4 bg-white p-3 shadow-sm transition-all">
          <Link href={`/events/${event._id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>
          <DeleteConfirmation eventId={event._id} />
        </div>
      )}

      {/* Event Details */}
      <div className="flex flex-col gap-3 p-5 md:gap-4 relative min-h-[230px]">
        {/* Price and Category */}
        {!hidePrice && (
          <div className="inline-flex gap-4">
            <span className="flex p-semibold-16 w-md rounded-full bg-acent-500 text-white px-4 py-1 justify-between items-center">
              {event.isFree ? (
                "FREE"
              ) : (
                <>
                  <img
                    src={"/assets/icons/rupee-white.svg"}
                    alt="Rupee"
                    className="inline-flex h-4 w-4"
                  />
                  {event.price}
                </>
              )}
            </span>
            <span>
              <p className="p-semibold-18 w-max rounded-full bg-grey-500/10 px-4 py-1 text-grey-600 line-clamp-1">
                {event.category.name}
              </p>
            </span>
          </div>
        )}

        {/* Event Title */}
        <Link href={`/events/${event._id}`}>
          <p className="p-bold-24 md:p-bold-20 line-clamp-2 flex-1 text-primary font-bold text-2xl pl-2">
            {event.title}
          </p>
        </Link>

        {/* Event Date */}
        <p className="p-medium-16 p-medium-18 text--black-500">
          <span style={{ marginLeft: "12px" }}>Date:</span>
          <span style={{ marginLeft: "16px" }}>
            {formatDateTime(event.startDateTime).dateTime}
          </span>
        </p>

        {/* Event Venue */}
        <div
          className="p-medium-16 p-medium-18 text--black-500"
          style={{ display: "flex", alignItems: "flex-start" }}
        >
          <span style={{ marginRight: "4px" }}>Venue:</span>
          <span style={{ marginLeft: "12px" }}>{event.location}</span>
        </div>

        {/* Order Details Link */}
        {hasOrderLink && (
          <div className="absolute bottom-[-12px] right-4">
            <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
              <Button className="text-white rounded-full gap-2">
              <Image
                  src="/assets/icons/arrow.svg"
                  alt="arrow"
                  width={12}
                  height={12}/>
                  Order Details
              </Button>
            </Link>
          </div>
        )}

        {/* View Ticket Link */}
        {hasTicketLink && ticketId && (
          <div className="absolute bottom-[-8px] right-4 rounded-full bg-primary">
            <Link href={`/ticket/${ticketId}`} className="flex gap-2">
              <Button className="text-white rounded-full gap-2">
              <Image
                  src="/assets/icons/arrow.svg"
                  alt="arrow"
                  width={12}
                  height={12}/>
                  View Ticket
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
