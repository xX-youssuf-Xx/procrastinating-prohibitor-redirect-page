// ~/components/Countdown.jsx
import { createSignal, createEffect, onCleanup } from "solid-js";

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

    console.log("Time left: ", timeLeft);
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = createSignal(calculateTimeLeft());

  createEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    onCleanup(() => {
      clearInterval(intervalId);
    });
  });

  return (
    <div>
      <h2>Countdown too {targetDate}</h2>
      <div>
        {Object.keys(timeLeft()).map((interval) => (
          <span key={interval}>
            {timeLeft()[interval]} {interval}{" "}
          </span>
        ))}
      </div>
    </div>
  );
}
