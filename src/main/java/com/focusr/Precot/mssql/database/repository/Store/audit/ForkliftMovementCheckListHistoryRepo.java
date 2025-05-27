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

import com.focusr.Precot.mssql.database.model.Store.ForkliftMovementCheckListF008;
import com.focusr.Precot.mssql.database.model.Store.audit.ForkliftMovementCheckListHistoryF008;
import com.focusr.Precot.mssql.database.model.Store.audit.NonReturnableGatePassHistoryF006;



public interface ForkliftMovementCheckListHistoryRepo extends JpaRepository<ForkliftMovementCheckListHistoryF008, Long>{

	
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.STORE_FORKLIFT_MOVEMENT_CHECKLIST_HISTORY_F008 WHERE FORK_LIFT_NO = :forkliftNo AND DATE = :date AND MONTH = :month AND YEAR = :year", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("forkliftNo") String forkliftNo,@Param("date") LocalDate Date,@Param("month") String month,@Param("year") String year);

//		@Query(value = "SELECT TOP 1 * FROM precot.STORE_FORKLIFT_MOVEMENT_CHECKLIST_HISTORY_F008 WHERE DATE=:date AND FORK_LIFT_NO=:forkliftNo ORDER BY STORE_IN_CHARGE_SUBMIT_ON DESC", nativeQuery = true)
//	ForkliftMovementCheckListHistoryF008 fetchLastSubmittedForkliftMovementCheckList(@Param("date") LocalDate date , @Param("forkliftNo") String forkliftNo);
	
	@Query(value = "SELECT TOP 1 * FROM precot.STORE_FORKLIFT_MOVEMENT_CHECKLIST_HISTORY_F008 WHERE DATE=:date AND FORK_LIFT_NO=:forkliftNo ORDER BY OPERATOR_SUBMIT_ON DESC", nativeQuery = true)
	ForkliftMovementCheckListHistoryF008 fetchLastSubmittedForkliftMovementCheckList(@Param("date") LocalDate date , @Param("forkliftNo") String forkliftNo);

	

		

	@Query(value = "SELECT * FROM precot.STORE_FORKLIFT_MOVEMENT_CHECKLIST_HISTORY_F008 f " +
            "WHERE (:fromDate IS NULL OR f.DATE >= :fromDate) " +
            "AND (:toDate IS NULL OR f.DATE <= :toDate) " +
            "AND (:forkliftNo IS NULL OR f.FORK_LIFT_NO = :forkliftNo)",nativeQuery = true)
List<ForkliftMovementCheckListHistoryF008> findByParams008(@Param("fromDate") LocalDate fromDate,
                                                        @Param("toDate") LocalDate toDate,
                                                        @Param("forkliftNo") String forkliftNo);
	
	
	@Query(value = "SELECT * FROM precot.STORE_FORKLIFT_MOVEMENT_CHECKLIST_HISTORY_F008 f " +
	        "WHERE (:fromDate IS NULL OR f.DATE >= CAST(:fromDate AS DATE)) " +
	        "AND (:toDate IS NULL OR f.DATE <= CAST(:toDate AS DATE)) " +
	        "AND (:forkliftNo IS NULL OR f.FORK_LIFT_NO = :forkliftNo) ",  nativeQuery = true)
	List<ForkliftMovementCheckListHistoryF008> findByParams003(
	  @Param("fromDate") LocalDate fromDate,
	  @Param("toDate") LocalDate toDate,
	  @Param("forkliftNo") String forkliftNo);
	
	
}


	






