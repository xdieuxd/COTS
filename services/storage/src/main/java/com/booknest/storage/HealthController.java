package com.booknest.storage;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/storage")
public class HealthController {
  @GetMapping("/ping")
  public Map<String, Object> ping() {
    return Map.of("service", "storage", "status", "OK");
  }
}