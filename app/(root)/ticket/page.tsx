import TicketCard from "@/components/shared/TicketCard";


const MyComponent = () => {
  return (
    <div>
      <TicketCard
        eventTitle="Jazz in the Park"
        memberName="Rahul Thakur"
        date="02 July 2024"
        time="Tue, 10:00PM"
        admit="01 only"
        venue="Washington Square Park, New York City, NY"
        bookingId="00017829651792"
      />
    </div>
  );
};

export default MyComponent;