package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.QASummaryOfTraceability;
import com.focusr.Precot.QA.payload.AllBMRDetailsProjection;
import com.focusr.Precot.QA.payload.BmrDetailsRequest;

public interface QASummaryOfTraceabilityRepository extends JpaRepository<QASummaryOfTraceability, Long> {
	@Query(value = "SELECT * FROM precot.QA_SUMMARY_OF_TRACEBILITY WHERE (:year IS NULL OR :year='' OR YEAR = :year)AND(:month IS NULL OR :month='' OR MONTH = :month)AND QA_MANAGER_OR_MR_STATUS = 'QA_MANAGER_MR_APPROVED'", nativeQuery = true)
	List<QASummaryOfTraceability> printParam(@Param("year") String year, @Param("month") String month);

	@Query(value = "SELECT * FROM precot.QA_SUMMARY_OF_TRACEBILITY WHERE DATE =:date AND DEPARTMENT = :department AND BMR_NO =:bmr_no", nativeQuery = true)
	QASummaryOfTraceability getdetailsbyParam(@Param("date") String date, @Param("department") String department,
			@Param("bmr_no") String bmr_no);

	@Query(value = "SELECT * FROM precot.QA_SUMMARY_OF_TRACEBILITY WHERE QA_MANAGER_OR_DESIGNEE_STATUS = 'DESIGNEE_OR_QA_MANAGER_SAVED' OR QA_MANAGER_OR_MR_STATUS != 'QA_MANAGER_MR_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<QASummaryOfTraceability> designeeSummary();

	@Query(value = "SELECT * FROM precot.QA_SUMMARY_OF_TRACEBILITY WHERE QA_MANAGER_OR_DESIGNEE_STATUS = 'DESIGNEE_OR_QA_MANAGER_SUBMITTED' AND QA_MANAGER_OR_MR_STATUS != 'QA_MANAGER_MR_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<QASummaryOfTraceability> mrSummary();

	// BMR PUNCHING_BMR_PROD_DETAILS
	@Query(value = "SELECT ORDER_NO AS orderNo ,LOT_NUMBER AS lotNo,PO_NUMBER AS poNo,\r\n"
			+ "BOXES_PACK_QTY AS cartons,BAGS_PACK_QTY AS bags FROM precot.PUNCHING_BMR_PROD_DETAILS \r\n"
			+ "WHERE BATCH_NO = :batchNo", nativeQuery = true)
	List<AllBMRDetailsProjection> fetchBmrDataPunching(@Param("batchNo") String batchNo);

	// BMR SPUNLACE_BMR_B01_R01_PRODUCTION_DETAILS
//	@Query(value = "SELECT ORDER_NO AS orderNo, PRODUCT_DESCRIPTION AS product,LOT_NUMBER AS lotNo,PO_NUMBER AS poNo,\r\n"
//			+ "BOXES_PACK_QTY AS cartons,BAGS_PACK_QTY AS bags FROM precot.SPUNLACE_BMR_B01_R01_PRODUCTION_DETAILS \r\n"
//			+ "WHERE BATCH_NO = :batchNo", nativeQuery = true)
//	List<AllBMRDetailsProjection> fetchBmrDataSpunlace(@Param("batchNo") String batchNo);

	// BMR BMR_DRYGOODS_01_PRODUCTION_DETAILS
	@Query(value = "SELECT ORDER_NO AS orderNo,LOT_NO AS lotNo,PO_NO AS poNo,\r\n"
			+ "PO_QTY_BOX AS cartons,PO_QTY_BAG AS bags FROM precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS \r\n"
			+ "WHERE BATCH_NO = :batchNo", nativeQuery = true)
	List<AllBMRDetailsProjection> fetchBmrDataDryGoods(@Param("batchNo") String batchNo);

	// BMR BMR_SUMMARY_PROD_DETAILS--BLEACHING
	@Query(value = "SELECT START_SUB_BATCH AS poNo, END_SUB_BATCH AS lotNo,\r\n"
			+ "BATCH_QUANTITY AS cartons, FINISHING AS bags, BMR_NO AS orderNo FROM precot.BMR_SUMMARY_PROD_DETAILS \r\n"
			+ "WHERE BMR_NO =:bmr_no", nativeQuery = true)
	List<AllBMRDetailsProjection> fetchBmrDataBleaching(@Param("bmr_no") String bmr_no);

	@Query(value = "SELECT Material AS product, Brand AS customer FROM tblOrderInfo WHERE POrder = :orderNo", nativeQuery = true)
	List<Object[]> getCustomer(@Param("orderNo") String orderNo);
	
	
			// GET BMR DETAILS BY BMR 
	
	@Query(value = "SELECT BATCH_QUANTITY AS quantity, START_SUB_BATCH AS startbatch, END_SUB_BATCH AS endbatch FROM precot.BMR_SUMMARY_PROD_DETAILS bspd WHERE BMR_NO=:batchNumber", nativeQuery = true)
	List<BmrDetailsRequest> bleachingBmrRequest(@Param("batchNumber") String batchNumber);
	
	@Query(value = "SELECT BATCH_QUANTITY AS quantity, START_SUB_BATCH AS startbatch, END_SUB_BATCH AS endbatch FROM precot.BMR_SUMMARY_PROD_DETAILS bspd WHERE BMR_NO=:batchNumber", nativeQuery = true)
	List<AllBMRDetailsProjection> bleachingBmrResponse(@Param("batchNumber") String batchNumber);
	
		// SPULANCE 
	
	@Query(value = "SELECT ORDER_NO AS orderNo, START_DATE AS lotNo, END_DATE AS poNo, BATCH_NO AS cartons, END_TIME AS bags FROM precot.SPUNLACE_BMR_B01_R01_PRODUCTION_DETAILS WHERE BATCH_NO=:batchNumber", nativeQuery = true)
	List<AllBMRDetailsProjection> spulanceOrderDetailsResponse(@Param("batchNumber") String batchNumber);
	
	
	@Query(value = "SELECT ORDER_NO AS orderNo, START_DATE AS lotNo, END_DATE AS poNo, BATCH_NO AS cartons, END_TIME AS bags FROM precot.SPUNLACE_BMR_B01_R01_PRODUCTION_DETAILS WHERE ORDER_NO=:batchNumber", nativeQuery = true)
	List<AllBMRDetailsProjection> spulanceRPOrderDetailsResponse(@Param("batchNumber") String batchNumber);
	

	@Query(value = "SELECT ORDER_NO AS orderNo,LOT_NUMBER AS lotNo ,PO_NUMBER AS poNo,BOXES_PACK_QTY AS cartons,BAGS_PACK_QTY AS bags FROM precot.BUDS_BMR_PRODUCTION_DETAILS\r\n"
			+ "WHERE BATCH_NO =:batchNumber", nativeQuery = true)
	List<AllBMRDetailsProjection> BudsBmrRequest(@Param("batchNumber") String batchNumber);
	
	
}
