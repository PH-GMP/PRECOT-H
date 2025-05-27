package com.focusr.Precot.QA.repository.audit;

import java.util.List;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.QaOnlineInspectionList;
import com.focusr.Precot.QA.model.audit.QaContainerInspectionReportHistory;
import com.focusr.Precot.QA.model.audit.QaOnlineInspectionReportHistory;
import com.focusr.Precot.QA.model.audit.QaRodentBoxCheckListHistory;

@Repository
public interface QaContainerInspectionReportHistoryRepository extends JpaRepository<QaContainerInspectionReportHistory, Long>{

	
	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_CONTAINER_INSPECTION_REPORT_HISTORY_F039 WHERE DATE =:date AND CIR_NO =:cirNo ", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date, @Param("cirNo") String cirNo);
		
	@Query(value = "SELECT * FROM precot.QA_CONTAINER_INSPECTION_REPORT_HISTORY_F039 WHERE DATE =:date AND CIR_NO =:cirNo AND VERSION IN (SELECT MAX(VERSION) FROM precot.QA_CONTAINER_INSPECTION_REPORT_HISTORY_F039 WHERE DATE =:date AND CIR_NO =:cirNo )", nativeQuery = true)
	QaContainerInspectionReportHistory fetchLastSubmittedRecord(@Param("date") String date, @Param("cirNo") String cirNo);

	
//	@Query(value = "SELECT * FROM precot.QA_CONTAINER_INSPECTION_REPORT_HISTORY_F039 WHERE "
//	        + " (:cirNo IS NULL OR :cirNo='' OR CIR_NO = :cirNo) "       
//	        + " AND (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date) ",
//	        nativeQuery = true)
//	List<QaContainerInspectionReportHistory> excelReport(
//	        @Param("cirNo") String cirNo,
//	        @Param("from_date") String from_date,
//	        @Param("to_date") String to_date);
	
	@Query(value = "SELECT * FROM precot.QA_CONTAINER_INSPECTION_REPORT_HISTORY_F039 WHERE "
	        + " (:cirNo IS NULL OR :cirNo='' OR CIR_NO = :cirNo) "       	      
	        + " AND (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date) ",
	        nativeQuery = true)
	List<QaContainerInspectionReportHistory> excelReport(
	        @Param("cirNo") String cirNo,
	        @Param("from_date") String from_date,
	        @Param("to_date") String to_date);
}
