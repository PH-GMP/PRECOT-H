package com.focusr.Precot.mssql.database.repository.padpunching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.audit.BagMakingSpecificationDetailsHistoryF014;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PadPunchingBagMakingDailyProductionDetailsHistoryF001;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PadPunchingSanitizationOfMachinesAndSurfacesHistoryF21;


@Repository
public interface PadPunchingSanitizationOfMachinesAndSurfacesRepositoryHistoryF21 extends JpaRepository<PadPunchingSanitizationOfMachinesAndSurfacesHistoryF21, Long>{

	
	@Query(value = "SELECT MAX(VERSION) FROM precot.PADPUNCHING_SANITIZATION_OF_MACHINES_AND_SURFACES_HISTORY_F21 WHERE MACHINE_NAME = :machineName AND WEEK_NO = :weekNo AND MONTH = :month AND YEAR = :year", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("machineName") String machineName,@Param("weekNo") String weekNo,@Param("month") String month,@Param("year") String year);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_SANITIZATION_OF_MACHINES_AND_SURFACES_HISTORY_F21 WHERE MACHINE_NAME = :machineName AND WEEK_NO = :weekNo AND MONTH = :month AND YEAR = :year AND VERSION IN (SELECT MAX(VERSION) FROM precot.PADPUNCHING_SANITIZATION_OF_MACHINES_AND_SURFACES_HISTORY_F21 WHERE MACHINE_NAME = :machineName AND WEEK_NO = :weekNo AND MONTH = :month AND YEAR = :year)", nativeQuery = true)
	PadPunchingSanitizationOfMachinesAndSurfacesHistoryF21 fetchLastSubmittedRecord(@Param("machineName") String machineName,@Param("weekNo") String weekNo,@Param("month") String month,@Param("year") String year);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_SANITIZATION_OF_MACHINES_AND_SURFACES_HISTORY_F21 WHERE  MACHINE_NAME = :machineName AND WEEK_NO = :weekNo AND MONTH = :month AND YEAR = :year ", nativeQuery = true)
	List<PadPunchingSanitizationOfMachinesAndSurfacesHistoryF21> fetchHistory(@Param("machineName") String machineName,@Param("weekNo") String weekNo,@Param("month") String month,@Param("year") String year);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_SANITIZATION_OF_MACHINES_AND_SURFACES_HISTORY_F21 WHERE "
	        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
	        + "AND (:f025_shift IS NULL OR SHIFT = :f025_shift)", nativeQuery = true)
	List<PadPunchingSanitizationOfMachinesAndSurfacesHistoryF21> findByParams025(@Param("from_date") String from_date,
	        @Param("to_date") String to_date,  @Param("f025_shift") String f025_shift);

	// EXCEL

		@Query(value = "SELECT * FROM precot.PADPUNCHING_SANITIZATION_OF_MACHINES_AND_SURFACES_HISTORY_F21 WHERE"
				+ "(:fromDate IS NULL OR :toDate IS NULL OR DATE BETWEEN :fromDate AND :toDate)"
				+ "AND (:machine IS NULL OR MACHINE_NAME = :machine)"
				+ "AND (:week IS NULL OR WEEK_NO =:week)" 
				+ "AND (:month IS NULL OR MONTH =:month)"
				+ "AND (:year IS NULL OR YEAR =:year)", nativeQuery = true)
		List<PadPunchingSanitizationOfMachinesAndSurfacesHistoryF21> findByDateF21(@Param("fromDate") String fromDate,
				@Param("toDate") String toDate, @Param("machine") String machine,
				@Param("week") String week, @Param("month") String month, @Param("year") String year);
}
