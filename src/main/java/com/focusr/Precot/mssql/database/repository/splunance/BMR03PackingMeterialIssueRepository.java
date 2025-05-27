package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.BMR03PackingMeterialIssue;

public interface BMR03PackingMeterialIssueRepository  extends JpaRepository<BMR03PackingMeterialIssue, Long> {
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_03_PACKING_METERIAL_ISSUE WHERE BATCH_NO=:order_no AND FORM_NO ='PRD02/F-26'", nativeQuery = true)
	List<BMR03PackingMeterialIssue> getSummaryByOrderNo03(@Param("order_no") String order_no);

}


