import { createOrder } from '@/lib/actions/order.actions';
import { Button } from '../ui/button';
import { IEvent } from '@/lib/database/models/event.model';
import { useRouter } from 'next/navigation';

const RazorpayCheckout = ({ event, userId }: { event: IEvent, userId: string }) => {
  const router = useRouter();

  const loadScript = (src: string) => {
    return new Promise<boolean>((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const price = Number(event.price) * 100;

    try {
      // Fetch Razorpay order details
      const data = await fetch('/api/razorpay/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: price }),
      }).then((t) => t.json());

      const order = {
        razorpayId: data.id,
        eventTitle: event.title,
        eventId: event._id,
        totalAmount: event.price,
        isFree: event.isFree,
        buyerId: userId,
        createdAt: new Date(),
      };

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        name: 'Eventful',
        description: event.title,
        image: 'https://cdn.razorpay.com/logos/OTlXBwdWrEnwCW_medium.png',
        handler: async function (response: any) {
          console.log(response.razorpay_payment_id);
          console.log(response.razorpay_order_id);
          console.log(response.razorpay_signature);
          // Verify payment on the server
          await verifyPayment(response, order);
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#554DDE',
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
    }
  };

  const verifyPayment = async (paymentResponse: any, order: any) => {
    try {
      const res = await fetch('/api/razorpay/verifyPayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentResponse),
      });

      const result = await res.json();
      if (result.success) {
        console.log('Payment successful and verified!');
        await createOrder(order) ;
        router.push('/payment/success');
      } else {
        console.log('Payment verification failed. Please try again.');
        router.push('/payment/failed');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); displayRazorpay(); }}>
      <Button type="submit" role="link" size="lg" className="button sm:w-fit">
        {event.isFree ? 'Get Ticket' : 'Buy Ticket'}
      </Button>
    </form>
  );
};

export default RazorpayCheckout;
