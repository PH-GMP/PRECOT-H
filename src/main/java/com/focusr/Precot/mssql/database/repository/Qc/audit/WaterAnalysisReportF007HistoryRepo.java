package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.WaterAnalysisReportF007History;

@Repository
public interface WaterAnalysisReportF007HistoryRepo extends JpaRepository<WaterAnalysisReportF007History, Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.WATER_ANALYSIS_REPORT_F007_HISTORY WHERE DATE =:date1", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date1") String date1);

	@Query(value = "SELECT * FROM precot.WATER_ANALYSIS_REPORT_F007_HISTORY WHERE DATE =:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.WATER_ANALYSIS_REPORT_F007_HISTORY WHERE DATE=:date)", nativeQuery = true)
	WaterAnalysisReportF007History fetchLastSubmittedRecord(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.WATER_ANALYSIS_REPORT_F007_HISTORY WHERE DATE =:dat", nativeQuery = true)
	WaterAnalysisReportF007History version(@Param("dat") String dat);
	
	
	// AUDIT
	
	@Query(value = "SELECT * FROM precot.WATER_ANALYSIS_REPORT_F007_HISTORY WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date)", nativeQuery = true)
	List<WaterAnalysisReportF007History> findByParamsF007(@Param("from_date") String from_date,
			@Param("to_date") String to_date);

}
