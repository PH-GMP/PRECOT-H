package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.briquettesanalysisreportHistoryARF014;

@Repository
public interface briquettesanalysisreportHistoryARF014Repo extends JpaRepository<briquettesanalysisreportHistoryARF014, Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.BRIQUETTES_ANALYSIS_REPORT_HISTORY WHERE SUPPLIER_NAME = :supplier_name AND DATE = :date", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("supplier_name") String supplier_name , @Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.BRIQUETTES_ANALYSIS_REPORT_HISTORY WHERE SUPPLIER_NAME = :supplier_name AND DATE = :date AND VERSION IN (SELECT MAX(VERSION) FROM precot.BRIQUETTES_ANALYSIS_REPORT_HISTORY WHERE SUPPLIER_NAME = :supplier_name AND DATE = :date)", nativeQuery = true)
	briquettesanalysisreportHistoryARF014 fetchLastSubmittedRecordPhNumber(@Param("supplier_name") String supplier_name , @Param("date") String date);
	
//	@Query(value = "SELECT * FROM precot.[BRIQUETTES_ANALYSIS_REPORT_HISTORY] WHERE (SUPPLIER_NAME = :sub_batch_no OR :sub_batch_no IS NULL) AND (INVOICE_NO = :invoice OR :invoice IS NULL)  AND (CONVERT(DATE, createdAt, 103) BETWEEN CONVERT(DATE, :startDate, 103) AND CONVERT(DATE, :endDate, 103) OR (:startDate IS NULL AND :endDate IS NULL))", nativeQuery = true)
//	List<briquettesanalysisreportHistoryARF014> audit(@Param("sub_batch_no") String sub_batch_no,@Param("invoice") String invoice ,@Param("startDate") String startDate, @Param("endDate") String endDate);
	
//	@Query(value = "SELECT * FROM precot.[BRIQUETTES_ANALYSIS_REPORT_HISTORY] WHERE "
//			+ "(SUPPLIER_NAME = :sub_batch_no OR :sub_batch_no IS NULL) AND (INVOICE_NO = :invoice OR :invoice IS NULL) "
//		       +
//		       "AND (" +
//		       "    (CAST(createdAt AS DATE) BETWEEN CAST(:startDate AS DATE) AND CAST(:endDate AS DATE) " +
//		       "    AND :startDate IS NOT NULL AND :endDate IS NOT NULL) " +
//		       "    OR (CAST(createdAt AS DATE) >= CAST(:startDate AS DATE) AND :startDate IS NOT NULL AND :endDate IS NULL) " +
//		       "    OR (CAST(createdAt AS DATE) <= CAST(:endDate AS DATE) AND :endDate IS NOT NULL AND :startDate IS NULL) " +
//		       "    OR (:startDate IS NULL AND :endDate IS NULL)" 
//			+ ")", nativeQuery = true)
//	List<briquettesanalysisreportHistoryARF014> audit(@Param("sub_batch_no") String sub_batch_no,@Param("invoice") String invoice ,@Param("startDate") String startDate, @Param("endDate") String endDate);
	
//	@Query(value = "SELECT * FROM precot.[BRIQUETTES_ANALYSIS_REPORT_HISTORY] " +
//            "WHERE (SUPPLIER_NAME = :sub_batch_no OR :sub_batch_no IS NULL) " +
//            "AND (INVOICE_NO = :invoice OR :invoice IS NULL) " +
//            "AND ((CONVERT(DATE, createdAt, 103) BETWEEN CONVERT(DATE, :startDate, 103) " +
//            "AND CONVERT(DATE, :endDate, 103)) OR (:startDate IS NULL AND :endDate IS NULL))", 
//            nativeQuery = true)
//List<briquettesanalysisreportHistoryARF014> audit(@Param("sub_batch_no") String sub_batch_no, 
//                                               @Param("invoice") String invoice,
//                                               @Param("startDate") String startDate, 
//                                               @Param("endDate") String endDate);


	@Query(value = "SELECT * FROM precot.[BRIQUETTES_ANALYSIS_REPORT_HISTORY] order by TEST_ID desc", nativeQuery = true)
	List<briquettesanalysisreportHistoryARF014> audit();
	
	
	@Query(value = "SELECT * FROM precot.BRIQUETTES_ANALYSIS_REPORT_HISTORY WHERE "
			+ "(SUPPLIER_NAME = :SUPPLIER_NAME OR :SUPPLIER_NAME IS NULL)AND (INVOICE_NO = :invoice OR :invoice IS NULL) "
			+ "AND (:from_date IS NULL OR :to_date IS NULL OR (DATE BETWEEN :from_date AND :to_date)) "
	
            + "", nativeQuery = true)
List<briquettesanalysisreportHistoryARF014> audit( @Param("SUPPLIER_NAME") String SUPPLIER_NAME,@Param("invoice") String invoice ,@Param("from_date") String from_date,
			@Param("to_date") String to_date);


	
	@Query(value = "SELECT * FROM precot.BRIQUETTES_ANALYSIS_REPORT_HISTORY WHERE DATE = :date AND (SUPPLIER_NAME = :SUPPLIER_NAME OR :SUPPLIER_NAME IS NULL)", nativeQuery = true)
	List<briquettesanalysisreportHistoryARF014> audit(@Param("date") String date , @Param("SUPPLIER_NAME") String SUPPLIER_NAME);
	 

}