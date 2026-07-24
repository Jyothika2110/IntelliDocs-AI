package com.jyothika.backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GeminiService {

    @Value("${groq.api.key}")
    private String apiKey;

    public String askGemini(String prompt) {

        String url = "https://api.groq.com/openai/v1/chat/completions";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        Map<String, Object> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", prompt);

        Map<String, Object> body = new HashMap<>();
        body.put("model", "llama-3.3-70b-versatile");
        body.put("messages", List.of(message));
        body.put("temperature", 0.3);
        body.put("max_tokens", 1024);

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(body, headers);

        ResponseEntity<String> response =
                restTemplate.postForEntity(url, request, String.class);

        JSONObject json = new JSONObject(response.getBody());

        JSONArray choices = json.getJSONArray("choices");

        return choices
                .getJSONObject(0)
                .getJSONObject("message")
                .getString("content");
    }

    public String askQuestion(String document, String question) {

                String prompt = """
        You are IntelliDocs AI.

        Rules:
        - Answer ONLY from the document.
        - If the answer is not found, say:
        "This information is not available in the uploaded document."
        - Format answers using Markdown.
        - Use headings, bullet points, and tables whenever appropriate.
        - Keep answers clear and concise.

        DOCUMENT:
        %s

        QUESTION:
        %s
        """.formatted(document, question);

        return askGemini(prompt);
    }
}