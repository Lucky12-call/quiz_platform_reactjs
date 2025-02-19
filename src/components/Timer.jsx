/* eslint-disable react/prop-types */
import { useEffect } from "react";

const Timer = ({ timeLeft, setTimeLeft, setIsSubmitted }) => {
  // Timer logic
  useEffect(() => {
    if (timeLeft === 0) {
      setIsSubmitted(true); // Automatically submit when time runs out
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on unmount or question change
  }, [setIsSubmitted, setTimeLeft, timeLeft]);

  return (
    <div className="mb-4">
      <p className="text-lg font-semibold">
        Time Left: <span className="text-red-600">{timeLeft}</span> seconds
      </p>
    </div>
  );
};

export default Timer;
