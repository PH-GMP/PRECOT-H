package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.BatchReleaseNotesHeader;
import com.focusr.Precot.QA.model.QASummaryOfTraceability;
@Repository
public interface BatchReleaseNotesHeaderRepository extends JpaRepository<BatchReleaseNotesHeader, Long>{
	@Query(value = "SELECT * FROM precot.QA_BATCH_RELEASE_NOTE_HEADER WHERE (:year IS NULL OR :year='' OR YEAR = :year)AND(:month IS NULL OR :month='' OR MONTH = :month)AND (:date IS NULL OR :date='' OR DATE = :date)AND QA_MANAGER_OR_DESIGNEE_STATUS = 'DESIGNEE_OR_QA_MANAGER_SUBMITTED'", nativeQuery = true)
	List<BatchReleaseNotesHeader> printParam(@Param("year") String year, @Param("month") String month,@Param("date") String date);

	@Query(value = "SELECT * FROM precot.QA_BATCH_RELEASE_NOTE_HEADER WHERE DATE =:date", nativeQuery = true)
	BatchReleaseNotesHeader getdetailsbyParam(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.QA_BATCH_RELEASE_NOTE_HEADER WHERE QA_MANAGER_OR_DESIGNEE_STATUS = 'DESIGNEE_OR_QA_MANAGER_SAVED' ORDER BY ID DESC", nativeQuery = true)
	List<BatchReleaseNotesHeader> designeeSummary();
	
	
		// FOR ALL BMR NUMBER 
	
	@Query(value = "SELECT DISTINCT BATCH_NO FROM precot.SPUNLACE_BMR_B01_R01_PRODUCTION_DETAILS WHERE FORM_NO ='PRD02/F-26'", nativeQuery = true)
	List<String> fetchSpulanceBatchNumber1();
	
	@Query(value = "SELECT DISTINCT ORDER_NO FROM precot.SPUNLACE_BMR_B01_R01_PRODUCTION_DETAILS WHERE FORM_NO ='PRD02/F-27'", nativeQuery = true)
	List<String> fetchSpulanceBatchNumber2();
	
	@Query(value = "SELECT DISTINCT BMR_NO FROM precot.BMR_SUMMARY_PROD_DETAILS", nativeQuery = true)
	List<String> fetchBleachBatchNumber();
	
	@Query(value = "SELECT DISTINCT BATCH_NO FROM precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS", nativeQuery = true)
	List<String> fetchDrygoodsBatchNumber();
	
	@Query(value = "SELECT DISTINCT BATCH_NO FROM precot.PUNCHING_BMR_PROD_DETAILS", nativeQuery = true)
	List<String> fetchPadpunchingBatchNumber();
	
	//GET Details by bmr
	//PUNCHING
	@Query(value = "SELECT DISTINCT BATCH_NO FROM precot.PUNCHING_BMR_PROD_DETAILS WHERE :date BETWEEN MANUFACTURER_START_DATE AND MANUFACTURER_END_DATE", nativeQuery = true)
	List<String> fetchPunchingBatchDetails(@Param("date") String date);
	
	//DRYGOODS
	@Query(value = "SELECT DISTINCT BATCH_NO FROM precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS WHERE :date  BETWEEN END_DATE AND START_DATE", nativeQuery = true)
	List<String> fetchDrygoodsDetsils(@Param("date") String date);
	
	//BUDS
	@Query(value = "SELECT DISTINCT BATCH_NO FROM precot.BUDS_BMR_PRODUCTION_DETAILS  WHERE :date BETWEEN MANUFACTURER_START_DATE AND MANUFACTURER_END_DATE", nativeQuery = true)
	List<String> fetchBudsDetails(@Param("date") String date);
	
	//BLEACHING
	@Query(value = "SELECT DISTINCT BMR_NO FROM precot.BMR_SUMMARY_PROD_DETAILS WHERE :date BETWEEN START_DATE AND END_DATE", nativeQuery = true)
	List<String> fetchBleachingDetails(@Param("date") String date);
	//SPUNLACE 1
	@Query(value = "SELECT DISTINCT BATCH_NO FROM precot.SPUNLACE_BMR_B01_R01_PRODUCTION_DETAILS WHERE :date BETWEEN START_DATE AND END_DATE\r\n"
			+ "AND FORM_NO = 'PRD02/F-26';"
			, nativeQuery = true)
	List<String> fetchSpunlace1Details(@Param("date") String date);
	// SPUNLACE2
	@Query(value = "SELECT DISTINCT BATCH_NO FROM precot.SPUNLACE_BMR_B01_R01_PRODUCTION_DETAILS WHERE :date BETWEEN START_DATE AND END_DATE\r\n"
			+ "AND FORM_NO = 'PRD02/F-27';"
			, nativeQuery = true)
	List<String> fetchSpunlace2Details(@Param("date") String date);
	
	
	// EXIST QUERY
	@Query(value = "SELECT CASE WHEN COUNT(*) > 0 THEN 'TRUE' ELSE 'FALSE' END \r\n"
			+ "FROM PRECOT.SPUNLACE_BMR_B01_R01_PRODUCTION_DETAILS \r\n"
			+ "WHERE BATCH_NO =:batchNumber"
			, nativeQuery = true)
	boolean isExistSpunlace1(@Param("batchNumber") String batchNumber);
	//spunlace2
	@Query(value = "SELECT CASE WHEN COUNT(*) > 0 THEN 'TRUE' ELSE 'FALSE' END \r\n"
			+ "FROM PRECOT.SPUNLACE_BMR_B01_R01_PRODUCTION_DETAILS \r\n"
			+ "WHERE BATCH_NO =:batchNumber"
			, nativeQuery = true)
	boolean isExistSpunlace2(@Param("batchNumber") String batchNumber);
	//bleaching
	@Query(value = "SELECT CASE WHEN COUNT(*) > 0 THEN 'TRUE' ELSE 'FALSE' END \r\n"
			+ "FROM PRECOT.BMR_SUMMARY_PROD_DETAILS \r\n"
			+ "WHERE BMR_NO =:batchNumber"
			, nativeQuery = true)
	boolean isExistBleaching(@Param("batchNumber") String batchNumber);
	//punching
	@Query(value = "SELECT CASE WHEN COUNT(*) > 0 THEN 'TRUE' ELSE 'FALSE' END \r\n"
			+ "FROM PRECOT.PUNCHING_BMR_PROD_DETAILS \r\n"
			+ "WHERE BATCH_NO =:batchNumber"
			, nativeQuery = true)
	boolean isExistPunching(@Param("batchNumber") String batchNumber);
	//drygoods
	@Query(value = "SELECT CASE WHEN COUNT(*) > 0 THEN 'TRUE' ELSE 'FALSE' END \r\n"
			+ "FROM PRECOT.BMR_DRYGOODS_01_PRODUCTION_DETAILS \r\n"
			+ "WHERE BATCH_NO =:batchNumber"
			, nativeQuery = true)
	boolean isExistDrygoods(@Param("batchNumber") String batchNumber);
	//buds
	@Query(value = "SELECT CASE WHEN COUNT(*) > 0 THEN 'TRUE' ELSE 'FALSE' END \r\n"
			+ "FROM PRECOT.BUDS_BMR_PRODUCTION_DETAILS \r\n"
			+ "WHERE BATCH_NO =:batchNumber"
			, nativeQuery = true)
	boolean isExistBuds(@Param("batchNumber") String batchNumber);
	
	//BUDS
		@Query(value = "SELECT DISTINCT BATCH_NO FROM precot.BUDS_BMR_PRODUCTION_DETAILS", nativeQuery = true)
		List<String> fetchBudsDetails();
	
}
