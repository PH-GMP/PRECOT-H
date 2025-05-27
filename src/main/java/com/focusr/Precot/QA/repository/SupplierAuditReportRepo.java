package com.focusr.Precot.QA.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.focusr.Precot.QA.model.InternalAuditNCReport;
import com.focusr.Precot.QA.model.SupplierAuditReport;
import com.focusr.Precot.QA.model.SupplierAuditReportSummaryDTO;

@Repository
public interface SupplierAuditReportRepo extends JpaRepository<SupplierAuditReport,Long> {

	@Query(value = "SELECT * FROM precot.QA_SUPPLIER_AUDIT_REPORT WHERE REPORT_ID=:ID" , nativeQuery=true)
	public SupplierAuditReport findAuditReportById(@Param("ID") Long id);
	
	@Query(value = "SELECT * FROM precot.QA_SUPPLIER_AUDIT_REPORT WHERE SUPPLIER_NAME =:supplierName",nativeQuery = true)
	SupplierAuditReport findByUniqueParams( @Param("supplierName") String supplierName);
	
	@Query(value = "SELECT * FROM precot.QA_SUPPLIER_AUDIT_REPORT WHERE SUPPLIER_NAME =:supplierName AND REPORT_DATE =:reportDate",nativeQuery = true)
	SupplierAuditReport findByByDateAndSupplier( @Param("supplierName") String supplierName ,@Param("reportDate") String reportDate );
	
	@Query("select new com.focusr.Precot.QA.model.SupplierAuditReportSummaryDTO(i.reportId,i.reportDate,i.supplierName,i.auditorStatus,i.supplierStatus,i.reason)"
			+ " from SupplierAuditReport i order by updatedAt desc")
	List<SupplierAuditReportSummaryDTO> getAuditReportSummary();
	
	@Query(value="SELECT REPORT_DATE FROM precot.QA_SUPPLIER_AUDIT_REPORT WHERE SUPPLIER_NAME =:supplierName",nativeQuery=true)
	List<LocalDate> getReportSubmittedDateBySupplier(@Param("supplierName") String supplierName);
	
	@Query(value = "SELECT * FROM precot.QA_SUPPLIER_AUDIT_REPORT "
			+ " WHERE SUPPLIER_NAME =:supplierName "
			+ " AND MR_DESIGNEE_STATUS = 'MR_DESIGNEE_APPROVED'", nativeQuery = true)
	List<SupplierAuditReport> findByPrintParams(@Param("supplierName") String supplierName);
	
	@Query(value = "SELECT * FROM precot.QA_SUPPLIER_AUDIT_REPORT "
			+ " WHERE REPORT_DATE BETWEEN :startDate AND :endDate", nativeQuery = true)
	List<SupplierAuditReport> findByFinancial(@Param("startDate") LocalDate startDate ,@Param("endDate") LocalDate endDate);
}
