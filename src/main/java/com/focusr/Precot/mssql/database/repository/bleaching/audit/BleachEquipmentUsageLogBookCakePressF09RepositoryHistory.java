package com.focusr.Precot.mssql.database.repository.bleaching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachEquipmentUsageLogBookCakePressHistoryF09;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachLayDownCheckListF42History;

@Repository
public interface BleachEquipmentUsageLogBookCakePressF09RepositoryHistory extends JpaRepository<BleachEquipmentUsageLogBookCakePressHistoryF09, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_CAKE_PRESS_HISTORY_F09 WHERE BMR_NUMBER=:laydown AND SUBBATCH_NO=:batch", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("laydown") String laydown, @Param("batch") String batch);

	
	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_CAKE_PRESS_HISTORY_F09 WHERE BMR_NUMBER=:laydown AND SUBBATCH_NO=:batch AND VERSION IN (SELECT MAX(VERSION) FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_CAKE_PRESS_HISTORY_F09 WHERE BMR_NUMBER=:laydown AND SUBBATCH_NO=:batch)", nativeQuery = true)
	BleachEquipmentUsageLogBookCakePressHistoryF09 fetchLastSubmittedRecordLaydown(@Param("laydown") String laydown, @Param("batch") String batch);
	
	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_CAKE_PRESS_HISTORY_F09 WHERE BMR_NUMBER=:laydown AND SUBBATCH_NO=:batch", nativeQuery = true)
	List<BleachEquipmentUsageLogBookCakePressHistoryF09> fetchLaydownHistories(@Param("laydown") String laydown, @Param("batch") String batch);
	
	
	
	// EXCEL
	
		@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_CAKE_PRESS_HISTORY_F09 where BMR_NUMBER LIKE :bmr AND SUBBATCH_NO LIKE :subBatchNo AND  \r\n"
				+ "START_DATE between :start AND :end ORDER BY START_DATE asc;", nativeQuery = true)
		List<BleachEquipmentUsageLogBookCakePressHistoryF09> fetchCakePress(@Param("bmr") String bmr,@Param("subBatchNo") String subBatchNo,@Param("start") String start, @Param("end") String end);
		
		@Query(value = "SELECT MIN(START_DATE) FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_CAKE_PRESS_HISTORY_F09", nativeQuery = true)
		String findMinimumCreationDate();
		
		@Query(value = "SELECT MAX(START_DATE) FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_CAKE_PRESS_HISTORY_F09", nativeQuery = true)
		String findMaximumCreationDate();

	
}
