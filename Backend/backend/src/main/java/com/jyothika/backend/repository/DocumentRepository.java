package com.jyothika.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jyothika.backend.entity.Document;

public interface DocumentRepository
        extends JpaRepository<Document,Long>{

}