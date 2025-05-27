package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.QaTrainingCard;

@Repository
public interface QaTrainingCardRepository extends JpaRepository<QaTrainingCard, Long> {

	@Query(value = "SELECT * FROM precot.QA_TRAINING_CARD WHERE CARD_ID = :cardId ", nativeQuery = true)
	QaTrainingCard findFormById(@Param("cardId") long cardId);

	@Query(value = "SELECT * FROM precot.QA_TRAINING_CARD WHERE EMPLOYEE_NO = :employeeNo AND DEPARTMENT = :department", nativeQuery = true)
	QaTrainingCard getByParam(@Param("employeeNo") String employeeNo,@Param("department") String department);
	
	@Query(value = "SELECT * FROM precot.QA_TRAINING_CARD WHERE DEPARTMENT =:department AND HOD_STATUS = 'HOD_SAVED' ORDER BY CARD_ID DESC", nativeQuery = true)
	List<QaTrainingCard> hodSummary(@Param("department") String department);

	@Query(value = "SELECT * FROM precot.QA_TRAINING_CARD "
			+ " WHERE (:month IS NULL OR :month='' OR MONTH=:month) "
			+ " AND (:year IS NULL OR :year='' OR YEAR=:year) "
			+ " AND (:employeeNo IS NULL OR :employeeNo='' OR EMPLOYEE_NO=:employeeNo) "
			+ " AND (:department IS NULL OR :department='' OR DEPARTMENT=:department) "
			+ " AND HOD_STATUS = 'HOD_SUBMITTED'", nativeQuery = true)
	List<QaTrainingCard> printApi(@Param("month") String month, @Param("year") String year,@Param("employeeNo") String employeeNo,@Param("department") String department);

}
