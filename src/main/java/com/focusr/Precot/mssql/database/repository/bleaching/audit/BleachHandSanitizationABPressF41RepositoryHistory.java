package com.focusr.Precot.mssql.database.repository.bleaching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachHandSanitizationABPressHistoryF41;

@Repository
public interface BleachHandSanitizationABPressF41RepositoryHistory extends JpaRepository<BleachHandSanitizationABPressHistoryF41, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.BLEACH_HAND_SANITIZATION_AB_PRESS_HISTORY_F41 WHERE DATE=:date AND SHIFT=:shift", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date, @Param("shift") String shift);

	
	@Query(value = "SELECT * FROM precot.BLEACH_HAND_SANITIZATION_AB_PRESS_HISTORY_F41 WHERE DATE=:date AND SHIFT=:shift AND VERSION IN (SELECT MAX(VERSION) FROM precot.BLEACH_HAND_SANITIZATION_AB_PRESS_HISTORY_F41 WHERE DATE=:date AND SHIFT=:shift)", nativeQuery = true)
	BleachHandSanitizationABPressHistoryF41 fetchLastSubmittedRecordLaydown(@Param("date") String date, @Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.BLEACH_HAND_SANITIZATION_AB_PRESS_HISTORY_F41 WHERE DATE=:date AND SHIFT=:shift", nativeQuery = true)
	List<BleachHandSanitizationABPressHistoryF41> fetchLaydownHistories(@Param("date") String date, @Param("shift") String shift);
	
	
		// EXCEL
	
	@Query(value = "SELECT * FROM precot.BLEACH_HAND_SANITIZATION_AB_PRESS_HISTORY_F41 WHERE DATE between :from_date AND :to_date AND (:shift IS NULL OR SHIFT = :shift)", nativeQuery = true)
	List<BleachHandSanitizationABPressHistoryF41> fetchHandSanitationHistory(@Param("from_date") String from_date, @Param("to_date") String to_date, @Param("shift") String shift);
	

	@Query(value = "SELECT * FROM precot.BLEACH_HAND_SANITIZATION_AB_PRESS_HISTORY_F41 WHERE " +
            "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) " +
            "AND (:shift IS NULL OR SHIFT = :shift)",
    nativeQuery = true)
	List<BleachHandSanitizationABPressHistoryF41> findRecords(
	        @Param("from_date") String from_date,
	        @Param("to_date") String to_date,
	        @Param("shift") String shift);

	
	
	

	
	
}
