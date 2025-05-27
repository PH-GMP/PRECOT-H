package com.focusr.Precot.mssql.database.repository.Store;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Store.NonReturnableGatePassF006;

public interface NonReturnableGatePassRepositoryF006 extends JpaRepository<NonReturnableGatePassF006, Long> {

	@Query(value = "SELECT * FROM precot.STORE_NON_RETURNABLE_GATE_PASS_F006 WHERE ID=:id", nativeQuery = true)
	NonReturnableGatePassF006 fetchNonReturnableGateById(@Param("id") Long id);

	@Query(value = "SELECT TOP 1 * FROM precot.STORE_NON_RETURNABLE_GATE_PASS_F006 WHERE GATE_PASS_NO=:gatePassNo  ORDER BY HOD_SUBMIT_ON DESC", nativeQuery = true)
	NonReturnableGatePassF006 fetchLastSubmittedNonReturnableGate(@Param("gatePassNo") String gatePassNo);

	@Query(value = "SELECT * FROM precot.STORE_NON_RETURNABLE_GATE_PASS_F006 WHERE STORE_INCHARGE_STATUS='INCHARGE_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<NonReturnableGatePassF006> NonReturnableSummaryforAssistant();

	@Query(value = "SELECT * FROM precot.STORE_NON_RETURNABLE_GATE_PASS_F006 WHERE HOD_STATUS != 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<NonReturnableGatePassF006> NonReturnableSummaryforHod();

	@Query(value = "SELECT * FROM precot.STORE_NON_RETURNABLE_GATE_PASS_F006 WHERE GATE_PASS_NO = :gatePassNo", nativeQuery = true)
	List<NonReturnableGatePassF006> findByNonReturnable(@Param("gatePassNo") String gatePassNo);

	@Query(value = "SELECT * FROM precot.STORE_NON_RETURNABLE_GATE_PASS_F006 WHERE  DATE=:date AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<NonReturnableGatePassF006> getNonReturnablePrint(@Param("date") String date);

//	@Query(value = "SELECT * FROM precot.STORE_NON_RETURNABLE_GATE_PASS_F006 WHERE DATE = :date AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
//	List<NonReturnableGatePassF006> getNonReturnableGatePassByDate(@Param("date") String date);
//
//	@Query(value = "SELECT * FROM precot.STORE_NON_RETURNABLE_GATE_PASS_F006 WHERE YEAR(DATE) = :year AND MONTH(DATE) = :month AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
//	List<NonReturnableGatePassF006> getNonReturnableGatePassByYearAndMonth(@Param("year") String year,
//			@Param("month") String month);
//
	@Query(value = "SELECT * FROM precot.STORE_NON_RETURNABLE_GATE_PASS_F006 WHERE YEAR(DATE) = :year AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<NonReturnableGatePassF006> getNonReturnableGatePassByYear(@Param("year") String year);

	
	
	
//	    @Query(value = "SELECT TOP 1 ngp.gate_pass_no FROM precot.STORE_NON_RETURNABLE_GATE_PASS_F006 ngp " +
//	               "WHERE ngp.store_incharge_saved_on IS NOT NULL OR ngp.store_incharge_submit_on IS NOT NULL " +
//	               "ORDER BY ngp.store_incharge_saved_on DESC, ngp.store_incharge_submit_on DESC", 
//	               nativeQuery = true)
//	String findLatestGatePassNo();

//	    @Query(value = "SELECT TOP 1 ngp.gate_pass_no FROM precot.STORE_NON_RETURNABLE_GATE_PASS_F006 ngp " +
//	               "WHERE ngp.store_incharge_saved_on IS NOT NULL OR ngp.store_incharge_submit_on IS NOT NULL " +
//	               "ORDER BY CASE " +
//	               "           WHEN ngp.store_incharge_submit_on IS NOT NULL AND ngp.store_incharge_saved_on IS NOT NULL " +
//	               "           THEN GREATEST(CAST(ngp.store_incharge_submit_on AS DATETIME), CAST(ngp.store_incharge_saved_on AS DATETIME)) " +
//	               "           ELSE COALESCE(CAST(ngp.store_incharge_submit_on AS DATETIME), CAST(ngp.store_incharge_saved_on AS DATETIME)) " +
//	               "         END DESC", 
//	               nativeQuery = true)
//	String findLatestGatePassNo();

//	    @Query(value = "SELECT  TOP 1 GATE_PASS_NO FROM precot.STORE_NON_RETURNABLE_GATE_PASS_F006 ORDER BY ID DESC", nativeQuery = true)
//	    NonReturnableGatePassF006 findLastgatepassnO();

	@Query(value = "SELECT TOP 1 ngp.GATE_PASS_NO FROM precot.STORE_NON_RETURNABLE_GATE_PASS_F006 ngp ORDER BY ngp.GATE_PASS_NO DESC", nativeQuery = true)
	String findLastgatepassnO();

	@Query(value = "SELECT GATE_PASS_NO FROM precot.STORE_NON_RETURNABLE_GATE_PASS_F006 ", nativeQuery = true)
	List<String> findAllGatePassNos();
	
	
	@Query(value = "SELECT * FROM precot.STORE_NON_RETURNABLE_GATE_PASS_F006 WHERE DATE BETWEEN :fromDate AND :toDate AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<NonReturnableGatePassF006> getNonReturnableGatePassByDateRange(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	@Query(value = "SELECT * FROM precot.STORE_NON_RETURNABLE_GATE_PASS_F006 WHERE YEAR(DATE) = :year AND MONTH(DATE) = :month AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<NonReturnableGatePassF006> getNonReturnableGatePassByYearAndMonth(@Param("year") String year, @Param("month") String month);


}
