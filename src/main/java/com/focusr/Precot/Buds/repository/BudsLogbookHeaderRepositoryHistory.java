package com.focusr.Precot.Buds.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.model.audit.BudsLogbookHeaderHistory;

@Repository
public interface BudsLogbookHeaderRepositoryHistory  extends JpaRepository<BudsLogbookHeaderHistory, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.BUDS_LOGBOOK_HEADER_HISTORY WHERE LOG_DATE=:logDate AND LOG_SHIFT=:logShift", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("logDate") String logDate, @Param("logShift") String logShift);
	
	
	@Query(value = "SELECT * FROM precot.BUDS_LOGBOOK_HEADER_HISTORY WHERE LOG_DATE=:logDate AND LOG_SHIFT=:logShift AND VERSION IN (SELECT MAX(VERSION) FROM precot.BUDS_LOGBOOK_HEADER_HISTORY WHERE LOG_DATE=:logDate AND LOG_SHIFT=:logShift)", nativeQuery = true)
	BudsLogbookHeaderHistory fetchLastSubmittedRecord(@Param("logDate") String logDate, @Param("logShift") String logShift);
	
	// EXCEL
	
	@Query(value = "SELECT * FROM precot.BUDS_LOGBOOK_HEADER_HISTORY WHERE "
			+ " (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR LOG_DATE BETWEEN :from_date AND :to_date) "
			+ " AND (:shift IS NULL OR :shift = '' OR LOG_SHIFT = :shift)",
    nativeQuery = true)
List<BudsLogbookHeaderHistory> logbookHeaderExcel( 
                                              @Param("shift") String shift, 
                                              @Param("from_date") String from_date, 
                                              @Param("to_date") String to_date);

			
	
}
