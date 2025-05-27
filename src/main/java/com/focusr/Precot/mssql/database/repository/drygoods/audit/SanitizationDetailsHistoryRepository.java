package com.focusr.Precot.mssql.database.repository.drygoods.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.drygoods.audit.SanitizationDetailsHistory;
import com.focusr.Precot.mssql.database.model.splunance.audit.DailyRejectionReportHistoryF007;

@Repository
public interface SanitizationDetailsHistoryRepository extends JpaRepository<SanitizationDetailsHistory,Long>{


	@Query(value = "SELECT * FROM precot.DRYGOODS_MC_SANITIZATION_HISTORY WHERE MC_ID=:mc_id", nativeQuery = true)
	SanitizationDetailsHistory getDetails(@Param("mc_id") Long mc_id);
	
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.DRYGOODS_MC_SANITIZATION_HISTORY WHERE YEAR =:year AND MONTH=:month AND WEEK=:week", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("year") String year, @Param("month") String month, @Param("week") String week);

	@Query(value = "SELECT * \r\n"
			+ "FROM precot.DRYGOODS_MC_SANITIZATION_HISTORY \r\n"
			+ "WHERE (:year IS NULL OR YEAR = :year)\r\n"
			+ "  AND (:month IS NULL OR MONTH = :month)\r\n"
			+ "  AND (:week IS NULL OR WEEK = :week)\r\n"
			+ "", nativeQuery = true)
	List<SanitizationDetailsHistory> findByParams12(@Param("year") String year,
	        @Param("month") String month,  @Param("week") String week);
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_MC_SANITIZATION_HISTORY WHERE YEAR =:year AND MONTH=:month AND WEEK=:week AND VERSION IN (SELECT MAX(VERSION) FROM precot.DRYGOODS_MC_SANITIZATION_HISTORY WHERE YEAR =:year AND MONTH=:month AND WEEK=:week)", nativeQuery = true)
	SanitizationDetailsHistory fetchLastSubmittedRecord(@Param("year") String year,
	        @Param("month") String month,  @Param("week") String week);
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_MC_SANITIZATION_HISTORY WHERE YEAR =:year AND MONTH=:month AND WEEK=:week", nativeQuery = true)
	List<SanitizationDetailsHistory> fetchHistory(@Param("year") String year,
	        @Param("month") String month,  @Param("week") String week);
	



}
