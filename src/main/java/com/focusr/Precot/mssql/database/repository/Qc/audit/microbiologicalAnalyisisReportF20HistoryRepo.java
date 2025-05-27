package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.QcAudit.microbiologicalAnalyisisReportHistoryF20;

public interface microbiologicalAnalyisisReportF20HistoryRepo extends JpaRepository<microbiologicalAnalyisisReportHistoryF20, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.MICROBIOLOGICAL_ANALYSIS_REPORT_F20_HISTORY WHERE tested_incubation_start_on = :date ", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.MICROBIOLOGICAL_ANALYSIS_REPORT_F20_HISTORY WHERE tested_incubation_start_on = :date AND  VERSION IN (SELECT MAX(VERSION) FROM precot.MICROBIOLOGICAL_ANALYSIS_REPORT_F20_HISTORY WHERE tested_incubation_start_on = :date)", nativeQuery = true)
	microbiologicalAnalyisisReportHistoryF20 fetchLastSubmittedRecordPhNumber(@Param("date") String date );

	
	@Query(value = "SELECT * FROM precot.[MICROBIOLOGICAL_ANALYSIS_REPORT_F20_HISTORY] WHERE ("
			+ 
		    
		    "    (CAST(createdAt AS DATE) BETWEEN CAST(:startDate AS DATE) AND CAST(:endDate AS DATE) " +
		    "    AND :startDate IS NOT NULL AND :endDate IS NOT NULL) " +
		    "    OR (CAST(createdAt AS DATE) >= CAST(:startDate AS DATE) AND :startDate IS NOT NULL AND :endDate IS NULL) " +
		    "    OR (CAST(createdAt AS DATE) <= CAST(:endDate AS DATE) AND :endDate IS NOT NULL AND :startDate IS NULL) " +
		    "    OR (:startDate IS NULL AND :endDate IS NULL)" 
			+ ")", nativeQuery = true)
	List<microbiologicalAnalyisisReportHistoryF20> audit( @Param("startDate") String startDate, @Param("endDate") String endDate);

	
	@Query(value = "SELECT * FROM precot.[MICROBIOLOGICAL_ANALYSIS_REPORT_F20_HISTORY] order by TEST_ID desc", nativeQuery = true)
	List<microbiologicalAnalyisisReportHistoryF20> audit();
}
