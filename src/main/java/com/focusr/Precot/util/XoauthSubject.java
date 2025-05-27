package com.focusr.Precot.util;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import javax.activation.FileDataSource;
import javax.crypto.NoSuchPaddingException;

import org.springframework.stereotype.Component;

import com.focusr.Precot.exception.ResourceNotFoundException;
import com.focusr.Precot.mssql.database.model.MsXoauthSMTP;
import com.focusr.Precot.mssql.database.repository.MsXoauthSMTPRepository;



@Component
public class XoauthSubject {

	private static XoauthSubject emailTextObject;

	private static Properties props;

	private String emailSubject;

	private String emailText;

	private String emailFrom;

	private List<String> emailTo;

	private List<String> emailCC;

	private List<File> files;
	
	private  String username;
	
	private  String password;
	
	private  Long projectId;

//	private static EncryptionUtil encryptionUtil;
	
	private boolean isHTML;
	
	private String host ;

	private List<String> url;
	
	private String urls;
	
	private long port;
	
	private String clientId;
	
	private String tenantId;
	
	private String serectId;
		
//	private static long userId;


	public XoauthSubject() {
		
	}

	// For the Mail Auto Generation for the Xoauth Mail....
	public static XoauthSubject getInstance(MsXoauthSMTPRepository emailDetailsRepository) throws InvalidKeyException, UnsupportedEncodingException,
			NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeySpecException {

		// if (emailTextObject == null) {

		emailTextObject = new XoauthSubject();

		 MsXoauthSMTP emailDetails = emailDetailsRepository.findByEmailDetails();
		// .orElseThrow(() -> new ResourceNotFoundException("SMTP details does
		// not exist!", "", ""));
		if(emailDetails == null) {
			throw new ResourceNotFoundException("SMTP details  does not exist!", "", "");
		}

//		encryptionUtil = EncryptionUtil.getInstance();
//
//		encryptionUtil.decryptEmailDetails(emailDetails);
//
//		if (emailDetails.getSmtp_host() == null || emailDetails.getUsername() == null ||
//
//				emailDetails.getPassword() == null || "".equals(emailDetails.getSmtp_host())
//
//				|| "".equals(emailDetails.getUsername()) || "".equals(emailDetails.getPassword())) {
//
//			throw new ResourceNotFoundException("SMTP details  does not exist!", "", "");
//
//		}

		Properties prop = System.getProperties();
		prop.put("mail.smtp.auth", "true");
		
		prop.put("mail.smtp.port", emailDetails.getPort());
		prop.put("mail.smtp.host", emailDetails.getSmtpHost());
		prop.put("mail.smtp.starttls.enable", "true");
		prop.put("mail.debug", "true");
		prop.put("mail.smtp.ssl.trust",emailDetails.getSmtpHost());
		prop.put("mail.smtp.auth.mechanisms", "XOAUTH2");
		prop.put("mail.smtp.user", emailDetails.getUsername());

		emailTextObject.props = prop;

		emailTextObject.username = emailDetails.getUsername();
//		emailTextObject.password = emailDetails.getPassword();
		emailTextObject.host = emailDetails.getSmtpHost();
//		emailTextObject.projectId = emailDetails.getProjectId();
		emailTextObject.port=emailDetails.getPort();
		emailTextObject.clientId = emailDetails.getClientId();
		emailTextObject.tenantId = emailDetails.getTenantId();
		emailTextObject.serectId = emailDetails.getSecretId();
		

		// }
		return emailTextObject;
	}

	public void init(String emailFrom, List<String> emailTo, List<String> emailCC, List<File> files,
			String emailSubject, String emailText) {

		this.emailFrom = emailFrom;
		this.emailCC = emailCC;
		this.emailTo = emailTo;
		this.files = files;
		this.emailSubject = emailSubject;
		this.emailText = emailText;
//		this.url = url;
	}
	
	public static XoauthSubject getEmailTextObject() {
		return emailTextObject;
	}

	public static void setEmailTextObject(XoauthSubject emailTextObject) {
		XoauthSubject.emailTextObject = emailTextObject;
	}

	public static Properties getProps() {
		return props;
	}

	public static void setProps(Properties props) {
		XoauthSubject.props = props;
	}

	public String getEmailSubject() {
		return emailSubject;
	}

	public void setEmailSubject(String emailSubject) {
		this.emailSubject = emailSubject;
	}

	public String getEmailText() {
		return emailText;
	}

	public void setEmailText(String emailText) {
		this.emailText = emailText;
	}

	public String getEmailFrom() {
		return emailFrom;
	}

	public void setEmailFrom(String emailFrom) {
		this.emailFrom = emailFrom;
	}

	public List<String> getEmailTo() {
		return emailTo;
	}

	public void setEmailTo(List<String> emailTo) {
		this.emailTo = emailTo;
	}

	public List<String> getEmailCC() {
		return emailCC;
	}

	public void setEmailCC(List<String> emailCC) {
		this.emailCC = emailCC;
	}

	public List<File> getFiles() {
		return files;
	}

	public void setFds(List<File> files) {
		this.files = files;
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
	
	public boolean isHTML() {
		return isHTML;
	}

	public void setHTML(boolean isHTML) {
		this.isHTML = isHTML;
	}

	public Long getProjectId() {
		return projectId;
	}

	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}


	@Override
	public String toString() {
		return "EmailSubject [emailSubject=" + emailSubject + ", emailText=" + emailText + ", emailFrom=" + emailFrom
				+ ", emailTo=" + emailTo + ", emailCC=" + emailCC + ", files=" + files + ", username=" + username
				+ ", password=" + password + ", projectId=" + projectId + ", isHTML=" + isHTML + ", host=" + host
				+ ", url=" + url + "]";
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public List<String> getUrl() {
		return url;
	}

	public void setUrl(List<String> url) {
		this.url = url;
	}

	public long getPort() {
		return port;
	}

	public void setPort(long port) {
		this.port = port;
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

	public String getSerectId() {
		return serectId;
	}

	public void setSerectId(String serectId) {
		this.serectId = serectId;
	}

	
	
//	public String getUrl() {
//		return url;
//	}
//
//	public void setUrl(String url) {
//		this.url = url;
//	}
	
	
	
	
	
	

}
