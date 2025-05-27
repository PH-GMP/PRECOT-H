package com.focusr.Precot.mssql.database.controller;

import java.net.URI;
import java.security.Principal;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.focusr.Precot.exception.AppException;
import com.focusr.Precot.exception.ResourceNotFoundException;
import com.focusr.Precot.mssql.database.model.PasswordHistory;
import com.focusr.Precot.mssql.database.model.Role;
import com.focusr.Precot.mssql.database.model.User;
import com.focusr.Precot.mssql.database.model.bleaching.Department;
import com.focusr.Precot.mssql.database.repository.PasswordHistoryRepository;
import com.focusr.Precot.mssql.database.repository.RoleRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.DepartmentRepository;
import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.mssql.database.service.UserService;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.DeleteUserRequest;
import com.focusr.Precot.payload.PasswordUpdateRequest;
import com.focusr.Precot.payload.UpdateUserRequest;
import com.focusr.Precot.payload.UserProfile;
import com.focusr.Precot.payload.UserResponse;
import com.focusr.Precot.payload.UserSummary;
import com.focusr.Precot.security.CurrentUser;
import com.focusr.Precot.security.UserPrincipal;

@RestController

@RequestMapping("/api/Users/Service")

public class UserController {

	@Autowired

	UserRepository userRepository;

	@Autowired

	private UserService userService;

	@Autowired
	private DepartmentRepository departmentRepository;

	@Autowired

	private MapValidationErrorService mapValidationErrorService;

	@Autowired

	PasswordEncoder passwordEncoder;

	@Autowired

	RoleRepository roleRepository;

	@Autowired
	PasswordHistoryRepository passwordHistoryRepository;

	// private static final Logger logger =

	// LoggerFactory.getLogger(UserController.class);

	@PutMapping("/{userId}/password")

	public ResponseEntity<String> updatePassword(@PathVariable Long userId,
			@RequestBody PasswordUpdateRequest request) {

		boolean success = userService.updatePassword(userId, request);

		if (success) {

			return ResponseEntity.ok("Password updated successfully.");

		} else {

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update password.");

		}

	}

	@GetMapping("/user/me")

	@PreAuthorize("hasRole('USER')")

	public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {

		UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(),

				currentUser.getName());

		return userSummary;

	}

	@GetMapping("/users/{username}")

	public UserProfile getUserProfile(@PathVariable(value = "username") String username) {

		User user = userRepository.findByUsername(username)

				.orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

//		 if('Y' != user.getIs_Active()) {

//	        	throw new UsernameNotFoundException("User is not active : " + username);

//	     }

		long pollCount = 0;// = pollRepository.countByCreatedBy(user.getId());

		long voteCount = 0;// voteRepository.countByUserId(user.getId());

		UserProfile userProfile = new UserProfile(user.getId(), user.getUsername(), user.getName(), pollCount,

				voteCount);

		return userProfile;

	}

	@GetMapping("/getListOfUsers")

	public List<User> getAllProjects(Principal principal) {

		List<User> listofUsers = userService.findAllProjects(principal.getName());

		return listofUsers;

	}

	private boolean restrictedPasswords(String password) {

		List<String> passwordList = Arrays.asList("Welcome@123", "Password@123", "Global@123", "Precot@123",
				"precot@123");
		return passwordList.contains(password.toLowerCase());
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })

	@PutMapping("/updateUserDetails")

	public ResponseEntity<?> updateUserDetails(@Valid @RequestBody UpdateUserRequest signUpRequest,

			BindingResult result) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);

		if (errorMap != null)

			return errorMap;

		User user = userRepository.findById(signUpRequest.getId()).orElseThrow(

				() -> new ResourceNotFoundException("User Id is does not exist!", "id", signUpRequest.getId()));

		// Validate email
		if (!isValidEmail(signUpRequest.getEmail())) {
			return new ResponseEntity(new ApiResponse(false, "Please enter a valid email address!"),
					HttpStatus.BAD_REQUEST);
		}

		// Check if username is already taken by another user
		if (!user.getUsername().equals(signUpRequest.getUsername())
				&& userRepository.existsByUsername(signUpRequest.getUsername())) {
			return new ResponseEntity(new ApiResponse(false, "Username is already taken!"), HttpStatus.BAD_REQUEST);
		}
		// Check if ROLE_HOD with the requested department ID already exists
