package com.focusr.Precot.mssql.database.repository.Store.audit;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.GrantedAuthority;

import com.focusr.Precot.mssql.database.model.Store.EyeWashConditionChecklistF009;
import com.focusr.Precot.mssql.database.model.Store.audit.EyeWashConditionChecklistHistoryF009;
import com.focusr.Precot.mssql.database.model.Store.audit.ForkliftMovementCheckListHistoryF008;

public interface EyeWashConditionChecklistHistoryRepoF009  extends JpaRepository<EyeWashConditionChecklistHistoryF009, Long> {

	
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.STORE_EYE_WASH_SHOWER_WORKING_CONDITION_CHECKLIST_HISTORY_F009 WHERE DATE = :date ", nativeQuery = true)
    Optional<Integer> getMaximumVersion(@Param("date") LocalDate date);

	
	@Query(value = "SELECT TOP 1 * FROM precot.STORE_EYE_WASH_SHOWER_WORKING_CONDITION_CHECKLIST_HISTORY_F009 WHERE DATE=:date ORDER BY OPERATOR_SUBMIT_ON DESC", nativeQuery = true)
	EyeWashConditionChecklistHistoryF009 fetchLastSubmittedEyeWashConditionChecklistCheckList(@Param("date") LocalDate date );


//	@Query(value = "SELECT * FROM precot.STORE_EYE_WASH_SHOWER_WORKING_CONDITION_CHECKLIST_HISTORY_F009 e " +
//               "WHERE (:fromDate IS NULL OR e.DATE >= :fromDate) " +
//               "AND (:toDate IS NULL OR e.DATE <= :toDate)", 
//       nativeQuery = true)
//List<EyeWashConditionChecklistHistoryF009> findByParams009(@Param("fromDate") LocalDate fromDate,
//                                                           @Param("toDate") LocalDate toDate);
	
	
	@Query(value = "SELECT * FROM precot.STORE_EYE_WASH_SHOWER_WORKING_CONDITION_CHECKLIST_HISTORY_F009 f " +
            "WHERE (:fromDate IS NULL OR f.DATE >= :fromDate) " +
            "AND (:toDate IS NULL OR f.DATE <= :toDate) " ,nativeQuery = true)
List<EyeWashConditionChecklistHistoryF009> findByParams009(@Param("fromDate") String fromDate,
                                                        @Param("toDate") String toDate);


	
	
	
	

}
