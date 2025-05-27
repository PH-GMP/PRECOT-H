package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.QaChangeControlLogBookF042;
import com.focusr.Precot.QA.model.QaMasterListOfSharpToolsF060;
import com.focusr.Precot.QA.payload.DepartmentDto;

public interface QaMaterialListOfSharpToolsF060Repo extends JpaRepository<QaMasterListOfSharpToolsF060, Long>{

	
	@Query(value = "SELECT * FROM precot.QA_MASTER_LIST_OF_SHARP_TOOLS_F060 WHERE ID = :id ", nativeQuery = true)
	QaMasterListOfSharpToolsF060 findFormById(@Param("id") long id);
	
	@Query(value = "SELECT * FROM precot.QA_MASTER_LIST_OF_SHARP_TOOLS_F060 WHERE " +
	        "(:date IS NULL OR DATE = :date) AND " +
	        "(:department IS NULL OR DEPARTMENT = :department) " +  // Removed the extra 'AND' here
	        "ORDER BY ID DESC", 
	        nativeQuery = true)
	List<QaMasterListOfSharpToolsF060> findByDateOrDept(
	        @Param("date") String date,
	        @Param("department") String department);

	
	@Query(value = "SELECT * FROM precot.QA_MASTER_LIST_OF_SHARP_TOOLS_F060 " +
			"WHERE QA_INSPECTOR_STATUS IN ('QA_INSPECTOR_SUBMITTED','QA_INSPECTOR_SAVED') " +
			"AND (MANAGER_STATUS IS NULL OR MANAGER_STATUS NOT IN ('QA_MANAGER_APPROVED','DESIGNEE_APPROVED','MR_APPROVED')) " +
			"AND createdBy = :userName " +
			"ORDER BY ID DESC", nativeQuery = true)
	List<QaMasterListOfSharpToolsF060> qaInspectorFindAll(@Param("userName") String userName);
	

	
//	@Query(value = "SELECT * FROM precot.QA_CHANGE_CONTROL_LOG_BOOK_F042"
//			+"WHERE HOD_OR_DESIGNEE_STATUS IN ('HOD_SUBMITTED','DESIGNEE_SUBMITTED')"
//			+"AND (MR_OR_QA_MANAGER_STATUS != 'MR_APPROVED' AND MR_OR_QA_MANAGER_STATUS != 'QA_MANAGER_APPROVED') ORDER BY ID DESC", nativeQuery = true)
//	List<QaChangeControlLogBookF042> managerFindAll();
	
	@Query(value = "SELECT * FROM precot.QA_MASTER_LIST_OF_SHARP_TOOLS_F060 " +
			"WHERE QA_INSPECTOR_STATUS = 'QA_INSPECTOR_SUBMITTED' " +
			"AND MANAGER_STATUS NOT IN ('QA_MANAGER_APPROVED','DESIGNEE_APPROVED','MR_APPROVED') " +
			"ORDER BY ID DESC", 
			nativeQuery = true)
	List<QaMasterListOfSharpToolsF060> managerFindAll();
	
	@Query(value = "SELECT * FROM precot.QA_MASTER_LIST_OF_SHARP_TOOLS_F060 WHERE " +
			"(:month IS NULL OR MONTH = :month) AND " +
			"(:year IS NULL OR YEAR = :year) AND " + 
			"(:date IS NULL OR DATE = :date) AND " + 
			"(:department IS NULL OR DEPARTMENT = :department) AND " + 
			"MANAGER_STATUS IN ('QA_MANAGER_APPROVED','DESIGNEE_APPROVED','MR_APPROVED') " +
			"ORDER BY ID DESC", 
			nativeQuery = true)
	List<QaMasterListOfSharpToolsF060> findByMonthYearDateDeptForPrint(
			@Param("month") String month,
			@Param("year") String year,
			@Param("date") String date,
			@Param("department") String department);



}
