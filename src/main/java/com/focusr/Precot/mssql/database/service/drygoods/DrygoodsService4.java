package com.focusr.Precot.mssql.database.service.drygoods;

import java.time.LocalDateTime;

import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

//import org.omg.CORBA.OBJ_ADAPTER;
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
import com.focusr.Precot.mssql.database.model.drygoods.LogBookHeader;
import com.focusr.Precot.mssql.database.model.drygoods.LogBookManPowerDetails;
import com.focusr.Precot.mssql.database.model.drygoods.LogBookPlanProdDetails;
import com.focusr.Precot.mssql.database.model.drygoods.LogBookWorkAllocation;
import com.focusr.Precot.mssql.database.model.drygoods.MiniRoll;
import com.focusr.Precot.mssql.database.model.drygoods.SanitizationDetails;
import com.focusr.Precot.mssql.database.model.drygoods.SliverMakingHeader;
import com.focusr.Precot.mssql.database.model.drygoods.SliverMakingLines;
import com.focusr.Precot.mssql.database.model.drygoods.audit.LogBookHeaderHistory;
import com.focusr.Precot.mssql.database.model.drygoods.audit.LogBookManPowerDetailsHistory;
import com.focusr.Precot.mssql.database.model.drygoods.audit.LogBookPlanProdDetailsHistory;
import com.focusr.Precot.mssql.database.model.drygoods.audit.LogBookWorkAllocationHistory;
import com.focusr.Precot.mssql.database.model.drygoods.audit.MiniRollHistory;
import com.focusr.Precot.mssql.database.model.drygoods.audit.SanitizationDetailsHistory;
import com.focusr.Precot.mssql.database.model.drygoods.audit.SliverMakingHeaderHistory;
import com.focusr.Precot.mssql.database.model.drygoods.audit.SliverMakingLinesHistory;
import com.focusr.Precot.mssql.database.model.splunance.FilterConsumptionDetailsF004;
import com.focusr.Precot.mssql.database.model.splunance.LogbookSpunlacePlanningF010;
import com.focusr.Precot.mssql.database.model.splunance.audit.FilterBagConsumptionDetailsHistoryF004;
import com.focusr.Precot.mssql.database.model.splunance.audit.FilterConsumptionDetailsHistoryF004;
import com.focusr.Precot.mssql.database.model.splunance.audit.LogbookSpunlacePlanningHistoryF010;
import com.focusr.Precot.mssql.database.repository.EmailDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.LogBookHeaderRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.LogBookManPowerDetailsRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.LogBookPlanProdDetailsRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.LogBookWorkAllocationRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.MiniRollRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.SanitiziationMachineSurfaceRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.SliverMakingHeaderRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.SliverMakingLinesRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.LogBookHeaderHistoryRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.LogBookManPowerDetailsHistoryRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.LogBookPlanProdDetailsHistoryRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.LogBookWorkAllocationHistoryRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.MiniRollHistoryRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.SanitizationDetailsHistoryRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.SliverMakingHeaderHistoryRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.SliverMakingLinesHisoryRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.EmailHtmlLoader;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.drygoods.AppConstantDryGoods;
import com.focusr.Precot.util.drygoods.DryGoodsMailFunction;

/**
 * 
 * @author Sivaprakasam.V
 *
 */

@Service
public class DrygoodsService4 {

	@Autowired
	private EmailHtmlLoader emailhtmlloader;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private EmailDetailsRepository emaildetailsrepository;

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private SliverMakingHeaderRepository slivermakingheaderrepository;

	@Autowired
	private SliverMakingLinesRepository slivermakinglinesrepository;

	@Autowired
	private SliverMakingHeaderHistoryRepository slivermakingheaderhistoryrepository;

	@Autowired
	private SliverMakingLinesHisoryRepository slivermakinglineshisoryrepository;

	@Autowired
	private UserRepository userrepository;

	@Autowired
	private MiniRollRepository minirollrepository;

	@Autowired
	MiniRollHistoryRepository miniRollHistoryRepository;

	@Autowired
	private LogBookHeaderRepository logbookheaderrepository;

	@Autowired
	private LogBookWorkAllocationRepository logbookworkallocationrepository;

	@Autowired
	private LogBookManPowerDetailsRepository logbookmanpowerdetailsrepository;

	@Autowired
	private SanitiziationMachineSurfaceRepository sanitiziationmachinesurfacerepository;

	@Autowired
	private SanitizationDetailsHistoryRepository sanitizationDetailsHistoryRepository;

	@Autowired
	private LogBookPlanProdDetailsRepository logbookplanproddetailsrepository;

	@Autowired
	private LogBookHeaderHistoryRepository logBookHeaderHistoryRepository;

	@Autowired
	private LogBookPlanProdDetailsHistoryRepository logBookPlanProdDetailsHistoryRepository;

	@Autowired
	private LogBookManPowerDetailsHistoryRepository logBookManPowerDetailsHistoryRepository;

	@Autowired
	private LogBookWorkAllocationHistoryRepository logBookWorkAllocationHistoryRepository;

	Logger logger = LoggerFactory.getLogger(DryGoodsService3.class);

