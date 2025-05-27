package com.focusr.Precot.mssql.database.repository.padpunching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.padpunching.audit.DailyProdPackingDetailsHistoryF004;

public interface DailyProdPackingDetailsHistoryRepositoryF004 extends JpaRepository<DailyProdPackingDetailsHistoryF004, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.PADPUNCHING_DAILY_PRODUCTION_PACKING_DETAILS_HISTORY_F004 WHERE DATE =:date AND SHIFT = :shift", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_DAILY_PRODUCTION_PACKING_DETAILS_HISTORY_F004 WHERE DATE =:date AND SHIFT = :shift AND VERSION IN (SELECT MAX(VERSION) FROM precot.PADPUNCHING_DAILY_PRODUCTION_PACKING_DETAILS_HISTORY_F004 WHERE DATE =:date AND SHIFT = :shift)", nativeQuery = true)
	DailyProdPackingDetailsHistoryF004 fetchLastSubmittedRecord(@Param("date") String date,@Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_DAILY_PRODUCTION_PACKING_DETAILS_HISTORY_F004 WHERE DATE =:date AND SHIFT = :shift", nativeQuery = true)
	List<DailyProdPackingDetailsHistoryF004> fetchHistory(@Param("date") String date,@Param("shift") String shift);

	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_DAILY_PRODUCTION_PACKING_DETAILS_HISTORY_F004 WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
			+ "AND (:f04_shift IS NULL OR SHIFT = :f04_shift) ", nativeQuery = true)
	List<DailyProdPackingDetailsHistoryF004> findByParams004(@Param("from_date") String from_date,
			@Param("to_date") String to_date,@Param("f04_shift") String f04_shift);
}
