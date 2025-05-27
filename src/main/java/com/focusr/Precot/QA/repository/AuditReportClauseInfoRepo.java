package com.focusr.Precot.QA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.AuditReportClauseInfo;
import com.focusr.Precot.QA.model.InternalAudit;

@Repository
public interface AuditReportClauseInfoRepo extends JpaRepository<AuditReportClauseInfo,Long>{
	@Query(value = "SELECT * FROM precot.QA_AUDIT_REPORT_CLAUSE_INFO WHERE CLAUSE_ID = :id ", nativeQuery = true)
	AuditReportClauseInfo findClauseInfoById(@Param("id") long id);

}
