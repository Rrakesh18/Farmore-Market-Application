package com.farmore.market.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.farmore.market.model.User;
import com.farmore.market.repository.UserRepository;
@Service

public class AuthServiceImpl implements AuthService 
{
	@Autowired
	private UserRepository userrepository;

	@Override
	public User registerUser(User user)
	{
		if(userrepository.findByEmail(user.getEmail()).isPresent())
		{
			throw new RuntimeException("Email address is already taken ");
		}
		return userrepository.save(user);
		
		
	}

	@Override
	public Optional<User> loginUser(User loginDetailes) 
	{
		Optional<User> userOptional=userrepository.findByEmail(loginDetailes.getEmail());
		if(userOptional.isPresent())
		{
			User user=userOptional.get();
			if(user.getPassword().equals(loginDetailes.getPassword()))
			{
				return userOptional;
			}
		}
		
		return Optional.empty();
	}

	

}
