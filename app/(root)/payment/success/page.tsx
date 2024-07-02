'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Transition } from '@headlessui/react';

const PaymentSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      setIsFading(true);
    }, 4000);

    const finalRedirect = setTimeout(() => {
      router.push(`/ticket?${searchParams.toString()}`);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(redirectTimer);
      clearTimeout(finalRedirect);
    };
  }, [router, searchParams]);

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
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-3xl font-bold text-center text-acent-500 mb-4">Payment Successful!</h1>
          <p className="text-lg text-gray-800 text-center">
            Your payment has been successfully processed. You will be redirected to your ticket shortly.
          </p>
          <p className="text-lg text-gray-500 text-center mt-4">
            Redirecting in {secondsLeft} {secondsLeft === 1 ? 'second' : 'seconds'}...
          </p>
        </div>
      </div>
    </Transition>
  );
};

export default PaymentSuccessPage;