	@Autowired
	private DryGoodsMailFunction drygoodsmailfunction;

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> saveSliverDetails02(SliverMakingHeader slivermakingheader, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		try {
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userrepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (userRole.equals("ROLE_OPERATOR")) {
				slivermakingheader.setOperator_status(AppConstantDryGoods.operatorSave);
				slivermakingheader.setOperator_save_on(date);
				slivermakingheader.setOperator_save_by(userName);
//				slivermakingheader.setOperator_sign(userName);
				slivermakingheader.setOperator_save_id(userId);
				slivermakingheader.setFormatNo("PH-PRD04/F-002");

				slivermakingheaderrepository.save(slivermakingheader);

				for (SliverMakingLines lineDetails : slivermakingheader.getDetails()) {

					lineDetails.setSliver_id(slivermakingheader.getSliver_id());
					slivermakinglinesrepository.save(lineDetails);
				}
			} else {
				return new ResponseEntity(new ApiResponse(false, "Unauthorized!"), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(slivermakingheader, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("***************** Unable to Save !*********************\n" + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save !" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> submitSliverDetails02(SliverMakingHeader details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		Long sliver_id = details.getSliver_id();
		SliverMakingHeader checkObj = new SliverMakingHeader();
		try {
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userrepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (sliver_id != null) {

				if (!userRole.equals("ROLE_OPERATOR")) {
					return new ResponseEntity(new ApiResponse(false, "Unauthorized!"), HttpStatus.BAD_REQUEST);
				}

				checkObj = slivermakingheaderrepository.getDetails(sliver_id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "operator_status", "operator_save_by",
						"operator_save_on", "operator_save_id", "operator_submitted_by", "operator_submitted_on",
						"operator_submitted_id", "operator_sign", "hod_status", "hod_save_on", "hod_save_by",
						"hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign", "hod_mail_status",
						"form_no", "details" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				checkObj.setOperator_status(AppConstantDryGoods.operatorApproved);
				checkObj.setOperator_submitted_on(date);
				checkObj.setOperator_submitted_by(userName);
				checkObj.setOperator_sign(userName);
				checkObj.setOperator_submitted_id(userId);
				checkObj.setHod_status(AppConstantDryGoods.waitingstatus);
				checkObj.setFormatNo("PH-PRD04/F-002");

				slivermakingheaderrepository.save(checkObj);

				for (SliverMakingLines lineDetails : details.getDetails()) {

					lineDetails.setSliver_id(details.getSliver_id());
					slivermakinglinesrepository.save(lineDetails);
				}

				// Audit

				SliverMakingHeaderHistory auditDetails = new SliverMakingHeaderHistory();

//				BeanUtils.copyProperties(checkObj,auditDetails,IgnoreProps);

				auditDetails.setFormatName(checkObj.getFormatName());
				auditDetails.setFormatNo(checkObj.getFormatNo());
				auditDetails.setSopNumber(checkObj.getSopNumber());
				auditDetails.setRevisionNo(checkObj.getRevisionNo());
				auditDetails.setUnit(checkObj.getUnit());

				auditDetails.setStd_wt(checkObj.getStd_wt());
				auditDetails.setMachine_name(checkObj.getMachine_name());
				auditDetails.setDate(checkObj.getDate());
				auditDetails.setShift(checkObj.getShift());
				auditDetails.setLaydown_no(checkObj.getLaydown_no());
				auditDetails.setOrder_no(checkObj.getOrder_no());
				auditDetails.setMixing(checkObj.getMixing());

				auditDetails.setGmp(checkObj.getGmp());
				auditDetails.setDraft(checkObj.getDraft());
				auditDetails.setDoffer_speed(checkObj.getDoffer_speed());
				auditDetails.setSliver_length(checkObj.getSliver_length());

				auditDetails.setHours_01(checkObj.getHours_01());
				auditDetails.setHours_02(checkObj.getHours_02());
				auditDetails.setHours_03(checkObj.getHours_03());
				auditDetails.setHours_04(checkObj.getHours_04());
				auditDetails.setHours_05(checkObj.getHours_05());
				auditDetails.setHours_06(checkObj.getHours_06());
				auditDetails.setHours_07(checkObj.getHours_07());
				auditDetails.setHours_08(checkObj.getHours_08());
				auditDetails.setTotal_sum(checkObj.getTotal_sum());
				auditDetails.setCompactor_wt(checkObj.getCompactor_wt());
				auditDetails.setSliver_wt(checkObj.getSliver_wt());

				auditDetails.setReason(checkObj.getReason());

				// sts
				auditDetails.setOperator_status(AppConstantDryGoods.operatorApproved);
				auditDetails.setOperator_submitted_on(date);
				auditDetails.setOperator_submitted_by(userName);
				auditDetails.setOperator_sign(userName);
				auditDetails.setOperator_submitted_id(userId);
				auditDetails.setHod_status(AppConstantDryGoods.waitingstatus);
				auditDetails.setFormatNo("PH-PRD04/F-002");

				int version = slivermakingheaderhistoryrepository.getMaximumVersion(auditDetails.getMachine_name(),
						auditDetails.getDate(), auditDetails.getShift(), auditDetails.getOrder_no()).map(temp -> temp + 1).orElse(1);

				auditDetails.setVersion(version);

				slivermakingheaderhistoryrepository.save(auditDetails);

				// Audit Line Details

				List<SliverMakingLines> historyMapList = checkObj.getDetails();

				for (SliverMakingLines obj : historyMapList) {

					SliverMakingLinesHistory objHistory = new SliverMakingLinesHistory();

					BeanUtils.copyProperties(obj, objHistory);
					objHistory.setHistory_id(auditDetails.getHistory_id());
					slivermakinglineshisoryrepository.save(objHistory);

				}

				slivermakingheaderhistoryrepository.save(auditDetails);

				// Send notification email (uncomment and implement if needed)
				try {
					drygoodsmailfunction.sendEmailToHodF002(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Submitted but unable to send email!"),
							HttpStatus.OK);
				}

			}

			else {
				if (userRole.equals("ROLE_OPERATOR")) {

					checkObj = details;

					checkObj.setOperator_status(AppConstantDryGoods.operatorApproved);
					checkObj.setOperator_save_on(date);
					checkObj.setOperator_save_by(userName);
					checkObj.setOperator_save_id(userId);
					checkObj.setOperator_sign(userName);
					checkObj.setHod_status(AppConstantDryGoods.waitingstatus);
					checkObj.setFormatNo("PH-PRD04/F-002");
					slivermakingheaderrepository.save(checkObj);

					for (SliverMakingLines lineDetails : details.getDetails()) {

						lineDetails.setSliver_id(details.getSliver_id());
						slivermakinglinesrepository.save(lineDetails);
					}

					// Audit

					SliverMakingHeaderHistory auditDetails = new SliverMakingHeaderHistory();

//					BeanUtils.copyProperties(checkObj,auditDetails,IgnoreProps);

					auditDetails.setFormatName(checkObj.getFormatName());
					auditDetails.setFormatNo(checkObj.getFormatNo());
					auditDetails.setSopNumber(checkObj.getSopNumber());
					auditDetails.setRevisionNo(checkObj.getRevisionNo());
					auditDetails.setUnit(checkObj.getUnit());

					auditDetails.setStd_wt(checkObj.getStd_wt());
					auditDetails.setMachine_name(checkObj.getMachine_name());
					auditDetails.setDate(checkObj.getDate());
					auditDetails.setShift(checkObj.getShift());
					auditDetails.setLaydown_no(checkObj.getLaydown_no());
					auditDetails.setOrder_no(checkObj.getOrder_no());
					auditDetails.setMixing(checkObj.getMixing());

					auditDetails.setGmp(checkObj.getGmp());
					auditDetails.setDraft(checkObj.getDraft());
					auditDetails.setDoffer_speed(checkObj.getDoffer_speed());
					auditDetails.setSliver_length(checkObj.getSliver_length());

					auditDetails.setHours_01(checkObj.getHours_01());
					auditDetails.setHours_02(checkObj.getHours_02());
					auditDetails.setHours_03(checkObj.getHours_03());
					auditDetails.setHours_04(checkObj.getHours_04());
					auditDetails.setHours_05(checkObj.getHours_05());
					auditDetails.setHours_06(checkObj.getHours_06());
					auditDetails.setHours_07(checkObj.getHours_07());
					auditDetails.setHours_08(checkObj.getHours_08());
					auditDetails.setTotal_sum(checkObj.getTotal_sum());
					auditDetails.setCompactor_wt(checkObj.getCompactor_wt());
					auditDetails.setSliver_wt(checkObj.getSliver_wt());

					auditDetails.setReason(checkObj.getReason());

					// sts
					auditDetails.setOperator_status(AppConstantDryGoods.operatorApproved);
					auditDetails.setOperator_submitted_on(date);
					auditDetails.setOperator_submitted_by(userName);
					auditDetails.setOperator_sign(userName);
					auditDetails.setOperator_submitted_id(userId);
					auditDetails.setHod_status(AppConstantDryGoods.waitingstatus);
					auditDetails.setFormatNo("PH-PRD04/F-002");

					int version = slivermakingheaderhistoryrepository.getMaximumVersion(auditDetails.getMachine_name(),
							auditDetails.getDate(), auditDetails.getShift(),auditDetails.getOrder_no()).map(temp -> temp + 1).orElse(1);
 
					auditDetails.setVersion(version);

					slivermakingheaderhistoryrepository.save(auditDetails);

					// Audit Line Details

					List<SliverMakingLines> historyMapList = checkObj.getDetails();

					for (SliverMakingLines obj : historyMapList) {

						SliverMakingLinesHistory objHistory = new SliverMakingLinesHistory();

						BeanUtils.copyProperties(obj, objHistory);
						objHistory.setHistory_id(auditDetails.getHistory_id());
						slivermakinglineshisoryrepository.save(objHistory);

					}
					slivermakingheaderhistoryrepository.save(auditDetails);

					// Mail

					// Send notification email (uncomment and implement if needed)
					try {
						drygoodsmailfunction.sendEmailToHodF002(checkObj);
					} catch (Exception ex) {
						return new ResponseEntity<>(new ApiResponse(false, "Submitted but unable to send email!"),
								HttpStatus.OK);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, "Unauthorized!"), HttpStatus.BAD_REQUEST);
				}
			}
			return new ResponseEntity<>(checkObj, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("***************** Unable to Save !*********************\n" + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save !" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	// APPROVE/REJECT
//	public ResponseEntity<?> approveOrReject(ApproveResponse approvalResponse, HttpServletRequest http) {
//		SliverMakingHeader sliverDetails = new SliverMakingHeader();
//		Long id = approvalResponse.getId();
//
//		SCAUtil sca = new SCAUtil();
//
//		try {
//			// Retrieve user details and current date
//			String userRole = getUserRole();
//			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//			String userName = userrepository.getUserName(userId);
//			LocalDateTime currentDate = LocalDateTime.now();
//			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//			// Find the bale consumption report by ID
//			sliverDetails = slivermakingheaderrepository.getDetails(id);
//
//			// Check current status
//			String currentStatus = sliverDetails.getHod_status();
//
//			if (currentStatus.equalsIgnoreCase(AppConstantDryGoods.waitingstatus)) {
//
//				if (userRole.equalsIgnoreCase("ROLE_HOD")
//						|| userRole.equalsIgnoreCase(AppConstantDryGoods.designeeRole)) {
//
//					if (approvalResponse.getStatus().equalsIgnoreCase("Approve")) {
//						// Set approved status and other details
//						sliverDetails.setHod_status(AppConstantDryGoods.hodApprovedStatus);
//						sliverDetails.setHod_submit_on(date);
//						sliverDetails.setHod_submit_by(userName);
//
//						sliverDetails.setHod_sign(userName);
//
//						sliverDetails.setHod_submit_id(userId);
//
//						slivermakingheaderrepository.save(sliverDetails);
//
//						for (SliverMakingLines lineDetails : sliverDetails.getDetails()) {
//
//							lineDetails.setSliver_id(sliverDetails.getSliver_id());
//							slivermakinglinesrepository.save(lineDetails);
//						}
//
//						return new ResponseEntity<>(new ApiResponse(true, "Report Approved Successfully"),
//								HttpStatus.OK);
//
//					} else if (approvalResponse.getStatus().equalsIgnoreCase("Reject")) {
//						String reason = approvalResponse.getRemarks();
//						sliverDetails.setHod_status(AppConstants.hodRejectedStatus);
//						sliverDetails.setHod_submit_on(date);
//						sliverDetails.setHod_submit_by(userName);
//						sliverDetails.setHod_sign(userName);
//						sliverDetails.setHod_submit_id(userId);
//						sliverDetails.setReason(reason);
//
//						slivermakingheaderrepository.save(sliverDetails);
//
//						for (SliverMakingLines lineDetails : sliverDetails.getDetails()) {
//
//							lineDetails.setSliver_id(sliverDetails.getSliver_id());
//							slivermakinglinesrepository.save(lineDetails);
//						}
//
//						return new ResponseEntity<>(new ApiResponse(true, "Report Rejected Successfully"),
//								HttpStatus.OK);
//
//					} else {
//						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
//					}
//
//				} else {
//					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"),
//							HttpStatus.BAD_REQUEST);
//				}
//
//			} else {
//				return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
//			}
//
//		} catch (Exception e) {
//			String msg = e.getMessage();
//			logger.error("Unable to Approve/Reject Bale Consumption Report: " + msg);
//			return new ResponseEntity<>(
//					new ApiResponse(false, "Failed to Approve/Reject Bale Consumption Report " + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//	}

	public ResponseEntity<?> approveOrReject(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		SliverMakingHeader object = new SliverMakingHeader();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = slivermakingheaderrepository.getDetails(approvalResponse.getId());

			SliverMakingHeaderHistory objHistory = new SliverMakingHeaderHistory();

			String operatorStatus = object.getOperator_status();

			String hodStatus = object.getHod_status();

			UserImageDetails imageDetails = new UserImageDetails();

			if (operatorStatus.equalsIgnoreCase(AppConstants.operatorApprove)
					&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setHod_status(AppConstants.hodApprovedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);

						object.setHod_sign(userName);

						slivermakingheaderrepository.save(object);

						// History

						objHistory = slivermakingheaderhistoryrepository.fetchLastSubmittedRecord(
								object.getMachine_name(), object.getDate(), object.getShift(),object.getOrder_no());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						slivermakingheaderhistoryrepository.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						object.setReason(reason);
						object.setHod_status(AppConstants.hodRejectedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);
						object.setHod_sign(userName);

						slivermakingheaderrepository.save(object);

						// History

						objHistory = slivermakingheaderhistoryrepository.fetchLastSubmittedRecord(
								object.getMachine_name(), object.getDate(), object.getShift(), object.getOrder_no());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						slivermakingheaderhistoryrepository.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, " HOD Rejected Successfully"), HttpStatus.OK);

					} else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	public ResponseEntity<?> getOperSummarydetailsF02() {
		String userRole = getUserRole();
		List<SliverMakingHeader> details = new ArrayList<>();
		try {

			if (userRole.equalsIgnoreCase(AppConstantDryGoods.operatorRole)) {

				details = slivermakingheaderrepository.OperatorSummary();
			} else {
				return new ResponseEntity<>(userRole + " " + "Not authorised to access the form",
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getSummarydetailsF02() {
		String userRole = getUserRole();
		List<SliverMakingHeader> details = new ArrayList<>();
		try {

			if (userRole.equalsIgnoreCase(AppConstantDryGoods.hodRole)
					|| userRole.equalsIgnoreCase(AppConstantDryGoods.designeeRole)
					|| userRole.equalsIgnoreCase(AppConstantDryGoods.operatorRole)) {

				details = slivermakingheaderrepository.hodSummary();
			} else {
				return new ResponseEntity<>(userRole + " " + "Not authorised to access the form",
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	// F05

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> saveMiniRollDetails05(MiniRoll miniroll, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		try {
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userrepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (userRole.equals("ROLE_OPERATOR")) {
				miniroll.setOperator_status(AppConstantDryGoods.operatorSave);
				miniroll.setOperator_save_on(date);
				miniroll.setOperator_save_by(userName);
//				miniroll.setOperator_sign(userName);
				miniroll.setOperator_save_id(userId);
				miniroll.setFormatNo("PH-PRD04/F-005");

				minirollrepository.save(miniroll);

			} else {
				return new ResponseEntity(new ApiResponse(false, "Unauthorized!"), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(miniroll, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("***************** Unable to Save !*********************\n" + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save !" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	// Submit

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> submitMiniRollDetails05(MiniRoll details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		Long id = details.getRoll_id();
		MiniRoll checkObj = new MiniRoll();
		try {
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userrepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (id != null) {

				checkObj = minirollrepository.getDetails(id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "operator_status", "operator_save_by",
						"operator_save_on", "operator_save_id", "operator_submitted_by", "operator_submitted_on",
						"operator_submitted_id", "operator_sign", "hod_status", "hod_save_on", "hod_save_by",
						"hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign", "hod_mail_status",
						"form_no", "details" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				checkObj.setOperator_status(AppConstantDryGoods.operatorApproved);
				checkObj.setOperator_submitted_on(date);
				checkObj.setOperator_submitted_by(userName);
				checkObj.setOperator_sign(userName);
				checkObj.setOperator_submitted_id(userId);
				checkObj.setHod_status(AppConstantDryGoods.waitingstatus);
				checkObj.setFormatNo("PH-PRD04/F-005");

				minirollrepository.save(checkObj);

				// Audit

				MiniRollHistory auditDetails = new MiniRollHistory();

				BeanUtils.copyProperties(checkObj, auditDetails, IgnoreProps);

				// sts
				auditDetails.setOperator_status(AppConstantDryGoods.operatorApproved);
				auditDetails.setOperator_submitted_on(date);
				auditDetails.setOperator_submitted_by(userName);
				auditDetails.setOperator_sign(userName);
				auditDetails.setOperator_submitted_id(userId);
				auditDetails.setHod_status(AppConstantDryGoods.waitingstatus);
				auditDetails.setFormatNo("PH-PRD04/F-002");

				int version = miniRollHistoryRepository
						.getMaximumVersion(auditDetails.getDate(), auditDetails.getShift(), auditDetails.getOrder_no())
						.map(temp -> temp + 1).orElse(1);

				auditDetails.setVersion(version);

				miniRollHistoryRepository.save(auditDetails);

				// Send notification email (uncomment and implement if needed)
				try {
					drygoodsmailfunction.sendEmailToHodF004(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Submitted but unable to send email!"),
							HttpStatus.OK);
				}

			}

			else {
				if (userRole.equals("ROLE_OPERATOR")) {

					checkObj = details;

					checkObj.setOperator_status(AppConstantDryGoods.operatorApproved);
					checkObj.setOperator_save_on(date);
					checkObj.setOperator_save_by(userName);
					checkObj.setOperator_save_id(userId);
					checkObj.setHod_status(AppConstantDryGoods.waitingstatus);
					checkObj.setFormatNo("PH-PRD04/F-005");

					minirollrepository.save(checkObj);

					// Audit

					MiniRollHistory auditDetails = new MiniRollHistory();

					BeanUtils.copyProperties(checkObj, auditDetails);

					// sts
					auditDetails.setOperator_status(AppConstantDryGoods.operatorApproved);
					auditDetails.setOperator_submitted_on(date);
					auditDetails.setOperator_submitted_by(userName);
					auditDetails.setOperator_sign(userName);
					auditDetails.setOperator_submitted_id(userId);
					auditDetails.setHod_status(AppConstantDryGoods.waitingstatus);
					auditDetails.setFormatNo("PH-PRD04/F-002");

//					int version = miniRollHistoryRepository
//							.getMaximumVersion(auditDetails.getDate(), auditDetails.getShift()).map(temp -> temp + 1)
//							.orElse(1);

					int version = miniRollHistoryRepository.getMaximumVersion(auditDetails.getDate(),
							auditDetails.getShift(), auditDetails.getOrder_no()).map(temp -> temp + 1).orElse(1);

					auditDetails.setVersion(version);

					miniRollHistoryRepository.save(auditDetails);

					// Send notification email (uncomment and implement if needed)
					try {
						drygoodsmailfunction.sendEmailToHodF004(checkObj);
					} catch (Exception ex) {
						return new ResponseEntity<>(new ApiResponse(false, "Submitted but unable to send email!"),
								HttpStatus.OK);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, "Unauthorized!"), HttpStatus.BAD_REQUEST);
				}
			}

			return new ResponseEntity<>(checkObj, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("***************** Unable to Save !*********************\n" + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save !" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	// APPROVE/REJECT
//	public ResponseEntity<?> approveOrReject05(ApproveResponse approvalResponse, HttpServletRequest http) {
//		MiniRoll miniroll = new MiniRoll();
//		Long id = approvalResponse.getId();
//		
//		MiniRollHistory auditDetails = new MiniRollHistory();
//
//		SCAUtil sca = new SCAUtil();
//
//		try {
//			// Retrieve user details and current date
//			String userRole = getUserRole();
//			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//			String userName = userrepository.getUserName(userId);
//			LocalDateTime currentDate = LocalDateTime.now();
//			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//			// Find the bale consumption report by ID
//			miniroll = minirollrepository.getDetails(id);
//
//			// Check current status
//			String currentStatus = miniroll.getHod_status();
//
//			if (currentStatus.equalsIgnoreCase(AppConstantDryGoods.waitingstatus)) {
//
//				if (userRole.equalsIgnoreCase("ROLE_HOD")
//						|| userRole.equalsIgnoreCase(AppConstantDryGoods.designeeRole)) {
//
//					if (approvalResponse.getStatus().equalsIgnoreCase("Approve")) {
//						// Set approved status and other details
//						miniroll.setHod_status(AppConstantDryGoods.hodApprovedStatus);
//						miniroll.setHod_submit_on(date);
//						miniroll.setHod_submit_by(userName);
//
//						miniroll.setHod_sign(userName);
//
//						miniroll.setHod_submit_id(userId);
//
//						minirollrepository.save(miniroll);
//						
//						auditDetails = miniRollHistoryRepository.fetchLastSubmittedRecord(auditDetails.getDate(),
//								auditDetails.getShift());
//						
//						auditDetails.setHod_status(AppConstantDryGoods.hodApprovedStatus);
//						auditDetails.setHod_submit_on(date);
//						auditDetails.setHod_submit_by(userName);
//
//						auditDetails.setHod_sign(userName);
//
//						auditDetails.setHod_submit_id(userId);
//
//						miniRollHistoryRepository.save(auditDetails);
//
//						return new ResponseEntity<>(new ApiResponse(true, "Report Approved Successfully"),
//								HttpStatus.OK);
//
//					} else if (approvalResponse.getStatus().equalsIgnoreCase("Reject")) {
//						String reason = approvalResponse.getRemarks();
//						miniroll.setHod_status(AppConstants.hodRejectedStatus);
//						miniroll.setHod_submit_on(date);
//						miniroll.setHod_submit_by(userName);
//						miniroll.setHod_sign(userName);
//						miniroll.setHod_submit_id(userId);
//						miniroll.setReason(reason);
//
//						minirollrepository.save(miniroll);
//						
//						auditDetails = miniRollHistoryRepository.fetchLastSubmittedRecord(auditDetails.getDate(),
//								auditDetails.getShift());
//						
//						auditDetails.setReason(reason);
//						auditDetails.setHod_status(AppConstantDryGoods.hodRejectedStatus);
//						auditDetails.setHod_submit_on(date);
//						auditDetails.setHod_submit_by(userName);
//
//						auditDetails.setHod_sign(userName);
//
//						auditDetails.setHod_submit_id(userId);
//
//						miniRollHistoryRepository.save(auditDetails);
//
//						return new ResponseEntity<>(new ApiResponse(true, "Report Rejected Successfully"),
//								HttpStatus.OK);
//
//					} else {
//						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
//					}
//
//				} else {
//					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"),
//							HttpStatus.BAD_REQUEST);
//				}
//
//			} else {
//				return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
//			}
//
//		} catch (Exception e) {
//			String msg = e.getMessage();
//			logger.error("Unable to Approve/Reject Bale Consumption Report: " + msg);
//			return new ResponseEntity<>(
//					new ApiResponse(false, "Failed to Approve/Reject Bale Consumption Report " + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//	}

	public ResponseEntity<?> approveOrReject05(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		MiniRoll object = new MiniRoll();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = minirollrepository.getDetails(approvalResponse.getId());

			MiniRollHistory objHistory = new MiniRollHistory();

			String operatorStatus = object.getOperator_status();

			String hodStatus = object.getHod_status();

			UserImageDetails imageDetails = new UserImageDetails();

			if (operatorStatus.equalsIgnoreCase(AppConstants.operatorApprove)
					&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setHod_status(AppConstants.hodApprovedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);

						object.setHod_sign(userName);

						minirollrepository.save(object);

						objHistory = miniRollHistoryRepository.fetchLastSubmittedRecord(object.getDate(),
								object.getShift(), object.getOrder_no());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						miniRollHistoryRepository.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						object.setReason(reason);
						object.setHod_status(AppConstants.hodRejectedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);
						object.setHod_sign(userName);

						minirollrepository.save(object);

//						objHistory = miniRollHistoryRepository.fetchLastSubmittedRecord(object.getDate(),
//								object.getShift());

						objHistory = miniRollHistoryRepository.fetchLastSubmittedRecord(object.getDate(),
								object.getShift(), object.getOrder_no());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						miniRollHistoryRepository.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, " HOD Rejected Successfully"), HttpStatus.OK);

					} else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	public ResponseEntity<?> getOperatorSummarydetailsF05() {
		String userRole = getUserRole();
		List<MiniRoll> details = new ArrayList<>();
		try {

			if (userRole.equalsIgnoreCase(AppConstantDryGoods.operatorRole)) {

				details = minirollrepository.supervisorSummary();
			} else {
				return new ResponseEntity<>(userRole + " " + "Not authorised to access the form",
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getSummarydetailsF05() {
		String userRole = getUserRole();
		List<MiniRoll> details = new ArrayList<>();
		try {

			if (userRole.equalsIgnoreCase(AppConstantDryGoods.hodRole)
					|| userRole.equalsIgnoreCase(AppConstantDryGoods.designeeRole)
					|| userRole.equalsIgnoreCase(AppConstantDryGoods.operatorRole)) {

				details = minirollrepository.hodSummary();
			} else {
				return new ResponseEntity<>(userRole + " " + "Not authorised to access the form",
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

//	@SuppressWarnings("unchecked")
//	@Transactional
//	public ResponseEntity<?> saveLogBookF10(LogBookHeader logbookheader, HttpServletRequest http) {
//	    SCAUtil sca = new SCAUtil();
//	    try {
//	        String userRole = getUserRole();
//	        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//	        String userName = userrepository.getUserName(userId);
//	        LocalDateTime currentDate = LocalDateTime.now();
//	        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//	        if ("ROLE_OPERATOR".equals(userRole)) {
//	            // Set operator-specific fields
//	            logbookheader.setOperator_status(AppConstantDryGoods.operatorSave);
//	            logbookheader.setOperator_save_on(date);
//	            logbookheader.setOperator_save_by(userName);
//	            logbookheader.setOperator_sign(userName);
//	            logbookheader.setOperator_save_id(userId);
//	            logbookheader.setFormatNo("PH-PRD04/F-010");
//
//	            LogBookHeader savedLogBookHeader = logbookheaderrepository.save(logbookheader);
//
//	            // Save associated work allocation details
//	            if (savedLogBookHeader.getWorkAllocationDetails() != null) {
//	            	
//	                for (LogBookWorkAllocation allocationDetails : savedLogBookHeader.getWorkAllocationDetails()) {
//	                    allocationDetails.setLog_id(savedLogBookHeader.getLog_id());
//	                    logbookworkallocationrepository.save(allocationDetails);
//	                }
//	            }
//
//	            // Save associated manpower details
//	            if (savedLogBookHeader.getManpowerDetails() != null) {
//	                for (LogBookManPowerDetails manpowerDetails : savedLogBookHeader.getManpowerDetails()) {
//	                    manpowerDetails.setLog_id(savedLogBookHeader.getLog_id());
//	                    logbookmanpowerdetailsrepository.save(manpowerDetails);
//	                }
//	            }
//
//	        } else {
//	            return new ResponseEntity<>(new ApiResponse(false, "Unauthorized!"), HttpStatus.BAD_REQUEST);
//	        }
//
//	        return new ResponseEntity<>(logbookheader, HttpStatus.OK);
//	    } catch (Exception e) {
//	        logger.error("***************** Unable to Save !*********************\n" + e);
//	        String msg = sca.getErrorMessage(e);
//	        return new ResponseEntity<>(new ApiResponse(false, "Unable to Save! " + msg), HttpStatus.BAD_REQUEST);
//	    }
//	}

	@SuppressWarnings("unchecked")
	@Transactional
	public ResponseEntity<?> saveLogBookF10(LogBookHeader logbookheader, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		try {
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userrepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if ("ROLE_SUPERVISOR".equals(userRole)) {

				logbookheader.setSupervisor_status(AppConstantDryGoods.supervisorSave);
				logbookheader.setSupervisor_save_on(date);
				logbookheader.setSupervisor_save_by(userName);
				logbookheader.setSupervisor_save_id(userId);
				logbookheader.setFormatNo("PH-PRD04/F-010");

				LogBookHeader savedLogBookHeader = logbookheaderrepository.save(logbookheader);

				if (savedLogBookHeader.getWorkAllocationDetails() != null) {
					for (LogBookWorkAllocation allocationDetails : savedLogBookHeader.getWorkAllocationDetails()) {
						allocationDetails.setLog_id(savedLogBookHeader.getLog_id());
						logbookworkallocationrepository.save(allocationDetails);
					}
				}

				if (savedLogBookHeader.getManpowerDetails() != null) {
					for (LogBookManPowerDetails manpowerDetails : savedLogBookHeader.getManpowerDetails()) {
						manpowerDetails.setLog_id(savedLogBookHeader.getLog_id());
						logbookmanpowerdetailsrepository.save(manpowerDetails);
					}
				}
				if (savedLogBookHeader.getProdDetails() != null) {

					for (LogBookPlanProdDetails prodectDetails : savedLogBookHeader.getProdDetails()) {

						prodectDetails.setLog_id(savedLogBookHeader.getLog_id());

						logbookplanproddetailsrepository.save(prodectDetails);
					}
				}

				return new ResponseEntity<>(savedLogBookHeader, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Unauthorized!"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			logger.error("***************** Unable to Save !*********************\n" + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Save! " + msg), HttpStatus.BAD_REQUEST);
		}
	}
//

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> submitLogBookF10(LogBookHeader details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		Long sliver_id = details.getLog_id();
		LogBookHeader checkObj = new LogBookHeader();
		try {
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userrepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			String[] IgnoreProps = { "id", "createdBy", "createdAt", "supervisor_save_on", "supervisor_save_by",
					"supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by", "supervisor_submit_id",
					"supervisor_sign", "hod_status", "hod_save_on", "hod_save_by", "hod_save_id", "hod_submit_on",
					"hod_submit_by", "hod_submit_id", "hod_sign", "hod_mail_status", "form_no", "workAllocationDetails",
					"manpowerDetails", "prodDetails" };

			if (sliver_id != null) {

				checkObj = logbookheaderrepository.getDetails(sliver_id);

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				checkObj.setSupervisor_status(AppConstantDryGoods.supervisorApprovedStatus);
				checkObj.setSupervisor_submit_on(date);
				checkObj.setSupervisor_submit_by(userName);
				checkObj.setSupervisor_sign(userName);
				checkObj.setSupervisor_submit_id(userId);
				checkObj.setHod_status(AppConstantDryGoods.waitingstatus);
				checkObj.setFormatNo("PH-PRD04/F-010");

				LogBookHeader savedLogBookHeader = logbookheaderrepository.save(checkObj);

				if (savedLogBookHeader.getWorkAllocationDetails() != null) {
					for (LogBookWorkAllocation allocationDetails : details.getWorkAllocationDetails()) {
						allocationDetails.setLog_id(savedLogBookHeader.getLog_id());
						logbookworkallocationrepository.save(allocationDetails);
					}
				}

				if (savedLogBookHeader.getManpowerDetails() != null) {
					for (LogBookManPowerDetails manpowerDetails : details.getManpowerDetails()) {
						manpowerDetails.setLog_id(savedLogBookHeader.getLog_id());
						logbookmanpowerdetailsrepository.save(manpowerDetails);
					}
				}

				if (savedLogBookHeader.getProdDetails() != null) {

					for (LogBookPlanProdDetails prodectDetails : details.getProdDetails()) {

						prodectDetails.setLog_id(savedLogBookHeader.getLog_id());

						logbookplanproddetailsrepository.save(prodectDetails);
					}
				}

				logbookheaderrepository.save(checkObj);

				// Audit

				LogBookHeaderHistory rejectionReportHistory = new LogBookHeaderHistory();

//				BeanUtils.copyProperties(checkObj, rejectionReportHistory,IgnoreProps);

				// getter setters fields & status

				rejectionReportHistory.setFormatName(checkObj.getFormatName());
				rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
				rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
				rejectionReportHistory.setSopNumber(checkObj.getSopNumber());
				rejectionReportHistory.setUnit(checkObj.getUnit());

				rejectionReportHistory.setDate(checkObj.getDate());
				rejectionReportHistory.setShift(checkObj.getShift());
				rejectionReportHistory.setOther_communication(checkObj.getOther_communication());
				rejectionReportHistory.setJulain_date(checkObj.getJulain_date());
				rejectionReportHistory.setNo_of_sliver(checkObj.getNo_of_sliver());
				rejectionReportHistory.setNo_of_woll_roll(checkObj.getNo_of_woll_roll());
				rejectionReportHistory.setPlaned_prod_details(checkObj.getPlaned_prod_details());

				rejectionReportHistory.setTc_a(checkObj.getTc_a());
				rejectionReportHistory.setTc_b(checkObj.getTc_b());
				rejectionReportHistory.setTc_total(checkObj.getTc_total());
				rejectionReportHistory.setTc_a_brk(checkObj.getTc_a_brk());
				rejectionReportHistory.setTc_b_brk(checkObj.getTc_b_brk());
				rejectionReportHistory.setHours_06(checkObj.getHours_06());
				rejectionReportHistory.setBall_mc_one_a(checkObj.getBall_mc_one_a());
				rejectionReportHistory.setBall_mc_one_b(checkObj.getBall_mc_one_b());
				rejectionReportHistory.setBall_mc_one_c(checkObj.getBall_mc_one_c());
				rejectionReportHistory.setBall_mc_one_total(checkObj.getBall_mc_one_total());
				rejectionReportHistory.setBall_mc_two_a(checkObj.getBall_mc_two_a());
				rejectionReportHistory.setBall_mc_two_b(checkObj.getBall_mc_two_b());
				rejectionReportHistory.setBall_mc_two_c(checkObj.getBall_mc_two_c());
				rejectionReportHistory.setBall_mc_two_total(checkObj.getBall_mc_two_total());

				rejectionReportHistory.setPo_no_one(checkObj.getPo_no_one());
				rejectionReportHistory.setPo_no_two(checkObj.getPo_no_two());
				rejectionReportHistory.setPo_no_three(checkObj.getPo_no_three());
				rejectionReportHistory.setProduct_name_one(checkObj.getProduct_name_one());
				rejectionReportHistory.setProduct_name_two(checkObj.getProduct_name_two());
				rejectionReportHistory.setProduct_name_three(checkObj.getProduct_name_three());
				rejectionReportHistory.setNxt_prod_sup_date(checkObj.getNxt_prod_sup_date());
				rejectionReportHistory.setNxt_prod_sup_sign(checkObj.getNxt_prod_sup_sign());

				rejectionReportHistory.setReason(checkObj.getReason());

				// status
				rejectionReportHistory.setSupervisor_submit_by(checkObj.getSupervisor_submit_by());
				rejectionReportHistory.setSupervisor_submit_id(checkObj.getSupervisor_submit_id());
				rejectionReportHistory.setSupervisor_submit_on(checkObj.getSupervisor_submit_on());
				rejectionReportHistory.setSupervisor_status(checkObj.getSupervisor_status());
				rejectionReportHistory.setSupervisor_sign(checkObj.getSupervisor_sign());

				rejectionReportHistory.setHod_status(checkObj.getHod_status());

				// version
				String date1 = rejectionReportHistory.getDate();

				String shift1 = rejectionReportHistory.getShift();

				int version = logBookHeaderHistoryRepository.getMaximumVersion(date1, shift1).map(temp -> temp + 1)
						.orElse(1);

				rejectionReportHistory.setVersion(version);

				logBookHeaderHistoryRepository.save(rejectionReportHistory); // ONE HISTORY

				List<LogBookWorkAllocation> historyMapList = checkObj.getWorkAllocationDetails();

				for (LogBookWorkAllocation obj : historyMapList) {

					LogBookWorkAllocationHistory objHistory = new LogBookWorkAllocationHistory();

					BeanUtils.copyProperties(obj, objHistory);
					objHistory.setHistory_id(rejectionReportHistory.getHistory_id());
					logBookWorkAllocationHistoryRepository.save(objHistory);

				}

				List<LogBookManPowerDetails> historyMapList1 = checkObj.getManpowerDetails();

				for (LogBookManPowerDetails obj : historyMapList1) {

					LogBookManPowerDetailsHistory objHistory = new LogBookManPowerDetailsHistory();

					BeanUtils.copyProperties(obj, objHistory);
					objHistory.setHistory_id(rejectionReportHistory.getHistory_id());
					logBookManPowerDetailsHistoryRepository.save(objHistory);

				}

				List<LogBookPlanProdDetails> historyMapList2 = checkObj.getProdDetails();

				for (LogBookPlanProdDetails obj : historyMapList2) {

					LogBookPlanProdDetailsHistory objHistory = new LogBookPlanProdDetailsHistory();

					BeanUtils.copyProperties(obj, objHistory);
					objHistory.setHistory_id(rejectionReportHistory.getHistory_id());
					logBookPlanProdDetailsHistoryRepository.save(objHistory);

				}

				try {
					drygoodsmailfunction.sendEmailHodF008(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Submitted but unable to send email!"),
							HttpStatus.OK);
				}

			}

			else {
				if (userRole.equals("ROLE_SUPERVISOR")) {

					checkObj = details;

					checkObj.setSupervisor_status(AppConstantDryGoods.supervisorApprovedStatus);
					checkObj.setSupervisor_submit_on(date);
					checkObj.setSupervisor_submit_by(userName);
					checkObj.setSupervisor_sign(userName);
					checkObj.setSupervisor_submit_id(userId);
					checkObj.setHod_status(AppConstantDryGoods.waitingstatus);
					checkObj.setFormatNo("PH-PRD04/F-010");

					LogBookHeader savedLogBookHeader = logbookheaderrepository.save(checkObj);

					if (savedLogBookHeader.getWorkAllocationDetails() != null) {
						for (LogBookWorkAllocation allocationDetails : details.getWorkAllocationDetails()) {
							allocationDetails.setLog_id(savedLogBookHeader.getLog_id());
							logbookworkallocationrepository.save(allocationDetails);
						}
					}

					if (savedLogBookHeader.getManpowerDetails() != null) {
						for (LogBookManPowerDetails manpowerDetails : details.getManpowerDetails()) {
							manpowerDetails.setLog_id(savedLogBookHeader.getLog_id());
							logbookmanpowerdetailsrepository.save(manpowerDetails);
						}
					}

					if (savedLogBookHeader.getProdDetails() != null) {

						for (LogBookPlanProdDetails prodectDetails : details.getProdDetails()) {

							prodectDetails.setLog_id(savedLogBookHeader.getLog_id());

							logbookplanproddetailsrepository.save(prodectDetails);
						}
					}

					logbookheaderrepository.save(checkObj);

					// Audit

					LogBookHeaderHistory rejectionReportHistory = new LogBookHeaderHistory();

//					BeanUtils.copyProperties(checkObj, rejectionReportHistory,IgnoreProps);

					// getter setters fields & status

					rejectionReportHistory.setFormatName(checkObj.getFormatName());
					rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
					rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
					rejectionReportHistory.setSopNumber(checkObj.getSopNumber());
					rejectionReportHistory.setUnit(checkObj.getUnit());

					rejectionReportHistory.setDate(checkObj.getDate());
					rejectionReportHistory.setShift(checkObj.getShift());
					rejectionReportHistory.setOther_communication(checkObj.getOther_communication());
					rejectionReportHistory.setJulain_date(checkObj.getJulain_date());
					rejectionReportHistory.setNo_of_sliver(checkObj.getNo_of_sliver());
					rejectionReportHistory.setNo_of_woll_roll(checkObj.getNo_of_woll_roll());
					rejectionReportHistory.setPlaned_prod_details(checkObj.getPlaned_prod_details());

					rejectionReportHistory.setTc_a(checkObj.getTc_a());
					rejectionReportHistory.setTc_b(checkObj.getTc_b());
					rejectionReportHistory.setTc_total(checkObj.getTc_total());
					rejectionReportHistory.setTc_a_brk(checkObj.getTc_a_brk());
					rejectionReportHistory.setTc_b_brk(checkObj.getTc_b_brk());
					rejectionReportHistory.setHours_06(checkObj.getHours_06());
					rejectionReportHistory.setBall_mc_one_a(checkObj.getBall_mc_one_a());
					rejectionReportHistory.setBall_mc_one_b(checkObj.getBall_mc_one_b());
					rejectionReportHistory.setBall_mc_one_c(checkObj.getBall_mc_one_c());
					rejectionReportHistory.setBall_mc_one_total(checkObj.getBall_mc_one_total());
					rejectionReportHistory.setBall_mc_two_a(checkObj.getBall_mc_two_a());
					rejectionReportHistory.setBall_mc_two_b(checkObj.getBall_mc_two_b());
					rejectionReportHistory.setBall_mc_two_c(checkObj.getBall_mc_two_c());
					rejectionReportHistory.setBall_mc_two_total(checkObj.getBall_mc_two_total());

					rejectionReportHistory.setPo_no_one(checkObj.getPo_no_one());
					rejectionReportHistory.setPo_no_two(checkObj.getPo_no_two());
					rejectionReportHistory.setPo_no_three(checkObj.getPo_no_three());
					rejectionReportHistory.setProduct_name_one(checkObj.getProduct_name_one());
					rejectionReportHistory.setProduct_name_two(checkObj.getProduct_name_two());
					rejectionReportHistory.setProduct_name_three(checkObj.getProduct_name_three());
					rejectionReportHistory.setNxt_prod_sup_date(checkObj.getNxt_prod_sup_date());
					rejectionReportHistory.setNxt_prod_sup_sign(checkObj.getNxt_prod_sup_sign());

					rejectionReportHistory.setReason(checkObj.getReason());

					// status
					rejectionReportHistory.setSupervisor_submit_by(checkObj.getSupervisor_submit_by());
					rejectionReportHistory.setSupervisor_submit_id(checkObj.getSupervisor_submit_id());
					rejectionReportHistory.setSupervisor_submit_on(checkObj.getSupervisor_submit_on());
					rejectionReportHistory.setSupervisor_status(checkObj.getSupervisor_status());
					rejectionReportHistory.setSupervisor_sign(checkObj.getSupervisor_sign());

					rejectionReportHistory.setHod_status(checkObj.getHod_status());

					// version
					String date1 = rejectionReportHistory.getDate();

					String shift1 = rejectionReportHistory.getShift();

					int version = logBookHeaderHistoryRepository.getMaximumVersion(date1, shift1).map(temp -> temp + 1)
							.orElse(1);

					rejectionReportHistory.setVersion(version);

					logBookHeaderHistoryRepository.save(rejectionReportHistory); // ONE HISTORY

					List<LogBookWorkAllocation> historyMapList = checkObj.getWorkAllocationDetails();

					for (LogBookWorkAllocation obj : historyMapList) {

						LogBookWorkAllocationHistory objHistory = new LogBookWorkAllocationHistory();

						BeanUtils.copyProperties(obj, objHistory);
						objHistory.setHistory_id(rejectionReportHistory.getHistory_id());
						logBookWorkAllocationHistoryRepository.save(objHistory);

					}

					List<LogBookManPowerDetails> historyMapList1 = checkObj.getManpowerDetails();

					for (LogBookManPowerDetails obj : historyMapList1) {

						LogBookManPowerDetailsHistory objHistory = new LogBookManPowerDetailsHistory();

						BeanUtils.copyProperties(obj, objHistory);
						objHistory.setHistory_id(rejectionReportHistory.getHistory_id());
						logBookManPowerDetailsHistoryRepository.save(objHistory);

					}

					List<LogBookPlanProdDetails> historyMapList2 = checkObj.getProdDetails();

					for (LogBookPlanProdDetails obj : historyMapList2) {

						LogBookPlanProdDetailsHistory objHistory = new LogBookPlanProdDetailsHistory();

						BeanUtils.copyProperties(obj, objHistory);
						objHistory.setHistory_id(rejectionReportHistory.getHistory_id());
						logBookPlanProdDetailsHistoryRepository.save(objHistory);

					}

					try {
						drygoodsmailfunction.sendEmailHodF008(checkObj);
					} catch (Exception ex) {
						return new ResponseEntity<>(new ApiResponse(false, "Submitted but unable to send email!"),
								HttpStatus.OK);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, "Unauthorized!"), HttpStatus.BAD_REQUEST);
				}
			}

			return new ResponseEntity<>(checkObj, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("***************** Unable to Save !*********************\n" + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save !" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	// APPROVE/REJECT
//	public ResponseEntity<?> approveOrRejectF10(ApproveResponse approvalResponse, HttpServletRequest http) {
//		LogBookHeader logbookheader = new LogBookHeader();
//		Long id = approvalResponse.getId();
//
//		SCAUtil sca = new SCAUtil();
//
//		try {
//			// Retrieve user details and current date
//			String userRole = getUserRole();
//			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//			String userName = userrepository.getUserName(userId);
//			LocalDateTime currentDate = LocalDateTime.now();
//			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//			// Find the bale consumption report by ID
//			logbookheader = logbookheaderrepository.getDetails(id);
//
//			// Check current status
//			String currentStatus = logbookheader.getHod_status();
//
//			if (currentStatus.equalsIgnoreCase(AppConstantDryGoods.waitingstatus)) {
//
//				if (userRole.equalsIgnoreCase("ROLE_HOD")
//						|| userRole.equalsIgnoreCase(AppConstantDryGoods.designeeRole)) {
//
//					if (approvalResponse.getStatus().equalsIgnoreCase("Approve")) {
//						logbookheader.setHod_status(AppConstantDryGoods.hodApprovedStatus);
//						logbookheader.setHod_submit_on(date);
//						logbookheader.setHod_submit_by(userName);
//
//						logbookheader.setHod_sign(userName);
//
//						logbookheader.setHod_submit_id(userId);
//
//						LogBookHeader savedLogBookHeader = logbookheaderrepository.save(logbookheader);
//
//						if (savedLogBookHeader.getWorkAllocationDetails() != null) {
//							for (LogBookWorkAllocation allocationDetails : savedLogBookHeader
//									.getWorkAllocationDetails()) {
//								allocationDetails.setLog_id(savedLogBookHeader.getLog_id());
//								logbookworkallocationrepository.save(allocationDetails);
//							}
//						}
//
//						if (savedLogBookHeader.getManpowerDetails() != null) {
//							for (LogBookManPowerDetails manpowerDetails : savedLogBookHeader.getManpowerDetails()) {
//								manpowerDetails.setLog_id(savedLogBookHeader.getLog_id());
//								logbookmanpowerdetailsrepository.save(manpowerDetails);
//							}
//						}
//
//						return new ResponseEntity<>(new ApiResponse(true, "Report Approved Successfully"),
//								HttpStatus.OK);
//
//					} else if (approvalResponse.getStatus().equalsIgnoreCase("Reject")) {
//
//						String reason = approvalResponse.getRemarks();
//						logbookheader.setHod_status(AppConstants.hodRejectedStatus);
//						logbookheader.setHod_submit_on(date);
//						logbookheader.setHod_submit_by(userName);
//						logbookheader.setHod_sign(userName);
//						logbookheader.setHod_submit_id(userId);
//						logbookheader.setReason(reason);
//
//						LogBookHeader savedLogBookHeader = logbookheaderrepository.save(logbookheader);
//
//						if (savedLogBookHeader.getWorkAllocationDetails() != null) {
//							for (LogBookWorkAllocation allocationDetails : savedLogBookHeader
//									.getWorkAllocationDetails()) {
//								allocationDetails.setLog_id(savedLogBookHeader.getLog_id());
//								logbookworkallocationrepository.save(allocationDetails);
//							}
//						}
//
//						if (savedLogBookHeader.getManpowerDetails() != null) {
//							for (LogBookManPowerDetails manpowerDetails : savedLogBookHeader.getManpowerDetails()) {
//								manpowerDetails.setLog_id(savedLogBookHeader.getLog_id());
//								logbookmanpowerdetailsrepository.save(manpowerDetails);
//							}
//						}
//
//						return new ResponseEntity<>(new ApiResponse(true, "Report Rejected Successfully"),
//								HttpStatus.OK);
//
//					} else {
//						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
//					}
//
//				} else {
//					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"),
//							HttpStatus.BAD_REQUEST);
//				}
//
//			} else {
//				return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
//			}
//
//		} catch (Exception e) {
//			String msg = e.getMessage();
//			logger.error("Unable to Approve/Reject Bale Consumption Report: " + msg);
//			return new ResponseEntity<>(
//					new ApiResponse(false, "Failed to Approve/Reject Bale Consumption Report " + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//	}

	public ResponseEntity<?> approveOrRejectF10(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		LogBookHeader object = new LogBookHeader();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = logbookheaderrepository.getDetails(approvalResponse.getId());

			LogBookHeaderHistory objHistory = new LogBookHeaderHistory();

			String supervisiorStatus = object.getSupervisor_status();

			String hodStatus = object.getHod_status();

			UserImageDetails imageDetails = new UserImageDetails();

			if (supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
					&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setHod_status(AppConstants.hodApprovedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);
						object.setHod_sign(userName);

						logbookheaderrepository.save(object);

						objHistory = logBookHeaderHistoryRepository.fetchLastSubmittedRecord(object.getDate(),
								object.getShift());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						logBookHeaderHistoryRepository.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						object.setReason(reason);
						object.setHod_status(AppConstants.hodRejectedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);
						object.setHod_sign(userName);

						logbookheaderrepository.save(object);

						objHistory = logBookHeaderHistoryRepository.fetchLastSubmittedRecord(object.getDate(),
								object.getShift());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						logBookHeaderHistoryRepository.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, " HOD Rejected Successfully"), HttpStatus.OK);

					} else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	public ResponseEntity<?> getSupSummarydetailsF10() {
		String userRole = getUserRole();
		List<LogBookHeader> details = new ArrayList<>();
		try {

			if (userRole.equalsIgnoreCase(AppConstantDryGoods.supervisiorRole)) {

				details = logbookheaderrepository.SupervisorSummary();
			} else {
				return new ResponseEntity<>(userRole + " " + "Not authorised to access the form",
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getHodSummarydetailsF10() {
		String userRole = getUserRole();
		List<LogBookHeader> details = new ArrayList<>();
		try {

			if (userRole.equalsIgnoreCase(AppConstantDryGoods.hodRole)
					|| userRole.equalsIgnoreCase(AppConstantDryGoods.designeeRole)) {

				details = logbookheaderrepository.hodSummary();
			} else {
				return new ResponseEntity<>(userRole + " " + "Not authorised to access the form",
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> saveSanitixiationF12(SanitizationDetails sanitiziationmachinesurface,
			HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		try {
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userrepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (userRole.equals("ROLE_SUPERVISOR")) {

				sanitiziationmachinesurface.setSupervisor_status(AppConstantDryGoods.supervisorSave);
				sanitiziationmachinesurface.setSupervisor_save_on(date);
				sanitiziationmachinesurface.setSupervisor_save_by(userName);
//				sanitiziationmachinesurface.setSupervisor_sign(userName);
				sanitiziationmachinesurface.setSupervisor_save_id(userId);
				sanitiziationmachinesurface.setFormatNo("PH-PRD04/F-012");

				sanitiziationmachinesurfacerepository.save(sanitiziationmachinesurface);

			} else {
				return new ResponseEntity(new ApiResponse(false, "Unauthorized!"), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(sanitiziationmachinesurface, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("***************** Unable to Save !*********************\n" + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save !" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> submitSanitiziationF12(SanitizationDetails details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		Long id = details.getMc_id();
		SanitizationDetails checkObj = new SanitizationDetails();
		try {
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userrepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (id != null) {

				checkObj = sanitiziationmachinesurfacerepository.getDetails(id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "hod_status", "hod_submit_on", "hod_submit_by",
						"hod_submit_id", "hod_sign", "hod_mail_status", "form_no", "supervisor_status",
						"supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
						"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "supervisor_mail_status",
						"hod_mail_status" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				checkObj.setSupervisor_status(AppConstantDryGoods.supervisorApprovedStatus);
				checkObj.setSupervisor_submit_on(date);
				checkObj.setSupervisor_submit_by(userName);
				checkObj.setSupervisor_sign(userName);
				checkObj.setSupervisor_submit_id(id);
				checkObj.setHod_status(AppConstantDryGoods.waitingstatus);
				checkObj.setFormatNo("PH-PRD04/F-012");

				sanitiziationmachinesurfacerepository.save(checkObj);

				// Audit

				SanitizationDetailsHistory auditDetails = new SanitizationDetailsHistory();

				BeanUtils.copyProperties(checkObj, auditDetails, IgnoreProps);

				// sts
				auditDetails.setSupervisor_status(AppConstantDryGoods.operatorApproved);
				auditDetails.setSupervisor_submit_on(date);
				auditDetails.setSupervisor_submit_by(userName);
				auditDetails.setSupervisor_sign(userName);
				auditDetails.setSupervisor_submit_id(userId);
				auditDetails.setHod_status(AppConstantDryGoods.waitingstatus);
				auditDetails.setFormatNo("PH-PRD04/F-002");

				int version = sanitizationDetailsHistoryRepository
						.getMaximumVersion(auditDetails.getYear(), auditDetails.getMonth(), auditDetails.getWeek())
						.map(temp -> temp + 1).orElse(1);

				auditDetails.setVersion(version);

				sanitizationDetailsHistoryRepository.save(auditDetails);

				// Send notification email (uncomment and implement if needed)
				try {
					drygoodsmailfunction.sendEmailF009Supervisor(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Submitted but unable to send email!"),
							HttpStatus.OK);
				}

			}

			else if (userRole.equals("ROLE_SUPERVISOR")) {

				checkObj = details;

				checkObj.setSupervisor_status(AppConstantDryGoods.supervisorApprovedStatus);
				checkObj.setSupervisor_submit_on(date);
				checkObj.setSupervisor_save_by(userName);
				checkObj.setSupervisor_sign(userName);
				checkObj.setSupervisor_submit_id(userId);
				checkObj.setHod_status(AppConstantDryGoods.waitingstatus);
				checkObj.setFormatNo("PH-PRD04/F-012");

				sanitiziationmachinesurfacerepository.save(checkObj);

				// Audit

				SanitizationDetailsHistory auditDetails = new SanitizationDetailsHistory();

				BeanUtils.copyProperties(checkObj, auditDetails);

				// sts
				auditDetails.setSupervisor_status(AppConstantDryGoods.operatorApproved);
				auditDetails.setSupervisor_submit_on(date);
				auditDetails.setSupervisor_submit_by(userName);
				auditDetails.setSupervisor_sign(userName);
				auditDetails.setSupervisor_submit_id(userId);
				auditDetails.setHod_status(AppConstantDryGoods.waitingstatus);
				auditDetails.setFormatNo("PH-PRD04/F-002");

				int version = sanitizationDetailsHistoryRepository
						.getMaximumVersion(auditDetails.getYear(), auditDetails.getMonth(), auditDetails.getWeek())
						.map(temp -> temp + 1).orElse(1);

				auditDetails.setVersion(version);

				sanitizationDetailsHistoryRepository.save(auditDetails);

				// Send notification email (uncomment and implement if needed)
				try {
					drygoodsmailfunction.sendEmailF009Supervisor(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Submitted but unable to send email!"),
							HttpStatus.OK);
				}

			} else {
				return new ResponseEntity(new ApiResponse(false, "Unauthorized!"), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(checkObj, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("***************** Unable to Save !*********************\n" + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save !" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	//

	// APPROVE/REJECT
//	public ResponseEntity<?> approveOrRejectF12(ApproveResponse approvalResponse, HttpServletRequest http) {
//		SanitizationDetails miniroll = new SanitizationDetails();
//		Long id = approvalResponse.getId();
//
//		SanitizationDetailsHistory auditDetails = new SanitizationDetailsHistory();
//		SCAUtil sca = new SCAUtil();
//
//		try {
//			// Retrieve user details and current date
//			String userRole = getUserRole();
//			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//			String userName = userrepository.getUserName(userId);
//			LocalDateTime currentDate = LocalDateTime.now();
//			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//			// Find the bale consumption report by ID
//			miniroll = sanitiziationmachinesurfacerepository.getDetails(id);
//
//			// Check current status
//			String currentStatus = miniroll.getHod_status();
//
//			if (currentStatus.equalsIgnoreCase(AppConstantDryGoods.waitingstatus)) {
//
//				if (userRole.equalsIgnoreCase("ROLE_HOD")
//						|| userRole.equalsIgnoreCase(AppConstantDryGoods.designeeRole)) {
//
//					if (approvalResponse.getStatus().equalsIgnoreCase("Approve")) {
//						// Set approved status and other details
//						miniroll.setHod_status(AppConstantDryGoods.hodApprovedStatus);
//						miniroll.setHod_submit_on(date);
//						miniroll.setHod_submit_by(userName);
//
//						miniroll.setHod_sign(userName);
//
//						miniroll.setHod_submit_id(userId);
//
//						sanitiziationmachinesurfacerepository.save(miniroll);
//						
//						auditDetails = sanitizationDetailsHistoryRepository.fetchLastSubmittedRecord(auditDetails.getYear(),
//								auditDetails.getMonth(), auditDetails.getWeek());
//						
//						auditDetails.setHod_status(AppConstantDryGoods.hodApprovedStatus);
//						auditDetails.setHod_submit_on(date);
//						auditDetails.setHod_submit_by(userName);
//
//						auditDetails.setHod_sign(userName);
//
//						auditDetails.setHod_submit_id(userId);
//
//						sanitizationDetailsHistoryRepository.save(auditDetails);
//						
//						return new ResponseEntity<>(new ApiResponse(true, "Report Approved Successfully"),
//								HttpStatus.OK);
//
//					} else if (approvalResponse.getStatus().equalsIgnoreCase("Reject")) {
//						String reason = approvalResponse.getRemarks();
//						miniroll.setHod_status(AppConstants.hodRejectedStatus);
//						miniroll.setHod_submit_on(date);
//						miniroll.setHod_submit_by(userName);
//						miniroll.setHod_sign(userName);
//						miniroll.setHod_submit_id(userId);
//						miniroll.setReason(reason);
//
//						sanitiziationmachinesurfacerepository.save(miniroll);
//						
//						auditDetails = sanitizationDetailsHistoryRepository.fetchLastSubmittedRecord(auditDetails.getYear(),
//								auditDetails.getMonth(), auditDetails.getWeek());
//						
//						auditDetails.setReason(reason);
//						auditDetails.setHod_status(AppConstantDryGoods.hodRejectedStatus);
//						auditDetails.setHod_submit_on(date);
//						auditDetails.setHod_submit_by(userName);
//
//						auditDetails.setHod_sign(userName);
//
//						auditDetails.setHod_submit_id(userId);
//
//						sanitizationDetailsHistoryRepository.save(auditDetails);
//
//						return new ResponseEntity<>(new ApiResponse(true, "Report Rejected Successfully"),
//								HttpStatus.OK);
//
//					} else {
//						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
//					}
//
//				} else {
//					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"),
//							HttpStatus.BAD_REQUEST);
//				}
//
//			} else {
//				return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
//			}
//
//		} catch (Exception e) {
//			String msg = e.getMessage();
//			logger.error("Unable to Approve/Reject Bale Consumption Report: " + msg);
//			return new ResponseEntity<>(
//					new ApiResponse(false, "Failed to Approve/Reject Bale Consumption Report " + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//	}

	public ResponseEntity<?> approveOrRejectF12(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		SanitizationDetails object = new SanitizationDetails();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = sanitiziationmachinesurfacerepository.getDetails(approvalResponse.getId());

			SanitizationDetailsHistory objHistory = new SanitizationDetailsHistory();

			String SupervisorStatus = object.getSupervisor_status();

			String hodStatus = object.getHod_status();

			UserImageDetails imageDetails = new UserImageDetails();

			if (SupervisorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
					&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setHod_status(AppConstants.hodApprovedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);

						object.setHod_sign(userName);

						sanitiziationmachinesurfacerepository.save(object);

						objHistory = sanitizationDetailsHistoryRepository.fetchLastSubmittedRecord(object.getYear(),
								object.getMonth(), object.getWeek());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						sanitizationDetailsHistoryRepository.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						object.setReason(reason);
						object.setHod_status(AppConstants.hodRejectedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);
						object.setHod_sign(userName);

						sanitiziationmachinesurfacerepository.save(object);

						objHistory = sanitizationDetailsHistoryRepository.fetchLastSubmittedRecord(object.getYear(),
								object.getMonth(), object.getWeek());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						sanitizationDetailsHistoryRepository.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, " HOD Rejected Successfully"), HttpStatus.OK);

					} else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	public ResponseEntity<?> getSupSummarydetailsF12() {
		String userRole = getUserRole();
		List<SanitizationDetails> details = new ArrayList<>();
		try {

			if (userRole.equalsIgnoreCase(AppConstantDryGoods.supervisiorRole)) {

				details = sanitiziationmachinesurfacerepository.SupervisorSummary();
			} else {
				return new ResponseEntity<>(userRole + " " + "Not authorised to access the form",
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getHodSummarydetailsF12() {
		String userRole = getUserRole();
		List<SanitizationDetails> details = new ArrayList<>();
		try {

			if (userRole.equalsIgnoreCase(AppConstantDryGoods.hodRole)
					|| userRole.equalsIgnoreCase(AppConstantDryGoods.designeeRole)) {

				details = sanitiziationmachinesurfacerepository.hodSummary();
			} else {
				return new ResponseEntity<>(userRole + " " + "Not authorised to access the form",
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	private String getUserRole() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst()
					.orElse(null);
		}
		return null;
	}

}
