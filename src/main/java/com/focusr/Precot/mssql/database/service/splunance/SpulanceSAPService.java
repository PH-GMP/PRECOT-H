package com.focusr.Precot.mssql.database.service.splunance;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.focusr.Precot.mssql.database.repository.bleaching.DepartmentRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR01RP01ProductionDetailsRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.LovResponse;
import com.focusr.Precot.payload.spulance.GeminiF08Approach2;
import com.focusr.Precot.payload.spulance.GeminiSplF08Response;
import com.focusr.Precot.payload.spulance.SplBaleConsumptionRequest;
import com.focusr.Precot.payload.spulance.SplBaleConsumptionResponse;
import com.focusr.Precot.payload.spulance.SplDailyProdResponse;
import com.focusr.Precot.payload.spulance.SplF08StoppageResponse;
import com.focusr.Precot.payload.spulance.SplJStoppageF08Response1;
import com.focusr.Precot.payload.spulance.SplOrderDetailsResponse;
import com.focusr.Precot.payload.spulance.SplSampleReportResponse;
import com.focusr.Precot.payload.spulance.SplSapResponse1;
import com.focusr.Precot.payload.spulance.SplStoppageWeightResponse;
import com.focusr.Precot.payload.spulance.SpulanceOrderResponse;
import com.focusr.Precot.payload.spulance.StoppageDetailsPayload;
import com.focusr.Precot.payload.spulance.StoppageReportResponse;
import com.focusr.Precot.util.IdAndValuePair;

/**
 * Spulance SAP Datas
 * 
 * @author Jawahar.M
 *
 */

@Service
public class SpulanceSAPService {

	Logger logger = LoggerFactory.getLogger(SpulanceSAPService.class);

	@Autowired
	private DepartmentRepository departmentRepository;
	
	
	@Autowired
	private BMR01RP01ProductionDetailsRepository bmr_01_productiondetailsrepository;

	// GET SPULANCE ORDERS

