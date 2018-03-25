package edu.harvard.h2ms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.harvard.h2ms.domain.core.User;
import edu.harvard.h2ms.repository.UserRepository;

@Service("registrationService")
public class RegistrationService {

	
	@Autowired
	private UserRepository userRepository;
	
	public void savePassword(String userEmail, String password) {
		User user = userRepository.findByEmail(userEmail); 
		user.setPassword("password");
	}
}
