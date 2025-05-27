package com.focusr.Precot.mssql.database.repository.bleaching;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BmrSummaryRecordVerification;

@Repository
public interface BmrSummaryRecordVerificationRepository extends JpaRepository<BmrSummaryRecordVerification, Long>{

	@Query(value = "SELECT * FROM precot.BMR_SUMMARY_RECORD_VERFICATION WHERE BMR_NO=:bmr_no", nativeQuery = true)
	BmrSummaryRecordVerification getBMRSummaryVerfication(@Param("bmr_no") String bmr_no);
	
	@Query(value = "SELECT * FROM precot.BMR_SUMMARY_RECORD_VERFICATION WHERE SUMMARY_RECORD_ID=:summary_record_id", nativeQuery = true)
	BmrSummaryRecordVerification getRecordDetails(@Param("summary_record_id") Long summary_record_id);
	

}
