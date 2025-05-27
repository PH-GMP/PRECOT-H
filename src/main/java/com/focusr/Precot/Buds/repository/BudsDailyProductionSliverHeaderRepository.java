package com.focusr.Precot.Buds.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.model.BudsDailyProductionSliverHeader;

@Repository
public interface BudsDailyProductionSliverHeaderRepository extends JpaRepository<BudsDailyProductionSliverHeader, Long>{

	
	@Query(value = "SELECT * FROM precot.BUDS_DAILY_PRODUCTION_SLIVER_HEAD WHERE ID=:id", nativeQuery = true)
	BudsDailyProductionSliverHeader productionDetailsbyId(@Param("id") Long id);
	
	@Query(value = "SELECT * FROM precot.BUDS_DAILY_PRODUCTION_SLIVER_HEAD WHERE MACHINE_NAME=:machineName AND MACHINE_DATE=:date AND SHIFT=:shift", nativeQuery = true)
	List<BudsDailyProductionSliverHeader> productionDetailsByMachine(@Param("machineName") String machineName, @Param("date") String date, @Param("shift") String shift);
		// SUMMARY 
	
	@Query(value = "SELECT * FROM precot.BUDS_DAILY_PRODUCTION_SLIVER_HEAD WHERE OPERATOR_STATUS = 'OPERATOR_SAVED' OR HOD_STATUS!='HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<BudsDailyProductionSliverHeader> productionDetailsByOperator();
	
	@Query(value = "SELECT * FROM precot.BUDS_DAILY_PRODUCTION_SLIVER_HEAD WHERE HOD_STATUS!='HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<BudsDailyProductionSliverHeader> productionDetailsBySupervisorHod();
	
		// PRINT 
	
		@Query(value = "SELECT * FROM precot.BUDS_DAILY_PRODUCTION_SLIVER_HEAD "
				+ "WHERE (:date IS NULL OR :date = '' OR MACHINE_DATE = :date) "
				+ "AND (:shift IS NULL OR :shift = '' OR SHIFT = :shift) "
				+ "AND (:machineName IS NULL OR :machineName = '' OR MACHINE_NAME=:machineName) "
				+ "AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
		List<BudsDailyProductionSliverHeader> printDailyProductionSliverHeader(
				@Param("machineName") String machineName, @Param("date") String date, @Param("shift") String shift);
		
		
		
			// TRACEABILITY 
		
		
		@Query(value = "SELECT * FROM precot.BUDS_DAILY_PRODUCTION_SLIVER_HEAD WHERE ORDER_NUMBER=:orderNumber AND MACHINE_DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
		List<BudsDailyProductionSliverHeader> fetchDailyProductionByOrderDate(@Param("orderNumber") String orderNumber, @Param("fromDate") String fromDate, @Param("toDate") String toDate);

		// PRODUCTION LINE 
		
				@Query(value = "SELECT l.CAN_NO, l.NET_WT, h.DATE, h.ORDER_NO, h.LAYDOWN_NO, h.STD_WT "
			             + "FROM precot.DRYGOODS_SLIVER_MAKING_LINE_02 l "
			             + "JOIN precot.DRYGOODS_SLIVER_MAKING h ON l.SLIVER_ID = h.SLIVER_ID "
			             + "WHERE l.CAN_NO IN :canNumbers AND l.CARDING_MC_NO IN :machineNames", 
			       nativeQuery = true)
			List<Object[]> fetchSliverLinesWithHeaderData(
			    @Param("canNumbers") List<String> canNumbers,
			    @Param("machineNames") List<String> machineNames);

}
