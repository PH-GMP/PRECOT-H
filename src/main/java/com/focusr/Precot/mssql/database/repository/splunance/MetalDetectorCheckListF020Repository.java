package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.MetalDetectorCheckListF020;

public interface MetalDetectorCheckListF020Repository extends JpaRepository<MetalDetectorCheckListF020,Long>{

	@Query(value = "SELECT * FROM precot.SPUNLACE_METAL_DETECTOR_CHECK_LIST_F020 WHERE LIST_ID = :listId ", nativeQuery = true)
	MetalDetectorCheckListF020 findFormById(@Param("listId") long listId);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_METAL_DETECTOR_CHECK_LIST_F020 WHERE DATE = :date", nativeQuery = true)
	MetalDetectorCheckListF020 findByDate(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.SPUNLACE_METAL_DETECTOR_CHECK_LIST_F020 WHERE MONTH = :month AND YEAR = :year AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<MetalDetectorCheckListF020> findByMonthYearPrintApi(@Param("month") String month, @Param("year") String year);

	@Query(value = "SELECT * FROM precot.SPUNLACE_METAL_DETECTOR_CHECK_LIST_F020 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY LIST_ID DESC", nativeQuery = true)
    List<MetalDetectorCheckListF020> supervisorSummary();

	@Query(value = "SELECT * FROM precot.SPUNLACE_METAL_DETECTOR_CHECK_LIST_F020 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY LIST_ID DESC", nativeQuery = true)
    List<MetalDetectorCheckListF020> hodSummary();
	
}
