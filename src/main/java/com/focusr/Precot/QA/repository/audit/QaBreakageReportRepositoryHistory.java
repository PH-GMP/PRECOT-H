package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.audit.QaBreakageReportHistory;

public interface QaBreakageReportRepositoryHistory extends JpaRepository<QaBreakageReportHistory, Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_BREAKAGE_REPORT_HISTORY WHERE DEPARTMENT =:department AND REP_SEQ_NO =:rep_seq_no", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("department") String department, @Param("rep_seq_no") String rep_seq_no);

//	@Query(value = "SELECT * FROM precot.QA_BREAKAGE_REPORT_HISTORY WHERE DEPARTMENT =:department AND REP_SEQ_NO =:rep_seq_no", nativeQuery = true)
//	QaBreakageReportHistory fetchLastSubmittedRecord(@Param("department") String department,
//			@Param("rep_seq_no") String rep_seq_no);

	@Query(value = "SELECT * FROM precot.QA_BREAKAGE_REPORT_HISTORY WHERE DEPARTMENT =:department AND REP_SEQ_NO =:rep_seq_no AND VERSION IN (SELECT MAX(VERSION) FROM precot.QA_BREAKAGE_REPORT_HISTORY WHERE DEPARTMENT =:department AND REP_SEQ_NO =:rep_seq_no)", nativeQuery = true)
	QaBreakageReportHistory fetchLastSubmittedRecord(@Param("department") String department,
			@Param("rep_seq_no") String rep_seq_no);

	@Query(value = "SELECT * FROM precot.QA_BREAKAGE_REPORT_HISTORY WHERE "
			+ " (:sqqNo IS NULL OR :sqqNo='' OR REP_SEQ_NO=:sqqNo)"
			+ " AND (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date) "
			+ " AND (:department IS NULL OR :department='' OR DEPARTMENT=:department)", nativeQuery = true)
	List<QaBreakageReportHistory> excelReport(@Param("sqqNo") String sqqNo, @Param("department") String department,
			@Param("from_date") String from_date, @Param("to_date") String to_date);

}
