package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.WaterAnalysisReportF007;

@Repository
public interface WaterAnalysisReportF007Repo extends JpaRepository<WaterAnalysisReportF007, Long> {

	@Query(value = "SELECT * FROM precot.WATER_ANALYSIS_REPORT_F007 WHERE WATER_ID =:id ", nativeQuery = true)
	WaterAnalysisReportF007 findFormById(@Param("id") long id);

	// GET

	@Query(value = "SELECT * FROM precot.WATER_ANALYSIS_REPORT_F007 WHERE DATE=:date", nativeQuery = true)
	List<WaterAnalysisReportF007> GetAbCottonF26(@Param("date") String date);

	// PRINT

	@Query(value = "SELECT * FROM precot.WATER_ANALYSIS_REPORT_F007 WHERE DATE=:date AND MANAGER_STATUS IN ('QC_APPROVED', 'QA_APPROVED')", nativeQuery = true)
	List<WaterAnalysisReportF007> PrintApi(@Param("date") String date);

	// CHEMIST SUMMARY

	@Query(value = "SELECT * FROM precot.WATER_ANALYSIS_REPORT_F007 WHERE CHEMIST_STATUS = 'CHEMIST_SAVED' OR MANAGER_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') ORDER BY WATER_ID DESC", nativeQuery = true)
	List<WaterAnalysisReportF007> chemistSummary();

	// MICRO SUMMARY

	@Query(value = "SELECT * FROM precot.WATER_ANALYSIS_REPORT_F007 WHERE MICRO_STATUS = 'MICRO_SAVED' OR MANAGER_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') ORDER BY WATER_ID DESC", nativeQuery = true)
	List<WaterAnalysisReportF007> microSummary();

	// EXECUTIVE SUMMARY

	@Query(value = "SELECT * FROM precot.WATER_ANALYSIS_REPORT_F007 WHERE CHEMIST_STATUS = 'CHEMIST_APPROVED' AND MANAGER_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') ORDER BY WATER_ID DESC", nativeQuery = true)
	List<WaterAnalysisReportF007> executiveSummary();

	// MANAGER SUMMARY

	@Query(value = "SELECT * FROM precot.WATER_ANALYSIS_REPORT_F007 WHERE CHEMIST_STATUS = 'CHEMIST_APPROVED' AND MANAGER_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') ORDER BY WATER_ID DESC", nativeQuery = true)
	List<WaterAnalysisReportF007> exeManagerSummary();

	// MANAGER SUMMARY NEW

	@Query(value = "SELECT * FROM precot.WATER_ANALYSIS_REPORT_F007 WHERE QA_EXE_STATUS = 'QA_EXE_APPROVED' AND  MICRO_STATUS = 'MICROBIOLOGIST_APPROVED' AND MANAGER_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') ORDER BY WATER_ID DESC", nativeQuery = true)
	List<WaterAnalysisReportF007> Summary();

	// NEW

	

}
