package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.PHYSICALANDCHEMICALTESTHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.briquettesanalysisreportHistoryARF014;
import com.focusr.Precot.mssql.database.model.QcAudit.fungalIncubatorReportHistoryCLF013;

@Repository
public interface fungalIncubatorReportHistoryCLF013Repo extends JpaRepository<fungalIncubatorReportHistoryCLF013, Long> {
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.FUNGAL_REPORT_HISTORY WHERE EQ_ID_NO = :eq_id_no AND DATE = :date", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("eq_id_no") String eq_id_no , @Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.FUNGAL_REPORT_HISTORY WHERE EQ_ID_NO = :eq_id_no AND DATE = :date AND VERSION IN (SELECT MAX(VERSION) FROM precot.FUNGAL_REPORT_HISTORY WHERE EQ_ID_NO = :eq_id_no AND DATE = :date)", nativeQuery = true)
	fungalIncubatorReportHistoryCLF013 fetchLastSubmittedRecordPhNumber(@Param("eq_id_no") String eq_id_no , @Param("date") String date);
	
//	@Query(value = "SELECT * FROM precot.[FUNGAL_REPORT_HISTORY] WHERE (EQ_ID_NO = :EQ_ID_NO OR :EQ_ID_NO IS NULL) AND (CONVERT(DATE, createdAt, 103) BETWEEN CONVERT(DATE, :startDate, 103) AND CONVERT(DATE, :endDate, 103) OR (:startDate IS NULL AND :endDate IS NULL))", nativeQuery = true)
//	List<fungalIncubatorReportHistoryCLF013> audit(@Param("EQ_ID_NO") String EQ_ID_NO, @Param("startDate") String startDate, @Param("endDate") String endDate);

	
//	@Query(value = "SELECT * FROM precot.[FUNGAL_REPORT_HISTORY] WHERE "
//			+ ""
//			+ "(EQ_ID_NO = :EQ_ID_NO OR :EQ_ID_NO IS NULL) "
//		       +
//		       "AND (" +
//		       "    (CAST(createdAt AS DATE) BETWEEN CAST(:startDate AS DATE) AND CAST(:endDate AS DATE) " +
//		       "    AND :startDate IS NOT NULL AND :endDate IS NOT NULL) " +
//		       "    OR (CAST(createdAt AS DATE) >= CAST(:startDate AS DATE) AND :startDate IS NOT NULL AND :endDate IS NULL) " +
//		       "    OR (CAST(createdAt AS DATE) <= CAST(:endDate AS DATE) AND :endDate IS NOT NULL AND :startDate IS NULL) " +
//		       "    OR (:startDate IS NULL AND :endDate IS NULL)" 
//			+ ""
//			+ ")", nativeQuery = true)
//	List<fungalIncubatorReportHistoryCLF013> audit(@Param("EQ_ID_NO") String EQ_ID_NO, @Param("startDate") String startDate, @Param("endDate") String endDate);
	
	@Query(value = "SELECT * FROM precot.FUNGAL_REPORT_HISTORY WHERE "
	        + "(EQ_ID_NO = :EQ_ID_NO OR :EQ_ID_NO IS NULL) "
	        + "AND (:startDate IS NULL OR :endDate IS NULL OR DATE BETWEEN :startDate AND :endDate)",
	        nativeQuery = true)
	List<fungalIncubatorReportHistoryCLF013> audit(
	        @Param("EQ_ID_NO") String EQ_ID_NO,
	        @Param("startDate") String startDate,
	        @Param("endDate") String endDate);


	@Query(value = "SELECT * FROM precot.FUNGAL_REPORT_HISTORY WHERE "
	        + "(EQ_ID_NO = :EQ_ID_NO OR :EQ_ID_NO IS NULL) "
	        + "AND DATE = :startDate",
	        nativeQuery = true)
	List<fungalIncubatorReportHistoryCLF013> audit(
	        @Param("EQ_ID_NO") String EQ_ID_NO,
	        @Param("startDate") String startDate);

	
	@Query(value = "SELECT * FROM precot.[FUNGAL_REPORT_HISTORY] WHERE order by LAB_ID desc", nativeQuery = true)
	List<fungalIncubatorReportHistoryCLF013> audit();

}
