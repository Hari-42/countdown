"use client";

export default function Notch({ tabs, active, onChange }) {
  return (
    <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-full p-1 gap-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
            active === tab
              ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow"
              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
