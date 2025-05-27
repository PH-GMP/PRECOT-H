package com.focusr.Precot.mssql.database.service.padpunching;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.focusr.Precot.mssql.database.model.UserImageDetails;
import com.focusr.Precot.mssql.database.model.padpunching.ProcessProductControlDetailsLineF014;
import com.focusr.Precot.mssql.database.model.padpunching.ProductionDetailLogBook01;
import com.focusr.Precot.mssql.database.model.padpunching.ProductionDetailLogBookLines01;
import com.focusr.Precot.mssql.database.model.padpunching.ProductionDetailsLogBook01;
import com.focusr.Precot.mssql.database.model.padpunching.audit.ProcessProductControlDetailsLineHistoryF014;
import com.focusr.Precot.mssql.database.model.padpunching.audit.ProductionDetailLogBookHistory01;
import com.focusr.Precot.mssql.database.model.padpunching.audit.ProductionDetailLogBookLinesHistory01;
import com.focusr.Precot.mssql.database.model.padpunching.audit.ProductionDetailsLogBookHistory01;
import com.focusr.Precot.mssql.database.repository.UserImageDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.padpunching.ProductionDetailLogBook01Repo;
import com.focusr.Precot.mssql.database.repository.padpunching.ProductionDetailLogBookLines01Repo;
import com.focusr.Precot.mssql.database.repository.padpunching.ProductionDetailsLogBook01Repo;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.ProductionDetailLogBookHistoryRepository01;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.ProductionDetailLogBookLinesHistoryRepository01;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.ProductionDetailsLogBook01HistoryRepo;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.padpunching.PadPunchingMailFunction;

@Service
public class PunchingService2 {

	Logger logger = LoggerFactory.getLogger(PunchingService2.class);

	SCAUtil sca = new SCAUtil();

	@Autowired
	JwtTokenProvider tokenProvider;

	@Autowired
	private SCAUtil scaUtil;

	@Autowired
	private UserImageDetailsRepository imageRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ProductionDetailsLogBook01Repo productionDetailsLogBook01Repo;

	@Autowired
	private ProductionDetailsLogBook01HistoryRepo productionDetailsLogBook01HistoryRepo;

	@Autowired
	private PadPunchingMailFunction padPunchingMailFunction;

	@Autowired
	private ProductionDetailLogBook01Repo productionDetailLogBook01Repo;

	@Autowired
	private ProductionDetailLogBookLines01Repo productionDetailLogBookLines01Repo;

	@Autowired
	private ProductionDetailLogBookHistoryRepository01 productionDetailLogBookHistoryRepository01;

	@Autowired
	private ProductionDetailLogBookLinesHistoryRepository01 productionDetailLogBookLinesHistoryRepository01;

