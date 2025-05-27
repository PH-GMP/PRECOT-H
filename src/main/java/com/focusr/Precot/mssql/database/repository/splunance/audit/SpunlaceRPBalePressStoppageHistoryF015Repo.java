package com.focusr.Precot.mssql.database.repository.splunance.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceRPBalePressStoppageHistoryF015;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceShiftWiseRPProdSupportHistoryF14;

public interface SpunlaceRPBalePressStoppageHistoryF015Repo extends JpaRepository<SpunlaceRPBalePressStoppageHistoryF015,Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.RP_BALE_PRESS_STOPPAGE_HISTORY_F15 WHERE DATE =:date", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.RP_BALE_PRESS_STOPPAGE_HISTORY_F15 WHERE DATE =:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.RP_BALE_PRESS_STOPPAGE_HISTORY_F15 WHERE DATE =:date)", nativeQuery = true)
	SpunlaceRPBalePressStoppageHistoryF015 fetchLastSubmittedRecord(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.RP_BALE_PRESS_STOPPAGE_HISTORY_F15 WHERE DATE =:date", nativeQuery = true)
	List<SpunlaceRPBalePressStoppageHistoryF015> fetchHistory(@Param("date") String date);
	
	// audit
				@Query(value = "SELECT * FROM precot.RP_BALE_PRESS_STOPPAGE_HISTORY_F15 WHERE "
				        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
				      , nativeQuery = true)
				List<SpunlaceRPBalePressStoppageHistoryF015> findByParams15(@Param("from_date") String from_date,
				        @Param("to_date") String to_date);

	
}
