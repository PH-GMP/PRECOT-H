package com.focusr.Precot.QA.model;

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

@Data
@Entity
@Table(name = "CONTROL_OF_GHPWC", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE" ,"DEPARTMENT"}) })
public class ControlOfGHpWc extends UserDateAudit {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

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

	// HOD STATUS

	@Column(name = "HOD_STATUS")
	private String hod_status;

	@Column(name = "HOD_SUBMITTED_ON")
	private Date hod_submitted_on;

	@Column(name = "HOD_SUBMITTED_BY")
	private String hod_submitted_by;

	@Column(name = "HOD_SUBMITTED_ID")
	private Long hod_submitted_id;

	@Column(name = "HOD_SIGN")
	private String hod_sign;

	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "CHECKED_BY")
	private String checked_by;

	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "details")
	private List<ControlOfGHpWcTypes> ghpwcTypes;

}
