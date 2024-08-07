import Search from "@/components/shared/Search";
import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Carousel from "@/components/shared/Carousel";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain items-start py-4 md:py-8">
        <div
          className="wrapper grid grid-cols-1 gap-16 items-start justify-stretch
        md:grid-cols-2 sm:grid-rows-1"
        >
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold ">
              Make it EventFul: Host, Discover, Celebrate with Us!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Your calendar for life's adventures. <br /> Find, plan, and
              experience - all in one place
            </p>
            <Button size="lg" asChild className="button  w-full sm:w-fit">
              <Link href="#events">Explore Now</Link>
            </Button>
          </div>
          <div>
            <Carousel />
          </div>
        </div>
      </section>

      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12 mb-24"
      >
        <h2 className="h2-bold text-center">The Event's Library</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>
        <div className="mt-8">
          <Collection
            data={events?.data}
            emptyTitle="No Events Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Events"
            limit={6}
            page={page}
            totalPages={events?.totalPages}
          />
        </div>
      </section>
    </>
  );
}
