package com.focusr.Precot.mssql.database.repository.Store;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Store.ForkliftMovementCheckListF008;
import com.focusr.Precot.mssql.database.model.Store.NonReturnableGatePassF006;
import com.focusr.Precot.mssql.database.model.Store.audit.ReceptionCheckListHistoryF003;


public interface ForkliftMovementCheckListRepositoryF008 extends JpaRepository<ForkliftMovementCheckListF008, Long> {
	
	@Query(value = "SELECT * FROM precot.STORE_FORKLIFT_MOVEMENT_CHECKLIST_F008 WHERE ID=:id", nativeQuery = true)
	ForkliftMovementCheckListF008 fetchForkliftMovementCheckListById(@Param("id") Long id);

	
	@Query(value = "SELECT TOP 1 * FROM precot.STORE_FORKLIFT_MOVEMENT_CHECKLIST_F008 WHERE DATE=:date AND FORK_LIFT_NO=:forkliftNo ORDER BY STORE_IN_CHARGE_SUBMIT_ON DESC", nativeQuery = true)
	ForkliftMovementCheckListF008 fetchLastSubmittedForkliftMovementCheckList(@Param("date") LocalDate date , @Param("forkliftNo") String forkliftNo);

//	 @Query(value = "SELECT * FROM precot.STORE_FORKLIFT_MOVEMENT_CHECKLIST_F008 WHERE DATE = :date AND STORE_IN_CHARGE_STATUS = 'INCHARGE_APPROVED'", nativeQuery = true)
//	    List<ForkliftMovementCheckListF008> getNonReturnableGatePassByDate(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.STORE_FORKLIFT_MOVEMENT_CHECKLIST_F008 WHERE DATE BETWEEN :fromDate AND :toDate AND STORE_IN_CHARGE_STATUS = 'INCHARGE_APPROVED'", nativeQuery = true)
	List<ForkliftMovementCheckListF008> getNonReturnableGatePassByDate(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	    @Query(value = "SELECT * FROM precot.STORE_FORKLIFT_MOVEMENT_CHECKLIST_F008 WHERE YEAR(DATE) = :year AND MONTH(DATE) = :month AND STORE_IN_CHARGE_STATUS = 'INCHARGE_APPROVED'", nativeQuery = true)
	    List<ForkliftMovementCheckListF008> getNonReturnableGatePassByYearAndMonth(@Param("year") String year, @Param("month") String month);

	    @Query(value = "SELECT * FROM precot.STORE_FORKLIFT_MOVEMENT_CHECKLIST_F008 WHERE YEAR(DATE) = :year AND STORE_IN_CHARGE_STATUS = 'INCHARGE_APPROVED'", nativeQuery = true)
	    List<ForkliftMovementCheckListF008> getNonReturnableGatePassPassByYear(@Param("year") String year);
	    
	    
	    @Query(value = "SELECT * FROM precot.STORE_FORKLIFT_MOVEMENT_CHECKLIST_F008 WHERE OPERATOR_STATUS='OPERATOR_SAVED' OR STORE_IN_CHARGE_STATUS != 'INCHARGE_APPROVED' ORDER BY ID DESC", nativeQuery = true)
		List<ForkliftMovementCheckListF008> ForkliftCheckListforAssistant();

		
		@Query(value = "SELECT * FROM precot.STORE_FORKLIFT_MOVEMENT_CHECKLIST_F008 WHERE STORE_IN_CHARGE_STATUS != 'INCHARGE_APPROVED' ORDER BY ID DESC", nativeQuery = true)
		List<ForkliftMovementCheckListF008> ForkliftCheckListSummaryforHod();


		
		
		@Query(value = "SELECT * FROM precot.STORE_FORKLIFT_MOVEMENT_CHECKLIST_F008 WHERE FORK_LIFT_NO = :forkliftNo AND DATE = :date", nativeQuery = true)
		List<ForkliftMovementCheckListF008> findByForkliftNoAndDate(@Param("forkliftNo") String forkliftNo, @Param("date") String date);

		

	    @Query(value = "SELECT * FROM precot.STORE_FORKLIFT_MOVEMENT_CHECKLIST_F008 WHERE FORK_LIFT_NO = :forkliftNo AND YEAR(DATE) = :year AND MONTH(DATE) = :month AND STORE_IN_CHARGE_STATUS = 'INCHARGE_APPROVED'", nativeQuery = true)
	    List<ForkliftMovementCheckListF008> getByForkliftNoYearAndMonth(@Param("forkliftNo") String forkliftNo, @Param("year") String year, @Param("month") String month);

	    @Query(value = "SELECT * FROM precot.STORE_FORKLIFT_MOVEMENT_CHECKLIST_F008 WHERE FORK_LIFT_NO = :forkliftNo AND YEAR(DATE) = :year AND STORE_IN_CHARGE_STATUS = 'INCHARGE_APPROVED'", nativeQuery = true)
	    List<ForkliftMovementCheckListF008> getByForkliftNoAndYear(@Param("forkliftNo") String forkliftNo, @Param("year") String year);

	    @Query(value = "SELECT * FROM precot.STORE_FORKLIFT_MOVEMENT_CHECKLIST_F008 WHERE FORK_LIFT_NO = :forkliftNo AND STORE_IN_CHARGE_STATUS = 'INCHARGE_APPROVED'", nativeQuery = true)
	    List<ForkliftMovementCheckListF008> getByForkliftNo(@Param("forkliftNo") String forkliftNo);

	    @Query(value = "SELECT * FROM precot.STORE_FORKLIFT_MOVEMENT_CHECKLIST_F008 WHERE DATE BETWEEN :fromDate AND :toDate AND STORE_IN_CHARGE_STATUS = 'INCHARGE_APPROVED'", nativeQuery = true)
	    List<ForkliftMovementCheckListF008> getByDateRange(@Param("fromDate") String fromDate, @Param("toDate") String toDate);

	    @Query(value = "SELECT * FROM precot.STORE_FORKLIFT_MOVEMENT_CHECKLIST_F008 WHERE YEAR(DATE) = :year AND MONTH(DATE) = :month AND STORE_IN_CHARGE_STATUS = 'INCHARGE_APPROVED'", nativeQuery = true)
	    List<ForkliftMovementCheckListF008> getByYearAndMonth(@Param("year") String year, @Param("month") String month);

	    @Query(value = "SELECT * FROM precot.STORE_FORKLIFT_MOVEMENT_CHECKLIST_F008 WHERE YEAR(DATE) = :year AND STORE_IN_CHARGE_STATUS = 'INCHARGE_APPROVED'", nativeQuery = true)
	    List<ForkliftMovementCheckListF008> getByYear(@Param("year") String year);
	



}
