package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.focusr.Precot.QA.model.audit.TrainingQuestionnaireHistory;

public interface TrainingQuestionnaireHistoryRepo extends JpaRepository<TrainingQuestionnaireHistory,Long> {
	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_TRAINING_QUESTIONNAIRE_HISTORY WHERE TRAINING_SESSION_NUMBER =:trainingSessionNumber AND TRAINEE_ID_NUMBER =:traineeIdNumber", nativeQuery = true)
	Optional<Integer> getMaximumVersion1(@Param("trainingSessionNumber") String trainingSessionNumber , @Param("traineeIdNumber") String traineeIdNumber);
	
	@Query(value = "SELECT * FROM precot.QA_TRAINING_QUESTIONNAIRE_HISTORY"
			+ " WHERE TRAINING_SESSION_NUMBER =:trainingSessionNumber AND TRAINEE_ID_NUMBER =:traineeIdNumber AND "
			+ " VERSION IN "
			+ " (SELECT MAX(VERSION) FROM precot.QA_TRAINING_QUESTIONNAIRE_HISTORY WHERE TRAINING_SESSION_NUMBER =:trainingSessionNumber AND TRAINEE_ID_NUMBER =:traineeIdNumber)", nativeQuery = true)
	TrainingQuestionnaireHistory fetchLastSubmittedRecord(@Param("trainingSessionNumber") String trainingSessionNumber , @Param("traineeIdNumber") String traineeIdNumber);
	
	
	@Query(value = "SELECT * FROM precot.QA_TRAINING_QUESTIONNAIRE_HISTORY WHERE (:year IS NULL OR :year='' OR YEAR=:year)"
			+ " AND (:month IS NULL OR :month='' OR MONTH=:month) AND (:traineeIdNumber IS NULL OR :traineeIdNumber='' OR TRAINEE_ID_NUMBER=:traineeIdNumber)", 
			nativeQuery = true)
	List<TrainingQuestionnaireHistory> excelReport(@Param("year") String year,@Param("month") String month,@Param("traineeIdNumber") String traineeIdNumber);
}
