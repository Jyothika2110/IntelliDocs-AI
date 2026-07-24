package com.jyothika.backend.service;

import org.springframework.stereotype.Service;

@Service
public class DocumentMemoryService {

    private String documentText = "";

    public void saveDocument(String text) {
        this.documentText = text;
    }

    public String getDocument() {
        return documentText;
    }
}