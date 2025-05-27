package com.focusr.Precot.mssql.database.repository.ppc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.PPC.audit.MonthlyplanSummaryHistoryF_002;
import com.focusr.Precot.mssql.database.model.Store.audit.ReceptionCheckListHistoryF003;



public interface MonthlyplanSummaryHistoryF_002Repository extends JpaRepository<MonthlyplanSummaryHistoryF_002, Long>{

//	@Query("SELECT m FROM precot.PPC_MONTHLY_PLAN_SUMMARY_HISTORY_F002 m WHERE m.monthyear = :monYear ORDER BY m.Id DESC")
//	MonthlyplanSummaryHistoryF_002 findLastSubmittedRecord(@Param("monYear") String monYear);

//	@Query(value = "SELECT * FROM precot.PPC_MONTHLY_PLAN_SUMMARY_HISTORY_F002 WHERE "
//			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) ", nativeQuery = true)
//	List<MonthlyplanSummaryHistoryF_002> findByParams001(@Param("from_date") String from_date,
//			@Param("to_date") String to_date);
	
	@Query(value = "SELECT TOP 1 * FROM precot.PPC_MONTHLY_PLAN_SUMMARY_HISTORY_F002 WHERE MONTHYEAR=:monthyear  ORDER BY ID DESC", nativeQuery = true)
	MonthlyplanSummaryHistoryF_002 findLastSubmittedRecord(@Param("monthyear") String monthyear);

	
	@Query(value = "SELECT MAX(VERSION) FROM precot.PPC_MONTHLY_PLAN_SUMMARY_HISTORY_F002 WHERE MONTHYEAR = :monthyear ", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("monthyear") String monthyear);
	
	

	
	
	
//	@Query(value = "SELECT * FROM precot.PPC_MONTHLY_PLAN_SUMMARY_HISTORY_F002 WHERE DATE BETWEEN :from_date AND :to_date", nativeQuery = true)
//	List<MonthlyplanSummaryHistoryF_002> findByParams001(@Param("from_date") String from_date,
//			@Param("to_date") String to_date);
	
	@Query(value = "SELECT * FROM precot.PPC_MONTHLY_PLAN_SUMMARY_HISTORY_F002 WHERE CONVERT(DATE, [DATE], 105) BETWEEN :from_date AND :to_date", nativeQuery = true)
	List<MonthlyplanSummaryHistoryF_002> findByParams001(@Param("from_date") String from_date, @Param("to_date") String to_date);

	
}

