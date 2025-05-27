package com.focusr.Precot.mssql.database.repository.bleaching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachReprocessReportHistory;

@Repository
public interface BleachReprocessReportRepositoryHistory extends JpaRepository<BleachReprocessReportHistory, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.BLEACH_REPROCESS_REPORT_HISTORY_F16 WHERE BMR_NUMBER=:bmrNumber AND SUB_BATCH_NUMBER=:subBatchNumber", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("bmrNumber") String bmrNumber, @Param("subBatchNumber") String subBatchNumber);
	
	@Query(value = "SELECT * FROM precot.BLEACH_REPROCESS_REPORT_HISTORY_F16 WHERE BMR_NUMBER=:bmrNumber AND SUB_BATCH_NUMBER=:subBatchNumber  AND VERSION IN (SELECT MAX(VERSION) FROM precot.BLEACH_REPROCESS_REPORT_HISTORY_F16 WHERE BMR_NUMBER=:bmrNumber AND SUB_BATCH_NUMBER=:subBatchNumber)", nativeQuery = true)
	BleachReprocessReportHistory findLastSubmittedRecord(@Param("bmrNumber") String bmrNumber, @Param("subBatchNumber") String subBatchNumber);
	
	
		// EXCEL
	
	@Query(value = "SELECT * FROM precot.BLEACH_REPROCESS_REPORT_HISTORY_F16 WHERE "
			+ "(:fromdate IS NULL OR :todate IS NULL OR PROCESS_DATE BETWEEN :fromdate AND :todate)"
			+ "AND (:bmrNumber IS NULL OR BMR_NUMBER=:bmrNumber)"
			+ "AND (:subBatchNumber IS NULL OR SUB_BATCH_NUMBER=:subBatchNumber)", nativeQuery = true)
	List<BleachReprocessReportHistory> generateExcel(@Param("fromdate") String fromdate, @Param("todate") String todate,
			@Param("bmrNumber") String bmrNumber, @Param("subBatchNumber") String subBatchNumber);
	
}
