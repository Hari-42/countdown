"use client";

export default function AlarmItem({ alarm, onToggle, onDelete }) {
  const { date, hour, minute, active } = alarm;

  const formatted = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  const dateLabel = new Date(date + "T00:00:00").toLocaleDateString("de-DE", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className={`flex items-center justify-between px-5 py-4 rounded-2xl border transition-all ${
      active
        ? "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
        : "bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-900 opacity-50"
    }`}>
      <div className="flex flex-col gap-0.5">
        <span className="text-4xl font-mono font-bold text-zinc-900 dark:text-zinc-50 leading-none">
          {formatted}
        </span>
        <span className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">{dateLabel}</span>
      </div>

      <div className="flex items-center gap-4">
        {/* iOS-style toggle */}
        <button
          onClick={() => onToggle(alarm.id)}
          className={`relative w-12 h-7 rounded-full transition-colors duration-200 overflow-hidden ${
            active ? "bg-green-500" : "bg-zinc-200 dark:bg-zinc-700"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
              active ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>

        {/* Delete */}
        <button
          onClick={() => onDelete(alarm.id)}
          className="text-zinc-300 dark:text-zinc-600 hover:text-red-400 dark:hover:text-red-500 transition-colors text-lg leading-none"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
