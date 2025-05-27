
package com.focusr.Precot.mssql.database.repository.bleaching;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.Department;
import com.focusr.Precot.payload.spulance.GeminiSplF08Response;
import com.focusr.Precot.payload.spulance.SplDailyProdResponse;
import com.focusr.Precot.payload.spulance.SplOrderDetailsResponse;
import com.focusr.Precot.payload.spulance.SplSampleReportResponse;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

	Optional<Department> findById(Long id);

	@Query(value = "SELECT DEPARTMENT FROM precot.DEPARTMENT WHERE ID=:id", nativeQuery = true)
	String getDeaprtmentById(@Param("id") Long id);

	@Query(value = "SELECT * FROM precot.DEPARTMENT WHERE ID=:id", nativeQuery = true)
	Optional<Department> findByDepartmentById(@Param("id") Long id);

	@Query(value = "SELECT CONTROLLED_DESCRIPTION FROM precot.BLEACH_ALL_FORMATS WHERE DEPARTMENT_ID=:id", nativeQuery = true)
	List<String> formNameList(@Param("id") Long id);

	@Query(value = "SELECT DEPARTMENT FROM precot.DEPARTMENT", nativeQuery = true)
	List<String> getAllDeaprtmentNames();

	/**
	 * SPULANCE SAP
	 */

	@Query(value = "SELECT POrder FROM tblOrderInfo WHERE Material LIKE 'RG%' AND Material NOT LIKE 'RGPW%' AND Sts = 1", nativeQuery = true)
	List<String> fetchSpulanceOrder();

	@Query(value = "SELECT tb.POrder FROM tblRPBale tb\r\n"
			+ "INNER JOIN tblOrderInfo toi ON toi.POrder = tb.POrder \r\n"
			+ "WHERE tb.PackDt = :packDate AND tb.ShiftId = :shift \r\n"
			+ "AND toi.Material LIKE 'RPBALE%' AND toi.Sts = 1 ;", nativeQuery = true)
	List<String> getSpulanceOrderByDate(@Param("packDate") String packDate, @Param("shift") String shift);

	@Query(value = "SELECT DISTINCT tb.POrder FROM tblBCons tb INNER JOIN tblOrderInfo toi ON toi.POrder = tb.POrder WHERE tb.ConsDt =:packDate AND tb.ShiftId =:shift AND toi.Material LIKE 'RG%' AND toi.Material NOT LIKE 'RGPW%' AND toi.Sts = 1", nativeQuery = true)
	List<String> fetchSpulanceOrderByDate(@Param("packDate") String packDate, @Param("shift") String shift);

	// GET DATA FROM RGoods by Date & Shift

	@Query(value = "SELECT DISTINCT tb.POrder FROM tblRGoods tb INNER JOIN tblOrderInfo toi ON toi.POrder = tb.POrder WHERE tb.PackDt =:packDate AND tb.ShiftId =:shift AND toi.Material LIKE 'RG%' AND toi.Material NOT LIKE 'RGPW%' AND toi.Sts = 1", nativeQuery = true)
	List<String> fetchSpulanceGoodsOrderByDate(@Param("packDate") String packDate, @Param("shift") String shift);

	@Query(value = "SELECT MixDesc AS mix, gsm AS gsm, Brand AS customerName, Material AS material, PatternDesc AS patternDescription, width AS width FROM tblOrderInfo WHERE POrder=:order", nativeQuery = true)
	List<SplOrderDetailsResponse> orderResponse(@Param("order") String order);

//	@Query(value= "SELECT BaleNo, NetWt FROM tblBCons WHERE POrder=:order", nativeQuery = true)
//	List<SplBaleConsumptionResponse> fetchBaleByOrder(@Param("order") String order);
//k
	@Query(value = "SELECT BaleNo, NetWt FROM tblBCons WHERE POrder=:order AND ConsDt =:date AND ShiftID=:shift", nativeQuery = true)
	List<Map<String, Object>> fetchBaleByOrder(@Param("order") String order, @Param("date") String date,
			@Param("shift") String shift);

	@Query(value = "SELECT BatchNo FROM tblBalePack WHERE BaleNo=:baleNumber", nativeQuery = true)
	List<BigDecimal> fetchBatchByBale(@Param("baleNumber") String baleNumber);

	@Query(value = "SELECT BaleNo, NetWt FROM tblBCons WHERE POrder=:order AND BaleNo LIKE 'R%'", nativeQuery = true)
	List<Map<String, Object>> fetchSplBaleByOrder(@Param("order") String order);

	// DAILY PRODUCTION REPORT - F06

	@Query(value = "SELECT ShaftNo AS shaftNo, BaleNo AS baleNo, PLen AS length, PWid AS width, RNWt AS totalWeight, PGSM AS gsm, Moisture AS moisture, RDia AS diameter, PatternDesc AS pattern FROM tblRGoods WHERE isApproved = 'Y' AND BalTyp = 'I' AND PackDt=:date AND ShiftID=:shift AND POrder=:order", nativeQuery = true)
	List<SplDailyProdResponse> fetchProductionDetails(@Param("order") String order, @Param("date") String date,
			@Param("shift") String shift);

	@Query(value = "SELECT ShaftNo AS shaftNo, BaleNo AS baleNo, PLen AS length, PWid AS width, RNWt AS totalWeight, PGSM AS gsm, Moisture AS moisture, RDia AS diameter, PatternDesc AS pattern, POrder AS orderNo, Brand AS customerName FROM tblRGoods WHERE isApproved = 'R' AND BalTyp = 'I' AND PackDt=:date AND ShiftID=:shift AND POrder =:order", nativeQuery = true)
	List<SplDailyProdResponse> fetchRejectionDetails(@Param("date") String date, @Param("shift") String shift,
			@Param("order") String order);

	// STOPPAGE REPORT - F08

	@Query(value = "SELECT POrder1, POrder2, POrder3 FROM tblSSpl WHERE PackDt=:date AND SType='RUN'", nativeQuery = true)
	List<Object[]> stoppageResponse(@Param("date") String date);

	@Query(value = "SELECT RNwt, Brand, POrder FROM tblRGoods WHERE POrder=:order", nativeQuery = true)
	List<Object[]> weightStoppage(@Param("order") String order);

	// STOPPAGE - 2

	@Query(value = "WITH StoppageData AS (" + "    SELECT " + "        S.SCause, " + "        M.SCode, "
			+ "        CASE " + "            WHEN M.SCode IN ('LC', 'SCL', 'CL', 'MI', 'ER', 'MR') THEN M.SCode "
			+ "            ELSE 'Others' " + "        END AS StoppageCategory, " + "        S.TotHrs "
			+ "    FROM tblSSpl S " + "    JOIN tblSCMst M ON S.SCause = M.SCause " + "    WHERE S.PackDt = :date "
			+ ") " + "SELECT DISTINCT" + "    SCause, " + "    SCode, " + "    StoppageCategory, "
			+ "    SUM(TotHrs) OVER (PARTITION BY SCause, SCode, StoppageCategory) AS TotalHours, "
			+ "    COUNT(*) OVER (PARTITION BY SCause, SCode, StoppageCategory) AS StoppageCount "
			+ "FROM StoppageData " + "ORDER BY StoppageCategory;", nativeQuery = true)
	List<Object[]> getStoppageDetails(@Param("date") String date);
//	

//	@Query(value = "WITH StoppageData AS (\r\n"
//			+ "    SELECT \r\n"
//			+ "        S.SCause, \r\n"
//			+ "        M.SCode, \r\n"
//			+ "        CASE \r\n"
//			+ "            WHEN M.SCode IN ('LC', 'SCL', 'CL', 'MI', 'ER', 'MR') THEN M.SCode \r\n"
//			+ "            ELSE 'Others' \r\n"
//			+ "        END AS StoppageCategory, \r\n"
//			+ "        S.TotHrs \r\n"
//			+ "    FROM tblSSpl S \r\n"
//			+ "    JOIN tblSCMst M ON S.SCause = M.SCause \r\n"
//			+ "    WHERE S.PackDt = :date \r\n"
//			+ ")\r\n"
//			+ "SELECT \r\n"
//			+ "    SCause, \r\n"
//			+ "    SCode, \r\n"
//			+ "    StoppageCategory, \r\n"
//			+ "    SUM(TotHrs) AS TotalHours,  -- Sum the hours explicitly\r\n"
//			+ "    COUNT(*) AS StoppageCount   -- Count the occurrences explicitly\r\n"
//			+ "FROM StoppageData\r\n"
//			+ "GROUP BY SCause, SCode, StoppageCategory  -- Group by unique combinations\r\n"
//			+ "ORDER BY StoppageCategory", 
//    nativeQuery = true)
//List<Object[]> getStoppageDetails(@Param("date") String date);

//	@Query(value = "WITH OrderList AS (\r\n"
//			+ "  SELECT POrder1 AS OrderValue\r\n"
//			+ "  FROM tblSSpl\r\n"
//			+ "  WHERE PackDt =:date AND SType = 'RUN'\r\n"
//			+ "  UNION ALL\r\n"
//			+ "  SELECT POrder2 AS OrderValue\r\n"
//			+ "  FROM tblSSpl\r\n"
//			+ "  WHERE PackDt =:date AND SType = 'RUN'\r\n"
//			+ "  UNION ALL\r\n"
//			+ "  SELECT POrder3 AS OrderValue\r\n"
//			+ "  FROM tblSSpl\r\n"
//			+ "  WHERE PackDt =:date AND SType = 'RUN'\r\n"
//			+ ")\r\n"
//			+ "SELECT TOP 1 WITH TIES\r\n"
//			+ "  POrder,\r\n"
//			+ "  RGWt AS MaxWeight,\r\n"
//			+ "  Brand\r\n"
//			+ "FROM tblRGoods tr\r\n"
//			+ "WHERE POrder IN (SELECT OrderValue FROM OrderList)\r\n"
//			+ "  AND PackDt =:date\r\n"
//			+ "ORDER BY RGWt DESC", nativeQuery = true)
//	List<Object[]> fetchStoppageDetails(@Param("date") String date);

//	@Query(value = "WITH MaxRNwtPerPOrder AS (" +
//            "    SELECT POrder, MAX(RNwt) AS MaxRNwt " +
//            "    FROM tblRGoods " +
//            "    WHERE POrder IN (" +
//            "        SELECT POrder1 FROM tblSSpl " +
//            "        WHERE PackDt = :date AND Stype = 'RUN' AND POrder1 IS NOT NULL AND POrder1 <> '' " +
//            "        UNION " +
//            "        SELECT POrder2 FROM tblSSpl " +
//            "        WHERE PackDt = :date AND Stype = 'RUN' AND POrder2 IS NOT NULL AND POrder2 <> '' " +
//            "        UNION " +
//            "        SELECT POrder3 FROM tblSSpl " +
//            "        WHERE PackDt = :date AND Stype = 'RUN' AND POrder3 IS NOT NULL AND POrder3 <> '' " +
//            "    ) " +
//            "    GROUP BY POrder " +
//            ") " +
//            "SELECT DISTINCT m.POrder, m.MaxRNwt, r.Brand " +
//            "FROM MaxRNwtPerPOrder m " +
//            "JOIN tblRGoods r ON m.POrder = r.POrder AND m.MaxRNwt = r.RNwt", 
//    nativeQuery = true)
	@Query(value = "WITH POrders AS ( " + "    SELECT POrder1 AS POrder FROM tblSSpl "
			+ "    WHERE PackDt = :date AND Stype = 'RUN' AND POrder1 IS NOT NULL AND POrder1 <> '' " + "    UNION "
			+ "    SELECT POrder2 AS POrder FROM tblSSpl "
			+ "    WHERE PackDt = :date AND Stype = 'RUN' AND POrder2 IS NOT NULL AND POrder2 <> '' " + "    UNION "
			+ "    SELECT POrder3 AS POrder FROM tblSSpl "
			+ "    WHERE PackDt = :date AND Stype = 'RUN' AND POrder3 IS NOT NULL AND POrder3 <> '' " + "), "
			+ "MaxRNwtPerPOrder AS ( " + "    SELECT POrder, MAX(RNwt) AS MaxRNwt, ShiftID " + "    FROM tblRGoods "
			+ "    WHERE POrder IN (SELECT POrder FROM POrders) " + "    GROUP BY POrder, ShiftID " + "), "
			+ "FinalResults AS ( " + "    SELECT DISTINCT m.POrder, m.MaxRNwt, r.Brand, m.ShiftID "
			+ "    FROM MaxRNwtPerPOrder m " + "    JOIN tblRGoods r ON m.POrder = r.POrder AND m.MaxRNwt = r.RNwt "
			+ ") " + "SELECT * FROM FinalResults;", nativeQuery = true)
	List<Object[]> fetchStoppageDetails(@Param("date") String date);

