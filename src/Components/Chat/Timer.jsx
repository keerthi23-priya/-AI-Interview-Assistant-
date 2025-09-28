import { useEffect, useState } from "react";

export default function Timer({ seconds, onTimeout }) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout();
      return;
    }
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  return <p className="timer">⏳ {timeLeft}s</p>;
}
