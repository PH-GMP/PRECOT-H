package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.RPB04PackingMeterialDetails;

public interface RPB04PackingMeterialDetailsRepository extends JpaRepository<RPB04PackingMeterialDetails, Long> {
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_RPB_04_PACKING_METERIAL_DETAILS WHERE BATCH_NO=:batch_no AND FORM_NO ='PRD02/F-27'", nativeQuery = true)
	List<RPB04PackingMeterialDetails> getSummaryByOrderNo04(@Param("batch_no") String batch_no);

}