//	@Query(value = "WITH OrderList AS (\r\n"
//			+ "  SELECT POrder1 AS OrderValue\r\n"
//			+ "  FROM tblSSpl\r\n"
//			+ "  WHERE PackDt =:date AND SType = 'RUN'\r\n"
//			+ "  UNION ALL\r\n"
//			+ "  SELECT POrder2 AS OrderValue\r\n"
//			+ "  FROM tblSSpl\r\n"
//			+ "  WHERE PackDt =:date AND SType = 'RUN'\r\n"
//			+ "  UNION ALL\r\n"
//			+ "  SELECT POrder3 AS OrderValue\r\n"
//			+ "  FROM tblSSpl\r\n"
//			+ "  WHERE PackDt =:date AND SType = 'RUN'\r\n"
//			+ ")\r\n"
//			+ "SELECT TOP 1 WITH TIES\r\n"
//			+ "  POrder,\r\n"
//			+ "  RGWt AS MaxWeight,\r\n"
//			+ "  Brand\r\n"
//			+ "FROM tblRGoods tr\r\n"
//			+ "WHERE POrder IN (SELECT OrderValue FROM OrderList)\r\n"
//			+ "  AND PackDt =:date\r\n"
//			+ "ORDER BY RGWt DESC", nativeQuery = true)
//	SpulanceOrderResponse fetchStoppageDetails1(@Param("date") String date);

	/**
	 * SAMPLE REPORT - ORDER INFOS
	 */

	@Query(value = "SELECT POrder FROM tblOrderInfo WHERE Material LIKE 'SRG%' AND Sts = 1", nativeQuery = true)
	List<String> fetchSampleReportOrder();

	@Query(value = "SELECT PONo FROM tblOrderInfo WHERE Material LIKE 'SRG%' AND Sts = 1 AND POrder=:order", nativeQuery = true)
	String fetchQuestionByorder(@Param("order") String order);

	@Query(value = "SELECT ShaftNo AS shaftNo, BaleNo AS baleNo, PLen AS length, PWid AS width, RGWt AS weight, PGSM AS gsm, Moisture AS moisture, RDia AS diameter, PatternDesc AS pattern FROM tblRGoods WHERE PackDt=:date AND ShiftID=:shift AND POrder=:order AND BalTyp = 'I' AND isApproved = 'Y'", nativeQuery = true)
	List<SplSampleReportResponse> sampleReportByDateOrder(@Param("date") String date, @Param("shift") String shift,
			@Param("order") String order);

	/**
	 * PROCESS SETUP VERIFICATION - RP BALE PRESS
	 */

	@Query(value = "SELECT POrder FROM tblOrderInfo WHERE Material LIKE 'RPBALE%' AND Sts = 1", nativeQuery = true)
	List<String> fetchProcessOrders();

	@Query(value = "SELECT DISTINCT tr.POrder FROM tblRPBale tr INNER JOIN tblOrderInfo toi ON toi.POrder = tr.POrder WHERE toi.Material LIKE 'RPBALE%' AND toi.Sts = 1 AND tr.PackDt=:packDate AND tr.ShiftID=:shift", nativeQuery = true)
	List<String> fetchProcessOrderBydate(@Param("packDate") String packDate, @Param("shift") String shift);

	@Query(value = "SELECT DISTINCT POrder FROM tblRGoods tr WHERE BalTyp = 'S' AND PackDt=:packDate AND ShiftID=:shift", nativeQuery = true)
	List<String> fetchProcessOrderBydateSliterWinder(@Param("packDate") String packDate, @Param("shift") String shift);

	/**
	 * RP BALE INFORMATION RETRIVAL
	 */
	@Query(value = "SELECT BaleNo, NetWt FROM tblRPBale WHERE POrder =:order AND PackDt =:date AND ShiftID =:shift", nativeQuery = true)
	List<Map<String, String>> fetchBaleWeightByOrderDateShift(@Param("order") String order, @Param("date") String date,
			@Param("shift") String shift);

	/**
	 * SHIFT WISE DAILY SLITER WINDER PRODUCTION REPORT F017
	 */
	@Query(value = "SELECT * FROM tblOrderInfo WHERE Material LIKE 'RG%' AND Material NOT LIKE 'RGPW%' AND sts = '1' AND SaleOrder IS NOT NULL AND SaleOrder <> 0 AND POrder = :order", nativeQuery = true)
	List<Object[]> getDailySliterWinderProductionByOrderNo(@Param("order") String order);

	// F016
//		@Query(value = "SELECT POrder FROM tblOrderInfo WHERE Material LIKE 'RG%' AND Material NOT LIKE 'RGPW%' AND sts = '1' AND SaleOrder IS NOT NULL AND SaleOrder <> 0", nativeQuery = true)
//		List<String> getOrderNoLovSliderWinder();

	@Query(value = "SELECT DISTINCT POrder FROM tblRGoods tr WHERE BalTyp = 'S' AND PackYear = YEAR(GETDATE())", nativeQuery = true)
	List<String> getOrderNoLovSliderWinder();

	@Query(value = "SELECT DISTINCT tr.POrder FROM tblRGoods tr INNER JOIN tblOrderInfo toi ON toi.POrder = tr.POrder WHERE toi.Material LIKE 'RG%' AND toi.Material NOT LIKE 'RGPW%' AND toi.sts = '1' AND toi.SaleOrder IS NOT NULL AND toi.SaleOrder <> 0 AND tr.PackDt =:packDate AND tr.ShiftID=:shift", nativeQuery = true)
	List<String> orderLovSliterWinderByDate(@Param("packDate") String packDate, @Param("shift") String shift);

	/**
	 * ROLL GOODS INFORMATION RETRIEVAL
	 */

//	@Query(value = "SELECT * \r\n"
//			+ "FROM tblRGoods \r\n"
//			+ "WHERE POrder = :order \r\n"
//			+ " AND PackDt = :date \r\n"
//			+ " AND ShiftID = :shift \r\n"
//			+ " AND isApproved = 'Y' \r\n"
//			+ " AND BalTyp = 'S'", nativeQuery = true)
//	List<Object[]> roleGoodsInformationbyOrderDateShift(@Param("order") String order,@Param("date") String date, @Param("shift") String shift);

	@Query(value = "SELECT BaleNo,ShaftID,PackDt,ShiftID,BalTyp,POrder,GrsWt,PWid,PLen,RGWt,RNWt  \r\n"
			+ "FROM tblRGoods \r\n" + "WHERE POrder = :order \r\n" + " AND PackDt = :date \r\n"
			+ " AND ShiftID = :shift \r\n" + " AND isApproved = 'Y' \r\n" + " AND BalTyp = 'S'", nativeQuery = true)
	List<Object[]> roleGoodsInformationbyOrderDateShiftright(@Param("order") String order, @Param("date") String date,
			@Param("shift") String shift);

	@Query(value = "SELECT COUNT(BaleNo) AS BaleCount, SUM(RNWt) AS TotalGrsWt,SUM(TWidth) AS TotalTWid, SUM(PLen) AS TotalPLen \r\n"
			+ "FROM tblRGoods \r\n" + "WHERE POrder = :order \r\n" + " AND PackDt = :date \r\n"
			+ " AND ShiftID = :shift \r\n" + " AND isApproved = 'Y' \r\n" + " AND BalTyp = 'S'", nativeQuery = true)
	List<Object[]> roleGoodsInformationbyOrderDateShiftLeft(@Param("order") String order, @Param("date") String date,
			@Param("shift") String shift);

	// F15
