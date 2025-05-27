package com.focusr.Precot.security;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import com.focusr.Precot.mssql.database.model.User;

import java.util.Date;
import java.util.stream.Collectors;

/**
 * Created by FocusR on 19/08/17.
 */
@Component
public class JwtTokenProvider {

	private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

	@Value("${app.jwtSecret}")
	private String jwtSecret;

    @Value("${app.jwtExpirationInMs}")
    private int jwtExpirationInMs;


	public String generateToken(Authentication authentication) {

		UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

		Date now = new Date();
		Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        final String authorities = userPrincipal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
		


		return Jwts.builder().setSubject(Long.toString(userPrincipal.getId()))
				.claim("role", authorities)
				.claim("username", userPrincipal.getUsername())
				.claim("email", userPrincipal.getEmail())
				.claim("departmentId", userPrincipal.getDepartment_id())
				.setIssuedAt(new Date()).setExpiration(expiryDate)
				.signWith(SignatureAlgorithm.HS512, jwtSecret)
				.compact();
	}
	
	
	public String extractDep(String token) {
	    Claims claims = Jwts.parser()
	            .setSigningKey(jwtSecret)
	            .parseClaimsJws(token)
	            .getBody();

	    // Try to cast the value to an integer first, then convert to Long
	    String departmentId = (String) claims.get("email");
	    return departmentId ;
	}
	
	
	 public String extractRole(String token) {
	        Claims claims = Jwts.parser()
	        		.setSigningKey(jwtSecret)
	        		.parseClaimsJws(token)
	        		.getBody();
	        return (String) claims.get("role");
	    }


	/*
	 * public String generateToken(UserVo u) { Claims claims =
	 * Jwts.claims().setSubject(u.getUsername()); claims.put("roles", u.getRoles());
	 * long nowMillis = System.currentTimeMillis(); long expMillis = nowMillis +
	 * tokenValidity; Date exp = new Date(expMillis); return
	 * Jwts.builder().setClaims(claims).setIssuedAt(new
	 * Date(nowMillis)).setExpiration(exp) .signWith(SignatureAlgorithm.HS512,
	 * jwtSecret).compact(); }
	 */

	public Long getUserIdFromJWT(String token) {
		Claims claims = Jwts.parser()
				.setSigningKey(jwtSecret)
				.parseClaimsJws(token)
				.getBody();

		return Long.parseLong(claims.getSubject());
	}

	public boolean validateToken(String authToken) {
		try {
			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
			return true;
		} catch (SignatureException ex) {
			logger.error("Invalid JWT signature");
		} catch (MalformedJwtException ex) {
			logger.error("Invalid JWT token");
		} catch (ExpiredJwtException ex) {
			logger.error("Expired JWT token");
		} catch (UnsupportedJwtException ex) {
			logger.error("Unsupported JWT token");
		} catch (IllegalArgumentException ex) {
			logger.error("JWT claims string is empty.");
		}
		return false;
	}

	public String generateTokenForgetPassword(User user) {

		UserPrincipal userPrincipal = UserPrincipal.create(user);

		Date now = new Date();
		Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        final String authorities = userPrincipal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        return Jwts.builder()
        	    .setSubject(Long.toString(userPrincipal.getId()))
        	    .claim("role", authorities)
        	    .claim("username", userPrincipal.getUsername())
        	    .claim("email", userPrincipal.getEmail())
        	    .claim("departmentId", userPrincipal.getDepartment_id())
        	    .setIssuedAt(new Date())
        	    .setExpiration(expiryDate)
        	    .signWith(SignatureAlgorithm.HS512, jwtSecret)
        	    .compact();

	}
	
	
	
	
	 public String generateTokenForSupplierRegistration(String email , Long supplierRegisterId) {
	      
	        
	        return Jwts.builder()
	                .setSubject(Long.toString(supplierRegisterId))
	                .claim("email", email)
	                .setIssuedAt(new Date())
	                .signWith(SignatureAlgorithm.HS512, jwtSecret)
	                .compact();
	    }
	    
	    
	    public String generateSuperUserToken(Authentication authentication , Long dealerOrCustomerId) {

	        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

	        Date now = new Date();
	        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

	        final String authorities = userPrincipal.getAuthorities().stream()
	                .map(GrantedAuthority::getAuthority)
	                .collect(Collectors.joining(","));
	        if(dealerOrCustomerId==null) {
	        	dealerOrCustomerId=0l;
	        }      
	        
	        return Jwts.builder()
	        		.setSubject(Long.toString(userPrincipal.getId()))
	        	    .claim("role", authorities)
	        	    .claim("username", userPrincipal.getUsername())
	        	    .claim("email", userPrincipal.getEmail())
	        	    .claim("departmentId", userPrincipal.getDepartment_id())
	                .setIssuedAt(new Date())
	                .setExpiration(expiryDate)
	                .signWith(SignatureAlgorithm.HS512, jwtSecret)
	                .compact();
	    }


}




