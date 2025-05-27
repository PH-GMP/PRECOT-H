package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BMR_ManufacturingSteps;

@Repository
public interface BMR_ManufacturingStepsRepository extends JpaRepository<BMR_ManufacturingSteps, Long>{

	@Query(value="SELECT * FROM precot.BMR_MANUFACTURING_STEPS WHERE BMR_NO=:bmr_no", nativeQuery = true)
	List<BMR_ManufacturingSteps> manufactureStepsBMR(@Param("bmr_no") String bmr_no);
	
	@Query(value = "SELECT * FROM precot.BMR_MANUFACTURING_STEPS WHERE MANUFACTURING_ID=:manufacturingId", nativeQuery = true)
	BMR_ManufacturingSteps getRecordDetails(@Param("manufacturingId") Long manufacturingId);

}
