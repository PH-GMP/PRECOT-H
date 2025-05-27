package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.MetalDetectorCalibrationRecord;
import com.focusr.Precot.QA.model.TemplateForRecall;
import com.focusr.Precot.QA.model.TrainingRecord;

@Repository
public interface TrainingRecordRepo extends JpaRepository<TrainingRecord, Long> {

	@Query(value = "SELECT * FROM precot.TRAINING_RECORD WHERE TRAINING_ID=:id", nativeQuery = true)
	TrainingRecord findFormById(@Param("id") Long id);

	@Query(value = "SELECT * FROM precot.TRAINING_RECORD WHERE HOD_STATUS = 'HOD_SAVED' AND DEPARTMENT =:department ORDER BY TRAINING_ID DESC", nativeQuery = true)
	List<TrainingRecord> hodSummary(@Param("department") String department);
	
	@Query(value = "SELECT * FROM precot.TRAINING_RECORD WHERE"
			+ "(:month IS NULL OR :month = '' OR MONTH = :month) "
			+ "AND (:year IS NULL OR :year = '' OR YEAR = :year) "
			+ "AND (:department IS NULL OR :department = '' OR DEPARTMENT = :department) "
			+ "AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<TrainingRecord> trainingRecordPrint(@Param("month") String month, @Param("year") String year,
			@Param("department") String department);
	
	@Query(value = "SELECT * FROM precot.TRAINING_RECORD WHERE DATE=:date AND DEPARTMENT = :department", nativeQuery = true)
	List<TrainingRecord> GetTrainingRecord(@Param("date") String date, @Param("department") String department);
	
	@Query(value = "SELECT HOD_SIGN FROM precot.TRAINING_RECORD WHERE TRAINING_SESSION_NO =:trainingSessionNo AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	String GetTrainerName(@Param("trainingSessionNo") String trainingSessionNo);


}
