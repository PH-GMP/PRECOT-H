package com.focusr.Precot.payload;

public class UserDTO {
	private Long id;
	private String username;
	private String email;

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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public UserDTO() {

	}

	public UserDTO(Long id, String username, String email) {

		this.username = username;
		this.email = email;
		this.id = id;
	}

}
