package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.bleaching.BleachBmrCompletionTable;

public interface BleachBmrCompletionTableRepository extends JpaRepository<BleachBmrCompletionTable, Long> {

	@Query(value = "SELECT * FROM precot.BLEACH_BMR_COMPLETION_TABLE where BMR_NO=:bmr_no", nativeQuery = true)
	List<BleachBmrCompletionTable> getCompletionTable(@Param("bmr_no") String bmr_no);

	@Query(value = "SELECT * FROM precot.BLEACH_BMR_COMPLETION_TABLE WHERE BMR_NO=:bmr_no AND FORM IN ('PROCESS DELAY / EQUIPMENT BREAK DOWN RECORD')", nativeQuery = true)
	BleachBmrCompletionTable getShoppageDetailsForBMR(@Param("bmr_no") String bmr_no);
	
	@Query(value = "SELECT * FROM precot.BLEACH_BMR_COMPLETION_TABLE WHERE BMR_NO=:bmr_no AND FORM IN ('PRODUCTION DETAILS')", nativeQuery = true)
	BleachBmrCompletionTable getProductionDetailsForBMR(@Param("bmr_no") String bmr_no);
	
	@Query(value = "SELECT * FROM precot.BLEACH_BMR_COMPLETION_TABLE WHERE BMR_NO=:bmr_no AND FORM IN ('RAW COTTON ISSUE')", nativeQuery = true)
	BleachBmrCompletionTable getRawMaterialIssueForBMR(@Param("bmr_no") String bmr_no);
	
	@Query(value = "SELECT * FROM precot.BLEACH_BMR_COMPLETION_TABLE WHERE BMR_NO=:bmr_no AND FORM IN ('PROCESSING EQUIPMENT’S CALIBRATION STATUS')", nativeQuery = true)
	BleachBmrCompletionTable getAnnexureForBMR(@Param("bmr_no") String bmr_no);
	
	@Query(value = "SELECT * FROM precot.BLEACH_BMR_COMPLETION_TABLE WHERE BMR_NO=:bmr_no AND FORM IN ('VERIFICATION OF RECORDS')", nativeQuery = true)
	BleachBmrCompletionTable getVerificationRecordForBMR(@Param("bmr_no") String bmr_no);
	
	@Query(value = "SELECT * FROM precot.BLEACH_BMR_COMPLETION_TABLE WHERE BMR_NO=:bmr_no AND FORM IN ('MACHINE OPERATION PARAMETERS')", nativeQuery = true)
	BleachBmrCompletionTable getMachineOperationForBMR(@Param("bmr_no") String bmr_no);
	
	@Query(value = "SELECT * FROM precot.BLEACH_BMR_COMPLETION_TABLE WHERE BMR_NO=:bmr_no AND FORM IN ('QA RELEASE')", nativeQuery = true)
	BleachBmrCompletionTable getQAReleaseForBMR(@Param("bmr_no") String bmr_no);
	
	
	@Query(value = "SELECT * FROM precot.BLEACH_BMR_COMPLETION_TABLE WHERE BMR_NO=:bmr_no AND FORM IN ('PRODUCTION RELEASE')", nativeQuery = true)
	BleachBmrCompletionTable getProductReleaseForBMR(@Param("bmr_no") String bmr_no);
	
}
