package com.focusr.Precot.mssql.database.repository.bleaching;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.bleaching.BleachBmrLaydownMapping;
import com.focusr.Precot.payload.BMRProductionDetailsResponse;
import com.focusr.Precot.payload.BMRProductionResponseLaydown;
import com.focusr.Precot.payload.BleachingTraceabilityInterface;
import com.focusr.Precot.payload.BleachingWasteBaleResponse;
import com.focusr.Precot.payload.RawCottonIssueResponse;
import com.focusr.Precot.payload.ShoppageDetails;
import com.focusr.Precot.payload.TableRMResponse;

public interface BleachBmrLaydownMappingRepository extends JpaRepository<BleachBmrLaydownMapping, Long> {

//	@Query(value="SELECT POrder FROM OrderInfo WHERE Material LIKE 'AB%' AND CMon >= '2024-06-01'",nativeQuery=true)
//	List<Map<Long,String>> getJobCardDetails()

//	@Query(value = "SELECT POrder FROM OrderInfo WHERE Material LIKE 'AB%' AND CMon >= '2024-06-01'", nativeQuery = true)
//	List<Map<String, Object>> getJobCardDetails();
//	

//	@Query(value = "SELECT DISTINCT mix FROM tblOrderInfo", nativeQuery = true)
//	List<Map<String, Object>> getMixingLov();

	@Query(value = "SELECT * FROM precot.BLEACH_BMR_LAYDOWN_MAPPING WHERE STATUS IN ('OPEN', 'CLOSED') ORDER BY ID DESC", nativeQuery = true)
	List<Map<String, Object>> getAllMappingBmr();

	@Query(value = " SELECT BMR_NO FROM precot.BLEACH_BMR_LAYDOWN_MAPPING WHERE STATUS ='OPEN' ORDER BY ID DESC", nativeQuery = true)
	List<Map<String, Object>> getMappingBmr();

	@Query(value = "SELECT * FROM precot.BLEACH_BMR_LAYDOWN_MAPPING WHERE BMR_NO = :MappingBmr_No", nativeQuery = true)
	List<BleachBmrLaydownMapping> getLaydownNo(@Param("MappingBmr_No") String MappingBmr_No);

	@Query(value = "SELECT * FROM precot.BLEACH_BMR_LAYDOWN_MAPPING WHERE LAYDOWN_NO = :MappingBmr_No", nativeQuery = true)
	List<BleachBmrLaydownMapping> getBMRNumber(@Param("MappingBmr_No") String MappingBmr_No);

	@Query(value = " SELECT LAYDOWN_NO FROM precot.BLEACH_BMR_LAYDOWN_MAPPING WHERE STATUS ='OPEN' ORDER BY ID DESC", nativeQuery = true)
	List<Map<String, Object>> getMappingLaydown();

	@Query(value = "SELECT DISTINCT BaleNo FROM tblBalePack tbp WHERE bmr_no=:bmr_no", nativeQuery = true)
	List<String> fetchBaleFromBMR(@Param("bmr_no") String bmr_no);

	@Query(value = "SELECT * FROM precot.BLEACH_BMR_LAYDOWN_MAPPING WHERE BMR_NO = :MappingBmr_No", nativeQuery = true)
	BleachBmrLaydownMapping getBMRNoResponse(@Param("MappingBmr_No") String MappingBmr_No);

	// GET BMR AND LAYDOWN LOV

	@Query(value = "SELECT * FROM precot.BLEACH_BMR_LAYDOWN_MAPPING bblm ORDER BY ID DESC", nativeQuery = true)
	List<BleachBmrLaydownMapping> fetchBMRAndLaydownLov();

	// USING 3rd PARTy Table

	@Query(value = "SELECT POrder FROM tblOrderInfo WHERE Material LIKE 'AB%' AND Sts = 1", nativeQuery = true)
	List<Map<String, Object>> getJobCardDetails();

	@Query(value = "SELECT DISTINCT MixDesc AS mix FROM tblOrderInfo WHERE POrder=:order", nativeQuery = true)
	List<Map<String, Object>> getMixingLov(@Param("order") String order);

	@Query(value = "SELECT DISTINCT BatchNo FROM tblBalePack tbp WHERE bmr_no=:bmr_no AND PackYear = YEAR(GETDATE())", nativeQuery = true)
	List<BigDecimal> fetchBatchNoFromBMR(@Param("bmr_no") String bmr_no);

