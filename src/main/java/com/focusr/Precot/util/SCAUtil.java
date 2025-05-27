package com.focusr.Precot.util;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.focusr.Precot.security.JwtTokenProvider;

@Service
public class SCAUtil {

	Logger log = LoggerFactory.getLogger(SCAUtil.class);

	public Long getUserIdFromRequest(HttpServletRequest request, JwtTokenProvider tokenProvider) {

		String bearerToken = request.getHeader("Authorization");

		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {

			String jwt = bearerToken.substring(7, bearerToken.length());

			Long userId = tokenProvider.getUserIdFromJWT(jwt);

			return userId;
		}

		return null;

	}

	public String getErrorMessage(Exception e) {

		String msg = e.getMessage() != null ? e.getMessage() : "";

		String cause = "";

		if (e.getCause() != null) {

			cause = e.getCause().getMessage() != null ? e.getCause().getMessage() : "";

			msg = msg + "!!!" + cause;
		}

		return msg;
	}
	
	
	public String getUserRoleFromRequest(HttpServletRequest request , JwtTokenProvider tokenProvider) {
		 
		String bearerToken = request.getHeader("Authorization");
 
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
 
			String jwt = bearerToken.substring(7, bearerToken.length());
			String role = tokenProvider.extractRole(jwt);
 
			return role;
		}
 
		return null;
 
	}

	public String getDepId(HttpServletRequest request , JwtTokenProvider tokenProvider) {
		 
		String bearerToken = request.getHeader("Authorization");
 
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
 
			String jwt = bearerToken.substring(7, bearerToken.length());
			String role = tokenProvider.extractDep(jwt);
 
			return role;
		}
 
		return null;
 
	}


}
