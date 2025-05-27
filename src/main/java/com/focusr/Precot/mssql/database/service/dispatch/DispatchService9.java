package com.focusr.Precot.mssql.database.service.dispatch;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.focusr.Precot.exception.ResourceNotFoundException;
import com.focusr.Precot.mssql.database.model.UserImageDetails;
import com.focusr.Precot.mssql.database.model.PPC.ContractReviewMeetingF003;
import com.focusr.Precot.mssql.database.model.Store.ReceptionCheckListF003;
import com.focusr.Precot.mssql.database.model.Store.audit.ReceptionCheckListHistoryF003;
import com.focusr.Precot.mssql.database.model.dispatch.FinishedGoodsStockRegisterF001;
import com.focusr.Precot.mssql.database.repository.UserImageDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.dispatch.FinishedGoodsStockRegisterRepo;
import com.focusr.Precot.mssql.database.service.Store.StoreService9;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.IdAndValuePair;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.Store.AppConstantStore;
import com.focusr.Precot.util.dispatch.AppConstantsdispatch;

@Service
public class DispatchService9 {

	Logger logger = LoggerFactory.getLogger(DispatchService9.class);

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private UserImageDetailsRepository imageRepository;

	@Autowired
	private SCAUtil scaUtil;

	@Autowired
	private FinishedGoodsStockRegisterRepo finishedGoodsStockRepo;

	SCAUtil sca = new SCAUtil();

