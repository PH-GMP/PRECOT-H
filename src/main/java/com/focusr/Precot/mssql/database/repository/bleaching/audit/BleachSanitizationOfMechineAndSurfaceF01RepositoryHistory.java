package com.focusr.Precot.mssql.database.repository.bleaching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachLayDownCheckListF42History;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachSanitizationOfMechineAndSurfaceHistoryF01;

@Repository
public interface BleachSanitizationOfMechineAndSurfaceF01RepositoryHistory extends JpaRepository<BleachSanitizationOfMechineAndSurfaceHistoryF01, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.BLEACH_SANITIZATION_OF_MECHINE_AND_SURFACE_HISTORY_F01 WHERE MONTH=:month AND YEAR=:year AND WEEK=:week", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("year") String year, @Param("month") String month, @Param("week") String week);

	
	@Query(value = "SELECT * FROM precot.BLEACH_SANITIZATION_OF_MECHINE_AND_SURFACE_HISTORY_F01 WHERE MONTH=:month AND YEAR=:year AND WEEK=:week AND VERSION IN (SELECT MAX(VERSION) FROM precot.BLEACH_SANITIZATION_OF_MECHINE_AND_SURFACE_HISTORY_F01 WHERE MONTH=:month AND YEAR=:year AND WEEK=:week)", nativeQuery = true)
	BleachSanitizationOfMechineAndSurfaceHistoryF01 fetchLastSubmittedRecords(@Param("year") String year,
			@Param("month") String month, @Param("week") String week);

	@Query(value = "SELECT * FROM precot.BLEACH_SANITIZATION_OF_MECHINE_AND_SURFACE_HISTORY_F01 WHERE MONTH=:month AND YEAR=:year AND WEEK=:week", nativeQuery = true)
	List<BleachSanitizationOfMechineAndSurfaceHistoryF01> fetchHistory(@Param("year") String year,
			@Param("month") String month, @Param("week") String week);

	// Excel

	@Query(value = "SELECT * FROM precot.BLEACH_SANITIZATION_OF_MECHINE_AND_SURFACE_HISTORY_F01 WHERE WEEK LIKE :week AND MONTH LIKE :month AND YEAR LIKE :year AND createdAt BETWEEN :start AND :end ORDER BY createdAt ASC", nativeQuery = true)
	List<BleachSanitizationOfMechineAndSurfaceHistoryF01> fetchLaydownHistories(@Param("week") String week,
			@Param("month") String month, @Param("year") String year, @Param("start") String startDate,
			@Param("end") String endDate);

	@Query(value = "SELECT MIN(createdAt) FROM precot.BLEACH_SANITIZATION_OF_MECHINE_AND_SURFACE_HISTORY_F01", nativeQuery = true)
	String findMinimumCreationDate();

	@Query(value = "SELECT MAX(createdAt) FROM precot.BLEACH_SANITIZATION_OF_MECHINE_AND_SURFACE_HISTORY_F01", nativeQuery = true)
	String findMaximumCreationDate();

}
