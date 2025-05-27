package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.audit.QaChangeControlLogBookF042History;
import com.focusr.Precot.QA.model.audit.QaMasterListOfSharpToolsF060History;

public interface QaMasterSharpToolsF060HistoryRepo extends JpaRepository<QaMasterListOfSharpToolsF060History, Long>{

	
	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_MASTER_LIST_OF_SHARP_TOOLS_F060HISTORY WHERE DATE =:date AND DEPARTMENT =:department", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date, @Param("department") String department);
	
	@Query(value = "SELECT * FROM precot.QA_MASTER_LIST_OF_SHARP_TOOLS_F060HISTORY WHERE (DATE =:date AND DEPARTMENT =:department) AND VERSION IN (SELECT MAX(VERSION) FROM precot.QA_MASTER_LIST_OF_SHARP_TOOLS_F060HISTORY WHERE DATE =:date AND DEPARTMENT =:department)", nativeQuery = true)
	QaMasterListOfSharpToolsF060History fetchLastSubmittedRecordDateAndDept(@Param("date") String date, @Param("department") String department);

	@Query(value = "SELECT * FROM precot.QA_MASTER_LIST_OF_SHARP_TOOLS_F060HISTORY WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
			+ "AND (:departmentName IS NULL OR DEPARTMENT = :departmentName)", nativeQuery = true)
	List<QaMasterListOfSharpToolsF060History> findByParamsF060(
			@Param("from_date") String from_date,
			@Param("to_date") String to_date,
			@Param("departmentName") String departmentName);

	
	@Query(value = "SELECT * FROM precot.QA_MASTER_LIST_OF_SHARP_TOOLS_F060HISTORY WHERE "
			+ "DATE = :date "
			+ "AND (:departmentName IS NULL OR DEPARTMENT = :departmentName)", nativeQuery = true)
	List<QaMasterListOfSharpToolsF060History> findFormByDateAndDepart(@Param("date") String date, @Param("departmentName") String departmentName);

}
