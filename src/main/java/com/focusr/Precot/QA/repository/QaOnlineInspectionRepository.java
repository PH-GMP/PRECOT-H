package com.focusr.Precot.QA.repository;

import java.util.List;

import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.QaOnlineInspectionReport;
import com.focusr.Precot.QA.model.QaOnlineInspectionReportDto;
import com.focusr.Precot.QA.model.QaPestControllerAreaOfTreatments;
import com.focusr.Precot.QA.model.QaRodentBoxCheckList;
import com.focusr.Precot.mssql.database.model.padpunching.DailyRollConsumptionReportF002;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingHouseKeepingCheckListF010;

@Repository
public interface QaOnlineInspectionRepository extends JpaRepository<QaOnlineInspectionReport, Long> {

	@Query(value = "SELECT * FROM precot.QA_ONLINE_INSPECTION_REPORT_F034 WHERE INSPECTION_ID = :inspectionId ", nativeQuery = true)
	QaOnlineInspectionReport findFormById(@Param("inspectionId") long inspectionId);

//	@Query(value = "SELECT * FROM precot.QA_ONLINE_INSPECTION_REPORT_F034 WHERE DATE=:date AND SHIFT =:shift AND MACHINE_NO=:machineNo AND BMR_NO=:bmrNo AND PORDER=:pOrder AND FORMAT_NO=:formatNo", nativeQuery = true)
//	List<QaOnlineInspectionReport> getDetailsBaseParam(@Param("date") String date, @Param("shift") String shift,
//			@Param("machineNo") String machineNo, @Param("pOrder") String pOrder, @Param("bmrNo") String bmrNo, @Param("formatNo") String formatNo);
//06-11-2024
	@Query(value = "SELECT * FROM precot.QA_ONLINE_INSPECTION_REPORT_F034 WHERE DATE=:date AND SHIFT =:shift AND MACHINE_NO=:machineNo AND BMR_NO=:bmrNo AND PORDER=:pOrder AND FORMAT_NO=:formatNo", nativeQuery = true)
	List<QaOnlineInspectionReport> getDetailsBaseParam(@Param("date") String date, @Param("shift") String shift,
			@Param("machineNo") String machineNo, @Param("pOrder") String pOrder, @Param("bmrNo") String bmrNo, @Param("formatNo") String formatNo);
	
//	SELECT * FROM precot.QA_ONLINE_INSPECTION_REPORT_F034 WHERE DATE=? AND SHIFT =? AND MACHINE_NO=? AND BMR_NO=? AND PORDER=? AND FORMAT_NO=?
	
//	@Query(value = "SELECT INSPECTION_ID,DATE,SHIFT,MACHINE_NO,BMR_NO,PORDER,REASON,QA_INSPECTOR_STATUS,PROD_SUPERVISOR_STATUS,QA_MR_STATUS FROM precot.QA_ONLINE_INSPECTION_REPORT_F034 WHERE DEPARTMENT=:department AND QA_INSPECTOR_STATUS = 'QAINSPECTOR_SAVED' OR QA_MR_STATUS != 'QA_MR_APPROVED' ORDER BY INSPECTION_ID DESC", nativeQuery = true)
//    List<QaOnlineInspectionReportDto> qaInspectorSummary(@Param("department") String department);
//		
//	@Query(value = "SELECT INSPECTION_ID,DATE,SHIFT,MACHINE_NO,BMR_NO,PORDER,REASON,QA_INSPECTOR_STATUS,PROD_SUPERVISOR_STATUS,QA_MR_STATUS FROM precot.QA_ONLINE_INSPECTION_REPORT_F034 WHERE QA_INSPECTOR_STATUS = 'QAINSPECTOR_SAVED' OR QA_MR_STATUS != 'QA_MR_APPROVED' ORDER BY INSPECTION_ID DESC", nativeQuery = true)
//    List<QaOnlineInspectionReportDto> qaInspectorSummaryGet();
//
//	@Query(value = "SELECT INSPECTION_ID,DATE,SHIFT,MACHINE_NO,BMR_NO,PORDER,REASON,QA_INSPECTOR_STATUS,PROD_SUPERVISOR_STATUS,QA_MR_STATUS FROM precot.QA_ONLINE_INSPECTION_REPORT_F034 WHERE DEPARTMENT=:department AND QA_INSPECTOR_STATUS = 'QA_INS_APPROVED' AND QA_MR_STATUS != 'QA_MR_APPROVED' ORDER BY INSPECTION_ID DESC", nativeQuery = true)
//    List<QaOnlineInspectionReportDto> supervisorMrSummary(@Param("department") String department);

//	@Query("SELECT new com.focusr.Precot.QA.model.QaOnlineInspectionReportDto(q.inspectionId, q.date, q.shift, q.machineNo, q.bmrNo, q.pOrder, q.reason, q.qa_inspector_status, q.prod_supervisor_status, q.qa_mr_status, q.department) "
//			+ "FROM QaOnlineInspectionReport q "
//			+ "WHERE q.department = :department AND (q.qa_inspector_status = 'QAINSPECTOR_SAVED' OR q.qa_mr_status != 'QA_MR_APPROVED') "
//			+ "ORDER BY q.inspectionId DESC")
//	List<QaOnlineInspectionReportDto> qaInspectorSummary(@Param("department") String department);

//		@Query("SELECT new com.focusr.Precot.QA.model.QaOnlineInspectionReportDto(q.inspectionId, q.date, q.shift, q.machineNo, q.bmrNo, q.pOrder, q.reason, q.qa_inspector_status, q.prod_supervisor_status, q.qa_mr_status, q.department) " +
//		       "FROM QaOnlineInspectionReport q " +
//		       "WHERE q.qa_inspector_status = 'QAINSPECTOR_SAVED' OR q.qa_mr_status != 'QA_MR_APPROVED' " +
//		       "ORDER BY q.inspectionId DESC")
//		List<QaOnlineInspectionReportDto> qaInspectorSummaryGet();
//
////		@Query("SELECT new com.focusr.Precot.QA.model.QaOnlineInspectionReportDto(q.inspectionId, q.date, q.shift, q.machineNo, q.bmrNo, q.pOrder, q.reason, q.qa_inspector_status, q.prod_supervisor_status, q.qa_mr_status, q.department) " +
////		       "FROM QaOnlineInspectionReport q " +
////		       "WHERE q.department = :department AND q.qa_inspector_status = 'QA_INS_APPROVED' AND q.qa_mr_status != 'QA_MR_APPROVED' " +
////		       "ORDER BY q.inspectionId DESC")
////		List<QaOnlineInspectionReportDto> supervisorMrSummary(@Param("department") String department);
//		@Query("SELECT new com.focusr.Precot.QA.model.QaOnlineInspectionReportDto(q.inspectionId, q.date, q.shift, q.machineNo, q.bmrNo, q.pOrder, q.reason, q.qa_inspector_status, q.prod_supervisor_status, q.qa_mr_status, q.department) " +
//			       "FROM QaOnlineInspectionReport q " +
//			       "WHERE q.department = :department AND q.qa_inspector_status = 'QA_INS_APPROVED' AND q.qa_mr_status != 'QA_MR_APPROVED' " +
//			       "ORDER BY q.inspectionId DESC")
//			List<QaOnlineInspectionReportDto> supervisorMrSummary(@Param("department") String department);

