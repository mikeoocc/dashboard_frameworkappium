"use client";

import { useState } from "react";
import { StatusBadge } from "../StatusBadge/page";
import type { TestResult } from "@/lib/types";
import "./page.css";

type Props = {
  scenario: TestResult;
};

// Convierte milisegundos a texto legible (ej: 250 ms, 1.25 s)
const formatDuration = (ms: number | null): string => {
  if (ms == null) return "—";
  if (ms < 1000) return `${ms} ms`;
  return `${(ms / 1000).toFixed(2)} s`;
};

// Convierte una fecha ISO-8601 a formato local legible
const formatTime = (iso: string): string => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleString();
};

// Tarjeta expandible que muestra un escenario con todos sus pasos
export const ScenarioCard = ({ scenario }: Props) => {
  const failed = scenario.status === "FAILED";
  const [open, setOpen] = useState(failed);

  return (
    <div className={`scenarioCard ${failed ? "scenarioCardFailed" : ""}`}>
      <button
        type="button"
        className="scenarioHeader"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <div className="scenarioCaret">{open ? "▾" : "▸"}</div>
        <StatusBadge status={scenario.status} />
        <div className="scenarioTitles">
          <div className="scenarioName">{scenario.scenarioName}</div>
          <div className="scenarioFeature">{scenario.featureName ?? "—"}</div>
        </div>
        <div className="scenarioMeta">
          <div>{formatDuration(scenario.durationMs)}</div>
          <div className="scenarioTime">{formatTime(scenario.createdAt)}</div>
        </div>
      </button>

      {open && (
        <div className="scenarioBody">
          {scenario.steps.length === 0 ? (
            <p className="scenarioNoSteps">No steps reported.</p>
          ) : (
            <ol className="scenarioSteps">
              {scenario.steps.map((step) => (
                <li key={step.id} className="scenarioStep">
                  <StatusBadge status={step.status} />
                  <div className="scenarioStepText">
                    <div className="scenarioKeyword">{step.keyword}</div>
                    {step.name}
                    {step.errorMessage && (
                      <div className="scenarioError">{step.errorMessage}</div>
                    )}
                  </div>
                  <div className="scenarioStepDuration">
                    {formatDuration(step.durationMs)}
                  </div>
                </li>
              ))}
            </ol>
          )}

          {scenario.errorMessage && (
            <div className="scenarioError">{scenario.errorMessage}</div>
          )}
        </div>
      )}
    </div>
  );
};
