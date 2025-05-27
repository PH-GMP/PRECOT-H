package com.focusr.Precot.mssql.database.model.splunance;

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

import com.focusr.Precot.mssql.database.model.SpunlaceSaveSumbitSupervisor;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_LOGBOOK_SPUNLACE_PLANNING_F010", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE" }) })
public class LogbookSpunlacePlanningF010 extends SpunlaceSaveSumbitSupervisor{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PLAN_ID")
	private Long planId;

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
	
	@OneToMany(targetEntity = DailyProdPlanF010.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "PLAN_ID", referencedColumnName = "PLAN_ID")
	private List<DailyProdPlanF010> prodPlanDetails;
	
	@Column(name = "SPECIAL_INSTRUCTION")
	private String splInstruction;
	
	//spunlace-MP
	@Column(name = "SPUNLACE_STD_PH")
	private String spunlace_stdPh;
	
	@Column(name = "SPUNLACE_STD_OTHER")
	private String spunlace_stdOther;
	
	@Column(name = "SPUNLACE_PH_1SHIFT")
	private String spunlace_ph_1S;
	
	@Column(name = "SPUNLACE_OTHER_1SHIFT")
	private String spunlace_Other_1S;
	
	@Column(name = "SPUNLACE_PH_2SHIFT")
	private String spunlace_ph_2S;
	
	@Column(name = "SPUNLACE_OTHER_2SHIFT")
	private String spunlace_Other_2S;
	
	@Column(name = "SPUNLACE_PH_3SHIFT")
	private String spunlace_ph_3S;
	
	@Column(name = "SPUNLACE_OTHER_3SHIFT")
	private String spunlace_Other_3S;
	
	@Column(name = "SPUNLACE_PH_GEN_SHIFT")
	private String spunlace_ph_GS;
	
	@Column(name = "SPUNLACE_OTHER_GEN_SHIFT")
	private String spunlace_Other_GS;
	
	//RP_BalePress - MP
	@Column(name = "RP_BALEPRESS_STD_PH")
	private String rpBale_stdPh;
	
	@Column(name = "RP_BALEPRESS_STD_OTHER")
	private String rpBale_stdOther;
	
	@Column(name = "RP_BALEPRESS_PH_1SHIFT")
	private String rpBale_ph_1S;
	
	@Column(name = "RP_BALEPRESS_OTHER_1SHIFT")
	private String rpBale_Other_1S;
	
	@Column(name = "RP_BALEPRESS_PH_2SHIFT")
	private String rpBale_ph_2S;
	
	@Column(name = "RP_BALEPRESSE_OTHER_2SHIFT")
	private String rpBale_Other_2S;
	
	@Column(name = "RP_BALEPRESS_PH_3SHIFT")
	private String rpBale_ph_3S;
	
	@Column(name = "RP_BALEPRESS_OTHER_3SHIFT")
	private String rpBale_Other_3S;
	
	@Column(name = "RP_BALEPRESS_PH_GEN_SHIFT")
	private String rpBale_ph_GS;
	
	@Column(name = "RP_BALEPRESS_OTHER_GEN_SHIFT")
	private String rpBale_Other_GS;
	
	//SliterWinder-MP
	@Column(name = "SLITERWINDER_STD_PH")
	private String sliterWinder_stdPh;
	
	@Column(name = "SLITERWINDER_STD_OTHER")
	private String sliterWinder_stdOther;
	
	@Column(name = "SLITERWINDER_PH_1SHIFT")
	private String sliterWinder_ph_1S;
	
	@Column(name = "SLITERWINDER_OTHER_1SHIFT")
	private String sliterWinder_Other_1S;
	
	@Column(name = "SLITERWINDER_PH_2SHIFT")
	private String sliterWinder_ph_2S;
	
	@Column(name = "SLITERWINDER_OTHER_2SHIFT")
	private String sliterWinder_Other_2S;
	
	@Column(name = "SLITERWINDER_PH_3SHIFT")
	private String sliterWinder_ph_3S;
	
	@Column(name = "SLITERWINDER_OTHER_3SHIFT")
	private String sliterWinder_Other_3S;
	
	@Column(name = "SLITERWINDER_PH_GEN_SHIFT")
	private String sliterWinder_ph_GS;
	
	@Column(name = "SLITERWINDER_OTHER_GEN_SHIFT")
	private String sliterWinder_Other_GS;
	
	//Total
	@Column(name = "TOTAL_STD_PH")
	private String total_stdPh;
	
	@Column(name = "TOTAL_STD_OTHER")
	private String total_stdOther;
	
	@Column(name = "TOTAL_PH_1SHIFT")
	private String total_ph_1S;
	
	@Column(name = "TOTAL_OTHER_1SHIFT")
	private String total_Other_1S;
	
	@Column(name = "TOTAL_PH_2SHIFT")
	private String total_ph_2S;
	
	@Column(name = "TOTAL_OTHER_2SHIFT")
	private String total_Other_2S;
	
	@Column(name = "TOTAL_PH_3SHIFT")
	private String total_ph_3S;
	
