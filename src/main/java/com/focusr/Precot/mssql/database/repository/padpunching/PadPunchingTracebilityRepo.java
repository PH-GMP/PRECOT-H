package com.focusr.Precot.mssql.database.repository.padpunching;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.QaOnlineInspectionReport;
import com.focusr.Precot.mssql.database.model.drygoods.BMR03GoodsPackingMeterialIssue;
import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrProductionDetails;

@Repository
public interface PadPunchingTracebilityRepo extends JpaRepository<PunchingBmrProductionDetails, Long>{

//	Get BatchNo BasedOn JulianDateAndYear
	
	@Query(value = "SELECT DATEADD(DAY, CAST(:julianDay AS INT) - 1, " + "DATEFROMPARTS(" 			
	+ "CASE WHEN CAST(:yearLastTwoDigits AS INT) BETWEEN 0 AND 49 THEN 2000 + CAST(:yearLastTwoDigits AS INT) " 		
			+ "ELSE 1900 + CAST(:yearLastTwoDigits AS INT) END, 1, 1))"
			+ " AS DateResult", nativeQuery = true) 	
	String getDateFromJulianDay(@Param("julianDay") String julianDay, 			@Param("yearLastTwoDigits") String yearLastTwoDigits);

	@Query(value = "select DISTINCT BATCH_NO as BatchNo from precot.PUNCHING_BMR_PROD_DETAILS"
			+ " WHERE MANUFACTURER_START_DATE = :date", nativeQuery = true) 	List<Map<String, Object>> getBatchNo(@Param("date") String date);

//	Get HeaderDetails
	
//	@Query(value = "SELECT ORDER_NO AS orderNo,NO_OF_BAGS AS product,BOXES_PACK_QTY AS packedQty,BATCH_NO AS bmr FROM precot.PUNCHING_BMR_PROD_DETAILS WHERE BATCH_NO =:batchNo", nativeQuery = true) 
//	List<Map<String, Object>> getPadPunchingProdDetails(@Param("batchNo") String batchNo);
//	
//	@Query(value = "SELECT Material AS material,Brand as brand,PONo as pOno,SaleOrder AS saleOrder,SOItem AS itemCode,pattern AS pattern,"
//			+ "gsm AS gsm  FROM dbo.tblOrderInfo WHERE POrder =:orderNo", nativeQuery = true)
//	List<Map<String, Object>> getTblOrderInfoDetails(@Param("orderNo") String orderNo);

	
	@Query(value = "SELECT  p.MANUFACTURER_START_DATE as startDate, p.MANUFACTURER_END_DATE as endDate, p.ORDER_NO AS orderNo, p.NO_OF_BAGS AS product,p.BAGS_PACK_QTY as productionQty, p.BOXES_PACK_QTY AS packedQty, p.BATCH_NO AS bmr, " +
            "o.Material AS material, o.Brand AS brand, o.PONo AS pOno, o.SaleOrder AS saleOrder, o.SOItem AS itemCode, " +
            "o.pattern AS pattern,o.PatternDesc AS edge, o.gsm AS gsm " +
            "FROM precot.PUNCHING_BMR_PROD_DETAILS p " +
            "JOIN dbo.tblOrderInfo o ON p.ORDER_NO = o.POrder " +
            "WHERE p.BATCH_NO = :batchNo", nativeQuery = true)
List<Map<String, Object>> headerDetails(@Param("batchNo") String batchNo);

//	@Query(value = "SELECT * FROM precot.QA_ONLINE_INSPECTION_REPORT_F034 where BMR_NO =:batchNo", nativeQuery = true) 	String getOnlineInspection(@Param("batchNo") String batchNo);
	
//Packing Details
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_03_PACKING_METERIAL_ISSUE WHERE BATCH_NO=:batchNo", nativeQuery = true)
	List<Map<String, Object>>  getPackingDetails(@Param("batchNo") String batchNo);
	
//	Roll ConsumptionDetails
//	
	@Query(value = "SELECT R.BaleNo AS rollNo, R.ConsDt AS prodDate, R.shiftId AS shiftId,\r\n"
			+ "G.ShaftNo AS shaftNo, R.RNWt AS netWeight,G.POrder AS bmr,\r\n"
			+ "G.RGWt AS rollWidth,G.PLen AS rollLength,G.PGSM As rollGsm,G.Moisture As moisture,\r\n"
			+ "G.MixDesc As Mixing\r\n"
			+ "FROM tblRCons R JOIN tblRGoods G\r\n"
			+ "ON R.BaleNo=G.BaleNo WHERE R.POrder=:orderNo\r\n"
			+ "AND R.ConsDt BETWEEN :startDate AND :endDate", nativeQuery = true)
	List<Map<String, Object>>  getRollConsumptionDetails(@Param("orderNo") String orderNo
			,@Param("startDate") String startDate,@Param("endDate") String endDate);
//	
//	@Query(value = "SELECT R.BaleNo AS rollNo, R.ConsDt AS prodDate, R.shiftId AS shiftId, " +
//	        "G.ShaftNo AS shaftNo, R.RNWt AS netWeight, G.POrder AS bmr, " +
//	        "G.RGWt AS rollWidth, G.PLen AS rollLength, G.PGSM As rollGsm, G.Moisture As moisture, " +
//	        "G.MixDesc As Mixing FROM tblRCons R JOIN tblRGoods G " +
//	        "ON R.BaleNo = G.BaleNo WHERE R.POrder = :pOrder " +
//	        "AND R.ConsDt BETWEEN :startDate AND :endDate", nativeQuery = true)
//	List<Map<String, Object>> getRollConsumptionDetails(
//	        @Param("pOrder") String pOrder, 
//	        @Param("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") String startDate,
//	        @Param("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") String endDate);

	
//	Bale Consumption	
	
