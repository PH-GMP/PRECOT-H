package com.focusr.Precot.mssql.database.model.bleaching;

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

@SuppressWarnings("serial")
@Entity
@Table(name = "BMR_PROCESS_DELAY_EQUP_LINE", schema = AppConstants.schema)
public class BMR_ProcessDelayEqupmentLine extends UserDateAudit {

	@Column(name = "ID")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "DATE")
	private String date;

	@Column(name = "MACHINE")
	private String machine;

	@Column(name = "FROM_HOUR")
	private String from_hour;

	@Column(name = "TO_HOUR")
	private String to_hour;

	@Column(name = "TOTAL_HOUR")
	private String total_hour;

	@Column(name = "SHIFT")
	private String shift;

	@Column(name = "REMARKS")
	private String remarks;

	@Column(name = "REASON")
	private String reason;

	@Column(name = "SIGN")
	private String sign;

	@Column(name = "SIGN_DATE")
	private String sign_date;

	@ManyToOne
	@JoinColumn(name = "PROCESS_ID", nullable = false)
	@JsonIgnore
	private BMR_ProcessDelayEqupment delayDetails;

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

	public String getMachine() {
		return machine;
	}

	public void setMachine(String machine) {
		this.machine = machine;
	}

	public String getFrom_hour() {
		return from_hour;
	}

	public void setFrom_hour(String from_hour) {
		this.from_hour = from_hour;
	}

	public String getTo_hour() {
		return to_hour;
	}

	public void setTo_hour(String to_hour) {
		this.to_hour = to_hour;
	}

	public String getTotal_hour() {
		return total_hour;
	}

	public void setTotal_hour(String total_hour) {
		this.total_hour = total_hour;
	}

	public String getShift() {
		return shift;
	}

	public void setShift(String shift) {
		this.shift = shift;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getSign() {
		return sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
	}

	public String getSign_date() {
		return sign_date;
	}

	public void setSign_date(String sign_date) {
		this.sign_date = sign_date;
	}

	public BMR_ProcessDelayEqupment getDelayDetails() {
		return delayDetails;
	}

	public void setDelayDetails(BMR_ProcessDelayEqupment delayDetails) {
		this.delayDetails = delayDetails;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

}
