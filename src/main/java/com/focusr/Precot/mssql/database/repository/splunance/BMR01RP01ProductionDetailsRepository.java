package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.BMR01RP01ProductionDetails;
import com.focusr.Precot.util.splunance.RGoodsSummaryDTO;

public interface BMR01RP01ProductionDetailsRepository extends JpaRepository<BMR01RP01ProductionDetails, Long> {
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_B01_R01_PRODUCTION_DETAILS WHERE BATCH_NO=:order_no AND FORM_NO ='PRD02/F-26'", nativeQuery = true)
	List<BMR01RP01ProductionDetails> getSummaryByOrderNo(@Param("order_no") String order_no);
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_B01_R01_PRODUCTION_DETAILS WHERE BATCH_NO=:batch_no AND FORM_NO ='PRD02/F-27'", nativeQuery = true)
	List<BMR01RP01ProductionDetails> getSummaryByOrderNoRPB(@Param("batch_no") String batch_no);
	
	
		// UPDATE BATCH INTO SAP
	
	@Modifying
    @Transactional
    @Query(value="UPDATE tblRGoods SET BatchNo=:batchNo WHERE POrder=:orderNo AND PackDt BETWEEN :fromDate AND :toDate", nativeQuery = true)
	int updateBatchNoByOrderNoAndManDates(String batchNo, String orderNo, String fromDate, String toDate);
	
	
		// PO STATUS - SPULANCE PRODUCTION DETAILS
	
	@Query(value = "SELECT PO_STATUS FROM precot.SPUNLACE_BMR_B01_R01_PRODUCTION_DETAILS WHERE BATCH_NO=:batchNo", nativeQuery = true)
	Optional<String> productionDetailsByBatchNo(@Param("batchNo") String batchNo);
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_B01_R01_PRODUCTION_DETAILS WHERE BATCH_NO=:batchNo", nativeQuery = true)
	BMR01RP01ProductionDetails getproductionDetailsByBatchNo(@Param("batchNo") String batchNo);
	
	@Query(value = "SELECT DISTINCT CONCAT(POrder, '-1') FROM tblOrderInfo WHERE Material LIKE 'RG%' AND Material NOT LIKE 'RGPW%' AND Sts = 1", nativeQuery = true)
	List<String> productionDetailsBatchNumber();
	
	// SELECT POrder FROM tblOrderInfo WHERE Material LIKE 'RPBALE%' AND Sts = 1
	@Query(value = "SELECT DISTINCT CONCAT(POrder, '-1') FROM tblOrderInfo WHERE Material LIKE '%RPBALE%' AND Sts = 1", nativeQuery = true)
	List<String> productionDetailsBatchNumberRpBale();
	
		// FOR SPULANCE BMR
	
	@Query(value = "SELECT DISTINCT NEXT_BATCH FROM precot.SPUNLACE_BMR_B01_R01_PRODUCTION_DETAILS WHERE PO_STATUS = 'OPEN' AND NEXT_BATCH IS NOT NULL AND FORM_NO = 'PRD02/F-26'", nativeQuery = true)
	List<String> fetchOpenBatches();
	
	
	@Query(value = "SELECT DISTINCT NEXT_BATCH FROM precot.SPUNLACE_BMR_B01_R01_PRODUCTION_DETAILS WHERE PO_STATUS = 'OPEN' AND NEXT_BATCH IS NOT NULL AND FORM_NO = 'PRD02/F-27'", nativeQuery = true)
	List<String> fetchOpenBatchesRpBale();
	
