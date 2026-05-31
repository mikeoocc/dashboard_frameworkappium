// Estados posibles de un test o paso individual
export type TestStatus =
  | "PASSED"
  | "FAILED"
  | "SKIPPED"
  | "PENDING"
  | "UNDEFINED"
  | "UNKNOWN";

// Representa un paso individual dentro de un escenario
export type TestStep = {
  id: number;
  keyword: string | null;
  name: string;
  status: TestStatus;
  durationMs: number | null;
  errorMessage: string | null;
  stepOrder: number;
};

// Representa un escenario completo con sus pasos
export type TestResult = {
  id: number;
  featureName: string | null;
  scenarioName: string;
  status: TestStatus;
  durationMs: number | null;
  errorMessage: string | null;
  createdAt: string;
  steps: TestStep[];
};
