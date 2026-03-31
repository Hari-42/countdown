"use client";

import { useState } from "react";
import CountdownInput from "@/components/CountdownInput";

export default function Home() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-10">
        <h1 className="text-xl font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
          Countdown
        </h1>

        <div className="flex items-end gap-6">
          <CountdownInput value={hours} onChange={setHours} max={99} label="Stunden" />
          <span className="text-4xl font-mono font-bold text-zinc-300 dark:text-zinc-700 mb-11 select-none">·</span>
          <CountdownInput value={minutes} onChange={setMinutes} max={60} label="Minuten" />
          <span className="text-4xl font-mono font-bold text-zinc-300 dark:text-zinc-700 mb-11 select-none">·</span>
          <CountdownInput value={seconds} onChange={setSeconds} max={60} label="Sekunden" />
        </div>

        <div className="px-5 py-2 rounded-full text-base font-mono tracking-widest bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400">
          {String(hours).padStart(2, "0")}h{" "}
          {String(minutes).padStart(2, "0")}m{" "}
          {String(seconds).padStart(2, "0")}s
        </div>
      </div>
    </div>
  );
}
