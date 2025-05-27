package com.focusr.Precot.mssql.database.repository.padpunching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.audit.DailyProdPackingDetailsHistoryF004;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PunchingHandSanitationHistoryF24;

@Repository
public interface PunchingHandSanitationHistoryRepository extends JpaRepository<PunchingHandSanitationHistoryF24, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.PUNCHING_HAND_SANITIZATION_AB_PRESS_HISTORY_F24 WHERE DATE=:date AND SHIFT=:shift", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date, @Param("shift") String shift);

	@Query(value = "SELECT * FROM precot.PUNCHING_HAND_SANITIZATION_AB_PRESS_HISTORY_F24 WHERE DATE =:date AND SHIFT=:shift AND VERSION IN (SELECT MAX(VERSION) FROM precot.PUNCHING_HAND_SANITIZATION_AB_PRESS_HISTORY_F24 WHERE DATE =:date AND SHIFT=:shift)", nativeQuery = true)
	PunchingHandSanitationHistoryF24 findLastSubmittedRecord(@Param("date") String date,@Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.PUNCHING_HAND_SANITIZATION_AB_PRESS_HISTORY_F24 WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
			+ "AND (:f06_shift IS NULL OR SHIFT = :f06_shift) ", nativeQuery = true)
	List<PunchingHandSanitationHistoryF24> findByParams006(@Param("from_date") String from_date,
			@Param("to_date") String to_date,@Param("f06_shift") String f06_shift);
	
}
