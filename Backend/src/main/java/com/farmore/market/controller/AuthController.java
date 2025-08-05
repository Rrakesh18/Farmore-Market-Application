package com.farmore.market.controller;

import com.farmore.market.model.User;
import com.farmore.market.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        System.out.println("--- AuthController: Received registration request for email: " + user.getEmail());
        try {
            authService.registerUser(user);
            System.out.println("--- AuthController: Registration successful for: " + user.getEmail());
            return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            System.out.println("--- AuthController ERROR: Registration failed. Reason: " + e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody User loginDetails) {
        System.out.println("--- AuthController: Received login request for email: " + loginDetails.getEmail());
        Optional<User> userOptional = authService.loginUser(loginDetails);
        if (userOptional.isPresent()) {
            System.out.println("--- AuthController: Login successful for: " + loginDetails.getEmail());
            return ResponseEntity.ok(userOptional.get());
        } else {
            System.out.println("--- AuthController ERROR: Login failed for: " + loginDetails.getEmail());
            return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
        }
    }
}