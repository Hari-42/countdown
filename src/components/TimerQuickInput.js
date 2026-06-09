"use client";

import { useState } from "react";

/**
 * Schnelleingabe für den Timer.
 * Unterstützte Formate:
 *   "1:30:00"  → 1h 30m 0s
 *   "90:00"    → 90m 0s  (= 1h 30m)
 *   "5000"     → 5000s   (= 1h 23m 20s)
 *   "1:30"     → 1m 30s
 */
function parseTime(raw) {
  const clean = raw.trim();
  if (!clean) return null;

  const parts = clean.split(":").map((p) => parseInt(p, 10) || 0);
  let totalSeconds = 0;

  if (parts.length === 3) {
    // HH:MM:SS
    totalSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    // MM:SS
    totalSeconds = parts[0] * 60 + parts[1];
  } else {
    // reine Sekunden
    totalSeconds = parts[0];
  }

  if (totalSeconds <= 0) return null;

  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return { h: Math.min(h, 99), m: Math.min(m, 59), s: Math.min(s, 59) };
}

export default function TimerQuickInput({ onSet, disabled }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    const result = parseTime(value);
    if (!result) {
      setError(true);
      setTimeout(() => setError(false), 800);
      return;
    }
    onSet(result.h, result.m, result.s);
    setValue("");
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => { setValue(e.target.value); setError(false); }}
        onKeyDown={(e) => e.key === "Enter" && !disabled && handleSubmit()}
        placeholder="z.B. 1:30:00"
        disabled={disabled}
        className={`w-36 px-3 py-1.5 rounded-full text-sm font-mono text-center border outline-none transition-all
          ${error
            ? "border-red-400 bg-red-50 dark:bg-red-950 text-red-500 dark:text-red-400"
            : "border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 focus:border-zinc-500 dark:focus:border-zinc-400"
          }
          disabled:opacity-30 disabled:cursor-not-allowed`}
      />
      <button
        onClick={handleSubmit}
        disabled={disabled || !value}
        className="px-4 py-1.5 rounded-full text-sm font-medium bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        Setzen
      </button>
    </div>
  );
}
