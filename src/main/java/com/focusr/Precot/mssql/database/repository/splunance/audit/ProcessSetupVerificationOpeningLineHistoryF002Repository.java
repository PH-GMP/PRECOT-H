package com.focusr.Precot.mssql.database.repository.splunance.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import com.focusr.Precot.mssql.database.model.splunance.audit.ProcessSetupVerificationOpeningLineHistoryF002;

@Repository
public interface ProcessSetupVerificationOpeningLineHistoryF002Repository extends JpaRepository<ProcessSetupVerificationOpeningLineHistoryF002, Long>  {

	@Query(value = "SELECT MAX(VERSION) FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_OPENING_LINE_HISTORY_F002 WHERE ORDER_NO=:orderNo", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("orderNo") String orderNo);

	
	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_OPENING_LINE_HISTORY_F002 WHERE ORDER_NO=:orderNo AND VERSION IN (SELECT MAX(VERSION) FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_OPENING_LINE_HISTORY_F002 WHERE ORDER_NO=:orderNo)", nativeQuery = true)
	ProcessSetupVerificationOpeningLineHistoryF002 fetchLastSubmittedRecord(@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_OPENING_LINE_HISTORY_F002 WHERE ORDER_NO=:orderNo", nativeQuery = true)
	List<ProcessSetupVerificationOpeningLineHistoryF002> fetchHistory(@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_OPENING_LINE_HISTORY_F002 WHERE "
	        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
	        + "AND (:f02_shift IS NULL OR SHIFT = :f02_shift) "
	        + "AND (:f02_order_no IS NULL OR ORDER_NO = :f02_order_no)", nativeQuery = true)
	List<ProcessSetupVerificationOpeningLineHistoryF002> findByParams02(@Param("from_date") String from_date,
	        @Param("to_date") String to_date,  @Param("f02_shift") String f02_shift,
	        @Param("f02_order_no") String f02_order_no);
	
}
