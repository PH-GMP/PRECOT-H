package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.SupplierAuditPlanHistory;
import com.focusr.Precot.QA.model.audit.TrainingCalendarHistory;

@Repository
public interface TrainingCalendarHistoryRepo extends JpaRepository<TrainingCalendarHistory,Long> {
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_TRAINING_CALENDAR_HISTORY WHERE YEAR =:year", nativeQuery = true)
	Optional<Integer> getMaximumVersion1(@Param("year") String year);
	
	@Query(value = "SELECT * FROM precot.QA_TRAINING_CALENDAR_HISTORY"
			+ " WHERE YEAR =:year AND "
			+ "VERSION IN "
			+ "(SELECT MAX(VERSION) FROM precot.QA_TRAINING_CALENDAR_HISTORY WHERE YEAR =:year)", nativeQuery = true)
	TrainingCalendarHistory fetchLastSubmittedRecord(@Param("year") String year);
	
	
	@Query(value = "SELECT * FROM precot.QA_TRAINING_CALENDAR_HISTORY WHERE (:year IS NULL OR :year='' OR YEAR=:year)", nativeQuery = true)
	List<TrainingCalendarHistory> excelReport(@Param("year") String year);
}

