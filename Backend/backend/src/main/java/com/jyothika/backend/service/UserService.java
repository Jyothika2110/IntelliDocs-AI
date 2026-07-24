package com.jyothika.backend.service;

import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.jyothika.backend.entity.User;
import com.jyothika.backend.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository repository;

    private final BCryptPasswordEncoder encoder =
            new BCryptPasswordEncoder();

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public User register(User user) {

        user.setPassword(
                encoder.encode(user.getPassword()));

        return repository.save(user);

    }

    public Optional<User> login(String email,
                                String password) {

        Optional<User> user =
                repository.findByEmail(email);

        if (user.isPresent()
                && encoder.matches(password,
                        user.get().getPassword())) {

            return user;

        }

        return Optional.empty();

    }

}