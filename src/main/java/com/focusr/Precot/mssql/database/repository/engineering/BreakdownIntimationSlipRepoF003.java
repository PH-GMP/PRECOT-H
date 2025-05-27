package com.focusr.Precot.mssql.database.repository.engineering;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Store.audit.ReceptionCheckListHistoryF003;
import com.focusr.Precot.mssql.database.model.engineering.BreakdownIntimationSlipF003;
import com.focusr.Precot.mssql.database.model.engineering.RootCauseAnalysisF004;
import com.focusr.Precot.mssql.database.model.engineering.WeightScalesCalibrationF016;
import com.focusr.Precot.mssql.database.model.engineering.audit.RootCauseAnalysisHistoryF004;



public interface BreakdownIntimationSlipRepoF003 extends JpaRepository<BreakdownIntimationSlipF003, Long> {

	
	
	@Query(value = "SELECT * FROM precot.ENG_BREAKDOWN_INTIMANTIONSLIP_F003 WHERE ID=:id", nativeQuery = true)
	BreakdownIntimationSlipF003 fetchBreakdownSlipById(@Param("id") Long id);

	
	
	@Query(value = "SELECT * FROM precot.ENG_BREAKDOWN_INTIMANTIONSLIP_F003 WHERE DATE = :date AND BIS_NO = :bisNo", nativeQuery = true)
	List<BreakdownIntimationSlipF003> findBydateNoAndbisnO(@Param("date") String date, @Param("bisNo") String bisNo);



//	@Query(value = "SELECT * FROM precot.ENG_BREAKDOWN_INTIMANTIONSLIP_F003 WHERE YEAR(CONVERT(date, DATE, 120)) = :year AND MONTH(CONVERT(date, DATE, 120)) = :month AND BIS_NO = :bisNo AND RECEIVER_STATUS = 'RECEIVER_APPROVED'", nativeQuery = true)
//	List<BreakdownIntimationSlipF003> getbsinoNoAndYearMonth(
//	    @Param("year") String year,
//	    @Param("month") String month,
//	    @Param("bisNo") String bisNo);
	
//	@Query(value = "SELECT * FROM precot.ENG_BREAKDOWN_INTIMANTIONSLIP_F003 " +
//            "WHERE YEAR(CONVERT(datetime, DATE, 103)) = :year " +  // Use style 103 for dd/MM/yyyy
//            "AND MONTH(CONVERT(datetime, DATE, 103)) = :month " +
//            "AND BIS_NO = :bisNo " +
//            "AND RECEIVER_STATUS = 'RECEIVER_APPROVED'", 
//    nativeQuery = true)
//List<BreakdownIntimationSlipF003> getbsinoNoAndYearMonth(
// @Param("year") String year,
// @Param("month") String month,
// @Param("bisNo") String bisNo);
	
	@Query(value = "SELECT * FROM precot.ENG_BREAKDOWN_INTIMANTIONSLIP_F003 " +
            "WHERE (:year IS NULL OR YEAR(CAST(DATE AS datetime)) = :year) " +
            "AND (:month IS NULL OR MONTH(CAST(DATE AS datetime)) = :month) " +
            "AND (:bisNo IS NULL OR BIS_NO = :bisNo) " +
            "AND RECEIVER_STATUS = 'RECEIVER_APPROVED'", 
    nativeQuery = true)
List<BreakdownIntimationSlipF003> getBreakdownByOptionalParams(
 @Param("year") Integer year,  // Change to Integer for direct SQL comparison
 @Param("month") Integer month,  // Change to Integer for direct SQL comparison
 @Param("bisNo") String bisNo);




	
//	@Query(value = "SELECT * FROM precot.ENG_BREAKDOWN_INTIMANTIONSLIP_F003 WHERE SUPERVISOR_STATUS='SUPERVISOR_SAVED' OR RECEIVER_STATUS != 'RECEIVER_APPROVED' ORDER BY ID DESC", nativeQuery = true)
//	List<BreakdownIntimationSlipF003> SummaryforAssistant();
	
	
	@Query(value = "SELECT * FROM precot.ENG_BREAKDOWN_INTIMANTIONSLIP_F003 " +
            "WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' " +
            "OR CLOSURE_STATUS IS NULL " +
            "OR CLOSURE_STATUS != 'APPROVED' " +
            "ORDER BY ID DESC", nativeQuery = true)
List<BreakdownIntimationSlipF003> SummaryforAssistant();



//	@Query(value = "SELECT * FROM precot.ENG_BREAKDOWN_INTIMANTIONSLIP_F003 WHERE RECEIVER_STATUS != 'RECEIVER_APPROVED' ORDER BY ID DESC", nativeQuery = true)
//	List<BreakdownIntimationSlipF003> SummaryforEngineer();
	