	@Query(value = "SELECT DISTINCT BaleNo FROM tblBalePack tbp WHERE BatchNo=:batch_no AND PackYear = YEAR(GETDATE())", nativeQuery = true)
	List<String> fetchBaleNoFromBatch(@Param("batch_no") BigDecimal batch_no);

//	@Query(value = "SELECT DISTINCT BatchNo FROM tblBalePack WHERE BatchNo > 1464 AND BMR_NO IS NULL AND PackYear = YEAR(GETDATE())", nativeQuery = true)
//	List<Integer> fetchBMRfromSAP();
//
//	@Query(value = "SELECT DISTINCT BatchNo FROM tblBalePack WHERE BatchNo > 1464  AND BMR_NO IS NOT NULL AND PackYear = YEAR(GETDATE())", nativeQuery = true)
//	List<BigDecimal> fetchBMRfromSAP1();
//	
//	@Query(value = "SELECT DISTINCT BatchNo FROM tblBalePack WHERE BatchNo > 1464 AND BMR_NO IS NULL AND PackYear = YEAR(GETDATE())", nativeQuery = true)
//	List<BigDecimal> fetchBMRfromSAP2();

	@Query(value = "SELECT DISTINCT BatchNo FROM tblBalePack WHERE BMR_NO IS NULL AND ((PackYear = 2024 AND BatchNo > 1464) OR (PackYear = 2025))", nativeQuery = true)
	List<Integer> fetchBMRfromSAP();

	@Query(value = "SELECT DISTINCT BatchNo FROM tblBalePack WHERE BMR_NO IS NOT NULL AND ((PackYear = 2024 AND BatchNo > 1464) OR (PackYear = 2025))", nativeQuery = true)
	List<BigDecimal> fetchBMRfromSAP1();

	@Query(value = "SELECT DISTINCT BatchNo FROM tblBalePack WHERE BMR_NO IS NULL AND ((PackYear = 2024 AND BatchNo > 1464) OR (PackYear = 2025))", nativeQuery = true)
	List<BigDecimal> fetchBMRfromSAP2();

	@Query(value = "SELECT FormattedBatchNo\r\n" + "FROM (\r\n" + "    SELECT DISTINCT \r\n"
			+ "        RIGHT(CAST(PackYear AS VARCHAR), 2) + '/' + FORMAT(BatchNo, '0000') AS FormattedBatchNo,\r\n"
			+ "        PackYear,\r\n" + "        BatchNo\r\n" + "    FROM tblBalePack  \r\n"
			+ "    WHERE BMR_NO IS NULL \r\n"
			+ "      AND ((PackYear = 2024 AND BatchNo > 1464) OR (PackYear = 2025))\r\n" + ") AS SubQuery\r\n"
			+ "ORDER BY PackYear DESC, BatchNo ASC;", nativeQuery = true)
	List<String> fetchBatchwithYear();

	@Query(value = "SELECT DISTINCT bmr_no FROM tblBalePack WHERE BatchNo=:batchNumber AND PackYear IN (2024, 2025) AND bmr_no IS NOT NULL", nativeQuery = true)
	Set<String> fetchBmrByBatchNumber(Long batchNumber);

//	@Query(value = "SELECT DISTINCT BaleNo FROM tblBalePack tbp WHERE PackYear = YEAR(GETDATE()) AND BMR_NO IS NOT NULL", nativeQuery = true)
//	List<String> fetchBalefromSAP();

	@Query(value = "SELECT DISTINCT BaleNo FROM tblBalePack tbp \r\n"
			+ "WHERE PackYear IN (YEAR(GETDATE()), YEAR(GETDATE()) - 1) AND BMR_NO IS NOT NULL", nativeQuery = true)
	List<String> fetchBalefromSAP();

//	@Modifying
//	@Transactional
//	@Query(value = "UPDATE tblBalePack SET BMR_NO = :bmrNo WHERE BatchNo IN (:batchNos) AND PackYear = YEAR(GETDATE())", nativeQuery = true)
//	int updateBmrNo(@Param("bmrNo") String bmrNo, @Param("batchNos") List<String> batchNos);

	@Modifying
	@Transactional
	@Query(value = "UPDATE tblBalePack " + "SET BMR_NO = :bmrNo "
			+ "WHERE (RIGHT(PackYear, 2) + '/' + FORMAT(BatchNo, '0000')) IN (:batchNos)", nativeQuery = true)
	int updateBmrNo(@Param("bmrNo") String bmrNo, @Param("batchNos") List<String> batchNos);

