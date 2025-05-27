package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.bleaching.BleachJobCardF13;

public interface BleachJobCard13Repository extends JpaRepository<BleachJobCardF13, Long> {

	@Query(value = "SELECT * FROM precot.BLEACH_JOB_CARD_F13 where HEADER_ID=:header_id", nativeQuery = true)
	List<BleachJobCardF13> getJobcardDetails(@Param("header_id") Long header_id);

	@Query(value = "SELECT * FROM precot.BLEACH_JOB_CARD_F13 WHERE BMR_NO=:bmr_no", nativeQuery = true)
	List<BleachJobCardF13> getBmrDetails(@Param("bmr_no") String bmr_no);

	@Query(value = "SELECT * FROM precot.BLEACH_JOB_CARD_F13 WHERE BMR_NO=:bmr_no AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<BleachJobCardF13> getApprovedBmrDetails13(@Param("bmr_no") String bmr_no);

	@Query(value="SELECT * FROM precot.BLEACH_JOB_CARD_F13 where HEADER_ID=:header_id", nativeQuery = true)
	BleachJobCardF13 getBleachJobcardById(@Param("header_id") Long header_id);
	
	@Query(value = "SELECT * FROM precot.BLEACH_JOB_CARD_F13 WHERE FORMAT_NO =:formatNo", nativeQuery = true)
	List<BleachJobCardF13> findByListOfBleachingFormatDetails(@Param("formatNo") String formatNo);

	@Query(value = "SELECT * FROM precot.BLEACH_JOB_CARD_F13 WHERE SUPERVISOR_STATUS ='SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY HEADER_ID DESC", nativeQuery = true)
	List<BleachJobCardF13> getBleachSupervisorSummeryDetails();

	@Query(value = "SELECT * FROM precot.BLEACH_JOB_CARD_F13 WHERE HOD_STATUS != 'HOD_APPROVED' ORDER BY HEADER_ID DESC", nativeQuery = true)
	List<BleachJobCardF13> getBleachHodSummeryDetails();

	@Query(value = "SELECT * FROM precot.BLEACH_JOB_CARD_F13 WHERE HOD_STATUS != 'HOD_APPROVED' ORDER BY HEADER_ID DESC", nativeQuery = true)
	List<BleachJobCardF13> getBleachQaSummeryDetails();

//	@Query(value = "SELECT * FROM precot.BLEACH_JOB_CARD_F13 WHERE BMR_NO=:bmr_no AND SUB_BATCH_NO=:batchNo", nativeQuery = true)
//	List<BleachJobCardF13> getBmrBatchDetails(@Param("bmr_no") String bmr_no,@Param("bmr_no") String batchNo);
//	

//	@Query(value = "SELECT * FROM precot.BLEACH_JOB_CARD_F13 WHERE BMR_NO =:bmr_no AND SUB_BATCH_NO=:batchNo", nativeQuery = true)
//	List<BleachJobCardF13> getBmrBatchDetails(@Param("bmr_no") String bmr_no, @Param("batchNo") String batchNo);

	@Query(value = "SELECT * FROM precot.BLEACH_JOB_CARD_F13 WHERE BMR_NO =:bmr_no AND SUB_BATCH_NO=:batchNo", nativeQuery = true)
	List<BleachJobCardF13> getBmrBatchDetails(@Param("bmr_no") String bmr_no, @Param("batchNo") String batchNo);
	
//	@Query(value = "SELECT * FROM precot.BLEACH_JOB_CARD_F13 WHERE BMR_NO =:bmr_no AND SUB_BATCH_NO=:batchNo AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
//	List<BleachJobCardF13> getBmrBatchDetails(@Param("bmr_no") String bmr_no, @Param("batchNo") String batchNo);
	
	@Query(value = "SELECT TOP 1  SUB_BATCH_NO ,DATE, START_TIME  FROM precot.BLEACH_JOB_CARD_F13 ORDER BY HEADER_ID DESC;", nativeQuery = true)
	List<Map<String, Object>> getLastSubbatchNo();
	
	@Query(value = "SELECT DISTINCT BMR_NO FROM precot.BLEACH_JOB_CARD_F13 WHERE HOD_STATUS IN ('HOD_APPROVED')", nativeQuery = true)
	List<String> approvedBmr();
	
	//kaviya
	// new cr batch no after Bleach Job Card submit
	
		@Query(value = "SELECT SUB_BATCH_NO FROM precot.BLEACH_JOB_CARD_F13 WHERE BMR_NO=:bmr_no AND SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED'", nativeQuery = true)
		List<String> getBatchByBMRForHydroExtractor(@Param("bmr_no") String bmr_no);
}
