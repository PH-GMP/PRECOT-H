package com.focusr.Precot.mssql.database.model.bleaching.audit;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "BLEACH_LAY_DOWN_CHECK_LIST_F42_HISTORY", schema=AppConstants.schema)
public class BleachLayDownCheckListF42History extends UserDateAudit {



	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "FORMAT_NAME")
	private String formatName;
	
	@Column(name = "UNIT")
	private String unit;

	@Column(name = "BMR_NO")
	private String bmrNo;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private Long revisionNo;

	@Column(name = "REF_SOP_NO")
	private String refSopNo;

	@Column(name = "LAY_DOWN_START_DATE")
	private String layDownStartdate;

	@Column(name = "LAY_DOWN_END_DATE")
	private String layDownEnddate;

	@Column(name = "LAY_DOWN_NO")
	private String layDownNo;

	@Column(name = "LAY_DOWN_START_TIME")
	private String layDownStartTime;

	@Column(name = "LAY_DOWN_END_TIME")
	private String layDownEndTime;

	@Column(name = "CHECK_BALE_CONDITION")
	private String CheckBaleCondition;

	@Column(name = "CHECK_FORKLIFT_CLEAN")
	private String checkForkliftClean;

	@Column(name = "CHECK_CLEAN_LAY_DOWN")
	private String checkCleanLayDown;

	@Column(name = "SUPPLIED_BALES")
	private String suppliedBales;

	@Column(name = "TOOLS_FOR_CUTTING_STRAPS")
	private String toolsForCuttingStraps;

	@Column(name = "PACKING_MATERIAL")
	private String packingMaterial;

	@Column(name = "TYPE_OF_BAGS")
	private String typeOfBags;

	@Column(name = "CONTAMINATION_INSPECTION")
	private String contaminationInspection;

	@Column(name = "LAY_DOWN_WISE")
	private String layDownWise;

	@Column(name = "REFERENCE_SAMPLE")
	private String referenceSample;

	@Column(name = "REMARKS")
	private String remarks;
	
	// VERSION 
	
	@Column(name = "VERSION")
	private int version;

	// MAIL STATUS

	@Column(name = "MAIL_STATUS")
	private String mail_status;

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
	
	@Column(name = "REJECT_REASON")
	private String reason;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFormatName() {
		return formatName;
	}

	public void setFormatName(String formatName) {
		this.formatName = formatName;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getBmrNo() {
		return bmrNo;
	}

	public void setBmrNo(String bmrNo) {
		this.bmrNo = bmrNo;
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

	public String getLayDownStartdate() {
		return layDownStartdate;
	}

	public void setLayDownStartdate(String layDownStartdate) {
		this.layDownStartdate = layDownStartdate;
	}

	public String getLayDownEnddate() {
		return layDownEnddate;
	}

	public void setLayDownEnddate(String layDownEnddate) {
		this.layDownEnddate = layDownEnddate;
	}

	public String getLayDownNo() {
		return layDownNo;
	}

	public void setLayDownNo(String layDownNo) {
		this.layDownNo = layDownNo;
	}

	public String getLayDownStartTime() {
		return layDownStartTime;
	}

	public void setLayDownStartTime(String layDownStartTime) {
		this.layDownStartTime = layDownStartTime;
	}

	public String getLayDownEndTime() {
		return layDownEndTime;
	}

	public void setLayDownEndTime(String layDownEndTime) {
		this.layDownEndTime = layDownEndTime;
	}

	public String getCheckBaleCondition() {
		return CheckBaleCondition;
	}

	public void setCheckBaleCondition(String checkBaleCondition) {
		CheckBaleCondition = checkBaleCondition;
	}

	public String getCheckForkliftClean() {
		return checkForkliftClean;
	}

	public void setCheckForkliftClean(String checkForkliftClean) {
		this.checkForkliftClean = checkForkliftClean;
	}

	public String getCheckCleanLayDown() {
		return checkCleanLayDown;
	}

	public void setCheckCleanLayDown(String checkCleanLayDown) {
		this.checkCleanLayDown = checkCleanLayDown;
	}

	public String getSuppliedBales() {
		return suppliedBales;
	}

	public void setSuppliedBales(String suppliedBales) {
		this.suppliedBales = suppliedBales;
	}

	public String getToolsForCuttingStraps() {
		return toolsForCuttingStraps;
	}

	public void setToolsForCuttingStraps(String toolsForCuttingStraps) {
		this.toolsForCuttingStraps = toolsForCuttingStraps;
	}

	public String getPackingMaterial() {
		return packingMaterial;
	}

	public void setPackingMaterial(String packingMaterial) {
		this.packingMaterial = packingMaterial;
	}

	public String getTypeOfBags() {
		return typeOfBags;
	}

	public void setTypeOfBags(String typeOfBags) {
		this.typeOfBags = typeOfBags;
	}

	public String getContaminationInspection() {
		return contaminationInspection;
	}

	public void setContaminationInspection(String contaminationInspection) {
		this.contaminationInspection = contaminationInspection;
	}

	public String getLayDownWise() {
		return layDownWise;
	}

	public void setLayDownWise(String layDownWise) {
		this.layDownWise = layDownWise;
	}

	public String getReferenceSample() {
		return referenceSample;
	}

	public void setReferenceSample(String referenceSample) {
		this.referenceSample = referenceSample;
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

	

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	
	
}
