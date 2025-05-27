package com.focusr.Precot.mssql.database.repository.padpunching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.padpunching.DailyRollConsumptionReportF002;

public interface DailyRollConsumptionReportRepositoryF002 extends JpaRepository<DailyRollConsumptionReportF002, Long>{
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_DAILY_ROLL_CONSUMPTION_REPORT_F002 WHERE REPORT_ID = :repoortId ", nativeQuery = true)
	DailyRollConsumptionReportF002 findFormById(@Param("repoortId") long repoortId);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_DAILY_ROLL_CONSUMPTION_REPORT_F002 WHERE DATE = :date AND SHIFT = :shift AND MACHINE_NAME = :machineName", nativeQuery = true)
	DailyRollConsumptionReportF002 findByDateShiftMachine(@Param("date") String date,@Param("shift") String shift,@Param("machineName") String machineName);

//	@Query(value = "SELECT * FROM precot.PADPUNCHING_DAILY_ROLL_CONSUMPTION_REPORT_F002 WHERE DATE = :date AND SHIFT = :shift AND MACHINE_NAME = :machineName  AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
//	List<DailyRollConsumptionReportF002> findByDateShiftPrintApi(@Param("date") String date,@Param("shift") String shift,@Param("machineName") String machineName);

	@Query(value = "SELECT * FROM precot.PADPUNCHING_DAILY_ROLL_CONSUMPTION_REPORT_F002 WHERE (:date IS NULL OR :date='' OR DATE=:date) AND (:shift IS NULL OR :shift='' OR SHIFT=:shift) AND (:machineName IS NULL OR :machineName='' OR MACHINE_NAME=:machineName) AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<DailyRollConsumptionReportF002> findByDateShiftPrintApi(@Param("date") String date,@Param("shift") String shift,@Param("machineName") String machineName);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_DAILY_ROLL_CONSUMPTION_REPORT_F002 WHERE OPERATOR_STATUS = 'OPERATOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY REPORT_ID DESC", nativeQuery = true)
    List<DailyRollConsumptionReportF002> operatorSummary();

	@Query(value = "SELECT * FROM precot.PADPUNCHING_DAILY_ROLL_CONSUMPTION_REPORT_F002 WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY REPORT_ID DESC", nativeQuery = true)
    List<DailyRollConsumptionReportF002> supervisorHodSummary();


}
