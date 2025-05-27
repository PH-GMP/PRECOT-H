package com.focusr.Precot.QA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.MetalDetectorCalibrationRecordLines;
import com.focusr.Precot.QA.model.TrainingRecordLines;

@Repository
public interface TrainingRecordLineRepo extends JpaRepository<TrainingRecordLines, Long> {
	
	@Query(value = "SELECT * FROM precot.TRAINING_RECORD_LINES WHERE LINE_ID = :line_id ", nativeQuery = true)
	TrainingRecordLines findFormById(@Param("line_id") Long line_id);

}
