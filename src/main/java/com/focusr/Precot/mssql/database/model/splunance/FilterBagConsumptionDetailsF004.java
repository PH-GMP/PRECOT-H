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
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;


@Data
@Entity
@Table(name = "SPUNLACE_FILTER_BAG_CONSUMPTION_DETAILS_F004", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE", "SHIFT" }) })
public class FilterBagConsumptionDetailsF004 extends UserDateAudit{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "FILTER_ID")
	private Long filterId;

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

	@Column(name = "DATE")
	private String date;

	@Column(name = "SHIFT")
	private String shift;
	
	@Column(name = "REASON")
	private String reason;

	@OneToMany(targetEntity = FilterConsumptionDetailsF004.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "FILTER_ID", referencedColumnName = "FILTER_ID")
	private List<FilterConsumptionDetailsF004> details;
	
	// operator
		@Column(name = "OPERATOR_STATUS")
		private String operator_status;

		@Column(name = "OPERATOR_SAVED_ON")
		private Date operator_saved_on;

		@Column(name = "OPERATOR_SAVED_BY")
		private String operator_saved_by;

		@Column(name = "OPERATOR_SAVED_ID")
		private Long operator_saved_id;

		@Column(name = "OPERATOR_SUBMIT_ON")
		private Date operator_submit_on;

		@Column(name = "OPERATOR_SUBMIT_BY")
		private String operator_submit_by;

		@Column(name = "OPERATOR_SUBMIT_ID")
		private Long operator_submit_id;

		@Column(name = "OPERATOR_SIGN")
		private String operator_sign;
		
		@Lob
		@Column(name = "OPERATOR_SIGNATURE_IMAGE")
		private byte[] operator_signature_image;

		// supervisor
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

		@Column(name = "SUPERVISOR_MAIL_STATUS")
		private String supervisor_mail_status;

		@Lob
		@Column(name = "SUPERVISIOR_SIGNATURE_IMAGE")
		private byte[] supervisor_signature_image;
		
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

		@Column(name = "HOD_MAIL_STATUS")
		private String hod_mail_status;
		
		@Lob
		@Column(name = "HOD_SIGNATURE_IMAGE")
		private byte[] hod_signature_image;
	
	public FilterBagConsumptionDetailsF004() {
		super();
	}

	public FilterBagConsumptionDetailsF004(Long filterId, String formatName, String formatNo, Long revisionNo,
			String refSopNo, String unit, String date, String shift, List<FilterConsumptionDetailsF004> details,
			String operator_status, Date operator_saved_on, String operator_saved_by, Long operator_saved_id,
			Date operator_submit_on, String operator_submit_by, Long operator_submit_id, String operator_sign,
			String supervisor_status, Date supervisor_saved_on, String supervisor_saved_by, Long supervisor_saved_id,
			Date supervisor_submit_on, String supervisor_submit_by, Long supervisor_submit_id, String supervisor_sign,
			String supervisor_mail_status, String hod_status, Date hod_saved_on, String hod_saved_by, Long hod_saved_id,
			Date hod_submit_on, String hod_submit_by, Long hod_submit_id, String hod_sign, String hod_mail_status) {
		super();
		this.filterId = filterId;
		this.formatName = formatName;
		this.formatNo = formatNo;
		this.revisionNo = revisionNo;
		this.refSopNo = refSopNo;
		this.unit = unit;
		this.date = date;
		this.shift = shift;
		this.details = details;
		this.operator_status = operator_status;
		this.operator_saved_on = operator_saved_on;
		this.operator_saved_by = operator_saved_by;
		this.operator_saved_id = operator_saved_id;
		this.operator_submit_on = operator_submit_on;
		this.operator_submit_by = operator_submit_by;
		this.operator_submit_id = operator_submit_id;
		this.operator_sign = operator_sign;
		this.supervisor_status = supervisor_status;
		this.supervisor_saved_on = supervisor_saved_on;
		this.supervisor_saved_by = supervisor_saved_by;
		this.supervisor_saved_id = supervisor_saved_id;
		this.supervisor_submit_on = supervisor_submit_on;
		this.supervisor_submit_by = supervisor_submit_by;
		this.supervisor_submit_id = supervisor_submit_id;
		this.supervisor_sign = supervisor_sign;
		this.supervisor_mail_status = supervisor_mail_status;
		this.hod_status = hod_status;
		this.hod_saved_on = hod_saved_on;
		this.hod_saved_by = hod_saved_by;
		this.hod_saved_id = hod_saved_id;
		this.hod_submit_on = hod_submit_on;
		this.hod_submit_by = hod_submit_by;
		this.hod_submit_id = hod_submit_id;
		this.hod_sign = hod_sign;
		this.hod_mail_status = hod_mail_status;
	}



	public Long getFilterId() {
		return filterId;
	}

	public void setFilterId(Long filterId) {
		this.filterId = filterId;
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

	public List<FilterConsumptionDetailsF004> getDetails() {
		return details;
	}

	public void setDetails(List<FilterConsumptionDetailsF004> details) {
		this.details = details;
	}

	public String getOperator_status() {
		return operator_status;
	}

	public void setOperator_status(String operator_status) {
		this.operator_status = operator_status;
	}

	public Date getOperator_saved_on() {
		return operator_saved_on;
	}

	public void setOperator_saved_on(Date operator_saved_on) {
		this.operator_saved_on = operator_saved_on;
	}

	public String getOperator_saved_by() {
		return operator_saved_by;
	}

	public void setOperator_saved_by(String operator_saved_by) {
		this.operator_saved_by = operator_saved_by;
	}

	public Long getOperator_saved_id() {
		return operator_saved_id;
	}

	public void setOperator_saved_id(Long operator_saved_id) {
		this.operator_saved_id = operator_saved_id;
	}

	public Date getOperator_submit_on() {
		return operator_submit_on;
	}

	public void setOperator_submit_on(Date operator_submit_on) {
		this.operator_submit_on = operator_submit_on;
	}

	public String getOperator_submit_by() {
		return operator_submit_by;
	}

	public void setOperator_submit_by(String operator_submit_by) {
		this.operator_submit_by = operator_submit_by;
	}

	public Long getOperator_submit_id() {
		return operator_submit_id;
	}

	public void setOperator_submit_id(Long operator_submit_id) {
		this.operator_submit_id = operator_submit_id;
	}

	public String getOperator_sign() {
		return operator_sign;
	}

	public void setOperator_sign(String operator_sign) {
		this.operator_sign = operator_sign;
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

	public String getSupervisor_mail_status() {
		return supervisor_mail_status;
	}

	public void setSupervisor_mail_status(String supervisor_mail_status) {
		this.supervisor_mail_status = supervisor_mail_status;
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

	public String getHod_mail_status() {
		return hod_mail_status;
	}

	public void setHod_mail_status(String hod_mail_status) {
		this.hod_mail_status = hod_mail_status;
	}

	@Override
	public String toString() {
		return "FilterBagConsumptionDetailsF004 [filterId=" + filterId + ", formatName=" + formatName + ", formatNo="
				+ formatNo + ", revisionNo=" + revisionNo + ", refSopNo=" + refSopNo + ", unit=" + unit + ", date="
				+ date + ", shift=" + shift + ", details=" + details + ", operator_status=" + operator_status
				+ ", operator_saved_on=" + operator_saved_on + ", operator_saved_by=" + operator_saved_by
				+ ", operator_saved_id=" + operator_saved_id + ", operator_submit_on=" + operator_submit_on
				+ ", operator_submit_by=" + operator_submit_by + ", operator_submit_id=" + operator_submit_id
				+ ", operator_sign=" + operator_sign + ", supervisor_status=" + supervisor_status
				+ ", supervisor_saved_on=" + supervisor_saved_on + ", supervisor_saved_by=" + supervisor_saved_by
				+ ", supervisor_saved_id=" + supervisor_saved_id + ", supervisor_submit_on=" + supervisor_submit_on
				+ ", supervisor_submit_by=" + supervisor_submit_by + ", supervisor_submit_id=" + supervisor_submit_id
				+ ", supervisor_sign=" + supervisor_sign + ", supervisor_mail_status=" + supervisor_mail_status
				+ ", hod_status=" + hod_status + ", hod_saved_on=" + hod_saved_on + ", hod_saved_by=" + hod_saved_by
				+ ", hod_saved_id=" + hod_saved_id + ", hod_submit_on=" + hod_submit_on + ", hod_submit_by="
				+ hod_submit_by + ", hod_submit_id=" + hod_submit_id + ", hod_sign=" + hod_sign + ", hod_mail_status="
				+ hod_mail_status + "]";
	}
}
