package com.focusr.Precot.mssql.database.repository.padpunching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.padpunching.audit.PadPunchingBagMakingDailyProductionDetailsHistoryF001;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PadPunchingLogBookBagMakingHistoryF003;

public interface PadPunchingLogBookBagMakingRepositoryHistoryF003 extends JpaRepository<PadPunchingLogBookBagMakingHistoryF003,Long>{

	
	@Query(value = "SELECT MAX(VERSION) FROM precot.PADPUNCHING_LOG_BOOK_BAG_MAKING_F003_HISTORY WHERE DATE =:date AND SHIFT=:shift ", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_LOG_BOOK_BAG_MAKING_F003_HISTORY WHERE DATE =:date AND SHIFT=:shift AND VERSION IN (SELECT MAX(VERSION) FROM precot.PADPUNCHING_LOG_BOOK_BAG_MAKING_F003_HISTORY WHERE DATE =:date AND SHIFT=:shift )", nativeQuery = true)
	PadPunchingLogBookBagMakingHistoryF003 fetchLastSubmittedRecord(@Param("date") String date,@Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_LOG_BOOK_BAG_MAKING_F003_HISTORY WHERE DATE =:date AND SHIFT=:shift ", nativeQuery = true)
	List<PadPunchingLogBookBagMakingHistoryF003> fetchHistory(@Param("date") String date,@Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_LOG_BOOK_BAG_MAKING_F003_HISTORY WHERE "
	        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
	        + "AND (:f025_shift IS NULL OR SHIFT = :f025_shift)", nativeQuery = true)
	List<PadPunchingLogBookBagMakingHistoryF003> findByParams025(@Param("from_date") String from_date,
	        @Param("to_date") String to_date,  @Param("f025_shift") String f025_shift);
	
	// EXCEL
	
		@Query(value = "SELECT * FROM precot.PADPUNCHING_LOG_BOOK_BAG_MAKING_F003_HISTORY WHERE"
				+ "(:fromDate IS NULL OR :toDate IS NULL OR DATE BETWEEN :fromDate AND :toDate)"
				+ "AND (:shift IS NULL OR SHIFT = :shift)", nativeQuery = true)
		List<PadPunchingLogBookBagMakingHistoryF003> findByDateF003(@Param("fromDate") String fromDate,
				@Param("toDate") String toDate,@Param("shift") String shift);
	
}
