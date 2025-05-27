package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.spectrophotometerReportClF011;

@Repository
public interface spectrophotometerReportClF011Repo extends JpaRepository<spectrophotometerReportClF011, Long>{

	   @Query(value = "SELECT * FROM precot.SPECTROPHOTOMETR_REPORT w  WHERE (:eq_no IS NULL OR w.EQ_ID_NO = :eq_no) AND (:year IS NULL OR w.YEAR = :year) AND (:month IS NULL OR w.MONTH = :month) AND (:date IS NULL OR w.DATE = :date)",nativeQuery = true)
	   List<spectrophotometerReportClF011> findByBatch(@Param("eq_no") String eq_no , @Param("year") String year,@Param("month") String month,@Param("date") String date);
	   
	   @Query(value = "SELECT * FROM precot.SPECTROPHOTOMETR_REPORT WHERE EQ_ID_NO = :eq_no AND  YEAR = :year AND MONTH=:month ",nativeQuery = true)
	   List<spectrophotometerReportClF011> findByBatch(@Param("eq_no") String eq_no , @Param("year") String year,@Param("month") String month);
	   
	   @Query(value = "SELECT * FROM precot.SPECTROPHOTOMETR_REPORT w  WHERE (:eq_no IS NULL OR w.EQ_ID_NO = :eq_no) AND (:year IS NULL OR w.YEAR = :year) AND (:month IS NULL OR w.MONTH = :month) AND (:date IS NULL OR w.DATE = :date) AND (QC_STATUS = 'QA_APPROVED' OR QC_STATUS = 'QC_APPROVED')",nativeQuery = true)
	   List<spectrophotometerReportClF011> print(@Param("eq_no") String eq_no , @Param("year") String year,@Param("month") String month,@Param("date") String date);
	   
	   @Query(value = "SELECT * FROM precot.SPECTROPHOTOMETR_REPORT WHERE EQ_ID_NO = :eq_no AND  YEAR = :year AND MONTH=:month  AND (QC_STATUS = 'QA_APPROVED' OR QC_STATUS = 'QC_APPROVED')",nativeQuery = true)
	   List<spectrophotometerReportClF011> print(@Param("eq_no") String eq_no , @Param("year") String year,@Param("month") String month);
	   
	   @Query(value="SELECT * FROM precot.SPECTROPHOTOMETR_REPORT WHERE (QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED') OR QC_STATUS IS NULL ",nativeQuery = true)
	  List<spectrophotometerReportClF011> getAll();
	  
	  @Query(value="SELECT * FROM precot.SPECTROPHOTOMETR_REPORT where (chemist_STATUS = 'CHEMIST_APPROVED' or chemist_STATUS = 'CHEMIST_SAVED') AND (QC_STATUS IN ('QC_REJECTED', 'WAITING_FOR_APPROVAL' , 'QA_REJECTED') OR QC_STATUS IS NULL)",nativeQuery = true)
	  List<spectrophotometerReportClF011> approveList();

//		@Query(value = "SELECT * FROM precot.SPECTROPHOTOMETR_REPORT WHERE (chemist_STATUS IN ('CHEMIST_SAVED', 'CHEMIST_APPROVED') OR micro_STATUS IN ('MICROBIOLOGIST_APPROVED', 'MICROBIOLOGIST_SAVED')) AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY LAB_ID DESC", nativeQuery = true)
//		List<spectrophotometerReportClF011> chemistSummary();
	  
	  @Query(value = "SELECT * FROM precot.SPECTROPHOTOMETR_REPORT WHERE chemist_STATUS IN ('CHEMIST_SAVED', 'CHEMIST_APPROVED') AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED','CHEMIST_DESIGNEE_APPROVED') OR QC_STATUS IS NULL) ORDER BY LAB_ID DESC", nativeQuery = true)
	  List<spectrophotometerReportClF011> chemistSummary();

	  
//		@Query(value = "SELECT chemist_STATUS,QC_STATUS FROM precot.SPECTROPHOTOMETR_REPORT WHERE (chemist_STATUS IN ('CHEMIST_SAVED', 'CHEMIST_APPROVED') OR micro_STATUS IN ('MICROBIOLOGIST_APPROVED', 'MICROBIOLOGIST_SAVED')) AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY LAB_ID DESC", nativeQuery = true)
//	List<spectrophotometerReportClF011> chemistSummary();

	// MANAGER SUMMARY
	@Query(value = "SELECT * FROM precot.SPECTROPHOTOMETR_REPORT WHERE chemist_STATUS = 'CHEMIST_APPROVED' AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED','CHEMIST_DESIGNEE_APPROVED') OR QC_STATUS IS NULL) ORDER BY LAB_ID DESC", nativeQuery = true)
	List<spectrophotometerReportClF011> exeManagerSummary();
	
	@Query(value = "SELECT * FROM precot.SPECTROPHOTOMETR_REPORT WHERE  (micro_STATUS IN ('MICROBIOLOGIST_SAVED', 'MICROBIOLOGIST_APPROVED') OR micro_STATUS IS NULL) AND chemist_STATUS = 'CHEMIST_APPROVED' AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY LAB_ID DESC", nativeQuery = true)
	List<spectrophotometerReportClF011> microSummary();
}
