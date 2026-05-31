"use client";

import Link from "next/link";
import { useTestResults } from "@/hooks/useTestResults";
import { StatsBar } from "../components/StatsBar/page";
import { ScenarioCard } from "../components/ScenarioCard/page";
import "./page.css";

// Texto y clase CSS para cada estado de conexión SSE
const CONNECTION = {
  connecting: { text: "Connecting…", className: "connecting" },
  live: { text: "Live", className: "live" },
  offline: { text: "Offline", className: "offline" },
} as const;

// Página principal del dashboard con resultados en tiempo real
const ResultsPage = () => {
  const { results, connection, error, reload } = useTestResults();
  const status = CONNECTION[connection];

  return (
    <div className="resultsWrapper">
    <main className="resultsMain">
      <header className="resultsHeader">
        <div>
          <Link href="/home" className="backButton">← Home</Link>
          <h1 className="resultsTitle">Tests Executions</h1>
        </div>
        <div className="connectionStatus">
          <div className={`dot dot-${status.className}`} />
          <div>{status.text}</div>
        </div>
      </header>

      {error && (
        <div className="errorBanner">
          <div>{error} — El backend esta en el puerto 8080?</div>
          <button type="button" className="retryButton" onClick={reload}>
            Retry
          </button>
        </div>
      )}

      <div className="statsSection">
        <StatsBar results={results} />
      </div>

      {results.length === 0 ? (
        <p className="emptyState">
          Sin resultados todavía. Ejecuta tus pruebas!
        </p>
      ) : (
        <div className="resultsList">
          {results.map((scenario) => (
            <ScenarioCard key={scenario.id} scenario={scenario} />
          ))}
        </div>
      )}
    </main>
    </div>
  );
};

export default ResultsPage;
