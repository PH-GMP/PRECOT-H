package com.focusr.Precot.mssql.database.repository.splunance.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.audit.ProcessSetupDetailsWinterHistoryF005;

public interface ProcessSetupDetailsWinterHistoryF005Repository  extends JpaRepository<ProcessSetupDetailsWinterHistoryF005, Long>{
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_WINTER_HISTORY_F005 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date, @Param("shift") String shift,
			@Param("orderNo") String orderNo);
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_WINTER_HISTORY_F005 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo AND VERSION IN (SELECT MAX(VERSION) FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_WINTER_HISTORY_F005 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo)", nativeQuery = true)
	ProcessSetupDetailsWinterHistoryF005 fetchLastSubmittedRecord(@Param("date") String date, @Param("shift") String shift,
			@Param("orderNo") String orderNo);

	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_WINTER_HISTORY_F005 WHERE "
	        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
	        + "AND (:f05_shift IS NULL OR SHIFT = :f05_shift) "
	        + "AND (:f05_order_no IS NULL OR ORDER_NO = :f05_order_no)", nativeQuery = true)
	List<ProcessSetupDetailsWinterHistoryF005> findByParams05(@Param("from_date") String from_date,
	        @Param("to_date") String to_date,  @Param("f05_shift") String f05_shift,
	        @Param("f05_order_no") String f05_order_no);
	
	
	
}
