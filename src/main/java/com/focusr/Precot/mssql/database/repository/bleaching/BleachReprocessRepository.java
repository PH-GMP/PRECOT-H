package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BleachReprocessReportF16;

@Repository
public interface BleachReprocessRepository extends JpaRepository<BleachReprocessReportF16, Long>{

	@Query(value = "SELECT * FROM precot.BLEACH_REPROCESS_REPORT_F16 WHERE ID=:id", nativeQuery = true)
	BleachReprocessReportF16 reprocessReportById(@Param("id") Long id);
	
	@Query(value = "SELECT * FROM precot.BLEACH_REPROCESS_REPORT_F16 WHERE ID=:id", nativeQuery = true)
	List<BleachReprocessReportF16> reprocessReportListById(@Param("id") Long id);
	
		// SUMMARY
	
	@Query(value = "SELECT * FROM precot.BLEACH_REPROCESS_REPORT_F16 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' OR QA_STATUS != 'QA_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<BleachReprocessReportF16> reprocessReportSupervisor();
	
	@Query(value = "SELECT * FROM precot.BLEACH_REPROCESS_REPORT_F16 WHERE QA_STATUS != 'QA_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<BleachReprocessReportF16> reprocessReportHod();
	
		// GET BY UNIQUE 
	
	@Query(value = "SELECT * FROM precot.BLEACH_REPROCESS_REPORT_F16 WHERE BMR_NUMBER=:bmrNo AND SUB_BATCH_NUMBER=:batchNo", nativeQuery = true)
	List<BleachReprocessReportF16> reprocessReportUnique(@Param("bmrNo") String bmrNo, @Param("batchNo") String batchNo);
	
	
	
	@Query(value = "SELECT * FROM precot.BLEACH_REPROCESS_REPORT_F16 WHERE "
			+ "(:bmrNo IS NULL OR :bmrNo = '' OR BMR_NUMBER=:bmrNo)"
			+ "AND (:date IS NULL OR :date = '' OR PROCESS_DATE=:date)"
			+ "AND QA_STATUS='QA_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<BleachReprocessReportF16> reprocessReportPrint(@Param("bmrNo") String bmrNo, @Param("date") String date);
}
