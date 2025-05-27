package com.focusr.Precot.mssql.database.model.bleaching;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;

import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "BLEACH_HOUSE_KEEP_CLEAN_CHECK_LIST_F02A",schema=AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE" }) })
public class BleachHouseKeepingCheckListF02A extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CLEAN_ID")
	private Long clean_id;

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private Long revisionNo;

	@Column(name = "REF_SOP_NO")
	private String refSopNo;

	@Column(name = "FREQUENCY")
	private String frequency;

	@Column(name = "DATE")
	private String date;

	@Column(name = "MONTH")
	private String month;

	@Column(name = "YEAR")
	private String year;

	@Column(name = "DEPARTMENT")
	private String department;

	@Column(name = "FLOOR_CLEANINH")
	private String floor_cleaninh;

	@Column(name = "REMOVEL_UNWANTED_METERIALS")
	private String removel_unwanted_meterials;

	@Column(name = "SIDE_WALL_CORNERS")
	private String side_wall_corners;

	@Column(name = "WINDOWS")
	private String windows;

	@Column(name = "EMERGENCY_DOOR")
	private String emergency_door;

	@Column(name = "FIRE_EXTINGUISHERS")
	private String fire_extinguishers;

	@Column(name = "FIRST_AID_BOX")
	private String first_aid_box;

	@Column(name = "RAPID_DOORS")
	private String rapid_doors;

	@Column(name = "ROOF_CLEANING")
	private String roof_cleaning;

	/////
	@Column(name = "REMARKS")
	private String remarks;

	@Column(name = "MAIL_STATUS")
	private String mail_status;
	
	@Lob
	@Column(name = "SUPERVISIOR_SIGNATURE")
	private byte[] supervisisorSignature;
	
	@Lob
	@Column(name = "HOD_SIGNATURE")
	private byte[] hodSignature;
	
	@Lob
	@Column(name = "HR_SIGNATURE")
	private byte[] hrSignature;
	
	@Column(name = "REASON")
	private String reason;

	// kaviya 06/sep/24
	@Column(name = "CLEANED_BY")
	private String cleaned_by;
