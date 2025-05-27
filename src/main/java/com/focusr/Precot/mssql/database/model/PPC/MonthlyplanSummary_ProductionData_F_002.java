package com.focusr.Precot.mssql.database.model.PPC;

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

@Entity
@Table(name = "PPC_MONTHLY_PLAN_SUMMARY_PRODUCTION_DATA_F002",schema=AppConstants.schema)
public class MonthlyplanSummary_ProductionData_F_002 {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	
	
	@ManyToOne
	@JoinColumn(name = "monthly_plan_id", nullable = false)
	@JsonBackReference
	private MonthlyplanSummaryF002 monthlyPlan;

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
	
	
	  public MonthlyplanSummary_ProductionData_F_002() {
	    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public MonthlyplanSummaryF002 getMonthlyPlan() {
		return monthlyPlan;
	}

	public void setMonthlyPlan(MonthlyplanSummaryF002 monthlyPlan) {
		this.monthlyPlan = monthlyPlan;
	}

	public String getBleachingKg() {
		return bleachingKg;
	}

	public void setBleachingKg(String bleachingKg) {
		this.bleachingKg = bleachingKg;
	}

	public String getSpunlaceKg() {
		return spunlaceKg;
	}

	public void setSpunlaceKg(String spunlaceKg) {
		this.spunlaceKg = spunlaceKg;
	}

	public String getPadPunchingBags() {
		return padPunchingBags;
	}

	public void setPadPunchingBags(String padPunchingBags) {
		this.padPunchingBags = padPunchingBags;
	}

	public String getBallMakingBags() {
		return ballMakingBags;
	}

	public void setBallMakingBags(String ballMakingBags) {
		this.ballMakingBags = ballMakingBags;
	}

	public String getPleatMakingBags() {
		return pleatMakingBags;
	}

	public void setPleatMakingBags(String pleatMakingBags) {
		this.pleatMakingBags = pleatMakingBags;
	}

	public String getBudsMakingBags() {
		return budsMakingBags;
	}

	public void setBudsMakingBags(String budsMakingBags) {
		this.budsMakingBags = budsMakingBags;
	}

	public String getWoolRollBags() {
		return woolRollBags;
	}

	public void setWoolRollBags(String woolRollBags) {
		this.woolRollBags = woolRollBags;
	}

	public String getExternalFleece() {
		return externalFleece;
	}

	public void setExternalFleece(String externalFleece) {
		this.externalFleece = externalFleece;
	}

	public String getTotalProdBleaching() {
		return totalProdBleaching;
	}

	public void setTotalProdBleaching(String totalProdBleaching) {
		this.totalProdBleaching = totalProdBleaching;
	}

	public String getTotalProdSpunlace() {
		return totalProdSpunlace;
	}

	public void setTotalProdSpunlace(String totalProdSpunlace) {
		this.totalProdSpunlace = totalProdSpunlace;
	}

	public String getTotalProdPadPunching() {
		return totalProdPadPunching;
	}

	public void setTotalProdPadPunching(String totalProdPadPunching) {
		this.totalProdPadPunching = totalProdPadPunching;
	}

	public String getTotalProdBallMaking() {
		return totalProdBallMaking;
	}

	public void setTotalProdBallMaking(String totalProdBallMaking) {
		this.totalProdBallMaking = totalProdBallMaking;
	}

	public String getTotalProdPleatMaking() {
		return totalProdPleatMaking;
	}

	public void setTotalProdPleatMaking(String totalProdPleatMaking) {
		this.totalProdPleatMaking = totalProdPleatMaking;
	}

	public String getTotalProdBudsMaking() {
		return totalProdBudsMaking;
	}

	public void setTotalProdBudsMaking(String totalProdBudsMaking) {
		this.totalProdBudsMaking = totalProdBudsMaking;
	}

	public String getTotalProdWoolRoll() {
		return totalProdWoolRoll;
	}

	public void setTotalProdWoolRoll(String totalProdWoolRoll) {
		this.totalProdWoolRoll = totalProdWoolRoll;
	}

	public String getTotalProdExternalFleece() {
		return totalProdExternalFleece;
	}

	public void setTotalProdExternalFleece(String totalProdExternalFleece) {
		this.totalProdExternalFleece = totalProdExternalFleece;
	}

	public String getWorkDaysBleaching() {
		return workDaysBleaching;
	}

	public void setWorkDaysBleaching(String workDaysBleaching) {
		this.workDaysBleaching = workDaysBleaching;
	}

	public String getWorkDaysSpunlace() {
		return workDaysSpunlace;
	}

	public void setWorkDaysSpunlace(String workDaysSpunlace) {
		this.workDaysSpunlace = workDaysSpunlace;
	}

	public String getWorkDaysPadPunching() {
		return workDaysPadPunching;
	}

	public void setWorkDaysPadPunching(String workDaysPadPunching) {
		this.workDaysPadPunching = workDaysPadPunching;
	}

	public String getWorkDaysBallMaking() {
		return workDaysBallMaking;
	}

	public void setWorkDaysBallMaking(String workDaysBallMaking) {
		this.workDaysBallMaking = workDaysBallMaking;
	}

	public String getWorkDaysPleatMaking() {
		return workDaysPleatMaking;
	}

	public void setWorkDaysPleatMaking(String workDaysPleatMaking) {
		this.workDaysPleatMaking = workDaysPleatMaking;
	}

	public String getWorkDaysBudsMaking() {
		return workDaysBudsMaking;
	}

	public void setWorkDaysBudsMaking(String workDaysBudsMaking) {
		this.workDaysBudsMaking = workDaysBudsMaking;
	}

	public String getWorkDaysWoolRoll() {
		return workDaysWoolRoll;
	}

	public void setWorkDaysWoolRoll(String workDaysWoolRoll) {
		this.workDaysWoolRoll = workDaysWoolRoll;
	}

	public String getWorkDaysExternalFleece() {
		return workDaysExternalFleece;
	}

	public void setWorkDaysExternalFleece(String workDaysExternalFleece) {
		this.workDaysExternalFleece = workDaysExternalFleece;
	}

	public MonthlyplanSummary_ProductionData_F_002(Long id, MonthlyplanSummaryF002 monthlyPlan, String bleachingKg,
			String spunlaceKg, String padPunchingBags, String ballMakingBags, String pleatMakingBags,
			String budsMakingBags, String woolRollBags, String externalFleece, String totalProdBleaching,
			String totalProdSpunlace, String totalProdPadPunching, String totalProdBallMaking,
			String totalProdPleatMaking, String totalProdBudsMaking, String totalProdWoolRoll,
			String totalProdExternalFleece, String workDaysBleaching, String workDaysSpunlace,
			String workDaysPadPunching, String workDaysBallMaking, String workDaysPleatMaking,
			String workDaysBudsMaking, String workDaysWoolRoll, String workDaysExternalFleece) {
		super();
		this.id = id;
		this.monthlyPlan = monthlyPlan;
		this.bleachingKg = bleachingKg;
		this.spunlaceKg = spunlaceKg;
		this.padPunchingBags = padPunchingBags;
		this.ballMakingBags = ballMakingBags;
		this.pleatMakingBags = pleatMakingBags;
		this.budsMakingBags = budsMakingBags;
		this.woolRollBags = woolRollBags;
		this.externalFleece = externalFleece;
		this.totalProdBleaching = totalProdBleaching;
		this.totalProdSpunlace = totalProdSpunlace;
		this.totalProdPadPunching = totalProdPadPunching;
		this.totalProdBallMaking = totalProdBallMaking;
		this.totalProdPleatMaking = totalProdPleatMaking;
		this.totalProdBudsMaking = totalProdBudsMaking;
		this.totalProdWoolRoll = totalProdWoolRoll;
		this.totalProdExternalFleece = totalProdExternalFleece;
		this.workDaysBleaching = workDaysBleaching;
		this.workDaysSpunlace = workDaysSpunlace;
		this.workDaysPadPunching = workDaysPadPunching;
		this.workDaysBallMaking = workDaysBallMaking;
		this.workDaysPleatMaking = workDaysPleatMaking;
		this.workDaysBudsMaking = workDaysBudsMaking;
		this.workDaysWoolRoll = workDaysWoolRoll;
		this.workDaysExternalFleece = workDaysExternalFleece;
	}

	

}
