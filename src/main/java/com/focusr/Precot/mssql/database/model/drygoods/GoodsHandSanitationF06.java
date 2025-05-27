package com.focusr.Precot.mssql.database.model.drygoods;

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
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.mssql.database.model.SpunlaceSaveSumbitSupervisor;
import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "GOODS_HAND_SANITIZATION_AB_PRESS_F13",schema=AppConstants.schema, uniqueConstraints = {
	    @UniqueConstraint(columnNames = {"DATE", "SHIFT"})
	})
public class GoodsHandSanitationF06 extends SpunlaceSaveSumbitSupervisor {

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
	
	@Column(name = "DEPARTMENT")
	private String department;
	
//	@OneToMany(targetEntity = GoodsSanitationListF06.class, cascade = CascadeType.ALL)
//	@JoinColumn(name = "HAND_SANITIZATION_ID", referencedColumnName = "HAND_SANITIZATION_ID")
//	private List<GoodsSanitationListF06> sanitizationList;
	
	@OneToMany(mappedBy = "details", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GoodsSanitationListF06> sanitizationList;

	public Long getHandSanitizationId() {
		return handSanitizationId;
	}

	public void setHandSanitizationId(Long handSanitizationId) {
		this.handSanitizationId = handSanitizationId;
	}

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

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public List<GoodsSanitationListF06> getSanitizationList() {
		return sanitizationList;
	}

	public void setSanitizationList(List<GoodsSanitationListF06> sanitizationList) {
		this.sanitizationList = sanitizationList;
	}
	
}
