package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.fumigationARF011History;
import com.focusr.Precot.mssql.database.model.QcAudit.weighingscalecalibrationreportHistoryCLF007;

@Repository
public interface fumigationARF011HistoryRepo extends JpaRepository<fumigationARF011History, Long>{

	
	@Query(value = "SELECT MAX(VERSION) FROM precot.FUMIGATION_AND_MICROBIOLOGICAL_ANALYSIS_ARF011_HISTORY WHERE BMR_NO=:bmr_no", nativeQuery = true)
	Optional<Integer> getMaximumVersiongetMaximumVersion(@Param("bmr_no")  String bmr_no);

	@Query(value = "SELECT * FROM precot.FUMIGATION_AND_MICROBIOLOGICAL_ANALYSIS_ARF011_HISTORY WHERE FUMIGATION_DATE=:bmr_no AND VERSION IN (SELECT MAX(VERSION) FROM precot.FUMIGATION_AND_MICROBIOLOGICAL_ANALYSIS_ARF011_HISTORY WHERE FUMIGATION_DATE=:bmr_no)", nativeQuery = true)
	fumigationARF011History fetchLastSubmittedRecordPhNumber(@Param("bmr_no")  String bmr_no);
	
//	@Query(value = "SELECT * FROM precot.[FUMIGATION_AND_MICROBIOLOGICAL_ANALYSIS_ARF011_HISTORY] WHERE (BMR_NO = :sub_batch_no OR :sub_batch_no IS NULL) AND (CONVERT(DATE, createdAt, 103) BETWEEN CONVERT(DATE, :startDate, 103) AND CONVERT(DATE, :endDate, 103) OR (:startDate IS NULL AND :endDate IS NULL))", nativeQuery = true)
//	List<fumigationARF011History> audit(@Param("sub_batch_no") String sub_batch_no, @Param("startDate") String startDate, @Param("endDate") String endDate);
	
	@Query(value = "SELECT * FROM precot.[FUMIGATION_AND_MICROBIOLOGICAL_ANALYSIS_ARF011_HISTORY] WHERE "
		       + "(BMR_NO = :sub_batch_no OR :sub_batch_no IS NULL) " +
		       "AND (" +
		       "    (CAST(createdAt AS DATE) BETWEEN CAST(:startDate AS DATE) AND CAST(:endDate AS DATE) " +
		       "    AND :startDate IS NOT NULL AND :endDate IS NOT NULL) " +
		       "    OR (CAST(createdAt AS DATE) >= CAST(:startDate AS DATE) AND :startDate IS NOT NULL AND :endDate IS NULL) " +
		       "    OR (CAST(createdAt AS DATE) <= CAST(:endDate AS DATE) AND :endDate IS NOT NULL AND :startDate IS NULL) " +
		       "    OR (:startDate IS NULL AND :endDate IS NULL)" 
			+ ")", nativeQuery = true)
	List<fumigationARF011History> audit(@Param("sub_batch_no") String sub_batch_no, @Param("startDate") String startDate, @Param("endDate") String endDate);

	@Query(value = "SELECT * FROM precot.[FUMIGATION_AND_MICROBIOLOGICAL_ANALYSIS_ARF011_HISTORY] order by TEST_ID desc", nativeQuery = true)
	List<fumigationARF011History> audit();

}
