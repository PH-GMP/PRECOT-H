package com.focusr.Precot.mssql.database.repository.bleaching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.MetalDetectorCheckListF03;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachLayDownCheckListF42History;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachMetalDetectorCheckListHistoryF03;

@Repository
public interface BleachMetalDetectorCheckListHistoryRepositoryF03 extends JpaRepository<BleachMetalDetectorCheckListHistoryF03, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.BLEACH_METAL_DETECTOR_CHECK_LIST_HISTORY_F03 WHERE DATE=:date AND SECTION=:section", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date, @Param("section") String section);

	
	@Query(value = "SELECT * FROM precot.BLEACH_METAL_DETECTOR_CHECK_LIST_HISTORY_F03 WHERE DATE=:date AND SECTION=:section AND VERSION IN (SELECT MAX(VERSION) FROM precot.BLEACH_METAL_DETECTOR_CHECK_LIST_HISTORY_F03 WHERE DATE=:date AND SECTION=:section)", nativeQuery = true)
	BleachMetalDetectorCheckListHistoryF03 fetchLastSubmittedRecords(@Param("date") String date,@Param("section") String section);
	
	@Query(value = "SELECT * FROM precot.BLEACH_METAL_DETECTOR_CHECK_LIST_HISTORY_F03 WHERE DATE=:date AND SECTION=:section", nativeQuery = true)
	List<BleachMetalDetectorCheckListHistoryF03> fetchHistroy(@Param("date") String date,
			@Param("section") String section);

	// EXCEL

//	@Query(value = "SELECT * FROM precot.BLEACH_METAL_DETECTOR_CHECK_LIST_HISTORY_F03 WHERE SECTION LIKE :section AND DATE BETWEEN :start AND :end ORDER BY DATE ASC", nativeQuery = true)
//	List<BleachMetalDetectorCheckListHistoryF03> fetchMetalDetectorHistories(@Param("section") String section,
//			@Param("start") String startDate, @Param("end") String endDate);

	
	@Query(value = "SELECT * FROM precot.BLEACH_METAL_DETECTOR_CHECK_LIST_HISTORY_F03 WHERE " +
            "(:start IS NULL OR :end IS NULL OR DATE BETWEEN :start AND :end) " +
            "AND (:section IS NULL OR SECTION = :section)",
    nativeQuery = true)
	List<BleachMetalDetectorCheckListHistoryF03> fetchMetalDetectorHistories(@Param("section") String section,
			@Param("start") String startDate, @Param("end") String endDate);
	
	@Query(value = "SELECT MIN(DATE) FROM precot.BLEACH_METAL_DETECTOR_CHECK_LIST_HISTORY_F03", nativeQuery = true)
	String findMinimumCreationDate();

	@Query(value = "SELECT MAX(DATE) FROM precot.BLEACH_METAL_DETECTOR_CHECK_LIST_HISTORY_F03", nativeQuery = true)
	String findMaximumCreationDate();

}
