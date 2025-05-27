package com.focusr.Precot.QA.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.QA.model.audit.SupplierAuditPlanHistory;
import com.focusr.Precot.QA.model.audit.SupplierAuditPlanInfoHistory;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_SUPPLIER_AUDIT_PLAN_INFO", schema = AppConstants.schema)
public class SupplierAuditPlanInfo extends UserDateAudit{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "INFO_ID")
	private Long infoId;
	
	@Column(name = "SUPPLIER_TYPE")
	private String supplierType;

	@Column(name = "SUPPLIER_NAME")
	private String supplierName;
	
	@Column(name = "YEAR1_APRIL_PLAN")
	private String year1AprilPlan;

	@Column(name = "YEAR1_APRIL_ACTUAL")
	private String year1AprilActual;

	@Column(name = "YEAR1_MAY_PLAN")
	private String year1MayPlan;

	@Column(name = "YEAR1_MAY_ACTUAL")
	private String year1MayActual;

	@Column(name = "YEAR1_JUNE_PLAN")
	private String year1JunePlan;

	@Column(name = "YEAR1_JUNE_ACTUAL")
	private String year1JuneActual;

	@Column(name = "YEAR1_JULY_PLAN")
	private String year1JulyPlan;

	@Column(name = "YEAR1_JULY_ACTUAL")
	private String year1JulyActual;

	@Column(name = "YEAR1_AUGUST_PLAN")
	private String year1AugustPlan;

	@Column(name = "YEAR1_AUGUST_ACTUAL")
	private String year1AugustActual;

	@Column(name = "YEAR1_SEPTEMBER_PLAN")
	private String year1SeptemberPlan;

	@Column(name = "YEAR1_SEPTEMBER_ACTUAL")
	private String year1SeptemberActual;

	@Column(name = "YEAR1_OCTOBER_PLAN")
	private String year1OctoberPlan;

	@Column(name = "YEAR1_OCTOBER_ACTUAL")
	private String year1OctoberActual;

	@Column(name = "YEAR1_NOVEMBER_PLAN")
	private String year1NovemberPlan;

	@Column(name = "YEAR1_NOVEMBER_ACTUAL")
	private String year1NovemberActual;

	@Column(name = "YEAR1_DECEMBER_PLAN")
	private String year1DecemberPlan;

	@Column(name = "YEAR1_DECEMBER_ACTUAL")
	private String year1DecemberActual;

	@Column(name = "YEAR1_JANUARY_PLAN")
	private String year1JanuaryPlan;

	@Column(name = "YEAR1_JANUARY_ACTUAL")
	private String year1JanuaryActual;

	@Column(name = "YEAR1_FEBRAUARY_PLAN")
	private String year1FebruaryPlan;

	@Column(name = "YEAR1_FEBRAUARY_ACTUAL")
	private String year1FebruaryActual;

	@Column(name = "YEAR1_MARCH_PLAN")
	private String year1MarchPlan;

	@Column(name = "YEAR1_MARCH_ACTUAL")
	private String year1MarchActual;
	
	@Column(name = "YEAR2_APRIL_PLAN")
	private String year2AprilPlan;

	@Column(name = "YEAR2_APRIL_ACTUAL")
	private String year2AprilActual;

	@Column(name = "YEAR2_MAY_PLAN")
	private String year2MayPlan;

	@Column(name = "YEAR2_MAY_ACTUAL")
	private String year2MayActual;

	@Column(name = "YEAR2_JUNE_PLAN")
	private String year2JunePlan;

	@Column(name = "YEAR2_JUNE_ACTUAL")
	private String year2JuneActual;

	@Column(name = "YEAR2_JULY_PLAN")
	private String year2JulyPlan;

	@Column(name = "YEAR2_JULY_ACTUAL")
	private String year2JulyActual;

	@Column(name = "YEAR2_AUGUST_PLAN")
	private String year2AugustPlan;

	@Column(name = "YEAR2_AUGUST_ACTUAL")
	private String year2AugustActual;

	@Column(name = "YEAR2_SEPTEMBER_PLAN")
	private String year2SeptemberPlan;

	@Column(name = "YEAR2_SEPTEMBER_ACTUAL")
	private String year2SeptemberActual;

	@Column(name = "YEAR2_OCTOBER_PLAN")
	private String year2OctoberPlan;

	@Column(name = "YEAR2_OCTOBER_ACTUAL")
	private String year2OctoberActual;

	@Column(name = "YEAR2_NOVEMBER_PLAN")
	private String year2NovemberPlan;

	@Column(name = "YEAR2_NOVEMBER_ACTUAL")
	private String year2NovemberActual;

	@Column(name = "YEAR2_DECEMBER_PLAN")
	private String year2DecemberPlan;

	@Column(name = "YEAR2_DECEMBER_ACTUAL")
	private String year2DecemberActual;

	@Column(name = "YEAR2_JANUARY_PLAN")
	private String year2JanuaryPlan;

	@Column(name = "YEAR2_JANUARY_ACTUAL")
	private String year2JanuaryActual;

	@Column(name = "YEAR2_FEBRAUARY_PLAN")
	private String year2FebruaryPlan;

	@Column(name = "YEAR2_FEBRAUARY_ACTUAL")
	private String year2FebruaryActual;

	@Column(name = "YEAR2_MARCH_PLAN")
	private String year2MarchPlan;

	@Column(name = "YEAR2_MARCH_ACTUAL")
	private String year2MarchActual;
	
	@Column(name = "PLAN_ID")
	private Long planId;
}
