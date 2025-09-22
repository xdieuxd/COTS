package com.booknest.catalog.model;

import jakarta.persistence.*;

@Entity
public class Book {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String title;
  private String author;
  private String coverUrl; // storage link
  private String pdfUrl;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getTitle() { return title; }
  public void setTitle(String title) { this.title = title; }
  public String getAuthor() { return author; }
  public void setAuthor(String author) { this.author = author; }
  public String getCoverUrl() { return coverUrl; }
  public void setCoverUrl(String coverUrl) { this.coverUrl = coverUrl; }
  public String getPdfUrl() { return pdfUrl; }
  public void setPdfUrl(String pdfUrl) { this.pdfUrl = pdfUrl; }
}