//	 @Query(value = "WITH TimeRange AS ( " +
//	            " SELECT Ftime, TTime " +
//	            " FROM tblSFNG " +
//	            " WHERE PackDt = :date " +
//	            " AND MCN = 'RPBPRESS' " +
//	            " AND STYPE = 'RUN' " +
//	            "), " +
//	            " FilteredStops AS ( " +
//	            " SELECT S.SCause, S.TotHrs, S.POrder " +
//	            " FROM tblSFNG S " +
//	            " JOIN TimeRange T ON S.PackDt = :date " +
//	            " WHERE S.MCN = 'RPBPRESS' " +
//	            " AND S.STYPE = 'stop' " +
//	            "), " +
//	            " JoinedStops AS ( " +
//	            " SELECT FS.POrder, FS.SCause, FS.TotHrs, M.SCode " +
//	            " FROM FilteredStops FS " +
//	            " JOIN tblSCMst M ON FS.SCause = M.SCause " +
//	            "), " +
//	            " AggregatedResults AS ( " +
//	            " SELECT POrder, " +
//	            " SUM(CASE WHEN SCode = 'CG' THEN TotHrs ELSE 0 END) AS CG_Hours, " +
//	            " SUM(CASE WHEN SCode = 'MI' THEN TotHrs ELSE 0 END) AS MI_Hours, " +
//	            " SUM(CASE WHEN SCode = 'MR' THEN TotHrs ELSE 0 END) AS MR_Hours, " +
//	            " SUM(CASE WHEN SCode = 'ER' THEN TotHrs ELSE 0 END) AS ER_Hours, " +
//	            " SUM(CASE WHEN SCode NOT IN ('CG', 'MI', 'MR', 'ER') THEN TotHrs ELSE 0 END) AS Others_Hours " +
//	            " FROM JoinedStops " +
//	            " GROUP BY POrder " +
//	            "), " +
//	            " FinalResults AS ( " +
//	            " SELECT a.ShiftID, a.POrder, SUM(a.NetWt) AS TotalNetWeight, COUNT(a.BaleNo) AS BaleCount, " +
//	            " ar.CG_Hours, ar.MI_Hours, ar.MR_Hours, ar.ER_Hours, ar.Others_Hours, " +
//	            " (ar.CG_Hours + ar.MI_Hours + ar.MR_Hours + ar.ER_Hours + ar.Others_Hours) AS Total_Hours " +
//	            " FROM tblRPBale a " +
//	            " INNER JOIN tblSFNG b ON a.PackDt = b.PackDt AND a.ShiftID = b.ShiftID AND a.POrder = b.POrder " +
//	            " LEFT JOIN AggregatedResults ar ON a.POrder = ar.POrder " +
//	            " WHERE a.PackDt = :date " +
//	            " AND b.MCN = 'RPBPRESS' " +
//	            " AND b.STYPE = 'RUN' " +
//	            " GROUP BY a.ShiftID, a.POrder, ar.CG_Hours, ar.MI_Hours, ar.MR_Hours, ar.ER_Hours, ar.Others_Hours " +
//	            ") " +
//	            " SELECT * FROM FinalResults",
//	            nativeQuery = true)
//	    List<Object[]> getAggregatedResultsByDate(@Param("date") String date);

	@Query(value = "WITH TimeRange AS (\r\n" + "    SELECT S.POrder, FTime, TTime, ShiftID\r\n"
			+ "    FROM [PDE].[dbo].[tblSFNG] S\r\n" + "    WHERE S.PackDt = '2025-01-01'\r\n"
			+ "      AND S.MCN = 'RPBPRESS'\r\n" + "      AND S.STYPE = 'RUN'\r\n" + "),\r\n" + "FilteredStops AS (\r\n"
			+ "    SELECT S.SCause, S.TotHrs, TR.POrder, TR.ShiftID\r\n" + "    FROM TimeRange TR\r\n"
			+ "    LEFT JOIN [PDE].[dbo].[tblSFNG] S\r\n" + "        ON S.PackDt = '2025-01-01'\r\n"
			+ "        AND S.MCN = 'RPBPRESS'\r\n" + "        AND S.STYPE = 'stop'\r\n"
			+ "        AND S.ShiftID = TR.ShiftID\r\n" + "),\r\n" + "JoinedStops AS (\r\n"
			+ "    SELECT FS.POrder, FS.ShiftID, FS.SCause, FS.TotHrs, M.SCode\r\n" + "    FROM FilteredStops FS\r\n"
			+ "    LEFT JOIN tblSCMst M ON FS.SCause = M.SCause\r\n" + "),\r\n" + "AggregatedResults AS (\r\n"
			+ "    SELECT\r\n" + "        POrder,\r\n" + "        ShiftID,\r\n"
			+ "        SUM(CASE WHEN SCode = 'CG' THEN TotHrs ELSE 0 END) AS CG_Hours,\r\n"
			+ "        SUM(CASE WHEN SCode = 'MI' THEN TotHrs ELSE 0 END) AS MI_Hours,\r\n"
			+ "        SUM(CASE WHEN SCode = 'MR' THEN TotHrs ELSE 0 END) AS MR_Hours,\r\n"
			+ "        SUM(CASE WHEN SCode = 'ER' THEN TotHrs ELSE 0 END) AS ER_Hours,\r\n"
			+ "        SUM(CASE WHEN SCode NOT IN ('CG', 'MI', 'MR', 'ER') THEN TotHrs ELSE 0 END) AS Others_Hours\r\n"
			+ "    FROM JoinedStops\r\n" + "    GROUP BY POrder, ShiftID\r\n" + "),\r\n" + "FinalResults AS (\r\n"
			+ "    SELECT\r\n" + "        TR.ShiftID,\r\n" + "        TR.POrder,\r\n"
			+ "        COALESCE(SUM(a.NetWt), 0) AS TotalNetWeight,\r\n"
			+ "        COALESCE(COUNT(a.BaleNo), 0) AS BaleCount,\r\n"
			+ "        COALESCE(ar.CG_Hours, 0) AS CG_Hours,\r\n" + "        COALESCE(ar.MI_Hours, 0) AS MI_Hours,\r\n"
			+ "        COALESCE(ar.MR_Hours, 0) AS MR_Hours,\r\n" + "        COALESCE(ar.ER_Hours, 0) AS ER_Hours,\r\n"
			+ "        COALESCE(ar.Others_Hours, 0) AS Others_Hours,\r\n"
			+ "        COALESCE((ar.CG_Hours + ar.MI_Hours + ar.MR_Hours + ar.ER_Hours + ar.Others_Hours), 0) AS Total_Hours\r\n"
			+ "    FROM TimeRange TR\r\n" + "    LEFT JOIN tblRPBale a\r\n" + "        ON TR.POrder = a.POrder\r\n"
			+ "        AND TR.ShiftID = a.ShiftID\r\n" + "        AND a.PackDt = '2025-01-01'\r\n"
			+ "    LEFT JOIN AggregatedResults ar\r\n" + "        ON TR.POrder = ar.POrder\r\n"
			+ "        AND TR.ShiftID = ar.ShiftID\r\n"
			+ "    GROUP BY TR.ShiftID, TR.POrder, ar.CG_Hours, ar.MI_Hours, ar.MR_Hours, ar.ER_Hours, ar.Others_Hours\r\n"
			+ ")\r\n" + "SELECT *\r\n" + "FROM FinalResults", nativeQuery = true)
	List<Object[]> getAggregatedResultsByDate(@Param("date") String date);

	// F11
	@Query(value = "WITH FromOrderInfo AS ( \r\n" + " SELECT \r\n" + " POrder, \r\n" + " MixDesc \r\n"
			+ " FROM tblOrderInfo \r\n" + " WHERE POrder = :fromOrderNo \r\n" + "), \r\n" + "ToOrderInfo AS ( \r\n"
			+ " SELECT \r\n" + " O.POrder, \r\n" + " O.Brand AS ProductName, \r\n" + " O.MixDesc AS MixingTo, \r\n"
			+ " R.ShaftNo, \r\n" + " R.BaleNo AS RollNumber, \r\n" + " R.PLen, \r\n" + " R.PWid, \r\n" + " R.RNWt, \r\n"
			+ " R.PGSM, \r\n" + " R.Moisture, \r\n" + " R.RDia, \r\n" + " R.PatternDesc, \r\n"
			+ " (R.NoR * R.PWid) AS NoOfRollsCrossWidth \r\n" + " FROM tblOrderInfo O \r\n"
			+ " JOIN tblRGoods R ON O.POrder = R.POrder \r\n" + " WHERE O.POrder = :toOrderNo \r\n"
			+ " AND R.BaleNo = :baleNo \r\n" + ") \r\n" + "SELECT \r\n" + " F.MixDesc AS MixingFrom, \r\n" + " T.* \r\n"
			+ "FROM FromOrderInfo F \r\n" + "CROSS JOIN ToOrderInfo T", nativeQuery = true)
	List<Object[]> getOrderDetails(@Param("fromOrderNo") String fromOrderNo, @Param("toOrderNo") String toOrderNo,
			@Param("baleNo") String baleNo);

	// Bale LOV
	@Query(value = "SELECT BaleNo from tblRgoods WHERE POrder =:order", nativeQuery = true)
	List<String> baleLovByOrderNo(@Param("order") String order);

	// F18
	@Query(value = "WITH TimeRange AS (\r\n" + "    SELECT FTime, TTime \r\n" + "    FROM [PDE].[dbo].[tblSFNG] \r\n"
			+ "    WHERE PackDt = :date \r\n" + "    AND MCN = 'SRW' \r\n" + "    AND STYPE = 'RUN'\r\n" + "),\r\n"
			+ "FilteredStops AS (\r\n" + "    SELECT S.SCause, S.TotHrs, S.ShiftID\r\n"
			+ "    FROM [PDE].[dbo].[tblSFNG] S \r\n" + "    JOIN TimeRange T ON S.PackDt = :date \r\n"
			+ "    WHERE S.MCN = 'SRW' \r\n" + "    AND S.STYPE = 'stop'\r\n" + "),\r\n" + "JoinedStops AS (\r\n"
			+ "    SELECT FS.SCause, FS.TotHrs, M.SCode, FS.ShiftID\r\n" + "    FROM FilteredStops FS \r\n"
			+ "    JOIN [PDE].[dbo].[tblSCMst] M ON FS.SCause = M.SCause\r\n" + "),\r\n" + "AggregatedResults AS (\r\n"
			+ "    SELECT\r\n" + "        ShiftID,  \r\n"
			+ "        SUM(CASE WHEN SCode = 'CG' THEN TotHrs ELSE 0 END) AS LC_Hours, \r\n"
			+ "        SUM(CASE WHEN SCode = 'MR' THEN TotHrs ELSE 0 END) AS MR_Hours, \r\n"
			+ "        SUM(CASE WHEN SCode = 'ER' THEN TotHrs ELSE 0 END) AS ER_Hours,\r\n"
			+ "		SUM(CASE WHEN SCode = 'SCL'THEN TotHrs ELSE 0 END) AS GR_Clean,\r\n"
			+ "        SUM(CASE WHEN SCode NOT IN ('CG', 'MR', 'ER') THEN TotHrs ELSE 0 END) AS Others_Hours \r\n"
			+ "    FROM JoinedStops\r\n" + "    GROUP BY ShiftID\r\n" + "),\r\n" + "OrderInfo AS (\r\n"
			+ "    SELECT\r\n" + "        Brand AS ProductName,\r\n" + "        POrder,\r\n"
			+ "        Qty AS ProdInKg\r\n" + "    FROM [PDE].[dbo].[tblOrderInfo]\r\n"
			+ "    WHERE Material LIKE 'RG%' \r\n" + "    AND Material NOT LIKE 'RGPW%' \r\n" + "    AND sts = '1' \r\n"
			+ "    AND SaleOrder IS NOT NULL \r\n" + "    AND SaleOrder <> 0\r\n" + ")\r\n" + "SELECT \r\n"
			+ "    A.ShiftID,\r\n" + "    O.ProductName,\r\n" + "    O.POrder AS OrderNo,\r\n" + "    O.ProdInKg,\r\n"
			+ "    A.LC_Hours AS LC,\r\n" + "    A.MR_Hours AS MR,\r\n" + "    A.ER_Hours AS ER,\r\n"
			+ "	A.GR_Clean AS GR,\r\n" + "    A.Others_Hours AS Other,\r\n"
			+ "    (A.LC_Hours + A.Others_Hours) AS TotalDowntime,\r\n"
			+ "    (A.ER_Hours + A.MR_Hours) AS TotalBreakdown,\r\n"
			+ "    (A.LC_Hours + A.Others_Hours + A.ER_Hours + A.MR_Hours) AS TotalTimeInMin\r\n"
			+ "FROM OrderInfo O\r\n" + "CROSS JOIN AggregatedResults A;", nativeQuery = true)
	List<Object[]> getStoppageDetailsF18(@Param("date") String date);

