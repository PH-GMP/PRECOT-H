package com.focusr.Precot.mssql.database.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.Immutable;

import com.focusr.Precot.util.AppConstants;

@Entity
@Immutable
@Table(name = "EMAIL_DETAILS",schema=AppConstants.schema, uniqueConstraints = { @UniqueConstraint(columnNames = { "SMTP_HOST" }) })
public class EmailDetails {

	@Id
//	@SequenceGenerator(name = "EMAIL_DETAILS_SEQ", sequenceName = "EMAIL_DETAILS_SEQ", allocationSize = 1)
//	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "EMAIL_DETAILS_SEQ")
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "SMTP_HOST")
	private String smtp_host;

	@Column(name = "PORT")
	private long port;

	@Column(name = "USERNAME")
	private String username;

	@Column(name = "PASSWORD")
	private String password;
	
//	@Column(name = "CLINET_ID")
//	private String clientId;
//	
//	@Column(name = "TENANT_ID")
//	private String tenantId;
//	
//	@Column(name = "CLIENTSECRET")
//	private String secretId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSmtp_host() {
		return smtp_host;
	}

	public void setSmtp_host(String smtp_host) {
		this.smtp_host = smtp_host;
	}

	public long getPort() {
		return port;
	}

	public void setPort(long port) {
		this.port = port;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	

//	public String getClientId() {
//		return clientId;
//	}
//
//	public void setClientId(String clientId) {
//		this.clientId = clientId;
//	}
//
//	public String getTenantId() {
//		return tenantId;
//	}
//
//	public void setTenantId(String tenantId) {
//		this.tenantId = tenantId;
//	}
//
//	public String getSecretId() {
//		return secretId;
//	}
//
//	public void setSecretId(String secretId) {
//		this.secretId = secretId;
//	}

	public EmailDetails() {

	}

}