package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.TrainingCalendar;
import com.focusr.Precot.QA.model.TrainingCalendarSummaryDTO;

@Repository
public interface TrainingCalendarRepo extends JpaRepository<TrainingCalendar,Long> {
	
	@Query(value = "SELECT * FROM precot.QA_TRAINING_CALENDAR WHERE CALENDAR_ID=:ID" , nativeQuery=true)
	public TrainingCalendar findTrainingCalendarById(@Param("ID") Long id);
	
	@Query(value = "SELECT * FROM precot.QA_TRAINING_CALENDAR WHERE YEAR =:year",nativeQuery = true)
	TrainingCalendar findByUniqueParams(@Param("year") String year);
	
//	@Query("select new com.focusr.Precot.QA.model.TrainingCalendarSummaryDTO(i.calendarId,i.year,i.qaDesigneeStatus,i.qaManagerMrStatus,i.reason)"
//			+ " from TrainingCalendar i WHERE i.qaManagerMrStatus <> 'QA_MANAGER_MR_APPROVED' OR i.qaManagerMrStatus IS NULL order by updatedAt desc")
//	List<TrainingCalendarSummaryDTO> getTrainingCalendarSummary();
	
	@Query("select new com.focusr.Precot.QA.model.TrainingCalendarSummaryDTO(i.calendarId,i.year,i.qaDesigneeStatus,i.qaManagerMrStatus,i.reason)"
			+ " from TrainingCalendar i order by updatedAt desc")
	List<TrainingCalendarSummaryDTO> getTrainingCalendarSummary();

	
	@Query(value = "SELECT * FROM precot.QA_TRAINING_CALENDAR"
			+ " WHERE YEAR =:year"
			+ " AND QA_MANAGER_MR_STATUS = 'QA_MANAGER_MR_APPROVED'", nativeQuery = true)
	List<TrainingCalendar> findByPrintParams(@Param("year") String year);

}