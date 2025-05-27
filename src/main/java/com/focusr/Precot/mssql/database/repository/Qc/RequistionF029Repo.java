package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.RequistionF029;

@Repository
public interface RequistionF029Repo extends JpaRepository<RequistionF029, Long>{

//	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE chemist_STATUS IN ('OPERATOR_APPROVED', 'OPERATOR_SAVED')AND REQUISITION_NO = :rquis_no AND QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED' , NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
//List<RequistionF029> chemistSummary(@Param("rquis_no") String rquis_no);
//
//// MANAGER SUMMARY
//@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE  (QC_STATUS_B NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS_B IS NULL) AND REQUISITION_NO = :rquis_no AND QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED' , NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
//List<RequistionF029> InspecterManagerSummary(@Param("rquis_no") String rquis_no);
//
//@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE (QC_STATUS_B NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS_B IS NULL) AND INS_STATUS = 'WAITING_FOR_APPROVAL' AND QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED' , NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
//List<RequistionF029> InspecterManagerSummary();
//
//@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE chemist_STATUS = 'OPERATOR_APPROVED' AND INS_STATUS='QA_INSPECTOR_APPROVED' AND QC_STATUS_B  IN ('QC_APPROVED', 'QA_APPROVED') AND REQUISITION_NO = :rquis_no AND QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED' , NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
//List<RequistionF029> ManagerSummarydevelop(@Param("rquis_no") String rquis_no);
//
//@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE chemist_STATUS = 'OPERATOR_APPROVED' AND INS_STATUS='QA_INSPECTOR_APPROVED' AND QC_STATUS_B  IN ('QC_APPROVED', 'QA_APPROVED') AND DEVELOP_STATUS = 'WAITING_FOR_APPROVAL' AND QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED' , NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
//List<RequistionF029> ManagerSummarydevelop();
//
//@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE chemist_STATUS = 'OPERATOR_APPROVED' AND INS_STATUS='QA_INSPECTOR_APPROVED' AND QC_STATUS_B  IN ('QC_APPROVED', 'QA_APPROVED') AND DEVELOP_STATUS = 'DEVELOPMENT_MANAGER_APPROVED' AND REQUISITION_NO = :rquis_no AND QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED' , NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
//List<RequistionF029> ManagerSummaryhod(@Param("rquis_no") String rquis_no);
//
//@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE chemist_STATUS = 'OPERATOR_APPROVED' AND INS_STATUS='QA_INSPECTOR_APPROVED' AND QC_STATUS_B  IN ('QC_APPROVED', 'QA_APPROVED') AND DEVELOP_STATUS = 'DEVELOPMENT_MANAGER_APPROVED' AND HOD_STATUS = 'WAITING_FOR_APPROVAL' AND DEPARTMENT = :rquis_no AND QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED' , NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
//List<RequistionF029> ManagerSummaryhoddep(@Param("rquis_no") String rquis_no);
//
//@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE chemist_STATUS = 'OPERATOR_APPROVED' AND INS_STATUS='QA_INSPECTOR_APPROVED' AND QC_STATUS_B is NULL AND REQUISITION_NO = :rquis_no AND QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED' , NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
//List<RequistionF029> ManagerSummary(@Param("rquis_no") String rquis_no);
//
//@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE chemist_STATUS = 'OPERATOR_APPROVED' AND INS_STATUS='QA_INSPECTOR_APPROVED' AND QC_STATUS_B = 'WAITING_FOR_APPROVAL' AND QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED' , NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
//List<RequistionF029> ManagerSummary();
//
//@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE HOD_STATUS = 'HOD_APPROVED' AND REQUISITION_NO = :rquis_no AND QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED' , NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
//List<RequistionF029> finalManagerSummary(@Param("rquis_no") String rquis_no);
//
//@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE HOD_STATUS = 'HOD_APPROVED' AND QC_STATUS = 'WAITING_FOR_APPROVAL' AND QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED' , NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
//List<RequistionF029> finalManagerSummary();
//
//@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE (QC_STATUS_B NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS_B IS NULL)  AND REQUISITION_NO = :rquis_no AND QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED' , NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
//List<RequistionF029> opeartorSummary(@Param("rquis_no") String rquis_no);
//
//@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE (QC_STATUS_B NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS_B IS NULL) AND (INS_STATUS ='WAITING_FOR_APPROVAL' OR INS_STATUS IS NULL) AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') or QC_STATUS is null) ORDER BY TEST_ID DESC", nativeQuery = true)
//List<RequistionF029> opeartorSummary();
//
//
//@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT w  WHERE  w.REQUISITION_NO = :requis   ORDER BY TEST_ID DESC", nativeQuery = true)
//List<RequistionF029> findByBatch(@Param("year") String year, @Param("month") String month, @Param("date") String date);
//
//@Query(value="SELECT * FROM precot.REQUISITION_SAMPLE_REPORT w WHERE w.REQUISITION_NO = :requis AND (w.QC_STATUS = 'QA_APPROVED' OR w.QC_STATUS = 'QC_APPROVED') ORDER BY TEST_ID DESC", nativeQuery = true)
//List<RequistionF029> print(@Param("year") String year, @Param("month") String month, @Param("date") String date);
	
