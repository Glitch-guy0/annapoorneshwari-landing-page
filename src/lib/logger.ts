export type LogLevel = "debug" | "info" | "warn" | "error";

export type DevLogEntry = {
  id: number;
  level: LogLevel;
  message: string;
  data?: unknown;
  timestamp: string;
};

const isDev = import.meta.env.DEV;
const subscribers = new Set<(entry: DevLogEntry) => void>();
let nextId = 1;

function notify(entry: Omit<DevLogEntry, "id" | "timestamp">) {
  if (!isDev || subscribers.size === 0) return;

  const enriched: DevLogEntry = {
    ...entry,
    id: nextId,
    timestamp: new Date().toLocaleTimeString(),
  };
  nextId += 1;
  subscribers.forEach((subscriber) => subscriber(enriched));
}

/** Subscribe to development log entries (used by the on-screen dev panel). */
export function subscribeToDevLogs(listener: (entry: DevLogEntry) => void) {
  subscribers.add(listener);
  return () => {
    subscribers.delete(listener);
  };
}

/**
 * Development-only logging.
 *
 * `import.meta.env.DEV` is statically replaced by Vite, so every branch that
 * uses it is removed from production bundles. `warn` and `error` are kept in
 * production because they surface genuine runtime problems.
 */
export const logger = {
  debug(message: string, data?: unknown) {
    if (!isDev) return;
    console.debug(`%c[tours:dev] ${message}`, "color:#6b8a7a;font-weight:600", data ?? "");
    notify({ level: "debug", message, data });
  },

  info(message: string, data?: unknown) {
    if (!isDev) return;
    console.info(`%c[tours:dev] ${message}`, "color:#355c49;font-weight:600", data ?? "");
    notify({ level: "info", message, data });
  },

  /** Record a workflow step so the dev console reads like a trace. */
  step(step: string, detail?: string, data?: unknown) {
    if (!isDev) return;
    const message = detail ? `${step} — ${detail}` : step;
    console.debug(`%c[tours:step] ${message}`, "color:#8a6d3b;font-weight:600", data ?? "");
    notify({ level: "debug", message, data });
  },

  event(name: string, data?: unknown) {
    if (!isDev) return;
    console.debug(`%c[tours:event] ${name}`, "color:#537a91;font-weight:600", data ?? "");
    notify({ level: "info", message: `event: ${name}`, data });
  },

  warn(message: string, data?: unknown) {
    console.warn(`[tours] ${message}`, data ?? "");
    notify({ level: "warn", message, data });
  },

  error(message: string, data?: unknown) {
    console.error(`[tours] ${message}`, data ?? "");
    notify({ level: "error", message, data });
  },
};
