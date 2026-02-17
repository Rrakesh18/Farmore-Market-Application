package com.farmore.market.service;

import com.farmore.market.model.Buyer;
import com.farmore.market.model.Farmer;
import com.farmore.market.model.User;
import com.farmore.market.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    
    @Override
    public User registerUser(Map<String, Object> request) {

        String role = request.get("role").toString();
        String name = request.get("name").toString();
        String email = request.get("email").toString();
        String password = request.get("password").toString();
        String village = request.get("village").toString();
        String phone = request.get("phone").toString();

        // 🔥 Check duplicate email
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists");
        }

        
        if ("farmer".equalsIgnoreCase(role)) {

            Farmer farmer = new Farmer();
            farmer.setName(name);
            farmer.setEmail(email);
            farmer.setPassword(passwordEncoder.encode(password));
            farmer.setVillage(village);
            farmer.setPhone(phone);

            if (request.get("landSize") != null) {
                farmer.setLandSize(
                        Double.valueOf(request.get("landSize").toString()));
            }

            if (request.get("experienceYears") != null) {
                farmer.setExperienceYears(
                        Integer.valueOf(request.get("experienceYears").toString()));
            }

            return userRepository.save(farmer);
        }

        
        if ("buyer".equalsIgnoreCase(role)) {

            Buyer buyer = new Buyer();
            buyer.setName(name);
            buyer.setEmail(email);
            buyer.setPassword(passwordEncoder.encode(password));
            buyer.setVillage(village);
            buyer.setPhone(phone);

            if (request.get("companyName") != null) {
                buyer.setCompanyName(request.get("companyName").toString());
            }

            if (request.get("businessType") != null) {
                buyer.setBusinessType(request.get("businessType").toString());
            }
            if (request.get("shippingAddress") != null) {
                buyer.setShippingAddress(request.get("shippingAddress").toString());
            }


            return userRepository.save(buyer);
        }

        throw new RuntimeException("Invalid role");
    }

   

    @Override
    public User loginUser(Map<String, String> credentials) {

        String email = credentials.get("email");
        String password = credentials.get("password");

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }
}
