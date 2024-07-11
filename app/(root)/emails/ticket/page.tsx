import {
  Tailwind,
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Img,
  Row,
  Column,
  Section,
} from "@react-email/components";

interface TicketEmailProps {
  params: {
    imageUrl: string;
    eventTitle: string;
    memberName: string;
    date: string;
    time: string;
    admit: string;
    venue: string;
    bookingId: string;
  };
}

export default function TicketEmail({params }: TicketEmailProps) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Body className="bg-white font-sans">
          <Container className="border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <Section className="py-8 px-5 border-b border-gray-300">
              <Img
                src={`https://event-ful.vercel.app/_next/image?url=%2Fassets%2Fimages%2Flogo.png&w=128&q=75`}
                alt="Event Logo"
                className="mx-auto mb-4"
              />
            </Section>

            <Section className="border border-gray-300 rounded-md overflow-hidden">
              <Row>
                <Img
                  className="w-full"
                  src={params.imageUrl}
                  width={500}
                  height={300}
                  alt="Event Header"
                />
              </Row>

              <Row className="p-5">
                <Column>
                  <Heading className="text-2xl font-bold text-center text-gray-900 mb-4">
                    Your Ticket for {params.eventTitle}
                  </Heading>
                  <Text className="text-base mt-4 text-gray-800">
                    Hello {params.memberName},
                  </Text>
                  <Text className="text-base mt-2 text-gray-800">
                    Thank you for your purchase! Here are your ticket details:
                  </Text>
                  <Text className="text-base mt-2 text-gray-800">
                    <strong>Event:</strong> {params.eventTitle}
                  </Text>
                  <Text className="text-base mt-2 text-gray-800">
                    <strong>Date:</strong> {params.date}
                  </Text>
                  <Text className="text-base mt-2 text-gray-800">
                    <strong>Time:</strong> {params.time}
                  </Text>
                  <Text className="text-base mt-2 text-gray-800">
                    <strong>Admit:</strong> {params.admit}
                  </Text>
                  <Text className="text-base mt-2 text-gray-800">
                    <strong>Venue:</strong> {params.venue}
                  </Text>
                  <Text className="text-base mt-2 text-gray-800">
                    <strong>Booking ID:</strong> {params.bookingId}
                  </Text>
                  <Text className="text-center mt-2 text-gray-800">
                    <strong>We look forward to seeing you there!</strong>
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section>
              <Text className="text-center text-sm text-gray-700 mt-8">
                © 2024 | EventFul, 123 Main St, Anytown, USA 12345 |
                https://event-ful.vercel.app
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
