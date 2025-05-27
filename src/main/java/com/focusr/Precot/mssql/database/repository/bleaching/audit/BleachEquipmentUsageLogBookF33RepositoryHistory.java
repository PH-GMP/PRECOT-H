package com.focusr.Precot.mssql.database.repository.bleaching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachEquipmentUsageLogBookHistoryF33;

@Repository
public interface BleachEquipmentUsageLogBookF33RepositoryHistory extends JpaRepository<BleachEquipmentUsageLogBookHistoryF33, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.BLEACH_EQUIP_USAGE_LOG_BOOK_HISTORY_F33 WHERE DATE=:date", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date);

	
	@Query(value = "SELECT * FROM precot.BLEACH_EQUIP_USAGE_LOG_BOOK_HISTORY_F33 WHERE DATE=:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.BLEACH_EQUIP_USAGE_LOG_BOOK_HISTORY_F33 WHERE DATE=:date)", nativeQuery = true)
	BleachEquipmentUsageLogBookHistoryF33 fetchLastSubmittedRecords(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.BLEACH_EQUIP_USAGE_LOG_BOOK_HISTORY_F33 WHERE DATE=:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.BLEACH_EQUIP_USAGE_LOG_BOOK_HISTORY_F33 WHERE DATE=:date)", nativeQuery = true)
	List<BleachEquipmentUsageLogBookHistoryF33> fetchLastSubmittedRecordList(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.BLEACH_EQUIP_USAGE_LOG_BOOK_HISTORY_F33 WHERE DATE=:date", nativeQuery = true)
	List<BleachEquipmentUsageLogBookHistoryF33> fetchHistroy(@Param("date") String date);
	
	// EXCEL

	@Query(value = "SELECT * FROM precot.BLEACH_EQUIP_USAGE_LOG_BOOK_HISTORY_F33 WHERE DATE BETWEEN :start AND :end ORDER BY DATE ASC", nativeQuery = true)
	List<BleachEquipmentUsageLogBookHistoryF33> fetchEquipmentUsageHistories(@Param("start") String startDate,
			@Param("end") String endDate);

	@Query(value = "SELECT MIN(DATE) FROM precot.BLEACH_EQUIP_USAGE_LOG_BOOK_HISTORY_F33", nativeQuery = true)
	String findMinimumCreationDate();

	@Query(value = "SELECT MAX(DATE) FROM precot.BLEACH_EQUIP_USAGE_LOG_BOOK_HISTORY_F33", nativeQuery = true)
	String findMaximumCreationDate();
	
}
