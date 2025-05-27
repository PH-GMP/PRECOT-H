package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.ManagementOfIncidence;
import com.focusr.Precot.QA.model.QaContainerInspectionReport;
import com.focusr.Precot.QA.model.QaOnlineInspectionReport;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingHouseKeepingCheckListF010;

@Repository
public interface QaContainerInspectionReportRepository extends JpaRepository<QaContainerInspectionReport, Long>{
	
	@Query(value = "SELECT * FROM precot.QA_CONTAINER_INSPECTION_REPORT_F039 WHERE CONTAINER_ID = :containerId ", nativeQuery = true)
	QaContainerInspectionReport findFormById(@Param("containerId") long containerId);
	
	@Query(value = "SELECT * FROM precot.QA_CONTAINER_INSPECTION_REPORT_F039 WHERE DATE=:date AND CIR_NO =:cirNo ", nativeQuery = true)
	List<QaContainerInspectionReport> getDetailsBaseParam(@Param("date") String date, @Param("cirNo") String cirNo);

	@Query(value = "SELECT * FROM precot.QA_CONTAINER_INSPECTION_REPORT_F039 WHERE QA_INSPECTOR_STATUS = 'QAINSPECTOR_SAVED' OR QA_MR_STATUS != 'QA_MR_APPROVED' ORDER BY CONTAINER_ID DESC", nativeQuery = true)
    List<QaContainerInspectionReport> qaInspectorSummary();

	@Query(value = "SELECT * FROM precot.QA_CONTAINER_INSPECTION_REPORT_F039 WHERE QA_INSPECTOR_STATUS = 'QA_INS_APPROVED' AND QA_MR_STATUS != 'QA_MR_APPROVED' ORDER BY CONTAINER_ID DESC", nativeQuery = true)
    List<QaContainerInspectionReport> securitySupervisorMrSummary();
	
	@Query(value = "SELECT * FROM precot.QA_CONTAINER_INSPECTION_REPORT_F039 WHERE MONTH =:month AND YEAR =:year", nativeQuery = true)
	List<QaContainerInspectionReport> getMonthandYear(@Param("month") String month, @Param("year") String year);
	
//	@Query(value = "SELECT * FROM precot.PADPUNCHING_HOUSE_KEEP_CLEAN_CHECK_LIST_F010 WHERE date IS NULL OR DATE = :date AND (HOD_STATUS = 'HOD_APPROVED')", nativeQuery = true)
//	List<PadPunchingHouseKeepingCheckListF010> printRPProdReport(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.QA_CONTAINER_INSPECTION_REPORT_F039 " +
            "WHERE (:date IS NULL OR :date='' OR DATE=:date) " +
            "AND (:cirNo IS NULL OR :cirNo='' OR CIR_NO=:cirNo) " +
           
            "AND QA_MR_STATUS = 'QA_MR_APPROVED'", nativeQuery = true)
List<QaContainerInspectionReport> printContainerInspectionReport(
     @Param("date") String date,
     @Param("cirNo") String cirNo
    
);
	
	 //Form Number generation
 	 @Query(value = "SELECT TOP 1 * FROM precot.QA_CONTAINER_INSPECTION_REPORT_F039 ORDER BY CONTAINER_ID DESC", nativeQuery = true)
 	QaContainerInspectionReport fetchLastGeneratedNo();
 	 
 	//APPROVED CIR NO
 	
 	@Query(value = "SELECT CIR_NO FROM PDE.precot.QA_CONTAINER_INSPECTION_REPORT_F039 WHERE QA_MR_STATUS ='QA_MR_APPROVED'", nativeQuery = true)
 	List<String> approvedCirNo();
//	============================================================== PDE ================================================================
	
//	@Query(value = "SELECT BATCH_NO,PO_STATUS FROM PDE.precot.PUNCHING_BMR_PROD_DETAILS pbpd WHERE PO_STATUS ='Closed'", nativeQuery = true)
//    List<Object[]> punchingClosingBmr();
//	
//	@Query(value = "SELECT BATCH_NO,PO_COMP_STATUS FROM PDE.precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS where PO_COMP_STATUS='Close'\r\n"
//			+ "", nativeQuery = true)
//    List<Object[]> dryGoodsClosingBmr();
	
	
	@Query(value = "SELECT BATCH_NO, PO_STATUS FROM PDE.precot.PUNCHING_BMR_PROD_DETAILS WHERE PO_STATUS = 'Close'", nativeQuery = true)
    List<Object[]> punchingClosingBmr();
    
    @Query(value = "SELECT BATCH_NO, PO_COMP_STATUS FROM PDE.precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS WHERE PO_COMP_STATUS = 'Close'", nativeQuery = true)
    List<Object[]> dryGoodsClosingBmr();

    
    @Query(value = "SELECT BATCH_NO,PO_STATUS  FROM PDE.precot.SPUNLACE_BMR_B01_R01_PRODUCTION_DETAILS WHERE PO_STATUS='CLOSE'", nativeQuery = true)
    List<Object[]> spunlaunceClosingBmr();
    
    @Query(value = "SELECT BMR_NO,STATUS FROM PDE.precot.BLEACH_BMR_LAYDOWN_MAPPING WHERE STATUS ='CLOSED'", nativeQuery = true)
    List<Object[]> bleachingClosingBmr();
	
	
 

}
