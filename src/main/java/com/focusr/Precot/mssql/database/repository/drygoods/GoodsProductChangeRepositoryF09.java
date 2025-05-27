package com.focusr.Precot.mssql.database.repository.drygoods;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;

import com.focusr.Precot.mssql.database.model.drygoods.GoodsProductChangeOverF09;



@Repository
public interface GoodsProductChangeRepositoryF09 extends JpaRepository<GoodsProductChangeOverF09, Long>{

	@Query(value = "SELECT * FROM precot.GOODS_PROD_CHANGE_OVER_F09 WHERE PRODUCT_ID=:id", nativeQuery = true)
	GoodsProductChangeOverF09 productChangeoverDetailsById(@Param("id") Long id);
	
	
	@Query(value = "SELECT * FROM precot.GOODS_PROD_CHANGE_OVER_F09 WHERE DATE=:date AND SECTION=:section AND MACHINE_NAME=:machine", nativeQuery = true)
	GoodsProductChangeOverF09 productChangeoverDetailsByDateMachineShift(@Param("date") String date, @Param("section") String section, @Param("machine") String machine);
	
	@Query(value = "SELECT * FROM precot.GOODS_PROD_CHANGE_OVER_F09 WHERE ORDER_NO_1=:orderNo AND DATE=:date AND MACHINE_NAME=:machine", nativeQuery = true)
	List<GoodsProductChangeOverF09> productChangeOverBYoRder(@Param("orderNo") String orderNo, @Param("date") String date, @Param("machine") String machine);
	
	
	
	
	@Query(value = "SELECT * FROM precot.GOODS_PROD_CHANGE_OVER_F09 WHERE SUPERVISOR_STATUS='SUPERVISOR_SAVED' OR QA_STATUS != 'QA_APPROVED' ORDER BY PRODUCT_ID DESC", nativeQuery = true)
	List<GoodsProductChangeOverF09> getPunchingSupervisorSummary();
	
	@Query(value = "SELECT * FROM precot.GOODS_PROD_CHANGE_OVER_F09 WHERE QA_STATUS != 'QA_APPROVED' ORDER BY PRODUCT_ID DESC", nativeQuery = true)
	List<GoodsProductChangeOverF09> getPunchingHodQASummary();
	
	@Query(value = "SELECT * FROM precot.GOODS_PROD_CHANGE_OVER_F09 " +
            "WHERE (:date IS NULL OR :date='' OR DATE = :date) " +
//            "AND (:section IS NULL OR :section='' OR SECTION = :section) " +
            "AND (:machine IS NULL OR :machine='' OR MACHINE_NAME = :machine)"
            + "AND QA_STATUS='QA_APPROVED'", nativeQuery = true)
	List<GoodsProductChangeOverF09> productChangeoverDetailsPrint(@Param("date") String date, @Param("machine") String machine);

