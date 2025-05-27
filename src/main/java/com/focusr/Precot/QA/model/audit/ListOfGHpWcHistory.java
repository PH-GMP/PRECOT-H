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
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;


@Entity
@Table(name = "LIST_OF_GHPWC_HISTORY", schema = AppConstants.schema)
public class ListOfGHpWcHistory extends UserDateAudit {

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

	@Column(name = "REJ_REASON")
	private String rej_reason;

	@Column(name = "TO_NO_GLASS")
	private String to_no_glass;

	@Column(name = "TO_NO_HP")
	private String to_no_hp;

	@Column(name = "TO_NO_WOOD")
	private String to_no_wood;

	@Column(name = "TO_NO_CERAMIC")
	private String to_no_ceramic;

	// INSP

	@Column(name = "QA_INSPECTOR_STATUS")
	private String qa_inspector_status;

	@Column(name = "QA_INSPECTOR_SAVED_ON")
	private Date qa_inspector_saved_on;

	@Column(name = "QA_INSPECTOR_SAVED_BY")
	private String qa_inspector_saved_by;

	@Column(name = "QA_INSPECTOR_SAVED_ID")
	private Long qa_inspector_saved_id;

	@Column(name = "QA_INSPECTOR_SUBMITTED_ON")
	private Date qa_inspector_submitted_on;

	@Column(name = "QA_INSPECTOR_SUBMITTED_BY")
	private String qa_inspector_submitted_by;

	@Column(name = "QA_INSPECTOR_SUBMITTED_ID")
	private Long qa_inspector_submitted_id;

	@Column(name = "QA_INSPECTOR_SIGN")
	private String qa_inspector_sign;

	// MANAGER STATUS

	@Column(name = "MANAGER_STATUS")
	private String manager_status;

	@Column(name = "MANAGER_SUBMITTED_ON")
	private Date manager_submitted_on;

	@Column(name = "MANAGER_SUBMITTED_BY")
	private String manager_submitted_by;

	@Column(name = "MANAGER_SUBMITTED_ID")
	private Long manager_submitted_id;

	@Column(name = "MANAGER_SIGN")
	private String manager_sign;

	@Column(name = "VERSION")
	private int version;

	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "details")
	private List<ListOfGHpWcTypesHistory> typeslist;

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

	public String getRej_reason() {
		return rej_reason;
	}

	public void setRej_reason(String rej_reason) {
		this.rej_reason = rej_reason;
	}

	public String getTo_no_glass() {
		return to_no_glass;
	}

	public void setTo_no_glass(String to_no_glass) {
		this.to_no_glass = to_no_glass;
	}

	public String getTo_no_hp() {
		return to_no_hp;
	}

	public void setTo_no_hp(String to_no_hp) {
		this.to_no_hp = to_no_hp;
	}

	public String getTo_no_wood() {
		return to_no_wood;
	}

	public void setTo_no_wood(String to_no_wood) {
		this.to_no_wood = to_no_wood;
	}

	public String getTo_no_ceramic() {
		return to_no_ceramic;
	}

	public void setTo_no_ceramic(String to_no_ceramic) {
		this.to_no_ceramic = to_no_ceramic;
	}

	public String getQa_inspector_status() {
		return qa_inspector_status;
	}

	public void setQa_inspector_status(String qa_inspector_status) {
		this.qa_inspector_status = qa_inspector_status;
	}

	public Date getQa_inspector_saved_on() {
		return qa_inspector_saved_on;
	}

	public void setQa_inspector_saved_on(Date qa_inspector_saved_on) {
		this.qa_inspector_saved_on = qa_inspector_saved_on;
	}

	public String getQa_inspector_saved_by() {
		return qa_inspector_saved_by;
	}

	public void setQa_inspector_saved_by(String qa_inspector_saved_by) {
		this.qa_inspector_saved_by = qa_inspector_saved_by;
	}

	public Long getQa_inspector_saved_id() {
		return qa_inspector_saved_id;
	}

	public void setQa_inspector_saved_id(Long qa_inspector_saved_id) {
		this.qa_inspector_saved_id = qa_inspector_saved_id;
	}

	public Date getQa_inspector_submitted_on() {
		return qa_inspector_submitted_on;
	}

	public void setQa_inspector_submitted_on(Date qa_inspector_submitted_on) {
		this.qa_inspector_submitted_on = qa_inspector_submitted_on;
	}

	public String getQa_inspector_submitted_by() {
		return qa_inspector_submitted_by;
	}

	public void setQa_inspector_submitted_by(String qa_inspector_submitted_by) {
		this.qa_inspector_submitted_by = qa_inspector_submitted_by;
	}

	public Long getQa_inspector_submitted_id() {
		return qa_inspector_submitted_id;
	}

	public void setQa_inspector_submitted_id(Long qa_inspector_submitted_id) {
		this.qa_inspector_submitted_id = qa_inspector_submitted_id;
	}

	public String getQa_inspector_sign() {
		return qa_inspector_sign;
	}

	public void setQa_inspector_sign(String qa_inspector_sign) {
		this.qa_inspector_sign = qa_inspector_sign;
	}

	public String getManager_status() {
		return manager_status;
	}

	public void setManager_status(String manager_status) {
		this.manager_status = manager_status;
	}

	public Date getManager_submitted_on() {
		return manager_submitted_on;
	}

	public void setManager_submitted_on(Date manager_submitted_on) {
		this.manager_submitted_on = manager_submitted_on;
	}

	public String getManager_submitted_by() {
		return manager_submitted_by;
	}

	public void setManager_submitted_by(String manager_submitted_by) {
		this.manager_submitted_by = manager_submitted_by;
	}

	public Long getManager_submitted_id() {
		return manager_submitted_id;
	}

	public void setManager_submitted_id(Long manager_submitted_id) {
		this.manager_submitted_id = manager_submitted_id;
	}

	public String getManager_sign() {
		return manager_sign;
	}

	public void setManager_sign(String manager_sign) {
		this.manager_sign = manager_sign;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public List<ListOfGHpWcTypesHistory> getTypeslist() {
		return typeslist;
	}

	public void setTypeslist(List<ListOfGHpWcTypesHistory> typeslist) {
		this.typeslist = typeslist;
	}
	
	

}
