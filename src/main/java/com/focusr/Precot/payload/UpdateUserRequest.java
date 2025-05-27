package com.focusr.Precot.payload;

import java.util.List;

/**
 * Created by FocusR on 29-Sep-2019.
 */

public class UpdateUserRequest {

	private String name;

	private String username;


	private String email;

	private String password;
	
	private List<Long> departmentId;

	// current
	private String newpassword;

	// new
	private String confirmpassword;

	private String userRoles;


	private Long id;

	private String forgetPasswordUrl;

	private String token;
	
	private char is_active;

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getForgetPasswordUrl() {
		return forgetPasswordUrl;
	}

	public void setForgetPasswordUrl(String forgetPasswordUrl) {
		this.forgetPasswordUrl = forgetPasswordUrl;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}



	public String getUserRoles() {
		return userRoles;
	}

	public void setUserRoles(String userRoles) {
		this.userRoles = userRoles;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


	public String getConfirmpassword() {
		return confirmpassword;
	}

	public void setConfirmpassword(String confirmpassword) {
		this.confirmpassword = confirmpassword;
	}

	public String getNewpassword() {
		return newpassword;
	}

	public void setNewpassword(String newpassword) {
		this.newpassword = newpassword;
	}

	

	public List<Long> getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(List<Long> departmentId) {
		this.departmentId = departmentId;
	}

	public char getIs_active() {
		return is_active;
	}

	public void setIs_active(char is_active) {
		this.is_active = is_active;
	}

	
}
