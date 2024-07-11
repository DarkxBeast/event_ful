"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const PaymentSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      router.push(`/ticket/create?${searchParams.toString()}`);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(redirectTimer);
    };
  }, [router, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-primary mb-6">
          Payment Successful!
        </h1>
        <div className="flex flex-grow gap-2 justify-center items-center space-x-2 mb-6">
          <div className="w-4 h-4 rounded-full bg-primary animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-primary animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-primary animate-bounce"></div>
        </div>
        <p className="text-lg text-gray-600 text-center mb-6">
          Redirecting in {secondsLeft}{" "}
          {secondsLeft === 1 ? "second" : "seconds"}...
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
