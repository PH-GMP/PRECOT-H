package com.focusr.Precot.mssql.database.controller;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.crypto.NoSuchPaddingException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
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
import com.focusr.Precot.mssql.database.repository.EmailDetailsRepository;
import com.focusr.Precot.mssql.database.repository.MsXoauthSMTPRepository;
import com.focusr.Precot.mssql.database.repository.PasswordHistoryRepository;
import com.focusr.Precot.mssql.database.repository.RoleRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.DepartmentRepository;
import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.mssql.database.service.RoleService;
import com.focusr.Precot.mssql.database.service.UserService;
import com.focusr.Precot.mssql.database.service.bleaching.BleachingService2;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApiResponseEmail;
import com.focusr.Precot.payload.JwtAuthenticationResponse;
import com.focusr.Precot.payload.LoginRequest;
import com.focusr.Precot.payload.SignUpRequest;
import com.focusr.Precot.payload.UpdateUserRequest;
import com.focusr.Precot.payload.UserDTO;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.BleachMailApprovalProcess;
import com.focusr.Precot.util.EmailHtmlLoader;
import com.focusr.Precot.util.EmailSubject;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.SendMail;
import com.focusr.Precot.util.XoauthSubject;

/**
 * Created by FocusR.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	Logger logger = LoggerFactory.getLogger(AuthController.class);

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	private DepartmentRepository departmentRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	JwtTokenProvider tokenProvider;

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@Autowired
	EmailDetailsRepository emailDetailsRepository;
	
	@Autowired
	MsXoauthSMTPRepository msXoauthSMTPRepository;

	@Autowired
	EmailHtmlLoader emailHtmlLoader;

	@Autowired
	private RoleService roleService;

	@Autowired
	private UserService userservice;

	@Autowired
	SCAUtil scaUtil;

	@Autowired
	EmailHtmlLoader emailhtmlloader;

	@Autowired
	EmailDetailsRepository emaildetailsrepository;

	@Autowired
	private BleachingService2 bleachingService2;
	@Autowired
	BleachMailApprovalProcess bleachmailapprovalprocess;
	
	@Autowired
	private PasswordHistoryRepository passwordHistoryRepository;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("/forgetPassword")
	public ResponseEntity<?> processForgotPasswordForm(@Valid @RequestBody UpdateUserRequest forgetPassRequest,
			BindingResult result) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);

		if (errorMap != null)
			return errorMap;

		User user = userRepository.findByUsernameOrEmail(forgetPassRequest.getEmail(), forgetPassRequest.getEmail())
				.orElseThrow(() -> new ResourceNotFoundException("User  does not exist!", "username or email",
						forgetPassRequest.getEmail()));

		String jwt = tokenProvider.generateTokenForgetPassword(user);

		user.setResetToken(jwt);

		ResponseEntity<?> passwordValidationResp = checkPasswordValidation(user.getPassword());

		HttpStatus passwordValidationRespstatusCode = passwordValidationResp.getStatusCode();

		if (passwordValidationRespstatusCode != HttpStatus.OK) {

			return passwordValidationResp;

		}

//		if(restrictedPasswords(user.getPassword())) {
//			return new ResponseEntity(new ApiResponse(false, user.getPassword() + " password is not allowed. Please use different password !!!"), HttpStatus.BAD_REQUEST);
//		}
		
		// Save token to database

		// set the password updating time
		user.setPasswordAt(new Date());
		User results = userRepository.save(user);

		sendMail(forgetPassRequest, jwt, user);
		

		URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/users/{username}")
				.buildAndExpand(results.getUsername()).toUri();

		return ResponseEntity.created(location).body(new ApiResponseEmail(true, "User Updated successfully", jwt));
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PutMapping("/updateNewPassword")
	public ResponseEntity<?> updateNewPassword(@Valid @RequestBody UpdateUserRequest signUpRequest,
	 BindingResult result) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;

		User user = userRepository.findByResetToken(signUpRequest.getToken()).orElseThrow(
				() -> new ResourceNotFoundException("User token does not exist!", "token", signUpRequest.getToken()));

		if (signUpRequest.getPassword() != null) {

			String jwt = signUpRequest.getToken();

			if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {

				/*
				 * Long userId = tokenProvider.getUserIdFromJWT(jwt);
				 * 
				 * UserDetails userDetails = customUserDetailsService.loadUserById(userId);
				 * UsernamePasswordAuthenticationToken authentication = new
				 * UsernamePasswordAuthenticationToken(userDetails, null,
				 * userDetails.getAuthorities()); authentication.setDetails(new
				 * WebAuthenticationDetailsSource().buildDetails(request));
				 * 
				 * SecurityContextHolder.getContext().setAuthentication(authentication);
				 */

				ResponseEntity<?> passwordValidationResp = checkPasswordValidation(signUpRequest.getPassword());

				HttpStatus passwordValidationRespstatusCode = passwordValidationResp.getStatusCode();

				if (passwordValidationRespstatusCode != HttpStatus.OK) {

					return passwordValidationResp;

				}
				
