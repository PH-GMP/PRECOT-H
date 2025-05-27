package com.focusr.Precot.Buds.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.model.BudsLogbookHeader;
import com.focusr.Precot.Buds.model.audit.BudsLogbookHeaderHistory;

@Repository
public interface BudsLogbookHeaderRepository extends JpaRepository<BudsLogbookHeader, Long>{

	@Query(value = "SELECT * FROM precot.BUDS_LOGBOOK_HEADER WHERE LOG_ID=:id", nativeQuery = true)
	BudsLogbookHeader logbookHeaderById(@Param("id") Long id);
	
		// SUMMARY 
	
	@Query(value = "SELECT * FROM precot.BUDS_LOGBOOK_HEADER WHERE SUPERVISOR_STATUS='SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY LOG_ID DESC", nativeQuery = true)
	List<BudsLogbookHeader> logbookHeaderSupervisor();
	
	@Query(value = "SELECT * FROM precot.BUDS_LOGBOOK_HEADER WHERE SUPERVISOR_STATUS='SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY LOG_ID DESC", nativeQuery = true)
	List<BudsLogbookHeader> logbookHeaderHod();
	
		// GET BY BATCH NUMBER
	
	@Query(value = "SELECT * FROM precot.BUDS_LOGBOOK_HEADER WHERE LOG_DATE=:logDate AND LOG_SHIFT=:logShift", nativeQuery = true)
	List<BudsLogbookHeader> logbookHeaderByDateShift(@Param("logDate") String logDate, @Param("logShift") String logShift);
	
	
		// PRINT 
	
		@Query(value = "SELECT * FROM precot.BUDS_LOGBOOK_HEADER "
				+ "WHERE (:date IS NULL OR :date = '' OR LOG_DATE = :date) "
				+ "AND (:shift IS NULL OR :shift = '' OR LOG_SHIFT = :shift) "
				+ "AND (:year IS NULL OR :year = '' OR YEAR(LOG_DATE) = :year) "
				+ "AND (:month IS NULL OR :month = '' OR MONTH(LOG_DATE) = :month) "
				+ "AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
		List<BudsLogbookHeader> printLogbookHeaders(@Param("date") String date, @Param("shift") String shift,
				@Param("year") String year, @Param("month") String month);

}
