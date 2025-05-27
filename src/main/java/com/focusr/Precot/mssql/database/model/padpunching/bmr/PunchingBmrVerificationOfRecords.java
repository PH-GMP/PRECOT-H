package com.focusr.Precot.mssql.database.model.padpunching.bmr;


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

import com.focusr.Precot.payload.spulance.SpunlaceSummerySubmit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Entity
@Table(name = "PADPUNCHING_BMR_VERIFICATION_OF_RECORDS", schema = AppConstants.schema)
public class PunchingBmrVerificationOfRecords extends SpunlaceSummerySubmit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "VERIFICATION_ID")
	private Long verificationId;

	@Column(name = "ORDER_NO")
	private String orderNo;
	
	@Column(name = "BATCH_NO")
	private String batchNo;
	
	@Column(name = "DEPARTMENT")
	private String department;
	
	@Column(name = "STATUS")
	private String status;
	
//	@OneToMany(targetEntity = PunchingBmrVerificationOfRecordsLine.class, cascade = CascadeType.ALL)
//	@JoinColumn(name = "VERIFICATION_ID", referencedColumnName = "VERIFICATION_ID")
//	private List<PunchingBmrVerificationOfRecordsLine> details;
	
	
	@OneToMany(mappedBy = "verificationRecord", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PunchingBmrVerificationOfRecordsLine> details;

	public Long getVerificationId() {
		return verificationId;
	}

	public void setVerificationId(Long verificationId) {
		this.verificationId = verificationId;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public List<PunchingBmrVerificationOfRecordsLine> getDetails() {
		return details;
	}

	public void setDetails(List<PunchingBmrVerificationOfRecordsLine> details) {
		this.details = details;
	}

	public PunchingBmrVerificationOfRecords() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getBatchNo() {
		return batchNo;
	}

	public void setBatchNo(String batchNo) {
		this.batchNo = batchNo;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	

}
