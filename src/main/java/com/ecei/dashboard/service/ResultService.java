package com.ecei.dashboard.service;

import com.ecei.dashboard.model.TestResult;
import com.ecei.dashboard.model.TestStep;
import com.ecei.dashboard.repository.TestResultRepository;
import java.time.Instant;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ResultService {

    public static final String EVENT_NEW_RESULT = "result";

    private final TestResultRepository repository;
    private final SseService sseService;

    public ResultService(TestResultRepository repository, SseService sseService) {
        this.repository = repository;
        this.sseService = sseService;
    }

    @Transactional
    public TestResult record(TestResult incoming) {
        normalize(incoming);
        TestResult saved = repository.save(incoming);
        sseService.broadcast(EVENT_NEW_RESULT, saved);
        return saved;
    }

    @Transactional(readOnly = true)
    public List<TestResult> findAll() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "createdAt", "id"));
    }
    private void normalize(TestResult result) {
        if (result.getCreatedAt() == null) {
            result.setCreatedAt(Instant.now());
        }
        result.setStatus(normalizeStatus(result.getStatus()));

        List<TestStep> steps = result.getSteps();
        if (steps != null) {
            for (int i = 0; i < steps.size(); i++) {
                TestStep step = steps.get(i);
                step.setTestResult(result);
                step.setStepOrder(i);
                step.setStatus(normalizeStatus(step.getStatus()));
            }
        }
    }

    private String normalizeStatus(String status) {
        return status == null ? "UNKNOWN" : status.trim().toUpperCase();
    }
}
