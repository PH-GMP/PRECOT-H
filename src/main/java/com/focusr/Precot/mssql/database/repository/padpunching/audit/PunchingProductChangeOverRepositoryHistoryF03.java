package com.focusr.Precot.mssql.database.repository.padpunching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.audit.DailyRollConsumptionReportHistoryF002;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PunchingProductChangeOverHistoryF03;


@Repository
public interface PunchingProductChangeOverRepositoryHistoryF03 extends JpaRepository<PunchingProductChangeOverHistoryF03, Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.PUNCHING_PROD_CHANGE_OVER_HISTORY_F03 WHERE DATE=:date AND SHIFT=:shift AND MACHINE_NAME=:machine", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date, @Param("shift") String shift, @Param("machine") String machine);
	
	
	@Query(value = "SELECT * FROM precot.PUNCHING_PROD_CHANGE_OVER_HISTORY_F03 WHERE DATE =:date AND SHIFT=:shift AND MACHINE_NAME=:machine AND VERSION IN (SELECT MAX(VERSION) FROM precot.PUNCHING_PROD_CHANGE_OVER_HISTORY_F03 WHERE DATE =:date AND SHIFT=:shift AND MACHINE_NAME=:machine)", nativeQuery = true)
	PunchingProductChangeOverHistoryF03 findLastSubmittedRecord(@Param("date") String date,@Param("shift") String shift,@Param("machine") String machine);
	
	@Query(value = "SELECT * FROM precot.PUNCHING_PROD_CHANGE_OVER_HISTORY_F03 WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
			+ "AND (:f03_shift IS NULL OR SHIFT = :f03_shift) "
			+ "AND (:f03_machine_name IS NULL OR MACHINE_NAME = :f03_machine_name)", nativeQuery = true)
	List<PunchingProductChangeOverHistoryF03> findByParams003(@Param("from_date") String from_date,
			@Param("to_date") String to_date,@Param("f03_shift") String f03_shift,@Param("f03_machine_name") String f03_machine_name);

}
