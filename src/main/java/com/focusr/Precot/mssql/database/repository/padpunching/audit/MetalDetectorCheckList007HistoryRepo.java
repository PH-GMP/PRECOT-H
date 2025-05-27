package com.focusr.Precot.mssql.database.repository.padpunching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.padpunching.audit.MetalDetectorCheckList007History;

public interface MetalDetectorCheckList007HistoryRepo extends JpaRepository<MetalDetectorCheckList007History, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.PADPUNCHING_ARGUS_METAL_DETECTOR_CHECK_LIST_HISTORY_F007 WHERE DATE =:date", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_ARGUS_METAL_DETECTOR_CHECK_LIST_HISTORY_F007 WHERE DATE =:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.PADPUNCHING_ARGUS_METAL_DETECTOR_CHECK_LIST_HISTORY_F007 WHERE DATE =:date)", nativeQuery = true)
	MetalDetectorCheckList007History fetchLastSubmittedRecord(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_ARGUS_METAL_DETECTOR_CHECK_LIST_HISTORY_F007 WHERE DATE =:date", nativeQuery = true)
	List<MetalDetectorCheckList007History> fetchHistory(@Param("date") String date);

	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_ARGUS_METAL_DETECTOR_CHECK_LIST_HISTORY_F007 WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) ", nativeQuery = true)
	List<MetalDetectorCheckList007History> findByParams007(@Param("from_date") String from_date,
			@Param("to_date") String to_date);
	

}
