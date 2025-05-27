package com.focusr.Precot.QA.repository.audit;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.SupplierAuditPlanHistory;
import com.focusr.Precot.QA.model.audit.SupplierAuditReportHistory;

@Repository
public interface SupplierAuditReportHistoryRepo extends JpaRepository<SupplierAuditReportHistory,Long>{
	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_SUPPLIER_AUDIT_REPORT_HISTORY WHERE REPORT_DATE =:reportDate AND SUPPLIER_NAME= :supplierName", nativeQuery = true)
	Optional<Integer> getMaximumVersion1(@Param("reportDate") LocalDate reportDate , @Param("supplierName") String supplierName);
	
	@Query(value = "SELECT * FROM precot.QA_SUPPLIER_AUDIT_REPORT_HISTORY"
			+ " WHERE REPORT_DATE =:reportDate AND SUPPLIER_NAME= :supplierName AND "
			+ " VERSION IN "
			+ "(SELECT MAX(VERSION) FROM precot.QA_SUPPLIER_AUDIT_REPORT_HISTORY WHERE REPORT_DATE =:reportDate AND SUPPLIER_NAME= :supplierName)", nativeQuery = true)
	SupplierAuditReportHistory fetchLastSubmittedRecord(@Param("reportDate") LocalDate reportDate , @Param("supplierName") String supplierName);
	
	@Query(value = "SELECT * FROM precot.QA_SUPPLIER_AUDIT_REPORT_HISTORY WHERE (:supplierName IS NULL OR :supplierName='' OR SUPPLIER_NAME =:supplierName)"
			+ " AND (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR REPORT_DATE BETWEEN :from_date AND :to_date) "
			, nativeQuery = true)
	List<SupplierAuditReportHistory> excelReport(@Param("supplierName") String supplierName,@Param("from_date") String from_date,
			@Param("to_date") String to_date);
}

