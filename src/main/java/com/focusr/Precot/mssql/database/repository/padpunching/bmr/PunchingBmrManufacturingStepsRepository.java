package com.focusr.Precot.mssql.database.repository.padpunching.bmr;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrManufacturingSteps;

@Repository
public interface PunchingBmrManufacturingStepsRepository extends JpaRepository<PunchingBmrManufacturingSteps, Long>{

	@Query(value = "SELECT * FROM precot.PADPUNCHING_BMR_MANUFACTURING_STEPS WHERE MANUFACTURE_ID=:id", nativeQuery = true)
	PunchingBmrManufacturingSteps getManufacturingStepsById(@Param("id") Long id);
	
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_BMR_MANUFACTURING_STEPS WHERE ORDER_NO=:orderNo", nativeQuery = true)
	List<PunchingBmrManufacturingSteps> manufacturingStepsByOrder(@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_BMR_MANUFACTURING_STEPS WHERE BATCH_NO=:batchNo", nativeQuery = true)
	List<PunchingBmrManufacturingSteps> manufacturingStepsByBatchNo(@Param("batchNo") String batchNo);
	
}
