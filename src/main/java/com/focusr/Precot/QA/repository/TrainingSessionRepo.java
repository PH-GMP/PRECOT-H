package com.focusr.Precot.QA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.focusr.Precot.QA.model.TrainingSession;

public interface TrainingSessionRepo  extends JpaRepository<TrainingSession,Long> {
	@Query(value = "SELECT * FROM precot.QA_TRAINING_SESSION WHERE SESSION_ID = :id ", nativeQuery = true)
	TrainingSession findTrainingSessionById(@Param("id") long id);
}
