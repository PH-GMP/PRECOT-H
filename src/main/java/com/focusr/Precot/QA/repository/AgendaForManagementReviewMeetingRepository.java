package com.focusr.Precot.QA.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.AgendaForManagementReviewMeeting;


@Repository
public interface AgendaForManagementReviewMeetingRepository extends JpaRepository<AgendaForManagementReviewMeeting, Long>{
	@Query(value = "SELECT * FROM precot.QA_AGENDA_FOR_MANAGEMENT_REVIEW_MEETING WHERE (:year IS NULL OR :year='' OR YEAR = :year)AND(:month IS NULL OR :month='' OR MONTH = :month)AND MR_OR_QA_MANAGER_STATUS = 'MR_OR QA_MANAGER_SUBMITTED'", nativeQuery = true)
	List<AgendaForManagementReviewMeeting> printParam(@Param("year") String year , @Param("month") String month);

	//FOR MRM
	@Query(value = "SELECT * FROM precot.QA_AGENDA_FOR_MANAGEMENT_REVIEW_MEETING WHERE (:year IS NULL OR :year='' OR YEAR = :year)AND(:month IS NULL OR :month='' OR MONTH = :month)AND HEADINGS =:headings AND MR_OR_QA_MANAGER_STATUS = 'MR_OR QA_MANAGER_SUBMITTED'", nativeQuery = true)
	List<AgendaForManagementReviewMeeting> forMomParam(@Param("year") String year , @Param("month") String month,@Param("headings") String headings);

	@Query(value = "SELECT * FROM precot.QA_AGENDA_FOR_MANAGEMENT_REVIEW_MEETING WHERE YEAR = :year AND MONTH =:month AND HEADINGS =:headings", nativeQuery = true)
	AgendaForManagementReviewMeeting getdetailsbyParam(@Param("year") String year , @Param("month") String month, @Param("headings") String headings);

	@Query(value = "SELECT * FROM precot.QA_AGENDA_FOR_MANAGEMENT_REVIEW_MEETING WHERE MR_OR_QA_MANAGER_STATUS = 'MR_OR QA_MANAGER_SAVED' ORDER BY ID DESC", nativeQuery = true)
	List<AgendaForManagementReviewMeeting> summary();
}
