package com.focusr.Precot.payload;

public class ApiResponseEmail {
	private Boolean success;
	private String message;
	private String token;

	public ApiResponseEmail(Boolean success, String message, String token) {
		this.success = success;
		this.message = message;
		this.token = token;
	}

	public ApiResponseEmail() {
	}

	public Boolean getSuccess() {
		return success;
	}

	public void setSuccess(Boolean success) {
		this.success = success;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}