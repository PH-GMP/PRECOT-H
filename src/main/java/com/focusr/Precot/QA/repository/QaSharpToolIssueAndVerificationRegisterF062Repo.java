package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.QaMasterListOfSharpToolsF060;
import com.focusr.Precot.QA.model.QaSharpToolsIssueAndVerificationRegisterF062;

public interface QaSharpToolIssueAndVerificationRegisterF062Repo extends JpaRepository<QaSharpToolsIssueAndVerificationRegisterF062, Long>{

	
	@Query(value = "SELECT * FROM precot.QA_SHARP_TOOLS_ISSUE_AND_VERIFICATION_REGISTER_F062 WHERE ID = :id ", nativeQuery = true)
	QaSharpToolsIssueAndVerificationRegisterF062 findFormById(@Param("id") long id);
	
	@Query(value = "SELECT * FROM precot.QA_SHARP_TOOLS_ISSUE_AND_VERIFICATION_REGISTER_F062 WHERE " +
	        "(:date IS NULL OR DATE = :date) AND " +
	        "(:department IS NULL OR DEPARTMENT = :department) " +  // Removed the extra 'AND' here
	        "ORDER BY ID DESC", 
	        nativeQuery = true)
	List<QaSharpToolsIssueAndVerificationRegisterF062> findByDateOrDept(
	        @Param("date") String date,
	        @Param("department") String department);

	
//	@Query(value = "SELECT * FROM precot.QA_SHARP_TOOLS_ISSUE_AND_VERIFICATION_REGISTER_F062 " +
//			"WHERE QA_INSPECTOR_STATUS IN ('QA_INSPECTOR_SUBMITTED','QA_INSPECTOR_SAVED') " +
//			"AND createdBy = :userName " +
//			"ORDER BY ID DESC", nativeQuery = true)
//	List<QaSharpToolsIssueAndVerificationRegisterF062> qaInspectorFindAll(@Param("userName") String userName);
	

//1	
	@Query(value = "SELECT * FROM precot.QA_SHARP_TOOLS_ISSUE_AND_VERIFICATION_REGISTER_F062 " +
			"WHERE createdBy = :userName " +
			"ORDER BY ID DESC", nativeQuery = true)
	List<QaSharpToolsIssueAndVerificationRegisterF062> qaInspectorFindAll(@Param("userName") String userName);
//2
//	@Query(value = "SELECT DISTINCT parent.* FROM precot.QA_SHARP_TOOLS_ISSUE_AND_VERIFICATION_REGISTER_F062 parent " +
//	        "JOIN precot.SHARP_TOOLS_ISSUE_AND_VERIFICATION_REGISTER_DETAILS child ON parent.ID = child.ID " +
//	        "WHERE parent.createdBy = :userName " +
//	        "AND child.SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' " +
//	        "ORDER BY parent.ID DESC", nativeQuery = true)
//	List<QaSharpToolsIssueAndVerificationRegisterF062> qaInspectorFindAll(@Param("userName") String userName);

//	@Query(value = "SELECT DISTINCT parent.*, child.* " +
//		       "FROM precot.QA_SHARP_TOOLS_ISSUE_AND_VERIFICATION_REGISTER_F062 parent " +
//		       "JOIN precot.SHARP_TOOLS_ISSUE_AND_VERIFICATION_REGISTER_DETAILS child " +
//		       "ON parent.ID = child.ID " +
//		       "WHERE parent.createdBy = :userName " +
//		       "AND child.SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' " +
//		       "ORDER BY parent.ID DESC", nativeQuery = true)
//		List<Object[]> findFilteredQaInspectorReports(@Param("userName") String userName);

	
	@Query(value = "SELECT * FROM precot.QA_SHARP_TOOLS_ISSUE_AND_VERIFICATION_REGISTER_F062 " +
			"WHERE QA_INSPECTOR_STATUS = 'QA_INSPECTOR_SUBMITTED' " +
			"AND MANAGER_STATUS NOT IN ('QA_MANAGER_APPROVED','DESIGNEE_APPROVED','MR_APPROVED') " +
			"ORDER BY ID DESC", 
			nativeQuery = true)
	List<QaSharpToolsIssueAndVerificationRegisterF062> managerFindAll();
	
	@Query(value = "SELECT * FROM precot.QA_SHARP_TOOLS_ISSUE_AND_VERIFICATION_REGISTER_F062 WHERE " +
			"(:month IS NULL OR MONTH = :month) AND " +
			"(:year IS NULL OR YEAR = :year) AND " + 
			"(:date IS NULL OR DATE = :date) AND " + 
			"(:department IS NULL OR DEPARTMENT = :department) AND " + 
			"MANAGER_STATUS IN ('QA_MANAGER_APPROVED','DESIGNEE_APPROVED','MR_APPROVED') " +
			"ORDER BY ID DESC", 
			nativeQuery = true)
	List<QaSharpToolsIssueAndVerificationRegisterF062> findByMonthYearDateDeptForPrint(
			@Param("month") String month,
			@Param("year") String year,
			@Param("date") String date,
			@Param("department") String department);



}
