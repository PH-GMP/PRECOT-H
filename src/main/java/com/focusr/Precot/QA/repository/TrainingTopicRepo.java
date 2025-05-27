package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.focusr.Precot.QA.model.TrainingTopic;

@Repository
public interface TrainingTopicRepo extends JpaRepository<TrainingTopic, Long>{
	
	@Query(value = "SELECT * FROM precot.QA_TRAINING_TOPIC WHERE ID = :id ", nativeQuery = true)
	TrainingTopic findTrainingTopicById(@Param("id") long id);
	
	@Query("SELECT i.topic FROM TrainingTopic i")
	List<String> getTrainingTopics();
}
