package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.audit.MomMockRecallHistory;

public interface MomMockRecallHistoryRepository extends JpaRepository<MomMockRecallHistory, Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.MOM_MOC_RECALL_TBL_HISTORY WHERE YEAR =:year AND DATE =:date", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("year") String year, @Param("date") String date);

	@Query(value = "SELECT * FROM precot.MOM_MOC_RECALL_TBL_HISTORY WHERE YEAR =:year AND DATE =:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.MOM_MOC_RECALL_TBL_HISTORY WHERE YEAR =:year AND DATE =:date)", nativeQuery = true)
	MomMockRecallHistory fetchLastSubmittedRecord(@Param("year") String year, @Param("date") String date);
	
	
	@Query(value = "SELECT * FROM precot.MOM_MOC_RECALL_TBL_HISTORY WHERE "
			+ " (:year IS NULL OR :year='' OR YEAR=:year)"
			+ " AND (:month IS NULL OR :month='' OR MONTH=:month)"
			+ " AND (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date)", nativeQuery = true)
	List<MomMockRecallHistory> excelReport(@Param("year") String year, @Param("month") String month,
			@Param("from_date") String from_date, @Param("to_date") String to_date);

}
