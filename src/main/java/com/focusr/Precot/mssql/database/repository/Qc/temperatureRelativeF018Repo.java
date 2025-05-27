package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.temperatureRelativeF018;
import com.focusr.Precot.mssql.database.model.Qc.temperatureRelativeF018;

@Repository
public interface temperatureRelativeF018Repo extends JpaRepository<temperatureRelativeF018, Long>{

//	   @Query(value = "SELECT * FROM precot.TEMPERATURE_RELATIVE_HUMIDITY_RECORD_F018 WHERE EQ_NO = :eq_no AND  EQ_NO = :eq_no AND  YEAR = :year AND MONTH=:month AND DATE = :date",nativeQuery = true)
//	   List<temperatureRelativeF018> findByBatch(@Param("eq_no") String eq_no , @Param("year") String year,@Param("month") String month,@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.TEMPERATURE_RELATIVE_HUMIDITY_RECORD_F018 WHERE "
		    + "(:eq_no IS NULL OR EQ_NO = :eq_no) "
		    + "AND (:year IS NULL OR YEAR = :year) "
		    + "AND (:month IS NULL OR MONTH = :month) "
		    + "AND (:date IS NULL OR DATE = :date)",
		    nativeQuery = true)
		List<temperatureRelativeF018> findByBatch(
		    @Param("eq_no") String eq_no, 
		    @Param("year") String year, 
		    @Param("month") String month, 
		    @Param("date") String date);

	   
	   @Query(value = "SELECT * FROM precot.TEMPERATURE_RELATIVE_HUMIDITY_RECORD_F018 WHERE EQ_NO = :eq_no AND  YEAR = :year AND MONTH=:month ",nativeQuery = true)
	   List<temperatureRelativeF018> findByBatch(@Param("eq_no") String eq_no , @Param("year") String year,@Param("month") String month);
	   
//	   @Query(value = "SELECT * FROM precot.TEMPERATURE_RELATIVE_HUMIDITY_RECORD_F018 WHERE EQ_NO = :eq_no AND  EQ_NO = :eq_no AND  YEAR = :year AND MONTH=:month AND DATE = :date AND (QC_STATUS = 'QA_APPROVED' OR QC_STATUS = 'QC_APPROVED')",nativeQuery = true)
//	   List<temperatureRelativeF018> print(@Param("eq_no") String eq_no , @Param("year") String year,@Param("month") String month,@Param("date") String date);
	   
	   @Query(value = "SELECT * FROM precot.TEMPERATURE_RELATIVE_HUMIDITY_RECORD_F018 WHERE "
			    + "(:eq_no IS NULL OR EQ_NO = :eq_no) "
			    + "AND (:year IS NULL OR YEAR = :year) "
			    + "AND (:month IS NULL OR MONTH = :month) "
			    + "AND (:date IS NULL OR DATE = :date) "
			    + "AND (QC_STATUS = 'QA_APPROVED' OR QC_STATUS = 'QC_APPROVED' or QC_STATUS = 'MICRO_DESIGNEE_APPROVED')",
			    nativeQuery = true)
			List<temperatureRelativeF018> print(
			    @Param("eq_no") String eq_no, 
			    @Param("year") String year, 
			    @Param("month") String month, 
			    @Param("date") String date);
	   
	   @Query(value = "SELECT * FROM precot.TEMPERATURE_RELATIVE_HUMIDITY_RECORD_F018 WHERE EQ_NO = :eq_no AND  YEAR = :year AND MONTH=:month AND (QC_STATUS = 'QA_APPROVED' OR QC_STATUS = 'QC_APPROVED')",nativeQuery = true)
	   List<temperatureRelativeF018> print(@Param("eq_no") String eq_no , @Param("year") String year,@Param("month") String month);
	   
	   @Query(value="SELECT * FROM precot.TEMPERATURE_RELATIVE_HUMIDITY_RECORD_F018 WHERE QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED' AND chemist_STATUS = 'CHEMIST_APPROVED'",nativeQuery = true)
	  List<temperatureRelativeF018> getAll();
	  
	  @Query(value="SELECT * FROM precot.TEMPERATURE_RELATIVE_HUMIDITY_RECORD_F018 where (chemist_STATUS = 'CHEMIST_APPROVED' or chemist_STATUS = 'CHEMIST_SAVED') AND (QC_STATUS IN ('QC_REJECTED', 'WAITING_FOR_APPROVAL' , 'QA_REJECTED') OR QC_STATUS IS NULL)",nativeQuery = true)
	  List<temperatureRelativeF018> approveList();

			@Query(value = "SELECT * FROM precot.TEMPERATURE_RELATIVE_HUMIDITY_RECORD_F018 WHERE chemist_STATUS IN ('CHEMIST_SAVED', 'CHEMIST_APPROVED') AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED' , 'MICRO_DESIGNEE_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
	  List<temperatureRelativeF018> chemistSummary();

	// MANAGER SUMMARY
	@Query(value = "SELECT * FROM precot.TEMPERATURE_RELATIVE_HUMIDITY_RECORD_F018 WHERE micro_STATUS = 'MICROBIOLOGIST_APPROVED' AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED' , 'MICRO_DESIGNEE_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
	  List<temperatureRelativeF018> exeManagerSummary();
	
	@Query(value = "SELECT * FROM precot.TEMPERATURE_RELATIVE_HUMIDITY_RECORD_F018 WHERE  (micro_STATUS IN ('MICROBIOLOGIST_SAVED', 'MICROBIOLOGIST_APPROVED') OR micro_STATUS IS NULL) AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED' , 'MICRO_DESIGNEE_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
	  List<temperatureRelativeF018> microSummary();
	
}