	@Query(value = "SELECT * FROM tblBCons tb WHERE POrder = :pOrder", nativeQuery = true)
	List<Map<String, Object>>  tblBCons(@Param("pOrder") String pOrder);
	
	@Query(value = "SELECT * FROM tblBalePack tbp WHERE BaleNo =:baleNo; ", nativeQuery = true)
	List<Map<String, Object>>  tblBalePack(@Param("baleNo") String baleNo);
	
	// Bale No
//		@Query(value = "SELECT BaleNo FROM tblBCons tb WHERE  POrder = :Porder AND BaleNo LIKE 'B%'", nativeQuery = true)
//		List<String> getBaleByOrder(@Param("Porder") String Porder);
	
	@Query(value = "SELECT BaleNo FROM tblBCons tb WHERE  POrder = :Porder", nativeQuery = true)
	List<String> getBaleByOrder(@Param("Porder") String Porder);
		
		// Bmr And Net wt.
		@Query(value = "SELECT bmr_no , NetWt FROM tblBalePack WHERE BaleNo = :baleNo", nativeQuery = true)
		Map<String, Object> getBmrByBale(@Param("baleNo") String baleNo);
		
		// Laydown
		@Query(value = "SELECT LAYDOWN_NO FROM precot.BLEACH_BMR_LAYDOWN_MAPPING WHERE BMR_NO = :bmrNo", nativeQuery = true)
		String getLaydownByBmr(@Param("bmrNo") String bmrNo);
		
		// sub batch
		@Query(value = "SELECT CONCAT(START_SUB_BATCH, ',', END_SUB_BATCH) FROM precot.BMR_SUMMARY_PROD_DETAILS WHERE BMR_NO = :bmrNo", nativeQuery = true)
		List<String>getBatchByBmr(@Param("bmrNo") String bmrNo);
	 
		// Laydown
		@Query(value = "SELECT DISTINCT Batchno FROM tblrm t WHERE laydownno = :laydownNo", nativeQuery = true)
	    List<String> getRmBatchByLaydown(@Param("laydownNo") String laydownNo);
	
		
		// Rp Bale
//				@Query(value = "SELECT BaleNo AS baleNo,NetWt AS newWt FROM tblBCons tb WHERE POrder =:pOrder AND BaleNo LIKE 'R%'", nativeQuery = true)
//			    List<String> getRpBale(@Param("pOrder") String pOrder);
//				
//				@Query(value = "SELECT BaleNo ,NetWt FROM tblBCons tb WHERE POrder =:pOrder", nativeQuery = true)
//				Map<String, Object> getRpBale(@Param("pOrder") String pOrder);
		
		@Query(value = "SELECT DISTINCT NetWt FROM tblBCons tb WHERE BaleNo =:bale AND POrder = :porder", nativeQuery = true)
		Map<String, Object> getRpBale(@Param("bale") String bale, @Param("porder") String porder);
				
				@Query(value = "SELECT MixDesc FROM tblOrderInfo WHERE POrder =:pOrder", nativeQuery = true)
			    String getRpBaletblOrderInfo(@Param("pOrder") String pOrder);
			
}

