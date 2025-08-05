package com.farmore.market.service;

import java.util.Optional;

import com.farmore.market.model.User;

public interface AuthService {

	User registerUser(User user);

	Optional<User> loginUser(User loginDetailes);

	


	

	

	

}
