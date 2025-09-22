package com.booknest.catalog.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.booknest.catalog.repo.BookRepository;
import com.booknest.catalog.model.Book;
import org.springframework.web.multipart.MultipartFile;
import com.booknest.catalog.service.StorageService;

@RestController
@RequestMapping("/api/books")
public class BookController {
  @Autowired BookRepository repo;
  @Autowired StorageService storage;

  @PostMapping(consumes = {"multipart/form-data"})
  public Book create(@RequestPart(value = "meta", required = false) Book meta, @RequestPart(value="file", required=false) MultipartFile file) throws Exception{
    if(meta == null) meta = new Book();
    if(file!=null){
      String url = storage.upload(file);
      meta.setPdfUrl(url);
    }
    return repo.save(meta);
  }

  @GetMapping
  public Iterable<Book> list(){ return repo.findAll(); }

  @GetMapping("/{id}")
  public Book get(@PathVariable Long id){ return repo.findById(id).orElseThrow(); }

  @PutMapping("/{id}")
  public Book update(@PathVariable Long id, @RequestBody Book body){
    Book b = repo.findById(id).orElseThrow();
    b.setTitle(body.getTitle()); b.setAuthor(body.getAuthor());
    return repo.save(b);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id){ repo.deleteById(id); }
}