package com.focusr.Precot.mssql.database.repository.bleaching;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.bleaching.BmrSummaryVerification;

public interface BmrSummaryVerificationRepository  extends JpaRepository<BmrSummaryVerification, Long>{

	@Query(value = "SELECT * FROM precot.BMR_SUMMARY_VERIFICATION WHERE SUMMARY_VERIFICATION_ID=:id", nativeQuery = true)
	BmrSummaryVerification getSummaryRecordById(@Param("id") Long id);
	
}
