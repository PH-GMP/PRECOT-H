package com.focusr.Precot.mssql.database.repository.drygoods;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.drygoods.BaleConsumptionReportDryGoodsF001;

@Repository
public interface BaleConsumptionReportDryGoodsF001Repository  extends JpaRepository<BaleConsumptionReportDryGoodsF001, Long> {

	/**
	 * PDE
	 */
//	@Query(value = "SELECT " +
//            " bc.BaleNo, " +
//            " bc.NetWt, " +
//            " bp.BatchNo " +
//            "FROM " +
//            " [PDE].[dbo].[tblBCons] bc " +
//            "JOIN " +
//            " [PDE].[dbo].[tblBalePack] bp " +
//            "ON " +
//            " bc.BaleNo = bp.BaleNo " +
//            "WHERE " +
//            " (:date IS NULL OR CONVERT(VARCHAR, bc.ConsDt) = :date)  " +
//            " AND (:shift IS NULL OR bc.ShiftID = :shift) " +
//            " AND bc.isSliver IN ('Y', 'M')"
//            + "AND bc.BaleNo IN (:baleNo)",
//    nativeQuery = true)
//List<Object[]> fetchBaleDetails(@Param("date") String date, @Param("shift") String shift, @Param("baleNo") List<String> baleNo);


//	@Query(value = "SELECT " +
//	        " bc.BaleNo, " +
//	        " bc.NetWt, " +
//	        " bp.BatchNo " +
//	        "FROM " +
//	        " [PDE].[dbo].[tblBCons] bc " +
//	        "JOIN " +
//	        " [PDE].[dbo].[tblBalePack] bp " +
//	        "ON " +
//	        " bc.BaleNo = bp.BaleNo " +
//	        "WHERE " +
//	        " (:date IS NULL OR CAST(bc.ConsDt AS DATE) = :date) " +
//	        " AND (:shift IS NULL OR bc.ShiftID = :shift) " +
//	        " AND bc.isSliver IN ('Y', 'M') " +
//	        " AND (bc.BaleNo IN (:baleNo)) ORDER BY bc.BaleNo",
//	        nativeQuery = true)
//	List<Object[]> fetchBaleDetails(@Param("date") String date, @Param("shift") String shift, @Param("baleNo") List<String> baleNo);

	
	// CR
	
//	@Query(value = "SELECT " +
//	        " bc.BaleNo, " +
//	        " bc.NetWt, " +
//	        " bp.BatchNo " +
//	        "FROM " +
//	        " [PDE].[dbo].[tblBCons] bc " +
//	        "JOIN " +
//	        " [PDE].[dbo].[tblBalePack] bp " +
//	        "ON " +
//	        " bc.BaleNo = bp.BaleNo " +
//	        "WHERE " +
//	        " bc.isSliver IN ('Y', 'M') " +
//	        " AND (bc.BaleNo IN (:baleNo)) ORDER BY bc.BaleNo",
//	        nativeQuery = true)
//	List<Object[]> fetchBaleDetails(@Param("baleNo") List<String> baleNo);
	
	
	@Query(value = "SELECT BaleNo ,NetWt,BatchNo FROM tblBalePack WHERE BaleNo IN (:baleNo) ORDER BY BaleNo",
	        nativeQuery = true)
	List<Object[]> fetchBaleDetails(@Param("baleNo") List<String> baleNo);


	// FETCH BALE NO DETAILS 