//		    @Query(value = "WITH POrders AS ( " +
//		               "    SELECT POrder1 AS POrder FROM tblSSpl " +
//		               "    WHERE PackDt = :date AND Stype = 'RUN' AND POrder1 IS NOT NULL AND POrder1 <> '' " +
//		               "    UNION " +
//		               "    SELECT POrder2 AS POrder FROM tblSSpl " +
//		               "    WHERE PackDt = :date AND Stype = 'RUN' AND POrder2 IS NOT NULL AND POrder2 <> '' " +
//		               "    UNION " +
//		               "    SELECT POrder3 AS POrder FROM tblSSpl " +
//		               "    WHERE PackDt = :date AND Stype = 'RUN' AND POrder3 IS NOT NULL AND POrder3 <> '' " +
//		               "), " +
//		               "MaxRNwtPerPOrder AS ( " +
//		               "    SELECT POrder, MAX(RNwt) AS MaxRNwt, ShiftID " +
//		               "    FROM tblRGoods " +
//		               "    WHERE POrder IN (SELECT POrder FROM POrders) " +
//		               "    GROUP BY POrder, ShiftID " +
//		               "), " +
//		               "FinalResults AS ( " +
//		               "    SELECT DISTINCT m.POrder, m.MaxRNwt, r.Brand, m.ShiftID " +
//		               "    FROM MaxRNwtPerPOrder m " +
//		               "    JOIN tblRGoods r ON m.POrder = r.POrder AND m.MaxRNwt = r.RNwt " +
//		               "), " +
//		               "StoppageData AS ( " +
//		               "    SELECT " +
//		               "        S.SCause, " +
//		               "        M.SCode, " +
//		               "        CASE " +
//		               "            WHEN M.SCode IN ('LC', 'SCL', 'CL', 'MI', 'ER', 'MR') THEN M.SCode " +
//		               "            ELSE 'Others' " +
//		               "        END AS StoppageCategory, " +
//		               "        SUM(S.TotHrs) AS TotalHours, " +
//		               "        COUNT(*) AS StoppageCount " +
//		               "    FROM tblSSpl S " +
//		               "    JOIN tblSCMst M ON S.SCause = M.SCause " +
//		               "    WHERE S.PackDt = :date " +
//		               "    GROUP BY S.SCause, M.SCode " +
//		               ") " +
//		               "SELECT " +
//		               "    f.POrder, " +
//		               "    f.MaxRNwt, " +
//		               "    f.Brand, " +
//		               "    f.ShiftID, " +
//		               "    s.SCause, " +
//		               "    s.SCode, " +
//		               "    s.StoppageCategory, " +
//		               "    s.TotalHours, " +
//		               "    s.StoppageCount " +
//		               "FROM FinalResults f " +
//		               "LEFT JOIN StoppageData s ON f.POrder = s.SCause " +
//		               "ORDER BY s.StoppageCategory;",
//		       nativeQuery = true)
//		List<Object[]> fetchStoppageDetails1(@Param("date") String date);

	@Query(value = "WITH POrders AS ( " + "    SELECT POrder1 AS POrder FROM tblSSpl "
			+ "    WHERE PackDt = :date AND Stype = 'RUN' AND POrder1 IS NOT NULL AND POrder1 <> '' " + "    UNION "
			+ "    SELECT POrder2 AS POrder FROM tblSSpl "
			+ "    WHERE PackDt = :date AND Stype = 'RUN' AND POrder2 IS NOT NULL AND POrder2 <> '' " + "    UNION "
			+ "    SELECT POrder3 AS POrder FROM tblSSpl "
			+ "    WHERE PackDt = :date AND Stype = 'RUN' AND POrder3 IS NOT NULL AND POrder3 <> '' " + "), "
			+ "MaxRNwtPerPOrder AS ( " + "    SELECT POrder, MAX(RNwt) AS MaxRNwt, ShiftID " + "    FROM tblRGoods "
			+ "    WHERE POrder IN (SELECT POrder FROM POrders) " + "    GROUP BY POrder, ShiftID " + "), "
			+ "FinalResults AS ( " + "    SELECT DISTINCT m.POrder, m.MaxRNwt, r.Brand, m.ShiftID "
			+ "    FROM MaxRNwtPerPOrder m " + "    JOIN tblRGoods r ON m.POrder = r.POrder AND m.MaxRNwt = r.RNwt "
			+ "), " + "StoppageData AS ( " + "    SELECT " + "        S.ShiftId, "
			+ "        SUM(CASE WHEN M.SCode = 'LC' THEN S.TotHrs ELSE 0 END) AS LC_TotalHours, "
			+ "        SUM(CASE WHEN M.SCode = 'SCL' THEN S.TotHrs ELSE 0 END) AS SCL_TotalHours, "
			+ "        SUM(CASE WHEN M.SCode = 'CL' THEN S.TotHrs ELSE 0 END) AS CL_TotalHours, "
			+ "        SUM(CASE WHEN M.SCode = 'MI' THEN S.TotHrs ELSE 0 END) AS MI_TotalHours, "
			+ "        SUM(CASE WHEN M.SCode = 'ER' THEN S.TotHrs ELSE 0 END) AS ER_TotalHours, "
			+ "        SUM(CASE WHEN M.SCode = 'MR' THEN S.TotHrs ELSE 0 END) AS MR_TotalHours, "
			+ "        SUM(CASE WHEN M.SCode NOT IN ('LC', 'SCL', 'CL', 'MI', 'ER', 'MR') THEN S.TotHrs ELSE 0 END) AS Others_TotalHours, "
			+ "        COUNT(CASE WHEN M.SCode = 'LC' THEN 1 ELSE NULL END) AS LC_Count, "
			+ "        COUNT(CASE WHEN M.SCode = 'SCL' THEN 1 ELSE NULL END) AS SCL_Count, "
			+ "        COUNT(CASE WHEN M.SCode = 'CL' THEN 1 ELSE NULL END) AS CL_Count, "
			+ "        COUNT(CASE WHEN M.SCode = 'MI' THEN 1 ELSE NULL END) AS MI_Count, "
			+ "        COUNT(CASE WHEN M.SCode = 'ER' THEN 1 ELSE NULL END) AS ER_Count, "
			+ "        COUNT(CASE WHEN M.SCode = 'MR' THEN 1 ELSE NULL END) AS MR_Count, "
			+ "        COUNT(CASE WHEN M.SCode NOT IN ('LC', 'SCL', 'CL', 'MI', 'ER', 'MR') THEN 1 ELSE NULL END) AS Others_Count "
			+ "    FROM tblSSpl S " + "    JOIN tblSCMst M ON S.SCause = M.SCause " + "    WHERE S.PackDt = :date "
			+ "    GROUP BY S.ShiftId " + ") " + "SELECT " + "    f.POrder, " + "    f.MaxRNwt, " + "    f.Brand, "
			+ "    f.ShiftID, " + "    s.LC_TotalHours, " + "    s.SCL_TotalHours, " + "    s.CL_TotalHours, "
			+ "    s.MI_TotalHours, " + "    s.ER_TotalHours, " + "    s.MR_TotalHours, " + "    s.Others_TotalHours, "
			+ "    s.LC_Count, " + "    s.SCL_Count, " + "    s.CL_Count, " + "    s.MI_Count, " + "    s.ER_Count, "
			+ "    s.MR_Count, " + "    s.Others_Count " + "FROM FinalResults f "
			+ "LEFT JOIN StoppageData s ON f.ShiftID = s.ShiftId " + "WHERE EXISTS ( " + "    SELECT 1 "
			+ "    FROM tblSSpl sp " + "    WHERE sp.PackDt = :date "
			+ "      AND (f.POrder = sp.POrder1 OR f.POrder = sp.POrder2 OR f.POrder = sp.POrder3) " + ") "
			+ "ORDER BY f.ShiftID;", nativeQuery = true)
	List<Object[]> fetchStoppageDetails1(@Param("date") String date);

	@Query(value = "WITH POrders AS ( " + "    SELECT POrder1 AS POrder FROM tblSSpl "
			+ "    WHERE PackDt = :date AND Stype = 'RUN' AND POrder1 IS NOT NULL AND POrder1 <> '' " + "    UNION "
			+ "    SELECT POrder2 AS POrder FROM tblSSpl "
			+ "    WHERE PackDt = :date AND Stype = 'RUN' AND POrder2 IS NOT NULL AND POrder2 <> '' " + "    UNION "
			+ "    SELECT POrder3 AS POrder FROM tblSSpl "
			+ "    WHERE PackDt = :date AND Stype = 'RUN' AND POrder3 IS NOT NULL AND POrder3 <> '' " + "), "
			+ "MaxRNwtPerPOrder AS ( " + "    SELECT POrder, MAX(RNwt) AS MaxRNwt, ShiftID " + "    FROM tblRGoods "
			+ "    WHERE POrder IN (SELECT POrder FROM POrders) " + "    GROUP BY POrder, ShiftID " + "), "
			+ "FinalResults AS ( " + "    SELECT DISTINCT m.POrder, m.MaxRNwt, r.Brand, m.ShiftID "
			+ "    FROM MaxRNwtPerPOrder m " + "    JOIN tblRGoods r ON m.POrder = r.POrder AND m.MaxRNwt = r.RNwt "
			+ "), " + "StoppageData AS ( " + "    SELECT " + "        S.SCause, " + "        M.SCode, "
			+ "        CASE " + "            WHEN M.SCode IN ('LC', 'SCL', 'CL', 'MI', 'ER', 'MR') THEN M.SCode "
			+ "            ELSE 'Others' " + "        END AS StoppageCategory, "
			+ "        SUM(S.TotHrs) AS TotalHours, " + "        COUNT(*) AS StoppageCount " + "    FROM tblSSpl S "
			+ "    JOIN tblSCMst M ON S.SCause = M.SCause " + "    WHERE S.PackDt = :date "
			+ "    GROUP BY S.SCause, M.SCode, "
			+ "             CASE WHEN M.SCode IN ('LC', 'SCL', 'CL', 'MI', 'ER', 'MR') THEN M.SCode ELSE 'Others' END "
			+ "), " + "WeightSummary AS ( " + "    SELECT POrder, SUM(MaxRNwt) AS TotalWeight "
			+ "    FROM FinalResults " + "    GROUP BY POrder " + ") " + "SELECT " + "    f.POrder, "
			+ "    ws.TotalWeight, " + "    f.MaxRNwt, " + "    f.Brand, " + "    f.ShiftID, " + "    s.SCause, "
			+ "    s.SCode, " + "    s.StoppageCategory, " + "    s.TotalHours, " + "    s.StoppageCount "
			+ "FROM FinalResults f " + "LEFT JOIN StoppageData s ON f.POrder = s.SCause "
			+ "LEFT JOIN WeightSummary ws ON f.POrder = ws.POrder "
			+ "ORDER BY f.POrder, s.StoppageCategory;", nativeQuery = true)
	List<Object[]> fetchOrderWiseStoppageDetails(@Param("date") String date);

	/**
	 * SPULANCE - DAILY STOPPAGE
	 */

	@Query(value = "SELECT POrder1, POrder2, POrder3 FROM tblSSpl WHERE PackDt=:date AND Stype='Run'", nativeQuery = true)
	List<Object[]> getRunningOrders(@Param("date") String date);

	@Query(value = "SELECT \r\n" + "    S.POrder, \r\n" + "    R.RNwt, \r\n" + "    R.Brand, \r\n"
			+ "    M.SCause, \r\n" + "    M.SCode, \r\n" + "    CASE \r\n"
			+ "        WHEN M.SCode IN ('LC', 'SCL', 'CL', 'MI', 'ER', 'MR') THEN M.SCode \r\n"
			+ "        ELSE 'Others' \r\n" + "    END AS StoppageCategory, \r\n"
			+ "    SUM(S.TotHrs) AS TotalHours, \r\n" + "    COUNT(*) AS StoppageCount \r\n" + "FROM tblSSpl S \r\n"
			+ "LEFT JOIN tblRGoods R ON R.POrder = S.POrder \r\n" + "LEFT JOIN tblSCMst M ON S.SCause = M.SCause \r\n"
			+ "WHERE S.PackDt = :packDt\r\n" + "GROUP BY S.POrder, R.RNwt, R.Brand, M.SCause, M.SCode\r\n"
			+ "ORDER BY S.POrder;\r\n" + "", nativeQuery = true)
	List<Object[]> fetchStoppageReportData(@Param("packDt") String packDt);

