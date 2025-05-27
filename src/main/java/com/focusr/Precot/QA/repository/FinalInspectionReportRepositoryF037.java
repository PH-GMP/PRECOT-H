package com.focusr.Precot.QA.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.FinalInspectionReportF037;
import com.focusr.Precot.QA.model.FinalInspectionReportSummaryDto;

@Repository
public interface FinalInspectionReportRepositoryF037 extends JpaRepository<FinalInspectionReportF037, Long> {

	
	
	@Query(value = "SELECT * FROM precot.QA_FINAL_INSPECTION_REPORT_F037 WHERE FINALINSPECTION_ID = :finalInspectionId ", nativeQuery = true)
	FinalInspectionReportF037 findFormById(@Param("finalInspectionId") long finalInspectionId);
	
	@Query(value = "SELECT * FROM precot.QA_FINAL_INSPECTION_REPORT_F037 WHERE DATE=:date AND SHIFT=:shift AND PORDER=:pOrder AND BMR_NO=:bmrNo AND DEPT_NAME=:deptName", nativeQuery = true)
	List<FinalInspectionReportF037> getDetailsBaseParam(@Param("date") String date,@Param("shift") String shift,@Param("pOrder") String pOrder,@Param("bmrNo") String bmrNo, @Param("deptName") String deptName);

	@Query(value = "SELECT * FROM precot.QA_FINAL_INSPECTION_REPORT_F037 WHERE DEPT_NAME=:deptName AND QA_HOD_DESIGNEE_STATUS = 'HOD_DESIGNEE_SAVED' OR QA_MR_STATUS != 'QA_MR_APPROVED' ORDER BY FINALINSPECTION_ID DESC", nativeQuery = true)
    List<FinalInspectionReportF037> qaHodDesigneeSummary(@Param("deptName") String deptName);

	@Query(value = "SELECT * FROM precot.QA_FINAL_INSPECTION_REPORT_F037 WHERE DEPT_NAME=:deptName AND QA_HOD_DESIGNEE_STATUS = 'HOD_DESIGNEE_APPROVED' AND QA_MR_STATUS != 'QA_MR_APPROVED' ORDER BY FINALINSPECTION_ID DESC", nativeQuery = true)
    List<FinalInspectionReportF037> qaManagerAndMrSummmary(@Param("deptName") String deptName);
	
	@Query(value = "SELECT * FROM precot.QA_FINAL_INSPECTION_REPORT_F037 WHERE MONTH =:month AND YEAR =:year AND DEPT_NAME=:deptName", nativeQuery = true)
	List<FinalInspectionReportF037> getMonthandYear(@Param("month") String month, @Param("year") String year, @Param("deptName") String deptName);
	
	@Query(value = "SELECT * FROM precot.QA_FINAL_INSPECTION_REPORT_F037 WHERE DEPT_NAME=:deptName AND QA_MR_STATUS = 'QA_MR_APPROVED' ORDER BY REQUEST_ID DESC", nativeQuery = true)
    List<FinalInspectionReportF037> getAllIfApproveForDistributionAndDistruction(@Param("deptName") String deptName);
	
	
	 @Query("SELECT new com.focusr.Precot.QA.model.FinalInspectionReportSummaryDto(q.finalInspectionId, q.date, q.shift, q.bmrNo, q.pOrder, q.reason, q.qa_inspector_status, q.qa_mr_status, q.firNo) " +
	           "FROM FinalInspectionReportF037 q " +
	           "WHERE q.deptName=:deptName AND (q.qa_inspector_status = 'QAINSPECTOR_SAVED' OR q.qa_mr_status != 'QA_MR_APPROVED') " +
	           "ORDER BY q.finalInspectionId DESC")
	    List<FinalInspectionReportSummaryDto> getFinalInspectionSummary(@Param("deptName") String deptName);

