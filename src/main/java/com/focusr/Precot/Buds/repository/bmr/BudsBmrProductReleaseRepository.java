package com.focusr.Precot.Buds.repository.bmr;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.Payload.BudsOrderInfoResponse;
import com.focusr.Precot.Buds.model.bmr.BudsBmrProductRelease;

@Repository
public interface BudsBmrProductReleaseRepository extends JpaRepository<BudsBmrProductRelease, Long>{

	@Query(value = "SELECT * FROM precot.BUDS_BMR_PRODUCT_RELEASE WHERE BATCH_NO=:batchNo", nativeQuery = true)
	List<BudsBmrProductRelease> productReleaseByBatchNo(@Param("batchNo") String batchNo);
	
	
	@Query(value = "SELECT * FROM precot.BUDS_BMR_PRODUCT_RELEASE WHERE ID=:id", nativeQuery = true)
	BudsBmrProductRelease productReleaseById(@Param("id") Long id);
	
	
	// SAP DATAS
	
	@Query(value = "SELECT O.SaleOrder, O.SOitem , O.POrder,O.Qty, O.PONo ,O.Material , P.ProdDesc\r\n"
			+ ",P.Bags FROM tblOrderInfo O JOIN tblProduct P ON O.Material =\r\n"
			+ "P.Product WHERE O.sts = 1 AND P.Cat = 'Buds';", nativeQuery = true)
	List<BudsOrderInfoResponse> budsOrderInfoDetails();
	
	@Query(value = "SELECT DISTINCT  O.POrder FROM tblOrderInfo O JOIN tblProduct P ON O.Material =\r\n"
			+ "P.Product WHERE O.sts = 1 AND P.Cat = 'Buds';", nativeQuery = true)
	List<String> budsOrderInfo();
	
	@Query(value = "SELECT O.SaleOrder, O.SOitem , O.POrder,O.Qty, O.PONo ,O.Material , P.ProdDesc\r\n"
			+ ",P.Bags FROM tblOrderInfo O JOIN tblProduct P ON O.Material =\r\n"
			+ "P.Product WHERE O.sts = 1 AND P.Cat = 'Buds';", nativeQuery = true)
	List<BudsOrderInfoResponse> budsProductionDetailsResponse();
	
	//order lov
	@Query(value = "SELECT DISTINCT O.POrder FROM tblOrderInfo O JOIN tblProduct P ON O.Material = P.Product WHERE O.Sts = 1 AND P.Cat = 'Buds'", nativeQuery = true)
	List<String> orderLOV();
	
	
	@Query(value = "SELECT toi.POrder, toi.Material, t.CUST_NAME\r\n"
			+ "FROM tblOrderInfo toi\r\n"
			+ "JOIN tblcusinfo t ON toi.Material = t.MATERIAL \r\n"
			+ "WHERE toi.POrder =:orderNumber", nativeQuery = true)
	List<Map<String, Object>> orderDetailsMap(@Param("orderNumber") String orderNumber);
	
	
	@Query(value = "SELECT O.SaleOrder AS saleOrder, O.SOitem AS item, O.POrder AS orderNumber,O.Qty AS quantity,P.Bags AS bags, O.PONo AS poNumber,O.Material AS material, P.ProdDesc AS product FROM tblOrderInfo O JOIN tblProduct P ON O.Material =P.Product WHERE O.Sts = 1 AND P.Cat ='Buds' AND O.POrder=:orderNumber", nativeQuery = true)
	List<Map<String, Object>> productChangeOrderDetails(@Param("orderNumber") String orderNumber);
	
	
	@Query(value = "SELECT MCN FROM tblMCDet WHERE MCat = 'Bud'", nativeQuery = true)
	List<String> machineList();
	
	
		// PRODUCT CHANGE DETAILS 
	
	@Query(value = "SELECT P.ProdDesc AS product, O.Qty AS quantity, (O.Qty/P.bags) AS bags, O.POrder AS bmrNo FROM tblOrderInfo O JOIN tblProduct P ON O.Material = P.Product WHERE O.Sts = 1 AND P.Cat = 'Buds' AND O.POrder=:orderNumber", nativeQuery = true)
	List<Map<String, Object>> productChangeDetails(@Param("orderNumber") String orderNumber);
	
}
