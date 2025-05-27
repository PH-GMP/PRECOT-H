package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Qc.DistilledWaterAnalysisReportARF012;
import com.focusr.Precot.mssql.database.model.Qc.SampleInwardBookF001_F002_F003;
import com.focusr.Precot.mssql.database.model.Qc.SwabMicrobiologicalAnalysisARF008_009_010;

public interface SwabMicrobiologicalAnalysisF008F009F010Repo extends JpaRepository<SwabMicrobiologicalAnalysisARF008_009_010, Long> {

	@Query(value = "SELECT * FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010 WHERE ID = :id ", nativeQuery = true)
	SwabMicrobiologicalAnalysisARF008_009_010 findFormById(@Param("id") long id);
	
//	@Query(value = "SELECT * FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010 WHERE FORMAT_NO = :formatNo",nativeQuery = true)
//	List<SwabMicrobiologicalAnalysisARF008_009_010> getDetailsByFormatNo(@Param("formatNo") String formatNo);
	
//	@Query(value = "SELECT * FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010 WHERE FORMAT_NO = :formatNo AND QC_STATUS NOT IN ('QA_APPROVED', 'QC_APPROVED') OR QC_STATUS IS NULL ORDER BY ID DESC",nativeQuery = true)
//	List<SwabMicrobiologicalAnalysisARF008_009_010> getDetailsByFormatNo(@Param("formatNo") String formatNo);
	
	@Query(
		    value = "SELECT * FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010 " +
		            "WHERE FORMAT_NO = :formatNo AND (QC_STATUS NOT IN ('QA_APPROVED', 'QC_APPROVED') OR QC_STATUS IS NULL) " +
		            "ORDER BY ID DESC",
		    nativeQuery = true
		)
		List<SwabMicrobiologicalAnalysisARF008_009_010> getDetailsByFormatNo(@Param("formatNo") String formatNo);

	
	@Query(value = "SELECT * FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010 WHERE " +
	        "(:sampleDateF008 IS NULL OR SAMPLED_DATE_F008 = :sampleDateF008) AND " +
	        "(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year) ORDER BY ID DESC", nativeQuery = true)
	List<SwabMicrobiologicalAnalysisARF008_009_010> findByDateF008MonthYear(
	    @Param("sampleDateF008") String sampleDateF008,
	    @Param("month") String month,
	    @Param("year") String year);
	
	@Query(value = "SELECT * FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010 WHERE " +
	        "(:sampleDateF009 IS NULL OR SAMPLED_DATE_F009 = :sampleDateF009) AND " +
	        "(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year) ORDER BY ID DESC", nativeQuery = true)
	List<SwabMicrobiologicalAnalysisARF008_009_010> findByDateF009MonthYear(
	    @Param("sampleDateF009") String sampleDateF009,
	    @Param("month") String month,
	    @Param("year") String year);
	
