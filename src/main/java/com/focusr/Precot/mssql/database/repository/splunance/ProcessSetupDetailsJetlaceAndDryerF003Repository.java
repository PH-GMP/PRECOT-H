package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupDetailsJetlaceAndDryerF003;




@Repository
public interface ProcessSetupDetailsJetlaceAndDryerF003Repository extends JpaRepository<ProcessSetupDetailsJetlaceAndDryerF003,Long>{

	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_JETLACE_AND_DRYER_F003 WHERE PROCESS_ID=:id", nativeQuery = true)
	ProcessSetupDetailsJetlaceAndDryerF003 findProcessSetupDetailsById(@Param("id") Long id);
	
	
//	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_JETLACE_AND_DRYER_F003 WHERE ORDER_NO = :order_no AND DATE = :date AND SHIFT = :shift AND HOD_STATUS = 'HOD_APPROVED' ", nativeQuery = true)
	  @Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_JETLACE_AND_DRYER_F003 WHERE " +
              "(:order_no IS NULL OR ORDER_NO = :order_no) AND " +
              "(:date IS NULL OR DATE = :date) AND " +
              "(:shift IS NULL OR SHIFT = :shift) AND " +
              " HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<ProcessSetupDetailsJetlaceAndDryerF003> printParam(@Param("order_no") String order_no, @Param("date") String date, @Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_JETLACE_AND_DRYER_F003 WHERE ORDER_NO=:order_no AND DATE=:date AND SHIFT=:shift ", nativeQuery = true)
	ProcessSetupDetailsJetlaceAndDryerF003 getdetailsbyParam(@Param("order_no") String order_no, @Param("date") String date, @Param("shift") String shift);
	
	 @Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_JETLACE_AND_DRYER_F003  WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS !='HOD_APPROVED' ORDER BY PROCESS_ID DESC", nativeQuery = true)
	 List<ProcessSetupDetailsJetlaceAndDryerF003> hodSummary();
	 
	 @Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_JETLACE_AND_DRYER_F003  WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND HOD_STATUS !='HOD_APPROVED' ORDER BY PROCESS_ID DESC", nativeQuery = true)
	 List<ProcessSetupDetailsJetlaceAndDryerF003> supervisorSummary();
	 
	 @Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_JETLACE_AND_DRYER_F003  WHERE OPERATOR_STATUS = 'OPERATOR_SAVED' OR HOD_STATUS !='HOD_APPROVED' ORDER BY  PROCESS_ID DESC", nativeQuery = true)
	 List<ProcessSetupDetailsJetlaceAndDryerF003> operatorSummary();
	 
		// DASHBOARD
	 
	 // --003

		@Query(value = "SELECT SUM(CASE WHEN OPERATOR_STATUS != 'OPERATOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND OPERATOR_STATUS ='OPERATOR_APPROVED') \r\n"
				+ "OR (SUPERVISOR_STATUS = 'SUPERVISOR_REJECTED' AND OPERATOR_STATUS ='OPERATOR_APPROVED')THEN 1 ELSE 0 END) AS operatorCount,\r\n"
				+ "SUM(CASE WHEN SUPERVISOR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_JETLACE_AND_DRYER_F003", nativeQuery = true)
		List<Object[]> getStatusCounts();
		
//		--004 
		
		@Query(value = "SELECT SUM(CASE WHEN OPERATOR_STATUS != 'OPERATOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND OPERATOR_STATUS ='OPERATOR_APPROVED') \r\n"
				+ "OR (SUPERVISOR_STATUS = 'SUPERVISOR_REJECTED' AND OPERATOR_STATUS ='OPERATOR_APPROVED')THEN 1 ELSE 0 END) AS operatorCount,\r\n"
				+ "SUM(CASE WHEN SUPERVISOR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.SPUNLACE_FILTER_BAG_CONSUMPTION_DETAILS_F004", nativeQuery = true)
		List<Object[]> getFilterBagConsumptionDetailsStatusCounts();
		
