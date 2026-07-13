"use client";

import { Log } from "../(root)/types";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContext, createContext } from "react";

type LogsContextType = {
  logs: Log[];
  addLog: (item: Omit<Log, "id">) => void;
  removeLog: (id: string) => void;
  clearAllLogs: () => void;
};

const LogsContext = createContext<LogsContextType | null>(null);

export function LogsProvider({ children }: { children: React.ReactNode }) {
  const [logs, setLogs] = useLocalStorage<Log[]>("logs", []);

  const addLog = (item: Omit<Log, "id">) => {
    setLogs((prev) => [
      ...prev,
      {
        ...item,
        id: `${item.pair}-${item.time}`,
      },
    ]);
  };

  const removeLog = (id: string) => {
    setLogs((prev) => prev.filter((log) => log.id !== id));
  };

  const clearAllLogs = () => {
    setLogs([]);
  };

  return (
    <LogsContext
      value={{
        logs,
        addLog,
        removeLog,
        clearAllLogs,
      }}
    >
      {children}
    </LogsContext>
  );
}

export function useLogs() {
  const context = useContext(LogsContext);

  if (!context) {
    throw new Error("useLogs must be used within LogsProvider");
  }

  return context;
}
