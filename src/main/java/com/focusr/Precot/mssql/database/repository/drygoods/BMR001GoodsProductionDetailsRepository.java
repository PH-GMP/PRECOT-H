package com.focusr.Precot.mssql.database.repository.drygoods;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.drygoods.BMR001GoodsProductionDetails;

public interface BMR001GoodsProductionDetailsRepository extends JpaRepository<BMR001GoodsProductionDetails, Long> {

	@Query(value = "SELECT * FROM precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-004'", nativeQuery = true)
	List<BMR001GoodsProductionDetails> getDetails(@Param("batch_no") String batch_no);

	@Query(value = "SELECT * FROM precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-007'", nativeQuery = true)
	List<BMR001GoodsProductionDetails> getDetailscp(@Param("batch_no") String batch_no);

	@Query(value = "SELECT * FROM precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS WHERE BATCH_NO=:order", nativeQuery = true)
	List<BMR001GoodsProductionDetails> productionDetailsByOrder(@Param("order") String order);

	@Query(value = "SELECT PO_COMP_STATUS FROM precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS WHERE BATCH_NO=:batchNo", nativeQuery = true)
	Optional<String> productionDetailsByBatchNo(@Param("batchNo") String batchNo);

	@Query(value = "SELECT STATUS FROM precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS WHERE BATCH_NO=:batchNo", nativeQuery = true)
	Optional<String> supproductionDetailsByBatchNo(@Param("batchNo") String batchNo);

	// COTTON BALL BMR

	@Query(value = "SELECT SUM(CAST(ON_DATE_BOX AS DECIMAL(10, 2))) FROM precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS WHERE BATCH_NO LIKE CONCAT(:prefix, '-%') AND FORM_NO ='PH-PRD04/F-004'", nativeQuery = true)
	BigDecimal soFarPackQtyBoxCottonBall(@Param("prefix") String prefix);

	@Query(value = "SELECT SUM(CAST(ON_DATE_PACK AS DECIMAL(10, 2))) FROM precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS WHERE BATCH_NO LIKE CONCAT(:prefix, '-%') AND FORM_NO ='PH-PRD04/F-004'", nativeQuery = true)
	BigDecimal soFarPackQtyBagCottonBall(@Param("prefix") String prefix);

	// PLEAT BMR

	@Query(value = "SELECT SUM(CAST(ON_DATE_BOX AS DECIMAL(10, 2))) FROM precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS WHERE BATCH_NO LIKE CONCAT(:prefix, '-%') AND FORM_NO ='PH-PRD04/F-007'", nativeQuery = true)
	BigDecimal soFarPackQtyBoxPleat(@Param("prefix") String prefix);

	@Query(value = "SELECT SUM(CAST(ON_DATE_PACK AS DECIMAL(10, 2))) FROM precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS WHERE BATCH_NO LIKE CONCAT(:prefix, '-%') AND FORM_NO ='PH-PRD04/F-007'", nativeQuery = true)
	BigDecimal soFarPackQtyBagPleat(@Param("prefix") String prefix);

	// WOOL BALL BMR

	@Query(value = "SELECT SUM(CAST(ON_DATE_BOX AS DECIMAL(10, 2))) FROM precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS WHERE BATCH_NO LIKE CONCAT(:prefix, '-%') AND FORM_NO ='PH-PRD04/F-007'", nativeQuery = true)
	BigDecimal soFarPackQtyBoxWool(@Param("prefix") String prefix);

	@Query(value = "SELECT SUM(CAST(ON_DATE_PACK AS DECIMAL(10, 2))) FROM precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS WHERE BATCH_NO LIKE CONCAT(:prefix, '-%') AND FORM_NO ='PH-PRD04/F-007'", nativeQuery = true)
	BigDecimal soFarPackQtyBagWool(@Param("prefix") String prefix);

	/**
	 * SAP QUERY
	 * 
	 * @return
	 */

