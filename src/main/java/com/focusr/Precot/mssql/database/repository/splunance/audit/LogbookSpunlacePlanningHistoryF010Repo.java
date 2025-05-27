package com.focusr.Precot.mssql.database.repository.splunance.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.audit.DailyStoppageReportSpunlaceHistoryF008;
import com.focusr.Precot.mssql.database.model.splunance.audit.LogbookSpunlacePlanningHistoryF010;

public interface LogbookSpunlacePlanningHistoryF010Repo extends JpaRepository<LogbookSpunlacePlanningHistoryF010,Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.SPUNLACE_LOGBOOK_SPUNLACE_PLANNING_HISTORY_F010 WHERE DATE =:date", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_LOGBOOK_SPUNLACE_PLANNING_HISTORY_F010 WHERE DATE =:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.SPUNLACE_LOGBOOK_SPUNLACE_PLANNING_HISTORY_F010 WHERE DATE =:date )", nativeQuery = true)
	LogbookSpunlacePlanningHistoryF010 fetchLastSubmittedRecord(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_LOGBOOK_SPUNLACE_PLANNING_HISTORY_F010 WHERE DATE =:date ", nativeQuery = true)
	List<LogbookSpunlacePlanningHistoryF010> fetchHistory(@Param("date") String date);
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_LOGBOOK_SPUNLACE_PLANNING_HISTORY_F010 WHERE "
	        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date)", nativeQuery = true)
	List<LogbookSpunlacePlanningHistoryF010> findByParams10(@Param("from_date") String from_date,
	        @Param("to_date") String to_date);


}
