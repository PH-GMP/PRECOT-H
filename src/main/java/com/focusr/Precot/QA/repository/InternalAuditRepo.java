package com.focusr.Precot.QA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.AuditType;
import com.focusr.Precot.QA.model.InternalAudit;

@Repository
public interface InternalAuditRepo extends JpaRepository<InternalAudit, Long>{
	@Query(value = "SELECT * FROM precot.QA_INTERNAL_AUDIT WHERE AUDIT_ID = :id ", nativeQuery = true)
	InternalAudit findAuditDepartmentById(@Param("id") long id);
}