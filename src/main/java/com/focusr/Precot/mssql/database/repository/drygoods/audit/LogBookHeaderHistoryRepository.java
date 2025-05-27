package com.focusr.Precot.mssql.database.repository.drygoods.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.drygoods.audit.LogBookHeaderHistory;
import com.focusr.Precot.mssql.database.model.drygoods.audit.MiniRollHistory;



public interface LogBookHeaderHistoryRepository extends JpaRepository<LogBookHeaderHistory, Long> {
	@Query(value = "SELECT * FROM precot.DRYGOODS_LOGBOOK_DETAILS_HISTORY WHERE HISTORY_ID=:history_id", nativeQuery = true)
	LogBookHeaderHistory getDetails(@Param("history_id") Long history_id);
	
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.DRYGOODS_LOGBOOK_DETAILS_HISTORY WHERE DATE =:date AND SHIFT=:shift", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date, @Param("shift") String shift);

	@Query(value = "SELECT * FROM precot.DRYGOODS_LOGBOOK_DETAILS_HISTORY WHERE "
			        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
			        + "AND (:f010_shift IS NULL OR SHIFT = :f010_shift) ", nativeQuery = true)
	List<LogBookHeaderHistory> findByParams10(@Param("from_date") String from_date,
	        @Param("to_date") String to_date,
	        @Param("f010_shift") String f010_shift);

	
	@Query(value = "SELECT * FROM precot.DRYGOODS_LOGBOOK_DETAILS_HISTORY WHERE DATE=:date AND SHIFT=:shift AND VERSION IN (SELECT MAX(VERSION) FROM precot.DRYGOODS_LOGBOOK_DETAILS_HISTORY WHERE DATE=:date AND SHIFT=:shift)", nativeQuery = true)
	LogBookHeaderHistory fetchLastSubmittedRecord(@Param("date") String date, @Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_LOGBOOK_DETAILS_HISTORY WHERE DATE=:date AND SHIFT=:shift", nativeQuery = true)
	List<LogBookHeaderHistory> fetchHistory(@Param("date") String date, @Param("shift") String shift);
	

}
