package com.focusr.Precot.QA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.QaTrainingNeedIdentificationFormLine;

public interface QaTrainingNeedIdentificationFormLineRepository extends JpaRepository<QaTrainingNeedIdentificationFormLine, Long>{

	@Query(value = "SELECT * FROM precot.QA_TRAINING_NEED_IDENTIFICATION_FORM_LINE_F005 WHERE LINE_ID = :line_id ", nativeQuery = true)
	QaTrainingNeedIdentificationFormLine findFormById(@Param("line_id") long line_id);

}
