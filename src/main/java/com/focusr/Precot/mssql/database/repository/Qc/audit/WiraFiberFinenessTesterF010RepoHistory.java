package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.QcAudit.Qc_WiraFiberFinenessTesterReportF010History;

public interface WiraFiberFinenessTesterF010RepoHistory extends JpaRepository<Qc_WiraFiberFinenessTesterReportF010History, Long> {

	@Query(value = "SELECT * FROM precot.QC_WIRA_FIBER_FINENESS_TESTER_REPORT_F010_HISTORY WHERE (MONTH=:month AND YEAR=:year)AND VERSION IN (SELECT MAX(VERSION) FROM precot.QC_WIRA_FIBER_FINENESS_TESTER_REPORT_F010_HISTORY WHERE MONTH=:month AND YEAR=:year)", nativeQuery = true)
	Qc_WiraFiberFinenessTesterReportF010History fetchLastSubmittedRecordMonthYear(@Param("month") String month,@Param("year")String year);
		
	@Query(value = "SELECT MAX(VERSION) FROM precot.QC_WIRA_FIBER_FINENESS_TESTER_REPORT_F010_HISTORY WHERE MONTH=:month AND YEAR=:year", nativeQuery = true)
	Optional<Integer> getMaximumVersionOfDate(@Param("month") String month,@Param("year")String year);

	@Query(value = "SELECT * FROM precot.QC_WIRA_FIBER_FINENESS_TESTER_REPORT_F010_HISTORY WHERE "
			+ "(:month IS NULL OR MONTH = :month) "
			+ "AND (:year IS NULL OR YEAR = :year) ", nativeQuery = true)		
	List<Qc_WiraFiberFinenessTesterReportF010History> findByParamsF010
	(@Param("month") String month,
	@Param("year") String year);
}
