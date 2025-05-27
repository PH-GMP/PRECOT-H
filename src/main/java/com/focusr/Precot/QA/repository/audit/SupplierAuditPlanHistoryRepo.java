package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.InternalAuditReportHistory;
import com.focusr.Precot.QA.model.audit.SupplierAuditPlanHistory;

@Repository
public interface SupplierAuditPlanHistoryRepo extends JpaRepository<SupplierAuditPlanHistory,Long> {
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_SUPPLIER_AUDIT_PLAN_HISTORY WHERE FINANCIAL_YEAR =:financialYear", nativeQuery = true)
	Optional<Integer> getMaximumVersion1(@Param("financialYear") String financialYear);
	
	@Query(value = "SELECT * FROM precot.QA_SUPPLIER_AUDIT_PLAN_HISTORY"
			+ " WHERE FINANCIAL_YEAR =:financialYear AND "
			+ "VERSION IN "
			+ "(SELECT MAX(VERSION) FROM precot.QA_SUPPLIER_AUDIT_PLAN_HISTORY WHERE FINANCIAL_YEAR =:financialYear)", nativeQuery = true)
	SupplierAuditPlanHistory fetchLastSubmittedRecord(@Param("financialYear") String financialYear);
	
	
	@Query(value = "SELECT * FROM precot.QA_SUPPLIER_AUDIT_PLAN_HISTORY WHERE (:year IS NULL OR :year='' OR FINANCIAL_YEAR=:year)", nativeQuery = true)
	List<SupplierAuditPlanHistory> excelReport(@Param("year") String year);
}
