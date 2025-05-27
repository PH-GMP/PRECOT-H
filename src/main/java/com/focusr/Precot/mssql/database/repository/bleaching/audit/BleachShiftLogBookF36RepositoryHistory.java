package com.focusr.Precot.mssql.database.repository.bleaching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachEquipmentUsageLogBookHistoryF33;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachShiftLogBookHistoryF36;

@Repository
public interface BleachShiftLogBookF36RepositoryHistory extends JpaRepository<BleachShiftLogBookHistoryF36, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.BLEACH_SHIFT_LOGBOOK_HISTORY_F36 WHERE DATE=:date AND SHIFT=:shift", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date, @Param("shift") String shift);

	
	@Query(value = "SELECT * FROM precot.BLEACH_SHIFT_LOGBOOK_HISTORY_F36 WHERE DATE=:date AND SHIFT=:shift AND VERSION IN (SELECT MAX(VERSION) FROM precot.BLEACH_SHIFT_LOGBOOK_HISTORY_F36 WHERE DATE=:date AND SHIFT=:shift)", nativeQuery = true)
	BleachShiftLogBookHistoryF36 fetchLastSubmittedRecords(@Param("date") String date, @Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.BLEACH_SHIFT_LOGBOOK_HISTORY_F36 WHERE DATE=:date AND SHIFT=:shift", nativeQuery = true)
	List<BleachShiftLogBookHistoryF36> fetchHistroy(@Param("date") String date, @Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.BLEACH_SHIFT_LOGBOOK_HISTORY_F36 WHERE SHIFT LIKE :shift AND DATE BETWEEN :start AND :end ORDER BY DATE ASC", nativeQuery = true)
	List<BleachShiftLogBookHistoryF36> fetchShiftLogHistories(@Param("shift") String shift, @Param("start") String startDate,
			@Param("end") String endDate);
	
	@Query(value = "SELECT MIN(DATE) FROM precot.BLEACH_SHIFT_LOGBOOK_HISTORY_F36", nativeQuery = true)
	String findMinimumCreationDate();

	@Query(value = "SELECT MAX(DATE) FROM precot.BLEACH_SHIFT_LOGBOOK_HISTORY_F36", nativeQuery = true)
	String findMaximumCreationDate();
	
}
