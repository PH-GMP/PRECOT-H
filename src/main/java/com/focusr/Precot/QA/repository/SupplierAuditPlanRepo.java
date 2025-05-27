package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.AuditReportSummaryDTO;
import com.focusr.Precot.QA.model.InternalAuditReport;
import com.focusr.Precot.QA.model.SupplierAuditPlan;
import com.focusr.Precot.QA.model.SupplierAuditPlanSummaryDTO;

@Repository
public interface SupplierAuditPlanRepo extends JpaRepository<SupplierAuditPlan,Long> {
	
	@Query(value = "SELECT * FROM precot.QA_SUPPLIER_AUDIT_PLAN WHERE PLAN_ID=:ID" , nativeQuery=true)
	public SupplierAuditPlan findAuditPlanById(@Param("ID") Long id);
	
	@Query(value = "SELECT * FROM precot.QA_SUPPLIER_AUDIT_PLAN WHERE FINANCIAL_YEAR =:financialYear",nativeQuery = true)
	SupplierAuditPlan findByUniqueParams(@Param("financialYear") String financialYear);
	
	@Query("select new com.focusr.Precot.QA.model.SupplierAuditPlanSummaryDTO(i.planId,i.financialYear,i.designeeStatus,i.qaManagerMrStatus,i.reason)"
			+ " from SupplierAuditPlan i WHERE i.qaManagerMrStatus <> 'QA_MANAGER_MR_APPROVED' OR i.qaManagerMrStatus IS NULL order by updatedAt desc")
	List<SupplierAuditPlanSummaryDTO> getAuditPlanSummary();
	
	@Query(value = "SELECT * FROM precot.QA_SUPPLIER_AUDIT_PLAN"
			+ " WHERE FINANCIAL_YEAR =:financialYear"
			+ " AND QA_MANAGER_MR_STATUS = 'QA_MANAGER_MR_APPROVED'", nativeQuery = true)
	List<SupplierAuditPlan> findByPrintParams(@Param("financialYear") String financialYear);

}
