package com.focusr.Precot.mssql.database.service.padpunching;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.focusr.Precot.mssql.database.repository.bleaching.DepartmentRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.padpunching.PackingDetailsResponse;
import com.focusr.Precot.util.IdAndValuePair;

@Service
public class PadPunchingPdeService {

	Logger log = LoggerFactory.getLogger(PadPunchingPdeService.class);

	@Autowired
	private DepartmentRepository padPunchingPdeRepository;

	// F004
	public ResponseEntity<?> getProductionpackingDetails(String date, String shift) {
		List<Object[]> packOrderInfoResponse = new ArrayList<>();
		List<Map<String, Object>> responseList = new ArrayList<>();
		String[] headers = { "date", "shift", "julianDay", "machineName", "POrder", "NCB", "noOfCartons", "noOfBags",
				"noOfBagCarton", "poNo", "productName" };

		try {
			packOrderInfoResponse = padPunchingPdeRepository.findByDateShift(date, shift);

			for (Object[] row : packOrderInfoResponse) {
				Map<String, Object> map = new HashMap<>();
				for (int i = 0; i < headers.length; i++) {
					map.put(headers[i], row[i]);
				}
				responseList.add(map);
			}
		} catch (Exception ex) {
			String msg = ex.getMessage();
			log.error("Error fetching Production Packing Details : " + msg);
			return new ResponseEntity<>(new ApiResponse(false,
					"Failed to get Production Packing Details for date: " + date + " and shift: " + shift + ". "),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}

	// F003
	public ResponseEntity<?> getOrdersWithPadsCategory() {
		List<String> orderProductResponse = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();

		try {
			orderProductResponse = padPunchingPdeRepository.findOrdersWithPadsCategory();

			if (orderProductResponse.isEmpty() || orderProductResponse == null) {

			} else {

				Long id = (long) 1;

				for (String order : orderProductResponse) {
					IdAndValuePair values = new IdAndValuePair();
					values.setId(id);
					values.setType(order);
					values.setValue(order);

					responseList.add(values);
					id++;
				}
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();
			log.error("Error fetching Order Number Details with Pads category : " + msg);
			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to get Order Number Details with Pads category. "),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}

//	public ResponseEntity<?> findPackingDetails(String date, String shift, String machineName, String orderNo) {
//		PackingDetailsResponse result;
//		 PackingDetailsResponse response = new PackingDetailsResponse();
//		
//	   try {
//	        result = padPunchingPdeRepository.findPackingDetails(date, shift, machineName, orderNo);
//
//	        /*    response.setDate((String) result[0]);
//	        response.setShift((Integer) result[1]);
//	        response.setOrderNo((String) result[2]);
//	        response.setPoNo((String) result[3]);
//	        response.setMachineName((String) result[4]);
//	        response.setJulianDay((String) result[5]);
//	        response.setProductName((String) result[6]);
//	        response.setGsm((String) result[7]);
//	        response.setPatternDesc((String) result[8]);
//	        response.setPadsPerBag((String) result[9]);
//	        response.setEdge((String) result[10]);
//	        response.setPattern((String) result[11]);
//	        response.setTypeOfPad((String) result[12]);
//	       */ 
//	        
//	    } catch (Exception ex) {
//	        String msg = ex.getMessage();
//	        log.error("Error fetching Production Packing Details: " + ex);
//	        return new ResponseEntity<>(new ApiResponse(false,
//	                "Failed to get Production Packing Details for date: " + date + ", shift: " + shift +
//	                ", machine name: " + machineName + ", and orderNo: " + orderNo + "."),
//	                HttpStatus.BAD_REQUEST);
//	    }
//
//	    return new ResponseEntity<>(response, HttpStatus.OK);
//	}

	public ResponseEntity<?> findPackingDetailsRunning(String date, String shift, String machineName, String orderNo) {
		List<Object[]> results;
		
		List<Object[]> fallbackResults;

//	    PackingDetailsResponse response = new PackingDetailsResponse();
		List<Map<String, Object>> responseList = new ArrayList<>();
		String[] headers = { "date", "shift", "orderNo", "poNo", "machineName", "julianDay", "productName", "gsm",
				"patternDesc","rawPadsPerBag", "padsPerBag", "edge", "pattern", "typeOfPad" };

		try {
			results = padPunchingPdeRepository.findPackingDetailsRunning(date, shift, machineName, orderNo);

			if (!results.isEmpty()) {

				for (Object[] row : results) {
					Map<String, Object> map = new HashMap<>();
					for (int i = 0; i < headers.length; i++) {
						 if (i < row.length) {  // Check if index exists in the row
					            map.put(headers[i], row[i]);
					        } else {
					            map.put(headers[i], null);  // Handle missing values
					        }
					}
					responseList.add(map);
				}
return new ResponseEntity<>(responseList,HttpStatus.OK);
			}
			
			String[] header = { "orderNo","poNo", "productName", "gsm", "patternDesc", "rawPadsPerBag", "padsPerBag", "edge","pattern", "typeOfPad" };

			// Handle fallback results if primary query returns no data
			fallbackResults = padPunchingPdeRepository.findPackingDetailsRunningOrderInfo(orderNo);

	        // If the fallback query returns results, process and return them
	        if (!fallbackResults.isEmpty()) {
	            for (Object[] row : fallbackResults) {
	                Map<String, Object> map = new HashMap<>();
	                for (int i = 0; i < header.length; i++) {
	                    map.put(header[i], (i < row.length) ? row[i] : "N/A"); // Handle missing values with default "N/A"
	                }
	                responseList.add(map);
	            }
	            return new ResponseEntity<>(responseList, HttpStatus.OK);
	        } else {
	            // If no data found in both queries, return an error
	            return new ResponseEntity<>(new ApiResponse(false, "No data found."), HttpStatus.BAD_REQUEST);
	        }
		} catch (Exception ex) {
			log.error("Error fetching Production Packing Details: " + ex);
			return new ResponseEntity<>(
					new ApiResponse(false,
							"Failed to get Production Packing Details for date: " + date + ", shift: " + shift
									+ ", machine name: " + machineName + ", and orderNo: " + orderNo + "."),
					HttpStatus.BAD_REQUEST);
		}

	}
	

//	public ResponseEntity<?> findPackingDetailsNext(String date, String shift, String machineName, String orderNo) {
//	    List<Object[]> results;
////	    PackingDetailsResponse response = new PackingDetailsResponse();
//	    List<Map<String, Object>> responseList = new ArrayList<>();
//		String[] headers = { "date", "shift", "orderNo", "poNo", "machineName", "julianDay", "productName", "gsm", "patternDesc",
//				"padsPerBag", "edge", "pattern", "typeOfPad" };
//
//	    try {
//	        results = padPunchingPdeRepository.findPackingDetailsNext(date, shift, machineName, orderNo);
//
//	        if (!results.isEmpty()) {
//	        	
//	        	for (Object[] row : results) {
//					Map<String, Object> map = new HashMap<>();
//					for (int i = 0; i < headers.length; i++) {
//						map.put(headers[i], row[i]);
//					}
//					responseList.add(map);
//				}
//	        } else {
//	            return new ResponseEntity<>(new ApiResponse(false, "No data found."), HttpStatus.NOT_FOUND);
//	        }
//
//	    } catch (Exception ex) {
//	        log.error("Error fetching Production Packing Details: " + ex);
//	        return new ResponseEntity<>(new ApiResponse(false,
//	                "Failed to get Production Packing Details for date: " + date + ", shift: " + shift +
//	                        ", machine name: " + machineName + ", and orderNo: " + orderNo + "."),
//	                HttpStatus.BAD_REQUEST);
//	    }
//
//	    return new ResponseEntity<>(responseList, HttpStatus.OK);
//	}

	// Form12 Bag DetailsDaily Production F001

	public List<Map<String, Object>> getBagDetailsDailyProductionPde(String date, String shift) {

		try {
			return padPunchingPdeRepository.getBagDetailsDailyProductionPde(date, shift);

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace(); // Log the error for debugging
			throw e;
		}

	}

	// Form11 Log Book Bag Making F003

	public List<Map<String, Object>> getBagDetailsLogBookPde() {
		try {

			return padPunchingPdeRepository.getBagDetailsLogBook();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace(); // Log the error for debugging
			throw e;
		}

	}

	// Form2 Daily Roll Consumption Report-Pad Punching F-002

	public List<Map<String, Object>> getDailyRollConsumptionDetails1(String ConsDt, String mcn, String shiftId) {
		try {

			return padPunchingPdeRepository.getDailyRollConsumptionDetails1(ConsDt,mcn,shiftId);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace(); // Log the error for debugging
			throw e;
			
		}

	}

	
	// Roll Consumption

	public List<Map<String, Object>> getDailyRollConsumptionDetails2(String ConsDt, String POrder, String ShiftId) {
		try {
			return padPunchingPdeRepository.getDailyRollConsumptionDetails2(ConsDt, POrder,ShiftId);
 
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace(); // Log the error for debugging
			throw e;
		}
	}

	// Stoppage Details

	public List<Map<String, Object>> getDailyRollConsumptionDetails3(String PackDt, String ShiftID,String mcn) {
		try {

			return padPunchingPdeRepository.getDailyRollConsumptionDetails3(PackDt,  ShiftID,mcn);

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace(); // Log the error for debugging
			throw e;
		}

	}
	
	//LogBook
	
	public List<Map<String, Object>> getLogBookBagMaking(String PackDt, String ShiftID) {
		try {

			return padPunchingPdeRepository.getLogBookBagMking(PackDt,  ShiftID);

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace(); // Log the error for debugging
			throw e;
		}

	}
	
	

	public ResponseEntity<?> getMachineLov() {
		
		List<Map<String, Object>> responseList = new ArrayList<>();
		
		try {
			
			responseList = padPunchingPdeRepository.getMachineName();
			
		}catch (Exception ex) {
			String msg = ex.getMessage();
			log.error("Error fetching Machine LOV : " + msg);
			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to details."),
					HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}
	
//	PRODUCTION LOGBOOK
	
	public ResponseEntity<?> getProductionDetailList(String date, String shift, String machine, String orderNo) {
		List<Object[]> results;
 
		PackingDetailsResponse response = new PackingDetailsResponse();
 
		List<Map<String, Object>> responseList = new ArrayList<>();
 
		String[] headers = { "orderNo", "poNo", "opening_qty", "product_name", "machine", "packed_qty", "date",
				"shift" };
 
		try {
			
			results = padPunchingPdeRepository.findProductionDetails(date, shift, machine, orderNo);
 
			if (!results.isEmpty()) {
 
				log.info("**** Result Found !!!!" + results.size());
				
				for (Object[] row : results) {
					Map<String, Object> map = new HashMap<>();
					for (int i = 0; i < headers.length; i++) {
						map.put(headers[i], row[i]);
					}
					responseList.add(map);
				}
	            return new ResponseEntity<>(responseList, HttpStatus.OK);
	        }         	
	        	
	            // If no results were found, try fetching the fallback data from tblOrderInfo
	            Map<String, Object> fallbackData = padPunchingPdeRepository.findProductionDetailstableOrderInfo(orderNo, date);
	            if (fallbackData.isEmpty()) {
	                return new ResponseEntity<>(new ApiResponse(false, "No data found for the given order and date."), HttpStatus.NOT_FOUND);
	            }
	            // If fallback data is found, return it
	            responseList.add(fallbackData);
	            return new ResponseEntity<>(responseList, HttpStatus.OK);
	        
 
		} catch (Exception ex) {
			log.error("Error fetching Production Packing Details: " + ex);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to get Production Details for date: " + date
					+ ", shift: " + shift + ", machine: " + machine + ", and orderNo: " + orderNo + "."),
					HttpStatus.BAD_REQUEST);
		}
 
		
//		PROD GETTING DETAILS DIRECTLY FROM TBLORDERINFO WHEN THERE IS NO DATA IN TBLFPPACK
		
	}
	
//	PROD
	
//	OPENING QUANTITY
	
	
	
//	public ResponseEntity<?> getOpeningQty(String orderNo, String packDate) {
//	    try {
//	        log.info("Fetching Opening_Qty for OrderNo: {}, PackDate: {}", orderNo, packDate);
//	        BigDecimal openingQty = padPunchingPdeRepository.findOpeningQtyForOrderAndDate(orderNo, packDate);
//
//	        if (openingQty == null) {
//	            log.info("No data found for OrderNo: {}, PackDate: {}", orderNo, packDate);
//	            Map<String, Object> response = new HashMap<>();
//	            response.put("success", false);
//	            response.put("message", "No data found for the given POrder and date.");
//	            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
//	        }
//
//	        Map<String, Object> response = new HashMap<>();
//	        response.put("Opening_Qty", openingQty);
//	        return new ResponseEntity<>(response, HttpStatus.OK);
//
//	    } catch (ClassCastException e) {
//	        log.error("ClassCastException: {}", e.getMessage());
//	        Map<String, Object> errorResponse = new HashMap<>();
//	        errorResponse.put("success", false);
//	        errorResponse.put("message", "Unexpected data type returned by query.");
//	        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
//
//	    } catch (Exception e) {
//	        log.error("Error fetching Opening_Qty: {}", e.getMessage(), e);
//	        Map<String, Object> errorResponse = new HashMap<>();
//	        errorResponse.put("success", false);
//	        errorResponse.put("message", "Error fetching data: " + e.getMessage());
//	        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
//	    }
//	}
//	
	
	
	public ResponseEntity<?> getOpeningQty(String orderNo, String packDate) {
	    try {
	        log.info("Fetching Opening_Qty for OrderNo: {}, PackDate: {}", orderNo, packDate);
	        
	        // Attempt to fetch opening quantity for the given order and date
	        BigDecimal openingQty = padPunchingPdeRepository.findOpeningQtyForOrderAndDate(orderNo, packDate);

	        // If no result, fall back to findOpeningQtyForTblOrderInfo
	        if (openingQty == null) {
	            log.info("No data found for OrderNo: {}, PackDate: {}. Falling back to findOpeningQtyForTblOrderInfo.", orderNo, packDate);
	            openingQty = padPunchingPdeRepository.findOpeningQtyForTblOrderInfo(orderNo,packDate);

	            // If still no result, return NOT_FOUND
	            if (openingQty == null) {
	                log.info("No data found for OrderNo: {} using fallback method.", orderNo);
	                Map<String, Object> response = new HashMap<>();
	                response.put("success", false);
	                response.put("message", "No data found for the given POrder.");
	                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	            }
	        }

	        // Success response
	        Map<String, Object> response = new HashMap<>();
	        response.put("Opening_Qty", openingQty);
	        return new ResponseEntity<>(response, HttpStatus.OK);

	    } catch (ClassCastException e) {
	        log.error("ClassCastException: {}", e.getMessage());
	        Map<String, Object> errorResponse = new HashMap<>();
	        errorResponse.put("success", false);
	        errorResponse.put("message", "Unexpected data type returned by query.");
	        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);

	    } catch (Exception e) {
	        log.error("Error fetching Opening_Qty: {}", e.getMessage(), e);
	        Map<String, Object> errorResponse = new HashMap<>();
	        errorResponse.put("success", false);
	        errorResponse.put("message", "Error fetching data: " + e.getMessage());
	        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}


	
	
}
