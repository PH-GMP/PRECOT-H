package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.DisposalRecord;

@Repository
public interface DisposalRecordRepo extends JpaRepository<DisposalRecord, Long> {
	
	@Query(value = "SELECT * FROM precot.DISPOSAL_RECORD WHERE chemist_STATUS = 'LAB_ASSISTANT_SAVED' ORDER BY TEST_ID DESC", nativeQuery = true)
List<DisposalRecord> chemistSummary();

// MANAGER SUMMARY
@Query(value = "SELECT * FROM precot.DISPOSAL_RECORD WHERE chemist_STATUS = 'CHEMIST_APPROVED' AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
List<DisposalRecord> exeManagerSummary();

@Query(value = "SELECT * FROM precot.DISPOSAL_RECORD WHERE  (micro_STATUS IN ('MICROBIOLOGIST_SAVED', 'MICROBIOLOGIST_APPROVED') OR micro_STATUS IS NULL) AND chemist_STATUS = 'CHEMIST_APPROVED' AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS IS NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
List<DisposalRecord> microSummary();

@Query(value = "SELECT * FROM precot.DISPOSAL_RECORD WHERE DISPOSALNAME = :e1_no AND (QC_STATUS = 'QA_APPROVED' OR QC_STATUS = 'QC_APPROVED')", nativeQuery = true)
List<DisposalRecord> print(String e1_no);

@Query(value = "SELECT * FROM precot.DISPOSAL_RECORD w  WHERE  (:year IS NULL OR w.YEAR = :year) AND (:month IS NULL OR w.MONTH = :month) AND (:date IS NULL OR w.DATE = :date)", nativeQuery = true)

List<DisposalRecord> findByBatch(@Param("year") String year,@Param("month") String month,@Param("date") String date);

@Query(value = "SELECT * FROM precot.DISPOSAL_RECORD where EQ_ID_NO = :eq_no AND YEAR = :year AND MONTH=:month ", nativeQuery = true)

List<DisposalRecord> findByBatch(@Param("year") String year,@Param("month") String month);


@Query(value="SELECT * FROM precot.DISPOSAL_RECORD w  WHERE  (:year IS NULL OR w.YEAR = :year) AND (:month IS NULL OR w.MONTH = :month) AND (:date IS NULL OR w.DATE = :date) AND chemist_STATUS = 'LAB_ASSISTANT_APPROVED'",nativeQuery = true)

List<DisposalRecord> print( @Param("year") String year,@Param("month") String month,@Param("date") String date);

@Query(value="SELECT * FROM precot.DISPOSAL_RECORD  YEAR = :year AND MONTH=:month AND (QC_STATUS = 'QA_APPROVED' OR QC_STATUS = 'QC_APPROVED')",nativeQuery = true)

List<DisposalRecord> print(@Param("year") String year,@Param("month") String month);


}
