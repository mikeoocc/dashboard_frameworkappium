import type { TestStatus } from "@/lib/types";
import "./page.css";

type Props = {
  status: TestStatus;
};

// Mapea cada estado a su clase CSS de color correspondiente
const CLASS_BY_STATUS: Record<TestStatus, string> = {
  PASSED: "badgePassed",
  FAILED: "badgeFailed",
  SKIPPED: "badgeSkipped",
  PENDING: "badgePending",
  UNDEFINED: "badgePending",
  UNKNOWN: "badgeSkipped",
};

// Muestra el estado del test como un pill de color
export const StatusBadge = ({ status }: Props) => {
  return (
    <div className={`badge ${CLASS_BY_STATUS[status] ?? "badgeSkipped"}`}>
      {status}
    </div>
  );
};
