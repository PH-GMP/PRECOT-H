package com.focusr.Precot.util;

import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.List;
import java.util.Properties;

import javax.crypto.Cipher;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESedeKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.focusr.Precot.mssql.database.model.EmailDetails;
import com.focusr.Precot.mssql.database.model.MsXoauthSMTP;


public class XoauthEncryptionUtil {


	private String unicode_format = "UTF8";

	public String desede_encryption_scheme = "DESede";

	private String myEncryptionKey = "securesecuresecuresecure";

	private KeySpec ks;

	private SecretKeyFactory skf;

	private Cipher cipher;

	byte[] arrayBytes;

	private String myEncryptionScheme;

	SecretKey key;

	private static XoauthEncryptionUtil encryptionUtil;

	public XoauthEncryptionUtil() throws UnsupportedEncodingException, InvalidKeyException, NoSuchAlgorithmException,
			NoSuchPaddingException, InvalidKeySpecException {

		myEncryptionScheme = desede_encryption_scheme;
		arrayBytes = myEncryptionKey.getBytes(unicode_format);
		ks = new DESedeKeySpec(arrayBytes);
		skf = SecretKeyFactory.getInstance(myEncryptionScheme);
		cipher = Cipher.getInstance(myEncryptionScheme);
		key = skf.generateSecret(ks);
	}

	public static XoauthEncryptionUtil getInstance() throws UnsupportedEncodingException, InvalidKeyException,
			NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeySpecException {

		if (encryptionUtil == null) {
			encryptionUtil = new XoauthEncryptionUtil();
		}
		return encryptionUtil;
	}

	public String encrypt(String unencryptedString) {
		String encryptedString = null;
		try {
			cipher.init(Cipher.ENCRYPT_MODE, key);
			byte[] plainText = unencryptedString.getBytes(unicode_format);
			byte[] encryptedText = cipher.doFinal(plainText);
			encryptedString = new String(Base64.encodeBase64(encryptedText));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return encryptedString;
	}

	public String decrypt(String encryptedString) {
		String decryptedText = null;
		try {
			cipher.init(Cipher.DECRYPT_MODE, key);
			byte[] encryptedText = Base64.decodeBase64(encryptedString);
			byte[] plainText = cipher.doFinal(encryptedText);
			decryptedText = new String(plainText);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return decryptedText;
	}

	public void encryptEmailDetails( MsXoauthSMTP emailDetails) {

		emailDetails.setSmtpHost(encryptionUtil.encrypt(emailDetails.getSmtpHost()));
		emailDetails.setUsername(encryptionUtil.encrypt(emailDetails.getUsername()));
		emailDetails.setClientId(encryptionUtil.encrypt(emailDetails.getClientId()));
		emailDetails.setTenantId(encryptionUtil.encrypt(emailDetails.getTenantId()));
		emailDetails.setSecretId(encryptionUtil.encrypt(emailDetails.getSecretId()));
		
//		emailDetails.setPassword(encryptionUtil.encrypt(emailDetails.getPassword()));

	}

	public void decryptEmailDetails(MsXoauthSMTP emailDetails) {

		emailDetails.setSmtpHost(encryptionUtil.encrypt(emailDetails.getSmtpHost()));
		emailDetails.setUsername(encryptionUtil.encrypt(emailDetails.getUsername()));
		emailDetails.setClientId(encryptionUtil.encrypt(emailDetails.getClientId()));
		emailDetails.setTenantId(encryptionUtil.encrypt(emailDetails.getTenantId()));
		emailDetails.setSecretId(encryptionUtil.encrypt(emailDetails.getSecretId()));

	}
	
}
