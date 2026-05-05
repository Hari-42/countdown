"use client";

export default function Notch({ tabs, active, onChange }) {
  const activeIndex = tabs.indexOf(active);

  return (
    <div className="relative flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-full p-1">
      {/* Sliding pill */}
      <div
        className="absolute top-1 bottom-1 rounded-full bg-zinc-900 dark:bg-zinc-100 shadow-sm transition-transform duration-300 ease-in-out"
        style={{
          width: `calc(${100 / tabs.length}% - 4px)`,
          transform: `translateX(calc(${activeIndex * 100}% + ${activeIndex * 4}px))`,
        }}
      />

      {/* Tab buttons */}
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`relative z-10 flex-1 px-5 py-1.5 text-sm font-semibold transition-colors duration-300 ${
            active === tab
              ? "text-white dark:text-zinc-900"
              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
