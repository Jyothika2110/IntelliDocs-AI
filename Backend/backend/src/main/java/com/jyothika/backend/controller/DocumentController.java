package com.jyothika.backend.controller;
import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jyothika.backend.dto.QuestionRequest;
import com.jyothika.backend.dto.UploadResponse;
import com.jyothika.backend.entity.ChatMessage;
import com.jyothika.backend.service.ChatService;
import com.jyothika.backend.service.DocumentMemoryService;
import com.jyothika.backend.service.DocumentService;
import com.jyothika.backend.service.GeminiService;
import com.jyothika.backend.util.PdfUtil;
@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    @Autowired
    private GeminiService geminiService;
    @Autowired
private DocumentService documentService;
    @Autowired
private DocumentMemoryService documentMemoryService;
@Autowired
private ChatService chatService;
    @PostMapping("/upload")
    public ResponseEntity<?> uploadPdf(@RequestParam("file") MultipartFile file) {

        System.out.println("===== CONTROLLER HIT =====");

        try {

            System.out.println("File Name: " + file.getOriginalFilename());

            // Create uploads folder
            String uploadPath = System.getProperty("user.dir")
                    + File.separator + "uploads";

            File uploadDir = new File(uploadPath);

            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            // Save uploaded file
            File destination = new File(uploadDir, file.getOriginalFilename());

            System.out.println("Saving File To:");
            System.out.println(destination.getAbsolutePath());

            file.transferTo(destination);

            // Extract PDF text
            String pdfText = PdfUtil.extractText(destination);
            documentMemoryService.saveDocument(pdfText);
            System.out.println("========== PDF CONTENT ==========");
            System.out.println(pdfText);
            System.out.println("=================================");

            // Send extracted text to AI
            String aiResponse = geminiService.askGemini(pdfText);

            System.out.println("========== AI RESPONSE ==========");
            System.out.println(aiResponse);
            System.out.println("=================================");

            System.out.println("UPLOAD SUCCESSFUL!");

            return ResponseEntity.ok(
                    new UploadResponse(
                            "Upload Successful",
                            file.getOriginalFilename(),
                            aiResponse));

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.internalServerError()
                    .body(new UploadResponse(
                            e.toString(),
                            "",
                            ""));
        }
    }
    @PostMapping("/ask")
public ResponseEntity<?> askQuestion(@RequestBody QuestionRequest request) {

    try {

        String document = documentMemoryService.getDocument();

        if (document == null || document.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("Please upload a PDF first.");
        }

        String answer = geminiService.askQuestion(
        document,
        request.getQuestion());

chatService.saveChat(
        request.getQuestion(),
        answer);

return ResponseEntity.ok(answer);
    } catch (Exception e) {

        e.printStackTrace();

        return ResponseEntity.internalServerError()
                .body(e.getMessage());
    }
}
@GetMapping("/history")
public ResponseEntity<List<ChatMessage>> getHistory() {

    return ResponseEntity.ok(
            chatService.getAllChats());

}
@GetMapping("/pdf/{fileName}")
public ResponseEntity<Resource> getPdf(@PathVariable String fileName) throws Exception {

    Path path = Paths.get(System.getProperty("user.dir"), "uploads", fileName);

    Resource resource = new UrlResource(path.toUri());

    if (!resource.exists()) {
        return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_PDF)
            .body(resource);
}
@DeleteMapping("/history/{id}")
public ResponseEntity<?> deleteChat(@PathVariable Long id) {

    chatService.deleteChat(id);

    return ResponseEntity.ok("Deleted Successfully");

}
@DeleteMapping("/history/{id}")
public ResponseEntity<?> deleteChat(@PathVariable Long id) {

    chatService.deleteChat(id);

    return ResponseEntity.ok("Deleted Successfully");

}

@DeleteMapping("/history")
public ResponseEntity<?> clearAllChats() {

    chatService.clearAllChats();

    return ResponseEntity.ok("All chats deleted");

}
}

