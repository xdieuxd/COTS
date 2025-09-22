package com.booknest.auth.repo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.booknest.auth.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByEmail(String email);
}