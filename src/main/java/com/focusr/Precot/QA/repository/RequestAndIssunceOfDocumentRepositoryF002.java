package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.QaContainerInspectionReport;
import com.focusr.Precot.QA.model.RequestAndIssunceOfDocumentF002;

@Repository
public interface RequestAndIssunceOfDocumentRepositoryF002 extends JpaRepository<RequestAndIssunceOfDocumentF002, Long>{

	
	@Query(value = "SELECT * FROM precot.QA_REQUEST_AND_ISSUNCE_OF_DOCUMENT_F002 WHERE REQUEST_ID = :containerId ", nativeQuery = true)
	RequestAndIssunceOfDocumentF002 findFormById(@Param("containerId") long containerId);
	
	@Query(value = "SELECT * FROM precot.QA_REQUEST_AND_ISSUNCE_OF_DOCUMENT_F002 WHERE DATE=:date AND MONTH=:month AND YEAR=:year", nativeQuery = true)
	List<RequestAndIssunceOfDocumentF002> getDetailsBaseParam(@Param("date") String date,@Param("month") String month,@Param("year") String year);

	@Query(value = "SELECT * FROM precot.QA_REQUEST_AND_ISSUNCE_OF_DOCUMENT_F002 WHERE QA_HOD_DESIGNEE_STATUS = 'HOD_DESIGNEE_SAVED' OR QA_MR_STATUS != 'QA_MR_APPROVED' ORDER BY REQUEST_ID DESC", nativeQuery = true)
    List<RequestAndIssunceOfDocumentF002> qaHodDesigneeSummary();

	@Query(value = "SELECT * FROM precot.QA_REQUEST_AND_ISSUNCE_OF_DOCUMENT_F002 WHERE QA_HOD_DESIGNEE_STATUS = 'HOD_DESIGNEE_APPROVED' AND QA_MR_STATUS != 'QA_MR_APPROVED' ORDER BY REQUEST_ID DESC", nativeQuery = true)
    List<RequestAndIssunceOfDocumentF002> qaManagerAndMrSummmary();
	
	@Query(value = "SELECT * FROM precot.QA_REQUEST_AND_ISSUNCE_OF_DOCUMENT_F002 WHERE MONTH =:month AND YEAR =:year", nativeQuery = true)
	List<RequestAndIssunceOfDocumentF002> getMonthandYear(@Param("month") String month, @Param("year") String year);
	