	@Query(value = "SELECT " +
            "(SELECT TOP 1 Brand FROM tblRGoods WHERE POrder = :pOrder AND isApproved = 'Y' AND BalTyp = 'I' AND PackDt BETWEEN :fromDate AND :toDate) AS Product_Description, " +
            "(SELECT TOP 1 PWid FROM tblRGoods WHERE POrder = :pOrder AND isApproved = 'Y' AND BalTyp = 'I' AND PackDt BETWEEN :fromDate AND :toDate) AS Width_in_mm, " +
            "(SELECT TOP 1 MixDesc FROM tblRGoods WHERE POrder = :pOrder AND isApproved = 'Y' AND BalTyp = 'I' AND PackDt BETWEEN :fromDate AND :toDate) AS Mixing, " +
            "MIN(ShaftNo) AS Shaft_Number_Start_From, " +
            "MAX(ShaftNo) AS Shaft_Number_Ended, " +
            "COUNT(DISTINCT ShaftNo) AS No_of_Shaft, " +
            "SUM(RNWt) AS Batch_Quantity, " +
            "(SELECT COUNT(DISTINCT BaleNo) / NULLIF(COUNT(DISTINCT ShaftID), 0) " +
            " FROM tblRGoods WHERE POrder = :pOrder AND isApproved = 'Y' AND BalTyp = 'I' AND PackDt BETWEEN :fromDate AND :toDate) AS No_of_Rolls_Shaft, " +
            "CASE " +
            "WHEN (SELECT SaleOrder FROM tblOrderInfo WHERE POrder = :pOrder) = '0'" +
            "THEN 'In House'" +
            " ELSE 'Export' " +
            "END AS IN_HOUSE_EXPORT " +
            "FROM tblRGoods " +
            "WHERE POrder = :pOrder AND isApproved = 'Y' AND BalTyp = 'I' AND PackDt BETWEEN :fromDate AND :toDate", 
     nativeQuery = true)
	List<Map<String, Object>> getRGoodsSummaryByPOrder(@Param("pOrder") String pOrder, @Param("fromDate") String fromDate, @Param("toDate") String toDate);
	
	
	@Query(value = "SELECT " +
            "(SELECT TOP 1 Brand FROM tblRGoods " +
            "WHERE POrder = :pOrder AND isApproved = 'Y' AND BalTyp = 'I' " +
            "AND PackDt BETWEEN :fromDate AND :toDate " +
            "AND ShaftNo BETWEEN :startShaft AND :endShaft) AS Product_Description, " +
            "(SELECT TOP 1 PWid FROM tblRGoods " +
            "WHERE POrder = :pOrder AND isApproved = 'Y' AND BalTyp = 'I' " +
            "AND PackDt BETWEEN :fromDate AND :toDate " +
            "AND ShaftNo BETWEEN :startShaft AND :endShaft) AS Width_in_mm, " +
            "(SELECT TOP 1 MixDesc FROM tblRGoods " +
            "WHERE POrder = :pOrder AND isApproved = 'Y' AND BalTyp = 'I' " +
            "AND PackDt BETWEEN :fromDate AND :toDate " +
            "AND ShaftNo BETWEEN :startShaft AND :endShaft) AS Mixing, " +
            "COUNT(DISTINCT ShaftNo) AS No_of_Shaft, " +
            "SUM(RNWt) AS Batch_Quantity, " +
            "(SELECT COUNT(DISTINCT BaleNo) / NULLIF(COUNT(DISTINCT ShaftID), 0) " +
            " FROM tblRGoods WHERE POrder = :pOrder AND isApproved = 'Y' AND BalTyp = 'I' " +
            "AND PackDt BETWEEN :fromDate AND :toDate AND ShaftNo BETWEEN :startShaft AND :endShaft) AS No_of_Rolls_Shaft, " +
            "CASE " +
            "WHEN (SELECT SaleOrder FROM tblOrderInfo WHERE POrder = :pOrder) = '0' " +
            "THEN 'In House' " +
            "ELSE 'Export' " +
            "END AS IN_HOUSE_EXPORT " +
            "FROM tblRGoods " +
            "WHERE POrder = :pOrder AND isApproved = 'Y' AND BalTyp = 'I' " +
            "AND PackDt BETWEEN :fromDate AND :toDate " +
            "AND ShaftNo BETWEEN :startShaft AND :endShaft", 
     nativeQuery = true)
List<Map<String, Object>> getRGoodsSummaryByPOrder1(@Param("pOrder") String pOrder, 
                                                   @Param("fromDate") String fromDate, 
                                                   @Param("toDate") String toDate, 
                                                   @Param("startShaft") String startShaft, 
                                                   @Param("endShaft") String endShaft);

	
	@Query(value = "SELECT \r\n"
			+ "    -- Fetch Product Description, default to 'N/A' if null\r\n"
			+ "    COALESCE(\r\n"
			+ "        (SELECT TOP 1 Brand \r\n"
			+ "         FROM tblRGoods \r\n"
			+ "         WHERE POrder = :pOrder \r\n"
			+ "           AND isApproved = 'Y' \r\n"
			+ "           AND BalTyp = 'I' \r\n"
			+ "           AND PackDt BETWEEN :fromDate AND :toDate \r\n"
			+ "           AND ShaftNo BETWEEN :startShaft AND :endShaft),\r\n"
			+ "        'N/A') AS Product_Description,\r\n"
			+ "    \r\n"
			+ "    -- Fetch Width in mm, default to '0' if null\r\n"
			+ "    COALESCE(\r\n"
			+ "        (SELECT TOP 1 PWid \r\n"
			+ "         FROM tblRGoods \r\n"
			+ "         WHERE POrder = :pOrder \r\n"
			+ "           AND isApproved = 'Y' \r\n"
			+ "           AND BalTyp = 'I' \r\n"
			+ "           AND PackDt BETWEEN :fromDate AND :toDate \r\n"
			+ "           AND ShaftNo BETWEEN :startShaft AND :endShaft),\r\n"
			+ "        0) AS Width_in_mm,\r\n"
			+ "    \r\n"
			+ "    -- Fetch Mixing description, default to 'N/A' if null\r\n"
			+ "    COALESCE(\r\n"
			+ "        (SELECT TOP 1 MixDesc \r\n"
			+ "         FROM tblRGoods \r\n"
			+ "         WHERE POrder = :pOrder \r\n"
			+ "           AND isApproved = 'Y' \r\n"
			+ "           AND BalTyp = 'I' \r\n"
			+ "           AND PackDt BETWEEN :fromDate AND :toDate \r\n"
			+ "           AND ShaftNo BETWEEN :startShaft AND :endShaft),\r\n"
			+ "        'N/A') AS Mixing,\r\n"
			+ "    \r\n"
			+ "    -- Count distinct ShaftNo\r\n"
			+ "    COUNT(DISTINCT ShaftNo) AS No_of_Shaft,\r\n"
			+ "    \r\n"
			+ "    -- Sum of RNWt, default to 0 if null\r\n"
			+ "    COALESCE(SUM(RNWt), 0) AS Batch_Quantity,\r\n"
			+ "    \r\n"
			+ "    -- Calculate number of rolls per shaft\r\n"
			+ "    COALESCE(\r\n"
			+ "        (SELECT COUNT(DISTINCT BaleNo) / NULLIF(COUNT(DISTINCT ShaftID), 0) \r\n"
			+ "         FROM tblRGoods \r\n"
			+ "         WHERE POrder = :pOrder \r\n"
			+ "           AND isApproved = 'Y' \r\n"
			+ "           AND BalTyp = 'I' \r\n"
			+ "           AND PackDt BETWEEN :fromDate AND :toDate \r\n"
			+ "           AND ShaftNo BETWEEN :startShaft AND :endShaft),\r\n"
			+ "        0) AS No_of_Rolls_Shaft,\r\n"
			+ "    \r\n"
			+ "    -- Determine In-House or Export based on SaleOrder\r\n"
			+ "    CASE \r\n"
			+ "        WHEN (SELECT SaleOrder \r\n"
			+ "              FROM tblOrderInfo \r\n"
			+ "              WHERE POrder = :pOrder) = '0' \r\n"
			+ "        THEN 'In House' \r\n"
			+ "        ELSE 'Export' \r\n"
			+ "    END AS IN_HOUSE_EXPORT\r\n"
			+ "FROM tblRGoods\r\n"
			+ "WHERE POrder = :pOrder \r\n"
			+ "  AND isApproved = 'Y' \r\n"
			+ "  AND BalTyp = 'I' \r\n"
			+ "  AND PackDt BETWEEN :fromDate AND :toDate \r\n"
			+ "  AND ShaftNo BETWEEN :startShaft AND :endShaft;\r\n"
			+ "", 
    nativeQuery = true)
List<RGoodsSummaryDTO> getRGoodsSummaryByPOrder2(@Param("pOrder") String pOrder, 
                                              @Param("fromDate") String fromDate, 
                                              @Param("toDate") String toDate, 
                                              @Param("startShaft") Integer startShaft, 
                                              @Param("endShaft") Integer endShaft);

	
	
