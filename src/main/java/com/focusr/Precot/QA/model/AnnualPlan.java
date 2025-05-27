package com.focusr.Precot.QA.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_ANNUAL_PLAN", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "YEAR" }) })
public class AnnualPlan extends UserDateAudit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
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

	@Column(name = "YEAR")
	private String year;
	
	@Column(name = "REASON")
	private String reason;

	// STATUS
	// QA INSPECTOR
	@Column(name = "MR_STATUS")
	private String MR_status;

	@Column(name = "MR_SAVED_ON")
	private Date mr_saved_on;

	@Column(name = "MR_SAVED_BY")
	private String mr_saved_by;

	@Column(name = "MR_SAVED_ID")
	private Long mr_saved_id;

	@Column(name = "MR_SUBMITTED_ON")
	private Date mr_submitted_on;

	@Column(name = "MR_SUBMITTED_BY")
	private String mr_submitted_by;

	@Column(name = "MR_SUBMITTED_ID")
	private Long mr_submitted_id;

	@Column(name = "MR_SIGN")
	private String mr_sign;
	
//	@OneToMany(mappedBy = "annualplan", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//	private List<AnnualPlanLines> annualplanlines;
	@OneToMany(targetEntity = AnnualPlanLines.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "ID", referencedColumnName = "ID")
	private List<AnnualPlanLines> annualplanlines;

}
