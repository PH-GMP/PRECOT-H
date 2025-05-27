package com.focusr.Precot.mssql.database.repository.drygoods;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.drygoods.BMR07GoodsManufacturingStepsCottonBalls;

public interface BMR07GoodsManufacturingStepsCottonBallRepository  extends JpaRepository<BMR07GoodsManufacturingStepsCottonBalls, Long>{
	
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_07_MANUFACTURING_STEPS WHERE ID=:id AND FORM_NO ='PH-PRD04/F-004'", nativeQuery = true)
	BMR07GoodsManufacturingStepsCottonBalls getSummaryByRpVerification_id06(@Param("id") Long id);
	
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_07_MANUFACTURING_STEPS WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-004'", nativeQuery = true)
	List<BMR07GoodsManufacturingStepsCottonBalls> getDetails(@Param("batch_no") String batch_no);
	
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_07_MANUFACTURING_STEPS WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-007'", nativeQuery = true)
	List<BMR07GoodsManufacturingStepsCottonBalls> getDetailscp(@Param("batch_no") String batch_no);
	
	

}
