package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.briquettesanalysisreportARF014;
import com.focusr.Precot.mssql.database.model.Qc.potableWaterARF013Report;

@Repository
public interface potableWaterARF013ReportRepo extends JpaRepository<potableWaterARF013Report, Long> {

	@Query(value="SELECT * FROM precot.POTABLE_WATER_ANALYSIS_REPORT_ARF013  WHERE QC_STATUS != 'QC_APPROVED' AND chemist_STATUS = 'CHEMIST_APPROVED'",nativeQuery = true)
	List<potableWaterARF013Report> getAll();
	
	@Query(value="SELECT * FROM precot.POTABLE_WATER_ANALYSIS_REPORT_ARF013 where chemist_STATUS = 'CHEMIST_APPROVED'",nativeQuery = true)
	List<potableWaterARF013Report> chemistSubmitted();
	
	@Query(value="SELECT * FROM precot.POTABLE_WATER_ANALYSIS_REPORT_ARF013 where (chemist_STATUS = 'CHEMIST_APPROVED' or chemist_STATUS = 'CHEMIST_SAVED') AND (QC_STATUS IN ('QC_APPROVED', 'WAITING_FOR_APPROVAL') OR QC_STATUS IS NULL)",nativeQuery = true)
	List<potableWaterARF013Report> chemistSaved();
	
	@Query(value="SELECT * FROM precot.POTABLE_WATER_ANALYSIS_REPORT_ARF013 where micro_STATUS = 'MICROBIOLOGIST_SAVED'",nativeQuery = true)
	List<potableWaterARF013Report> microSaved();
	
	@Query(value="SELECT * FROM precot.POTABLE_WATER_ANALYSIS_REPORT_ARF013 where micro_STATUS = 'MICROBIOLOGIST_APPROVED'",nativeQuery = true)
	List<potableWaterARF013Report> microSubmitted();

	@Query(value="SELECT * FROM precot.POTABLE_WATER_ANALYSIS_REPORT_ARF013 w  WHERE  (:year IS NULL OR w.YEAR = :year) AND (:month IS NULL OR w.MONTH = :month) AND (:sampled_on IS NULL OR w.SAMPLED_ON = :sampled_on) ",nativeQuery = true)
	List<potableWaterARF013Report> findbySampledDate(@Param("year") String year,@Param("month") String month,String sampled_on);
	
	@Query(value="SELECT * FROM precot.POTABLE_WATER_ANALYSIS_REPORT_ARF013 where YEAR = :year AND MONTH=:month",nativeQuery = true)
	List<potableWaterARF013Report> findbySampledMonth(@Param("year") String year,@Param("month") String month);

	@Query(value="SELECT * FROM precot.POTABLE_WATER_ANALYSIS_REPORT_ARF013 where (chemist_STATUS = 'CHEMIST_APPROVED' or chemist_STATUS = 'CHEMIST_SAVED') AND (QC_STATUS IN ('QC_APPROVED', 'WAITING_FOR_APPROVAL') OR QC_STATUS IS NULL)",nativeQuery = true)
	List<potableWaterARF013Report> approveList();

	@Query(value="SELECT * FROM precot.POTABLE_WATER_ANALYSIS_REPORT_ARF013  w  WHERE  (:year IS NULL OR w.YEAR = :year) AND (:month IS NULL OR w.MONTH = :month) AND (:sampled_on IS NULL OR w.SAMPLED_ON = :sampled_on) AND (QC_STATUS = 'QA_APPROVED' OR QC_STATUS = 'QC_APPROVED')",nativeQuery = true)
	List<potableWaterARF013Report> print(@Param("year") String year,@Param("month") String month, @Param("sampled_on") String sampled_on);
	
	@Query(value="SELECT * FROM precot.POTABLE_WATER_ANALYSIS_REPORT_ARF013 WHERE QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') AND  YEAR = :year AND MONTH=:month ",nativeQuery = true)
	List<potableWaterARF013Report> findbyMonth(@Param("year") String year,@Param("month") String month);
	
	@Query(value = "SELECT * FROM precot.POTABLE_WATER_ANALYSIS_REPORT_ARF013 WHERE (chemist_STATUS IN ('CHEMIST_SAVED', 'CHEMIST_APPROVED') OR micro_STATUS IN ('MICROBIOLOGIST_APPROVED', 'MICROBIOLOGIST_SAVED')) AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
	List<potableWaterARF013Report> chemistSummary();

	// MANAGER SUMMARY
	@Query(value = "SELECT * FROM precot.POTABLE_WATER_ANALYSIS_REPORT_ARF013 WHERE chemist_STATUS = 'CHEMIST_APPROVED' AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
	List<potableWaterARF013Report> exeManagerSummary();
	
	@Query(value = "SELECT * FROM precot.POTABLE_WATER_ANALYSIS_REPORT_ARF013 WHERE  (micro_STATUS IN ('MICROBIOLOGIST_SAVED', 'MICROBIOLOGIST_APPROVED','WAITING_FOR_APPROVAL') OR micro_STATUS IS NULL) AND  (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
	List<potableWaterARF013Report> microSummary();
	

}
