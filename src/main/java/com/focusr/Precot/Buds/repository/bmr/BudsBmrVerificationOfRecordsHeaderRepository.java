package com.focusr.Precot.Buds.repository.bmr;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.model.bmr.BudsBmrVerificationOfRecordsHeader;

@Repository
public interface BudsBmrVerificationOfRecordsHeaderRepository extends JpaRepository<BudsBmrVerificationOfRecordsHeader, Long>{

	@Query(value = "SELECT * FROM precot.BUDS_BMR_VERIFICATION_OF_RECORDS_HEADER WHERE ID=:id", nativeQuery = true)
	BudsBmrVerificationOfRecordsHeader getVerificationOfRecordsById(@Param("id") Long id);
	
	@Query(value = "SELECT * FROM precot.BUDS_BMR_VERIFICATION_OF_RECORDS_HEADER WHERE BATCH_NO=:batchNo", nativeQuery = true)
	List<BudsBmrVerificationOfRecordsHeader> verificationRecordByBatch(@Param("batchNo") String batchNo);
	
}
