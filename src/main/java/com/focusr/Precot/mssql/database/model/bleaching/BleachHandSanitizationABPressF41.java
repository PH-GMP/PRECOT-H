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
@Table(name = "BLEACH_HAND_SANITIZATION_AB_PRESS_F41",schema=AppConstants.schema, uniqueConstraints = {
	    @UniqueConstraint(columnNames = {"DATE", "SHIFT"})
	})
public class BleachHandSanitizationABPressF41 extends UserDateAudit{

	@Id
	@Column(name = "HAND_SANITIZATION_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long handSanitizationId;
	
	@Column(name = "UNIT")
	private String unit;
	
	@Column(name = "FORMAT_NO")
	private String formatNo;
	
	@Column(name= "FORMAT_NAME")
	private String formatName;
	
	@Column(name = "REVISION_NUMBER")
	private String revisionNo;
	
	@Column(name = "SOP_NUMBER")
	private String sopNumber;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "SHIFT")
	private String shift;
	
	
	 //status
    @Column(name = "MAIL_STATUS")
	private String mail_status;
    
    @Lob
	@Column(name = "SUPERVISIOR_SIGNATURE")
	private byte[] supervisisorSignature;
	
	@Lob
	@Column(name = "HOD_SIGNATURE")
	private byte[] hodSignature;
	
	@Column(name = "REASON")
	private String reason;
   
 
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
	
	@OneToMany(targetEntity = BleachSanitizationListF41.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "HAND_SANITIZATION_ID", referencedColumnName = "HAND_SANITIZATION_ID")
	private List<BleachSanitizationListF41> sanitizationList;
	
//	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "handSanitizationPress")
//	private List<BleachSanitizationListF41> sanitizationList;


	public Long getHandSanitizationId() {
		return handSanitizationId;
	}


	public void setHandSanitizationId(Long handSanitizationId) {
		this.handSanitizationId = handSanitizationId;
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


	public String getRevisionNo() {
		return revisionNo;
	}


	public void setRevisionNo(String revisionNo) {
		this.revisionNo = revisionNo;
	}


	public String getSopNumber() {
		return sopNumber;
	}


	public void setSopNumber(String sopNumber) {
		this.sopNumber = sopNumber;
	}


	public String getDate() {
		return date;
	}


	public void setDate(String date) {
		this.date = date;
	}


	


	public List<BleachSanitizationListF41> getSanitizationList() {
		return sanitizationList;
	}


	public void setSanitizationList(List<BleachSanitizationListF41> sanitizationList) {
		this.sanitizationList = sanitizationList;
	}


	public BleachHandSanitizationABPressF41() {
		super();
		// TODO Auto-generated constructor stub
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


	public String getShift() {
		return shift;
	}


	public void setShift(String shift) {
		this.shift = shift;
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

	
	
}
