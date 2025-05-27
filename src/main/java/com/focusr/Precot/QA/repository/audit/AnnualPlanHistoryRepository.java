package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.AnnualPlanHistory;
import com.focusr.Precot.QA.model.audit.QaNonConformityReportHistory;

@Repository
public interface AnnualPlanHistoryRepository extends JpaRepository<AnnualPlanHistory, Long> {
	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_ANNUAL_PLAN_HISTORY WHERE YEAR=:year", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("year") String year);

	@Query(value = "SELECT * FROM precot.QA_ANNUAL_PLAN_HISTORY WHERE YEAR = :year ", nativeQuery = true)
	List<AnnualPlanHistory> excelReport(@Param("year") String year);
}
