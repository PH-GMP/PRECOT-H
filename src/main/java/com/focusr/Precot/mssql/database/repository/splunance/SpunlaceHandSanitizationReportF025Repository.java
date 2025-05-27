package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.SpunlaceHandSanitizationReportF025;

public interface SpunlaceHandSanitizationReportF025Repository extends JpaRepository<SpunlaceHandSanitizationReportF025,Long>{

	@Query(value = "SELECT * FROM precot.SPUNLACE_HAND_SANITIZATION_REPORT_F025 WHERE HAND_SANITIZATION_ID = :handSanitizationId ", nativeQuery = true)
	SpunlaceHandSanitizationReportF025 findFormById(@Param("handSanitizationId") long handSanitizationId);

	@Query(value = "SELECT * FROM precot.SPUNLACE_HAND_SANITIZATION_REPORT_F025 WHERE DATE = :date AND SHIFT = :shift", nativeQuery = true)
	SpunlaceHandSanitizationReportF025 findByDateShift(@Param("date") String date,@Param("shift") String shift);

	@Query(value = "SELECT * FROM precot.SPUNLACE_HAND_SANITIZATION_REPORT_F025 WHERE DATE = :date AND SHIFT = :shift AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	SpunlaceHandSanitizationReportF025 findByDateShiftPrintApi(@Param("date") String date,@Param("shift") String shift);

	@Query(value = "SELECT * FROM precot.SPUNLACE_HAND_SANITIZATION_REPORT_F025 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY HAND_SANITIZATION_ID DESC", nativeQuery = true)
    List<SpunlaceHandSanitizationReportF025> supervisorSummary();

	@Query(value = "SELECT * FROM precot.SPUNLACE_HAND_SANITIZATION_REPORT_F025 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY HAND_SANITIZATION_ID DESC", nativeQuery = true)
    List<SpunlaceHandSanitizationReportF025> hodSummary();
	
	
	// DISTINCT EMP_ID / ID NUMBER
	
	@Query(value = "SELECT DISTINCT ID_NUMBER FROM precot.SPUNLACE_HAND_SANITIZATION_LIST_F025", nativeQuery = true)
	List<String> getSpulanceIdNumbers();
	
}
