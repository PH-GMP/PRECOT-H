package com.focusr.Precot.Buds.repository.bmr;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.model.bmr.BudsBmrProductionDetails;

@Repository
public interface BudsBmrProductionDetailsRepository extends JpaRepository<BudsBmrProductionDetails, Long> {
	
	@Query(value = "SELECT * FROM precot.BUDS_BMR_PRODUCTION_DETAILS WHERE BATCH_NO=:batchNumber", nativeQuery = true)
	List<BudsBmrProductionDetails> productionDetailsByBatchNumber(@Param("batchNumber") String batchNumber);
	
	@Query(value = "SELECT * FROM precot.BUDS_BMR_PRODUCTION_DETAILS WHERE BATCH_NO=:batchNumber", nativeQuery = true)
	BudsBmrProductionDetails productionDetailsByBatchNo(@Param("batchNumber") String batchNumber);
	
	@Query(value = "SELECT DISTINCT CONCAT(O.SaleOrder, O.SOitem, '-1') AS batchNo FROM tblOrderInfo O JOIN tblProduct P ON O.Material = P.Product WHERE O.sts = 1 AND P.Cat = 'Buds'", nativeQuery = true)
	List<String> productionDetailsBatchNumber();
	
	@Query(value = "SELECT PO_STATUS FROM precot.BUDS_BMR_PRODUCTION_DETAILS WHERE BATCH_NO=:batchNo", nativeQuery = true)
	Optional<String> checkStatusByBatchNo(@Param("batchNo") String batchNo);
	
	
	@Query(value = "SELECT DISTINCT NEXT_BATCH FROM precot.BUDS_BMR_PRODUCTION_DETAILS WHERE PO_STATUS = 'OPEN' AND NEXT_BATCH IS NOT NULL", nativeQuery = true)
	List<String> fetchOpenBatches();
	
	
	// GOKUL 
	
		@Query(value = "SELECT PRODUCT_DESCRIPTION,PRODUCT_CODE,MANUFACTURER_START_DATE,MANUFACTURER_END_DATE,LOT_NUMBER FROM PDE.precot.BUDS_BMR_PRODUCTION_DETAILS where BATCH_NO = :bmr",nativeQuery = true)
		List<Object[]> cottonBudsPDE(@Param("bmr") String bmr );
		
		@Query(value = "SELECT BATCH_NO FROM PDE.precot.BUDS_BMR_PRODUCTION_DETAILS", nativeQuery = true)
		List<String> findAllByBatchNo();
	
	
		// TRACEABILITY 
	
	@Query(value= "SELECT BATCH_NO FROM precot.BUDS_BMR_PRODUCTION_DETAILS WHERE :date BETWEEN MANUFACTURER_START_DATE AND MANUFACTURER_END_DATE", nativeQuery = true)
	List<String> fetchBmrListByStartEndDate(@Param("date") String fromDate);
	
	
	@Query(value= "SELECT BATCH_NO FROM precot.BUDS_BMR_PRODUCTION_DETAILS WHERE :date BETWEEN MANUFACTURER_START_DATE AND MANUFACTURER_END_DATE", nativeQuery = true)
	List<Map<String, Object>> fetchBatchNumberListByStartEndDate(@Param("date") String fromDate);
	

		// SAP DATAS
	
	@Query(value = "SELECT  O.SaleOrder AS saleOrder, O.SOitem AS saleOrderItem, O.POrder AS orderNumber,O.Qty AS quantity,P.Bags AS bags, O.PONo AS poNumber,O.Material AS material, P.ProdDesc AS productionDescription, \r\n"
			+ "P.bwgt AS bagWeight FROM tblOrderInfo O JOIN tblProduct P ON O.Material = P.Product WHERE O.sts = 1 AND P.Cat = 'Buds'", nativeQuery = true)
	List<Object[]> productionDetailsResponse();
	
	@Query(value = "SELECT O.SaleOrder, O.SOitem , O.POrder,O.Qty, O.PONo ,O.Material , P.ProdDesc\r\n"
			+ ",P.Bags FROM tblOrderInfo O JOIN tblProduct P ON O.Material =\r\n"
			+ "P.Product WHERE O.sts = 1 AND P.Cat = 'Buds' AND CONCAT(O.SaleOrder, O.SOitem)=:batchNo AND O.POrder=:orderNo", nativeQuery = true)
	List<Object[]> productionResponseByBatchOrder(@Param("batchNo") String batchNo, @Param("orderNo") String orderNo);

	
	@Query(value = "SELECT SUM(CAST(ON_DATE_BOX_QTY AS DECIMAL(10, 2))) FROM precot.PUNCHING_BMR_PROD_DETAILS WHERE BATCH_NO LIKE CONCAT(:prefix, '-%')", nativeQuery = true)
	BigDecimal soFarPackQtyBox(@Param("prefix") String prefix);
 
	@Query(value = "SELECT SUM(CAST(ON_DATE_BAG_QTY AS DECIMAL(10, 2))) FROM precot.PUNCHING_BMR_PROD_DETAILS WHERE BATCH_NO LIKE CONCAT(:prefix, '-%')", nativeQuery = true)
	BigDecimal soFarPackQtyBag(@Param("prefix") String prefix);
	
	@Query(value = "SELECT SUM(NBAG) FROM tblFPPack WHERE POrder =:orderNo AND PackDt BETWEEN :fromDate AND :toDate", nativeQuery = true)
	BigDecimal productionBagsOnDate(@Param("orderNo") String orderNo, @Param("fromDate") LocalDate fromDate, @Param("toDate") LocalDate toDate);
	
	@Query(value = "SELECT SUM(NOC) FROM tblFPPack WHERE POrder =:orderNo AND PackDt BETWEEN :fromDate AND :toDate", nativeQuery = true)
	BigDecimal productionBagNocOnDate(@Param("orderNo") String orderNo, @Param("fromDate") LocalDate fromDate, @Param("toDate") LocalDate toDate);
	
	@Query(value = "SELECT POrder FROM tblOrderInfo WHERE CONCAT(SaleOrder, SOitem)=:batchNo", nativeQuery = true)
	List<String> getOrderByBatchNo(@Param("batchNo") String batchNo);
	
		
	
	/**
	 * PRODUCT RECONILLATION
	 */
	
	@Query(value = "SELECT SUM(RNwt) FROM tblRCons WHERE POrder=:orderNumber AND ConsDt BETWEEN :startDate AND :endDate", nativeQuery = true)
	BigDecimal inputQuantity(@Param("orderNumber") String orderNumber, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
	
	
	@Query(value = "SELECT SUM(tf.NBAG * tp.bwgt) FROM tblFPPack tf JOIN tblOrderInfo toi ON toi.POrder = tf.POrder JOIN tblProduct tp ON tp.Product = toi.Material WHERE toi.POrder=:orderNumber AND tf.PackDt BETWEEN :startDate AND :endDate", nativeQuery = true)
	BigDecimal outputQuantity(@Param("orderNumber") String orderNumber, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
	
}
