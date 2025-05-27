package com.focusr.Precot.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.focusr.Precot.exception.ResourceNotFoundException;
import com.focusr.Precot.mssql.database.model.User;
import com.focusr.Precot.mssql.database.repository.UserRepository;

import org.springframework.transaction.annotation.Transactional;

/**
 * Created by FocusR on 29-Sep-2019.
 */

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	UserRepository userRepository;

	@Override
	@Transactional(transactionManager = "sqlServerTransactionManager")
	public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
		// Let people login with either username or email
		User user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail).orElseThrow(
				() -> new UsernameNotFoundException("User not found with username or email : " + usernameOrEmail));

//        if('Y' != user.getIs_Active()) {
//        	throw new UsernameNotFoundException("User is not active : " + usernameOrEmail);
//        }

		return UserPrincipal.create(user);
	}

	@Transactional(transactionManager = "sqlServerTransactionManager")
	public UserDetails loadUserById(Long id) {
		User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

		return UserPrincipal.create(user);
	}
}