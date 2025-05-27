package com.focusr.Precot.Buds.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.model.BudsEquipmentUsuageHeader;
import com.focusr.Precot.Buds.model.BudsLogbookHeader;

@Repository
public interface BudsEquipmentUsuageHeaderRepository extends JpaRepository<BudsEquipmentUsuageHeader, Long>{

	@Query(value = "SELECT * FROM precot.BUDS_EQUIPMENT_USUAGE_HEADER WHERE EQUIPMENT_ID=:id", nativeQuery = true)
	BudsEquipmentUsuageHeader equipmentDetailsById(@Param("id") Long id);
	
		// SUMMARY
	
	@Query(value = "SELECT * FROM precot.BUDS_EQUIPMENT_USUAGE_HEADER WHERE OPERATOR_STATUS='OPERATOR_SAVED' OR HOD_STATUS!='HOD_APPROVED' ORDER BY EQUIPMENT_ID DESC", nativeQuery = true)
	List<BudsEquipmentUsuageHeader> equipmentDetailsForOperator();
	
	@Query(value = "SELECT * FROM precot.BUDS_EQUIPMENT_USUAGE_HEADER WHERE OPERATOR_STATUS='OPERATOR_APPROVED' AND HOD_STATUS!='HOD_APPROVED' ORDER BY EQUIPMENT_ID DESC", nativeQuery = true)
	List<BudsEquipmentUsuageHeader> equipmentDetailsForSupervisor();
	
	
		// GET BY UNIQUE 
	
	@Query(value = "SELECT * FROM precot.BUDS_EQUIPMENT_USUAGE_HEADER WHERE EQUIPMENT_DATE=:date AND EQUIPMENT_SHIFT=:shift AND SALE_ORDER_NO=:bmrNumber", nativeQuery = true)
	List<BudsEquipmentUsuageHeader> equipmentUsuageDetailsByUnique(@Param("date") String date, @Param("shift") String shift, @Param("bmrNumber") String bmrNumber);
	
	
		// GET PRINT 
	
	@Query(value = "SELECT * FROM precot.BUDS_EQUIPMENT_USUAGE_HEADER "
	        + "WHERE (:date IS NULL OR :date = '' OR EQUIPMENT_DATE = :date) "
	        + "AND (:shift IS NULL OR :shift = '' OR EQUIPMENT_SHIFT = :shift) "
	        + "AND (:year IS NULL OR YEAR(EQUIPMENT_DATE) = :year) "
	        + "AND (:month IS NULL OR MONTH(EQUIPMENT_DATE) = :month) "
	        + "AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<BudsEquipmentUsuageHeader> printEquipmentUsuageDetails(
	        @Param("date") String date, 
	        @Param("shift") String shift,
	        @Param("year") Integer year, 
	        @Param("month") Integer month);
	
//	@Query(value = "SELECT * FROM precot.BUDS_EQUIPMENT_USUAGE_HEADER "
//	        + "WHERE (:date IS NULL OR :date = '' OR CAST(EQUIPMENT_DATE AS DATE) = CAST(:date AS DATE)) "
//	        + "AND (:shift IS NULL OR :shift = '' OR EQUIPMENT_SHIFT = :shift) "
//	        + "AND (:year IS NULL OR YEAR(EQUIPMENT_DATE) = :year) "
//	        + "AND (:month IS NULL OR MONTH(EQUIPMENT_DATE) = :month) "
//	        + "AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
//	List<BudsEquipmentUsuageHeader> printEquipmentUsuageDetails(
//	        @Param("date") String date, 
//	        @Param("shift") String shift,
//	        @Param("year") Integer year, 
//	        @Param("month") Integer month);


	
	
}
