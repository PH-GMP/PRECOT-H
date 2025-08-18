package com.focusr.Precot.mssql.database.model.padpunching.bmr;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "PADPUNCHING_BMR_PROCESS_DEVAITION_LINE", schema = AppConstants.schema)
public class PunchingBmrProcessDeviationRecordLine extends UserDateAudit {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "DEVIATION_LOG_NO")
	private String deviationLogNo;

	@Column(name = "QA_REMARKS")
	private String qaRemarks;

	@Column(name = "SUPERVISOR_NAME")
	private String supervisorName;

	@Column(name = "SUPERVISOR_STATUS")
	private String supervisorStatus;

	@Column(name = "SUPERVISOR_ID")
	private Long supervisorId;

	@Column(name = "SUPERVISOR_DATE")
	private String supervisorDate;

	@Column(name = "QA_NAME")
	private String qaName;

	@Column(name = "QA_STATUS")
	private String qaStatus;

	@Column(name = "QA_DATE")
	private String qaDate;

	@Column(name = "QA_ID")
	private Long qaId;

	@ManyToOne
	@JoinColumn(name = "DEVIATION_ID", nullable = false)
	@JsonIgnore
	private PunchingBmrProcessDeviationRecordHeader deviationRecord;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDeviationLogNo() {
		return deviationLogNo;
	}

	public void setDeviationLogNo(String deviationLogNo) {
		this.deviationLogNo = deviationLogNo;
	}

	public String getQaRemarks() {
		return qaRemarks;
	}

	public void setQaRemarks(String qaRemarks) {
		this.qaRemarks = qaRemarks;
	}

	public String getSupervisorName() {
		return supervisorName;
	}

	public void setSupervisorName(String supervisorName) {
		this.supervisorName = supervisorName;
	}

	public String getSupervisorStatus() {
		return supervisorStatus;
	}

	public void setSupervisorStatus(String supervisorStatus) {
		this.supervisorStatus = supervisorStatus;
	}

	public Long getSupervisorId() {
		return supervisorId;
	}

	public void setSupervisorId(Long supervisorId) {
		this.supervisorId = supervisorId;
	}

	public String getSupervisorDate() {
		return supervisorDate;
	}

	public void setSupervisorDate(String supervisorDate) {
		this.supervisorDate = supervisorDate;
	}

	public String getQaName() {
		return qaName;
	}

	public void setQaName(String qaName) {
		this.qaName = qaName;
	}

	public String getQaStatus() {
		return qaStatus;
	}

	public void setQaStatus(String qaStatus) {
		this.qaStatus = qaStatus;
	}

	public String getQaDate() {
		return qaDate;
	}

	public void setQaDate(String qaDate) {
		this.qaDate = qaDate;
	}

	public Long getQaId() {
		return qaId;
	}

	public void setQaId(Long qaId) {
		this.qaId = qaId;
	}

	public PunchingBmrProcessDeviationRecordLine() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PunchingBmrProcessDeviationRecordHeader getDeviationRecord() {
		return deviationRecord;
	}

	public void setDeviationRecord(PunchingBmrProcessDeviationRecordHeader deviationRecord) {
		this.deviationRecord = deviationRecord;
	}

}
