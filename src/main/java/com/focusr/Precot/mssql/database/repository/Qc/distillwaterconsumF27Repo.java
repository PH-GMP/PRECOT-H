package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.distillwaterconsumF27;
import com.focusr.Precot.mssql.database.model.Qc.distillwaterconsumF27;

@Repository
public interface distillwaterconsumF27Repo extends JpaRepository<distillwaterconsumF27, Long> {

	@Query(value = "SELECT * FROM precot.DISTILLED_WATER_CONSUMPTION_REPORT WHERE "
		    + "(:eq_id IS NULL OR EQ_ID = :eq_id) "
		    + "AND (:year IS NULL OR YEAR = :year) "
		    + "AND (:month IS NULL OR MONTH = :month) "
		    + "AND (:date IS NULL OR DATE = :date)",
		    nativeQuery = true)
		List<distillwaterconsumF27> findByBatch(
		    @Param("eq_id") String eq_id, 
		    @Param("year") String year, 
		    @Param("month") String month, 
		    @Param("date") String date);

	   
	   @Query(value = "SELECT * FROM precot.DISTILLED_WATER_CONSUMPTION_REPORT WHERE EQ_ID = :eq_id AND  YEAR = :year AND MONTH=:month ",nativeQuery = true)
	   List<distillwaterconsumF27> findByBatch(@Param("eq_id") String eq_id , @Param("year") String year,@Param("month") String month);
	   
//	   @Query(value = "SELECT * FROM precot.DISTILLED_WATER_CONSUMPTION_REPORT WHERE EQ_ID = :eq_id AND  EQ_ID = :eq_id AND  YEAR = :year AND MONTH=:month AND DATE = :date AND (QC_STATUS = 'QA_APPROVED' OR QC_STATUS = 'QC_APPROVED')",nativeQuery = true)
//	   List<distillwaterconsumF27> print(@Param("eq_id") String eq_id , @Param("year") String year,@Param("month") String month,@Param("date") String date);
	   
	   @Query(value = "SELECT * FROM precot.DISTILLED_WATER_CONSUMPTION_REPORT WHERE "
			    + "(:eq_id IS NULL OR EQ_ID = :eq_id) "
			    + "AND (:year IS NULL OR YEAR = :year) "
			    + "AND (:month IS NULL OR MONTH = :month) "
			    + "AND (:date IS NULL OR DATE = :date) "
			    + "AND (chemist_STATUS = 'CHEMIST_APPROVED' or micro_STATUS = 'MICROBIOLOGIST_APPROVED')",
			    nativeQuery = true)
			List<distillwaterconsumF27> print(
			    @Param("eq_id") String eq_id, 
			    @Param("year") String year, 
			    @Param("month") String month, 
			    @Param("date") String date);
	   
	   @Query(value = "SELECT * FROM precot.DISTILLED_WATER_CONSUMPTION_REPORT WHERE EQ_ID = :eq_id AND  YEAR = :year AND MONTH=:month AND (QC_STATUS = 'QA_APPROVED' OR QC_STATUS = 'QC_APPROVED')",nativeQuery = true)
	   List<distillwaterconsumF27> print(@Param("eq_id") String eq_id , @Param("year") String year,@Param("month") String month);
	   
	   @Query(value="SELECT * FROM precot.DISTILLED_WATER_CONSUMPTION_REPORT WHERE QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED' AND chemist_STATUS = 'CHEMIST_APPROVED'",nativeQuery = true)
	  List<distillwaterconsumF27> getAll();
	  
	  @Query(value="SELECT * FROM precot.DISTILLED_WATER_CONSUMPTION_REPORT where (chemist_STATUS = 'CHEMIST_APPROVED' or chemist_STATUS = 'CHEMIST_SAVED') AND (QC_STATUS IN ('QC_REJECTED', 'WAITING_FOR_APPROVAL' , 'QA_REJECTED') OR QC_STATUS IS NULL)",nativeQuery = true)
	  List<distillwaterconsumF27> approveList();

			@Query(value = "SELECT * FROM precot.DISTILLED_WATER_CONSUMPTION_REPORT WHERE chemist_STATUS = 'CHEMIST_SAVED' ORDER BY TEST_ID DESC", nativeQuery = true)
	  List<distillwaterconsumF27> chemistSummary();

	// MANAGER SUMMARY
	@Query(value = "SELECT * FROM precot.DISTILLED_WATER_CONSUMPTION_REPORT WHERE micro_STATUS = 'MICROBIOLOGIST_SAVED'  ORDER BY TEST_ID DESC", nativeQuery = true)
	  List<distillwaterconsumF27> exeManagerSummary();
	
	@Query(value = "SELECT * FROM precot.DISTILLED_WATER_CONSUMPTION_REPORT WHERE micro_STATUS = 'MICROBIOLOGIST_SAVED'  ORDER BY TEST_ID DESC", nativeQuery = true)
	  List<distillwaterconsumF27> microSummary();
	
}
