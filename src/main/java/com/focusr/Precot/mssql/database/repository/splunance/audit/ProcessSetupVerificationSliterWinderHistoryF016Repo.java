package com.focusr.Precot.mssql.database.repository.splunance.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.audit.ProcessSetupVerificationSliterWinderHistoryF016;

public interface ProcessSetupVerificationSliterWinderHistoryF016Repo extends JpaRepository<ProcessSetupVerificationSliterWinderHistoryF016,Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_SLITER_WINDER_HISTORY_F016 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_SLITER_WINDER_HISTORY_F016 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo AND VERSION IN (SELECT MAX(VERSION) FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_SLITER_WINDER_HISTORY_F016 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo)", nativeQuery = true)
	ProcessSetupVerificationSliterWinderHistoryF016 fetchLastSubmittedRecord(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_SLITER_WINDER_HISTORY_F016 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo", nativeQuery = true)
	List<ProcessSetupVerificationSliterWinderHistoryF016> fetchHistory(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);

	// audit
			@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_SLITER_WINDER_HISTORY_F016 WHERE "
			        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
			        + "AND (:f016_shift IS NULL OR SHIFT = :f016_shift) "
			        + "AND (:f016_order_no IS NULL OR ORDER_NO = :f016_order_no)", nativeQuery = true)
			List<ProcessSetupVerificationSliterWinderHistoryF016> findByParams16(@Param("from_date") String from_date,
			        @Param("to_date") String to_date,  @Param("f016_shift") String f016_shift,
			        @Param("f016_order_no") String f016_order_no);
}
