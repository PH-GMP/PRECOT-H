package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.SanitizationOfMachineAndSurfacesF024;

public interface SanitizationOfMachineAndSurfacesF024Repository extends JpaRepository<SanitizationOfMachineAndSurfacesF024,Long>{

	@Query(value = "SELECT * FROM precot.SPUNLACE_SANITIZATION_OF_MACHINES_AND_SURFACES_F024 WHERE SMS_ID = :smsId ", nativeQuery = true)
	SanitizationOfMachineAndSurfacesF024 findFormById(@Param("smsId") long smsId);

	@Query(value = "SELECT * FROM precot.SPUNLACE_SANITIZATION_OF_MACHINES_AND_SURFACES_F024 WHERE MONTH = :month AND YEAR = :year AND WEEK = :week ", nativeQuery = true)
	SanitizationOfMachineAndSurfacesF024 findByMonthYearWeek(@Param("month") String month,@Param("year") String year,@Param("week") String week);

	@Query(value = "SELECT * FROM precot.SPUNLACE_SANITIZATION_OF_MACHINES_AND_SURFACES_F024 WHERE MONTH = :month AND YEAR = :year AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<SanitizationOfMachineAndSurfacesF024> findByMonthYearPrintApi(@Param("month") String month, @Param("year") String year);

	@Query(value = "SELECT * FROM precot.SPUNLACE_SANITIZATION_OF_MACHINES_AND_SURFACES_F024 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY SMS_ID DESC", nativeQuery = true)
    List<SanitizationOfMachineAndSurfacesF024> supervisorSummary();

	@Query(value = "SELECT * FROM precot.SPUNLACE_SANITIZATION_OF_MACHINES_AND_SURFACES_F024 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY SMS_ID DESC", nativeQuery = true)
    List<SanitizationOfMachineAndSurfacesF024> hodSummary();
	
}
