package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.ManagementOfIncidence;

@Repository
public interface ManagementOfIncidenceRepository extends JpaRepository<ManagementOfIncidence,Long>{
	@Query(value = "SELECT * FROM precot.QA_MANAGEMENT_OF_INCIDENCE WHERE YEAR = :year AND PLANT_HEAD_STATUS = 'PLANT_HEAD_APPROVED'", nativeQuery = true)
	List<ManagementOfIncidence> printParam(@Param("year") String year);

	@Query(value = "SELECT * FROM precot.QA_MANAGEMENT_OF_INCIDENCE WHERE DATE = :date", nativeQuery = true)
	ManagementOfIncidence getdetailsbyParam(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.QA_MANAGEMENT_OF_INCIDENCE  WHERE DEPARTMENT = :department AND (HOD_STATUS = 'HOD_SAVED' OR PLANT_HEAD_STATUS !='PLANT_HEAD_APPROVED') ORDER BY INCIDENCE_ID DESC", nativeQuery = true)
	List<ManagementOfIncidence> hodSummary(@Param("department") String department);
	
	@Query(value = "SELECT * FROM precot.QA_MANAGEMENT_OF_INCIDENCE  WHERE HOD_STATUS = 'HOD_SUBMITTED' AND PLANT_HEAD_STATUS !='PLANT_HEAD_APPROVED' ORDER BY  INCIDENCE_ID DESC", nativeQuery = true)
	List<ManagementOfIncidence> plantHeadSummary();
	
	//Form Number generation
	 @Query(value = "SELECT TOP 1 * FROM precot.QA_MANAGEMENT_OF_INCIDENCE ORDER BY INCIDENCE_ID DESC ;", nativeQuery = true)
	 ManagementOfIncidence fetchLastGeneratedNo();
	 
		// DASHBOARD
		
		//--001
		
		@Query(value = "SELECT SUM(CASE WHEN HOD_STATUS != 'HOD_SUBMITTED'\r\n"
				+ "OR ((QA_MANAGER_STATUS = 'QA_MR_REJECTED' OR PLANT_HEAD_STATUS = 'PLANT_HEAD_REJECTED') AND HOD_STATUS ='HOD_SUBMITTED')THEN 1 ELSE 0 END) AS hodCount,\r\n"
				+ "SUM(CASE WHEN QA_MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount,\r\n"
				+ "SUM(CASE WHEN PLANT_HEAD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS plantHeadCount\r\n"
				+ "FROM precot.QA_MANAGEMENT_OF_INCIDENCE", nativeQuery = true)
		List<Object[]> getManagementOfIncidenceStatusCounts();
		
		
		// --002 
		
		@Query(value = "SELECT SUM(CASE WHEN QA_HOD_DESIGNEE_STATUS != 'HOD_DESIGNEE_APPROVED'\r\n"
				+ "OR (QA_MR_STATUS = 'QA_MR_REJECTED' AND QA_HOD_DESIGNEE_STATUS ='HOD_DESIGNEE_APPROVED')THEN 1 ELSE 0 END) AS qaHodCount,\r\n"
				+ "SUM(CASE WHEN QA_MR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaMrCount\r\n"
				+ "FROM precot.QA_REQUEST_AND_ISSUNCE_OF_DOCUMENT_F002 WHERE DEPARTMENT  = 'QUALITY_ASSURANCE'", nativeQuery = true)
		List<Object[]> getRequestAndIssuanceOfDocumentStatusCounts();
		
		// --003
		
		@Query(value = "SELECT SUM(CASE WHEN QA_MR_STATUS != 'QA_MR_APPROVED' THEN 1 ELSE 0 END) AS mrDesigneeCount\r\n"
				+ "FROM precot.QA_DISTRIBUTION_AND_DESTRUCTION_RECORD_F003", nativeQuery = true)
		List<Object[]> getDistributionAndDestructionRecordStatusCounts();
		
		// --004 
		
		@Query(value = "SELECT SUM(CASE WHEN HOD_STATUS != 'HOD_SUBMITTED'\r\n"
				+ "OR (QA_MANAGER_STATUS = 'QA_MANAGER_REJECTED' AND HOD_STATUS ='HOD_SUBMITTED')THEN 1 ELSE 0 END) AS hodCount,\r\n"
				+ "SUM(CASE WHEN QA_MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaManagerCount\r\n"
				+ "FROM precot.QA_TRAINING_NEED_IDENTIFICATION_FORM_F005", nativeQuery = true)
		List<Object[]> getTrainingNeedIdentificationFormStatusCounts();
		
		// --005
		
		@Query(value = "SELECT SUM(CASE WHEN QA_DESIGNEE_STATUS != 'QA_DESIGNIEE_SUBMITTED'\r\n"
				+ "OR (QA_MANAGER_MR_STATUS = 'QA_MANAGER_MR_REJECTED' AND QA_DESIGNEE_STATUS ='QA_DESIGNIEE_SUBMITTED')THEN 1 ELSE 0 END) AS qaDesigneeCount,\r\n"
				+ "SUM(CASE WHEN QA_MANAGER_MR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaManagerMrCount\r\n"
				+ "FROM precot.QA_TRAINING_CALENDAR", nativeQuery = true)
		List<Object[]> getTrainingCalanderStatusCounts();
		
		// --006
		
		@Query(value = "SELECT SUM(CASE WHEN HOD_STATUS != 'HOD_APPROVED'THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.TRAINING_RECORD WHERE DEPARTMENT = 'QUALITY_ASSURANCE'", nativeQuery = true)
		List<Object[]> getTrainingRecordStatusCounts();
		
		// --007
		
		@Query(value = "SELECT SUM(CASE WHEN HOD_STATUS != 'HOD_SUBMITTED' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.QA_TRAINING_CARD WHERE DEPARTMENT = 'QUALITY_ASSURANCE'", nativeQuery = true)
		List<Object[]> getTrainingCardStatusCounts();
		
		
		// --008
		
		@Query(value = "SELECT SUM(CASE WHEN HOD_DESIGNEE_STATUS != 'HOD_DESIGNEE_SUBMITTED' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.QA_TRAINING_QUESTIONNAIRE ", nativeQuery = true)
		List<Object[]> getTrainingQuessionnaireStatusCounts();
		
		// --009
		
		@Query(value = "SELECT SUM(CASE WHEN AUDIT_SCHEDULE_STATUS != 'SCHEDULE_SUBMITTED' THEN 1 ELSE 0 END) AS auditScheduleCount\r\n"
				+ "FROM precot.QA_INTERNAL_AUDIT_SCHEDULE", nativeQuery = true)
		List<Object[]> getInternalAuditScheduleStatusCounts();
		
		// --010
		
		@Query(value = "SELECT SUM(CASE WHEN AUDITEE_STATUS != 'AUDITEE_SUBMITTED'\r\n"
				+ "OR ((AUDITOR_STATUS = 'AUDITOR_REJECTED' OR QA_MR_STATUS = 'QA_MR_REJECTED') AND AUDITEE_STATUS = 'AUDITEE_SUBMITTED')THEN 1 ELSE 0 END) AS auditeeCount,\r\n"
				+ "SUM(CASE WHEN AUDITOR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS auditorCount,\r\n"
				+ "SUM(CASE WHEN QA_MR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaMrCount\r\n"
				+ "FROM precot.QA_INTERNAL_AUDIT_REPORT", nativeQuery = true)
		List<Object[]> getInternalAuditReportStatusCounts();
		
		// --011 -- PENDING
		
		@Query(value = "SELECT SUM(CASE WHEN AUDITEE_STATUS != 'AUDITEE_SUBMITTED'\r\n"
				+ "OR ((AUDITOR_STATUS = 'AUDITOR_REJECTED' OR QA_MR_STATUS = 'QA_MR_REJECTED') AND AUDITEE_STATUS = 'AUDITEE_SUBMITTED')THEN 1 ELSE 0 END) AS auditeeCount,\r\n"
				+ "SUM(CASE WHEN AUDITOR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS auditorCount,\r\n"
				+ "SUM(CASE WHEN QA_MR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaMrCount\r\n"
				+ "FROM precot.QA_INTERNAL_AUDIT_REPORT", nativeQuery = true)
		List<Object[]> getInternalAuditNcReportStatusCounts();
		
		
		// -- 012 
		
		@Query(value = "SELECT SUM(CASE WHEN MR_STATUS != 'MR_SUBMITTED' THEN 1 ELSE 0 END) AS qaMrCount\r\n"
				+ "FROM precot.QA_ANNUAL_PLAN", nativeQuery = true)
		List<Object[]> getAnnualPlanStatusCounts();
		
		
		// -- 013
		
		@Query(value = "SELECT SUM(CASE WHEN MR_OR_QA_MANAGER_STATUS != 'MR_OR QA_MANAGER_SUBMITTED' THEN 1 ELSE 0 END) AS qaMrCount\r\n"
				+ "FROM precot.QA_AGENDA_FOR_MANAGEMENT_REVIEW_MEETING", nativeQuery = true)
		List<Object[]> getAgendaForManagementReviewMeetingStatusCounts();
		
		
		// -- 014
		
		@Query(value = "SELECT SUM(CASE WHEN MR_OR_QA_MANAGER_STATUS != 'MR_OR QA_MANAGER_SUBMITTED' THEN 1 ELSE 0 END) AS qaMrCount\r\n"
				+ "FROM precot.QA_MINUTES_OF_MRM", nativeQuery = true)
		List<Object[]> getMinutesOfMrmStatusCounts();
		
		// -- 015
		
		@Query(value = "SELECT SUM(CASE WHEN QA_MR_STATUS = 'QA_MR_SAVED'\r\n"
				+ "OR (HOD_STATUS = 'HOD_REJECTED' AND QA_MR_STATUS = 'QA_MR_SUBMITTED')THEN 1 ELSE 0 END) AS qaDesigneeCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount,\r\n"
				+ "SUM(CASE WHEN QA_MR_STATUS = 'QA_MR_SUBMITTED' AND HOD_STATUS ='HOD_APPROVED' THEN 1 ELSE 0 END) AS qaMrCount\r\n"
				+ "FROM precot.QA_CUSTOMER_COMPLAINT_REGISTER_FORM", nativeQuery = true)
		List<Object[]> getCustomerComplaintRegisterFormStatusCounts();
		
		
		// -- 016
		
		@Query(value = "SELECT SUM(CASE WHEN TAB_STATUS_A != 'SUBMITTED'THEN 1 ELSE 0 END) AS chemistCount1,\r\n"
				+ "SUM(CASE WHEN TAB_STATUS_BCD != 'SUBMITTED'THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN (TAB_STATUS_A = 'SUBMITTED' AND TAB_STATUS_BCD = 'SUBMITTED' AND TAB_STATUS_E ! = 'APPROVED')THEN 1 ELSE 0 END) AS chemistCount2,\r\n"
				+ "SUM(CASE WHEN PRODUCTION_SUPERVISOR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS productionSupervisorCount,\r\n"
				+ "SUM(CASE WHEN PRODUCTION_HEAD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS productionHeadCount,\r\n"
				+ "SUM(CASE WHEN QA_MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaManagerCount\r\n"
				+ "FROM precot.QA_NON_CONFORMITY_REPORT", nativeQuery = true)
		List<Object[]> getNonConfirmityReportForMachineStatusCounts();
		
		// --017
		
		@Query(value = "SELECT SUM(CASE WHEN DESIGNEE_STATUS != 'DESIGNEE_SUBMITTED'\r\n"
				+ "OR (QA_MANAGER_MR_STATUS = 'QA_MANAGER_MR_REJECTED' AND DESIGNEE_STATUS = 'DESIGNEE_SUBMITTED')THEN 1 ELSE 0 END) AS designeeCount,\r\n"
				+ "SUM(CASE WHEN QA_MANAGER_MR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaMrCount\r\n"
				+ "FROM precot.QA_SUPPLIER_AUDIT_PLAN", nativeQuery = true)
		List<Object[]> getSupplierAuditPlanStatusCounts();
		
		// --018
		
		@Query(value = "SELECT SUM(CASE WHEN AUDITOR_STATUS != 'AUDITOR_SUBMITTED'THEN 1 ELSE 0 END) AS auditorCount,\r\n"
				+ "SUM(CASE WHEN SUPPLIER_STATUS ! = 'PDF_UPLOADED' AND AUDITOR_STATUS = 'AUDITOR_SUBMITTED'  THEN 1 ELSE 0 END) AS supplierCount\r\n"
				+ "FROM precot.QA_SUPPLIER_AUDIT_REPORT", nativeQuery = true)
		List<Object[]> getSupplierAuditReportStatusCounts();
		
//		// --019
	//	
//		@Query(value = "", nativeQuery = true)
//		List<Object[]> Q19();
	//	
//		// --020
	//	
		@Query(value = "SELECT SUM(CASE WHEN QA_INSPECTOR_STATUS != 'QA_INSPECTOR_SUBMITTED' \r\n"
				+ "OR (MANAGER_STATUS = 'MANAGER_REJECTED' AND QA_INSPECTOR_STATUS = 'QA_INSPECTOR_SUBMITTED')THEN 1 ELSE 0 END) AS qaInspectorCount,\r\n"
				+ "SUM(CASE WHEN MANAGER_STATUS = 'WAITING_FOR_APPROVAL'THEN 1 ELSE 0 END) AS managerCount\r\n"
				+ "FROM precot.TEMPLATE_FOR_RECALL", nativeQuery = true)
		List<Object[]> getTemplateForRecallMockRecallStatusCounts();
		
		
		// --021
		
		@Query(value = "SELECT SUM(CASE WHEN MANAGER_STATUS != 'MANAGER_APPROVED'\r\n"
				+ "OR (PLANT_HEAD_STATUS = 'PLANT_HEAD_REJECTED' AND MANAGER_STATUS = 'MANAGER_APPROVED')THEN 1 ELSE 0 END) AS managerCount,\r\n"
				+ "SUM(CASE WHEN PLANT_HEAD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS plantHeadCount\r\n"
				+ "FROM precot.MOM_MOC_RECALL_TBL", nativeQuery = true)
		List<Object[]> getMinutesOfMeetingMockRecallStatusCounts();
		
		// --022
		
		@Query(value = "SELECT SUM(CASE WHEN QA_DESIGNEE_STATUS != 'QA_DESIGNIEE_SUBMITTED'\r\n"
				+ "OR (QA_MANAGER_OR_MR_STATUS = 'QA_MANAGER_MR_REJECTED' AND QA_DESIGNEE_STATUS = 'QA_DESIGNIEE_SUBMITTED')THEN 1 ELSE 0 END) AS qaDesigneeCount,\r\n"
				+ "SUM(CASE WHEN QA_MANAGER_OR_MR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaManagerMrCount\r\n"
				+ "FROM precot.QA_ANNUAL_PRODUCT_REVIEW", nativeQuery = true)
		List<Object[]> getAnnualProductReviewStatusCounts();
		
		
		// --023
		
		@Query(value = "SELECT SUM(CASE WHEN MARK_REP_STATUS != 'MARKET_REPRESENTATIVE_SUBMITTED' THEN 1 ELSE 0 END) AS markRepACount,\r\n"
				+ "SUM(CASE WHEN QC_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qcCount,\r\n"
				+ "SUM(CASE WHEN MARK_REP_STATUS_B = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS markRepBCount\r\n"
				+ "FROM precot.NEW_SAMPLE_REQUEST_F029", nativeQuery = true)
		List<Object[]> getNewSampleRequestStatusCounts();
		
		// --024
		
		@Query(value = "SELECT SUM(CASE WHEN QA_INSPECTOR_STATUS != 'QA_INSPECTOR_SUBMITTED'\r\n"
				+ "OR (QA_MANAGER_STATUS = 'QA_MR_REJECTED' AND QA_INSPECTOR_STATUS = 'QA_INSPECTOR_SUBMITTED')THEN 1 ELSE 0 END) AS qaCount,\r\n"
				+ "SUM(CASE WHEN QA_MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaManagerCount\r\n"
				+ "FROM precot.QA_INWARD_INSPECTION_REPORT WHERE FORMAT_NO = 'PH-QAD01/F-029'", nativeQuery = true)
		List<Object[]> getInwardCartonInspectionReportStatusCounts();
		
		// --025
		
		@Query(value = "SELECT SUM(CASE WHEN QA_INSPECTOR_STATUS != 'QA_INSPECTOR_SUBMITTED'\r\n"
				+ "OR (QA_MANAGER_STATUS = 'QA_MR_REJECTED' AND QA_INSPECTOR_STATUS = 'QA_INSPECTOR_SUBMITTED')THEN 1 ELSE 0 END) AS qaCount,\r\n"
				+ "SUM(CASE WHEN QA_MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaManagerCount\r\n"
				+ "FROM precot.QA_INWARD_INSPECTION_REPORT WHERE FORMAT_NO = 'PH-QAD01/F-030'", nativeQuery = true)
		List<Object[]> getInwardFilmInspectionReportStatusCounts();
		
		// --026
		
		@Query(value = "SELECT SUM(CASE WHEN QA_INSPECTOR_STATUS != 'QA_INSPECTOR_SUBMITTED'\r\n"
				+ "OR (QA_MANAGER_STATUS = 'QA_MR_REJECTED' AND QA_INSPECTOR_STATUS = 'QA_INSPECTOR_SUBMITTED')THEN 1 ELSE 0 END) AS qaCount,\r\n"
				+ "SUM(CASE WHEN QA_MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaManagerCount\r\n"
				+ "FROM precot.QA_INWARD_INSPECTION_REPORT WHERE FORMAT_NO = 'PH-QAD01/F-031'", nativeQuery = true)
		List<Object[]> getInwardZipLockInspectionReportStatusCounts();
		
		// --027
		
		@Query(value = "SELECT SUM(CASE WHEN QA_INSPECTOR_STATUS != 'QA_INSPECTOR_SUBMITTED'\r\n"
				+ "OR (QA_MANAGER_STATUS = 'QA_MR_REJECTED' AND QA_INSPECTOR_STATUS = 'QA_INSPECTOR_SUBMITTED')THEN 1 ELSE 0 END) AS qaCount,\r\n"
				+ "SUM(CASE WHEN QA_MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaManagerCount\r\n"
				+ "FROM precot.QA_INWARD_INSPECTION_REPORT WHERE FORMAT_NO = 'PH-QAD01/F-032'", nativeQuery = true)
		List<Object[]> getInwardStickInspectionStatusCounts();
		
		// --028
		
		@Query(value = "SELECT SUM(CASE WHEN QA_INSPECTOR_STATUS != 'QA_INSPECTOR_SUBMITTED'\r\n"
				+ "OR (QA_MANAGER_STATUS = 'QA_MR_REJECTED' AND QA_INSPECTOR_STATUS = 'QA_INSPECTOR_SUBMITTED')THEN 1 ELSE 0 END) AS qaCount,\r\n"
				+ "SUM(CASE WHEN QA_MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaManagerCount\r\n"
				+ "FROM precot.QA_INWARD_INSPECTION_REPORT WHERE FORMAT_NO = 'PH-QAD01/F-033'", nativeQuery = true)
		List<Object[]> getInwardInspectionJarStatusCounts();
		
		
		// --029
		
		
		// --030
		
		
		// --031
		
		
		// --032
		
		@Query(value = "SELECT SUM(CASE WHEN QA_INSPECTOR_STATUS = 'QAINSPECTOR_SAVED'\r\n"
				+ "OR (QA_MR_STATUS = 'QA_MR_REJECTED' AND QA_INSPECTOR_STATUS = 'QA_INS_APPROVED')THEN 1 ELSE 0 END) AS qaCount,\r\n"
				+ "SUM(CASE WHEN QA_MR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaMRCount\r\n"
				+ "FROM precot.QA_FINAL_INSPECTION_REPORT_F037 WHERE DEPT_NAME = 'QUALITY_ASSURANCE'", nativeQuery = true)
		List<Object[]> getFinalInspectionF037StatusCounts();
		
		
		// --033
		
		@Query(value = "SELECT SUM(CASE WHEN QA_INSPECTOR_STATUS = 'QAINSPECTOR_SAVED'\r\n"
				+ "OR (QA_MR_STATUS = 'QA_MR_REJECTED' AND QA_INSPECTOR_STATUS = 'QA_INS_APPROVED')THEN 1 ELSE 0 END) AS qaCount,\r\n"
				+ "SUM(CASE WHEN QA_MR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaMRCount\r\n"
				+ "FROM precot.QA_FINAL_INSPECTION_REPORT_F037 WHERE DEPT_NAME = 'COTTON_BUDS'", nativeQuery = true)
		List<Object[]> getFinalInspectionF038StatusCounts();
		
		// -- 34
		
		@Query(value = "SELECT SUM(CASE WHEN QA_INSPECTOR_STATUS = 'QAINSPECTOR_SAVED'\r\n"
				+ "OR (QA_MR_STATUS = 'QA_MR_REJECTED' AND QA_INSPECTOR_STATUS = 'QA_INS_APPROVED')THEN 1 ELSE 0 END) AS qaCount,\r\n"
				+ "SUM(CASE WHEN DISPATCH_SUPERVISOR_STATUS = 'WAITING_FOR_APPROVAL'\r\n"
				+ "OR (QA_MR_STATUS = 'QA_MR_REJECTED' AND DISPATCH_SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS disptchSecurityCount,\r\n"
				+ "SUM(CASE WHEN SECURITY__STATUS = 'WAITING_FOR_APPROVAL'\r\n"
				+ "OR (QA_MR_STATUS = 'QA_MR_REJECTED' AND SECURITY__STATUS = 'SECURITY_APPROVED')THEN 1 ELSE 0 END) AS SecurityCount,\r\n"
				+ "SUM(CASE WHEN QA_MR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaMRCount\r\n"
				+ "FROM precot.QA_CONTAINER_INSPECTION_REPORT_F039", nativeQuery = true)
		List<Object[]> getContainerInspectionReportStatusCounts();
		
		
		// -- 35
		
		@Query(value = "SELECT SUM(CASE WHEN INS_STATUS = 'QA_INSPECTOR_SAVED'\r\n"
				+ "OR (QC_STATUS = 'QA_MANAGER_REJECTED' AND INS_STATUS = 'QA_INS_APPROVED')THEN 1 ELSE 0 END) AS qaCount,\r\n"
				+ "SUM(CASE WHEN QC_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaManagerCount\r\n"
				+ "FROM precot.PRODUCTION_RETAINED_SAMPLE_REGISTER_PARENT", nativeQuery = true)
		List<Object[]> getProductionRetainedSampleRegisterStatusCounts();
		
		// -- 36
		
		@Query(value = "SELECT SUM(CASE WHEN HOD_STATUS_TAB_8 ! = 'SUBMITTED' OR HOD_STATUS_TAB_8 IS NULL THEN 1 ELSE 0 END) AS hodCount,\r\n"
				+ "SUM(CASE WHEN QA_MANAGER_STATUS_TAB_8 ! = 'SUBMITTED' OR QA_MANAGER_STATUS_TAB_8 IS NULL THEN 1 ELSE 0 END) AS qaManagerCount\r\n"
				+ "FROM precot.QA_CHANGE_CONTROL_FORM", nativeQuery = true)
		List<Object[]> getChangeControlFormStatusCounts();
		
		// -- 37
		
		@Query(value = "SELECT SUM(CASE WHEN (HOD_OR_DESIGNEE_STATUS = 'HOD_SAVED' OR HOD_OR_DESIGNEE_STATUS = 'DESIGNEE_SAVED')THEN 1 ELSE 0 END) AS hodDesigneeCount,\r\n"
				+ "SUM(CASE WHEN MR_OR_QA_MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaMrCount\r\n"
				+ "FROM precot.QA_CHANGE_CONTROL_LOG_BOOK_F042", nativeQuery = true)
		List<Object[]> getChangeControlLogBookFormStatusCounts();
		
		// -- 38
		
		@Query(value = "SELECT SUM(CASE WHEN QA_INSPECTOR_STATUS = 'QA_INSPECTOR_SAVED'\r\n"
				+ "OR (QA_INSPECTOR_STATUS = 'QA_INSPECTOR_APPROVED' AND QA_MR_STATUS = 'QA_MR_REJECTED') THEN 1 ELSE 0 END) AS qaInspectorCount,\r\n"
				+ "SUM(CASE WHEN QA_MR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaMrCount\r\n"
				+ "FROM precot.QA_QUALITY_REVIEW_MEETINGS_F043", nativeQuery = true)
		List<Object[]> getQualityReviewMeetingStatusCounts();
		
		// -- 39
		
		@Query(value = "SELECT SUM(CASE WHEN QA_INSPECTOR_STATUS = 'QA_INSPECTOR_SAVED'\r\n"
				+ "OR (QA_INSPECTOR_STATUS = 'QA_INSPECTOR_APPROVED' AND QA_DESIGNEE_STATUS = 'QA_DESIGNIEE_REJECTED')\r\n"
				+ "OR (QA_INSPECTOR_STATUS = 'QA_INSPECTOR_APPROVED' AND QA_MANAGER_MR_STATUS = 'QA_MANAGER_MR_REJECTED')THEN 1 ELSE 0 END) AS qaCount,\r\n"
				+ "SUM(CASE WHEN QA_DESIGNEE_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS designeeCount,\r\n"
				+ "SUM(CASE WHEN QA_MANAGER_MR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaManagerMrCount\r\n"
				+ "FROM precot.QA_CORRECTIVE_ACTION_REPORT", nativeQuery = true)
		List<Object[]> getCorrectiveActionReportStatusCounts();
		
		// -- 40
		
		@Query(value = "SELECT SUM(CASE WHEN QA_INSPECTOR_STATUS = 'QA_INSPECTOR_SAVED'\r\n"
				+ "OR (QA_INSPECTOR_STATUS = 'QA_INSPECTOR_APPROVED' AND SUPERVISOR_STATUS = 'PRODUCTION_SUPERVISOR_REJECTED')THEN 1 ELSE 0 END) AS qaCount,\r\n"
				+ "SUM(CASE WHEN SUPERVISOR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS supervisorCount\r\n"
				+ "FROM precot.QA_BMR_ISSUE_REGISTER_F045", nativeQuery = true)
		List<Object[]> getBmrIssueRegisterStatusCounts();
		
		
		// -- 41
		
		@Query(value = "SELECT SUM(CASE WHEN QA_MANAGER_OR_DESIGNEE_STATUS = 'DESIGNEE_OR_QA_MANAGER_SAVED' THEN 1 ELSE 0 END) AS qaCount\r\n"
				+ "FROM precot.QA_BATCH_RELEASE_NOTE_HEADER", nativeQuery = true)
		List<Object[]> getBatchReleaseNoteStatusCounts();
		
		
		// -- 42
		
		@Query(value = "SELECT SUM(CASE WHEN INS_STATUS = 'QA_INSPECTOR_SAVED'\r\n"
				+ "OR (INS_STATUS = 'QA_INSPECTOR_SUBMITTED' AND QC_STATUS = 'QC_REJECTED')THEN 1 ELSE 0 END) AS qaCount,\r\n"
				+ "SUM(CASE WHEN QC_STATUS_B = 'CHEMIST_SAVED' OR QC_STATUS_B = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS chemistCount,\r\n"
				+ "SUM(CASE WHEN INS_STATUS = 'QA_INSPECTOR_SUBMITTED' AND QC_STATUS_B = 'CHEMIST_APPROVED' AND QC_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qcCount\r\n"
				+ "FROM precot.BATCH_RELEASE_CHECKLIST", nativeQuery = true)
		List<Object[]> getBatchReleaseCheckListStatusCounts();
		
		
//		// -- 43
	//	
//		@Query(value = "", nativeQuery = true)
//		List<Object[]> getDeviationFormStatusCounts();
		
		// -- 44
		
		@Query(value = "SELECT SUM(CASE WHEN QA_INSPECTOR_STATUS = 'QA_INSPECTOR_SAVED'\r\n"
				+ "OR (QA_INSPECTOR_STATUS = 'QA_INSPECTOR_APPROVED' AND QA_MR_STATUS = 'QA_MR_REJECTED')THEN 1 ELSE 0 END) AS qaCount,\r\n"
				+ "SUM(CASE WHEN QA_MR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaMrCount\r\n"
				+ "FROM precot.QA_PRODUCT_DISPOSITION_LOGBOOK_F049", nativeQuery = true)
		List<Object[]> getProductionDispositionLogbookStatusCounts();
		
		// -- 45
		
		@Query(value = "SELECT SUM(CASE WHEN QA_INSPECTOR_STATUS = 'QA_INSPECTOR_SAVED'\r\n"
				+ "OR (QA_INSPECTOR_STATUS = 'QA_INSPECTOR_APPROVED' AND MANAGER_STATUS = 'MANAGER_REJECTED')THEN 1 ELSE 0 END) AS qaCount,\r\n"
				+ "SUM(CASE WHEN MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount\r\n"
				+ "FROM precot.LIST_OF_GHPWC", nativeQuery = true)
		List<Object[]> getListOfGlassHardPlasticStatusCounts();
		
		// -- 46
		
		@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS = 'SUPERVISOR_SAVED'\r\n"
				+ "OR (SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS = 'HOD_REJECTED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.CONTROL_OF_GHPWC WHERE DEPARTMENT = 'QUALITY_ASSURANCE'", nativeQuery = true)
		List<Object[]> getControlOfGlassHardPlasticStatusCounts();
		
		
		// -- 47
		