	@Query(value = "SELECT * FROM tblRGoods WHERE POrder=:orderNumber", nativeQuery = true)
	List<RGoodsSummaryDTO> getRGoodsSummaryByOrderShaftDate(@Param("orderNumber") String orderNumber);
	
	
	
	 @Query(value = "SELECT " +
             "SUM(NetWt) AS Batch_Quantity, " +
             "(SELECT TOP 1 Brand " +
             " FROM tblOrderInfo " +
             " WHERE POrder = :pOrder) AS Product_Description, " +
             "(SELECT TOP 1 Material " +
             " FROM tblOrderInfo " +
             " WHERE POrder = :pOrder) AS Type_of_Material, " +
             "COUNT(DISTINCT BaleNo) AS No_of_Bales, " +
             "MIN(BaleNo) AS Bale_Start_No, " +
             "MAX(BaleNo) AS Bale_End_No " +
             "FROM tblRPBALE " +
             "WHERE POrder = :pOrder", 
   nativeQuery = true)
List<Map<String, Object>> getBatchSummaryRpbale(@Param("pOrder") String pOrder);
	 
	 @Query(value = "SELECT BATCH_NO FROM PDE.precot.SPUNLACE_BMR_B01_R01_PRODUCTION_DETAILS", nativeQuery = true)
	    List<String> findAllByBatchNo();

	 
	 	// Shaft no list --- CR
	 
