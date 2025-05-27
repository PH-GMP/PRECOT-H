package com.focusr.Precot.mssql.database.model.bleaching;

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
@Table(name = "BLEACH_EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_F11",schema=AppConstants.schema,uniqueConstraints = {
		@UniqueConstraint(columnNames = {"BMR_NO", "SUB_BATCH_NO"})
	})
public class EquipLogBookHydroExtractorF11 extends UserDateAudit
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
	private Long id;
	
	@Column(name = "FORMAT_NAME")
	private String formatName;
	
	@Column(name = "FORMAT_NO")
	private String formatNo;
	
	@Column(name = "REVISION_NO")
	private Long revisionNo;
	
	@Column(name = "REF_SOP_NO")
	private String refSopNo;
	
	@Column(name = "UNIT")
	private String unit;
	
	@Column(name = "BMR_NO")
	private String bmrNo;

	@Column(name = "MIXING")
	private String mixing;

	@Column(name = "SUB_BATCH_NO")
	private String subBatchNo;

	@Column(name = "MC_NO")
	private String mcNo;

	@Column(name = "TIMER_SETTING")
	private String timerSetting;

	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "REASON")
	private String reason;
	
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
	private byte[] supervisiorSignature;
	
	@Lob
	@Column(name = "HOD_SIGNATURE")
	private byte[] hodSignature;
	
//	@OneToMany(targetEntity = EquipmentLogsF11.class, cascade = CascadeType.ALL)
//	@JoinColumn(name = "EQUIPMENT_LOGBOOK_ID", referencedColumnName = "ID")
//	private List<EquipmentLogsF11> equipmentLogDetails;
//	
//	@Column(name = "STATUS")
//	private String status;
	
	public EquipLogBookHydroExtractorF11() {
	}

	public EquipLogBookHydroExtractorF11(Long id, String formatName, String formatNo, Long revisionNo, String refSopNo,
		String unit, String bmrNo, String mixing, String subBatchNo, String mcNo, String timerSetting, String remarks,
		String mail_status, String supervisor_status, Date supervisor_saved_on, String supervisor_saved_by,
		Long supervisor_saved_id, Date supervisor_submit_on, String supervisor_submit_by, Long supervisor_submit_id,
		String supervisor_sign, String hod_status, Date hod_saved_on, String hod_saved_by, Long hod_saved_id,
		Date hod_submit_on, String hod_submit_by, Long hod_submit_id, String hod_sign) {
	super();
	this.id = id;
	this.formatName = formatName;
	this.formatNo = formatNo;
	this.revisionNo = revisionNo;
	this.refSopNo = refSopNo;
	this.unit = unit;
	this.bmrNo = bmrNo;
	this.mixing = mixing;
	this.subBatchNo = subBatchNo;
	this.mcNo = mcNo;
	this.timerSetting = timerSetting;
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
}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getMail_status() {
		return mail_status;
	}

	public void setMail_status(String mail_status) {
		this.mail_status = mail_status;
	}

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

	public String getBmrNo() {
		return bmrNo;
	}

	public void setBmrNo(String bmrNo) {
		this.bmrNo = bmrNo;
	}

	public String getMixing() {
		return mixing;
	}

	public void setMixing(String mixing) {
		this.mixing = mixing;
	}

	public String getSubBatchNo() {
		return subBatchNo;
	}

	public void setSubBatchNo(String subBatchNo) {
		this.subBatchNo = subBatchNo;
	}

	public String getMcNo() {
		return mcNo;
	}

	public void setMcNo(String mcNo) {
		this.mcNo = mcNo;
	}

	public String getTimerSetting() {
		return timerSetting;
	}

	public void setTimerSetting(String timerSetting) {
		this.timerSetting = timerSetting;
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

	@Override
	public String toString() {
		return "EquipLogBookHydroExtractorF11 [id=" + id + ", formatName=" + formatName + ", formatNo=" + formatNo
				+ ", revisionNo=" + revisionNo + ", refSopNo=" + refSopNo + ", unit=" + unit + ", bmrNo=" + bmrNo
				+ ", mixing=" + mixing + ", subBatchNo=" + subBatchNo + ", mcNo=" + mcNo + ", timerSetting="
				+ timerSetting + ", remarks=" + remarks + ", mail_status=" + mail_status + ", supervisor_status="
				+ supervisor_status + ", supervisor_saved_on=" + supervisor_saved_on + ", supervisor_saved_by="
				+ supervisor_saved_by + ", supervisor_saved_id=" + supervisor_saved_id + ", supervisor_submit_on="
				+ supervisor_submit_on + ", supervisor_submit_by=" + supervisor_submit_by + ", supervisor_submit_id="
				+ supervisor_submit_id + ", supervisor_sign=" + supervisor_sign + ", hod_status=" + hod_status
				+ ", hod_saved_on=" + hod_saved_on + ", hod_saved_by=" + hod_saved_by + ", hod_saved_id=" + hod_saved_id
				+ ", hod_submit_on=" + hod_submit_on + ", hod_submit_by=" + hod_submit_by + ", hod_submit_id="
				+ hod_submit_id + ", hod_sign=" + hod_sign + "]";
	}


	public byte[] getSupervisiorSignature() {
		return supervisiorSignature;
	}

	public void setSupervisiorSignature(byte[] supervisiorSignature) {
		this.supervisiorSignature = supervisiorSignature;
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
	
	

}