	@Query(value = "SELECT  O.SaleOrder AS saleOrder, O.SOitem AS saleOrderItem, O.POrder AS orderNumber,O.Qty AS quantity,P.Bags AS bags, O.PONo AS poNumber,O.Material AS material, P.ProdDesc AS productionDescription, \r\n"
			+ "P.bwgt AS bagWeight FROM tblOrderInfo O JOIN tblProduct P ON O.Material = P.Product WHERE O.sts = 1 AND P.Cat = 'Balls'", nativeQuery = true)
	List<Object[]> productionDetailsResponse();

	@Query(value = "SELECT DISTINCT CONCAT(O.SaleOrder, O.SOitem, '-1') AS batchNo FROM tblOrderInfo O JOIN tblProduct P ON O.Material = P.Product WHERE O.sts = 1 AND P.Cat = 'Balls'", nativeQuery = true)
	List<String> productionDetailsBatchNumber();

	// add new siva

	@Query(value = "SELECT DISTINCT NEXT_BATCH FROM precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS WHERE PO_COMP_STATUS = 'OPEN' AND NEXT_BATCH IS NOT NULL AND FORM_NO ='PH-PRD04/F-004'", nativeQuery = true)
	List<String> fetchOpenBatchesform4();

	@Query(value = "SELECT DISTINCT NEXT_BATCH FROM precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS WHERE PO_COMP_STATUS = 'OPEN' AND NEXT_BATCH IS NOT NULL AND FORM_NO ='PH-PRD04/F-007'", nativeQuery = true)
	List<String> fetchOpenBatchesform7();

	@Query(value = "SELECT DISTINCT NEXT_BATCH FROM precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS WHERE PO_COMP_STATUS = 'OPEN' AND NEXT_BATCH IS NOT NULL AND FORM_NO ='PH-PRD04/F-008'", nativeQuery = true)
	List<String> fetchOpenBatchesform8();

	@Query(value = "SELECT DISTINCT CONCAT(O.SaleOrder, O.SOitem, '-1') AS batchNo FROM tblOrderInfo O JOIN tblProduct P ON O.Material = P.Product WHERE O.sts = 1 AND P.Cat = 'Pleats' AND O.Material NOT LIKE 'AB%'", nativeQuery = true)
	List<String> productionDetailsBatchNumberpleat();

	@Query(value = "SELECT DISTINCT CONCAT(O.SaleOrder, O.SOitem, '-1')\r\n"
			+ "AS batchNo FROM [PDE].[dbo].[tblOrderInfo] O\r\n"
			+ "JOIN [PDE].[dbo].[tblProduct] P ON O.Material = P.Product WHERE O.sts = 1 AND  P.Cat = 'Wool roll' ;", nativeQuery = true)
	List<String> productionDetailsBatchNumberWoolRoll();

	@Query(value = "SELECT POrder FROM tblOrderInfo WHERE CONCAT(SaleOrder, SOitem)=:batchNo", nativeQuery = true)
	List<String> getOrderByBatchNo(@Param("batchNo") String batchNo);

	@Query(value = "SELECT  O.SaleOrder AS saleOrder, O.SOitem AS saleOrderItem, O.POrder AS orderNumber,O.Qty AS quantity,P.Bags AS bags, O.PONo AS poNumber,O.Material AS material,P.Product AS productCode,P.ProdDesc AS productionDescription, \r\n"
			+ "P.bwgt AS bagWeight FROM tblOrderInfo O JOIN tblProduct P ON O.Material = P.Product WHERE O.sts = 1 AND P.Cat = 'Balls' AND CONCAT(O.SaleOrder, O.SOitem)=:batchNo AND O.POrder=:orderNo", nativeQuery = true)
	List<Object[]> productionResponseByBatchOrder(@Param("batchNo") String batchNo, @Param("orderNo") String orderNo);

	@Query(value = "SELECT SUM(NBAG) FROM tblFPPack WHERE POrder =:orderNo AND PackDt BETWEEN :fromDate AND :toDate", nativeQuery = true)
	BigDecimal productionBagsOnDate(@Param("orderNo") String orderNo, @Param("fromDate") LocalDate fromDate,
			@Param("toDate") LocalDate toDate);