	 @Query(value = "SELECT DISTINCT ShaftNo FROM tblRGoods WHERE PackDt BETWEEN :fromDate AND :toDate AND POrder=:pOrder", nativeQuery = true)
	 List<String> shaftByDate(@Param("pOrder") String pOrder, @Param("fromDate") String fromDate, @Param("toDate") String toDate);
	 
	 
//	 @Query(value = "SELECT TOP 1 Brand AS Product_Description, TOP 1 PWid AS Width_in_mm, TOP 1 MixDesc AS Mixing, SUM(RNWt) AS Batch_Quantity FROM tblRGoods WHERE PackDt BETWEEN :fromDate AND :toDate AND POrder=:pOrder AND ShaftNo BETWEEN :startShaft AND :endShaft AND isApproved = 'Y' AND BalTyp = 'I'", nativeQuery = true)
//	 List<Map<String, Object>> productionDetailsByShaftDate(@Param("pOrder") String pOrder, @Param("fromDate") String fromDate, @Param("toDate") String toDate, @Param("startShaft") String startShaft, @Param("endShaft") String endShaft);
	 
	 
	 @Query(value = "SELECT \r\n"
		        + "    (SELECT TOP 1 Brand FROM tblRGoods \r\n"
		        + "     WHERE POrder = :pOrder \r\n"
		        + "       AND isApproved = 'Y' \r\n"
		        + "       AND BalTyp = 'I' \r\n"
		        + "       AND PackDt BETWEEN :fromDate AND :toDate \r\n"
		        + "       AND ShaftNo BETWEEN :startShaft AND :endShaft) AS Product_Description, \r\n"
		        + "    (SELECT TOP 1 PWid FROM tblRGoods \r\n"
		        + "     WHERE POrder = :pOrder \r\n"
		        + "       AND isApproved = 'Y' \r\n"
		        + "       AND BalTyp = 'I' \r\n"
		        + "       AND PackDt BETWEEN :fromDate AND :toDate \r\n"
		        + "       AND ShaftNo BETWEEN :startShaft AND :endShaft) AS Width_in_mm, \r\n"
		        + "    (SELECT TOP 1 MixDesc FROM tblRGoods \r\n"
		        + "     WHERE POrder = :pOrder \r\n"
		        + "       AND isApproved = 'Y' \r\n"
		        + "       AND BalTyp = 'I' \r\n"
		        + "       AND PackDt BETWEEN :fromDate AND :toDate \r\n"
		        + "       AND ShaftNo BETWEEN :startShaft AND :endShaft) AS Mixing, \r\n"
		        + "    COUNT(DISTINCT ShaftNo) AS No_of_Shaft, \r\n"
		        + "    SUM(RNWt) AS Batch_Quantity, \r\n"
		        + "    (SELECT COUNT(DISTINCT BaleNo) / NULLIF(COUNT(DISTINCT ShaftID), 0) \r\n"
		        + "     FROM tblRGoods \r\n"
		        + "     WHERE POrder = :pOrder \r\n"
		        + "       AND isApproved = 'Y' \r\n"
		        + "       AND BalTyp = 'I' \r\n"
		        + "       AND PackDt BETWEEN :fromDate AND :toDate \r\n"
		        + "       AND ShaftNo BETWEEN :startShaft AND :endShaft) AS No_of_Rolls_Shaft, \r\n"
		        + "    CASE \r\n"
		        + "        WHEN (SELECT SaleOrder FROM tblOrderInfo WHERE POrder = :pOrder) = '0' \r\n"
		        + "        THEN 'In House' \r\n"
		        + "        ELSE 'Export' \r\n"
		        + "    END AS IN_HOUSE_EXPORT \r\n"
		        + "FROM tblRGoods \r\n"
		        + "WHERE POrder = :pOrder \r\n"
		        + "  AND isApproved = 'Y' \r\n"
		        + "  AND BalTyp = 'I' \r\n"
		        + "  AND PackDt BETWEEN :fromDate AND :toDate \r\n"
		        + "  AND ShaftNo BETWEEN :startShaft AND :endShaft", 
		       nativeQuery = true)
		List<Map<String, Object>> productionDetailsByShaftDate(@Param("pOrder") String pOrder, 
		                                                       @Param("fromDate") String fromDate, 
		                                                       @Param("toDate") String toDate, 
		                                                       @Param("startShaft") String startShaft, 
		                                                       @Param("endShaft") String endShaft);


	 
	 @Query(value = "SELECT " +
             "(SELECT TOP 1 Brand FROM tblRGoods " +
             " WHERE POrder = :pOrder " +
             "   AND isApproved = 'Y' " +
             "   AND BalTyp = 'I' " +
             "   AND PackDt BETWEEN CONVERT(DATE, :fromDate, 120) AND CONVERT(DATE, :toDate, 120) " +
             "   AND CAST(ShaftNo AS BIGINT) BETWEEN :startShaft AND :endShaft) AS Product_Description, " +
             "(SELECT TOP 1 PWid FROM tblRGoods " +
             " WHERE POrder = :pOrder " +
             "   AND isApproved = 'Y' " +
             "   AND BalTyp = 'I' " +
             "   AND PackDt BETWEEN CONVERT(DATE, :fromDate, 120) AND CONVERT(DATE, :toDate, 120) " +
             "   AND CAST(ShaftNo AS BIGINT) BETWEEN :startShaft AND :endShaft) AS Width_in_mm, " +
             "(SELECT TOP 1 MixDesc FROM tblRGoods " +
             " WHERE POrder = :pOrder " +
             "   AND isApproved = 'Y' " +
             "   AND BalTyp = 'I' " +
             "   AND PackDt BETWEEN CONVERT(DATE, :fromDate, 120) AND CONVERT(DATE, :toDate, 120) " +
             "   AND CAST(ShaftNo AS BIGINT) BETWEEN :startShaft AND :endShaft) AS Mixing, " +
             "COUNT(DISTINCT ShaftNo) AS No_of_Shaft, " +
             "SUM(RNWt) AS Batch_Quantity, " +
             "(SELECT COUNT(DISTINCT BaleNo) / NULLIF(COUNT(DISTINCT ShaftID), 0) " +
             " FROM tblRGoods " +
             " WHERE POrder = :pOrder " +
             "   AND isApproved = 'Y' " +
             "   AND BalTyp = 'I' " +
             "   AND PackDt BETWEEN CONVERT(DATE, :fromDate, 120) AND CONVERT(DATE, :toDate, 120) " +
             "   AND CAST(ShaftNo AS BIGINT) BETWEEN :startShaft AND :endShaft) AS No_of_Rolls_Shaft, " +
             "CASE " +
             " WHEN (SELECT SaleOrder FROM tblOrderInfo WHERE POrder = :pOrder) = '0' THEN 'In House' " +
             " ELSE 'Export' " +
             "END AS IN_HOUSE_EXPORT " +
             "FROM tblRGoods " +
             "WHERE POrder = :pOrder " +
             "  AND isApproved = 'Y' " +
             "  AND BalTyp = 'I' " +
             "  AND PackDt BETWEEN CONVERT(DATE, :fromDate, 120) AND CONVERT(DATE, :toDate, 120) " +
             "  AND CAST(ShaftNo AS BIGINT) BETWEEN :startShaft AND :endShaft", 
     nativeQuery = true)
List<Map<String, Object>> productionDetailsByShaftDate1(
      @Param("pOrder") String pOrder,
      @Param("fromDate") String fromDate,
      @Param("toDate") String toDate,
      @Param("startShaft") Long startShaft,
      @Param("endShaft") Long endShaft);


	 	
	 
	 
	 @Query(value = "SELECT SUM(RNwt) AS netWeight FROM tblRGoods WHERE POrder=:orderNumber AND isApproved = 'Y' AND BalTyp = 'I' AND PackDt BETWEEN :fromDate AND :toDate AND ShaftNo BETWEEN :fromShaft AND :toShaft", nativeQuery = true)
	 List<Map<String, Object>> productionDetailsByShaftDateOrder(@Param("orderNumber") String orderNumber, @Param("fromDate") String fromDate, @Param("toDate") String toDate, @Param("fromShaft") String fromShaft, @Param("toShaft") String toShaft);
	 

