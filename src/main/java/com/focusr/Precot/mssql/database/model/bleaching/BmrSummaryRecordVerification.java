package com.focusr.Precot.mssql.database.model.bleaching;

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

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.payload.BleachBmrSummerySubmit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "BMR_SUMMARY_RECORD_VERFICATION",schema=AppConstants.schema)
public class BmrSummaryRecordVerification extends BleachBmrSummerySubmit {

	@Column(name = "SUMMARY_RECORD_ID")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long summaryRecordId;
	
	@Column(name = "BMR_NO")
	private String bmr_no;
	
	@Column(name = "FORM_KEY")
	private String key;
	
	@OneToMany(targetEntity = BmrSummaryVerification.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "SUMMARY_RECORD_ID", referencedColumnName = "SUMMARY_RECORD_ID")
	private List<BmrSummaryVerification> summaryVerification;
	
	@OneToMany(targetEntity = BmrSummaryEnclosureList.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "SUMMARY_RECORD_ID", referencedColumnName = "SUMMARY_RECORD_ID")
	private List<BmrSummaryEnclosureList> enclosureList;

	public Long getSummaryRecordId() {
		return summaryRecordId;
	}

	public void setSummaryRecordId(Long summaryRecordId) {
		this.summaryRecordId = summaryRecordId;
	}

	public String getBmr_no() {
		return bmr_no;
	}

	public void setBmr_no(String bmr_no) {
		this.bmr_no = bmr_no;
	}

	public List<BmrSummaryVerification> getSummaryVerification() {
		return summaryVerification;
	}

	public void setSummaryVerification(List<BmrSummaryVerification> summaryVerification) {
		this.summaryVerification = summaryVerification;
	}

	public List<BmrSummaryEnclosureList> getEnclosureList() {
		return enclosureList;
	}

	public void setEnclosureList(List<BmrSummaryEnclosureList> enclosureList) {
		this.enclosureList = enclosureList;
	}

	public BmrSummaryRecordVerification() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	
}
