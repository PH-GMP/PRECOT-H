package com.focusr.Precot.QA.model.audit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_TRAINING_NEED_IDENTIFICATION_FORM_LINE_HISTORY_F005", schema = AppConstants.schema)
public class QaTrainingNeedIdentificationFormLineHistory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "EMPLOYEE_NAME")
	private String employeeName;
	
	@Column(name = "EMPLOYEE_CODE")
	private String employeeCode;
	
	@Column(name = "CATEGORY")
	private String category;
	
	@Column(name = "AWARNESS_OF_ISO_9001")
	private String awarnessOfISO9001;
	
	@Column(name = "AWARNESS_OF_ISO_14001")
	private String awarnessOfISO14001;
	
	@Column(name = "AWARNESS_OF_BRCGS")
	private String awarnessOfBRCGS;
	
	@Column(name = "AWARNESS_OF_SA8000")
	private String awarnessOfSA8000;
	
	@Column(name = "AWARNESS_OF_GOTS")
	private String awarnessOfGOTS;
	
	@Column(name = "AWARNESS_OF_BSCI")
	private String awarnessOfBSCI;
	
	@Column(name = "AWARNESS_OF_ETI")
	private String awarnessOfETI;
	
	@Column(name = "INTERNAL_AUDITORS_TRAINING")
	private String internalAuditorsTraining;
	
	@Column(name = "GOOD_HOUSE_KEEPING_SYSTEM")
	private String goodHousekeepingSystem;
	
	@Column(name = "CHEMICAL_HANDLING_SPILLAGE_SYSTEM")
	private String chemicalHandlingSpillageSystem;
	
	@Column(name = "WASTE_MANAGEMENT_SYSTEM")
	private String wasteManagementSystem;
	
	@Column(name = "ENVIRONMENT")
	private String environment;
	
	@Column(name = "HACCP")
	private String haccp;
	
	@Column(name = "GOOD_MANUFACTURING_PRACTICES")
	private String goodManufacturingPractices;
	
	@Column(name = "ROOT_CAUSE_ANALYSIS_AND_CAPA")
	private String rootCauseAnalysisAndCapa;
	
	@Column(name = "FIRST_AID")
	private String firstAid;
	
	@Column(name = "FIRE_SAFETY_AND_FIRE_FIGHTING")
	private String fireSafetyAndFireFighting;
	
	@Column(name = "MACHINE_OPERATION_AND_SAFETY")
	private String machineOperationAndSafety;
	
	@Column(name = "USAGE_OF_PPE")
	private String usageOfPPE;
	
	@Column(name = "COMPANIES_POLICIES")
	private String companiesPolicies;
	
	@Column(name = "QUALITY_PRODUCTIVITY_AND_WASTE_CONTROL")
	private String qualityProductivityAndWasteControl;
	
	@Column(name = "ATTITUDE_AND_BEHAVIOUR")
	private String attitudeAndBehaviour;
	
	@Column(name = "HISTORY_ID")
	private Long historyId;

}
