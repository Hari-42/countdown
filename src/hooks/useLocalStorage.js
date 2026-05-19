"use client";

import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [stored, setStored] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(stored));
    } catch {
      // Storage voll oder blockiert — still fail
    }
  }, [key, stored]);

  return [stored, setStored];
}
