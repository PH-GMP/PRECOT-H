package com.focusr.Precot.mssql.database.service.productDevelopment;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import com.focusr.Precot.mssql.database.model.productDevelopment.ProductDevelopmentLob;
import com.focusr.Precot.mssql.database.model.productDevelopment.ProductDevelopmentSheetF001;
import com.focusr.Precot.mssql.database.model.productDevelopment.audit.ProductDevelopmentSheetHistoryF001;
import com.focusr.Precot.mssql.database.repository.UserImageDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.productDevelopment.GsmProdDevF001Repo;
import com.focusr.Precot.mssql.database.repository.productDevelopment.PlyColorProdDevF001Repo;
import com.focusr.Precot.mssql.database.repository.productDevelopment.ProductDevelopmentLobRepo;
import com.focusr.Precot.mssql.database.repository.productDevelopment.ProductDevelopmentSheetRepoF001;
import com.focusr.Precot.mssql.database.repository.productDevelopment.audit.ProductDevelopmentSheetHistoryRepoF001;
import com.focusr.Precot.mssql.database.service.Store.StoreService9;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.payload.ProductDevelopmentAuditRequest;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.productDevelopment.AppConstantsproductdevelopment;
import com.focusr.Precot.util.productDevelopment.ProductDevelopmenetExcelUtill;
import com.focusr.Precot.util.productDevelopment.productDevelopementMailFunction;

@Service
public class productDevelopmentService9 {

	Logger logger = LoggerFactory.getLogger(StoreService9.class);

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private UserImageDetailsRepository imageRepository;

	@Autowired
	private SCAUtil scaUtil;

	@Autowired
	private ProductDevelopmentSheetRepoF001 productDevelopmentRepo;

	@Autowired
	private ProductDevelopmentLobRepo productLobRepo;

	@Autowired
	private ProductDevelopmentSheetHistoryRepoF001 productHistoryRepo;

	@Autowired
	private PlyColorProdDevF001Repo PlyColorProdDevRepo;

	@Autowired
	private com.focusr.Precot.mssql.database.repository.productDevelopment.GsmSlideProdDevF001Repo GsmSlideProdDevRepo;

	@Autowired
	private GsmProdDevF001Repo gsmProdRepo;

	@Autowired
	private productDevelopementMailFunction mailfunction;

	Logger log = LoggerFactory.getLogger(productDevelopmentService9.class);

	SCAUtil sca = new SCAUtil();

	private String getUserRole() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst()
					.orElse(null);
		}
		return null;
	}

//public ResponseEntity<?> saveProductDevelopment(ProductDevelopmentSheetF001 productDevelopment, HttpServletRequest http) {
//		
//		try {
//			String userRole = getUserRole();
//			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//			String userName = userRepository.getUserName(userId);
//			LocalDateTime currentDate = LocalDateTime.now();
//			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//			
//			if(userRole.equals("DEVELOPMENT_MANAGER")) {
//				
//				Long rawId = productDevelopment.getId();
//				
//				if(rawId != null)
//				{
//					ProductDevelopmentSheetF001 ProductDevelopmentSheet = new ProductDevelopmentSheetF001();	
//					ProductDevelopmentSheet = productDevelopmentRepo.fetchProductDevelopmentById(rawId);
//					productDevelopment.setCreatedAt(productDevelopment.getCreatedAt());
//					productDevelopment.setCreatedBy(productDevelopment.getCreatedBy());
//					productDevelopmentRepo.save(productDevelopment);
//				}
//				
//				
//				productDevelopment.setDevelopmentSupervisorStatus(AppConstantsproductdevelopment.supervisor_Save);
//				productDevelopment.setDevelopmentSupervisorSavedOn(date);
//				productDevelopment.setDevelopmentSupervisorSavedBy(userName);
//				productDevelopment.setDevelopmentSupervisorSavedId(userId);
//				productDevelopmentRepo.save(productDevelopment);
//				
//			} else {
//				
//				return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to save form !!! "), HttpStatus.BAD_REQUEST);
//				
//			}
//			
//		} catch(Exception e) {
//			
//			String msg = e.getMessage();
//			log.error("Unable to Save Record" + msg);
//
//			return new ResponseEntity(
//					new ApiResponse(false, "Failed to Save Product Development Sheet" + msg),
//					HttpStatus.BAD_REQUEST);
//			
//			
//		}
//		return new ResponseEntity(productDevelopment, HttpStatus.CREATED);
//		
//	}

//	

