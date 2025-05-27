package com.focusr.Precot.Buds.repository.bmr;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.model.bmr.BudsBmrManufacturerStepsHeader;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrManufacturingSteps;

@Repository
public interface BudsBmrManufacturerStepsHeaderRepository extends JpaRepository<BudsBmrManufacturerStepsHeader, Long>{

	@Query(value = "SELECT * FROM precot.BUDS_BMR_MANUFACTURER_STEPS_HEADER WHERE BATCH_NO=:batchNo", nativeQuery = true)
	List<BudsBmrManufacturerStepsHeader> manufacturingStepsByBatchNo(@Param("batchNo") String batchNo);
	
}
