package com.focusr.Precot.QA.repository.audit;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.audit.CorrectiveActionReportHistory;
import com.focusr.Precot.QA.model.audit.DeviationFormHistory;

public interface DeviationFormHistoryRepo  extends JpaRepository<DeviationFormHistory,Long> {
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_DEVIATION_FORM_HISTORY WHERE DATE_OF_INITIATION =:dateOfIniation AND DEPARTMENT =:department AND DEVIATION_NUMBER =:deviationNumber", nativeQuery = true)
	Optional<Integer> getMaximumVersion1(@Param("dateOfIniation") LocalDate dateOfIniation,@Param("department") String department,@Param("deviationNumber") String deviationNumber);
	
	@Query(value = "SELECT * FROM precot.QA_DEVIATION_FORM_HISTORY"
			+ " WHERE DATE_OF_INITIATION =:dateOfIniation AND DEPARTMENT =:department AND DEVIATION_NUMBER =:deviationNumber AND "
			+ " VERSION IN "
			+ "(SELECT MAX(VERSION) FROM precot.QA_CORRECTIVE_ACTION_REPORT_HISTORY WHERE DATE_OF_INITIATION =:dateOfIniation AND DEPARTMENT =:department AND DEVIATION_NUMBER =:deviationNumber)", nativeQuery = true)
	DeviationFormHistory fetchLastSubmittedRecord(@Param("dateOfIniation") String dateOfIniation,@Param("department") String department,@Param("deviationNumber") String deviationNumber);
	
//	@Query(value = "SELECT * FROM precot.QA_DEVIATION_FORM"
//					+ " WHERE (:year IS NULL OR :year='' OR YEAR=:year)"
//					+ " AND (:month IS NULL OR :month='' OR MONTH=:month)"
//					+ " AND (:dateOfIniation IS NULL OR :dateOfIniation='' OR DATE_OF_INITIATION =:dateOfIniation)"
//					+ " AND (:deviationNumber IS NULL OR :deviationNumber='' OR DEVIATION_NUMBER=:deviationNumber)", nativeQuery = true)
//	List<DeviationFormHistory> excelReport(@Param("dateOfIniation") String dateOfIniation,@Param("department") String department,@Param("deviationNumber") String deviationNumber);

	@Query(value = "SELECT * FROM precot.QA_DEVIATION_FORM_HISTORY"
			+ " WHERE (:year IS NULL OR :year='' OR YEAR=:year)"
			+ " AND (:month IS NULL OR :month='' OR MONTH=:month)"
			+ " AND (:dateOfInitiation IS NULL OR :dateOfInitiation='' OR DATE_OF_INITIATION =:dateOfInitiation)"
			+ " AND (:deviationNumber IS NULL OR :deviationNumber='' OR DEVIATION_NUMBER=:deviationNumber)", nativeQuery = true)
List<DeviationFormHistory> excelReport(@Param("year") String year,@Param("month") String month,@Param("dateOfInitiation") String dateOfInitiation,@Param("deviationNumber") String deviationNumber);
}