		@Query(value = "SELECT SUM(CASE WHEN QA_INSPECTOR_STATUS = 'QA_INSPECTOR_SAVED'\r\n"
				+ "OR (QA_INSPECTOR_STATUS = 'QA_INSPECTOR_APPROVED' AND HOD_STATUS = 'HOD_REJECTED') \r\n"
				+ "OR (QA_INSPECTOR_STATUS = 'QA_INSPECTOR_APPROVED' AND MANAGER_STATUS = 'MANAGER_REJECTED') THEN 1 ELSE 0 END) AS qaCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount,\r\n"
				+ "SUM(CASE WHEN MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount\r\n"
				+ "FROM precot.QA_BREAKAGE_REPORT", nativeQuery = true)
		List<Object[]> getBrakageReportStatusCounts();
		
		// -- 48
		
		@Query(value = "SELECT SUM(CASE WHEN ( OPERATOR_STATUS = 'OPERATOR_SAVED'\r\n"
				+ "OR (OPERATOR_STATUS = 'OPERATOR_APPROVED' AND SUPERVISOR_STATUS = 'SUPERVISOR_REJECTED') \r\n"
				+ "OR (OPERATOR_STATUS = 'OPERATOR_APPROVED' AND QA_INSPECTOR_STATUS = 'QA_INSPECTOR_REJECTED')) AND DEPARTMENT  = 'QUALITY_ASSURANCE' THEN 1 ELSE 0 END) AS operatorCount,\r\n"
				+ "SUM(CASE WHEN SUPERVISOR_STATUS = 'WAITING_FOR_APPROVAL' AND DEPARTMENT  = 'QUALITY_ASSURANCE' THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN QA_INSPECTOR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaCount\r\n"
				+ "FROM precot.METAL_DETECTOR_CALIBRATION_RECORDS", nativeQuery = true)
		List<Object[]> getMetalDetectorCalibrationRecordStatusCounts();
		
