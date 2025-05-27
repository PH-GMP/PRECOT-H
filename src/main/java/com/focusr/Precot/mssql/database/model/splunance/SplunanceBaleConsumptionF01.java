package com.focusr.Precot.mssql.database.model.splunance;

import java.util.Date;
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
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.mssql.database.model.SpulanceApprovalOperator;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPL_BALE_CONSUMPTION_F01", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE", "SHIFT", "ORDER_NO" }) })
public class SplunanceBaleConsumptionF01 extends SpulanceApprovalOperator {

	@Id
	@Column(name = "SB_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long sb_id;

	@JsonProperty("form_name")
	@Column(name = "FORM_NAME")
	private String formName;

	@JsonProperty("format_no")
	@Column(name = "FORMAT_NO")
	private String formatNo;

	@JsonProperty("revision_no")
	@Column(name = "REVISION_NO")
	private String revisionNo;

	@JsonProperty("sop_number")
	@Column(name = "SOP_NUMBER")
	private String sopNumber;

	@JsonProperty("date")
	@Column(name = "DATE")
	private String date;

	@JsonProperty("shift")
	@Column(name = "SHIFT")
	private String shift;

	@JsonProperty("order_number")
	@Column(name = "ORDER_NO")
	private String orderNumber;
	
	@Column(name = "TOTAL_AB_WEIGHT")
	private String totalABWeight;
	
	@Column(name = "TOTAL_RP_WEIGHT")
	private String totalRpWeight;
	
	@Column(name = "REASON")
	private String reason;

//	@JsonProperty("mixing")
//	@Column(name = "MIXING")
//	private String mixing;
//
//	@JsonProperty("customer_name")
//	@Column(name = "CUSTOMER_NAME")
//	private String customerName;
//
//	@JsonProperty("material_code")
//	@Column(name = "MATERIAL_CODE")
//	private String materialCode;
//
//	@JsonProperty("gsm")
//	@Column(name = "GSM")
//	private String gsm;
	
	// OPERATOR
//	@Column(name = "OPERATOR_STATUS")
//	private String operator_status;
//	
//	@Column(name = "OPERATOR_SUBMITTED_BY")
//	private String operator_submitted_by;
//	
//	@Column(name = "OPERATOR_SUBMITTED_ON")
//	private Date operator_submitted_ON;
//	
//	@Column(name = "OPERATOR_SUBMITTED_ID")
//	private Long operator_submitted_id;
//	
//	@Column(name = "OPERATOR_SIGN")
//	private String operator_sign;
//	
//	@Column(name = "OPERATOR_MAIL_STATUS")
//	private String operator_mail_status;

	// MAPPING

//	@OneToMany(targetEntity = SpluanceBaleConsumptionCottonTypesF01.class, cascade = CascadeType.ALL)
//	@JoinColumn(name = "SB_ID", referencedColumnName = "SB_ID")
//	private List<SpluanceBaleConsumptionCottonTypesF01> bleachCottonDetails;
//
//	@OneToMany(targetEntity = SpluanceBaleConsumptionRpCottonF01.class, cascade = CascadeType.ALL)
//	@JoinColumn(name = "SB_ID", referencedColumnName = "SB_ID")
//	private List<SpluanceBaleConsumptionRpCottonF01> rpCottonDetails;

	

	public Long getSb_id() {
		return sb_id;
	}

	public void setSb_id(Long sb_id) {
		this.sb_id = sb_id;
	}

	public String getFormName() {
		return formName;
	}

	public void setFormName(String formName) {
		this.formName = formName;
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

	public String getShift() {
		return shift;
	}

	public void setShift(String shift) {
		this.shift = shift;
	}

	public String getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}

}
