package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.finishedproductanalysisreporthistory;
import com.focusr.Precot.mssql.database.model.QcAudit.weighingscalecalibrationreportHistoryCLF007;

@Repository
public interface weighingscalecalibrationreportCLF007HistoryRepo extends JpaRepository<weighingscalecalibrationreportHistoryCLF007, Long> {
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.WEIGHING_SCALE_CALIBRATION_REPORT_HISTORY WHERE DATE=:date", nativeQuery = true)
	Optional<Integer> getMaximumVersiongetMaximumVersion(@Param("date") String date);

	
	@Query(value = "SELECT * FROM precot.WEIGHING_SCALE_CALIBRATION_REPORT_HISTORY WHERE DATE=:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.WEIGHING_SCALE_CALIBRATION_REPORT_HISTORY WHERE DATE=:date)", nativeQuery = true)
	weighingscalecalibrationreportHistoryCLF007 fetchLastSubmittedRecordPhNumber(@Param("date") String date);
	
//	@Query(value = "SELECT * FROM precot.[WEIGHING_SCALE_CALIBRATION_REPORT_HISTORY] WHERE (DATE = :DATE OR :DATE IS NULL) AND (CONVERT(DATE, createdAt, 103) BETWEEN CONVERT(DATE, :startDate, 103) AND CONVERT(DATE, :endDate, 103) OR (:startDate IS NULL AND :endDate IS NULL))", nativeQuery = true)
//	List<weighingscalecalibrationreportHistoryCLF007> audit(@Param("DATE") String DATE, @Param("startDate") String startDate, @Param("endDate") String endDate);
	
	@Query(value = "SELECT * FROM precot.[WEIGHING_SCALE_CALIBRATION_REPORT_HISTORY] WHERE"
		       + "(EQ_ID_NO = :subBatchNo OR :subBatchNo IS NULL) " +
		       "AND (" +
		       "    (CAST(createdAt AS DATE) BETWEEN CAST(:startDate AS DATE) AND CAST(:endDate AS DATE) " +
		       "    AND :startDate IS NOT NULL AND :endDate IS NOT NULL) " +
		       "    OR (CAST(createdAt AS DATE) >= CAST(:startDate AS DATE) AND :startDate IS NOT NULL AND :endDate IS NULL) " +
		       "    OR (CAST(createdAt AS DATE) <= CAST(:endDate AS DATE) AND :endDate IS NOT NULL AND :startDate IS NULL) " +
		       "    OR (:startDate IS NULL AND :endDate IS NULL)" 
			+ ")", nativeQuery = true)
	List<weighingscalecalibrationreportHistoryCLF007> audit(@Param("subBatchNo") String subBatchNo, @Param("startDate") String startDate, @Param("endDate") String endDate);

	@Query(value = "SELECT * FROM precot.[WEIGHING_SCALE_CALIBRATION_REPORT_HISTORY] order by LAB_ID desc", nativeQuery = true)
	List<weighingscalecalibrationreportHistoryCLF007> audit();
}
