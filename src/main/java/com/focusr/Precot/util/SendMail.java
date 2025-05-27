package com.focusr.Precot.util;

import java.io.ByteArrayOutputStream;
import java.io.File;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.util.ByteArrayDataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;

import com.focusr.Precot.exception.AppException;
import com.itextpdf.html2pdf.HtmlConverter;


public class SendMail {

	Logger logger = LoggerFactory.getLogger(SendMail.class);

	public SendMail() {
		// TODO Auto-generated constructor stub
	}

	@Async
	public void sendMail(EmailSubject emailObject) {

		try {

			logger.info("***************** Email Object values *********************" + emailObject.toString());

			JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

			MimeMessage mail = mailSender.createMimeMessage();

//			EmailSubject.getProps().put("mail.smtp.port", "587");
//			EmailSubject.getProps().put("mail.smtp.host", "smtp-mail.outlook.com");
			System.out.println("****************host**********"+emailObject.getHost());
			EmailSubject.getProps().put("mail.smtp.port", emailObject.getPort());
			EmailSubject.getProps().put("mail.smtp.host",emailObject.getHost());

			
	//		EmailSubject.getProps().put("mail.smtp.user", "autoreports@precot.com");
	//		EmailSubject.getProps().put("mail.smtp.password", "Vsssjsss@2023");
			
//			EmailSubject.getProps().put("mail.smtp.user", "ph-gmp@precot.com");
//			EmailSubject.getProps().put("mail.smtp.password", "Cotton7890#*Co");
			


			mailSender.setJavaMailProperties(emailObject.getProps());

			mailSender.setUsername(emailObject.getUsername());
			mailSender.setPassword(emailObject.getPassword());
            //QA
			mailSender.setHost(emailObject.getHost());
			mailSender.setPort(emailObject.getPort());


			MimeMessageHelper helper = new MimeMessageHelper(mail, true);

			// to mails
			InternetAddress[] mailAddress_TO = new InternetAddress[emailObject.getEmailTo().size()];

			for (int i = 0; i < emailObject.getEmailTo().size(); i++) {
				mailAddress_TO[i] = new InternetAddress(emailObject.getEmailTo().get(i));
			}

			helper.setTo(mailAddress_TO);

			// cc mails
			if ((emailObject.getEmailCC() != null)|| emailObject.getEmailCC().isEmpty()){
				InternetAddress[] mailAddress_CC = new InternetAddress[emailObject.getEmailCC().size()];

				for (int i = 0; i < emailObject.getEmailCC().size(); i++) {
					mailAddress_CC[i] = new InternetAddress(emailObject.getEmailCC().get(i));
				}

				helper.setCc(mailAddress_CC);
			}

			// from mail
			helper.setFrom(emailObject.getEmailFrom());
//			helper.setFrom(AppConstants.fromMail);

			// subject
			helper.setSubject(emailObject.getEmailSubject());
			helper.setText(emailObject.getEmailText(), emailObject.isHTML());

			logger.info("***************** Email content added and ready to send *********************");

			// attachments

			if (emailObject.getFiles() != null) {

				logger.info("***************** Email Entered in file attachment *********************");

				for (File file : emailObject.getFiles()) {

//    		   logger.info("***************** Email file name *********************");
//    		   logger.info(file.getName());
					helper.addAttachment(file.getName(), file);
//    		   logger.info("***************** Email file attached *********************");
				}
			}

			mailSender.send(mail);

			logger.info("***************** Email Sent *********************");

		} catch (Exception ex) {
			logger.error("***************** Email failure *********************\n" + ex);
//			logger.info("mailerror" + ex.toString());
//			logger.info("message" + ex.getMessage());
//			logger.info("cause" + ex.getCause());
			throw new AppException("Unable to send mail");
		}
	}
	@Async
	public void sendMailForSupplierAuditReport(EmailSubject emailObject, String pdfContent, String fileName) {

		try {

			logger.info("***************** Email Object values *********************" + emailObject.toString());

			JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
			MimeMessage mail = mailSender.createMimeMessage();
			System.out.println("****************host**********"+emailObject.getHost());
			EmailSubject.getProps().put("mail.smtp.port", emailObject.getPort());
			EmailSubject.getProps().put("mail.smtp.host",emailObject.getHost());
			EmailSubject.getProps().put("mail.smtp.auth.mechanisms", "LOGIN");
			mailSender.setJavaMailProperties(emailObject.getProps());
			mailSender.setUsername(emailObject.getUsername());
			mailSender.setPassword(emailObject.getPassword());
            //QA
			mailSender.setHost(emailObject.getHost());
			mailSender.setPort(emailObject.getPort());
			MimeMessageHelper helper = new MimeMessageHelper(mail, true);

			// to mails
			InternetAddress[] mailAddress_TO = new InternetAddress[emailObject.getEmailTo().size()];

			for (int i = 0; i < emailObject.getEmailTo().size(); i++) {
				mailAddress_TO[i] = new InternetAddress(emailObject.getEmailTo().get(i));
			}

			helper.setTo(mailAddress_TO);

			// cc mails
			if ((emailObject.getEmailCC() != null)|| emailObject.getEmailCC().isEmpty()){
				InternetAddress[] mailAddress_CC = new InternetAddress[emailObject.getEmailCC().size()];

				for (int i = 0; i < emailObject.getEmailCC().size(); i++) {
					mailAddress_CC[i] = new InternetAddress(emailObject.getEmailCC().get(i));
				}

				helper.setCc(mailAddress_CC);
			}

			// from mail
			helper.setFrom(emailObject.getEmailFrom());
//			helper.setFrom(AppConstants.fromMail);

			// subject
			helper.setSubject(emailObject.getEmailSubject());
			helper.setText(emailObject.getEmailText(), emailObject.isHTML());

			logger.info("***************** Email content added and ready to send *********************");

			// attachments
			
			ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
	        HtmlConverter.convertToPdf(pdfContent, outputStream);
	        byte[] pdfBytes = outputStream.toByteArray();
	        String pdfFileName = fileName+".pdf";
	        helper.addAttachment(pdfFileName, new ByteArrayDataSource(pdfBytes, "application/pdf"));
//			if (emailObject.getFiles() != null) {
//				logger.info("***************** Email Entered in file attachment *********************");
//				for (File file : emailObject.getFiles()) {
//					helper.addAttachment(file.getName(), file);
//				}
//			}

			mailSender.send(mail);

			logger.info("***************** Email Sent *********************");

		} catch (Exception ex) {
			logger.error("***************** Email failure *********************\n" + ex);
			throw new AppException("Unable to send mail");
		}

	}

}
