package com.focusr.Precot.mssql.database.repository.bleaching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachEquipmentUsageLogbookBlowroomAndCardingHistoryF34;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachLayDownCheckListF42History;

@Repository
public interface BleachEquipmentUsageLogbookBlowroomAndCardingF34RepositoryHistory extends JpaRepository<BleachEquipmentUsageLogbookBlowroomAndCardingHistoryF34, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_BLOWROOM_AND_CARDING_HISTORY_F34 WHERE BMR_NUMBER=:laydown", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("laydown") String laydown);

	
	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_BLOWROOM_AND_CARDING_HISTORY_F34 WHERE BMR_NUMBER=:laydown AND VERSION IN (SELECT MAX(VERSION) FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_BLOWROOM_AND_CARDING_HISTORY_F34 WHERE BMR_NUMBER=:laydown)", nativeQuery = true)
	BleachEquipmentUsageLogbookBlowroomAndCardingHistoryF34 fetchLastSubmittedRecordLaydown(@Param("laydown") String laydown);
	
	@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_BLOWROOM_AND_CARDING_HISTORY_F34 WHERE BMR_NUMBER=:laydown", nativeQuery = true)
	List<BleachEquipmentUsageLogbookBlowroomAndCardingHistoryF34> fetchLaydownHistories(@Param("laydown") String laydown);
	
	
	// EXCEL

//		@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_BLOWROOM_AND_CARDING_HISTORY_F34 where BMR_NUMBER LIKE :bmr AND  \r\n"
//				+ "START_DATE between :start AND :end ORDER BY START_DATE asc;", nativeQuery = true)
//		List<BleachEquipmentUsageLogbookBlowroomAndCardingHistoryF34> fetchBlowroomAndCardingHistories(@Param("bmr") String bmr,
//				@Param("start") String start, @Param("end") String end);
		
		@Query(value = "SELECT * FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_BLOWROOM_AND_CARDING_HISTORY_F34 where BMR_NUMBER LIKE :bmr AND  \r\n"
				+ "START_DATE between :start AND :end ORDER BY START_DATE asc;", nativeQuery = true)
		List<BleachEquipmentUsageLogbookBlowroomAndCardingHistoryF34> fetchBlowroomAndCardingHistories(@Param("bmr") String bmr,
				@Param("start") String start, @Param("end") String end);

		@Query(value = "SELECT MIN(START_DATE) FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_BLOWROOM_AND_CARDING_HISTORY_F34", nativeQuery = true)
		String findMinimumCreationDate();

		@Query(value = "SELECT MAX(START_DATE) FROM precot.BLEACH_EQUIPMENT_USAGE_LOGBOOK_BLOWROOM_AND_CARDING_HISTORY_F34", nativeQuery = true)
		String findMaximumCreationDate();
		
	
	
}
