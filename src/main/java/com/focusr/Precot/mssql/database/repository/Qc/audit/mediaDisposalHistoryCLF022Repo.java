package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.PHYSICALANDCHEMICALTESTHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.mediaDisposalHistoryCLF022;

@Repository//mediaDisposalHistoryCLF022Repo
public interface mediaDisposalHistoryCLF022Repo extends JpaRepository<mediaDisposalHistoryCLF022, Long> {


	@Query(value = "SELECT MAX(VERSION) FROM precot.MEDIA_DISPOSAL_RECORD_HISTORY WHERE TESTED_DATE=:date", nativeQuery = true)
	Optional<Integer> getMaximumVersiongetMaximumVersion(@Param("date") String date);
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.MEDIA_DISPOSAL_RECORD_HISTORY WHERE TESTED_DATE=:TESTED_DATE", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("TESTED_DATE") String TESTED_DATE);
	
	@Query(value = "SELECT * FROM precot.MEDIA_DISPOSAL_RECORD_HISTORY WHERE TESTED_DATE=:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.MEDIA_DISPOSAL_RECORD_HISTORY WHERE TESTED_DATE=:date)", nativeQuery = true)
	mediaDisposalHistoryCLF022 fetchLastSubmittedRecordPhNumber(@Param("date") String date);
	
//	@Query(value = "SELECT * FROM precot.[MEDIA_DISPOSAL_RECORD_HISTORY] WHERE ("
//    
//    +"    (CAST(createdAt AS DATE) BETWEEN CAST(:startDate AS DATE) AND CAST(:endDate AS DATE) " +
//    "    AND :startDate IS NOT NULL AND :endDate IS NOT NULL) " +
//    "    OR (CAST(createdAt AS DATE) >= CAST(:startDate AS DATE) AND :startDate IS NOT NULL AND :endDate IS NULL) " +
//    "    OR (CAST(createdAt AS DATE) <= CAST(:endDate AS DATE) AND :endDate IS NOT NULL AND :startDate IS NULL) " +
//    "    OR (:startDate IS NULL AND :endDate IS NULL)" 
//			+ ")", nativeQuery = true)
//	List<mediaDisposalHistoryCLF022> audit( @Param("startDate") String startDate, @Param("endDate") String endDate);

	@Query(value = "SELECT * FROM precot.[MEDIA_DISPOSAL_RECORD_HISTORY] WHERE ("
		    + "    (TESTED_DATE BETWEEN :startDate AND :endDate "
		    + "    AND :startDate IS NOT NULL AND :endDate IS NOT NULL) "
		    + "    OR (TESTED_DATE >= :startDate AND :startDate IS NOT NULL AND :endDate IS NULL) "
		    + "    OR (TESTED_DATE <= :endDate AND :endDate IS NOT NULL AND :startDate IS NULL) "
		    + "    OR (:startDate IS NULL AND :endDate IS NULL)"
		    + ")", nativeQuery = true)
		List<mediaDisposalHistoryCLF022> audit(@Param("startDate") String startDate, @Param("endDate") String endDate);

		@Query(value = "SELECT * FROM precot.[MEDIA_DISPOSAL_RECORD_HISTORY] WHERE "
			    + "TESTED_DATE = :date", nativeQuery = true)
			List<mediaDisposalHistoryCLF022> audit(@Param("date") String date);

	
	@Query(value = "SELECT * FROM precot.[MEDIA_DISPOSAL_RECORD_HISTORY] order by TEST_ID desc", nativeQuery = true)
	List<mediaDisposalHistoryCLF022> audit();

	
}