//	@Query(value = "SELECT\r\n"
//			+ "    -- PO details from tblRGoods\r\n"
//			+ "    tblRGoods.POrder AS PONumber,\r\n"
//			+ "    tblRGoods.GrsWt AS Weight,\r\n"
//			+ "    tblRGoods.Brand,\r\n"
//			+ "\r\n"
//			+ "    -- Stoppage details from tblSSpl\r\n"
//			+ "    tblSSpl.SCause AS StoppageCause,\r\n"
//			+ "    tblSSpl.SRemarks AS StoppageRemarks,\r\n"
//			+ "    tblSSpl.Corr_Action AS CorrectiveAction,\r\n"
//			+ "    tblSSpl.PackYear,\r\n"
//			+ "    tblSSpl.ShiftID,\r\n"
//			+ "    tblSSpl.POrder1,\r\n"
//			+ "    tblSSpl.POrder2,\r\n"
//			+ "    tblSSpl.POrder3,\r\n"
//			+ "    tblSSpl.TotHrs AS TotalHours,\r\n"
//			+ "    tblSSpl.isConfirm AS IsConfirmed,\r\n"
//			+ "    tblSSpl.ConfirmedOn AS ConfirmationDate,\r\n"
//			+ "\r\n"
//			+ "    -- Additional related stoppage data from tblSCMst\r\n"
//			+ "    tblSCMst.SCause AS CauseDescription,\r\n"
//			+ "    tblSCMst.SCode AS CauseCode\r\n"
//			+ "\r\n"
//			+ "FROM tblRGoods\r\n"
//			+ "\r\n"
//			+ "-- Join with tblSSpl on matching PO order number\r\n"
//			+ "LEFT JOIN tblSSpl\r\n"
//			+ "    ON tblRGoods.POrder = tblSSpl.POrder1\r\n"
//			+ "    OR tblRGoods.POrder = tblSSpl.POrder2\r\n"
//			+ "    OR tblRGoods.POrder = tblSSpl.POrder3\r\n"
//			+ "\r\n"
//			+ "-- Join with tblSCMst to get stoppage cause description and code\r\n"
//			+ "LEFT JOIN tblSCMst\r\n"
//			+ "    ON tblSSpl.SCause = tblSCMst.SCause\r\n"
//			+ "\r\n"
//			+ "-- Filtering conditions for specific records\r\n"
//			+ "WHERE tblSSpl.PackDt = :packDt  -- Parameterized date filter (pass the date you want to filter by)\r\n"
//			+ "", nativeQuery = true)
//	List<Object[]> fetchStoppageOrderData(@Param("packDt") String packDt);

	@Query(value = "SELECT " + "   COUNT(CASE WHEN tblSSpl.SCause = 'LC' THEN 1 END) AS LC, "
			+ "   COUNT(CASE WHEN tblSSpl.SCause = 'SCL' THEN 1 END) AS SCL, "
			+ "   COUNT(CASE WHEN tblSSpl.SCause = 'CL' THEN 1 END) AS CL, "
			+ "   COUNT(CASE WHEN tblSSpl.SCause = 'MI' THEN 1 END) AS MI, "
			+ "   COUNT(CASE WHEN tblSSpl.SCause = 'ER' THEN 1 END) AS ER, "
			+ "   COUNT(CASE WHEN tblSSpl.SCause = 'MR' THEN 1 END) AS MR, "
			+ "   COUNT(CASE WHEN tblSSpl.SCause = 'Others' THEN 1 END) AS Others " + "FROM tblRGoods "
			+ "LEFT JOIN tblSSpl ON tblRGoods.POrder = tblSSpl.POrder1 " + "OR tblRGoods.POrder = tblSSpl.POrder2 "
			+ "OR tblRGoods.POrder = tblSSpl.POrder3 " + "WHERE tblSSpl.PackDt = :packDt", nativeQuery = true)
	List<Object[]> fetchStoppageOrderData(@Param("packDt") String packDt);

	@Query(value = "WITH RunningData AS (\r\n" + "    SELECT \r\n" + "        POrder1, POrder2, POrder3\r\n"
			+ "    FROM [PDE].[dbo].[tblSSpl]\r\n" + "    WHERE PackDt =:date AND Stype = 'RUN'\r\n" + "),\r\n"
			+ "NetWeightAndBrand AS (\r\n" + "    SELECT \r\n"
			+ "        POrder AS OrderNumber, -- Use an alias to avoid conflicts\r\n"
			+ "        RNWt AS NetWeight, \r\n" + "        Brand\r\n" + "    FROM [PDE].[dbo].[tblRGoods]\r\n"
			+ "    WHERE POrder IN (\r\n" + "        SELECT POrder1 FROM RunningData\r\n" + "        UNION\r\n"
			+ "        SELECT POrder2 FROM RunningData\r\n" + "        UNION\r\n"
			+ "        SELECT POrder3 FROM RunningData\r\n" + "    )\r\n" + "),\r\n" + "StoppageSummary AS (\r\n"
			+ "    SELECT \r\n" + "        S.POrder1 AS OrderNumber, -- Align with NetWeightAndBrand alias\r\n"
			+ "        M.SCode,\r\n" + "        SUM(S.TotHrs) AS TotalHours\r\n"
			+ "    FROM [PDE].[dbo].[tblSSpl] S\r\n" + "    JOIN [PDE].[dbo].[tblSCMst] M ON S.SCause = M.SCause\r\n"
			+ "    WHERE S.PackDt =:date\r\n" + "    GROUP BY S.POrder1, M.SCode\r\n" + ")\r\n" + "SELECT \r\n"
			+ "    R.POrder1 AS Order1,\r\n" + "    R.POrder2 AS Order2,\r\n" + "    R.POrder3 AS Order3,\r\n"
			+ "    N.OrderNumber,\r\n" + "    N.Brand,\r\n" + "    N.NetWeight,\r\n"
			+ "    S.SCode AS StoppageCode,\r\n" + "    S.TotalHours\r\n" + "FROM RunningData R\r\n"
			+ "LEFT JOIN NetWeightAndBrand N ON R.POrder1 = N.OrderNumber \r\n"
			+ "                              OR R.POrder2 = N.OrderNumber \r\n"
			+ "                              OR R.POrder3 = N.OrderNumber\r\n"
			+ "LEFT JOIN StoppageSummary S ON N.OrderNumber = S.OrderNumber;\r\n" + "", nativeQuery = true)
	List<Map<String, Object>> approach2StoppageData(@Param("date") String date);

	/**
	 * SPULANCE - BMR / STOPPAGE
	 */

	@Query(value = "SELECT PackDt AS PackDate, FTime AS fromTime, TTime AS toTime, TotHrs AS totalHours, ShiftID AS shift, SCause AS remarks FROM tblSSpl WHERE PackDt =:date AND ((FTime >= :fromTime AND FTime <= :toTime) OR (TTime >= :fromTime AND TTime <= :toTime) OR (FTime < :fromTime AND TTime > :toTime)) AND SType = 'Stop' AND PackYear = YEAR(GETDATE())", nativeQuery = true)
	List<Map<String, Object>> orderStoppageByBmr(@Param("date") Date date, @Param("fromTime") String fromTime,
			@Param("toTime") String toTime);

	@Query(value = "SELECT PackDt AS PackDate, FTime AS fromTime, TTime AS toTime, TotHrs AS totalHours, ShiftID AS shift FROM tblSSpl WHERE (POrder1=:order OR POrder2=:order OR POrder3=:order) AND SType = 'Run' AND PackDt BETWEEN :fromDate AND :toDate", nativeQuery = true)
	List<Map<String, Object>> stoppage8BMR(@Param("order") String order, @Param("fromDate") String fromDate,
			@Param("toDate") String toDate);

	@Query(value = "SELECT PackDt AS PackDate, FTime AS fromTime, TTime AS toTime, TotHrs AS totalHours, ShiftID AS shift FROM tblSSpl WHERE (POrder1=:order OR POrder2=:order OR POrder3=:order) AND SType = 'Run' AND PackYear = YEAR(GETDATE())", nativeQuery = true)
	List<Map<String, Object>> stoppage08BMR(@Param("order") String order);

	/**
	 * BMR - RPBALE
	 * 
	 */

	@Query(value = "SELECT PackDt AS PackDate, FTime AS fromTime, TTime AS toTime, TotHrs AS totalHours, ShiftID AS shift, SCause AS remarks FROM tblSFNG WHERE PackDt =:date AND ((FTime >= :fromTime AND FTime <= :toTime) OR (TTime >= :fromTime AND TTime <= :toTime) OR (FTime < :fromTime AND TTime > :toTime)) AND SType = 'Stop' AND PackYear = YEAR(GETDATE())", nativeQuery = true)
	List<Map<String, Object>> orderStoppage15ByBmr(@Param("date") Date date, @Param("fromTime") String fromTime,
			@Param("toTime") String toTime);

	@Query(value = "SELECT PackDt AS PackDate, FTime AS fromTime, TTime AS toTime, TotHrs AS totalHours, ShiftID AS shift FROM tblSFNG WHERE POrder=:order AND SType = 'Run' AND PackYear = YEAR(GETDATE())", nativeQuery = true)
	List<Map<String, Object>> stoppage15BMR(@Param("order") String order);

	@Query(value = "SELECT PackDt AS PackDate, FTime AS fromTime, TTime AS toTime, TotHrs AS totalHours, ShiftID AS shift FROM tblSFNG WHERE POrder=:order AND SType = 'Run' AND PackDt BETWEEN :fromdate AND :todate", nativeQuery = true)
	List<Map<String, Object>> stoppage015BMR(@Param("order") String order, @Param("fromdate") String fromdate,
			@Param("todate") String todate);

//		@Query(value = "SELECT PackDt AS PackDate, FTime AS fromTime, TTime AS toTime, TotHrs AS totalHours, ShiftID AS shift " +
//	               "FROM tblSFNG " +
//	               "WHERE POrder = :order " +
//	               "AND SType = 'Run' " +
//	               "AND CONVERT(DATE, PackDt, 104) BETWEEN CONVERT(DATE, :fromdate, 104) AND CONVERT(DATE, :todate, 104)", 
//	       nativeQuery = true)
//	List<Map<String, Object>> stoppage015BMR(
//	    @Param("order") String order, 
//	    @Param("fromdate") String fromdate, 
//	    @Param("todate") String todate);

	@Query(value = "SELECT PackDt AS PackDate, FTime AS fromTime, TTime AS toTime, TotHrs AS totalHours, ShiftID AS shift FROM tblSFNG WHERE POrder=:order AND SType = 'Run' AND PackDt BETWEEN :fromdate AND :todate", nativeQuery = true)
	List<Map<String, Object>> stoppage015BMRs(@Param("order") String order, @Param("fromdate") Date fromdate,
			@Param("todate") Date todate);

	// BMR
	@Query(value = "SELECT " + "ISNULL(SUM(b.NetWt), 0) AS inputQuantity, "
			+ "ISNULL(SUM(r.RNWt), 0) AS outputQuantity, " + "CASE "
			+ "WHEN ISNULL(SUM(b.NetWt), 0) > 0 THEN (ISNULL(SUM(r.RNWt), 0) / ISNULL(SUM(b.NetWt), 0)) * 100 "
			+ "ELSE 0 " + "END AS yieldPercentage " + "FROM " + "[PDE].[dbo].[tblBCons] b " + "FULL OUTER JOIN "
			+ "[PDE].[dbo].[tblRGoods] r " + "ON b.POrder = r.POrder " + "WHERE " + "b.POrder = :order "
			+ "AND r.isApproved = 'Y' " + "AND r.BalTyp = 'I'", nativeQuery = true)
	List<Object[]> productReconciliation(@Param("order") String order);

//			=========================================================PAD PUNCHING=======================================================

	// F004
//	@Query(value = "SELECT f.PackDt as date, f.ShiftID as shift, f.JulianDay as julianDay, \r\n"
//			+ "			f.MCN as machineName, f.POrder as POrder, f.NCB as NCB, f.NOC as noOfCartons, f.NBAG as noOfBags, \r\n"
//			+ "			CASE WHEN f.NOC = 0 THEN 0 ELSE CAST(f.NBAG/f.NOC AS INT) END as noOfBagCarton, \r\n"
//			+ "			o.PONo as poNo, o.Material as material FROM PDE.dbo.tblFPpack f \r\n"
//			+ "			JOIN PDE.dbo.tblOrderinfo o ON f.POrder = o.POrder \r\n"
//			+ "			JOIN PDE.dbo.tblMCDet m on f.MCN =m.MCN"
//			+ "WHERE f.PackDt = :date AND f.ShiftID = :shift AND m.MCat ='pads'", nativeQuery = true)
//	List<Object[]> findByDateShift(@Param("date") String date, @Param("shift") String shift);

//			PROD

	@Query(value = "SELECT f.PackDt as date, f.ShiftID as shift, CONCAT(RIGHT(f.PackYear, 2), RIGHT(CONCAT('00', f.JulianDay), 3), f.ShiftID) AS julianDay, "
			+ "f.MCN as machineName, f.POrder as POrder, f.NCB as NCB, f.NOC as noOfCartons, f.NBAG as noOfBags, "
			+ "CASE WHEN f.NOC = 0 THEN 0 ELSE CAST(f.NBAG/f.NOC AS INT) END as noOfBagCarton, "
			+ "o.PONo as poNo, o.Material as material " + "FROM PDE.dbo.tblFPpack f "
			+ "JOIN PDE.dbo.tblOrderinfo o ON f.POrder = o.POrder " + "JOIN PDE.dbo.tblMCDet m on f.MCN = m.MCN "
			+ "WHERE f.PackDt = :date AND f.ShiftID = :shift AND m.MCat = 'pads'", nativeQuery = true)
	List<Object[]> findByDateShift(@Param("date") String date, @Param("shift") String shift);

	// Order lov
	@Query(value = "SELECT o.Porder FROM tblOrderInfo o " + "JOIN tblproduct p ON o.material = p.Product "
			+ "WHERE o.sts = 1 AND p.Cat = 'PADS'", nativeQuery = true)
	List<String> findOrdersWithPadsCategory();

	// F003
//	@Query(value = "SELECT r.PackDt as date, r.ShiftID as shift, r.POrder as orderNo, o.PONo as poNo, r.MCN as machineName, r.JUlianDay as julianDay, o.Material as productName, o.gsm as gsm, o.Patterndesc as patternDesc, "
//			+ "CASE WHEN CHARINDEX('-', REVERSE(o.Material)) > 0 THEN RIGHT(o.Material, CHARINDEX('-', REVERSE(o.Material)) - 1) ELSE o.Material END AS padsPerBag, "
//			+ "CASE WHEN CHARINDEX('-', REVERSE(o.PatternDesc)) > 0 THEN RIGHT(o.PatternDesc, CHARINDEX('-', REVERSE(o.PatternDesc)) - 1) ELSE o.PatternDesc END AS edge, "
//			+ "CASE WHEN CHARINDEX('-', REVERSE(o.PatternDesc)) > 0 THEN LEFT(o.PatternDesc, CHARINDEX('-', REVERSE(o.PatternDesc)) - 1) ELSE o.PatternDesc END AS pattern, "
//			+ "CASE WHEN CHARINDEX('-', o.Material) > 0 THEN SUBSTRING(o.Material, CHARINDEX('-', o.Material) - 3, 3) ELSE o.Material END AS typeOfPad "
//			+ "FROM PDE.dbo.TblFPpack r " + "JOIN PDE.dbo.tblOrderinfo o ON r.POrder = o.POrder "
//			+ "WHERE r.PackDt = :date AND r.ShiftID = :shift AND r.MCN = :machineName AND r.POrder = :orderNo", nativeQuery = true)
//	List<Object[]> findPackingDetailsRunning(@Param("date") String date, @Param("shift") String shift,
//			@Param("machineName") String machineName, @Param("orderNo") String orderNo);

