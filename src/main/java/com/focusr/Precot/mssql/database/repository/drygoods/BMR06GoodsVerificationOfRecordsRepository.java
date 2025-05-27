package com.focusr.Precot.mssql.database.repository.drygoods;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.drygoods.BMR06GoodsVerificationOfRecords;

public interface BMR06GoodsVerificationOfRecordsRepository  extends JpaRepository<BMR06GoodsVerificationOfRecords, Long>{
	
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR__06_VERIFICATION_OF_RECORDS WHERE VERIFICATION_ID=:verification_id AND FORM_NO ='PH-PRD04/F-004'", nativeQuery = true)
	BMR06GoodsVerificationOfRecords getSummaryByVerification_id06(@Param("verification_id") Long verification_id);
	
	
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR__06_VERIFICATION_OF_RECORDS WHERE VERIFICATION_ID=:verification_id AND FORM_NO ='PH-PRD04/F-007'", nativeQuery = true)
	BMR06GoodsVerificationOfRecords getSummaryByVerification_id07(@Param("verification_id") Long verification_id);
	
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR__06_VERIFICATION_OF_RECORDS WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-004'", nativeQuery = true)
	List<BMR06GoodsVerificationOfRecords> getDetails(@Param("batch_no") String batch_no);
	
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR__06_VERIFICATION_OF_RECORDS WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-007'", nativeQuery = true)
	List<BMR06GoodsVerificationOfRecords> getDetailscp(@Param("batch_no") String batch_no);
	
	//vijay
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR__06_VERIFICATION_OF_RECORDS WHERE VERIFICATION_ID=:verification_id AND FORM_NO ='PH-PRD04/F-008'", nativeQuery = true)
	BMR06GoodsVerificationOfRecords getSummaryByVerification_id08(@Param("verification_id") Long verification_id);
	
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR__06_VERIFICATION_OF_RECORDS WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-008'", nativeQuery = true)
	List<BMR06GoodsVerificationOfRecords> getGoodsVerificationWool(@Param("batch_no") String batch_no);
	
	

}
