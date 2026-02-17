package com.farmore.market.service;

import com.farmore.market.model.User;
import java.util.Map;

public interface AuthService {
    User registerUser(Map<String, Object> request);
    User loginUser(Map<String, String> credentials);
}