	@Query(value = "SELECT SUM(NOC) FROM tblFPPack WHERE POrder =:orderNo AND PackDt BETWEEN :fromDate AND :toDate", nativeQuery = true)
	BigDecimal productionBagNocOnDate(@Param("orderNo") String orderNo, @Param("fromDate") LocalDate fromDate,
			@Param("toDate") LocalDate toDate);

	@Query(value = "SELECT SUM(NBAG) FROM tblFPPack WHERE POrder =:orderNo", nativeQuery = true)
	BigDecimal packedQtyInBags(@Param("orderNo") String orderNo);

	@Query(value = "SELECT SUM(NOC) FROM tblFPPack WHERE POrder =:orderNo", nativeQuery = true)
	BigDecimal packedQtyInBoxes(@Param("orderNo") String orderNo);

	// pleat

	@Query(value = "SELECT  O.SaleOrder AS saleOrder, O.SOitem AS saleOrderItem, O.POrder AS orderNumber,O.Qty AS quantity,P.Bags AS bags, O.PONo AS poNumber,O.Material AS material,P.Product AS productCode,P.ProdDesc AS productionDescription, \r\n"
			+ "P.bwgt AS bagWeight FROM tblOrderInfo O JOIN tblProduct P ON O.Material = P.Product WHERE O.sts = 1 AND P.Cat = 'Pleats' AND O.MATERIAL NOT LIKE'AB%' AND CONCAT(O.SaleOrder, O.SOitem)=:batchNo AND O.POrder=:orderNo", nativeQuery = true)
	List<Object[]> productionResponseByBatchOrderPleat(@Param("batchNo") String batchNo,
			@Param("orderNo") String orderNo);

	// woll

	@Query(value = "SELECT  O.SaleOrder AS saleOrder, O.SOitem AS saleOrderItem, O.POrder AS orderNumber,O.Qty AS quantity,P.Bags AS bags, O.PONo AS poNumber,O.Material AS material,P.Product AS productCode,P.ProdDesc AS productionDescription, \r\n"
			+ "P.bwgt AS bagWeight FROM tblOrderInfo O JOIN tblProduct P ON O.Material = P.Product WHERE O.sts = 1 AND P.Cat = 'Wool roll'  AND CONCAT(O.SaleOrder, O.SOitem)=:batchNo AND O.POrder=:orderNo", nativeQuery = true)
	List<Object[]> productionResponseByBatchOrderWool(@Param("batchNo") String batchNo,
			@Param("orderNo") String orderNo);

	// PRODUCT RECONILLATION

	@Query(value = "SELECT SUM(RNwt) AS InputQuantity FROM tblRCons WHERE POrder=:order AND ConsDt BETWEEN :fromdate AND :todate", nativeQuery = true)
	BigDecimal inputQuantity(@Param("order") String order, @Param("fromdate") String fromdate,
			@Param("todate") String todate);

	@Query(value = "SELECT O.POrder, O.Material, P.bwgt, F.NBAG FROM tblOrderInfo O JOIN tblProduct P ON O.Material = P.Product JOIN tblFPPack F ON O.POrder = F.POrder WHERE O.POrder=:orderNo AND f.PackDt BETWEEN :fromdate AND :todate", nativeQuery = true)
	List<Object[]> outputQuantityQuery(@Param("orderNo") String orderNo, @Param("fromdate") String fromdate,
			@Param("todate") String todate);

	// Vijay

	@Query(value = "SELECT * FROM precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-008'", nativeQuery = true)
	List<BMR001GoodsProductionDetails> GetProductionDetailsWool(@Param("batch_no") String batch_no);

	// jawahar

	@Query(value = "SELECT DISTINCT PackDt AS packdate FROM tblFPPack WHERE POrder =:orderNo AND NCB=:noc", nativeQuery = true)
	Date productionDetailsDatencb(@Param("orderNo") String orderNo, @Param("noc") BigDecimal noc);

	@Query(value = "SELECT DISTINCT PackDt AS packdate FROM tblFPPack WHERE POrder =:orderNo AND NOC=:noc", nativeQuery = true)
	Date productionDetailsDatenoc(@Param("orderNo") String orderNo, @Param("noc") BigDecimal noc);