//Sup
	@Column(name = "SUPERVISOR_STATUS")
	private String supervisor_status;

	@Column(name = "SUPERVISOR_SUBMIT_ON")
	private Date supervisor_submit_on;

	@Column(name = "SUPERVISOR_SUBMIT_BY")
	private String supervisor_submit_by;

	@Column(name = "SUPERVISOR_SUBMIT_ID")
	private Long supervisor_submit_id;

	@Column(name = "SUPERVISOR_SIGN")
	private String supervisor_sign;

	// Hr

	@Column(name = "HR_SUBMIT_ON")
	private Date hr_submit_on;

	@Column(name = "HR_SUBMIT_BY")
	private String hr_submit_by;

	@Column(name = "HR_SUBMIT_ID")
	private Long hr_submit_id;

	@Column(name = "HR_SIGN")
	private String hr_sign;

	@Column(name = "HR_STATUS")
	private String hr_status;
	
	@Column(name = "HR_MAIL_STATUS")
	private String hr_mail_status;


	// Hod

	@Column(name = "HOD_SUBMIT_ON")
	private Date hod_submit_on;

	@Column(name = "HOD_SUBMIT_BY")
	private String hod_submit_by;

	@Column(name = "HOD_SUBMIT_ID")
	private Long hod_submit_id;

	@Column(name = "HOD_SIGN")
	private String hod_sign;

	@Column(name = "HOD_STATUS")
	private String hod_status;

	public Long getClean_id() {
		return clean_id;
	}

	public void setClean_id(Long clean_id) {
		this.clean_id = clean_id;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getFormatName() {
		return formatName;
	}

	public void setFormatName(String formatName) {
		this.formatName = formatName;
	}

	public String getFormatNo() {
		return formatNo;
	}

	public void setFormatNo(String formatNo) {
		this.formatNo = formatNo;
	}

	public Long getRevisionNo() {
		return revisionNo;
	}

	public void setRevisionNo(Long revisionNo) {
		this.revisionNo = revisionNo;
	}

	public String getRefSopNo() {
		return refSopNo;
	}

	public void setRefSopNo(String refSopNo) {
		this.refSopNo = refSopNo;
	}

	public String getFrequency() {
		return frequency;
	}

	public void setFrequency(String frequency) {
		this.frequency = frequency;
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

	public String getFloor_cleaninh() {
		return floor_cleaninh;
	}

	public void setFloor_cleaninh(String floor_cleaninh) {
		this.floor_cleaninh = floor_cleaninh;
	}

	public String getRemovel_unwanted_meterials() {
		return removel_unwanted_meterials;
	}

	public void setRemovel_unwanted_meterials(String removel_unwanted_meterials) {
		this.removel_unwanted_meterials = removel_unwanted_meterials;
	}

	public String getSide_wall_corners() {
		return side_wall_corners;
	}

	public void setSide_wall_corners(String side_wall_corners) {
		this.side_wall_corners = side_wall_corners;
	}

	public String getWindows() {
		return windows;
	}

	public void setWindows(String windows) {
		this.windows = windows;
	}

	public String getEmergency_door() {
		return emergency_door;
	}

	public void setEmergency_door(String emergency_door) {
		this.emergency_door = emergency_door;
	}

	public String getFire_extinguishers() {
		return fire_extinguishers;
	}

	public void setFire_extinguishers(String fire_extinguishers) {
		this.fire_extinguishers = fire_extinguishers;
	}

	public String getFirst_aid_box() {
		return first_aid_box;
	}

	public void setFirst_aid_box(String first_aid_box) {
		this.first_aid_box = first_aid_box;
	}

	public String getRapid_doors() {
		return rapid_doors;
	}

	public void setRapid_doors(String rapid_doors) {
		this.rapid_doors = rapid_doors;
	}

	public String getRoof_cleaning() {
		return roof_cleaning;
	}

	public void setRoof_cleaning(String roof_cleaning) {
		this.roof_cleaning = roof_cleaning;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getMail_status() {
		return mail_status;
	}

	public void setMail_status(String mail_status) {
		this.mail_status = mail_status;
	}

	public String getSupervisor_status() {
		return supervisor_status;
	}

	public void setSupervisor_status(String supervisor_status) {
		this.supervisor_status = supervisor_status;
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

	public Date getHr_submit_on() {
		return hr_submit_on;
	}

	public void setHr_submit_on(Date hr_submit_on) {
		this.hr_submit_on = hr_submit_on;
	}

	public String getHr_submit_by() {
		return hr_submit_by;
	}

	public void setHr_submit_by(String hr_submit_by) {
		this.hr_submit_by = hr_submit_by;
	}

	public Long getHr_submit_id() {
		return hr_submit_id;
	}

	public void setHr_submit_id(Long hr_submit_id) {
		this.hr_submit_id = hr_submit_id;
	}

	public String getHr_sign() {
		return hr_sign;
	}

	public void setHr_sign(String hr_sign) {
		this.hr_sign = hr_sign;
	}

	public String getHr_status() {
		return hr_status;
	}

	public void setHr_status(String hr_status) {
		this.hr_status = hr_status;
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

	public String getHod_status() {
		return hod_status;
	}

	public void setHod_status(String hod_status) {
		this.hod_status = hod_status;
	}

	public String getHr_mail_status() {
		return hr_mail_status;
	}

	public void setHr_mail_status(String hr_mail_status) {
		this.hr_mail_status = hr_mail_status;
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

	public byte[] getHrSignature() {
		return hrSignature;
	}

	public void setHrSignature(byte[] hrSignature) {
		this.hrSignature = hrSignature;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getCleaned_by() {
		return cleaned_by;
	}

	public void setCleaned_by(String cleaned_by) {
		this.cleaned_by = cleaned_by;
	}
	
	

}
