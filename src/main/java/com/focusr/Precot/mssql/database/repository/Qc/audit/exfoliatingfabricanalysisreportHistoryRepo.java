package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.PHYSICALANDCHEMICALTESTHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.exfoliatingfabricanalysisreportHistory;

@Repository
public interface exfoliatingfabricanalysisreportHistoryRepo extends JpaRepository<exfoliatingfabricanalysisreportHistory, Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.EXFOLIATING_FABRIC_ANALYSIS_REPORT_HISTORY WHERE INVOICE_NO=:invoice_no", nativeQuery = true)
	Optional<Integer> getMaximumVersiongetMaximumVersion(@Param("invoice_no") String invoice_no);

	
	@Query(value = "SELECT * FROM precot.EXFOLIATING_FABRIC_ANALYSIS_REPORT_HISTORY WHERE INVOICE_NO=:invoice_no AND VERSION IN (SELECT MAX(VERSION) FROM precot.EXFOLIATING_FABRIC_ANALYSIS_REPORT_HISTORY WHERE INVOICE_NO=:invoice_no)", nativeQuery = true)
	exfoliatingfabricanalysisreportHistory fetchLastSubmittedRecordPhNumber(@Param("invoice_no") String invoice_no);
	
	@Query(value = "SELECT * FROM precot.[EXFOLIATING_FABRIC_ANALYSIS_REPORT_HISTORY] WHERE (INVOICE_NO = :sub_batch_no OR :sub_batch_no IS NULL) "
			
   + "AND (" +
    "    (CAST(createdAt AS DATE) BETWEEN CAST(:startDate AS DATE) AND CAST(:endDate AS DATE) " +
    "    AND :startDate IS NOT NULL AND :endDate IS NOT NULL) " +
    "    OR (CAST(createdAt AS DATE) >= CAST(:startDate AS DATE) AND :startDate IS NOT NULL AND :endDate IS NULL) " +
    "    OR (CAST(createdAt AS DATE) <= CAST(:endDate AS DATE) AND :endDate IS NOT NULL AND :startDate IS NULL) " +
    "    OR (:startDate IS NULL AND :endDate IS NULL)" 
			+ ")", nativeQuery = true)
	List<exfoliatingfabricanalysisreportHistory> audit(@Param("sub_batch_no") String sub_batch_no, @Param("startDate") String startDate, @Param("endDate") String endDate);

	@Query(value = "SELECT * FROM precot.[EXFOLIATING_FABRIC_ANALYSIS_REPORT_HISTORY] order by TEST_ID desc", nativeQuery = true)
	List<exfoliatingfabricanalysisreportHistory> audit();
	
	

}
