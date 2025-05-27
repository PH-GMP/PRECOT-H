package com.focusr.Precot.mssql.database.model.bleaching;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Entity
@Table(name = "BMR_SUMMARY_ENCLOSURE",schema=AppConstants.schema)
public class BmrSummaryEnclosureList extends UserDateAudit {

	@Column(name = "ENCLOSURE_ID")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long enclosureId;
	
	//Siva
	@Column(name = "SUMMARY_RECORD_ID")
	private Long summary_record_id;
	
	@Column(name = "TITLE")
	private String title;
	
	@Column(name = "REMARK1")
	private String remark1;
	
	@Column(name = "REMARK2")
	private String remark2;
	
	@Column(name = "STATUS")
	private String status;

	public Long getEnclosureId() {
		return enclosureId;
	}

	public void setEnclosureId(Long enclosureId) {
		this.enclosureId = enclosureId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getRemark1() {
		return remark1;
	}

	public void setRemark1(String remark1) {
		this.remark1 = remark1;
	}

	public String getRemark2() {
		return remark2;
	}

	public void setRemark2(String remark2) {
		this.remark2 = remark2;
	}

	public BmrSummaryEnclosureList() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getSummary_record_id() {
		return summary_record_id;
	}

	public void setSummary_record_id(Long summary_record_id) {
		this.summary_record_id = summary_record_id;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	
	
	
	
	
}
