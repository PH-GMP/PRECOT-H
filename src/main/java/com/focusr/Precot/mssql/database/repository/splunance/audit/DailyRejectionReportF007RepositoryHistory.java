package com.focusr.Precot.mssql.database.repository.splunance.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.splunance.audit.DailyRejectionReportHistoryF007;

@Repository
public interface DailyRejectionReportF007RepositoryHistory extends JpaRepository<DailyRejectionReportHistoryF007, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.SPUNLACE_DAILY_REJECTION_REPORT_HISTORY_F007 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_REJECTION_REPORT_HISTORY_F007 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo AND VERSION IN (SELECT MAX(VERSION) FROM precot.SPUNLACE_DAILY_REJECTION_REPORT_HISTORY_F007 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo)", nativeQuery = true)
	DailyRejectionReportHistoryF007 fetchLastSubmittedRecord(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_REJECTION_REPORT_HISTORY_F007 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo", nativeQuery = true)
	List<DailyRejectionReportHistoryF007> fetchHistory(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_REJECTION_REPORT_HISTORY_F007 WHERE "
	        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
	        + "AND (:f07_shift IS NULL OR SHIFT = :f07_shift) "
	        + "AND (:f07_order_no IS NULL OR ORDER_NO = :f07_order_no)", nativeQuery = true)
	List<DailyRejectionReportHistoryF007> findByParams07(@Param("from_date") String from_date,
	        @Param("to_date") String to_date,  @Param("f07_shift") String f07_shift,
	        @Param("f07_order_no") String f07_order_no);
	
}
