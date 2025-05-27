package com.focusr.Precot.QA.repository.audit;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.CorrectiveActionReportHistory;
@Repository
public interface CorrectiveActionReportHistoryRepo extends JpaRepository<CorrectiveActionReportHistory,Long> {
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_CORRECTIVE_ACTION_REPORT_HISTORY WHERE REPORT_DATE =:reportDate", nativeQuery = true)
	Optional<Integer> getMaximumVersion1(@Param("reportDate") LocalDate reportDate);
	
	@Query(value = "SELECT * FROM precot.QA_CORRECTIVE_ACTION_REPORT_HISTORY"
			+ " WHERE REPORT_DATE =:reportDate AND "
			+ "VERSION IN "
			+ "(SELECT MAX(VERSION) FROM precot.QA_CORRECTIVE_ACTION_REPORT_HISTORY WHERE REPORT_DATE =:reportDate)", nativeQuery = true)
	CorrectiveActionReportHistory fetchLastSubmittedRecord(@Param("reportDate") LocalDate reportDate);
//1	
//	@Query(value = "SELECT * FROM precot.QA_CORRECTIVE_ACTION_REPORT_HISTORY WHERE (:reportDate IS NULL OR :reportDate='' OR REPORT_DATE=:reportDate)", nativeQuery = true)
//	List<CorrectiveActionReportHistory> excelReport(@Param("reportDate") String reportDate);
//2	
//	@Query(value = "SELECT * FROM precot.QA_CORRECTIVE_ACTION_REPORT_HISTORY WHERE "
//			+ "(:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR REPORT_DATE BETWEEN :from_date AND :to_date) ", nativeQuery = true)
//	List<CorrectiveActionReportHistory> excelReport(@Param("from_date") String from_date,
//			@Param("to_date") String to_date);
	
	@Query(value = "SELECT * FROM precot.QA_CORRECTIVE_ACTION_REPORT_HISTORY WHERE "
			+ "((:from_date IS NULL OR :from_date = '') AND (:to_date IS NULL OR :to_date = '') "
			+ "OR (REPORT_DATE BETWEEN :from_date AND :to_date))", nativeQuery = true)
	List<CorrectiveActionReportHistory> excelReport(@Param("from_date") String from_date,
			@Param("to_date") String to_date);

}