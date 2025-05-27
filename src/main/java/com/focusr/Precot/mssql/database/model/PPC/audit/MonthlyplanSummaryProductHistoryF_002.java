package com.focusr.Precot.mssql.database.model.PPC.audit;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Entity
@Table(name = "PPC_MONTHLY_PLAN_SUMMARY_PRODUCTION_DATA_HISTORY_F002",schema=AppConstants.schema)

@Data
public class MonthlyplanSummaryProductHistoryF_002 extends UserDateAudit{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	
	
	@ManyToOne
	@JoinColumn(name = "monthly_plan_id", nullable = false)
	@JsonBackReference
	private MonthlyplanSummaryHistoryF_002 monthlyPlan;

	@Column(name = "bleaching_kg")
	private String bleachingKg;

	@Column(name = "spunlace_kg")
	private String spunlaceKg;

	@Column(name = "pad_punching_bags")
	private String padPunchingBags;

	@Column(name = "ball_making_bags")
	private String ballMakingBags;

	@Column(name = "pleat_making_bags")
	private String pleatMakingBags;

	@Column(name = "buds_making_bags")
	private String budsMakingBags;

	@Column(name = "wool_roll_bags")
	private String woolRollBags;

	@Column(name = "external_fleece")
	private String externalFleece;

	// Total Required Production
	@Column(name = "total_prod_bleaching")
	private String totalProdBleaching;

	@Column(name = "total_prod_spunlace")
	private String totalProdSpunlace;

	@Column(name = "total_prod_pad_punching")
	private String totalProdPadPunching;

	@Column(name = "total_prod_ball_making")
	private String totalProdBallMaking;

	@Column(name = "total_prod_pleat_making")
	private String totalProdPleatMaking;

	@Column(name = "total_prod_buds_making")
	private String totalProdBudsMaking;

	@Column(name = "total_prod_wool_roll")
	private String totalProdWoolRoll;

	@Column(name = "total_prod_external_fleece")
	private String totalProdExternalFleece;

	// Number of Working Days
	@Column(name = "work_days_bleaching")
	private String workDaysBleaching;

	@Column(name = "work_days_spunlace")
	private String workDaysSpunlace;

	@Column(name = "work_days_pad_punching")
	private String workDaysPadPunching;

	@Column(name = "work_days_ball_making")
	private String workDaysBallMaking;

	@Column(name = "work_days_pleat_making")
	private String workDaysPleatMaking;

	@Column(name = "work_days_buds_making")
	private String workDaysBudsMaking;

	@Column(name = "work_days_wool_roll")
	private String workDaysWoolRoll;

	@Column(name = "work_days_external_fleece")
	private String workDaysExternalFleece;
	
	
	  public MonthlyplanSummaryProductHistoryF_002() {
	    }
	  
	  
	


}