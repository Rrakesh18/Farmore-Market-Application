package com.farmore.market.service;
import com.farmore.market.model.User;
import java.util.Optional;
public interface AuthService {
    User registerUser(User user);
    Optional<User> loginUser(User loginDetails);
}
