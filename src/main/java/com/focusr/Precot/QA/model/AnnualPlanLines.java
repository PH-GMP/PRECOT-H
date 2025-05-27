package com.focusr.Precot.QA.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;
@Data
@Entity
@Table(name = "QA_ANNUAL_PLAN_LINES", schema = AppConstants.schema)
public class AnnualPlanLines extends UserDateAudit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long line_id;
	
	@Column(name = "ACTIVITY")
	private String activity;

	@Column(name = "APR_PLAN")
	private String apr_plan;

	@Column(name = "APR_STATUS")
	private String apr_status;

	@Column(name = "MAY_PLAN")
	private String may_plan;

	@Column(name = "MAY_STATUS")
	private String may_status;

	@Column(name = "JUN_PLAN")
	private String jun_plan;

	@Column(name = "JUN_STATUS")
	private String jun_status;

	@Column(name = "JUL_PLAN")
	private String jul_plan;

	@Column(name = "JUL_STATUS")
	private String jul_status;

	@Column(name = "AUG_PLAN")
	private String aug_plan;

	@Column(name = "AUG_STATUS")
	private String aug_status;

	@Column(name = "SEPT_PLAN")
	private String sept_plan;

	@Column(name = "SEPT_STATUS")
	private String sept_status;

	@Column(name = "OCT_PLAN")
	private String oct_plan;

	@Column(name = "OCT_STATUS")
	private String oct_status;

	@Column(name = "NOV_PLAN")
	private String nov_plan;

	@Column(name = "NOV_STATUS")
	private String nov_status;

	@Column(name = "DEC_PLAN")
	private String dec_plan;

	@Column(name = "DEC_STATUS")
	private String dec_status;

	@Column(name = "JAN_PLAN")
	private String jan_plan;

	@Column(name = "JAN_STATUS")
	private String jan_status;

	@Column(name = "FEB_PLAN")
	private String feb_plan;

	@Column(name = "FEB_STATUS")
	private String feb_status;

	@Column(name = "MAR_PLAN")
	private String mar_plan;

	@Column(name = "MAR_STATUS")
	private String mar_status;

	@Column(name = "PLAN_REMARKS")
	private String plan_remarks;

	@Column(name = "STATUS_REMARKS")
	private String status_remarks;

	@Column(name = "ID")
	private Long id;
	
//	  @ManyToOne(fetch = FetchType.EAGER)
//	    @JoinColumn(name = "ID", insertable = false, updatable = false)
//	    @JsonIgnore
//	    private AnnualPlan annualplan;
}
