package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.QaPestControllerHistory;

@Repository
public interface QaPestControllerHistoryRepository extends JpaRepository<QaPestControllerHistory, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_PEST_CONTROLLER_HISTORY WHERE FORMAT_NO =:format_no AND MONTH =:month AND YEAR =:year AND DATE =:date", nativeQuery = true)
	Optional<Integer> getMaximumVersion1(@Param("format_no") String format_no,@Param("month") String month, @Param("year") String year,@Param("date") String date);
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_PEST_CONTROLLER_HISTORY WHERE FORMAT_NO =:format_no AND MONTH =:month AND YEAR =:year", nativeQuery = true)
	Optional<Integer> getMaximumVersion2(@Param("format_no") String format_no,@Param("month") String month, @Param("year") String year);
	
	@Query(value = "SELECT * FROM precot.QA_PEST_CONTROLLER_HISTORY WHERE FORMAT_NO =:format_no AND MONTH =:month AND YEAR =:year AND DATE =:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.QA_PEST_CONTROLLER_HISTORY WHERE FORMAT_NO =:format_no AND MONTH =:month AND YEAR =:year AND DATE =:date)", nativeQuery = true)
	QaPestControllerHistory fetchLastSubmittedRecord1(@Param("format_no") String format_no,@Param("month") String month, @Param("year") String year,@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.QA_PEST_CONTROLLER_HISTORY WHERE FORMAT_NO =:format_no AND MONTH =:month AND YEAR =:year AND VERSION IN (SELECT MAX(VERSION) FROM precot.QA_PEST_CONTROLLER_HISTORY WHERE FORMAT_NO =:format_no AND MONTH =:month AND YEAR =:year)", nativeQuery = true)
	QaPestControllerHistory fetchLastSubmittedRecord2(@Param("format_no") String format_no,@Param("month") String month, @Param("year") String year);

	
	@Query(value = "SELECT * FROM precot.QA_PEST_CONTROLLER_HISTORY WHERE "
			+ " FORMAT_NO =:format_no"
			+ " AND (:month IS NULL OR :month='' OR MONTH=:month)"
			+" AND (:year IS NULL OR :year='' OR YEAR=:year)"
			+ " AND (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date) ", nativeQuery = true)
	List<QaPestControllerHistory> excelReport(@Param("format_no") String format_no,@Param("from_date") String from_date,
			@Param("to_date") String to_date,@Param("month") String month, @Param("year") String year);
}
