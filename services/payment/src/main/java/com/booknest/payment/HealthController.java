package com.booknest.payment;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class HealthController {
  @GetMapping("/ping")
  public Map<String, Object> ping() {
    return Map.of("service", "payment", "status", "OK");
  }
}