		// -- 49
		
//		@Query(value = "", nativeQuery = true)
//		List<Object[]> getMetalDetectorPassReportStatusCounts();
		
		// -- 50
		
		@Query(value = "SELECT SUM(CASE WHEN QA_INSPECTOR_STATUS = 'QA_INSPECTOR_SAVED'\r\n"
				+ "OR (QA_INSPECTOR_STATUS = 'QA_INSPECTOR_SUBMITTED' AND (MANAGER_STATUS = 'MR_REJECTED' OR MANAGER_STATUS = 'QA_MANAGER_REJECTED'\r\n"
				+ "OR MANAGER_STATUS = 'DESIGNEE_REJECTED' ))THEN 1 ELSE 0 END) AS qaCount,\r\n"
				+ "SUM(CASE WHEN MANAGER_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS managerCount\r\n"
				+ "FROM precot.QA_MASTER_LIST_OF_SHARP_TOOLS_F060", nativeQuery = true)
		List<Object[]> getMasterListOfSharpToolsStatusCounts();
		
		
		// -- 51
		
		@Query(value = "SELECT SUM(CASE WHEN HOD_STATUS = 'HOD_SAVED'THEN 1 ELSE 0 END) AS qaCount\r\n"
				+ "FROM precot.QA_TRAINING_SESSION_ALLOTMENT_REGISTER WHERE DEPARTMENT = 'QUALITY_ASSURANCE'", nativeQuery = true)
		List<Object[]> getTrainingSessionAllotmentRegisterStatusCounts();
		
		
		// -- 52
		
