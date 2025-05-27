package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.splunance.RPB10ProcessDevRecord;
@Repository
public interface RPB10ProcessDevRecordRepository  extends JpaRepository<RPB10ProcessDevRecord, Long>{
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_RPB_10_PROCESS_DEV_RECORD WHERE BATCH_NO=:order_no AND FORM_NO ='PRD02/F-27'", nativeQuery = true)
	List<RPB10ProcessDevRecord> getSummaryByOrderNo10(@Param("order_no") String order_no);


}