	@Query("SELECT new com.focusr.Precot.QA.model.QaOnlineInspectionReportDto(q.inspectionId, q.date, q.formatNo, q.shift, q.machineNo, q.bmrNo, q.pOrder, q.reason, q.qa_inspector_status, q.prod_supervisor_status, q.qa_mr_status, q.department) "
	        + "FROM QaOnlineInspectionReport q "
	        + "WHERE (q.qa_inspector_status = 'QAINSPECTOR_SAVED' OR q.qa_mr_status != 'QA_MR_APPROVED') "
	        + "AND q.formatNo = :formatNo "  // Added parameter here
	        + "ORDER BY q.inspectionId DESC")
	List<QaOnlineInspectionReportDto> qaInspectorSummaryGet(@Param("formatNo") String formatNo);


	@Query("SELECT new com.focusr.Precot.QA.model.QaOnlineInspectionReportDto(q.inspectionId, q.date, q.formatNo, q.shift, q.machineNo, q.bmrNo, q.pOrder, q.reason, q.qa_inspector_status, q.prod_supervisor_status, q.qa_mr_status, q.department) "
	        + "FROM QaOnlineInspectionReport q "
	        + "WHERE q.department = :department "
	        + "AND q.qa_inspector_status = 'QA_INS_SUBMITTED' "
	        + "AND q.qa_mr_status != 'QA_MR_APPROVED' "
	        + "AND q.formatNo = :formatNo "  // Added parameter here
	        + "ORDER BY q.inspectionId DESC")
	List<QaOnlineInspectionReportDto> supervisorSummary(@Param("department") String department, @Param("formatNo") String formatNo);

