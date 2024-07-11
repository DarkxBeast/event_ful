'use client';

import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { Transition } from '@headlessui/react';

const PaymentFailedPage: NextPage = () => {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Countdown interval function
    const interval = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1);
    }, 1000); // Runs every second

    // Redirect to home page after 5 seconds
    const redirectTimer = setTimeout(() => {
      setIsFading(true);
    }, 4000);

    const finalRedirect = setTimeout(() => {
      router.push(`/`);
    }, 5000);

    // Cleanup functions to clear timers on unmount
    return () => {
      clearInterval(interval);
      clearTimeout(redirectTimer);
      clearTimeout(finalRedirect);
    };
  }, [router]);

  return (
    <Transition
      show={!isFading}
      enter="transition-opacity duration-1000"
      enterFrom="opacity-100"
      enterTo="opacity-0"
      leave="transition-opacity duration-1000"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-3xl font-bold text-center text-red-500 mb-6">
            Payment Failed!
          </h1>
          <div className="flex flex-grow gap-2 justify-center items-center space-x-2 mb-6">
            <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce"></div>
          </div>
          <p className="text-lg text-gray-600 text-center mb-6">
            Redirecting in {secondsLeft}{" "}
            {secondsLeft === 1 ? "second" : "seconds"}...
          </p>
        </div>
      </div>
    </Transition>
  );
};

export default PaymentFailedPage;
