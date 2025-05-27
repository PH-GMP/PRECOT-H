package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.QaChangeControlLogBookF042;
import com.focusr.Precot.QA.payload.DepartmentDto;


@Repository
public interface QaChangeControlLogBookRepo extends JpaRepository<QaChangeControlLogBookF042, Long>{
	
	@Query(value = "SELECT * FROM precot.QA_CHANGE_CONTROL_LOG_BOOK_F042 WHERE ID = :id ", nativeQuery = true)
	QaChangeControlLogBookF042 findFormById(@Param("id") long id);
	
	@Query(value = "SELECT * FROM precot.QA_CHANGE_CONTROL_LOG_BOOK_F042 WHERE CHANGE_CONTROL_NO =:changeControlNo", nativeQuery = true)
	List<QaChangeControlLogBookF042> fetchByChangeControlNo(@Param("changeControlNo") String changeControlNo);
	
	@Query(value = "SELECT * FROM precot.QA_CHANGE_CONTROL_LOG_BOOK_F042 " +
			"WHERE HOD_OR_DESIGNEE_STATUS IN ('HOD_SAVED', 'HOD_SUBMITTED') " +
			"AND (MR_OR_QA_MANAGER_STATUS IS NULL OR MR_OR_QA_MANAGER_STATUS NOT IN ('MR_APPROVED', 'QA_MANAGER_APPROVED')) " +
			"AND createdBy = :userName " +
			"ORDER BY ID DESC", nativeQuery = true)
	List<QaChangeControlLogBookF042> hodFindAll(@Param("userName") String userName);
	
	@Query(value = "SELECT * FROM precot.QA_CHANGE_CONTROL_LOG_BOOK_F042 " +
			"WHERE HOD_OR_DESIGNEE_STATUS IN ('DESIGNEE_SAVED','DESIGNEE_SUBMITTED') " +
			"AND (MR_OR_QA_MANAGER_STATUS IS NULL OR MR_OR_QA_MANAGER_STATUS NOT IN ('MR_APPROVED', 'QA_MANAGER_APPROVED')) " +
			"AND createdBy = :userName " +
			"ORDER BY ID DESC", nativeQuery = true)
	List<QaChangeControlLogBookF042> designeeFindAll(@Param("userName") String userName);
	
//	@Query(value = "SELECT * FROM precot.QA_CHANGE_CONTROL_LOG_BOOK_F042"
//			+"WHERE HOD_OR_DESIGNEE_STATUS IN ('HOD_SUBMITTED','DESIGNEE_SUBMITTED')"
//			+"AND (MR_OR_QA_MANAGER_STATUS != 'MR_APPROVED' AND MR_OR_QA_MANAGER_STATUS != 'QA_MANAGER_APPROVED') ORDER BY ID DESC", nativeQuery = true)
//	List<QaChangeControlLogBookF042> managerFindAll();
	
	@Query(value = "SELECT * FROM precot.QA_CHANGE_CONTROL_LOG_BOOK_F042 " +
			"WHERE HOD_OR_DESIGNEE_STATUS IN ('HOD_SUBMITTED', 'DESIGNEE_SUBMITTED') " +
			"AND MR_OR_QA_MANAGER_STATUS NOT IN ('MR_APPROVED', 'QA_MANAGER_APPROVED') " +
			"ORDER BY ID DESC", 
			nativeQuery = true)
	List<QaChangeControlLogBookF042> managerFindAll();
	
	@Query(value = "SELECT * FROM precot.QA_CHANGE_CONTROL_LOG_BOOK_F042 WHERE " +
			"(:month IS NULL OR MONTH = :month) AND " +
			"(:year IS NULL OR YEAR = :year) AND " +  
			"(MR_OR_QA_MANAGER_STATUS IN ('MR_APPROVED','QA_MANAGER_APPROVED')) " +
			"ORDER BY ID DESC", 
			nativeQuery = true)
	List<QaChangeControlLogBookF042> findByMonthYearForPrint(
			@Param("month") String month,
			@Param("year") String year);



	@Query(value = "SELECT * FROM precot.DEPARTMENT", nativeQuery = true)
	List<DepartmentDto> findAllDepartments();
	
	
//	@Query(value = "SELECT CHANGE_CONTROL_NO FROM precot.QA_CHANGE_CONTROL_LOG_BOOK_F042 WHERE (MR_OR_QA_MANAGER_STATUS IS NULL) OR (MR_OR_QA_MANAGER_STATUS NOT IN ('MR_APPROVED', 'QA_MANAGER_APPROVED'))", nativeQuery = true)
//	List<String> findAllChangeControlNos();
	
	@Query(
		    value = "SELECT CHANGE_CONTROL_NO FROM precot.QA_CHANGE_CONTROL_LOG_BOOK_F042 " +
		            "WHERE (MR_OR_QA_MANAGER_STATUS IS NULL) " +
		            "OR (MR_OR_QA_MANAGER_STATUS NOT IN ('MR_APPROVED', 'QA_MANAGER_APPROVED'))",
		    nativeQuery = true
		)
		List<String> findAllChangeControlNos();

	
}
