"use client";

import { useState } from "react";
import AlarmModal from "@/components/AlarmModal";
import AlarmItem from "@/components/AlarmItem";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [alarms, setAlarms] = useState([]);

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

  const sorted = [...alarms].sort((a, b) => {
    const da = new Date(`${a.date}T${String(a.hour).padStart(2,"0")}:${String(a.minute).padStart(2,"0")}`);
    const db = new Date(`${b.date}T${String(b.hour).padStart(2,"0")}:${String(b.minute).padStart(2,"0")}`);
    return da - db;
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 max-w-2xl mx-auto">
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
      <main className="max-w-2xl mx-auto px-8 py-4 flex flex-col gap-3">
        {sorted.length === 0 ? (
          <p className="text-center text-zinc-400 dark:text-zinc-600 mt-20 text-sm">
            Kein Alarm gestellt. Tippe auf + um einen hinzuzufügen.
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

      {showModal && (
        <AlarmModal onSave={addAlarm} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
