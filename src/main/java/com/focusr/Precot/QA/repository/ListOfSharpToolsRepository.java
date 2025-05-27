package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.ListOfSharpTools;

import com.focusr.Precot.QA.model.audit.ListOfSharpToolsHistory;

@Repository
public interface ListOfSharpToolsRepository extends JpaRepository<ListOfSharpTools, Long>{
//	@Query(value = "SELECT * FROM precot.QA_LIST_OF_SHARP_TOOLS WHERE DATE = :date AND DEPARTMENT =:department AND QA_MANAGER_STATUS = 'QA_MR_APPROVED'", nativeQuery = true)
//	List<ListOfSharpTools> printParam(@Param("date") String date , @Param("department") String department);
	@Query(value = "SELECT * FROM precot.QA_LIST_OF_SHARP_TOOLS "
	        + "WHERE (:date IS NULL OR :date = '' OR DATE = :date) "
	        + "AND (:department IS NULL OR :department = '' OR DEPARTMENT = :department) "
	        + "AND QA_MANAGER_STATUS = 'QA_MR_APPROVED'", 
	        nativeQuery = true)
	List<ListOfSharpTools> printParam(
	        @Param("date") String date, 
	        @Param("department") String department);

	@Query(value = "SELECT * FROM precot.QA_LIST_OF_SHARP_TOOLS WHERE DATE = :date AND DEPARTMENT =:department", nativeQuery = true)
	ListOfSharpTools getdetailsbyParam(@Param("date") String date, @Param("department") String department);

	@Query(value = "SELECT * FROM precot.QA_LIST_OF_SHARP_TOOLS  WHERE QA_INSPECTOR_STATUS = 'QA_INSPECTOR_SAVED' OR QA_MANAGER_STATUS !='QA_MR_APPROVED' ORDER BY TOOL_ID DESC", nativeQuery = true)
	List<ListOfSharpTools> qaInspectorSummary();
	
	@Query(value = "SELECT * FROM precot.QA_LIST_OF_SHARP_TOOLS  WHERE QA_INSPECTOR_STATUS = 'QA_INSPECTOR_SUBMITTED' AND QA_MANAGER_STATUS !='QA_MR_APPROVED' ORDER BY  TOOL_ID DESC", nativeQuery = true)
	List<ListOfSharpTools> qaManagerSummary();
}