	//-------------------------F010 Log book PDE -------------------------------------------------------------------------//
	@Query(value = "SELECT \r\n"
			+ " MCN \r\n"
			+ "FROM \r\n"
			+ " [PDE].[dbo].[tblMCDet] \r\n"
			+ "WHERE \r\n"
			+ " MCat IN ('Pleats', 'Wool Roll', 'Balls')", nativeQuery = true)
	List<String>  mechineLov();
	
	
	@Query(value = "SELECT \r\n"
			+ "    fp.POrder AS OrderNumber, \r\n"
			+ "    o.Material AS Material, \r\n"
			+ "    fp.NBAG AS Bags, \r\n"
//			+ "    (o.QTY / p.Pack) AS OrderQty, \r\n"
			+ "    (o.QTY) AS OrderQty, \r\n"
			+ "    ((o.QTY / p.Pack) - (fp.NBAG / p.Bags)) AS ProductionBalance, \r\n"
			+ "    (fp.NBAG / p.Bags) AS Box\r\n"
			+ "FROM \r\n"
			+ "    [PDE].[dbo].[TblFPPack] fp \r\n"
			+ "JOIN \r\n"
			+ "    [PDE].[dbo].[tblOrderInfo] o \r\n"
			+ "ON \r\n"
			+ "    fp.POrder = o.POrder \r\n"
			+ "JOIN \r\n"
			+ "    [PDE].[dbo].[TblProduct] p \r\n"
			+ "ON \r\n"
			+ "    o.Material = p.Product \r\n"
			+ "WHERE \r\n"
			+ "    (:date IS NULL OR fp.PackDt = :date) \r\n"
			+ "    AND (:shift IS NULL OR fp.ShiftID = :shift) \r\n"
			+ "    AND (:machine_name IS NULL OR fp.MCN = :machine_name)\r\n"
			, nativeQuery = true)
	List<Object[]> mechineBasedDetailsLogBook(@Param("date") String date,@Param("shift") String shift,@Param("machine_name") String machine_name);
//-----------------F009 PDE---------------------------------------------------------------------------------------------------//
	@Query(value = "SELECT  O.POrder FROM [PDE].[dbo].[tblOrderInfo] O JOIN [PDE].[dbo].[tblProduct] P ON O.Material = \r\n"
			+ "P.Product WHERE O.sts = 1 AND P.Cat in ('Pleats','WollRoll','Balls') AND P.Product NOT LIKE \r\n"
			+ "'AB%'"
			, nativeQuery = true)
	List<String> productOrderLov();

	
	@Query(value = "SELECT O.SaleOrder, O.SOitem , O.POrder,O.Qty,P.Bags , O.PONo ,O.Material , P.ProdDesc \r\n"
			+ " FROM [PDE].[dbo].[tblOrderInfo] O JOIN [PDE].[dbo].[tblProduct] P ON O.Material = \r\n"
			+ "P.Product WHERE O.sts = 1 AND P.Cat in ('Pleats','WollRoll','Balls') AND P.Product NOT LIKE \r\n"
			+ "'AB%'and O.POrder = :order_no"
			+ "", nativeQuery = true)
	List<Object[]> productChangeOverDetails(@Param("order_no") String order_no);

	//----------------------------------------------------------------F005 PDE-----------------------------------------------------------------//
	
	//DryGoods repository
	
	
		@Query(value = " SELECT  \r\n"
				+ "    toi.POrder,  \r\n"
				+ "    toi.Brand,  \r\n"
				+ "    toi.Material, \r\n"
				+ "    mg.BaleNo, \r\n"
				+ "    mg.RNWt, \r\n"
				+ "    mg.PWid, \r\n"
				+ "    mg.PGSM \r\n"
				+ "FROM  \r\n"
				+ "    [PDE].[dbo].[TblOrderInfo] toi \r\n"
				+ "JOIN  \r\n"
				+ "    [PDE].[dbo].[tblMRGoods] mg  \r\n"
				+ "ON  \r\n"
				+ "    toi.POrder = mg.POrder \r\n"
				+ "WHERE  \r\n"
				+ "    toi.Material LIKE 'RGPW%'  \r\n"
				+ "    AND toi.sts = '1' \r\n"
				+ "      AND mg.PackDt = :date \r\n"
				+ "    AND mg.ShiftID =:shift", nativeQuery = true)
		List<Map<String, Object>> getProductionMiniROll(@Param("date") String date,
				 @Param("shift") String shift);
		
		@Query(value = " WITH RunTimes AS ( \r\n"
				+ "    SELECT  \r\n"
				+ "        FTime AS RunFTime,  \r\n"
				+ "        TTime AS RunTTime \r\n"
				+ "    FROM  \r\n"
				+ "        [PDE].[dbo].[tblSMR] \r\n"
				+ "    WHERE  \r\n"
				+ "        (:order_no IS NULL OR POrder1 = :order_no)"
				+ "        AND (:date IS NULL OR PackDt = :date) \r\n"
				+ "        AND Stype = 'Run' \r\n"
				+ "        AND (:shift IS NULL OR ShiftID = :shift) \r\n"
				+ ") \r\n"
				+ "SELECT  \r\n"
				+ "    sm.SCAUSE,  \r\n"
				+ "    sm.FTime,  \r\n"
				+ "    sm.TTime,  \r\n"
				+ "    sm.TotHrs \r\n"
				+ "FROM  \r\n"
				+ "    [PDE].[dbo].[tblSMR] sm \r\n"
				+ "JOIN  \r\n"
				+ "    RunTimes rt  \r\n"
				+ "ON  \r\n"
				+ "    sm.FTime >= rt.RunFTime  \r\n"
				+ "    AND sm.TTime <= rt.RunTTime \r\n"
				+ "WHERE  \r\n"
				+ "  (:date IS NULL OR sm.Packdt = :date) \r\n"
				+ "    AND (:shift IS NULL OR sm.ShiftID = :shift) \r\n"
				+ "    AND sm.Stype IN ('Stop', 'F.Stop')", nativeQuery = true)
		List<Map<String, Object>> getProductionMiniROllStoppage(@Param("date") String date,
				 @Param("shift") String shift,
				 @Param("order_no") String order_no);
		