	@Query(value = "SELECT * FROM precot.ENG_BREAKDOWN_INTIMANTIONSLIP_F003 " +
            "WHERE CLOSURE_STATUS != 'APPROVED' " +
            "AND RECEIVER_DEPARTMENT = :receiverDepartment " +
            "ORDER BY ID DESC", 
    nativeQuery = true)
List<BreakdownIntimationSlipF003> SummaryforEngineer(@Param("receiverDepartment") String assignedDepartment);


	
	@Query(value = "SELECT TOP 1 ngp.BIS_NO FROM precot.ENG_BREAKDOWN_INTIMANTIONSLIP_F003 ngp ORDER BY ngp.BIS_NO DESC", nativeQuery = true)
	String findLastBsiNo();



	  @Query(value = "SELECT DISTINCT BIS_NO FROM precot.ENG_BREAKDOWN_INTIMANTIONSLIP_F003", nativeQuery = true)
	    List<String> findAllDistinctBisNo();
	  
//	  @Query(value = "SELECT DISTINCT b.BIS_NO " +
//              "FROM precot.ENG_BREAKDOWN_INTIMANTIONSLIP_F003 b " +
//              "JOIN precot.ENG_ROOT_CAUSE_ANALYSIS_F004 r ON b.BIS_NO = r.BIS_NO " +
//              "WHERE r.SUPERVISOR_STATUS NOT IN ('SUPERVISOR_SAVED', 'SUPERVISOR_SUBMIT')", 
//      nativeQuery = true)
//List<String> findDistinctBisNoWithConditions();
	  
	  @Query(value = "SELECT DISTINCT b.BIS_NO " +
              "FROM precot.ENG_BREAKDOWN_INTIMANTIONSLIP_F003 b " +
              "LEFT JOIN precot.ENG_ROOT_CAUSE_ANALYSIS_FOO4 r ON b.BIS_NO = r.BIS_NO " +
              "WHERE r.SUPERVISOR_STATUS NOT IN ('SUPERVISOR_SAVED', 'SUPERVISOR_APPROVED') OR r.SUPERVISOR_STATUS IS NULL", 
      nativeQuery = true)
List<String> findDistinctBisNoExcludingSupervisorStatus();



	
	
//	@Query(value = "SELECT * FROM precot.ENG_BREAKDOWN_INTIMANTIONSLIP_F003 f " +
//	        "WHERE (:fromDate IS NULL OR f.DATE >= CAST(:fromDate AS DATE)) " +
//	        "AND (:toDate IS NULL OR f.DATE <= CAST(:toDate AS DATE)) " +
//	        "AND (:bisNo IS NULL OR f.BIS_NO = :bisNo)", 
//	        nativeQuery = true)
//	List<BreakdownIntimationSlipF003> findByParams003(
//	  @Param("fromDate") LocalDate fromDate,
//	  @Param("toDate") LocalDate toDate,
//	  @Param("bisNo") String bisNo);
	  
	  
//	  @Query(value = "SELECT * FROM precot.ENG_BREAKDOWN_INTIMANTIONSLIP_F003 f " +
//	        "WHERE (:fromDate IS NULL OR f.DATE >= CAST(:fromDate AS DATE)) " +
//	        "AND (:toDate IS NULL OR f.DATE <= CAST(:toDate AS DATE)) " +
//	        "AND (:bisNo IS NULL OR f.BIS_NO = :bisNo)", 
//	        nativeQuery = true)
//	List<BreakdownIntimationSlipF003> findByParams003(
//	  @Param("fromDate") LocalDate fromDate,
//	  @Param("toDate") LocalDate toDate,
//	  @Param("bisNo") String bisNo);

	  
	  @Query(value = "SELECT * FROM precot.ENG_BREAKDOWN_INTIMANTIONSLIP_F003 f " +
              "WHERE (:fromDate IS NULL OR f.DATE >= :fromDate) " +
              "AND (:toDate IS NULL OR f.DATE <= :toDate) " +
              "AND (:bisNo IS NULL OR f.BIS_NO = :bisNo)", 
      nativeQuery = true)
List<BreakdownIntimationSlipF003> findByParams003(
   @Param("fromDate") LocalDate fromDate,
   @Param("toDate") LocalDate toDate,
   @Param("bisNo") String bisNo);


	  
	  

	
	@Query(value = "SELECT BIS_NO FROM precot.ENG_BREAKDOWN_INTIMANTIONSLIP_F003  WHERE ISSUER_DEPARTMENT = :issuerDepartment",nativeQuery = true)
    List<String> findBisNoByIssuerDepartment(@Param("issuerDepartment") String issuerDepartment);


}