	@Query(value = "SELECT NBAG AS bagPackQty, NOC AS boxPackQt FROM tblFPPack WHERE POrder =:orderNo", nativeQuery = true)
	List<Object[]> productionResponseByOrder2(@Param("orderNo") String orderNo);

	//

	@Query(value = "SELECT DISTINCT O.Qty ,(O.Qty/P.bags) AS PO_BOX FROM tblOrderInfo O \r\n"
			+ "JOIN tblProduct P ON O.Material = P.Product \r\n"
			+ "JOIN tblFPPack F ON O.POrder = F.POrder WHERE O.POrder =:orderNo", nativeQuery = true)
	List<Object[]> productionResponseQty(@Param("orderNo") String orderNo);

	@Query(value = "SELECT PackDt AS packdate, ShiftID AS shift, SType AS type, MCN AS machine, FTime AS fromTime, TTime AS toTime, SCause AS remarks, TotHrs AS totalTime FROM tblSFng WHERE SType = 'Stop' AND MCN=:machine AND PackDt BETWEEN :fromdate AND :todate", nativeQuery = true)
	List<Object[]> stoppageResponse(@Param("fromdate") String fromdate, @Param("todate") String todate,
			@Param("machine") String machine);

	// New

	// 2.0 STOPPAGE

	@Query(value = "  WITH RunTimes AS (\r\n" + "    SELECT \r\n" + "        FTime AS RunFTime, \r\n"
			+ "        TTime AS RunTTime \r\n" + "    FROM \r\n" + "        [PDE].[dbo].[tblSFng] \r\n"
			+ "    WHERE \r\n" + "        (:order_no IS NULL OR POrder = :order_no) \r\n"
			+ "        AND (:fromdate IS NULL OR :todate IS NULL OR Packdt BETWEEN :fromdate AND :todate) \r\n"
			+ "        AND Stype = 'Run' \r\n" + "        AND (:machine_name IS NULL OR MCN = :machine_name)\r\n"
			+ ")\r\n" + "SELECT \r\n" + "    sm.SCAUSE, \r\n" + "    sm.FTime, \r\n" + "    sm.TTime, \r\n"
			+ "    sm.TotHrs \r\n" + "FROM \r\n" + "    [PDE].[dbo].[tblSFng] sm \r\n" + "JOIN \r\n"
			+ "    RunTimes rt \r\n" + "ON \r\n" + "    sm.FTime >= rt.RunFTime \r\n"
			+ "    AND sm.TTime <= rt.RunTTime \r\n" + "WHERE \r\n"
			+ "    (:fromdate IS NULL OR :todate IS NULL OR sm.Packdt BETWEEN :fromdate AND :todate) \r\n"
			+ "    AND sm.Stype IN ('Stop', 'F.Stop') \r\n"
			+ "    AND (:machine_name IS NULL OR sm.MCN = :machine_name)", nativeQuery = true)
	List<Object[]> fetchStoppagedetailsForF006(@Param("fromdate") String fromdate, @Param("todate") String todate,
			@Param("order_no") String order_no, @Param("machine_name") String machine_name);

	// 02. FLEECE RECEIPT

//	@Query(value = "SELECT \r\n"
//			+ "    R.BaleNo, \r\n"
//			+ "    R.RNWt, \r\n"
//			+ "    M.PGSM, \r\n"
//			+ "    M.Pwid \r\n"
//			+ "FROM \r\n"
//			+ "    [PDE].[dbo].[tblRCons] R \r\n"
//			+ "JOIN \r\n"
//			+ "    [PDE].[dbo].[tblMRGoods] M \r\n"
//			+ "ON \r\n"
//			+ "    R.BaleNo = M.BaleNo \r\n"
//			+ "WHERE \r\n"
//			+ "(:order_no IS NULL OR R.POrder = :order_no) \r\n"
//            + "(:fromdate IS NULL OR :todate IS NULL OR R.ConsDt BETWEEN :fromdate AND :todate) \r\n" , nativeQuery = true)
//	List<Object[]> fetchfleecetReceiptForF006(@Param("fromdate") String fromdate, @Param("todate") String todate,@Param("order_no") String order_no);

