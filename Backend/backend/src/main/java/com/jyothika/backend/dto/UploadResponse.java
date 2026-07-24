package com.jyothika.backend.dto;

public class UploadResponse {

    private String message;
    private String fileName;
    private String aiResponse;

    public UploadResponse() {
    }

    public UploadResponse(String message, String fileName, String aiResponse) {
        this.message = message;
        this.fileName = fileName;
        this.aiResponse = aiResponse;
    }

    public String getMessage() {
        return message;
    }

    public String getFileName() {
        return fileName;
    }

    public String getAiResponse() {
        return aiResponse;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setAiResponse(String aiResponse) {
        this.aiResponse = aiResponse;
    }
}