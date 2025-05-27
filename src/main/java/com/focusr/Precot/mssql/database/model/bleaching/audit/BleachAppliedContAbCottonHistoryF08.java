package com.focusr.Precot.mssql.database.model.bleaching.audit;

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
import com.focusr.Precot.mssql.database.model.bleaching.BleachAppliedContAbCottonTypesF08;
import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "BLEACH_APPLIED_CONT_AB_COTTON_HISTORY_F08", schema=AppConstants.schema)
public class BleachAppliedContAbCottonHistoryF08 extends UserDateAudit {

	@Id
	@Column(name = "AB_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ab_id;

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

	@Column(name = "DATE")
	private String date;

	@Column(name = "TOTAL_01")
	private String total_01;

	@Column(name = "TOTAL_02")
	private String total_02;
	
	@Column(name = "VERSION")
	private int version;
	
	@Column(name = "REASON")
	private String reason;
	
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
	
	@Column(name = "HOD_STATUS")
	private String hod_status;
	
	@Column(name = "HOD_SUBMIT_ON")
	private Date hod_submit_on;

	@Column(name = "HOD_SUBMIT_BY")
	private String hod_submit_by;

	@Column(name = "HOD_SUBMIT_ID")
	private Long hod_submit_id;

	@Column(name = "HOD_SIGN")
	private String hod_sign;
	
	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "rawCottonF04")
	private List<BleachAppliedContAbCottonTypesHistoryF08> detailsAbCottonF04;

	public Long getAb_id() {
		return ab_id;
	}

	public void setAb_id(Long ab_id) {
		this.ab_id = ab_id;
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

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTotal_01() {
		return total_01;
	}

	public void setTotal_01(String total_01) {
		this.total_01 = total_01;
	}

	public String getTotal_02() {
		return total_02;
	}

	public void setTotal_02(String total_02) {
		this.total_02 = total_02;
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

	public String getHod_status() {
		return hod_status;
	}

	public void setHod_status(String hod_status) {
		this.hod_status = hod_status;
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

	public List<BleachAppliedContAbCottonTypesHistoryF08> getDetailsAbCottonF04() {
		return detailsAbCottonF04;
	}

	public void setDetailsAbCottonF04(List<BleachAppliedContAbCottonTypesHistoryF08> detailsAbCottonF04) {
		this.detailsAbCottonF04 = detailsAbCottonF04;
	}

	public BleachAppliedContAbCottonHistoryF08() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	
	
	
}
