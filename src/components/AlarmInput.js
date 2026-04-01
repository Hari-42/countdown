"use client";

export default function AlarmInput({ value, onChange, max, label }) {
  const clamp = (v) => Math.min(max, Math.max(0, v));

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      onChange(clamp(value + 1));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      onChange(clamp(value - 1));
    }
  };

  const handleChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, String(max).length);
    if (raw === "") {
      onChange(0);
    } else {
      onChange(clamp(parseInt(raw, 10)));
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={() => onChange(clamp(value + 1))}
        tabIndex={-1}
        className="w-9 h-7 flex items-center justify-center rounded text-zinc-400 dark:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors select-none"
      >
        ▲
      </button>
      <input
        type="text"
        inputMode="numeric"
        value={String(value).padStart(2, "0")}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={(e) => e.target.select()}
        className="w-14 text-center text-3xl font-mono font-bold bg-transparent outline-none text-zinc-900 dark:text-zinc-50 border-b-2 border-zinc-200 dark:border-zinc-700 focus:border-zinc-500 dark:focus:border-zinc-400 transition-colors py-0.5"
      />
      <button
        onClick={() => onChange(clamp(value - 1))}
        tabIndex={-1}
        className="w-9 h-7 flex items-center justify-center rounded text-zinc-400 dark:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors select-none"
      >
        ▼
      </button>
      <span className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">{label}</span>
    </div>
  );
}
