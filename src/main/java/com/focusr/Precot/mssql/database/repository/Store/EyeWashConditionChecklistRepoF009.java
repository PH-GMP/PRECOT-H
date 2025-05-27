package com.focusr.Precot.mssql.database.repository.Store;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Store.EyeWashConditionChecklistF009;
import com.focusr.Precot.mssql.database.model.Store.ForkliftMovementCheckListF008;


public interface EyeWashConditionChecklistRepoF009   extends JpaRepository<EyeWashConditionChecklistF009, Long>  {
	
	
	@Query(value = "SELECT * FROM precot.STORE_EYE_WASH_SHOWER_WORKING_CONDITION_CHECKLIST_F009 WHERE ID=:id", nativeQuery = true)
	EyeWashConditionChecklistF009 fetchEyeWashConditionChecklistById(@Param("id") Long id);
	

	
	@Query(value = "SELECT TOP 1 * FROM precot.STORE_EYE_WASH_SHOWER_WORKING_CONDITION_CHECKLIST_F009 WHERE DATE=:date ORDER BY STORE_IN_CHARGE_SUBMIT_ON DESC", nativeQuery = true)
	EyeWashConditionChecklistF009 fetchLastSubmittedEyeWashConditionChecklistCheckList(@Param("date") LocalDate date );



//	 @Query(value = "SELECT * FROM precot.STORE_EYE_WASH_SHOWER_WORKING_CONDITION_CHECKLIST_F009 WHERE DATE = :date AND STORE_IN_CHARGE_STATUS = 'INCHARGE_APPROVED'", nativeQuery = true)
//	    List<EyeWashConditionChecklistF009> getEyeWashCheckListByDate(@Param("date") String date);
	
//	CR
	@Query(value = "SELECT * FROM precot.STORE_EYE_WASH_SHOWER_WORKING_CONDITION_CHECKLIST_F009 WHERE DATE BETWEEN :fromDate AND :toDate AND STORE_IN_CHARGE_STATUS = 'INCHARGE_APPROVED'", nativeQuery = true)
	List<EyeWashConditionChecklistF009> getEyeWashCheckListByDateRange(@Param("fromDate") String fromDate, @Param("toDate") String toDate);


	    @Query(value = "SELECT * FROM precot.STORE_EYE_WASH_SHOWER_WORKING_CONDITION_CHECKLIST_F009 WHERE YEAR(DATE) = :year AND MONTH(DATE) = :month AND STORE_IN_CHARGE_STATUS = 'INCHARGE_APPROVED'", nativeQuery = true)
	    List<EyeWashConditionChecklistF009> getEyeWashCheckListByYearAndMonth(@Param("year") String year, @Param("month") String month);

	    @Query(value = "SELECT * FROM precot.STORE_EYE_WASH_SHOWER_WORKING_CONDITION_CHECKLIST_F009 WHERE YEAR(DATE) = :year AND STORE_IN_CHARGE_STATUS = 'INCHARGE_APPROVED'", nativeQuery = true)
	    List<EyeWashConditionChecklistF009> getEyeWashCheckListByYear(@Param("year") String year);



		 @Query(value = "SELECT * FROM precot.STORE_EYE_WASH_SHOWER_WORKING_CONDITION_CHECKLIST_F009 WHERE OPERATOR_STATUS='OPERATOR_SAVED' OR STORE_IN_CHARGE_STATUS != 'INCHARGE_APPROVED' ORDER BY ID DESC", nativeQuery = true)
		List<EyeWashConditionChecklistF009> EyeWashCheckListforAssistant();

		
		@Query(value = "SELECT * FROM precot.STORE_EYE_WASH_SHOWER_WORKING_CONDITION_CHECKLIST_F009 WHERE STORE_IN_CHARGE_STATUS != 'INCHARGE_APPROVED' ORDER BY ID DESC", nativeQuery = true)
		List<EyeWashConditionChecklistF009> EyeWashCheckListforHod();



		@Query(value = "SELECT * FROM precot.STORE_EYE_WASH_SHOWER_WORKING_CONDITION_CHECKLIST_F009 WHERE DATE = :date", nativeQuery = true)
		List<EyeWashConditionChecklistF009> findByWashChecklistDate(@Param("date") String date);

	
	

}
