package com.focusr.Precot.mssql.database.repository.padpunching.bmr;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrProductionDetails;
import com.focusr.Precot.payload.padpunching.PadPunchingBmrProdResponse;

@Repository
public interface PunchingBmrProductionDetailsRepository extends JpaRepository<PunchingBmrProductionDetails, Long>{

	@Query(value = "SELECT * FROM precot.PUNCHING_BMR_PROD_DETAILS WHERE BATCH_NO=:order", nativeQuery = true)
	List<PunchingBmrProductionDetails> productionDetailsByOrder(@Param("order") String order);
	
	@Query(value = "SELECT BATCH_NO AS batchNumber, ORDER_NO AS orderNumber, PRODUCT_DESCRIPTION AS product, PO_QUANTITY_BOXES AS quantity FROM precot.PUNCHING_BMR_PROD_DETAILS WHERE BATCH_NO=:batchNo", nativeQuery = true)
	Map<String, Object> productionDetailsByNumber(@Param("batchNo") String batchNo);
	
	@Query(value = "SELECT tp.edge FROM tblOrderInfo toi INNER JOIN tblProduct tp ON tp.Product = toi.Material WHERE tp.Cat = 'Pads' AND toi.POrder=:orderNo", nativeQuery = true)
	String edgeByOrder(@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT PO_STATUS FROM precot.PUNCHING_BMR_PROD_DETAILS WHERE BATCH_NO=:batchNo", nativeQuery = true)
	Optional<String> productionDetailsByBatchNo(@Param("batchNo") String batchNo);
	
	
	@Query(value = "SELECT SUM(CAST(ON_DATE_BOX_QTY AS DECIMAL(10, 2))) FROM precot.PUNCHING_BMR_PROD_DETAILS WHERE BATCH_NO LIKE CONCAT(:prefix, '-%')", nativeQuery = true)
	BigDecimal soFarPackQtyBox(@Param("prefix") String prefix);
 
	@Query(value = "SELECT SUM(CAST(ON_DATE_BAG_QTY AS DECIMAL(10, 2))) FROM precot.PUNCHING_BMR_PROD_DETAILS WHERE BATCH_NO LIKE CONCAT(:prefix, '-%')", nativeQuery = true)
	BigDecimal soFarPackQtyBag(@Param("prefix") String prefix);
	
	
	/**
	 *  SAP QUERY
	 * @return
	 */
	
	
	@Query(value = "SELECT  O.SaleOrder AS saleOrder, O.SOitem AS saleOrderItem, O.POrder AS orderNumber,O.Qty AS quantity,P.Bags AS bags, O.PONo AS poNumber,O.Material AS material, P.ProdDesc AS productionDescription, \r\n"
			+ "P.bwgt AS bagWeight FROM tblOrderInfo O JOIN tblProduct P ON O.Material = P.Product WHERE O.sts = 1 AND P.Cat = 'Pads'", nativeQuery = true)
	List<Object[]> productionDetailsResponse();
	
	
	@Query(value = "SELECT DISTINCT CONCAT(O.SaleOrder, O.SOitem, '-1') AS batchNo FROM tblOrderInfo O JOIN tblProduct P ON O.Material = P.Product WHERE O.sts = 1 AND P.Cat = 'Pads'", nativeQuery = true)
	List<String> productionDetailsBatchNumber();
	
	
	@Query(value = "SELECT POrder FROM tblOrderInfo WHERE CONCAT(SaleOrder, SOitem)=:batchNo", nativeQuery = true)
	List<String> getOrderByBatchNo(@Param("batchNo") String batchNo);
	
	
	
	
	
	
	@Query(value = "SELECT  O.SaleOrder AS saleOrder, O.SOitem AS saleOrderItem, O.POrder AS orderNumber,O.Qty AS quantity,P.Bags AS bags, O.PONo AS poNumber,O.Material AS material, P.ProdDesc AS productionDescription, \r\n"
			+ "P.bwgt AS bagWeight FROM tblOrderInfo O JOIN tblProduct P ON O.Material = P.Product WHERE O.sts = 1 AND P.Cat = 'Pads' AND CONCAT(O.SaleOrder, O.SOitem)=:batchNo AND O.POrder=:orderNo", nativeQuery = true)
	List<Object[]> productionResponseByBatchOrder(@Param("batchNo") String batchNo, @Param("orderNo") String orderNo);
	
	
	@Query(value = "SELECT SUM(NBAG) FROM tblFPPack WHERE POrder =:orderNo AND PackDt BETWEEN :fromDate AND :toDate", nativeQuery = true)
	BigDecimal productionBagsOnDate(@Param("orderNo") String orderNo, @Param("fromDate") LocalDate fromDate, @Param("toDate") LocalDate toDate);
	
	@Query(value = "SELECT SUM(NOC) FROM tblFPPack WHERE POrder =:orderNo AND PackDt BETWEEN :fromDate AND :toDate", nativeQuery = true)
	BigDecimal productionBagNocOnDate(@Param("orderNo") String orderNo, @Param("fromDate") LocalDate fromDate, @Param("toDate") LocalDate toDate);
	
	@Query(value = "SELECT SUM(NBAG) FROM tblFPPack WHERE POrder =:orderNo", nativeQuery = true)
	BigDecimal packedQtyInBags(@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT SUM(NOC) FROM tblFPPack WHERE POrder =:orderNo", nativeQuery = true)
	BigDecimal packedQtyInBoxes(@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT DISTINCT PackDt AS packdate FROM tblFPPack WHERE POrder =:orderNo AND NCB=:noc", nativeQuery = true)
	Date productionDetailsDatencb(@Param("orderNo") String orderNo, @Param("noc") BigDecimal noc);
	
	@Query(value = "SELECT DISTINCT PackDt AS packdate FROM tblFPPack WHERE POrder =:orderNo AND NOC=:noc", nativeQuery = true)
	Date productionDetailsDatenoc(@Param("orderNo") String orderNo, @Param("noc") BigDecimal noc);
	
	@Query(value = "SELECT * FROM precot.PUNCHING_BMR_PROD_DETAILS WHERE BATCH_NO=:batchNo", nativeQuery = true)
	PunchingBmrProductionDetails fetchProductionByBatch(@Param("batchNo") String batchNo);
	
	@Modifying
    @Transactional
    @Query(value="UPDATE tblFPPack SET batchNo=:batchNo WHERE POrder=:orderNo AND MCN=:machineName", nativeQuery = true)
	int updateBatchNoByOrderNoAndMachineName(String batchNo, String orderNo, String machineName);
	
	// PRODUCT RECONILLATION
		@Query(value = "SELECT SUM(RNwt) AS InputQuantity FROM tblRCons WHERE POrder=:order AND ConsDt BETWEEN :fromdate AND :todate", nativeQuery = true)
		BigDecimal inputQuantity(@Param("order") String order, @Param("fromdate") String fromdate, @Param("todate") String todate);

		@Query(value = "SELECT O.POrder, O.Material, P.bwgt, F.NOC FROM tblOrderInfo O JOIN tblProduct P ON O.Material = P.Product JOIN tblFPPack F ON O.POrder = F.POrder WHERE O.POrder=:orderNo AND CMon BETWEEN :fromdate AND :todate", nativeQuery = true)
		List<Object[]> outputQuantityQuery(@Param("orderNo") String orderNo, @Param("fromdate") String fromdate, @Param("todate") String todate);

	@Query(value = "SELECT DISTINCT NEXT_BATCH FROM precot.PUNCHING_BMR_PROD_DETAILS WHERE PO_STATUS = 'OPEN' AND NEXT_BATCH IS NOT NULL", nativeQuery = true)
		List<String> fetchOpenBatches();
	
	
	/**
	 * TRACEABILITY
	 */
	
	@Query(value = "SELECT POrder FROM tblFPPack WHERE PackDt=:manDate", nativeQuery = true)
	List<String> getProductionDetailsByOrder(@Param("manDate") String manDate);
	
	
	@Query(value = "SELECT Material AS material, MixDesc AS description, PatternDesc AS pattern, SaleOrder AS saleOrder, SOItem AS soitem, PONo AS poNumber FROM tblOrderInfo WHERE POrder=:orderNo", nativeQuery = true)
	List<Object[]> productionDetailsByorder(@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT DISTINCT batchNo FROM tblFPPack tf WHERE tf.POrder IN \r\n"
			+ "(SELECT toi.POrder FROM tblOrderInfo toi INNER JOIN tblProduct tp ON toi.Material = tp.Product)\r\n"
			+ "AND tf.PackDt =:manDate", nativeQuery = true)
	List<String> getBatchNoforTraceParameters(@Param("manDate") String manDate);
	
	@Query(value = "SELECT DISTINCT tf.batchNo FROM tblFPPack tf " +
            "WHERE tf.POrder IN (" +
            "    SELECT toi.POrder FROM tblOrderInfo toi " +
            "    INNER JOIN tblProduct tp ON toi.Material = tp.Product " +
            "    WHERE (:product IS NULL OR tp.Product = :product)" +
            ") " +
            "AND tf.PackDt = :manDate", 
    nativeQuery = true)
	List<String> getBatchNoforTraceParameters(@Param("manDate") String manDate, @Param("product") String product);


	
	@Query(value = "SELECT DISTINCT tf.POrder FROM tblFPPack tf " +
            "WHERE tf.POrder IN (" +
            "    SELECT toi.POrder FROM tblOrderInfo toi " +
            "    INNER JOIN tblProduct tp ON toi.Material = tp.Product " +
            "    WHERE (:product IS NULL OR tp.Product = :product)" +
            ") " +
            "AND tf.PackDt = :manDate", 
    nativeQuery = true)
List<String> getOrderNoforTraceParameters(@Param("manDate") String manDate, @Param("product") String product);

	
	
	@Query(value = "SELECT Material AS material, MixDesc AS mixDescription, PatternDesc AS pattern, gsm AS gsm, SaleOrder AS saleOrder, SOItem AS soitem, PONo AS poNumber, CustomerPO AS customerPO, POrder AS orderNo FROM tblOrderInfo WHERE POrder=:orderNo", nativeQuery = true)
	List<Object[]> getProductionDetailsByOrderInfo(@Param("orderNo") String orderNo);
	
	
		// FOR MACHINE LIST
	
	@Query(value = "SELECT tf.NBAG,(tf.NBAG * tp.bwgt), MCN\r\n"
			+ "FROM tblFPPack tf\r\n"
			+ "INNER JOIN tblOrderInfo toi ON tf.POrder = toi.POrder\r\n"
			+ "INNER JOIN tblProduct tp ON toi.Material = tp.Product\r\n"
			+ "WHERE tf.PackDt =:packdate AND tf.POrder =:orderNo", nativeQuery = true)
	List<Object[]> machinesList(@Param("packdate") String packdate, @Param("orderNo") String orderNo);
	
	
	@Query(value = "SELECT tf.NBAG,(tf.NBAG * tp.bwgt), MCN\r\n"
			+ "FROM tblFPPack tf\r\n"
			+ "INNER JOIN tblOrderInfo toi ON tf.POrder = toi.POrder\r\n"
			+ "INNER JOIN tblProduct tp ON toi.Material = tp.Product\r\n"
			+ "WHERE tf.POrder =:orderNo", nativeQuery = true)
	List<Object[]> machinesListByOrder(@Param("orderNo") String orderNo);
	
		// ROLL CONSUMPTION
	
	@Query(value = "SELECT BaleNo AS baleNumber, ConsDt AS prodDate, RNWt AS netWeight, ShiftId AS shiftId FROM tblRCons WHERE POrder=:orderNo", nativeQuery = true)
	List<Object[]> fetchSpulanceByOrder(@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT ShaftID AS shaftNo FROM tblRGoods WHERE BaleNo=:baleNo", nativeQuery = true)
	List<String> fetchDetailsByBale(@Param("baleNo") String baleNo);
	
	
	@Query(value = "SELECT \r\n"
			+ "    rc.BaleNo AS baleNumber, \r\n"
			+ "    rc.ConsDt AS prodDate, \r\n"
			+ "    rc.RNWt AS netWeight, \r\n"
			+ "    rc.ShiftId AS shiftId, \r\n"
			+ "    rg.Shaftno \r\n"
			+ "FROM \r\n"
			+ "    tblRCons rc\r\n"
			+ "JOIN \r\n"
			+ "    tblRGoods rg ON rc.BaleNo = rg.BaleNo\r\n"
			+ "WHERE \r\n"
			+ "    rc.POrder =:order AND PackYear = YEAR(GETDATE())"
			+ "", nativeQuery = true)
	List<Object[]> fetchProductionDetailsSplByOrder(@Param("order") String order);
	
	@Query(value = "SELECT BaleNo AS bale, NetWt AS netWeight FROM tblBCons WHERE POrder=:order", nativeQuery = true)
	List<Map<String, Object>> baleByOrder(@Param("order") String order);
	
	
		// FOR SALE ORDER, SALE ORDER ITEM, PRODUCT
	
	
	@Query(value = "SELECT DISTINCT O.SaleOrder AS saleOrder, \r\n"
			+ "    O.SOitem AS item,  \r\n"
			+ "    O.POrder AS orderNo,\r\n"
			+ "    O.Qty AS quantity,\r\n"
			+ "    P.Bags AS bags, \r\n"
			+ "    O.PONo AS poNumber,\r\n"
			+ "    O.Material AS material, \r\n"
			+ "    O.CustomerPO AS customer, \r\n"
			+ "	   P.ProdDesc AS productDescription, \r\n"
			+ "    P.edge AS edge, \r\n"
			+ "	   O.Pattern AS pattern, \r\n"
			+ "    O.gsm AS gsm, \r\n"
			+ "	   FP.batchNo AS batchNo, \r\n"
			+ "    P.Product AS product \r\n"
			+ "    FROM \r\n"
			+ "    tblOrderInfo O \r\n"
			+ "JOIN \r\n"
			+ "    tblProduct P ON O.Material = P.Product\r\n"
			+ "LEFT JOIN \r\n"
			+ "    TblFPPack FP ON O.POrder = FP.POrder "
			+ "WHERE \r\n"
			+ "    O.sts = 1 \r\n"
			+ "    AND P.Cat = 'Pads'\r\n"
			+ "    AND O.SaleOrder=:saleOrder"
			+ "	   AND O.SOitem =:item\r\n"
			+ "    AND P.Product =:product\r\n"
			+ "GROUP BY \r\n"
			+ "    O.SaleOrder, \r\n"
			+ "    O.SOitem,  \r\n"
			+ "    O.POrder,\r\n"
			+ "    O.Qty,\r\n"
			+ "    P.Bags, \r\n"
			+ "    O.PONo,\r\n"
			+ "    O.Material, \r\n"
			+ "	   O.CustomerPO, \r\n"
			+ "    P.Product, \r\n"
			+ "    P.ProdDesc, \r\n"
			+ "    P.edge, \r\n"
			+ "    O.Pattern, \r\n"
			+ "    O.gsm, \r\n"
			+ "    P.bwgt,\r\n"
			+ "	   FP.batchno, \r\n"
			+ "    fp.PackDt;", nativeQuery = true)
	List<Map<String, Object>> getProductionResponseBySaleOrderItem(@Param("saleOrder") String saleOrder, @Param("item") String item, @Param("product") String product);
	
	
	
		// FETCH MAN DATE
	
	@Query(value = "SELECT " +
	        "    O.SaleOrder AS saleOrder, " +
	        "    O.SOitem AS item,  " +
	        "    O.POrder AS orderNo, " +
	        "    O.Qty AS quantity, " +
	        "    P.Bags AS totalBags, " +
	        "    O.PONo AS poNumber, " +
	        "    O.Material AS material, " +
	        "    P.Product AS product, " +
	        "    P.Cat AS category, " +
	        "    FP.MCN AS machine, " +
	        "    DATEDIFF(day, DATEFROMPARTS(YEAR(FP.PackDt), 1, 1), FP.PackDt) AS julianDay, " +
	        "    FP.ShiftID AS shift, " +
	        "    SUM(FP.NBAG) AS totalPackedBags, " +
	        "    SUM(FP.NBAG * P.bwgt) AS weight " +
	        "FROM " +
	        "    tblOrderInfo O " +
	        "JOIN " +
	        "    tblProduct P ON O.Material = P.Product " +
	        "LEFT JOIN " +
	        "    TblFPPack FP ON O.POrder = FP.POrder " +
	        "WHERE " +
	        "    O.sts = 1 " +
	        "    AND P.Cat = 'Pads' " +
	        "    AND FP.PackDt = :manDate " +
	        "    AND P.Product = :product " +
	        "GROUP BY " +
	        "    O.SaleOrder, " +
	        "    O.SOitem, " +
	        "    O.POrder, " +
	        "    O.Qty, " +
	        "    P.Bags, " +
	        "    O.PONo, " +
	        "    O.Material, " +
	        "    FP.MCN, " +
	        "    P.Product, " +
	        "    FP.ShiftID, "
	        + "  FP.PackDt," +
	        "    P.Cat;", nativeQuery = true)
	List<Map<String, Object>> getProductionResponsebymANDAte(@Param("manDate") String manDate, @Param("product") String product);
	
	
		// FETCH BY JULIAN DATE
	
	
	@Query(value = "SELECT DATEADD(day,:julianday - 1, DATEFROMPARTS(:packYear, 1, 1)) AS dayOfYear;", nativeQuery = true)
	String convertDateFromJulian(Long packYear, Long julianday);
	
	
	// FETCH MAN DATE
	
		@Query(value = "SELECT " +
		        "    O.SaleOrder AS saleOrder, " +
		        "    O.SOitem AS item,  " +
		        "    O.POrder AS orderNo, " +
		        "    O.Qty AS quantity, " +
		        "    P.Bags AS totalBags, " +
		        "    O.PONo AS poNumber, " +
		        "    O.Material AS material, " +
		        "    P.Product AS product, " +
		        "    P.Cat AS category, " +
		        "    FP.MCN AS machine, " +
		        "    DATEDIFF(day, DATEFROMPARTS(YEAR(FP.PackDt), 1, 1), FP.PackDt) AS julianDay, " +
		        "    FP.ShiftID AS shift, " +
		        "    SUM(FP.NBAG) AS totalPackedBags, " +
		        "    SUM(FP.NBAG * P.bwgt) AS weight " +
		        "FROM " +
		        "    tblOrderInfo O " +
		        "JOIN " +
		        "    tblProduct P ON O.Material = P.Product " +
		        "LEFT JOIN " +
		        "    TblFPPack FP ON O.POrder = FP.POrder " +
		        "WHERE " +
		        "    O.sts = 1 " +
		        "    AND P.Cat = 'Pads' " +
		        "    AND FP.PackDt = :manDate " +
		        "    AND FP.ShiftId =:shiftId " +
		        "    AND P.Product = :product " +
		        "GROUP BY " +
		        "    O.SaleOrder, " +
		        "    O.SOitem, " +
		        "    O.POrder, " +
		        "    O.Qty, " +
		        "    P.Bags, " +
		        "    O.PONo, " +
		        "    O.Material, " +
		        "    FP.MCN, " +
		        "    P.Product, " +
		        "    FP.ShiftID, "
		        + "  FP.PackDt," +
		        "    P.Cat;", nativeQuery = true)
		List<Map<String, Object>> getProductionResponsebyJulian(@Param("manDate") String manDate, @Param("shiftId") Long shiftId, @Param("product") String product);
	
	
	
		// FOR MACHINE LIST
	
	@Query(value = "SELECT R.BaleNo AS rollNo, R.ConsDt AS prodDate, R.shiftId AS shiftId, G.ShaftNo AS shaftNo, R.RNWt AS netWeight FROM tblRCons R JOIN tblRGoods G ON R.BaleNo=G.BaleNo WHERE R.POrder=:orderNo", nativeQuery = true)
	List<Map<String, Object>> fetchRollConsumptionByOrder(@Param("orderNo") String orderNo);
	
	
	@Query(value = "SELECT BaleNo AS bale, NetWt AS netWeight FROM tblBCons WHERE POrder=:order AND ConsDt =:date", nativeQuery = true)
	List<Map<String, Object>> baleByOrder(@Param("order") String order, @Param("date") String date);
	
	@Query(value = "SELECT BaleNo AS bale FROM tblBCons WHERE POrder=:order AND ConsDt =:date", nativeQuery = true)
	List<String> baleNoByOrder(@Param("order") String order, @Param("date") String date);
	
	@Query(value = "SELECT BatchNo AS batch, bmr_no AS bmrNumber FROM tblBalePack WHERE BaleNo IN (:baleNumbers)", nativeQuery = true)
	List<Map<String, Object>> fetchBatchByBales(@Param("baleNumbers") List<String> baleNumbers);
	
	
	@Query(value = "SELECT BatchNo AS batch, bmr_no AS bmrNumber, NetWt AS netWeight FROM tblBalePack WHERE BaleNo=:baleNumber", nativeQuery = true)
	List<Map<String, Object>> fetchBatchByBale(@Param("baleNumber") String baleNumber);
	
	@Query(value = "SELECT BaleNo AS bale, NetWt AS netWeight FROM tblBCons WHERE POrder=:order", nativeQuery = true)
	List<Map<String, Object>> baleByOrderOnly(@Param("order") String order);
	
	
	
		// CR 
	
	@Query(value="SELECT tci.Bas_Mat \r\n"
			+ "FROM tblOrderInfo toi\r\n"
			+ "INNER JOIN tblProduct tp ON toi.Material = tp.Product\r\n"
			+ "INNER JOIN tblCusInfo tci ON toi.Material = tci.Material\r\n"
			+ "WHERE tp.Cat = 'Pads'\r\n"
			+ "  AND toi.POrder =:orderNumber", nativeQuery = true)
	String getProductCode(@Param("orderNumber") String orderNumber);
	
	
		/**
		 * TRACE ABILTY - DRY GOODS 
		 */
		
	
	
	// FOR SALE ORDER, SALE ORDER ITEM, PRODUCT
	
	
		@Query(value = "SELECT \r\n"
				+ "    O.SaleOrder AS saleOrder, \r\n"
				+ "    O.SOitem AS item,  \r\n"
				+ "    O.POrder AS orderNo,\r\n"
				+ "    O.Qty AS quantity,\r\n"
				+ "    P.Bags AS totalBags,\r\n"
				+ "    O.PONo AS poNumber,\r\n"
				+ "    O.Material AS material, \r\n"
				+ "    P.Product AS product,\r\n"
				+ "    P.Cat AS category,\r\n"
				+ "    FP.MCN AS machine, \r\n"
				+ "    DATEDIFF(day, DATEFROMPARTS(YEAR(FP.PackDt), 1, 1), FP.PackDt) AS julianDay, \r\n"
				+ "    SUM(fp.NBAG) AS totalPackedBags,\r\n"
				+ "    SUM(fp.NBAG * P.bwgt) AS weight\r\n"
				+ "FROM \r\n"
				+ "    tblOrderInfo O \r\n"
				+ "JOIN \r\n"
				+ "    tblProduct P ON O.Material = P.Product\r\n"
				+ "LEFT JOIN \r\n"
				+ "    TblFPPack FP ON O.POrder = FP.POrder \r\n"
				+ "WHERE \r\n"
				+ "    O.sts = 1 \r\n"
				+ "    AND P.Cat = 'Balls'\r\n"
				+ "    AND O.SaleOrder =:saleOrder\r\n"
				+ "    AND O.SOitem =:item\r\n"
				+ "    AND P.Product =:product\r\n"
				+ "GROUP BY \r\n"
				+ "    O.SaleOrder, \r\n"
				+ "    O.SOitem,  \r\n"
				+ "    O.POrder,\r\n"
				+ "    O.Qty,\r\n"
				+ "    P.Bags, \r\n"
				+ "    O.PONo,\r\n"
				+ "    O.Material, \r\n"
				+ "	   FP.MCN, \r\n"
				+ "    P.Product,\r\n"
				+ "    P.Cat;", nativeQuery = true)
		List<Map<String, Object>> getProductionResponseBySaleOrderItemDryGoods(@Param("saleOrder") String saleOrder, @Param("item") String item, @Param("product") String product);
	
	
		
		// MAN DATE
		
		@Query(value = "SELECT \r\n"
				+ "    O.SaleOrder AS saleOrder, \r\n"
				+ "    O.SOitem AS item,  \r\n"
				+ "    O.POrder AS orderNo,\r\n"
				+ "    O.Qty AS quantity,\r\n"
				+ "    P.Bags AS totalBags,\r\n"
				+ "    O.PONo AS poNumber,\r\n"
				+ "    O.Material AS material, \r\n"
				+ "    P.Product AS product,\r\n"
				+ "    P.Cat AS category,\r\n"
				+ "    FP.MCN AS machine, \r\n"
				+ "    DATEDIFF(day, DATEFROMPARTS(YEAR(FP.PackDt), 1, 1), FP.PackDt) AS julianDay, \r\n"
				+ "    SUM(fp.NBAG) AS totalPackedBags,\r\n"
				+ "    SUM(fp.NBAG * P.bwgt) AS weight\r\n"
				+ "FROM \r\n"
				+ "    tblOrderInfo O \r\n"
				+ "JOIN \r\n"
				+ "    tblProduct P ON O.Material = P.Product\r\n"
				+ "LEFT JOIN \r\n"
				+ "    TblFPPack FP ON O.POrder = FP.POrder \r\n"
				+ "WHERE \r\n"
				+ "    O.sts = 1 \r\n"
				+ "    AND P.Cat = 'Balls'\r\n"
				+ "    AND FP.PackDt = :manDate\r\n"
				+ "    AND P.Product =:product\r\n"
				+ "GROUP BY \r\n"
				+ "    O.SaleOrder, \r\n"
				+ "    O.SOitem,  \r\n"
				+ "    O.POrder,\r\n"
				+ "    O.Qty,\r\n"
				+ "    P.Bags, \r\n"
				+ "    O.PONo,\r\n"
				+ "    O.Material, \r\n"
				+ "	   FP.MCN, \r\n"
				+ "    P.Product,\r\n"
				+ "    P.Cat;", nativeQuery = true)
		List<Map<String, Object>> getProductionResponseByManDateDryGoods(@Param("manDate") String manDate, @Param("product") String product);
		
		// JULIAN DATE
		
		@Query(value = "SELECT \r\n" + "    O.SaleOrder AS saleOrder, \r\n" + "    O.SOitem AS item,  \r\n"
				+ "    O.POrder AS orderNo,\r\n" + "    O.Qty AS quantity,\r\n" + "    P.Bags AS totalBags,\r\n"
				+ "    O.PONo AS poNumber,\r\n" + "    O.Material AS material, \r\n" + "    P.Product AS product,\r\n"
				+ "    P.Cat AS category,\r\n" + "    FP.MCN AS machine, \r\n"
				+ "    DATEDIFF(day, DATEFROMPARTS(YEAR(FP.PackDt), 1, 1), FP.PackDt) AS julianDay, \r\n"
				+ "    SUM(fp.NBAG) AS totalPackedBags,\r\n" + "    SUM(fp.NBAG * P.bwgt) AS weight\r\n" + "FROM \r\n"
				+ "    tblOrderInfo O \r\n" + "JOIN \r\n" + "    tblProduct P ON O.Material = P.Product\r\n"
				+ "LEFT JOIN \r\n" + "    TblFPPack FP ON O.POrder = FP.POrder \r\n" + "WHERE \r\n"
				+ "    O.sts = 1 \r\n" + "    AND P.Cat = 'Balls'\r\n" + "    AND FP.PackDt = :manDate\r\n"
				+ "    AND P.Product =:product\r\n AND FP.ShiftID=:shiftId" + "GROUP BY \r\n" + "    O.SaleOrder, \r\n" + "    O.SOitem,  \r\n"
				+ "    O.POrder,\r\n" + "    O.Qty,\r\n" + "    P.Bags, \r\n" + "    O.PONo,\r\n"
				+ "    O.Material, \r\n" + "	   FP.MCN, \r\n" + "    P.Product,\r\n"
				+ "    P.Cat;", nativeQuery = true)
		List<Map<String, Object>> getProductionResponseByJulianDryGoods(@Param("manDate") String manDate, @Param("shiftId") Long shiftId,
				@Param("product") String product);
		
		// SLIVER MAKING - QUERY
		
		@Query(value = "SELECT H.ORDER_NO AS orderNo, H.STD_WT AS standard, L.CAN_NO AS canNumber, L.NET_WT AS netWeight FROM precot.DRYGOODS_SLIVER_MAKING H INNER JOIN precot.DRYGOODS_SLIVER_MAKING_LINE_02 L ON L.SLIVER_ID = H.SLIVER_ID WHERE H.ORDER_NO=:orderNo", nativeQuery = true)
		List<Map<String, Object>> sliverMakingDetails(@Param("orderNo") String orderNo);
	
		
		// AB COTTON 
		
		@Query(value = "SELECT BaleNo AS bale, NetWt AS netWeight FROM tblBCons WHERE POrder=:order AND BaleNo LIKE 'B%'", nativeQuery = true)
		List<Map<String, Object>> bleachBaleByOrder(@Param("order") String order);
		
		@Query(value = "SELECT BATCH_NO FROM PDE.precot.PUNCHING_BMR_PROD_DETAILS", nativeQuery = true)
	    List<String> findAllByBatchNo();
		
}
