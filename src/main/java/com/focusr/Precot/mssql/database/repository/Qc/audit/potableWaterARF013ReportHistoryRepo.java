package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.briquettesanalysisreportHistoryARF014;
import com.focusr.Precot.mssql.database.model.QcAudit.potableWaterARF013ReportHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.weighingscalecalibrationreportHistoryCLF007;

@Repository
public interface potableWaterARF013ReportHistoryRepo extends JpaRepository<potableWaterARF013ReportHistory, Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.POTABLE_WATER_ANALYSIS_REPORT_ARF013_HISTORY WHERE SAMPLED_ON=:sampled_on", nativeQuery = true)
	Optional<Integer> getMaximumVersiongetMaximumVersion(@Param("sampled_on")  String sampled_on);

	@Query(value = "SELECT * FROM precot.POTABLE_WATER_ANALYSIS_REPORT_ARF013_HISTORY WHERE SAMPLED_ON=:sampled_on AND VERSION IN (SELECT MAX(VERSION) FROM precot.POTABLE_WATER_ANALYSIS_REPORT_ARF013_HISTORY WHERE SAMPLED_ON=:sampled_on)", nativeQuery = true)
	potableWaterARF013ReportHistory fetchLastSubmittedRecordPhNumber(@Param("sampled_on")  String sampled_on);
	
//	@Query(value = "SELECT * FROM precot.[POTABLE_WATER_ANALYSIS_REPORT_ARF013_HISTORY] WHERE (SAMPLED_ON = :sub_batch_no OR :sub_batch_no IS NULL) AND (CONVERT(DATE, createdAt, 103) BETWEEN CONVERT(DATE, :startDate, 103) AND CONVERT(DATE, :endDate, 103) OR (:startDate IS NULL AND :endDate IS NULL))", nativeQuery = true)
//	List<potableWaterARF013ReportHistory> audit(@Param("sub_batch_no") String sub_batch_no, @Param("startDate") String startDate, @Param("endDate") String endDate);
	
//	@Query(value = "SELECT * FROM precot.[POTABLE_WATER_ANALYSIS_REPORT_ARF013_HISTORY] WHERE "
//			+ ""
//		       + "(SAMPLED_ON = :sub_batch_no OR :sub_batch_no IS NULL) " +
//		       "AND (" +
//		       "    (CAST(createdAt AS DATE) BETWEEN CAST(:startDate AS DATE) AND CAST(:endDate AS DATE) " +
//		       "    AND :startDate IS NOT NULL AND :endDate IS NOT NULL) " +
//		       "    OR (CAST(createdAt AS DATE) >= CAST(:startDate AS DATE) AND :startDate IS NOT NULL AND :endDate IS NULL) " +
//		       "    OR (CAST(createdAt AS DATE) <= CAST(:endDate AS DATE) AND :endDate IS NOT NULL AND :startDate IS NULL) " +
//		       "    OR (:startDate IS NULL AND :endDate IS NULL)" 
//			+ ")", nativeQuery = true)
//	List<potableWaterARF013ReportHistory> audit(@Param("sub_batch_no") String sub_batch_no, @Param("startDate") String startDate, @Param("endDate") String endDate);
	
	@Query(value = "SELECT * FROM precot.POTABLE_WATER_ANALYSIS_REPORT_ARF013_HISTORY WHERE "
	        + "(:from_date IS NULL OR :to_date IS NULL OR SAMPLED_ON BETWEEN :from_date AND :to_date)",
	        nativeQuery = true)
	List<potableWaterARF013ReportHistory> audit(
	        @Param("from_date") String from_date,
	        @Param("to_date") String to_date);


	@Query(value = "SELECT * FROM precot.POTABLE_WATER_ANALYSIS_REPORT_ARF013_HISTORY WHERE "
	        + "SAMPLED_ON = :from_date", nativeQuery = true)
	List<potableWaterARF013ReportHistory> audit(
	        @Param("from_date") String from_date);


	@Query(value = "SELECT * FROM precot.[POTABLE_WATER_ANALYSIS_REPORT_ARF013_HISTORY] order by TEST_ID desc", nativeQuery = true)
	List<potableWaterARF013ReportHistory> audit();
	 

}