	// CHEMIST SUMMARY
//	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE chemist_STATUS IN ('OPERATOR_APPROVED', 'OPERATOR_SAVED') AND REQUISITION_NO = :rquis_no AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') or QC_STATUS is null) AND QC_STATUS IS NOT NULL ORDER BY TEST_ID DESC", nativeQuery = true)
//	List<RequistionF029> chemistSummary(@Param("rquis_no") String rquis_no);
//
//	// MANAGER SUMMARY
//	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE (QC_STATUS_B NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS_B IS NULL) AND REQUISITION_NO = :rquis_no AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') or QC_STATUS is null)  ORDER BY TEST_ID DESC", nativeQuery = true)
//	List<RequistionF029> InspecterManagerSummary(@Param("rquis_no") String rquis_no);
//
//	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE (QC_STATUS_B NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS_B IS NULL) AND INS_STATUS = 'WAITING_FOR_APPROVAL' AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') or QC_STATUS is null)  ORDER BY TEST_ID DESC", nativeQuery = true)
//	List<RequistionF029> InspecterManagerSummary();
//
//	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE chemist_STATUS = 'OPERATOR_APPROVED' AND INS_STATUS = 'QA_INSPECTOR_APPROVED' AND QC_STATUS_B IN ('QC_APPROVED', 'QA_APPROVED') AND REQUISITION_NO = :rquis_no AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') or QC_STATUS is null)  ORDER BY TEST_ID DESC", nativeQuery = true)
//	List<RequistionF029> ManagerSummarydevelop(@Param("rquis_no") String rquis_no);
//
//	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE chemist_STATUS = 'OPERATOR_APPROVED' AND INS_STATUS = 'QA_INSPECTOR_APPROVED' AND QC_STATUS_B IN ('QC_APPROVED', 'QA_APPROVED') AND DEVELOP_STATUS = 'WAITING_FOR_APPROVAL' AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') or QC_STATUS is null) ORDER BY TEST_ID DESC", nativeQuery = true)
//	List<RequistionF029> ManagerSummarydevelop();
//
//	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE chemist_STATUS = 'OPERATOR_APPROVED' AND INS_STATUS = 'QA_INSPECTOR_APPROVED' AND QC_STATUS_B IN ('QC_APPROVED', 'QA_APPROVED') AND DEVELOP_STATUS = 'DEVELOPMENT_MANAGER_APPROVED' AND REQUISITION_NO = :rquis_no AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') or QC_STATUS is null) ORDER BY TEST_ID DESC", nativeQuery = true)
//	List<RequistionF029> ManagerSummaryhod(@Param("rquis_no") String rquis_no);
//
//	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE chemist_STATUS = 'OPERATOR_APPROVED' AND INS_STATUS = 'QA_INSPECTOR_APPROVED' AND QC_STATUS_B IN ('QC_APPROVED', 'QA_APPROVED') AND DEVELOP_STATUS = 'DEVELOPMENT_MANAGER_APPROVED' AND HOD_STATUS = 'WAITING_FOR_APPROVAL' AND DEPARTMENT = :rquis_no AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') or QC_STATUS is null)  ORDER BY TEST_ID DESC", nativeQuery = true)
//	List<RequistionF029> ManagerSummaryhoddep(@Param("rquis_no") String rquis_no);
//
//	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE chemist_STATUS = 'OPERATOR_APPROVED' AND INS_STATUS = 'QA_INSPECTOR_APPROVED' AND QC_STATUS_B IS NULL AND REQUISITION_NO = :rquis_no AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') or QC_STATUS is null) ORDER BY TEST_ID DESC", nativeQuery = true)
//	List<RequistionF029> ManagerSummary(@Param("rquis_no") String rquis_no);
//
//	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE chemist_STATUS = 'OPERATOR_APPROVED' AND INS_STATUS = 'QA_INSPECTOR_APPROVED' AND QC_STATUS_B = 'WAITING_FOR_APPROVAL' AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') or QC_STATUS is null)  ORDER BY TEST_ID DESC", nativeQuery = true)
//	List<RequistionF029> ManagerSummary();
//
//	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE HOD_STATUS = 'HOD_APPROVED' AND REQUISITION_NO = :rquis_no AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') or QC_STATUS is null) AND QC_STATUS IS NOT NULL ORDER BY TEST_ID DESC", nativeQuery = true)
//	List<RequistionF029> finalManagerSummary(@Param("rquis_no") String rquis_no);
//
//	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE HOD_STATUS = 'HOD_APPROVED' AND QC_STATUS = 'WAITING_FOR_APPROVAL' AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') or QC_STATUS is null) AND QC_STATUS IS NOT NULL ORDER BY TEST_ID DESC", nativeQuery = true)
//	List<RequistionF029> finalManagerSummary();
//
//	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE (QC_STATUS_B NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS_B IS NULL) AND REQUISITION_NO = :rquis_no AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') or QC_STATUS is null) ORDER BY TEST_ID DESC", nativeQuery = true)
//	List<RequistionF029> opeartorSummary(@Param("rquis_no") String rquis_no);
//
//	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE (QC_STATUS_B NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS_B IS NULL) AND (INS_STATUS = 'WAITING_FOR_APPROVAL' OR INS_STATUS IS NULL) AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') or QC_STATUS is null) ORDER BY TEST_ID DESC", nativeQuery = true)
//	List<RequistionF029> opeartorSummary();
//
//	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT w " +
//            "WHERE (:requis IS NULL OR w.REQUISITION_NO = :requis) " +
//            "AND (w.QC_STATUS = 'QA_APPROVED' OR w.QC_STATUS = 'QC_APPROVED') " +
//            "ORDER BY TEST_ID DESC", nativeQuery = true)
//List<RequistionF029> print(@Param("requis") String requis);
//	
//	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT w " +
//            "WHERE (:requis IS NULL OR w.REQUISITION_NO = :requis) " +
//            "ORDER BY TEST_ID DESC", nativeQuery = true)
//List<RequistionF029> findByBatch(@Param("requis") String requis);
	
	
	//PHASE 3 
	
	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE chemist_STATUS IN ('OPERATOR_APPROVED', 'OPERATOR_SAVED') AND REQUISITION_NO = :rquis_no AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') or QC_STATUS is null) AND QC_STATUS IS NOT NULL ORDER BY TEST_ID DESC", nativeQuery = true)
	List<RequistionF029> chemistSummary(@Param("rquis_no") String rquis_no);

