package com.focusr.Precot.QA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.focusr.Precot.QA.model.AuditType;

@Repository
public interface AuditTypeRepository extends JpaRepository<AuditType, Long>{
	@Query(value = "SELECT * FROM precot.QA_AUDIT_SCHEDULE_AUDIT_TYPE WHERE ID = :id ", nativeQuery = true)
	AuditType findAuditById(@Param("id") long id);
}