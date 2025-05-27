package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.QualityReviewMeetingHistory;
import com.focusr.Precot.QA.model.audit.RequestAndIssunceOfDocumentHistoryF002;
@Repository
public interface QualityReviewMeetingsHisotoryRepository extends JpaRepository<QualityReviewMeetingHistory, Long>{
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_QUALITY_REVIEW_MEETINGS_HISTORY_F043 WHERE DATE =:date", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date);
		
	@Query(value = "SELECT * FROM precot.QA_QUALITY_REVIEW_MEETINGS_HISTORY_F043 WHERE DATE =:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.QA_QUALITY_REVIEW_MEETINGS_HISTORY_F043 WHERE DATE =:date)", nativeQuery = true)
	QualityReviewMeetingHistory fetchLastSubmittedRecord(@Param("date") String date);

	
	@Query(value = "SELECT * FROM precot.QA_QUALITY_REVIEW_MEETINGS_HISTORY_F043 WHERE "
		
			+ " (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date) ",
	        nativeQuery = true)
	List<QualityReviewMeetingHistory> excelReport(
	      
	        @Param("from_date") String from_date,
	        @Param("to_date") String to_date);
}
