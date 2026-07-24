package com.jyothika.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jyothika.backend.entity.Document;
import com.jyothika.backend.repository.DocumentRepository;

@Service
public class DocumentService {

    private final DocumentRepository repository;

    public DocumentService(DocumentRepository repository){
        this.repository=repository;
    }

    public Document save(Document document){
        return repository.save(document);
    }

    public List<Document> getAll(){
        return repository.findAll();
    }

    public Document getById(Long id){
        return repository.findById(id).orElse(null);
    }

}