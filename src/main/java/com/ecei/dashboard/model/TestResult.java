package com.ecei.dashboard.model;

public class TestResult {
    private String scenarioName;
    private String status;
    private long durationMs;
    private String errorMessage;

    public TestResult() {
    }

    public TestResult(String scenarioName, String status, long durationMs, String errorMessage) {
        this.scenarioName = scenarioName;
        this.status = status;
        this.durationMs = durationMs;
        this.errorMessage = errorMessage;
    }

    public String getScenarioName() {
        return scenarioName;
    }

    public void setScenarioName(String scenarioName) {
        this.scenarioName = scenarioName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public long getDurationMs() {
        return durationMs;
    }

    public void setDurationMs(long durationMs) {
        this.durationMs = durationMs;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}