package com.focusr.Precot.mssql.database.repository.Store.audit;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.GrantedAuthority;

import com.focusr.Precot.mssql.database.model.Store.NonReturnableGatePassF006;
import com.focusr.Precot.mssql.database.model.Store.audit.NonReturnableGatePassHistoryF006;
import com.focusr.Precot.mssql.database.model.Store.audit.ReceptionCheckListHistoryF003;



public interface NonReturnableGatePassHistoryRepositoryF006 extends JpaRepository<NonReturnableGatePassHistoryF006, Long> {

		@Query(value = "SELECT TOP 1 * FROM precot.STORE_NON_RETURNABLE_GATE_PASS_HISTORY_F006 WHERE GATE_PASS_NO=:gatePassNo  ORDER BY HOD_SUBMIT_ON DESC", nativeQuery = true)
		NonReturnableGatePassHistoryF006 fetchLastSubmittedNonReturnableGate(@Param("gatePassNo") String gatePassNo);

		@Query(value = "SELECT MAX(VERSION) FROM precot.STORE_NON_RETURNABLE_GATE_PASS_HISTORY_F006 WHERE GATE_PASS_NO = :gatePassNo ", nativeQuery = true)
	    Optional<Integer> getMaximumVersion(@Param("gatePassNo") String gatePassNo);

//	
		
//		@Query(value = "SELECT ng FROM precot.STORE_NON_RETURNABLE_GATE_PASS_HISTORY_F006 ng " +
//	               "WHERE (:fromDate IS NULL OR ng.date >= :fromDate) " +
//	               "AND (:toDate IS NULL OR ng.date <= :toDate) " +
//	               "AND (:GATE_PASS_NO IS NULL OR ng.GATE_PASS_NO = :gatePassNo)",nativeQuery = true)
//	List<NonReturnableGatePassHistoryF006> findByParams002(
//	        @Param("fromDate") Date fromDate,
//	        @Param("toDate") Date toDate,
//	        @Param("gatePassNo") String gatePassNo);




//		@Query(value = "SELECT * FROM precot.STORE_NON_RETURNABLE_GATE_PASS_HISTORY_F006  " +
//			       "WHERE (:fromDate IS NULL OR date >= :fromDate) " +
//			       "AND (:toDate IS NULL OR date <= :toDate) " +
//			       "AND (:gatePassNo IS NULL OR GATE_PASS_NO = :gatePassNo)", nativeQuery = true)
//			List<NonReturnableGatePassHistoryF006> findByParams002(
//			        @Param("fromDate") Date fromDate,
//			        @Param("toDate") Date toDate,
//			        @Param("gatePassNo") String gatePassNo);
		
		
//		@Query(value = "SELECT * FROM precot.STORE_NON_RETURNABLE_GATE_PASS_HISTORY_F006  " +
//	               "WHERE (:fromDate IS NULL OR [date] >= :fromDate) " + // Use square brackets for date if it's a reserved word
//	               "AND (:toDate IS NULL OR [date] <= :toDate) " +
//	               "AND (:gatePassNo IS NULL OR GATE_PASS_NO = :gatePassNo)", nativeQuery = true)
//	List<NonReturnableGatePassHistoryF006> findByParams002(
//	        @Param("fromDate") Date fromDate,
//	        @Param("toDate") Date toDate,
//	        @Param("gatePassNo") String gatePassNo);
		
//		@Query(value = "SELECT * FROM precot.STORE_NON_RETURNABLE_GATE_PASS_HISTORY_F006  " +
//	               "WHERE (:fromDate IS NULL OR :fromDate = '' OR [date] >= CAST(:fromDate AS DATE)) " +
//	               "AND (:toDate IS NULL OR :toDate = '' OR [date] <= CAST(:toDate AS DATE)) " +
//	               "AND (:gatePassNo IS NULL OR GATE_PASS_NO = :gatePassNo)", nativeQuery = true)
//	List<NonReturnableGatePassHistoryF006> findByParams002(
//	        @Param("fromDate") String fromDate,
//	        @Param("toDate") String toDate,
//	        @Param("gatePassNo") String gatePassNo);

//		@Query(value = "SELECT * FROM precot.STORE_NON_RETURNABLE_GATE_PASS_HISTORY_F006 " +
//	               "WHERE (:fromDate IS NULL OR [date] >= :fromDate) " +
//	               "AND (:toDate IS NULL OR [date] <= :toDate) " +
//	               "AND (:gatePassNo IS NULL OR GATE_PASS_NO = :gatePassNo)", nativeQuery = true)
//	List<NonReturnableGatePassHistoryF006> findByParams002(
//	        @Param("fromDate") String fromDate,
//	        @Param("toDate") String toDate,
//	        @Param("gatePassNo") String gatePassNo);

		
//		@Query(value = "SELECT * FROM precot.STORE_NON_RETURNABLE_GATE_PASS_HISTORY_F006 WHERE "
//		        + "(CAST(DATE AS DATE) BETWEEN :fromDate AND :toDate) "
//		        + "AND (:gatePassNo IS NULL OR GATE_PASS_NO = :gatePassNo)", nativeQuery = true)
//		List<NonReturnableGatePassHistoryF006> findByDateRangeAndGatePass(
//		        @Param("fromDate") String fromDate, 
//		        @Param("toDate") String toDate,
//		        @Param("gatePassNo") String gatePassNo);
		
		
		@Query(value = "SELECT * FROM precot.STORE_NON_RETURNABLE_GATE_PASS_HISTORY_F006 WHERE "
		        + "(:fromDate IS NULL OR :toDate IS NULL OR CAST(DATE AS DATE) BETWEEN :fromDate AND :toDate) "
		        + "AND (:gatePassNo IS NULL OR GATE_PASS_NO = :gatePassNo)", nativeQuery = true)
		List<NonReturnableGatePassHistoryF006> findByDateRangeAndGatePass(
		        @Param("fromDate") String fromDate, 
		        @Param("toDate") String toDate,
		        @Param("gatePassNo") String gatePassNo);
		
		
		@Query(value = "SELECT * FROM precot.STORE_NON_RETURNABLE_GATE_PASS_HISTORY_F006 f " +
		        "WHERE (:fromDate IS NULL OR f.DATE >= CAST(:fromDate AS DATE)) " +
		        "AND (:toDate IS NULL OR f.DATE <= CAST(:toDate AS DATE)) " +
		        "AND (:gatePassNo IS NULL OR f.GATE_PASS_NO = :gatePassNo) ",  nativeQuery = true)
		List<NonReturnableGatePassHistoryF006> findByParams003(
		  @Param("fromDate") LocalDate fromDate,
		  @Param("toDate") LocalDate toDate,
		  @Param("gatePassNo") String gatePassNo);



		
		
		
		
		
		
}
