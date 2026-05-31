import type { TestResult } from "@/lib/types";
import "./page.css";

type StatProps = {
  label: string;
  value: number;
  variant?: "statPassed" | "statFailed" | "statBlue";
};

// Tarjeta individual con un número grande y su etiqueta
const Stat = ({ label, value, variant }: StatProps) => {
  return (
    <div className="statCard">
      <div className={`statValue ${variant ?? ""}`}>{value}</div>
      <div className="statLabel">{label}</div>
    </div>
  );
};

// Barra de resumen que calcula y muestra las estadísticas globales de los tests
export const StatsBar = ({ results }: { results: TestResult[] }) => {
  const total = results.length;
  const passed = results.filter((r) => r.status === "PASSED").length;
  const failed = results.filter((r) => r.status === "FAILED").length;
  const other = total - passed - failed;
  const passRate = total > 0 ? Math.round((passed / total) * 100) : 0;

  return (
    <div className="statsBar">
      <Stat label="Total" value={total} />
      <Stat label="Passed" value={passed} variant="statPassed" />
      <Stat label="Failed" value={failed} variant="statFailed" />
      <Stat label="Other" value={other} />
      <Stat label="Pass %" value={passRate} variant="statBlue" />
    </div>
  );
};
