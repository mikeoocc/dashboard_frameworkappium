package com.ecei.dashboard.controller;

import com.ecei.dashboard.model.TestResult;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/results")
@CrossOrigin(origins = "http://localhost:3000")
public class TestResultController {

    private final List<TestResult> results = new ArrayList<>();

    @PostMapping
    public void saveResult(@RequestBody TestResult result) {
        results.add(result);
    }

    @GetMapping
    public List<TestResult> getResults() {
        return results;
    }
}