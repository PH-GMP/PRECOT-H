package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.FinalInspectionReportHistoryF037;
import com.focusr.Precot.QA.model.audit.RequestAndIssunceOfDocumentHistoryF002;

@Repository
public interface FinalInspectionReportHistoryRepository extends JpaRepository<FinalInspectionReportHistoryF037, Long>{

	
	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_FINAL_INSPECTION_REPORT_HISTORY_F037 WHERE DATE =:date AND SHIFT =:shift AND PORDER =:pOrder", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("shift") String shiftS,@Param("pOrder") String pOrder);
		
	@Query(value = "SELECT * FROM precot.QA_FINAL_INSPECTION_REPORT_HISTORY_F037 WHERE DATE =:date AND SHIFT =:shift AND PORDER =:pOrder AND VERSION IN (SELECT MAX(VERSION) FROM precot.QA_FINAL_INSPECTION_REPORT_HISTORY_F037 WHERE DATE =:date AND SHIFT =:shift AND PORDER =:pOrder)", nativeQuery = true)
	FinalInspectionReportHistoryF037 fetchLastSubmittedRecord(@Param("date") String date,@Param("shift") String shift,@Param("pOrder") String pOrder);

	
	@Query(value = "SELECT * FROM precot.QA_FINAL_INSPECTION_REPORT_HISTORY_F037 WHERE "	       
	        + "(:shift IS NULL OR :shift='' OR SHIFT = :shift) "
	        + " AND (:pOrder IS NULL OR :pOrder='' OR PORDER = :pOrder) "
	        + " AND (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date) "
	        + "AND DEPT_NAME = 'QUALITY_ASSURANCE'",
	        nativeQuery = true)
	List<FinalInspectionReportHistoryF037> excelReport(
	        @Param("shift") String shift,
	        @Param("pOrder") String pOrder,
	        @Param("from_date") String from_date,
	        @Param("to_date") String to_date);
	
	
	
	@Query(value = "SELECT * FROM precot.QA_FINAL_INSPECTION_REPORT_HISTORY_F037 WHERE "	       
	        + "(:shift IS NULL OR :shift='' OR SHIFT = :shift) "
	        + " AND (:pOrder IS NULL OR :pOrder='' OR PORDER = :pOrder) "
	        + " AND (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date) "
	        + " AND DEPT_NAME = 'COTTON_BUDS'",
	        nativeQuery = true)
	List<FinalInspectionReportHistoryF037> excelReportBuds(
	        @Param("shift") String shift,
	        @Param("pOrder") String pOrder,
	        @Param("from_date") String from_date,
	        @Param("to_date") String to_date);
	
}
