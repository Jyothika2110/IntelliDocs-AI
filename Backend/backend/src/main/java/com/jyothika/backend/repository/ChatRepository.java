package com.jyothika.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jyothika.backend.entity.ChatMessage;

public interface ChatRepository extends JpaRepository<ChatMessage, Long> {

}