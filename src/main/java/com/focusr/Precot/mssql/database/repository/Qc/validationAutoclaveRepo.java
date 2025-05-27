package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.validationAutoclave;



@Repository
public interface validationAutoclaveRepo extends JpaRepository<validationAutoclave, Long>{
	
	@Query(value = "SELECT * FROM precot.VALIDATION_FOR_AUTOCLAVE_CLF014 WHERE chemist_STATUS = 'CHEMIST_SAVED' ORDER BY TEST_ID DESC", nativeQuery = true)
List<validationAutoclave> chemistSummary();

// MANAGER SUMMARY
@Query(value = "SELECT * FROM precot.VALIDATION_FOR_AUTOCLAVE_CLF014 WHERE micro_STATUS = 'MICROBIOLOGIST_APPROVED' AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
List<validationAutoclave> exeManagerSummary();

@Query(value = "SELECT * FROM precot.VALIDATION_FOR_AUTOCLAVE_CLF014 WHERE micro_STATUS IN ('MICROBIOLOGIST_APPROVED', 'MICROBIOLOGIST_SAVED')  AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
List<validationAutoclave> microSummary();

@Query(value = "SELECT * FROM precot.VALIDATION_FOR_AUTOCLAVE_CLF014 w  WHERE  (:year IS NULL OR w.YEAR = :year) AND (:month IS NULL OR w.MONTH = :month) AND (:date IS NULL OR w.DATE = :date) AND (:eqId IS NULL OR w.EQ_ID = :eqId) ORDER BY TEST_ID DESC", nativeQuery = true)
List<validationAutoclave> findByBatch(@Param("year") String year, @Param("month") String month, @Param("date") String date, @Param("eqId") String eqId);

@Query(value="SELECT * FROM precot.VALIDATION_FOR_AUTOCLAVE_CLF014 w WHERE (:year IS NULL OR w.YEAR = :year) AND (:month IS NULL OR w.MONTH = :month) AND (:date IS NULL OR w.DATE = :date) AND (:eqId IS NULL OR w.EQ_ID = :eqId) AND (QC_STATUS = 'QA_APPROVED' OR QC_STATUS = 'QC_APPROVED')", nativeQuery = true)
List<validationAutoclave> print(@Param("year") String year, @Param("month") String month, @Param("date") String date, @Param("eqId") String eqId);


}
