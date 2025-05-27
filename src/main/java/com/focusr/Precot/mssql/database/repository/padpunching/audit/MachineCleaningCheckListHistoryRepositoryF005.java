package com.focusr.Precot.mssql.database.repository.padpunching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.padpunching.audit.MachineCleaningCheckListHistoryF005;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PadPunchingLogBookBagMakingHistoryF003;

public interface MachineCleaningCheckListHistoryRepositoryF005 extends JpaRepository<MachineCleaningCheckListHistoryF005, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.PADPUNCHING_MACHINE_CLEANING_CHECK_LIST_HISTORY_F005 WHERE DATE =:date AND MACHINE_NAME = :machineName", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("machineName") String machineName);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_MACHINE_CLEANING_CHECK_LIST_HISTORY_F005 WHERE DATE =:date AND MACHINE_NAME = :machineName AND VERSION IN (SELECT MAX(VERSION) FROM precot.PADPUNCHING_MACHINE_CLEANING_CHECK_LIST_HISTORY_F005 WHERE DATE =:date AND MACHINE_NAME = :machineName)", nativeQuery = true)
	MachineCleaningCheckListHistoryF005 fetchLastSubmittedRecord(@Param("date") String date,@Param("machineName") String machineName);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_MACHINE_CLEANING_CHECK_LIST_HISTORY_F005 WHERE DATE =:date AND MACHINE_NAME = :machineName", nativeQuery = true)
	List<MachineCleaningCheckListHistoryF005> fetchHistory(@Param("date") String date,@Param("machineName") String machineName);
	
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_MACHINE_CLEANING_CHECK_LIST_HISTORY_F005 WHERE "
	        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
	        + "AND (:f05_machine_name IS NULL OR MACHINE_NAME = :f05_machine_name)", nativeQuery = true)
	List<MachineCleaningCheckListHistoryF005> findByParams005(@Param("from_date") String from_date,
	        @Param("to_date") String to_date, @Param("f05_machine_name") String f05_machine_name);
	
	
}
