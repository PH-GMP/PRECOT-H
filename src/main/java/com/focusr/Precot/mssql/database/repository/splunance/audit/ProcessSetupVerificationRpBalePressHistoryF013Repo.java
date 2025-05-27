package com.focusr.Precot.mssql.database.repository.splunance.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.audit.ProcessSetupVerificationRpBalePressHistoryF013;


public interface ProcessSetupVerificationRpBalePressHistoryF013Repo extends JpaRepository<ProcessSetupVerificationRpBalePressHistoryF013,Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_RP_BALEPRESS_HISTORY_F013 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_RP_BALEPRESS_HISTORY_F013 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo AND VERSION IN (SELECT MAX(VERSION) FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_RP_BALEPRESS_HISTORY_F013 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo)", nativeQuery = true)
	ProcessSetupVerificationRpBalePressHistoryF013 fetchLastSubmittedRecord(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_RP_BALEPRESS_HISTORY_F013 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO=:orderNo", nativeQuery = true)
	List<ProcessSetupVerificationRpBalePressHistoryF013> fetchHistory(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);
	
	// audit
		@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_VERIFICATION_RP_BALEPRESS_HISTORY_F013 WHERE "
		        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
		        + "AND (:f013_shift IS NULL OR SHIFT = :f013_shift) "
		        + "AND (:f013_order_no IS NULL OR ORDER_NO = :f013_order_no)", nativeQuery = true)
		List<ProcessSetupVerificationRpBalePressHistoryF013> findByParams13(@Param("from_date") String from_date,
		        @Param("to_date") String to_date,  @Param("f013_shift") String f013_shift,
		        @Param("f013_order_no") String f013_order_no);

}
