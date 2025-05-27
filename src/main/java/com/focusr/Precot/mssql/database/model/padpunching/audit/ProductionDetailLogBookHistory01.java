package com.focusr.Precot.mssql.database.model.padpunching.audit;

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

import com.focusr.Precot.mssql.database.model.SpunlaceSaveSumbitSupervisor;
import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "PRODUCTION_DETAIL_LOG_BOOK_HISTORY_F01", schema = AppConstants.schema)
public class ProductionDetailLogBookHistory01 extends SpunlaceSaveSumbitSupervisor{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "HISTORY_ID")
	private Long history_id;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private String revisionNo;

	@Column(name = "REF_SOP_NO")
	private String refSopNo;

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "DATE")
	private String date;

	@Column(name = "SHIFT")
	private String shift;

	@Column(name = "PH_MALE_EMP_REQ")
	private String ph_male_emp_req;

	@Column(name = "PH_MALE_PRESENT")
	private String ph_male_present;

	@Column(name = "PH_FEMALE_EMP_REQ")
	private String ph_female_emp_req;

	@Column(name = "PH_FEMALE_PRESENT")
	private String ph_female_present;

	@Column(name = "CONT_MALE_EMP_REQ")
	private String cont_male_emp_req;

	@Column(name = "CON_MALE_PRESENT")
	private String con_male_present;

	@Column(name = "CON_FEMALE_EMP_REQ")
	private String con_female_emp_req;

	@Column(name = "CON_FEMALE_PRESENT")
	private String con_female_present;

	@Column(name = "REMARKS")
	private String remarks;

	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "VERSION")
	private int version;
	
	@Column(name = "TAKEOVER_SUPERVISOR_DATE")
	private String takeOverSupervisorDate;

	@Column(name = "TAKEOVER_SUPERVISOR_SIGN")
	private String takeover_supervisor_sign;

	@OneToMany(targetEntity = ProductionDetailLogBookLinesHistory01.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "HISTORY_ID", referencedColumnName = "HISTORY_ID")
	private List<ProductionDetailLogBookLinesHistory01> details;

	public Long getHistory_id() {
		return history_id;
	}

	public void setHistory_id(Long history_id) {
		this.history_id = history_id;
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

	public String getRevisionNo() {
		return revisionNo;
	}

	public void setRevisionNo(String revisionNo) {
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

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getShift() {
		return shift;
	}

	public void setShift(String shift) {
		this.shift = shift;
	}

	

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public List<ProductionDetailLogBookLinesHistory01> getDetails() {
		return details;
	}

	public void setDetails(List<ProductionDetailLogBookLinesHistory01> details) {
		this.details = details;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public String getTakeOverSupervisorDate() {
		return takeOverSupervisorDate;
	}

	public void setTakeOverSupervisorDate(String takeOverSupervisorDate) {
		this.takeOverSupervisorDate = takeOverSupervisorDate;
	}

	public String getTakeover_supervisor_sign() {
		return takeover_supervisor_sign;
	}

	public void setTakeover_supervisor_sign(String takeover_supervisor_sign) {
		this.takeover_supervisor_sign = takeover_supervisor_sign;
	}

	public String getPh_male_emp_req() {
		return ph_male_emp_req;
	}

	public void setPh_male_emp_req(String ph_male_emp_req) {
		this.ph_male_emp_req = ph_male_emp_req;
	}

	public String getPh_male_present() {
		return ph_male_present;
	}

	public void setPh_male_present(String ph_male_present) {
		this.ph_male_present = ph_male_present;
	}

	public String getPh_female_emp_req() {
		return ph_female_emp_req;
	}

	public void setPh_female_emp_req(String ph_female_emp_req) {
		this.ph_female_emp_req = ph_female_emp_req;
	}

	public String getPh_female_present() {
		return ph_female_present;
	}

	public void setPh_female_present(String ph_female_present) {
		this.ph_female_present = ph_female_present;
	}

	public String getCont_male_emp_req() {
		return cont_male_emp_req;
	}

	public void setCont_male_emp_req(String cont_male_emp_req) {
		this.cont_male_emp_req = cont_male_emp_req;
	}

	public String getCon_male_present() {
		return con_male_present;
	}

	public void setCon_male_present(String con_male_present) {
		this.con_male_present = con_male_present;
	}

	public String getCon_female_emp_req() {
		return con_female_emp_req;
	}

	public void setCon_female_emp_req(String con_female_emp_req) {
		this.con_female_emp_req = con_female_emp_req;
	}

	public String getCon_female_present() {
		return con_female_present;
	}

	public void setCon_female_present(String con_female_present) {
		this.con_female_present = con_female_present;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	
	
	
	
}
