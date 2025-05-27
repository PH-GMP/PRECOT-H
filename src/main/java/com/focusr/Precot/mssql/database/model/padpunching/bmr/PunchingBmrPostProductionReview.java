package com.focusr.Precot.mssql.database.model.padpunching.bmr;

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
@Table(name = "PUNCHING_BMR_POST_PRODUCTION_REVIEW", schema = AppConstants.schema)
public class PunchingBmrPostProductionReview extends UserDateAudit {

	@Id
	@Column(name = "PRODUCTION_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long productionId;
	
	@Column(name = "ORDER_NO")
	private String order_no;
	
	@Column(name = "BATCH_NO")
	private String batchNo;
	
	@Column(name = "DEPARTMENT")
	private String department;
	
	@Column(name = "STATUS")
	private String status;
	
	@Column(name = "QA_STATUS")
	private String qaStatus;
	
	@Column(name = "QA_NAME")
	private String qaName;
	
	@Column(name = "qa_ID")
	private Long qaId;
	
	@Column(name = "QA_SUBMITTED_DATE")
	private Date qaSubmittedDate;
	
	@Column(name = "HOD_STATUS")
	private String hodStatus;
	
	@Column(name = "HOD_NAME")
	private String hodName;
	
	@Column(name = "HOD_ID")
	private Long hodId;
	
	@Column(name = "HOD_SUBMITTED_DATE")
	private Date hodSubmittedDate;
	
	@Column(name = "SUPERVISOR_STATUS")
	private String supervisorStatus;
	
	@Column(name = "SUPERVISOR_NAME")
	private String supervisorName;
	
	@Column(name = "SUPERVISOR_ID")
	private Long supervisorId;
	
	@Column(name = "SUPERVISOR_SUBMITTED_DATE")
	private Date supervisiorSubmittedDate;

	public Long getProductionId() {
		return productionId;
	}

	public void setProductionId(Long productionId) {
		this.productionId = productionId;
	}

	public String getOrder_no() {
		return order_no;
	}

	public void setOrder_no(String order_no) {
		this.order_no = order_no;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getQaStatus() {
		return qaStatus;
	}

	public void setQaStatus(String qaStatus) {
		this.qaStatus = qaStatus;
	}

	public String getQaName() {
		return qaName;
	}

	public void setQaName(String qaName) {
		this.qaName = qaName;
	}

	public Long getQaId() {
		return qaId;
	}

	public void setQaId(Long qaId) {
		this.qaId = qaId;
	}

	public Date getQaSubmittedDate() {
		return qaSubmittedDate;
	}

	public void setQaSubmittedDate(Date qaSubmittedDate) {
		this.qaSubmittedDate = qaSubmittedDate;
	}

	public String getHodStatus() {
		return hodStatus;
	}

	public void setHodStatus(String hodStatus) {
		this.hodStatus = hodStatus;
	}

	public String getHodName() {
		return hodName;
	}

	public void setHodName(String hodName) {
		this.hodName = hodName;
	}

	public Long getHodId() {
		return hodId;
	}

	public void setHodId(Long hodId) {
		this.hodId = hodId;
	}

	public Date getHodSubmittedDate() {
		return hodSubmittedDate;
	}

	public void setHodSubmittedDate(Date hodSubmittedDate) {
		this.hodSubmittedDate = hodSubmittedDate;
	}

	public String getSupervisorStatus() {
		return supervisorStatus;
	}

	public void setSupervisorStatus(String supervisorStatus) {
		this.supervisorStatus = supervisorStatus;
	}

	public String getSupervisorName() {
		return supervisorName;
	}

	public void setSupervisorName(String supervisorName) {
		this.supervisorName = supervisorName;
	}

	public Long getSupervisorId() {
		return supervisorId;
	}

	public void setSupervisorId(Long supervisorId) {
		this.supervisorId = supervisorId;
	}

	public Date getSupervisiorSubmittedDate() {
		return supervisiorSubmittedDate;
	}

	public void setSupervisiorSubmittedDate(Date supervisiorSubmittedDate) {
		this.supervisiorSubmittedDate = supervisiorSubmittedDate;
	}

	public PunchingBmrPostProductionReview() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getBatchNo() {
		return batchNo;
	}

	public void setBatchNo(String batchNo) {
		this.batchNo = batchNo;
	}
	
	
	
}
