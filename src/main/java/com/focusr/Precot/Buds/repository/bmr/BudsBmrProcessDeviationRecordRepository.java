package com.focusr.Precot.Buds.repository.bmr;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.model.bmr.BudsBmrProcessDeviationRecordHeader;

@Repository
public interface BudsBmrProcessDeviationRecordRepository extends JpaRepository<BudsBmrProcessDeviationRecordHeader, Long>{

	@Query(value = "SELECT * FROM precot.BUDS_BMR_PROCESS_DEVIATION_RECORD_HEADER WHERE BATCH_NO=:batchNumber", nativeQuery = true)
	List<BudsBmrProcessDeviationRecordHeader> deviationByBatchNo(@Param("batchNumber") String batchNumber);
	
}