	@Query(value = "SELECT * FROM precot.QA_REQUEST_AND_ISSUNCE_OF_DOCUMENT_F002 WHERE QA_MR_STATUS = 'QA_MR_APPROVED' ORDER BY REQUEST_ID DESC", nativeQuery = true)
    List<RequestAndIssunceOfDocumentF002> getAllIfApproveForDistributionAndDistruction();
	
//	@Query(value = " SELECT \r\n"
//			+ "    req.REQUEST_ID, \r\n"
//			+ "    req.createdAt, \r\n"
//			+ "    req.updatedAt, \r\n"
//			+ "    req.createdBy, \r\n"
//			+ "    req.updatedBy, \r\n"
//			+ "    req.COMMENTS, \r\n"
//			+ "    req.[DATE], \r\n"
//			+ "    req.FORMAT_NAME, \r\n"
//			+ "    req.FORMAT_NO, \r\n"
//			+ "    req.QA_HOD_DESIGNEE_SIGNATURE_IMAGE, \r\n"
//			+ "    req.[MONTH], \r\n"
//			+ "    req.QA_HOD_DESIGNEE_SAVE_BY, \r\n"
//			+ "    req.QA_HOD_DESIGNEE_SAVE_ID, \r\n"
//			+ "    req.QA_HOD_DESIGNEE_SAVE_ON, \r\n"
//			+ "    req.QA_HOD_DESIGNEE_SIGN, \r\n"
//			+ "    req.QA_HOD_DESIGNEE_STATUS, \r\n"
//			+ "    req.QA_HOD_DESIGNEE_SUBMIT_BY, \r\n"
//			+ "    req.QA_HOD_DESIGNEE_SUBMIT_ID, \r\n"
//			+ "    req.QA_HOD_DESIGNEE_SUBMIT_ON, \r\n"
//			+ "    req.QA_MR_SIGN, \r\n"
//			+ "    req.QA_MR_SIGNATURE_IMAGE, \r\n"
//			+ "    req.QA_MR_STATUS, \r\n"
//			+ "    req.QA_MR_SUBMIT_BY, \r\n"
//			+ "    req.QA_MR_SUBMIT_ID, \r\n"
//			+ "    req.QA_MR_SUBMIT_ON, \r\n"
//			+ "    req.REASON, \r\n"
//			+ "    req.REVISION_NUMBER, \r\n"
//			+ "    req.SOP_NO, \r\n"
//			+ "    req.UNIT, \r\n"
//			+ "    req.[YEAR], \r\n"
//			+ "    line.LINE_ID, \r\n"
//			+ "    line.DOCUMENT_NAME, \r\n"
//			+ "    line.DOCUMENT_NO \r\n"
//			+ "FROM \r\n"
//			+ "    PDE.precot.QA_REQUEST_AND_ISSUNCE_OF_DOCUMENT_F002 req \r\n"
//			+ "JOIN \r\n"
//			+ "    PDE.precot.QA_REQUEST_AND_ISSUNCE_OF_LINE_DOCUMENT_F002 line \r\n"
//			+ "ON \r\n"
//			+ "    req.REQUEST_ID = line.REQUEST_ID \r\n"
//			+ "WHERE \r\n"
//			+ "    req.QA_MR_STATUS = 'QA_MR_APPROVED' \r\n"
//			+ "    AND NOT EXISTS (\r\n"
//			+ "        SELECT 1 \r\n"
//			+ "        FROM PDE.precot.QA_REQUEST_AND_ISSUNCE_OF_LINE_DOCUMENT_F002 lineCheck \r\n"
//			+ "        WHERE \r\n"
//			+ "            lineCheck.REQUEST_ID = req.REQUEST_ID \r\n"
//			+ "            AND lineCheck.LINE_ID = line.LINE_ID\r\n"
//			+ "    )\r\n"
//			+ "ORDER BY \r\n"
//			+ "    req.REQUEST_ID DESC;\r\n"
//			+ "", 
//    nativeQuery = true)
//List<RequestAndIssunceOfDocumentF002> getAllIfApproveForDistributionAndDistructions();
	
//	@Query(value = " SELECT \r\n"
//			+ "    req.REQUEST_ID, \r\n"
//			+ "    req.createdAt, \r\n"
//			+ "    req.updatedAt, \r\n"
//			+ "    req.createdBy, \r\n"
//			+ "    req.updatedBy, \r\n"
//			+ "    req.COMMENTS, \r\n"
//			+ "    req.[DATE], \r\n"
//			+ "    req.FORMAT_NAME, \r\n"
//			+ "    req.FORMAT_NO, \r\n"
//			+ "    req.QA_HOD_DESIGNEE_SIGNATURE_IMAGE, \r\n"
//			+ "    req.[MONTH], \r\n"
//			+ "    req.QA_HOD_DESIGNEE_SAVE_BY, \r\n"
//			+ "    req.QA_HOD_DESIGNEE_SAVE_ID, \r\n"
//			+ "    req.QA_HOD_DESIGNEE_SAVE_ON, \r\n"
//			+ "    req.QA_HOD_DESIGNEE_SIGN, \r\n"
//			+ "    req.QA_HOD_DESIGNEE_STATUS, \r\n"
//			+ "    req.QA_HOD_DESIGNEE_SUBMIT_BY, \r\n"
//			+ "    req.QA_HOD_DESIGNEE_SUBMIT_ID, \r\n"
//			+ "    req.QA_HOD_DESIGNEE_SUBMIT_ON, \r\n"
//			+ "    req.QA_MR_SIGN, \r\n"
//			+ "    req.QA_MR_SIGNATURE_IMAGE, \r\n"
//			+ "    req.QA_MR_STATUS, \r\n"
//			+ "    req.QA_MR_SUBMIT_BY, \r\n"
//			+ "    req.QA_MR_SUBMIT_ID, \r\n"
//			+ "    req.QA_MR_SUBMIT_ON, \r\n"
//			+ "    req.REASON, \r\n"
//			+ "    req.REVISION_NUMBER, \r\n"
//			+ "    req.SOP_NO, \r\n"
//			+ "    req.UNIT, \r\n"
//			+ "    req.[YEAR], \r\n"
//			+ "    line.LINE_ID, \r\n"
//			+ "    line.DOCUMENT_NAME, \r\n"
//			+ "    line.DOCUMENT_NO \r\n"
//			+ "FROM \r\n"
//			+ "    PDE.precot.QA_REQUEST_AND_ISSUNCE_OF_DOCUMENT_F002 req \r\n"
//			+ "JOIN \r\n"
//			+ "    PDE.precot.QA_REQUEST_AND_ISSUNCE_OF_LINE_DOCUMENT_F002 line \r\n"
//			+ "ON \r\n"
//			+ "    req.REQUEST_ID = line.REQUEST_ID \r\n"
//			+ "WHERE \r\n"
//			+ "    req.QA_MR_STATUS = 'QA_MR_APPROVED' \r\n"
//			+ "    AND NOT EXISTS (\r\n"
//			+ "        SELECT 1 \r\n"
//			+ "        FROM PDE.precot.QA_REQUEST_AND_ISSUNCE_OF_LINE_DOCUMENT_F002 lineCheck \r\n"
//			+ "        WHERE \r\n"
//			+ "            lineCheck.REQUEST_ID = req.REQUEST_ID \r\n"
//			+ "            AND lineCheck.LINE_ID = line.LINE_ID\r\n"
//			+ "            AND lineCheck.STATUS = 'YES' \r\n"
//			+ "    )\r\n"
//			+ "ORDER BY \r\n"
//			+ "    req.REQUEST_ID DESC;\r\n"
//			+ "", 
//    nativeQuery = true)
//List<RequestAndIssunceOfDocumentF002> getAllIfApproveForDistributionAndDistructions();
	