//				if(restrictedPasswords(signUpRequest.getPassword())) {
//					return new ResponseEntity(new ApiResponse(false, signUpRequest.getPassword() + " password is not allowed. Please use different password !!!"), HttpStatus.BAD_REQUEST);
//				}

				// set the password updating time
				user.setPasswordAt(new Date());
				user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
				user.setResetToken(null);

				User results = userRepository.save(user);

				URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/users/{username}")
						.buildAndExpand(results.getUsername()).toUri();

				return ResponseEntity.created(location)
						.body(new ApiResponse(true, "User password updated successfully"));
			}

		}

		return new ResponseEntity(new ApiResponse(false, "unable to update password"), HttpStatus.BAD_REQUEST);

	}

	private void sendMail(UpdateUserRequest forgetPassRequest, String jwt, User user) {

//		User admin = userRepository.findAdmin()
//				.orElseThrow(() -> new ResourceNotFoundException("User  does not exist!", "", ""));

		String appUrl = forgetPassRequest.getForgetPasswordUrl();

		String emailFrom = new String();
		List<String> emailTo = new ArrayList<String>();
		List<String> emailCC = new ArrayList<String>();
		String subject = AppConstants.forgetPasswordSubject;
		String text = emailHtmlLoader.getText(AppConstants.forgetPasswordTemplate, appUrl + "/resetPwd/" + jwt);
//		String text = emailHtmlLoader.getText(AppConstants.forgetPasswordTemplate, appUrl + "/resetPwd/" + jwt);

		emailTo.add(user.getEmail());

		EmailSubject emailSubject = null;
		try {
			emailSubject = EmailSubject.getInstance(emailDetailsRepository);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {

			throw new AppException("Unable to get Email details");
		}

		String fromEmail = emailSubject.getUsername();
		emailFrom = fromEmail;

		emailSubject.init(emailFrom, emailTo, emailCC, null, subject, text);
		emailSubject.setHTML(true);
		
//	XoauthSubject emailSubject = null;
//		try {
//			emailSubject = XoauthSubject.getInstance(msXoauthSMTPRepository);
//		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
//				| InvalidKeySpecException e) {
//
//			throw new AppException("Unable to get Email details");
//		}
//
//		String fromEmail = emailSubject.getUsername();
//		emailFrom = fromEmail;
//
//		emailSubject.init(emailFrom, emailTo, emailCC, null, subject, text);
//		emailSubject.setHTML(true);

		SendMail sm = new SendMail();

		sm.sendMail(emailSubject);
		
//		sm.XoauthsendMail(emailSubject);
	}

	public void createAdmin() {

		Optional<User> admin = null;

		try {
			admin = userRepository.findFirstAdmin();
		} catch (Exception ex) {
			logger.error("***************** Unable to find admin ********************* " + ex);
		}

		if (admin != null && !admin.isPresent()) {

			User user = new User("admin", "sysadmin", "sysadmin@gmail.com", "Welcome@123", 'Y', null);

			user.setPassword(passwordEncoder.encode(user.getPassword()));
			// set the password updating time
			user.setPasswordAt(new Date());
			Role userRole = roleRepository.findByName("ROLE_ADMIN")
					.orElseThrow(() -> new AppException("User Role not set."));

			user.setRoles(Collections.singleton(userRole));

			try {
				userRepository.save(user);
			} catch (Exception ex) {
				logger.error("***************** Unable to create admin ********************* " + ex);
			}

		}

	}

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;

		logger.info("***************** User signin *********************\n" + loginRequest.getUsernameOrEmail());

//		testConnection();
//		
		createAdmin();

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsernameOrEmail(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = "";

		jwt = tokenProvider.generateToken(authentication);

		User user = null;

		Long userId = getUserIdFromJWT(jwt);

		Optional<User> opt = userRepository.findUser(userId);

		if (!opt.isPresent()) {

			return new ResponseEntity(new ApiResponse(false, "User is not found !"), HttpStatus.BAD_REQUEST);
		}

		user = opt.get();

		String name = user.getName() == null ? "" : user.getName();
		String username = user.getUsername() == null ? "" : user.getUsername();
		String email = user.getEmail() == null ? "" : user.getEmail();
		
	

		String roleName = "";

		for (Role role : user.getRoles()) {
			roleName = role.getName();
		}
		
		List<Long> departmentIds = new ArrayList<Long>();
		
		if(!user.getDepartments().isEmpty()) {
			for(Department department : user.getDepartments()) {
				
				Long newId = department.getId();
				departmentIds.add(newId);
				
			}
		} else {
			Long departmentId = user.getDepartmentId();
			departmentIds.add(departmentId);
		}

		SCAUtil scaUtil = new SCAUtil();

		if ('Y' != user.getIs_Active()) {

			return new ResponseEntity(new ApiResponse(false, "User is inactive please contact admin"),
					HttpStatus.BAD_REQUEST);
		}

		if (!user.getUsername().equals("sysadmin")) {
			ResponseEntity<?> passwordValidationResp = isPasswordExpired(user);

			HttpStatus passwordValidationRespstatusCode = passwordValidationResp.getStatusCode();

			if (passwordValidationRespstatusCode != HttpStatus.OK) {

				return passwordValidationResp;

			}
		}
		
		
		

		JwtAuthenticationResponse resp = new JwtAuthenticationResponse(jwt);
		resp.setName(name);
		resp.setUsername(username);
		resp.setEmail(email);
		resp.setRole(roleName);
		resp.setDepartmentId(departmentIds);

		return ResponseEntity.ok(resp);
	}
	
	
	private boolean restrictedPasswords(String password) {
		
		List<String> passwordList = Arrays.asList("welcome@123", "password@123", "global@123", "precot@123");
		return passwordList.contains(password.toLowerCase());
	}

	@GetMapping("getRoles")
	public ResponseEntity<List<Role>> getAllRoles() {
		List<Role> roles = roleService.getAllRoles();
		return new ResponseEntity<>(roles, HttpStatus.OK);
	}

	@GetMapping("/getUsers")
	public List<UserDTO> getUserDetails() {
		return userservice.getUserDetails();
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest, BindingResult result) {

		URI location = null;

		try {

			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			if (errorMap != null)
				return errorMap;
			String getAgentOrBuyerName = signUpRequest.getName() != null ? signUpRequest.getName() : "";

			if (userRepository.existsByUsername(signUpRequest.getUsername())) {
				return new ResponseEntity(new ApiResponse(false, "Username is already taken!"), HttpStatus.BAD_REQUEST);
			}

			if (userRepository.existsByEmail(signUpRequest.getEmail())) {
				return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
						HttpStatus.BAD_REQUEST);
			}

			ResponseEntity<?> passwordValidationResp = checkPasswordValidation(signUpRequest.getPassword());

			HttpStatus passwordValidationRespstatusCode = passwordValidationResp.getStatusCode();

			if (passwordValidationRespstatusCode != HttpStatus.OK) {

				return passwordValidationResp;

			}
			
			
//			if(restrictedPasswords(signUpRequest.getPassword())) {
//				return new ResponseEntity(new ApiResponse(false, signUpRequest.getPassword() + " password is not allowed. Please use different password !!!"), HttpStatus.BAD_REQUEST);
//			}
			

			// Check if ROLE_HOD with the requested department ID already exists
//			if ("ROLE_HOD".equals(signUpRequest.getUserRoles())
//					&& userRepository.countUsersWithRoleHodAndDepartmentId(signUpRequest.getDepartmentId()) > 0) {
//				return new ResponseEntity<>(new ApiResponse(false, "ROLE_HOD is already assigned to another user!"),
//						HttpStatus.BAD_REQUEST);
//			}

			if (!isValidEmail(signUpRequest.getEmail())) {
				return new ResponseEntity(new ApiResponse(false, "Please enter a valid email address!"),
						HttpStatus.BAD_REQUEST);
			}

			if (!"ROLE_ADMIN".equals(signUpRequest.getUserRoles()) && !"OPERATOR".equals(signUpRequest.getUserRoles())
					&& !"SHIFT IN-CHARGE".equals(signUpRequest.getUserRoles())
					&& !"HOD".equals(signUpRequest.getUserRoles())
					&& !"MACHINE IN-CHARGE".equals(signUpRequest.getUserRoles())
					&& !"COTTON IN-CHARGE".equals(signUpRequest.getUserRoles())) {

			}
			
			// Creating user's account
			User user = new User(getAgentOrBuyerName, signUpRequest.getUsername(), signUpRequest.getEmail(),
					signUpRequest.getPassword(), 'Y');
			
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			
			user.setPasswordAt(new Date());
			
			Set<Department> departmentByUser = new HashSet<Department>();
			
			for(Long deptid : signUpRequest.getDepartmentId()) {
				
				Department departmentObj = departmentRepository.findByDepartmentById(deptid).get();
				
				departmentByUser.add(departmentObj);
				
			}

			Role userRole = roleRepository.findByName(signUpRequest.getUserRoles())
					.orElseThrow(() -> new AppException("User Role not set."));

			user.setRoles(Collections.singleton(userRole));
			user.setDepartments(departmentByUser);

			User results = userRepository.save(user);
			
			
			/**
			 * SAVE IN HISTORY TABLE
			 */
			
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			
//			PasswordHistory passwordHistory = new PasswordHistory();
//			passwordHistory.setPasswordHash(user.getPassword());
//			passwordHistory.setPasswordChangedDate(date);
//			passwordHistory.setUserId(user.getId());
//			passwordHistory.setPasswordAudit(results);
//			
//			passwordHistoryRepository.save(passwordHistory);

			/** MAIL SENDER **/

			String fromAddress = new String();

			List<String> toAddress = new ArrayList<>();

			List<String> ccAddress = new ArrayList<>();

			String mailSubject = AppConstants.SignUpSubject;

			String mailContent = emailHtmlLoader.sendSignInCredentials(user, signUpRequest.getPassword());
			toAddress.add(user.getEmail());

			EmailSubject emailSubject = null;

			try {
				emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			} catch (Exception e) {

				logger.error("******************User created! But unable to get SMTP details!******************" + e);

				String msg = scaUtil.getErrorMessage(e);

				return new ResponseEntity(new ApiResponse(false, "User created! But unable to get SMTP details!" + msg),
						HttpStatus.BAD_REQUEST);
			}

			String fromEmail = emailSubject.getUsername();

			fromAddress = fromEmail;

			emailSubject.init(fromAddress, toAddress, ccAddress, null, mailSubject, mailContent);
			emailSubject.setHTML(true);

			SendMail sm = new SendMail();

			try {
				sm.sendMail(emailSubject);
			} catch (Exception e) {

				logger.error("Unable to send Mail");

				scaUtil.getErrorMessage(e);

				return new ResponseEntity(new ApiResponse(false, "User Created! but unable to Send Mail"),
						HttpStatus.SERVICE_UNAVAILABLE);

			}

			location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/users/{username}")
					.buildAndExpand(results.getUsername()).toUri();

			location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/users/{username}")
					.buildAndExpand(results.getUsername()).toUri();

		} catch (Exception ex) {

			logger.error("***************** Unable to register user!  *********************\n" + ex);

			String msg = ex.getMessage() != null ? ex.getMessage() : "";

			String cause = "";

			if (ex.getCause() != null) {

				cause = ex.getCause().getMessage() != null ? ex.getCause().getMessage() : "";

				msg = msg + "!!!" + cause;
			}

			return new ResponseEntity(new ApiResponse(false, " Unable to register user!" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
	}

	private Long getUserIdFromJWT(String jwt) {

		Long userId = tokenProvider.getUserIdFromJWT(jwt);

		return userId;
	}

	private boolean isValidEmail(String email) {
		// Modify the regular expression according to your desired email format
		String regex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
		return email.matches(regex);
	}

	// ==========================================Mail Approve
	// F42===================================================

	@GetMapping("/approveLayDownCheckF42/{id}")
	public ResponseEntity<?> approveLayDownCheckF42(@PathVariable Long id, HttpServletRequest http) {

		ResponseEntity<?> Response = bleachmailapprovalprocess.approveLayDownCheckF42(id, http);

		return Response;
	}

	// F01
	@GetMapping("/approveF01/{id}")
	public ResponseEntity<?> approveF01(@PathVariable Long id, HttpServletRequest http) {

		ResponseEntity<?> Response = bleachmailapprovalprocess.approveSanitizationOfMechineAndSurfaceF01(id, http);

		return Response;
	}

	// F36
	@GetMapping("/approveF36/{id}")
	public ResponseEntity<?> approveF36(@PathVariable Long id, HttpServletRequest http) {

		ResponseEntity<?> Response = bleachmailapprovalprocess.approveShiftLogBookF36(id, http);

		return Response;
	}

	// F09
	@GetMapping("/approveF09/{id}")
	public ResponseEntity<?> approveF09(@PathVariable Long id, HttpServletRequest http) {

		ResponseEntity<?> Response = bleachmailapprovalprocess.approveEquipmentUsageLogbookCakePressF09(id, http);

		return Response;
	}

	// F34
	@GetMapping("/approveF34/{id}")
	public ResponseEntity<?> approveF34(@PathVariable Long id, HttpServletRequest http) {

		ResponseEntity<?> Response = bleachmailapprovalprocess.approveEquipmentUsageLogbookBAndDF34(id, http);

		return Response;
	}

	// F41
	@GetMapping("/approveF41/{id}")
	public ResponseEntity<?> approveF41(@PathVariable Long id, HttpServletRequest http) {

		ResponseEntity<?> Response = bleachmailapprovalprocess.approveHandSanitizationF41(id, http);

		return Response;
	}

	// F33
	@GetMapping("/approveEquimentUsageF33/{id}")
	public ResponseEntity<?> approveEquimentUsageF33(@PathVariable Long id, HttpServletRequest http) {

		ResponseEntity<?> Response = bleachmailapprovalprocess.approveEquimentUsageF33(id, http);

		return Response;
	}

	// F04
	@GetMapping("/approveF04/{id}")
	public ResponseEntity<?> approveF04(@PathVariable Long id, HttpServletRequest http) {

		ResponseEntity<?> Response = bleachmailapprovalprocess.approveAppliedRawCottonF04(id, http);

		return Response;
	}

	// F08
	@GetMapping("/approveF08/{id}")
	public ResponseEntity<?> approveF08(@PathVariable Long id, HttpServletRequest http) {

		ResponseEntity<?> Response = bleachmailapprovalprocess.approveAppliedRawCottonF04(id, http);

		return Response;
	}

	// F38
	@GetMapping("/approveF38/{id}")
	public ResponseEntity<?> approveF38(@PathVariable Long id, HttpServletRequest http) {

		ResponseEntity<?> Response = bleachmailapprovalprocess.approveAppliedRawCottonF04(id, http);

		return Response;
	}

	// F02-Hr
	@GetMapping("/approveHrF02/{id}")
	public ResponseEntity<?> approveHrF02(@PathVariable Long id, HttpServletRequest http) {

		ResponseEntity<?> Response = bleachmailapprovalprocess.approvehouseKeepingHrF02(id, http);

		return Response;
	}

	// F02-Hod
	@GetMapping("/approveHodF02/{id}")
	public ResponseEntity<?> approveHodF02(@PathVariable Long id, HttpServletRequest http) {

		ResponseEntity<?> Response = bleachmailapprovalprocess.approvehouseKeepingHodF02(id, http);

		return Response;
	}

	// F02A --Hr
	@GetMapping("/approveHrF02A/{id}")
	public ResponseEntity<?> approveHrF02A(@PathVariable Long id, HttpServletRequest http) {

		ResponseEntity<?> Response = bleachmailapprovalprocess.approvehouseKeepingHrF02A(id, http);

		return Response;
	}

	// F02A--Hod
	@GetMapping("/approveHodF02A/{id}")
	public ResponseEntity<?> approveHodF02A(@PathVariable Long id, HttpServletRequest http) {

		ResponseEntity<?> Response = bleachmailapprovalprocess.approvehousekeepingHod02A(id, http);

		return Response;
	}

	// F13--Hod
	@GetMapping("/approveHodF13/{id}")
	public ResponseEntity<?> approveHodF13(@PathVariable Long id, HttpServletRequest http) {

		ResponseEntity<?> Response = bleachmailapprovalprocess.approveBleachJobcardHodF13(id, http);

		return Response;
	}

	// F13 -- QA
	@GetMapping("/approveQaF13/{id}/{userId}")
	public ResponseEntity<?> approveQaF13(@PathVariable Long id, @PathVariable Long userId, HttpServletRequest http) {
	    ResponseEntity<?> response = bleachmailapprovalprocess.approveBleachJobcardQaF13(id, userId, http);
	    return response;
	}

	// F18
	@GetMapping("/approveF18/{id}")
	public ResponseEntity<?> approveF18(@PathVariable Long id, HttpServletRequest http) {

		ResponseEntity<?> Response = bleachmailapprovalprocess.approveContCheckingReportF18(id, http);

		return Response;
	}

	// F05
	@GetMapping("/approveF05/{id}")
	public ResponseEntity<?> approveF05(@PathVariable Long id, HttpServletRequest http) {

		ResponseEntity<?> Response = bleachmailapprovalprocess.approveContRawCttonF05(id, http);

		return Response;
	}

	// F11
	@GetMapping("/approveF11/{id}")
	public ResponseEntity<?> approveF11(@PathVariable Long id, HttpServletRequest http) {

		ResponseEntity<?> Response = bleachmailapprovalprocess.approveEquimentUsageF11(id, http);

		return Response;
	}

	// F03
	@GetMapping("/approveF03/{id}")
	public ResponseEntity<?> approveF03(@PathVariable Long id, HttpServletRequest http) {

		ResponseEntity<?> Response = bleachmailapprovalprocess.approveMetalDetectorCheckListF03(id, http);

		return Response;
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

	private ResponseEntity<?> isPasswordExpired(User user) {

		Date currentDate = new Date();
		currentDate.setDate(currentDate.getDate() - 60);
		Date passwordUpdateDate = user.getPasswordAt();
		if (currentDate.compareTo(passwordUpdateDate) > 0) {
			return new ResponseEntity(new ApiResponse(false, "Password has expired! Please reset it!"),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(new ApiResponse(true, "Password validation success!"), HttpStatus.OK);
	}

}
