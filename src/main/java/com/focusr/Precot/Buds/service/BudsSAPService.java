package com.focusr.Precot.Buds.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.focusr.Precot.Buds.Payload.BudsOrderInfoResponse;
import com.focusr.Precot.Buds.repository.bmr.BudsBmrProductReleaseRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.util.IdAndValuePair;

@Service
public class BudsSAPService {

	Logger logger = LoggerFactory.getLogger(BudsSAPService.class);
	
	@Autowired
	private BudsBmrProductReleaseRepository productReleaseRepository;
	
	
		// GET ORDER LOV 
	
	public ResponseEntity<?> getOrderLOV() {
		
		List<String> orderLov = new LinkedList<String>();
		List<IdAndValuePair> resultOrderlist = new LinkedList<IdAndValuePair>();
		
		try {
			
			orderLov = productReleaseRepository.orderLOV();
			
			for(String temp : orderLov) {
				
				Long id = (long) 1;
				
				IdAndValuePair valueList = new IdAndValuePair();
				valueList.setValue(temp);
				valueList.setId(id);
				
				resultOrderlist.add(valueList);
				id++;
			}
			
		} catch(Exception e) {
			
			String msg = e.getMessage();
			
			logger.error("*** !!! Unable to get Buds Order Lov !!! ***" + e);
			
			return new ResponseEntity(new ApiResponse(false, "Failed to get Buds Order LOV " + msg), HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(resultOrderlist, HttpStatus.OK);
	}
	
	
		// GET ORDER INFO
	
	public ResponseEntity<?> getBudsOrderInfo() {
		
		List<String> budsOrderMap = new LinkedList<String>();
		
		try {
			
			budsOrderMap = productReleaseRepository.budsOrderInfo();
			
		} catch(Exception e) {
			
			String msg = e.getMessage();
			
			logger.error("*** !!! Unable to get Buds data !!! ***" + e);
			
			return new ResponseEntity(new ApiResponse(false, "Failed to get Buds Data" + msg), HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(budsOrderMap, HttpStatus.OK);
	}
	//GET ORDER DETAILS BY ORDER INFO
	public ResponseEntity<?> getBudsOrderDetailsOrderInfo() {
		
		List<BudsOrderInfoResponse> budsOrderMap = new LinkedList<BudsOrderInfoResponse>();
		
		try {
			
			budsOrderMap = productReleaseRepository.budsOrderInfoDetails();
			
		} catch(Exception e) {
			
			String msg = e.getMessage();
			
			logger.error("*** !!! Unable to get Buds data !!! ***" + e);
			
			return new ResponseEntity(new ApiResponse(false, "Failed to get Buds Data" + msg), HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(budsOrderMap, HttpStatus.OK);
	}
	
	
		// GET ORDER DETAILS BY ORDER
	
	
	public ResponseEntity<?> getOrderDetailsByOrder(String orderNumber) {
		
		List<Map<String, Object>> orderDetailsMap = new ArrayList<Map<String,Object>>();
		
		Map<String, String> resultMap = new HashMap<String, String>();
		
		try {
			
			orderDetailsMap = productReleaseRepository.orderDetailsMap(orderNumber);
			
			for(Map<String, Object> temp : orderDetailsMap) {
				String orderNum = (String) temp.get("POrder");
				String material = (String) temp.get("Material");
				String customerName = (String) temp.get("CUST_NAME");
				
				resultMap.put("orderNumber", orderNumber);
				resultMap.put("material", material);
				resultMap.put("customerName", customerName);
				
			}
			
		} catch(Exception e) {
			
			String msg = e.getMessage();
			
			logger.error("*** !!! Unable to get Buds data !!! ***" + e);
			
			return new ResponseEntity(new ApiResponse(false, "Failed to get Buds Data" + msg), HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(resultMap, HttpStatus.OK);
	}
	
	
		// PRODUCT CHANGE OVER 
	
//	public ResponseEntity<?> productChangeOverOrderDetails(String orderNumber) {
//		
//		List<Map<String, Object>> orderDetailsMap = new ArrayList<Map<String,Object>>();
//		
//		try {
//			
//			orderDetailsMap = productReleaseRepository.productChangeOrderDetails(orderNumber);
//			
//			for(Map<String, Object> temp : orderDetailsMap) {
//				
//				String material = (String) temp.get("material");
//				String customerName = (String) temp.get("product");
//				String poNumber = (String) temp.get("poNumber");
//				
//				
//			}
//			
//		}catch(Exception ex) {
//			
//			logger.error("*** !!! Unable to get Order details !!! ***" + e);
//			
//			String msg = ex.getMessage();
//			
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Unable to get Order Details !!!") + msg);
//		}
//		
//	}
	
	
		// MACHINE DETAILS
	
	public ResponseEntity<?> getMachineMaster() {
		
		List<String> machineList = new LinkedList<String>();
		
		List<IdAndValuePair> machineValueList = new LinkedList<IdAndValuePair>();
		
		try {
			
			machineList = productReleaseRepository.machineList();
			
			for(String machine : machineList) {
				
				IdAndValuePair value = new IdAndValuePair();
				value.setValue(machine);
				
				Long id = (long) 1;
				
				value.setId(id);
				
				machineValueList.add(value);
				
				id++;
				
			}
			
		} catch(Exception e) {
			
			String msg = e.getMessage();
			
			logger.error("*** !!! Unable to get Buds data !!! ***" + e);
			
			return new ResponseEntity(new ApiResponse(false, "Failed to get Buds Data" + msg), HttpStatus.BAD_REQUEST);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(machineValueList);
		
	}
	
	
		// GET DETAILS FOR PRODUCT CHANGE OVER 
	
	public ResponseEntity<?> fetchproductChangeOverDetails(String orderNumber) {
		
		List<Map<String, Object>> orderDetailsMap = new ArrayList<Map<String,Object>>();
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		try {
			
			orderDetailsMap = productReleaseRepository.productChangeDetails(orderNumber);
			
			for(Map<String, Object> temp : orderDetailsMap) {
				
				String orderNo = (String) temp.get("bmrNo");
				BigDecimal quantity = (BigDecimal) temp.get("quantity");
				BigDecimal bags = (BigDecimal) temp.get("bags");
				String product = (String) temp.get("product");
				
				resultMap.put("bmrNo", orderNumber);
				resultMap.put("sliverWeight", quantity);
				resultMap.put("packSize", bags);
				resultMap.put("product", product);
			}
			
		} catch(Exception e) {
			
			String msg = e.getMessage();
			
			logger.error("*** !!! Unable to get Buds data !!! ***" + e);
			
			return new ResponseEntity(new ApiResponse(false, "Failed to get Buds Data" + msg), HttpStatus.BAD_REQUEST);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(resultMap);
		
	}
	
	
}
