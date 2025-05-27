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
@Table(name = "PUNCHING_BMR_STOPPAGE_LINE", schema = AppConstants.schema)
public class PunchingBmrStoppageLine extends UserDateAudit {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "FROM_TIME")
	private String fromTime;
	
	@Column(name = "TO_TIME")
	private String toTime;
	
	@Column(name = "TOTAL_TIME")
	private String totalTime;
	
	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "SUPERVISOR_STATUS")
	private String supervisorStatus;
	
	@Column(name = "SUPERVISOR_NAME")
	private String supervisorName;
	
	@Column(name = "SUPERVISOR_ID")
	private Long supervisorId;
	
	@Column(name = "SUPERVISOR_DATE")
	private String supervisorDate;

	@ManyToOne
    @JoinColumn(name = "STOPPAGE_ID", nullable = false)
	@JsonIgnore
    private PunchingBmrStoppageHeader stoppageRecord;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getFromTime() {
		return fromTime;
	}

	public void setFromTime(String fromTime) {
		this.fromTime = fromTime;
	}

	public String getToTime() {
		return toTime;
	}

	public void setToTime(String toTime) {
		this.toTime = toTime;
	}

	public String getTotalTime() {
		return totalTime;
	}

	public void setTotalTime(String totalTime) {
		this.totalTime = totalTime;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
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

	public String getSupervisorDate() {
		return supervisorDate;
	}

	public void setSupervisorDate(String supervisorDate) {
		this.supervisorDate = supervisorDate;
	}

	public PunchingBmrStoppageHeader getStoppageRecord() {
		return stoppageRecord;
	}

	public void setStoppageRecord(PunchingBmrStoppageHeader stoppageRecord) {
		this.stoppageRecord = stoppageRecord;
	}
	
	
}
