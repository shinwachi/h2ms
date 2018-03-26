package edu.harvard.h2ms.service;

import edu.harvard.h2ms.domain.core.User;
import edu.harvard.h2ms.repository.UserRepository;
import edu.harvard.h2ms.web.controller.PasswordController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service("userDetailsService")
public class UserDetailsServiceImpl implements UserDetailsService {
	
	final Logger log = LoggerFactory.getLogger(UserDetailsServiceImpl.class);
	
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findOneByEmail(username);
        
        if (user == null) {
            throw new UsernameNotFoundException(String.format("Unknown user: %s", username));
        } else {
            return user;
        }
    }
}
