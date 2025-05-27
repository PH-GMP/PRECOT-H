package com.focusr.Precot.Buds.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.model.audit.BudsDailyProductionSliverHeaderHistory;

@Repository
public interface BudsDailyProductionSliverHeaderHistoryRepository extends JpaRepository<BudsDailyProductionSliverHeaderHistory, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.BUDS_DAILY_PRODUCTION_SLIVER_HEAD_HISTORY WHERE MACHINE_NAME=:machineName AND MACHINE_DATE=:date AND SHIFT=:shift", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("machineName") String machineName, @Param("date") String date, @Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.BUDS_DAILY_PRODUCTION_SLIVER_HEAD_HISTORY WHERE MACHINE_NAME=:machineName AND MACHINE_DATE=:date AND SHIFT=:shift AND VERSION IN (SELECT MAX(VERSION) FROM precot.BUDS_DAILY_PRODUCTION_SLIVER_HEAD_HISTORY WHERE MACHINE_NAME=:machineName AND MACHINE_DATE=:date AND SHIFT=:shift)", nativeQuery = true)
	BudsDailyProductionSliverHeaderHistory findLastSubmittedRecord(@Param("machineName") String machineName, @Param("date") String date, @Param("shift") String shift);
	
		// EXCEL
	
	@Query(value = "SELECT * FROM precot.BUDS_DAILY_PRODUCTION_SLIVER_HEAD_HISTORY WHERE "
			+ " (:fromdate IS NULL OR :fromdate = '' OR :todate IS NULL OR :todate = '' OR MACHINE_DATE BETWEEN :fromdate AND :todate)"
			+ " AND (:machineName IS NULL OR :machineName = '' OR MACHINE_NAME=:machineName)"
			+ "AND (:shift IS NULL OR :shift='' OR SHIFT=:shift)", nativeQuery = true)
	List<BudsDailyProductionSliverHeaderHistory> generateExcel(@Param("fromdate") String fromdate, @Param("todate") String todate, @Param("machineName") String machineName, @Param("shift") String shift);
	
}