	// ****** --> PRODUCTION DETAILS F01***********

//	public ResponseEntity<?> saveProductionDetails(ProductionDetailsLogBook01 productionDetails,
//			HttpServletRequest http) {
//
//		ProductionDetailsLogBook01 punchingExistingObj;
//
//		try {
//
//			String userRole = getUserRole();
//			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//			String userName = userRepository.getUserName(userId);
//			LocalDateTime currentDate = LocalDateTime.now();
//			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//			Long id = productionDetails.getProd_id();
//
//			if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {
//
//				if (id != null) {
//
//					punchingExistingObj = productionDetailsLogBook01Repo.productionDetailsById(id);
//
//					productionDetails.setCreatedAt(punchingExistingObj.getCreatedAt());
//					productionDetails.setCreatedBy(punchingExistingObj.getCreatedBy());
//				}
//
//				productionDetails.setSupervisor_status(AppConstants.supervisorSave);
//				productionDetails.setSupervisor_sign(userName);
//				productionDetails.setSupervisor_save_by(userName);
//				productionDetails.setSupervisor_save_id(userId);
//				productionDetails.setSupervisor_save_on(date);
//
//				productionDetailsLogBook01Repo.save(productionDetails);
//
//			} else {
//				return new ResponseEntity(
//						new ApiResponse(false, userRole + " not authroized to save product change over form !!!"),
//						HttpStatus.BAD_REQUEST);
//			}
//
//		} catch (Exception ex) {
//
//			String msg = ex.getMessage();
//			logger.error("Unable to Save Production details " + msg);
//			ex.printStackTrace();
//
//			return new ResponseEntity(new ApiResponse(false, "Failed to Save Production Details" + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//
//		return new ResponseEntity(productionDetails, HttpStatus.OK);
//
//	}
//
//	public ResponseEntity<?> submitProductionDetails(ProductionDetailsLogBook01 productionDetails,
//			HttpServletRequest http) {
//
//		ProductionDetailsLogBook01 productionExistingObj;
//
//		try {
//
//			String userRole = getUserRole();
//			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//			String userName = userRepository.getUserName(userId);
//			LocalDateTime currentDate = LocalDateTime.now();
//			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//			Long id = productionDetails.getProd_id();
//
//			if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {
//
//				if (id != null) {
//					productionExistingObj = productionDetailsLogBook01Repo.productionDetailsById(id);
//
//					productionDetails.setCreatedAt(productionExistingObj.getCreatedAt());
//					productionDetails.setCreatedBy(productionExistingObj.getCreatedBy());
//
//					productionDetails.setSupervisor_save_by(productionExistingObj.getSupervisor_save_by());
//					productionDetails.setSupervisor_save_id(productionExistingObj.getSupervisor_save_id());
//					productionDetails.setSupervisor_save_on(productionExistingObj.getSupervisor_save_on());
//				}
//
//				productionDetails.setSupervisor_status(AppConstants.supervisorApprovedStatus);
//				productionDetails.setSupervisor_sign(userName);
//				productionDetails.setSupervisor_submit_id(userId);
//				productionDetails.setSupervisor_submit_by(userName);
//				productionDetails.setSupervisor_submit_on(date);
//
//				productionDetails.setHod_status(AppConstants.waitingStatus);
//
//				// SAVE IMAGE
//
////				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
////				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
////				productionDetails.setSupervisor_signature_image(signature);
//
//				productionDetailsLogBook01Repo.save(productionDetails);
//
//				// SAVE HISTORY
//
//				ProductionDetailsLogBookHistory01 productionDetailsHistoryF01 = new ProductionDetailsLogBookHistory01();
//
//				BeanUtils.copyProperties(productionDetails, productionDetailsHistoryF01, "prod_id");
//
//				// SET VERSION BASED ON UNIQUE FIELDS
//
//				String historyDate = productionDetailsHistoryF01.getDate();
//				String historyShift = productionDetailsHistoryF01.getShift();
//
//				int version = productionDetailsLogBook01HistoryRepo.getMaximumVersion(historyDate, historyShift)
//						.map(temp -> temp + 1).orElse(1);
//
//				System.out.println("Version" + version);
//
//				productionDetailsHistoryF01.setVersion(version);
//
//				productionDetailsLogBook01HistoryRepo.save(productionDetailsHistoryF01);
//
////				Mail logic
//
////				try {
////
////					padPunchingMailFunction.sendEmailToHodF001(productionDetails);
////				} catch (Exception ex) {
////					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
////							HttpStatus.OK);
////				}
//
//			} else {
//				return new ResponseEntity(
//						new ApiResponse(false, userRole + " not authroized to Submit production detail form !!!"),
//						HttpStatus.BAD_REQUEST);
//			}
//
//		} catch (Exception ex) {
//
//			String msg = ex.getMessage();
//			logger.error("Unable to Submit Product Change over" + msg);
//			ex.printStackTrace();
//
//			return new ResponseEntity(new ApiResponse(false, "Failed to Submit Product Change over" + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//
//		return new ResponseEntity(productionDetails, HttpStatus.OK);
//
//	}

