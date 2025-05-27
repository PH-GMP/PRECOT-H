package com.focusr.Precot.mssql.database.repository.splunance.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.audit.MachineCleaningRecordHistoryF023;

public interface MachineCleaningRecordHistoryF023Repo extends JpaRepository<MachineCleaningRecordHistoryF023,Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.SPUNLACE_MACHINE_CLEANING_RECORD_HISTORY_F023 WHERE DATE =:date AND MONTH=:month AND YEAR=:year", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("month") String month,@Param("year") String year);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_MACHINE_CLEANING_RECORD_HISTORY_F023 WHERE DATE =:date AND MONTH=:month AND YEAR=:year AND VERSION IN (SELECT MAX(VERSION) FROM precot.SPUNLACE_MACHINE_CLEANING_RECORD_HISTORY_F023 WHERE DATE =:date AND MONTH=:month AND YEAR=:year)", nativeQuery = true)
	MachineCleaningRecordHistoryF023 fetchLastSubmittedRecord(@Param("date") String date,@Param("month") String month,@Param("year") String year);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_MACHINE_CLEANING_RECORD_HISTORY_F023 WHERE DATE =:date AND MONTH=:month AND YEAR=:year", nativeQuery = true)
	List<MachineCleaningRecordHistoryF023> fetchHistory(@Param("date") String date,@Param("month") String month,@Param("year") String year);
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_MACHINE_CLEANING_RECORD_HISTORY_F023 WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
			+ "AND (:f023_month IS NULL OR MONTH = :f023_month) "
			+ "AND (:f023_year IS NULL OR YEAR = :f023_year)", nativeQuery = true)
	List<MachineCleaningRecordHistoryF023> findByParams023(@Param("from_date") String from_date,
			@Param("to_date") String to_date, @Param("f023_month") String f023_month,
			@Param("f023_year") String f023_year);
	
}
