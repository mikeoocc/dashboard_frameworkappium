package com.ecei.dashboard.repository;

import com.ecei.dashboard.model.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestResultRepository extends JpaRepository<TestResult, Long> {
}
