package com.focusr.Precot.QA.payload;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.FinalInspectionReportF037;
import com.focusr.Precot.QA.model.QaOnlineInspectionReport;
import com.focusr.Precot.mssql.database.model.bleaching.BmrSummary;
import com.focusr.Precot.util.drygoods.GoodsAbCons;
import com.focusr.Precot.util.drygoods.RpBalePayload;

import lombok.Data;


@Data
public class PunchingTracebilityPayload {
	
//	 private String Order;
//	    private String Product;
//	    private String ProductQty;
//	    private String PackedQty;
//	    private String Brand;
//	    private String poNo;
//	    private String saleOrder;
//	    private String bmr;
//	    private String itemCode;
//	    private String pattern;
//	    private String edge;
//	    private String machineNumber;
//	    private String gsm;
//	    private String rollNumber;
//	    private String bmrRollConsumption;
//	    private String shaftNum;
//	    private String netWeight;
//	    private String productionDate;
//	    private String rollWidth;
//	    private String rollLength;
//	    private String rollGsm;
//	    private String Moisture;
//	    private String Mixing;
//	    private List onlineInspection;
//	    private List packingDetails;
//	    private List finalInspection;
	
	
	
//	@Query(value = "SELECT Material AS material,Brand as brand,PONo as pOno,SaleOrder AS saleOrder,SOItem AS itemCode,pattern AS pattern,"
//			+ "gsm AS gsm  FROM dbo.tblOrderInfo WHERE POrder =:pOrder", nativeQuery = true)
//	List<Map<String, Object>> getTblOrderInfoDetails(@Param("pOrder") String pOrder);
//	private List<Map<String, Object>> headerDetails;
//	    private List<QaOnlineInspectionReport> onlineInspection;
//	    private List<Map<String, Object>> packingDetails;
//	    private List<FinalInspectionReportF037> finalInspection;
//	    private List<Map<String, Object>> rollConsumptionDetails;
	
	 private String orderNo;
	    private String product;
	    private Integer productQty;
	    private Integer packedQty;
	    private String brand;
	    private String poNo;
	    private String bmr;
	    private BigDecimal itemCode;
	    private String pattern;
	    private BigDecimal saleOrder;
	    private BigDecimal gsm;
	    private String edge;
	    private String machineNo;
	    private List<QaOnlineInspectionReport> onlineInspection;
	    private List<Map<String, Object>> packingDetails;
	    private List<FinalInspectionReportF037> finalInspection;
	    private List<Map<String, Object>> rollConsumptionDetails;
	    
	    
	    // Change this to accept List<GoodsAbCons>
	    private List<GoodsAbCons> abCottonDetails;
	    
        private List<List<BmrSummary>> bmrSummary ;
        private List<RpBalePayload> rpList;
		
	   

}
