"use client";

import { useState, useEffect, useRef } from "react";
import AlarmModal from "@/components/AlarmModal";
import AlarmItem from "@/components/AlarmItem";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [alarms, setAlarms] = useLocalStorage("countdown_alarms", []);
  const [firedAlarm, setFiredAlarm] = useState(null);
  const intervalRef = useRef(null);

  const addAlarm = (alarm) => {
    setAlarms((prev) => [...prev, { ...alarm, id: Date.now(), active: true }]);
  };

  const toggleAlarm = (id) => {
    setAlarms((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  };

  const deleteAlarm = (id) => {
    setAlarms((prev) => prev.filter((a) => a.id !== id));
  };

  // Check alarms every 10 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const now = new Date();
      const nowDate = now.toISOString().split("T")[0];
      const nowH = now.getHours();
      const nowM = now.getMinutes();

      setAlarms((prev) =>
        prev.map((alarm) => {
          if (
            alarm.active &&
            alarm.date === nowDate &&
            alarm.hour === nowH &&
            alarm.minute === nowM &&
            !alarm.fired
          ) {
            setFiredAlarm(alarm);
            return { ...alarm, fired: true };
          }
          return alarm;
        })
      );
    }, 10000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const dismissFired = () => {
    setFiredAlarm(null);
  };

  const sorted = [...alarms].sort((a, b) => {
    const da = new Date(`${a.date}T${String(a.hour).padStart(2, "0")}:${String(a.minute).padStart(2, "0")}`);
    const db = new Date(`${b.date}T${String(b.hour).padStart(2, "0")}:${String(b.minute).padStart(2, "0")}`);
    return da - db;
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 max-w-2xl mx-auto border-b border-zinc-100 dark:border-zinc-900">
        <h1 className="text-xl font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
          Alarm
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xl font-light hover:opacity-75 transition-opacity"
        >
          +
        </button>
      </header>

      {/* Alarm list */}
      <main className="max-w-2xl mx-auto px-8 py-6 flex flex-col gap-3">
        {sorted.length === 0 ? (
          <p className="text-center text-zinc-400 dark:text-zinc-600 mt-20 text-sm">
            Kein Alarm gestellt. Tippe auf{" "}
            <span className="font-bold text-zinc-500">+</span> um einen hinzuzufügen.
          </p>
        ) : (
          sorted.map((alarm) => (
            <AlarmItem
              key={alarm.id}
              alarm={alarm}
              onToggle={toggleAlarm}
              onDelete={deleteAlarm}
            />
          ))
        )}
      </main>

      {/* Add alarm modal */}
      {showModal && (
        <AlarmModal onSave={addAlarm} onClose={() => setShowModal(false)} />
      )}

      {/* Fired alarm notification */}
      {firedAlarm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-5 max-w-xs w-full mx-4">
            <div className="text-4xl animate-bounce">⏰</div>
            <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">Alarm!</p>
            <p className="text-5xl font-mono font-bold text-zinc-900 dark:text-zinc-50">
              {String(firedAlarm.hour).padStart(2, "0")}:{String(firedAlarm.minute).padStart(2, "0")}
            </p>
            <p className="text-sm text-zinc-400 dark:text-zinc-500">
              {new Date(firedAlarm.date + "T00:00:00").toLocaleDateString("de-DE", {
                weekday: "long", day: "2-digit", month: "long",
              })}
            </p>
            <button
              onClick={dismissFired}
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
