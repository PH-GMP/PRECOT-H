package com.focusr.Precot.mssql.database.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "IMAGE_DETAILS", schema=AppConstants.schema)
public class UserImageDetails extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IMAGE_ID")
	private Long imageId;
	
	@Column(name = "IMAGE_NAME")
	private String imageName;
	
	@Column(name = "USER_ID")
	private Long userId;
	
	@Column(name = "USERNAME")
	private String username;
	
	@Column(name = "IMAGE_SIZE")
	private long imageSize;
	
	@Lob
	@Column(name = "IMAGE")
	private byte[] image;
	
	
}
