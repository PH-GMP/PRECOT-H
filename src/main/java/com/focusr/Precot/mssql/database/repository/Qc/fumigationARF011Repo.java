package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.fumigationARF011;

@Repository
public interface fumigationARF011Repo extends JpaRepository<fumigationARF011, Long>{

	@Query(value="SELECT * FROM precot.FUMIGATION_AND_MICROBIOLOGICAL_ANALYSIS_ARF011  WHERE QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED' AND chemist_STATUS = 'CHEMIST_APPROVED'",nativeQuery = true)
	List<fumigationARF011> getAll();
	
	@Query(value="SELECT * FROM precot.FUMIGATION_AND_MICROBIOLOGICAL_ANALYSIS_ARF011 where chemist_STATUS = 'CHEMIST_APPROVED'",nativeQuery = true)
	List<fumigationARF011> chemistSaved();
	
	@Query(value="SELECT * FROM precot.FUMIGATION_AND_MICROBIOLOGICAL_ANALYSIS_ARF011 where (chemist_STATUS = 'CHEMIST_APPROVED' or chemist_STATUS = 'CHEMIST_SAVED') AND (QC_STATUS IN ('QC_REJECTED', 'WAITING_FOR_APPROVAL' , 'QA_REJECTED') OR QC_STATUS IS NULL)",nativeQuery = true)
	List<fumigationARF011> chemistSubmitted();
	
	@Query(value="SELECT * FROM precot.FUMIGATION_AND_MICROBIOLOGICAL_ANALYSIS_ARF011 where micro_STATUS = 'MICROBIOLOGIST_SAVED'",nativeQuery = true)
	List<fumigationARF011> microSaved();
	
	@Query(value="SELECT * FROM precot.FUMIGATION_AND_MICROBIOLOGICAL_ANALYSIS_ARF011 where micro_STATUS = 'MICROBIOLOGIST_APPROVED'",nativeQuery = true)
	List<fumigationARF011> microSubmitted();

	@Query(value = "SELECT * FROM precot.FUMIGATION_AND_MICROBIOLOGICAL_ANALYSIS_ARF011 " +
            "WHERE (:year IS NULL OR YEAR = :year) " +
            "AND (:month IS NULL OR MONTH = :month) " +
            "AND (:fumigation_date IS NULL OR FUMIGATION_DATE = :fumigation_date)", nativeQuery = true)
List<fumigationARF011> findbyFumigationDate(@Param("year") String year, 
                                         @Param("month") String month, 
                                         @Param("fumigation_date") String fumigation_date);

	
	@Query(value="SELECT * FROM precot.FUMIGATION_AND_MICROBIOLOGICAL_ANALYSIS_ARF011 where YEAR = :year AND MONTH=:month ",nativeQuery = true)
	List<fumigationARF011> findbyFumigationMon(@Param("year") String year,@Param("month") String month);

	@Query(value = "SELECT * FROM precot.FUMIGATION_AND_MICROBIOLOGICAL_ANALYSIS_ARF011 " +
            "WHERE (QC_STATUS = 'QA_APPROVED' or QC_STATUS = 'QC_APPROVED' )" +
            "AND (:year IS NULL OR YEAR = :year) " +
            "AND (:month IS NULL OR MONTH = :month) " +
            "AND (:fumigation_date IS NULL OR FUMIGATION_DATE = :fumigation_date)", nativeQuery = true)
List<fumigationARF011> print(@Param("year") String year, 
                          @Param("month") String month, 
                          @Param("fumigation_date") String fumigation_date);

	
	@Query(value="SELECT * FROM precot.FUMIGATION_AND_MICROBIOLOGICAL_ANALYSIS_ARF011 WHERE QC_STATUS = 'QA_APPROVED' AND YEAR = :year AND MONTH=:month",nativeQuery = true)
	List<fumigationARF011> printbyMonth(@Param("year") String year,@Param("month") String month);

	
	@Query(value="SELECT * FROM precot.FUMIGATION_AND_MICROBIOLOGICAL_ANALYSIS_ARF011 where (chemist_STATUS = 'CHEMIST_APPROVED' or chemist_STATUS = 'CHEMIST_SAVED') AND (QC_STATUS IN ('QC_REJECTED', 'WAITING_FOR_APPROVAL' , 'QA_REJECTED') OR QC_STATUS IS NULL)",nativeQuery = true)
	List<fumigationARF011> approveList();

	@Query(value = "SELECT * FROM precot.FUMIGATION_AND_MICROBIOLOGICAL_ANALYSIS_ARF011 WHERE (chemist_STATUS IN ('CHEMIST_SAVED', 'CHEMIST_APPROVED') OR micro_STATUS IN ('MICROBIOLOGIST_APPROVED', 'MICROBIOLOGIST_SAVED')) AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
	List<fumigationARF011> chemistSummary();

	// MANAGER SUMMARY
	@Query(value = "SELECT * FROM precot.FUMIGATION_AND_MICROBIOLOGICAL_ANALYSIS_ARF011 WHERE micro_STATUS = 'CHEMIST_APPROVED' AND micro_STATUS = 'MICROBIOLOGIST_APPROVED' AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
	List<fumigationARF011> exeManagerSummary();
	
	@Query(value = "SELECT * FROM precot.FUMIGATION_AND_MICROBIOLOGICAL_ANALYSIS_ARF011 WHERE  (micro_STATUS IN ('MICROBIOLOGIST_SAVED', 'MICROBIOLOGIST_APPROVED') OR micro_STATUS IS NULL) AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
	List<fumigationARF011> microSummary();

}
