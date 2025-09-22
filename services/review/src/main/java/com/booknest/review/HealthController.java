package com.booknest.review;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/review")
public class HealthController {
  @GetMapping("/ping")
  public Map<String, Object> ping() {
    return Map.of("service", "review", "status", "OK");
  }
}