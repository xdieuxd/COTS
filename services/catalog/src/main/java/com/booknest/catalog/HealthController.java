package com.booknest.catalog;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/catalog")
public class HealthController {
  @GetMapping("/ping")
  public Map<String, Object> ping() {
    return Map.of("service", "catalog", "status", "OK");
  }
}