//		if ("ROLE_HOD".equals(signUpRequest.getUserRoles())
//				&& userRepository.countUsersWithRoleHodAndDepartmentId(user.getDepartmentId()) > 0) {
//			return new ResponseEntity<>(new ApiResponse(false, "ROLE_HOD is already assigned to another user!"),
//					HttpStatus.BAD_REQUEST);
//		}

		ResponseEntity<?> passwordValidationResp = checkPasswordValidation(signUpRequest.getPassword());

		HttpStatus passwordValidationRespstatusCode = passwordValidationResp.getStatusCode();

		if (passwordValidationRespstatusCode != HttpStatus.OK) {

			return passwordValidationResp;

		}

		if (signUpRequest.getPassword() != null) {

			if (restrictedPasswords(signUpRequest.getPassword())) {
				return new ResponseEntity(
						new ApiResponse(false,
								signUpRequest.getPassword()
										+ " password is not allowed. Please use different password !!!"),
						HttpStatus.BAD_REQUEST);
			} else {
				user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
				user.setPasswordAt(new Date());
			}
		}

//		user.setFull_name(signUpRequest.getFull_name());

		if (signUpRequest.getUserRoles() != null) {

			Role userRole = roleRepository.findByName(signUpRequest.getUserRoles())

					.orElseThrow(() -> new AppException("User Role not set."));

			Set rolesMap = new HashSet();

			Role setRoles = new Role();

			setRoles.setId((long) userRole.getId());

			setRoles.setName(userRole.getName());

			user.setRoles(rolesMap);

			Set rolesMap1 = new HashSet();

			rolesMap1.add(userRole);

			user.setRoles(rolesMap1);

		}

		if (signUpRequest.getName() != null) {

			user.setName(signUpRequest.getName());

		}

		if (signUpRequest.getUsername() != null) {

			user.setUsername(signUpRequest.getUsername());

		}

//		if(signUpRequest.getOrgname()!=null) {

//			user.setOrgname(signUpRequest.getOrgname());

//		}

		Set<Department> departmentByUser = new HashSet<Department>();

		for (Long deptid : signUpRequest.getDepartmentId()) {

			Department departmentObj = departmentRepository.findByDepartmentById(deptid).get();

			departmentByUser.add(departmentObj);

		}

		user.setEmail(signUpRequest.getEmail());

		user.setIs_Active(signUpRequest.getIs_active());

		user.setDepartments(departmentByUser);

		User results = userRepository.save(user);

		// SAVE TO HISTORY

		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

