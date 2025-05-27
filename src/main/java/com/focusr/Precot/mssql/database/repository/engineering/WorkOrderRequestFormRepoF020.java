package com.focusr.Precot.mssql.database.repository.engineering;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.engineering.RootCauseAnalysisF004;
import com.focusr.Precot.mssql.database.model.engineering.WeightScalesCalibrationF016;
import com.focusr.Precot.mssql.database.model.engineering.WorkOrderRequestFormF020;
import com.focusr.Precot.mssql.database.model.engineering.audit.WeightScalesCalibrationHistoryF016;

public interface WorkOrderRequestFormRepoF020  extends JpaRepository<WorkOrderRequestFormF020, Long>{

	
	
	@Query(value = "SELECT * FROM precot.ENG_WORK_ORDER_REQUEST_FORM_FO20 WHERE ID=:id", nativeQuery = true)
	WorkOrderRequestFormF020 fetchWorkOrderRequestsById(@Param("id") Long id);


	
	@Query(value = "SELECT TOP 1 ngp.WOR_NO FROM precot.ENG_WORK_ORDER_REQUEST_FORM_FO20 ngp ORDER BY ngp.WOR_NO DESC", nativeQuery = true)
	String findLastWorNo();


	@Query(value = "SELECT * FROM precot.ENG_WORK_ORDER_REQUEST_FORM_FO20 WHERE DATE_OF_REQUEST = :dateOfRequest AND WOR_NO = :worNo", nativeQuery = true)
	List<WorkOrderRequestFormF020> findBydateNoAndWor(@Param("dateOfRequest") String dateOfRequest, @Param("worNo") String worNo);


	
	@Query(value = "SELECT * FROM precot.ENG_WORK_ORDER_REQUEST_FORM_FO20 WHERE REQUESTER_STATUS ='REQUESTER_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<WorkOrderRequestFormF020> SummaryforAssistant();
	
//	@Query(value = "SELECT * FROM precot.ENG_WORK_ORDER_REQUEST_FORM_FO20 " +
//            "WHERE REQUESTER_STATUS = 'REQUESTER_SAVED' " +
//            "AND (HOD_STATUS != 'HOD_APPROVED' OR HOD_STATUS IS NULL) " +
//            "ORDER BY ID DESC", 
//    nativeQuery = true)
//List<WorkOrderRequestFormF020> SummaryforAssistant();


	
//	@Query(value = "SELECT * FROM precot.ENG_WORK_ORDER_REQUEST_FORM_FO20 WHERE  REQUESTER_STATUS = 'REQUESTER_SUBMIT' OR REQUESTER_STATUS != 'REQUESTER_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
//	List<WorkOrderRequestFormF020> SummaryforEngineer();
	
//	@Query(value = "SELECT * FROM precot.ENG_WORK_ORDER_REQUEST_FORM_FO20 " +
//            "WHERE (REQUESTER_STATUS = 'REQUESTER_SUBMIT' " +
//            "OR REQUESTER_STATUS != 'REQUESTER_SAVED') " +
//            "AND HOD_STATUS != 'HOD_APPROVED' " +
//            "ORDER BY ID DESC", 
//    nativeQuery = true)
//List<WorkOrderRequestFormF020> SummaryforEngineer();
	
	@Query(value = "SELECT * FROM precot.ENG_WORK_ORDER_REQUEST_FORM_FO20 " +
            "WHERE (REQUESTER_STATUS = 'REQUESTER_SUBMIT' " +
            "OR REQUESTER_STATUS != 'REQUESTER_SAVED') " +
            "AND HOD_STATUS != 'HOD_APPROVED' " +
            "AND ( ASSIGNED_DEPARTMENT = :assignedDepartment) " +
            "ORDER BY ID DESC",
    nativeQuery = true)
List<WorkOrderRequestFormF020> SummaryforEngineer(@Param("assignedDepartment") String receiverDepartment);





	
	
//	@Query(value = "SELECT * FROM precot.ENG_WORK_ORDER_REQUEST_FORM_FO16 WHERE YEAR(CONVERT(dateOfRequest, DATE_OF_REQUEST, 120)) = :year AND MONTH(CONVERT(dateOfRequest, DATE_OF_REQUEST, 120)) = :month AND WOR_NO = :worNo AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
//	List<WorkOrderRequestFormF016> getWorNodNoAndYearMonth(
//	    @Param("year") String year,
//	    @Param("month") String month,
//	    @Param("worNo") String worNo);

	
	
//	@Query(value = "SELECT * FROM precot.ENG_WORK_ORDER_REQUEST_FORM_FO20	WHERE YEAR(CONVERT(DATE, DATE_OF_REQUEST, 120)) = :year AND MONTH(CONVERT(DATE, DATE_OF_REQUEST, 120)) = :month	AND WOR_NO = :worNo AND HOD_STATUS = 'HOD_APPROVED'" , nativeQuery = true)
//	List<WorkOrderRequestFormF020> getWorNodNoAndYearMonth(
//	    @Param("year") String year,
//	    @Param("month") String month,
//	    @Param("worNo") String worNo);
	
	@Query(value = "SELECT * FROM precot.ENG_WORK_ORDER_REQUEST_FORM_FO20 " +
            "WHERE (:year IS NULL OR YEAR(CONVERT(DATE, DATE_OF_REQUEST, 120)) = :year) " +
            "AND (:month IS NULL OR MONTH(CONVERT(DATE, DATE_OF_REQUEST, 120)) = :month) " +
            "AND (:worNo IS NULL OR WOR_NO = :worNo) " +
            "AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
List<WorkOrderRequestFormF020> getWorByOptionalParams(
 @Param("year") String year,
 @Param("month") String month,
 @Param("worNo") String worNo);





	
	@Query(value = "SELECT DISTINCT WOR_NO FROM precot.ENG_WORK_ORDER_REQUEST_FORM_FO20", nativeQuery = true)
    List<String> getAllDistinctworNos();


	
	

//	@Query(value = "SELECT * FROM precot.ENG_WORK_ORDER_REQUEST_FORM_FO20 f " +
//	        "WHERE (:fromDate IS NULL OR f.DATE_OF_REQUEST >= CAST(:fromDate AS DATE_OF_REQUEST)) " +
//	        "AND (:toDate IS NULL OR f.DATE_OF_REQUEST <= CAST(:toDate AS DATE_OF_REQUEST)) " +
//	        "AND (:worNo IS NULL OR f.WOR_NO = :worNo)", 
//	        nativeQuery = true)
//	List<WorkOrderRequestFormF020> findByParams020(
//	  @Param("fromDate") LocalDate fromDate,
//	  @Param("toDate") LocalDate toDate,
//	  @Param("worNo") String worNo);
	
	@Query(value = "SELECT * FROM precot.ENG_WORK_ORDER_REQUEST_FORM_FO20 f " +
		       "WHERE (:fromDate IS NULL OR f.DATE_OF_REQUEST >= :fromDate) " +
		       "AND (:toDate IS NULL OR f.DATE_OF_REQUEST <= :toDate) " +
		       "AND (:worNo IS NULL OR f.WOR_NO = :worNo)", 
		       nativeQuery = true)
		List<WorkOrderRequestFormF020> findByParams020(
		      @Param("fromDate") LocalDate fromDate,
		      @Param("toDate") LocalDate toDate,
		      @Param("worNo") String worNo);



	
	
	@Query(value = "SELECT WOR_NO FROM precot.ENG_WORK_ORDER_REQUEST_FORM_FO20  WHERE DEPARTMENT = :department",nativeQuery = true)
    List<String> findworNoByIssuerDepartment(@Param("department") String department);


	
	
	
	

}

