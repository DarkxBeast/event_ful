import CheckoutButton from "@/components/shared/CheckoutButton";
import Collection from "@/components/shared/Collection";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";

const EventDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const event = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <div className="pt-12 sm:pr-8 ">
            <Image
              src={event.imageUrl}
              alt="hero image"
              width={1000}
              height={1000}
              className="h-[94%] w-[100%] pl-16 min-h-[300px] object-cover object-center"
            />
          </div>

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{event.title}</h2>

              <div className="inline-flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700 justify-evenly items-center ">
                    {event.isFree ? (
                      "FREE"
                    ) : (
                      <>
                        <img
                          src={"/assets/icons/rupee-green.svg"}
                          alt="Rupee"
                          className=" inline-flex h-4 w-4 mb-1 "
                        />
                        {event.price}
                      </>
                    )}
                  </p>
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-gray-600">
                    {event.category.name}
                  </p>
                </div>

                <div className="flex flex-wrap">
                  <p className="p-medium-16 rounded-full bg-acent-500/10 text-gray-600 px-4 py-2.5">
                    HOST:{" "}
                    <span className="text-acent-500 ml-2">
                      {event.organizer.firstName} {event.organizer.lastName}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <CheckoutButton event={event} />

            <div className="flex lg:flex-row md:flex-col gap-4">
              <div className="flex flex-col gap-5">
                <div className="flex gap-2 md:gap-3">
                  <Image
                    src="/assets/icons/calendar.svg"
                    alt="calendar"
                    width={32}
                    height={32}
                  />
                  <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                    <p>
                      {formatDateTime(event.startDateTime).dateOnly} -{" "}
                      {formatDateTime(event.startDateTime).timeOnly}
                    </p>
                    <p>
                      {formatDateTime(event.endDateTime).dateOnly} -{" "}
                      {formatDateTime(event.endDateTime).timeOnly}
                    </p>
                  </div>
                </div>

                <div className="p-regular-20 flex items-center gap-3">
                  <Image
                    src="/assets/icons/location.svg"
                    alt="location"
                    width={32}
                    height={32}
                  />

                  <p className="p-medium-16 lg:p-regular-20">
                    {event.location}
                  </p>
                </div>
              </div>

              <iframe
                id="map"
                title="map"
                src={`https://www.google.com/maps/embed/v1/place?key=${
                  process.env.GMAPS_API_KEY
                }&q=${encodeURIComponent(event.location)}`}
                width="400"
                height="200"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-gray-600">Details:</p>
              <p className="p-medium-16 lg:p-medium-18 text-justify">
                {event.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS with the same category */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12 mb-24">
        <h2 className="h2-bold">Related Events</h2>

        <Collection
          data={relatedEvents?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={3}
          page={searchParams.page as string}
          totalPages={relatedEvents?.totalPages}
        />
      </section>
    </>
  );
};

export default EventDetails;
