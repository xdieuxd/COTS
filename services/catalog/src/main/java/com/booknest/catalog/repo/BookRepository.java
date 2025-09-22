package com.booknest.catalog.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.booknest.catalog.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {}



