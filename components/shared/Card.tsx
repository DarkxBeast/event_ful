import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { Button } from "../ui/button";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event.organizer._id;

  return (
    <div className="group relative flex h-full min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-xl transition-all hover:scale-105 hover:shadow-stroke-500 md:min-h-[438px] border border-stroke-500">
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="h-[40%] flex-center bg-gray-50 bg-cover bg-center text-grey-500"
      />
      {/* IS EVENT CREATOR ... */}

      {isEventCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
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

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4 border-t border-t-stroke-500 relative">
        {!hidePrice && (
          <div className="inline-flex gap-4">
            <span className="flex p-semibold-16 w-md rounded-full bg-acent-500 text-white px-4 py-1 justify-between items-center ">
            {event.isFree ? (
                      "FREE"
                    ) : (
                      <>
                        <img
                          src={"/assets/icons/rupee-white.svg"}
                          alt="Rupee"
                          className=" inline-flex h-4 w-4 "
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

        <Link href={`/events/${event._id}`}>
          <p className="p-bold-24 md:p-bold-20 line-clamp-2 flex-1 text-primary font-bold text-2xl pl-2">
            {event.title}
          </p>
        </Link>

        <p className="p-medium-16 p-medium-18 text--black-500">
          <span style={{ marginLeft: "12px" }}>Date:</span>
          <span style={{ marginLeft: "16px" }}>
            {formatDateTime(event.startDateTime).dateTime}
          </span>
        </p>

        <div
          className="p-medium-16 p-medium-18 text--black-500"
          style={{ display: "flex", alignItems: "flex-start" }}
        >
          <span style={{ marginRight: "4px" }}>Venue:</span>
          <span style={{ marginLeft: "12px" }}>{event.location}</span>
        </div>

        {hasOrderLink && (
          <div className="absolute bottom-[-12px] right-8">
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
      </div>
    </div>
  );
};

export default Card;
