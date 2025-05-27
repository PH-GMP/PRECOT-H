package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BleachEquipmentUsageLogbookBlowroomAndCardingF34;

@Repository
public interface BleachEquipmentUsageLogbookBlowroomAndCardingF34Repository
		extends JpaRepository<BleachEquipmentUsageLogbookBlowroomAndCardingF34, Long> {

	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_BLOWROOM_AND_CARDING_F34  WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' OR HOD_STATUS !='HOD_APPROVED' ORDER BY EQUIPB_ID DESC", nativeQuery = true)
	List<BleachEquipmentUsageLogbookBlowroomAndCardingF34> getsummaryForSupervisor();

	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_BLOWROOM_AND_CARDING_F34 b WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS !='HOD_APPROVED' AND MAIL_STATUS = 'WAITING_FOR_APPROVAL' ORDER BY EQUIPB_ID DESC", nativeQuery = true)
	List<BleachEquipmentUsageLogbookBlowroomAndCardingF34> getsummaryForHod();

//	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_BLOWROOM_AND_CARDING_F34 WHERE BMR_NUMBER = :bmrNumber", nativeQuery = true)
//	List<BleachEquipmentUsageLogbookBlowroomAndCardingF34> getByBmrNo(@Param("bmrNumber") String bmrNumber);
	
	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_BLOWROOM_AND_CARDING_F34 WHERE EQUIPB_ID = :id", nativeQuery = true)
	BleachEquipmentUsageLogbookBlowroomAndCardingF34 getById(@Param("id") Long id);
	
	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_BLOWROOM_AND_CARDING_F34 WHERE BMR_NUMBER = :bmrNumber", nativeQuery = true)
	BleachEquipmentUsageLogbookBlowroomAndCardingF34 getByBmrNo(@Param("bmrNumber") String bmrNumber);

//	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_BLOWROOM_AND_CARDING_F34 "
//			+ "WHERE BMR_NUMBER BETWEEN :fromBmrNumber AND :toBmrNumber AND HOD_STATUS = 'HOD_APPROVED' ORDER BY EQUIPB_ID DESC", nativeQuery = true)
//	List<BleachEquipmentUsageLogbookBlowroomAndCardingF34> findByBmrNumberRange(
//			@Param("fromBmrNumber") String fromBmrNumber, @Param("toBmrNumber") String toBmrNumber);
	
	
	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_BLOWROOM_AND_CARDING_F34 WHERE BMR_NUMBER BETWEEN :fromBmrNumber AND :toBmrNumber AND HOD_STATUS = 'HOD_APPROVED' ORDER BY CAST(SUBSTRING(BMR_NUMBER, 1, 2) AS INT) ASC, CAST(SUBSTRING(BMR_NUMBER, CHARINDEX('/', BMR_NUMBER, CHARINDEX('/', BMR_NUMBER) + 1) + 1, LEN(BMR_NUMBER)) AS INT) ASC", nativeQuery = true)
	List<BleachEquipmentUsageLogbookBlowroomAndCardingF34> findByBmrNumberRange(
			@Param("fromBmrNumber") String fromBmrNumber, @Param("toBmrNumber") String toBmrNumber);
	
	
	@Query(value ="SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_BLOWROOM_AND_CARDING_F34 WHERE BMR_NUMBER=:bmrNo", nativeQuery = true)
	List<BleachEquipmentUsageLogbookBlowroomAndCardingF34> cardingLogbookList(@Param("bmrNo") String bmrNo);
	
	@Query(value = "SELECT DISTINCT BMR_NUMBER FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_BLOWROOM_AND_CARDING_F34 WHERE HOD_STATUS IN ('HOD_APPROVED')", nativeQuery = true)
	List<String> approvedBMR();
	
	@Query(value = "SELECT TOP 1  BMR_NUMBER,START_TIME ,START_DATE FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_BLOWROOM_AND_CARDING_F34 ORDER BY EQUIPB_ID DESC;", nativeQuery = true)
	List<Map<String, Object>> getLastSubbatchNo();

@Query(value ="SELECT START_DATE FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_BLOWROOM_AND_CARDING_F34 WHERE BMR_NUMBER=:bmrNo", nativeQuery = true)
	String equipmentStartDate(@Param("bmrNo") String bmrNo);
}