	public ResponseEntity<?> fetchSpulanceOrders() {

		List<String> orderList = new ArrayList<>();

		List<IdAndValuePair> orderResponseList = new ArrayList<>();

		try {

			orderList = departmentRepository.fetchSpulanceOrder();

			if (orderList.isEmpty() || orderList == null) {

			} else {

				Long id = (long) 1;

				for (String order : orderList) {
					IdAndValuePair values = new IdAndValuePair();
					values.setId(id);
					values.setType(order);
					values.setValue(order);

					orderResponseList.add(values);
					id++;
				}
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Spulance Orders" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Spulance Orders" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(orderResponseList, HttpStatus.OK);

	}
	
	
	// CR GET ORDER
	
	public ResponseEntity<?> getSpulanceOrderbyDate(String date, String shift) {
		 
		List<String> orderList = new ArrayList<>();
 
		List<IdAndValuePair> orderResponseList = new ArrayList<>();
 
		try {
 
			orderList = departmentRepository.getSpulanceOrderByDate(date, shift);
 
			if (orderList.isEmpty() || orderList == null) {
 
			} else {
 
				Long id = (long) 1;
 
				for (String order : orderList) {
					IdAndValuePair values = new IdAndValuePair();
					values.setId(id);
					values.setType(order);
					values.setValue(order);
 
					orderResponseList.add(values);
					id++;
				}
			}
 
		} catch (Exception ex) {
 
			String msg = ex.getMessage();
			logger.error("Unable to get Spulance Orders" + msg);
 
			return new ResponseEntity(new ApiResponse(false, "Failed to get Spulance Orders" + msg),
					HttpStatus.BAD_REQUEST);
		}
 
		return new ResponseEntity(orderResponseList, HttpStatus.OK);
 
	}

		// FETCH ORDER BY DATE
	
	public ResponseEntity<?> fetchSpulanceOrdersByDate(String date, String shift) {

		List<String> orderList = new ArrayList<>();

		List<IdAndValuePair> orderResponseList = new ArrayList<>();

		try {

			orderList = departmentRepository.fetchSpulanceOrderByDate(date, shift);

			if (orderList.isEmpty() || orderList == null) {

			} else {

				Long id = (long) 1;

				for (String order : orderList) {
					IdAndValuePair values = new IdAndValuePair();
					values.setId(id);
					values.setType(order);
					values.setValue(order);

					orderResponseList.add(values);
					id++;
				}
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Spulance Orders" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Spulance Orders" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(orderResponseList, HttpStatus.OK);

	}
	
	
		// GET RGOODS DATA
	
	public ResponseEntity<?> fetchSpulanceGoodsOrdersByDate(String date, String shift) {

		List<String> orderList = new ArrayList<>();

		List<IdAndValuePair> orderResponseList = new ArrayList<>();

		try {

			orderList = departmentRepository.fetchSpulanceGoodsOrderByDate(date, shift);

			if (orderList.isEmpty() || orderList == null) {

			} else {

				Long id = (long) 1;

				for (String order : orderList) {
					IdAndValuePair values = new IdAndValuePair();
					values.setId(id);
					values.setType(order);
					values.setValue(order);

					orderResponseList.add(values);
					id++;
				}
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Spulance Orders" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Spulance Orders" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(orderResponseList, HttpStatus.OK);

	}
	
	
	// GET HEADER DETAILS BY ORDER

	public ResponseEntity<?> getHeaderDetailsByOrder(String order) {

		List<SplOrderDetailsResponse> orderResponse = new ArrayList<>();

		try {

			orderResponse = departmentRepository.orderResponse(order);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Spulance Order Details" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Spulance Order details" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(orderResponse, HttpStatus.OK);
	}

	// FETCH BALE NO FROM ORDER

	public ResponseEntity<?> fetchBaleByOrder(String order, String date, String shift) {

		List<SplBaleConsumptionResponse> orderResponse = new ArrayList<>();

		List<SplBaleConsumptionResponse> orderResponse1 = new ArrayList<>();

		List<BigDecimal> orderList = new ArrayList<>();

		SplBaleConsumptionRequest baleRequest = new SplBaleConsumptionRequest();

		try {

			List<Map<String, Object>> results = departmentRepository.fetchBaleByOrder(order, date, shift);

			for (Map<String, Object> result : results) {
				String baleNo = (String) result.get("BaleNo");
				String netWeight = String.valueOf(result.get("NetWt"));

				SplBaleConsumptionResponse response = new SplBaleConsumptionResponse();
				response.setBaleNo(baleNo);
				response.setNetWeight(netWeight);

				if (baleNo.startsWith("B")) {
					orderList = departmentRepository.fetchBatchByBale(baleNo);
					response.setBatchNo(orderList);
					orderResponse.add(response);
				} else {
					orderResponse1.add(response);
				}

			}

			baleRequest.setApBaleConsumptionResponse(orderResponse);
			baleRequest.setRpBaleConsumption(orderResponse1);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Bale Order Details" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Bale Order details" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(baleRequest, HttpStatus.OK);
	}

	// FETCH BALE NO FROM ORDER

	public ResponseEntity<?> fetchSplBaleByOrder(String order) {

		List<SplBaleConsumptionResponse> orderResponse = new ArrayList<>();

		List<BigDecimal> orderList = new ArrayList<>();

		try {

			List<Map<String, Object>> results = departmentRepository.fetchSplBaleByOrder(order);

			for (Map<String, Object> result : results) {
				String baleNo = (String) result.get("BaleNo");
				String netWeight = String.valueOf(result.get("NetWt"));

				SplBaleConsumptionResponse response = new SplBaleConsumptionResponse();
				response.setBaleNo(baleNo);
				response.setNetWeight(netWeight);

				orderResponse.add(response);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Bale Order Details" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Bale Order details" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(orderResponse, HttpStatus.OK);
	}

	// FETCH SPL DAILY PRODUCTION DETAILS

	public ResponseEntity<?> fetchProductionDetailsSpl(String order, String date, String shift) {

		List<SplDailyProdResponse> orderResponse = new ArrayList<>();

		try {

			orderResponse = departmentRepository.fetchProductionDetails(order, date, shift);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Spulance Order Details" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Spulance Order details" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(orderResponse, HttpStatus.OK);
	}

	// FETCH SPL DAILY REJECTION DETAILS

	public ResponseEntity<?> fetchRejectionDetailsSpl(String date, String shift, String order) {

		List<SplDailyProdResponse> orderResponse = new ArrayList<>();

		try {

			orderResponse = departmentRepository.fetchRejectionDetails(date, shift, order);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Spulance Order Details" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Spulance Order details" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(orderResponse, HttpStatus.OK);
	}

	// FETCH STOPPAGE

	public ResponseEntity<?> fetchStoppageDetails(String date) {

		List<Object[]> stoppageResponse = new ArrayList<>();
		List<Object[]> weightResponse = new ArrayList<>();

		try {

			stoppageResponse = departmentRepository.stoppageResponse(date);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Stoppage Order Details" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Stoppage Order details" + msg),
					HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(stoppageResponse, HttpStatus.OK);

	}

	public List<SpulanceOrderResponse> getMaxNetWeightOrder(String date) {
		List<Object[]> orders = departmentRepository.stoppageResponse(date);

//        return orders.stream()
//                .flatMap(order -> Stream.of((String) order[0], (String) order[1], (String) order[2]))
//                .distinct()
//                .map(order -> {
//                    List<Object[]> netWeightAndBrand = departmentRepository.weightStoppage(order);
//                    if (!netWeightAndBrand.isEmpty()) {
//                        Object[] details = netWeightAndBrand.get(0);
//                        return new SpulanceOrderResponse(order, (BigDecimal) details[0], (String) details[1]);
//                    }
//                    return null;
//                })
//                .filter(orderDetailsResponse -> orderDetailsResponse != null)
//                .max(Comparator.comparing(SpulanceOrderResponse::getNetWeight));

		return orders.stream().flatMap(order -> Stream.of((String) order[0], (String) order[1], (String) order[2]))
				.distinct().map(order -> {
					List<Object[]> netWeightAndBrand = departmentRepository.weightStoppage(order);
					if (!netWeightAndBrand.isEmpty()) {
						Object[] details = netWeightAndBrand.get(0);
						return new SpulanceOrderResponse(order, (BigDecimal) details[0], (String) details[1]);
					}
					return null;
				}).filter(Objects::nonNull).collect(Collectors.toList());

	}

	// FETCH SPL WEIGHT

//	public ResponseEntity<?> fetchSplWeight(String date) {
//		
//		List<Object[]> weightStoppageList = new ArrayList<>();
//		
//		List<SplStoppageWeightResponse> weightResponseList = new ArrayList<>();
//		
//		try {
//			
//			weightStoppageList = departmentRepository.getStoppageDetails(date);
//			
//			for(Object[] row : weightStoppageList) {
//				
//				SplStoppageWeightResponse response = new SplStoppageWeightResponse(
//						(String) row[0], // sCause
//		                (String) row[1], // sCode
//		                (String) row[2], // stoppageCategory
//		                (BigDecimal) row[3], // totalHours
//		                (Integer) row[4] // stoppageCount
//		                		);
//				
//				weightResponseList.add(response);
//				
//				
//			}
//			
//		}
//		catch(Exception ex) {
//
//			
//			String msg = ex.getMessage();
//			logger.error("Unable to get Stoppage Order Details" + msg);
//
//			return new ResponseEntity(
//					new ApiResponse(false, "Failed to get Stoppage Order details" + msg),
//					HttpStatus.BAD_REQUEST);
//			
//		
//		}
//		
//		return new ResponseEntity(weightResponseList, HttpStatus.OK);
//	}

	// FETCH STOPPAGE 1 RESPONSE

//	public ResponseEntity<?> fetchStoppage1Response(String date) {
//		
//		List<SpulanceOrderResponse> stoppageResponseList = new ArrayList<>();
//		
//		List<Object[]> stoppageResp = new ArrayList<>();
//		
//		List<Object[]> breakdownResponse = new ArrayList<>();
//		
//		List<SplStoppageWeightResponse> weightResponseList = new ArrayList<>();
//		
//		SplSapResponse1 sapResponse = new SplSapResponse1();
//		
//		String brand = "";
//		BigDecimal weight = BigDecimal.ZERO;
//		String orderNo = "";
//		
//		try {
//			
//			stoppageResp = departmentRepository.fetchStoppageDetails(date);
//			
//			for(Object[] row : stoppageResp) {
//				
//				SpulanceOrderResponse response = new SpulanceOrderResponse(
//						(String) row[0],
//						(BigDecimal) row[1],
//						 (String) row[2]
//		                		);
//				
//				stoppageResponseList.add(response);
//				
//				brand = (String) row[0];
//				orderNo = (String) row[2];
//				weight = (BigDecimal) row[1];
//				
//			}
//			
//			System.out.println("Order" + brand);
//			;
//			
//			breakdownResponse = departmentRepository.getStoppageDetails(date);
//			
//			for(Object[] row : breakdownResponse) {
////				
//				SplStoppageWeightResponse response = new SplStoppageWeightResponse(
//						(String) row[0], // sCause
//		                (String) row[1], // sCode
//		                (String) row[2], // stoppageCategory
//		                (BigDecimal) row[3], // totalHours
//		                (Integer) row[4] // stoppageCount
//		                		);
//				
//				weightResponseList.add(response);	
//			}
//			
//			sapResponse.setBrand(brand);
//			sapResponse.setWeight(weight);
//			sapResponse.setResponse(weightResponseList);
//
//		} catch(Exception ex) {
//
//			
//			String msg = ex.getMessage();
//			logger.error("Unable to get Stoppage Order Details" + msg);
//
//			return new ResponseEntity(
//					new ApiResponse(false, "Failed to get Stoppage Order details" + msg),
//					HttpStatus.BAD_REQUEST);
//			
//		
//		}
//		
//		return new ResponseEntity(sapResponse, HttpStatus.OK);
//		
//	}

//	public ResponseEntity<?> fetchStoppage1Response(String date) {
//
//		List<SpulanceOrderResponse> stoppageResponseList = new ArrayList<>();
//
//		List<Object[]> stoppageResp = new ArrayList<>();
//
//		SpulanceOrderResponse stoppageObjectResponse = new SpulanceOrderResponse();
//
//		List<Object[]> breakdownResponse = new ArrayList<>();
//
////		List<SplStoppageWeightResponse> weightResponseList = new ArrayList<>();
//
//		Map<String, List<SplStoppageWeightResponse>> categorizedResponses = new HashMap<>();
//		List<Map<String, List<SplStoppageWeightResponse>>> responseList = new ArrayList<>();
//
//		SplSapResponse1 sapResponse = new SplSapResponse1();
//
//		String brand = "";
//		BigDecimal weight = BigDecimal.ZERO;
//		String orderNo = "";
//
//		try {
//
//			stoppageResp = departmentRepository.fetchStoppageDetails(date);
////			
//			for (Object[] row : stoppageResp) {
//
//				SpulanceOrderResponse response = new SpulanceOrderResponse((String) row[0], (BigDecimal) row[1],
//						(String) row[2]);
//
//				stoppageResponseList.add(response);
//
//				brand = (String) row[2];
//				orderNo = (String) row[0];
//				weight = (BigDecimal) row[1];
//
////				brand = row.getBrand();
////				weight = row.getNetWeight();
////				orderNo = row.getOrder();
////				
////				System.out.println("Rw" + row);
////				
////				stoppageResponseList.add(row);
//
//			}
//
////			stoppageObjectResponse = departmentRepository.fetchStoppageDetails1(date);
////			
////			brand = stoppageObjectResponse.getBrand();
////			orderNo = stoppageObjectResponse.getOrder();
////			weight = stoppageObjectResponse.getNetWeight();
//
//			System.out.println("Order" + brand);
//			;
//
//			breakdownResponse = departmentRepository.getStoppageDetails(date);
//
//			for (Object[] row : breakdownResponse) {
//				SplStoppageWeightResponse response = new SplStoppageWeightResponse((String) row[0], // sCause
//						(String) row[1], // sCode
//						(String) row[2], // stoppageCategory
//						(BigDecimal) row[3], // totalHours
//						(Integer) row[4] // stoppageCount
//				);
//
//				categorizedResponses.computeIfAbsent(response.getStoppageCategory(), k -> new ArrayList<>())
//						.add(response);
//			}
//
//			responseList.add(categorizedResponses);
//
//			sapResponse.setBrand(brand);
//			sapResponse.setWeight(weight);
//			sapResponse.setOrder(orderNo);
//			sapResponse.setResponse(responseList);
//
//		} catch (Exception ex) {
//
//			String msg = ex.getMessage();
//			logger.error("Unable to get Stoppage Order Details" + msg);
//
//			return new ResponseEntity(new ApiResponse(false, "Failed to get Stoppage Order details" + msg),
//					HttpStatus.BAD_REQUEST);
//
//		}
//
//		return new ResponseEntity(sapResponse, HttpStatus.OK);
//
//	}

//	public ResponseEntity<?> fetchStoppage1Response(String date) {
//
//		List<SplSapResponse1> result = new ArrayList<>();
//
//		List<SpulanceOrderResponse> stoppageResponseList = new ArrayList<>();
//
//		List<Object[]> stoppageResp = new ArrayList<>();
//
////		cxv5SpulanceOrderResponse stoppageObjectResponse = new SpulanceOrderResponse();
//
////		List<SplStoppageWeightResponse> weightResponseList = new ArrayList<>();
//
//		Map<String, List<SplStoppageWeightResponse>> categorizedResponses = new HashMap<>();
//		List<Map<String, List<SplStoppageWeightResponse>>> responseList = new ArrayList<>();
//
//		String brand = "";
//		BigDecimal weight = BigDecimal.ZERO;
//		String orderNo = "";
//
//		try {
//
//			stoppageResp = departmentRepository.fetchStoppageDetails(date);
////			
//			for (Object[] row : stoppageResp) {
//
//				SplSapResponse1 sapResponse = new SplSapResponse1();
//
//				SpulanceOrderResponse response = new SpulanceOrderResponse((String) row[0], (BigDecimal) row[1],
//						(String) row[2]);
//
//				stoppageResponseList.add(response);
//
//				brand = (String) row[2];
//				orderNo = (String) row[0];
//				weight = (BigDecimal) row[1];
//
//				System.out.println("Order" + brand);
//
//				List<Object[]> breakdownResponse = departmentRepository.getStoppageDetails(date);
//
//				for (Object[] row1 : breakdownResponse) {
//					SplStoppageWeightResponse response1 = new SplStoppageWeightResponse((String) row1[0], // sCause
//							(String) row1[1], // sCode
//							(String) row1[2], // stoppageCategory
//							(BigDecimal) row1[3], // totalHours
//							(Integer) row1[4] // stoppageCount
//					);
//
//					categorizedResponses.computeIfAbsent(response1.getStoppageCategory(), k -> new ArrayList<>())
//							.add(response1);
//				}
//
//				responseList.add(categorizedResponses);
//
//				sapResponse.setBrand(brand);
//				sapResponse.setWeight(weight);
//				sapResponse.setOrder(orderNo);
//				sapResponse.setResponse(responseList);
//
//				result.add(sapResponse);
//
//			}
//
//		} catch (Exception ex) {
//
//			String msg = ex.getMessage();
//			logger.error("Unable to get Stoppage Order Details" + msg);
//
//			return new ResponseEntity(new ApiResponse(false, "Failed to get Stoppage Order details" + msg),
//					HttpStatus.BAD_REQUEST);
//
//		}
//
//		return new ResponseEntity(result, HttpStatus.OK);
//
//	}
	// k
	public ResponseEntity<?> fetchStoppage1Response(String date) {
		List<SplSapResponse1> result = new ArrayList<>();
		List<Object[]> stoppageResp;

		try {
			// Fetch main stoppage response
			stoppageResp = departmentRepository.fetchStoppageDetails1(date);

//			for (Object[] row : stoppageResp) {
//				SplSapResponse1 sapResponse = new SplSapResponse1();
//				sapResponse.setOrder((String) row[0]);
//				sapResponse.setWeight((BigDecimal) row[1]);
//				sapResponse.setBrand((String) row[2]);
//				sapResponse.setShiftId((BigDecimal) row[3]);
//
//				// Fetch breakdown response for the given date
//				List<Object[]> breakdownResponse = departmentRepository.getStoppageDetails(date);
//
//				Map<String, List<SplStoppageWeightResponse>> categorizedResponses = new HashMap<>();
//
//				for (Object[] row1 : breakdownResponse) {
//					SplStoppageWeightResponse response1 = new SplStoppageWeightResponse((String) row1[0], // sCause
//							(String) row1[1], // sCode
//							(String) row1[2], // stoppageCategory
//							(BigDecimal) row1[3], // totalHours
//							(Integer) row1[4] // stoppageCount
//					);
//
//					categorizedResponses.computeIfAbsent(response1.getStoppageCategory(), k -> new ArrayList<>())
//							.add(response1);
//				}
//
//				// Combine all categorized responses into a single list
//				List<SplStoppageWeightResponse> combinedResponseList = new ArrayList<>();
//				for (List<SplStoppageWeightResponse> responses : categorizedResponses.values()) {
//					combinedResponseList.addAll(responses);
//				}
//
//				sapResponse.setResponse(categorizedResponses);
//
//				result.add(sapResponse);
//			}
		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to get Stoppage Order Details: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to get Stoppage Order details: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	
		// CR - Sign-off
	

//	public ResponseEntity<?> fetchStoppage1Response1(String date) {
//	    Map<String, SplSapResponse1> uniqueOrders = new HashMap<>();
//	    Map<String, List<SplStoppageWeightResponse>> stoppageMap = new HashMap<>();
//	    List<Object[]> stoppageResp;
//
//	    try {
//	        // Fetch main stoppage response
//	        stoppageResp = departmentRepository.fetchStoppageDetails1(date);
//
//	        
//	        
////	        for (Object[] row : stoppageResp) {
////	            // Assuming order and brand are BigDecimal and need to be converted to String
////	            String order = row[0] != null ? row[0].toString() : ""; // Convert BigDecimal to String
////	            BigDecimal weight = (BigDecimal) row[1];
////	            String brand = row[2] != null ? row[2].toString() : "";  // Convert BigDecimal to String
////	            BigDecimal shiftId = (BigDecimal) row[3];
////
////	            // Check if the order already exists
////	            SplSapResponse1 sapResponse = uniqueOrders.getOrDefault(order, new SplSapResponse1());
////	            sapResponse.setOrder(order);
////	            sapResponse.setBrand(brand);
////	            sapResponse.setShiftId(shiftId);
////
////	            // Accumulate weight
////	            BigDecimal currentWeight = sapResponse.getWeight() == null ? BigDecimal.ZERO : sapResponse.getWeight();
////	            sapResponse.setWeight(currentWeight.add(weight));
////
////	            uniqueOrders.put(order, sapResponse);
////	            
//////	            String fromTime = departmentRepository.getFromTimeForOrder(order, date);
//////	            String toTime = departmentRepository.getToTimeForOrder(order, date);
//////	            
//////	            System.out.println("From Time" + fromTime);
////	            
//////	            List<Object[]> breakdownResponse = departmentRepository.getStoppageDetails(date);
//////	            
//////	            for (Object[] row1 : breakdownResponse) {
//////		            // Ensure stoppageCategory, scause, and scode are Strings
//////		            String scause = row1[0] != null ? row1[0].toString() : ""; // SCause
//////		            String scode = row1[1] != null ? row1[1].toString() : "";  // SCode
//////		            String stoppageCategory = row1[2] != null ? row1[2].toString() : ""; // StoppageCategory
//////
//////		            // Initialize totalHours to zero
//////		            BigDecimal totalHours = BigDecimal.ZERO;
//////
//////		            try {
//////		                totalHours = row1[3] != null ? new BigDecimal(row1[3].toString()) : BigDecimal.ZERO;
//////
//////		                Integer stoppageCount = 0;
//////		                try {
//////		                    stoppageCount = row1[4] != null ? ((Number) row1[4]).intValue() : 0;
//////		                } catch (ClassCastException e) {
//////		                    logger.error("Invalid stoppageCount value for row: " + Arrays.toString(row1), e);
//////		                }
//////
//////		                // Only include scode in key if it matches the specified set
//////		                String stoppageKey;
//////		                List<String> validSCodes = Arrays.asList("LC", "SCL", "CL", "MI", "ER", "MR");
//////		                if (validSCodes.contains(scode)) {
//////		                    stoppageKey = scode;
//////		                } else {
//////		                    stoppageKey = "Others";
//////		                }
//////
//////		                // Check if the stoppage entry already exists
//////		                SplStoppageWeightResponse stoppageResponse = stoppageMap
//////		                    .computeIfAbsent(stoppageKey, k -> new ArrayList<>())
//////		                    .stream()
//////		                    .filter(s -> s.getStoppageCategory().equals(stoppageCategory) && s.getSCause().equals(scause) && s.getSCode().equals(scode))
//////		                    .findFirst()
//////		                    .orElseGet(() -> {
//////		                        SplStoppageWeightResponse newResponse = new SplStoppageWeightResponse(stoppageCategory, scause, scode, BigDecimal.ZERO, 0);
//////		                        stoppageMap.get(stoppageKey).add(newResponse);
//////		                        return newResponse;
//////		                    });
//////
//////		                // Accumulate the total hours and stoppage count
//////		                stoppageResponse.setTotalHours(stoppageResponse.getTotalHours().add(totalHours));
//////		                stoppageResponse.setStoppageCount(stoppageResponse.getStoppageCount() + stoppageCount);
////
//////		            } catch (Exception e) {
//////		                logger.error("Error processing row: " + Arrays.toString(row1), e);
//////		                continue;  // Skip this row and process the next one
//////		            }
//////		        }
////	            
////	        }
//
//	     // Fetch breakdown response and categorize
//	        // Fetch breakdown response and categorize
//	        
//
////	        for (Object[] row1 : breakdownResponse) {
////	            // Ensure stoppageCategory, scause, and scode are Strings
////	        	String scause = row1[0] != null ? row1[0].toString() : ""; // SCause
////	            String scode = row1[1] != null ? row1[1].toString() : "";  // SCode
////	            String stoppageCategory = row1[2] != null ? row1[2].toString() : ""; // StoppageCategory
////
////	            // Initialize totalHours to zero
////	            BigDecimal totalHours = BigDecimal.ZERO;
////
////	            try {
////	                // Raw value for totalHours from row1[5]
////	                
////	            	totalHours = row1[3] != null ? new BigDecimal(row1[3].toString()) : BigDecimal.ZERO;
////	            	
////
////	                // If totalHours is valid, continue processing this row
////	                Integer stoppageCount = 0;
////	                
////	                try {
////	                    stoppageCount = row1[4] != null ? ((Number) row1[4]).intValue() : 0;
////	                } catch (ClassCastException e) {
////	                    logger.error("Invalid stoppageCount value for row: " + Arrays.toString(row1), e);
////	                }
////
////	                // Create a unique key based on stoppageCategory, scause, and scode
////	                String stoppageKey = stoppageCategory + "_" + scause + "_" + scode;
////
////	                // Check if the stoppage entry already exists
////	                SplStoppageWeightResponse stoppageResponse = stoppageMap
////	                    .computeIfAbsent(stoppageKey, k -> new ArrayList<>())
////	                    .stream()
////	                    .filter(s -> s.getStoppageCategory().equals(stoppageCategory) && s.getSCause().equals(scause) && s.getSCode().equals(scode))
////	                    .findFirst()
////	                    .orElseGet(() -> {
////	                        SplStoppageWeightResponse newResponse = new SplStoppageWeightResponse(stoppageCategory, scause, scode, BigDecimal.ZERO, 0);
////	                        stoppageMap.get(stoppageKey).add(newResponse);
////	                        return newResponse;
////	                    });
////
////	                // Accumulate the total hours and stoppage count
////	                stoppageResponse.setTotalHours(stoppageResponse.getTotalHours().add(totalHours));
////	                stoppageResponse.setStoppageCount(stoppageResponse.getStoppageCount() + stoppageCount);
////
////	            } catch (Exception e) {
////	                logger.error("Error processing row: " + Arrays.toString(row1), e);
////	                continue;  // Skip this row and process the next one
////	            }
////	        }
//	        
////	        List<Object[]> breakdownResponse = departmentRepository.getStoppageDetails(date);
////	        for (Object[] row1 : breakdownResponse) {
////	            // Ensure stoppageCategory, scause, and scode are Strings
////	            String scause = row1[0] != null ? row1[0].toString() : ""; // SCause
////	            String scode = row1[1] != null ? row1[1].toString() : "";  // SCode
////	            String stoppageCategory = row1[2] != null ? row1[2].toString() : ""; // StoppageCategory
////
////	            // Initialize totalHours to zero
////	            BigDecimal totalHours = BigDecimal.ZERO;
////
////	            try {
////	                totalHours = row1[3] != null ? new BigDecimal(row1[3].toString()) : BigDecimal.ZERO;
////
////	                Integer stoppageCount = 0;
////	                try {
////	                    stoppageCount = row1[4] != null ? ((Number) row1[4]).intValue() : 0;
////	                } catch (ClassCastException e) {
////	                    logger.error("Invalid stoppageCount value for row: " + Arrays.toString(row1), e);
////	                }
////
////	                // Only include scode in key if it matches the specified set
////	                String stoppageKey;
////	                List<String> validSCodes = Arrays.asList("LC", "SCL", "CL", "MI", "ER", "MR");
////	                if (validSCodes.contains(scode)) {
////	                    stoppageKey = scode;
////	                } else {
////	                    stoppageKey = "Others";
////	                }
////
////	                // Check if the stoppage entry already exists
////	                SplStoppageWeightResponse stoppageResponse = stoppageMap
////	                    .computeIfAbsent(stoppageKey, k -> new ArrayList<>())
////	                    .stream()
////	                    .filter(s -> s.getStoppageCategory().equals(stoppageCategory) && s.getSCause().equals(scause) && s.getSCode().equals(scode))
////	                    .findFirst()
////	                    .orElseGet(() -> {
////	                        SplStoppageWeightResponse newResponse = new SplStoppageWeightResponse(stoppageCategory, scause, scode, BigDecimal.ZERO, 0);
////	                        stoppageMap.get(stoppageKey).add(newResponse);
////	                        return newResponse;
////	                    });
////
////	                // Accumulate the total hours and stoppage count
////	                stoppageResponse.setTotalHours(stoppageResponse.getTotalHours().add(totalHours));
////	                stoppageResponse.setStoppageCount(stoppageResponse.getStoppageCount() + stoppageCount);
////
////	            } catch (Exception e) {
////	                logger.error("Error processing row: " + Arrays.toString(row1), e);
////	                continue;  // Skip this row and process the next one
////	            }
////	        }
////
////	        
////
////	        // Set the response in the `SplSapResponse1` object
////	        for (SplSapResponse1 response : uniqueOrders.values()) {
////	            // Instead of a List, set the Map of stoppage data
////	            response.setResponse(stoppageMap);
////	        }
//
//	        } catch (Exception ex) {
//	            String msg = ex.getMessage();
//	            logger.error("Unable to get Stoppage Order Details: " + msg);
//	            return new ResponseEntity<>(new ApiResponse(false, "Failed to get Stoppage Order details: " + msg),
//	                    HttpStatus.BAD_REQUEST);
//	        }
//
////	        return new ResponseEntity<>(stoppageResp, HttpStatus.OK);
//	        return new ResponseEntity<>(stoppageResp, HttpStatus.OK);
//	}
	
	
	public ResponseEntity<?> fetchStoppage1Response1(String date) {
	    try {
	        // Fetch main stoppage response
	        List<Object[]> stoppageResp = departmentRepository.fetchStoppageDetails1(date);

	        // Map the query result to the payload
	        List<StoppageDetailsPayload> payload = stoppageResp.stream().map(result -> new StoppageDetailsPayload(
	            result[0] != null ? result[0].toString() : null,  // pOrder (String)
	            result[1] != null ? new BigDecimal(result[1].toString()) : null, // maxRNwt (BigDecimal)
	            result[2] != null ? result[2].toString() : null,  // brand (String)
	            result[3] != null ? result[3].toString() : null,  // shiftId (String)
	            result[4] != null ? new BigDecimal(result[4].toString()) : null, // lcTotalHours (BigDecimal)
	            result[5] != null ? new BigDecimal(result[5].toString()) : null, // sclTotalHours (BigDecimal)
	            result[6] != null ? new BigDecimal(result[6].toString()) : null, // clTotalHours (BigDecimal)
	            result[7] != null ? new BigDecimal(result[7].toString()) : null, // miTotalHours (BigDecimal)
	            result[8] != null ? new BigDecimal(result[8].toString()) : null, // erTotalHours (BigDecimal)
	            result[9] != null ? new BigDecimal(result[9].toString()) : null, // mrTotalHours (BigDecimal)
	            result[10] != null ? new BigDecimal(result[10].toString()) : null, // othersTotalHours (BigDecimal)
	            result[11] != null ? ((Number) result[11]).intValue() : null, // lcCount (Integer)
	            result[12] != null ? ((Number) result[12]).intValue() : null, // sclCount (Integer)
	            result[13] != null ? ((Number) result[13]).intValue() : null, // clCount (Integer)
	            result[14] != null ? ((Number) result[14]).intValue() : null, // miCount (Integer)
	            result[15] != null ? ((Number) result[15]).intValue() : null, // erCount (Integer)
	            result[16] != null ? ((Number) result[16]).intValue() : null, // mrCount (Integer)
	            result[17] != null ? ((Number) result[17]).intValue() : null  // othersCount (Integer)
	        )).collect(Collectors.toList());

	        // Return the payload wrapped in a ResponseEntity
	        return ResponseEntity.ok(payload);
	    } catch (Exception ex) {
	        String msg = ex.getMessage();
	        logger.error("Unable to get Stoppage Order Details: " + msg);
	        return ResponseEntity
	            .status(HttpStatus.BAD_REQUEST)
	            .body(new ApiResponse(false, "Failed to get Stoppage Order details: " + msg));
	    }
	}



	

	public ResponseEntity<?> fetchSampleReportOrders1() {

		List<String> orderList = new ArrayList<>();

		List<LovResponse> orderResponseList = new ArrayList<>();

		String question = "";

		try {

			orderList = departmentRepository.fetchSampleReportOrder();

			if (orderList.isEmpty() || orderList == null) {

			} else {

				Long id = (long) 1;

				for (String order : orderList) {
					LovResponse values = new LovResponse();
					values.setId(id);
					values.setValue(order);

					question = departmentRepository.fetchQuestionByorder(order);

					values.setDescription(question);

					orderResponseList.add(values);
					id++;
				}
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Sample Report Orders" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Sample Report Orders" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(orderResponseList, HttpStatus.OK);

	}
	
	    

	public ResponseEntity<?> fetchSampleReportOrders() {

		List<String> orderList = new ArrayList<>();

		List<LovResponse> orderResponseList = new ArrayList<>();

		String question = "";

		try {

			orderList = departmentRepository.fetchSampleReportOrder();

			if (orderList.isEmpty() || orderList == null) {

			} else {

				Long id = (long) 1;

				for (String order : orderList) {
					LovResponse values = new LovResponse();
					values.setId(id);
					values.setValue(order);

					question = departmentRepository.fetchQuestionByorder(order);

					values.setDescription(question);

					orderResponseList.add(values);
					id++;
				}
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Sample Report Orders" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Sample Report Orders" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(orderResponseList, HttpStatus.OK);

	}

	public ResponseEntity<?> fetchSampleReportOrders(String date, String shift, String order) {

		List<SplSampleReportResponse> responseList = new ArrayList<>();

		try {

			responseList = departmentRepository.sampleReportByDateOrder(date, shift, order);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Sample Report Orders" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Sample Report Orders" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(responseList, HttpStatus.OK);
	}

	public ResponseEntity<?> processSetupWinder() {

		List<String> orderList = new ArrayList<>();

		List<IdAndValuePair> orderResponseList = new ArrayList<>();

		try {

			orderList = departmentRepository.fetchProcessOrders();

			if (orderList.isEmpty() || orderList == null) {

			} else {

				Long id = (long) 1;

				for (String order : orderList) {
					IdAndValuePair values = new IdAndValuePair();
					values.setId(id);
					values.setType(order);
					values.setValue(order);

					orderResponseList.add(values);
					id++;
				}
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Spulance Orders" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Spulance Orders" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(orderResponseList, HttpStatus.OK);

	}

	
	public ResponseEntity<?> processSetupWinderByDate(String date, String shift) {

		List<String> orderList = new ArrayList<>();

		List<IdAndValuePair> orderResponseList = new ArrayList<>();

		try {

			orderList = departmentRepository.fetchProcessOrderBydate(date, shift);

			if (orderList.isEmpty() || orderList == null) {

			} else {

				Long id = (long) 1;

				for (String order : orderList) {
					IdAndValuePair values = new IdAndValuePair();
					values.setId(id);
					values.setType(order);
					values.setValue(order);

					orderResponseList.add(values);
					id++;
				}
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Spulance Orders" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Spulance Orders" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(orderResponseList, HttpStatus.OK);

	}
	
	
		// SLITER WINDER
	
	
	public ResponseEntity<?> processSliterWinderByDate(String date, String shift) {

		List<String> orderList = new ArrayList<>();

		List<IdAndValuePair> orderResponseList = new ArrayList<>();

		try {

			orderList = departmentRepository.fetchProcessOrderBydateSliterWinder(date, shift);

			if (orderList.isEmpty() || orderList == null) {

			} else {

				Long id = (long) 1;

				for (String order : orderList) {
					IdAndValuePair values = new IdAndValuePair();
					values.setId(id);
					values.setType(order);
					values.setValue(order);

					orderResponseList.add(values);
					id++;
				}
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Spulance Orders" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Spulance Orders" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(orderResponseList, HttpStatus.OK);

	}
	
	
	
	public ResponseEntity<?> fetchBaleWeightByOrderDateShift(String order, String date, String shift) {
		List<Map<String, String>> baleWeightResponse = new ArrayList<>();
		try {
			baleWeightResponse = departmentRepository.fetchBaleWeightByOrderDateShift(order, date, shift);
		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Bale Weight" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Bale & Weight for order : " + order + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(baleWeightResponse, HttpStatus.OK);
	}

	// K
	// SHIFT WISE DAILY SLITER WINDER PRODUCTION REPORT F017
	/*
	 * public ResponseEntity<?> getDailySliterWinderProductionByOrder(String order)
	 * { List<Object[]> sliterwinderResponse = new ArrayList<>(); try {
	 * sliterwinderResponse =
	 * departmentRepository.getDailySliterWinderProductionByOrderNo(order); } catch
	 * (Exception ex) {
	 * 
	 * String msg = ex.getMessage();
	 * logger.error("Unable to get Sliter Winder Production Details" + msg);
	 * 
	 * return new ResponseEntity(new ApiResponse(false,
	 * "Failed to get Unable to get Sliter Winder Production Details : " + order +
	 * msg), HttpStatus.BAD_REQUEST); } return new
	 * ResponseEntity(sliterwinderResponse, HttpStatus.OK); }
	 */

	public ResponseEntity<?> getDailySliterWinderProductionByOrder(String order) {
		List<Object[]> sliterwinderResponse = new ArrayList<>();
		List<Map<String, Object>> responseList = new ArrayList<>();
		String[] headers = { "cid", "CMon", "POrder", "Material", "Qty", "Mix", "MixDesc", "Finish", "FinishDesc",
				"width", "gsm", "pattern", "PatternDesc", "SaleOrder", "SOItem", "PONo", "Article", "OrderNo", "MLen",
				"RollDia", "Brand", "Sts", "CustomerPO" };

		try {
			sliterwinderResponse = departmentRepository.getDailySliterWinderProductionByOrderNo(order);

			// Convert each Object[] to a Map<String, Object> using specified headers
			for (Object[] row : sliterwinderResponse) {
				Map<String, Object> map = new HashMap<>();
				for (int i = 0; i < headers.length; i++) {
					map.put(headers[i], row[i]);
				}
				responseList.add(map);
			}
		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to get Sliter Winder Production Details: " + msg);
			return new ResponseEntity<>(
					new ApiResponse(false,
							"Failed to get Sliter Winder Production Details for order: " + order + ". " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}

	public ResponseEntity<?> getRoleGoodsInfo(String order, String date, String shift) {
		List<Object[]> sliterwinderResponse = new ArrayList<>();
		List<Object[]> sliterwinderResponseLeft = new ArrayList<>();
		List<Map<String, Object>> responseList = new ArrayList<>();
		List<Map<String, Object>> responseListLeft = new ArrayList<>();
		Map<String, Object> responsePayload = new HashMap<>();

		String[] headers = { "BaleNo", "ShaftID", "PackDt", "ShiftID", "BalTyp", "POrder", "GrsWt", "PWid", "PLen",
				"BaleCount" };

//	    String[] leftHeaders = {
//	        "BaleCount", "TotalShaftID", "TotalGrsWt", "TotalPWid", "TotalPLen"
//	    };

		String[] leftHeaders = { "BaleCount", "TotalGrsWt", "TotalTWid", "TotalPLen" };

		try {
			sliterwinderResponse = departmentRepository.roleGoodsInformationbyOrderDateShiftright(order, date, shift);
			sliterwinderResponseLeft = departmentRepository.roleGoodsInformationbyOrderDateShiftLeft(order, date,
					shift);

			// Convert each Object[] to a Map<String, Object> using specified headers for
			// sliterwinderResponse
			for (Object[] row : sliterwinderResponse) {

				System.out.println("Row" + row);

				Map<String, Object> map = new HashMap<>();
				for (int i = 0; i < headers.length; i++) {
					map.put(headers[i], row[i]);
				}
				responseList.add(map);
			}

			// Convert each Object[] to a Map<String, Object> using specified headers for
			// sliterwinderResponseLeft
			for (Object[] row : sliterwinderResponseLeft) {
				Map<String, Object> map = new HashMap<>();
				for (int i = 0; i < leftHeaders.length; i++) {
					map.put(leftHeaders[i], row[i]);
				}
				responseListLeft.add(map);
			}

			responsePayload.put("sliterWinder", responseList);
			responsePayload.put("sliterWinderLeft", responseListLeft);

		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to get Role Goods Information: " + msg);
			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to get Role Goods Information for order: " + order + ". " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(responsePayload, HttpStatus.OK);
	}

//F15
	public ResponseEntity<?> getAggregatedResults(String date) {
		List<Object[]> queryResult = new ArrayList<>();
		List<Map<String, Object>> responseList = new ArrayList<>();
		String[] headers = { "ShiftID", "POrder", "TotalNetWeight", "BaleCount", "CG_Hours", "MI_Hours", "MR_Hours",
				"ER_Hours", "Others_Hours", "Total_Hours" };

		try {
			queryResult = departmentRepository.getAggregatedResultsByDate(date);

			for (Object[] row : queryResult) {
				Map<String, Object> map = new HashMap<>();
				for (int i = 0; i < headers.length; i++) {
					map.put(headers[i], row[i]);
				}
				responseList.add(map);
			}
		} catch (Exception ex) {
			String msg = ex.getMessage();
			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to get aggregated results for date: " + date + ". " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}

	// F11
	public ResponseEntity<?> getOrderDetails(String fromOrderNo, String toOrderNo, String baleNo) {
		List<Object[]> queryResult = new ArrayList<>();
		List<Map<String, Object>> responseList = new ArrayList<>();
		String[] headers = { "MixingFrom", "POrder", "ProductName", "MixingTo", "ShaftNo", "RollNumber", "PLen", "PWid",
				"RNWt", "PGSM", "Moisture", "RDia", "PatternDesc", "NoOfRollsCrossWidth" };

		try {
			queryResult = departmentRepository.getOrderDetails(fromOrderNo, toOrderNo, baleNo);

			for (Object[] row : queryResult) {
				Map<String, Object> map = new HashMap<>();
				for (int i = 0; i < headers.length; i++) {
					map.put(headers[i], row[i]);
				}
				responseList.add(map);
			}
		} catch (Exception ex) {
			String msg = ex.getMessage();
			return new ResponseEntity<>(new ApiResponse(false, "Failed to get order details. " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}

	// get Baleno LOV
	public ResponseEntity<?> getBaleLov(String order) {
		List<String> queryResult = new ArrayList<>();
		List<Map<String, String>> responseList = new ArrayList<>();

		try {
			queryResult = departmentRepository.baleLovByOrderNo(order);

			for (String rollNumber : queryResult) {
				Map<String, String> map = new HashMap<>();
				map.put("RollNumber", rollNumber);
				responseList.add(map);
			}
		} catch (Exception ex) {
			String msg = ex.getMessage();
			return new ResponseEntity<>(new ApiResponse(false, "Failed to get Roll Numbers. " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}

//	// F18 - M
//	public ResponseEntity<?> getStoppageDetailsF18(String date) {
//		List<Object[]> queryResult;
//		List<Map<String, Object>> responseList = new ArrayList<>();
//		String[] headers = { "ShiftID", "ProductName", "OrderNo", "ProdInKg", "LC", "MR", "ER", "GR", "Other",
//				"TotalDowntime", "TotalBreakdown", "TotalTimeInMin" };
//
//		try {
//			queryResult = departmentRepository.getStoppageDetailsF18(date);
//
//			for (Object[] row : queryResult) {
//				Map<String, Object> map = new HashMap<>();
//				for (int i = 0; i < headers.length; i++) {
//					map.put(headers[i], row[i]);
//				}
//				responseList.add(map);
//			}
//		} catch (Exception ex) {
//			String msg = ex.getMessage();
//			return new ResponseEntity<>(
//					new ApiResponse(false, "Failed to get stoppage details for date: " + date + ". " + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//		return new ResponseEntity<>(responseList, HttpStatus.OK);
//	}
	
	// F18 
	public ResponseEntity<?> getStoppageDetailsF18(String date) {
		
		List<Object[]> queryResult;
		
		List<Map<String, Object>> responseList = new ArrayList<>();
		
//		String[] headers = { "ShiftID", "ProductName", "OrderNo", "ProdInKg", "LC", "MR", "ER", "GR", "Other",
//				"TotalDowntime", "TotalBreakdown", "TotalTimeInMin" };
		
		String[] headers = {
			    "OrderNo",         // R.POrder
			    "ProdInKg",        // R.TotalRNwt
			    "ProductName",     // R.Brand
			    "ShiftID",         // R.ShiftID
			    "LC_TotalHours",        // S.LC_TotalHours
			    "SCL_TotalHours",       // S.SCL_TotalHours
			    "CL_TotalHours",        // S.CL_TotalHours
			    "MI_TotalHours",        // S.MI_TotalHours
			    "ER_TotalHours",        // S.ER_TotalHours
			    "MR_TotalHours",        // S.MR_TotalHours
			    "Others_TotalHours",     // S.Others_TotalHours
			    "LC_Count",        // S.LC_Count
			    "SCL_Count",       // S.SCL_Count
			    "CL_Count",        // S.CL_Count
			    "MI_Count",        // S.MI_Count
			    "ER_Count",        // S.ER_Count
			    "MR_Count",        // S.MR_Count
			    "Others_Count"      // S.Others_Count
			};


		try {
			queryResult = departmentRepository.getStoppageDetailsF18(date);

			for (Object[] row : queryResult) {
				Map<String, Object> map = new HashMap<>();
				for (int i = 0; i < headers.length; i++) {
					map.put(headers[i], row[i]);
				}
				responseList.add(map);
			}
		} catch (Exception ex) {
			String msg = ex.getMessage();
			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to get stoppage details for date: " + date + ". " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}

	public ResponseEntity<?> getOrderStoppageF09(String order) {

		List<Map<String, Object>> mapList = new ArrayList<>();
		List<Map<String, Object>> stoppageMapList = new ArrayList<>();

		try {
			
			mapList = departmentRepository.stoppage08BMR(order);

			// STOP
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
			for (Map<String, Object> temp : mapList) {
				// Parse PackDate from map

//	                String packDateStr = temp.get("PackDate");
				Date packDate = (Date) temp.get("PackDate");
				String fromTime = (String) temp.get("fromTime");
				String toTime = (String) temp.get("toTime");

				// Fetch stoppage records
				stoppageMapList = departmentRepository.orderStoppageByBmr(packDate, fromTime, toTime);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			return new ResponseEntity<>(new ApiResponse(false, "Failed to get Order Lov: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(stoppageMapList, HttpStatus.OK);

	}
	
			// S15 
	public ResponseEntity<?> getOrderStoppageF11(String order) {

		List<Map<String, Object>> mapList = new ArrayList<>();
		List<Map<String, Object>> stoppageMapList = new ArrayList<>();

		try {

			mapList = departmentRepository.stoppage15BMR(order);

			// STOP
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
			for (Map<String, Object> temp : mapList) {
				// Parse PackDate from map

//	                String packDateStr = temp.get("PackDate");
				Date packDate = (Date) temp.get("PackDate");
				String fromTime = (String) temp.get("fromTime");
				String toTime = (String) temp.get("toTime");

				// Fetch stoppage records
				stoppageMapList = departmentRepository.orderStoppage15ByBmr(packDate, fromTime, toTime);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			return new ResponseEntity<>(new ApiResponse(false, "Failed to get Order Lov: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(stoppageMapList, HttpStatus.OK);

	}
	
	

	// PRODUCT RECONCILIATION

	public ResponseEntity<Map<String, Object>> getProductReconciliation(String order) {
		Map<String, Object> responseMap = new HashMap<>();
		String[] headers = { "inputQuantity", "outputQuantity", "yieldPercentage" };

		try {

			List<Object[]> queryResults = departmentRepository.productReconciliation(order);

			if (queryResults == null || queryResults.isEmpty()) {
				responseMap.put("success", false);
				responseMap.put("message", "No data found for order: " + order);
				return new ResponseEntity<>(responseMap, HttpStatus.NOT_FOUND);
			}

			Object[] queryResult = queryResults.get(0);

			for (int i = 0; i < headers.length; i++) {
				responseMap.put(headers[i], queryResult[i] != null ? queryResult[i] : 0);
			}

			return new ResponseEntity<>(responseMap, HttpStatus.OK);

		} catch (Exception ex) {

			logger.error("Error fetching product reconciliation for order: {}", order, ex);
			responseMap.put("success", false);
			responseMap.put("message",
					"Failed to get product reconciliation for order: " + order + ". " + ex.getMessage());
			return new ResponseEntity<>(responseMap, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}	
	
	
		// CR
	
//	public StoppageReportResponse getStoppageReport(String packDt) {
//		
//        List<Object[]> rawData = departmentRepository.fetchStoppageOrderData(packDt);
//
//        // Map production orders with their data
//        Map<String, StoppageReportResponse.OrderDetails> orderDetailsMap = new HashMap<>();
//
//        for (Object[] row : rawData) {
//            String productionOrder = (String) row[0];
//            BigDecimal netWeight = (BigDecimal) row[1];
//            String brand = (String) row[2];
//            String cause = (String) row[3];
//            String code = (String) row[4];
//            String category = (String) row[5];
//            double totalHours = ((Number) row[6]).doubleValue();
//            long count = ((Number) row[7]).longValue();
//
//            // Create or update the order details
//            StoppageReportResponse.OrderDetails orderDetails = orderDetailsMap.computeIfAbsent(
//                productionOrder,
//                po -> new StoppageReportResponse.OrderDetails(po, netWeight, brand, new ArrayList<>())
//            );
//
//            // Add stoppage data to this order
//            orderDetails.getStoppageData().add(
//                new StoppageReportResponse.StoppageData(cause, code, category, totalHours, count)
//            );
//        }
//
//        // Convert the map values to a list and set in response
//        StoppageReportResponse response = new StoppageReportResponse();
//        response.setOrders(new ArrayList<>(orderDetailsMap.values()));
//        return response;
//    }
	
	
	
	public StoppageReportResponse getStoppageReport(String packDt) {
	    List<Object[]> rawData = departmentRepository.fetchStoppageOrderData(packDt);

	    // Initialize response list
	    List<StoppageReportResponse.OrderDetails> orderDetailsList = new ArrayList<>();

	    for (Object[] row : rawData) {
	        // Create a map for stoppage types and their counts
	        Map<String, Integer> stoppageTypes = new HashMap<>();
	        stoppageTypes.put("LC", ((Number) row[0]).intValue());
	        stoppageTypes.put("SCL", ((Number) row[1]).intValue());
	        stoppageTypes.put("CL", ((Number) row[2]).intValue());
	        stoppageTypes.put("MI", ((Number) row[3]).intValue());
	        stoppageTypes.put("ER", ((Number) row[4]).intValue());
	        stoppageTypes.put("MR", ((Number) row[5]).intValue());
	        stoppageTypes.put("Others", ((Number) row[6]).intValue());

	        // Create OrderDetails and set the stoppage data
//	        StoppageReportResponse.OrderDetails orderDetails = new StoppageReportResponse.OrderDetails();
//	        orderDetails.setStoppageData(new StoppageReportResponse.StoppageData(stoppageTypes));

	        // Add to response list
//	        orderDetailsList.add(orderDetails);
	    }

	    // Wrap the order details in the response
	    StoppageReportResponse response = new StoppageReportResponse();
	    response.setOrders(orderDetailsList);
	    return response;
	}
	
	
	
	public StoppageReportResponse getStoppageReport1(String packDt) {
	    List<Object[]> rawData = departmentRepository.fetchStoppageOrderData(packDt);

	    Map<String, StoppageReportResponse.OrderDetails> orderDetailsMap = new HashMap<>();

	    for (Object[] row : rawData) {
	        // Convert productionOrder to a String safely
	        String productionOrder = String.valueOf(row[0]);
	        BigDecimal netWeight = (BigDecimal) row[1];
	        String brand = (String) row[2];

	        // Example stoppage data structure for each record
	        Map<String, Integer> stoppageTypeMap = new HashMap<>();
	        stoppageTypeMap.put("LC", ((Number) row[3]).intValue());
	        stoppageTypeMap.put("SCL", ((Number) row[4]).intValue());
	        stoppageTypeMap.put("CL", ((Number) row[5]).intValue());
	        stoppageTypeMap.put("MI", ((Number) row[6]).intValue());
	        stoppageTypeMap.put("ER", ((Number) row[7]).intValue());
	        stoppageTypeMap.put("MR", ((Number) row[8]).intValue());
	        stoppageTypeMap.put("Others", ((Number) row[9]).intValue());

	        // Create or update the order details
	        StoppageReportResponse.OrderDetails orderDetails = orderDetailsMap.computeIfAbsent(
	            productionOrder,
	            po -> new StoppageReportResponse.OrderDetails(po, netWeight, brand, new ArrayList<>())
	        );

	        // Add stoppage data map to the order's stoppageData list
	        orderDetails.getStoppageData().add(stoppageTypeMap);
	    }

	    StoppageReportResponse response = new StoppageReportResponse();
	    response.setOrders(new ArrayList<>(orderDetailsMap.values()));
	    return response;
	}



	
	public Map<String, Object> approach2StoppageData(String date) {
        List<Map<String, Object>> results = departmentRepository.approach2StoppageData(date);
        
        Map<String, Object> response = new HashMap<>();
        response.put("result", results);

        return response;
    }
	
	
	
	
	public List<SplF08StoppageResponse.OrderDetails> getStoppageReport2(String packDt) {
        // Step 1: Find Running Data for the Date
        List<Object[]> runningOrders = departmentRepository.findRunningDataByDate(packDt);

        // Extract POrder IDs
        List<String> pOrders = new ArrayList<>();
        for (Object[] order : runningOrders) {
            pOrders.add((String) order[0]);
            pOrders.add((String) order[1]);
            pOrders.add((String) order[2]);
        }

        // Step 2: Get Net Weight and Brand for Running Orders
        List<Object[]> netWeightAndBrand = departmentRepository.findNetWeightAndBrandByOrders(pOrders);
        Map<BigDecimal, SplF08StoppageResponse.OrderDetails> orderDetailsMap = new HashMap<>();
        for (Object[] obj : netWeightAndBrand) {
            BigDecimal pOrder = (BigDecimal) obj[0];
//            BigDecimal netWeight = (BigDecimal) obj[0];
//            String brand = (String) obj[2];

            SplF08StoppageResponse.OrderDetails orderDetails = new SplF08StoppageResponse.OrderDetails(pOrder);
            orderDetailsMap.put(pOrder, orderDetails);
        }

        // Step 3: Get Stoppage Data
        List<Object[]> stoppageData = departmentRepository.findStoppageDataByDate(packDt);

        // Map Stoppage Data
        for (Object[] obj : stoppageData) {
            String stoppageCategory = (String) obj[0];
            BigDecimal totalHours = (BigDecimal) obj[1];

            for (Map.Entry<BigDecimal, SplF08StoppageResponse.OrderDetails> entry : orderDetailsMap.entrySet()) {
                entry.getValue().addStoppageData(stoppageCategory, totalHours);
            }
        }

        // Return the response
        
        return new ArrayList<SplF08StoppageResponse.OrderDetails>(orderDetailsMap.values());

        
    }
	
	
	public List<GeminiSplF08Response> geminiApproach(String packDt) {
		
		List<GeminiSplF08Response> geminiList = new ArrayList<GeminiSplF08Response>();
		
		geminiList = departmentRepository.approach3StoppageData(packDt);
		
		return geminiList;
	}
	
	
	
	public List<GeminiF08Approach2> getProductionData(String packDt) {
	        List<GeminiF08Approach2> productionData = new ArrayList<>();

	        // 1. Find Running Orders
	        List<Map<String, Object>> runningOrders = departmentRepository.findRunningOrders(packDt);

	        // 2. Process each running order
	        for (Map<String, Object> order : runningOrders) {
	            String pOrder1 = (String) order.get("POrder1");
	            String pOrder2 = (String) order.get("POrder2");
	            String pOrder3 = (String) order.get("POrder3");

	            // 2.1 Calculate Net Weight and Brand
	            List<Map<String, Object>> netWeightAndBrand = departmentRepository.findNetWeightAndBrand(pOrder1, pOrder2, pOrder3);

	            // 2.2 Fetch Stoppage Data
	            List<Map<String, Object>> stoppageData = departmentRepository.findStoppageData(packDt, pOrder1, pOrder2, pOrder3);

	            // ... Process the results and populate ProductionData objects
	            GeminiF08Approach2 productionDataObj = new GeminiF08Approach2();
	            // Populate productionDataObj fields using data from netWeightAndBrand and stoppageData

	            productionDataObj.setStoppage(stoppageData);
	            productionDataObj.setPOrder1(pOrder1);
	            
	            productionData.add(productionDataObj);
	        }

	        return productionData;
	    }
	
	
	
	// STOPPAGE 
	
//	public ResponseEntity<?> fetchStoppageReports(String packDate) {
//	    Set<String> runningOrderSet = new LinkedHashSet<>();
//	    List<Object[]> stoppageList = new ArrayList<>();
//	    List<Map<String, Object>> result = new ArrayList<>();
//	    
//	    try {
//	        List<String> orderList1 = departmentRepository.order1(packDate);
//	        List<String> orderList2 = departmentRepository.order2(packDate);
//	        List<String> orderList3 = departmentRepository.order3(packDate);
//	        
//	        // Consolidate all orders into a Set to remove duplicates
//	        orderList1.stream().filter(order -> !order.isEmpty()).forEach(runningOrderSet::add);
//	        orderList2.stream().filter(order -> !order.isEmpty()).forEach(runningOrderSet::add);
//	        orderList3.stream().filter(order -> !order.isEmpty()).forEach(runningOrderSet::add);
//	        
//	        // Loop through each order
//	        for (String order : runningOrderSet) {
//	            System.out.println("Order: " + order);
//	            
//	            String fromDate = departmentRepository.getFromTimeForOrder(order, packDate);
//	            String toDate = departmentRepository.getToTimeForOrder(order, packDate);
//	            
//	            stoppageList = departmentRepository.fetchStoppageForTime(fromDate, toDate, packDate);
//	            
//	            List<SplJStoppageF08Response1> stoppageListResp = new ArrayList<>();
//	            for (Object[] temp : stoppageList) {
//	                System.out.println("Temp: " + Arrays.toString(temp));
//	                
//	                String code = (String) temp[0];
//	                BigDecimal total = (BigDecimal) temp[1];
//	                
//	                SplJStoppageF08Response1 resp1 = new SplJStoppageF08Response1();
//	                resp1.setCode(code);
//	                resp1.setTotal(total);
//	                
//	                stoppageListResp.add(resp1);
//	            }
//	            
//	            // Create a new map for each order to avoid overwriting
//	            Map<String, Object> responseMap = new HashMap<>();
//	            responseMap.put("OrderNumber", order);
//	            responseMap.put("Stoppage", stoppageListResp);
//	            
//	            result.add(responseMap);
//	        }
//	    } catch (Exception ex) {
//	        ex.printStackTrace();
//	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//	    }
//	    
//	    return new ResponseEntity<>(result, HttpStatus.OK);
//	}

	
	public ResponseEntity<?> fetchStoppageReports(String packDate) {
	    Set<String> runningOrderSet = new LinkedHashSet<>();
	    List<Map<String, Object>> result = new ArrayList<>();

	    try {
	        List<String> orderList1 = departmentRepository.order1(packDate);
	        List<String> orderList2 = departmentRepository.order2(packDate);
	        List<String> orderList3 = departmentRepository.order3(packDate);

	        // Consolidate all orders into a Set to remove duplicates
	        orderList1.stream().filter(order -> !order.isEmpty()).forEach(runningOrderSet::add);
	        orderList2.stream().filter(order -> !order.isEmpty()).forEach(runningOrderSet::add);
	        orderList3.stream().filter(order -> !order.isEmpty()).forEach(runningOrderSet::add);

	        // Loop through each order
	        for (String order : runningOrderSet) {
	            System.out.println("Order: " + order);

	            // Fetch lists of fromTimes and toTimes
	            List<String> fromTimes = departmentRepository.getFromTimesForOrder(order, packDate);
	            List<String> toTimes = departmentRepository.getToTimesForOrder(order, packDate);

	            LocalDate localDate = LocalDate.parse(packDate);
	            
	            String brand = departmentRepository.getBrandForOrder(localDate, order);
	            BigDecimal netWeight = departmentRepository.getNetWeightForOrder(localDate, order);
	            
	            List<SplJStoppageF08Response1> stoppageListResp = new ArrayList<>();

	            // Loop through each time range
	            for (int i = 0; i < fromTimes.size(); i++) {
	                String fromTime = fromTimes.get(i);
	                String toTime = toTimes.get(i);

	                System.out.println("Processing Time Range: From " + fromTime + " To " + toTime);

	                // Fetch stoppage data for the current time range
	                List<Object[]> stoppageList = departmentRepository.fetchStoppageForTime(fromTime, toTime, packDate);

	                
	                
	                
	                for (Object[] temp : stoppageList) {
	                    System.out.println("Temp: " + Arrays.toString(temp));

	                    String code = (String) temp[0];
	                    BigDecimal total = (BigDecimal) temp[1];

	                    SplJStoppageF08Response1 resp1 = new SplJStoppageF08Response1();
	                    resp1.setCode(code);
	                    resp1.setTotal(total);

	                    stoppageListResp.add(resp1);
	                }
	            }

	            
	            BigDecimal totalNetWeight = departmentRepository.getTotalNetWeightForOrders(new ArrayList<>(runningOrderSet), packDate);
	            
	            // Create a new map for each order to avoid overwriting
	            Map<String, Object> responseMap = new HashMap<>();
	            responseMap.put("OrderNumber", order);
	            responseMap.put("Stoppage", stoppageListResp);
	            responseMap.put("Brand", brand);
	            responseMap.put("NetWeight", netWeight);
	            responseMap.put("Total Weight", totalNetWeight);

	            result.add(responseMap);
	        }
	    } catch (Exception ex) {
	        ex.printStackTrace();
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }

	    return new ResponseEntity<>(result, HttpStatus.OK);
	}

	
}
