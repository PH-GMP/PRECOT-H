package com.focusr.Precot.mssql.database.service.splunance;

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
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceRPBalePressStoppageF015;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceShiftWiseRPProdSupportF14;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceShiftWiseStoppageReportF018;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceRPBalePressStoppageHistoryF015;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceShiftWiseRPProdSupportHistoryF14;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceShiftWiseStoppageReportHistoryF018;
import com.focusr.Precot.mssql.database.repository.UserImageDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.splunance.SpunlaceRPBalePressStoppageF015Repo;
import com.focusr.Precot.mssql.database.repository.splunance.SpunlaceShiftWiseRPProdSupportF14Repo;
import com.focusr.Precot.mssql.database.repository.splunance.SpunlaceShiftWiseStoppageReportF018Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.SpunlaceRPBalePressStoppageHistoryF015Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.SpunlaceShiftWiseRPProdSupportHistoryF14Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.SpunlaceShiftWiseStoppageReportHistoryF018Repo;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.splunance.AppConstantsSplunance;
import com.focusr.Precot.util.splunance.SpunlaceMailFunction;

/**
 * 
 * @author Vijay.R
 *
 *         F-14 F-18
 */

@Service
public class SpulanceService2 {

	Logger logger = LoggerFactory.getLogger(SpulanceService5.class);


	@Autowired
	private UserImageDetailsRepository imageRepository;

	@Autowired
	private SpunlaceShiftWiseRPProdSupportF14Repo shiftWiseRPProdSupportF14Repo;

	@Autowired
	private SpunlaceShiftWiseRPProdSupportHistoryF14Repo spunlaceShiftWiseRPProdSupportHistoryF14Repo;

	@Autowired
	private SpunlaceShiftWiseStoppageReportF018Repo shiftWiseStoppageReportF018Repo;

	@Autowired
	private SpunlaceShiftWiseStoppageReportHistoryF018Repo spunlaceShiftWiseStoppageReportHistoryF018Repo;

	@Autowired
	private SpunlaceRPBalePressStoppageF015Repo spunlaceRPBalePressStoppageF015Repo;

	@Autowired
	private SpunlaceRPBalePressStoppageHistoryF015Repo spunlaceRPBalePressStoppageHistoryF015Repo;

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	SpunlaceMailFunction spunlacemailfunction;

