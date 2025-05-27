package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.BMR09RP11ProcessDlyEqupBrkDwnRecord;

public interface BMR09RP11ProcessDlyEqupBrkDwnRecordRepository  extends JpaRepository<BMR09RP11ProcessDlyEqupBrkDwnRecord, Long>{
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_09_RP_11_EQUP_BREAK_DOWN_RECORD WHERE BATCH_NO=:order_no AND FORM_NO ='PRD02/F-26'", nativeQuery = true)
	List<BMR09RP11ProcessDlyEqupBrkDwnRecord> getSummaryByOrderNo09(@Param("order_no") String order_no);

	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_09_RP_11_EQUP_BREAK_DOWN_RECORD WHERE BATCH_NO=:order_no AND FORM_NO ='PRD02/F-27'", nativeQuery = true)
	List<BMR09RP11ProcessDlyEqupBrkDwnRecord> getSummaryByOrderNoRpb11(@Param("order_no") String order_no);
	

}
