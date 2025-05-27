package com.focusr.Precot.mssql.database.model.padpunching.audit;

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

import com.focusr.Precot.mssql.database.model.SpulanceApprovalOperator;
import com.focusr.Precot.mssql.database.model.SpunlaceSaveSumbitSupervisor;
import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "PUNCHING_HAND_SANITIZATION_AB_PRESS_HISTORY_F24", schema=AppConstants.schema)
public class PunchingHandSanitationHistoryF24 extends SpunlaceSaveSumbitSupervisor{

	@Id
	@Column(name = "HAND_SANITIZATION_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long handSanitizationId;
	
	@Column(name = "UNIT")
	private String unit;
	
	@Column(name = "FORMAT_NO")
	private String formatNo;
	
	@Column(name= "FORMAT_NAME")
	private String formatName;
	
	@Column(name = "REVISION_NUMBER")
	private String revisionNo;
	
	@Column(name = "SOP_NUMBER")
	private String sopNumber;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "SHIFT")
	private String shift;
	
	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "VERSION")
	private int version;
	
	@OneToMany(targetEntity = PunchingSanitationListHistoryF24.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "HAND_SANITIZATION_ID", referencedColumnName = "HAND_SANITIZATION_ID")
	private List<PunchingSanitationListHistoryF24> sanitizationList;


	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getFormatNo() {
		return formatNo;
	}

	public void setFormatNo(String formatNo) {
		this.formatNo = formatNo;
	}

	public String getFormatName() {
		return formatName;
	}

	public void setFormatName(String formatName) {
		this.formatName = formatName;
	}

	public String getRevisionNo() {
		return revisionNo;
	}

	public void setRevisionNo(String revisionNo) {
		this.revisionNo = revisionNo;
	}

	public String getSopNumber() {
		return sopNumber;
	}

	public void setSopNumber(String sopNumber) {
		this.sopNumber = sopNumber;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getShift() {
		return shift;
	}

	public void setShift(String shift) {
		this.shift = shift;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public List<PunchingSanitationListHistoryF24> getSanitizationList() {
		return sanitizationList;
	}

	public void setSanitizationList(List<PunchingSanitationListHistoryF24> sanitizationList) {
		this.sanitizationList = sanitizationList;
	}

	public Long getHandSanitizationId() {
		return handSanitizationId;
	}

	public void setHandSanitizationId(Long handSanitizationId) {
		this.handSanitizationId = handSanitizationId;
	}

	
	
	
	
}