	// MANAGER SUMMARY
	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE(((QC_STATUS  IN ('QC_REJECTED', 'QA_REJECTED') AND REQUISITION_NO = :rquis_no) OR (QC_STATUS_B NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS_B IS NULL OR QC_STATUS_B = 'WAITING_FOR_APPROVAL') AND INS_STATUS IS NOT NULL) AND REQUISITION_NO = :rquis_no)  ORDER BY TEST_ID DESC", nativeQuery = true)
	List<RequistionF029> InspecterManagerSummary(@Param("rquis_no") String rquis_no);

	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE(((QC_STATUS  IN ('QC_REJECTED', 'QA_REJECTED')) OR (QC_STATUS_B NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS_B IS NULL OR QC_STATUS_B = 'WAITING_FOR_APPROVAL') AND INS_STATUS IS NOT NULL) )  ORDER BY TEST_ID DESC", nativeQuery = true)
	List<RequistionF029> InspecterManagerSummary();

	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE (QC_STATUS  IN (('QC_REJECTED', 'QA_REJECTED') AND REQUISITION_NO = :rquis_no )OR chemist_STATUS = 'OPERATOR_APPROVED' AND INS_STATUS = 'QA_INSPECTOR_APPROVED' AND QC_STATUS_B IN ('QC_APPROVED', 'QA_APPROVED') AND REQUISITION_NO = :rquis_no )  ORDER BY TEST_ID DESC", nativeQuery = true)
	List<RequistionF029> ManagerSummarydevelop(@Param("rquis_no") String rquis_no);

	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE (QC_STATUS  IN ('QC_REJECTED', 'QA_REJECTED') OR (chemist_STATUS = 'OPERATOR_APPROVED' AND INS_STATUS = 'QA_INSPECTOR_APPROVED' AND QC_STATUS_B IN ('QC_APPROVED', 'QA_APPROVED') AND DEVELOP_STATUS in ('WAITING_FOR_APPROVAL' , 'DEVELOPMENT_MANAGER_APPROVED') AND (HOD_STATUS IS NULL OR HOD_STATUS = 'WAITING_FOR_APPROVAL') ) ) ORDER BY TEST_ID DESC", nativeQuery = true)
	List<RequistionF029> ManagerSummarydevelop();

	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE (((QC_STATUS  IN ('QC_REJECTED', 'QA_REJECTED') AND REQUISITION_NO = :rquis_no ) OR chemist_STATUS = 'OPERATOR_APPROVED' AND INS_STATUS = 'QA_INSPECTOR_APPROVED' AND QC_STATUS_B IN ('QC_APPROVED', 'QA_APPROVED') AND DEVELOP_STATUS = 'DEVELOPMENT_MANAGER_APPROVED' AND REQUISITION_NO = :rquis_no) ) ORDER BY TEST_ID DESC", nativeQuery = true)
	List<RequistionF029> ManagerSummaryhod(@Param("rquis_no") String rquis_no);

//	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE(((QC_STATUS  IN ('QC_REJECTED', 'QA_REJECTED') AND DEPARTMENT LIKE :rquis_no )OR chemist_STATUS = 'OPERATOR_APPROVED' AND INS_STATUS = 'QA_INSPECTOR_APPROVED' AND QC_STATUS_B IN ('QC_APPROVED', 'QA_APPROVED') AND DEVELOP_STATUS = 'DEVELOPMENT_MANAGER_APPROVED' AND (HOD_STATUS = 'WAITING_FOR_APPROVAL' or HOD_STATUS = 'HOD_APPROVED')AND DEPARTMENT LIKE :rquis_no) )  ORDER BY TEST_ID DESC", nativeQuery = true)
//	List<RequistionF029> ManagerSummaryhoddep(@Param("rquis_no") String rquis_no);
	
	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE (((QC_STATUS IN ('QC_REJECTED', 'QA_REJECTED') AND DEPARTMENT LIKE :rquis_no) OR chemist_STATUS = 'OPERATOR_APPROVED' AND INS_STATUS = 'QA_INSPECTOR_APPROVED' AND QC_STATUS_B IN ('QC_APPROVED', 'QA_APPROVED') AND DEVELOP_STATUS = 'DEVELOPMENT_MANAGER_APPROVED' AND (HOD_STATUS = 'WAITING_FOR_APPROVAL' OR HOD_STATUS = 'HOD_APPROVED') AND DEPARTMENT LIKE :rquis_no) AND QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED')) ORDER BY TEST_ID DESC", nativeQuery = true)
	List<RequistionF029> ManagerSummaryhoddep(@Param("rquis_no") String rquis_no);
	
//	@Query(value = "SELECT r FROM precot.REQUISITION_SAMPLE_REPORT r " +
//		       "WHERE r.DEPARTMENT LIKE %:DEPARTMENT% " +
//		       "AND (" +
//		       "  (r.QC_STATUS IN ('QC_REJECTED', 'QA_REJECTED')) " +
//		       "  OR " +
//		       "  (r.chemist_STATUS = 'OPERATOR_APPROVED' " +
//		       "   AND r.INS_STATUS = 'QA_INSPECTOR_APPROVED' " +
//		       "   AND r.QC_STATUS_B IN ('QC_APPROVED', 'QA_APPROVED') " +
//		       "   AND r.DEVELOP_STATUS = 'DEVELOPMENT_MANAGER_APPROVED' " +
//		       "   AND (r.HOD_STATUS = 'WAITING_FOR_APPROVAL' OR r.HOD_STATUS = 'HOD_APPROVED')" +
//		       "  )" +
//		       ")" +
//		       "AND (r.QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR r.QC_STATUS IS NULL) " +
//		       "ORDER BY r.TEST_ID DESC" , nativeQuery = true)
//		List<RequistionF029> findFilteredReports(@Param("DEPARTMENT") String DEPARTMENT);

	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT r " +
		       "WHERE r.DEPARTMENT LIKE %:DEPARTMENT% " +
		       "AND (" +
		       "  (r.QC_STATUS IN ('QC_REJECTED', 'QA_REJECTED')) " +
		       "  OR " +
		       "  (r.chemist_STATUS = 'OPERATOR_APPROVED' " +
		       "   AND r.INS_STATUS = 'QA_INSPECTOR_APPROVED' " +
		       "   AND r.QC_STATUS_B IN ('QC_APPROVED', 'QA_APPROVED') " +
		       "   AND r.DEVELOP_STATUS = 'DEVELOPMENT_MANAGER_APPROVED' " +
		       "   AND (r.HOD_STATUS = 'WAITING_FOR_APPROVAL' OR r.HOD_STATUS = 'HOD_APPROVED')" +
		       "  )" +
		       ")" +
		       "AND (r.QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') OR r.QC_STATUS IS NULL) " +
		       "ORDER BY r.TEST_ID DESC", 
		       nativeQuery = true)
		List<RequistionF029> findFilteredReports(@Param("DEPARTMENT") String DEPARTMENT);


	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE((QC_STATUS  IN ('QC_REJECTED', 'QA_REJECTED') AND REQUISITION_NO = :rquis_no ) or chemist_STATUS = 'OPERATOR_APPROVED' AND INS_STATUS = 'QA_INSPECTOR_APPROVED' AND QC_STATUS_B IS NOT NULL AND REQUISITION_NO = :rquis_no ) ORDER BY TEST_ID DESC", nativeQuery = true)
	List<RequistionF029> ManagerSummary(@Param("rquis_no") String rquis_no);

	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE (  (QC_STATUS  IN ('QC_REJECTED', 'QA_REJECTED') )or (chemist_STATUS = 'OPERATOR_APPROVED' AND INS_STATUS = 'QA_INSPECTOR_APPROVED' AND QC_STATUS_B IS NOT NULL) )  ORDER BY TEST_ID DESC", nativeQuery = true)
	List<RequistionF029> ManagerSummary();

	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE HOD_STATUS = 'HOD_APPROVED' AND REQUISITION_NO = :rquis_no AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') or QC_STATUS is null) AND QC_STATUS IS NOT NULL ORDER BY TEST_ID DESC", nativeQuery = true)
	List<RequistionF029> finalManagerSummary(@Param("rquis_no") String rquis_no);

//	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE HOD_STATUS = 'HOD_APPROVED' AND QC_STATUS = 'WAITING_FOR_APPROVAL' AND (QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') or QC_STATUS IS NOT NULL) ORDER BY TEST_ID DESC", nativeQuery = true)
//	List<RequistionF029> finalManagerSummary();
	
	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE HOD_STATUS = 'HOD_APPROVED' AND QC_STATUS = 'WAITING_FOR_APPROVAL' AND QC_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') ORDER BY TEST_ID DESC", nativeQuery = true)
	List<RequistionF029> finalManagerSummary();


	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE (((QC_STATUS  IN ('QC_REJECTED', 'QA_REJECTED') AND REQUISITION_NO = :rquis_no  )OR (QC_STATUS_B NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS_B IS NULL) AND (INS_STATUS = 'WAITING_FOR_APPROVAL' OR INS_STATUS IS NULL) AND REQUISITION_NO = :rquis_no) ) ORDER BY TEST_ID DESC", nativeQuery = true)
	List<RequistionF029> opeartorSummary(@Param("rquis_no") String rquis_no);

	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT WHERE (  (QC_STATUS  IN ('QC_REJECTED', 'QA_REJECTED') OR (QC_STATUS_B NOT IN ('QC_APPROVED', 'QA_APPROVED') OR QC_STATUS_B IS NULL) AND (INS_STATUS = 'WAITING_FOR_APPROVAL' OR INS_STATUS IS NULL) ) ) ORDER BY TEST_ID DESC", nativeQuery = true)
	List<RequistionF029> opeartorSummary();

	@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT w " +
  "WHERE (:requis IS NULL OR w.REQUISITION_NO = :requis) " +
  "AND (w.QC_STATUS = 'QA_APPROVED' OR w.QC_STATUS = 'QC_APPROVED') " +
  "ORDER BY TEST_ID DESC", nativeQuery = true)
List<RequistionF029> print(@Param("requis") String requis);

@Query(value = "SELECT * FROM precot.REQUISITION_SAMPLE_REPORT w " +
  "WHERE (:requis IS NULL OR w.REQUISITION_NO = :requis) " +
  "ORDER BY TEST_ID DESC", nativeQuery = true)
List<RequistionF029> findByBatch(@Param("requis") String requis);


	
}