		//--------------------------------------------sliver F002 Pde--------------------------------------------------------------
		
		
		
		@Query(value ="SELECT  \r\n"
				+ "    POrder,Material \r\n"
				+ "FROM  \r\n"
				+ "[PDE].[dbo].[tblOrderinfo] \r\n"
				+ "WHERE  \r\n"
				+ "    Material LIKE '4%' OR Material LIKE '5%';", nativeQuery = true)
		List<Map<String, Object>> getSliver();
		
		
		@Query(value = " SELECT  \r\n"
				+ "    Scause,  \r\n"
				+ "    FTime,  \r\n"
				+ "    TTime,  \r\n"
				+ "    TotHrs, \r\n"
				+ "   SRemarks \r\n"
				+ "FROM  \r\n"
				+ "    [PDE].[dbo].[tblSCRP] \r\n"
				+ "WHERE  \r\n"
				+ "    (:date IS NULL OR PackDt = :date)\r\n"
				+ "    AND (:shift IS NULL OR ShiftID = :shift)\r\n"
				+ "    AND (:machine_name IS NULL OR MCN = :machine_name);\r\n"
				+ "", nativeQuery = true)
		List<Map<String, Object>> getSliverStoppage(@Param("date") String date,
				 @Param("shift") String shift,
				 @Param("machine_name") String machine_name);
		
		
		
		@Query(value = "SELECT  \r\n"
				+ "    mg.POrder,  \r\n"
				+ "    toi.Brand,  \r\n"
				+ "    toi.Material, \r\n"
				+ "    mg.BaleNo, \r\n"
				+ "    mg.RNWt, \r\n"
				+ "    mg.PWid, \r\n"
				+ "    mg.PGSM \r\n"
				+ "FROM  \r\n"
				+ "    [PDE].[dbo].[TblOrderInfo] toi \r\n"
				+ "JOIN  \r\n"
				+ "    [PDE].[dbo].[tblMRGoods] mg  \r\n"
				+ "ON  \r\n"
				+ "    toi.POrder = mg.POrder \r\n"
				+ "WHERE  \r\n"
				+ "    toi.Material LIKE 'RGPW%'  \r\n"
//				+ "    AND toi.sts = '1' \r\n"
				+ "      AND mg.PackDt = :date \r\n"
				+ "    AND mg.ShiftID =:shift", nativeQuery = true)
		List<Map<String, Object>> getProductionMiniROllTrace(@Param("date") String date,
				 @Param("shift") String shift);
		
		
//		@Query(value = " SELECT  \r\n"
//				+ "    toi.POrder,  \r\n"
//				+ "    toi.Brand,  \r\n"
//				+ "    toi.Material, \r\n"
//				+ "    mg.BaleNo, \r\n"
//				+ "    mg.RNWt, \r\n"
//				+ "    mg.PWid, \r\n"
//				+ "    mg.PGSM \r\n"
//				+ "FROM  \r\n"
//				+ "    [PDE].[dbo].[TblOrderInfo] toi \r\n"
//				+ "JOIN  \r\n"
//				+ "    [PDE].[dbo].[tblMRGoods] mg  \r\n"
//				+ "ON  \r\n"
//				+ "    toi.POrder = mg.POrder \r\n"
//				+ "WHERE  \r\n"
//				+ "    toi.Material LIKE 'RGPW%'  \r\n"
//				+ "    AND toi.sts = '1' \r\n"
//				+ "      AND mg.PackDt = :date \r\n"
//				+ "    AND mg.ShiftID =:shift"
//				+ "    AND toi.POrder =:order", nativeQuery = true)
//		List<Map<String, Object>> getProductionMiniROll(@Param("date") String date,
//				 @Param("shift") String shift ,@Param("order") String order );
		
//		@Query(value = "  SELECT  \r\n"
//				+ "    toi.POrder,  \r\n"
//				+ "    toi.Brand,  \r\n"
//				+ "    toi.Material, \r\n"
//				+ "    mg.BaleNo, \r\n"
//				+ "    mg.RNWt, \r\n"
//				+ "    mg.PWid, \r\n"
//				+ "    mg.PGSM,\r\n"
//				+ "    tp.ProdDesc\r\n"
//				+ "FROM  \r\n"
//				+ "    [PDE].[dbo].[TblOrderInfo] toi \r\n"
//				+ "JOIN  \r\n"
//				+ "    [PDE].[dbo].[tblMRGoods] mg  \r\n"
//				+ "ON  \r\n"
//				+ "    toi.POrder = mg.POrder \r\n"
//				+ "JOIN  \r\n"
//				+ "    [PDE].[dbo].[tblProduct] tp \r\n"
//				+ "ON  \r\n"
//				+ "    toi.Brand = tp.Brand \r\n"
//				+ "WHERE  \r\n"
//				+ "    toi.Material LIKE 'RGPW%'  \r\n"
//				+ "    AND toi.sts = '1' \r\n"
//				+ "    AND mg.PackDt = :date	\r\n"
//				+ "    AND mg.ShiftID = :shift \r\n"
//				+ "    AND toi.POrder = :order", nativeQuery = true)
//		List<Map<String, Object>> getProductionMiniROll(@Param("date") String date,
//				 @Param("shift") String shift ,@Param("order") String order );
		
		
		// CR & ENHANCEMENR - PRODUCT NAME ASKED CLIENT 
		
