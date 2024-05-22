// src/routes/index.jsx
import { Title } from "solid-start";
import Counter from "~/components/Counter";
import Countdown from "~/components/Countdown";

export default function Home() {
  const targetDate = "2024-6-22T09:00:00";

  return (
    <main>
      <Title>STOP!</Title>
      <h1>Stop procrastinating!</h1>
      <p>time until first exam :</p>
      <br></br>
      <Countdown />
      <p>Go work!!</p>
    </main>
  );
}