	// GET USER ROLE
	private String getUserRole() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst()
					.orElse(null);
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> submitRPProdReport(SpunlaceShiftWiseRPProdSupportF14 shiftWiseRPProdSupport,
			HttpServletRequest http) {
		
		SCAUtil sca = new SCAUtil();

		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = shiftWiseRPProdSupport.getId();

			if (id != null) {
				shiftWiseRPProdSupport = shiftWiseRPProdSupportF14Repo.findRPReprtById(id);
			}

			if ((id != null && (!shiftWiseRPProdSupport.getOperator_status().equals(AppConstants.operatorApprove)
					|| shiftWiseRPProdSupport.getSupervisor_status().equals(AppConstants.supervisorRejectedStatus)
					|| shiftWiseRPProdSupport.getHod_status().equals(AppConstants.hodRejectedStatus))) || id == null) {
				if (userRole.equalsIgnoreCase(AppConstantsSplunance.operatorRole)) {

					shiftWiseRPProdSupport.setOperator_status(AppConstants.operatorApprove);
					shiftWiseRPProdSupport.setOperator_submitted_by(userName);
					shiftWiseRPProdSupport.setOperator_submitted_on(date);
					shiftWiseRPProdSupport.setOperator_submitted_id(userId);
					shiftWiseRPProdSupport.setOperator_sign(userName);

					shiftWiseRPProdSupport.setSupervisor_status(AppConstants.waitingStatus);
					shiftWiseRPProdSupport.setSupervisior_mail_status(AppConstants.waitingStatus);
					
//					shiftWiseRPProdSupport.setHod_status(AppConstants.waitingStatus);
//					shiftWiseRPProdSupport.setHod_mail_status(AppConstants.waitingStatus);
					
					shiftWiseRPProdSupport.setHod_status("");
					shiftWiseRPProdSupport.setHod_mail_status("");
					
					shiftWiseRPProdSupport.setReason(null);

					shiftWiseRPProdSupportF14Repo.save(shiftWiseRPProdSupport);

					// IMAGE

					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

					shiftWiseRPProdSupport.setOperator_signature_image(signature);

					shiftWiseRPProdSupportF14Repo.save(shiftWiseRPProdSupport);

					SpunlaceShiftWiseRPProdSupportHistoryF14 rejectionReportHistory = new SpunlaceShiftWiseRPProdSupportHistoryF14();

					BeanUtils.copyProperties(shiftWiseRPProdSupport, rejectionReportHistory);

					String date1 = rejectionReportHistory.getDate();

					String shift1 = rejectionReportHistory.getShift();

					String order1 = rejectionReportHistory.getOrderNo();

					int version = spunlaceShiftWiseRPProdSupportHistoryF14Repo.getMaximumVersion(date1, shift1, order1)
							.map(temp -> temp + 1).orElse(1);

					rejectionReportHistory.setVersion(version);

					spunlaceShiftWiseRPProdSupportHistoryF14Repo.save(rejectionReportHistory);
					
					try {

						spunlacemailfunction.sendEmailToSupervisorsF014(shiftWiseRPProdSupport);
					} catch (Exception ex) {
						return new ResponseEntity<>(
								new ApiResponse(false, "Approved but Unable to send mail ! "),
								HttpStatus.OK);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity(new ApiResponse(false, " Invalid status."), HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit Spulance Bale Consumption" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(true, "Operator Approved Sucessfully"), HttpStatus.OK);

	}

// 	Approve Reject

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveRejectionF014(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		SpunlaceShiftWiseRPProdSupportF14 object = new SpunlaceShiftWiseRPProdSupportF14();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = shiftWiseRPProdSupportF14Repo.findRPReprtById(approvalResponse.getId());

			SpunlaceShiftWiseRPProdSupportHistoryF14 objHistory = new SpunlaceShiftWiseRPProdSupportHistoryF14();

			String supervisiorStatus = object.getSupervisor_status();

			String hodStatus = object.getHod_status();

			if (supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
					&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setHod_status(AppConstants.hodApprovedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						shiftWiseRPProdSupportF14Repo.save(object);

						objHistory = spunlaceShiftWiseRPProdSupportHistoryF14Repo
								.fetchLastSubmittedRecord(object.getDate(), object.getShift(), object.getOrderNo());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						spunlaceShiftWiseRPProdSupportHistoryF14Repo.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						object.setReason(reason);
						object.setHod_status(AppConstants.hodRejectedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						shiftWiseRPProdSupportF14Repo.save(object);

						objHistory = spunlaceShiftWiseRPProdSupportHistoryF14Repo
								.fetchLastSubmittedRecord(object.getDate(), object.getShift(), object.getOrderNo());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						spunlaceShiftWiseRPProdSupportHistoryF14Repo.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, " HOD Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}

			else if (object.getOperator_status().equalsIgnoreCase(AppConstants.operatorApprove)
					&& supervisiorStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						object.setSupervisor_submit_on(date);
						object.setSupervisor_submit_by(userName);
						object.setSupervisor_submit_id(userId);
						
						object.setHod_status(AppConstants.waitingStatus);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setSupervisor_signature_image(signature);

						object.setSupervisor_sign(userName);

						shiftWiseRPProdSupportF14Repo.save(object);

						objHistory = spunlaceShiftWiseRPProdSupportHistoryF14Repo
								.fetchLastSubmittedRecord(object.getDate(), object.getShift(), object.getOrderNo());

						objHistory.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						objHistory.setSupervisor_submit_on(date);
						objHistory.setSupervisor_submit_by(userName);
						objHistory.setSupervisor_submit_id(userId);
						objHistory.setSupervisor_sign(userName);

						objHistory.setHod_status(AppConstants.waitingStatus);
						
						spunlaceShiftWiseRPProdSupportHistoryF14Repo.save(objHistory);
						
						try {

							spunlacemailfunction.sendEmailToHodF014(object);
						} catch (Exception ex) {
							return new ResponseEntity<>(
									new ApiResponse(false, "Approved but Unable to send mail ! "),
									HttpStatus.OK);
						}

						return new ResponseEntity<>(new ApiResponse(true, " Supervisor Approved Successfully"),
								HttpStatus.OK);
					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						object.setReason(reason);
						object.setSupervisor_status(AppConstants.supervisorRejectedStatus);
						object.setSupervisor_submit_on(date);
						object.setSupervisor_submit_by(userName);
						object.setSupervisor_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setSupervisor_signature_image(signature);

						object.setSupervisor_sign(userName);

						shiftWiseRPProdSupportF14Repo.save(object);

						objHistory = spunlaceShiftWiseRPProdSupportHistoryF14Repo
								.fetchLastSubmittedRecord(object.getDate(), object.getShift(), object.getOrderNo());

						objHistory.setReason(reason);
						objHistory.setSupervisor_status(AppConstants.supervisorRejectedStatus);
						objHistory.setSupervisor_submit_on(date);
						objHistory.setSupervisor_submit_by(userName);
						objHistory.setSupervisor_submit_id(userId);
						objHistory.setSupervisor_sign(userName);

						spunlaceShiftWiseRPProdSupportHistoryF14Repo.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, " Supervisor Rejected Successfully"),
								HttpStatus.OK);

					} else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} else {

					return new ResponseEntity(new ApiResponse(false, userRole + " not authroized to Approve"),
							HttpStatus.BAD_REQUEST);

				}
			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	// GET BY ORDER, DATE, SHIFT F014

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> fetchRPProdReportF14(String order, String date, String shift) {

		List<SpunlaceShiftWiseRPProdSupportF14> RPProdReport = new ArrayList<>();

		try {

			RPProdReport = shiftWiseRPProdSupportF14Repo.fetchRPProdReport(order, date, shift);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Spulance Bale Consumption" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Spulance Bale Consumption" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(RPProdReport, HttpStatus.OK);

	}

	// PRINT BY PASSING DATE & SHIFT & ORDER NO - F-014

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> PrintRPProdReportF14(String order, String date, String shift) {

		List<SpunlaceShiftWiseRPProdSupportF14> RPProdReport = new ArrayList<>();

		try {

			RPProdReport = shiftWiseRPProdSupportF14Repo.printRPProdReport(order, date, shift);


			if (RPProdReport.isEmpty()) {

				return new ResponseEntity(new ApiResponse(true,
						"HOD Approval is Pending for the Date :" + " " + date + " " + "And Shift :" + " " + shift),
						HttpStatus.OK);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Spulance Bale Consumption" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Spulance Bale Consumption" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(RPProdReport, HttpStatus.OK);

	}

	// SUMMARY FOR SUPERVISOR AND HOD (DESIGNEE) BASED ON ROLE

	public ResponseEntity<?> SummaryF014() {

		String userRole = getUserRole();

		List<SpunlaceShiftWiseRPProdSupportF14> processSetupDetails = new ArrayList<>();

		try {

			if (userRole.equalsIgnoreCase(AppConstantsSplunance.supervisiorRole)
					|| userRole.equalsIgnoreCase(AppConstantsSplunance.hodRole)
					|| userRole.equalsIgnoreCase(AppConstantsSplunance.designeeRole) || userRole.equalsIgnoreCase(AppConstantsSplunance.operatorRole)) {

				processSetupDetails = shiftWiseRPProdSupportF14Repo.supervisorHodSummary();
			}

//			else if (userRole.equalsIgnoreCase(AppConstantsSplunance.operatorRole)
//					|| userRole.equalsIgnoreCase(AppConstantsSplunance.designeeRole)) {
//				processSetupDetails = shiftWiseRPProdSupportF14Repo.operatorSummary();
//			}
			else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(processSetupDetails, HttpStatus.OK);

		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	// SUPERVISOR SUMMARY F-014

//	public ResponseEntity<?> supervisorSummaryF014() {
//		try {
//
//			List<SpunlaceShiftWiseRPProdSupportF14> list = shiftWiseRPProdSupportF14Repo.supervisorSummary();
//
//			if (list == null) {
//
//				list = new ArrayList<SpunlaceShiftWiseRPProdSupportF14>();
//			}
//			return new ResponseEntity<>(list, HttpStatus.OK);
//		} catch (Exception e) {
//			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
//		}
//	}
//
//	// HOD SUMMARY F-014
//
//	public ResponseEntity<?> hodSummaryF014() {
//		try {
//
//			List<SpunlaceShiftWiseRPProdSupportF14> list = shiftWiseRPProdSupportF14Repo.hodSummary();
//
//			if (list == null) {
//
//				list = new ArrayList<SpunlaceShiftWiseRPProdSupportF14>();
//			}
//			return new ResponseEntity<>(list, HttpStatus.OK);
//		} catch (Exception e) {
//			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
//		}
//	}

	// =============================== F-018 BHARKAVI
	// ================================

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> submitShiftWiseStoppage(SpunlaceShiftWiseStoppageReportF018 baleConsumptionObj,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = baleConsumptionObj.getId();

			if (id != null) {
				baleConsumptionObj = shiftWiseStoppageReportF018Repo.findStoppageReportById(id);
			}

			if ((id != null && (!baleConsumptionObj.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)
					|| baleConsumptionObj.getHod_status().equals(AppConstants.hodRejectedStatus))) || id == null) {
				if (userRole.equalsIgnoreCase(AppConstantsSplunance.supervisiorRole)) {

					baleConsumptionObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
					baleConsumptionObj.setSupervisor_submit_by(userName);
					baleConsumptionObj.setSupervisor_submit_on(date);
					baleConsumptionObj.setSupervisor_submit_id(userId);
					baleConsumptionObj.setSupervisor_sign(userName);

					baleConsumptionObj.setHod_status(AppConstants.waitingStatus);
					baleConsumptionObj.setHod_mail_status(AppConstants.waitingStatus);
					
					baleConsumptionObj.setReason(null);

					shiftWiseStoppageReportF018Repo.save(baleConsumptionObj);

					// IMAGE

					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

					baleConsumptionObj.setSupervisor_signature_image(signature);

					shiftWiseStoppageReportF018Repo.save(baleConsumptionObj);

					SpunlaceShiftWiseStoppageReportHistoryF018 rejectionReportHistory = new SpunlaceShiftWiseStoppageReportHistoryF018();

					BeanUtils.copyProperties(baleConsumptionObj, rejectionReportHistory);

					String date1 = rejectionReportHistory.getDate();

					int version = spunlaceShiftWiseStoppageReportHistoryF018Repo.getMaximumVersion(date1)
							.map(temp -> temp + 1).orElse(1);

					rejectionReportHistory.setVersion(version);

					spunlaceShiftWiseStoppageReportHistoryF018Repo.save(rejectionReportHistory);
					
					try {

						spunlacemailfunction.sendEmailToHodF018(baleConsumptionObj);
					} catch (Exception ex) {
						return new ResponseEntity<>(
								new ApiResponse(false, "Approved but Unable to send mail ! "),
								HttpStatus.OK);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, userRole + " No access to submit details."),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity(new ApiResponse(false, " Invalid Status."), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit Spulance Bale Consumption" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details" + msg), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(true, "Supervisor Approved Sucessfully"), HttpStatus.OK);

	}

// 	Approve Reject

	public ResponseEntity<?> approveRejectionF018(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		SpunlaceShiftWiseStoppageReportF018 object = new SpunlaceShiftWiseStoppageReportF018();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = shiftWiseStoppageReportF018Repo.findStoppageReportById(approvalResponse.getId());

			SpunlaceShiftWiseStoppageReportHistoryF018 objHistory = new SpunlaceShiftWiseStoppageReportHistoryF018();

			String supervisiorStatus = object.getSupervisor_status();

			String hodStatus = object.getHod_status();


			if (supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
					&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setHod_status(AppConstants.hodApprovedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						shiftWiseStoppageReportF018Repo.save(object);

						objHistory = spunlaceShiftWiseStoppageReportHistoryF018Repo
								.fetchLastSubmittedRecord(object.getDate());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						spunlaceShiftWiseStoppageReportHistoryF018Repo.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						object.setReason(reason);
						object.setHod_status(AppConstants.hodRejectedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						shiftWiseStoppageReportF018Repo.save(object);

						objHistory = spunlaceShiftWiseStoppageReportHistoryF018Repo
								.fetchLastSubmittedRecord(object.getDate());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						spunlaceShiftWiseStoppageReportHistoryF018Repo.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, " HOD Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}
			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	// GET BY ORDER, DATE, SHIFT F018

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> fetchStoppageReportF018(String order, String date, String shift) {

		List<SpunlaceShiftWiseStoppageReportF018> baleConsumptionList = new ArrayList<>();

		try {

			baleConsumptionList = shiftWiseStoppageReportF018Repo.fetchStoppageReport(order, date, shift);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Spulance Bale Consumption" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Spulance Bale Consumption" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(baleConsumptionList, HttpStatus.OK);

	}

	// PRINT BY PASSING DATE F018

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> printStoppageReportF018(String date) {

		List<SpunlaceShiftWiseStoppageReportF018> baleConsumptionList = new ArrayList<>();

		try {

			baleConsumptionList = shiftWiseStoppageReportF018Repo.printStoppageReport(date);

			System.out.println("Value is :" + baleConsumptionList);

			if (baleConsumptionList.isEmpty()) {

				return new ResponseEntity(new ApiResponse(true, "HOD Approval is Pending for the Date :" + "" + date),
						HttpStatus.OK);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Spulance Bale Consumption" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Spulance Bale Consumption" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(baleConsumptionList, HttpStatus.OK);

	}

	// HOD SUMMARY F-018

	public ResponseEntity<?> hodSummaryF018() {

		String userRole = getUserRole();

		List<SpunlaceShiftWiseStoppageReportF018> processSetupDetails = new ArrayList<>();

		try {

			if (userRole.equalsIgnoreCase(AppConstantsSplunance.hodRole)
					|| userRole.equalsIgnoreCase(AppConstantsSplunance.designeeRole)
					|| userRole.equalsIgnoreCase(AppConstantsSplunance.supervisiorRole)) {

				processSetupDetails = shiftWiseStoppageReportF018Repo.hodSummary();
			}

			return new ResponseEntity<>(processSetupDetails, HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	// =============================== F-015 ================================

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> submitRPBalePressStopage(SpunlaceRPBalePressStoppageF015 baleConsumptionObj,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = baleConsumptionObj.getId();

			if (id != null) {
				baleConsumptionObj = spunlaceRPBalePressStoppageF015Repo.findBalePressStoppageById(id);
			}

			if ((id != null && (!baleConsumptionObj.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)
					|| baleConsumptionObj.getHod_status().equals(AppConstants.hodRejectedStatus))) || id == null) {
				if (userRole.equalsIgnoreCase(AppConstantsSplunance.supervisiorRole)) {

					baleConsumptionObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
					baleConsumptionObj.setSupervisor_submit_by(userName);
					baleConsumptionObj.setSupervisor_submit_on(date);
					baleConsumptionObj.setSupervisor_submit_id(userId);
					baleConsumptionObj.setSupervisor_sign(userName);

					baleConsumptionObj.setHod_status(AppConstants.waitingStatus);
					baleConsumptionObj.setHod_mail_status(AppConstants.waitingStatus);
					
					baleConsumptionObj.setReason(null);

					spunlaceRPBalePressStoppageF015Repo.save(baleConsumptionObj);

					// IMAGE

					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

					baleConsumptionObj.setSupervisor_signature_image(signature);

					spunlaceRPBalePressStoppageF015Repo.save(baleConsumptionObj);

					SpunlaceRPBalePressStoppageHistoryF015 rejectionReportHistory = new SpunlaceRPBalePressStoppageHistoryF015();

					BeanUtils.copyProperties(baleConsumptionObj, rejectionReportHistory);

					String date1 = rejectionReportHistory.getDate();

					int version = spunlaceRPBalePressStoppageHistoryF015Repo.getMaximumVersion(date1)
							.map(temp -> temp + 1).orElse(1);

					rejectionReportHistory.setVersion(version);

					spunlaceRPBalePressStoppageHistoryF015Repo.save(rejectionReportHistory);
					
					try {

						spunlacemailfunction.sendEmailToHodF015(baleConsumptionObj);
					} catch (Exception ex) {
						return new ResponseEntity<>(
								new ApiResponse(false, "Approved but Unable to send mail ! "),
								HttpStatus.OK);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, userRole + " No access to submit details."),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity(new ApiResponse(false, " Invalid Status."), HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit Spulance Bale Consumption" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(true, "Supervisor Approved Sucessfully"), HttpStatus.OK);

	}

// 	Approve Reject

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveRejectionF015(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		SpunlaceRPBalePressStoppageF015 object;

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = spunlaceRPBalePressStoppageF015Repo.findBalePressStoppageById(approvalResponse.getId());

			SpunlaceRPBalePressStoppageHistoryF015 objHistory;

			String supervisiorStatus = object.getSupervisor_status();

			String hodStatus = object.getHod_status();

			if (supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
					&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setHod_status(AppConstants.hodApprovedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						spunlaceRPBalePressStoppageF015Repo.save(object);

						objHistory = spunlaceRPBalePressStoppageHistoryF015Repo
								.fetchLastSubmittedRecord(object.getDate());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						spunlaceRPBalePressStoppageHistoryF015Repo.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						object.setReason(reason);
						object.setHod_status(AppConstants.hodRejectedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						spunlaceRPBalePressStoppageF015Repo.save(object);

						objHistory = spunlaceRPBalePressStoppageHistoryF015Repo
								.fetchLastSubmittedRecord(object.getDate());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						spunlaceRPBalePressStoppageHistoryF015Repo.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, " HOD Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}
			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	// GET BY ORDER, DATE, SHIFT F-015

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> fetchRPBalePressStopage(String order, String date, String shift) {

		List<SpunlaceRPBalePressStoppageF015> baleConsumptionList = new ArrayList<>();

		try {

			baleConsumptionList = spunlaceRPBalePressStoppageF015Repo.fetchBalePressStoppage(order, date, shift);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Spulance Bale Consumption" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Spulance Bale Consumption" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(baleConsumptionList, HttpStatus.OK);

	}

	// PRINT BY PASSING DATE F015

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> printRPBalePressStopageF015(String date) {

		List<SpunlaceRPBalePressStoppageF015> baleConsumptionList = new ArrayList<>();

		try {

			baleConsumptionList = spunlaceRPBalePressStoppageF015Repo.printBalePressStoppage(date);


			if (baleConsumptionList.isEmpty()) {

				return new ResponseEntity(new ApiResponse(true, "HOD Approval is Pending for the Date :" + "" + date),
						HttpStatus.OK);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Spulance Bale Consumption" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Spulance Bale Consumption" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(baleConsumptionList, HttpStatus.OK);

	}

	// HOD SUMMARY F-015

	public ResponseEntity<?> hodSummaryF015() {

		String userRole = getUserRole();

		List<SpunlaceRPBalePressStoppageF015> processSetupDetails = new ArrayList<>();

		try {

			if (userRole.equalsIgnoreCase(AppConstantsSplunance.hodRole)
					|| userRole.equalsIgnoreCase(AppConstantsSplunance.designeeRole)
					|| userRole.equalsIgnoreCase(AppConstantsSplunance.supervisiorRole)) {

				processSetupDetails = spunlaceRPBalePressStoppageF015Repo.hodSummaryF15();
			}

			return new ResponseEntity<>(processSetupDetails, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	// GET BY DATE F018

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getByDateF018(String date) {

		List<SpunlaceShiftWiseStoppageReportF018> baleConsumptionList = new ArrayList<>();

		try {

			baleConsumptionList = shiftWiseStoppageReportF018Repo.getByDateF018(date);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Spulance Bale Consumption" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Spulance Bale Consumption" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(baleConsumptionList, HttpStatus.OK);

	}// GET BY DATE F-015

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getByDateF015(String date) {

		List<SpunlaceRPBalePressStoppageF015> baleConsumptionList = new ArrayList<>();

		try {

			baleConsumptionList = spunlaceRPBalePressStoppageF015Repo.getByDate(date);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Spulance Bale Consumption" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Spulance Bale Consumption" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(baleConsumptionList, HttpStatus.OK);

	}

}
