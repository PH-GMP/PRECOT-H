package com.focusr.Precot.mssql.database.repository.splunance.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceSampleReportHistoryF012;
@Repository
public interface SpunlaceSampleReportHistoryF012Repository extends JpaRepository<SpunlaceSampleReportHistoryF012, Long> {
	@Query(value = "SELECT MAX(VERSION) FROM precot.SPUNLACE_SAMPLE_REPORT_HISTORY_F012 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);

	@Query(value = "SELECT * FROM precot.SPUNLACE_SAMPLE_REPORT_HISTORY_F012 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo AND VERSION IN (SELECT MAX(VERSION) FROM precot.SPUNLACE_SAMPLE_REPORT_HISTORY_F012 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo)", nativeQuery = true)
	SpunlaceSampleReportHistoryF012 fetchLastSubmittedRecord(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);

	@Query(value = "SELECT * FROM precot.SPUNLACE_SAMPLE_REPORT_HISTORY_F012 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo", nativeQuery = true)
	List<SpunlaceSampleReportHistoryF012> fetchHistory(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);

	// audit
	@Query(value = "SELECT * FROM precot.SPUNLACE_SAMPLE_REPORT_HISTORY_F012 WHERE "
	        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
	        + "AND (:f012_shift IS NULL OR SHIFT = :f012_shift) "
	        + "AND (:f012_order_no IS NULL OR ORDER_NO = :f012_order_no)", nativeQuery = true)
	List<SpunlaceSampleReportHistoryF012> findByParams12(@Param("from_date") String from_date,
	        @Param("to_date") String to_date,  @Param("f012_shift") String f012_shift,
	        @Param("f012_order_no") String f012_order_no);
}
