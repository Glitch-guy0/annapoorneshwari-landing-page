import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { logger, subscribeToDevLogs, type DevLogEntry } from "@/lib/logger";
import { cn } from "@/lib/utils";

const LEVEL_STYLES: Record<DevLogEntry["level"], string> = {
  debug: "text-emerald-200/80",
  info: "text-sky-200",
  warn: "text-amber-200",
  error: "text-rose-300",
};

function DevLogPanel() {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<DevLogEntry[]>([]);

  useEffect(() => subscribeToDevLogs((entry) => {
    setEntries((previous) => [...previous.slice(-39), entry]);
  }), []);

  return (
    <div className="fixed bottom-4 left-4 z-[90] flex max-w-[calc(100vw-2rem)] flex-col items-start gap-2 font-mono">
      {open ? (
        <div className="w-[min(420px,calc(100vw-2rem))] overflow-hidden rounded-lg border border-white/10 bg-ink text-xs shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 text-[11px] uppercase tracking-wider text-white/60">
            <span>Dev log · {entries.length}</span>
            <button
              type="button"
              onClick={() => setEntries([])}
              className="rounded px-2 py-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              Clear
            </button>
          </div>
          <ul className="max-h-72 overflow-y-auto p-2">
            {entries.length === 0 ? (
              <li className="px-2 py-3 text-white/50">No log entries yet.</li>
            ) : (
              entries.map((entry) => (
                <li key={entry.id} className="flex gap-2 px-2 py-1 leading-relaxed">
                  <span className="shrink-0 text-white/35">{entry.timestamp}</span>
                  <span className={cn("min-w-0 break-words", LEVEL_STYLES[entry.level])}>
                    {entry.message}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        className="rounded-full border border-white/15 bg-ink px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/85 shadow-lg transition-colors hover:bg-brand"
        aria-expanded={open}
      >
        {open ? "Hide dev log" : "Dev log"}
      </button>
    </div>
  );
}

/** Mounted only in development, from a guarded dynamic import in main.tsx. */
export function mountDevLogPanel() {
  const host = document.createElement("div");
  host.id = "dev-log-panel";
  document.body.appendChild(host);
  createRoot(host).render(<DevLogPanel />);
  logger.step("dev:panel", "On-screen development log mounted");
}