//		PasswordHistory passwordHistory = new PasswordHistory();
//		passwordHistory.setPasswordHash(user.getPassword());
//		passwordHistory.setPasswordChangedDate(date);
//		passwordHistory.setUserId(user.getId());
//		passwordHistory.setPasswordAudit(results);
//		
//		passwordHistoryRepository.save(passwordHistory);

		URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/users/{username}")

				.buildAndExpand(results.getUsername()).toUri();

		return ResponseEntity.created(location).body(new ApiResponse(true, "User Updated successfully"));

	}

	@DeleteMapping("/delete/{userId}")

	public ResponseEntity<?> deleteUser(@PathVariable long userId, Principal principal) {

		userService.deleteUserById(userId);

		return new ResponseEntity<String>("User with ID: '" + userId + "' was deleted", HttpStatus.OK);

	}

	@DeleteMapping("/deleteAll")

	public ResponseEntity<?> deleteAll() {

		userService.deleteAll();

		return new ResponseEntity<String>("User details was deleted", HttpStatus.OK);

	}

	@PostMapping("/deleteUser")

	public ResponseEntity<?> activeOrInactiveUser(@Valid @RequestBody DeleteUserRequest deleteRequest,

			Principal principal) {

		return userService.activeOrInactiveUser(deleteRequest);

	}

	@GetMapping("/users/byName/{username}")

	public UserResponse getUserProfileByName(@PathVariable(value = "username") String username) {

		User user = userRepository.findByUsername(username)

				.orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

		// You can customize the response as needed based on the user object

		return new UserResponse(user.getId(), user.getUsername(), user.getName(), user.getEmail(), user.getRoles());

	}

	@GetMapping("/users/byRole/{roleName}")

	public List<UserResponse> getUserProfilesByRole(@PathVariable(value = "roleName") String roleName) {

		Role role = roleRepository.findByName(roleName)

				.orElseThrow(() -> new ResourceNotFoundException("Role", "roleName", roleName));

		List<User> usersWithRole = userRepository.findByRoleName(role);

		List<UserResponse> userResponses = new ArrayList<>();

		for (User user : usersWithRole) {

			// You can customize the response as needed based on the user object

			userResponses.add(new UserResponse(user.getId(), user.getUsername(), user.getName(), user.getEmail(),
					user.getRoles()));

		}

		return userResponses;

	}

	@GetMapping("/users/{userId}")

	public UserResponse getUserById(@PathVariable(value = "userId") Long userId) {

		User user = userRepository.findById(userId)

				.orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

		return new UserResponse(user.getUsername(), user.getName(), user.getEmail(), user.getRoles());

	}

	@GetMapping("/all")

	public ResponseEntity<List<User>> getAll() {

		List<User> UserList = userService.getAll();

		return ResponseEntity.ok().body(UserList);

	}

	@GetMapping("/getListOfRoles")
	public List<Role> getAllRoles(Principal principal) {
		List<Role> listofUsers = roleRepository.findAll();
		return listofUsers;
	}

	private boolean isValidEmail(String email) {
		// Modify the regular expression according to your desired email format
		String regex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
		return email.matches(regex);
	}

	private ResponseEntity<?> checkPasswordValidation(String str) {

		char ch;
		boolean capitalFlag = false;
		boolean lowerCaseFlag = false;
		boolean numberFlag = false;

		for (int i = 0; i < str.length(); i++) {
			ch = str.charAt(i);
			if (Character.isDigit(ch)) {
				numberFlag = true;
			} else if (Character.isUpperCase(ch)) {
				capitalFlag = true;
			} else if (Character.isLowerCase(ch)) {
				lowerCaseFlag = true;
			}

			if (numberFlag && capitalFlag && lowerCaseFlag) {
				Pattern my_pattern = Pattern.compile("[^a-z0-9 ]", Pattern.CASE_INSENSITIVE);
				Matcher my_match = my_pattern.matcher(str);
				boolean check = my_match.find();
				if (!check) {
					return new ResponseEntity(
							new ApiResponse(false, "Password must have atleast one special character!"),
							HttpStatus.BAD_REQUEST);
				}
				return new ResponseEntity(new ApiResponse(true, "Password validation success!"), HttpStatus.OK);
			}
		}
		if (!numberFlag) {
			return new ResponseEntity(new ApiResponse(false, "Password must have atleast one number!"),
					HttpStatus.BAD_REQUEST);
		}
		if (!capitalFlag) {
			return new ResponseEntity(new ApiResponse(false, "Password must have atleast one capital letter!"),
					HttpStatus.BAD_REQUEST);
		}

		if (!lowerCaseFlag) {
			return new ResponseEntity(new ApiResponse(false, "Password must have atleast one lower letter!"),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(false, "Password validation failed!"), HttpStatus.BAD_REQUEST);
	}

	// GET LIST OF HOD BY DEPT

	@GetMapping("/getBleachingHod")
	public ResponseEntity<?> getListOfHod(@RequestParam Map<String, String> requestParams, Principal principal) {

		String department = requestParams.get("department");

		ResponseEntity<?> resp = userService.fetchQualityByHOD(department);
		return resp;
	}

	@GetMapping("/getBleachingQA")
	public ResponseEntity<?> getListOfQA(@RequestParam Map<String, String> requestParams, Principal principal) {

		String department = requestParams.get("department");

		ResponseEntity<?> resp = userService.fetchQualityByDept(department);
		return resp;
	}

	@GetMapping("/getRoleDetails")
	public ResponseEntity<?> getRoleDetails(@RequestParam Long departmentId) {

		ResponseEntity<?> response = userService.getRoleDetails(departmentId);

		return response;
	}

	// kaviya
	// getSupervisor
	@GetMapping("/getSupervisor")
	public ResponseEntity<?> getSupervisor(@RequestParam Long departmentId) {

		ResponseEntity<?> response = userService.getSupervisor(departmentId);

		return response;
	}

	// getHod
	@GetMapping("/getHod")
	public ResponseEntity<?> getHod(@RequestParam Long departmentId) {

		ResponseEntity<?> response = userService.getHod(departmentId);

		return response;
	}

	// New

	@GetMapping("/getRoleBaseDepartmentNames")
	public ResponseEntity<?> getRoleBaseDepartmentNames(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String department = requestParams.get("department");

		ResponseEntity<?> resp = userService.getUsersByDepartment(department);
		return resp;
	}

	// QC

	@GetMapping("/getRoles")
	public ResponseEntity<?> getRoles(@RequestParam Map<String, String> requestParams, Principal principal) {

		String department = requestParams.get("department");

		ResponseEntity<?> resp = userService.getRoles(department);
		return resp;
	}

	// STORE

	@GetMapping("/usernames")
	public ResponseEntity<List<String>> getAllUsernames() {
		List<String> usernames = userService.getAllUsernames();
		return ResponseEntity.ok(usernames); // Return the list as a JSON response
	}

	@GetMapping("/users/role")
	public List<String> getUsernamesByRole(@RequestParam String role) {
		return userService.getUsernamesByRole(role);
	}

	@GetMapping("/QC/QA/Manager")
	public ResponseEntity<List<String>> getHodUsersForQualityDepartments() {
		List<String> usernames = userService.getUsernamesByDepartmentAndRole();
		return ResponseEntity.ok(usernames);
	}

}
