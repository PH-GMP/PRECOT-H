package com.focusr.Precot.mssql.database.model.bleaching;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "BLEACH_SANITIZATION_OF_MECHINE_AND_SURFACE_F01", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "MONTH", "YEAR", "WEEK" }) })
public class BleachSanitizationOfMechineAndSurfaceF01 extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "SMS_ID")
	private Long sms_id;

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

	@Column(name = "BMR_NUMBER")
	private String bmrNumber;

	@Column(name = "DEPARTMENT")
	private String department;

	@Column(name = "FREQUENCY")
	private String frequency;

	@Column(name = "MONTH")
	private String month;

	@Column(name = "YEAR")
	private String year;

	@Column(name = "WEEK_AND_DATE")
	private String weekAndDate;

	@Column(name = "WEEK")
	private String week;

	@Column(name = "REMARKS")
	private String remarks;
	
	// 21-02-2015 Enhancement
	
	@Column(name = "NAME_OF_THE_CHEMICAL")
	private String nameOfTheChemical;
	
	@Column(name = "CHEMICAL_BATCH_NUMBER")
	private String chemicalBatchNumber;
	
	@Column(name = "EXP_DATE")
	private String expDate;

	// NEWLY ADDED COLUMN AFTER DEMO
	@Column(name = "SANITIZED_BY")
	private String sanitized_by;

	// status
	@Column(name = "MAIL_STATUS")
	private String mail_status;

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

	// HOD

	@Column(name = "HOD_STATUS")
	private String hod_status;

	@Column(name = "HOD_SAVED_ON")
	private Date hod_saved_on;

	@Column(name = "HOD_SAVED_BY")
	private String hod_saved_by;

	@Column(name = "HOD_SAVED_ID")
	private Long hod_saved_id;

	@Column(name = "HOD_SUBMIT_ON")
	private Date hod_submit_on;

	@Column(name = "HOD_SUBMIT_BY")
	private String hod_submit_by;

	@Column(name = "HOD_SUBMIT_ID")
	private Long hod_submit_id;

	@Column(name = "HOD_SIGN")
	private String hod_sign;
	
	@Lob
	@Column(name = "SUPERVISIOR_SIGNATURE")
	private byte[] supervisisorSignature;
	
	@Lob
	@Column(name = "HOD_SIGNATURE")
	private byte[] hodSignature;
	
	@Column(name = "REASON")
	private String reason;

	@OneToMany(targetEntity = BleachSMSActivitiesF01.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "SMS_ID", referencedColumnName = "SMS_ID")
	private List<BleachSMSActivitiesF01> activitesf01;

	public Long getSms_id() {
		return sms_id;
	}

	public void setSms_id(Long sms_id) {
		this.sms_id = sms_id;
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

	public String getBmrNumber() {
		return bmrNumber;
	}

	public void setBmrNumber(String bmrNumber) {
		this.bmrNumber = bmrNumber;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getFrequency() {
		return frequency;
	}

	public void setFrequency(String frequency) {
		this.frequency = frequency;
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

	public String getWeekAndDate() {
		return weekAndDate;
	}

	public void setWeekAndDate(String weekAndDate) {
		this.weekAndDate = weekAndDate;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getSupervisor_status() {
		return supervisor_status;
	}

	public void setSupervisor_status(String supervisor_status) {
		this.supervisor_status = supervisor_status;
	}

	public String getMail_status() {
		return mail_status;
	}

	public void setMail_status(String mail_status) {
		this.mail_status = mail_status;
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

	public Date getHod_saved_on() {
		return hod_saved_on;
	}

	public void setHod_saved_on(Date hod_saved_on) {
		this.hod_saved_on = hod_saved_on;
	}

	public String getHod_saved_by() {
		return hod_saved_by;
	}

	public void setHod_saved_by(String hod_saved_by) {
		this.hod_saved_by = hod_saved_by;
	}

	public Long getHod_saved_id() {
		return hod_saved_id;
	}

	public void setHod_saved_id(Long hod_saved_id) {
		this.hod_saved_id = hod_saved_id;
	}

	public Date getHod_submit_on() {
		return hod_submit_on;
	}

	public void setHod_submit_on(Date hod_submit_on) {
		this.hod_submit_on = hod_submit_on;
	}

	public String getHod_submit_by() {
		return hod_submit_by;
	}

	public void setHod_submit_by(String hod_submit_by) {
		this.hod_submit_by = hod_submit_by;
	}

	public Long getHod_submit_id() {
		return hod_submit_id;
	}

	public void setHod_submit_id(Long hod_submit_id) {
		this.hod_submit_id = hod_submit_id;
	}

	public String getHod_sign() {
		return hod_sign;
	}

	public void setHod_sign(String hod_sign) {
		this.hod_sign = hod_sign;
	}

	public List<BleachSMSActivitiesF01> getActivitesf01() {
		return activitesf01;
	}

	public void setActivitesf01(List<BleachSMSActivitiesF01> activitesf01) {
		this.activitesf01 = activitesf01;
	}

	public String getWeek() {
		return week;
	}

	public void setWeek(String week) {
		this.week = week;
	}

	public BleachSanitizationOfMechineAndSurfaceF01(Long sms_id, String unit, String formatNo, String formatName,
			String sopNumber, String revisionNo, String bmrNumber, String department, String frequency, String month,
			String year, String weekAndDate, String week, String remarks, String mail_status, String supervisor_status,
			Date supervisor_saved_on, String supervisor_saved_by, Long supervisor_saved_id, Date supervisor_submit_on,
			String supervisor_submit_by, Long supervisor_submit_id, String supervisor_sign, String hod_status,
			Date hod_saved_on, String hod_saved_by, Long hod_saved_id, Date hod_submit_on, String hod_submit_by,
			Long hod_submit_id, String hod_sign, List<BleachSMSActivitiesF01> activitesf01) {
		super();
		this.sms_id = sms_id;
		this.unit = unit;
		this.formatNo = formatNo;
		this.formatName = formatName;
		this.sopNumber = sopNumber;
		this.revisionNo = revisionNo;
		this.bmrNumber = bmrNumber;
		this.department = department;
		this.frequency = frequency;
		this.month = month;
		this.year = year;
		this.weekAndDate = weekAndDate;
		this.week = week;
		this.remarks = remarks;
		this.mail_status = mail_status;
		this.supervisor_status = supervisor_status;
		this.supervisor_saved_on = supervisor_saved_on;
		this.supervisor_saved_by = supervisor_saved_by;
		this.supervisor_saved_id = supervisor_saved_id;
		this.supervisor_submit_on = supervisor_submit_on;
		this.supervisor_submit_by = supervisor_submit_by;
		this.supervisor_submit_id = supervisor_submit_id;
		this.supervisor_sign = supervisor_sign;
		this.hod_status = hod_status;
		this.hod_saved_on = hod_saved_on;
		this.hod_saved_by = hod_saved_by;
		this.hod_saved_id = hod_saved_id;
		this.hod_submit_on = hod_submit_on;
		this.hod_submit_by = hod_submit_by;
		this.hod_submit_id = hod_submit_id;
		this.hod_sign = hod_sign;
		this.activitesf01 = activitesf01;
	}

	public BleachSanitizationOfMechineAndSurfaceF01() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getSanitized_by() {
		return sanitized_by;
	}

	public void setSanitized_by(String sanitized_by) {
		this.sanitized_by = sanitized_by;
	}

	public byte[] getSupervisisorSignature() {
		return supervisisorSignature;
	}

	public void setSupervisisorSignature(byte[] supervisisorSignature) {
		this.supervisisorSignature = supervisisorSignature;
	}

	public byte[] getHodSignature() {
		return hodSignature;
	}

	public void setHodSignature(byte[] hodSignature) {
		this.hodSignature = hodSignature;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getNameOfTheChemical() {
		return nameOfTheChemical;
	}

	public void setNameOfTheChemical(String nameOfTheChemical) {
		this.nameOfTheChemical = nameOfTheChemical;
	}

	public String getChemicalBatchNumber() {
		return chemicalBatchNumber;
	}

	public void setChemicalBatchNumber(String chemicalBatchNumber) {
		this.chemicalBatchNumber = chemicalBatchNumber;
	}

	public String getExpDate() {
		return expDate;
	}

	public void setExpDate(String expDate) {
		this.expDate = expDate;
	}
	
	
	

}
