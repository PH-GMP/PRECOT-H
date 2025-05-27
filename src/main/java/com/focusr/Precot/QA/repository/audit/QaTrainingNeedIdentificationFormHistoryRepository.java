package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.audit.QaMasterListOfSharpToolsF060History;
import com.focusr.Precot.QA.model.audit.QaTrainingNeedIdentificationFormHistory;

public interface QaTrainingNeedIdentificationFormHistoryRepository extends JpaRepository<QaTrainingNeedIdentificationFormHistory, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_TRAINING_NEED_IDENTIFICATION_FORM_HISTORY_F005 WHERE DEPARTMENT =:department AND YEAR =:year", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("department") String department, @Param("year") String year);
		
	@Query(value = "SELECT * FROM precot.QA_TRAINING_NEED_IDENTIFICATION_FORM_HISTORY_F005 WHERE DEPARTMENT =:department AND YEAR =:year AND VERSION IN (SELECT MAX(VERSION) FROM precot.QA_TRAINING_NEED_IDENTIFICATION_FORM_HISTORY_F005 WHERE DEPARTMENT =:department AND YEAR =:year)", nativeQuery = true)
	QaTrainingNeedIdentificationFormHistory fetchLastSubmittedRecord(@Param("department") String department, @Param("year") String year);

	
	@Query(value = "SELECT * FROM precot.QA_TRAINING_NEED_IDENTIFICATION_FORM_HISTORY_F005 WHERE "
			+ " (:department IS NULL OR :department='' OR DEPARTMENT=:department)"
			+" AND (:year IS NULL OR :year='' OR YEAR=:year)"
			+ " AND (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date) ", nativeQuery = true)
	List<QaTrainingNeedIdentificationFormHistory> excelReport(@Param("from_date") String from_date,
			@Param("to_date") String to_date,@Param("department") String department, @Param("year") String year);
	
}
