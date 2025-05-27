package com.focusr.Precot.mssql.database.repository.splunance.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.audit.MetalDetectorCheckListHistoryF020;

public interface MetalDetectorCheckListHistoryF020Repo extends JpaRepository<MetalDetectorCheckListHistoryF020,Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.SPUNLACE_METAL_DETECTOR_CHECK_LIST_HISTORY_F020 WHERE DATE =:date AND MONTH=:month AND YEAR=:year", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("month") String month,@Param("year") String year);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_METAL_DETECTOR_CHECK_LIST_HISTORY_F020 WHERE DATE =:date AND MONTH=:month AND YEAR=:year AND VERSION IN (SELECT MAX(VERSION) FROM precot.SPUNLACE_METAL_DETECTOR_CHECK_LIST_HISTORY_F020 WHERE DATE =:date AND MONTH=:month AND YEAR=:year)", nativeQuery = true)
	MetalDetectorCheckListHistoryF020 fetchLastSubmittedRecord(@Param("date") String date,@Param("month") String month,@Param("year") String year);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_METAL_DETECTOR_CHECK_LIST_HISTORY_F020 WHERE DATE =:date AND MONTH=:month AND YEAR=:year", nativeQuery = true)
	List<MetalDetectorCheckListHistoryF020> fetchHistory(@Param("date") String date,@Param("month") String month,@Param("year") String year);

	
	@Query(value = "SELECT * FROM precot.SPUNLACE_METAL_DETECTOR_CHECK_LIST_HISTORY_F020 WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
			+ "AND (:f020_month IS NULL OR MONTH = :f020_month) "
			+ "AND (:f020_year IS NULL OR YEAR = :f020_year)", nativeQuery = true)
	List<MetalDetectorCheckListHistoryF020> findByParams020(@Param("from_date") String from_date,
			@Param("to_date") String to_date, @Param("f020_month") String f025_month,
			@Param("f020_year") String f025_year);
	
	
}
