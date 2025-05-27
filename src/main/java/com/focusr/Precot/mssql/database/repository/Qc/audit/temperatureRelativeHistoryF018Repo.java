package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.microbiologicalAnalyisisReportHistoryF20;
import com.focusr.Precot.mssql.database.model.QcAudit.temperatureRelativeHistoryF018;

@Repository
public interface temperatureRelativeHistoryF018Repo extends JpaRepository<temperatureRelativeHistoryF018, Long>{
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.TEMPERATURE_RELATIVE_HUMIDITY_RECORD_F018_HISTORY WHERE EQ_NO = :EQ_NO AND DATE = :date", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("EQ_NO") String EQ_NO , @Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.TEMPERATURE_RELATIVE_HUMIDITY_RECORD_F018_HISTORY WHERE EQ_NO = :EQ_NO AND DATE = :date AND VERSION IN (SELECT MAX(VERSION) FROM precot.TEMPERATURE_RELATIVE_HUMIDITY_RECORD_F018_HISTORY WHERE EQ_NO = :EQ_NO AND DATE = :date)", nativeQuery = true)
	temperatureRelativeHistoryF018 fetchLastSubmittedRecordPhNumber(@Param("EQ_NO") String EQ_NO , @Param("date") String date);

		
	@Query(value = "SELECT * FROM precot.[TEMPERATURE_RELATIVE_HUMIDITY_RECORD_F018_HISTORY] WHERE ("
			
					+ 
				    
				    "    (CAST(createdAt AS DATE) BETWEEN CAST(:startDate AS DATE) AND CAST(:endDate AS DATE) " +
				    "    AND :startDate IS NOT NULL AND :endDate IS NOT NULL) " +
				    "    OR (CAST(createdAt AS DATE) >= CAST(:startDate AS DATE) AND :startDate IS NOT NULL AND :endDate IS NULL) " +
				    "    OR (CAST(createdAt AS DATE) <= CAST(:endDate AS DATE) AND :endDate IS NOT NULL AND :startDate IS NULL) " +
				    "    OR (:startDate IS NULL AND :endDate IS NULL)" 
			+ ")", nativeQuery = true)
	List<temperatureRelativeHistoryF018> audit( @Param("startDate") String startDate, @Param("endDate") String endDate);

	
	@Query(value = "SELECT * FROM precot.[TEMPERATURE_RELATIVE_HUMIDITY_RECORD_F018_HISTORY] order by TEST_ID desc", nativeQuery = true)
	List<temperatureRelativeHistoryF018> audit();

}