	@Query(value = "SELECT DISTINCT BaleNo FROM tblBalePack tbp WHERE BatchNo=:batch_no AND bmr_no=:bmr_no AND PackYear = YEAR(GETDATE())", nativeQuery = true)
	List<String> fetchBaleNoFromBatch(@Param("batch_no") BigDecimal batch_no, @Param("bmr_no") String bmr_no);

	@Query(value = "SELECT Batchno AS batchNo, Suplier AS supplier, Date AS date " + "FROM tblrm "
			+ "WHERE mvt_type = 101 "
			+ "AND TRY_CONVERT(DATE, Date, 103) >= DATEADD(DAY, -19, CAST(GETDATE() AS DATE)) "
			+ "AND TRY_CONVERT(DATE, Date, 103) <= CAST(GETDATE() AS DATE)", nativeQuery = true)
	List<TableRMResponse> rmDataList();

	@Query(value = "SELECT Batchno AS batchNo, Weight AS weight, Noofbales AS balesCount FROM tblrm WHERE mvt_type = 261 AND laydownno=:laydown_no", nativeQuery = true)
	List<RawCottonIssueResponse> rawCottonResponse(@Param("laydown_no") String laydown_no);

//	@Query(value = "SELECT Batchno AS batchNo, Weight AS weight, Noofbales AS balesCount FROM tblrm WHERE mvt_type = 261 AND laydownno=:laydown_no", nativeQuery = true)
//	List<RawCottonIssueResponse> rawCottonResponseCakePress(@Param("laydown_no") String laydown_no);

	@Query(value = "SELECT t261.Batchno AS batchNo, (CAST(t261.Weight AS FLOAT) - COALESCE(CAST(t262.Weight AS FLOAT), 0)) AS weight, CAST(t261.Noofbales AS INT) AS balesCount FROM tblrm t261 LEFT JOIN tblrm t262  ON LTRIM(RTRIM(t261.Batchno)) = LTRIM(RTRIM(t262.Batchno)) AND t262.mvt_type = 262AND t262.laydownno = :laydown_no WHERE t261.mvt_type = 261 AND t261.laydownno = :laydown_no", nativeQuery = true)
	List<RawCottonIssueResponse> rawCottonResponseCakePress(@Param("laydown_no") String laydown_no);

	/**
	 * For WASTE BALE PRESS - tblrejbale
	 */

//	@Query(value = "SELECT BaleNo AS baleNo, POrder AS orderNo, GrsWt AS grossweight, NetWt AS netweight FROM tblrejbale WHERE PackDt=:date", nativeQuery = true)
//	List<BleachingWasteBaleResponse> wastePressBaleResponse(@Param("date") String date); 
//	@Query(value = "SELECT BaleNo AS bale_no, POrder AS waste_code, GrsWt AS gross_weight, NetWt AS net_weight FROM tblrejbale WHERE PackDt=:date", nativeQuery = true)
//	List<BleachingWasteBaleResponse> wastePressBaleResponse(@Param("date") String date); 

	/**
	 * BMR SUMMARY
	 */

	@Query(value = "SELECT MIN(RIGHT(CAST(PackYear AS VARCHAR), 2) + '/' + FORMAT(BatchNo, '0000')) AS startSubBatch, MAX(RIGHT(CAST(PackYear AS VARCHAR), 2) + '/' + FORMAT(BatchNo, '0000')) AS endSubBatch, COUNT(DISTINCT BatchNo) AS batchCount, COUNT(DISTINCT BaleNo) AS baleCount, MIN(isExport) AS isExport, MIN(isCons) AS isHouse FROM tblBalePack WHERE BMR_NO = :bmr_no", nativeQuery = true)
	BMRProductionDetailsResponse productionDetailsResponse(@Param("bmr_no") String bmr_no);

	@Query(value = "SELECT Qty AS quantity, MixDesc AS mixing, FinishDesc AS finishing FROM tblOrderInfo WHERE POrder=:order", nativeQuery = true)
	BMRProductionResponseLaydown productionResponseLaydown(@Param("order") String order);