		@Query(value = "  SELECT DISTINCT \r\n"
				+ "    toi.POrder,  \r\n"
				+ "    toi.Brand,  \r\n"
				+ "    toi.Material, \r\n"
				+ "    mg.BaleNo, \r\n"
				+ "    mg.RNWt, \r\n"
				+ "    mg.PWid, \r\n"
				+ "    mg.PGSM,\r\n"
				+ "    tp.ProdDesc\r\n"
				+ "FROM  \r\n"
				+ "    [PDE].[dbo].[TblOrderInfo] toi \r\n"
				+ "JOIN  \r\n"
				+ "    [PDE].[dbo].[tblMRGoods] mg  \r\n"
				+ "ON  \r\n"
				+ "    toi.POrder = mg.POrder \r\n"
				+ "JOIN  \r\n"
				+ "    [PDE].[dbo].[tblProduct] tp \r\n"
				+ "ON  \r\n"
				+ "    toi.Brand = tp.Brand \r\n"
				+ "WHERE  \r\n"
				+ "    toi.Material LIKE 'RGPW%'  \r\n"
				+ "    AND toi.sts = '1' \r\n"
				+ "    AND mg.PackDt = :date	\r\n"
				+ "    AND mg.ShiftID = :shift \r\n"
				+ "    AND toi.POrder = :order", nativeQuery = true)
		List<Map<String, Object>> getProductionMiniROll(@Param("date") String date,
				 @Param("shift") String shift ,@Param("order") String order );
			
			@Query(value = " SELECT  \r\n"
					+ "    toi.POrder  \r\n"
	 
					+ "FROM  \r\n"
					+ "    [PDE].[dbo].[TblOrderInfo] toi \r\n"
					+ "JOIN  \r\n"
					+ "    [PDE].[dbo].[tblMRGoods] mg  \r\n"
					+ "ON  \r\n"
					+ "    toi.POrder = mg.POrder \r\n"
					+ "WHERE  \r\n"
					+ "    toi.Material LIKE 'RGPW%'  \r\n"
					+ "    AND toi.sts = '1' \r\n"
					+ "      AND mg.PackDt = :date \r\n"
					+ "    AND mg.ShiftID =:shift", nativeQuery = true)
			List<String> getORDERNO(@Param("date") String date,
					 @Param("shift") String shift);

		
}
