package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.QaTrainingSessionAllotmentRegisterLine;

public interface QaTrainingSessionAllotmentRegisterLineRepository extends JpaRepository<QaTrainingSessionAllotmentRegisterLine, Long>{

	@Query(value = "SELECT * FROM precot.QA_TRAINING_SESSION_ALLOTMENT_REGISTER_LINE WHERE LINE_ID = :line_id ", nativeQuery = true)
	QaTrainingSessionAllotmentRegisterLine findFormById(@Param("line_id") long line_id);
	
	//Form number generation
		@Query(value = "SELECT TOP 1 tsl.TRAINING_SESSION_NUMBER " +
	            "FROM precot.QA_TRAINING_SESSION_ALLOTMENT_REGISTER ts " +
	            "JOIN precot.QA_TRAINING_SESSION_ALLOTMENT_REGISTER_LINE tsl ON ts.FORM_ID = tsl.FORM_ID " +
	            "WHERE ts.DEPARTMENT = :department AND ts.YEAR = :year " +
	            "ORDER BY tsl.LINE_ID DESC", nativeQuery = true)
		Object fetchLastGeneratedNo(@Param("department") String department,@Param("year") String year);
		
		// Training session Lov
		@Query(value = "SELECT tsl.TRAINING_SESSION_NUMBER "
				+ " FROM precot.QA_TRAINING_SESSION_ALLOTMENT_REGISTER ts "
				+ " JOIN precot.QA_TRAINING_SESSION_ALLOTMENT_REGISTER_LINE tsl ON ts.FORM_ID = tsl.FORM_ID "
				+ " WHERE ts.DEPARTMENT = :department "
				+ " AND ts.HOD_STATUS = 'HOD_SUBMITTED' ", nativeQuery = true)
		List<Object> trainingSessionLov(@Param("department") String department);
	 
}
