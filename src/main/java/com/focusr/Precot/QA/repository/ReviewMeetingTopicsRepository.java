package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.ReviewMeetingTopics;


@Repository
public interface ReviewMeetingTopicsRepository extends JpaRepository<ReviewMeetingTopics, Long>{
	@Query(value = "SELECT * FROM precot.QA_REVIEW_MEETING_TOPICS WHERE HEADINGS = :headings", nativeQuery = true)
	List<ReviewMeetingTopics> findByHeading(@Param("headings") String headings);
	
}
