package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.TrainingQuestionnaire;
import com.focusr.Precot.QA.model.TrainingQuestionnaireSummaryDTO;

public interface TrainingQuestionnaireRepo extends JpaRepository<TrainingQuestionnaire,Long> {
	@Query(value = "SELECT * FROM precot.QA_TRAINING_QUESTIONNAIRE WHERE QUESTIONNAIRE_ID=:ID" , nativeQuery=true)
	public TrainingQuestionnaire findTrainingQuestionnaireById(@Param("ID") Long id);
	
	@Query(value = "SELECT * FROM precot.QA_TRAINING_QUESTIONNAIRE WHERE TRAINING_SESSION_NUMBER =:trainingSessionNumber AND TRAINEE_ID_NUMBER =:traineeIdNumber",nativeQuery = true)
	TrainingQuestionnaire findByUniqueParams(@Param("trainingSessionNumber") String trainingSessionNumber , @Param("traineeIdNumber") String traineeIdNumber);
	
	@Query("SELECT NEW com.focusr.Precot.QA.model.TrainingQuestionnaireSummaryDTO(i.questionnaireId,i.year,i.month,i.trainingSessionNumber,i.traineeIdNumber,i.hodDesigneeStatus,i.reason)"
			+ " from TrainingQuestionnaire i WHERE i.hodDesigneeStatus <> 'HOD_DESIGNEE_SUBMITTED' OR i.hodDesigneeStatus IS NULL order by updatedAt desc")
	List<TrainingQuestionnaireSummaryDTO> getTrainingQuestionnaireSummary();
	
	@Query(value = "SELECT * FROM precot.QA_TRAINING_QUESTIONNAIRE"
			+ " WHERE (:year IS NULL OR :year='' OR YEAR=:year)"
			+ " AND (:month IS NULL OR :month='' OR MONTH=:month)"
			+ " AND (:traineeIdNumber IS NULL OR :traineeIdNumber='' OR TRAINEE_ID_NUMBER =:traineeIdNumber)"
			+ " AND HOD_DESIGNEE_STATUS = 'HOD_DESIGNEE_SUBMITTED'", nativeQuery = true)
	List<TrainingQuestionnaire> findByPrintParams(@Param("year") String year,@Param("month") String month, @Param("traineeIdNumber") String traineeIdNumber);
}
