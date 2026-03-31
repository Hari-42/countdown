"use client";

export default function CountdownInput({ value, onChange, max, label, disabled }) {
  const clamp = (v) => Math.min(max, Math.max(0, v));

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === "ArrowUp") {
      e.preventDefault();
      onChange(clamp(value + 1));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      onChange(clamp(value - 1));
    }
  };

  const handleChange = (e) => {
    if (disabled || !onChange) return;
    const raw = e.target.value.replace(/\D/g, "").slice(0, String(max).length);
    if (raw === "") {
      onChange(0);
    } else {
      onChange(clamp(parseInt(raw, 10)));
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={() => !disabled && onChange(clamp(value + 1))}
        disabled={disabled}
        className="w-10 h-8 flex items-center justify-center rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 transition-colors select-none text-lg disabled:opacity-30 disabled:cursor-not-allowed"
        tabIndex={-1}
      >
        ▲
      </button>
      <input
        type="text"
        inputMode="numeric"
        value={String(value).padStart(2, "0")}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={(e) => !disabled && e.target.select()}
        readOnly={disabled}
        className="w-20 text-center text-5xl font-mono font-bold bg-transparent border-b-2 border-zinc-300 dark:border-zinc-600 focus:border-zinc-800 dark:focus:border-zinc-200 outline-none transition-colors py-1 text-zinc-900 dark:text-zinc-50"
      />
      <button
        onClick={() => !disabled && onChange(clamp(value - 1))}
        disabled={disabled}
        className="w-10 h-8 flex items-center justify-center rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 transition-colors select-none text-lg disabled:opacity-30 disabled:cursor-not-allowed"
        tabIndex={-1}
      >
        ▼
      </button>
      <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
        {label}
      </span>
    </div>
  );
}
