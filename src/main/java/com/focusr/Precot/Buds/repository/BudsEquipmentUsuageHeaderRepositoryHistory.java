package com.focusr.Precot.Buds.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.model.audit.BudsEquipmentUsuageHeaderHistory;
import com.focusr.Precot.Buds.model.audit.BudsLogbookHeaderHistory;

@Repository
public interface BudsEquipmentUsuageHeaderRepositoryHistory extends JpaRepository<BudsEquipmentUsuageHeaderHistory, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.BUDS_EQUIPMENT_USUAGE_HEADER_HISTORY WHERE EQUIPMENT_DATE=:equipmentDate AND EQUIPMENT_SHIFT=:equipmentShift AND SALE_ORDER_NO=:bmrNumber", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("equipmentDate") String equipmentDate, @Param("equipmentShift") String equipmentShift, @Param("bmrNumber") String bmrNumber);
	
	@Query(value = "SELECT * FROM precot.BUDS_EQUIPMENT_USUAGE_HEADER_HISTORY WHERE EQUIPMENT_DATE=:equipmentDate AND EQUIPMENT_SHIFT=:equipmentShift AND SALE_ORDER_NO=:bmrNumber  AND VERSION IN (SELECT MAX(VERSION) FROM precot.BUDS_EQUIPMENT_USUAGE_HEADER_HISTORY WHERE EQUIPMENT_DATE=:equipmentDate AND EQUIPMENT_SHIFT=:equipmentShift AND SALE_ORDER_NO=:bmrNumber)", nativeQuery = true)
	BudsEquipmentUsuageHeaderHistory fetchLastSubmittedRecord(@Param("equipmentDate") String equipmentDate, @Param("equipmentShift") String equipmentShift, @Param("bmrNumber") String bmrNumber);
	
		// EXCEL
	
	@Query(value = "SELECT * FROM precot.BUDS_EQUIPMENT_USUAGE_HEADER_HISTORY WHERE "
			+ " (:fromdate IS NULL OR :fromdate = '' OR :todate IS NULL OR :todate = '' OR EQUIPMENT_DATE BETWEEN :fromdate AND :todate)"
			+ " AND (:equipmentShift IS NULL OR :equipmentShift = '' OR EQUIPMENT_SHIFT=:equipmentShift)"
			+ " AND (:bmrNumber IS NULL OR :bmrNumber = '' OR  SALE_ORDER_NO=:bmrNumber)", nativeQuery = true)
	List<BudsEquipmentUsuageHeaderHistory> generateExcel(@Param("equipmentShift") String equipmentShift, @Param("bmrNumber") String bmrNumber,
			@Param("fromdate") String fromdate, @Param("todate") String todate);
	
}
