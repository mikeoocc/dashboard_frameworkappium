"use client";

import { useCallback, useEffect, useState } from "react";
import { STREAM_URL, fetchResults } from "@/lib/api";
import type { TestResult } from "@/lib/types";

// Estado de la conexión SSE
export type ConnectionState = "connecting" | "live" | "offline";

// Tipo de retorno del hook
type UseTestResults = {
  results: TestResult[];
  connection: ConnectionState;
  error: string | null;
  reload: () => void;
};

// Hook que carga los resultados via REST y los mantiene actualizados via SSE
export const useTestResults = (): UseTestResults => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [connection, setConnection] = useState<ConnectionState>("connecting");
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  useEffect(() => {
    let cancelled = false;
    fetchResults()
      .then((data) => {
        if (!cancelled) {
          setResults(data);
          setError(null);
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load results");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  useEffect(() => {
    const source = new EventSource(STREAM_URL);

    source.onopen = () => setConnection("live");

    source.addEventListener("result", (event) => {
      try {
        const scenario: TestResult = JSON.parse((event as MessageEvent).data);
        setResults((prev) => {
          const withoutDup = prev.filter((r) => r.id !== scenario.id);
          return [scenario, ...withoutDup];
        });
      } catch {
      }
    });

    source.onerror = () => {
      setConnection((prev) => (prev === "live" ? "connecting" : "offline"));
    };

    return () => {
      source.close();
    };
  }, [reloadKey]);

  return { results, connection, error, reload };
};
