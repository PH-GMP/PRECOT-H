package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.QaRodentBoxCheckListHistory;

@Repository
public interface QaRodentBoxCheckListHistoryRepository extends JpaRepository<QaRodentBoxCheckListHistory, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_RODENT_BOX_CHECK_LIST_HISTORY WHERE MONTH =:month AND YEAR =:year AND DATE =:date", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("month") String month, @Param("year") String year,@Param("date") String date);
		
	@Query(value = "SELECT * FROM precot.QA_RODENT_BOX_CHECK_LIST_HISTORY WHERE MONTH =:month AND YEAR =:year AND DATE =:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.QA_RODENT_BOX_CHECK_LIST_HISTORY WHERE MONTH =:month AND YEAR =:year AND DATE =:date)", nativeQuery = true)
	QaRodentBoxCheckListHistory fetchLastSubmittedRecord(@Param("month") String month, @Param("year") String year,@Param("date") String date);

	
	@Query(value = "SELECT * FROM precot.QA_RODENT_BOX_CHECK_LIST_HISTORY WHERE "
			+ " (:month IS NULL OR :month='' OR MONTH=:month)" 
			+" AND (:year IS NULL OR :year='' OR YEAR=:year)"
			+ " AND (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date) ", nativeQuery = true)
	List<QaRodentBoxCheckListHistory> excelReport(@Param("from_date") String from_date,
			@Param("to_date") String to_date,@Param("month") String month, @Param("year") String year);

}
