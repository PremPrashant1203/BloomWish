import { useEffect, useState } from "react";

const ReceiverTimer = ({ openAt, onReady }) => {
  const calculateRemaining = () => {
    if (!openAt) return 0;

    const target = new Date(openAt).getTime();
    const now = Date.now();

    return Math.max(0, target - now);
  };

  const [remaining, setRemaining] = useState(calculateRemaining());

  useEffect(() => {
    if (!openAt) {
      onReady();
      return;
    }

    const timer = setInterval(() => {
      const timeLeft = calculateRemaining();

      setRemaining(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(timer);
        onReady();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [openAt]);

  if (!openAt || remaining <= 0) {
    return null;
  }

  const totalSeconds = Math.floor(remaining / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className="text-center">
      <p className="text-lg font-medium mb-3">
        Your gift is waiting for you 💗
      </p>

      <div className="flex justify-center gap-3">
        {days > 0 && (
          <div>
            <div className="text-3xl font-bold">
              {String(days).padStart(2, "0")}
            </div>
            <span className="text-xs">Days</span>
          </div>
        )}

        <div>
          <div className="text-3xl font-bold">
            {String(hours).padStart(2, "0")}
          </div>
          <span className="text-xs">Hours</span>
        </div>

        <div>
          <div className="text-3xl font-bold">
            {String(minutes).padStart(2, "0")}
          </div>
          <span className="text-xs">Minutes</span>
        </div>

        <div>
          <div className="text-3xl font-bold">
            {String(seconds).padStart(2, "0")}
          </div>
          <span className="text-xs">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default ReceiverTimer;