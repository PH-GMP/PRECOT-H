package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.InternalAuditReportHistory;
import com.focusr.Precot.QA.model.audit.InternalAuditScheduleHistory;
import com.focusr.Precot.QA.model.audit.QaPestControllerHistory;

@Repository
public interface InternalAuditReportHistoryRepo extends JpaRepository<InternalAuditReportHistory,Long>{
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_INTERNAL_AUDIT_REPORT_HISTORY WHERE AUDIT_YEAR =:year AND AUDIT_MONTH =:month AND DEPARTMENT =:department", nativeQuery = true)
	Optional<Integer> getMaximumVersion1( @Param("year") String year,@Param("month") String month,@Param("department") String department);
	
	@Query(value = "SELECT * FROM precot.QA_INTERNAL_AUDIT_REPORT_HISTORY"
			+ " WHERE AUDIT_MONTH =:month AND AUDIT_YEAR =:year AND DEPARTMENT =:department AND"
			+ "	VERSION IN "
			+ "(SELECT MAX(VERSION) FROM precot.QA_INTERNAL_AUDIT_REPORT_HISTORY WHERE AUDIT_YEAR =:year AND AUDIT_MONTH =:month AND DEPARTMENT =:department)", nativeQuery = true)
	InternalAuditReportHistory fetchLastSubmittedRecord(@Param("year") String year, @Param("month") String month,@Param("department") String department);
	
	@Query(value = "SELECT * FROM precot.QA_INTERNAL_AUDIT_REPORT_HISTORY WHERE "
			+ " (:month IS NULL OR :month='' OR AUDIT_MONTH=:month)"
			+" AND (:year IS NULL OR :year='' OR AUDIT_YEAR=:year)"
			+ " AND (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR REPORT_DATE BETWEEN :from_date AND :to_date) "
			+"AND (:department IS NULL OR :department='' OR DEPARTMENT=:department)", nativeQuery = true)
	List<InternalAuditReportHistory> excelReport(@Param("month") String month, @Param("year") String year,@Param("from_date") String from_date,
			@Param("to_date") String to_date,@Param("department") String department);
}
