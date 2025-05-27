package com.focusr.Precot.mssql.database.repository.splunance.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.audit.DailyRejectionReportHistoryF007;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceGsmAnalysisReportHistoryF009;

public interface SpunlaceGsmAnalysisReportHistoryF009Repo extends JpaRepository<SpunlaceGsmAnalysisReportHistoryF009,Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.SPUNLACE_GSM_ANALYSIS_REPORT_HISTORY_F009 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_GSM_ANALYSIS_REPORT_HISTORY_F009 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo AND VERSION IN (SELECT MAX(VERSION) FROM precot.SPUNLACE_GSM_ANALYSIS_REPORT_HISTORY_F009 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo)", nativeQuery = true)
	SpunlaceGsmAnalysisReportHistoryF009 fetchLastSubmittedRecord(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_GSM_ANALYSIS_REPORT_HISTORY_F009 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo", nativeQuery = true)
	List<SpunlaceGsmAnalysisReportHistoryF009> fetchHistory(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);
	
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_GSM_ANALYSIS_REPORT_HISTORY_F009 WHERE "
	        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
	        + "AND (:f09_shift IS NULL OR SHIFT = :f09_shift) "
	        + "AND (:f09_order_no IS NULL OR ORDER_NO = :f09_order_no)", nativeQuery = true)
	List<SpunlaceGsmAnalysisReportHistoryF009> findByParams09(@Param("from_date") String from_date,
	        @Param("to_date") String to_date,  @Param("f09_shift") String f09_shift,
	        @Param("f09_order_no") String f09_order_no);

}