//		--005 
		
		@Query(value = "SELECT SUM(CASE WHEN OPERATOR_STATUS != 'OPERATOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND OPERATOR_STATUS ='OPERATOR_APPROVED') \r\n"
				+ "OR (SUPERVISOR_STATUS = 'SUPERVISOR_REJECTED' AND OPERATOR_STATUS ='OPERATOR_APPROVED')THEN 1 ELSE 0 END) AS operatorCount,\r\n"
				+ "SUM(CASE WHEN SUPERVISOR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_WINTER_F005", nativeQuery = true)
		List<Object[]> getProcessSetupWinderStatusCounts();
		
//		--006
		
		@Query(value = "SELECT SUM(CASE WHEN OPERATOR_STATUS != 'OPERATOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND OPERATOR_STATUS ='OPERATOR_APPROVED') \r\n"
				+ "OR (SUPERVISOR_STATUS = 'SUPERVISOR_REJECTED' AND OPERATOR_STATUS ='OPERATOR_APPROVED')THEN 1 ELSE 0 END) AS operatorCount,\r\n"
				+ "SUM(CASE WHEN SUPERVISOR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.SPUNLACE_DAILY_PRODUCTION_REPORT_F006", nativeQuery = true)
		List<Object[]> getDailyProductionReportStatusCounts();
		
//		--007
		
		@Query(value = "SELECT SUM(CASE WHEN OPERATOR_STATUS != 'OPERATOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND OPERATOR_STATUS ='OPERATOR_APPROVED') \r\n"
				+ "OR (SUPERVISOR_STATUS = 'SUPERVISOR_REJECTED' AND OPERATOR_STATUS ='OPERATOR_APPROVED')THEN 1 ELSE 0 END) AS operatorCount,\r\n"
				+ "SUM(CASE WHEN SUPERVISOR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.SPUNLACE_DAILY_REJECTION_REPORT_F007", nativeQuery = true)
		List<Object[]> getDailyRejectionReportStatusCounts();
		
//		--008
		
		@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.SPUNLACE_DAILY_STOPPAGE_DETAILS_F008", nativeQuery = true)
		List<Object[]> getDailyStoppageReportStatusCounts();
		
//		--009
		
		@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.SPUNLACE_GSM_ANALYSIS_REPORT_F009", nativeQuery = true)
		List<Object[]> getGsmAnalysisReportStatusCounts();
		
//		--010
		
		@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.SPUNLACE_LOGBOOK_SPUNLACE_PLANNING_F010", nativeQuery = true)
		List<Object[]> getLogBookSpunlacePlanningStatusCounts();
		
		
		
//		-- 11
		
		@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED') \r\n"
				+ "OR (QA_STATUS = 'QA_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount,\r\n"
				+ "SUM(CASE WHEN QA_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qcCount\r\n"
				+ "FROM precot.SPUNLACE_PRODUCT_CHANGE_OVER_CHECK_LIST__F011", nativeQuery = true)
		List<Object[]> getProductChangeOverCheckListStatusCounts();

		
//		-- 12
		
		@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED') \r\n"
				+ "OR (QC_STATUS = 'QC_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount,\r\n"
				+ "SUM(CASE WHEN QC_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qcCount\r\n"
				+ "FROM precot.SPUNLACE_SAMPLE_REPORT_F012", nativeQuery = true)
		List<Object[]> getSampleReportStatusCounts();
		
//		--13
		
		@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.RP_BALE_PRESS_STOPPAGE_F15", nativeQuery = true)
		List<Object[]> getRpBalePressStoppageStatusCounts();
		
//		-- 14
		
		@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.SPUNLACE_SHIFT_WISE_COTTON_WASTE_REPORT_F019", nativeQuery = true)
		List<Object[]> getShiftWiseCottonWasteReportStatusCounts();
		
