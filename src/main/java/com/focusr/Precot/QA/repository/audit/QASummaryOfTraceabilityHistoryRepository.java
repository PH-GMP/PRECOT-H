package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.audit.QASummaryOfTraceabilityHistory;

public interface QASummaryOfTraceabilityHistoryRepository extends JpaRepository<QASummaryOfTraceabilityHistory, Long> {
	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_SUMMARY_OF_TRACEBILITY_HISTORY WHERE DATE=:date AND DEPARTMENT =:department AND BMR_NO =:bmrNo", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("department") String department,@Param("bmrNo") String bmrNo);

	@Query(value = "SELECT * FROM precot.QA_SUMMARY_OF_TRACEBILITY_HISTORY WHERE DATE = :date AND DEPARTMENT = :department AND BMR_NO = :bmrNo AND VERSION = (SELECT MAX(VERSION) FROM precot.QA_SUMMARY_OF_TRACEBILITY_HISTORY WHERE DATE = :date AND DEPARTMENT = :department AND BMR_NO = :bmrNo)", nativeQuery = true)
	QASummaryOfTraceabilityHistory fetchLastSubmittedRecord(@Param("date") String date, @Param("department") String department, @Param("bmrNo") String bmrNo);

	@Query(value = "SELECT * FROM precot.QA_SUMMARY_OF_TRACEBILITY_HISTORY WHERE "
			+ " (:department IS NULL OR :department='' OR DEPARTMENT=:department)"
			+" AND (:bmrNo IS NULL OR :bmrNo='' OR BMR_NO=:bmrNo)"
			+ " AND (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date) ", nativeQuery = true)
	List<QASummaryOfTraceabilityHistory> excelReport(@Param("from_date") String from_date,
			@Param("to_date") String to_date,@Param("department") String department, @Param("bmrNo") String bmrNo);

	
}
