package com.jyothika.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jyothika.backend.entity.ChatMessage;
import com.jyothika.backend.repository.ChatRepository;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    public ChatMessage saveChat(String question, String answer) {

        ChatMessage chat = new ChatMessage(question, answer);

        return chatRepository.save(chat);

    }

    public List<ChatMessage> getAllChats() {

        return chatRepository.findAll();

    }

    public void deleteChat(Long id) {

        chatRepository.deleteById(id);

    }

    public void clearAllChats() {

        chatRepository.deleteAll();

    }

}