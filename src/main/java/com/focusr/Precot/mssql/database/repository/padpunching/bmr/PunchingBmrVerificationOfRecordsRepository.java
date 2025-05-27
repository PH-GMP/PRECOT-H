package com.focusr.Precot.mssql.database.repository.padpunching.bmr;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrVerificationOfRecords;

@Repository
public interface PunchingBmrVerificationOfRecordsRepository extends JpaRepository<PunchingBmrVerificationOfRecords, Long>{

	@Query(value = "SELECT * FROM precot.PADPUNCHING_BMR_VERIFICATION_OF_RECORDS WHERE VERIFICATION_ID=:id", nativeQuery = true)
	PunchingBmrVerificationOfRecords getVerificationOfRecordsById(@Param("id") Long id);
	
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_BMR_VERIFICATION_OF_RECORDS WHERE ORDER_NO=:order", nativeQuery = true)
	List<PunchingBmrVerificationOfRecords> getVerificationOfRecordsByOrder(@Param("order") String order);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_BMR_VERIFICATION_OF_RECORDS WHERE BATCH_NO=:order", nativeQuery = true)
	List<PunchingBmrVerificationOfRecords> getVerificationOfRecordsByBatch(@Param("order") String order);
	
}
