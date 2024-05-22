
// ~/components/Countdown.jsx
import { createSignal, onCleanup } from "solid-js";

export default function Countdown({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = createSignal(calculateTimeLeft());

  const updateCountdown = () => {
    setTimeLeft(calculateTimeLeft());
  };

  const intervalId = setInterval(updateCountdown, 1000);

  onCleanup(() => {
    clearInterval(intervalId);
  });

  return (
    <div>
      <h2>Countdown to {targetDate}</h2>
      <div>
        {Object.keys(timeLeft()).map((interval) => (
          <span>
            {timeLeft()[interval]} {interval}{" "}
          </span>
        ))}
      </div>
    </div>
  );
}
