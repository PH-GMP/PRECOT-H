package com.focusr.Precot.mssql.database.model.bleaching;

import java.util.Date;

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
@Table(name = "BMR_SUMMARY_VERIFICATION",schema=AppConstants.schema)
public class BmrSummaryVerification extends UserDateAudit {

	@Column(name = "SUMMARY_VERIFICATION_ID")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long summaryVerficationId;
	
	//Siva
	
	@Column(name = "SUMMARY_RECORD_ID")
	private Long summary_record_id;
	
	@Column(name = "RECORD_NAME")
	private String recordName;
	
	@Column(name = "STATUS1")
	private String status;
	
	@Column(name = "STATUS2")
	private String status2;
	
	@Column(name = "VERIFIED_BY")
	private String verifiedBy;
	
	@Column(name = "VERIFIED_ID")
	private String verifiedId;
	
	@Column(name = "REVIEWER_ID")
	private Long reviewerId;
	
	@Column(name = "REVIEWER_BY")
	private String reviewedBy;
	
	@Column(name = "DATE1")
	private String date1;
	
	@Column(name = "DATE2")
	private String date2;
	
	@Column(name = "SUPERVISOR_STATUS")
	private String supervisorStatus;
	
	@Column(name = "QA_STATUS")
	private String qaStatus;
	
	@Column(name = "SUPERVISIOR_SUBMITTED_ON")
	private Date supervisiorSubmittedOn;
	
	@Column(name = "QA_SUBMITTED_ON")
	private Date qaSubmittedOn;

	public Long getSummaryVerficationId() {
		return summaryVerficationId;
	}

	public void setSummaryVerficationId(Long summaryVerficationId) {
		this.summaryVerficationId = summaryVerficationId;
	}

	public String getRecordName() {
		return recordName;
	}

	public void setRecordName(String recordName) {
		this.recordName = recordName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getStatus2() {
		return status2;
	}

	public void setStatus2(String status2) {
		this.status2 = status2;
	}

	public BmrSummaryVerification() {
		super();
		// TODO Auto-generated constructor stub
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

	public Long getReviewerId() {
		return reviewerId;
	}

	public void setReviewerId(Long reviewerId) {
		this.reviewerId = reviewerId;
	}

	public String getReviewedBy() {
		return reviewedBy;
	}

	public void setReviewedBy(String reviewedBy) {
		this.reviewedBy = reviewedBy;
	}

	public String getDate1() {
		return date1;
	}

	public void setDate1(String date1) {
		this.date1 = date1;
	}

	public String getDate2() {
		return date2;
	}

	public void setDate2(String date2) {
		this.date2 = date2;
	}
	
	
}
