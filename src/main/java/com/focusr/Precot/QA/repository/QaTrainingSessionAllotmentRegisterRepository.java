package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.InwardInspectionReport;
import com.focusr.Precot.QA.model.QaTrainingSessionAllotmentRegister;
import com.focusr.Precot.QA.model.QaTrainingSessionAllotmentRegisterLine;

public interface QaTrainingSessionAllotmentRegisterRepository extends JpaRepository<QaTrainingSessionAllotmentRegister, Long>{

	@Query(value = "SELECT * FROM precot.QA_TRAINING_SESSION_ALLOTMENT_REGISTER WHERE FORM_ID = :form_id ", nativeQuery = true)
	QaTrainingSessionAllotmentRegister findFormById(@Param("form_id") long form_id);
	
	@Query(value = "SELECT * FROM precot.QA_TRAINING_SESSION_ALLOTMENT_REGISTER WHERE DATE =:date AND DEPARTMENT =:department ", nativeQuery = true)
	QaTrainingSessionAllotmentRegister findByparam(@Param("date") String date,@Param("department") String department);

	@Query(value = "SELECT * FROM precot.QA_TRAINING_SESSION_ALLOTMENT_REGISTER WHERE DEPARTMENT =:department AND HOD_STATUS = 'HOD_SAVED' ORDER BY FORM_ID DESC", nativeQuery = true)
	List<QaTrainingSessionAllotmentRegister> hodSummary(@Param("department") String department);
	
	@Query(value = "SELECT * FROM precot.QA_TRAINING_SESSION_ALLOTMENT_REGISTER WHERE "
			+ " (:month IS NULL OR :month='' OR MONTH=:month) "
			+ " AND (:year IS NULL OR :year='' OR YEAR=:year) "
			+ " AND (:department IS NULL OR :department='' OR DEPARTMENT=:department) "
			+ " AND HOD_STATUS = 'HOD_SUBMITTED' ", nativeQuery = true)
	List<QaTrainingSessionAllotmentRegister> printApi(@Param("month") String month,@Param("year") String year,@Param("department") String department);
	
//	//Form number generation
//	@Query(value = "SELECT TOP 1 tsl.TRAINING_SESSION_NUMBER " +
//            "FROM precot.QA_TRAINING_SESSION_ALLOTMENT_REGISTER ts " +
//            "JOIN precot.QA_TRAINING_SESSION_ALLOTMENT_REGISTER_LINE tsl ON ts.FORM_ID = tsl.FORM_ID " +
//            "WHERE ts.DEPARTMENT = :department " +
//            "ORDER BY tsl.LINE_ID DESC", nativeQuery = true)
//	String fetchLastGeneratedNo(@Param("department") String department);
   
//   long countByDepartmentAndYear(String departmentCode, String year);

}