//		-- 15
		
		@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.SPUNLACE_METAL_DETECTOR_CHECK_LIST_F020", nativeQuery = true)
		List<Object[]> getMetalDetectorCheckListStatusCounts();
		
//		-- 16
		
		@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.SPUNLACE_MACHINE_CLEANING_RECORD_F023", nativeQuery = true)
		List<Object[]> getMachineCleaningRecordStatusCounts();
		
//		-- 17
		
		@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.SPUNLACE_SANITIZATION_OF_MACHINES_AND_SURFACES_F024", nativeQuery = true)
		List<Object[]> getSanitizationOfMachineAndSurfaceStatusCounts();
		
//		-- 18
		
		@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.SPUNLACE_HAND_SANITIZATION_REPORT_F025", nativeQuery = true)
		List<Object[]> getSpunlaceHandSanitizationReportStatusCounts();
		
		
//		THREE ROLES
		
//		-- 19
		
		@Query(value = "SELECT SUM(CASE WHEN OPERATOR_STATUS != 'OPERATOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND OPERATOR_STATUS ='OPERATOR_APPROVED') \r\n"
				+ "OR (SUPERVISOR_STATUS = 'SUPERVISOR_REJECTED' AND OPERATOR_STATUS ='OPERATOR_APPROVED')THEN 1 ELSE 0 END) AS operatorCount,\r\n"
				+ "SUM(CASE WHEN SUPERVISOR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_RP_BALEPRESS_F013", nativeQuery = true)
		List<Object[]> getProcessSetupVerificationRPBalePressStatusCounts();
		
//		-- 20
		
		@Query(value = "SELECT SUM(CASE WHEN OPERATOR_STATUS != 'OPERATOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND OPERATOR_STATUS ='OPERATOR_APPROVED') \r\n"
				+ "OR (SUPERVISOR_STATUS = 'SUPERVISOR_REJECTED' AND OPERATOR_STATUS ='OPERATOR_APPROVED')THEN 1 ELSE 0 END) AS operatorCount,\r\n"
				+ "SUM(CASE WHEN SUPERVISOR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.SHIFT_WISE_RP_PROD_SUPPORT_F14", nativeQuery = true)
		List<Object[]> getShiftWiseRpProductionReportStatusCounts();
		
//		-- 21
		
		@Query(value = "SELECT SUM(CASE WHEN OPERATOR_STATUS != 'OPERATOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND OPERATOR_STATUS ='OPERATOR_APPROVED') \r\n"
				+ "OR (SUPERVISOR_STATUS = 'SUPERVISOR_REJECTED' AND OPERATOR_STATUS ='OPERATOR_APPROVED')THEN 1 ELSE 0 END) AS operatorCount,\r\n"
				+ "SUM(CASE WHEN SUPERVISOR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_SLITER_WINDER_F016", nativeQuery = true)
		List<Object[]> getProcessSetupVerificationSliterWinderStatusCounts();
		
//		-- 22
		
		@Query(value = "SELECT SUM(CASE WHEN OPERATOR_STATUS != 'OPERATOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND OPERATOR_STATUS ='OPERATOR_APPROVED') \r\n"
				+ "OR (SUPERVISOR_STATUS = 'SUPERVISOR_REJECTED' AND OPERATOR_STATUS ='OPERATOR_APPROVED')THEN 1 ELSE 0 END) AS operatorCount,\r\n"
				+ "SUM(CASE WHEN SUPERVISOR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.SPUNLACE_SHIFT_WISE_SLITER_WINDER_PRODUCTION_REPORT_F017", nativeQuery = true)
		List<Object[]> getShiftWiseSliterWinderProductionReportStatusCounts();
		
		
//		-- 23
		
		@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.SHIFT_WISE_STOPPAGE_REPORT_F018", nativeQuery = true)
		List<Object[]> getShiftWiseStoppageReportSliterWinderStatusCounts();
}
