package com.focusr.Precot.mssql.database.repository.padpunching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.padpunching.MachineCleaningCheckListF005;

public interface MachineCleaningCheckListRepositoryF005 extends JpaRepository<MachineCleaningCheckListF005, Long>{

	@Query(value = "SELECT * FROM precot.PADPUNCHING_MACHINE_CLEANING_CHECK_LIST_F005 WHERE LIST_ID = :listId ", nativeQuery = true)
	MachineCleaningCheckListF005 findFormById(@Param("listId") long listId);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_MACHINE_CLEANING_CHECK_LIST_F005 WHERE DATE = :date AND MACHINE_NAME = :machineName", nativeQuery = true)
	MachineCleaningCheckListF005 findByDate(@Param("date") String date,@Param("machineName") String machineName);

	@Query(value = "SELECT * FROM precot.PADPUNCHING_MACHINE_CLEANING_CHECK_LIST_F005 WHERE (:month IS NULL OR :month='' OR MONTH=:month) AND (:year IS NULL OR :year='' OR YEAR=:year) AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<MachineCleaningCheckListF005> findByMonthPrintApi(@Param("month") String month,@Param("year") String year);

	@Query(value = "SELECT * FROM precot.PADPUNCHING_MACHINE_CLEANING_CHECK_LIST_F005 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY LIST_ID DESC", nativeQuery = true)
    List<MachineCleaningCheckListF005> supervisorSummary();

	@Query(value = "SELECT * FROM precot.PADPUNCHING_MACHINE_CLEANING_CHECK_LIST_F005 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY LIST_ID DESC", nativeQuery = true)
    List<MachineCleaningCheckListF005> hodSummary();
}
