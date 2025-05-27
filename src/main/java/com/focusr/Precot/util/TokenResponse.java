package com.focusr.Precot.util;

public class TokenResponse {
	private String token_type;
	private String scope;
	private int expires_in;
	private String ext_expires_in;
	private String access_token;
	// Getters and setters
	public String getToken_type() {
		return token_type;
	}
	public void setToken_type(String token_type) {
		this.token_type = token_type;
	}
	public String getScope() {
		return scope;
	}
	public void setScope(String scope) {
		this.scope = scope;
	}
	public int getExpires_in() {
		return expires_in;
	}
	public void setExpires_in(int expires_in) {
		this.expires_in = expires_in;
	}
	public String getExt_expires_in() {
		return ext_expires_in;
	}
	public void setExt_expires_in(String ext_expires_in) {
		this.ext_expires_in = ext_expires_in;
	}
	public String getAccess_token() {
		return access_token;
	}
	public void setAccess_token(String access_token) {
		this.access_token = access_token;
	}
	
	
}

