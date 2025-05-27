package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.QaChangeControlForm;

public interface QaChangeControlFormRepository extends JpaRepository<QaChangeControlForm, Long>{
	
	@Query(value = "SELECT * FROM precot.QA_CHANGE_CONTROL_FORM WHERE FORM_ID = :formId ", nativeQuery = true)
	QaChangeControlForm findFormById(@Param("formId") long formId);
	
	@Query(value = "SELECT * FROM precot.QA_CHANGE_CONTROL_FORM WHERE DATE = :date AND CHANGE_CONTROL_TO =:changeControlTo ", nativeQuery = true)
	QaChangeControlForm getByParam(@Param("date") String date,@Param("changeControlTo") String changeControlTo);
	
	@Query(value = "SELECT * FROM precot.QA_CHANGE_CONTROL_FORM WHERE (STATUS_TAB_12 IS NULL OR STATUS_TAB_12 != 'SUBMITTED') ORDER BY FORM_ID DESC ", nativeQuery = true)
	List<QaChangeControlForm> hodSummary();
	
	@Query(value = "SELECT * FROM precot.QA_CHANGE_CONTROL_FORM WHERE STATUS_TAB_1 = 'SUBMITTED' AND (STATUS_TAB_12 IS NULL OR STATUS_TAB_12 != 'SUBMITTED') ORDER BY FORM_ID DESC ", nativeQuery = true)
	List<QaChangeControlForm> qaSummary();
	
	@Query(value = "SELECT * FROM precot.QA_CHANGE_CONTROL_FORM WHERE "
			+ " (:month IS NULL OR :month='' OR MONTH=:month) "
			+ " AND (:year IS NULL OR :year='' OR YEAR=:year) "
			+ " AND (:department IS NULL OR :department='' OR DEPARTMENT=:department) "
			+ " AND (:changeControlNumber IS NULL OR :changeControlNumber='' OR CHANGE_CONTROL_NUMBER=:changeControlNumber) "
			+ " AND STATUS_TAB_12 = 'SUBMITTED' "
			, nativeQuery = true)
	List<QaChangeControlForm> printApi(@Param("month") String month,@Param("year") String year,@Param("department") String department,@Param("changeControlNumber") String changeControlNumber);
	
	
	@Query(value = "SELECT CHANGE_CONTROL_NUMBER FROM precot.QA_CHANGE_CONTROL_FORM WHERE STATUS_TAB_12 = 'SUBMITTED' AND CHANGE_CONTROL_NUMBER IS NOT NULL ", nativeQuery = true)
	List<String> changeControlNumberLov();
	
	// Fetch Department ID
	
	@Query(value = "SELECT DEPARTMENT_ID FROM precot.USER_LOGIN_DETAILS WHERE username = :username", nativeQuery = true)
	Long fetchDepartmentIdByUsername(@Param("username") String username);
	
	// Form number generation
		@Query(value = "SELECT TOP 1 CHANGE_CONTROL_NUMBER "
				+ " FROM precot.QA_CHANGE_CONTROL_FORM "
				+ " WHERE DEPARTMENT = :department AND YEAR = :year AND CHANGE_CONTROL_NUMBER IS NOT NULL "
				+ " ORDER BY FORM_ID DESC", nativeQuery = true)
		Object fetchLastGeneratedNo(@Param("department") String department, @Param("year") String year);
}
