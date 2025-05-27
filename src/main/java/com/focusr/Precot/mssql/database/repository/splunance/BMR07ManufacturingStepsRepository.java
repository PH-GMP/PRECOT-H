package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.BMR07ManufacturingSteps;

public interface BMR07ManufacturingStepsRepository extends JpaRepository<BMR07ManufacturingSteps, Long> {
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_07_MANUFACTURING_STEPS WHERE BATCH_NO=:order_no AND FORM_NO ='PRD02/F-26'", nativeQuery = true)
	List<BMR07ManufacturingSteps> getSummaryByOrderNo07(@Param("order_no") String order_no);
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_07_MANUFACTURING_STEPS WHERE ID=:id AND FORM_NO ='PRD02/F-26'", nativeQuery = true)
	BMR07ManufacturingSteps getSummaryById07(@Param("id") Long id);

}
