package com.focusr.Precot.QA.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.QaBreakageReport;
import com.focusr.Precot.QA.model.QaCustomerComplaintRegisterForm;
import com.focusr.Precot.QA.model.QaNonConformityReport;

public interface QaBreakageReportRepository extends JpaRepository<QaBreakageReport, Long> {

	@Query(value = "SELECT * FROM precot.QA_BREAKAGE_REPORT WHERE ID = :id", nativeQuery = true)
	QaBreakageReport findFormById(@Param("id") long id);

	@Query(value = "SELECT * FROM precot.QA_BREAKAGE_REPORT WHERE  MANAGER_STATUS != 'MANAGER_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<QaBreakageReport> qaInspectorSummary();

	@Query(value = "SELECT * FROM precot.QA_BREAKAGE_REPORT WHERE QA_INSPECTOR_STATUS = 'QA_INSPECTOR_APPROVED' AND MANAGER_STATUS != 'MANAGER_APPROVED' AND DEPARTMENT =:department ORDER BY ID DESC", nativeQuery = true)
	List<QaBreakageReport> hodSummary(@Param("department") String department);
	
	
	
	@Query(value = "SELECT * FROM precot.QA_BREAKAGE_REPORT WHERE QA_INSPECTOR_STATUS = 'QA_INSPECTOR_APPROVED' AND MANAGER_STATUS != 'MANAGER_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<QaBreakageReport> QaSummary();
	
	
	
	@Query(value = "SELECT * FROM precot.QA_BREAKAGE_REPORT WHERE"
            + "(:month IS NULL OR :month = '' OR MONTH = :month)"
            + "AND (:year IS NULL OR :year = '' OR YEAR = :year)"
            + "AND (:date IS NULL OR :date = '' OR DATE = :date)"
            + "AND (:reportNo IS NULL OR :reportNo = '' OR REP_SEQ_NO = :reportNo)"
            + "AND MANAGER_STATUS='MANAGER_APPROVED'", nativeQuery = true)
   List<QaBreakageReport>Print(@Param("month") String month, @Param("year") String year, @Param("reportNo") String reportNo,@Param("date") String date);
	
	
	//Number generation
	 @Query(value = "SELECT TOP 1 * FROM precot.QA_BREAKAGE_REPORT ORDER BY ID DESC", nativeQuery = true)
	 QaBreakageReport fetchLastGeneratedNo();
	 
	 @Query(value = "SELECT * FROM precot.QA_BREAKAGE_REPORT WHERE DEPARTMENT =:department AND REP_SEQ_NO =:rep_seq_no", nativeQuery = true)
	 QaBreakageReport findByparam(@Param("rep_seq_no") String rep_seq_no,@Param("department") String department);
	 
	 @Query(value = "SELECT REP_SEQ_NO FROM precot.QA_BREAKAGE_REPORT ORDER BY ID DESC;", nativeQuery = true)
	List<Map<String, Object>> getAllSeqNo();
	 
	 
	 @Query(value = "SELECT REP_SEQ_NO FROM precot.QA_BREAKAGE_REPORT  WHERE  MANAGER_STATUS = 'MANAGER_APPROVED' ORDER BY ID DESC", nativeQuery = true)
		List<Map<String, Object>> getApproveSeqNo();
	 
	 
	// Fetch Department ID
		
		@Query(value = "SELECT DEPARTMENT_ID FROM precot.USER_LOGIN_DETAILS WHERE username = :username", nativeQuery = true)
		Long fetchDepartmentIdByUsername(@Param("username") String username);
		
		
		@Query(value = "SELECT DEPARTMENT FROM precot.department WHERE ID = :id", nativeQuery = true)
		String fetchDepartmentByUsernameId(@Param("id") Long id);
	 
	 
	 
	 


}
