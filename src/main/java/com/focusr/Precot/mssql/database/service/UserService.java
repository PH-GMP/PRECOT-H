package com.focusr.Precot.mssql.database.service;
 
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
 
import org.slf4j.Logger;

import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

import com.focusr.Precot.exception.AppException;
import com.focusr.Precot.mssql.database.model.User;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.DeleteUserRequest;
import com.focusr.Precot.payload.PasswordUpdateRequest;
import com.focusr.Precot.payload.UserDTO;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.SCAUtil;
 
@Service

public class UserService {
 
	@Autowired

	private UserRepository usersRepository;

	@Autowired

	PasswordEncoder passwordEncoder;

	Logger logger = LoggerFactory.getLogger(UserRepository.class);
 
	public List<User> findAllProjects(String username) {

		return usersRepository.findListOfUsers();

	}

	public void deleteUserById(long id) {
 
		User user = usersRepository.findById(id).orElseThrow(() -> new AppException("User does not exist."));

//		user.setIs_Active('N');

		usersRepository.save(user);

	}

	public Optional findUserByResetToken(String resetToken) {

		return usersRepository.findByResetToken(resetToken);

	}

 
	public ResponseEntity<?> activeOrInactiveUser(DeleteUserRequest deleteRequest) {
 
		SCAUtil prUtil = new SCAUtil();

		Long user_id = deleteRequest.getId();

		char activeOrInactive = deleteRequest.getIs_Active();

		try {
 
			User user = usersRepository.findUserByIdToActiveOrInactive(user_id);

			if(user == null) {

				return new ResponseEntity(new ApiResponse(false, "User does not exist" ),

						HttpStatus.BAD_REQUEST);

			}

			user.setIs_Active(activeOrInactive);

			usersRepository.save(user);

		} catch (Exception e) {
 
			logger.error("***************** Unable to Active/Inactive the user!  *********************\n" + e);
 
			String msg = prUtil.getErrorMessage(e);
 
			return new ResponseEntity(new ApiResponse(false, "Unable to Active/Inactive the user!" + msg),

					HttpStatus.BAD_REQUEST);

		}
 
		return new ResponseEntity(new ApiResponse(true, AppConstants.Success_Message), HttpStatus.OK);
 
	}

	 public List<UserDTO> getUserDetails() {

	        return userRepository.findUserDetails();

	    }



	@Autowired

	private UserRepository userRepository;
 
	public boolean updatePassword(Long userId, PasswordUpdateRequest request) {

		User user = userRepository.findById(userId).orElse(null);

		if (user != null && request.getNewPassword().equals(request.getConfirmPassword())) {

			user.setPassword(passwordEncoder.encode(request.getNewPassword()));

			userRepository.save(user);

			return true;

		}

		return false;

	}
 
	public void deleteAll()

	{

		userRepository.deleteAll();

	}
 
	public List<User> getAll() {

		return userRepository.findAll();

	}
	
