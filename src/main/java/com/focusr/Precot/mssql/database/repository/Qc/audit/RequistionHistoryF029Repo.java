package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.QcAudit.PHYSICALANDCHEMICALTESTHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.RequistionHistoryF029;
import com.focusr.Precot.mssql.database.model.QcAudit.RequistionHistoryF029;
import com.focusr.Precot.mssql.database.model.QcAudit.validationAutoclaveHistory;

public interface RequistionHistoryF029Repo extends JpaRepository<RequistionHistoryF029, Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.REQUISITION_SAMPLE_REPORT_HISTORY WHERE REQUISITION_NO = :requis", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("requis") String requis);
	
	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT_HISTORY WHERE REQUISITION_NO = :requis AND VERSION IN (SELECT MAX(VERSION) FROM precot.REQUISITION_SAMPLE_REPORT_HISTORY WHERE REQUISITION_NO = :requis)", nativeQuery = true)
	RequistionHistoryF029 fetchLastSubmittedRecordPhNumber(@Param("requis") String requis);
	
//	@Query(value = "SELECT * FROM precot.[REQUISITION_SAMPLE_REPORT_HISTORY] WHERE (REQUISITION_NO = :REQUISITION_NO OR :REQUISITION_NO IS NULL) "
//			+ 
//    "AND (" +
//    "    (CAST(createdAt AS DATE) BETWEEN CAST(:startDate AS DATE) AND CAST(:endDate AS DATE) " +
//    "    AND :startDate IS NOT NULL AND :endDate IS NOT NULL) " +
//    "    OR (CAST(createdAt AS DATE) >= CAST(:startDate AS DATE) AND :startDate IS NOT NULL AND :endDate IS NULL) " +
//    "    OR (CAST(createdAt AS DATE) <= CAST(:endDate AS DATE) AND :endDate IS NOT NULL AND :startDate IS NULL) " +
//    "    OR (:startDate IS NULL AND :endDate IS NULL)" 
//			+ ")", nativeQuery = true)
//	List<RequistionHistoryF029> audit(@Param("REQUISITION_NO") String REQUISITION_NO, @Param("startDate") String startDate, @Param("endDate") String endDate);
	
	@Query(value = "SELECT * FROM precot.[REQUISITION_SAMPLE_REPORT_HISTORY] WHERE (REQUISITION_NO = :REQUISITION_NO OR :REQUISITION_NO IS NULL) "
			+ 
    "AND (" +
    "    (CAST(COALESCE(createdAt, updatedAt) AS DATE) BETWEEN CAST(:startDate AS DATE) AND CAST(:endDate AS DATE) " +
    "    AND :startDate IS NOT NULL AND :endDate IS NOT NULL) " +
    "    OR (CAST(COALESCE(createdAt, updatedAt) AS DATE) >= CAST(:startDate AS DATE) AND :startDate IS NOT NULL AND :endDate IS NULL) " +
    "    OR (CAST(COALESCE(createdAt, updatedAt) AS DATE) <= CAST(:endDate AS DATE) AND :endDate IS NOT NULL AND :startDate IS NULL) " +
    "    OR (:startDate IS NULL AND :endDate IS NULL)" 
			+ ")", nativeQuery = true)
	List<RequistionHistoryF029> audit(@Param("REQUISITION_NO") String REQUISITION_NO, @Param("startDate") String startDate, @Param("endDate") String endDate);

	
}

//	@Query(value = "SELECT * FROM precot.[REQUISITION_SAMPLE_REPORT_HISTORY] order by TEST_ID desc", nativeQuery = true)
//	List<RequistionHistoryF029> audit();
//
//	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT_HISTORY WHERE "
//			+ "(REQUISITION_NO = :REQUISITION_NO OR :REQUISITION_NO IS NULL)"
//			+ "AND (:from_date IS NULL OR :to_date IS NULL OR (DATE BETWEEN :from_date AND :to_date)) "
//	
//            + "", nativeQuery = true)
//List<RequistionHistoryF029> audit( @Param("REQUISITION_NO") String REQUISITION_NO,@Param("from_date") String from_date,
//			@Param("to_date") String to_date);
//
//
//	
//	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT_HISTORY WHERE DATE = :date ", nativeQuery = true)
//	List<RequistionHistoryF029> audit(@Param("date") String date);
//}
