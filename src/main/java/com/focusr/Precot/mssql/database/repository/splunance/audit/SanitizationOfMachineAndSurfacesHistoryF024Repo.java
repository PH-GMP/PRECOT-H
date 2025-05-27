package com.focusr.Precot.mssql.database.repository.splunance.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.audit.SanitizationOfMachineAndSurfacesHistoryF024;

public interface SanitizationOfMachineAndSurfacesHistoryF024Repo extends JpaRepository<SanitizationOfMachineAndSurfacesHistoryF024,Long>{
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.SPUNLACE_SANITIZATION_OF_MACHINES_AND_SURFACES_HISTORY_F024 WHERE MONTH=:month AND YEAR=:year AND WEEK =:week", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("month") String month,@Param("year") String year,@Param("week") String week);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_SANITIZATION_OF_MACHINES_AND_SURFACES_HISTORY_F024 WHERE MONTH=:month AND YEAR=:year AND WEEK =:week AND VERSION IN (SELECT MAX(VERSION) FROM precot.SPUNLACE_SANITIZATION_OF_MACHINES_AND_SURFACES_HISTORY_F024 WHERE MONTH=:month AND YEAR=:year AND WEEK =:week)", nativeQuery = true)
	SanitizationOfMachineAndSurfacesHistoryF024 fetchLastSubmittedRecord(@Param("month") String month,@Param("year") String year,@Param("week") String week);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_SANITIZATION_OF_MACHINES_AND_SURFACES_HISTORY_F024 WHERE MONTH=:month AND YEAR=:year AND WEEK =:week", nativeQuery = true)
	List<SanitizationOfMachineAndSurfacesHistoryF024> fetchHistory(@Param("month") String month,@Param("year") String year,@Param("week") String week);


	@Query(value = "SELECT * FROM precot.SPUNLACE_SANITIZATION_OF_MACHINES_AND_SURFACES_HISTORY_F024 WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR WEEK_AND_DATE BETWEEN :from_date AND :to_date) "
			+ "AND (:f024_month IS NULL OR MONTH = :f024_month) "
			+ "AND (:f024_year IS NULL OR YEAR = :f024_year) "
			+ "AND (:f024_week IS NULL OR WEEK = :f024_week)", nativeQuery = true)
	List<SanitizationOfMachineAndSurfacesHistoryF024> findByParams024(@Param("from_date") String from_date,
			@Param("to_date") String to_date, @Param("f024_month") String f024_month,
			@Param("f024_year") String f024_year,@Param("f024_week") String f024_week);

}
