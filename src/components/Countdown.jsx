import { createSignal, createEffect, onCleanup } from "solid-js";

export default function Countdown() {
  const end = new Date("06/22/2024 10:01 AM");

  const _second = 1000;
  const _minute = _second * 60;
  const _hour = _minute * 60;
  const _day = _hour * 24;

  const calculateTimeLeft = () => {
    const now = new Date();
    const distance = end - now;

    if (distance < 0) {
      clearInterval(timer);
      return {
        days: "EXPIRED",
        hours: "",
        minutes: "",
        seconds: ""
      };
    }

    const days = Math.floor(distance / _day);
    const hours = Math.floor((distance % _day) / _hour);
    const minutes = Math.floor((distance % _hour) / _minute);
    const seconds = Math.floor((distance % _minute) / _second);

    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  };

  const [timeLeft, setTimeLeft] = createSignal(calculateTimeLeft());

  createEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    onCleanup(() => {
      clearInterval(timer);
    });
  });

  return (
    <div id="countdown">
      {timeLeft().days !== "EXPIRED" ? (
        <>
          {timeLeft().days} days {timeLeft().hours} hrs {timeLeft().minutes} mins {timeLeft().seconds} secs
        </>
      ) : (
        "EXPIRED!"
      )}
    </div>
  );
}
