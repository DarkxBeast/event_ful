import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs/server";

const CreateEvent = () => {
    const {sessionClaims} = auth();

    const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="bg-primary-50 border-b-1 border-stroke-500 bg-dotted-pattern bg-cover br-center py-4 md:py-8">
        <h3 className="wrapper h3-bold text-center sm:text-center text-acent-500">
          Let's create an event
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm userId={userId} type="Create"/>
      </div>
    </>
  );
};

export default CreateEvent;
