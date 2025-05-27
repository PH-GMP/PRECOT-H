package com.focusr.Precot.mssql.database.model.bleaching;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "BLEACH_EQUIP_USAGE_LOG_BOOK_F33",schema=AppConstants.schema)
public class BleachEquipmentUsageLogBookF33 extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "FORMAT_NAME")
	private String formatName;
	
	@Column(name = "UNIT")
	private String unit;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private Long revisionNo;

	@Column(name = "REF_SOP_NO")
	private String refSopNo;

	@Column(name = "DATE")
	private String date;

	@Column(name = "WASTE_CODE")
	private String waste_code;

	@Column(name = "BALE_NO")
	private String bale_no;

	@Column(name = "GROSS_WEIGHT")
	private String gross_weight;

	@Column(name = "NET_WEIGHT")
	private String net_weight;

	@Column(name = "REMARKS")
	private String remarks;

	// STATUS

	@Column(name = "MAIL_STATUS")
	private String mail_status;
	
	@Column(name = "REASON")
	private String reason;
	
	@Lob
	@Column(name = "SUPERVISIOR_SIGNATURE")
	private byte[] supervisiorSignature;
	
	@Lob
	@Column(name = "HOD_SIGNATURE")
	private byte[] hodSignature;
	
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

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getWaste_code() {
		return waste_code;
	}

	public void setWaste_code(String waste_code) {
		this.waste_code = waste_code;
	}

	public String getBale_no() {
		return bale_no;
	}

	public void setBale_no(String bale_no) {
		this.bale_no = bale_no;
	}

	public String getGross_weight() {
		return gross_weight;
	}

	public void setGross_weight(String gross_weight) {
		this.gross_weight = gross_weight;
	}

	public String getNet_weight() {
		return net_weight;
	}

	public void setNet_weight(String net_weight) {
		this.net_weight = net_weight;
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

	public BleachEquipmentUsageLogBookF33(Long id, String formatName, String unit, String formatNo, Long revisionNo,
			String refSopNo, String date, String waste_code, String bale_no, String gross_weight, String net_weight,
			String remarks, String mail_status, String supervisor_status, Date supervisor_saved_on,
			String supervisor_saved_by, Long supervisor_saved_id, Date supervisor_submit_on,
			String supervisor_submit_by, Long supervisor_submit_id, String supervisor_sign, String hod_status,
			Date hod_saved_on, String hod_saved_by, Long hod_saved_id, Date hod_submit_on, String hod_submit_by,
			Long hod_submit_id, String hod_sign) {
		super();
		this.id = id;
		this.formatName = formatName;
		this.unit = unit;
		this.formatNo = formatNo;
		this.revisionNo = revisionNo;
		this.refSopNo = refSopNo;
		this.date = date;
		this.waste_code = waste_code;
		this.bale_no = bale_no;
		this.gross_weight = gross_weight;
		this.net_weight = net_weight;
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

	public BleachEquipmentUsageLogBookF33() {
		super();
		// TODO Auto-generated constructor stub
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
