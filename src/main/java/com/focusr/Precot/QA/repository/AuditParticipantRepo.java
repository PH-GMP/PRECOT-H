package com.focusr.Precot.QA.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.focusr.Precot.QA.model.AuditParticipant;

@Repository
public interface AuditParticipantRepo extends JpaRepository<AuditParticipant, Long>{
	@Query(value = "SELECT * FROM precot.QA_AUDIT_PARTICIPANT WHERE ID = :id ", nativeQuery = true)
	AuditParticipant findAuditParticipantById(@Param("id") long id);
}