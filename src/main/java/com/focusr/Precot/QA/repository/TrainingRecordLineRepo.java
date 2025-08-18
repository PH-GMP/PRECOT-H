package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.TrainingRecordLines;
import com.focusr.Precot.QA.payload.OnlineInspectionPadsPleatsRolls;

@Repository
public interface TrainingRecordLineRepo extends JpaRepository<TrainingRecordLines, Long> {

	@Query(value = "SELECT * FROM precot.TRAINING_RECORD_LINES WHERE LINE_ID = :line_id ", nativeQuery = true)
	TrainingRecordLines findFormById(@Param("line_id") Long line_id);

	@Query(value = "SELECT BATCH_NO AS batchNo, ORDER_NO AS orderNo, PRODUCT_DESCRIPTION AS productDescription, "
			+ "MACHINE_NAME AS machineName, PO_NUMBER AS poNumber, LOT_NUMBER AS lotNumber "
			+ "FROM PDE.precot.PUNCHING_BMR_PROD_DETAILS WHERE BATCH_NO = :batchNo", nativeQuery = true)
	OnlineInspectionPadsPleatsRolls getDataByBatchNo(@Param("batchNo") String batchNo);

	// Get Item code

	@Query(value = "SELECT Material FROM tblOrderInfo WHERE POrder = :porder", nativeQuery = true)
	List<String> getItemCode(@Param("porder") String porder);

	@Query(value = "SELECT CUST_NAME from tblcusinfo WHERE MATERIAL = :material", nativeQuery = true)
	List<String> getCustomerName(@Param("material") String material);

}
