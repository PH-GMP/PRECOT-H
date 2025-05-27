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
import com.focusr.Precot.mssql.database.model.splunance.DailyStoppageReportSpunlaceF008;
import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupDetailsJetlaceAndDryerF003;
import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupVerificationOpeningLineF002;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceSampleReportDetailsF012;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceSampleReportF012;
import com.focusr.Precot.mssql.database.model.splunance.StoppageDetailsF008;
import com.focusr.Precot.mssql.database.model.splunance.audit.DailyStoppageReportSpunlaceHistoryF008;
import com.focusr.Precot.mssql.database.model.splunance.audit.ProcessSetupDetailsJetlaceAndDryerHistoryF003;
import com.focusr.Precot.mssql.database.model.splunance.audit.ProcessSetupVerificationOpeningLineHistoryF002;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceSampleReportDetailsHistoryF012;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceSampleReportHistoryF012;
import com.focusr.Precot.mssql.database.repository.UserImageDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.splunance.DailyStoppageReportSpunlaceF008Repository;
import com.focusr.Precot.mssql.database.repository.splunance.ProcessSetupDetailsJetlaceAndDryerF003Repository;
import com.focusr.Precot.mssql.database.repository.splunance.ProcessSetupVerificationOpeningLineF002Repository;
import com.focusr.Precot.mssql.database.repository.splunance.SpunlaceSampleReportDetailsF012Repository;
import com.focusr.Precot.mssql.database.repository.splunance.SpunlaceSampleReportF012Repository;
import com.focusr.Precot.mssql.database.repository.splunance.StoppageDetailsF008Repository;
import com.focusr.Precot.mssql.database.repository.splunance.audit.DailyStoppageReportSpunlaceHistoryF008Repository;
import com.focusr.Precot.mssql.database.repository.splunance.audit.ProcessSetupDetailsJetlaceAndDryerHistoryRepositoryF003;
import com.focusr.Precot.mssql.database.repository.splunance.audit.ProcessSetupVerificationOpeningLineHistoryF002Repository;
import com.focusr.Precot.mssql.database.repository.splunance.audit.SpunlaceSampleReportDetailsF012RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.splunance.audit.SpunlaceSampleReportHistoryF012Repository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.splunance.AppConstantsSplunance;
import com.focusr.Precot.util.splunance.SpunlaceMailFunction;

@Service
public class SpunlaceService3 {

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	ProcessSetupDetailsJetlaceAndDryerF003Repository processsetupdetailsjetlaceanddryerf003repository;
	@Autowired
	ProcessSetupDetailsJetlaceAndDryerHistoryRepositoryF003 processsetupdetailsjetlaceanddryerhistoryrepositoryf003;
	@Autowired
	ProcessSetupVerificationOpeningLineF002Repository processsetupverificationopeninglinef002repository;
	@Autowired
	ProcessSetupVerificationOpeningLineHistoryF002Repository processsetupverificationopeninglinehistoryf002repository;
	@Autowired
	DailyStoppageReportSpunlaceF008Repository dailystoppagereportspunlacef008repository;
	@Autowired
	DailyStoppageReportSpunlaceHistoryF008Repository dailystoppagereportspunlacehistoryf008repository;
	@Autowired
	StoppageDetailsF008Repository stoppagedetailsf008repository;

	@Autowired
	SpunlaceSampleReportF012Repository spunlacesamplereportf012repository;
	@Autowired
	SpunlaceSampleReportHistoryF012Repository spunlacesamplereporthistoryf012repository;
	@Autowired
	SpunlaceSampleReportDetailsF012RepositoryHistory spunlacesamplereportdetailsf012repositoryhistory;
	@Autowired
	SpunlaceSampleReportDetailsF012Repository spunlaceSampleReportDetailsF012Repository;

	@Autowired
	private UserImageDetailsRepository imageRepository;

	@Autowired
	SpunlaceMailFunction spunlacemailfunction;
	@Autowired
	private SCAUtil scaUtil;

	Logger logger = LoggerFactory.getLogger(SpulanceService5.class);

	SCAUtil sca = new SCAUtil();

	// F003
	// SAVEF003//
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> saveProcessSetupJetLaceF003(ProcessSetupDetailsJetlaceAndDryerF003 processSetupDetails,
			HttpServletRequest http) {

		ProcessSetupDetailsJetlaceAndDryerF003 processsetupdetailsjetlaceanddryerf003 = new ProcessSetupDetailsJetlaceAndDryerF003();
		Long id = processSetupDetails.getProcess_id();
		try {
			String value = "";

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			if (processSetupDetails.getFormatNo() == null)
				value = "formatNo";
			if (processSetupDetails.getSopNumber() == null)
				value = "SopNumber";
			if (processSetupDetails.getRevisionNo() == null)
				value = "revisionNo";
			if (processSetupDetails.getFormatName() == null)
				value = "formatName";
			if (processSetupDetails.getUnit() == null)
				value = "Unit";
			if (processSetupDetails.getShift() == null)
				value = "Shift";
			if (processSetupDetails.getDate() == null)
				value = "Date";
			if (processSetupDetails.getOrder_no() == null)
				value = "OrderNumber";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}
			if (id != null) {

				processsetupdetailsjetlaceanddryerf003 = processsetupdetailsjetlaceanddryerf003repository
						.findProcessSetupDetailsById(id);

				String[] IgnoreProps = { "process_id", "createdBy", "createdAt", "operator_status", "operator_save_by",
						"operator_save_on", "operator_save_id", "operator_submitted_by", "operator_submitted_on",
						"operator_submitted_id", "operator_sign", "supervisor_status", "supervisor_save_on",
						"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign", "supervisior_mail_status", "hod_status",
						"hod_save_on", "hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id",
						"hod_sign,hod_mail_status", "operator_signature_image", "supervisor_signature_image",
						"hod_signature_image" };

				BeanUtils.copyProperties(processSetupDetails, processsetupdetailsjetlaceanddryerf003, IgnoreProps);
				if (!processsetupdetailsjetlaceanddryerf003.getOperator_status().equals(AppConstants.operatorApprove)
						|| processsetupdetailsjetlaceanddryerf003.getSupervisor_status()
								.equals(AppConstants.supervisorRejectedStatus)
						|| processsetupdetailsjetlaceanddryerf003.getHod_status()
								.equals(AppConstants.hodRejectedStatus)) {
					if (userRole.equalsIgnoreCase(AppConstantsSplunance.operatorRole)) {
						processsetupdetailsjetlaceanddryerf003.setOperator_status(AppConstants.operatorSave);
						processsetupdetailsjetlaceanddryerf003.setOperator_save_by(userName);
						processsetupdetailsjetlaceanddryerf003.setOperator_save_on(date);
						processsetupdetailsjetlaceanddryerf003.setOperator_save_id(userId);

						processsetupdetailsjetlaceanddryerf003.setSupervisor_status("");
						processsetupdetailsjetlaceanddryerf003repository.save(processsetupdetailsjetlaceanddryerf003);

					} else {

						return new ResponseEntity(
								new ApiResponse(false, "Unauthorize to save Process Setup Details Report"),
								HttpStatus.FORBIDDEN);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, " Invalid status."), HttpStatus.BAD_REQUEST);
				}
			} else {

				if (!userRole.equals("ROLE_OPERATOR")) {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
				if (userRole.equalsIgnoreCase(AppConstantsSplunance.operatorRole)) {
					processSetupDetails.setOperator_status(AppConstants.operatorSave);
					processSetupDetails.setOperator_save_by(userName);
					processSetupDetails.setOperator_save_on(date);
					processSetupDetails.setOperator_save_id(userId);

					processSetupDetails.setSupervisor_status("");

					processsetupdetailsjetlaceanddryerf003repository.save(processSetupDetails);

					processsetupdetailsjetlaceanddryerf003 = processSetupDetails;
				}
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to save Process Setup Details" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to save Process Setup Details" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(processsetupdetailsjetlaceanddryerf003, HttpStatus.CREATED);

	}

	// SUBMITF003//
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> submitProcessSetupJetLaceF003(ProcessSetupDetailsJetlaceAndDryerF003 processSetupDetails,
			HttpServletRequest http) {

		ProcessSetupDetailsJetlaceAndDryerF003 processsetupdetailsjetlaceanddryerf003 = new ProcessSetupDetailsJetlaceAndDryerF003();

		Long id = processSetupDetails.getProcess_id();
		try {
			String value = "";

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			if (processSetupDetails.getFormatNo() == null)
				value = "formatNo";
			if (processSetupDetails.getSopNumber() == null)
				value = "SopNumber";
			if (processSetupDetails.getRevisionNo() == null)
				value = "revisionNo";
			if (processSetupDetails.getFormatName() == null)
				value = "formatName";
			if (processSetupDetails.getUnit() == null)
				value = "Unit";
			if (processSetupDetails.getShift() == null)
				value = "Shift";
			if (processSetupDetails.getDate() == null)
				value = "Date";
			if (processSetupDetails.getOrder_no() == null)
				value = "OrderNumber";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			if (id != null) {

				processsetupdetailsjetlaceanddryerf003 = processsetupdetailsjetlaceanddryerf003repository
						.findProcessSetupDetailsById(id);

				String[] IgnoreProps = { "process_id", "createdBy", "createdAt", "operator_status", "operator_save_by",
						"operator_save_on", "operator_save_id", "operator_submitted_by", "operator_submitted_on",
						"operator_submitted_id", "operator_sign", "supervisor_status", "supervisor_save_on",
						"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign", "supervisior_mail_status", "hod_status",
						"hod_save_on", "hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id",
						"hod_sign,hod_mail_status", "operator_signature_image", "supervisor_signature_image",
						"hod_signature_image" };

				BeanUtils.copyProperties(processSetupDetails, processsetupdetailsjetlaceanddryerf003, IgnoreProps);

				if (!processsetupdetailsjetlaceanddryerf003.getOperator_status().equals(AppConstants.operatorApprove)
						|| processsetupdetailsjetlaceanddryerf003.getSupervisor_status()
								.equals(AppConstants.supervisorRejectedStatus)
						|| processsetupdetailsjetlaceanddryerf003.getHod_status()
								.equals(AppConstants.hodRejectedStatus)) {

					if (userRole.equalsIgnoreCase(AppConstantsSplunance.operatorRole)) {
						processsetupdetailsjetlaceanddryerf003.setOperator_status(AppConstants.operatorApprove);
						processsetupdetailsjetlaceanddryerf003.setOperator_submitted_by(userName);
						processsetupdetailsjetlaceanddryerf003.setOperator_submitted_on(date);
						processsetupdetailsjetlaceanddryerf003.setOperator_submitted_id(userId);
						processsetupdetailsjetlaceanddryerf003.setOperator_sign(userName);

						processsetupdetailsjetlaceanddryerf003.setSupervisor_status(AppConstants.waitingStatus);
//					processsetupdetailsjetlaceanddryerf003.setHod_status(AppConstants.waitingStatus);
						processsetupdetailsjetlaceanddryerf003.setHod_status("");

						// IMAGE

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);

						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

						processsetupdetailsjetlaceanddryerf003.setOperator_signature_image(signature);

						processsetupdetailsjetlaceanddryerf003repository.save(processsetupdetailsjetlaceanddryerf003);

						ProcessSetupDetailsJetlaceAndDryerHistoryF003 rejectionReportHistory = new ProcessSetupDetailsJetlaceAndDryerHistoryF003();

						BeanUtils.copyProperties(processsetupdetailsjetlaceanddryerf003, rejectionReportHistory);

						String order1 = rejectionReportHistory.getOrder_no();

						int version = processsetupdetailsjetlaceanddryerhistoryrepositoryf003.getMaximumVersion(order1)
								.map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						processsetupdetailsjetlaceanddryerhistoryrepositoryf003.save(rejectionReportHistory);

						// YET TO WRITE MAIL CONTENT FOR OPERATOR SUBMIT ...
						try {

							spunlacemailfunction.sendEmailToSupervisorF003(processsetupdetailsjetlaceanddryerf003);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
								HttpStatus.FORBIDDEN);
					}

				} else {

					return new ResponseEntity(
							new ApiResponse(false, "Unauthorize to Submit Process Setup Details Report"),
							HttpStatus.FORBIDDEN);

				}
			} else {

				if (!userRole.equals("ROLE_OPERATOR")) {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
				if (userRole.equalsIgnoreCase(AppConstantsSplunance.operatorRole)) {
					processSetupDetails.setOperator_status(AppConstants.operatorApprove);
					processSetupDetails.setOperator_submitted_by(userName);
					processSetupDetails.setOperator_submitted_on(date);
					processSetupDetails.setOperator_submitted_id(userId);
					processSetupDetails.setOperator_sign(userName);
					processSetupDetails.setSupervisor_status(AppConstants.waitingStatus);
//					processSetupDetails.setHod_status(AppConstants.waitingStatus);
					processSetupDetails.setHod_status("");
					processsetupdetailsjetlaceanddryerf003repository.save(processSetupDetails);
					processsetupdetailsjetlaceanddryerf003 = processSetupDetails;

					// IMAGE

					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

					processSetupDetails.setOperator_signature_image(signature);

					processsetupdetailsjetlaceanddryerf003repository.save(processSetupDetails);

					// AUDIT

					ProcessSetupDetailsJetlaceAndDryerHistoryF003 rejectionReportHistory = new ProcessSetupDetailsJetlaceAndDryerHistoryF003();

					BeanUtils.copyProperties(processSetupDetails, rejectionReportHistory);

					String order1 = rejectionReportHistory.getOrder_no();

					int version = processsetupdetailsjetlaceanddryerhistoryrepositoryf003.getMaximumVersion(order1)
							.map(temp -> temp + 1).orElse(1);

					rejectionReportHistory.setVersion(version);

					processsetupdetailsjetlaceanddryerhistoryrepositoryf003.save(rejectionReportHistory);

					try {

						spunlacemailfunction.sendEmailToSupervisorF003(processSetupDetails);
					} catch (Exception ex) {
						return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
								HttpStatus.OK);
					}

				}
			}
		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit Process Setup Details" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit Process Setup Details" + msg),
					HttpStatus.BAD_REQUEST);
		}

