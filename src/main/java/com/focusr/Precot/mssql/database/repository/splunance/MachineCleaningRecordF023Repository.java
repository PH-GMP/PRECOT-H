package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.MachineCleaningRecordF023;

public interface MachineCleaningRecordF023Repository extends JpaRepository<MachineCleaningRecordF023,Long>{

	@Query(value = "SELECT * FROM precot.SPUNLACE_MACHINE_CLEANING_RECORD_F023 WHERE RECORD_ID = :recordId ", nativeQuery = true)
	MachineCleaningRecordF023 findFormById(@Param("recordId") long recordId);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_MACHINE_CLEANING_RECORD_F023 WHERE DATE = :date", nativeQuery = true)
	MachineCleaningRecordF023 findByDate(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.SPUNLACE_MACHINE_CLEANING_RECORD_F023 WHERE MONTH = :month AND YEAR = :year AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<MachineCleaningRecordF023> findByMonthYearPrintApi(@Param("month") String month, @Param("year") String year);

	@Query(value = "SELECT * FROM precot.SPUNLACE_MACHINE_CLEANING_RECORD_F023 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY RECORD_ID DESC", nativeQuery = true)
    List<MachineCleaningRecordF023> supervisorSummary();

	@Query(value = "SELECT * FROM precot.SPUNLACE_MACHINE_CLEANING_RECORD_F023 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY RECORD_ID DESC", nativeQuery = true)
    List<MachineCleaningRecordF023> hodSummary();
}
