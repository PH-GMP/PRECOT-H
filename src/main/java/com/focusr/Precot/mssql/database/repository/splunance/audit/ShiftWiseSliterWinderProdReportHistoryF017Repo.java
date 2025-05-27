package com.focusr.Precot.mssql.database.repository.splunance.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.audit.ProcessSetupVerificationSliterWinderHistoryF016;
import com.focusr.Precot.mssql.database.model.splunance.audit.ShiftWiseSliterWinderProdReportHistoryF017;

public interface ShiftWiseSliterWinderProdReportHistoryF017Repo extends JpaRepository<ShiftWiseSliterWinderProdReportHistoryF017,Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.SPUNLACE_SHIFT_WISE_SLITER_WINDER_PRODUCTION_REPORT_HISTORY_F017 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_SHIFT_WISE_SLITER_WINDER_PRODUCTION_REPORT_HISTORY_F017 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo AND VERSION IN (SELECT MAX(VERSION) FROM precot.SPUNLACE_SHIFT_WISE_SLITER_WINDER_PRODUCTION_REPORT_HISTORY_F017 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo)", nativeQuery = true)
	ShiftWiseSliterWinderProdReportHistoryF017 fetchLastSubmittedRecord(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_SHIFT_WISE_SLITER_WINDER_PRODUCTION_REPORT_HISTORY_F017 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo", nativeQuery = true)
	List<ShiftWiseSliterWinderProdReportHistoryF017> fetchHistory(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);
	
	// audit
				@Query(value = "SELECT * FROM precot.SPUNLACE_SHIFT_WISE_SLITER_WINDER_PRODUCTION_REPORT_HISTORY_F017 WHERE "
				        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
				        + "AND (:f017_shift IS NULL OR SHIFT = :f017_shift) "
				        + "AND (:f017_order_no IS NULL OR ORDER_NO = :f017_order_no)", nativeQuery = true)
				List<ShiftWiseSliterWinderProdReportHistoryF017> findByParams17(@Param("from_date") String from_date,
				        @Param("to_date") String to_date,  @Param("f017_shift") String f017_shift,
				        @Param("f017_order_no") String f017_order_no);
}
