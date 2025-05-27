package com.focusr.Precot.QA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.QaChangeControlAssessmentAndCreation;

public interface QaChangeControlAssessmentAndCreationRepository extends JpaRepository<QaChangeControlAssessmentAndCreation, Long>{

	@Query(value = "SELECT * FROM precot.QA_CHANGE_CONTROL_ASSESSMENT_AND_CREATION WHERE LINE_ID = :lineId ", nativeQuery = true)
	QaChangeControlAssessmentAndCreation findFormById(@Param("lineId") long lineId);
}