	@Query(value = "SELECT R.BaleNo,R.RNWt, M.PGSM,  M.Pwid  \r\n" + "	FROM   [PDE].[dbo].[tblRCons] R  \r\n"
			+ "	JOIN [PDE].[dbo].[tblMRGoods] M  \r\n" + "	ON  R.BaleNo = M.BaleNo  \r\n" + "	WHERE "
			+ " (:order_no IS NULL OR R.POrder = :order_no) AND (:fromdate IS NULL OR :todate IS NULL OR R.ConsDt BETWEEN :fromdate AND :todate)", nativeQuery = true)
	List<Object[]> fetchfleecetReceiptForF006(@Param("fromdate") String fromdate, @Param("todate") String todate,
			@Param("order_no") String order_no);

	// 0.2 HEADERS

	@Query(value = "SELECT O.Brand, O.Material, P.bags,P.bwgt,O.POrder FROM [PDE].[dbo].[TblOrderInfo] O JOIN\r\n"
			+ "[PDE].[dbo].[TblProduct] P ON O.Material = P.Product\r\n"
			+ "WHERE O.POrder = :orderNo", nativeQuery = true)
	List<Object[]> fetchheaderdetailsForF006(@Param("orderNo") String order_no);

	// COTTON BALL STOPPAGE DETAILS

	@Query(value = " WITH RunTimes AS (\r\n" + "    SELECT \r\n" + "        FTime AS RunFTime, \r\n"
			+ "        TTime AS RunTTime \r\n" + "    FROM \r\n" + "        [PDE].[dbo].[tblSFng] \r\n"
			+ "    WHERE \r\n" + "        (:order_no IS NULL OR POrder = :order_no) \r\n"
			+ "        AND (:date IS NULL OR Packdt = :date) \r\n" + "        AND Stype = 'Run' \r\n"
			+ "        AND (:machine_name IS NULL OR MCN = :machine_name)\r\n" + ")\r\n" + "SELECT \r\n"
			+ "    sm.SCAUSE, \r\n" + "    sm.FTime, \r\n" + "    sm.TTime, \r\n" + "    sm.TotHrs \r\n" + "FROM \r\n"
			+ "    [PDE].[dbo].[tblSFng] sm \r\n" + "JOIN \r\n" + "    RunTimes rt \r\n" + "ON \r\n"
			+ "    sm.FTime >= rt.RunFTime \r\n" + "    AND sm.TTime <= rt.RunTTime \r\n" + "WHERE \r\n"
//			+ "    (:date IS NULL OR sm.Packdt = :date) \r\n"
//			+ "    AND (:shift IS NULL OR sm.ShiftID = :shift) \r\n"
			+ "(:fromdate IS NULL OR :todate IS NULL OR sm.Packdt BETWEEN :fromdate AND :todate) \r\n"
			+ "AND sm.Stype IN ('Stop', 'F.Stop') \r\n"
			+ "AND (:machine_name IS NULL OR sm.MCN =:machine_name);\r\n", nativeQuery = true)
	List<Object[]> fetchStoppageF003(@Param("fromdate") String fromdate, @Param("todate") String todate,
			@Param("order_no") String order_no, @Param("machine_name") String machine_name);

	@Query(value = "SELECT BATCH_NO FROM PDE.precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS", nativeQuery = true)
	List<String> findAllByBatchNo();

	// Traceblity Siva

	@Query(value = "SELECT DATEADD(DAY, CAST(:julianDay AS INT) - 1, " + "DATEFROMPARTS("
			+ "CASE WHEN CAST(:yearLastTwoDigits AS INT) BETWEEN 0 AND 49 THEN 2000 + CAST(:yearLastTwoDigits AS INT) "
			+ "ELSE 1900 + CAST(:yearLastTwoDigits AS INT) END, 1, 1)) AS DateResult", nativeQuery = true)
	String getDateFromJulianDay(@Param("julianDay") String julianDay,
			@Param("yearLastTwoDigits") String yearLastTwoDigits);