	public ResponseEntity<?> fetchQualityByDept(String department) {
		
		List<User> qualityList = new ArrayList<>();
		
		try {
			
			Long deptId = userRepository.fetchDepartment(department);
			
			qualityList = userRepository.getQAByDepartment(deptId);
			
			
		} catch(Exception e) {
			SCAUtil sca = new SCAUtil();
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to get " + msg), HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(qualityList, HttpStatus.OK);
		
	}
	
	public ResponseEntity<?> fetchQualityByHOD(String department) {
		
		List<User> qualityList = new ArrayList<>();
		
		try {
			
			Long deptId = userRepository.fetchDepartment(department);
			
			qualityList = userRepository.getHODByDepartment(deptId);
			
			
		} catch(Exception e) {
			SCAUtil sca = new SCAUtil();
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to get HOD by department " + msg), HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(qualityList, HttpStatus.OK);
		
	}
	
	public ResponseEntity<?> getRoleDetails(Long departmentId) {
		List<String> details = new ArrayList<>();

 
		try {
 
			details = usersRepository.getUsernamesByDepartmentId(departmentId);
 
			 List<Map<String, String>> userDetails = new ArrayList<>();
	            for (String username : details) {
	                Map<String, String> userMap = new HashMap<>();
	                userMap.put("username", username);
	                userDetails.add(userMap);
	            }
 
	            return new ResponseEntity<>(userDetails, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Role Details : " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	
	//kaviya
		public ResponseEntity<?> getSupervisor(Long departmentId) {
			List<String> details = new ArrayList<>();
	 
	 
			try {
	 
				details = usersRepository.getSupervisorByDepartmentId(departmentId);
	 
				 List<Map<String, String>> userDetails = new ArrayList<>();
		            for (String username : details) {
		                Map<String, String> userMap = new HashMap<>();
		                userMap.put("username", username);
		                userDetails.add(userMap);
		            }
	 
		            return new ResponseEntity<>(userDetails, HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity<>("Error Getting Role Details : " + e.getMessage(),
						HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	 
		public ResponseEntity<?> getHod(Long departmentId) {
			List<String> details = new ArrayList<>();
	 
	 
			try {
	 
				details = usersRepository.getHodByDepartmentId(departmentId);
	 
				 List<Map<String, String>> userDetails = new ArrayList<>();
		            for (String username : details) {
		                Map<String, String> userMap = new HashMap<>();
		                userMap.put("username", username);
		                userDetails.add(userMap);
		            }
	 
		            return new ResponseEntity<>(userDetails, HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity<>("Error Getting Role Details : " + e.getMessage(),
						HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		
		
		
		
		 public ResponseEntity<?> getUsersByDepartment( String department) {
		        List<Map<String, String>> userList = new ArrayList<>();

		        try {
		            Long deptId = userRepository.fetchDepartment(department);
		            List<Object[]> results = userRepository.getUsersByDepartment(deptId);

		            for (Object[] result : results) {
		                Map<String, String> userMap = new HashMap<>();
		                userMap.put("username", (String) result[0]);
		                userMap.put("name", (String) result[1]);
		                userMap.put("role", (String) result[2]);
		                userList.add(userMap);
		            }

		            return new ResponseEntity<>(userList, HttpStatus.OK);

		        } catch (Exception e) {
		            SCAUtil sca = new SCAUtil();
		            String msg = sca.getErrorMessage(e);
		            return new ResponseEntity<>(new ApiResponse(false, "Unable to get " + msg), HttpStatus.BAD_REQUEST);
		        }
		    }
	 
		 
		 // STORE 
		 
			public List<String> getAllUsernames() {
				return userRepository.findAllUsernames();
			}

			public List<String> getUsernamesByRole(String roleName) {
				return userRepository.findUsernamesByRole(roleName);
			}

			public List<String> getUsernamesByDepartmentAndRole() {
				return userRepository.findUsernamesByDepartmentAndRole();
			}
		 
		 
		 // QC
			
			public ResponseEntity<?> getRoles(String department) {
				List<Map<String, String>> userList = new ArrayList<>();

				try {
					Long deptId = userRepository.fetchDepartment(department);
					List<Object[]> results = userRepository.getUsers(deptId);

					for (Object[] result : results) {
						Map<String, String> userMap = new HashMap<>();
						userMap.put("username", (String) result[0]);
						userMap.put("name", (String) result[1]);
						userMap.put("role", (String) result[2]);
						userList.add(userMap);
					}

					return new ResponseEntity<>(userList, HttpStatus.OK);

				} catch (Exception e) {
					SCAUtil sca = new SCAUtil();
					String msg = sca.getErrorMessage(e);
					return new ResponseEntity<>(new ApiResponse(false, "Unable to get " + msg), HttpStatus.BAD_REQUEST);
				}
			}
		 
		 
}
