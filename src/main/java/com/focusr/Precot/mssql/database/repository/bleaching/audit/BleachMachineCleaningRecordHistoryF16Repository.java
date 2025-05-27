package com.focusr.Precot.mssql.database.repository.bleaching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachMachineCleaningRecordHistoryF16;

public interface BleachMachineCleaningRecordHistoryF16Repository extends JpaRepository<BleachMachineCleaningRecordHistoryF16, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.BLEACH_MACHINE_CLEANING_RECORD_HISTORY_F16 WHERE DATE =:date AND MONTH=:month AND YEAR=:year", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("month") String month,@Param("year") String year);
	
	@Query(value = "SELECT * FROM precot.BLEACH_MACHINE_CLEANING_RECORD_HISTORY_F16 WHERE DATE =:date AND MONTH=:month AND YEAR=:year AND VERSION IN (SELECT MAX(VERSION) FROM precot.BLEACH_MACHINE_CLEANING_RECORD_HISTORY_F16 WHERE DATE =:date AND MONTH=:month AND YEAR=:year)", nativeQuery = true)
	BleachMachineCleaningRecordHistoryF16 fetchLastSubmittedRecord(@Param("date") String date,@Param("month") String month,@Param("year") String year);
	
	@Query(value = "SELECT * FROM precot.BLEACH_MACHINE_CLEANING_RECORD_HISTORY_F16 WHERE DATE =:date AND MONTH=:month AND YEAR=:year", nativeQuery = true)
	List<BleachMachineCleaningRecordHistoryF16> fetchHistory(@Param("date") String date,@Param("month") String month,@Param("year") String year);
	
	
	@Query(value = "SELECT * FROM precot.BLEACH_MACHINE_CLEANING_RECORD_HISTORY_F16 WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
			+ "AND (:month IS NULL OR MONTH = :month) "
			+ "AND (:year IS NULL OR YEAR = :year)", nativeQuery = true)
	List<BleachMachineCleaningRecordHistoryF16> findByParams16(@Param("from_date") String from_date,
			@Param("to_date") String to_date, @Param("month") String month,
			@Param("year") String year);
	
}
