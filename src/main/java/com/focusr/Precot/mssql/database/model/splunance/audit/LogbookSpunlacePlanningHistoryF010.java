package com.focusr.Precot.mssql.database.model.splunance.audit;

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

import com.focusr.Precot.mssql.database.model.SpunlaceSaveSumbitSupervisor;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_LOGBOOK_SPUNLACE_PLANNING_HISTORY_F010", schema = AppConstants.schema)
public class LogbookSpunlacePlanningHistoryF010 extends SpunlaceSaveSumbitSupervisor{

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
	
	@OneToMany(targetEntity = DailyProdPlanHistoryF010.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "PLAN_ID", referencedColumnName = "PLAN_ID")
	private List<DailyProdPlanHistoryF010> prodPlanDetails;
	
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
	
	@Column(name = "VERSION")
	private int version;
}
