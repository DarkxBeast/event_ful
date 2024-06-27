// components/RazorpayCheckout.tsx
import React from 'react';
const RazorpayCheckout = () => {
  const loadScript = (src: string) => {
    return new Promise((resolve) => {
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

    const data = await fetch('/api/razorpay/createOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((t) => t.json());

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      name: 'Your Company Name',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      handler: function (response: any) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
        // Verify payment on the server
        verifyPayment(response);
      },
      prefill: {
        name: 'Gaurav Kumar',
        email: 'gaurav.kumar@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#F37254',
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  const verifyPayment = async (paymentResponse: any) => {
    const res = await fetch('/api/razorpay/verifyPayment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentResponse),
    });

    const result = await res.json();
    if (result.success) {
      alert('Payment successful and verified!');
    } else {
      alert('Payment verification failed. Please try again.');
    }
  };

  return (
    <div>
      <button onClick={displayRazorpay}>Pay with Razorpay</button>
    </div>
  );
};

export default RazorpayCheckout;