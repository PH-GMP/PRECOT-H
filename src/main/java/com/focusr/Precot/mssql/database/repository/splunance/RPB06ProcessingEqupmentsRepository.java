package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.BMR06RP07VerificationOfRecords;
import com.focusr.Precot.mssql.database.model.splunance.RPB06ProcessingEqupments;

public interface RPB06ProcessingEqupmentsRepository  extends JpaRepository<RPB06ProcessingEqupments, Long>{
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_RPB_06_PROCESSING_EQUP WHERE BATCH_NO=:order_no AND FORM_NO ='PRD02/F-27'", nativeQuery = true)
	List<RPB06ProcessingEqupments> getSummaryByOrderNo06(@Param("order_no") String order_no);

}
