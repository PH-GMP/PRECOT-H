package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.LogbookSpunlacePlanningF010;

public interface LogbookSpunlacePlanningF010Repository extends JpaRepository<LogbookSpunlacePlanningF010,Long>{

	@Query(value = "SELECT * FROM precot.SPUNLACE_LOGBOOK_SPUNLACE_PLANNING_F010 WHERE PLAN_ID = :planId ", nativeQuery = true)
	LogbookSpunlacePlanningF010 findFormById(@Param("planId") long planId);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_LOGBOOK_SPUNLACE_PLANNING_F010 WHERE DATE = :date", nativeQuery = true)
	LogbookSpunlacePlanningF010 findByDate(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.SPUNLACE_LOGBOOK_SPUNLACE_PLANNING_F010 WHERE DATE = :date AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	LogbookSpunlacePlanningF010 findByDatePrintApi(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.SPUNLACE_LOGBOOK_SPUNLACE_PLANNING_F010 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY PLAN_ID DESC", nativeQuery = true)
    List<LogbookSpunlacePlanningF010> supervisorSummary();

	@Query(value = "SELECT * FROM precot.SPUNLACE_LOGBOOK_SPUNLACE_PLANNING_F010 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY PLAN_ID DESC", nativeQuery = true)
    List<LogbookSpunlacePlanningF010> hodSummary();
}