		@Query(value = "SELECT SUM(CASE WHEN PCI_STATUS = 'PCI_SAVED'\r\n"
				+ "OR (PCI_STATUS = 'PCI_SUBMITTED' AND QA_MR_STATUS = 'QA_MR_REJECTED' )THEN 1 ELSE 0 END) AS pciCount,\r\n"
				+ "SUM(CASE WHEN QA_MR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaMrCount\r\n"
				+ "FROM precot.QA_RODENT_BOX_CHECK_LIST", nativeQuery = true)
		List<Object[]> getRodentBoxCheckListStatusCounts();
		
		
		// -- 53  14th
		
		@Query(value = "SELECT SUM(CASE WHEN PCI_STATUS = 'PCI_SAVED'\r\n"
				+ "OR (PCI_STATUS = 'PCI_SUBMITTED' AND QA_MR_STATUS = 'QA_MR_REJECTED' )THEN 1 ELSE 0 END) AS pciCount,\r\n"
				+ "SUM(CASE WHEN QA_MR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaMrCount\r\n"
				+ "FROM precot.QA_PEST_CONTROLLER  WHERE FORMAT_NO = 'PH-HRD01/F-014'", nativeQuery = true)
		List<Object[]> getPestControlF014StatusCounts();
		
		// -- 54  15th
		
