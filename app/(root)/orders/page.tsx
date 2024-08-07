import Search from '@/components/shared/Search';
import { getOrdersByEvent } from '@/lib/actions/order.actions';
import { getEventById } from '@/lib/actions/event.actions';
import { formatDateTime, formatPrice } from '@/lib/utils';
import { SearchParamProps } from '@/types';
import { IOrderItem } from '@/lib/database/models/order.model';

const Orders = async ({ searchParams }: SearchParamProps) => {
  const eventId = (searchParams?.eventId as string) || '';
  const searchText = (searchParams?.query as string) || '';

  const orders = await getOrdersByEvent({ eventId, searchString: searchText });

  // Fetch event details to get the event title
  const event = await getEventById(eventId);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex justify-center">
          <h3 className="h3-bold text-center text-black underline">
           {event?.title || 'Event'}
          </h3>
        </div>
      </section>

      <section className="wrapper mt-8">
        <Search placeholder="Search buyer name..." />
      </section>

      <section className="wrapper overflow-x-auto mb-16">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-gray-500">
              <th className="min-w-[250px] py-3 text-left">Order ID</th>
              <th className="min-w-[150px] py-3 text-left">Name</th>
              <th className="min-w-[150px] py-3 text-left">Email</th>
              <th className="min-w-[100px] py-3 text-left">Created</th>
              <th className="min-w-[100px] py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length === 0 ? (
              <tr className="border-b">
                <td colSpan={6} className="py-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              <>
                {orders &&
                  orders.map((row: IOrderItem) => (
                    <tr key={row._id} className="p-regular-14 lg:p-regular-16 border-b">
                      <td className="min-w-[250px] py-4 text-primary-500">{row._id}</td>
                      <td className="min-w-[150px] py-4 text-acent-500">{row.buyerName}</td>
                      <td className="min-w-[150px] py-4 text-primary-500">{row.buyerEmail}</td>
                      <td className="min-w-[100px] py-4">{formatDateTime(row.createdAt).dateTime}</td>
                      <td className="min-w-[100px] py-4 text-right">{formatPrice(row.totalAmount)}</td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Orders;
