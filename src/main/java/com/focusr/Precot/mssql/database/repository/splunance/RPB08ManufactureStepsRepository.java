package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.RPB08ManufactureSteps;

public interface RPB08ManufactureStepsRepository extends JpaRepository<RPB08ManufactureSteps, Long> {
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_RPB_08_MANUFACTURE_STEPS WHERE BATCH_NO=:order_no AND FORM_NO ='PRD02/F-27'", nativeQuery = true)
	List<RPB08ManufactureSteps> getSummaryByOrderNo08(@Param("order_no") String order_no);
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_RPB_08_MANUFACTURE_STEPS WHERE MFS_ID=:mfs_id AND FORM_NO ='PRD02/F-27'", nativeQuery = true)
	RPB08ManufactureSteps getSummaryByid08(@Param("mfs_id") Long mfs_id);

}
