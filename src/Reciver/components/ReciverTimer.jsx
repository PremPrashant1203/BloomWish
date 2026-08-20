import { useEffect, useState } from "react";

const ReciverTimer = ({ openAt, onFinish }) => {
  const getRemainingTime = () => {
    if (!openAt) {
      return 0;
    }

    const targetTime = new Date(openAt).getTime();
    const currentTime = Date.now();

    return Math.max(
      0,
      targetTime - currentTime
    );
  };

  const [remaining, setRemaining] = useState(
    getRemainingTime()
  );

  useEffect(() => {
    if (!openAt) {
      onFinish();
      return;
    }

    const interval = setInterval(() => {
      const timeLeft = getRemainingTime();

      setRemaining(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(interval);
        onFinish();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [openAt]);

  // ==========================================
  // TIMER FINISHED
  // ==========================================

  if (remaining <= 0) {
    return null;
  }

  const totalSeconds = Math.floor(
    remaining / 1000
  );

  const days = Math.floor(
    totalSeconds / 86400
  );

  const hours = Math.floor(
    (totalSeconds % 86400) / 3600
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds = totalSeconds % 60;

  return (
    <div className="flex flex-col items-center">

      <p className="text-lg text-gray-600 mb-6">
        Your gift will be ready soon 💗
      </p>

      <div className="flex items-center justify-center gap-3">

        {days > 0 && (
          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-sm px-4 py-3">
              <p className="text-3xl font-semibold">
                {String(days).padStart(2, "0")}
              </p>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Days
            </p>
          </div>
        )}

        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-sm px-4 py-3">
            <p className="text-3xl font-semibold">
              {String(hours).padStart(2, "0")}
            </p>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Hours
          </p>
        </div>

        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-sm px-4 py-3">
            <p className="text-3xl font-semibold">
              {String(minutes).padStart(2, "0")}
            </p>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Minutes
          </p>
        </div>

        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-sm px-4 py-3">
            <p className="text-3xl font-semibold">
              {String(seconds).padStart(2, "0")}
            </p>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Seconds
          </p>
        </div>

      </div>

    </div>
  );
};

export default ReciverTimer;