		@Query(value = "SELECT SUM(CASE WHEN PCI_STATUS = 'PCI_SAVED'\r\n"
				+ "OR (PCI_STATUS = 'PCI_SUBMITTED' AND QA_MR_STATUS = 'QA_MR_REJECTED' )THEN 1 ELSE 0 END) AS pciCount,\r\n"
				+ "SUM(CASE WHEN QA_MR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaMrCount\r\n"
				+ "FROM precot.QA_PEST_CONTROLLER  WHERE FORMAT_NO = 'PH-HRD01/F-015'", nativeQuery = true)
		List<Object[]> getPestControlF015StatusCounts();
		
		// -- 55  16th
		
		@Query(value = "SELECT SUM(CASE WHEN PCI_STATUS = 'PCI_SAVED'\r\n"
				+ "OR (PCI_STATUS = 'PCI_SUBMITTED' AND QA_MR_STATUS = 'QA_MR_REJECTED' )THEN 1 ELSE 0 END) AS pciCount,\r\n"
				+ "SUM(CASE WHEN QA_MR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaMrCount\r\n"
				+ "FROM precot.QA_PEST_CONTROLLER  WHERE FORMAT_NO = 'PH-HRD01/F-016'", nativeQuery = true)
		List<Object[]> getPestControlF016StatusCounts();
		
