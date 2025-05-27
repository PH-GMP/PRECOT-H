package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Qc.microbiologicalAnalyisisReportF20;

public interface microbiologicalAnalyisisReportF20Repo extends JpaRepository<microbiologicalAnalyisisReportF20, Long> {
	
	@Query(value = "SELECT * FROM precot.MICROBIOLOGICAL_ANALYSIS_REPORT_F20 WHERE chemist_STATUS = 'CHEMIST_SAVED' ORDER BY TEST_ID DESC", nativeQuery = true)
List<microbiologicalAnalyisisReportF20> chemistSummary();

// MANAGER SUMMARY
@Query(value = "SELECT * FROM precot.MICROBIOLOGICAL_ANALYSIS_REPORT_F20 WHERE micro_STATUS = 'MICROBIOLOGIST_APPROVED' AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
List<microbiologicalAnalyisisReportF20> exeManagerSummary();

@Query(value = "SELECT * FROM precot.MICROBIOLOGICAL_ANALYSIS_REPORT_F20 WHERE micro_STATUS IN ('MICROBIOLOGIST_APPROVED', 'MICROBIOLOGIST_SAVED')  AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
List<microbiologicalAnalyisisReportF20> microSummary();

@Query(value = "SELECT * FROM precot.MICROBIOLOGICAL_ANALYSIS_REPORT_F20 w  WHERE  (:year IS NULL OR w.YEAR = :year) AND (:month IS NULL OR w.MONTH = :month) AND (:date IS NULL OR w.tested_incubation_start_on = :date)", nativeQuery = true)
List<microbiologicalAnalyisisReportF20> findByBatch(@Param("year") String year, @Param("month") String month, @Param("date") String date);

@Query(value="SELECT * FROM precot.MICROBIOLOGICAL_ANALYSIS_REPORT_F20 w WHERE (:year IS NULL OR w.YEAR = :year) AND (:month IS NULL OR w.MONTH = :month) AND (:date IS NULL OR w.tested_incubation_start_on = :date)  AND (QC_STATUS = 'QA_APPROVED' OR QC_STATUS = 'QC_APPROVED')", nativeQuery = true)
List<microbiologicalAnalyisisReportF20> print(@Param("year") String year, @Param("month") String month, @Param("date") String date);

}
