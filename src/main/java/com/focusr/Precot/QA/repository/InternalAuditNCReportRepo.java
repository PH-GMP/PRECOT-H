package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.AuditNCReportSummaryDTO;
import com.focusr.Precot.QA.model.AuditReportSummaryDTO;
import com.focusr.Precot.QA.model.InternalAuditNCReport;
import com.focusr.Precot.QA.model.InternalAuditReport;


@Repository
public interface InternalAuditNCReportRepo extends JpaRepository<InternalAuditNCReport , Long> {
	@Query(value = "SELECT * FROM precot.QA_INTERNAL_AUDIT_NC_REPORT WHERE REPORT_ID=:ID" , nativeQuery=true)
	public InternalAuditNCReport findAuditNCReportById(@Param("ID") Long id);
	
	@Query(value = "SELECT * FROM precot.QA_INTERNAL_AUDIT_NC_REPORT WHERE AUDIT_YEAR =:year AND IAR_NO =:iarNo AND NCR_NO =:ncrNo AND DEPARTMENT =:department",nativeQuery = true)
	List<InternalAuditNCReport> findByUniqueParams( @Param("year") String year,@Param("iarNo") String iarNo,@Param("ncrNo") String ncrNo,@Param("department") String department);
	
	@Query(value = "SELECT * FROM precot.QA_INTERNAL_AUDIT_NC_REPORT WHERE AUDIT_YEAR =:year AND IAR_NO =:iarNo",nativeQuery = true)
	List<InternalAuditNCReport> getAuditNCReportForSummaryReport( @Param("year") String year,@Param("iarNo") String iarNo);
	
	@Query("select new com.focusr.Precot.QA.model.AuditNCReportSummaryDTO(i.reportId,i.auditYear,i.iarNo,i.ncrNo,i.department,i.firstAuditorStatus,i.auditeeStatus,i.secondAuditorStatus,i.qaMrStatus,i.qaMrSubmitStatus,i.qaMrApprovalStatus,i.reason)"
			+ " from InternalAuditNCReport i WHERE i.qaMrStatus <> 'QA_MR_APPROVED' OR i.qaMrStatus IS NULL order by updatedAt desc")
	List<AuditNCReportSummaryDTO> getAuditNCReportSummary();
	
	@Query(value = "SELECT * FROM precot.QA_INTERNAL_AUDIT_NC_REPORT "
			+ "WHERE (:year IS NULL OR :year='' OR AUDIT_YEAR=:year)"
			+ " AND (:iarNo IS NULL OR :iarNo='' OR IAR_NO=:iarNo)"
			+ " AND QA_MR_STATUS = 'QA_MR_APPROVED'", nativeQuery = true)
	List<InternalAuditNCReport> findByPrintParams(@Param("year") String year,@Param("iarNo") String iarNo);
	
	@Query(value="SELECT IAR_NO FROM precot.QA_INTERNAL_AUDIT_REPORT "
			+ "GROUP BY IAR_NO HAVING SUM(TOTAL_NO_OF_NC+NUMBER_OF_MINOR_NC+NUMBER_OF_MAJOR_NC)>0;",
			nativeQuery=true)
	List<String> getIARFromAuditReport();
	
	@Query(value="SELECT NCR_NO FROM precot.QA_INTERNAL_AUDIT_NC_REPORT WHERE NCR_IS= 'Open'",nativeQuery=true)
	List<String> getOpenNcrs();
	
	
	
}
	

