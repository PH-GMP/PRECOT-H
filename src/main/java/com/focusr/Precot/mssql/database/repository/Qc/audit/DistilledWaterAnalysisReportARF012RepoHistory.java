package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.QcAudit.DistilledWaterAnalysisReportARF012History;
import com.focusr.Precot.mssql.database.model.QcAudit.SampleInwardBookF001_F002_F003History;
import com.focusr.Precot.mssql.database.model.QcAudit.SwabMicrobiologicalAnalysisARF008_009_010History;

public interface DistilledWaterAnalysisReportARF012RepoHistory extends JpaRepository<DistilledWaterAnalysisReportARF012History, Long> {

	@Query(value = "SELECT * FROM precot.DISTILLED_WATER_ANALYSIS_REPORT_ARF012_HISTORY WHERE DATE=:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.DISTILLED_WATER_ANALYSIS_REPORT_ARF012_HISTORY WHERE DATE=:date)", nativeQuery = true)
	DistilledWaterAnalysisReportARF012History fetchLastSubmittedRecordDate(@Param("date") String date);
		
	@Query(value = "SELECT MAX(VERSION) FROM precot.DISTILLED_WATER_ANALYSIS_REPORT_ARF012_HISTORY WHERE DATE=:date", nativeQuery = true)
	Optional<Integer> getMaximumVersionOfDate(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.DISTILLED_WATER_ANALYSIS_REPORT_ARF012_HISTORY WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) ", nativeQuery = true)
	List<DistilledWaterAnalysisReportARF012History> findByParamsARF012(@Param("from_date") String from_date,
			@Param("to_date") String to_date);
	
	@Query(value = "SELECT * FROM precot.DISTILLED_WATER_ANALYSIS_REPORT_ARF012_HISTORY WHERE DATE = :date ", nativeQuery = true)
	List<DistilledWaterAnalysisReportARF012History> findFormByDate(@Param("date") String date);

}