//	PROD

	@Query(value = "SELECT\r\n" + "    r.PackDt AS date,\r\n" + "    r.ShiftID AS shift,\r\n"
			+ "    r.POrder AS orderNo,\r\n" + "    o.PONo AS poNo,\r\n" + "    r.MCN AS machineName,\r\n"
			+ "    r.JUlianDay AS julianDay,\r\n" + "    o.Material AS productName,\r\n" + "    o.gsm AS gsm,\r\n"
			+ "    o.Patterndesc AS patternDesc,\r\n" + "    CASE\r\n"
			+ "        WHEN CHARINDEX('-', REVERSE(o.Material)) > 0\r\n"
			+ "        THEN RIGHT(o.Material, CHARINDEX('-', REVERSE(o.Material)) - 1)\r\n"
			+ "        ELSE o.Material\r\n" + "    END AS rawPadsPerBag,\r\n" + "    (\r\n"
			+ "        SELECT t.PIECE\r\n" + "        FROM PDE.dbo.tblOrderInfo toi\r\n"
			+ "        INNER JOIN PDE.dbo.tblProduct tp ON toi.Material = tp.Product\r\n"
			+ "        INNER JOIN PDE.dbo.tblcusinfo t ON toi.Material = t.MATERIAL\r\n"
			+ "        WHERE tp.Cat = 'Pads' AND toi.POrder = r.POrder\r\n"
			+ "    ) AS padsPerBag, -- Using the new logic\r\n" + "    CASE\r\n"
			+ "        WHEN CHARINDEX('-', REVERSE(o.PatternDesc)) > 0\r\n"
			+ "        THEN RIGHT(o.PatternDesc, CHARINDEX('-', REVERSE(o.PatternDesc)) - 1)\r\n"
			+ "        ELSE o.PatternDesc\r\n" + "    END AS edge,\r\n" + "    CASE\r\n"
			+ "        WHEN CHARINDEX('-', REVERSE(o.PatternDesc)) > 0\r\n"
			+ "        THEN LEFT(o.PatternDesc, CHARINDEX('-', REVERSE(o.PatternDesc)) - 1)\r\n"
			+ "        ELSE o.PatternDesc\r\n" + "    END AS pattern,\r\n" + "    CASE\r\n"
			+ "        WHEN CHARINDEX('-', o.Material) > 0\r\n"
			+ "        THEN SUBSTRING(o.Material, CHARINDEX('-', o.Material) - 3, 3)\r\n"
			+ "        ELSE o.Material\r\n" + "    END AS typeOfPad\r\n" + "FROM\r\n" + "    PDE.dbo.TblFPpack r\r\n"
			+ "JOIN\r\n" + "    PDE.dbo.tblOrderinfo o ON r.POrder = o.POrder\r\n"
			+ "WHERE r.PackDt = :date AND r.ShiftID = :shift \r\n" + "AND r.MCN = :machineName\r\n"
			+ "AND r.POrder = :orderNo \r\n" + "", nativeQuery = true)
	List<Object[]> findPackingDetailsRunning(@Param("date") String date, @Param("shift") String shift,
			@Param("machineName") String machineName, @Param("orderNo") String orderNo);

//	PROD ELSE

	@Query(value = "SELECT " + "    o.POrder AS orderNo, " + "    o.PONo AS poNo, " + "    o.Material AS productName, "
			+ "    o.gsm AS gsm, " + "    o.Patterndesc AS patternDesc, " + "    CASE "
			+ "        WHEN CHARINDEX('-', REVERSE(o.Material)) > 0 "
			+ "        THEN RIGHT(o.Material, CHARINDEX('-', REVERSE(o.Material)) - 1) " + "        ELSE o.Material "
			+ "    END AS rawPadsPerBag, " + "    ( " + "        SELECT t.PIECE "
			+ "        FROM PDE.dbo.tblOrderInfo toi "
			+ "        INNER JOIN PDE.dbo.tblProduct tp ON toi.Material = tp.Product "
			+ "        INNER JOIN PDE.dbo.tblcusinfo t ON toi.Material = t.MATERIAL "
			+ "        WHERE tp.Cat = 'Pads' AND toi.POrder = o.POrder " + "    ) AS padsPerBag, " + "    CASE "
			+ "        WHEN CHARINDEX('-', REVERSE(o.PatternDesc)) > 0 "
			+ "        THEN RIGHT(o.PatternDesc, CHARINDEX('-', REVERSE(o.PatternDesc)) - 1) "
			+ "        ELSE o.PatternDesc " + "    END AS edge, " + "    CASE "
			+ "        WHEN CHARINDEX('-', REVERSE(o.PatternDesc)) > 0 "
			+ "        THEN LEFT(o.PatternDesc, CHARINDEX('-', REVERSE(o.PatternDesc)) - 1) "
			+ "        ELSE o.PatternDesc " + "    END AS pattern, " + "    CASE "
			+ "        WHEN CHARINDEX('-', o.Material) > 0 "
			+ "        THEN SUBSTRING(o.Material, CHARINDEX('-', o.Material) - 3, 3) " + "        ELSE o.Material "
			+ "    END AS typeOfPad " + "FROM PDE.dbo.tblOrderInfo o "
			+ "WHERE o.POrder = :orderNo", nativeQuery = true)
	List<Object[]> findPackingDetailsRunningOrderInfo(@Param("orderNo") String orderNo);

//	@Query(value = "SELECT POrder AS orderNo,PONo AS poNo, Material AS material, gsm AS gsm,Patterndesc AS patternDesc,"
//			+ "CASE " + " WHEN CHARINDEX('-', REVERSE(Material)) > 0 "
//			+ "    THEN RIGHT(Material, CHARINDEX('-', REVERSE(Material)) - 1) " + "   " + " ELSE Material "
//			+ "END AS noOfPcPerBag, " + "CASE " + "    WHEN CHARINDEX('-', REVERSE(PatternDesc)) > 0 "
//			+ "    THEN RIGHT(PatternDesc, CHARINDEX('-', REVERSE(PatternDesc)) - 1) " + "    ELSE PatternDesc "
//			+ "END AS edge, " + "CASE " + "    WHEN CHARINDEX('-', REVERSE(PatternDesc)) > 0 "
//			+ "    THEN LEFT(PatternDesc, CHARINDEX('-', REVERSE(PatternDesc)) - 1) " + "    ELSE PatternDesc "
//			+ "END AS pattern, " + "CASE " + "    WHEN CHARINDEX('-', Material) > 0 "
//			+ "    THEN SUBSTRING(Material, CHARINDEX('-', Material) - 3, 3) " + "    ELSE Material "
//			+ "END AS typeOfPad " + "FROM tblOrderinfo "
//			+ "WHERE r.PackDt = :date AND r.ShiftID = :shift AND r.MCN = :machineName AND r.POrder = :orderNo", nativeQuery = true)
//
//	List<Object[]> findPackingDetailsNext(@Param("date") String date, @Param("shift") String shift,
//			@Param("machineName") String machineName, @Param("orderNo") String orderNo);

//			BAG MAKING

	@Query(value = "SELECT  \r\n" + "    f.NBAG AS ProductionQty, \r\n" + "    p.ProdDesc AS ProductName, \r\n"
			+ "    f.POrder AS OrderNo, \r\n" + "    f.MCN AS MachineName, \r\n" + "    CASE  \r\n"
			+ "        WHEN CHARINDEX('-', o.Material) > 0  \r\n"
			+ "        THEN SUBSTRING(o.Material, CHARINDEX('-', o.Material) - 3, 3) \r\n"
			+ "        ELSE o.Material  \r\n" + "    END AS Typeofpad \r\n" + "FROM  \r\n"
			+ "    [PDE].[dbo].[tblFPPack] f \r\n" + "JOIN  \r\n"
			+ "    [PDE].[dbo].[tblOrderinfo] o ON f.POrder = o.POrder \r\n" + "JOIN  \r\n"
			+ "    [PDE].[dbo].[tblProduct] p ON o.Material = p.Product \r\n" + "WHERE  \r\n" + "    f.PackDt = :date"
			+ "    AND f.ShiftID = :shift" + "    AND f.MCN IN ('HT1', 'HT2')", nativeQuery = true)
	List<Map<String, Object>> getBagDetailsDailyProductionPde(@Param("date") String date, @Param("shift") String shift);

//			BAG MAKING LOG BOOK

	@Query(value = "SELECT  \r\n" + "    o.POrder, \r\n" + "    p.Product, \r\n" + "    p.ProdDesc \r\n" + "FROM  \r\n"
			+ "    [PDE].[dbo].[tblOrderinfo] o \r\n" + "JOIN  \r\n"
			+ "    [PDE].[dbo].[tblProduct] p ON o.Material = p.Product \r\n" + "WHERE  \r\n" + "    o.Sts = 1 \r\n"
			+ "    AND p.Cat IN ('Bags', 'Pads', 'Balls')\r\n", nativeQuery = true)
	List<Map<String, Object>> getBagDetailsLogBook();

//	@Query(value = "SELECT\r\n"
//			+ "    r.ConsDt,\r\n"
//			+ "    r.ShiftID,\r\n"
//			+ "    r.POrder,\r\n"
//			+ "    r.IPNo,\r\n"
//			+ "    r.CNo,\r\n"
//			+ "    r.Baleno,\r\n"
//			+ "    r.RNwt,\r\n"
//			+ "    m.MCN,\r\n"
//			+ "    o.Material,\r\n"
//			+ "    o.gsm,\r\n"
//			+ "    o.Patterndesc,\r\n"
//			+ "    CASE\r\n"
//			+ "        WHEN CHARINDEX('-', REVERSE(o.Material)) > 0\r\n"
//			+ "        THEN RIGHT(o.Material, CHARINDEX('-', REVERSE(o.Material)) - 1)\r\n"
//			+ "        ELSE o.Material\r\n"
//			+ "    END AS NoOfPcPerBags,  -- Existing logic for NoOfPcPerBag\r\n"
//			+ "    CASE\r\n"
//			+ "        WHEN CHARINDEX('-', REVERSE(o.PatternDesc)) > 0\r\n"
//			+ "        THEN RIGHT(o.PatternDesc, CHARINDEX('-', REVERSE(o.PatternDesc)) - 1)\r\n"
//			+ "        ELSE o.PatternDesc\r\n"
//			+ "    END AS Edge,\r\n"
//			+ "    CASE\r\n"
//			+ "        WHEN CHARINDEX('-', REVERSE(o.PatternDesc)) > 0\r\n"
//			+ "        THEN LEFT(o.PatternDesc, CHARINDEX('-', REVERSE(o.PatternDesc)) - 1)\r\n"
//			+ "        ELSE o.PatternDesc\r\n"
//			+ "    END AS Pattern,\r\n"
//			+ "    CASE\r\n"
//			+ "        WHEN CHARINDEX('-', o.Material) > 0\r\n"
//			+ "        THEN SUBSTRING(o.Material, CHARINDEX('-', o.Material) - 3, 3)\r\n"
//			+ "        ELSE o.Material\r\n"
//			+ "    END AS Typeofpad,\r\n"
//			+ "    -- Extract only the numeric part from the existing NoOfPcPerBag (o.Material) column\r\n"
//			+ "    LEFT(\r\n"
//			+ "        CASE\r\n"
//			+ "            WHEN CHARINDEX('-', REVERSE(o.Material)) > 0\r\n"
//			+ "            THEN RIGHT(o.Material, CHARINDEX('-', REVERSE(o.Material)) - 1)\r\n"
//			+ "            ELSE o.Material\r\n"
//			+ "        END, \r\n"
//			+ "        PATINDEX('%[^0-9]%', \r\n"
//			+ "        CASE\r\n"
//			+ "            WHEN CHARINDEX('-', REVERSE(o.Material)) > 0\r\n"
//			+ "            THEN RIGHT(o.Material, CHARINDEX('-', REVERSE(o.Material)) - 1)\r\n"
//			+ "            ELSE o.Material\r\n"
//			+ "        END) - 1\r\n"
//			+ "    ) AS NoOfPcPerBag\r\n"
//			+ "FROM\r\n"
//			+ "    [PDE].[dbo].[TblRcons] r \r\n"
//			+ "JOIN\r\n"
//			+ "    [PDE].[dbo].[tblMCDet] m ON r.IPNo = m.IPNo AND r.CNo = m.CNo\r\n"
//			+ "JOIN\r\n"
//			+ "    [PDE].[dbo].[tblOrderinfo] o ON r.POrder = o.POrder"
//			+ "WHERE  \r\n"
//			+ "    r.ConsDt =:ConsDt AND m.MCN=:mcn AND r.ShiftID=:shiftId ", nativeQuery = true)
//	List<Map<String, Object>> getDailyRollConsumptionDetails1(@Param("ConsDt") String ConsDt,
//			@Param("mcn") String mnc,@Param("shiftId")String shiftId);

//	PROD

