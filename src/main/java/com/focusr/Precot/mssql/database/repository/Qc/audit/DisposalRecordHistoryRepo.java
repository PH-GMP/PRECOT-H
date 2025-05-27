package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.DisposalRecordHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.PHYSICALANDCHEMICALTESTHistory;

@Repository
public interface DisposalRecordHistoryRepo extends JpaRepository<DisposalRecordHistory, Long> {
	
		@Query(value = "SELECT MAX(VERSION) FROM precot.DISPOSAL_RECORD_HISTORY WHERE DISPOSALNAME=:disposalname", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("disposalname") String disposalname);
	
	@Query(value = "SELECT * FROM precot.DISPOSAL_RECORD_HISTORY WHERE DISPOSALNAME=:disposalname AND VERSION IN (SELECT MAX(VERSION) FROM precot.DISPOSAL_RECORD_HISTORY WHERE DISPOSALNAME=:disposalname)", nativeQuery = true)
	DisposalRecordHistory fetchLastSubmittedRecordPhNumber(@Param("disposalname") String disposalname);
	
//	@Query(value = "SELECT * FROM precot.[DISPOSAL_RECORD_HISTORY] WHERE (DISPOSALNAME = :DISPOSALNAME OR :DISPOSALNAME IS NULL) AND (CONVERT(DATE, createdAt, 103) BETWEEN CONVERT(DATE, :startDate, 103) AND CONVERT(DATE, :endDate, 103) OR (:startDate IS NULL AND :endDate IS NULL))", nativeQuery = true)
//	List<DisposalRecordHistory> audit(@Param("DISPOSALNAME") String DISPOSALNAME, @Param("startDate") String startDate, @Param("endDate") String endDate);
	
	@Query(value = "SELECT * FROM precot.[DISPOSAL_RECORD_HISTORY] WHERE (DISPOSALNAME = :DISPOSALNAME OR :DISPOSALNAME IS NULL) AND (" +
    "    (CAST(createdAt AS DATE) BETWEEN CAST(:startDate AS DATE) AND CAST(:endDate AS DATE) " +
    "    AND :startDate IS NOT NULL AND :endDate IS NOT NULL) " +
    "    OR (CAST(createdAt AS DATE) >= CAST(:startDate AS DATE) AND :startDate IS NOT NULL AND :endDate IS NULL) " +
    "    OR (CAST(createdAt AS DATE) <= CAST(:endDate AS DATE) AND :endDate IS NOT NULL AND :startDate IS NULL) " +
    "    OR (:startDate IS NULL AND :endDate IS NULL)" 
			+ ")", nativeQuery = true)
	List<DisposalRecordHistory> audit(@Param("DISPOSALNAME") String DISPOSALNAME, @Param("startDate") String startDate, @Param("endDate") String endDate);

	@Query(value = "SELECT * FROM precot.[DISPOSAL_RECORD_HISTORY] order by TEST_ID desc", nativeQuery = true)	
	List<DisposalRecordHistory> audit();




}