	    @Query("SELECT new com.focusr.Precot.QA.model.FinalInspectionReportSummaryDto(q.finalInspectionId, q.date, q.shift, q.bmrNo, q.pOrder, q.reason, q.qa_inspector_status, q.qa_mr_status, q.firNo) " +
	           "FROM FinalInspectionReportF037 q " +
	           "WHERE q.deptName=:deptName AND (q.qa_inspector_status = 'QA_INS_APPROVED' " +
	           "AND q.qa_mr_status != 'QA_MR_APPROVED') " +
	           "ORDER BY q.finalInspectionId DESC")
	    List<FinalInspectionReportSummaryDto> getMrSummary(@Param("deptName") String deptName);
	
	
//	@Query(value = "SELECT * FROM precot.PADPUNCHING_HOUSE_KEEP_CLEAN_CHECK_LIST_F010 WHERE date IS NULL OR DATE = :date AND (HOD_STATUS = 'HOD_APPROVED')", nativeQuery = true)
//	List<PadPunchingHouseKeepingCheckListF010> printRPProdReport(@Param("date") String date);
	
//	@Query(value = "SELECT * FROM precot.QA_REQUEST_AND_ISSUNCE_OF_DOCUMENT_F002 " +
//            "WHERE (:date IS NULL OR :date='' OR DATE=:date) " +           
//            "AND QA_MR_STATUS = 'QA_MR_APPROVED'", nativeQuery = true)
//List<RequestAndIssunceOfDocumentF002> printContainerInspectionReport(
//     @Param("date") String date,
//     @Param("month") String month,
//     @Param("year") String year
//    
//);
	
	@Query(value = "SELECT * FROM precot.QA_FINAL_INSPECTION_REPORT_F037 " +
            "WHERE (:date IS NULL OR :date='' OR DATE = :date) " +           
            "AND (:shift IS NULL OR :shift='' OR SHIFT = :shift) " +
            "AND (:bmrNo IS NULL OR :bmrNo='' OR BMR_NO = :bmrNo) " +
            "AND (:pOrder IS NULL OR :pOrder='' OR PORDER= :pOrder) " +
            "AND QA_MR_STATUS = 'QA_MR_APPROVED' AND DEPT_NAME=:deptName", nativeQuery = true)
List<FinalInspectionReportF037> printFinalInspectionReport(
     @Param("date") String date,
     @Param("shift") String shift,
     @Param("bmrNo") String bmrNo,
     @Param("pOrder") String pOrder,
     @Param("deptName") String deptName
);
	
	//Print queries
//	GET BMR BASED ON DATE AND SHIFT
	@Query(value = "SELECT DISTINCT BMR_NO FROM PDE.precot.QA_FINAL_INSPECTION_REPORT_F037 WHERE DATE=:date AND SHIFT=:shift AND DEPT_NAME=:deptName", nativeQuery = true)
	List<String> getBmrBasedDateAndShift(@Param("date") String date, @Param("shift") String shift, @Param("deptName") String deptName);
	
//GET BMR BASED PORDER
	@Query(value = "SELECT DISTINCT PORDER FROM PDE.precot.QA_FINAL_INSPECTION_REPORT_F037 WHERE DATE=:date AND SHIFT=:shift AND BMR_NO=:bmrNo AND DEPT_NAME=:deptName", nativeQuery = true)
	List<String> getPorderBasedDateShiftAndBmr(@Param("date") String date, @Param("shift") String shift,@Param("bmrNo") String bmrNo, @Param("deptName") String deptName);
	
	
	@Query(value = "SELECT * FROM PDE.precot.QA_FINAL_INSPECTION_REPORT_F037 WHERE DATE = :date AND  SHIFT = :shift AND BMR_NO = :bmrNo (:pOrder IS NULL OR :pOrder = '' OR PORDER = :pOrder) AND QA_MR_STATUS = 'QA_MR_APPROVED' AND DEPT_NAME=:deptName", nativeQuery = true)
    List<FinalInspectionReportF037> getDetailsByPorder(@Param("date") String date,@Param("shift") String shift, @Param("bmrNo") String bmrNo, @Param("pOrder") String pOrder, @Param("deptName") String deptName);
//
	
	 //Form Number generation
	 @Query(value = "SELECT TOP 1 * FROM precot.QA_FINAL_INSPECTION_REPORT_F037 WHERE DEPT_NAME='QUALITY_ASSURANCE' ORDER BY FINALINSPECTION_ID DESC", nativeQuery = true)
	 FinalInspectionReportF037 fetchLastGeneratedNo();
	 
	 
	 @Query(value = "SELECT TOP 1 * FROM precot.QA_FINAL_INSPECTION_REPORT_F037 WHERE DEPT_NAME='COTTON_BUDS' ORDER BY FINALINSPECTION_ID DESC", nativeQuery = true)
	 FinalInspectionReportF037 fetchLastGeneratedNoForBuds();
	 
	 
	
	
//	============================================================== PDE ============================================================
	
//	MACHINE NAME
	
