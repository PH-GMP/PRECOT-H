package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.BMR10ProcessDeviationRecord;

public interface BMR10ProcessDeviationRecordRepository extends JpaRepository<BMR10ProcessDeviationRecord, Long>{
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_10_DEVIATION_RECORD WHERE BATCH_NO=:order_no AND FORM_NO ='PRD02/F-26'", nativeQuery = true)
	List<BMR10ProcessDeviationRecord> getSummaryByOrderNo10(@Param("order_no") String order_no);


}
