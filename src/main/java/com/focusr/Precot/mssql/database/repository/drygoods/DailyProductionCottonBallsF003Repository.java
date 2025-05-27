package com.focusr.Precot.mssql.database.repository.drygoods;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.drygoods.DailyProductionCottonBallsF003;

@Repository
public interface DailyProductionCottonBallsF003Repository  extends JpaRepository<DailyProductionCottonBallsF003, Long>{

	//********************************************************************PDE*******************************************************************************************//
	@Query(value = " SELECT o.POrder FROM TblOrderInfo O JOIN TblProduct P ON O.Material = P.Product WHERE O.sts = 1 AND P.Cat = 'Balls'", nativeQuery = true)
	List<String> cottonOrderLov();
	
	@Query(value = "SELECT\r\n"
			+ "    O.Material, \r\n"
			+ "    P.Brand AS customer_name, \r\n"
			+ "    O.Qty, \r\n"
			+ "    O.Saleorder, \r\n"
			+ "    P.Bags, \r\n"
			+ "    SUBSTRING(O.Material, CHARINDEX('-', O.Material) + 1, LEN(O.Material) - CHARINDEX('-', O.Material)) AS MaterialAfterDash,\r\n"
			+ "    P.Pack AS bag_by_box\r\n"
			+ "FROM \r\n"
			+ "    [PDE].[dbo].[TblOrderInfo] O \r\n"
			+ "JOIN \r\n"
			+ "    [PDE].[dbo].[TblProduct] P \r\n"
			+ "ON \r\n"
			+ "    O.Material = P.Product \r\n"
			+ "WHERE \r\n"
			+ "    O.POrder =:order_no\r\n"
			+ "", nativeQuery = true)
	List<Object[]> fetchpdeF003(@Param("order_no") String order_no);
	
	
//	@Query(value = "SELECT \r\n" +
//	        "    P.ProdDesc, \r\n" +
//	        "    C.cust_name AS customer_name, \r\n" +
//	        "    O.Qty, \r\n" +
//	        "    O.Saleorder, \r\n" +
//	        "    P.Bags, \r\n" +
//	        "    SUBSTRING(O.Material, CHARINDEX('-', O.Material) + 1, LEN(O.Material) - CHARINDEX('-', O.Material)) AS MaterialAfterDash, \r\n" +
//	        "    P.Pack AS bag_by_box \r\n" +
//	        "FROM \r\n" +
//	        "    [PDE].[dbo].[TblOrderInfo] O \r\n" +
//	        "JOIN \r\n" +
//	        "    [PDE].[dbo].[TblProduct] P \r\n" +
//	        "ON \r\n" +
//	        "    O.Material = P.Product \r\n" +
//	        "JOIN \r\n" +
//	        "    [PDE].[dbo].[tblcusinfo] C \r\n" +
//	        "ON \r\n" +
//	        "    O.Material = C.Material \r\n" +
//	        "WHERE \r\n" +
//	        "    O.POrder = :order_no \r\n" +
//	        "", nativeQuery = true)
//	List<Object[]> fetchpdeF003(@Param("order_no") String order_no);

	
	@Query(value = " WITH RunTimes AS (\r\n"
			+ "    SELECT \r\n"
			+ "        FTime AS RunFTime, \r\n"
			+ "        TTime AS RunTTime, \r\n"
			+ "		SRemarks AS Remarks \r\n"
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
			+ " 	sm.SRemarks \r\n"
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
			+ "    AND (:machine_name IS NULL OR sm.MCN = :machine_name);\r\n"
			+ ""
			+ "", nativeQuery = true)
	List<Object[]> fetchStoppageF003(@Param("date") String date, @Param("shift") String shift,@Param("order_no") String order_no,@Param("machine_name") String machine_name);

	//********************************************************************************************************************************************************************//
	@Query(value = "SELECT * FROM precot.DRYGOODS_DAILY_PRODUCTION_COTTONBALLS_F003 WHERE COTTONBALLS_ID = :id", nativeQuery = true)
	DailyProductionCottonBallsF003 fetchBaleDetailsbyid(@Param("id") Long id);
//-------------------------------------------------------------------------------------------------------------------------------------//
	@Query(value = "SELECT * FROM precot.DRYGOODS_DAILY_PRODUCTION_COTTONBALLS_F003 WHERE " +
	        "(:date IS NULL OR :date = '' OR DATE = :date) AND " +
	        "(:shift IS NULL OR :shift = '' OR SHIFT = :shift) AND " +
	        "(:machine_name IS NULL OR :machine_name = '' OR MACHINE_NAME = :machine_name) AND " +
	        "(:order_no IS NULL OR :order_no = '' OR ORDER_NO = :order_no) AND " +
	        "HOD_STATUS ='HOD_APPROVED'", nativeQuery = true)
	List<DailyProductionCottonBallsF003> printParam( @Param("date") String date, @Param("shift") String shift,@Param("machine_name") String machine_name, @Param("order_no") String order_no);
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_DAILY_PRODUCTION_COTTONBALLS_F003 WHERE DATE=:date AND SHIFT=:shift AND MACHINE_NAME =:machine_name AND ORDER_NO = :order_no", nativeQuery = true)
	DailyProductionCottonBallsF003 getdetailsbyParam(@Param("date") String date, @Param("shift") String shift, @Param("machine_name") String machine_name, @Param("order_no") String order_no);

	@Query(value = "SELECT * FROM precot.DRYGOODS_DAILY_PRODUCTION_COTTONBALLS_F003  WHERE OPERATOR_STATUS = 'OPERATOR_SAVED' OR HOD_STATUS !='HOD_APPROVED' ORDER BY  COTTONBALLS_ID DESC", nativeQuery = true)
	List<DailyProductionCottonBallsF003> operatorSummary();
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_DAILY_PRODUCTION_COTTONBALLS_F003  WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND HOD_STATUS !='HOD_APPROVED' ORDER BY  COTTONBALLS_ID DESC", nativeQuery = true)
	List<DailyProductionCottonBallsF003> hodSummary();
	
	
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_DAILY_PRODUCTION_COTTONBALLS_F003 WHERE ORDER_NO = :orderNo AND DATE BETWEEN :fromdate AND :todate", nativeQuery = true)
	List<DailyProductionCottonBallsF003> getDrygoodsFleece( @Param("fromdate") String fromdate, @Param("todate") String todate,@Param("orderNo") String orderNo);
	
	
		// TARCEABILITY
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_DAILY_PRODUCTION_COTTONBALLS_F003 WHERE ORDER_NO = :orderNumber AND DATE BETWEEN :fromdate AND :todate", nativeQuery = true)
	List<DailyProductionCottonBallsF003> get( @Param("orderNumber") String orderNumber,@Param("fromdate") String fromdate, @Param("todate") String todate);

}