	@Query(value = "SELECT SUM(NetWt) from tblBalePack WHERE bmr_no=:bmr_no", nativeQuery = true)
	String quantity(@Param("bmr_no") String bmr_no);

//	@Query(value = "SELECT MIN(BatchNo) AS startSubBatch, SELECT MAX(BatchNo) AS endSubBatch, COUNT(DISTINCT(BatchNo)) AS batchCount, COUNT(DISTINCT(BaleNo)) AS baleCount FROM tblBalePack WHERE BMR_NO=:bmr_no", nativeQuery = true)
//	BMRProductionDetailsResponse productionDetailsResponse(@Param("bmr_no") String bmr_no);
//	
//	@Query(value = "SELECT Qty AS quantity, Mix AS mixing, Finish AS finishing FROM tblrm WHERE laydownno=:laydown_no", nativeQuery = true)
//	BMRProductionResponseLaydown productionResponseLaydown(@Param("laydown_no") String laydown_no);

	/**
	 * SHOPPAGE DETAILS
	 */

	@Query(value = "SELECT PackDt AS packDt, FTime AS fromHours, TTime AS toHours, SCause AS sCause, TotHrs AS totalHours FROM SplB WHERE PackDt=:date", nativeQuery = true)
	List<ShoppageDetails> getShoppageDetailsForDate(@Param("date") String date);

	@Query(value = "SELECT BaleNo AS baleNo, POrder AS orderNo, GrsWt AS grossweight, NetWt AS netweight FROM tblrejbale", nativeQuery = true)
	List<BleachingWasteBaleResponse> wastePressBaleResponsenew();

//   @Query(value = "SELECT PackDt AS packDt, FTime AS fromHours, TTime AS toHours, SCause AS sCause, TotHrs AS totalHours FROM SplB WHERE PackDt=:date AND ShiftID =:shift_id", nativeQuery = true)
//	List<ShoppageDetails> findByDateAndShift(@Param("date") String date, @Param("shift_id") String shift_id);

//   @Query(value = "SELECT PackDt AS packDt, FTime AS fromHours, TTime AS toHours, SCause AS sCause, TotHrs AS totalHours FROM tblSBlg WHERE PackDt=:date AND ShiftID =:shift_id", nativeQuery = true)
//	List<ShoppageDetails> findByDateAndShift(@Param("date") String date, @Param("shift_id") String shift_id);

	@Query(value = "SELECT BaleNo AS bale_no, POrder AS waste_code, GrsWt AS gross_weight, NetWt AS net_weight FROM tblrejbale WHERE PackDt=:date AND POrder Not in ('rejbale')", nativeQuery = true)
	List<BleachingWasteBaleResponse> wastePressBaleResponse(@Param("date") String date);

	/**
	 * TRACEABILITY - BLEACHING
	 */

//   @Query(value = "SELECT BatchNo AS batchNo, POrder AS order,bmr_no AS bmrNo, PackDt AS date, NetWt AS weight FROM tblBalePack WHERE BaleNo=:baleNo", nativeQuery = true)
//   BleachingTraceabilityInterface bleachTraceByBale(@Param("baleNo") String baleNo);

	@Query(value = "SELECT BatchNo AS batchNo, POrder AS orderNumber, bmr_no AS bmrNo, PackDt AS dateprod, NetWt AS weight FROM tblBalePack WHERE BaleNo = :baleNo", nativeQuery = true)
	List<BleachingTraceabilityInterface> bleachTraceByBale(@Param("baleNo") String baleNo);

	@Query(value = "SELECT BaleNo AS baleNo, POrder AS orderNumber,bmr_no AS bmrNo, PackDt AS dateprod, NetWt AS weight FROM tblBalePack WHERE BatchNo=:batchNo", nativeQuery = true)
	List<BleachingTraceabilityInterface> bleachTraceByBatch(@Param("batchNo") String batchNo);

	@Query(value = "SELECT LAYDOWN_NO FROM precot.BLEACH_BMR_LAYDOWN_MAPPING WHERE BMR_NO= :bmr", nativeQuery = true)
	String getLaydownByBmr(@Param("bmr") String bmr);

	@Query(value = "SELECT DISTINCT Suplier FROM tblrm WHERE laydownno=:laydown", nativeQuery = true)
	List<String> getSupplierByLaydown(@Param("laydown") String laydown);

	@Query(value = "SELECT DISTINCT Batchno FROM tblrm WHERE laydownno=:laydown", nativeQuery = true)
	List<String> getPHByLaydown(@Param("laydown") String laydown);

//   @Query(value = "SELECT SUM(Weight) FROM tblrm WHERE laydownno=:laydown", nativeQuery = true)
//   BigDecimal laydownWeight(@Param("laydown") String laydown);