		// -- 56  17th
		
		@Query(value = "SELECT SUM(CASE WHEN PCI_STATUS = 'PCI_SAVED'\r\n"
				+ "OR (PCI_STATUS = 'PCI_SUBMITTED' AND QA_MR_STATUS = 'QA_MR_REJECTED' )THEN 1 ELSE 0 END) AS pciCount,\r\n"
				+ "SUM(CASE WHEN QA_MR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaMrCount\r\n"
				+ "FROM precot.QA_PEST_CONTROLLER  WHERE FORMAT_NO = 'PH-HRD01/F-017'", nativeQuery = true)
		List<Object[]> getPestControlF017StatusCounts();
		
		// -- 57  18th
		
		@Query(value = "SELECT SUM(CASE WHEN PCI_STATUS = 'PCI_SAVED'\r\n"
				+ "OR (PCI_STATUS = 'PCI_SUBMITTED' AND QA_MR_STATUS = 'QA_MR_REJECTED' )THEN 1 ELSE 0 END) AS pciCount,\r\n"
				+ "SUM(CASE WHEN QA_MR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaMrCount\r\n"
				+ "FROM precot.QA_PEST_CONTROLLER  WHERE FORMAT_NO = 'PH-HRD01/F-018'", nativeQuery = true)
		List<Object[]> getPestControlF018StatusCounts();
		
		// -- 58  19th
		
		@Query(value = "SELECT SUM(CASE WHEN PCI_STATUS = 'PCI_SAVED'\r\n"
				+ "OR (PCI_STATUS = 'PCI_SUBMITTED' AND QA_MR_STATUS = 'QA_MR_REJECTED' )THEN 1 ELSE 0 END) AS pciCount,\r\n"
				+ "SUM(CASE WHEN QA_MR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaMrCount\r\n"
				+ "FROM precot.QA_PEST_CONTROLLER  WHERE FORMAT_NO = 'PH-HRD01/F-019'", nativeQuery = true)
		List<Object[]> getPestControlF019StatusCounts();

	
}
