package com.focusr.Precot.mssql.database.repository.padpunching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.ProductionDetailLogBook01;
import com.focusr.Precot.mssql.database.model.padpunching.ProductionDetailsLogBook01;

@Repository
public interface ProductionDetailLogBook01Repo extends JpaRepository<ProductionDetailLogBook01, Long> {

	@Query(value = "SELECT * FROM precot.PRODUCTION_DETAIL_LOG_BOOK_F01 WHERE PROD_ID=:id", nativeQuery = true)
	ProductionDetailLogBook01 productionDetailsById(@Param("id") Long id);
	
	@Query(value = "SELECT * FROM precot.PRODUCTION_DETAIL_LOG_BOOK_F01 WHERE PROD_ID =:id ", nativeQuery = true)
	ProductionDetailLogBook01 findFormById(@Param("id") long id);
	
	@Query(value = "SELECT * FROM precot.PRODUCTION_DETAIL_LOG_BOOK_F01 WHERE DATE=:date AND SHIFT=:shift ", nativeQuery = true)
	ProductionDetailLogBook01 productionDetailsByDateShift(@Param("date") String date, @Param("shift") String shift);

//	@Query(value = "SELECT * FROM precot.PRODUCTION_DETAIL_LOG_BOOK_F01 WHERE DATE = :date AND SHIFT = :shift AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
//	List<ProductionDetailLogBook01> productionDetailsPrint(@Param("date") String date, @Param("shift") String shift);

	@Query(value = "SELECT * FROM precot.PRODUCTION_DETAIL_LOG_BOOK_F01 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY PROD_ID DESC", nativeQuery = true)
	List<ProductionDetailLogBook01> supervisorSummary();

	@Query(value = "SELECT * FROM precot.PRODUCTION_DETAIL_LOG_BOOK_F01 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY PROD_ID DESC", nativeQuery = true)
	List<ProductionDetailLogBook01> hodSummary();
	
	@Query(value = "SELECT * FROM precot.PRODUCTION_DETAIL_LOG_BOOK_F01 " +
            "WHERE (:date IS NULL OR :date='' OR DATE = :date) " +
            "AND (:shift IS NULL OR :shift='' OR SHIFT = :shift) " +
            "AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<ProductionDetailLogBook01> productionDetailsPrint(@Param("date") String date,@Param("shift") String shift);
	
	// DASHBOARD
	
//		-- 001
		
		@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.PRODUCTION_DETAIL_LOG_BOOK_F01", nativeQuery = true)
		List<Object[]> getProductionDetailsLogBookStatusCounts();
		
//		-- 002
		
		@Query(value = "SELECT SUM(CASE WHEN OPERATOR_STATUS != 'OPERATOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND OPERATOR_STATUS ='OPERATOR_APPROVED') \r\n"
				+ "OR (SUPERVISOR_STATUS = 'SUPERVISOR_REJECTED' AND OPERATOR_STATUS ='OPERATOR_APPROVED')THEN 1 ELSE 0 END) AS operatorCount,\r\n"
				+ "SUM(CASE WHEN SUPERVISOR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.PADPUNCHING_DAILY_ROLL_CONSUMPTION_REPORT_F002", nativeQuery = true)
		List<Object[]> getDailyRollConsumptionReportStatusCounts();
		
//		--003
		
		@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' \r\n"
				+ "OR (QA_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED') \r\n"
				+ "OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN QA_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS qaCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.PUNCHING_PROD_CHANGE_OVER_F03", nativeQuery = true)
		List<Object[]> getProductChangeOverStatusCounts();
		
//		--004
		
		@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.PADPUNCHING_DAILY_PRODUCTION_PACKING_DETAILS_F004", nativeQuery = true)
		List<Object[]> getDailyProductionPackingDetailsStatusCounts();
		
//		--005
		
		@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.PADPUNCHING_MACHINE_CLEANING_CHECK_LIST_F005", nativeQuery = true)
		List<Object[]> getMachineCleaningCheckListStatusCounts();
		
//		--006
		
		@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.PADPUNCHING_MACHINE_CLEANING_CHECK_LIST_F005", nativeQuery = true)
		List<Object[]> getHandSanitizationReportStatusCounts();
		
//		--007
		
		@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.PADPUNCHING_ARGUS_METAL_DETECTOR_CHECK_LIST_F007", nativeQuery = true)
		List<Object[]> getArgsMetalDetectorCheckListStatusCounts();
		
//		--008
		
		@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.PADPUNCHING_SANITIZATION_OF_MACHINES_AND_SURFACES_F21", nativeQuery = true)
		List<Object[]> getSanitizationOfMachineAndSurfacesStatusCounts();
		
		
//		 --009
		
		@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' \r\n"
				+ "OR (HR_STATUS = 'HR_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED') \r\n"
				+ "OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hrCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.PADPUNCHING_HOUSE_KEEP_CLEAN_CHECK_LIST_F26 ", nativeQuery = true)
		List<Object[]> getHouseKeepingCleaningCheckListPadPunchingStatusCounts();
		
		
//		--010
		
		@Query(value = "SELECT SUM(CASE WHEN OPERATOR_STATUS != 'OPERATOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND OPERATOR_STATUS ='OPERATOR_APPROVED')THEN 1 ELSE 0 END) AS opearatorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.PADPUNCHING_LOG_BOOK_BAG_MAKING_F003", nativeQuery = true)
		List<Object[]> getLogBookBagMakingStatusCounts();
		
//		--011
		
		@Query(value = "SELECT SUM(CASE WHEN OPERATOR_STATUS != 'OPERATOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND OPERATOR_STATUS ='OPERATOR_APPROVED')THEN 1 ELSE 0 END) AS opearatorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.PADPUNCHING_BAGMAKING_DAILYPRODUCTION_DETAILS_F001", nativeQuery = true)
		List<Object[]> getBagMakingDailyProdDetailsStatusCounts();
		
//		--012
		
		@Query(value = "SELECT SUM(CASE WHEN OPERATOR_STATUS != 'OPERATOR_APPROVED' OR (HOD_STATUS = 'HOD_REJECTED' AND OPERATOR_STATUS ='OPERATOR_APPROVED')THEN 1 ELSE 0 END) AS opearatorCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.PADPUNCHING_BAG_MAKING_SPECIFICATION_DETAILS_F014", nativeQuery = true)
		List<Object[]> getBagMakingSpecificationDetailsStatusCounts();
		
//		--013
		
		@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' \r\n"
				+ "OR (HR_STATUS = 'HR_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED') \r\n"
				+ "OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS ='SUPERVISOR_APPROVED')THEN 1 ELSE 0 END) AS supervisorCount,\r\n"
				+ "SUM(CASE WHEN HR_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hrCount,\r\n"
				+ "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount\r\n"
				+ "FROM precot.PADPUNCHING_HOUSE_KEEP_CLEAN_CHECK_LIST_F010", nativeQuery = true)
		List<Object[]> getHouseKeepingCleaningCheckListBagMakingStatusCounts();
	
}
