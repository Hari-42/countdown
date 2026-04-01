"use client";

import { useState } from "react";
import AlarmInput from "./AlarmInput";

export default function AlarmModal({ onSave, onClose }) {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  const handleSave = () => {
    if (!date) return;
    onSave({ date, hour, minute });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 w-full max-w-sm flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">Alarm stellen</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-xl leading-none transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Date */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
            Datum
          </label>
          <input
            type="date"
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2 text-base text-zinc-900 dark:text-zinc-50 outline-none focus:border-zinc-500 dark:focus:border-zinc-400 transition-colors"
          />
        </div>

        {/* Time */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
            Uhrzeit
          </label>
          <div className="flex items-start justify-center gap-4">
            <AlarmInput value={hour} onChange={setHour} max={23} label="Stunde" />
            <span className="text-3xl font-mono font-bold text-zinc-300 dark:text-zinc-600 mt-3 select-none">:</span>
            <AlarmInput value={minute} onChange={setMinute} max={59} label="Minute" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            Abbrechen
          </button>
          <button
            onClick={handleSave}
            disabled={!date}
            className="flex-1 py-2.5 rounded-full bg-zinc-900 dark:bg-zinc-100 text-sm font-medium text-white dark:text-zinc-900 hover:opacity-75 disabled:opacity-30 transition-opacity"
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
}