	@Query(value = "SELECT * FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010 WHERE " +
	        "(:sampleDateF010 IS NULL OR SAMPLED_DATE_F010 = :sampleDateF010) AND " +
	        "(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year) ORDER BY ID DESC", nativeQuery = true)
	List<SwabMicrobiologicalAnalysisARF008_009_010> findByDateF010MonthYear(
	    @Param("sampleDateF010") String sampleDateF010,
	    @Param("month") String month,
	    @Param("year") String year);
	
	
	@Query(value = "SELECT * FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010 WHERE MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_SAVED' AND (QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<SwabMicrobiologicalAnalysisARF008_009_010> findByMicroStatusSavedAndNotApproved();
	
	@Query(value = "SELECT * FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010 WHERE MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_APPROVED' AND (QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<SwabMicrobiologicalAnalysisARF008_009_010> findByChemistOrMicroStatusSubmittedAndHodStatusNotApproved();
	
	@Query(value = "SELECT * FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010 WHERE ((QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY ID DESC", nativeQuery = true)
	List<SwabMicrobiologicalAnalysisARF008_009_010> findAll();

	
//	@Query(value = "SELECT * FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010 WHERE " +
//	        "(:date IS NULL OR SAMPLED_DATE_F008 = :date) AND " +
//	        "(:month IS NULL OR MONTH = :month) AND " +
//	        "(:year IS NULL OR YEAR = :year) AND" + 
//	        " FORMAT_NO =:formatNo AND"+// Added a space here
//	        " (MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_APPROVED') AND (QC_STATUS = 'QC_APPROVED')", nativeQuery = true)
//	List<SwabMicrobiologicalAnalysisARF008_009_010> findByDateF008MonthYearForPrint(
//	    @Param("date") String date,
//	    @Param("month") String month,
//	    @Param("year") String year,
//	    @Param("formatNo") String formatNo);
	
	@Query(value = "SELECT * FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010 WHERE " +
	        "(:date IS NULL OR SAMPLED_DATE_F008 = :date) AND " +
	        "(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year) AND " +
	        "FORMAT_NO = :formatNo AND " +  // Fixed the missing space before "FORMAT_NO"
	        "(MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_APPROVED') AND " +
	        "(QC_STATUS = 'QC_APPROVED' OR QC_STATUS = 'QA_APPROVED')", nativeQuery = true)
	List<SwabMicrobiologicalAnalysisARF008_009_010> findByDateF008MonthYearForPrint(
	    @Param("date") String date,
	    @Param("month") String month,
	    @Param("year") String year,
	    @Param("formatNo") String formatNo);


	
//	
//	@Query(value = "SELECT * FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010 WHERE " +
//	        "(:date IS NULL OR SAMPLED_DATE_F009 = :date) AND " +
//	        "(:month IS NULL OR MONTH = :month) AND " +
//	        "(:year IS NULL OR YEAR = :year) AND" +
//	        " FORMAT_NO =:formatNo AND"+// Added a space here
//	        " (MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_APPROVED') AND (QC_STATUS = 'QC_APPROVED') ORDER BY ID DESC", nativeQuery = true)
//	List<SwabMicrobiologicalAnalysisARF008_009_010> findByDateF009MonthYearForPrint(
//	    @Param("date") String date,
//	    @Param("month") String month,
//	    @Param("year") String year,
//	    @Param("formatNo") String formatNo);
	
	@Query(value = "SELECT * FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010 WHERE " +
	        "(:date IS NULL OR SAMPLED_DATE_F009 = :date) AND " +
	        "(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year) AND " +
	        "FORMAT_NO = :formatNo AND " +  // Fixed the missing space before "FORMAT_NO"
	        "(MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_APPROVED') AND " +
	        "(QC_STATUS = 'QC_APPROVED' OR QC_STATUS = 'QA_APPROVED')", nativeQuery = true)
	List<SwabMicrobiologicalAnalysisARF008_009_010> findByDateF009MonthYearForPrint(
	    @Param("date") String date,
	    @Param("month") String month,
	    @Param("year") String year,
	    @Param("formatNo") String formatNo);

	
//	@Query(value = "SELECT * FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010 WHERE " +
//	        "(:date IS NULL OR SAMPLED_DATE_F010 = :date) AND " +
//	        "(:month IS NULL OR MONTH = :month) AND " +
//	        "(:year IS NULL OR YEAR = :year) AND" +
//	        " FORMAT_NO =:formatNo AND"+// Added a space here
//	        " (MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_APPROVED') AND (QC_STATUS = 'QC_APPROVED') ORDER BY ID DESC", nativeQuery = true)
//	List<SwabMicrobiologicalAnalysisARF008_009_010> findByDateF010MonthYearForPrint(
//	    @Param("date") String date,
//	    @Param("month") String month,
//	    @Param("year") String year,
//	    @Param("formatNo") String formatNo);
	
	@Query(value = "SELECT * FROM precot.SWAB_MICROBIOLOGICAL_ANALYSIS_ARF008_F009_F010 WHERE " +
	        "(:date IS NULL OR SAMPLED_DATE_F010 = :date) AND " +
	        "(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year) AND " +
	        "FORMAT_NO = :formatNo AND " +  // Fixed the missing space before "FORMAT_NO"
	        "(MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_APPROVED') AND " +
	        "(QC_STATUS = 'QC_APPROVED' OR QC_STATUS = 'QA_APPROVED')", nativeQuery = true)
	List<SwabMicrobiologicalAnalysisARF008_009_010> findByDateF010MonthYearForPrint(
	    @Param("date") String date,
	    @Param("month") String month,
	    @Param("year") String year,
	    @Param("formatNo") String formatNo);
	
}
