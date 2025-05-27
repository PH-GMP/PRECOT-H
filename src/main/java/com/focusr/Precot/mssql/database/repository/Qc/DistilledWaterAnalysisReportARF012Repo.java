package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Qc.ChemicalAnalysisReportARF003;
import com.focusr.Precot.mssql.database.model.Qc.DistilledWaterAnalysisReportARF012;
import com.focusr.Precot.mssql.database.model.Qc.QcTdsMeterCalibrationReportF008;
import com.focusr.Precot.mssql.database.model.Qc.SampleInwardBookF001_F002_F003;
import com.focusr.Precot.mssql.database.model.Qc.SwabMicrobiologicalAnalysisARF008_009_010;

public interface DistilledWaterAnalysisReportARF012Repo extends JpaRepository<DistilledWaterAnalysisReportARF012, Long> {

	@Query(value = "SELECT * FROM precot.DISTILLED_WATER_ANALYSIS_REPORT_ARF012 WHERE ID = :id ", nativeQuery = true)
	DistilledWaterAnalysisReportARF012 findFormById(@Param("id") long id);
	
//	@Query(value = "SELECT * FROM precot.DISTILLED_WATER_ANALYSIS_REPORT_ARF012 WHERE FORMAT_NO = :formatNo",nativeQuery = true)
//	List<DistilledWaterAnalysisReportARF012> getDetailsByFormatNo(@Param("formatNo") String formatNo);
	
	
//	@Query(value = "SELECT * FROM precot.DISTILLED_WATER_ANALYSIS_REPORT_ARF012 WHERE FORMAT_NO = 'PH-QCL01-AR-F-012' ", nativeQuery = true)
//	List<DistilledWaterAnalysisReportARF012> findFormByFormatNo(@Param("formatNo") String formatNo);
	
	@Query(value = "SELECT * FROM precot.DISTILLED_WATER_ANALYSIS_REPORT_ARF012 WHERE " +
	        "(:date IS NULL OR DATE = :date) AND " +
	        "(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year)", nativeQuery = true)
	List<DistilledWaterAnalysisReportARF012> findByDateMonthYear(
	    @Param("date") String date,
	    @Param("month") String month,
	    @Param("year") String year);

	
	@Query(value = "SELECT * FROM precot.DISTILLED_WATER_ANALYSIS_REPORT_ARF012 WHERE CHEMIST_STATUS ='CHEMIST_SAVED' OR QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<DistilledWaterAnalysisReportARF012> findByChemistStatusSavedAndNotApproved();
	
	@Query(value = "SELECT * FROM precot.DISTILLED_WATER_ANALYSIS_REPORT_ARF012 WHERE  CHEMIST_STATUS = 'CHEMIST_APPROVED' AND QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<DistilledWaterAnalysisReportARF012> findByChemistStatusSubmittedAndHodStatusNotApproved();	
	
	@Query(value = "SELECT * FROM precot.DISTILLED_WATER_ANALYSIS_REPORT_ARF012 WHERE " +
	        "(:date IS NULL OR DATE = :date) AND " +
	        "(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year) AND " +
	        "(QC_STATUS = 'QA_APPROVED' OR QC_STATUS = 'QC_APPROVED')", nativeQuery = true)
	List<DistilledWaterAnalysisReportARF012> getForReportPrint(
	    @Param("date") String date,
	    @Param("month") String month,
	    @Param("year") String year);

	
//	@Query(value = "SELECT * FROM precot.DISTILLED_WATER_ANALYSIS_REPORT_ARF012 WHERE DATE=:date AND CHEMIST_STATUS= 'CHEMIST_APPROVED' AND QC_STATUS = 'QC_APPROVED'", nativeQuery = true)
//	List<DistilledWaterAnalysisReportARF012> getForReportPrint(@Param("date") String date);
	
//	@Query(value = "SELECT * FROM precot.DISTILLED_WATER_ANALYSIS_REPORT_ARF012 WHERE QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED' QC_STATUS IS NOT NULL ORDER BY ID DESC", nativeQuery = true)
//	List<DistilledWaterAnalysisReportARF012> findAll();
	
	@Query(value = "SELECT * FROM precot.DISTILLED_WATER_ANALYSIS_REPORT_ARF012 WHERE (QC_STATUS IS NULL OR (QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED')) ORDER BY ID DESC", nativeQuery = true)
	List<DistilledWaterAnalysisReportARF012> findAll();

}