//	public ResponseEntity<?> saveProductDevelopment(ProductDevelopmentSheetF001 productDevelopment, HttpServletRequest http) {
//	    try {
//	        String userRole = getUserRole();
//	        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//	        String userName = userRepository.getUserName(userId);
//	        LocalDateTime currentDate = LocalDateTime.now();
//	        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//	        if (!userRole.equals("DEVELOPMENT_MANAGER")) {
//	            return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to save form!!!"), HttpStatus.BAD_REQUEST);
//	        }
//
//	        // Check if updating an existing record
//	        Long rawId = productDevelopment.getId();
//	        if (rawId != null) {
//	            ProductDevelopmentSheetF001 existingSheet = productDevelopmentRepo.fetchProductDevelopmentById(rawId);
//	            if (existingSheet != null) {
//	                productDevelopment.setCreatedAt(existingSheet.getCreatedAt());
//	                productDevelopment.setCreatedBy(existingSheet.getCreatedBy());
//	            }
//	        }
//
//	        // Set auditing and supervisor details
//	        productDevelopment.setDevelopmentSupervisorStatus(AppConstantsproductdevelopment.supervisor_Save);
//	        productDevelopment.setDevelopmentSupervisorSavedOn(date);
//	        productDevelopment.setDevelopmentSupervisorSavedBy(userName);
//	        productDevelopment.setDevelopmentSupervisorSavedId(userId);
//
//	        // Set the parent ID for all child entities
//	        setParentIdForChildEntities(productDevelopment);
//
//	        // Save the parent entity (cascading to child entities)
//	        productDevelopmentRepo.save(productDevelopment);
//
//	        return new ResponseEntity<>(productDevelopment, HttpStatus.CREATED);
//	    } catch (Exception e) {
//	        String msg = e.getMessage();
//	        log.error("Unable to Save Record: " + msg);
//	        return new ResponseEntity<>(new ApiResponse(false, "Failed to Save Product Development Sheet: " + msg), HttpStatus.BAD_REQUEST);
//	    }
//	}

	public ResponseEntity<?> saveProductDevelopment(ProductDevelopmentSheetF001 productDevelopment,
			HttpServletRequest http) {
		try {
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (!userRole.equals("DEVELOPMENT_MANAGER")) {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to save form!!!"),
						HttpStatus.BAD_REQUEST);
			}

			// Check if updating an existing record
			Long rawId = productDevelopment.getId();
			if (rawId != null) {
				ProductDevelopmentSheetF001 existingSheet = productDevelopmentRepo.fetchProductDevelopmentById(rawId);
				if (existingSheet != null) {
					productDevelopment.setCreatedAt(existingSheet.getCreatedAt());
					productDevelopment.setCreatedBy(existingSheet.getCreatedBy());
				}
			}

			// Set auditing and supervisor details
			productDevelopment.setDevelopmentSupervisorStatus(AppConstantsproductdevelopment.supervisor_Save);
			productDevelopment.setDevelopmentSupervisorSavedOn(date);
			productDevelopment.setDevelopmentSupervisorSavedBy(userName);
			productDevelopment.setDevelopmentSupervisorSavedId(userId);

			// Save the parent entity first (this will generate its ID)
			productDevelopment = productDevelopmentRepo.save(productDevelopment); // Save and get the ID

			// Set the parent ID for all child entities after the parent ID is generated
			setParentIdForChildEntities(productDevelopment);

			// Save the parent entity again after updating child entities with parent ID
			productDevelopmentRepo.save(productDevelopment);

			return new ResponseEntity<>(productDevelopment, HttpStatus.CREATED);
		} catch (Exception e) {
			String msg = e.getMessage();
			log.error("Unable to Save Record: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to Save Product Development Sheet: " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	private void setParentIdForChildEntities(ProductDevelopmentSheetF001 productDevelopment) {
		Long parentId = productDevelopment.getId();

		// Set parentId for ShapeProdDevF001
		if (productDevelopment.getDetails() != null) {
			productDevelopment.getDetails().forEach(detail -> {
				detail.setParentId(parentId);
			});
		}

		// Set parentId for GsmProdDevF001
		if (productDevelopment.getGsmDetails() != null) {
			productDevelopment.getGsmDetails().forEach(detail -> {
				detail.setParentId(parentId);
			});

		}
		// Set parentId for GSM Slide
		if (productDevelopment.getGsmSlideDetails() != null) {
			productDevelopment.getGsmSlideDetails().forEach(detail -> {
				detail.setParentId(parentId);
			});

		}

		// Set parentId for SkuProdDevF001
		if (productDevelopment.getSkuDetails() != null) {
			productDevelopment.getSkuDetails().forEach(detail -> {
				detail.setParentId(parentId);
			});
		}

		// Set parentId for innercottonProdDevF001
		if (productDevelopment.getInnercottonDetails() != null) {
			productDevelopment.getInnercottonDetails().forEach(detail -> {
				detail.setParentId(parentId);
			});
		}

		// Set parentId for outercottonProdDevF001
		if (productDevelopment.getOutercottonDetails() != null) {
			productDevelopment.getOutercottonDetails().forEach(detail -> {
				detail.setParentId(parentId);
			});
		}

		// Set parentId for PLycolor
		if (productDevelopment.getPlyColors() != null) {
			productDevelopment.getPlyColors().forEach(detail -> {
				detail.setParentId(parentId);
			});
		}

		// Set parentId for InnerPLycolor
		if (productDevelopment.getInnerplyColors() != null) {
			productDevelopment.getInnerplyColors().forEach(detail -> {
				detail.setParentId(parentId);
			});
		}

		// Set parentId for sealingqualityProdDevF001
		if (productDevelopment.getSealingqualityDetails() != null) {
			productDevelopment.getSealingqualityDetails().forEach(detail -> {
				detail.setParentId(parentId);
			});
		}

		// Set parentId for packingDetailsProdDevF001
		if (productDevelopment.getPackingDetails() != null) {
			productDevelopment.getPackingDetails().forEach(detail -> {
				detail.setParentId(parentId);
			});
		}

		// Set parentId for productDevPrintOuterbagProdDevF001
		if (productDevelopment.getPrintLocationOuterbagDetails() != null) {
			productDevelopment.getPrintLocationOuterbagDetails().forEach(detail -> {
				detail.setParentId(parentId);
			});
		}

//	    // Set parentId for productDevPrintInnerCartonProdDevF001
//	    if (productDevelopment.getPrintLocationInnerCartonDetails() != null) {
//	        productDevelopment.getPrintLocationInnerCartonDetails().forEach(detail -> {
//	            detail.setParentId(parentId);
//	        });
//	    }
//
//	    // Set parentId for productDevPrintOuterCartonProdDevF001
//	    if (productDevelopment.getPrintLocationOutercartonDetails() != null) {
//	        productDevelopment.getPrintLocationOutercartonDetails().forEach(detail -> {
//	            detail.setParentId(parentId);
//	        });
//	    }

		// Set parentId for productDevStrikerProdDevF001
		if (productDevelopment.getProductDevStrikerDetails() != null) {
			productDevelopment.getProductDevStrikerDetails().forEach(detail -> {
				detail.setParentId(parentId);
			});
		}

		// Set parentId for packingMethodsDetailsProdDevF001
		if (productDevelopment.getPackingMethodDetails() != null) {
			productDevelopment.getPackingMethodDetails().forEach(detail -> {
				detail.setParentId(parentId);
			});
		}

		// Set parentId for secondaryPackingDetailsProdDevF001
		if (productDevelopment.getSecondaryPackingDetails() != null) {
			productDevelopment.getSecondaryPackingDetails().forEach(detail -> {
				detail.setParentId(parentId);
			});
		}

		// Set parentId for Slipsheet
		if (productDevelopment.getSlipsheetSpecificationsDetails() != null) {
			productDevelopment.getSlipsheetSpecificationsDetails().forEach(detail -> {
				detail.setParentId(parentId);
			});
		}

		// Set parentId for Carton slipshteet
		if (productDevelopment.getCartonsperSlipSheetDetails() != null) {
			productDevelopment.getCartonsperSlipSheetDetails().forEach(detail -> {
				detail.setParentId(parentId);
			});
		}

//	      // Set parentId for Customer Required For UsP
		if (productDevelopment.getCustomerRequirementDetails() != null) {
			productDevelopment.getCustomerRequirementDetails().forEach(detail -> {
				detail.setParentId(parentId);
			});
		}

	}

	public ResponseEntity<?> uploadImages(String pdsNo, MultipartFile innerFilmI, MultipartFile outerFilmII,
			MultipartFile innerCartonIII, MultipartFile outerCartonIV, MultipartFile slipSheet) {

		try {
			// Find the entity by PDS No
			Optional<ProductDevelopmentLob> optionalProductDevelopmentLob = productLobRepo.findByPdsNo(pdsNo);

			ProductDevelopmentLob productDevelopmentLob;
			if (!optionalProductDevelopmentLob.isPresent()) {
				// Create a new entity if PDS No not found
				productDevelopmentLob = new ProductDevelopmentLob();
				productDevelopmentLob.setPdsNo(pdsNo); // Set PDS No to the new entity
			} else {
				productDevelopmentLob = optionalProductDevelopmentLob.get();
			}

			// Update the LOB fields with the uploaded images
			if (innerFilmI != null && !innerFilmI.isEmpty()) {
				productDevelopmentLob.setInnerFilmI(innerFilmI.getBytes());
			}
			if (outerFilmII != null && !outerFilmII.isEmpty()) {
				productDevelopmentLob.setOuterFilmII(outerFilmII.getBytes());
			}
			if (innerCartonIII != null && !innerCartonIII.isEmpty()) {
				productDevelopmentLob.setInnerCartonIII(innerCartonIII.getBytes());
			}
			if (outerCartonIV != null && !outerCartonIV.isEmpty()) {
				productDevelopmentLob.setOuterCartonIV(outerCartonIV.getBytes());
			}

			if (slipSheet != null && !slipSheet.isEmpty()) {
				productDevelopmentLob.setSlipSheet(slipSheet.getBytes());
			}

			// Save the updated (or newly created) entity
			productLobRepo.save(productDevelopmentLob);

			return new ResponseEntity<>(new ApiResponse(true, "Images uploaded successfully"), HttpStatus.OK);

		} catch (IOException e) {
			return new ResponseEntity<>(new ApiResponse(false, "Error processing image files: " + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> editProductDevelopmentImages(String pdsNo, MultipartFile innerFilmI,
			MultipartFile outerFilmII, MultipartFile innerCartonIII, MultipartFile outerCartonIV,
			MultipartFile slipSheet) {

		try {
			// Find the entity by PDS No
			Optional<ProductDevelopmentLob> optionalProductDevelopmentLob = productLobRepo.findByPdsNo(pdsNo);

			if (!optionalProductDevelopmentLob.isPresent()) {
				return new ResponseEntity<>(new ApiResponse(false, "PDS No not found"), HttpStatus.NOT_FOUND);
			}

			ProductDevelopmentLob productDevelopmentLob = optionalProductDevelopmentLob.get();

			// Update only the provided fields (if any image is provided, update it)
			if (innerFilmI != null && !innerFilmI.isEmpty()) {
				productDevelopmentLob.setInnerFilmI(innerFilmI.getBytes());
			}
			if (outerFilmII != null && !outerFilmII.isEmpty()) {
				productDevelopmentLob.setOuterFilmII(outerFilmII.getBytes());
			}
			if (innerCartonIII != null && !innerCartonIII.isEmpty()) {
				productDevelopmentLob.setInnerCartonIII(innerCartonIII.getBytes());
			}
			if (outerCartonIV != null && !outerCartonIV.isEmpty()) {
				productDevelopmentLob.setOuterCartonIV(outerCartonIV.getBytes());
			}
			if (slipSheet != null && !slipSheet.isEmpty()) {
				productDevelopmentLob.setSlipSheet(slipSheet.getBytes());
			}
			// Save the updated entity
			productLobRepo.save(productDevelopmentLob);

			return new ResponseEntity<>(new ApiResponse(true, "Images updated successfully"), HttpStatus.OK);

		} catch (IOException e) {
			return new ResponseEntity<>(new ApiResponse(false, "Error processing image files: " + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

// Service method for delete
	public ResponseEntity<?> deleteProductDevelopmentImages(String pdsNo) {
		Optional<ProductDevelopmentLob> optionalProductDevelopmentLob = productLobRepo.findByPdsNo(pdsNo);

		if (!optionalProductDevelopmentLob.isPresent()) {
			return new ResponseEntity<>(new ApiResponse(false, "PDS No not found"), HttpStatus.NOT_FOUND);
		}

		productLobRepo.delete(optionalProductDevelopmentLob.get());
		return new ResponseEntity<>(new ApiResponse(true, "PDS No " + pdsNo + " deleted successfully"), HttpStatus.OK);
	}

	public ResponseEntity<?> deleteField(String pdsNo, String fieldName) {
		Optional<ProductDevelopmentLob> productOptional = productLobRepo.findByPdsNo(pdsNo);

		if (!productOptional.isPresent()) {
			return ResponseEntity.notFound().build();
		}

		ProductDevelopmentLob product = productOptional.get();

		switch (fieldName.toUpperCase()) {
		case "INNER_FILM_I":
			product.setInnerFilmI(null);
			break;
		case "OUTER_FILM_II":
			product.setOuterFilmII(null);
			break;
		case "INNER_CARTON_III":
			product.setInnerCartonIII(null);
			break;
		case "OUTER_CARTON_IV":
			product.setOuterCartonIV(null);
			break;
		case "SLIP_SHEET":
			product.setSlipSheet(null);
			break;
		default:
			return ResponseEntity.badRequest().body("Invalid field name");
		}

		productLobRepo.save(product);
		return ResponseEntity.ok(fieldName + " deleted successfully");
	}

//public ResponseEntity<?> getProductDevelopmentByPdsNo(String pdsNo) {
//    Optional<ProductDevelopmentLob> optionalProductDevelopmentLob = productLobRepo.findByPdsNo(pdsNo);
//
//    if (!optionalProductDevelopmentLob.isPresent()) {
//        return new ResponseEntity<>(new ApiResponse(false, "PDS No not found"), HttpStatus.NOT_FOUND);
//    }
//
//    return new ResponseEntity<>(optionalProductDevelopmentLob.get(), HttpStatus.OK);
//}

	public ResponseEntity<?> getProductDevelopmentByPdsNo(String pdsNo) {
		Optional<ProductDevelopmentLob> optionalProductDevelopmentLob = productLobRepo.findByPdsNo(pdsNo);

		if (!optionalProductDevelopmentLob.isPresent()) {
			// Return a 200 OK with a message instead of 404
			return new ResponseEntity<>(new ApiResponse(true, "PDS No not found"), HttpStatus.OK);
		}

		// Return the found ProductDevelopmentLob object with a 200 OK status
		return new ResponseEntity<>(optionalProductDevelopmentLob.get(), HttpStatus.OK);
	}

//public ResponseEntity<?> submitproductDevelopment(
//		@RequestBody ProductDevelopmentSheetF001 productDevelopment, HttpServletRequest http) {
//	if (productDevelopment == null) {
//		return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
//				HttpStatus.BAD_REQUEST);
//	}
//
//	SCAUtil scaUtil = new SCAUtil();
//	Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
//	String userName = userRepository.getUserName(userId);
//	String role = sca.getUserRoleFromRequest(http, tokenProvider);
//
//	Long id = productDevelopment.getId();
//	ProductDevelopmentSheetF001 bleachObj = new ProductDevelopmentSheetF001();
//	// Get the current time
//	LocalDateTime now = LocalDateTime.now();
//	Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
//	
//
//
//	try {
//		String missingField = "";
//		if (productDevelopment.getFormat_no() == null)
//			missingField = "formatNo";
//		if (productDevelopment.getRef_sop_no() == null)
//			missingField = "sopNumber";
//		if (productDevelopment.getRevisionNo() == null)
//			missingField = "revisionNo";
//
//		if (!missingField.isEmpty()) {
//			return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields! " + missingField),
//					HttpStatus.BAD_REQUEST);
//		}
//
//		if (id != null) {
//			bleachObj = productDevelopmentRepo.fetchReceptionChecklistById(id);
//			if (bleachObj == null) {
//				return new ResponseEntity<>(new ApiResponse(false, "No records found"), HttpStatus.BAD_REQUEST);
//			}
//		}
//		productDevelopment.setCreatedAt(bleachObj.getCreatedAt());
//		productDevelopment.setCreatedBy(bleachObj.getCreatedBy());
//
//			String currentStatus = bleachObj.getDevelopmentSupervisorStatus();
////			String currentMailStatus = bleachObj.getMailStatus();
//
//			if ("DEVELOPMENT_MANAGER".equalsIgnoreCase(role)) {
//
//				
//				{
//
//					productDevelopment.setDevelopmentSupervisorStatus(AppConstantsproductdevelopment.supervisor_Submit);
//					productDevelopment.setDevelopmentSupervisorSubmitOn(date);					
//					productDevelopment.setDevelopmentSupervisorSign(userName);
//					productDevelopment.setDevelopmentSupervisorSubmitId(id);
//					productDevelopment.setDevelopmentSupervisorSubmitBy(userName);		
//					
//					productDevelopment.setQcStatus(AppConstantsproductdevelopment.waitingStatus);
//					productDevelopment.setQa_Status(AppConstantsproductdevelopment.waitingStatus);	
////					productDevelopment.setMailStatus(AppConstantStore.waitingStatus);;
//					
//					
//					
//					productDevelopmentRepo.save(productDevelopment);
//					
//
//					
//					// HISTORY
//					
//					ProductDevelopmentSheetHistoryF001 productHistory = new ProductDevelopmentSheetHistoryF001();
////			
////					    productHistory.setUnit(productDevelopment.getUnit());
////					    productHistory.setFormat(productDevelopment.getFormat());
////					    productHistory.setFormat_no(productDevelopment.getFormat_no());
////					    productHistory.setRef_sop_no(productDevelopment.getRef_sop_no());
////					    productHistory.setPdsNo(productDevelopment.getPdsNo());
////					    productHistory.setRevisionNo(productDevelopment.getRevisionNo());
////					    productHistory.setRevisionDate(productDevelopment.getRevisionDate());
////					    productHistory.setPdseffectiveDate(productDevelopment.getPdseffectiveDate());
////					    productHistory.setProductDescription(productDevelopment.getProductDescription());
////					    productHistory.setCustomerName(productDevelopment.getCustomerName());
////					    productHistory.setProductCode(productDevelopment.getProductCode());
////					    productHistory.setBrand(productDevelopment.getBrand());
////					    productHistory.setCountry(productDevelopment.getCountry());
////					    productHistory.setMixingRatio(productDevelopment.getMixingRatio());
////					    productHistory.setSampleRequisitionNo(productDevelopment.getSampleRequisitionNo());
////					    productHistory.setCustomerComment(productDevelopment.getCustomerComment());
////					    productHistory.setNatureofchange(productDevelopment.getNatureofchange());
////					    productHistory.setNotesofRequirment(productDevelopment.getNotesofRequirment());
////					    productHistory.setAlighmentofinnercarton(productDevelopment.getAlighmentofinnercarton());					
////					    productHistory.setAlighmentofpacks(productDevelopment.getAlighmentofpacks());					    
////					    productHistory.setBagseal(productDevelopment.getBagseal());		
////					    productHistory.setBarcodesticker(productDevelopment.getBarcodesticker());	
////					    productHistory.setBagseal(productDevelopment.getBagseal());		
////					    productHistory.setCartonseal(productDevelopment.getCartonseal());
////					    productHistory.setCustomerJulianCoding(productDevelopment.getCustomerJulianCoding());	
////					    productHistory.setExpiryDateOuterBag(productDevelopment.getExpiryDateOuterBag());	
////					    productHistory.setInnerburstingstrenght(productDevelopment.getInnerburstingstrenght());
////					    productHistory.setInnercartonType(productDevelopment.getInnercartonType());
////					    productHistory.setInnerboardgsm(productDevelopment.getInnerboardgsm());
////					    productHistory.setInnerdimensionOuterMm(productDevelopment.getInnerdimensionOuterMm());
////					    productHistory.setInnerflute(productDevelopment.getInnerflute());		
////					    productHistory.setInnernumberOfPly(productDevelopment.getInnernumberOfPly());
////					    productHistory.setMfgDateOuterBag(productDevelopment.getMfgDateOuterBag());			
////					    productHistory.setOrientationofpacks(productDevelopment.getOrientationofpacks());					   
////					    productHistory.setMrp(productDevelopment.getMrp());					    
////					    productHistory.setOrienatationofinnercarton(productDevelopment.getOrienatationofinnercarton());		
////					    productHistory.setOuterboardgsm(productDevelopment.getOuterboardgsm());					   
////					    productHistory.setMrp(productDevelopment.getMrp());	
////					    productHistory.setOuterburstingstrenght(productDevelopment.getOuterburstingstrenght());
////					    productHistory.setOuterboardgsm(productDevelopment.getOuterboardgsm());					  
////					    productHistory.setOuterdimensionOuterMm(productDevelopment.getOuterdimensionOuterMm());
////					    
////					    productHistory.setOuterflute(productDevelopment.getOuterflute());
////					    productHistory.setOuternumberOfPly(productDevelopment.getOuternumberOfPly());
////					    productHistory.setPlainboxsticker(productDevelopment.getPlainboxsticker());
////					    productHistory.setPlycolor1(productDevelopment.getPlycolor1());
////					    productHistory.setPlycolor2(productDevelopment.getPlycolor2());
////					    productHistory.setPlycolor3(productDevelopment.getPlycolor3());
////					    productHistory.setPoNoOuterBag(productDevelopment.getPoNoOuterBag());
////					    productHistory.setProductSize(productDevelopment.getProductSize());
////					    productHistory.setProducttolerance(productDevelopment.getProducttolerance());
////					    productHistory.setSide1Pattern(productDevelopment.getSide1Pattern());
////					    productHistory.setSide1Patterntolerance(productDevelopment.getSide1Patterntolerance());;
////					    productHistory.setSide2Pattern(productDevelopment.getSide2Pattern());
////					    productHistory.setSide2Patterntolerance(productDevelopment.getSide2Patterntolerance());
////					    productHistory.setPrintLocationOuterBag(productDevelopment.getPrintLocationOuterBag());					   
////					    
////					    
////		
////					    
////					    // Set shape and size details
////					    productHistory.setShapeSpecification(productDevelopment.getShapeSpecification());
////					    productHistory.setShapeTolerence(productDevelopment.getShapeTolerence());				    productHistory.setSize(productDevelopment.getSize());
////					    productHistory.setSizelimit(productDevelopment.getSizelimit());
////					    productHistory.setSizeMin(productDevelopment.getSizeMin());
////					    productHistory.setSizeMax(productDevelopment.getSizeMax());
////
////					    // Pack counts
////					    productHistory.setCountPerPack(productDevelopment.getCountPerPack());
////					    productHistory.setCountPerPackMin(productDevelopment.getCountPerPackMin());
////					    productHistory.setCountPerPackMax(productDevelopment.getCountPerPackMax());
////					    productHistory.setCountPerPackLimit(productDevelopment.getCountPerPackLimit());
////
////					    // Carton information
////					    productHistory.setPacksPerInnerCarton(productDevelopment.getPacksPerInnerCarton());
////					    productHistory.setPacksPerInnerCartonMin(productDevelopment.getPacksPerInnerCartonMin());
////					    productHistory.setPacksPerInnerCartonMax(productDevelopment.getPacksPerInnerCartonMax());
////					    productHistory.setPacksPerInnerCartonLimit(productDevelopment.getPacksPerInnerCartonLimit());
////					    productHistory.setInnerPerOuterCarton(productDevelopment.getInnerPerOuterCarton());
////					    productHistory.setInnerPerOuterCartonMin(productDevelopment.getInnerPerOuterCartonMin());
////					    productHistory.setInnerPerOuterCartonMax(productDevelopment.getInnerPerOuterCartonMax());
////					    productHistory.setInnerPerOuterCartonLimit(productDevelopment.getInnerPerOuterCartonLimit());
////					    productHistory.setPacksPerOuterCarton(productDevelopment.getPacksPerOuterCarton());
////					    productHistory.setPacksPerOuterCartonMin(productDevelopment.getPacksPerOuterCartonMin());
////					    productHistory.setPacksPerOuterCartonMax(productDevelopment.getPacksPerOuterCartonMax());
////					    productHistory.setPacksPerOuterCartonLimit(productDevelopment.getPacksPerOuterCartonLimit());
////
////					    // Weight details
////					    productHistory.setGsm(productDevelopment.getGsm());
////					    productHistory.setGsmLimit(productDevelopment.getGsmLimit());
////					    productHistory.setGsmMax(productDevelopment.getGsmMax());
////					    productHistory.setGsmMin(productDevelopment.getGsmMin());
////					    productHistory.setUsp(productDevelopment.getUsp());
////					    productHistory.setWeightInnerEmptyBag(productDevelopment.getWeightInnerEmptyBag());
////					    productHistory.setWeightInnerEmptyBagMin(productDevelopment.getWeightInnerEmptyBagMin());
////					    productHistory.setWeightInnerEmptyBagMax(productDevelopment.getWeightInnerEmptyBagMax());
////					    productHistory.setWeightInnerEmptyBagLimit(productDevelopment.getWeightInnerEmptyBagLimit());
////
////					    productHistory.setWeightOuterEmptyBag(productDevelopment.getWeightOuterEmptyBag());
////					    productHistory.setWeightOuterEmptyBagMin(productDevelopment.getWeightOuterEmptyBagMin());
////					    productHistory.setWeightOuterEmptyBagMax(productDevelopment.getWeightOuterEmptyBagMax());
////					    productHistory.setWeightOuterEmptyBagLimit(productDevelopment.getWeightOuterEmptyBagLimit());
////
////					    productHistory.setWeightEmptyInnerCarton(productDevelopment.getWeightEmptyInnerCarton());
////					    productHistory.setWeightEmptyInnerCartonMin(productDevelopment.getWeightEmptyInnerCartonMin());
////					    productHistory.setWeightEmptyInnerCartonMax(productDevelopment.getWeightEmptyInnerCartonMax());
////					    productHistory.setWeightEmptyInnerCartonLimit(productDevelopment.getWeightEmptyInnerCartonLimit());
////
////					    productHistory.setWeightEmptyOuterCarton(productDevelopment.getWeightEmptyOuterCarton());
////					    productHistory.setWeightEmptyOuterCartonMin(productDevelopment.getWeightEmptyOuterCartonMin());
////					    productHistory.setWeightEmptyOuterCartonMax(productDevelopment.getWeightEmptyOuterCartonMax());
////					    productHistory.setWeightEmptyOuterCartonLimit(productDevelopment.getWeightEmptyOuterCartonLimit());
////					    productHistory.setOutercartonname(productDevelopment.getOutercartonname());
////					    
////					    // Net and Gross weight details for filled packs and cartons
////					    productHistory.setNetWtFilledPack(productDevelopment.getNetWtFilledPack());
////					    productHistory.setNetWtFilledPackMin(productDevelopment.getNetWtFilledPackMin());
////					    productHistory.setNetWtFilledPackMax(productDevelopment.getNetWtFilledPackMax());
////					    productHistory.setNetWtFilledPackLimit(productDevelopment.getNetWtFilledPackLimit());
////
////					    productHistory.setGrossWtFilledPack(productDevelopment.getGrossWtFilledPack());
////					    productHistory.setGrossWtFilledPackMin(productDevelopment.getGrossWtFilledPackMin());
////					    productHistory.setGrossWtFilledPackMax(productDevelopment.getGrossWtFilledPackMax());
////					    productHistory.setGrossWtFilledPackLimit(productDevelopment.getGrossWtFilledPackLimit());
////
////					    productHistory.setNetWtFilledInnerCarton(productDevelopment.getNetWtFilledInnerCarton());
////					    productHistory.setNetWtFilledInnerCartonMin(productDevelopment.getNetWtFilledInnerCartonMin());
////					    productHistory.setNetWtFilledInnerCartonMax(productDevelopment.getNetWtFilledInnerCartonMax());
////					    productHistory.setNetWtFilledInnerCartonLimit(productDevelopment.getNetWtFilledInnerCartonLimit());
////
////					    productHistory.setGrossWtFilledInnerCarton(productDevelopment.getGrossWtFilledInnerCarton());
////					    productHistory.setGrossWtFilledInnerCartonMin(productDevelopment.getGrossWtFilledInnerCartonMin());
////					    productHistory.setGrossWtFilledInnerCartonMax(productDevelopment.getGrossWtFilledInnerCartonMax());
////					    productHistory.setGrossWtFilledInnerCartonLimit(productDevelopment.getGrossWtFilledInnerCartonLimit());
////
////					    productHistory.setNetWtFilledOuterCarton(productDevelopment.getNetWtFilledOuterCarton());
////					    productHistory.setNetWtFilledOuterCartonMin(productDevelopment.getNetWtFilledOuterCartonMin());
////					    productHistory.setNetWtFilledOuterCartonMax(productDevelopment.getNetWtFilledOuterCartonMax());
////					    productHistory.setNetWtFilledOuterCartonLimit(productDevelopment.getNetWtFilledOuterCartonLimit());
////
////					    productHistory.setGrossWtFilledOuterCarton(productDevelopment.getGrossWtFilledOuterCarton());
////					    productHistory.setGrossWtFilledOuterCartonMin(productDevelopment.getGrossWtFilledOuterCartonMin());
////					    productHistory.setGrossWtFilledOuterCartonMax(productDevelopment.getGrossWtFilledOuterCartonMax());
////					    productHistory.setGrossWtFilledOuterCartonLimit(productDevelopment.getGrossWtFilledOuterCartonLimit());
////
////					    // Packaging details
////					    productHistory.setPrimaryfilmType(productDevelopment.getPrimaryfilmType());
////					    productHistory.setPrimaryfilmThicknessMicron(productDevelopment.getPrimaryfilmThicknessMicron());
////					    productHistory.setPrimaryfilmThicknessMicronLimit(productDevelopment.getPrimaryfilmThicknessMicronLimit());
////					    productHistory.setPrimaryfilmThicknessMicronMin(productDevelopment.getPrimaryfilmThicknessMicronMin());
////					    productHistory.setPrimaryfilmThicknessMicronMax(productDevelopment.getPrimaryfilmThicknessMicronMax());
////
////					    productHistory.setPrimarybagType(productDevelopment.getPrimarybagType());
////					    productHistory.setPrimarybagDimension(productDevelopment.getPrimarybagDimension());
////					    productHistory.setFilmType(productDevelopment.getFilmType());
////					    productHistory.setFilmThicknessMicron(productDevelopment.getFilmThicknessMicron());
////					    productHistory.setFilmThicknessMicronLimit(productDevelopment.getFilmThicknessMicronLimit());
////					    productHistory.setFilmThicknessMicronMin(productDevelopment.getFilmThicknessMicronMin());
////					    productHistory.setFilmThicknessMicronMax(productDevelopment.getFilmThicknessMicronMax());
////
////					    productHistory.setBagType(productDevelopment.getBagType());
////					    productHistory.setBagDimension(productDevelopment.getBagDimension());
////					    productHistory.setInnerbag(productDevelopment.getInnerbag());
////					    productHistory.setOuterbag(productDevelopment.getOuterbag());
////					    productHistory.setInnercarton(productDevelopment.getInnercarton());
////					    productHistory.setOutercarton(productDevelopment.getOutercarton());
////					    productHistory.setBopptape(productDevelopment.getBopptape());
////					    productHistory.setJulianCodingInnerCarton(productDevelopment.getJulianCodingInnerCarton());
////					    productHistory.setPoNoInnerCarton(productDevelopment.getPoNoInnerCarton());
////					    productHistory.setMfgDateInnerCarton(productDevelopment.getMfgDateInnerCarton());
////					    productHistory.setExpiryDateInnerCarton(productDevelopment.getExpiryDateInnerCarton());
////					    productHistory.setPrintLocationInnerCarton(productDevelopment.getPrintLocationInnerCarton());
////					    productHistory.setLotCode(productDevelopment.getLotCode());
////					    productHistory.setPoNoOuterCarton(productDevelopment.getPoNoOuterCarton());
////					    productHistory.setMfgDateOuterCarton(productDevelopment.getMfgDateOuterCarton());
////					    productHistory.setExpiryDateOuterCarton(productDevelopment.getExpiryDateOuterCarton());
////					    productHistory.setPrintLocationOuterCarton(productDevelopment.getPrintLocationOuterCarton());
//
//					    // Approval details
//					    productHistory.setDevelopmentSupervisorStatus(AppConstantsproductdevelopment.supervisor_Submit);
//					    productHistory.setDevelopmentSupervisorSubmitOn(date);
//					    productHistory.setDevelopmentSupervisorSubmitBy(userName);		
//					    productHistory.setDevelopmentSupervisorSign(userName);
//					    productHistory.setDevelopmentSupervisorSubmitId(id);
//
//					    productHistory.setQcStatus(AppConstantsproductdevelopment.waitingStatus);
//					    productHistory.setQa_Status(AppConstantsproductdevelopment.waitingStatus);
//		
//					
//					
//					
////					Version
//					String 	pdsNo  = productHistory.getPdsNo();
//					
//					
//					
//					int version = productHistoryRepo.getMaximumVersion(pdsNo)
//							.map(temp -> temp + 1).orElse(1);
//
//					productHistory.setVersion(version);
//	                
//	               
//					
//					
//					
//					productHistoryRepo.save(productHistory);
//
//					try {
//
//						mailfunction.sendEmailQC01(productDevelopment);
//					} catch (Exception ex) {
//						return new ResponseEntity<>(
//								new ApiResponse(false, "DEVELOPMENT_SUPERVISOR Approved but Unable to send mail to QC Manager! "),
//								HttpStatus.OK);
//					}
//				}
//				
//				
//			} 
//
//			else {
//				return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to approve"),
//						HttpStatus.FORBIDDEN);
//			}
//
//	} catch (Exception ex) {
//		logger.error(" **** Unable to submit Save Product Development Sheet Details **** ", ex);
//		return new ResponseEntity<>(
//				new ApiResponse(false, "Unable to submit Save Product Development Sheet Details: " + ex.getMessage()),
//				HttpStatus.BAD_REQUEST);
//	}
//
//	return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"),
//			HttpStatus.OK);
//}

	public ResponseEntity<?> submitproductDevelopment(@RequestBody ProductDevelopmentSheetF001 productDevelopment,
			HttpServletRequest http) {
		if (productDevelopment == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
					HttpStatus.BAD_REQUEST);
		}

		SCAUtil scaUtil = new SCAUtil();
		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		String role = sca.getUserRoleFromRequest(http, tokenProvider);

		Long id = productDevelopment.getId();
		ProductDevelopmentSheetF001 bleachObj = new ProductDevelopmentSheetF001();
		// Get the current time
		LocalDateTime now = LocalDateTime.now();
		Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());

		try {
			String missingField = "";
			if (productDevelopment.getFormat_no() == null)
				missingField = "formatNo";
			if (productDevelopment.getRef_sop_no() == null)
				missingField = "sopNumber";
			if (productDevelopment.getRevisionNo() == null)
				missingField = "revisionNo";

			if (!missingField.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields! " + missingField),
						HttpStatus.BAD_REQUEST);
			}

			if (id != null) {
				bleachObj = productDevelopmentRepo.fetchReceptionChecklistById(id);
				if (bleachObj == null) {
					return new ResponseEntity<>(new ApiResponse(false, "No records found"), HttpStatus.BAD_REQUEST);
				}
			}
			productDevelopment.setCreatedAt(bleachObj.getCreatedAt());
			productDevelopment.setCreatedBy(bleachObj.getCreatedBy());

			String currentStatus = bleachObj.getDevelopmentSupervisorStatus();
//			String currentMailStatus = bleachObj.getMailStatus();

			if ("DEVELOPMENT_MANAGER".equalsIgnoreCase(role)) {

				{

					productDevelopment.setDevelopmentSupervisorStatus(AppConstantsproductdevelopment.supervisor_Submit);
					productDevelopment.setDevelopmentSupervisorSubmitOn(date);
					productDevelopment.setDevelopmentSupervisorSign(userName);
					productDevelopment.setDevelopmentSupervisorSubmitId(id);
					productDevelopment.setDevelopmentSupervisorSubmitBy(userName);

					productDevelopment.setQcStatus(AppConstantsproductdevelopment.waitingStatus);
					productDevelopment.setQa_Status(AppConstantsproductdevelopment.waitingStatus);
//					productDevelopment.setMailStatus(AppConstantStore.waitingStatus);;

					productDevelopmentRepo.save(productDevelopment);

					// Set the parent ID for all child entities after the parent ID is generated
					setParentIdForChildEntities(productDevelopment);

					// Save the child entities related to PlyColorProdDevF001
//			        savePlyColorDetails(productDevelopment);

					productDevelopmentRepo.save(productDevelopment);

					try {

						mailfunction.sendEmailQC01(productDevelopment);
					} catch (Exception ex) {
						return new ResponseEntity<>(
								new ApiResponse(false,
										"DEVELOPMENT_SUPERVISOR Approved but Unable to send mail to QC Manager! "),
								HttpStatus.OK);
					}
				}

			}

			else {
				return new ResponseEntity<>(new ApiResponse(false, "User role not authorized to approve"),
						HttpStatus.FORBIDDEN);
			}

		} catch (Exception ex) {
			logger.error(" **** Unable to submit Save Product Development Sheet Details **** ", ex);
			return new ResponseEntity<>(
					new ApiResponse(false,
							"Unable to submit Save Product Development Sheet Details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);
	}

	public ResponseEntity<?> approveReject(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		ProductDevelopmentSheetF001 productSheet = new ProductDevelopmentSheetF001();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);

		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {
			productSheet = productDevelopmentRepo.fetchReceptionChecklistById(approvalResponse.getId());
			ProductDevelopmentSheetHistoryF001 productHistory = new ProductDevelopmentSheetHistoryF001();

			String supervisorStatus = productSheet.getDevelopmentSupervisorStatus();
			String qcStatus = productSheet.getQcStatus();
			String qaStatus = productSheet.getQa_Status();

			if (supervisorStatus.equalsIgnoreCase(AppConstantsproductdevelopment.supervisor_Submit)
					&& qcStatus.equalsIgnoreCase(AppConstantsproductdevelopment.waitingStatus)) {

				if (userRole.equalsIgnoreCase("QC_MANAGER")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						productSheet.setQcStatus(AppConstantsproductdevelopment.QC_APPROVED);
						productSheet.setQcSubmitBy(userName);
						;
						productSheet.setQcSubmitOn(date);
						;
						productSheet.setQcSubmitId(userId);
						productSheet.setQcSign(userName);
						productSheet.setQa_Status(AppConstantsproductdevelopment.waitingStatus);
						;

						productDevelopmentRepo.save(productSheet);

//					productHistory = productHistoryRepo.fetchLastSubmittedProductDevelopmentSheet(productSheet.getPdsNo());
//		
//					
//					productHistory.setQcStatus(AppConstantsproductdevelopment.QC_APPROVED);
//					productHistory.setQcSubmitBy(userName);
//					productHistory.setQcSubmitOn(date);
//					productHistory.setQcSubmitId(userId);
//					productHistory.setQcSign(userName);
//					productHistory.setQa_Status(AppConstantsproductdevelopment.waitingStatus);

//					productHistoryRepo.save(productHistory);

						try {

							mailfunction.sendEmailQA01(productSheet);
						} catch (Exception ex) {
							return new ResponseEntity<>(
									new ApiResponse(false, "QC Approved but Unable to send mail to QA Manager! "),
									HttpStatus.OK);
						}

						return new ResponseEntity<>(new ApiResponse(true, "QC Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						productSheet.setReason(reason);
						productSheet.setQcStatus(AppConstantsproductdevelopment.QC_REJECTED);
						productSheet.setQcSubmitOn(date);
						productSheet.setQcSubmitId(userId);
						productSheet.setQcSubmitBy(userName);

						productSheet.setQcSign(userName);

						productDevelopmentRepo.save(productSheet);

//					productHistory = productHistoryRepo.fetchLastSubmittedProductDevelopmentSheet(productSheet.getPdsNo());
//					
//					String reason2 = approvalResponse.getRemarks();
//					productHistory.setReason(reason2);
//					productHistory.setQcStatus(AppConstantsproductdevelopment.QC_REJECTED);
//					productHistory.setQcSubmitOn(date);
//					productHistory.setQcSubmitId(userId);
//					productHistory.setQcSubmitBy(userName);
//					
//					
//					productHistoryRepo.save(productHistory);

						return new ResponseEntity<>(new ApiResponse(true, "QC Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}

			else if (qcStatus.equalsIgnoreCase(AppConstantsproductdevelopment.QC_APPROVED)
					&& qaStatus.equalsIgnoreCase(AppConstantsproductdevelopment.waitingStatus)) {

				if (userRole.equalsIgnoreCase("QA_MANAGER")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						productSheet.setQa_Status(AppConstantsproductdevelopment.QA_APPROVED);
						productSheet.setQa_submit_on(date);
						productSheet.setQa_submit_by(userName);
						productSheet.setQa_submit_id(userId);

						productSheet.setQa_sign(userName);
						productDevelopmentRepo.save(productSheet);

//					productHistory = productHistoryRepo.fetchLastSubmittedProductDevelopmentSheet(productSheet.getPdsNo());
//					
//					productHistory.setQa_Status(AppConstantsproductdevelopment.QA_APPROVED);
//					productHistory.setQa_submit_on(date);
//					productHistory.setQa_submit_by(userName);
//					productHistory.setQa_submit_id(userId);
//					productHistory.setQa_sign(userName);
//										
//					
//					productHistoryRepo.save(productHistory);

						return new ResponseEntity<>(new ApiResponse(true, "QA Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						productSheet.setReason(reason);
						productSheet.setQa_Status(AppConstantsproductdevelopment.QA_REJECTED);
						productSheet.setQa_submit_on(date);
						productSheet.setQa_submit_id(userId);
						productSheet.setQa_submit_by(userName);

						productSheet.setQa_sign(userName);

						productDevelopmentRepo.save(productSheet);

//					productHistory = productHistoryRepo.fetchLastSubmittedProductDevelopmentSheet(productSheet.getPdsNo());
//					
//					productHistory.setQa_Status(AppConstantsproductdevelopment.QA_REJECTED);
//					productHistory.setReason(reason);
//					productHistory.setQa_submit_on(date);
//					productHistory.setQa_submit_by(userName);
//					productHistory.setQa_submit_id(userId);
//					productHistory.setQa_sign(userName);
//					
//					productHistoryRepo.save(productHistory);
//					
						return new ResponseEntity<>(new ApiResponse(true, "QA Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid"), HttpStatus.BAD_REQUEST);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}

			else if (qcStatus.equalsIgnoreCase(AppConstantsproductdevelopment.QC_APPROVED)
					&& qaStatus.equalsIgnoreCase(AppConstantsproductdevelopment.QA_APPROVED)) {

				// Get the department ID using the user repository
				String departmentId = userRepository.getDepartmentById(userId);

//			String department = getDepartmentName(departmentId); // Get department name based on ID

				List<String> departmentIds = new ArrayList<String>();

				departmentIds = userRepository.getDepartmentByIdNew2(userId);

				if (departmentIds == null || departmentIds.isEmpty() || departmentIds.get(0) == null) {

					departmentIds = userRepository.getDepartmentByIdNew(userId);

				}

				// New logic for department approvals
				if (userRole.equalsIgnoreCase("ROLE_HOD") && approvalResponse.getStatus().equals("Approve")) {

					for (String deptId : departmentIds) {

						String department = getDepartmentName(deptId);

						switch (deptId) {

						case "1": // Bleaching
							productSheet.setBleaching_status(AppConstantsproductdevelopment.BLEACHING_APPROVED);
							productSheet.setBleaching_submit_on(date);
							productSheet.setBleaching_submit_by(userName);
							productSheet.setBleaching_submit_id(userId);
							productSheet.setBleaching_sign(userName);
							break;
						case "2": // Spunlace
							productSheet.setSpunlace_status(AppConstantsproductdevelopment.Spunlace_APPROVED);
							productSheet.setSpunlace_submit_on(date);
							productSheet.setSpunlace_submit_by(userName);
							productSheet.setSpunlace_submit_id(userId);
							productSheet.setSpunlace_sign(userName);
							break;
						case "3": // Pad Punching
							productSheet.setPad_punching_status(AppConstantsproductdevelopment.PadPunching_APPROVED);
							productSheet.setPad_punching_submit_on(date);
							productSheet.setPad_punching_submit_by(userName);
							productSheet.setPad_punching_submit_id(userId);
							productSheet.setPad_punching_sign(userName);
							break;
						case "4": // Dry Goods
							productSheet.setDry_goods_status(AppConstantsproductdevelopment.DryGoods_APPROVED);
							productSheet.setDry_goods_submit_on(date);
							productSheet.setDry_goods_submit_by(userName);
							productSheet.setDry_goods_submit_id(userId);
							productSheet.setDry_goods_sign(userName);
							break;
						case "7": // PPC
							productSheet.setPpc_status(AppConstantsproductdevelopment.PPC_APPROVED);
							productSheet.setPpc_submit_on(date);
							productSheet.setPpc_submit_by(userName);
							productSheet.setPpc_submit_id(userId);
							productSheet.setPpc_sign(userName);
							break;
						default:
							return new ResponseEntity<>(new ApiResponse(false, "Invalid Department ID"),
									HttpStatus.BAD_REQUEST);
						}

						productDevelopmentRepo.save(productSheet);

					}

//				productHistory = productHistoryRepo
//						.fetchLastSubmittedProductDevelopmentSheet(productSheet.getPdsNo());
//				// Update history for the respective department as well
//				switch (departmentId) {
//				case "1": // Bleaching
//					productHistory.setBleaching_status(AppConstantsproductdevelopment.BLEACHING_APPROVED);
//					productHistory.setBleaching_submit_on(date);
//					productHistory.setBleaching_submit_by(userName);
//					productHistory.setBleaching_submit_id(userId);
//					productHistory.setBleaching_sign(userName);
//					break;
//				case "2": // Spunlace
//					productHistory.setSpunlace_status(AppConstantsproductdevelopment.Spunlace_APPROVED);
//
//					productHistory.setSpunlace_submit_on(date);
//					productHistory.setSpunlace_submit_by(userName);
//					productHistory.setSpunlace_submit_id(userId);
//					productHistory.setSpunlace_sign(userName);
//					break;
//				case "3": // Pad Punching
//					productHistory.setPad_punching_status(AppConstantsproductdevelopment.PadPunching_APPROVED);
//
//					productHistory.setPad_punching_submit_on(date);
//					productHistory.setPad_punching_submit_by(userName);
//					productHistory.setPad_punching_submit_id(userId);
//					productHistory.setPad_punching_sign(userName);
//					break;
//				case "4": // Dry Goods
//					productHistory.setDry_goods_status(AppConstantsproductdevelopment.DryGoods_APPROVED);
//					productHistory.setDry_goods_submit_on(date);
//					productHistory.setDry_goods_submit_by(userName);
//					productHistory.setDry_goods_submit_id(userId);
//					productHistory.setDry_goods_sign(userName);
//
//					break;
//				case "7": // PPC
//					productHistory.setPpc_status(AppConstantsproductdevelopment.PPC_APPROVED);
//					productHistory.setPpc_submit_on(date);
//					productHistory.setPpc_submit_by(userName);
//					productHistory.setPpc_submit_id(userId);
//					productHistory.setPpc_sign(userName);
//					break;
//				}
//				productHistoryRepo.save(productHistory);

//            return new ResponseEntity<>(new ApiResponse(true, "Department Approved Successfully"), HttpStatus.OK);

//				String departmentApproved = getDepartmentName(departmentIds);

					List<String> approvedDepartments = new ArrayList<>();

					for (String deptId : departmentIds) {

						String deptName = getDepartmentName(deptId);

						approvedDepartments.add(deptName);

					}

					// Fetch the department name based on
					// the department ID
					return new ResponseEntity<>(
							new ApiResponse(true, approvedDepartments + " Department HOD Approved Successfully"),
							HttpStatus.OK);

				} else {
					return new ResponseEntity<>(new ApiResponse(false, "Invalid Approval Status or User Role"),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Supervisor Not yet Submitted"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {
			String msg = e.getMessage();
			log.error("Unable to Approve Record: " + msg);
			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to approve/reject  Product Development Sheet Record: " + msg),
					HttpStatus.BAD_REQUEST);
		}

	}

	private String getDepartmentName(String departmentId) {
		switch (departmentId) {
		case "1":
			return "Bleaching";
		case "2":
			return "Spunlace";
		case "3":
			return "Pad Punching";
		case "4":
			return "Dry Goods";
		case "7":
			return "PPC";
		default:
			return "Unknown Department";
		}
	}

	public ResponseEntity<?> getProductDevelopment(String pdsNo) {
		List<ProductDevelopmentSheetF001> ProductDevelopment = new ArrayList<>();
		try {
			ProductDevelopment = productDevelopmentRepo.findByProductDevelopment(pdsNo);
		} catch (Exception ex) {
			String msg = ex.getMessage();
			ex.printStackTrace();
			logger.error("Unable to get Product Development Sheet List: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to get Product Development Sheet List: " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(ProductDevelopment, HttpStatus.OK);
	}

	public ResponseEntity<?> ProductDevelopmentprint(String pdsNo) {
		List<ProductDevelopmentSheetF001> ProductDevelopment = new ArrayList<>();
		try {
			ProductDevelopment = productDevelopmentRepo.findByProductDevelopmentPrint(pdsNo);
		} catch (Exception ex) {
			String msg = ex.getMessage();
			ex.printStackTrace();
			logger.error("Unable to get Product Development Sheet List: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to get Product Development Sheet List: " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(ProductDevelopment, HttpStatus.OK);
	}

//public ResponseEntity<?> getProductDevelopmentSummary() {
//
//    String userRole = getUserRole();
//
//    List<ProductDevelopmentSheetF001> ProductDevelopmentSheet = new ArrayList<>();
//
//    try {
//
//        if (userRole.equals("DEVELOPMENT_SUPERVISOR")) {
//
//            ProductDevelopmentSheet = productDevelopmentRepo.ProductDevelopmentforAssistant();
//
//        } else if (userRole.equals("QC_MANAGER") || userRole.equals("QA_MANAGER") || userRole.equals("ROLE_HOD")) {
//
//            ProductDevelopmentSheet = productDevelopmentRepo.ProductDevelopmentforHod();
//
//        } else {
//            return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to access Product Development Sheet form"), HttpStatus.BAD_REQUEST);
//        }
//
//        return new ResponseEntity(ProductDevelopmentSheet, HttpStatus.OK);
//    } catch (Exception ex) {
//        String msg = ex.getMessage();
//        ex.printStackTrace();
//        logger.error("Unable to get summary record" + msg);
//        return new ResponseEntity(
//                new ApiResponse(false, "Failed to get  Product Development summary record" + msg),
//                HttpStatus.BAD_REQUEST);
//    }
//
//}

	public ResponseEntity<?> getProductDevelopmentSummary() {

		String userRole = getUserRole();

		List<ProductDevelopmentSheetF001> ProductDevelopmentSheet = new ArrayList<>();

		try {
			if (userRole.equals("DEVELOPMENT_MANAGER")) {
				ProductDevelopmentSheet = productDevelopmentRepo.findProductDevelopmentForSupervisor();

			} else if (userRole.equals("QC_MANAGER") || userRole.equals("QA_MANAGER")) {
				ProductDevelopmentSheet = productDevelopmentRepo.findProductDevelopmentForQAandQC();

			} else if (userRole.equals("ROLE_HOD")) {
				ProductDevelopmentSheet = productDevelopmentRepo.findProductDevelopmentForHod();

			} else {
				return new ResponseEntity(
						new ApiResponse(false, userRole + " not authorized to access Product Development Sheet form"),
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity(ProductDevelopmentSheet, HttpStatus.OK);
		} catch (Exception ex) {
			String msg = ex.getMessage();
			ex.printStackTrace();
			logger.error("Unable to get summary record" + msg);
			return new ResponseEntity(new ApiResponse(false, "Failed to get  Product Development summary record" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<String> pdsnoGeneration() {
		try {
			// Fetch the last gate pass number
			String lastGatePassNo = productDevelopmentRepo.findpdsnoGeneration();

			// If no gate pass is found, return the default value
			if (lastGatePassNo == null) {
				return ResponseEntity.ok("24-25/PDS/000000");
			}

			// If gate pass exists, return the last found gate pass number
			return ResponseEntity.ok(lastGatePassNo);

		} catch (Exception ex) {
			String msg = ex.getMessage();
			log.error("**** Unable to retrieve Gate Pass **** " + ex);
			return new ResponseEntity<>("Error: " + msg, HttpStatus.BAD_REQUEST);
		}
	}

	public List<String> getAllPdsNo() {
		return productDevelopmentRepo.findAllPdsNo();
	}

//---------------------------------------------------- AUDIT -------------------

	public ResponseEntity<?> getAuditSummary(ProductDevelopmentAuditRequest summeryrequest) {
		List<ProductDevelopmentSheetHistoryF001> summaryF001;

		try {
			String department = summeryrequest.getDepartment();
			String formName = summeryrequest.getForm_name();

			// F003

			if (AppConstantsproductdevelopment.departmentName.equals(department)
					&& AppConstantsproductdevelopment.F001.equalsIgnoreCase(formName)) {
				logger.info("Department: {}", department);
				logger.info("Form Name: {}", formName);

				if (summeryrequest == null) {
					return new ResponseEntity<>(new ApiResponse(false, "Request is null"), HttpStatus.BAD_REQUEST);
				}

				String fromDateStr = summeryrequest.getFrom_date();
				String toDateStr = summeryrequest.getTo_date();
				String PdsNO = summeryrequest.getPdsNo();

				logger.info("From Date: {}", fromDateStr);
				logger.info("To Date: {}", toDateStr);
				logger.info("PDSNo No: {}", PdsNO);

				logger.info("Query Parameters: fromDate={}, toDate={}, pdsNo={}", fromDateStr, toDateStr, PdsNO);

				LocalDate fromDate = null;
				LocalDate toDate = null;

				// Convert string dates to LocalDate
				try {
					DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd");
					fromDate = fromDateStr.isEmpty() ? null : LocalDate.parse(fromDateStr, dateFormat);
					toDate = toDateStr.isEmpty() ? null : LocalDate.parse(toDateStr, dateFormat);
				} catch (DateTimeParseException e) {
					logger.error("Date parsing error: {}", e.getMessage());
					return new ResponseEntity<>(new ApiResponse(false, "Invalid date format"), HttpStatus.BAD_REQUEST);
				}

				List<ProductDevelopmentSheetHistoryF001> summaryF01 = productHistoryRepo.findByParams001(fromDate,
						toDate, PdsNO.isEmpty() ? null : PdsNO // Pass null if pdsNo is empty
				);

				logger.info("productHistoryRepo: {}", summaryF01);

				if (summaryF01 != null && !summaryF01.isEmpty()) {
					ByteArrayResource resource = ProductDevelopmenetExcelUtill.generateF001Excel(summaryF01);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=ProductDevelopmentSheetF001.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			else {
				return new ResponseEntity<>(new ApiResponse(false, "Invalid department or form name"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {
			logger.error("*** Unable to Get Audit History ***", e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "*** Unable to Get Audit History ***" + msg),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<String> lastnomenclature() {
		try {
			// Fetch the last gate pass number
			String lastnomenclature = productDevelopmentRepo.findlastnomenclature();

			// If no gate pass is found, return the default value
			if (lastnomenclature == null) {
				return ResponseEntity.ok("Nomenclature - \"YY indicates last 2 digits of year of manufacture;"
						+ " JJJ indicates manufacturing date"
						+ " in 3 digit Julian code; S indicates Shift of production;"
						+ " 560 is last 3 digit of vendor code(141560); " + "MM indicate month of mfg. in 2 digits.");
			}

			// If gate pass exists, return the last found gate pass number
			return ResponseEntity.ok(lastnomenclature);

		} catch (Exception ex) {
			String msg = ex.getMessage();
			log.error("**** Unable to retrieve Gate Pass **** " + ex);
			return new ResponseEntity<>("Error: " + msg, HttpStatus.BAD_REQUEST);
		}
	}

	public Map<String, Object> getProductImages(ProductDevelopmentLob productDevelopmentLob) {
		Map<String, Object> imageResponse = new HashMap<>();
		imageResponse.put("innerFilmI", processBlobSafely(productDevelopmentLob.getInnerFilmI()));
		imageResponse.put("outerFilmII", processBlobSafely(productDevelopmentLob.getOuterFilmII()));
		imageResponse.put("innerCartonIII", processBlobSafely(productDevelopmentLob.getInnerCartonIII()));
		imageResponse.put("outerCartonIV", processBlobSafely(productDevelopmentLob.getOuterCartonIV()));
		imageResponse.put("slipSheet", processBlobSafely(productDevelopmentLob.getSlipSheet()));
		return imageResponse;
	}

//private Object processBlob(byte[] blobData) {
//    if (blobData == null) {
//        return null;
//    }
//
//    try {
//        // Check if the blob is a PDF
//        if (isPdf(blobData)) {
//            return extractImagesFromPdf(blobData);
//        } else {
//            // Treat as a normal image and return as Base64
//            return Base64.getEncoder().encodeToString(blobData);
//        }
//    } catch (Exception e) {
//        throw new RuntimeException("Error processing BLOB: " + e.getMessage(), e);
//    }
//}

	private Object processBlobSafely(byte[] blobData) {
		if (blobData == null) {
			return null;
		}

		// Limit size to 50 MB
		final int MAX_ALLOWED_SIZE = 50 * 1024 * 1024; // 50 MB
		if (blobData.length > MAX_ALLOWED_SIZE) {
			throw new RuntimeException("File size exceeds the allowable limit of 50 MB.");
		}

		try {
			if (isPdf(blobData)) {
				return extractImagesFromPdf(blobData);
			} else {
				return Base64.getEncoder().encodeToString(blobData);
			}
		} catch (Exception e) {
			throw new RuntimeException("Error processing BLOB: " + e.getMessage(), e);
		}
	}

	private boolean isPdf(byte[] data) {
		String header = new String(data, 0, Math.min(data.length, 4)); // Check first 4 bytes
		return header.startsWith("%PDF");
	}

	private List<String> extractImagesFromPdf(byte[] pdfBytes) {
		List<String> base64Images = new ArrayList<>();
		try (PDDocument document = PDDocument.load(new ByteArrayInputStream(pdfBytes))) {
			PDFRenderer pdfRenderer = new PDFRenderer(document);
			for (int page = 0; page < document.getNumberOfPages(); page++) {
				BufferedImage image = pdfRenderer.renderImageWithDPI(page, 300);
				ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
				ImageIO.write(image, "png", outputStream);
				base64Images.add(Base64.getEncoder().encodeToString(outputStream.toByteArray()));
			}
		} catch (Exception e) {
			throw new RuntimeException("Error extracting images from PDF: " + e.getMessage(), e);
		}
		return base64Images;
	}

}
