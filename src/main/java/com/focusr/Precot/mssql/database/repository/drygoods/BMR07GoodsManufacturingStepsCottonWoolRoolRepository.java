package com.focusr.Precot.mssql.database.repository.drygoods;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.drygoods.BMR07ManufacturingStepsCottonWoolRoll;

public interface BMR07GoodsManufacturingStepsCottonWoolRoolRepository
		extends JpaRepository<BMR07ManufacturingStepsCottonWoolRoll, Long> {
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_COTTON_WOLL_ROLL_BMR_07_MANUFACTURING_STEPS WHERE ID=:id AND FORM_NO ='PH-PRD04/F-008'", nativeQuery = true)
	BMR07ManufacturingStepsCottonWoolRoll getmanufacturingStepsById08(@Param("id") Long id);
	
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_COTTON_WOLL_ROLL_BMR_07_MANUFACTURING_STEPS WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-008'", nativeQuery = true)
	List<BMR07ManufacturingStepsCottonWoolRoll> getDetails(@Param("batch_no") String batch_no);

	
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_COTTON_WOLL_ROLL_BMR_07_MANUFACTURING_STEPS WHERE ID=:id AND FORM_NO ='PH-PRD04/F-007'", nativeQuery = true)
	BMR07ManufacturingStepsCottonWoolRoll getmanufacturingStepsById07cp(@Param("id") Long id);
	
	
	//Vijay
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_COTTON_WOLL_ROLL_BMR_07_MANUFACTURING_STEPS WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-008'", nativeQuery = true)
	List<BMR07ManufacturingStepsCottonWoolRoll> getManufacturingStepsWool(@Param("batch_no") String batch_no);
	
	
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_COTTON_WOLL_ROLL_BMR_07_MANUFACTURING_STEPS WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-007'", nativeQuery = true)
	List<BMR07ManufacturingStepsCottonWoolRoll> getManufacturingStepspleat(@Param("batch_no") String batch_no);
}
