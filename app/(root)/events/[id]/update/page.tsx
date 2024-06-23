import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs/server";

const UpdateEvent = () => {
    const {sessionClaims} = auth();

    const userId = sessionClaims?.user_id as string

  return (
    <>
      <section className="bg-primary-50 bg-cover br-center py-4 md:py-8">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          UpdateEvent
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm userId={userId} type="Create"/>
      </div>
    </>
  );
};

export default UpdateEvent;
