package com.jyothika.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name="documents")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String content;

    public Document(){}

    public Document(String fileName,String content){
        this.fileName=fileName;
        this.content=content;
    }

    public Long getId(){
        return id;
    }

    public String getFileName(){
        return fileName;
    }

    public String getContent(){
        return content;
    }

    public void setFileName(String fileName){
        this.fileName=fileName;
    }

    public void setContent(String content){
        this.content=content;
    }

}