package com.focusr.Precot.mssql.database.repository.splunance.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.audit.ProcessSetupVerificationRpBalePressHistoryF013;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceShiftWiseRPProdSupportHistoryF14;

public interface SpunlaceShiftWiseRPProdSupportHistoryF14Repo extends JpaRepository<SpunlaceShiftWiseRPProdSupportHistoryF14,Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.SHIFT_WISE_RP_PROD_SUPPORT_HISTORY_F14 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT * FROM precot.SHIFT_WISE_RP_PROD_SUPPORT_HISTORY_F14 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo AND VERSION IN (SELECT MAX(VERSION) FROM precot.SHIFT_WISE_RP_PROD_SUPPORT_HISTORY_F14 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo)", nativeQuery = true)
	SpunlaceShiftWiseRPProdSupportHistoryF14 fetchLastSubmittedRecord(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT * FROM precot.SHIFT_WISE_RP_PROD_SUPPORT_HISTORY_F14 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo", nativeQuery = true)
	List<SpunlaceShiftWiseRPProdSupportHistoryF14> fetchHistory(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);
	
	// audit
			@Query(value = "SELECT * FROM precot.SHIFT_WISE_RP_PROD_SUPPORT_HISTORY_F14 WHERE "
			        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
			        + "AND (:f014_shift IS NULL OR SHIFT = :f014_shift) "
			        + "AND (:f014_order_no IS NULL OR ORDER_NO = :f014_order_no)", nativeQuery = true)
			List<SpunlaceShiftWiseRPProdSupportHistoryF14> findByParams14(@Param("from_date") String from_date,
			        @Param("to_date") String to_date,  @Param("f014_shift") String f014_shift,
			        @Param("f014_order_no") String f014_order_no);
}
