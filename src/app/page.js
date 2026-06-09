"use client";

import { useState, useEffect, useRef } from "react";
import Notch from "@/components/Notch";
import CountdownInput from "@/components/CountdownInput";
import AlarmInput from "@/components/AlarmInput";
import AlarmModal from "@/components/AlarmModal";
import AlarmItem from "@/components/AlarmItem";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getNowInTimezone, getLocalTimezone } from "@/utils/timezones";

// ── Timer View ────────────────────────────────────────────────────────────────
function TimerView() {
  const [hours, setHours] = useLocalStorage("countdown_timer_h", 0);
  const [minutes, setMinutes] = useLocalStorage("countdown_timer_m", 0);
  const [seconds, setSeconds] = useLocalStorage("countdown_timer_s", 0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
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

  return (
    <div className="flex flex-col items-center gap-10">
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
            onClick={() => { if (!isActive) setTimeLeft(totalSeconds); setIsRunning(true); }}
            disabled={!isActive && totalSeconds === 0}
            className="px-8 py-2.5 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-semibold hover:opacity-75 disabled:opacity-25 transition-opacity"
          >
            {isActive ? "Weiter" : "Start"}
          </button>
        )}
        {isRunning && (
          <button
            onClick={() => setIsRunning(false)}
            className="px-8 py-2.5 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-semibold hover:opacity-75 transition-opacity"
          >
            Pause
          </button>
        )}
        {isActive && (
          <button
            onClick={() => { setIsRunning(false); setTimeLeft(null); }}
            className="px-8 py-2.5 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

// ── Alarm View ────────────────────────────────────────────────────────────────
function AlarmView() {
  const [showModal, setShowModal] = useState(false);
  const [alarms, setAlarms] = useLocalStorage("countdown_alarms", []);
  const [firedAlarm, setFiredAlarm] = useState(null);
  const intervalRef = useRef(null);

  const addAlarm = (alarm) =>
    setAlarms((prev) => [...prev, { ...alarm, id: Date.now(), active: true }]);

  const toggleAlarm = (id) =>
    setAlarms((prev) => prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a)));

  const deleteAlarm = (id) =>
    setAlarms((prev) => prev.filter((a) => a.id !== id));

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setAlarms((prev) =>
        prev.map((alarm) => {
          if (!alarm.active || alarm.fired) return alarm;
          const tz = alarm.timezone ?? getLocalTimezone();
          const { date, hour, minute } = getNowInTimezone(tz);
          if (alarm.date === date && alarm.hour === hour && alarm.minute === minute) {
            setFiredAlarm(alarm);
            return { ...alarm, fired: true };
          }
          return alarm;
        })
      );
    }, 10000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const sorted = [...alarms].sort((a, b) => {
    const da = new Date(`${a.date}T${String(a.hour).padStart(2, "0")}:${String(a.minute).padStart(2, "0")}`);
    const db = new Date(`${b.date}T${String(b.hour).padStart(2, "0")}:${String(b.minute).padStart(2, "0")}`);
    return da - db;
  });

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex justify-end">
        <button
          onClick={() => setShowModal(true)}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xl font-light hover:opacity-75 transition-opacity"
        >
          +
        </button>
      </div>

      {sorted.length === 0 ? (
        <p className="text-center text-zinc-400 dark:text-zinc-600 mt-16 text-sm">
          Kein Alarm gestellt. Tippe auf <span className="font-bold text-zinc-500">+</span> um einen hinzuzufügen.
        </p>
      ) : (
        sorted.map((alarm) => (
          <AlarmItem key={alarm.id} alarm={alarm} onToggle={toggleAlarm} onDelete={deleteAlarm} />
        ))
      )}

      {showModal && <AlarmModal onSave={addAlarm} onClose={() => setShowModal(false)} />}

      {firedAlarm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-5 max-w-xs w-full mx-4">
            <div className="text-4xl animate-bounce">⏰</div>
            <p className="text-5xl font-mono font-bold text-zinc-900 dark:text-zinc-50">
              {String(firedAlarm.hour).padStart(2, "0")}:{String(firedAlarm.minute).padStart(2, "0")}
            </p>
            <p className="text-sm text-zinc-400 dark:text-zinc-500">
              {new Date(firedAlarm.date + "T00:00:00").toLocaleDateString("de-DE", { weekday: "long", day: "2-digit", month: "long" })}
            </p>
            <button
              onClick={() => setFiredAlarm(null)}
              className="w-full py-3 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold hover:opacity-75 transition-opacity"
            >
              Schließen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [active, setActive] = useState("Timer");

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center pt-12 px-8">
      <Notch tabs={["Timer", "Alarm"]} active={active} onChange={setActive} />

      <div className="w-full max-w-2xl mt-14 flex flex-col items-center">
        {active === "Timer" ? <TimerView /> : <AlarmView />}
      </div>
    </div>
  );
}
