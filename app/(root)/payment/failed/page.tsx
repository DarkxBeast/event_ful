'use client';

import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';

const PaymentFailedPage: NextPage = () => {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(5); // Initial countdown seconds

  useEffect(() => {
    // Countdown interval function
    const interval = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1); // Decrement seconds
    }, 1000); // Runs every second

    // Redirect to home page after 5 seconds
    const redirectTimer = setTimeout(() => {
      router.push('/'); // Redirect to home page
    }, 5000);

    // Cleanup functions to clear timers on unmount
    return () => {
      clearInterval(interval);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-4">Payment Failed</h1>
        <p className="text-lg text-gray-800 text-center">
          Sorry, your payment could not be processed. You will be redirected to the home page shortly.
        </p>
        <p className="text-lg text-gray-800 text-center mt-4">
          Redirecting in {secondsLeft} {secondsLeft === 1 ? 'second' : 'seconds'}...
        </p>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
