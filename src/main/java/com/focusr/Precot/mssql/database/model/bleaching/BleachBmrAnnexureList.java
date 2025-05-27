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
import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "BLEACH_BMR_ANNEXURE", schema=AppConstants.schema)
public class BleachBmrAnnexureList extends UserDateAudit {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "BMR_NO")
	private String bmr_no;
	
	@Column(name = "SUBMITTED_DATE")
	private String submittedDate;
	
	@Column(name = "VERIFIED_BY")
	private String verifiedBy;
	
	@Column(name = "VERIFIED_DATE")
	private String verifiedDate;
	
	@Column(name = "STATUS")
	private String status;
	
	@OneToMany(targetEntity = BleachBmrAnnexureDates.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "ID", referencedColumnName = "ID")
	private List<BleachBmrAnnexureDates> annexureDates;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBmr_no() {
		return bmr_no;
	}

	public void setBmr_no(String bmr_no) {
		this.bmr_no = bmr_no;
	}

	public String getSubmittedDate() {
		return submittedDate;
	}

	public void setSubmittedDate(String submittedDate) {
		this.submittedDate = submittedDate;
	}

	public String getVerifiedBy() {
		return verifiedBy;
	}

	public void setVerifiedBy(String verifiedBy) {
		this.verifiedBy = verifiedBy;
	}

	public List<BleachBmrAnnexureDates> getAnnexureDates() {
		return annexureDates;
	}

	public void setAnnexureDates(List<BleachBmrAnnexureDates> annexureDates) {
		this.annexureDates = annexureDates;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getVerifiedDate() {
		return verifiedDate;
	}

	public void setVerifiedDate(String verifiedDate) {
		this.verifiedDate = verifiedDate;
	}
	
	
	
}