//		return new ResponseEntity(processsetupdetailsjetlaceanddryerf003, HttpStatus.CREATED);

		return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);

	}

	// Summary for operator, supervisor, hod f003

	public ResponseEntity<?> summaryProcessSetupJetLaceF003() {
		String userRole = getUserRole();
		List<ProcessSetupDetailsJetlaceAndDryerF003> processSetupDetails = new ArrayList<>();
		try {
			if (userRole.equalsIgnoreCase(AppConstantsSplunance.operatorRole)) {
				processSetupDetails = processsetupdetailsjetlaceanddryerf003repository.operatorSummary();
			} else if (userRole.equalsIgnoreCase(AppConstantsSplunance.supervisiorRole)) {
				processSetupDetails = processsetupdetailsjetlaceanddryerf003repository.supervisorSummary();
			}

			else if (userRole.equalsIgnoreCase(AppConstantsSplunance.hodRole)
					|| userRole.equalsIgnoreCase(AppConstantsSplunance.designeeRole)) {
				processSetupDetails = processsetupdetailsjetlaceanddryerf003repository.hodSummary();
			} else {
				return new ResponseEntity<>(userRole + " " + "Not authorised to access the form",
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(processSetupDetails, HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> approveRejectProcessSetupJetLaceF003(ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ProcessSetupDetailsJetlaceAndDryerF003 processSetupDetails = new ProcessSetupDetailsJetlaceAndDryerF003();
		Long id = approvalResponse.getId();

		try {
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			processSetupDetails = processsetupdetailsjetlaceanddryerf003repository.findProcessSetupDetailsById(id);

			ProcessSetupDetailsJetlaceAndDryerHistoryF003 history = new ProcessSetupDetailsJetlaceAndDryerHistoryF003();

			String supervisorStatus = processSetupDetails.getSupervisor_status();
			String hodStatus = processSetupDetails.getHod_status();

			if (supervisorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
					&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {
						processSetupDetails.setHod_status(AppConstants.hodApprovedStatus);
						processSetupDetails.setHod_submit_on(date);
						processSetupDetails.setHod_submit_by(userName);
						processSetupDetails.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						processSetupDetails.setHod_signature_image(signature);
						processSetupDetails.setHod_sign(userName);

						processsetupdetailsjetlaceanddryerf003repository.save(processSetupDetails);

						history = processsetupdetailsjetlaceanddryerhistoryrepositoryf003.fetchLastSubmittedRecord(

								processSetupDetails.getOrder_no());

						history.setHod_status(AppConstants.hodApprovedStatus);
						history.setHod_submit_on(date);
						history.setHod_submit_by(userName);
						history.setHod_submit_id(userId);
						history.setHod_sign(userName);

						processsetupdetailsjetlaceanddryerhistoryrepositoryf003.save(history);

						return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);

					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						processSetupDetails.setReason(reason);
						processSetupDetails.setHod_status(AppConstants.hodRejectedStatus);
						processSetupDetails.setHod_submit_on(date);
						processSetupDetails.setHod_submit_by(userName);
						processSetupDetails.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						processSetupDetails.setHod_signature_image(signature);
						processSetupDetails.setHod_sign(userName);

						processsetupdetailsjetlaceanddryerf003repository.save(processSetupDetails);

						history = processsetupdetailsjetlaceanddryerhistoryrepositoryf003.fetchLastSubmittedRecord(

								processSetupDetails.getOrder_no());

						history.setReason(reason);
						history.setHod_status(AppConstants.hodRejectedStatus);
						history.setHod_submit_on(date);
						history.setHod_submit_by(userName);
						history.setHod_submit_id(userId);
						history.setHod_sign(userName);

						processsetupdetailsjetlaceanddryerhistoryrepositoryf003.save(history);

						return new ResponseEntity<>(new ApiResponse(true, "HOD Rejected Successfully"), HttpStatus.OK);

					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			} else if (processSetupDetails.getOperator_status().equalsIgnoreCase(AppConstants.operatorApprove)
					&& supervisorStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {

					if (approvalResponse.getStatus().equals("Approve")) {
						processSetupDetails.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						processSetupDetails.setSupervisor_submit_on(date);
						processSetupDetails.setSupervisor_submit_by(userName);
						processSetupDetails.setSupervisor_submit_id(userId);

						processSetupDetails.setHod_status(AppConstants.waitingStatus);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						processSetupDetails.setSupervisor_signature_image(signature);
						processSetupDetails.setSupervisor_sign(userName);

						processsetupdetailsjetlaceanddryerf003repository.save(processSetupDetails);

						history = processsetupdetailsjetlaceanddryerhistoryrepositoryf003.fetchLastSubmittedRecord(

								processSetupDetails.getOrder_no());

						history.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						history.setSupervisor_submit_on(date);
						history.setSupervisor_submit_by(userName);
						history.setSupervisor_submit_id(userId);
						history.setSupervisor_sign(userName);
						history.setHod_status(AppConstants.waitingStatus);
						processsetupdetailsjetlaceanddryerhistoryrepositoryf003.save(history);
						try {

							spunlacemailfunction.sendEmailToHodF003(processSetupDetails);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
									HttpStatus.OK);
						}
						return new ResponseEntity<>(new ApiResponse(true, "Supervisor Approved Successfully"),
								HttpStatus.OK);

					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						processSetupDetails.setReason(reason);
						processSetupDetails.setSupervisor_status(AppConstants.supervisorRejectedStatus);
						processSetupDetails.setSupervisor_submit_on(date);
						processSetupDetails.setSupervisor_submit_by(userName);
						processSetupDetails.setSupervisor_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						processSetupDetails.setSupervisor_signature_image(signature);
						processSetupDetails.setSupervisor_sign(userName);

						processsetupdetailsjetlaceanddryerf003repository.save(processSetupDetails);

						history = processsetupdetailsjetlaceanddryerhistoryrepositoryf003.fetchLastSubmittedRecord(

								processSetupDetails.getOrder_no());

						history.setReason(reason);
						history.setSupervisor_status(AppConstants.supervisorRejectedStatus);
						history.setSupervisor_submit_on(date);
						history.setSupervisor_submit_by(userName);
						history.setSupervisor_submit_id(userId);
						history.setSupervisor_sign(userName);

						processsetupdetailsjetlaceanddryerhistoryrepositoryf003.save(history);

						return new ResponseEntity<>(new ApiResponse(true, "Supervisor Rejected Successfully"),
								HttpStatus.OK);

					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} else {
					return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to Approve"),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {
			String msg = e.getMessage();
			logger.error("Unable to Approve/Reject Process Setup Details" + msg);
			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to Approve/Reject Process Verification Details " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	// --------------------------------------------------F002----------------------------------------------------------------------------------------------------//
	// SAVE F002
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> saveProcessVerificationF002(
			ProcessSetupVerificationOpeningLineF002 processVerificationDetails, HttpServletRequest http) {

		ProcessSetupVerificationOpeningLineF002 processsetupverificationopeninglinef002 = new ProcessSetupVerificationOpeningLineF002();
		Long id = processVerificationDetails.getOpening_id();
		try {
			String value = "";

			
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			if (processVerificationDetails.getFormatNo() == null)
				value = "formatNo";
			if (processVerificationDetails.getSopNumber() == null)
				value = "SopNumber";
			if (processVerificationDetails.getRevisionNo() == null)
				value = "revisionNo";
			if (processVerificationDetails.getFormatName() == null)
				value = "formatName";
			if (processVerificationDetails.getUnit() == null)
				value = "Unit";
			if (processVerificationDetails.getShift() == null)
				value = "Shift";
			if (processVerificationDetails.getDate() == null)
				value = "Date";
			if (processVerificationDetails.getOrder_no() == null)
				value = "OrderNumber";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}
			if (id != null) {

				processsetupverificationopeninglinef002 = processsetupverificationopeninglinef002repository
						.findProcessSetupDetailsById(id);

				String[] IgnoreProps = { "opening_id", "createdBy", "createdAt", "operator_status", "operator_save_by",
						"operator_save_on", "operator_save_id", "operator_submitted_by", "operator_submitted_on",
						"operator_submitted_id", "operator_sign", "supervisor_status", "supervisor_save_on",
						"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign", "supervisior_mail_status", "hod_status",
						"hod_save_on", "hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id",
						"hod_sign,hod_mail_status", "supervisor_sign", "hod_sign", "operator_sign" };

				BeanUtils.copyProperties(processVerificationDetails, processsetupverificationopeninglinef002,
						IgnoreProps);
				if (!processsetupverificationopeninglinef002.getOperator_status().equals(AppConstants.operatorApprove)
						|| processsetupverificationopeninglinef002.getSupervisor_status()
								.equals(AppConstants.supervisorRejectedStatus)
						|| processsetupverificationopeninglinef002.getHod_status()
								.equals(AppConstants.hodRejectedStatus)) {
					if (userRole.equalsIgnoreCase(AppConstantsSplunance.operatorRole)) {
						processsetupverificationopeninglinef002.setOperator_status(AppConstants.operatorSave);
						processsetupverificationopeninglinef002.setOperator_save_by(userName);
						processsetupverificationopeninglinef002.setOperator_save_on(date);
						processsetupverificationopeninglinef002.setOperator_save_id(userId);

						processsetupverificationopeninglinef002.setSupervisor_status("");

						processsetupverificationopeninglinef002repository.save(processsetupverificationopeninglinef002);

					}

					else {

						return new ResponseEntity(
								new ApiResponse(false, "Unauthorize to save Process Setup Details Report"),
								HttpStatus.FORBIDDEN);
					}
				}
			}

			else {

				if (!userRole.equals("ROLE_OPERATOR")) {
					return new ResponseEntity(
							new ApiResponse(false, "Unauthorize to save Process Setup Details Report"),
							HttpStatus.BAD_REQUEST);
				}
				if (userRole.equalsIgnoreCase(AppConstantsSplunance.operatorRole)) {
					processVerificationDetails.setOperator_status(AppConstants.operatorSave);
					processVerificationDetails.setOperator_save_by(userName);
					processVerificationDetails.setOperator_save_on(date);
					processVerificationDetails.setOperator_save_id(userId);

					processVerificationDetails.setSupervisor_status("");
//					processVerificationDetails.setHod_status(AppConstants.waitingStatus);
					processsetupverificationopeninglinef002repository.save(processVerificationDetails);

					processsetupverificationopeninglinef002 = processVerificationDetails;
				}
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to save Process Setup Details" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to save Process Verification Details" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(processsetupverificationopeninglinef002, HttpStatus.CREATED);

	}

	// SUBMITF002//
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> submitProcessVerificationF002(
			ProcessSetupVerificationOpeningLineF002 processVerificationDetails, HttpServletRequest http) {

		ProcessSetupVerificationOpeningLineF002 processsetupverificationopeninglinef002 = new ProcessSetupVerificationOpeningLineF002();

		Long id = processVerificationDetails.getOpening_id();
		try {
			String value = "";

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			if (processVerificationDetails.getFormatNo() == null)
				value = "formatNo";
			if (processVerificationDetails.getSopNumber() == null)
				value = "SopNumber";
			if (processVerificationDetails.getRevisionNo() == null)
				value = "revisionNo";
			if (processVerificationDetails.getFormatName() == null)
				value = "formatName";
			if (processVerificationDetails.getUnit() == null)
				value = "Unit";
			if (processVerificationDetails.getShift() == null)
				value = "Shift";
			if (processVerificationDetails.getDate() == null)
				value = "Date";
			if (processVerificationDetails.getOrder_no() == null)
				value = "OrderNumber";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			if (id != null) {

				processsetupverificationopeninglinef002 = processsetupverificationopeninglinef002repository
						.findProcessSetupDetailsById(id);

				String[] IgnoreProps = { "opening_id", "createdBy", "createdAt", "operator_status", "operator_save_by",
						"operator_save_on", "operator_save_id", "operator_submitted_by", "operator_submitted_on",
						"operator_submitted_id", "operator_sign", "supervisor_status", "supervisor_save_on",
						"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign", "supervisior_mail_status", "hod_status",
						"hod_save_on", "hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id",
						"hod_sign,hod_mail_status", "supervisor_sign", "hod_sign", "operator_sign" };

				BeanUtils.copyProperties(processVerificationDetails, processsetupverificationopeninglinef002,
						IgnoreProps);
				if (!processsetupverificationopeninglinef002.getOperator_status().equals(AppConstants.operatorApprove)
						|| processsetupverificationopeninglinef002.getSupervisor_status()
								.equals(AppConstants.supervisorRejectedStatus)
						|| processsetupverificationopeninglinef002.getHod_status()
								.equals(AppConstants.hodRejectedStatus)) {

					if (userRole.equalsIgnoreCase(AppConstantsSplunance.operatorRole)) {
						processsetupverificationopeninglinef002.setOperator_status(AppConstants.operatorApprove);
						processsetupverificationopeninglinef002.setOperator_submitted_by(userName);
						processsetupverificationopeninglinef002.setOperator_submitted_on(date);
						processsetupverificationopeninglinef002.setOperator_submitted_id(userId);
						processsetupverificationopeninglinef002.setOperator_sign(userName);

						processsetupverificationopeninglinef002.setSupervisor_status(AppConstants.waitingStatus);
//						processsetupverificationopeninglinef002.setHod_status(AppConstants.waitingStatus);
						processsetupverificationopeninglinef002.setHod_status("");
						// IMAGE

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);

						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

						processsetupverificationopeninglinef002.setSupervisor_signature_image(signature);

						processsetupverificationopeninglinef002repository.save(processsetupverificationopeninglinef002);

						ProcessSetupVerificationOpeningLineHistoryF002 rejectionReportHistory = new ProcessSetupVerificationOpeningLineHistoryF002();

						BeanUtils.copyProperties(processsetupverificationopeninglinef002, rejectionReportHistory);

						String order1 = rejectionReportHistory.getOrder_no();

						int version = processsetupverificationopeninglinehistoryf002repository.getMaximumVersion(order1)
								.map(temp -> temp + 1).orElse(1);
						

						rejectionReportHistory.setVersion(version);
						processsetupverificationopeninglinehistoryf002repository.save(rejectionReportHistory);

						try {

							spunlacemailfunction.sendEmailToSupervisorsF002(processsetupverificationopeninglinef002);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
									HttpStatus.OK);
						}
					}
				}

				else {

					return new ResponseEntity(
							new ApiResponse(false, "Unauthorize to Submit Process Setup Details Report"),
							HttpStatus.FORBIDDEN);
				}
			} else {

				if (!userRole.equals("ROLE_OPERATOR")) {
					return new ResponseEntity(new ApiResponse(false, "Unauthorize to Submit"), HttpStatus.BAD_REQUEST);
				}
				if (userRole.equalsIgnoreCase(AppConstantsSplunance.operatorRole)) {
					processVerificationDetails.setOperator_status(AppConstants.operatorApprove);
					processVerificationDetails.setOperator_submitted_by(userName);
					processVerificationDetails.setOperator_submitted_on(date);
					processVerificationDetails.setOperator_submitted_id(userId);
					processVerificationDetails.setOperator_sign(userName);
					processVerificationDetails.setSupervisor_status(AppConstants.waitingStatus);
//					processVerificationDetails.setHod_status(AppConstants.waitingStatus);		
					processVerificationDetails.setHod_status("");
					processsetupverificationopeninglinef002repository.save(processVerificationDetails);
					processsetupverificationopeninglinef002 = processVerificationDetails;
					// IMAGE

					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

					processsetupverificationopeninglinef002.setSupervisor_signature_image(signature);

					processsetupverificationopeninglinef002repository.save(processsetupverificationopeninglinef002);

					ProcessSetupVerificationOpeningLineHistoryF002 rejectionReportHistory = new ProcessSetupVerificationOpeningLineHistoryF002();

					BeanUtils.copyProperties(processsetupverificationopeninglinef002, rejectionReportHistory);

					String order1 = rejectionReportHistory.getOrder_no();

					int version = processsetupverificationopeninglinehistoryf002repository.getMaximumVersion(order1)
							.map(temp -> temp + 1).orElse(1);
					

					rejectionReportHistory.setVersion(version);
					processsetupverificationopeninglinehistoryf002repository.save(rejectionReportHistory);

					try {

						spunlacemailfunction.sendEmailToSupervisorsF002(processsetupverificationopeninglinef002);
					} catch (Exception ex) {
						return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
								HttpStatus.OK);
					}
				}
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit Process Setup Details" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit Process Verification Details" + msg),
					HttpStatus.BAD_REQUEST);
		}

//		return new ResponseEntity(processsetupverificationopeninglinef002, HttpStatus.CREATED);

		return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);

	}

	// Summary for operator, supervisor, hod f002

	public ResponseEntity<?> summaryProcessVerificationF002() {
		String userRole = getUserRole();
		List<ProcessSetupVerificationOpeningLineF002> processSetupDetails = new ArrayList<>();
		try {
			if (userRole.equalsIgnoreCase(AppConstantsSplunance.operatorRole)) {
				processSetupDetails = processsetupverificationopeninglinef002repository.operatorSummary();
			} else if (userRole.equalsIgnoreCase(AppConstantsSplunance.supervisiorRole)) {
				processSetupDetails = processsetupverificationopeninglinef002repository.hodSummary();
			}

			else if (userRole.equalsIgnoreCase(AppConstantsSplunance.hodRole)
					|| userRole.equalsIgnoreCase(AppConstantsSplunance.designeeRole)) {
				processSetupDetails = processsetupverificationopeninglinef002repository.hodSummary();
			} else {
				return new ResponseEntity<>(userRole + " " + "Not authorised to access the form",
						HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity<>(processSetupDetails, HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

// APPROVE REJECT BY SUPERVISOR AND HOD
	public ResponseEntity<?> approveRejectProcessVerificationF002(ApproveResponse approvalResponse,
			HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();

		ProcessSetupVerificationOpeningLineF002 processSetupVerification = new ProcessSetupVerificationOpeningLineF002();

		Long id = approvalResponse.getId();
		try {
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			processSetupVerification = processsetupverificationopeninglinef002repository
					.findProcessSetupDetailsById(id);

			ProcessSetupVerificationOpeningLineHistoryF002 history = new ProcessSetupVerificationOpeningLineHistoryF002();

			String supervisorStatus = processSetupVerification.getSupervisor_status();
			String hodStatus = processSetupVerification.getHod_status();

			if (supervisorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
					&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {
						processSetupVerification.setHod_status(AppConstants.hodApprovedStatus);
						processSetupVerification.setHod_submit_on(date);
						processSetupVerification.setHod_submit_by(userName);
						processSetupVerification.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						processSetupVerification.setHod_signature_image(signature);
						processSetupVerification.setHod_sign(userName);

						processsetupverificationopeninglinef002repository.save(processSetupVerification);

						history = processsetupverificationopeninglinehistoryf002repository.fetchLastSubmittedRecord(

								processSetupVerification.getOrder_no());

						history.setHod_status(AppConstants.hodApprovedStatus);
						history.setHod_submit_on(date);
						history.setHod_submit_by(userName);
						history.setHod_submit_id(userId);
						history.setHod_sign(userName);

						processsetupverificationopeninglinehistoryf002repository.save(history);

						return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);

					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						processSetupVerification.setReason(reason);
						processSetupVerification.setHod_status(AppConstants.hodRejectedStatus);
						processSetupVerification.setHod_submit_on(date);
						processSetupVerification.setHod_submit_by(userName);
						processSetupVerification.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						processSetupVerification.setHod_signature_image(signature);
						processSetupVerification.setHod_sign(userName);

						processsetupverificationopeninglinef002repository.save(processSetupVerification);

						history = processsetupverificationopeninglinehistoryf002repository.fetchLastSubmittedRecord(

								processSetupVerification.getOrder_no());

						history.setReason(reason);
						history.setHod_status(AppConstants.hodRejectedStatus);
						history.setHod_submit_on(date);
						history.setHod_submit_by(userName);
						history.setHod_submit_id(userId);
						history.setHod_sign(userName);

						processsetupverificationopeninglinehistoryf002repository.save(history);

						return new ResponseEntity<>(new ApiResponse(true, "HOD Rejected Successfully"), HttpStatus.OK);

					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			} else if (processSetupVerification.getOperator_status().equalsIgnoreCase(AppConstants.operatorApprove)
					&& supervisorStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {

					if (approvalResponse.getStatus().equals("Approve")) {
						processSetupVerification.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						processSetupVerification.setSupervisor_submit_on(date);
						processSetupVerification.setSupervisor_submit_by(userName);
						processSetupVerification.setSupervisor_submit_id(userId);

						processSetupVerification.setHod_status(AppConstants.waitingStatus);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						processSetupVerification.setSupervisor_signature_image(signature);
						processSetupVerification.setSupervisor_sign(userName);

						processsetupverificationopeninglinef002repository.save(processSetupVerification);

						history = processsetupverificationopeninglinehistoryf002repository.fetchLastSubmittedRecord(

								processSetupVerification.getOrder_no());

						history.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						history.setSupervisor_submit_on(date);
						history.setSupervisor_submit_by(userName);
						history.setSupervisor_submit_id(userId);
						history.setSupervisor_sign(userName);

						history.setHod_status(AppConstants.waitingStatus);

						processsetupverificationopeninglinehistoryf002repository.save(history);
						try {

							spunlacemailfunction.sendEmailToHodF002(processSetupVerification);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
									HttpStatus.OK);
						}

						return new ResponseEntity<>(new ApiResponse(true, "Supervisor Approved Successfully"),
								HttpStatus.OK);

					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						processSetupVerification.setReason(reason);
						processSetupVerification.setSupervisor_status(AppConstants.supervisorRejectedStatus);
						processSetupVerification.setSupervisor_submit_on(date);
						processSetupVerification.setSupervisor_submit_by(userName);
						processSetupVerification.setSupervisor_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						processSetupVerification.setSupervisor_signature_image(signature);
						processSetupVerification.setSupervisor_sign(userName);

						processsetupverificationopeninglinef002repository.save(processSetupVerification);

						history = processsetupverificationopeninglinehistoryf002repository.fetchLastSubmittedRecord(

								processSetupVerification.getOrder_no());

						history.setReason(reason);
						history.setSupervisor_status(AppConstants.supervisorRejectedStatus);
						history.setSupervisor_submit_on(date);
						history.setSupervisor_submit_by(userName);
						history.setSupervisor_submit_id(userId);
						history.setSupervisor_sign(userName);

						processsetupverificationopeninglinehistoryf002repository.save(history);

						return new ResponseEntity<>(new ApiResponse(true, "Supervisor Rejected Successfully"),
								HttpStatus.OK);

					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} else {
					return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to Approve"),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {
			String msg = e.getMessage();
			logger.error("Unable to Approve/Reject Process Setup Details" + msg);
			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to Approve/Reject Process Verification Details " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	// ------------------------------------------------------------------------F008---------------------------------------------------------------------------------------------//
	// SAVE DailyStoppageReportSpunlace
	public ResponseEntity<?> saveDailyStoppageReport(DailyStoppageReportSpunlaceF008 stoppageReportDetails,
			HttpServletRequest http) {

		DailyStoppageReportSpunlaceF008 dailyStoppageReport = new DailyStoppageReportSpunlaceF008();
		Long id = stoppageReportDetails.getStoppage_id();
		try {
			String value = "";
			
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			// Mandatory fields validation
			if (stoppageReportDetails.getFormatNo() == null)
				value = "formatNo";
			if (stoppageReportDetails.getSopNumber() == null)
				value = "SopNumber";
			if (stoppageReportDetails.getRevisionNo() == null)
				value = "revisionNo";
			if (stoppageReportDetails.getFormatName() == null)
				value = "formatName";
			if (stoppageReportDetails.getUnit() == null)
				value = "Unit";
			if (stoppageReportDetails.getDate() == null)
				value = "Date";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields! " + value),
						HttpStatus.BAD_REQUEST);
			}

			if (id != null) {
				dailyStoppageReport = dailystoppagereportspunlacef008repository.findById(id).orElse(null);

				if (dailyStoppageReport != null) {
					String[] ignoreProps = { "stoppage_id", "createdBy", "createdAt", "supervisor_status",
							"supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
							"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign",
							"supervisior_mail_status", "hod_status", "hod_save_on", "hod_save_by", "hod_save_id",
							"hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign", "hod_mail_status",
							"supervisor_signature_image", "hod_signature_image" };

					BeanUtils.copyProperties(stoppageReportDetails, dailyStoppageReport, ignoreProps);

					if (userRole.equalsIgnoreCase(AppConstantsSplunance.supervisiorRole)) {

						dailyStoppageReport.setSupervisor_status(AppConstants.supervisorSave);
						dailyStoppageReport.setSupervisor_save_by(userName);
						dailyStoppageReport.setSupervisor_save_on(date);
						dailyStoppageReport.setSupervisor_save_id(userId);
//		                        stoppageReportDetails.setSupervisior_mail_status(AppConstants.waitingStatus);
						dailyStoppageReport.setHod_status(AppConstants.waitingStatus);
						dailyStoppageReport.setHod_mail_status(AppConstants.waitingStatus);

						dailystoppagereportspunlacef008repository.save(dailyStoppageReport);

						List<StoppageDetailsF008> lineDetails = stoppageReportDetails.getStoppageDetails();

						for (StoppageDetailsF008 lineDetail : lineDetails) {

							Long shopId = dailyStoppageReport.getStoppage_id();

							lineDetail.setStoppage_id(shopId);

							stoppagedetailsf008repository.save(lineDetail);

						}
						dailyStoppageReport.setStoppageDetails(lineDetails);
						dailystoppagereportspunlacef008repository.save(dailyStoppageReport);

					} else {
						return new ResponseEntity<>(
								new ApiResponse(false, "Unauthorized to save Daily Stoppage Report"),
								HttpStatus.FORBIDDEN);
					}
				}

			} else {
				if (!userRole.equals("ROLE_SUPERVISOR")) {
					return new ResponseEntity<>(new ApiResponse(false, "ROLE_SUPERVISOR can submit details"),
							HttpStatus.BAD_REQUEST);
				}
				if (userRole.equalsIgnoreCase(AppConstantsSplunance.supervisiorRole)) {

					dailyStoppageReport = stoppageReportDetails;

					dailystoppagereportspunlacef008repository.save(dailyStoppageReport);

					dailyStoppageReport.setSupervisor_status(AppConstants.supervisorSave);
					dailyStoppageReport.setSupervisor_save_by(userName);
					dailyStoppageReport.setSupervisor_save_on(date);
					dailyStoppageReport.setSupervisor_save_id(userId);
//                        stoppageReportDetails.setSupervisior_mail_status(AppConstants.waitingStatus);
					dailyStoppageReport.setHod_status(AppConstants.waitingStatus);
					dailyStoppageReport.setHod_mail_status(AppConstants.waitingStatus);

					List<StoppageDetailsF008> lineDetails = stoppageReportDetails.getStoppageDetails();

					for (StoppageDetailsF008 lineDetail : lineDetails) {

						Long shopId = dailyStoppageReport.getStoppage_id();

						lineDetail.setStoppage_id(shopId);

						stoppagedetailsf008repository.save(lineDetail);

					}
					dailyStoppageReport.setStoppageDetails(lineDetails);

					dailystoppagereportspunlacef008repository.save(dailyStoppageReport);
				}
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to save Daily Stoppage Report: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to save Daily Stoppage Report" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(dailyStoppageReport, HttpStatus.CREATED);
	}

	@SuppressWarnings("rawtypes")
	public ResponseEntity<?> submitDailyStoppageReport(DailyStoppageReportSpunlaceF008 stoppageReportDetails,
			HttpServletRequest http) {

		DailyStoppageReportSpunlaceF008 dailyStoppageReport = new DailyStoppageReportSpunlaceF008();
		Long id = stoppageReportDetails.getStoppage_id();
		try {
			String value = "";
			
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			// Mandatory fields validation
			if (stoppageReportDetails.getFormatNo() == null)
				value = "formatNo";
			if (stoppageReportDetails.getSopNumber() == null)
				value = "SopNumber";
			if (stoppageReportDetails.getRevisionNo() == null)
				value = "revisionNo";
			if (stoppageReportDetails.getFormatName() == null)
				value = "formatName";
			if (stoppageReportDetails.getUnit() == null)
				value = "Unit";
			if (stoppageReportDetails.getDate() == null)
				value = "Date";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields! " + value),
						HttpStatus.BAD_REQUEST);
			}

			if (id != null) {
				dailyStoppageReport = dailystoppagereportspunlacef008repository.findById(id).orElse(null);

				if (dailyStoppageReport != null) {
					String[] ignoreProps = { "stoppage_id", "createdBy", "createdAt", "supervisor_status",
							"supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
							"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign",
							"supervisior_mail_status", "hod_status", "hod_save_on", "hod_save_by", "hod_save_id",
							"hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign", "hod_mail_status",
							"supervisor_signature_image", "hod_signature_image" };

					BeanUtils.copyProperties(stoppageReportDetails, dailyStoppageReport, ignoreProps);

					if (userRole.equalsIgnoreCase(AppConstantsSplunance.supervisiorRole)) {

						dailystoppagereportspunlacef008repository.save(dailyStoppageReport);
						List<StoppageDetailsF008> lineDetails = stoppageReportDetails.getStoppageDetails();

						for (StoppageDetailsF008 lineDetail : lineDetails) {

							Long shopId = dailyStoppageReport.getStoppage_id();

							lineDetail.setStoppage_id(shopId);
//	                        date1 = lineDetail.getd();
							stoppagedetailsf008repository.save(lineDetail);

						}
						dailyStoppageReport.setStoppageDetails(lineDetails);
						dailystoppagereportspunlacef008repository.save(dailyStoppageReport);

						dailyStoppageReport.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						dailyStoppageReport.setSupervisor_submit_by(userName);
						dailyStoppageReport.setSupervisor_submit_on(date);
						dailyStoppageReport.setSupervisor_submit_id(userId);
						dailyStoppageReport.setSupervisor_sign(userName);
//		                        stoppageReportDetails.setSupervisior_mail_status(AppConstants.supervisorApprovedStatus);
						dailyStoppageReport.setHod_status(AppConstants.waitingStatus);
						dailyStoppageReport.setHod_mail_status(AppConstants.waitingStatus);

						// signature image
						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						dailyStoppageReport.setSupervisor_signature_image(signature);

						dailystoppagereportspunlacef008repository.save(dailyStoppageReport);
						DailyStoppageReportSpunlaceHistoryF008 rejectionReportHistory = new DailyStoppageReportSpunlaceHistoryF008();

//						BeanUtils.copyProperties(dailyStoppageReport, rejectionReportHistory);
						// getter setters fields & status

						rejectionReportHistory.setFormatName(dailyStoppageReport.getFormatName());
						rejectionReportHistory.setFormatNo(dailyStoppageReport.getFormatNo());
						rejectionReportHistory.setRevisionNo(dailyStoppageReport.getRevisionNo());
						rejectionReportHistory.setSopNumber(dailyStoppageReport.getSopNumber());
						rejectionReportHistory.setUnit(dailyStoppageReport.getUnit());
						rejectionReportHistory.setDate(dailyStoppageReport.getDate());

						// status
						rejectionReportHistory.setSupervisor_submit_by(dailyStoppageReport.getSupervisor_submit_by());
						rejectionReportHistory.setSupervisor_submit_id(dailyStoppageReport.getSupervisor_submit_id());
						rejectionReportHistory.setSupervisor_submit_on(dailyStoppageReport.getSupervisor_submit_on());
						rejectionReportHistory.setSupervisor_status(dailyStoppageReport.getSupervisor_status());
						rejectionReportHistory.setSupervisor_sign(dailyStoppageReport.getSupervisor_sign());
						rejectionReportHistory
								.setSupervisor_signature_image(dailyStoppageReport.getSupervisor_signature_image());
						rejectionReportHistory.setHod_status(dailyStoppageReport.getHod_status());
						String date1 = dailyStoppageReport.getDate();

						int version = dailystoppagereportspunlacehistoryf008repository.getMaximumVersion(date1)
								.map(temp -> temp + 1).orElse(1);
						

						rejectionReportHistory.setVersion(version);
						dailystoppagereportspunlacehistoryf008repository.save(rejectionReportHistory);

						try {

							spunlacemailfunction.sendEmailToHodF008(dailyStoppageReport);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
									HttpStatus.OK);
						}
					}

					else {
						return new ResponseEntity<>(new ApiResponse(false, "Unable to save"), HttpStatus.FORBIDDEN);
					}

				} else {
					return new ResponseEntity<>(new ApiResponse(false, "Unauthorized to submit Daily Stoppage Report"),
							HttpStatus.FORBIDDEN);
				}

			} else {
				if (!userRole.equals("ROLE_SUPERVISOR")) {
					return new ResponseEntity<>(new ApiResponse(false, "ROLE_SUPERVISOR can submit details"),
							HttpStatus.BAD_REQUEST);
				}
				if (userRole.equalsIgnoreCase(AppConstantsSplunance.supervisiorRole)) {

					dailyStoppageReport = stoppageReportDetails;

					dailystoppagereportspunlacef008repository.save(dailyStoppageReport);
					List<StoppageDetailsF008> lineDetails = stoppageReportDetails.getStoppageDetails();
					String order1 = null;
					for (StoppageDetailsF008 lineDetail : lineDetails) {

						Long shopId = dailyStoppageReport.getStoppage_id();

						lineDetail.setStoppage_id(shopId);
						order1 = lineDetail.getOrder_number();
						stoppagedetailsf008repository.save(lineDetail);

					}
					dailyStoppageReport.setStoppageDetails(lineDetails);

					dailyStoppageReport.setSupervisor_status(AppConstants.supervisorApprovedStatus);
					dailyStoppageReport.setSupervisor_submit_by(userName);
					dailyStoppageReport.setSupervisor_submit_on(date);
					dailyStoppageReport.setSupervisor_submit_id(userId);
					dailyStoppageReport.setSupervisor_sign(userName);
//	                    stoppageReportDetails.setSupervisior_mail_status(AppConstants.supervisorApprovedStatus);
					dailyStoppageReport.setHod_status(AppConstants.waitingStatus);
					dailyStoppageReport.setHod_mail_status(AppConstants.waitingStatus);

					// signature image
					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
					dailyStoppageReport.setSupervisor_signature_image(signature);

					dailystoppagereportspunlacef008repository.save(dailyStoppageReport);
					DailyStoppageReportSpunlaceHistoryF008 rejectionReportHistory = new DailyStoppageReportSpunlaceHistoryF008();

//					BeanUtils.copyProperties(dailyStoppageReport, rejectionReportHistory);
					// getter setters fields & status

					rejectionReportHistory.setFormatName(dailyStoppageReport.getFormatName());
					rejectionReportHistory.setFormatNo(dailyStoppageReport.getFormatNo());
					rejectionReportHistory.setRevisionNo(dailyStoppageReport.getRevisionNo());
					rejectionReportHistory.setSopNumber(dailyStoppageReport.getSopNumber());
					rejectionReportHistory.setUnit(dailyStoppageReport.getUnit());
					rejectionReportHistory.setDate(dailyStoppageReport.getDate());

					// status
					rejectionReportHistory.setSupervisor_submit_by(dailyStoppageReport.getSupervisor_submit_by());
					rejectionReportHistory.setSupervisor_submit_id(dailyStoppageReport.getSupervisor_submit_id());
					rejectionReportHistory.setSupervisor_submit_on(dailyStoppageReport.getSupervisor_submit_on());
					rejectionReportHistory.setSupervisor_status(dailyStoppageReport.getSupervisor_status());
					rejectionReportHistory.setSupervisor_sign(dailyStoppageReport.getSupervisor_sign());
					rejectionReportHistory
							.setSupervisor_signature_image(dailyStoppageReport.getSupervisor_signature_image());
					rejectionReportHistory.setHod_status(dailyStoppageReport.getHod_status());

					int version = dailystoppagereportspunlacehistoryf008repository.getMaximumVersion(order1)
							.map(temp -> temp + 1).orElse(1);
					;

					rejectionReportHistory.setVersion(version);
					dailystoppagereportspunlacehistoryf008repository.save(rejectionReportHistory);

					try {
						spunlacemailfunction.sendEmailToHodF008(dailyStoppageReport);
					} catch (Exception ex) {
						return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
								HttpStatus.OK);
					}
				}
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();
			logger.error("Unable to submit Daily Stoppage Report: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to submit Daily Stoppage Report"),
					HttpStatus.BAD_REQUEST);
		}


		return new ResponseEntity(new ApiResponse(true, "Submitted Sucessfully"), HttpStatus.OK);
	}

	//// approve reject
	public ResponseEntity<?> approveRejectDailyStoppageReport(ApproveResponse approvalResponse,
			HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();

		try {
			Long id = approvalResponse.getId();
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			DailyStoppageReportSpunlaceF008 dailyStoppageReport = dailystoppagereportspunlacef008repository.findById(id)
					.orElse(null);
			if (dailyStoppageReport == null) {
				return new ResponseEntity<>(new ApiResponse(false, "Stoppage Report not found"), HttpStatus.NOT_FOUND);
			}

			DailyStoppageReportSpunlaceHistoryF008 history = new DailyStoppageReportSpunlaceHistoryF008();

			String supervisorStatus = dailyStoppageReport.getSupervisor_status();
			String hodStatus = dailyStoppageReport.getHod_status();

			if (supervisorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
					&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
				if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
					if (approvalResponse.getStatus().equals("Approve")) {
						dailyStoppageReport.setHod_status(AppConstants.hodApprovedStatus);
						dailyStoppageReport.setHod_submit_on(date);
						dailyStoppageReport.setHod_submit_by(userName);
						dailyStoppageReport.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						dailyStoppageReport.setHod_signature_image(signature);
						dailyStoppageReport.setHod_sign(userName);

						dailystoppagereportspunlacef008repository.save(dailyStoppageReport);

						history = dailystoppagereportspunlacehistoryf008repository
								.fetchLastSubmittedRecord(dailyStoppageReport.getDate());
						history.setHod_status(AppConstants.hodApprovedStatus);
						history.setHod_submit_on(date);
						history.setHod_submit_by(userName);
						history.setHod_submit_id(userId);
						history.setHod_sign(userName);

						dailystoppagereportspunlacehistoryf008repository.save(history);

						return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);

					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						dailyStoppageReport.setReason(reason);
						dailyStoppageReport.setHod_status(AppConstants.hodRejectedStatus);
						dailyStoppageReport.setHod_submit_on(date);
						dailyStoppageReport.setHod_submit_by(userName);
						dailyStoppageReport.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						dailyStoppageReport.setHod_signature_image(signature);
						dailyStoppageReport.setHod_sign(userName);

						dailystoppagereportspunlacef008repository.save(dailyStoppageReport);

						history = dailystoppagereportspunlacehistoryf008repository
								.fetchLastSubmittedRecord(dailyStoppageReport.getDate());
						history.setReason(reason);
						history.setHod_status(AppConstants.hodRejectedStatus);
						history.setHod_submit_on(date);
						history.setHod_submit_by(userName);
						history.setHod_submit_id(userId);
						history.setHod_sign(userName);

						dailystoppagereportspunlacehistoryf008repository.save(history);

					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}
			}
		} catch (Exception e) {
			String msg = e.getMessage();
			logger.error("Unable to Approve/Reject Daily Stoppage Report: " + msg);
			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to Approve/Reject Daily Stoppage Report: " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(new ApiResponse(true, "HOD Rejected Successfully"), HttpStatus.OK);

	}

	// Summary for supervisor, hod f003

	public ResponseEntity<?> summarydailyStoppageReport() {
		String userRole = getUserRole();
		List<DailyStoppageReportSpunlaceF008> stoppageDetails = new ArrayList<>();
		try {

			if (userRole.equalsIgnoreCase(AppConstantsSplunance.supervisiorRole)) {
				stoppageDetails = dailystoppagereportspunlacef008repository.supervisorSummary();
			}

			else if (userRole.equalsIgnoreCase(AppConstantsSplunance.hodRole)
					|| userRole.equalsIgnoreCase(AppConstantsSplunance.designeeRole)) {
				stoppageDetails = dailystoppagereportspunlacef008repository.hodSummary();
			} else {
				return new ResponseEntity<>(userRole + " " + "Not authorised to access the form",
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(stoppageDetails, HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	// ------------------------------------------------------------------------F012---------------------------------------------------------------------------------------------//
//	// SAVE DailyStoppageReportSpunlace
//	public ResponseEntity<?> saveSpunlaceSampleReportF012(SpunlaceSampleReportF012 spunlacesamplereportf012,
//			HttpServletRequest http) {
//
//		SpunlaceSampleReportF012 sampleReport = new SpunlaceSampleReportF012();
//		Long id = spunlacesamplereportf012.getReport_id();
//		try {
//			String value = "";
//			String createdBy = "";
//			Date createdAt = null;
//
//			String userRole = getUserRole();
//			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//			String userName = userRepository.getUserName(userId);
//			LocalDateTime currentDate = LocalDateTime.now();
//			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//			// Mandatory fields validation
//			if (spunlacesamplereportf012.getFormatNo() == null)
//				value = "formatNo";
//			if (spunlacesamplereportf012.getSopNumber() == null)
//				value = "SopNumber";
//			if (spunlacesamplereportf012.getRevisionNo() == null)
//				value = "revisionNo";
//			if (spunlacesamplereportf012.getFormatName() == null)
//				value = "formatName";
//			if (spunlacesamplereportf012.getUnit() == null)
//				value = "Unit";
//			if (spunlacesamplereportf012.getDate() == null)
//				value = "Date";
//			if (spunlacesamplereportf012.getShift() == null)
//				value = "Shift";
//			if (spunlacesamplereportf012.getOrder_no() == null)
//				value = "OrderNo";
//
//			if (!"".equals(value)) {
//				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields! " + value),
//						HttpStatus.BAD_REQUEST);
//			}
//
//			if (id != null) {
//				sampleReport = spunlacesamplereportf012repository.findById(id).orElse(null);
//
//				if (sampleReport != null) {
//					String[] ignoreProps = { "report_id", "createdBy", "createdAt", "supervisor_status",
//							"supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
//							"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign",
//							"supervisior_mail_status", "qc_status", "qc_save_on", "qc_save_by", "qc_save_id",
//							"qc_submit_on", "qc_submit_by", "qc_submit_id", "qc_sign,qc_mail_status", "hod_status",
//							"hod_save_on", "hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by",
//							"hod_submit_id", "hod_sign", "hod_mail_status" };
//
//					BeanUtils.copyProperties(spunlacesamplereportf012, sampleReport, ignoreProps);
//
//					if (userRole.equalsIgnoreCase(AppConstantsSplunance.supervisiorRole)) {
//						
//						spunlacesamplereportf012repository.save(sampleReport);
//
//						List<SpunlaceSampleReportDetailsF012> list = spunlacesamplereportf012.getReportDetails();
//
//						for (SpunlaceSampleReportDetailsF012 detail : list) {
//							detail.setReport_id(sampleReport.getReport_id());
//							spunlacesamplereportf012repository.save(sampleReport);
//						}
//						
//						sampleReport.setReportDetails(list);
//
//						sampleReport.setSupervisor_status(AppConstants.supervisorSave);
//						sampleReport.setSupervisor_save_by(userName);
//						sampleReport.setSupervisor_save_on(date);
//						sampleReport.setSupervisor_save_id(userId);
////			                        stoppageReportDetails.setSupervisior_mail_status(AppConstants.waitingStatus);
////						sampleReport.setHod_status(AppConstants.supervisiorMailStatus);
////						sampleReport.setHod_mail_status(AppConstants.waitingStatus);
//
//						spunlacesamplereportf012repository.save(sampleReport);
//
//					} else if (userRole.equalsIgnoreCase(AppConstantsSplunance.qcRole)) {
//						
//						spunlacesamplereportf012repository.save(sampleReport);
//
//						List<SpunlaceSampleReportDetailsF012> list = spunlacesamplereportf012.getReportDetails();
//
//						for (SpunlaceSampleReportDetailsF012 detail : list) {
//							detail.setReport_id(sampleReport.getReport_id());
//							spunlacesamplereportf012repository.save(sampleReport);
//						}
//						
//						sampleReport.setReportDetails(list);
//
//						sampleReport.setQc_status(AppConstants.qcSave);
//						sampleReport.setQc_save_by(userName);
//						sampleReport.setQc_save_on(date);
//						sampleReport.setQc_save_id(userId);
////			                     stoppageReportDetails.setSupervisior_mail_status(AppConstants.waitingStatus);
//						sampleReport.setHod_status(AppConstants.supervisiorMailStatus);
//						sampleReport.setHod_mail_status(AppConstants.waitingStatus);
//
//						spunlacesamplereportf012repository.save(sampleReport);
//
//					} else if (userRole.equalsIgnoreCase(AppConstantsSplunance.hodRole)
//							|| userRole.equalsIgnoreCase(AppConstantsSplunance.designeeRole)) {
//						if (sampleReport.getSupervisor_status()
//								.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)) {
//							
//							spunlacesamplereportf012repository.save(sampleReport);
//
//							List<SpunlaceSampleReportDetailsF012> list = spunlacesamplereportf012.getReportDetails();
//
//							for (SpunlaceSampleReportDetailsF012 detail : list) {
//								detail.setReport_id(sampleReport.getReport_id());
//								spunlacesamplereportf012repository.save(sampleReport);
//							}
//							
//							sampleReport.setReportDetails(list);
//							
//							sampleReport.setHod_status(AppConstants.hodSave);
//							sampleReport.setHod_mail_status(AppConstants.waitingStatus);
//							sampleReport.setHod_save_by(userName);
//							sampleReport.setHod_save_id(userId);
//							sampleReport.setHod_save_on(date);
//
//							spunlacesamplereportf012repository.save(sampleReport);
//
//						} else {
//							return new ResponseEntity<>(new ApiResponse(false, "Unable to save"), HttpStatus.FORBIDDEN);
//						}
//
//					} else {
//						return new ResponseEntity<>(
//								new ApiResponse(false, "Unauthorized to save Daily Stoppage Report"),
//								HttpStatus.FORBIDDEN);
//					}
//
//				}
//
//			} else {
//				if (!userRole.equals("ROLE_SUPERVISOR")) {
//					return new ResponseEntity<>(new ApiResponse(false, "ROLE_SUPERVISOR can submit details"),
//							HttpStatus.BAD_REQUEST);
//				}
//				if (userRole.equalsIgnoreCase(AppConstantsSplunance.supervisiorRole)) {
//					
//					spunlacesamplereportf012repository.save(sampleReport);
//
//					List<SpunlaceSampleReportDetailsF012> list = spunlacesamplereportf012.getReportDetails();
//
//					for (SpunlaceSampleReportDetailsF012 detail : list) {
//						detail.setReport_id(sampleReport.getReport_id());
//						spunlacesamplereportf012repository.save(sampleReport);
//					}
//					
//					sampleReport.setReportDetails(list);
//
//					spunlacesamplereportf012.setSupervisor_status(AppConstants.supervisorSave);
//					spunlacesamplereportf012.setSupervisor_save_by(userName);
//					spunlacesamplereportf012.setSupervisor_save_on(date);
//					spunlacesamplereportf012.setSupervisor_save_id(userId);
////	                        stoppageReportDetails.setSupervisior_mail_status(AppConstants.waitingStatus);
////					spunlacesamplereportf012.setHod_status(AppConstants.supervisiorMailStatus);
////					spunlacesamplereportf012.setHod_mail_status(AppConstants.waitingStatus);
//
//					spunlacesamplereportf012repository.save(spunlacesamplereportf012);
//					sampleReport = spunlacesamplereportf012;
//
//				}
//			}
//
//		} catch (Exception ex) {
//			String msg = ex.getMessage();
//			logger.error("Unable to save Daily Stoppage Report: " + msg);
//			return new ResponseEntity<>(new ApiResponse(false, "Failed to save Sampl Report" + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//
//		return new ResponseEntity<>(sampleReport, HttpStatus.CREATED);
//	}
//	// Submit F012
//
//	// SUBMIT DailyStoppageReportSpunlace
//	public ResponseEntity<?> submitSampleReportF012(SpunlaceSampleReportF012 sampleReportDetails,
//			HttpServletRequest http) {
//
//		SpunlaceSampleReportF012 sampleReportF012 = new SpunlaceSampleReportF012();
//		Long id = sampleReportDetails.getReport_id();
//		try {
//			String value = "";
//			String createdBy = "";
//			Date createdAt = null;
//
//			String userRole = getUserRole();
//			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//			String userName = userRepository.getUserName(userId);
//			LocalDateTime currentDate = LocalDateTime.now();
//			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//			// Mandatory fields validation
//			if (sampleReportDetails.getFormatNo() == null)
//				value = "formatNo";
//			if (sampleReportDetails.getSopNumber() == null)
//				value = "SopNumber";
//			if (sampleReportDetails.getRevisionNo() == null)
//				value = "revisionNo";
//			if (sampleReportDetails.getFormatName() == null)
//				value = "formatName";
//			if (sampleReportDetails.getUnit() == null)
//				value = "Unit";
//			if (sampleReportDetails.getDate() == null)
//				value = "Date";
//			if (sampleReportDetails.getShift() == null)
//				value = "Shift";
//			if (sampleReportDetails.getOrder_no() == null)
//				value = "OrderNo";
//
//			if (!"".equals(value)) {
//				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields! " + value),
//						HttpStatus.BAD_REQUEST);
//			}
//
//			if (id != null) {
//				sampleReportF012 = spunlacesamplereportf012repository.findById(id).orElse(null);
//
//				if (sampleReportF012 != null) {
//					String[] ignoreProps = { "report_id", "createdBy", "createdAt", "supervisor_status",
//							"supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
//							"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign",
//							"supervisior_mail_status", "qc_status", "qc_save_on", "qc_save_by", "qc_save_id",
//							"qc_submit_on", "qc_submit_by", "qc_submit_id", "qc_sign,qc_mail_status", "hod_status",
//							"hod_save_on", "hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by",
//							"hod_submit_id", "hod_sign", "hod_mail_status" };
//
//					BeanUtils.copyProperties(sampleReportDetails, sampleReportF012, ignoreProps);
//
//					if (userRole.equalsIgnoreCase(AppConstantsSplunance.supervisiorRole)) {
//
//						spunlacesamplereportf012repository.save(sampleReportF012);
//
//						List<SpunlaceSampleReportDetailsF012> list = sampleReportDetails.getReportDetails();
//
//						for (SpunlaceSampleReportDetailsF012 detail : list) {
//							detail.setReport_id(sampleReportF012.getReport_id());
//							spunlacesamplereportf012repository.save(sampleReportDetails);
//						}
//
//						sampleReportF012.setReportDetails(list);
//
//						sampleReportF012.setSupervisor_status(AppConstants.supervisorApprovedStatus);
//						sampleReportF012.setSupervisor_submit_by(userName);
//						sampleReportF012.setSupervisor_submit_on(date);
//						sampleReportF012.setSupervisor_submit_id(userId);
//						sampleReportF012.setSupervisor_sign(userName);
////		                        stoppageReportDetails.setSupervisior_mail_status(AppConstants.supervisorApprovedStatus);
////						sampleReportF012.setHod_status(AppConstants.supervisiorMailStatus);
////						sampleReportF012.setHod_mail_status(AppConstants.waitingStatus);
//
//						spunlacesamplereportf012repository.save(sampleReportF012);
//
//					}
//
//					else if (userRole.equalsIgnoreCase(AppConstantsSplunance.qcRole)) {
//
//						spunlacesamplereportf012repository.save(sampleReportF012);
//
//						List<SpunlaceSampleReportDetailsF012> list = sampleReportDetails.getReportDetails();
//
//						for (SpunlaceSampleReportDetailsF012 detail : list) {
//							detail.setReport_id(sampleReportF012.getReport_id());
//							spunlacesamplereportf012repository.save(sampleReportDetails);
//						}
//
//						sampleReportF012.setReportDetails(list);
//
//						sampleReportF012.setQc_status(AppConstants.qcSave);
//						sampleReportF012.setQc_save_by(userName);
//						sampleReportF012.setQc_save_on(date);
//						sampleReportF012.setQc_save_id(userId);
////		                     stoppageReportDetails.setSupervisior_mail_status(AppConstants.waitingStatus);
//						sampleReportF012.setHod_status(AppConstants.supervisiorMailStatus);
//						sampleReportF012.setHod_mail_status(AppConstants.waitingStatus);
//
//					} else if (userRole.equalsIgnoreCase(AppConstantsSplunance.hodRole)
//							|| userRole.equalsIgnoreCase(AppConstantsSplunance.designeeRole)) {
//						if (sampleReportF012.getSupervisor_status()
//								.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)) {
//
//							spunlacesamplereportf012repository.save(sampleReportF012);
//
//							List<SpunlaceSampleReportDetailsF012> list = sampleReportDetails.getReportDetails();
//
//							for (SpunlaceSampleReportDetailsF012 detail : list) {
//								detail.setReport_id(sampleReportF012.getReport_id());
//								spunlacesamplereportf012repository.save(sampleReportDetails);
//							}
//
//							sampleReportF012.setReportDetails(list);
//
//							sampleReportF012.setHod_status(AppConstants.hodApprovedStatus);
//							sampleReportF012.setHod_mail_status(AppConstants.hodApprovedStatus);
//							sampleReportF012.setHod_submit_by(userName);
//							sampleReportF012.setHod_submit_id(userId);
//							sampleReportF012.setHod_submit_on(date);
//							sampleReportF012.setHod_sign(userName);
//
//							spunlacesamplereportf012repository.save(sampleReportF012);
//
//							// YET TO WRITE MAIL CONTENT FOR HOD SUBMIT ...
//						} else {
//							return new ResponseEntity<>(new ApiResponse(false, "Unable to save"), HttpStatus.FORBIDDEN);
//						}
//
//					} else {
//						return new ResponseEntity<>(
//								new ApiResponse(false, "Unauthorized to submit Daily Stoppage Report"),
//								HttpStatus.FORBIDDEN);
//					}
//
//				} else {
//					if (!userRole.equals("ROLE_SUPERVISOR")) {
//						return new ResponseEntity<>(new ApiResponse(false, "ROLE_SUPERVISOR can submit details"),
//								HttpStatus.BAD_REQUEST);
//					}
//					if (userRole.equalsIgnoreCase(AppConstantsSplunance.supervisiorRole)) {
//						
//						spunlacesamplereportf012repository.save(sampleReportF012);
//
//						List<SpunlaceSampleReportDetailsF012> list = sampleReportDetails.getReportDetails();
//
//						for (SpunlaceSampleReportDetailsF012 detail : list) {
//							detail.setReport_id(sampleReportF012.getReport_id());
//							spunlacesamplereportf012repository.save(sampleReportDetails);
//						}
//						
//						sampleReportF012.setReportDetails(list);
//						
//						sampleReportDetails.setSupervisor_status(AppConstants.supervisorApprovedStatus);
//						sampleReportDetails.setSupervisor_submit_by(userName);
//						sampleReportDetails.setSupervisor_submit_on(date);
//						sampleReportDetails.setSupervisor_submit_id(userId);
//						sampleReportDetails.setSupervisor_sign(userName);
////	                    stoppageReportDetails.setSupervisior_mail_status(AppConstants.supervisorApprovedStatus);
////						sampleReportDetails.setHod_status(AppConstants.supervisiorMailStatus);
////						sampleReportDetails.setHod_mail_status(AppConstants.waitingStatus);
//
//						spunlacesamplereportf012repository.save(sampleReportDetails);
//						sampleReportF012 = sampleReportDetails;
//
//					}
//				}
//			}
//		} catch (Exception ex) {
//			String msg = ex.getMessage();
//			logger.error("Unable to submit Daily Stoppage Report: " + msg);
//			return new ResponseEntity<>(new ApiResponse(false, "Failed to submit Daily Stoppage Report"),
//					HttpStatus.BAD_REQUEST);
//		}
//
////		return new ResponseEntity<>(sampleReportF012, HttpStatus.CREATED);
//
//		return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);
//	}

	// Summary for supervisor, qc, hod f012

	public ResponseEntity<?> summarySampleReportF012() {
		String userRole = getUserRole();
		List<SpunlaceSampleReportF012> samplereport = new ArrayList<>();
		try {

			if (userRole.equalsIgnoreCase(AppConstantsSplunance.supervisiorRole)) {
				samplereport = spunlacesamplereportf012repository.supervisorSummary();
			}

			else if (userRole.equalsIgnoreCase(AppConstantsSplunance.qcRole)) {
				samplereport = spunlacesamplereportf012repository.qcSummary();
			} else if (userRole.equalsIgnoreCase(AppConstantsSplunance.hodRole)
					|| userRole.equalsIgnoreCase(AppConstantsSplunance.designeeRole)) {
				samplereport = spunlacesamplereportf012repository.hodSummary();
			} else {
				return new ResponseEntity<>(userRole + " " + "Not authorised to access the form",
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(samplereport, HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	// Gayathri
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> saveSpunlaceSampleReportF012(SpunlaceSampleReportF012 details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		SpunlaceSampleReportF012 listObj = null;
		try {

			String value = "";

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getSopNumber() == null)
				value = "SopNumber";
			if (details.getRevisionNo() == null)
				value = "revisionNo";
			if (details.getFormatName() == null)
				value = "formatName";
			if (details.getUnit() == null)
				value = "unit";
			if (details.getDate() == null)
				value = "date";
			if (details.getShift() == null)
				value = "Shift";
			if (details.getOrder_no() == null)
				value = "OrderNo";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getReport_id() != null) {

				listObj = spunlacesamplereportf012repository.findFormById(details.getReport_id());

				String[] ignoreProps = { "report_id", "createdBy", "createdAt", "supervisor_status",
						"supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
						"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "supervisior_mail_status",
						"qc_status", "qc_save_on", "qc_save_by", "qc_save_id", "qc_submit_on", "qc_submit_by",
						"qc_submit_id", "qc_sign", "qc_mail_status", "hod_status", "hod_save_on", "hod_save_by",
						"hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign", "hod_mail_status",
						"hod_signature_image", "supervisor_signature_image", "qc_signature_image" };

				BeanUtils.copyProperties(details, listObj, ignoreProps);
				if (!listObj.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)
						|| listObj.getHod_status().equals(AppConstants.hodRejectedStatus)
						|| listObj.getQc_status().equals(AppConstants.qcRejected)) {
					if (role.equals("ROLE_SUPERVISOR")) {

						if (listObj.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)) {
							return new ResponseEntity(new ApiResponse(false, "Already Submitted"),
									HttpStatus.BAD_REQUEST);
						}

						spunlacesamplereportf012repository.save(listObj);

						List<SpunlaceSampleReportDetailsF012> list = details.getReportDetails();

						for (SpunlaceSampleReportDetailsF012 detail : list) {
							detail.setReport_id(listObj.getReport_id());
							spunlaceSampleReportDetailsF012Repository.save(detail);
						}

						listObj.setReportDetails(list);

						listObj.setSupervisor_save_by(userName);
						listObj.setSupervisor_save_on(date);
						listObj.setSupervisor_save_id(userId);
						listObj.setSupervisor_status(AppConstants.supervisorSave);

						listObj.setHod_status("");
						listObj.setQc_status("");

						spunlacesamplereportf012repository.save(listObj);

					} else {
						return new ResponseEntity(new ApiResponse(false, role + "can not submit Details"),
								HttpStatus.BAD_REQUEST);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, " Invalid status."), HttpStatus.BAD_REQUEST);
				}
			} else {
				if (role.equals("ROLE_SUPERVISOR")) {

					listObj = details;

					spunlacesamplereportf012repository.save(listObj);

					List<SpunlaceSampleReportDetailsF012> list = details.getReportDetails();

					for (SpunlaceSampleReportDetailsF012 detail : list) {
						detail.setReport_id(listObj.getReport_id());
						spunlaceSampleReportDetailsF012Repository.save(detail);
					}

					listObj.setReportDetails(list);

					listObj.setSupervisor_save_by(userName);
					listObj.setSupervisor_save_on(date);
					listObj.setSupervisor_save_id(userId);
					listObj.setSupervisor_status(AppConstants.supervisorSave);

					listObj.setHod_status("");
					listObj.setQc_status("");

					spunlacesamplereportf012repository.save(listObj);

				} else {

					return new ResponseEntity(new ApiResponse(false, role + "can not submit Details"),
							HttpStatus.BAD_REQUEST);

				}
			}

		} catch (

		Exception ex) {

			logger.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}
//		return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> submitSampleReportF012(SpunlaceSampleReportF012 details, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getReport_id();

		SpunlaceSampleReportF012 checkObj = new SpunlaceSampleReportF012();

		try {
			String value = "";

		

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getSopNumber() == null)
				value = "SopNumber";
			if (details.getRevisionNo() == null)
				value = "revisionNo";
			if (details.getFormatName() == null)
				value = "formatName";
			if (details.getUnit() == null)
				value = "unit";
			if (details.getDate() == null)
				value = "date";
			if (details.getShift() == null)
				value = "Shift";
			if (details.getOrder_no() == null)
				value = "OrderNo";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = spunlacesamplereportf012repository.findFormById(id);

				String[] ignoreProps = { "report_id", "createdBy", "createdAt", "supervisor_status",
						"supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
						"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "supervisior_mail_status",
						"qc_status", "qc_save_on", "qc_save_by", "qc_save_id", "qc_submit_on", "qc_submit_by",
						"qc_submit_id", "qc_sign", "qc_mail_status", "hod_status", "hod_save_on", "hod_save_by",
						"hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign", "hod_mail_status",
						"hod_signature_image", "supervisor_signature_image", "qc_signature_image", "reportDetails" };

				BeanUtils.copyProperties(details, checkObj, ignoreProps);

				if (!checkObj.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)
						|| checkObj.getHod_status().equals(AppConstants.hodRejectedStatus)
						|| checkObj.getQc_status().equals(AppConstants.qcRejected)) {
					if (role.equals("ROLE_SUPERVISOR")) {

						spunlacesamplereportf012repository.save(checkObj);

						List<SpunlaceSampleReportDetailsF012> list = details.getReportDetails();

						for (SpunlaceSampleReportDetailsF012 detail : list) {
							detail.setReport_id(checkObj.getReport_id());
							spunlaceSampleReportDetailsF012Repository.save(detail);
						}

						checkObj.setReportDetails(list);

						checkObj.setSupervisor_submit_by(userName);
						checkObj.setSupervisor_submit_on(date);
						checkObj.setSupervisor_submit_id(userId);
						checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						checkObj.setSupervisor_sign(userName);

						checkObj.setHod_status(AppConstants.waitingStatus);
						checkObj.setQc_status("");
						spunlacesamplereportf012repository.save(checkObj);

						// IMAGE

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);

						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

						checkObj.setSupervisor_signature_image(signature);

						spunlacesamplereportf012repository.save(checkObj); // ONE TABLE

						SpunlaceSampleReportHistoryF012 rejectionReportHistory = new SpunlaceSampleReportHistoryF012();

//						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						// getter setters fields & status

						rejectionReportHistory.setFormatName(checkObj.getFormatName());
						rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
						rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
						rejectionReportHistory.setSopNumber(checkObj.getSopNumber());
						rejectionReportHistory.setUnit(checkObj.getUnit());
						rejectionReportHistory.setDate(checkObj.getDate());
						rejectionReportHistory.setShift(checkObj.getShift());
						rejectionReportHistory.setOrder_no(checkObj.getOrder_no());
						rejectionReportHistory.setProduct_name(checkObj.getProduct_name());
						rejectionReportHistory.setMixing(checkObj.getMixing());
						rejectionReportHistory.setMaterial_code(checkObj.getMaterial_code());
						rejectionReportHistory.setStd_gsm(checkObj.getStd_gsm());
						rejectionReportHistory.setStd_thickness(checkObj.getStd_thickness());
						rejectionReportHistory.setStd_moisture(checkObj.getStd_moisture());
						rejectionReportHistory.setPattern(checkObj.getPattern());

						// status
						rejectionReportHistory.setSupervisor_submit_by(checkObj.getSupervisor_submit_by());
						rejectionReportHistory.setSupervisor_submit_id(checkObj.getSupervisor_submit_id());
						rejectionReportHistory.setSupervisor_submit_on(checkObj.getSupervisor_submit_on());
						rejectionReportHistory.setSupervisor_status(checkObj.getSupervisor_status());
						rejectionReportHistory.setSupervisor_sign(checkObj.getSupervisor_sign());
						rejectionReportHistory.setSupervisor_signature_image(checkObj.getSupervisor_signature_image());

						rejectionReportHistory.setSupervisor_status(checkObj.getSupervisor_status());
						rejectionReportHistory.setHod_status(checkObj.getHod_status());

						// version

						String date1 = rejectionReportHistory.getDate();

						String shift = rejectionReportHistory.getShift();

						String order = rejectionReportHistory.getOrder_no();

						int version = spunlacesamplereporthistoryf012repository.getMaximumVersion(date1, shift, order)
								.map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						spunlacesamplereporthistoryf012repository.save(rejectionReportHistory); // ONE HISTORY

						List<SpunlaceSampleReportDetailsF012> historyMapList = checkObj.getReportDetails();

						for (SpunlaceSampleReportDetailsF012 obj : historyMapList) {

							SpunlaceSampleReportDetailsHistoryF012 objHistory = new SpunlaceSampleReportDetailsHistoryF012();

//							BeanUtils.copyProperties(obj, objHistory);

							objHistory.setReport_id(rejectionReportHistory.getReport_id());
							objHistory.setShaft_no(obj.getShaft_no());
							objHistory.setRoll_no(obj.getRoll_no());
							objHistory.setLength(obj.getLength());
							objHistory.setWidth(obj.getWidth());
							objHistory.setNet_weight(obj.getNet_weight());
							objHistory.setRoll_gsm(obj.getRoll_gsm());
							objHistory.setMoisture(obj.getMoisture());
							objHistory.setRoll_dai(obj.getRoll_dai());
							objHistory.setRemarks(obj.getRemarks());

							spunlacesamplereportdetailsf012repositoryhistory.save(objHistory);

						}
						try {

							spunlacemailfunction.sendEmailToHodF012(checkObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, role + "can not submit Details"),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, " Invalid status."), HttpStatus.BAD_REQUEST);
				}

			} else {

				if (!role.equals("ROLE_SUPERVISOR")) {
					return new ResponseEntity(new ApiResponse(false, role + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = details;

				spunlacesamplereportf012repository.save(checkObj);

				List<SpunlaceSampleReportDetailsF012> list = details.getReportDetails();

				for (SpunlaceSampleReportDetailsF012 detail : list) {
					detail.setReport_id(checkObj.getReport_id());
					spunlaceSampleReportDetailsF012Repository.save(detail);
				}

				checkObj.setReportDetails(list);

				checkObj.setSupervisor_submit_by(userName);
				checkObj.setSupervisor_submit_on(date);
				checkObj.setSupervisor_submit_id(userId);
				checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
				checkObj.setSupervisor_sign(userName);

				checkObj.setHod_status(AppConstants.waitingStatus);
				checkObj.setQc_status("");
//				checkObj.setQc_mail_status(AppConstants.waitingStatus);

				spunlacesamplereportf012repository.save(checkObj);

				// IMAGE

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				checkObj.setSupervisor_signature_image(signature);

				spunlacesamplereportf012repository.save(checkObj); // ONE TABLE

				SpunlaceSampleReportHistoryF012 rejectionReportHistory = new SpunlaceSampleReportHistoryF012();



				rejectionReportHistory.setFormatName(checkObj.getFormatName());
				rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
				rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
				rejectionReportHistory.setSopNumber(checkObj.getSopNumber());
				rejectionReportHistory.setUnit(checkObj.getUnit());
				rejectionReportHistory.setDate(checkObj.getDate());
				rejectionReportHistory.setShift(checkObj.getShift());
				rejectionReportHistory.setOrder_no(checkObj.getOrder_no());
				rejectionReportHistory.setProduct_name(checkObj.getProduct_name());
				rejectionReportHistory.setMixing(checkObj.getMixing());
				rejectionReportHistory.setMaterial_code(checkObj.getMaterial_code());
				rejectionReportHistory.setStd_gsm(checkObj.getStd_gsm());
				rejectionReportHistory.setStd_thickness(checkObj.getStd_thickness());
				rejectionReportHistory.setStd_moisture(checkObj.getStd_moisture());
				rejectionReportHistory.setPattern(checkObj.getPattern());

				// status
				rejectionReportHistory.setSupervisor_submit_by(checkObj.getSupervisor_submit_by());
				rejectionReportHistory.setSupervisor_submit_id(checkObj.getSupervisor_submit_id());
				rejectionReportHistory.setSupervisor_submit_on(checkObj.getSupervisor_submit_on());
				rejectionReportHistory.setSupervisor_status(checkObj.getSupervisor_status());
				rejectionReportHistory.setSupervisor_sign(checkObj.getSupervisor_sign());
				rejectionReportHistory.setSupervisor_signature_image(checkObj.getSupervisor_signature_image());

				rejectionReportHistory.setSupervisor_status(checkObj.getSupervisor_status());
				rejectionReportHistory.setHod_status(checkObj.getHod_status());

				// version

				String date1 = rejectionReportHistory.getDate();

				String shift = rejectionReportHistory.getShift();

				String order = rejectionReportHistory.getOrder_no();

				int version = spunlacesamplereporthistoryf012repository.getMaximumVersion(date1, shift, order)
						.map(temp -> temp + 1).orElse(1);

				rejectionReportHistory.setVersion(version);

				spunlacesamplereporthistoryf012repository.save(rejectionReportHistory); // ONE HISTORY

				List<SpunlaceSampleReportDetailsF012> historyMapList = checkObj.getReportDetails();

				for (SpunlaceSampleReportDetailsF012 obj : historyMapList) {

					SpunlaceSampleReportDetailsHistoryF012 objHistory = new SpunlaceSampleReportDetailsHistoryF012();


					objHistory.setReport_id(rejectionReportHistory.getReport_id());
					objHistory.setShaft_no(obj.getShaft_no());
					objHistory.setRoll_no(obj.getRoll_no());
					objHistory.setLength(obj.getLength());
					objHistory.setWidth(obj.getWidth());
					objHistory.setNet_weight(obj.getNet_weight());
					objHistory.setRoll_gsm(obj.getRoll_gsm());
					objHistory.setMoisture(obj.getMoisture());
					objHistory.setRoll_dai(obj.getRoll_dai());
					objHistory.setRemarks(obj.getRemarks());

					spunlacesamplereportdetailsf012repositoryhistory.save(objHistory);

				}
				try {
					spunlacemailfunction.sendEmailToHodF012(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
							HttpStatus.OK);
				}

			}
		} catch (Exception ex) {

			logger.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);

//		return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}
////approve reject
//	public ResponseEntity<?> approveRejectSpunlaceSampleReportF012( ApproveResponse approvalResponse, HttpServletRequest http) {
//	    SCAUtil sca = new SCAUtil();
//
//	    try {
//	        Long id = approvalResponse.getId();
//	        String userRole = getUserRole();
//	        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//	        String userName = userRepository.getUserName(userId);
//	        LocalDateTime currentDate = LocalDateTime.now();
//	        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//	        SpunlaceSampleReportF012 dailyStoppageReport = spunlacesamplereportf012repository.findById(id).orElse(null);
//	        if (dailyStoppageReport == null) {
//	            return new ResponseEntity<>(new ApiResponse(false, "Stoppage Report not found"), HttpStatus.NOT_FOUND);
//	        }
//
//	        SpunlaceSampleReportHistoryF012 history = new SpunlaceSampleReportHistoryF012();
//
//	        String supervisorStatus = dailyStoppageReport.getSupervisor_status();
//	        String hodStatus = dailyStoppageReport.getHod_status();
//	        String qcStatus = dailyStoppageReport.getQc_status();
//
//	        if (supervisorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus) && hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
//	            if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
//	                if (approvalResponse.getStatus().equals("Approve")) {
//	                    dailyStoppageReport.setHod_status(AppConstants.hodApprovedStatus);
//	                    dailyStoppageReport.setHod_submit_on(date);
//	                    dailyStoppageReport.setHod_submit_by(userName);
//	                    dailyStoppageReport.setHod_submit_id(userId);
//
//	                    Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//	                    byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//	                    dailyStoppageReport.setHod_signature_image(signature);
//	                    dailyStoppageReport.setHod_sign(userName);
//
//	                    spunlacesamplereportf012repository.save(dailyStoppageReport);
//
//	                    history = spunlacesamplereporthistoryf012repository.fetchLastSubmittedRecord(dailyStoppageReport.getDate());
//	                    history.setHod_status(AppConstants.hodApprovedStatus);
//	                    history.setHod_submit_on(date);
//	                    history.setHod_submit_by(userName);
//	                    history.setHod_submit_id(userId);
//	                    history.setHod_sign(userName);
//
//	                    spunlacesamplereporthistoryf012repository.save(history);
//	                    try {
//	            			spunlacemailfunction.sendEmailToQcF012(dailyStoppageReport);
//	            		} catch (Exception ex) {
//	            			return new ResponseEntity<>(
//	            					new ApiResponse(false, "Operator Approved but Unable to send mail to HOD! "),
//	            					HttpStatus.OK);
//	            		}
//	                    return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);
//
//	                } else if (approvalResponse.getStatus().equals("Reject")) {
//	                    String reason = approvalResponse.getRemarks();
//	                    dailyStoppageReport.setReason(reason);
//	                    dailyStoppageReport.setHod_status(AppConstants.hodRejectedStatus);
//	                    dailyStoppageReport.setHod_submit_on(date);
//	                    dailyStoppageReport.setHod_submit_by(userName);
//	                    dailyStoppageReport.setHod_submit_id(userId);
//
//	                    Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//	                    byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//	                    dailyStoppageReport.setHod_signature_image(signature);
//	                    dailyStoppageReport.setHod_sign(userName);
//
//	                    spunlacesamplereportf012repository.save(dailyStoppageReport);
//
//	                    history = spunlacesamplereporthistoryf012repository.fetchLastSubmittedRecord(dailyStoppageReport.getDate());
//	                    history.setReason(reason);
//	                    history.setHod_status(AppConstants.hodRejectedStatus);
//	                    history.setHod_submit_on(date);
//	                    history.setHod_submit_by(userName);
//	                    history.setHod_submit_id(userId);
//	                    history.setHod_sign(userName);
//
//	                    spunlacesamplereporthistoryf012repository.save(history);
//
//	                    } else {
//	                    return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
//	                }
//	            } else {
//	                return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"), HttpStatus.BAD_REQUEST);
//	            }
//	        }
//	        else if (hodStatus.equalsIgnoreCase(AppConstants.hodApprovedStatus) && qcStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
//	            if (userRole.equalsIgnoreCase("ROLE_QC")) {
//	                if (approvalResponse.getStatus().equals("Approve")) {
//	                    dailyStoppageReport.setQc_status(AppConstants.hodApprovedStatus);
//	                    dailyStoppageReport.setQc_submit_on(date);
//	                    dailyStoppageReport.setQc_submit_by(userName);
//	                    dailyStoppageReport.setQc_submit_id(userId);
//
//	                    Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//	                    byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//	                    dailyStoppageReport.setQc_signature_image(signature);
//	                    dailyStoppageReport.setQc_sign(userName);
//
//	                    spunlacesamplereportf012repository.save(dailyStoppageReport);
//
//	                    history = spunlacesamplereporthistoryf012repository.fetchLastSubmittedRecord(dailyStoppageReport.getDate());
//	                    history.setQc_status(AppConstants.qcApprove);
//	                    history.setQc_submit_on(date);
//	                    history.setQc_submit_by(userName);
//	                    history.setQc_submit_id(userId);
//	                    history.setQc_sign(userName);
//
//	                    spunlacesamplereporthistoryf012repository.save(history);
//
//	                    return new ResponseEntity<>(new ApiResponse(true, "QC Approved Successfully"), HttpStatus.OK);
//
//	                } else if (approvalResponse.getStatus().equals("Reject")) {
//	                    String reason = approvalResponse.getRemarks();
//	                    dailyStoppageReport.setReason(reason);
//	                    dailyStoppageReport.setQc_status(AppConstants.qcRejected);
//	                    dailyStoppageReport.setQc_submit_on(date);
//	                    dailyStoppageReport.setQc_submit_by(userName);
//	                    dailyStoppageReport.setQc_submit_id(userId);
//
//	                    Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//	                    byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//	                    dailyStoppageReport.setQc_signature_image(signature);
//	                    dailyStoppageReport.setQc_sign(userName);
//
//	                    spunlacesamplereportf012repository.save(dailyStoppageReport);
//
//	                    history = spunlacesamplereporthistoryf012repository.fetchLastSubmittedRecord(dailyStoppageReport.getDate());
//	                    history.setReason(reason);
//	                    history.setQc_status(AppConstants.qcRejected);
//	                    history.setQc_submit_on(date);
//	                    history.setQc_submit_by(userName);
//	                    history.setQc_submit_id(userId);
//	                    history.setQc_sign(userName);
//
//	                    spunlacesamplereporthistoryf012repository.save(history);
//
//	                    } else {
//	                    return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
//	                }
//	            } else {
//	                return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"), HttpStatus.BAD_REQUEST);
//	            }
//	        }
//	    } catch (Exception e) {
//	        String msg = e.getMessage();
//	        logger.error("Unable to Approve/Reject Daily Stoppage Report: " + msg);
//	        return new ResponseEntity<>(new ApiResponse(false, "Failed to Approve/Reject Daily Stoppage Report: " + msg), HttpStatus.BAD_REQUEST);
//	    }
//	    return new ResponseEntity<>(new ApiResponse(true, "HOD Rejected Successfully"), HttpStatus.OK);
//       
//	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveRejectSpunlaceSampleReportF012(ApproveResponse approvalResponse,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		SpunlaceSampleReportF012 bleachContRawCottonF05 = new SpunlaceSampleReportF012();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			bleachContRawCottonF05 = spunlacesamplereportf012repository.findFormById(approvalResponse.getId());

			SpunlaceSampleReportHistoryF012 bleachLayDownCheckListF42History = new SpunlaceSampleReportHistoryF012();

			String supervisiorStatus = bleachContRawCottonF05.getSupervisor_status();

			String hodStatus = bleachContRawCottonF05.getHod_status();

			String qcStatus = bleachContRawCottonF05.getQc_status();


			if (supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
					&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						bleachContRawCottonF05.setHod_status(AppConstants.hodApprovedStatus);
						bleachContRawCottonF05.setHod_submit_on(date);
						bleachContRawCottonF05.setHod_submit_by(userName);
						bleachContRawCottonF05.setHod_submit_id(userId);
						bleachContRawCottonF05.setQc_status(AppConstants.waitingStatus);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachContRawCottonF05.setHod_signature_image(signature);

						bleachContRawCottonF05.setHod_sign(userName);

						spunlacesamplereportf012repository.save(bleachContRawCottonF05);

						bleachLayDownCheckListF42History = spunlacesamplereporthistoryf012repository
								.fetchLastSubmittedRecord(bleachContRawCottonF05.getDate(),
										bleachContRawCottonF05.getShift(), bleachContRawCottonF05.getOrder_no());

						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodApprovedStatus);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_submit_id(userId);
						bleachLayDownCheckListF42History.setHod_sign(userName);
						bleachLayDownCheckListF42History.setQc_status(AppConstants.waitingStatus);

						spunlacesamplereporthistoryf012repository.save(bleachLayDownCheckListF42History);

						try {

							spunlacemailfunction.sendEmailToQcF012(bleachContRawCottonF05);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
									HttpStatus.OK);
						}

						return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						bleachContRawCottonF05.setReason(reason);
						bleachContRawCottonF05.setHod_status(AppConstants.hodRejectedStatus);
						bleachContRawCottonF05.setHod_submit_on(date);
						bleachContRawCottonF05.setHod_submit_by(userName);
						bleachContRawCottonF05.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachContRawCottonF05.setHod_signature_image(signature);

						bleachContRawCottonF05.setHod_sign(userName);

						spunlacesamplereportf012repository.save(bleachContRawCottonF05);

						bleachLayDownCheckListF42History = spunlacesamplereporthistoryf012repository
								.fetchLastSubmittedRecord(bleachContRawCottonF05.getDate(),
										bleachContRawCottonF05.getShift(), bleachContRawCottonF05.getOrder_no());

						bleachLayDownCheckListF42History.setReason(reason);
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodRejectedStatus);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_submit_id(userId);
						bleachLayDownCheckListF42History.setHod_sign(userName);

						spunlacesamplereporthistoryf012repository.save(bleachLayDownCheckListF42History);

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

			else if (hodStatus.equalsIgnoreCase(AppConstants.hodApprovedStatus)
					&& qcStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_QC")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						bleachContRawCottonF05.setQc_status(AppConstants.qcApprove);
						bleachContRawCottonF05.setQc_submit_on(date);
						bleachContRawCottonF05.setQc_submit_by(userName);
						bleachContRawCottonF05.setQc_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachContRawCottonF05.setQc_signature_image(signature);

						bleachContRawCottonF05.setQc_sign(userName);

						spunlacesamplereportf012repository.save(bleachContRawCottonF05);

						bleachLayDownCheckListF42History = spunlacesamplereporthistoryf012repository
								.fetchLastSubmittedRecord(bleachContRawCottonF05.getDate(),
										bleachContRawCottonF05.getShift(), bleachContRawCottonF05.getOrder_no());

						bleachLayDownCheckListF42History.setQc_status(AppConstants.qcApprove);
						bleachLayDownCheckListF42History.setQc_submit_on(date);
						bleachLayDownCheckListF42History.setQc_submit_by(userName);
						bleachLayDownCheckListF42History.setQc_submit_id(userId);
						bleachLayDownCheckListF42History.setQc_sign(userName);

						spunlacesamplereporthistoryf012repository.save(bleachLayDownCheckListF42History);

						return new ResponseEntity<>(new ApiResponse(true, " QC Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						bleachContRawCottonF05.setReason(reason);
						bleachContRawCottonF05.setQc_status(AppConstants.qcRejected);
						bleachContRawCottonF05.setQc_submit_on(date);
						bleachContRawCottonF05.setQc_submit_by(userName);
						bleachContRawCottonF05.setQc_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachContRawCottonF05.setQc_signature_image(signature);

						bleachContRawCottonF05.setQc_sign(userName);

						spunlacesamplereportf012repository.save(bleachContRawCottonF05);

						bleachLayDownCheckListF42History = spunlacesamplereporthistoryf012repository
								.fetchLastSubmittedRecord(bleachContRawCottonF05.getDate(),
										bleachContRawCottonF05.getShift(), bleachContRawCottonF05.getOrder_no());

//						bleachLayDownCheckListF42History = dailyRejectionReportF007RepositoryHistory
//								.fetchLastSubmittedRecord(bleachContRawCottonF05.getDate(),
//										bleachContRawCottonF05.getShift(), bleachContRawCottonF05.getOrderNo());

						bleachLayDownCheckListF42History.setReason(reason);
						bleachLayDownCheckListF42History.setQc_status(AppConstants.qcRejected);
						bleachLayDownCheckListF42History.setQc_submit_on(date);
						bleachLayDownCheckListF42History.setQc_submit_by(userName);
						bleachLayDownCheckListF42History.setQc_submit_id(userId);
						bleachLayDownCheckListF42History.setQc_sign(userName);

						spunlacesamplereporthistoryf012repository.save(bleachLayDownCheckListF42History);

						return new ResponseEntity<>(new ApiResponse(true, " QC Rejected Successfully"), HttpStatus.OK);

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

//***************************************************************************************************************************************************************************//
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
