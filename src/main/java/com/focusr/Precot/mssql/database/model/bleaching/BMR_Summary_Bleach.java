package com.focusr.Precot.mssql.database.model.bleaching;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.payload.BleachBmrSummerySubmit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "BMR_SUMMARY_BLEACH",schema=AppConstants.schema)
public class BMR_Summary_Bleach  extends BleachBmrSummerySubmit {

	@Column(name = "SUMMARY_ID")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long summaryId;
	
	@Column(name = "BMR_NO")
	private String bmrNo;
	
	@Column(name = "STAGE")
	private String stage;
	
	@Column(name = "VERIFIED_BY")
	private String verifiedBy;
	
	@Column(name = "VERIFIED_ID")
	private String verifiedId;
	
	@Column(name = "REVIEWED_BY")
	private String reviewedBy;
	
	@Column(name = "REVIEWER_ID")
	private Long reviewerId;
	
	@Column(name = "VERIFIED_DATE")
	private String verfiedDate;
	
	@Column(name = "REVIEWED_DATE")
	private String reviewedDate;
	
	@Column(name = "FORM_KEY")
	private String key;
	
	@OneToMany(targetEntity = BMR_QualityRelease.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "SUMMARY_ID", referencedColumnName = "SUMMARY_ID")
	private List<BMR_QualityRelease> qualityRelease;
	
	@OneToMany(targetEntity = BMR_MachineOpeartionParameters.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "SUMMARY_ID", referencedColumnName = "SUMMARY_ID")
	private List<BMR_MachineOpeartionParameters> operations;


	public Long getSummaryId() {
		return summaryId;
	}


	public void setSummaryId(Long summaryId) {
		this.summaryId = summaryId;
	}


	public String getBmrNo() {
		return bmrNo;
	}


	public void setBmrNo(String bmrNo) {
		this.bmrNo = bmrNo;
	}


	public String getStage() {
		return stage;
	}


	public void setStage(String stage) {
		this.stage = stage;
	}


	public String getVerifiedBy() {
		return verifiedBy;
	}


	public void setVerifiedBy(String verifiedBy) {
		this.verifiedBy = verifiedBy;
	}


	public String getVerifiedId() {
		return verifiedId;
	}


	public void setVerifiedId(String verifiedId) {
		this.verifiedId = verifiedId;
	}


	public String getReviewedBy() {
		return reviewedBy;
	}


	public void setReviewedBy(String reviewedBy) {
		this.reviewedBy = reviewedBy;
	}


	public Long getReviewerId() {
		return reviewerId;
	}


	public void setReviewerId(Long reviewerId) {
		this.reviewerId = reviewerId;
	}


	public List<BMR_QualityRelease> getQualityRelease() {
		return qualityRelease;
	}


	public void setQualityRelease(List<BMR_QualityRelease> qualityRelease) {
		this.qualityRelease = qualityRelease;
	}


	public List<BMR_MachineOpeartionParameters> getOperations() {
		return operations;
	}


	public void setOperations(List<BMR_MachineOpeartionParameters> operations) {
		this.operations = operations;
	}


	public String getVerfiedDate() {
		return verfiedDate;
	}


	public void setVerfiedDate(String verfiedDate) {
		this.verfiedDate = verfiedDate;
	}


	public String getReviewedDate() {
		return reviewedDate;
	}


	public void setReviewedDate(String reviewedDate) {
		this.reviewedDate = reviewedDate;
	}
	
	
	
}
