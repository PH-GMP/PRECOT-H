package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.InternalAuditSchedule;
import com.focusr.Precot.QA.model.QaPestController;
import com.focusr.Precot.QA.model.AuditSummaryDTO;
@Repository
public interface InternalAuditScheduleRepo extends JpaRepository<InternalAuditSchedule, Long>{
	
	@Query(value = "SELECT * FROM precot.QA_INTERNAL_AUDIT_SCHEDULE WHERE SCHEDULE_ID = :scheduleId", nativeQuery = true)
	InternalAuditSchedule findAuditScheduleById(@Param("scheduleId") long id);
	
	@Query(value = "SELECT * FROM precot.QA_INTERNAL_AUDIT_SCHEDULE WHERE AUDIT_SCHEDULE_YEAR =:year AND AUDIT_SCHEDULE_MONTH =:month",nativeQuery = true)
	InternalAuditSchedule findByUniqueParams( @Param("year") String year,@Param("month") String month);
	
	@Query("select new com.focusr.Precot.QA.model.AuditSummaryDTO(i.scheduleId,i.auditScheduleYear,i.auditScheduleMonth,i.auditScheduleStatus) from InternalAuditSchedule i where auditScheduleStatus is null or auditScheduleStatus <> 'SCHEDULE_SUBMITTED' order by updatedAt desc")
	List<AuditSummaryDTO> getAuditScheduleSummary();
	
	@Query(value = "SELECT * FROM precot.QA_INTERNAL_AUDIT_SCHEDULE WHERE (:year IS NULL OR :year='' OR AUDIT_SCHEDULE_YEAR=:year) AND (:month IS NULL OR :month='' OR AUDIT_SCHEDULE_MONTH=:month) AND AUDIT_SCHEDULE_STATUS = 'SCHEDULE_SUBMITTED'", nativeQuery = true)
	List<InternalAuditSchedule> findByPrintParams(@Param("year") String year,@Param("month") String month);
}
