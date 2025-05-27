package com.focusr.Precot.Buds.model.bmr;

import java.util.Date;

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
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrQualityReleaseHeader;
import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "BUDS_BMR_QUALITY_RELEASE_LINE", schema = AppConstants.schema)
public class BudsBmrQualityReleaseLine extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "DESCRIPTION")
	private String description;
	
	@Column(name = "QA_NAME")
	private String qaName;
	
	@Column(name = "QA_ID")
	private Long qaId;
	
	@Column(name = "QA_STATUS")
	private String qaStatus;
	
	@Column(name = "QA_DATE")
	private Date qaDate;
	
	@ManyToOne
	@JoinColumn(name = "QUALITY_ID", nullable = false)
	@JsonIgnore
	private BudsBmrQualityReleaseHeader qualityRecord;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public String getQaStatus() {
		return qaStatus;
	}

	public void setQaStatus(String qaStatus) {
		this.qaStatus = qaStatus;
	}

	public Date getQaDate() {
		return qaDate;
	}

	public void setQaDate(Date qaDate) {
		this.qaDate = qaDate;
	}

	public BudsBmrQualityReleaseHeader getQualityRecord() {
		return qualityRecord;
	}

	public void setQualityRecord(BudsBmrQualityReleaseHeader qualityRecord) {
		this.qualityRecord = qualityRecord;
	}

	
	
	
	
}
