package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.focusr.Precot.QA.model.AuditReportSummaryDTO;
import com.focusr.Precot.QA.model.InternalAuditReport;

@Repository
public interface InternalAuditReportRepo extends JpaRepository<InternalAuditReport,Long>  {

	@Query(value = "SELECT * FROM precot.QA_INTERNAL_AUDIT_REPORT WHERE REPORT_ID=:ID" , nativeQuery=true)
	public InternalAuditReport findAuditReportById(@Param("ID") Long id);
	
	@Query(value = "SELECT * FROM precot.QA_INTERNAL_AUDIT_REPORT WHERE AUDIT_YEAR =:year AND AUDIT_MONTH =:month AND DEPARTMENT =:department",nativeQuery = true)
	InternalAuditReport findByUniqueParams( @Param("year") String year,@Param("month") String month,@Param("department") String department);
	
	@Query("select new com.focusr.Precot.QA.model.AuditReportSummaryDTO(i.reportId,i.auditYear,i.auditMonth,i.department,i.auditeeStatus,i.auditorStatus,i.qaMrStatus,i.Reason)"
			+ " from InternalAuditReport i WHERE i.qaMrStatus <> 'QA_MR_APPROVED' OR i.qaMrStatus IS NULL order by updatedAt desc")
	List<AuditReportSummaryDTO> getAuditReportSummary();
	
	@Query(value = "SELECT * FROM precot.QA_INTERNAL_AUDIT_REPORT"
			+ " WHERE (:year IS NULL OR :year='' OR AUDIT_YEAR=:year)"
			+ " AND (:month IS NULL OR :month='' OR AUDIT_MONTH=:month)"
			+ " AND (:department IS NULL OR :department='' OR DEPARTMENT=:department)"
			+ " AND QA_MR_STATUS = 'QA_MR_APPROVED'", nativeQuery = true)
	List<InternalAuditReport> findByPrintParams(@Param("year") String year,@Param("month") String month,@Param("department") String department);
	
	@Query(value = "SELECT * FROM precot.QA_INTERNAL_AUDIT_REPORT WHERE AUDIT_YEAR =:year AND IAR_NO =:iarNo",nativeQuery = true)
	List<InternalAuditReport> getAuditReportForSummaryReport( @Param("year") String year,@Param("iarNo") String iarNo);
	
	@Query(value="SELECT DISTINCT IAR_NO FROM precot.QA_INTERNAL_AUDIT_REPORT WHERE AUDIT_YEAR =:auditYear ",nativeQuery=true)
	List<String> getIarForYear(@Param("auditYear") String auditYear);
	
}
