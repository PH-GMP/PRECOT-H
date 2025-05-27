package com.focusr.Precot.mssql.database.repository.drygoods;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.drygoods.LogBookHeader;

public interface LogBookHeaderRepository extends JpaRepository<LogBookHeader, Long> {

	@Query(value = "SELECT * FROM precot.DRYGOODS_LOGBOOK_DETAILS WHERE LOG_ID=:log_id AND FORMAT_NO ='PH-PRD04/F-010'", nativeQuery = true)
	LogBookHeader getDetails(@Param("log_id") Long log_id);
	
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_LOGBOOK_DETAILS WHERE SUPERVISOR_STATUS ='SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY LOG_ID DESC", nativeQuery = true)
    List<LogBookHeader> SupervisorSummary();
	
	
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_LOGBOOK_DETAILS  WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS !='HOD_APPROVED' ORDER BY  LOG_ID DESC", nativeQuery = true)
	List<LogBookHeader> hodSummary();
	
	
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_LOGBOOK_DETAILS WHERE  DATE=:date AND SHIFT =:shift", nativeQuery = true)
	LogBookHeader getdetailsbyParam(@Param("date") String date, @Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_LOGBOOK_DETAILS WHERE " + "(:date IS NULL OR DATE = :date) AND "
			+ "(:shift IS NULL OR SHIFT = :shift) AND " + "HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<LogBookHeader> printParam(@Param("date") String date, @Param("shift") String shift);


	
	// PDE 

}
