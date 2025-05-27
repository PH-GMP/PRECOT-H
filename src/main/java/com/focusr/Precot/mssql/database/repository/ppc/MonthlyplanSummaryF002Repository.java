package com.focusr.Precot.mssql.database.repository.ppc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.PPC.MonthlyplanSummaryF002;
import com.focusr.Precot.mssql.database.model.bleaching.BleachHandSanitizationABPressF41;
import com.focusr.Precot.mssql.database.model.drygoods.GoodsHandSanitationF06;

@Repository
public interface MonthlyplanSummaryF002Repository extends JpaRepository<MonthlyplanSummaryF002, Long> {
	

	    MonthlyplanSummaryF002 findByMonthyear(String Monthyear);

	    @Query(value = "SELECT * FROM precot.PPC_MONTHLY_PLAN_SUMMARY_F002 WHERE ID=:id", nativeQuery = true)
	    MonthlyplanSummaryF002 fetchmonthlyPlanSummaryById(@Param("id") Long id);

	
		@Query(value = "SELECT * FROM precot.PPC_MONTHLY_PLAN_SUMMARY_F002 WHERE ASSISTANT_STATUS='ASSISANT_SAVED' OR PPC_INCHARGE_STATUS != 'INCHARGE_APPROVED' ORDER BY ID DESC", nativeQuery = true)
		List<MonthlyplanSummaryF002> MonthlyplanSummaryforAssistant();

		
		@Query(value = "SELECT * FROM precot.PPC_MONTHLY_PLAN_SUMMARY_F002 WHERE PPC_INCHARGE_STATUS != 'INCHARGE_APPROVED' ORDER BY ID DESC", nativeQuery = true)
		List<MonthlyplanSummaryF002> MonthlyplanSummaryforHod();

		
		@Query(value = "SELECT * FROM precot.PPC_MONTHLY_PLAN_SUMMARY_F002 WHERE (:monthyear IS NULL OR :monthyear='' OR MONTHYEAR=:monthyear)  AND PPC_INCHARGE_STATUS='INCHARGE_APPROVED'", nativeQuery = true)
		List<MonthlyplanSummaryF002> getMonthlyplanSummaryPrint(@Param("monthyear") String monthyear);
		
		
		  @Query("SELECT m FROM MonthlyplanSummaryF002 m WHERE m.monthyear = :monthYear")
		    List<MonthlyplanSummaryF002> findByMonthYear(@Param("monthYear") String monthYear);
		  
		  
			@Query(value = "SELECT * FROM precot.PPC_MONTHLY_PLAN_SUMMARY_F002 WHERE ID=:id", nativeQuery = true)
			MonthlyplanSummaryF002 fetchMontlyPlanById(@Param("id") Long id);
			
			@Query(value = "SELECT TOP 1 note FROM precot.PPC_MONTHLY_PLAN_SUMMARY_F002 ORDER BY ID DESC", nativeQuery = true)
			String findLastNote();


			@Query(value = "SELECT TOP 1 challenges FROM precot.PPC_MONTHLY_PLAN_SUMMARY_F002 ORDER BY ID DESC", nativeQuery = true)
			String findLastchallenges();

	
	
}

