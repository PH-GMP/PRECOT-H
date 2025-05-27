package com.focusr.Precot.mssql.database.repository.padpunching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingBagMakingDailyProductionDetailsF001;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingHouseKeepingCheckListF010;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingSanitizationOfMachinesAndSurfacesF21;

@Repository
public interface PadPunchingSanitizationOfaMachinesAndSurfacesRepositoryF21 extends JpaRepository<PadPunchingSanitizationOfMachinesAndSurfacesF21,Long>{

	@Query(value = "SELECT * FROM precot.PADPUNCHING_SANITIZATION_OF_MACHINES_AND_SURFACES_F21 WHERE SANITIZATION_ID = :sanitizationId ", nativeQuery = true)
	PadPunchingSanitizationOfMachinesAndSurfacesF21 findFormById(@Param("sanitizationId") long sanitizationId);

	@Query(value = "SELECT * FROM precot.PADPUNCHING_SANITIZATION_OF_MACHINES_AND_SURFACES_F21 WHERE MACHINE_NAME = :machineName AND WEEK_NO = :weekNo AND MONTH = :month AND YEAR = :year", nativeQuery = true)
	PadPunchingSanitizationOfMachinesAndSurfacesF21 findByDateShift(@Param("machineName") String machineName,@Param("weekNo") String weekNo,@Param("month") String month,@Param("year") String year);

//	@Query(value = "SELECT * \r\n"
//			+ "FROM precot.PADPUNCHING_SANITIZATION_OF_MACHINES_AND_SURFACES_F21 \r\n"
//			+ "WHERE (MONTH IS NULL OR MONTH = :month)\r\n"
//			+ "  AND (YEAR IS NULL OR YEAR = :year)\r\n"
//			+ "  AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
//	List<PadPunchingSanitizationOfMachinesAndSurfacesF21> findByDateShiftPrintApi(@Param("month") String month,@Param("year") String year);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_SANITIZATION_OF_MACHINES_AND_SURFACES_F21 WHERE (:month IS NULL OR :month='' OR MONTH=:month) AND (:year IS NULL OR :year='' OR YEAR=:year) AND (HOD_STATUS = 'HOD_APPROVED')", nativeQuery = true)
	List<PadPunchingSanitizationOfMachinesAndSurfacesF21> findByDateShiftPrintApi(@Param("month") String month,@Param("year") String year);

	@Query(value = "SELECT * FROM precot.PADPUNCHING_SANITIZATION_OF_MACHINES_AND_SURFACES_F21 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY SANITIZATION_ID DESC", nativeQuery = true)
    List<PadPunchingSanitizationOfMachinesAndSurfacesF21> supervisorSummary();

	@Query(value = "SELECT * FROM precot.PADPUNCHING_SANITIZATION_OF_MACHINES_AND_SURFACES_F21 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY SANITIZATION_ID DESC", nativeQuery = true)
    List<PadPunchingSanitizationOfMachinesAndSurfacesF21> hodSummary();
	
	
		// CR 
	
	@Query(value = "SELECT DISTINCT NAME_OF_CHEMICAL FROM precot.PADPUNCHING_SANITIZATION_OF_MACHINES_AND_SURFACES_F21", nativeQuery = true)
	List<String> fetchChemicalNames();
	
	@Query(value = "SELECT DISTINCT CHEMICAL_BATCH_NUMBER FROM precot.PADPUNCHING_SANITIZATION_OF_MACHINES_AND_SURFACES_F21", nativeQuery = true)
	List<String> fetchChemicalBatchNumber();
	
}
