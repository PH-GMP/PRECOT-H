package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.AnnualPlan;


@Repository
public interface AnnualPlanRepository extends JpaRepository<AnnualPlan, Long> {
	@Query(value = "SELECT * FROM precot.QA_ANNUAL_PLAN WHERE YEAR = :year AND MR_STATUS = 'MR_SUBMITTED'", nativeQuery = true)
	List<AnnualPlan> printParam(@Param("year") String year);

	@Query(value = "SELECT * FROM precot.QA_ANNUAL_PLAN WHERE YEAR = :year", nativeQuery = true)
	AnnualPlan getdetailsbyParam(@Param("year") String year);

	@Query(value = "SELECT * FROM precot.QA_ANNUAL_PLAN  WHERE MR_STATUS = 'MR_SAVED' ORDER BY ID DESC", nativeQuery = true)
	List<AnnualPlan> mrSummary();
	
}
