package com.focusr.Precot.mssql.database.repository.splunance.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.audit.DailyProductionReportHistoryF006;

public interface DailyProductionReportHistoryF006Repo extends JpaRepository<DailyProductionReportHistoryF006,Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.SPUNLACE_DAILY_PRODUCTION_REPORT_HISTORY_F006 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_PRODUCTION_REPORT_HISTORY_F006 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo AND VERSION IN (SELECT MAX(VERSION) FROM precot.SPUNLACE_DAILY_PRODUCTION_REPORT_HISTORY_F006 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo)", nativeQuery = true)
	DailyProductionReportHistoryF006 fetchLastSubmittedRecord(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_PRODUCTION_REPORT_HISTORY_F006 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo", nativeQuery = true)
	List<DailyProductionReportHistoryF006> fetchHistory(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_PRODUCTION_REPORT_HISTORY_F006 WHERE "
	        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
	        + "AND (:f06_shift IS NULL OR SHIFT = :f06_shift) "
	        + "AND (:f06_order_no IS NULL OR ORDER_NO = :f06_order_no)", nativeQuery = true)
	List<DailyProductionReportHistoryF006> findByParams06(@Param("from_date") String from_date,
	        @Param("to_date") String to_date,  @Param("f06_shift") String f06_shift,
	        @Param("f06_order_no") String f06_order_no);

}