//	@Query(value = 
//		    "SELECT TOP 1 " +
//		    "    r.ConsDt, " +
//		    "    r.ShiftID, " +
//		    "    r.POrder, " +
//		    "    r.IPNo, " +
//		    "    r.CNo, " +
//		    "    r.Baleno, " +
//		    "    r.RNwt, " +
//		    "    m.MCN, " +
//		    "    o.Material, " +
//		    "    o.gsm, " +
//		    "    o.Patterndesc, " +
//		    "    CASE " +
//		    "        WHEN CHARINDEX('-', REVERSE(o.Material)) > 0 " +
//		    "        THEN RIGHT(o.Material, CHARINDEX('-', REVERSE(o.Material)) - 1) " +
//		    "        ELSE o.Material " +
//		    "    END AS NoOfPcPerBags, " + 
//		    "    CASE " +
//		    "        WHEN CHARINDEX('-', REVERSE(o.PatternDesc)) > 0 " +
//		    "        THEN RIGHT(o.PatternDesc, CHARINDEX('-', REVERSE(o.PatternDesc)) - 1) " +
//		    "        ELSE o.PatternDesc " +
//		    "    END AS Edge, " +
//		    "    CASE " +
//		    "        WHEN CHARINDEX('-', REVERSE(o.PatternDesc)) > 0 " +
//		    "        THEN LEFT(o.PatternDesc, CHARINDEX('-', REVERSE(o.PatternDesc)) - 1) " +
//		    "        ELSE o.PatternDesc " +
//		    "    END AS Pattern, " +
//		    "    CASE " +
//		    "        WHEN CHARINDEX('-', o.Material) > 0 " +
//		    "        THEN SUBSTRING(o.Material, CHARINDEX('-', o.Material) - 3, 3) " +
//		    "        ELSE o.Material " +
//		    "    END AS Typeofpad, " +
//		    "    LEFT( " +
//		    "        CASE " +
//		    "            WHEN CHARINDEX('-', REVERSE(o.Material)) > 0 " +
//		    "            THEN RIGHT(o.Material, CHARINDEX('-', REVERSE(o.Material)) - 1) " +
//		    "            ELSE o.Material " +
//		    "        END, " +
//		    "        PATINDEX('%[^0-9]%', " +
//		    "        CASE " +
//		    "            WHEN CHARINDEX('-', REVERSE(o.Material)) > 0 " +
//		    "            THEN RIGHT(o.Material, CHARINDEX('-', REVERSE(o.Material)) - 1) " +
//		    "            ELSE o.Material " +
//		    "        END) - 1 " +
//		    "    ) AS NoOfPcPerBag " +
//		    "FROM " +
//		    "    [PDE].[dbo].[TblRcons] r " +
//		    "JOIN " +
//		    "    [PDE].[dbo].[tblMCDet] m ON r.IPNo = m.IPNo AND r.CNo = m.CNo " +
//		    "JOIN " +
//		    "    [PDE].[dbo].[tblOrderinfo] o ON r.POrder = o.POrder " +
//		    "WHERE " +
//		    "    r.ConsDt = :ConsDt " +
//		    "    AND m.MCN = :mcn " +
//		    "    AND r.ShiftID = :shiftId",
//		    nativeQuery = true)
//		List<Map<String, Object>> getDailyRollConsumptionDetails1(
//		    @Param("ConsDt") String ConsDt,
//		    @Param("mcn") String mnc,
//		    @Param("shiftId") String shiftId
//		);

	@Query(value = "SELECT DISTINCT r.POrder, " + "    r.ConsDt, " + "    r.ShiftID, " +
//		    "    r.POrder, " +
			"    r.IPNo, " + "    r.CNo, " +
//		    "    r.Baleno, " +
//		    "    r.RNwt, " +
			"    m.MCN, " + "    o.Material, " + "    o.gsm, " + "    o.Patterndesc, " + "    ("
			+ "        SELECT t.PIECE " + "        FROM PDE.dbo.tblOrderInfo toi "
			+ "        INNER JOIN PDE.dbo.tblProduct tp ON toi.Material = tp.Product "
			+ "        INNER JOIN PDE.dbo.tblcusinfo t ON toi.Material = t.MATERIAL "
			+ "        WHERE tp.Cat = 'Pads' AND toi.POrder = r.POrder " + "    ) AS NoOfPcPerBag, " + "    CASE "
			+ "        WHEN CHARINDEX('-', REVERSE(o.PatternDesc)) > 0 "
			+ "        THEN RIGHT(o.PatternDesc, CHARINDEX('-', REVERSE(o.PatternDesc)) - 1) "
			+ "        ELSE o.PatternDesc " + "    END AS Edge, " + "    CASE "
			+ "        WHEN CHARINDEX('-', REVERSE(o.PatternDesc)) > 0 "
			+ "        THEN LEFT(o.PatternDesc, CHARINDEX('-', REVERSE(o.PatternDesc)) - 1) "
			+ "        ELSE o.PatternDesc " + "    END AS Pattern, " + "    CASE "
			+ "        WHEN CHARINDEX('-', o.Material) > 0 "
			+ "        THEN SUBSTRING(o.Material, CHARINDEX('-', o.Material) - 3, 3) " + "        ELSE o.Material "
			+ "    END AS Typeofpad " + "FROM " + "    [PDE].[dbo].[TblRcons] r " + "JOIN "
			+ "    [PDE].[dbo].[tblMCDet] m ON r.IPNo = m.IPNo AND r.CNo = m.CNo " + "JOIN "
			+ "    [PDE].[dbo].[tblOrderinfo] o ON r.POrder = o.POrder " + "WHERE " + "    r.ConsDt = :ConsDt "
			+ "    AND m.MCN = :mcn " + "    AND r.ShiftID = :shiftId", nativeQuery = true)
	List<Map<String, Object>> getDailyRollConsumptionDetails1(@Param("ConsDt") String ConsDt, @Param("mcn") String mnc,
			@Param("shiftId") String shiftId);

//	@Query(value = "SELECT  \r\n"
//			+ "    r.ConsDt,  \r\n"
//			+ "    r.ShiftID,  \r\n"
//			+ "    r.POrder,  \r\n"
//			+ "    r.IPNo,  \r\n"
//			+ "    r.CNo,  \r\n"
//			+ "    r.Baleno,  \r\n"
//			+ "    r.RNwt,  \r\n"
//			+ "    m.MCN, \r\n"
//			+ "    o.Material,  \r\n"
//			+ "    o.gsm,  \r\n"
//			+ "    o.Patterndesc, \r\n"
//			+ "    CASE  \r\n"
//			+ "        WHEN CHARINDEX('-', REVERSE(o.Material)) > 0  \r\n"
//			+ "        THEN RIGHT(o.Material, CHARINDEX('-', REVERSE(o.Material)) - 1) \r\n"
//			+ "        ELSE o.Material  \r\n"
//			+ "    END AS NoOfPcPerBag, \r\n"
//			+ "    CASE  \r\n"
//			+ "        WHEN CHARINDEX('-', REVERSE(o.PatternDesc)) > 0  \r\n"
//			+ "        THEN RIGHT(o.PatternDesc, CHARINDEX('-', REVERSE(o.PatternDesc)) - 1) \r\n"
//			+ "        ELSE o.PatternDesc  \r\n"
//			+ "    END AS Edge, \r\n"
//			+ "    CASE  \r\n"
//			+ "        WHEN CHARINDEX('-', REVERSE(o.PatternDesc)) > 0  \r\n"
//			+ "        THEN LEFT(o.PatternDesc, CHARINDEX('-', REVERSE(o.PatternDesc)) - 1) \r\n"
//			+ "        ELSE o.PatternDesc  \r\n"
//			+ "    END AS Pattern, \r\n"
//			+ "    CASE  \r\n"
//			+ "        WHEN CHARINDEX('-', o.Material) > 0  \r\n"
//			+ "        THEN SUBSTRING(o.Material, CHARINDEX('-', o.Material) - 3, 3) \r\n"
//			+ "        ELSE o.Material\r\n"
//			+ "    END AS Typeofpad \r\n"
//			+ "FROM  \r\n"
//			+ "    [PDE].[dbo].[TblRcons] r \r\n"
//			+ "JOIN  \r\n"
//			+ "    [PDE].[dbo].[tblMCDet] m ON r.IPNo = m.IPNo AND r.CNo = m.CNo \r\n"
//			+ "JOIN  \r\n"
//			+ "    [PDE].[dbo].[tblOrderinfo] o ON r.POrder = o.POrder   \r\n"
//			+ "WHERE  \r\n"
//			+ "    r.ConsDt =:ConsDt AND m.MCN=:mcn AND r.ShiftID=:shiftId ", nativeQuery = true)
//	List<Map<String, Object>> getDailyRollConsumptionDetails1(@Param("ConsDt") String ConsDt,
//			@Param("mcn") String mnc,@Param("shiftId")String shiftId);

	@Query(value = "SELECT  \r\n" + "    c.ConsDt,  \r\n" + "    c.BaleNo,  \r\n" + " c.POrder, \r\n"
			+ "    c.RNWt, \r\n" + "    r.CreatedOn, \r\n" + "    r.PackDt AS RPackDt, \r\n" + "    rg.ShaftNo,  \r\n"
			+ "    rg.RNwt, \r\n" + "    (rg.RNwt - c.RNWt) AS BalanceWeight \r\n" + "FROM  \r\n"
			+ "    [PDE].[dbo].[TblRcons] c \r\n" + "JOIN  \r\n"
			+ "    [PDE].[dbo].[tblRgoods] r ON c.BaleNo = r.BaleNo \r\n" + "JOIN  \r\n"
			+ "    [PDE].[dbo].[TblRgoods] rg ON c.BaleNo = rg.BaleNo \r\n" + "WHERE  \r\n"
			+ "    c.ConsDt =:ConsDt AND c.POrder =:POrder AND C.ShiftId =:shiftId", nativeQuery = true)
	List<Map<String, Object>> getDailyRollConsumptionDetails2(@Param("ConsDt") String ConsDt,
			@Param("POrder") String POrder, @Param("shiftId") String shiftId);

//	PROD

	@Query(value = "SELECT \r\n" + " s.PackDt, \r\n" + " s.ShiftID, \r\n" + "s. SType, \r\n" + "s. MCN, \r\n"
			+ " s.FTime, \r\n" + " s.TTime, \r\n" + " s.Scause, \r\n" + "s.SRemarks, \r\n" + " s.TotHrs \r\n"
			+ "FROM \r\n" + " [PDE].[dbo].[tblSFng] s JOIN [PDE].[dbo].[tblmcdet] m on\r\n" + " s.MCN =m.MCN \r\n"
			+ " \r\n" + "WHERE \r\n" + " s.PackDt =:PackDt \r\n" + " AND s.ShiftID =:ShiftID \r\n"
			+ " AND s.SType = 'Stop' \r\n" + " AND s.MCN =:mcn", nativeQuery = true)
	List<Map<String, Object>> getDailyRollConsumptionDetails3(@Param("PackDt") String PackDt,
			@Param("ShiftID") String ShiftID, @Param("mcn") String mcn);

	// LogBook

	@Query(value = " SELECT  PackDt,  ShiftID,  SType,  MCN,  FTime,  TTime,  Scause,  TotHrs \r\n" + "FROM  \r\n"
			+ "    [PDE].[dbo].[tblSFng] \r\n" + "WHERE  \r\n"
			+ "    PackDt = :PackDt AND ShiftID = :ShiftID AND SType = 'Stop' AND MCN IN ('HT1','HT2');", nativeQuery = true)
	List<Map<String, Object>> getLogBookBagMking(@Param("PackDt") String PackDt, @Param("ShiftID") String ShiftID);

	// machine Lov
	@Query(value = "Select * from tblMCDet where MCat = 'Pads'", nativeQuery = true)
	List<Map<String, Object>> getMachineName();

//	PRODUCTION LOGBOOK

	@Query(value = "SELECT o.POrder, o.PONo,o.Qty/p.bags as Opening_Qty ,p.Product ,q.MCN , q.NBAG/p.bags as Packed_Qty, q.PackDt, q.ShiftID\r\n"
			+ "FROM [PDE].[dbo].[tblOrderInfo] o JOIN [PDE].[dbo].[tblproduct] p ON o.material = p.Product \r\n"
			+ "JOIN [PDE].[dbo].[tblFPpack] q ON q.POrder = o.POrder \r\n"
			+ "WHERE o.POrder = :orderNo AND q.MCN = :machine AND q.PackDt = :date AND q.ShiftID = :shift", nativeQuery = true)
	List<Object[]> findProductionDetails(@Param("date") String date, @Param("shift") String shift,
			@Param("machine") String machine, @Param("orderNo") String orderNo);

