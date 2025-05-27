package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.bleaching.BleachMachineCleaningRecordF16;

public interface BleachMachineCleaningRecordF16Repository extends JpaRepository<BleachMachineCleaningRecordF16, Long>{

	@Query(value = "SELECT * FROM precot.BLEACH_MACHINE_CLEANING_RECORD_F16 WHERE RECORD_ID = :recordId ", nativeQuery = true)
	BleachMachineCleaningRecordF16 findFormById(@Param("recordId") long recordId);
	
	@Query(value = "SELECT * FROM precot.BLEACH_MACHINE_CLEANING_RECORD_F16 WHERE DATE = :date", nativeQuery = true)
	BleachMachineCleaningRecordF16 findByDate(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.BLEACH_MACHINE_CLEANING_RECORD_F16 WHERE MONTH = :month AND YEAR = :year AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<BleachMachineCleaningRecordF16> findByMonthYearPrintApi(@Param("month") String month, @Param("year") String year);

	@Query(value = "SELECT * FROM precot.BLEACH_MACHINE_CLEANING_RECORD_F16 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY RECORD_ID DESC", nativeQuery = true)
    List<BleachMachineCleaningRecordF16> supervisorSummary();

	@Query(value = "SELECT * FROM precot.BLEACH_MACHINE_CLEANING_RECORD_F16 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY RECORD_ID DESC", nativeQuery = true)
    List<BleachMachineCleaningRecordF16> hodSummary();
}
