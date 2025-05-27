package com.focusr.Precot.QA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.QaTrainingCardDetails;

@Repository
public interface QaTrainingCardDetailsRepository extends JpaRepository<QaTrainingCardDetails, Long>{
	
	@Query(value = "SELECT * FROM precot.QA_TRAINING_CARD_DETAILS WHERE LINE_ID = :lineId ", nativeQuery = true)
	QaTrainingCardDetails findFormById(@Param("lineId") long lineId);

}