	@Query(value = "SELECT * FROM tblBCons ", nativeQuery = true)
	List<Object[]> fetchBaleLaydownDetails();


//-----------------------------------------------------------------------------------------------------------------//
@Query(value = "SELECT * FROM precot.DRYGOODS_BALE_CONSUMPTION_REPORT_F001 WHERE BALE_REPORT_ID = :id", nativeQuery = true)
BaleConsumptionReportDryGoodsF001 fetchBaleDetailsbyid(@Param("id") Long id);

@Query(value = "SELECT * FROM precot.DRYGOODS_BALE_CONSUMPTION_REPORT_F001 WHERE " +
        "(:date IS NULL OR DATE = :date) AND " +
        "(:shift IS NULL OR SHIFT = :shift) AND " +
        "(:laydown_no IS NULL OR LAYDOWN_NO = :laydown_no) AND " +
        " HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
List<BaleConsumptionReportDryGoodsF001> printParam( @Param("date") String date, @Param("shift") String shift,@Param("laydown_no") String laydown_no);

@Query(value = "SELECT * FROM precot.DRYGOODS_BALE_CONSUMPTION_REPORT_F001 WHERE DATE=:date AND SHIFT=:shift AND LAYDOWN_NO =:laydown_no", nativeQuery = true)
BaleConsumptionReportDryGoodsF001 getdetailsbyParam(@Param("date") String date, @Param("shift") String shift,@Param("laydown_no") String laydown_no);


@Query(value = "SELECT * FROM precot.DRYGOODS_BALE_CONSUMPTION_REPORT_F001  WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND HOD_STATUS !='HOD_APPROVED' ORDER BY  BALE_REPORT_ID DESC", nativeQuery = true)
List<BaleConsumptionReportDryGoodsF001> hodSummary();
//---------------F006 PDE----------------------------------------------------------------------------------//
@Query(value = "SELECT o.POrder FROM TblOrderInfo O JOIN TblProduct P ON O.Material = P.Product WHERE \r\n"
		+ "O.sts = 1 AND (P.Cat = 'Pleats' OR P.Cat = 'Wool roll') AND  P.Product NOT LIKE 'AB%'; ", nativeQuery = true)
List<String> fetchOrderForF006();

@Query(value = "SELECT P.Brand, O.Material, P.bags,P.bwgt FROM [PDE].[dbo].[TblOrderInfo] O JOIN \r\n"
		+ "[PDE].[dbo].[TblProduct] P ON O.Material = P.Product WHERE O.POrder = :order_no ", nativeQuery = true)
List<Object[]> fetchheaderdetailsForF006(@Param("order_no") String order_no);

//@Query(value = "SELECT \r\n"
//		+ "    R.BaleNo, \r\n"
//		+ "    R.RNWt, \r\n"
//		+ "    M.PGSM, \r\n"
//		+ "    M.Pwid \r\n"
//		+ "FROM \r\n"
//		+ "    [PDE].[dbo].[tblRCons] R \r\n"
//		+ "JOIN \r\n"
//		+ "    [PDE].[dbo].[tblMRGoods] M \r\n"
//		+ "ON \r\n"
//		+ "    R.BaleNo = M.BaleNo \r\n"
//		+ "WHERE \r\n"
//		+ "    (:order_no IS NULL OR R.POrder = :order_no) \r\n"
//		+ "    AND (:date IS NULL OR R.ConsDt = :date) \r\n"
//		+ "    AND (:shift IS NULL OR R.ShiftID = :shift);\r\n"
//		+ "", nativeQuery = true)
//List<Object[]> fetchfleecetReceiptForF006(@Param("date") String date, @Param("shift") String shift,@Param("order_no") String order_no);


@Query(value = "SELECT R.BaleNo, R.RNWt, M.PGSM, M.PWid " +
        "FROM [PDE].[dbo].[tblRCons] R " +
        "JOIN [PDE].[dbo].[tblMRGoods] M ON R.BaleNo = M.BaleNo " +
        "WHERE (:order_no IS NULL OR R.POrder = :order_no) " +
        "AND (:date IS NULL OR CONVERT(DATE, R.ConsDt) = CONVERT(DATE, :date)) " +
        "AND (:shift IS NULL OR R.ShiftID = CAST(:shift AS NUMERIC))", 
nativeQuery = true)
List<Object[]> fetchfleecetReceiptForF006(
@Param("date") String date,
@Param("shift") String shift,
@Param("order_no") String order_no);




@Query(value = "  WITH RunTimes AS (\r\n"
		+ "    SELECT \r\n"
		+ "        FTime AS RunFTime, \r\n"
		+ "        TTime AS RunTTime \r\n"
		+ "    FROM \r\n"
		+ "        [PDE].[dbo].[tblSFng] \r\n"
		+ "    WHERE \r\n"
		+ "        (:order_no IS NULL OR POrder = :order_no) \r\n"
		+ "        AND (:date IS NULL OR Packdt = :date) \r\n"
		+ "        AND Stype = 'Run' \r\n"
		+ "        AND (:shift IS NULL OR ShiftID = :shift) \r\n"
		+ "        AND (:machine_name IS NULL OR MCN = :machine_name)\r\n"
		+ ")\r\n"
		+ "SELECT \r\n"
		+ "    sm.SCAUSE, \r\n"
		+ "    sm.FTime, \r\n"
		+ "    sm.TTime, \r\n"
		+ "    sm.TotHrs, \r\n"
		+ "	sm.SRemarks \r\n"
		+ "FROM \r\n"
		+ "    [PDE].[dbo].[tblSFng] sm \r\n"
		+ "JOIN \r\n"
		+ "    RunTimes rt \r\n"
		+ "ON \r\n"
		+ "    sm.FTime >= rt.RunFTime \r\n"
		+ "    AND sm.TTime <= rt.RunTTime \r\n"
		+ "WHERE \r\n"
		+ "    (:date IS NULL OR sm.Packdt = :date) \r\n"
		+ "    AND (:shift IS NULL OR sm.ShiftID = :shift) \r\n"
		+ "    AND sm.Stype IN ('Stop', 'F.Stop') \r\n"
		+ "    AND (:machine_name IS NULL OR sm.MCN = :machine_name)", nativeQuery = true)
List<Object[]> fetchStoppagedetailsForF006(@Param("date") String date, @Param("shift") String shift,@Param("order_no") String order_no,@Param("machine_name") String machine_name);

}
