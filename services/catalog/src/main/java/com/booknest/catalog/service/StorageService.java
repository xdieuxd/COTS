package com.booknest.catalog.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import java.io.InputStream;

@Service
public class StorageService {
  private final MinioClient minio;
  private final String bucket = "books";
  public StorageService(){
    this.minio = MinioClient.builder().endpoint("http://localhost:9000").credentials("minioadmin","minioadmin").build();
  }
  public String upload(MultipartFile file) throws Exception{
    String objectName = System.currentTimeMillis()+"-"+file.getOriginalFilename();
    try(InputStream in = file.getInputStream()){
      minio.putObject(PutObjectArgs.builder().bucket(bucket).object(objectName).stream(in, file.getSize(), -1).contentType(file.getContentType()).build());
    }
    return "/storage/"+objectName; // adjust to real access URL
  }
}