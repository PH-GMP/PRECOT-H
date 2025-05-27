package com.focusr.Precot.QA.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_NON_CONFORMITY_REPORT", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "NCR_NUMBER" }) })
public class QaNonConformityReport extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	// FOR SPRING BOOT VALIDATION

	@Column(name = "TAB_NAME")
	private String tabName;
	
	@Column(name = "TAB_STATUS")
	private String tabStatus;

	@Column(name = "ACTION")
	private String action;
	
	@Column(name = "TAB_INTERNAL_STATUS")
	private String tabInternalStatus;

	// COMMON FIELDS

	@Column(name = "FORMAT_NAME")
	private String format_name;

	@Column(name = "FORMAT_NO")
	private String format_no;

	@Column(name = "REVISION_NO")
	private Long revision_no;

	@Column(name = "REF_SOP_NO")
	private String sop_number;

	@Column(name = "UNIT")
	private String unit;

	// starter fields

	@Column(name = "NCR_NUMBER")
	private String ncrNumber;

	@Column(name = "BMR_NUMBER")
	private String bmrNumber;

	@Column(name = "PRODUCT")
	private String product;

	@Column(name = "DEPARTMENT")
	private String department;

	@Column(name = "MACHINE_NAME")
	private String machineName;

	@Column(name = "DATE")
	private String date;
	
	@Column(name = "TIME")
	private String time;

	@Column(name = "BATCH_NO")
	private String batchNo;

	@Column(name = "FINANCIAL_YEAR")
	private String financialYear;
	
	@Column(name = "YEAR")
	private String year;
	
	@Column(name = "MONTH")
	private String month;

	// FIELDS FOR TAB - A --> NATURE OF NON-CONFORMITY (QA/QC)

	@Column(name = "NON_CONFORMITY_NATURE")
	private String nonConfirmityNature;

	@Column(name = "CLASSIFICATION_MINOR")
	private String classificationMinor;

	@Column(name = "CLASSIFICATION_MAJOR")
	private String classificationMajor;

	@Column(name = "CLASSIFICATION_CRITICAL")
	private String classificationCritical;

	@Column(name = "CATEGORY")
	private String category;            // nature of conformity category

	@Column(name = "QUANTITY_ON_HOLD")
	private String quantityhold;

	@Column(name = "QA_INSPECTOR_A")
	private String qaInspectorA; // submitted by

	@Column(name = "QA_INSPECTOR_ID_A")
	private Long qaInspectorIdA; // submitted id

	@Column(name = "QA_INSPECTOR_DATE_A")
	private Date qaInspectorDateA; // submitted on

	@Column(name = "PROD_SUPERVISOR_A")
	private String productionSupervisorA;

	@Column(name = "PROD_SUPERVISOR_ID_A")
	private Long productionSupervisorIdA;

	@Column(name = "PROD_SUPERVISOR_DATE_A")
	private Date productionSupervisorDateA;

	@Column(name = "TAB_STATUS_A")
	private String tabStatusA;

	// FIELDS FOR TAB B -- CORRECTIONS TAKEN (PROD SUPER)

	@Column(name = "CORRECTION_TAKEN")
	private String correctionTaken;


	// FIELDS ON TAB - C --> ROOT CAUSE (PROD SUPER)

	@Column(name = "ROOT_CAUSE")
	private String rootCause;

	@Column(name = "WHY_1")
	private String why1;

	@Column(name = "WHY_2")
	private String why2;

	@Column(name = "WHY_3")
	private String why3;

	@Column(name = "WHY_4")
	private String why4;

	@Column(name = "WHY_5")
	private String why5;

	// FIELDS ON TAB - D --> CORRECTIVE ACTION & PREVENTIVE ACTION (PROD SUPER)

	@Column(name = "CAPA")
	private String capa;

	@Column(name = "CAPA_DATE")
	private String capaDate;
	
	
	@Column(name = "PROD_SUPERVISOR_BCD")
	private String productionSupervisorBCD;

	@Column(name = "PROD_SUPERVISOR_ID_BCD")
	private Long productionSupervisorIdBCD;

	@Column(name = "PROD_SUPERVISOR_DATE_BCD")
	private Date productionSupervisorDateBCD;
	
	@Column(name = "QA_INSPECTOR_BCD")
	private String qaInspectorBCD;

	@Column(name = "QA_INSPECTOR_ID_BCD")
	private Long qaInspectorIdBCD;

	@Column(name = "QA_INSPECTOR_DATE_BCD")
	private Date qaInspectorDateBCD;
	
	@Column(name = "TAB_STATUS_BCD")
	private String tabStatusBCD;

	// FIELDS ON TAB - E --> VERIFICATION OF CORRECTION (QA/QC)

	@Column(name = "VERIFICATION_OF_CORRECTION")
	private String verificationCorrection;

	@Column(name = "DATE_TAB_E")
	private String dateTabE;

	// FIELDS ON DISPOSITION (QA/QC)

	@Column(name = "REPROCESS")
	private String reprocess;

	@Column(name = "DIVERTED")
	private String diverted;

	@Column(name = "ACCEPTED_DEVIATION")
	private String acceptedDeviation;

	@Column(name = "REJECTED")
	private String rejected;

	@Column(name = "QTY_ACCEPTED")
	private String qtyAccepted;

	@Column(name = "QTY_REJECTED")
	private String qtyRejected;

	@Column(name = "DISPOSITION_DATE_TIME")
	private String dispositionDateTime;
	
	@Column(name = "QA_INSPECTOR_E")
	private String qaInspectorE;

	@Column(name = "QA_INSPECTOR_ID_E")
	private Long qaInspectorIdE;

	@Column(name = "QA_INSPECTOR_DATE_E")
	private Date qaInspectorDateE;

	@Column(name = "TAB_STATUS_E")
	private String tabStatusE;
	
	// NAME
	
	@Column(name = "PRODUCTION_SUPERVISOR_SUBMITTED_BY")
	private String productionSupervisorSubmittedBy;

	@Column(name = "QA_INSPECTOR_SUBMITTED_BY")
	private String qaInspectorSubmittedBy;

	@Column(name = "PRODUCTION_HEAD_SUBMITTED_BY")
	private String productionHeadSubmittedBy;

	@Column(name = "QA_MANAGER_SUBMITTED_BY")
	private String qaManagerSubmittedBy;


	// SIGN

	@Column(name = "PRODUCTION_SUPERVISOR_SIGN")
	private String productionSupervisorSign;

	@Column(name = "QA_INSPECTOR_SIGN")
	private String qaInspectorSign;

	@Column(name = "PRODUCTION_HEAD_SIGN")
	private String productionHeadSign;

	@Column(name = "QA_MANAGER_SIGN")
	private String qaManagerSign;

	// STATUS

	@Column(name = "PRODUCTION_SUPERVISOR_STATUS")
	private String productionSupervisorStatus;

	@Column(name = "QA_INSPECTOR_STATUS")
	private String qaInspectorStatus;

	@Column(name = "PRODUCTION_HEAD_STATUS")
	private String productionHeadStatus;

	@Column(name = "QA_MANAGER_STATUS")
	private String qaManagerStatus;

	// SUBMITTED DATE

	@Column(name = "PRODUCTION_SUPERVISOR_SUBMITTED_DATE")
	private Date productionSupervisorSubmittedDate;

	@Column(name = "QA_INSPECTOR_SUBMITTED_DATE")
	private Date qaInspectorSubmittedDate;

	@Column(name = "PRODUCTION_HEAD_SUBMITTED_DATE")
	private Date productionHeadSubmittedDate;

	@Column(name = "QA_MANAGER_SUBMITTED_DATE")
	private Date qaManagerSubmittedDate;

	// SUBMITTED ID

	@Column(name = "PRODUCTION_SUPERVISOR_SUBMITTED_ID")
	private Long productionSupervisorSubmittedId;

	@Column(name = "QA_INSPECTOR_SUBMITTED_ID")
	private Long qaInspectorSubmittedId;

	@Column(name = "PRODUCTION_HEAD_SUBMITTED_ID")
	private Long productionHeadSubmittedId;

	@Column(name = "QA_MANAGER_SUBMITTED_ID")
	private Long qaManagerSubmittedId;
	
	// Status - OPEN / CLOSED
	
	@Column(name = "STATUS")
	private String status;

	// REASON TO REJECT

	@Column(name = "REASON")
	private String reason;

}
