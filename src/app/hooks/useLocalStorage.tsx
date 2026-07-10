"use client";

import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [localValue, setLocalValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(localValue));
  }, [key, localValue]);

  return [localValue, setLocalValue] as const;
}

export default useLocalStorage;
