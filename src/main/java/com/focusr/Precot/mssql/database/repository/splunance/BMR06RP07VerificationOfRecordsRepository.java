package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.BMR06RP07VerificationOfRecords;

public interface BMR06RP07VerificationOfRecordsRepository  extends JpaRepository<BMR06RP07VerificationOfRecords, Long>{
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_06_RP_07_VERIFICATION_OF_RECORDS WHERE BATCH_NO=:order_no AND FORM_NO ='PRD02/F-26'", nativeQuery = true)
	List<BMR06RP07VerificationOfRecords> getSummaryByOrderNo06(@Param("order_no") String order_no);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_06_RP_07_VERIFICATION_OF_RECORDS WHERE BATCH_NO=:order_no AND FORM_NO ='PRD02/F-27'", nativeQuery = true)
	List<BMR06RP07VerificationOfRecords> getSummaryByOrderNoRPB07(@Param("order_no") String order_no);
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_06_RP_07_VERIFICATION_OF_RECORDS WHERE VERIFICATION_ID=:verification_id AND FORM_NO ='PRD02/F-26'", nativeQuery = true)
	BMR06RP07VerificationOfRecords getSummaryByVerification_id06(@Param("verification_id") Long verification_id);
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_06_RP_07_VERIFICATION_OF_RECORDS WHERE VERIFICATION_ID=:verification_id AND FORM_NO ='PRD02/F-27'", nativeQuery = true)
	BMR06RP07VerificationOfRecords getSummaryByRpVerification_id06(@Param("verification_id") Long verification_id);
	

}
