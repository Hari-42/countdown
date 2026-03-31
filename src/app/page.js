"use client";

import { useState, useEffect, useRef } from "react";
import CountdownInput from "@/components/CountdownInput";

export default function Home() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  const isActive = timeLeft !== null;
  const isFinished = timeLeft === 0;

  const displayH = isActive ? Math.floor(timeLeft / 3600) : hours;
  const displayM = isActive ? Math.floor((timeLeft % 3600) / 60) : minutes;
  const displayS = isActive ? timeLeft % 60 : seconds;

  const handleStart = () => {
    if (!isActive) setTimeLeft(totalSeconds);
    setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-10">
        <h1 className="text-xl font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
          Countdown
        </h1>

        <div className="flex items-end gap-6">
          <CountdownInput value={displayH} onChange={isActive ? undefined : setHours} max={99} label="Stunden" disabled={isActive} />
          <span className="text-4xl font-mono font-bold text-zinc-300 dark:text-zinc-700 mb-11 select-none">·</span>
          <CountdownInput value={displayM} onChange={isActive ? undefined : setMinutes} max={60} label="Minuten" disabled={isActive} />
          <span className="text-4xl font-mono font-bold text-zinc-300 dark:text-zinc-700 mb-11 select-none">·</span>
          <CountdownInput value={displayS} onChange={isActive ? undefined : setSeconds} max={60} label="Sekunden" disabled={isActive} />
        </div>

        <div className={`px-5 py-2 rounded-full text-base font-mono tracking-widest transition-all ${
          isFinished
            ? "bg-red-100 dark:bg-red-950 text-red-500 dark:text-red-400 animate-pulse font-bold"
            : "bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400"
        }`}>
          {String(displayH).padStart(2, "0")}h{" "}
          {String(displayM).padStart(2, "0")}m{" "}
          {String(displayS).padStart(2, "0")}s
          {isFinished && " — Zeit abgelaufen!"}
        </div>

        <div className="flex gap-3">
          {!isRunning && !isFinished && (
            <button
              onClick={handleStart}
              disabled={!isActive && totalSeconds === 0}
              className="px-8 py-2.5 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-semibold tracking-wide hover:opacity-75 disabled:opacity-25 transition-opacity"
            >
              {isActive ? "Weiter" : "Start"}
            </button>
          )}
          {isRunning && (
            <button
              onClick={handlePause}
              className="px-8 py-2.5 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-semibold tracking-wide hover:opacity-75 transition-opacity"
            >
              Pause
            </button>
          )}
          {isActive && (
            <button
              onClick={handleReset}
              className="px-8 py-2.5 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 text-sm font-semibold tracking-wide hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