	@Query(value = "SELECT IPNo, CNo, MCN, MCat\r\n"
			+ "FROM PDE.dbo.tblMCDet", nativeQuery = true)
	List<Map<String, Object>> getAllMachineName();	
	
//	BMR LOV
	
	 @Query(value = "SELECT DISTINCT BATCH_NO FROM PDE.precot.PUNCHING_BMR_PROD_DETAILS \r\n"
	 		+ "               UNION \r\n"
	 		+ "               SELECT DISTINCT BATCH_NO FROM PDE.precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS", nativeQuery = true)
	    List<String> getBmrNumberLovForFinalInspectionReport();
	 
//  PORDER BASED ON BMR
	 
	    @Query(value = "SELECT ORDER_NO FROM PDE.precot.PUNCHING_BMR_PROD_DETAILS WHERE BATCH_NO = :batchNo \r\n"
	    		+ "UNION \r\n"
	    		+ "SELECT ORDER_NO FROM PDE.precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS WHERE BATCH_NO = :batchNo \r\n"
	    		+ "", nativeQuery = true)
	    List<String> findOrderNoByBmr(@Param("batchNo") String batchNo);
	    
//	PONO AND MATERIAL BASED ON PORDER
	    
	    @Query(value = "SELECT \r\n"
	    		+ "    PoNo,\r\n"
	    		+ "    Material AS Itemcode\r\n"
	    		+ "FROM \r\n"
	    		+ "    [PDE].[dbo].[tblOrderinfo]\r\n"
	    		+ "WHERE \r\n"
	    		+ "    POrder = :pOrder ", nativeQuery = true)
	    List<Object[]> findPoNoAndMaterial(@Param("pOrder") String pOrder);	    
	    
//	    CUSTOMERNAME AND MATERIAL DESCRIPTION
	    
	    @Query(value = "  SELECT \r\n"
	    		+ "    CUST_NAME,  \r\n"
	    		+ "    MAT_DESC    \r\n"
	    		+ "FROM \r\n"
	    		+ "    [PDE].[dbo].[Tblcusinfo]\r\n"
	    		+ "WHERE \r\n"
	    		+ "    Material = :material", nativeQuery = true)
	    List<Object[]> findCustomerNameAndProductDesc(@Param("material") String material);
	    
	    
	    	// TRACEABILITY
	    
	    @Query(value = "SELECT * FROM precot.QA_FINAL_INSPECTION_REPORT_F037 WHERE BMR_NO=:batchNumber AND DEPT_NAME = 'QUALITY_ASSURANCE' ", nativeQuery = true)
		List<FinalInspectionReportF037> finalInspectionTraceForpleat(@Param("batchNumber") String batchNumber);
	    
	    
	    @Query(value = "SELECT * FROM precot.QA_FINAL_INSPECTION_REPORT_F037 WHERE BMR_NO=:batchNumber AND DEPT_NAME = 'QUALITY_ASSURANCE' ", nativeQuery = true)
		List<FinalInspectionReportF037> finalInspectionTraceForWoll(@Param("batchNumber") String batchNumber);
	    
	    
	    @Query(value = "SELECT * FROM precot.QA_FINAL_INSPECTION_REPORT_F037 WHERE BMR_NO=:batchNumber AND DEPT_NAME = 'QUALITY_ASSURANCE' ", nativeQuery = true)
	    List<FinalInspectionReportF037> finalInspectionTraceForBalls(@Param("batchNumber") String batchNumber);
	    
	    @Query(value = "SELECT * FROM precot.QA_FINAL_INSPECTION_REPORT_F037 WHERE BMR_NO=:batchNumber AND DEPT_NAME = 'QUALITY_ASSURANCE'", nativeQuery = true)
	    List<FinalInspectionReportF037> finalInspectionQAFormTrace(@Param("batchNumber") String batchNumber);
	    
	    
	    @Query(value = "SELECT * FROM precot.QA_FINAL_INSPECTION_REPORT_F037 WHERE BMR_NO=:batchNumber AND DEPT_NAME = 'COTTON_BUDS'", nativeQuery = true)
	    List<FinalInspectionReportF037> finalInspectionBudsFormTrace(@Param("batchNumber") String batchNumber);
	
	    @Query(value = "SELECT * FROM precot.QA_FINAL_INSPECTION_REPORT_F037 WHERE BMR_NO=:bmrNo", nativeQuery = true)
		List<FinalInspectionReportF037> getDetailsByBmr(@Param("bmrNo") String bmrNo);
	    
}