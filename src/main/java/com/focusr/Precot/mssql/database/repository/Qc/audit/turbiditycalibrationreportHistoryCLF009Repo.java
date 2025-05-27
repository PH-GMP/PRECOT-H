package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.PHYSICALANDCHEMICALTESTHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.turbiditycalibrationreportHistoryCLF009;
import com.focusr.Precot.mssql.database.model.QcAudit.turbiditycalibrationreportHistoryCLF009;

@Repository
public interface turbiditycalibrationreportHistoryCLF009Repo extends JpaRepository<turbiditycalibrationreportHistoryCLF009, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.TURBIDITY_CALIBRATION_REPORT_HISTORY WHERE EQ_ID_NO = :eq_id_no AND DATE = :date", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("eq_id_no") String eq_id_no , @Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.TURBIDITY_CALIBRATION_REPORT_HISTORY WHERE EQ_ID_NO = :eq_id_no AND DATE = :date AND VERSION IN (SELECT MAX(VERSION) FROM precot.TURBIDITY_CALIBRATION_REPORT_HISTORY WHERE EQ_ID_NO = :eq_id_no AND DATE = :date)", nativeQuery = true)
	turbiditycalibrationreportHistoryCLF009 fetchLastSubmittedRecordPhNumber(@Param("eq_id_no") String eq_id_no , @Param("date") String date);
	
//	@Query(value = "SELECT * FROM precot.[TURBIDITY_CALIBRATION_REPORT_HISTORY] WHERE (EQ_ID_NO = :EQ_ID_NO OR :EQ_ID_NO IS NULL) "
//			
//   + "AND (" +
//    "    (CAST(createdAt AS DATE) BETWEEN CAST(:startDate AS DATE) AND CAST(:endDate AS DATE) " +
//    "    AND :startDate IS NOT NULL AND :endDate IS NOT NULL) " +
//    "    OR (CAST(createdAt AS DATE) >= CAST(:startDate AS DATE) AND :startDate IS NOT NULL AND :endDate IS NULL) " +
//    "    OR (CAST(createdAt AS DATE) <= CAST(:endDate AS DATE) AND :endDate IS NOT NULL AND :startDate IS NULL) " +
//    "    OR (:startDate IS NULL AND :endDate IS NULL)" 
//			+ ")", nativeQuery = true)
//	List<turbiditycalibrationreportHistoryCLF009> audit(@Param("EQ_ID_NO") String EQ_ID_NO, @Param("startDate") String startDate, @Param("endDate") String endDate);
	
	@Query(value = "SELECT * FROM precot.[TURBIDITY_CALIBRATION_REPORT_HISTORY] WHERE (EQ_ID_NO = :EQ_ID_NO OR :EQ_ID_NO IS NULL) "
			+ 
    "AND (" +
    "    (CAST(COALESCE(createdAt, updatedAt) AS DATE) BETWEEN CAST(:startDate AS DATE) AND CAST(:endDate AS DATE) " +
    "    AND :startDate IS NOT NULL AND :endDate IS NOT NULL) " +
    "    OR (CAST(COALESCE(createdAt, updatedAt) AS DATE) >= CAST(:startDate AS DATE) AND :startDate IS NOT NULL AND :endDate IS NULL) " +
    "    OR (CAST(COALESCE(createdAt, updatedAt) AS DATE) <= CAST(:endDate AS DATE) AND :endDate IS NOT NULL AND :startDate IS NULL) " +
    "    OR (:startDate IS NULL AND :endDate IS NULL)" 
			+ ")", nativeQuery = true)
	List<turbiditycalibrationreportHistoryCLF009> audit(@Param("EQ_ID_NO") String EQ_ID_NO, @Param("startDate") String startDate, @Param("endDate") String endDate);

	@Query(value = "SELECT * FROM precot.[TURBIDITY_CALIBRATION_REPORT_HISTORY] order by LAB_ID desc", nativeQuery = true)
	List<turbiditycalibrationreportHistoryCLF009> audit();
}