	// G
	@Query(value = "select DISTINCT BATCH_NO as BatchNo from precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS WHERE :date BETWEEN START_DATE AND END_DATE AND FORM_NO ='PH-PRD04/F-007'", nativeQuery = true)
	List<Map<String, Object>> getBatchNo(@Param("date") String date);

	@Query(value = "select DISTINCT BATCH_NO as BatchNo from precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS WHERE :date BETWEEN START_DATE AND END_DATE AND FORM_NO ='PH-PRD04/F-008'", nativeQuery = true)
	List<Map<String, Object>> getBatchNoWoll(@Param("date") String date);
	
	@Query(value = "SELECT DISTINCT BATCH_NO as BatchNo FROM precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS WHERE :date BETWEEN START_DATE AND END_DATE AND FORM_NO  = 'PH-PRD04/F-004';", nativeQuery = true)
	List<Map<String, Object>> getBatchNoBalls(@Param("date") String date);

	// get by batch no

	@Query(value = "SELECT BATCH_NO, ORDER_NO, PROD_DESC, PO_QTY_BAG, PO_QTY_BOX, PO_NO, MACHINE_NO, START_DATE, END_DATE "
			+ "FROM precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS "
			+ "WHERE FORM_NO = :formNo AND BATCH_NO = :batchNo", nativeQuery = true)
	List<Object[]> getByBatchNo(@Param("formNo") String formNo, @Param("batchNo") String batchNo);

//		@Query(value = "select DISTINCT POrder from tblMRGoods WHERE BaleNo = :rollNo", nativeQuery = true)
//		String getPOrderByRollNo(@Param("rollNo") String rollNo);

	////

	@Query(value = "SELECT BaleNo FROM tblBCons tb WHERE  POrder = :Porder AND BaleNo LIKE 'B%'", nativeQuery = true)
	List<String> getBaleByOrder(@Param("Porder") String Porder);

	// Bmr And Net wt.
	@Query(value = "SELECT bmr_no , NetWt FROM tblBalePack WHERE BaleNo = :baleNo", nativeQuery = true)
	Map<String, Object> getBmrByBale(@Param("baleNo") String baleNo);

	// Laydown
	@Query(value = "SELECT LAYDOWN_NO FROM precot.BLEACH_BMR_LAYDOWN_MAPPING WHERE BMR_NO = :bmrNo", nativeQuery = true)
	String getLaydownByBmr(@Param("bmrNo") String bmrNo);

	// sub batch
	@Query(value = "SELECT CONCAT(START_SUB_BATCH, ',', END_SUB_BATCH) FROM precot.BMR_SUMMARY_PROD_DETAILS WHERE BMR_NO = :bmrNo", nativeQuery = true)
	List<String> getBatchByBmr(@Param("bmrNo") String bmrNo);

	// Laydown
	@Query(value = "SELECT DISTINCT Batchno FROM tblrm t WHERE laydownno = :laydownNo", nativeQuery = true)
	List<String> getRmBatchByLaydown(@Param("laydownNo") String laydownNo);
	
	
		// TRACEABILITY 
	
	
	@Query(value = "SELECT * FROM precot.BMR_DRYGOODS_01_PRODUCTION_DETAILS WHERE BATCH_NO=:batchNo AND FORM_NO  = 'PH-PRD04/F-004'", nativeQuery = true)
	BMR001GoodsProductionDetails productionDetailsByBatchNumber(@Param("batchNo") String batchNo);
	
	
	
	
		// GET CUSTOMER
	
	@Query(value="SELECT tci.CUST_NAME \r\n"
			+ "FROM tblOrderInfo toi\r\n"
			+ "INNER JOIN tblProduct tp ON toi.Material = tp.Product\r\n"
			+ "INNER JOIN tblCusInfo tci ON toi.Material = tci.Material\r\n"
			+ "WHERE toi.POrder =:orderNumber", nativeQuery = true)
	List<String> getProductCode(@Param("orderNumber") String orderNumber);
	

}
