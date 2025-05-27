package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.InternalAuditScheduleHistory;


@Repository
public interface InternalAuditScheduleHistoryRepo extends JpaRepository<InternalAuditScheduleHistory, Long>{

		@Query(value = "SELECT MAX(VERSION) FROM precot.QA_INTERNAL_AUDIT_SCHEDULE_HISTORY WHERE AUDIT_SCHEDULE_YEAR =:year AND AUDIT_SCHEDULE_MONTH =:month", nativeQuery = true)
		Optional<Integer> getMaximumVersion1( @Param("year") String year,@Param("month") String month);
		
		@Query(value = "SELECT * FROM precot.QA_INTERNAL_AUDIT_SCHEDULE_HISTORY WHERE "
				+ " (:month IS NULL OR :month='' OR AUDIT_SCHEDULE_MONTH=:month)"
				+" AND (:year IS NULL OR :year='' OR AUDIT_SCHEDULE_YEAR=:year)", nativeQuery = true)
		List<InternalAuditScheduleHistory> excelReport(@Param("month") String month, @Param("year") String year);
}
