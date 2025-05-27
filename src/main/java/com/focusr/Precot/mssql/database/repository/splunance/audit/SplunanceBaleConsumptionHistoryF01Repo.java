package com.focusr.Precot.mssql.database.repository.splunance.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.audit.SplunanceBaleConsumptionHistoryF01;

public interface SplunanceBaleConsumptionHistoryF01Repo extends JpaRepository<SplunanceBaleConsumptionHistoryF01,Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.SPL_BALE_CONSUMPTION_HISTORY_F01 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT * FROM precot.SPL_BALE_CONSUMPTION_HISTORY_F01 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo AND VERSION IN (SELECT MAX(VERSION) FROM precot.SPL_BALE_CONSUMPTION_HISTORY_F01 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo)", nativeQuery = true)
	SplunanceBaleConsumptionHistoryF01 fetchLastSubmittedRecord(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT * FROM precot.SPL_BALE_CONSUMPTION_HISTORY_F01 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo", nativeQuery = true)
	List<SplunanceBaleConsumptionHistoryF01> fetchHistory(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);

	

	@Query(value = "SELECT * FROM precot.SPL_BALE_CONSUMPTION_HISTORY_F01 WHERE "
	        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
	        + "AND (:f01_shift IS NULL OR SHIFT = :f01_shift) "
	        + "AND (:f01_order_no IS NULL OR ORDER_NO = :f01_order_no)", nativeQuery = true)
	List<SplunanceBaleConsumptionHistoryF01> findByParams01(@Param("from_date") String from_date,
	        @Param("to_date") String to_date,  @Param("f01_shift") String f01_shift,
	        @Param("f01_order_no") String f01_order_no);
			
	
}
