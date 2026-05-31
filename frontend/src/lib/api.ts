import type { TestResult } from "./types";

// URL base del backend, configurable por variable de entorno
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

// Obtiene todos los resultados existentes de una vez via REST
export async function fetchResults(): Promise<TestResult[]> {
  const res = await fetch(`${API_BASE}/results`);
  if (!res.ok) {
    throw new Error(`Failed to load results: ${res.status}`);
  }
  return res.json();
}

// URL del endpoint SSE para recibir resultados en tiempo real
export const STREAM_URL = `${API_BASE}/results/stream`;
