package com.focusr.Precot.payload;

import java.util.List;

/**
 * Created by FocusR.
 */
public class JwtAuthenticationResponse {
	private String accessToken;
	private String tokenType = "Bearer";
	private String username;
	private String email;
	private List<Long> departmentId;

//	private Long id;
	
	private String role;

	private String name;

//    private String full_name;

	public JwtAuthenticationResponse(String accessToken) {
		this.accessToken = accessToken;
	}

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public String getTokenType() {
		return tokenType;
	}

	public void setTokenType(String tokenType) {
		this.tokenType = tokenType;
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

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public List<Long> getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(List<Long> departmentId) {
		this.departmentId = departmentId;
	}
	

//	public Long getId() {
//		return id;
//	}
//
//	public void setId(Long id) {
//		this.id = id;
//	}
	
	

//	public String getFull_name() {
//		return full_name;
//	}
//
//	public void setFull_name(String full_name) {
//		this.full_name = full_name;
//	}
}
