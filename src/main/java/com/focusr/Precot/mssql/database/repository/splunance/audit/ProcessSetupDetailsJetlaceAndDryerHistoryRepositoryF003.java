package com.focusr.Precot.mssql.database.repository.splunance.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.splunance.audit.ProcessSetupDetailsJetlaceAndDryerHistoryF003;




@Repository
public interface ProcessSetupDetailsJetlaceAndDryerHistoryRepositoryF003 extends JpaRepository<ProcessSetupDetailsJetlaceAndDryerHistoryF003, Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_JETLACE_AND_DRYER_HISTORY_F003 WHERE ORDER_NO=:orderNo", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("orderNo") String orderNo);

	
	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_JETLACE_AND_DRYER_HISTORY_F003 WHERE ORDER_NO=:orderNo AND VERSION IN (SELECT MAX(VERSION) FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_JETLACE_AND_DRYER_HISTORY_F003 WHERE ORDER_NO=:orderNo)", nativeQuery = true)
	ProcessSetupDetailsJetlaceAndDryerHistoryF003 fetchLastSubmittedRecord(@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_JETLACE_AND_DRYER_HISTORY_F003 WHERE ORDER_NO=:orderNo", nativeQuery = true)
	List<ProcessSetupDetailsJetlaceAndDryerHistoryF003> fetchHistory(@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_PROCESS_SETUP_DETAILS_JETLACE_AND_DRYER_HISTORY_F003 WHERE "
	        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
	        + "AND (:f03_shift IS NULL OR SHIFT = :f03_shift) "
	        + "AND (:f03_order_no IS NULL OR ORDER_NO = :f03_order_no)", nativeQuery = true)
	List<ProcessSetupDetailsJetlaceAndDryerHistoryF003> findByParams03(@Param("from_date") String from_date,
	        @Param("to_date") String to_date,  @Param("f03_shift") String f03_shift,
	        @Param("f03_order_no") String f03_order_no);
	
}