	@Query(value = "SELECT qh.*, qd.*\r\n"
			+ "FROM precot.QA_REQUEST_AND_ISSUNCE_OF_DOCUMENT_F002 qh\r\n"
			+ "JOIN precot.QA_REQUEST_AND_ISSUNCE_OF_LINE_DOCUMENT_F002 qd\r\n"
			+ "ON qh.REQUEST_ID = qd.REQUEST_ID\r\n"
			+ "WHERE qh.QA_MR_STATUS = 'QA_MR_APPROVED'\r\n"
			+ "AND qd.STATUS IS DISTINCT FROM 'YES'\r\n"
			+ "ORDER BY qh.REQUEST_ID DESC;\r\n"
			+ "", 
    nativeQuery = true)
List<RequestAndIssunceOfDocumentF002> getAllIfApproveForDistributionAndDistructions();


	
	
	@Query(value = "SELECT req.REQUEST_ID, req.createdAt, req.updatedAt, req.createdBy, req.updatedBy, " +
            "req.COMMENTS, req.[DATE], req.FORMAT_NAME, req.FORMAT_NO, req.QA_MR_STATUS, " +
            "line.LINE_ID, line.DOCUMENT_NAME, line.DOCUMENT_NO " +
            "FROM PDE.precot.QA_REQUEST_AND_ISSUNCE_OF_DOCUMENT_F002 req " +
            "JOIN PDE.precot.QA_REQUEST_AND_ISSUNCE_OF_LINE_DOCUMENT_F002 line " +
            "ON req.REQUEST_ID = line.REQUEST_ID " +
            "WHERE req.QA_MR_STATUS = 'QA_MR_APPROVED' " +
            "ORDER BY req.REQUEST_ID DESC", 
    nativeQuery = true)
List<Object[]> getAllManagerApprovedRecords();


	
	
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
	
	@Query(value = "SELECT * FROM precot.QA_REQUEST_AND_ISSUNCE_OF_DOCUMENT_F002 " +
            "WHERE (:date IS NULL OR :date='' OR DATE = :date) " +           
            "AND (:month IS NULL OR :month='' OR MONTH = :month) " +
            "AND (:year IS NULL OR :year='' OR YEAR= :year) " +
            "AND QA_MR_STATUS = 'QA_MR_APPROVED'", nativeQuery = true)
List<RequestAndIssunceOfDocumentF002> printContainerInspectionReport(
     @Param("date") String date,
     @Param("month") String month,
     @Param("year") String year
);

	

}
