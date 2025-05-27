package com.focusr.Precot.mssql.database.repository.splunance.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.audit.DailyStoppageReportSpunlaceHistoryF008;



public interface DailyStoppageReportSpunlaceHistoryF008Repository extends JpaRepository<DailyStoppageReportSpunlaceHistoryF008, Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.SPUNLACE_DAILY_STOPPAGE_DETAILS_HISTORY_F008 WHERE DATE =:date", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_STOPPAGE_DETAILS_HISTORY_F008 WHERE DATE =:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.SPUNLACE_DAILY_STOPPAGE_DETAILS_HISTORY_F008 WHERE DATE =:date)", nativeQuery = true)
	DailyStoppageReportSpunlaceHistoryF008 fetchLastSubmittedRecord(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_STOPPAGE_DETAILS_HISTORY_F008 WHERE WHERE DATE =:date", nativeQuery = true)
	List<DailyStoppageReportSpunlaceHistoryF008> fetchHistory(@Param("date") String date);
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_STOPPAGE_DETAILS_HISTORY_F008 WHERE "
	        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date)", nativeQuery = true)
	List<DailyStoppageReportSpunlaceHistoryF008> findByParams08(@Param("from_date") String from_date,
	        @Param("to_date") String to_date);

}
