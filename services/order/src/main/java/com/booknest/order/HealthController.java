package com.booknest.order;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/order")
public class HealthController {
  @GetMapping("/ping")
  public Map<String, Object> ping() {
    return Map.of("service", "order", "status", "OK");
  }
}