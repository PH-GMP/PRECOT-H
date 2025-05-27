package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.InternalAuditNCReportHistory;

@Repository
public interface InternalAuditNCReportHistoryRepo extends JpaRepository<InternalAuditNCReportHistory,Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_INTERNAL_AUDIT_NC_REPORT_HISTORY WHERE AUDIT_YEAR =:year AND IAR_NO =:iarNo AND DEPARTMENT =:department AND NCR_NO =:ncrNo", nativeQuery = true)
	Optional<Integer> getMaximumVersion1( @Param("year") String year,@Param("iarNo") String iarNo,@Param("department") String department,@Param("ncrNo") String ncrNo);
	
	@Query(value = "SELECT * FROM precot.QA_INTERNAL_AUDIT_NC_REPORT_HISTORY "
			+ " WHERE AUDIT_YEAR =:year AND IAR_NO =:iarNo AND DEPARTMENT= :department AND NCR_NO =:ncrNo AND"
			+ " VERSION IN "
			+ " (SELECT MAX(VERSION) FROM precot.QA_INTERNAL_AUDIT_NC_REPORT_HISTORY WHERE AUDIT_YEAR =:year AND IAR_NO =:iarNo AND DEPARTMENT= :department AND NCR_NO =:ncrNo)", nativeQuery = true)
	InternalAuditNCReportHistory fetchLastSubmittedRecord(@Param("year") String year, @Param("iarNo") String iarNo,@Param("department") String department,@Param("ncrNo") String ncrNo);

	@Query(value = "SELECT * FROM precot.QA_INTERNAL_AUDIT_NC_REPORT_HISTORY WHERE "
			+" (:year IS NULL OR :year='' OR AUDIT_YEAR=:year)"
			+ " AND (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR REPORT_DATE BETWEEN :from_date AND :to_date) "
			+" AND (:department IS NULL OR :department='' OR DEPARTMENT=:department)", nativeQuery = true)
	List<InternalAuditNCReportHistory> excelReport(@Param("year") String year,@Param("from_date") String from_date,
			@Param("to_date") String to_date,@Param("department") String department);
}
