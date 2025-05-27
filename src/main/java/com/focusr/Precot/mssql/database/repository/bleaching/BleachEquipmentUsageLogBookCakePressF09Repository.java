package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BleachEquipmentUsageLogBookCakePressF09;
import com.focusr.Precot.payload.BmrTimeRange;

@Repository
public interface BleachEquipmentUsageLogBookCakePressF09Repository
		extends JpaRepository<BleachEquipmentUsageLogBookCakePressF09, Long> {

	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_CAKE_PRESS_F09 WHERE EQUIPC_ID = :equipc_id", nativeQuery = true)
	BleachEquipmentUsageLogBookCakePressF09 getDetailsById(@Param("equipc_id") Long equipc_id);

	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_CAKE_PRESS_F09  WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' OR HOD_STATUS !='HOD_APPROVED' ORDER BY EQUIPC_ID DESC", nativeQuery = true)
	List<BleachEquipmentUsageLogBookCakePressF09> getsummaryForSupervisor();

	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_CAKE_PRESS_F09  WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS !='HOD_APPROVED' AND MAIL_STATUS = 'WAITING_FOR_APPROVAL' ORDER BY EQUIPC_ID DESC", nativeQuery = true)
	List<BleachEquipmentUsageLogBookCakePressF09> getsummaryForHod();

	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_CAKE_PRESS_F09 WHERE BMR_NUMBER = :bmr_number", nativeQuery = true)
	List<BleachEquipmentUsageLogBookCakePressF09> getDetailsByBMR(@Param("bmr_number") String bmr_number);

	@Query(value = "SELECT SUBBATCH_NO FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_CAKE_PRESS_F09 WHERE BMR_NUMBER=:bmr_no", nativeQuery = true)
	List<String> getBatchByBMR(@Param("bmr_no") String bmr_no);

//    @Query(value = "SELECT MIN(START_DATE) AS startDate, MIN(START_TIME) AS startTime, MAX(END_DATE) AS endDate, MIN(END_TIME) AS endTime FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_CAKE_PRESS_F09 WHERE BMR_NUMBER=:bmr_number", nativeQuery = true)
//    BmrTimeRange getStartEndTime(@Param("bmr_number") String bmr_number);

	@Query(value = "SELECT MIN(START_DATE) AS startDate, MIN(START_TIME) AS startTime, MAX(END_DATE) AS endDate, MAX(END_TIME) AS endTime FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_CAKE_PRESS_F09 WHERE BMR_NUMBER = :bmr_number", nativeQuery = true)
	BmrTimeRange getStartEndTime(@Param("bmr_number") String bmrNumber);
	

	@Query(value = "SELECT MIN(CONCAT(START_DATE, ' ', START_TIME)) AS StartDateTime FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_CAKE_PRESS_F09 WHERE BMR_NUMBER=:bmr_number", nativeQuery = true)
	String startDateBMR(@Param("bmr_number") String bmr_number);

	@Query(value = "SELECT MIN(CONCAT(END_DATE, ' ', END_TIME)) AS StartDateTime FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_CAKE_PRESS_F09 WHERE BMR_NUMBER=:bmr_number", nativeQuery = true)
	String endDateBMR(@Param("bmr_number") String bmr_number);

//	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_CAKE_PRESS_F09  "
//			+ "WHERE BMR_NUMBER BETWEEN :fromBmrNumber AND :toBmrNumber AND HOD_STATUS = 'HOD_APPROVED' ORDER BY EQUIPC_ID DESC", nativeQuery = true)
//	List<BleachEquipmentUsageLogBookCakePressF09> findByBmrNumberRange(@Param("fromBmrNumber") String fromBmrNumber,
//			@Param("toBmrNumber") String toBmrNumber);
	
	
	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_CAKE_PRESS_F09 WHERE BMR_NUMBER BETWEEN :fromBmr AND :toBmr AND HOD_STATUS = 'HOD_APPROVED' ORDER BY CAST(SUBSTRING(BMR_NUMBER, 1, 2) AS INT) ASC, CAST(SUBSTRING(BMR_NUMBER, CHARINDEX('/', BMR_NUMBER, CHARINDEX('/', BMR_NUMBER) + 1) + 1, LEN(BMR_NUMBER)) AS INT) ASC, CAST(SUBSTRING(SUBBATCH_NO, 1, 2) AS INT) ASC, CAST(SUBSTRING(SUBBATCH_NO, 4, LEN(SUBBATCH_NO) - 3) AS INT) ASC", nativeQuery = true)
	List<BleachEquipmentUsageLogBookCakePressF09> findByBmrNumberRange(@Param("fromBmr") String fromBmr, @Param("toBmr") String toBmr);
	
	
//	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_CAKE_PRESS_F09 WHERE BMR_NUMBER = :bmrNumber AND SUBBATCH_NO = :subbatchNo", nativeQuery = true)
//	List<BleachEquipmentUsageLogBookCakePressF09> findByBmrNumberAndSubbatch_no(String bmrNumber, String subbatchNo);

	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_CAKE_PRESS_F09 WHERE BMR_NUMBER = :bmrNumber AND SUBBATCH_NO = :subbatchNo", nativeQuery = true)
	BleachEquipmentUsageLogBookCakePressF09 findByBmrNumberAndSubbatch_no(String bmrNumber, String subbatchNo);


	@Query(value = "SELECT TOP 1 SUBBATCH_NO, START_DATE ,START_TIME  FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_CAKE_PRESS_F09 ORDER BY EQUIPC_ID DESC", nativeQuery = true)
	List<Map<String, Object>> getLastSubbatchNo();
	
	// new cr batch no after cakeperss submit
	
	@Query(value = "SELECT SUBBATCH_NO FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_CAKE_PRESS_F09 WHERE BMR_NUMBER=:bmr_no AND SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED'", nativeQuery = true)
	List<String> getBatchByBMRForBleacingJobcard(@Param("bmr_no") String bmr_no);
	
	
	/**
	 * CR -- HOD SUBMITTED BMR
	 */
	
	@Query(value = "SELECT DISTINCT BMR_NUMBER FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_CAKE_PRESS_F09 WHERE HOD_STATUS IN ('HOD_APPROVED')", nativeQuery = true)
	List<String> getHodApproveBmr();
	
	
}
