package com.focusr.Precot.mssql.database.model.bleaching;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "BMR_QUALITY_RELEASE",schema=AppConstants.schema)
public class BMR_QualityRelease extends UserDateAudit{

	@Id
	@Column(name = "QUALITY_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long qualityId;
	
	@Column(name = "DESCRIPTION")
	private String description;
	
	@Column(name = "STATUS")
	private String status;
	
	@Column(name = "STATUS1")
	private String status1;
	
	@Column(name = "STATUS2")
	private String status2;
	
	@Column(name = "SIGNATURE")
	private String signature;
	
	@Column(name = "SIGNATURE_ID")
	private String signatureId;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "SUMMARY_ID")
	private Long summaryId;

	public Long getQualityId() {
		return qualityId;
	}

	public void setQualityId(Long qualityId) {
		this.qualityId = qualityId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getStatus1() {
		return status1;
	}

	public void setStatus1(String status1) {
		this.status1 = status1;
	}

	public String getStatus2() {
		return status2;
	}

	public void setStatus2(String status2) {
		this.status2 = status2;
	}

	public String getSignature() {
		return signature;
	}

	public void setSignature(String signature) {
		this.signature = signature;
	}

	public BMR_QualityRelease() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getSignatureId() {
		return signatureId;
	}

	public void setSignatureId(String signatureId) {
		this.signatureId = signatureId;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}
	
	
	
}
