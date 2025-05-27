package com.focusr.Precot.QA.model.audit;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;


@Entity
@Table(name = "CONTROL_OF_GHPWC_HISTORY", schema = AppConstants.schema)
public class ControlOfGHpWcHistory extends UserDateAudit {

	@Id
	@Column(name = "HIST_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long hist_id;

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "SOP_NO")
	private String sopNumber;

	@Column(name = "REVISION_NO")
	private String revisionNo;

	@Column(name = "DATE")
	private String date;

	@Column(name = "MONTH")
	private String month;

	@Column(name = "YEAR")
	private String year;

	@Column(name = "DEPARTMENT")
	private String department;

	// SUPERVISOR
	@Column(name = "SUPERVISOR_STATUS")
	private String supervisor_status;

	@Column(name = "SUPERVISOR_SAVED_ON")
	private Date supervisor_saved_on;

	@Column(name = "SUPERVISOR_SAVED_BY")
	private String supervisor_saved_by;

	@Column(name = "SUPERVISOR_SAVED_ID")
	private Long supervisor_saved_id;

	@Column(name = "SUPERVISOR_SUBMIT_ON")
	private Date supervisor_submit_on;

	@Column(name = "SUPERVISOR_SUBMIT_BY")
	private String supervisor_submit_by;

	@Column(name = "SUPERVISOR_SUBMIT_ID")
	private Long supervisor_submit_id;

	@Column(name = "SUPERVISOR_SIGN")
	private String supervisor_sign;

	// HOD STATUS

	@Column(name = "HOD_STATUS")
	private String hod_status;

	@Column(name = "HOD_SUBMITTED_ON")
	private Date hod_submitted_on;

	@Column(name = "HOD_SUBMITTED_BY")
	private String hod_submitted_by;

	@Column(name = "HOD_SUBMITTED_ID")
	private Long hod_submitted_id;

	@Column(name = "HOD_SIGN")
	private String hod_sign;

	@Column(name = "REASON")
	private String reason;

	@Column(name = "CHECKED_BY")
	private String checked_by;

	@Column(name = "VERSION")
	private int version;

	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "details")
	private List<ControlOfGHpWcTypesHistory> ghpwcTypes;

	public Long getHist_id() {
		return hist_id;
	}

	public void setHist_id(Long hist_id) {
		this.hist_id = hist_id;
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

	public String getSopNumber() {
		return sopNumber;
	}

	public void setSopNumber(String sopNumber) {
		this.sopNumber = sopNumber;
	}

	public String getRevisionNo() {
		return revisionNo;
	}

	public void setRevisionNo(String revisionNo) {
		this.revisionNo = revisionNo;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getSupervisor_status() {
		return supervisor_status;
	}

	public void setSupervisor_status(String supervisor_status) {
		this.supervisor_status = supervisor_status;
	}

	public Date getSupervisor_saved_on() {
		return supervisor_saved_on;
	}

	public void setSupervisor_saved_on(Date supervisor_saved_on) {
		this.supervisor_saved_on = supervisor_saved_on;
	}

	public String getSupervisor_saved_by() {
		return supervisor_saved_by;
	}

	public void setSupervisor_saved_by(String supervisor_saved_by) {
		this.supervisor_saved_by = supervisor_saved_by;
	}

	public Long getSupervisor_saved_id() {
		return supervisor_saved_id;
	}

	public void setSupervisor_saved_id(Long supervisor_saved_id) {
		this.supervisor_saved_id = supervisor_saved_id;
	}

	public Date getSupervisor_submit_on() {
		return supervisor_submit_on;
	}

	public void setSupervisor_submit_on(Date supervisor_submit_on) {
		this.supervisor_submit_on = supervisor_submit_on;
	}

	public String getSupervisor_submit_by() {
		return supervisor_submit_by;
	}

	public void setSupervisor_submit_by(String supervisor_submit_by) {
		this.supervisor_submit_by = supervisor_submit_by;
	}

	public Long getSupervisor_submit_id() {
		return supervisor_submit_id;
	}

	public void setSupervisor_submit_id(Long supervisor_submit_id) {
		this.supervisor_submit_id = supervisor_submit_id;
	}

	public String getSupervisor_sign() {
		return supervisor_sign;
	}

	public void setSupervisor_sign(String supervisor_sign) {
		this.supervisor_sign = supervisor_sign;
	}

	public String getHod_status() {
		return hod_status;
	}

	public void setHod_status(String hod_status) {
		this.hod_status = hod_status;
	}

	public Date getHod_submitted_on() {
		return hod_submitted_on;
	}

	public void setHod_submitted_on(Date hod_submitted_on) {
		this.hod_submitted_on = hod_submitted_on;
	}

	public String getHod_submitted_by() {
		return hod_submitted_by;
	}

	public void setHod_submitted_by(String hod_submitted_by) {
		this.hod_submitted_by = hod_submitted_by;
	}

	public Long getHod_submitted_id() {
		return hod_submitted_id;
	}

	public void setHod_submitted_id(Long hod_submitted_id) {
		this.hod_submitted_id = hod_submitted_id;
	}

	public String getHod_sign() {
		return hod_sign;
	}

	public void setHod_sign(String hod_sign) {
		this.hod_sign = hod_sign;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getChecked_by() {
		return checked_by;
	}

	public void setChecked_by(String checked_by) {
		this.checked_by = checked_by;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public List<ControlOfGHpWcTypesHistory> getGhpwcTypes() {
		return ghpwcTypes;
	}

	public void setGhpwcTypes(List<ControlOfGHpWcTypesHistory> ghpwcTypes) {
		this.ghpwcTypes = ghpwcTypes;
	}
	
	

}