//	ELSE LOGIC

	@Query(value = "WITH RankedEntries AS ( " + "    SELECT " + "        POrder, " + "        PONo, "
			+ "        Material AS MCN, " + "        CMon AS PackDt, " + "        ROW_NUMBER() OVER ( "
			+ "            PARTITION BY POrder, YEAR(CMon), MONTH(CMon) " + "            ORDER BY CMon DESC "
			+ "        ) AS RowNum " + "    FROM [PDE].[dbo].[tblOrderInfo] " + "    WHERE POrder = :orderNo "
			+ "      AND YEAR(CMon) = YEAR(:packDate) " + "      AND MONTH(CMon) = MONTH(:packDate) " + ") " + "SELECT "
			+ "    POrder, " + "    PONo, " + "    MCN, " + "    PackDt " + "FROM RankedEntries "
			+ "WHERE RowNum = 1", nativeQuery = true)
	Map<String, Object> findProductionDetailstableOrderInfo(@Param("orderNo") String orderNo,
			@Param("packDate") String packDate);

//	PROD OPENING QUANTITY

//	TBLFPPACK

	@Query(value = "WITH RankedEntries AS (\r\n" + "		        SELECT \r\n"
			+ "		            o.Qty/p.bags AS Opening_Qty,\r\n" + "		            q.PackDt,\r\n"
			+ "		            ROW_NUMBER() OVER (\r\n"
			+ "		                PARTITION BY o.POrder, YEAR(q.PackDt), MONTH(q.PackDt) \r\n"
			+ "		                ORDER BY q.PackDt DESC\r\n" + "		            ) AS RowNum\r\n"
			+ "		        FROM [PDE].[dbo].[tblOrderInfo] o\r\n"
			+ "		        JOIN [PDE].[dbo].[tblProduct] p ON o.Material = p.Product\r\n"
			+ "		        JOIN [PDE].[dbo].[tblFPpack] q ON q.POrder = o.POrder\r\n"
			+ "		        WHERE o.POrder = :orderNo\r\n" + "		          AND YEAR(q.PackDt) = YEAR(:packDate)\r\n"
			+ "		          AND MONTH(q.PackDt) = MONTH(:packDate)\r\n" + "		    )\r\n"
			+ "		    SELECT Opening_Qty \r\n" + "		    FROM RankedEntries\r\n"
			+ "		    WHERE RowNum = 1", nativeQuery = true)
	BigDecimal findOpeningQtyForOrderAndDate(@Param("orderNo") String orderNo, @Param("packDate") String packDate);

	@Query(value = "WITH RankedEntries AS (\r\n" + "			SELECT \r\n" + "			 o.Qty AS Opening_Qty,\r\n"
			+ "			 o.cmon,\r\n" + "			ROW_NUMBER() OVER (\r\n"
			+ "			PARTITION BY o.POrder, YEAR(o.cmon), MONTH(o.cmon)\r\n" + "			ORDER BY o.cmon DESC\r\n"
			+ "			) AS RowNum\r\n" + "			FROM [PDE].[dbo].[tblOrderInfo] o\r\n" + "			\r\n"
			+ "			WHERE o.POrder = :orderNo\r\n" + "			AND YEAR(o.cmon) = YEAR(:packDate)\r\n"
			+ "			AND MONTH(o.cmon) = MONTH(:packDate)\r\n" + "			)\r\n"
			+ "			SELECT Opening_Qty \r\n" + "			 FROM RankedEntries\r\n"
			+ "			 WHERE RowNum = 1", nativeQuery = true)
	BigDecimal findOpeningQtyForTblOrderInfo(@Param("orderNo") String orderNo, @Param("packDate") String packDate);

	// Step 1: Find Running Data for the Date
	@Query(value = "SELECT s.POrder1, s.POrder2, s.POrder3 FROM TblSSpl s WHERE s.PackDt = :packDt AND s.Stype = 'RUN'", nativeQuery = true)
	List<Object[]> findRunningDataByDate(@Param("packDt") String packDt);

	// Step 2: Fetch Net Weight and Brand for Running Production Orders
	@Query(value = "SELECT r.RNwt, r.Brand FROM TblRGoods r WHERE r.POrder IN (:pOrders)", nativeQuery = true)
	List<Object[]> findNetWeightAndBrandByOrders(@Param("pOrders") List<String> pOrders);

	// Step 3: Fetch Stoppage Data
	@Query(value = "SELECT "
			+ "CASE WHEN m.SCode IN ('LC', 'SCL', 'CL', 'MI', 'ER', 'MR') THEN m.SCode ELSE 'Others' END AS StoppageCategory, "
			+ "SUM(s.TotHrs) AS TotalHours " + "FROM TblSSpl s " + "JOIN TblSCMst m ON s.SCause = m.SCause "
			+ "WHERE s.PackDt = :packDt "
			+ "GROUP BY CASE WHEN m.SCode IN ('LC', 'SCL', 'CL', 'MI', 'ER', 'MR') THEN m.SCode ELSE 'Others' END", nativeQuery = true)
	List<Object[]> findStoppageDataByDate(@Param("packDt") String packDt);

	@Query(value = "WITH RunningOrders AS (\r\n" + "    SELECT POrder1, POrder2, POrder3\r\n"
			+ "    FROM [PDE].[dbo].[tblSSpl]\r\n" + "    WHERE PackDt = :packDt AND Stype = 'RUN'\r\n" + ")\r\n"
			+ "SELECT \r\n" + "    ro.POrder1, \r\n" + "    ro.POrder2, \r\n" + "    ro.POrder3,\r\n"
			+ "    rg.RNwt,\r\n" + "    rg.Brand,\r\n" + "    CASE \r\n"
			+ "        WHEN s.SCode IN ('LC', 'SCL', 'CL', 'MI', 'ER', 'MR') THEN s.SCode \r\n"
			+ "        ELSE 'Others' \r\n" + "    END AS StoppageCategory, \r\n" + "    SUM(s.TotHrs) AS TotalHours\r\n"
			+ "FROM \r\n" + "    RunningOrders ro\r\n" + "JOIN \r\n"
			+ "    [PDE].[dbo].[tblRGoods] rg ON ro.POrder1 = rg.POrder \r\n" + "    OR ro.POrder2 = rg.POrder \r\n"
			+ "    OR ro.POrder3 = rg.POrder\r\n" + "JOIN \r\n"
			+ "    [PDE].[dbo].[tblSSpl] s ON ro.POrder1 = s.POrder1 \r\n" + "    OR ro.POrder2 = s.POrder2 \r\n"
			+ "    OR ro.POrder3 = s.POrder3\r\n" + "WHERE \r\n" + "    s.PackDt = :packDt\r\n" + "GROUP BY \r\n"
			+ "    ro.POrder1, \r\n" + "    ro.POrder2, \r\n" + "    ro.POrder3, \r\n" + "    rg.RNwt, \r\n"
			+ "    rg.Brand, \r\n" + "    CASE \r\n"
			+ "        WHEN s.SCode IN ('LC', 'SCL', 'CL', 'MI', 'ER', 'MR') THEN s.SCode \r\n"
			+ "        ELSE 'Others' \r\n" + "    END", nativeQuery = true)
	List<GeminiSplF08Response> approach3StoppageData(@Param("packDt") String packDt);

	@Query(nativeQuery = true, value = "SELECT POrder1, POrder2, POrder3 FROM [PDE].[dbo].[tblSSpl] WHERE PackDt = :packDt AND Stype = 'RUN'")
	List<Map<String, Object>> findRunningOrders(@Param("packDt") String packDt);

	@Query(nativeQuery = true, value = "SELECT RNwt, Brand FROM [PDE].[dbo].[tblRGoods] WHERE POrder IN (:pOrder1, :pOrder2, :pOrder3)")
	List<Map<String, Object>> findNetWeightAndBrand(@Param("pOrder1") String pOrder1, @Param("pOrder2") String pOrder2,
			@Param("pOrder3") String pOrder3);

	@Query(nativeQuery = true, value = "SELECT \r\n" + "    CASE \r\n"
			+ "        WHEN M.SCode IN ('LC', 'SCL', 'CL', 'MI', 'ER', 'MR') THEN M.SCode \r\n"
			+ "        ELSE 'Others' \r\n" + "    END AS StoppageCategory, \r\n" + "    SUM(S.TotHrs) AS TotalHours\r\n"
			+ "FROM [PDE].[dbo].[tblSSpl] S \r\n" + "JOIN [PDE].[dbo].[tblSCMst] M ON S.SCause = M.SCause \r\n"
			+ "WHERE S.PackDt = :packDt \r\n" + "  AND (S.POrder1 IN (:pOrder1, :pOrder2, :pOrder3) \r\n"
			+ "  OR S.POrder2 IN (:pOrder1, :pOrder2, :pOrder3) \r\n"
			+ "  OR S.POrder3 IN (:pOrder1, :pOrder2, :pOrder3))\r\n" + "GROUP BY \r\n" + "    CASE \r\n"
			+ "        WHEN M.SCode IN ('LC', 'SCL', 'CL', 'MI', 'ER', 'MR') THEN M.SCode \r\n"
			+ "        ELSE 'Others' \r\n" + "    END")
	List<Map<String, Object>> findStoppageData(@Param("packDt") String packDt, @Param("pOrder1") String pOrder1,
			@Param("pOrder2") String pOrder2, @Param("pOrder3") String pOrder3);

	// NOW

	@Query(value = "SELECT FTime FROM tblSSpl WHERE PackDt = :packDate AND SType = 'Run' AND (POrder1 = :orderNum OR POrder2 = :orderNum OR POrder3 = :orderNum)", nativeQuery = true)
	List<String> getFromTimesForOrder(@Param("orderNum") String orderNum, @Param("packDate") String packDate);

	@Query(value = "SELECT TTime FROM tblSSpl WHERE PackDt = :packDate AND SType = 'Run' AND (POrder1 = :orderNum OR POrder2 = :orderNum OR POrder3 = :orderNum)", nativeQuery = true)
	List<String> getToTimesForOrder(@Param("orderNum") String orderNum, @Param("packDate") String packDate);

	// MR.J

	@Query(value = "SELECT ts2.SCode AS code, SUM(ts.TotHrs) AS totalHours FROM tblSSpl ts INNER JOIN tblSCMst ts2 ON ts.SCause = ts2.SCause WHERE ts.PackDt =:date AND ts.FTime >= :fromTime AND ts.TTime <= :toTime GROUP BY ts2.SCode", nativeQuery = true)
	List<Object[]> fetchStoppageForTime(@Param("fromTime") String fromTime, @Param("toTime") String toTime,
			@Param("date") String date);

	@Query(value = "SELECT POrder1 FROM tblSSpl WHERE PackDt=:date AND SType ='Run'", nativeQuery = true)
	List<String> order1(@Param("date") String date);

	@Query(value = "SELECT POrder2 FROM tblSSpl WHERE PackDt=:date AND SType ='Run'", nativeQuery = true)
	List<String> order2(@Param("date") String date);

	@Query(value = "SELECT POrder3 FROM tblSSpl WHERE PackDt=:date AND SType ='Run'", nativeQuery = true)
	List<String> order3(@Param("date") String date);

	@Query(value = "SELECT DISTINCT Brand FROM tblRGoods WHERE PackDt =:packDate AND POrder = :orderNum", nativeQuery = true)
	String getBrandForOrder(@Param("packDate") LocalDate packDate, @Param("orderNum") String orderNum);

	@Query(value = "SELECT SUM(RNwt) FROM tblRGoods WHERE PackDt=:date AND POrder=:orderNum", nativeQuery = true)
	BigDecimal getNetWeightForOrder(@Param("date") LocalDate date, @Param("orderNum") String orderNum);

	@Query(value = "SELECT SUM(RNwt) FROM tblRGoods WHERE PackDt=:date AND POrder=:orderNum", nativeQuery = true)
	BigDecimal getTotalNetWeightForOrder(@Param("date") String date, @Param("orderNum") String orderNum);

	@Query(value = "SELECT SUM(RNWt) FROM tblRGoods WHERE PackDt = :packDate", nativeQuery = true)
	BigDecimal getTotalNetWeightForDate(@Param("packDate") String packDate);

	@Query(value = "SELECT SUM(RNWt) FROM tblRGoods WHERE POrder IN (:orderNumbers) AND PackDt=:packDt", nativeQuery = true)
	BigDecimal getTotalNetWeightForOrders(@Param("orderNumbers") List<String> orderNumbers,
			@Param("packDt") String packDt);

}
