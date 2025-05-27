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

@Entity
@Table(name = "BMR_SUMMARY_PROD_DETAILS",schema=AppConstants.schema)
public class BmrSummaryProductionDetails extends UserDateAudit {

	@Column(name = "PROD_DETAILS_ID")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long prodDetailsId;
	
	@Column(name = "BMR_NO")
	private String bmr_no;
	
	@Column(name = "BATCH_NO")
	private String batchNo;
	
	@Column(name = "NO_OF_BATCHES")
	private String batchCount;
	
	@Column(name = "BATCH_QUANTITY")
	private String batchQuantity;
	
	@Column(name = "MIXING")
	private String mixing;
	
	@Column(name = "START_SUB_BATCH")
	private String startSubBatch;
	
	@Column(name = "END_SUB_BATCH")
	private String endSubBatch;
	
	@Column(name = "NO_OF_BALES")
	private String baleCount;
	
	@Column(name = "SUPPLY")
	private String supply;
	
	@Column(name = "FINISHING")
	private String finishing;
	
	@Column(name = "START_DATE")
	private String startDate;
	
	@Column(name = "END_DATE")
	private String endDate;
	
	@Column(name = "END_TIME")
	private String endTime;
	
	@Column(name = "START_TIME")
	private String startTime;
	
	@Column(name = "IS_HOUSE")
	private String isHouse;
	
	@Column(name = "IS_EXPORT")
	private String isExport;
	
	@Column(name = "ISSUED_BY")
	private String issuedQuality;
	
	@Column(name = "RECEIVED_BY")
	private String receivedProduction;
	
	@Column(name = "STATUS")
	private String status;

		// SUPERVISOR AND QA DATE 
	
	@Column(name = "SUPERVISIOR_NAME")
	private String supervisiorName;
	
	@Column(name = "SUPERVISIOR_STATUS")
	private String supervisiorStatus;
	
	@Column(name = "SUPERVISIOR_DATE")
	private String supervisiorDate;
	
	@Column(name = "QA_STATUS")
	private String qaStatus;
	
	@Column(name = "QA_ID")
	private Long qaId;
	
	@Column(name = "QA_NAME")
	private String qaName;
	
	@Column(name = "QA_DATE")
	private String qaDate;
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Long getProdDetailsId() {
		return prodDetailsId;
	}

	public void setProdDetailsId(Long prodDetailsId) {
		this.prodDetailsId = prodDetailsId;
	}

	public String getBatchNo() {
		return batchNo;
	}

	public void setBatchNo(String batchNo) {
		this.batchNo = batchNo;
	}

	public String getBatchCount() {
		return batchCount;
	}

	public void setBatchCount(String batchCount) {
		this.batchCount = batchCount;
	}

	public String getBatchQuantity() {
		return batchQuantity;
	}

	public void setBatchQuantity(String batchQuantity) {
		this.batchQuantity = batchQuantity;
	}

	public String getMixing() {
		return mixing;
	}

	public void setMixing(String mixing) {
		this.mixing = mixing;
	}

	public String getStartSubBatch() {
		return startSubBatch;
	}

	public void setStartSubBatch(String startSubBatch) {
		this.startSubBatch = startSubBatch;
	}

	public String getEndSubBatch() {
		return endSubBatch;
	}

	public void setEndSubBatch(String endSubBatch) {
		this.endSubBatch = endSubBatch;
	}

	public String getBaleCount() {
		return baleCount;
	}

	public void setBaleCount(String baleCount) {
		this.baleCount = baleCount;
	}

	public String getSupply() {
		return supply;
	}

	public void setSupply(String supply) {
		this.supply = supply;
	}

	public String getFinishing() {
		return finishing;
	}

	public void setFinishing(String finishing) {
		this.finishing = finishing;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getIssuedQuality() {
		return issuedQuality;
	}

	public void setIssuedQuality(String issuedQuality) {
		this.issuedQuality = issuedQuality;
	}

	public String getReceivedProduction() {
		return receivedProduction;
	}

	public void setReceivedProduction(String receivedProduction) {
		this.receivedProduction = receivedProduction;
	}

	public BmrSummaryProductionDetails() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getBmr_no() {
		return bmr_no;
	}

	public void setBmr_no(String bmr_no) {
		this.bmr_no = bmr_no;
	}

	public String getIsHouse() {
		return isHouse;
	}

	public void setIsHouse(String isHouse) {
		this.isHouse = isHouse;
	}

	public String getIsExport() {
		return isExport;
	}

	public void setIsExport(String isExport) {
		this.isExport = isExport;
	}

	public String getSupervisiorName() {
		return supervisiorName;
	}

	public void setSupervisiorName(String supervisiorName) {
		this.supervisiorName = supervisiorName;
	}

	public String getSupervisiorStatus() {
		return supervisiorStatus;
	}

	public void setSupervisiorStatus(String supervisiorStatus) {
		this.supervisiorStatus = supervisiorStatus;
	}

	public String getSupervisiorDate() {
		return supervisiorDate;
	}

	public void setSupervisiorDate(String supervisiorDate) {
		this.supervisiorDate = supervisiorDate;
	}

	public String getQaStatus() {
		return qaStatus;
	}

	public void setQaStatus(String qaStatus) {
		this.qaStatus = qaStatus;
	}

	public Long getQaId() {
		return qaId;
	}

	public void setQaId(Long qaId) {
		this.qaId = qaId;
	}

	public String getQaName() {
		return qaName;
	}

	public void setQaName(String qaName) {
		this.qaName = qaName;
	}

	public String getQaDate() {
		return qaDate;
	}

	public void setQaDate(String qaDate) {
		this.qaDate = qaDate;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	
	
	
}
