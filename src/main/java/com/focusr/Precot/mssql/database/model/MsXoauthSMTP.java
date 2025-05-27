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
@Table(name="MS_XOAUTH_SMTP",schema=AppConstants.schema)
public class MsXoauthSMTP {
	
	@Id	
	@SequenceGenerator(name="MS_XOAUTH_SMTP_SEQ", sequenceName="MS_XOAUTH_SMTP_SEQ")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="MS_XOAUTH_SMTP_SEQ")	
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "CLINET_ID")
	private String clientId;
	
	@Column(name = "TENANT_ID")
	private String tenantId;
	
	@Column(name = "CLIENTSECRET")
	private String secretId;
	
	@Column(name="USERNAME")
	private String username;
	
	@Column(name="SMTP_HOST")
	private String smtpHost;	
	
	@Column(name="PORT")
	private long port;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getClientId() {
		return clientId;
	}

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public String getTenantId() {
		return tenantId;
	}

	public void setTenantId(String tenantId) {
		this.tenantId = tenantId;
	}

	public String getSecretId() {
		return secretId;
	}

	public void setSecretId(String secretId) {
		this.secretId = secretId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public long getPort() {
		return port;
	}

	public void setPort(long port) {
		this.port = port;
	}

	
	public String getSmtpHost() {
		return smtpHost;
	}

	public void setSmtpHost(String smtpHost) {
		this.smtpHost = smtpHost;
	}

	public MsXoauthSMTP(Long id, String clientId, String tenantId,
			String username, String smtpHost, long port) {
		super();
		this.id = id;
		this.clientId = clientId;
		this.tenantId = tenantId;
		this.secretId = secretId;
		this.username = username;
		this.smtpHost = smtpHost;
		this.port = port;
	}

	public MsXoauthSMTP() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	}