	@Query("SELECT new com.focusr.Precot.QA.model.QaOnlineInspectionReportDto(q.inspectionId, q.date, q.formatNo, q.shift, q.machineNo, q.bmrNo, q.pOrder, q.reason, q.qa_inspector_status, q.prod_supervisor_status, q.qa_mr_status, q.department) "
	        + "FROM QaOnlineInspectionReport q "
	        + "WHERE q.qa_inspector_status = 'QA_INS_SUBMITTED' "
	        + "AND q.qa_mr_status != 'QA_MR_APPROVED' "
	        + "AND q.formatNo = :formatNo "  // Added parameter here
	        + "ORDER BY q.inspectionId DESC")
	List<QaOnlineInspectionReportDto> managerAndMrSummary(@Param("formatNo") String formatNo);

//

	@Query(value = "SELECT * FROM precot.QA_ONLINE_INSPECTION_REPORT_F034 WHERE MONTH =:month AND YEAR =:year", nativeQuery = true)
	List<QaOnlineInspectionReport> getMonthandYear(@Param("month") String month, @Param("year") String year);

//	@Query(value = "SELECT * FROM precot.PADPUNCHING_HOUSE_KEEP_CLEAN_CHECK_LIST_F010 WHERE date IS NULL OR DATE = :date AND (HOD_STATUS = 'HOD_APPROVED')", nativeQuery = true)
//	List<PadPunchingHouseKeepingCheckListF010> printRPProdReport(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.QA_ONLINE_INSPECTION_REPORT_F034 "
			+ "WHERE (:date IS NULL OR :date='' OR DATE=:date) " + "AND (:shift IS NULL OR :shift='' OR SHIFT=:shift) "
			+ "AND (:machineNo IS NULL OR :machineNo='' OR MACHINE_NO=:machineNo) " + // New parameter
			"AND (:pOrder IS NULL OR :pOrder='' OR PORDER=:pOrder) " + // New parameter
			"AND (:bmrNo IS NULL OR :bmrNo='' OR BMR_NO=:bmrNo) " + // New parameter
			"AND QA_MR_STATUS = 'QA_MR_APPROVED' AND FORMAT_NO=:formatNo", nativeQuery = true)
	List<QaOnlineInspectionReport> printOnlineInspectionReportF034(@Param("date") String date,
			@Param("shift") String shift, @Param("machineNo") String machineNo, // New parameter
			@Param("pOrder") String pOrder, // New parameter
			@Param("bmrNo") String bmrNo, // New parameter
			@Param("formatNo") String formatNo // New parameter
	);

	@Query(value = "SELECT * FROM precot.PADPUNCHING_HOUSE_KEEP_CLEAN_CHECK_LIST_F010 WHERE CLEAN_ID =:id", nativeQuery = true)
	List<PadPunchingHouseKeepingCheckListF010> getMonthandYear(@Param("id") Long id);

	@Query(value = "SELECT * FROM precot.PADPUNCHING_HOUSE_KEEP_CLEAN_CHECK_LIST_F010 WHERE CLEAN_ID=:id", nativeQuery = true)
	PadPunchingHouseKeepingCheckListF010 getHousekeepingRecordById(@Param("id") Long id);

