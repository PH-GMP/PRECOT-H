package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.focusr.Precot.QA.model.InternalAuditDepartment;

@Repository
public interface InternalAuditDepartmentRepo extends JpaRepository<InternalAuditDepartment, Long>{
	
	@Query(value = "SELECT * FROM precot.QA_INTERNAL_AUDIT_DEPARTMENT WHERE ID = :id ", nativeQuery = true)
	InternalAuditDepartment findAuditDepartmentById(@Param("id") long id);
	
	@Query("SELECT i.auditDepartment FROM InternalAuditDepartment i")
	List<String> getAuditDepartments();
}
