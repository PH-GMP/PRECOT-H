package com.focusr.Precot.mssql.database.repository.splunance.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceHandSanitizationReportHistoryF025;

public interface SpunlaceHandSanitizationReportHistoryF025Repo extends JpaRepository<SpunlaceHandSanitizationReportHistoryF025,Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.SPUNLACE_HAND_SANITIZATION_REPORT_HISTORY_F025 WHERE DATE =:date AND SHIFT=:shift", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_HAND_SANITIZATION_REPORT_HISTORY_F025 WHERE DATE =:date AND SHIFT=:shift AND VERSION IN (SELECT MAX(VERSION) FROM precot.SPUNLACE_HAND_SANITIZATION_REPORT_HISTORY_F025 WHERE DATE =:date AND SHIFT=:shift)", nativeQuery = true)
	SpunlaceHandSanitizationReportHistoryF025 fetchLastSubmittedRecord(@Param("date") String date,@Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_HAND_SANITIZATION_REPORT_HISTORY_F025 WHERE DATE =:date AND SHIFT=:shift ", nativeQuery = true)
	List<SpunlaceHandSanitizationReportHistoryF025> fetchHistory(@Param("date") String date,@Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_HAND_SANITIZATION_REPORT_HISTORY_F025 WHERE "
	        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
	        + "AND (:f025_shift IS NULL OR SHIFT = :f025_shift)", nativeQuery = true)
	List<SpunlaceHandSanitizationReportHistoryF025> findByParams025(@Param("from_date") String from_date,
	        @Param("to_date") String to_date,  @Param("f025_shift") String f025_shift);

	
	

	
}