	@Query(value = "SELECT SUM(CAST(Weight AS DECIMAL(10, 2))) FROM tblrm WHERE laydownno = :laydownno", nativeQuery = true)
	BigDecimal laydownWeight(@Param("laydownno") String laydownno);

//   @Query(value = "SELECT DISTINCT POrder AS orderNumber,bmr_no AS bmrNo FROM tblBalePack WHERE BatchNo=:batchNo AND BaleNo=:baleNo", nativeQuery = true)
//   BleachingTraceabilityInterface bleachTraceInterface(@Param("baleNo") String baleNo, @Param("batchNo") Integer batchNo);

//   @Query(value = "SELECT DISTINCT POrder AS orderNumber, bmr_no AS bmrNo, NetWt AS weight " +
//           "FROM tblBalePack " +
//           "WHERE (:baleNo IS NOT NULL AND BaleNo = :baleNo) " +
//           "   OR (:baleNo IS NULL AND BatchNo = :batchNo)", nativeQuery = true)
//   BleachingTraceabilityInterface bleachTraceInterface(@Param("baleNo") String baleNo, @Param("batchNo") Long batchNo);

	@Query(value = "SELECT DISTINCT POrder AS orderNumber, bmr_no AS bmrNo, BatchNo AS batchNo " + "FROM tblBalePack "
			+ "WHERE (:baleNo IS NOT NULL AND BaleNo = :baleNo) "
			+ "   OR (:batchNo IS NOT NULL AND BatchNo = :batchNo AND PackYear = YEAR(GETDATE()))", nativeQuery = true)
	BleachingTraceabilityInterface bleachTraceInterface(@Param("baleNo") String baleNo, @Param("batchNo") Long batchNo);

	@Query(value = "SELECT SUM(NetWt) FROM tblBalePack WHERE BatchNo = :batchNo AND PackYear = YEAR(GETDATE())", nativeQuery = true)
	String baleWeight(@Param("batchNo") String batchNo);

	@Query(value = "SELECT DISTINCT BaleNo FROM tblBalePack WHERE BatchNo=:batchNo AND PackYear = YEAR(GETDATE())", nativeQuery = true)
	List<String> getBatchNo(@Param("batchNo") String batchNo);

	@Query(value = "SELECT DISTINCT PackDt FROM tblBalePack WHERE BatchNo=:batchNo AND PackYear = YEAR(GETDATE())", nativeQuery = true)
	List<Date> getPackingDate(@Param("batchNo") String batchNo);

	@Query(value = "SELECT DISTINCT PackDt FROM tblBalePack WHERE BaleNo=:batchNo AND PackYear = YEAR(GETDATE())", nativeQuery = true)
	List<Date> getPackingDateByBale(@Param("batchNo") String batchNo);

	/**
	 * SPULANCE TRACEABILITY
	 */

	@Query(value = "SELECT DISTINCT BalenO FROM tblRGoods tr WHERE PackYear = YEAR(GETDATE())", nativeQuery = true)
	List<String> getBaleNo();

	@Query(value = "SELECT BaleNo AS roll, ShaftID AS shaft, PackDt AS packdate, POrder AS orderNo, Brand AS brand, PLen AS lengths, PatternDesc AS pattern, RNWt AS weight, BatchNo AS batchNo FROM tblRGoods WHERE BaleNo =:roll", nativeQuery = true)
	Map<String, Object> spulanceTraceByRoll(@Param("roll") String roll);

	@Query(value = "SELECT BaleNo AS bale, NetWt AS netWeight FROM tblBCons WHERE POrder=:order AND ConsDt =:date", nativeQuery = true)
	List<Map<String, Object>> baleByOrder(@Param("order") String order, @Param("date") String date);

	@Query(value = "SELECT BatchNo AS batch, bmr_no AS bmrNumber FROM tblBalePack WHERE BaleNo=:baleNumber", nativeQuery = true)
	List<Map<String, Object>> fetchBatchByBale(@Param("baleNumber") String baleNumber);

//	@Query(value = "SELECT DISTINCT Batchno FROM tblrm WHERE laydownno=:laydown AND Date=:date", nativeQuery = true)
//	List<String> getPHByLaydownDate(@Param("laydown") String laydown, @Param("date") String date);

	@Query(value = "SELECT DISTINCT Batchno FROM tblrm WHERE laydownno=:laydown", nativeQuery = true)
	List<String> getPHByLaydownDate(@Param("laydown") String laydown);

	@Query(value = "SELECT gsm AS gsm, Material AS material FROM tblOrderInfo WHERE POrder=:order", nativeQuery = true)
	Map<String, Object> gsmByOrder(@Param("order") String order);

}
