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
@Table(name = "METAL_DETECTOR_CHECK_LIST_F03",schema=AppConstants.schema,uniqueConstraints = {
		@UniqueConstraint(columnNames = {"DATE", "SECTION"})
	})
public class MetalDetectorCheckListF03 extends UserDateAudit{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LIST_ID")
	private Long listId;
	
	@Column(name = "FORMAT_NAME")
	private String formatName;
	
	@Column(name = "FORMAT_NO")
	private String formatNo;
	
	@Column(name = "REVISION_NO")
	private Long revisionNo;
	
	@Column(name = "REF_SOP_NO")
	private String refSopNo;
	
	@Column(name = "UNIT")
	private String unit ;
	
	@Column(name = "SECTION")
	private String section;
	
	@Column(name = "EQUIPMENT_NAME")
	private String equipmentName;
	
	@Column(name = "FREQUENCY")
	private String frequency;
	
	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "METAL_CONTAMINATED_MATERIALS")
	private String metalContaminatedMaterials;
	
	@Column(name = "NO_OF_METAL_CONTAMINANTS")
	private String noOfMetalContaminants;
	
	@Column(name = "FUNCTION_CHECK")
	private String functionCheck;
	
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
	
	@Column(name = "CLEANED_BY")
	private String cleanedBy;
	
	@Column(name = "REASON")
	private String reason;
	
	@Lob
	@Column(name = "SUPERVISIOR_IMAGE")
	private byte[] supervisiorImage;
	
	@Lob
	@Column(name = "HOD_IMAGE")
	private byte[] hodImage;

	public MetalDetectorCheckListF03() {
		super();
	}

	public MetalDetectorCheckListF03(Long listId, String formatName, String formatNo, Long revisionNo, String refSopNo,
			String unit, String section, String equipmentName, String frequency, String remarks, String date,
			String metalContaminatedMaterials, String noOfMetalContaminants, String functionCheck, String mail_status,
			String supervisor_status, Date supervisor_saved_on, String supervisor_saved_by, Long supervisor_saved_id,
			Date supervisor_submit_on, String supervisor_submit_by, Long supervisor_submit_id, String supervisor_sign,
			String hod_status, Date hod_saved_on, String hod_saved_by, Long hod_saved_id, Date hod_submit_on,
			String hod_submit_by, Long hod_submit_id, String hod_sign) {
		super();
		this.listId = listId;
		this.formatName = formatName;
		this.formatNo = formatNo;
		this.revisionNo = revisionNo;
		this.refSopNo = refSopNo;
		this.unit = unit;
		this.section = section;
		this.equipmentName = equipmentName;
		this.frequency = frequency;
		this.remarks = remarks;
		this.date = date;
		this.metalContaminatedMaterials = metalContaminatedMaterials;
		this.noOfMetalContaminants = noOfMetalContaminants;
		this.functionCheck = functionCheck;
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

	public Long getListId() {
		return listId;
	}

	public void setListId(Long listId) {
		this.listId = listId;
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

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getSection() {
		return section;
	}

	public void setSection(String section) {
		this.section = section;
	}

	public String getEquipmentName() {
		return equipmentName;
	}

	public void setEquipmentName(String equipmentName) {
		this.equipmentName = equipmentName;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getMetalContaminatedMaterials() {
		return metalContaminatedMaterials;
	}

	public void setMetalContaminatedMaterials(String metalContaminatedMaterials) {
		this.metalContaminatedMaterials = metalContaminatedMaterials;
	}

	public String getNoOfMetalContaminants() {
		return noOfMetalContaminants;
	}

	public void setNoOfMetalContaminants(String noOfMetalContaminants) {
		this.noOfMetalContaminants = noOfMetalContaminants;
	}

	public String getFunctionCheck() {
		return functionCheck;
	}

	public void setFunctionCheck(String functionCheck) {
		this.functionCheck = functionCheck;
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

	public String getFrequency() {
		return frequency;
	}

	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}
	

	public String getCleanedBy() {
		return cleanedBy;
	}

	public void setCleanedBy(String cleanedBy) {
		this.cleanedBy = cleanedBy;
	}

	@Override
	public String toString() {
		return "MetalDetectorCheckListF03 [listId=" + listId + ", formatName=" + formatName + ", formatNo=" + formatNo
				+ ", revisionNo=" + revisionNo + ", refSopNo=" + refSopNo + ", unit=" + unit + ", section=" + section
				+ ", equipmentName=" + equipmentName + ", frequency=" + frequency + ", remarks=" + remarks + ", date="
				+ date + ", metalContaminatedMaterials=" + metalContaminatedMaterials + ", noOfMetalContaminants="
				+ noOfMetalContaminants + ", functionCheck=" + functionCheck + ", mail_status=" + mail_status
				+ ", supervisor_status=" + supervisor_status + ", supervisor_saved_on=" + supervisor_saved_on
				+ ", supervisor_saved_by=" + supervisor_saved_by + ", supervisor_saved_id=" + supervisor_saved_id
				+ ", supervisor_submit_on=" + supervisor_submit_on + ", supervisor_submit_by=" + supervisor_submit_by
				+ ", supervisor_submit_id=" + supervisor_submit_id + ", supervisor_sign=" + supervisor_sign
				+ ", hod_status=" + hod_status + ", hod_saved_on=" + hod_saved_on + ", hod_saved_by=" + hod_saved_by
				+ ", hod_saved_id=" + hod_saved_id + ", hod_submit_on=" + hod_submit_on + ", hod_submit_by="
				+ hod_submit_by + ", hod_submit_id=" + hod_submit_id + ", hod_sign=" + hod_sign + ", cleanedBy="
				+ cleanedBy + "]";
	}

	public byte[] getSupervisiorImage() {
		return supervisiorImage;
	}

	public void setSupervisiorImage(byte[] supervisiorImage) {
		this.supervisiorImage = supervisiorImage;
	}

	public byte[] getHodImage() {
		return hodImage;
	}

	public void setHodImage(byte[] hodImage) {
		this.hodImage = hodImage;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	
	
	
}
