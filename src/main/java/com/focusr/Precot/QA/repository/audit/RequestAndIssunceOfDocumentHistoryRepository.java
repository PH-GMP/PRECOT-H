package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.QaContainerInspectionReportHistory;
import com.focusr.Precot.QA.model.audit.RequestAndIssunceOfDocumentHistoryF002;

@Repository
public interface RequestAndIssunceOfDocumentHistoryRepository extends JpaRepository<RequestAndIssunceOfDocumentHistoryF002, Long>{

	
	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_REQUEST_AND_ISSUNCE_OF_DOCUMENT_HISTORY_F002 WHERE DATE =:date AND MONTH =:month AND YEAR =:year AND DEPARTMENT = :dept", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("month") String month,@Param("year") String year,@Param("dept") String dept);
		
	@Query(value = "SELECT * FROM precot.QA_REQUEST_AND_ISSUNCE_OF_DOCUMENT_HISTORY_F002 WHERE DATE =:date AND MONTH =:month AND YEAR =:year AND DEPARTMENT = :department AND VERSION IN (SELECT MAX(VERSION) FROM precot.QA_REQUEST_AND_ISSUNCE_OF_DOCUMENT_HISTORY_F002 WHERE DATE =:date AND MONTH =:month AND YEAR =:year AND DEPARTMENT = :department)", nativeQuery = true)
	RequestAndIssunceOfDocumentHistoryF002 fetchLastSubmittedRecord(@Param("date") String date,@Param("month") String month,@Param("year") String year,@Param("department") String department);

	
	@Query(value = "SELECT * FROM precot.QA_REQUEST_AND_ISSUNCE_OF_DOCUMENT_HISTORY_F002 WHERE "
			+ " (:month IS NULL OR :month='' OR MONTH=:month)"
			+" AND (:year IS NULL OR :year='' OR YEAR=:year)"
			+ " AND (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date) ",
	        nativeQuery = true)
	List<RequestAndIssunceOfDocumentHistoryF002> excelReport(
	        @Param("month") String month,
	        @Param("year") String year,
	        @Param("from_date") String from_date,
	        @Param("to_date") String to_date);
}
