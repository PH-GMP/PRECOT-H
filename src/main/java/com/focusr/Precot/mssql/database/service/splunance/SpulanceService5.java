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
import com.focusr.Precot.mssql.database.model.splunance.SplunanceBaleConsumptionF01;
import com.focusr.Precot.mssql.database.model.splunance.audit.SplunanceBaleConsumptionHistoryF01;
import com.focusr.Precot.mssql.database.repository.UserImageDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.splunance.SpluanceBaleConsumptionRepositoryF01;
import com.focusr.Precot.mssql.database.repository.splunance.audit.SplunanceBaleConsumptionHistoryF01Repo;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.splunance.AppConstantsSplunance;
import com.focusr.Precot.util.splunance.SpunlaceMailFunction;

/**
 * F01
 * 
 * @author Jawahar.M
 */

@Service
public class SpulanceService5 {

	Logger logger = LoggerFactory.getLogger(SpulanceService5.class);

	SCAUtil sca = new SCAUtil();

	@Autowired
	private SpluanceBaleConsumptionRepositoryF01 baleConsumptionRepository;

	@Autowired
	private SplunanceBaleConsumptionHistoryF01Repo splunanceBaleConsumptionHistoryF01Repo;

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserImageDetailsRepository imageRepository;
	
	@Autowired
	SpunlaceMailFunction spunlacemailfunction;

