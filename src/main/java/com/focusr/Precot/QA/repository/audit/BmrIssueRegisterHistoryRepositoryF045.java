package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.BmrIssueRegisterHistoryF045;
import com.focusr.Precot.QA.model.audit.ProductDispositionLogBookHistoryF049;

@Repository
public interface BmrIssueRegisterHistoryRepositoryF045 extends JpaRepository<BmrIssueRegisterHistoryF045, Long>{

	
	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_BMR_ISSUE_REGISTER_HISTORY_F045 WHERE DATE =:date", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date);
		
	@Query(value = "SELECT * FROM precot.QA_BMR_ISSUE_REGISTER_HISTORY_F045 WHERE DATE =:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.QA_BMR_ISSUE_REGISTER_HISTORY_F045 WHERE DATE =:date )", nativeQuery = true)
	BmrIssueRegisterHistoryF045 fetchLastSubmittedRecord(@Param("date") String date);

	
//	@Query(value = "SELECT * FROM precot.QA_BMR_ISSUE_REGISTER_HISTORY_F045 WHERE "	             
//	        + " AND (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date) ",
//	        nativeQuery = true)
//	List<BmrIssueRegisterHistoryF045> excelReport(
//	        
//	        @Param("from_date") String from_date,
//	        @Param("to_date") String to_date);
	
	@Query(value = "SELECT * FROM precot.QA_BMR_ISSUE_REGISTER_HISTORY_F045 WHERE " +
            "(:department IS NULL OR :department = '' OR department = :department) " +
            "AND (:from_date IS NULL OR :from_date = '' OR :to_date IS NULL OR :to_date = '' " +
            "OR DATE BETWEEN :from_date AND :to_date)",
    nativeQuery = true)
List<BmrIssueRegisterHistoryF045> excelReport(
     @Param("from_date") String from_date,
     @Param("to_date") String to_date,
     @Param("department") String department);

}
