package com.booknest.auth.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import com.booknest.auth.repo.UserRepository;
import com.booknest.auth.model.User;
import com.booknest.auth.security.JwtUtil;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired UserRepository userRepo;
  @Autowired JwtUtil jwtUtil;
  BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

  @PostMapping("/register")
  public Map<String, Object> register(@RequestBody Map<String,String> body) {
    String email = body.get("email");
    String password = body.get("password");
    if(email == null || password == null) throw new RuntimeException("Missing email/password");
    if(userRepo.findByEmail(email).isPresent()) throw new RuntimeException("Email exists");
    User u = new User();
    u.setEmail(email);
    u.setPassword(encoder.encode(password));
    u.setFullName(body.getOrDefault("fullName",""));
    userRepo.save(u);
    String token = jwtUtil.generateToken(email);
    return Map.of("token", token);
  }

  @PostMapping("/login")
  public Map<String,String> login(@RequestBody Map<String,String> b){
    String email = b.get("email");
    String password = b.get("password");
    if(email == null || password == null) throw new RuntimeException("Missing email/password");
    User u = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("Invalid"));
    if(!encoder.matches(password, u.getPassword())) throw new RuntimeException("Invalid");
    return Map.of("token", jwtUtil.generateToken(u.getEmail()));
  }
}