	@Column(name = "TOTAL_OTHER_3SHIFT")
	private String total_Other_3S;
	
	@Column(name = "TOTAL_PH_GEN_SHIFT")
	private String total_ph_GS;
	
	@Column(name = "TOTAL_OTHER_GEN_SHIFT")
	private String total_Other_GS;
	
	@Column(name = "REASON")
	private String reason;

	public LogbookSpunlacePlanningF010() {
		super();
	}

	public Long getPlanId() {
		return planId;
	}

	public void setPlanId(Long planId) {
		this.planId = planId;
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

	public List<DailyProdPlanF010> getProdPlanDetails() {
		return prodPlanDetails;
	}

	public void setProdPlanDetails(List<DailyProdPlanF010> prodPlanDetails) {
		this.prodPlanDetails = prodPlanDetails;
	}

	public String getSplInstruction() {
		return splInstruction;
	}

	public void setSplInstruction(String splInstruction) {
		this.splInstruction = splInstruction;
	}

	public String getSpunlace_stdPh() {
		return spunlace_stdPh;
	}

	public void setSpunlace_stdPh(String spunlace_stdPh) {
		this.spunlace_stdPh = spunlace_stdPh;
	}

	public String getSpunlace_stdOther() {
		return spunlace_stdOther;
	}

	public void setSpunlace_stdOther(String spunlace_stdOther) {
		this.spunlace_stdOther = spunlace_stdOther;
	}

	public String getSpunlace_ph_1S() {
		return spunlace_ph_1S;
	}

	public void setSpunlace_ph_1S(String spunlace_ph_1S) {
		this.spunlace_ph_1S = spunlace_ph_1S;
	}

	public String getSpunlace_Other_1S() {
		return spunlace_Other_1S;
	}

	public void setSpunlace_Other_1S(String spunlace_Other_1S) {
		this.spunlace_Other_1S = spunlace_Other_1S;
	}

	public String getSpunlace_ph_2S() {
		return spunlace_ph_2S;
	}

	public void setSpunlace_ph_2S(String spunlace_ph_2S) {
		this.spunlace_ph_2S = spunlace_ph_2S;
	}

	public String getSpunlace_Other_2S() {
		return spunlace_Other_2S;
	}

	public void setSpunlace_Other_2S(String spunlace_Other_2S) {
		this.spunlace_Other_2S = spunlace_Other_2S;
	}

	public String getSpunlace_ph_3S() {
		return spunlace_ph_3S;
	}

	public void setSpunlace_ph_3S(String spunlace_ph_3S) {
		this.spunlace_ph_3S = spunlace_ph_3S;
	}

	public String getSpunlace_Other_3S() {
		return spunlace_Other_3S;
	}

	public void setSpunlace_Other_3S(String spunlace_Other_3S) {
		this.spunlace_Other_3S = spunlace_Other_3S;
	}

	public String getSpunlace_ph_GS() {
		return spunlace_ph_GS;
	}

	public void setSpunlace_ph_GS(String spunlace_ph_GS) {
		this.spunlace_ph_GS = spunlace_ph_GS;
	}

	public String getSpunlace_Other_GS() {
		return spunlace_Other_GS;
	}

	public void setSpunlace_Other_GS(String spunlace_Other_GS) {
		this.spunlace_Other_GS = spunlace_Other_GS;
	}

	public String getRpBale_stdPh() {
		return rpBale_stdPh;
	}

	public void setRpBale_stdPh(String rpBale_stdPh) {
		this.rpBale_stdPh = rpBale_stdPh;
	}

	public String getRpBale_stdOther() {
		return rpBale_stdOther;
	}

	public void setRpBale_stdOther(String rpBale_stdOther) {
		this.rpBale_stdOther = rpBale_stdOther;
	}

	public String getRpBale_ph_1S() {
		return rpBale_ph_1S;
	}

	public void setRpBale_ph_1S(String rpBale_ph_1S) {
		this.rpBale_ph_1S = rpBale_ph_1S;
	}

	public String getRpBale_Other_1S() {
		return rpBale_Other_1S;
	}

	public void setRpBale_Other_1S(String rpBale_Other_1S) {
		this.rpBale_Other_1S = rpBale_Other_1S;
	}

	public String getRpBale_ph_2S() {
		return rpBale_ph_2S;
	}

	public void setRpBale_ph_2S(String rpBale_ph_2S) {
		this.rpBale_ph_2S = rpBale_ph_2S;
	}

	public String getRpBale_Other_2S() {
		return rpBale_Other_2S;
	}

	public void setRpBale_Other_2S(String rpBale_Other_2S) {
		this.rpBale_Other_2S = rpBale_Other_2S;
	}

	public String getRpBale_ph_3S() {
		return rpBale_ph_3S;
	}

	public void setRpBale_ph_3S(String rpBale_ph_3S) {
		this.rpBale_ph_3S = rpBale_ph_3S;
	}

	public String getRpBale_Other_3S() {
		return rpBale_Other_3S;
	}

	public void setRpBale_Other_3S(String rpBale_Other_3S) {
		this.rpBale_Other_3S = rpBale_Other_3S;
	}

	public String getRpBale_ph_GS() {
		return rpBale_ph_GS;
	}

	public void setRpBale_ph_GS(String rpBale_ph_GS) {
		this.rpBale_ph_GS = rpBale_ph_GS;
	}

	public String getRpBale_Other_GS() {
		return rpBale_Other_GS;
	}

	public void setRpBale_Other_GS(String rpBale_Other_GS) {
		this.rpBale_Other_GS = rpBale_Other_GS;
	}

	public String getSliterWinder_stdPh() {
		return sliterWinder_stdPh;
	}

	public void setSliterWinder_stdPh(String sliterWinder_stdPh) {
		this.sliterWinder_stdPh = sliterWinder_stdPh;
	}

	public String getSliterWinder_stdOther() {
		return sliterWinder_stdOther;
	}

	public void setSliterWinder_stdOther(String sliterWinder_stdOther) {
		this.sliterWinder_stdOther = sliterWinder_stdOther;
	}

	public String getSliterWinder_ph_1S() {
		return sliterWinder_ph_1S;
	}

	public void setSliterWinder_ph_1S(String sliterWinder_ph_1S) {
		this.sliterWinder_ph_1S = sliterWinder_ph_1S;
	}

	public String getSliterWinder_Other_1S() {
		return sliterWinder_Other_1S;
	}

	public void setSliterWinder_Other_1S(String sliterWinder_Other_1S) {
		this.sliterWinder_Other_1S = sliterWinder_Other_1S;
	}

	public String getSliterWinder_ph_2S() {
		return sliterWinder_ph_2S;
	}

	public void setSliterWinder_ph_2S(String sliterWinder_ph_2S) {
		this.sliterWinder_ph_2S = sliterWinder_ph_2S;
	}

	public String getSliterWinder_Other_2S() {
		return sliterWinder_Other_2S;
	}

	public void setSliterWinder_Other_2S(String sliterWinder_Other_2S) {
		this.sliterWinder_Other_2S = sliterWinder_Other_2S;
	}

	public String getSliterWinder_ph_3S() {
		return sliterWinder_ph_3S;
	}

	public void setSliterWinder_ph_3S(String sliterWinder_ph_3S) {
		this.sliterWinder_ph_3S = sliterWinder_ph_3S;
	}

	public String getSliterWinder_Other_3S() {
		return sliterWinder_Other_3S;
	}

	public void setSliterWinder_Other_3S(String sliterWinder_Other_3S) {
		this.sliterWinder_Other_3S = sliterWinder_Other_3S;
	}

	public String getSliterWinder_ph_GS() {
		return sliterWinder_ph_GS;
	}

	public void setSliterWinder_ph_GS(String sliterWinder_ph_GS) {
		this.sliterWinder_ph_GS = sliterWinder_ph_GS;
	}

	public String getSliterWinder_Other_GS() {
		return sliterWinder_Other_GS;
	}

	public void setSliterWinder_Other_GS(String sliterWinder_Other_GS) {
		this.sliterWinder_Other_GS = sliterWinder_Other_GS;
	}

	public String getTotal_stdPh() {
		return total_stdPh;
	}

	public void setTotal_stdPh(String total_stdPh) {
		this.total_stdPh = total_stdPh;
	}

	public String getTotal_stdOther() {
		return total_stdOther;
	}

	public void setTotal_stdOther(String total_stdOther) {
		this.total_stdOther = total_stdOther;
	}

	public String getTotal_ph_1S() {
		return total_ph_1S;
	}

	public void setTotal_ph_1S(String total_ph_1S) {
		this.total_ph_1S = total_ph_1S;
	}

	public String getTotal_Other_1S() {
		return total_Other_1S;
	}

	public void setTotal_Other_1S(String total_Other_1S) {
		this.total_Other_1S = total_Other_1S;
	}

	public String getTotal_ph_2S() {
		return total_ph_2S;
	}

	public void setTotal_ph_2S(String total_ph_2S) {
		this.total_ph_2S = total_ph_2S;
	}

	public String getTotal_Other_2S() {
		return total_Other_2S;
	}

	public void setTotal_Other_2S(String total_Other_2S) {
		this.total_Other_2S = total_Other_2S;
	}

	public String getTotal_ph_3S() {
		return total_ph_3S;
	}

	public void setTotal_ph_3S(String total_ph_3S) {
		this.total_ph_3S = total_ph_3S;
	}

	public String getTotal_Other_3S() {
		return total_Other_3S;
	}

	public void setTotal_Other_3S(String total_Other_3S) {
		this.total_Other_3S = total_Other_3S;
	}

	public String getTotal_ph_GS() {
		return total_ph_GS;
	}

	public void setTotal_ph_GS(String total_ph_GS) {
		this.total_ph_GS = total_ph_GS;
	}

	public String getTotal_Other_GS() {
		return total_Other_GS;
	}

	public void setTotal_Other_GS(String total_Other_GS) {
		this.total_Other_GS = total_Other_GS;
	}

}
