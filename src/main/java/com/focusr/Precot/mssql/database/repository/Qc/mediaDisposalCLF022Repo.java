package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.mediaDisposalCLF022;
import com.focusr.Precot.mssql.database.model.Qc.mediaDisposalobsF022;
import com.focusr.Precot.mssql.database.model.Qc.weighingscalecalibrationreportCLF007;

@Repository
public interface mediaDisposalCLF022Repo extends JpaRepository<mediaDisposalCLF022, Long> {

	
	@Query(value = "SELECT * FROM precot.MEDIA_DISPOSAL_RECORD WHERE (micro_STATUS IN ('CHEMIST_SAVED', 'CHEMIST_APPROVED') OR micro_STATUS IN ('MICROBIOLOGIST_APPROVED', 'MICROBIOLOGIST_SAVED')) AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
	List<mediaDisposalCLF022> chemistSummary();

	// MANAGER SUMMARY
	@Query(value = "SELECT * FROM precot.MEDIA_DISPOSAL_RECORD WHERE micro_STATUS = 'MICROBIOLOGIST_APPROVED' AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
	List<mediaDisposalCLF022> exeManagerSummary();
	
	@Query(value = "SELECT * FROM precot.MEDIA_DISPOSAL_RECORD WHERE  (micro_STATUS IN ('MICROBIOLOGIST_SAVED', 'MICROBIOLOGIST_APPROVED') OR micro_STATUS IS NULL) AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
	List<mediaDisposalCLF022> microSummary();

		@Query(value = "SELECT * FROM precot.MEDIA_DISPOSAL_RECORD w  WHERE (:test_date IS NULL OR w.TESTED_DATE = :test_date) AND (:year IS NULL OR w.YEAR = :year) AND (:month IS NULL OR w.MONTH = :month) ORDER BY TEST_ID DESC", 
    nativeQuery = true)
List<mediaDisposalCLF022> getByDate(@Param("test_date") String test_date, 
                                                  @Param("year") String year, 
                                                  @Param("month") String month
                                                  );

//@Query(value="SELECT * FROM precot.MEDIA_DISPOSAL_RECORD  w  WHERE (:test_date IS NULL OR w.TESTED_DATE = :test_date) AND (:year IS NULL OR w.YEAR = :year) AND (:month IS NULL OR w.MONTH = :month) AND  (QC_STATUS = 'QA_APPROVED' OR QC_STATUS = 'QC_APPROVED') ORDER BY TEST_ID DESC",nativeQuery = true)
//List<mediaDisposalCLF022> print( @Param("test_date") String test_date ,@Param("year") String year,@Param("month") String month);

@Query(value = "SELECT * FROM precot.MEDIA_DISPOSAL_RECORD w " +
        "WHERE (:fromDate IS NULL OR (:toDate IS NULL AND w.TESTED_DATE = :fromDate) " +
        "OR (w.TESTED_DATE BETWEEN :fromDate AND :toDate)) " +
        "AND (:date IS NULL OR w.TESTED_DATE = :date) " +
        "AND (QC_STATUS = 'QA_APPROVED' OR QC_STATUS = 'QC_APPROVED') " +
        "ORDER BY TEST_ID DESC", nativeQuery = true)
List<mediaDisposalCLF022> print(@Param("fromDate") String fromDate, 
                           @Param("toDate") String toDate, 
                           @Param("date") String date);

	
}
