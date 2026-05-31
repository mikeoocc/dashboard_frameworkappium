package com.ecei.dashboard.controller;

import com.ecei.dashboard.model.TestResult;
import com.ecei.dashboard.service.ResultService;
import com.ecei.dashboard.service.SseService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController // Le decimos a spring que la clase responde a perticiones HTTP con JSON
@RequestMapping("/results") // Indicamos que todas las peticiones HTTP que lleguen a /results las gestione esta clase
@CrossOrigin(origins = "http://localhost:3000") // Indicamos que el backend solo reciba peticiones del frontend en este dominio
public class TestResultController {

    // resultService guarda en la BDD y emite por SSE, sseService gestiona la respectiva conexion
    private final ResultService resultService;
    private final SseService sseService;

    public TestResultController(ResultService resultService, SseService sseService) {
        this.resultService = resultService;
        this.sseService = sseService;
    }

    // LLegan los resultados desde el framework de automatizacion, los guarda en H2, emite por SSE y devuelve el resultado con HTTP
    @PostMapping
    public ResponseEntity<TestResult> saveResult(@RequestBody TestResult result) {
        TestResult saved = resultService.record(result);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // Muestra todos los resultados anteriores del más reciente al más antigup
    @GetMapping
    public List<TestResult> getResults() {
        return resultService.findAll();
    }

    // Conecta aquí el frontend y se queda escuchando para cada vez que llegue un resultado nuevo
    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter stream() {
        return sseService.subscribe();
    }
}
