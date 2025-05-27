package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.finishedproductanalysisreportF006;
import com.focusr.Precot.mssql.database.model.Qc.finishedproductanalysisreportF006;


@Repository
public interface finishedproductanalysisreportF006Repo extends JpaRepository<finishedproductanalysisreportF006, Long>{

//	@Query(value = "SELECT * FROM precot.FINISHED_PRODUCT_ANALYSIS_REPORT_F006 WHERE BMR_NO=:bmr_no", nativeQuery = true)
//	List<finishedproductanalysisreportF006> findbyBMR(@Param("bmr_no") String bmr_no);
	
	@Query(value = "SELECT * FROM precot.FINISHED_PRODUCT_ANALYSIS_REPORT_F006 WHERE BMR_NO=:bmr_no AND SAMPLE_DATE=:date", nativeQuery = true)
	List<finishedproductanalysisreportF006> findbyBMRandDate(@Param("bmr_no") String bmr_no,@Param("date") String date);

		@Query(value="SELECT * FROM precot.FINISHED_PRODUCT_ANALYSIS_REPORT_F006 where CHEMIST_STATUS = 'CHEMIST_APPROVED'",nativeQuery = true)
	List<finishedproductanalysisreportF006> chemistSubmitted();
	
	@Query(value="SELECT * FROM precot.FINISHED_PRODUCT_ANALYSIS_REPORT_F006 where (chemist_STATUS = 'CHEMIST_APPROVED' or chemist_STATUS = 'CHEMIST_SAVED') AND (QC_STATUS IN ('QC_REJECTED', 'WAITING_FOR_APPROVAL' , 'QA_REJECTED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC",nativeQuery = true)
	List<finishedproductanalysisreportF006> chemistSaved();
	
	@Query(value="SELECT * FROM precot.FINISHED_PRODUCT_ANALYSIS_REPORT_F006 where MICRO_STATUS = 'MICROBIOLOGIST_SAVED'",nativeQuery = true)
	List<finishedproductanalysisreportF006> microSaved();
	
	@Query(value="SELECT * FROM precot.FINISHED_PRODUCT_ANALYSIS_REPORT_F006 where MICRO_STATUS = 'MICROBIOLOGIST_APPROVED'",nativeQuery = true)
	List<finishedproductanalysisreportF006> microSubmitted();

	@Query(value="SELECT * FROM precot.FINISHED_PRODUCT_ANALYSIS_REPORT_F006 "
			+ "WHERE  (chemist_STATUS = 'CHEMIST_APPROVED' or chemist_STATUS = 'CHEMIST_SAVED') AND (QC_STATUS IN ('QC_REJECTED', 'WAITING_FOR_APPROVAL' , 'QA_REJECTED') OR QC_STATUS IS NULL)\r\n"
			+ "",nativeQuery = true)
	List<finishedproductanalysisreportF006> approveList();
	
	@Query(value="SELECT * FROM precot.FINISHED_PRODUCT_ANALYSIS_REPORT_F006  WHERE QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED' AND CHEMIST_STATUS = 'CHEMIST_APPROVED'",nativeQuery = true)
	List<finishedproductanalysisreportF006> getAll();

	@Query(value = "SELECT * FROM precot.FINISHED_PRODUCT_ANALYSIS_REPORT_F006 WHERE QC_STATUS IN ('QC_APPROVED', 'QA_APPROVED') AND BMR_NO=:bmr_no AND SAMPLE_DATE=:date ORDER BY TEST_ID DESC", nativeQuery = true)
	List<finishedproductanalysisreportF006> print(@Param("bmr_no")String bmr, @Param("date") String date);

	@Query(value = "SELECT MCN , NOC , KGS, POrder FROM TBLFPPACK where batchNo = :bmr_no AND PackDt = :date", nativeQuery = true)
	List<Object[]> pde(@Param("bmr_no") String bmr_no, @Param("date") String date);

//	@Query(value = "SELECT * FROM precot.FINISHED_PRODUCT_ANALYSIS_REPORT_F006 WHERE (chemist_STATUS IN ('CHEMIST_SAVED', 'CHEMIST_APPROVED') OR micro_STATUS IN ('MICROBIOLOGIST_APPROVED', 'MICROBIOLOGIST_SAVED')) AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
//	List<finishedproductanalysisreportF006> chemistSummary();
//
//	// MANAGER SUMMARY
//	@Query(value = "SELECT * FROM precot.FINISHED_PRODUCT_ANALYSIS_REPORT_F006 WHERE CHEMIST_STATUS = 'CHEMIST_APPROVED' AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
//	List<finishedproductanalysisreportF006> exeManagerSummary();
//	
//	@Query(value = "SELECT * FROM precot.FINISHED_PRODUCT_ANALYSIS_REPORT_F006 WHERE  (micro_STATUS IN ('MICROBIOLOGIST_SAVED', 'MICROBIOLOGIST_APPROVED') OR micro_STATUS IS NULL) AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
//	List<finishedproductanalysisreportF006> microSummary();
	
	@Query(value = "SELECT * FROM precot.FINISHED_PRODUCT_ANALYSIS_REPORT_F006 WHERE (chemist_STATUS IN ('CHEMIST_SAVED', 'CHEMIST_APPROVED') OR micro_STATUS IN ('MICROBIOLOGIST_APPROVED', 'MICROBIOLOGIST_SAVED'))  AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
	List<finishedproductanalysisreportF006> chemistSummary();

	// MANAGER SUMMARY
	@Query(value = "SELECT * FROM precot.FINISHED_PRODUCT_ANALYSIS_REPORT_F006 WHERE chemist_STATUS = 'CHEMIST_APPROVED' AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
	List<finishedproductanalysisreportF006> exeManagerSummary();
	
	@Query(value = "SELECT * FROM precot.FINISHED_PRODUCT_ANALYSIS_REPORT_F006 WHERE (micro_STATUS IN ('MICROBIOLOGIST_SAVED', 'MICROBIOLOGIST_APPROVED') or chemist_STATUS IN ('CHEMIST_SAVED', 'CHEMIST_APPROVED')) AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
	List<finishedproductanalysisreportF006> microSummary();
	

}
