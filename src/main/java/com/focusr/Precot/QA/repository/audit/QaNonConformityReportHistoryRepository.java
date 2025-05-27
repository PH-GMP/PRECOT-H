package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.audit.QaCustomerComplaintRegisterFormHistory;
import com.focusr.Precot.QA.model.audit.QaNonConformityReportHistory;

public interface QaNonConformityReportHistoryRepository extends JpaRepository<QaNonConformityReportHistory, Long>{
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_NON_CONFORMITY_REPORT_HISTORY WHERE NCR_NUMBER =:ncrNumber", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("ncrNumber") String ncrNumber);
		
	@Query(value = "SELECT * FROM precot.QA_NON_CONFORMITY_REPORT_HISTORY WHERE NCR_NUMBER =:ncrNumber AND VERSION IN (SELECT MAX(VERSION) FROM precot.QA_NON_CONFORMITY_REPORT_HISTORY WHERE NCR_NUMBER =:ncrNumber)", nativeQuery = true)
	QaNonConformityReportHistory fetchLastSubmittedRecord(@Param("ncrNumber") String ncrNumber);

	
//	@Query(value = "SELECT * FROM precot.QA_NON_CONFORMITY_REPORT_HISTORY WHERE "
//			+ " (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date) ", nativeQuery = true)
//	List<QaNonConformityReportHistory> excelReport(@Param("from_date") String from_date,
//			@Param("to_date") String to_date);
	
	@Query(value = "SELECT * FROM precot.QA_NON_CONFORMITY_REPORT_HISTORY WHERE "
			+ " (:month IS NULL OR :month='' OR MONTH=:month)"
			+" AND (:year IS NULL OR :year='' OR YEAR=:year)"
			+ " AND (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date) ", nativeQuery = true)
	List<QaNonConformityReportHistory> excelReport(@Param("from_date") String from_date,
			@Param("to_date") String to_date,@Param("month") String month, @Param("year") String year);

}
