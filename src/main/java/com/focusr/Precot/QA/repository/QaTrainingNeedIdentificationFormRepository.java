package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.QaTrainingNeedIdentificationForm;

public interface QaTrainingNeedIdentificationFormRepository extends JpaRepository<QaTrainingNeedIdentificationForm, Long>{

	@Query(value = "SELECT * FROM precot.QA_TRAINING_NEED_IDENTIFICATION_FORM_F005 WHERE FORM_ID = :form_id ", nativeQuery = true)
	QaTrainingNeedIdentificationForm findFormById(@Param("form_id") long form_id);
	
	@Query(value = "SELECT * FROM precot.QA_TRAINING_NEED_IDENTIFICATION_FORM_F005 WHERE YEAR =:year AND DEPARTMENT =:department ", nativeQuery = true)
	QaTrainingNeedIdentificationForm findByparam(@Param("year") String year,@Param("department") String department);

	@Query(value = "SELECT * FROM precot.QA_TRAINING_NEED_IDENTIFICATION_FORM_F005 WHERE DEPARTMENT =:department AND QA_MANAGER_STATUS != 'QA_MANAGER_APPROVED' ORDER BY FORM_ID DESC", nativeQuery = true)
	List<QaTrainingNeedIdentificationForm> hodSummary(@Param("department") String department);
	
	@Query(value = "SELECT * FROM precot.QA_TRAINING_NEED_IDENTIFICATION_FORM_F005 WHERE DEPARTMENT IN (:department) AND QA_MANAGER_STATUS != 'QA_MANAGER_APPROVED' ORDER BY FORM_ID DESC", nativeQuery = true)
	List<QaTrainingNeedIdentificationForm> hodSummaryMultipleDept(@Param("department") List<String> department);
	
	@Query(value = "SELECT * FROM precot.QA_TRAINING_NEED_IDENTIFICATION_FORM_F005 WHERE HOD_STATUS = 'HOD_SUBMITTED' AND QA_MANAGER_STATUS != 'QA_MANAGER_APPROVED' ORDER BY FORM_ID DESC", nativeQuery = true)
	List<QaTrainingNeedIdentificationForm> qaManagerSummary();
	
	@Query(value = "SELECT * FROM precot.QA_TRAINING_NEED_IDENTIFICATION_FORM_F005 WHERE YEAR =:year AND QA_MANAGER_STATUS = 'QA_MANAGER_APPROVED'", nativeQuery = true)
	List<QaTrainingNeedIdentificationForm> printApi(@Param("year") String year);
}
