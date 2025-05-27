package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.CorrectiveActionReport;
import com.focusr.Precot.QA.model.CorrectiveActionReportSummaryDTO;

@Repository
public interface CorrectiveActionReportRepo extends JpaRepository<CorrectiveActionReport,Long> {
	
	@Query(value = "SELECT * FROM precot.QA_CORRECTIVE_ACTION_REPORT WHERE REPORT_ID=:ID" , nativeQuery=true)
	public CorrectiveActionReport findReportById(@Param("ID") Long id);
	
	@Query(value = "SELECT * FROM precot.QA_CORRECTIVE_ACTION_REPORT WHERE REPORT_DATE =:reportDate",nativeQuery = true)
	List<CorrectiveActionReport> findByUniqueParams(@Param("reportDate") String reportDate);
	
	@Query("select new com.focusr.Precot.QA.model.CorrectiveActionReportSummaryDTO(i.reportId,i.year,i.month,i.reportDate,i.qaInspectorStatus,i.qaDesigneeStatus,i.qaManagerMrStatus,i.reason)"
			+ " from CorrectiveActionReport i WHERE i.qaManagerMrStatus <> 'QA_MANAGER_MR_APPROVED' OR i.qaManagerMrStatus IS NULL order by updatedAt desc")
	List<CorrectiveActionReportSummaryDTO> getActionReportSummary();
	
	@Query(value = "SELECT * FROM precot.QA_CORRECTIVE_ACTION_REPORT"
			+ " WHERE (:year IS NULL OR :year='' OR YEAR=:year)"
			+ " AND (:month IS NULL OR :month='' OR MONTH=:month)"
			+ " AND (:reportDate IS NULL OR :reportDate='' OR REPORT_DATE =:reportDate)"
			+ " AND QA_MANAGER_MR_STATUS = 'QA_MANAGER_MR_APPROVED'", nativeQuery = true)
	List<CorrectiveActionReport> findByPrintParams(@Param("year") String year,@Param("month") String month,@Param("reportDate") String reportDate);

}