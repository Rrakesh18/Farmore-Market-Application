package com.farmore.market.service;
import com.farmore.market.model.User;
import com.farmore.market.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
@Service
public class AuthServiceImpl implements AuthService {
    @Autowired private UserRepository userRepository;
    @Override
    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email address is already taken!");
        }
        return userRepository.save(user);
    }
    @Override
    public Optional<User> loginUser(User loginDetails) {
        return userRepository.findByEmail(loginDetails.getEmail())
            .filter(user -> user.getPassword().equals(loginDetails.getPassword()));
    }
}