	 @Query(value = "SELECT COUNT(DISTINCT(ShaftNo)) AS No_of_Shaft FROM tblRGoods WHERE PackDt BETWEEN :fromDate AND :toDate AND POrder=:pOrder AND ShaftNo BETWEEN :startShaft AND :endShaft AND isApproved = 'Y' AND BalTyp = 'I'", nativeQuery = true)
	 List<Map<String, Object>> batchNumberDetailsByShaftDate(@Param("pOrder") String pOrder, 
             @Param("fromDate") String fromDate, 
             @Param("toDate") String toDate, 
             @Param("startShaft") String startShaft, 
             @Param("endShaft") String endShaft);
	 
	 
	 
	 	// FOR RP BALE BMR
	 
	 @Query(value = "SELECT DISTINCT BaleNo FROM tblRPBale WHERE POrder=:orderNumber AND PackDt BETWEEN :fromdate AND :todate", nativeQuery = true)
	 List<String> rpBaleByOrderDate(@Param("orderNumber") String orderNumber, @Param("fromdate") String fromdate, @Param("todate") String todate);
	 
	 
	 
	 	// FOR RP BALE PRODUCTION DETAILS BY BALE, DATE, ORDER
	 
	 
	 @Query(value = "SELECT " +
             "SUM(NetWt) AS Batch_Quantity, " +
             "(SELECT TOP 1 Brand " +
             " FROM tblOrderInfo " +
             " WHERE POrder = :pOrder) AS Product_Description, " +
             "(SELECT TOP 1 Material " +
             " FROM tblOrderInfo " +
             " WHERE POrder = :pOrder) AS Type_of_Material, " +
             "COUNT(DISTINCT BaleNo) AS No_of_Bales " +
             "FROM tblRPBALE " +
             "WHERE POrder = :pOrder AND PackDt BETWEEN :fromdate AND :todate AND BaleNo BETWEEN :frombale AND :tobale", 
   nativeQuery = true)
	 List<Map<String, Object>> getProductionDetailsRpbaleBaleOrderDate(@Param("pOrder") String pOrder, @Param("fromdate") String fromdate, @Param("todate") String todate,
			 @Param("frombale") String frombale, @Param("tobale") String tobale);
	 

}
