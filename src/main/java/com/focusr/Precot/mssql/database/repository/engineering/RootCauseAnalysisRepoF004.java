package com.focusr.Precot.mssql.database.repository.engineering;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.engineering.RootCauseAnalysisF004;
import com.focusr.Precot.mssql.database.model.engineering.WeightScalesCalibrationF016;



public interface RootCauseAnalysisRepoF004  extends JpaRepository<RootCauseAnalysisF004, Long>{

//	RootCauseAnalysisF004 fetchRootCauseAnalysisById(Long rootId);
	
	@Query(value = "SELECT * FROM precot.ENG_ROOT_CAUSE_ANALYSIS_FOO4 WHERE ID=:id", nativeQuery = true)
	RootCauseAnalysisF004 fetchRootCauseAnalysisById(@Param("id") Long id);

	
	
	@Query(value = "SELECT * FROM precot.ENG_ROOT_CAUSE_ANALYSIS_FOO4 WHERE DATE = :date AND RCA_NO = :rcaNo", nativeQuery = true)
	List<RootCauseAnalysisF004> findBydateNoAndrcaNo(@Param("date") String date, @Param("rcaNo") String rcaNo);


//	@Query(value = "SELECT * FROM precot.ENG_ROOT_CAUSE_ANALYSIS_FOO4 WHERE SUPERVISOR_STATUS='SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
//	List<RootCauseAnalysisF004> SummaryforAssistant();
	
	@Query(value = "SELECT * FROM precot.ENG_ROOT_CAUSE_ANALYSIS_FOO4 " +
            "WHERE (SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' " +
            "OR HOD_STATUS != 'HOD_APPROVED') " +
            "AND (:assignedDepartment IS NULL OR ASSIGNED_DEPARTMENT = :assignedDepartment) " +
            "ORDER BY ID DESC",
    nativeQuery = true)
List<RootCauseAnalysisF004> SummaryforAssistant(@Param("assignedDepartment") String assignedDepartment);

	
	@Query(value = "SELECT * FROM precot.ENG_ROOT_CAUSE_ANALYSIS_FOO4 WHERE HOD_STATUS != 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<RootCauseAnalysisF004> SummaryforHod();

	
//	@Query(value = "SELECT * FROM precot.ENG_ROOT_CAUSE_ANALYSIS_FOO4 WHERE YEAR(CONVERT(date, DATE, 120)) = :year AND MONTH(CONVERT(date, DATE, 120)) = :month AND RCA_NO = :rcaNo AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
//	List<RootCauseAnalysisF004> getRcaNodNoAndYearMonth(
//	    @Param("year") String year,
//	    @Param("month") String month,
//	    @Param("rcaNo") String rcaNo);
	
	@Query(value = "SELECT * FROM precot.ENG_ROOT_CAUSE_ANALYSIS_FOO4 " +
            "WHERE (:year IS NULL OR YEAR(CONVERT(date, DATE, 120)) = :year) " +
            "AND (:month IS NULL OR MONTH(CONVERT(date, DATE, 120)) = :month) " +
            "AND (:rcaNo IS NULL OR RCA_NO = :rcaNo) " +
            "AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
List<RootCauseAnalysisF004> getRcaByOptionalParams(
 @Param("year") String year,
 @Param("month") String month,
 @Param("rcaNo") String rcaNo);



	
	
	@Query(value = "SELECT TOP 1 ngp.RCA_NO FROM precot.ENG_ROOT_CAUSE_ANALYSIS_FOO4 ngp ORDER BY ngp.RCA_NO DESC", nativeQuery = true)
	String findLastrcaNo();

	
	@Query(value = "SELECT DISTINCT RCA_NO FROM precot.ENG_ROOT_CAUSE_ANALYSIS_FOO4", nativeQuery = true)
    List<String> findAllDistinctrcaNo();



	
	@Query(value = "SELECT RCA_NO FROM precot.ENG_ROOT_CAUSE_ANALYSIS_FOO4  WHERE DEPARTMENT = :department",nativeQuery = true)
    List<String> findrcaNoByIssuerDepartment(@Param("department") String department);
	
	
	

}