	private String getUserRole() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst()
					.orElse(null);
		}
		return null;
	}

	public ResponseEntity<?> getProductName() {

		List<String> orderProductResponse = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();

		try {
			orderProductResponse = finishedGoodsStockRepo.getProductName();

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
			logger.error("Error fetching Order Number Details with Pads category : " + msg);
			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to get Order Number Details with Pads category. "),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}

	// GET CUSTOMER NAME

	public ResponseEntity<?> getCustomer() {

		List<String> orderProductResponse = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();

		try {
			orderProductResponse = finishedGoodsStockRepo.getCustomer2();

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
			logger.error("Error fetching Order Number Details with Pads category : " + msg);
			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to get Order Number Details with Pads category. "),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}

	// PRODUCT CODE

	public ResponseEntity<?> fetchProductCode() {

		List<String> orderProductResponse = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();

		try {
			orderProductResponse = finishedGoodsStockRepo.getmaterial2();

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
			logger.error("Error fetching Order Number Details with Pads category : " + msg);
			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to get Order Number Details with Pads category. "),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}

	public ResponseEntity<?> getCustomer(String customer) {

		List<String> orderProductResponse = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();

		try {
			orderProductResponse = finishedGoodsStockRepo.getCustomer(customer);

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
			logger.error("Error fetching Order Number Details with Pads category : " + msg);
			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to get Order Number Details with Pads category. "),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}

	// GET BY PRODUCT

//	public ResponseEntity<?> getFilteredData(String productName, String customer, String material) {
//
//		Map<String, List<String>> response = new HashMap<>();
//
//		try {
//
//			List<String> productNames = finishedGoodsStockRepo.getDefaultProduct(customer, material);
////			List<String> customers = finishedGoodsStockRepo.getDefaultCustomer(productName, material);
////			List<String> materials = finishedGoodsStockRepo.getDefaultmaterial(productName, customer);
//
//			response.put("productNames", productNames);
////			response.put("customers", customers);
////			response.put("materials", materials);
//
//		} catch (Exception ex) {
//
//			String msg = ex.getMessage();
//			logger.error("Error fetching Product : " + msg);
//			return new ResponseEntity<>(new ApiResponse(false, "Failed to get Product "), HttpStatus.BAD_REQUEST);
//
//		}
//
//		return new ResponseEntity(response, HttpStatus.OK);
//
//	}

	public ResponseEntity<?> getFilteredData1(String productName, String customer, String material) {
		Map<String, List<String>> response = new HashMap<>();

		try {

			List<String> productNames = null;
			List<String> customers = null;
			List<String> materials = null;

			// Fetch the filtered data

//			if (productName.equals(null)) {
//				productNames = finishedGoodsStockRepo.getDefaultProduct(customer, material);
//			} else {
//				customers = finishedGoodsStockRepo.getDefaultCustomer(productName, material);
//				materials = finishedGoodsStockRepo.getDefaultmaterial(productName, customer);
//			}
			
			if (productName != null && !productName.isEmpty()) {
				
				logger.info("product name");
				
				customers = finishedGoodsStockRepo.getDefaultCustomerByProduct(productName);
				materials = finishedGoodsStockRepo.getDefaultmaterialByProduct(productName);

			}

			else if(customer != null && !customer.isEmpty()) {
				
				logger.info("customer name");
				materials = finishedGoodsStockRepo.getDefaultmaterialByCustomer(customer);
				productNames = finishedGoodsStockRepo.getDefaultProduct(customer, null);
			}

			else if(material != null && !material.isEmpty()) {
				
				logger.info("product code");
				
				customers = finishedGoodsStockRepo.getDefaultCustomerByMaterial(material);
				productNames = finishedGoodsStockRepo.getDefaultProduct(null, material);
			}

			// Populate the response map
			response.put("productNames", productNames);
			response.put("customers", customers);
			response.put("materials", materials);
			
		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Error fetching data: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to fetch filtered data"),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	public ResponseEntity<?> getmaterial(String material) {

		List<String> orderProductResponse = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();

		try {
			orderProductResponse = finishedGoodsStockRepo.getmaterial(material);

			if (orderProductResponse.isEmpty() || orderProductResponse == null) {

			} else {

				Long id = (long) 1;

				for (String order : orderProductResponse) {
					IdAndValuePair values = new IdAndValuePair();
					values.setId(id);
//					values.setType(order);
					values.setValue(order);

					responseList.add(values);
					id++;
				}
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Error fetching Order Number Details with Pads category : " + msg);
			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to get Order Number Details with Pads category. "),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}

	public ResponseEntity<?> SaveFinishedGoodsStock(FinishedGoodsStockRegisterF001 saveFinishedGoodsStock,
			HttpServletRequest http) {

		try {
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (userRole.equals("DISPATCH_SUPERVISOR")) {

				Long rawId = saveFinishedGoodsStock.getId();

				if (rawId != null) {
					FinishedGoodsStockRegisterF001 existingStock = finishedGoodsStockRepo.fetchFinishedGoodsById(rawId);
					// Map the fields you want to update
					existingStock.setUnit(saveFinishedGoodsStock.getUnit());
					existingStock.setFormatNo(saveFinishedGoodsStock.getFormatNo());
					existingStock.setFormatName(saveFinishedGoodsStock.getFormatName());
					existingStock.setRevisionNo(saveFinishedGoodsStock.getRevisionNo());
					existingStock.setSopNumber(saveFinishedGoodsStock.getSopNumber());
					existingStock.setDate(saveFinishedGoodsStock.getDate());
					existingStock.setShift(saveFinishedGoodsStock.getShift());
					existingStock.setCustomer(saveFinishedGoodsStock.getCustomer());
					existingStock.setProduct(saveFinishedGoodsStock.getProduct());
					existingStock.setOpeningStockNoOfCartons(saveFinishedGoodsStock.getOpeningStockNoOfCartons());
					existingStock.setReceiptQtyNoOfCartons(saveFinishedGoodsStock.getReceiptQtyNoOfCartons());
					existingStock.setDispatchedQtyNoOfCartons(saveFinishedGoodsStock.getDispatchedQtyNoOfCartons());
					existingStock.setIssuedQtyNoOfCartons(saveFinishedGoodsStock.getIssuedQtyNoOfCartons());
					existingStock.setClosingStockNoOfCartons(saveFinishedGoodsStock.getClosingStockNoOfCartons());
					existingStock.setFinishedGoodsSignDate(saveFinishedGoodsStock.getFinishedGoodsSignDate());
					existingStock.setRemark(saveFinishedGoodsStock.getRemark());
					existingStock.setReceivedByProduction(saveFinishedGoodsStock.getReceivedByProduction());

					saveFinishedGoodsStock.setDispatchSupervisorStatus(AppConstantsdispatch.Supervisorsave);
					saveFinishedGoodsStock.setDispatchSupervisorSavedOn(date);
					saveFinishedGoodsStock.setDispatchSupervisorSavedBy(userName);
					saveFinishedGoodsStock.setDispatchSupervisorSavedId(userId);

					finishedGoodsStockRepo.save(existingStock); // Save the updated object
				}

				else

					saveFinishedGoodsStock.setDispatchSupervisorStatus(AppConstantsdispatch.Supervisorsave);
				saveFinishedGoodsStock.setDispatchSupervisorSavedOn(date);
				saveFinishedGoodsStock.setDispatchSupervisorSavedBy(userName);
				saveFinishedGoodsStock.setDispatchSupervisorSavedId(userId);

				finishedGoodsStockRepo.save(saveFinishedGoodsStock);

			} else {

				return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to save form !!! "),
						HttpStatus.BAD_REQUEST);

			}

		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Save Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Save FinishedGoodsStock Check List" + msg),
					HttpStatus.BAD_REQUEST);

		}
		return new ResponseEntity(saveFinishedGoodsStock, HttpStatus.CREATED);

	}

	public ResponseEntity<?> SubmitFinishedGoodsStock(
			@RequestBody FinishedGoodsStockRegisterF001 submitFinishedGoodsStock, HttpServletRequest http) {
		if (submitFinishedGoodsStock == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
					HttpStatus.BAD_REQUEST);
		}

		SCAUtil scaUtil = new SCAUtil();
		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		String role = sca.getUserRoleFromRequest(http, tokenProvider);

		Long id = submitFinishedGoodsStock.getId();
		FinishedGoodsStockRegisterF001 bleachObj = new FinishedGoodsStockRegisterF001();
		// Get the current time
		LocalDateTime now = LocalDateTime.now();
		Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());

		try {
			String missingField = "";
			if (submitFinishedGoodsStock.getFormatNo() == null)
				missingField = "formatNo";
			if (submitFinishedGoodsStock.getSopNumber() == null)
				missingField = "sopNumber";
			if (submitFinishedGoodsStock.getRevisionNo() == null)
				missingField = "revisionNo";

			if (!missingField.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields! " + missingField),
						HttpStatus.BAD_REQUEST);
			}

			if (id != null) {
				bleachObj = finishedGoodsStockRepo.fetchFinishedGoodsById(id);
				if (bleachObj == null) {
					return new ResponseEntity<>(new ApiResponse(false, "No records found"), HttpStatus.BAD_REQUEST);
				}
			}
			submitFinishedGoodsStock.setCreatedAt(bleachObj.getCreatedAt());
			submitFinishedGoodsStock.setCreatedBy(bleachObj.getCreatedBy());

			String currentStatus = bleachObj.getDispatchSupervisorStatus();

			if ("DISPATCH_SUPERVISOR".equalsIgnoreCase(role)) {

				{

					submitFinishedGoodsStock.setDispatchSupervisorStatus(AppConstantsdispatch.Supervisorsubmit);
					submitFinishedGoodsStock.setDispatchSupervisorSubmitOn(date);
					submitFinishedGoodsStock.setDispatchSupervisorSign(userName);
					submitFinishedGoodsStock.setDispatchSupervisorSubmitBy(userName);
					submitFinishedGoodsStock.setDispatchSupervisorSubmitId(userId);

					submitFinishedGoodsStock.setDispatchSupervisorSign(userName);

					finishedGoodsStockRepo.save(submitFinishedGoodsStock);

				}

			}

			else {
				return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to approve"),
						HttpStatus.FORBIDDEN);
			}

		} catch (Exception ex) {
			logger.error(" **** Unable to submit Reception Check List Details **** ", ex);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to submit Reception Check List Details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);
	}

	public ResponseEntity<?> getFinishedGoodsStockSummary() {
		String userRole = getUserRole();
		List<FinishedGoodsStockRegisterF001> FinishedGoodsStock = new ArrayList<>();

		try {
			if (userRole.equals("DISPATCH_SUPERVISOR")) {
				FinishedGoodsStock = finishedGoodsStockRepo.getFinishedGoodservice();
			} else {
				return new ResponseEntity(
						new ApiResponse(false, userRole + " not authorized to access Hand Sanitation form"),
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity(FinishedGoodsStock, HttpStatus.OK);
		} catch (Exception ex) {
			String msg = ex.getMessage();
			ex.printStackTrace();
			logger.error("Unable to get summary record" + msg);
			return new ResponseEntity(new ApiResponse(false, "Failed to get summary record" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

//public ResponseEntity<?> getprintFinishedGoodsStock(String date, String shift, String productName, String customerName) {
//    List<FinishedGoodsStockRegisterF001> finishedGoodsRegister = new ArrayList<>();
//
//    try {
//        finishedGoodsRegister = finishedGoodsStockRepo.getStockByParams(date, shift, productName, customerName);
//        
//        if (finishedGoodsRegister.isEmpty()) {
//            return new ResponseEntity<>(new ApiResponse(false, "No data found for the given parameters."), HttpStatus.OK);
//        }
//
//    } catch (Exception ex) {
//        String msg = ex.getMessage();
//        logger.error("Unable to get Finished Goods Stock List: " + msg);
//        return new ResponseEntity<>(new ApiResponse(false, "Unable to get Finished Goods Stock List: " + msg), HttpStatus.BAD_REQUEST);
//    }
//
//    return new ResponseEntity<>(finishedGoodsRegister, HttpStatus.OK);
//}

	public ResponseEntity<?> getprintFinishedGoodsStock(String fromDate, String toDate, Integer year, Integer month,
			String productCode, String productName, String customerName) {
		List<FinishedGoodsStockRegisterF001> finishedGoodsRegister = new ArrayList<>();

		try {
			finishedGoodsRegister = finishedGoodsStockRepo.getStockByParams(fromDate, toDate, year, month, productCode,
					productName, customerName);

			if (finishedGoodsRegister.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(false, "No data found for the given parameters."),
						HttpStatus.OK);
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to get Finished Goods Stock List: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to get Finished Goods Stock List: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(finishedGoodsRegister, HttpStatus.OK);
	}

	public FinishedGoodsStockRegisterF001 getFinishedGoodsById(Long id) {
		Optional<FinishedGoodsStockRegisterF001> finishedGoods = finishedGoodsStockRepo.findById(id);
		if (finishedGoods.isPresent()) {
			return finishedGoods.get();
		} else {
			throw new ResourceNotFoundException("Finished Goods with ID " + id + " not found", null, finishedGoods);
		}

	}

//public Integer getClosingStock(String product, String productName, String customer) {
//    return finishedGoodsStockRepo.findClosingStock(product, productName, customer)
//            .orElseThrow(() -> new RuntimeException("Closing stock not found for the given parameters."));
//}

//public List<Integer> getClosingStock(String product, String productName, String customer) {
//    List<Integer> stocks = finishedGoodsStockRepo.findClosingStock(product, productName, customer);
//    
//    if (stocks.isEmpty()) {
//        throw new RuntimeException("No closing stock found for PRODUCT: " + product + ", PRODUCT_NAME: " + productName + ", CUSTOMER: " + customer);
//    }
//    
//    return new ArrayList<>(stocks); // Return all matching results as a list.
//}

	public List<Integer> getClosingStock(String product, String productName, String customer) {
		List<Integer> stocks = finishedGoodsStockRepo.findClosingStock(product, productName, customer);

		// Return empty list if no data is found
		if (stocks.isEmpty()) {
			return new ArrayList<>(); // Returning an empty list
		}

		return new ArrayList<>(stocks);
	}

	public ResponseEntity<?> getHandSanitationByDepartment() {
		List<String> employeeList = new ArrayList<>();
		List<IdAndValuePair> handSanitationList = new ArrayList<>();

		try {
			employeeList = finishedGoodsStockRepo.fetchBleachingIdNumbers();

			Long id = 1L; // Initialize id as Long

			for (String temp : employeeList) {
				IdAndValuePair value = new IdAndValuePair();
				value.setValue(temp);
				value.setId(id);
				id++;
				handSanitationList.add(value);
			}
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to get Hand Sanitation *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to get Hand Sanitation " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(handSanitationList, HttpStatus.OK);
	}

	
	// CR 19-02-2025

		public ResponseEntity<?> fetchAllDetails(String productName, String customer, String material) {
			Map<String, List<String>> response = new HashMap<>();

			try {

				List<String> productNames = null;
				List<String> customers = null;
				List<String> materials = null;

//				ProductName - MAT_DESC
//				ProductCode . material - MATERIAL
//				Customer - CUS_NAME

				// NEW

				if (productName != null && !productName.isEmpty()) {

					logger.info("product name");

					customers = finishedGoodsStockRepo.getCustomerDetailsByProductName(productName);

					materials = finishedGoodsStockRepo.getMaterialDetailsByProductName(productName);

				}

				else if (customer != null && !customer.isEmpty()) {

					logger.info("customer name");

					materials = finishedGoodsStockRepo.getMaterialByCustomer(customer);

					productNames = finishedGoodsStockRepo.getProductNameByCustomer(customer);
					
					customers = Collections.singletonList(customer);
				}

				else if (material != null && !material.isEmpty()) {

					logger.info("product code");

					customers = finishedGoodsStockRepo.getCustomerNameDetailsByMaterial(material);
					productNames = finishedGoodsStockRepo.getProductNameByMaterial(material);
				}


				// Populate the response map
				response.put("productNames", productNames);
				response.put("customers", customers);
				response.put("materials", materials);

			} catch (Exception ex) {
				String msg = ex.getMessage();
				logger.error("Error fetching data: " + msg);
				return new ResponseEntity<>(new ApiResponse(false, "Failed to fetch filtered data"),
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		}
}
