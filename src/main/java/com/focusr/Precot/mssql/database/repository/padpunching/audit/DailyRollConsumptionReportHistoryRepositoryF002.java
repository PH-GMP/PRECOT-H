package com.focusr.Precot.mssql.database.repository.padpunching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.padpunching.audit.DailyRollConsumptionReportHistoryF002;

public interface DailyRollConsumptionReportHistoryRepositoryF002 extends JpaRepository<DailyRollConsumptionReportHistoryF002, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.PADPUNCHING_DAILY_ROLL_CONSUMPTION_REPORT_HISTORY_F002 WHERE DATE =:date AND SHIFT = :shift AND MACHINE_NAME = :machineName", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("shift") String shift,@Param("machineName") String machineName);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_DAILY_ROLL_CONSUMPTION_REPORT_HISTORY_F002 WHERE DATE =:date AND SHIFT = :shift AND MACHINE_NAME = :machineName AND VERSION IN (SELECT MAX(VERSION) FROM precot.PADPUNCHING_DAILY_ROLL_CONSUMPTION_REPORT_HISTORY_F002 WHERE DATE =:date AND SHIFT = :shift AND MACHINE_NAME = :machineName)", nativeQuery = true)
	DailyRollConsumptionReportHistoryF002 fetchLastSubmittedRecord(@Param("date") String date,@Param("shift") String shift,@Param("machineName") String machineName);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_DAILY_ROLL_CONSUMPTION_REPORT_HISTORY_F002 WHERE DATE =:date AND SHIFT = :shift AND MACHINE_NAME = :machineName", nativeQuery = true)
	List<DailyRollConsumptionReportHistoryF002> fetchHistory(@Param("date") String date,@Param("shift") String shift,@Param("machineName") String machineName);

	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_DAILY_ROLL_CONSUMPTION_REPORT_HISTORY_F002 WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
			+ "AND (:f02_shift IS NULL OR SHIFT = :f02_shift) "
			+ "AND (:f02_machine_name IS NULL OR MACHINE_NAME = :f02_machine_name)", nativeQuery = true)
	List<DailyRollConsumptionReportHistoryF002> findByParams002(@Param("from_date") String from_date,
			@Param("to_date") String to_date,@Param("f02_shift") String f02_shift,@Param("f02_machine_name") String f02_machine_name);

}
