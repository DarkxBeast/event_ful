import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { DeleteConfirmation } from "./DeleteConfirmation";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event.organizer._id.toString();

  return (
    <div className="group relative flex h-full min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-xl transition-all hover:scale-105 hover:shadow-stroke-500  md:min-h-[438px] border border-stroke-500">
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className=" h-[40%] flex-center bg-gray-50 bg-cover bg-center text-grey-500"
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

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4 border-t border-t-stroke-500 ">
        {!hidePrice && (
          <div className=" inline-flex gap-4">
            <span className="p-semibold-14 w-min rounded-full bg-acent-500 text-white px-4 py-1 ">
              {event.isFree ? "FREE" : `$${event.price}`}
            </span>
            <span>
              <p className="p-semibold-14 w-max rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
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
      </div>
    </div>
  );
};

export default Card;