	public ResponseEntity<?> getProductDetailsbyUniquefield(String date, String shift) {

		ProductionDetailLogBook01 productionDetailsLogBook01;

		try {
			productionDetailsLogBook01 = productionDetailLogBook01Repo.productionDetailsByDateShift(date, shift);

			if (productionDetailsLogBook01 == null) {
				return new ResponseEntity(new ApiResponse(false, "No Records Found"), HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Get Production Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to Get Production Details" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(productionDetailsLogBook01, HttpStatus.OK);

	}

	// APPROVE OR REJECT

	public ResponseEntity<?> approveRejectProdDetails(ApproveResponse approveResponse, HttpServletRequest http) {

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {
			ProductionDetailLogBook01 productionDetailsF01 = productionDetailLogBook01Repo
					.productionDetailsById(approveResponse.getId());

			ProductionDetailLogBookHistory01 productionDetailHistoryF03 = new ProductionDetailLogBookHistory01();

			String supervisorStatus = productionDetailsF01.getSupervisor_status();

			String hodStatus = productionDetailsF01.getHod_status();

			if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

				if (supervisorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
						&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

					if (approveResponse.getStatus().equalsIgnoreCase("Approve")) {
						productionDetailsF01.setHod_status(AppConstants.hodApprovedStatus);
						productionDetailsF01.setHod_submit_by(userName);
						productionDetailsF01.setHod_submit_id(userId);
						productionDetailsF01.setHod_submit_on(date);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);

//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						productionDetailsF01.setHod_signature_image(signature);

						productionDetailsF01.setHod_sign(userName);

						productionDetailLogBook01Repo.save(productionDetailsF01);

						// HISTORY
						productionDetailHistoryF03 = productionDetailLogBookHistoryRepository01.fetchLastSubmittedRecord(
								productionDetailsF01.getDate(), productionDetailsF01.getShift());
						productionDetailHistoryF03.setHod_status(AppConstants.hodApprovedStatus);
						productionDetailHistoryF03.setHod_submit_on(date);
						productionDetailHistoryF03.setHod_submit_by(userName);
						productionDetailHistoryF03.setHod_submit_id(userId);
						productionDetailHistoryF03.setHod_sign(userName);

						productionDetailLogBookHistoryRepository01.save(productionDetailHistoryF03);

						return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);

					} else if (approveResponse.getStatus().equalsIgnoreCase("Reject")) {
						
						productionDetailsF01.setReason(approveResponse.getRemarks());
						productionDetailsF01.setHod_status(AppConstants.hodRejectedStatus);
						productionDetailsF01.setHod_submit_by(userName);
						productionDetailsF01.setHod_submit_id(userId);
						productionDetailsF01.setHod_submit_on(date);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);

//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						productionDetailsF01.setHod_signature_image(signature);

						productionDetailsF01.setHod_sign(userName);

						productionDetailsF01.setReason(approveResponse.getRemarks());

						productionDetailLogBook01Repo.save(productionDetailsF01);

						// HISTORY
						productionDetailHistoryF03 = productionDetailLogBookHistoryRepository01.fetchLastSubmittedRecord(
								productionDetailsF01.getDate(), productionDetailsF01.getShift());
						productionDetailHistoryF03.setHod_status(AppConstants.hodRejectedStatus);
						productionDetailHistoryF03.setHod_submit_on(date);
						productionDetailHistoryF03.setHod_submit_by(userName);
						productionDetailHistoryF03.setHod_submit_id(userId);
						productionDetailHistoryF03.setHod_sign(userName);
						productionDetailHistoryF03.setReason(approveResponse.getRemarks());

						productionDetailLogBookHistoryRepository01.save(productionDetailHistoryF03);

						return new ResponseEntity<>(new ApiResponse(true, "HOD Rejected Successfully"), HttpStatus.OK);
					}

				} else {
					return new ResponseEntity<>(new ApiResponse(false, "Please check Supervisor is Approved or not"),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " Not authorized to approve form !!!"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to Get Production Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to Get Production Details Summary Details: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return null;
	}

	// FOR PRINT F01

	public ResponseEntity<?> fetchPrint(String date, String shift) {
		List<ProductionDetailLogBook01> productionDetailsF01List = new ArrayList<>();
		try {

			productionDetailsF01List = productionDetailLogBook01Repo.productionDetailsPrint(date, shift);
		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Get Production Summary Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to Get Production Summary Details" + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(productionDetailsF01List, HttpStatus.OK);
	}

	public ResponseEntity<?> getSummaryF01() {

		List<ProductionDetailLogBook01> productionDetailsF01List = new ArrayList<>();

		try {
			String userRole = getUserRole();

			if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {

				productionDetailsF01List = productionDetailLogBook01Repo.supervisorSummary();

			} else if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

				productionDetailsF01List = productionDetailLogBook01Repo.hodSummary();
			} else {
				return new ResponseEntity(new ApiResponse(false, userRole + " Not authorized to access form !!!"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Get Product Change over Summary Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(
					new ApiResponse(false, "Failed to Get Product Change over  Summary Details" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(productionDetailsF01List, HttpStatus.OK);
	}

//	SERVICE

	// ONE TO MANY

	public ResponseEntity<?> saveProdDetails(ProductionDetailLogBook01 productionDetails, HttpServletRequest http) {

		ProductionDetailLogBook01 punchingExistingObj;

		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = productionDetails.getProd_id();

			if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {

				if (id != null) {

					punchingExistingObj = productionDetailLogBook01Repo.productionDetailsById(id);

					productionDetails.setCreatedAt(punchingExistingObj.getCreatedAt());
					productionDetails.setCreatedBy(punchingExistingObj.getCreatedBy());

					List<ProductionDetailLogBookLines01> lines = productionDetails.getDetails();

					if (lines != null || !lines.isEmpty()) {

						for (ProductionDetailLogBookLines01 lineList : lines) {

							Long lineId = lineList.getLineId();

							if (lineId != null) {

								ProductionDetailLogBookLines01 existingObj = productionDetailLogBookLines01Repo
										.getLinesById(lineId);

								lineList.setProd_id(existingObj.getProd_id());
								lineList.setCreatedAt(existingObj.getCreatedAt());
								lineList.setCreatedBy(existingObj.getCreatedBy());

							}

							productionDetailLogBookLines01Repo.save(lineList);

						}

					}
				}

				productionDetails.setSupervisor_status(AppConstants.supervisorSave);
//				productionDetails.setSupervisor_sign(userName);
				productionDetails.setSupervisor_save_by(userName);
				productionDetails.setSupervisor_save_id(userId);
				productionDetails.setSupervisor_save_on(date);

				productionDetailLogBook01Repo.save(productionDetails);

				List<ProductionDetailLogBookLines01> lineDetailsF01 = productionDetails.getDetails();

				for (ProductionDetailLogBookLines01 prodLines : lineDetailsF01) {

					Long lineId = prodLines.getLineId();

					if (lineId != null) {

						ProductionDetailLogBookLines01 existingObj = productionDetailLogBookLines01Repo
								.getLinesById(lineId);

						prodLines.setProd_id(existingObj.getProd_id());
						prodLines.setCreatedAt(existingObj.getCreatedAt());
						prodLines.setCreatedBy(existingObj.getCreatedBy());

					}

					productionDetailLogBookLines01Repo.save(prodLines);
				}

			} else {
				return new ResponseEntity(
						new ApiResponse(false, userRole + " not authroized to save product change over form !!!"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save Production details " + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to Save Production Details" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(productionDetails, HttpStatus.OK);

	}

	// SUBMIT ONE TO MANY

	public ResponseEntity<?> submitProdDetails(ProductionDetailLogBook01 productionDetails, HttpServletRequest http) {

		ProductionDetailLogBook01 punchingExistingObj;

		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = productionDetails.getProd_id();

			if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {

				if (id != null) {

					punchingExistingObj = productionDetailLogBook01Repo.productionDetailsById(id);

					productionDetails.setCreatedAt(punchingExistingObj.getCreatedAt());
					productionDetails.setCreatedBy(punchingExistingObj.getCreatedBy());

					productionDetails.setSupervisor_save_by(punchingExistingObj.getSupervisor_save_by());
					productionDetails.setSupervisor_save_id(punchingExistingObj.getSupervisor_save_id());
					productionDetails.setSupervisor_save_on(punchingExistingObj.getSupervisor_save_on());

					List<ProductionDetailLogBookLines01> lines = productionDetails.getDetails();

					if (lines != null || !lines.isEmpty()) {

						for (ProductionDetailLogBookLines01 lineList : lines) {

							Long lineId = lineList.getLineId();

							if (lineId != null) {

								ProductionDetailLogBookLines01 existingObj = productionDetailLogBookLines01Repo
										.getLinesById(lineId);

								lineList.setProd_id(existingObj.getProd_id());
								lineList.setCreatedAt(existingObj.getCreatedAt());
								lineList.setCreatedBy(existingObj.getCreatedBy());

							}

							productionDetailLogBookLines01Repo.save(lineList);

						}

					}
				}

				productionDetails.setSupervisor_status(AppConstants.supervisorApprovedStatus);
				productionDetails.setSupervisor_sign(userName);
				productionDetails.setSupervisor_submit_id(userId);
				productionDetails.setSupervisor_submit_by(userName);
				productionDetails.setSupervisor_submit_on(date);

				productionDetails.setHod_status(AppConstants.waitingStatus);

				productionDetailLogBook01Repo.save(productionDetails);

				List<ProductionDetailLogBookLines01> lineDetailsF01 = productionDetails.getDetails();

				for (ProductionDetailLogBookLines01 prodLines : lineDetailsF01) {

					prodLines.setProd_id(productionDetails.getProd_id());

//					Long lineId = prodLines.getLineId();
//
//					if (lineId != null) {
//
//						ProductionDetailLogBookLines01 existingObj = productionDetailLogBookLines01Repo
//								.getLinesById(lineId);
//
//						prodLines.setProd_id(existingObj.getProd_id());
//						prodLines.setCreatedAt(existingObj.getCreatedAt());
//						prodLines.setCreatedBy(existingObj.getCreatedBy());
//
//					}

					productionDetailLogBookLines01Repo.save(prodLines);
				}

				// SAVE HISTORY

				ProductionDetailLogBookHistory01 productChangeOverHistoryF03 = new ProductionDetailLogBookHistory01();

				productChangeOverHistoryF03.setUnit(productionDetails.getUnit());
				productChangeOverHistoryF03.setFormatName(productionDetails.getFormatName());
				productChangeOverHistoryF03.setFormatNo(productionDetails.getFormatNo());
				productChangeOverHistoryF03.setRevisionNo(productionDetails.getRevisionNo());
				productChangeOverHistoryF03.setRefSopNo(productionDetails.getRefSopNo());
				productChangeOverHistoryF03.setDate(productionDetails.getDate());
				productChangeOverHistoryF03.setShift(productionDetails.getShift());
				
				productChangeOverHistoryF03.setTakeover_supervisor_sign(productionDetails.getTakeover_supervisor_sign());
				productChangeOverHistoryF03.setTakeOverSupervisorDate(productionDetails.getTakeOverSupervisorDate());
				
				productChangeOverHistoryF03.setPh_male_emp_req(productionDetails.getPh_male_emp_req());
				productChangeOverHistoryF03.setPh_male_present(productionDetails.getPh_male_present());
				productChangeOverHistoryF03.setPh_female_emp_req(productionDetails.getPh_female_emp_req());
				productChangeOverHistoryF03.setPh_female_present(productionDetails.getPh_female_present());
				productChangeOverHistoryF03.setCont_male_emp_req(productionDetails.getCont_male_emp_req());
				productChangeOverHistoryF03.setCon_male_present(productionDetails.getCon_male_present());
				productChangeOverHistoryF03.setCon_female_emp_req(productionDetails.getCon_female_emp_req());
				productChangeOverHistoryF03.setCon_female_present(productionDetails.getCon_female_present());
				productChangeOverHistoryF03.setRemarks(productionDetails.getRemarks());

				// STATUS
				productChangeOverHistoryF03.setSupervisor_status(productionDetails.getSupervisor_status());
				productChangeOverHistoryF03.setSupervisor_sign(productionDetails.getSupervisor_sign());
				productChangeOverHistoryF03.setSupervisor_submit_by(productionDetails.getSupervisor_submit_by());
				productChangeOverHistoryF03.setSupervisor_submit_id(productionDetails.getSupervisor_submit_id());
				productChangeOverHistoryF03.setSupervisor_submit_on(productionDetails.getSupervisor_submit_on());
				productChangeOverHistoryF03.setHod_status(productionDetails.getHod_status());

				String historyDate = productChangeOverHistoryF03.getDate();
				String historyShift = productChangeOverHistoryF03.getShift();

//				System.out.println("history date" + historyDate + historyShift);

				int version = productionDetailLogBookHistoryRepository01.getMaximumVersion(historyDate, historyShift)
						.map(temp -> temp + 1).orElse(1);

				productChangeOverHistoryF03.setVersion(version);

				productionDetailLogBookHistoryRepository01.save(productChangeOverHistoryF03);

				List<ProductionDetailLogBookLines01> historyMapList = productionDetails.getDetails();

				for (ProductionDetailLogBookLines01 obj : historyMapList) {

					ProductionDetailLogBookLinesHistory01 objHistory = new ProductionDetailLogBookLinesHistory01();

					BeanUtils.copyProperties(obj, objHistory);
					objHistory.setHistory_id(productChangeOverHistoryF03.getHistory_id());
					productionDetailLogBookLinesHistoryRepository01.save(objHistory);

				}

				productionDetailLogBookHistoryRepository01.save(productChangeOverHistoryF03);

				try {

					padPunchingMailFunction.sendEmailToHodF001(productionDetails);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
							HttpStatus.OK);
				}

			} else {
				return new ResponseEntity(
						new ApiResponse(false, userRole + " not authroized to save product change over form !!!"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save Production details " + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to Save Production Details" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(productionDetails, HttpStatus.OK);

	}

	// GET USER ROLE

	private String getUserRole() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst()
					.orElse(null);
		}
		return null;
	}

}