	public ResponseEntity<?> submitBaleConsumptionF01(SplunanceBaleConsumptionF01 baleConsumptionObj,
			HttpServletRequest http) {


		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = baleConsumptionObj.getSb_id();

			if (id != null) {
				baleConsumptionObj = baleConsumptionRepository.findBaleConsumptionById(id);
			}

			if ((id != null && (!baleConsumptionObj.getOperator_status().equals(AppConstants.operatorApprove)
					|| baleConsumptionObj.getSupervisor_status().equals(AppConstants.supervisorRejectedStatus)
					|| baleConsumptionObj.getHod_status().equals(AppConstants.hodRejectedStatus))) || id == null) {
				if (userRole.equalsIgnoreCase(AppConstantsSplunance.operatorRole)) {
					baleConsumptionObj.setOperator_status(AppConstants.operatorApprove);
					baleConsumptionObj.setOperator_submitted_by(userName);
					baleConsumptionObj.setOperator_submitted_on(date);
					baleConsumptionObj.setOperator_submitted_id(userId);
					baleConsumptionObj.setOperator_sign(userName);

					baleConsumptionObj.setSupervisor_status(AppConstants.waitingStatus);
					baleConsumptionObj.setSupervisior_mail_status(AppConstants.waitingStatus);

					baleConsumptionObj.setHod_status("");
					baleConsumptionObj.setHod_mail_status("");

					baleConsumptionObj.setReason(null);

					baleConsumptionRepository.save(baleConsumptionObj);

					// IMAGE

					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

					baleConsumptionObj.setOperator_signature_image(signature);

					baleConsumptionRepository.save(baleConsumptionObj);

					SplunanceBaleConsumptionHistoryF01 rejectionReportHistory = new SplunanceBaleConsumptionHistoryF01();

					BeanUtils.copyProperties(baleConsumptionObj, rejectionReportHistory);

					String date1 = rejectionReportHistory.getDate();

					String shift1 = rejectionReportHistory.getShift();

					String order1 = rejectionReportHistory.getOrderNumber();

					int version = splunanceBaleConsumptionHistoryF01Repo.getMaximumVersion(date1, shift1, order1)
							.map(temp -> temp + 1).orElse(1);
					

					rejectionReportHistory.setVersion(version);

					splunanceBaleConsumptionHistoryF01Repo.save(rejectionReportHistory);

					// YET TO WRITE MAIL CONTENT FOR OPERATOR SUBMIT ...
					
					try {

						spunlacemailfunction.sendEmailToSupervisorF001(baleConsumptionObj);
					} catch (Exception ex) {
						return new ResponseEntity<>(
								new ApiResponse(false, "Approved but Unable to send mail ! "),
								HttpStatus.OK);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, userRole + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity(new ApiResponse(false, " Invalid status."), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit Spulance Bale Consumption" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit Spulance Bale Consumption" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);
//		return new ResponseEntity(baleConsumptionObj, HttpStatus.CREATED);

	}

//     	Approve Reject

	public ResponseEntity<?> approveRejectionF001(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		SplunanceBaleConsumptionF01 object = new SplunanceBaleConsumptionF01();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = baleConsumptionRepository.findBaleConsumptionById(approvalResponse.getId());

			SplunanceBaleConsumptionHistoryF01 objHistory = new SplunanceBaleConsumptionHistoryF01();

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

						baleConsumptionRepository.save(object);

						objHistory = splunanceBaleConsumptionHistoryF01Repo.fetchLastSubmittedRecord(object.getDate(),
								object.getShift(), object.getOrderNumber());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						splunanceBaleConsumptionHistoryF01Repo.save(objHistory);

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

						baleConsumptionRepository.save(object);

						objHistory = splunanceBaleConsumptionHistoryF01Repo.fetchLastSubmittedRecord(object.getDate(),
								object.getShift(), object.getOrderNumber());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						splunanceBaleConsumptionHistoryF01Repo.save(objHistory);

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

						baleConsumptionRepository.save(object);

						objHistory = splunanceBaleConsumptionHistoryF01Repo.fetchLastSubmittedRecord(object.getDate(),
								object.getShift(), object.getOrderNumber());

						objHistory.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						objHistory.setSupervisor_submit_on(date);
						objHistory.setSupervisor_submit_by(userName);
						objHistory.setSupervisor_submit_id(userId);
						objHistory.setSupervisor_sign(userName);
						objHistory.setHod_status(AppConstants.waitingStatus);
						
						splunanceBaleConsumptionHistoryF01Repo.save(objHistory);
						
						try {

							spunlacemailfunction.sendEmailToHodF001(object);
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

						baleConsumptionRepository.save(object);

						objHistory = splunanceBaleConsumptionHistoryF01Repo.fetchLastSubmittedRecord(object.getDate(),
								object.getShift(), object.getOrderNumber());

//						bleachLayDownCheckListF42History = dailyRejectionReportF007RepositoryHistory
//								.fetchLastSubmittedRecord(bleachContRawCottonF05.getDate(),
//										bleachContRawCottonF05.getShift(), bleachContRawCottonF05.getOrderNo());

						objHistory.setReason(reason);
						objHistory.setSupervisor_status(AppConstants.supervisorRejectedStatus);
						objHistory.setSupervisor_submit_on(date);
						objHistory.setSupervisor_submit_by(userName);
						objHistory.setSupervisor_submit_id(userId);
						objHistory.setSupervisor_sign(userName);

						splunanceBaleConsumptionHistoryF01Repo.save(objHistory);

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

	// GET BY ORDER, DATE, SHIFT

	public ResponseEntity<?> getBaleConsumptionByOrder(String order, String date, String shift) {

		List<SplunanceBaleConsumptionF01> baleConsumptionList = new ArrayList<>();

		try {

			baleConsumptionList = baleConsumptionRepository.findBaleConsumptionByOrder(order, date, shift);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Spulance Bale Consumption" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Spulance Bale Consumption" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(baleConsumptionList, HttpStatus.OK);

	}

	public ResponseEntity<?> supervisorSummaryF001() {
		try {

			List<SplunanceBaleConsumptionF01> list = baleConsumptionRepository.getSummary();

			if (list == null) {

				list = new ArrayList<SplunanceBaleConsumptionF01>();
			}
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

//	public ResponseEntity<?> hodSummaryF001() {
//		try {
//
//			List<SplunanceBaleConsumptionF01> list = baleConsumptionRepository.hodSummary();
//
//			if (list == null) {
//
//				list = new ArrayList<SplunanceBaleConsumptionF01>();
//			}
//			return new ResponseEntity<>(list, HttpStatus.OK);
//		} catch (Exception e) {
//			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
//		}
//	}

	public ResponseEntity<?> fetchApprovedBaleConsumptions(String order, String date, String shift) {

		List<SplunanceBaleConsumptionF01> baleConsumptionList = new ArrayList<>();

		try {

			baleConsumptionList = baleConsumptionRepository.approvedBaleConsumption(order, date, shift);

			if (baleConsumptionList == null || baleConsumptionList.isEmpty()) {

//				list = new ArrayList<MetalDetectorCheckListF020>();
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to get Approved Bale Consumption Details" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to get Approved Bale Consumption details" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(baleConsumptionList, HttpStatus.OK);

	}

	
	
	
	// GET BY ORDER, DATE, SHIFT
	 
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getBaleConsumptionDetails(String order) {
	 
				List<SplunanceBaleConsumptionF01> baleConsumptionList = new ArrayList<>();
	 
				try {
	 
					baleConsumptionList = baleConsumptionRepository.getBaleConsumptionDetails(order);
	 
				} catch (Exception ex) {
	 
					String msg = ex.getMessage();
					logger.error("Unable to get Detail" + msg);
	 
					return new ResponseEntity(new ApiResponse(false, "Unable to get Detail" + msg),
							HttpStatus.BAD_REQUEST);
				}
	 
				return new ResponseEntity(baleConsumptionList, HttpStatus.OK);
	 
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