//	============================================== QA DEPARTMENT =================================================

	@Query(value = "SELECT IPNo, CNo, MCN, MCat FROM PDE.dbo.tblMCDet", nativeQuery = true)
	List<Map<String, Object>> getAllMachineName();
	
	//F034
	@Query(value = "SELECT IPNo, CNo, MCN, MCat FROM PDE.dbo.tblMCDet WHERE Mcat IN ('Pads', 'Pleats', 'Wool Roll')", nativeQuery = true)
	List<Map<String, Object>> getMachineNameForPadPunching();
	
	//F035
	@Query(value = "SELECT IPNo, CNo, MCN, MCat FROM PDE.dbo.tblMCDet WHERE Mcat ='Balls'", nativeQuery = true)
	List<Map<String, Object>> getMachineNameForBalls();	

	//F036
	@Query(value = "SELECT IPNo, CNo, MCN, MCat FROM PDE.dbo.tblMCDet WHERE Mcat ='Bud'", nativeQuery = true)
	List<Map<String, Object>> getMachineNameForBuds();	
	
	// BMR Lov

	@Query(value = "SELECT DISTINCT BATCH_NO FROM PDE.precot.PUNCHING_BMR_PROD_DETAILS", nativeQuery = true)
	List<String> getBmrNumberLovPadPunching(@Param("department") String department);

	@Query(value = "SELECT DISTINCT BATCH_NO FROM PDE.precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS", nativeQuery = true)
	List<String> getBmrLovDryGoods(@Param("department") String department);
	
	@Query(value = "SELECT DISTINCT BATCH_NO FROM PDE.precot.BUDS_BMR_PRODUCTION_DETAILS", nativeQuery = true)
	List<String> getBmrLovCottonBuds(@Param("department") String department);

	// POrder

	@Query(value = "SELECT ORDER_NO FROM PDE.precot.PUNCHING_BMR_PROD_DETAILS WHERE BATCH_NO = :batchNo", nativeQuery = true)
	List<String> findOrderNoByPadPunchingBmr(@Param("batchNo") String batchNo);

	@Query(value = "SELECT ORDER_NO FROM PDE.precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS WHERE BATCH_NO = :batchNo", nativeQuery = true)
	List<String> findOrderNoByDryGoodsBmr(@Param("batchNo") String batchNo);

	// PoNo and Material

	@Query(value = "SELECT \r\n" + "    PoNo,POrder ,\r\n" + "    Material AS Itemcode\r\n" + "FROM \r\n"
			+ "    [PDE].[dbo].[tblOrderinfo]\r\n" + "WHERE \r\n" + "    POrder = :pOrder", nativeQuery = true)
	List<Object[]> findPoNoAndMaterial(@Param("pOrder") String pOrder);

	// CustomerName and ProductDescription

	@Query(value = "SELECT CUST_NAME, MAT_DESC FROM [PDE].[dbo].[Tblcusinfo] WHERE Material = :material", nativeQuery = true)
	List<Object[]> findCustomerNameAndProductDesc(@Param("material") String material);
	
			// TRACEABILITY
	
	@Query(value = "SELECT * FROM precot.QA_ONLINE_INSPECTION_REPORT_F034 WHERE BMR_NO=:batchNumber AND FORMAT_NO = 'PH-QAD01-F-034'", nativeQuery = true)
	List<QaOnlineInspectionReport> onlineInspectionTraceForPleat(@Param("batchNumber") String batchNumber);
	
	
	@Query(value = "SELECT * FROM precot.QA_ONLINE_INSPECTION_REPORT_F034 WHERE BMR_NO=:batchNumber AND FORMAT_NO = 'PH-QAD01-F-034'", nativeQuery = true)
	List<QaOnlineInspectionReport> onlineInspectionTraceForWoll(@Param("batchNumber") String batchNumber);
	
	
	@Query(value = "SELECT * FROM precot.QA_ONLINE_INSPECTION_REPORT_F034 WHERE BMR_NO=:batchNumber AND FORMAT_NO = 'PH-QAD01-F-035'", nativeQuery = true)
	List<QaOnlineInspectionReport> onlineInspectionTraceForBalls(@Param("batchNumber") String batchNumber);
	
	@Query(value = "SELECT * FROM precot.QA_ONLINE_INSPECTION_REPORT_F034 WHERE BMR_NO=:batchNumber AND FORMAT_NO IN ('PH-QAD01-F-036')", nativeQuery = true)
	List<QaOnlineInspectionReport> onlineInspectionTraceForBuds(@Param("batchNumber") String batchNumber);

	@Query(value = "SELECT * FROM precot.QA_ONLINE_INSPECTION_REPORT_F034 WHERE BMR_NO=:bmrNo AND FORMAT_NO='PH-QAD01-F-034'", nativeQuery = true)
	List<QaOnlineInspectionReport> getDetailsOnlineInspection(@Param("bmrNo") String bmrNo);
}
