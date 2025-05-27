package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.QaQualityReviewMeetingDiscussionPoints;
import com.focusr.Precot.QA.model.QaQualityReviewMeetings;
import com.focusr.Precot.QA.model.QaQualityReviewMeetingsDiscussion;

@Repository
public interface QaQualityReviewMeetingDiscussionPointsRepository extends JpaRepository<QaQualityReviewMeetingDiscussionPoints, Long>{
	
	@Query(value = "SELECT ID, DISCUSSION_POINTS\r\n"
			+ "FROM PDE.precot.QA_QUALITY_REVIEW_MEETINGS_DISCUSSION_POINTS;", nativeQuery = true)
	List<QaQualityReviewMeetingDiscussionPoints> getDiscussionPointsLov();



	
}
