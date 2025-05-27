package com.focusr.Precot.mssql.database.model.splunance.audit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.mssql.database.model.SpunlaceSaveSubmitQA;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_PRODUCT_CHANGE_OVER_CHECK_LIST_HISTORY_F011", schema = AppConstants.schema)
public class ProductChangeOverCheckListSpunlaceHistoryF011 extends SpunlaceSaveSubmitQA{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LIST_ID")
	private Long listId;

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

    @Column(name = "ORDER_NO_FROM")
    private String orderNoFrom;

    @Column(name = "ORDER_NO_TO")
    private String orderNoTo;

    @Column(name = "SHAFT_NUMBER")
    private String shaftNumber;

    @Column(name = "PRODUCT_NAME")
    private String productName;

    @Column(name = "MIXING_FROM")
    private String mixingFrom;

    @Column(name = "MIXING_TO")
    private String mixingTo;

    @Column(name = "ROLL_NUMBER")
    private String rollNumber;
    
    //For Organic
    @Column(name = "MACHINE_CLEANED_THOROUGHLY")
    private String machineCleanedThoroughly;

    @Column(name = "SETTING_AND_PARAMETERS_CHANGED")
    private String settingAndParametersChanged;

    @Column(name = "MATERIAL_MIXING_CHANGED")
    private String materialMixingChanged;

    @Column(name = "TRIAL_ROLL_TAKEN_QC_APPROVAL")
    private String trialRollTakenQcApproval;

    @Column(name = "QC_CHECKED_APPROVAL_TRIAL_RUN")
    private String qcCheckedApprovalTrialRun;
    
    //QC REPORT
    @Column(name = "QC_CD")
    private String qcCd;

    @Column(name = "QC_MD")
    private String qcMd;

    @Column(name = "QC_GSM")
    private String qcGsm;

    @Column(name = "QC_MOISTURE")
    private String qcMoisture;

    @Column(name = "QC_THICKNESS")
    private String qcThickness;
    
    //spunlace std Operating Param
    @Column(name = "PRODUCT_NAME_OP")
    private String productNameOperatingParam;

    @Column(name = "PATTERN_TOP_OP")
    private String patternTop;

    @Column(name = "PATTERN_BOTTOM_OP")
    private String patternBottom;
    
    @Column(name = "NO_OF_ROLLS_WIDTH_OP")
    private String noOfRollsWidth;

    @Column(name = "GSM_OP")
    private String gsmOperatingParam;
    
    @Column(name = "MOISTURE_OP")
    private String moisture;

    @Column(name = "ROLL_NET_WT_OP")
    private String rollNetWt;

    @Column(name = "ROLL_DIA_OP")
    private String rollDia;

    @Column(name = "ROLL_LENGTH_OP")
    private String rollLength;

    @Column(name = "MATERIAL_BO")
    private String materialBO;
    
    @Column(name = "MATERIAL_WBO1")
    private String materialWBO1;
    
    @Column(name = "MATERIAL_WBO2")
    private String materialWBO2;

    @Column(name = "PERCENTAGE_BO")
    private String percentageBO;
    
    @Column(name = "PERCENTAGE_WBO1")
    private String percentageWBO1;
    
    @Column(name = "PERCENTAGE_WBO2")
    private String percentageWBO2;
    
    @Column(name = "ALC1_GSM")
    private String gsmAlc1;
    
    @Column(name = "ALC2_GSM")
    private String gsmAlc2;
    
    @Column(name = "RC601_GSM")
    private String gsmRc601;
    
    @Column(name = "RC602_GSM")
    private String gsmRc602;
    
    //Jetlace
    
    @Column(name = "JETLACE_VACUUM_STD")
    private int jetlaceVacuumStd;

    @Column(name = "JETLACE_PW_STD")
    private int jetlacePwStd;

    @Column(name = "JETLACE_INJ01_STD")
    private int jetlaceInj01Std;
    
    @Column(name = "JETLACE_IPA_STD")
    private int jetlaceIpaStd;
    
    @Column(name = "JETLACE_INJ11_STD")
    private int jetlaceInj11Std;
    
    @Column(name = "JETLACE_INJ12_STD")
    private int jetlaceInj12Std;
   
    @Column(name = "JETLACE_INJ21_STD")
    private int jetlaceInj21Std;
    
    @Column(name = "JETLACE_VACUUM_SET")
    private int jetlaceVacuumSet;
    
    @Column(name = "JETLACE_PW_SET")
    private int jetlacePwSet;

    @Column(name = "JETLACE_INJ01_SET")
    private int jetlaceInj01Set;

    @Column(name = "JETLACE_IPA_SET")
    private int jetlaceIpaSet;
   
    @Column(name = "JETLACE_INJ11_SET")
    private int jetlaceInj11Set;

    @Column(name = "JETLACE_INJ12_SET")
    private int jetlaceInj12Set;

    @Column(name = "JETLACE_INJ21_SET")
    private int jetlaceInj21Set;

    @Column(name = "REMARKS")
    private String remarks;
    
    @Column(name = "REASON")
	private String reason;
    
    @Column(name = "VERSION")
	private int version;
	
}
