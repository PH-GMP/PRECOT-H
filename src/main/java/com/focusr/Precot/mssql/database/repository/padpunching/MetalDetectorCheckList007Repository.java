package com.focusr.Precot.mssql.database.repository.padpunching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.padpunching.MetalDetectorCheckList007;

public interface MetalDetectorCheckList007Repository extends JpaRepository<MetalDetectorCheckList007,Long>{

	@Query(value = "SELECT * FROM precot.PADPUNCHING_ARGUS_METAL_DETECTOR_CHECK_LIST_F007 WHERE LIST_ID = :listId ", nativeQuery = true)
	MetalDetectorCheckList007 findFormById(@Param("listId") long listId);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_ARGUS_METAL_DETECTOR_CHECK_LIST_F007 WHERE DATE = :date", nativeQuery = true)
	MetalDetectorCheckList007 findByDate(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.PADPUNCHING_ARGUS_METAL_DETECTOR_CHECK_LIST_F007 WHERE (:month IS NULL OR :month='' OR MONTH=:month) AND (:year IS NULL OR :year='' OR YEAR=:year) AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<MetalDetectorCheckList007> findByMonthPrintApi(@Param("month") String month,@Param("year") String year);

	@Query(value = "SELECT * FROM precot.PADPUNCHING_ARGUS_METAL_DETECTOR_CHECK_LIST_F007 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY LIST_ID DESC", nativeQuery = true)
    List<MetalDetectorCheckList007> supervisorSummary();

	@Query(value = "SELECT * FROM precot.PADPUNCHING_ARGUS_METAL_DETECTOR_CHECK_LIST_F007 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY LIST_ID DESC", nativeQuery = true)
    List<MetalDetectorCheckList007> hodSummary();

}
