package com.focusr.Precot.mssql.database.service.splunance;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

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

import com.focusr.Precot.Buds.model.BudsDailyProductionSliverLine;
import com.focusr.Precot.mssql.database.model.UserImageDetails;
import com.focusr.Precot.mssql.database.model.splunance.DailyProdPlanF010;
import com.focusr.Precot.mssql.database.model.splunance.DailyProductionDetailsF006;
import com.focusr.Precot.mssql.database.model.splunance.DailyProductionReportF006;
import com.focusr.Precot.mssql.database.model.splunance.DailyRejectionReportF007;
import com.focusr.Precot.mssql.database.model.splunance.FilterBagConsumptionDetailsF004;
import com.focusr.Precot.mssql.database.model.splunance.FilterConsumptionDetailsF004;
import com.focusr.Precot.mssql.database.model.splunance.LogbookSpunlacePlanningF010;
import com.focusr.Precot.mssql.database.model.splunance.MachineCleaningRecordF023;
import com.focusr.Precot.mssql.database.model.splunance.MetalDetectorCheckListF020;
import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupVerificationRpBalePressF013;
import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupVerificationSliterWinderF016;
import com.focusr.Precot.mssql.database.model.splunance.ProductChangeOverCheckListSpunlaceF011;
import com.focusr.Precot.mssql.database.model.splunance.SanitizationOfMachineAndSurfacesF024;
import com.focusr.Precot.mssql.database.model.splunance.ShiftWiseSliterWinderProdDetailsF017;
import com.focusr.Precot.mssql.database.model.splunance.ShiftWiseSliterWinderProdReportF017;
import com.focusr.Precot.mssql.database.model.splunance.ShiftWiseWasteReportDetailsF019;
import com.focusr.Precot.mssql.database.model.splunance.ShiftWiseWasteReportSpunlaceF019;
import com.focusr.Precot.mssql.database.model.splunance.SliterWinderListF017;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceGsmAnalysisReportF009;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceHandSanitizationListF025;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceHandSanitizationReportF025;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceSmsActivitiesF024;
import com.focusr.Precot.mssql.database.model.splunance.audit.DailyProdPlanHistoryF010;
import com.focusr.Precot.mssql.database.model.splunance.audit.DailyProductionDetailsHistoryF006;
import com.focusr.Precot.mssql.database.model.splunance.audit.DailyProductionReportHistoryF006;
import com.focusr.Precot.mssql.database.model.splunance.audit.DailyRejectionReportHistoryF007;
import com.focusr.Precot.mssql.database.model.splunance.audit.FilterBagConsumptionDetailsHistoryF004;
import com.focusr.Precot.mssql.database.model.splunance.audit.FilterConsumptionDetailsHistoryF004;
import com.focusr.Precot.mssql.database.model.splunance.audit.LogbookSpunlacePlanningHistoryF010;
import com.focusr.Precot.mssql.database.model.splunance.audit.MachineCleaningRecordHistoryF023;
import com.focusr.Precot.mssql.database.model.splunance.audit.MetalDetectorCheckListHistoryF020;
import com.focusr.Precot.mssql.database.model.splunance.audit.ProcessSetupVerificationRpBalePressHistoryF013;
import com.focusr.Precot.mssql.database.model.splunance.audit.ProcessSetupVerificationSliterWinderHistoryF016;
import com.focusr.Precot.mssql.database.model.splunance.audit.ProductChangeOverCheckListSpunlaceHistoryF011;
import com.focusr.Precot.mssql.database.model.splunance.audit.SanitizationOfMachineAndSurfacesHistoryF024;
import com.focusr.Precot.mssql.database.model.splunance.audit.ShiftWiseSliterWinderProdDetailsHistoryF017;
import com.focusr.Precot.mssql.database.model.splunance.audit.ShiftWiseSliterWinderProdReportHistoryF017;
import com.focusr.Precot.mssql.database.model.splunance.audit.ShiftWiseWasteReportDetailsHistoryF019;
import com.focusr.Precot.mssql.database.model.splunance.audit.ShiftWiseWasteReportSpunlaceHistoryF019;
import com.focusr.Precot.mssql.database.model.splunance.audit.SliterWinderListHistoryF017;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceGsmAnalysisReportHistoryF009;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceHandSanitizationListHistoryF025;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceHandSanitizationReportHistoryF025;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceSmsActivitiesHistoryF024;
import com.focusr.Precot.mssql.database.repository.UserImageDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.splunance.DailyProdPlanF010Repository;
import com.focusr.Precot.mssql.database.repository.splunance.DailyProductionDetailsF006Repository;
import com.focusr.Precot.mssql.database.repository.splunance.DailyProductionReportF006Repository;
import com.focusr.Precot.mssql.database.repository.splunance.DailyRejectionReportF007Repository;
import com.focusr.Precot.mssql.database.repository.splunance.FilterBagConsumptionDetailsF004Repository;
import com.focusr.Precot.mssql.database.repository.splunance.FilterConsumptionDetailsF004Repository;
import com.focusr.Precot.mssql.database.repository.splunance.LogbookSpunlacePlanningF010Repository;
import com.focusr.Precot.mssql.database.repository.splunance.MachineCleaningRecordF023Repository;
import com.focusr.Precot.mssql.database.repository.splunance.MetalDetectorCheckListF020Repository;
import com.focusr.Precot.mssql.database.repository.splunance.ProcessSetupVerificationRpBalePressF013Repository;
import com.focusr.Precot.mssql.database.repository.splunance.ProcessSetupVerificationSliterWinderF016Repository;
import com.focusr.Precot.mssql.database.repository.splunance.ProductChangeOverCheckListSpunlaceF011Repository;
import com.focusr.Precot.mssql.database.repository.splunance.SanitizationOfMachineAndSurfacesF024Repository;
import com.focusr.Precot.mssql.database.repository.splunance.ShiftWiseSliterWinderProdDetailsF017Repository;
import com.focusr.Precot.mssql.database.repository.splunance.ShiftWiseSliterWinderProdReportF017Repository;
import com.focusr.Precot.mssql.database.repository.splunance.ShiftWiseWasteReportDetailsF019Repository;
import com.focusr.Precot.mssql.database.repository.splunance.ShiftWiseWasteReportSpunlaceF019Repository;
import com.focusr.Precot.mssql.database.repository.splunance.SliterWinderListF017Repository;
import com.focusr.Precot.mssql.database.repository.splunance.SpunlaceGsmAnalysisReportF009Repository;
import com.focusr.Precot.mssql.database.repository.splunance.SpunlaceHandSanitizationListF025Repository;
import com.focusr.Precot.mssql.database.repository.splunance.SpunlaceHandSanitizationReportF025Repository;
import com.focusr.Precot.mssql.database.repository.splunance.SpunlaceSmsActivitiesF024Repository;
import com.focusr.Precot.mssql.database.repository.splunance.audit.DailyProdPlanHistoryF010Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.DailyProductionDetailsHistoryF006Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.DailyProductionReportHistoryF006Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.DailyRejectionReportF007RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.splunance.audit.FilterBagConsumptionDetailsF004RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.splunance.audit.FilterConsumptionDetailsF004RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.splunance.audit.LogbookSpunlacePlanningHistoryF010Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.MachineCleaningRecordHistoryF023Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.MetalDetectorCheckListHistoryF020Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.ProcessSetupVerificationRpBalePressHistoryF013Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.ProcessSetupVerificationSliterWinderHistoryF016Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.ProductChangeOverCheckListSpunlaceHistoryF011Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.SanitizationOfMachineAndSurfacesHistoryF024Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.ShiftWiseSliterWinderProdDetailsHistoryF017Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.ShiftWiseSliterWinderProdReportHistoryF017Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.ShiftWiseWasteReportDetailsHistoryF019Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.ShiftWiseWasteReportSpunlaceHistoryF019Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.SliterWinderListHistoryF017Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.SpunlaceGsmAnalysisReportHistoryF009Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.SpunlaceHandSanitizationListHistoryF025Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.SpunlaceHandSanitizationReportHistoryF025Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.SpunlaceSmsActivitiesHistoryF024Repo;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.splunance.SpunlaceMailFunction;

/*
 *  PH-PRD02/F-007
 *  PH-PRD02/F-004
 *  PH-PRD02/F-006
 *  PH-PRD02/F-010
 *  PH-PRD02/F-009
 *  PH-PRD02/F-016
 *  PH-PRD02/F-013
 *  PH-PRD02/F-020
 *  PH-PRD02/F-019
 *-PRD02/F-023
 *  PH-PRD02/F-017
 */

@Service
public class SpunlaceService1 {

//	@Autowired
//	private DailyRejectionDetailsF007Repository dailyRejectionDetailsF007Repository;

	@Autowired
	private UserImageDetailsRepository imageRepository;

	@Autowired
	private DailyRejectionReportF007Repository dailyRejectionReportF007Repository;

	@Autowired
	private DailyRejectionReportF007RepositoryHistory dailyRejectionReportF007RepositoryHistory;

	@Autowired
	private FilterBagConsumptionDetailsF004Repository filterBagConsumptionDetailsF004Repository;

	@Autowired
	private FilterBagConsumptionDetailsF004RepositoryHistory filterBagConsumptionDetailsF004RepositoryHistory;

	@Autowired
	private FilterConsumptionDetailsF004RepositoryHistory filterConsumptionDetailsF004RepositoryHistory;

	@Autowired
	private FilterConsumptionDetailsF004Repository filterConsumptionDetailsF004Repository;

	@Autowired
	private DailyProductionReportF006Repository dailyProductionReportF006Repository;

	@Autowired
	private DailyProductionReportHistoryF006Repo dailyProductionReportHistoryF006Repo;

	@Autowired
	private DailyProductionDetailsF006Repository dailyProductionDetailsF006Repository;

	@Autowired
	private DailyProductionDetailsHistoryF006Repo dailyProductionDetailsHistoryF006Repo;

	@Autowired
	private LogbookSpunlacePlanningF010Repository logbookSpunlacePlanningF010Repository;

	@Autowired
	private LogbookSpunlacePlanningHistoryF010Repo logbookSpunlacePlanningHistoryF010Repo;

	@Autowired
	private DailyProdPlanF010Repository dailyProdPlanF010Repository;

	@Autowired
	private DailyProdPlanHistoryF010Repo dailyProdPlanHistoryF010Repo;

	@Autowired
	private SpunlaceGsmAnalysisReportF009Repository spunlaceGsmAnalysisReportF009Repository;

	@Autowired
	private SpunlaceGsmAnalysisReportHistoryF009Repo spunlaceGsmAnalysisReportHistoryF009Repo;

//	@Autowired
//	private GsmMoistureDetailsF009Repository gsmMoistureDetailsF009Repository;

	@Autowired
	private ProcessSetupVerificationSliterWinderF016Repository processSetupVerificationSliterWinderF016Repository;

	@Autowired
	private ProcessSetupVerificationSliterWinderHistoryF016Repo processSetupVerificationSliterWinderHistoryF016Repo;

	@Autowired
	private ProcessSetupVerificationRpBalePressF013Repository processSetupVerificationRpBalePressF013Repository;

	@Autowired
	private ProcessSetupVerificationRpBalePressHistoryF013Repo processSetupVerificationRpBalePressHistoryF013Repo;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private MetalDetectorCheckListF020Repository metalDetectorCheckListF020Repository;

	@Autowired
	private MetalDetectorCheckListHistoryF020Repo metalDetectorCheckListHistoryF020Repo;

	@Autowired
	private ShiftWiseWasteReportSpunlaceF019Repository shiftWiseWasteReportSpunlaceF019Repository;

	@Autowired
	private ShiftWiseWasteReportSpunlaceHistoryF019Repo shiftWiseWasteReportSpunlaceHistoryF019Repo;

	@Autowired
	private ShiftWiseWasteReportDetailsF019Repository shiftWiseWasteReportDetailsF019Repository;

	@Autowired
	private ShiftWiseWasteReportDetailsHistoryF019Repo shiftWiseWasteReportDetailsHistoryF019Repo;

	@Autowired
	private SanitizationOfMachineAndSurfacesF024Repository sanitizationOfMachineAndSurfacesF024Repository;

	@Autowired
	private SanitizationOfMachineAndSurfacesHistoryF024Repo sanitizationOfMachineAndSurfacesHistoryF024Repo;

	@Autowired
	private SpunlaceSmsActivitiesF024Repository spunlaceSmsActivitiesF024Repository;

	@Autowired
	private SpunlaceSmsActivitiesHistoryF024Repo spunlaceSmsActivitiesHistoryF024Repo;

	@Autowired
	private ProductChangeOverCheckListSpunlaceF011Repository productChangeOverCheckListSpunlaceF011Repository;

	@Autowired
	private ProductChangeOverCheckListSpunlaceHistoryF011Repo productChangeOverCheckListSpunlaceHistoryF011Repo;

	@Autowired
	private SpunlaceHandSanitizationReportF025Repository spunlaceHandSanitizationReportF025Repository;

	@Autowired
	private SpunlaceHandSanitizationReportHistoryF025Repo spunlaceHandSanitizationReportHistoryF025Repo;

	@Autowired
	private SpunlaceHandSanitizationListF025Repository spunlaceHandSanitizationListF025Repository;

	@Autowired
	private SpunlaceHandSanitizationListHistoryF025Repo spunlaceHandSanitizationListHistoryF025Repo;

	@Autowired
	private MachineCleaningRecordF023Repository machineCleaningRecordF023Repository;

	@Autowired
	private MachineCleaningRecordHistoryF023Repo machineCleaningRecordHistoryF023Repo;

	@Autowired
	private ShiftWiseSliterWinderProdReportF017Repository shiftWiseSliterWinderProdReportF017Repository;

	@Autowired
	private ShiftWiseSliterWinderProdReportHistoryF017Repo shiftWiseSliterWinderProdReportHistoryF017Repo;

	@Autowired
	private ShiftWiseSliterWinderProdDetailsF017Repository shiftWiseSliterWinderProdDetailsF017Repository;

	@Autowired
	private ShiftWiseSliterWinderProdDetailsHistoryF017Repo shiftWiseSliterWinderProdDetailsHistoryF017Repo;

	@Autowired
	private SliterWinderListF017Repository sliterWinderListF017Repository;

	@Autowired
	private SliterWinderListHistoryF017Repo sliterWinderListHistoryF017Repo;
	
	@Autowired
	private DailyProdPlanF010Repository dailyProductionPlanRepository;

	@Autowired
	JwtTokenProvider tokenProvider;

	@Autowired
	private SCAUtil scaUtil;

	@Autowired
	SpunlaceMailFunction spunlacemailfunction;

	Logger log = LoggerFactory.getLogger(SpunlaceService1.class);

//	========================================== PH-PRD02/F-007 ==================================================

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SubmitDailyRejectionReportF007(DailyRejectionReportF007 report, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (report == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = report.getReportId();

		DailyRejectionReportF007 checkObj = new DailyRejectionReportF007();

		try {
			String value = "";

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (report.getFormatNo() == null)
				value = "formatNo";
			if (report.getRefSopNo() == null)
				value = "SopNumber";
			if (report.getRevisionNo() == null)
				value = "revisionNo";
			if (report.getFormatName() == null)
				value = "formatName";
			if (report.getUnit() == null)
				value = "Unit";
			if (report.getShift() == null)
				value = "Shift";
			if (report.getDate() == null)
				value = "Date";
			if (report.getOrderNo() == null)
				value = "OrderNo";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = dailyRejectionReportF007Repository.findFormById(id);

				String[] IgnoreProps = { "reportId", "createdBy", "createdAt", "supervisor_mail_status",
						"hod_mail_status", "supervisor_status", "operator_status", "hod_status", "supervisor_submit_by",
						"operator_submit_by", "hod_submit_by", "supervisor_submit_on", "operator_submit_on",
						"hod_submit_on", "supervisor_submit_id", "hod_submit_id", "operator_submit_id",
						"supervisor_sign", "hod_sign", "operator_sign", "operator_signature_image",
						"supervisor_signature_image", "hod_signature_image" };

				BeanUtils.copyProperties(report, checkObj, IgnoreProps);

				if (!checkObj.getOperator_status().equals(AppConstants.operatorApprove)
						|| checkObj.getSupervisor_status().equals(AppConstants.supervisorRejectedStatus)
						|| checkObj.getHod_status().equals(AppConstants.hodRejectedStatus)) {
					if (role.equals("ROLE_OPERATOR")) {

						checkObj.setOperator_submit_by(userName);
						checkObj.setOperator_submit_on(date);
						checkObj.setOperator_submit_id(userId);
						checkObj.setOperator_status(AppConstants.operatorApprove);
						checkObj.setOperator_sign(userName);

						checkObj.setSupervisor_status(AppConstants.waitingStatus);
						checkObj.setSupervisor_mail_status(AppConstants.waitingStatus);

//						checkObj.setHod_status(AppConstants.waitingStatus);
//						checkObj.setHod_mail_status(AppConstants.waitingStatus);

						checkObj.setHod_status("");
						checkObj.setHod_mail_status("");

						// IMAGE

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);

						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

						checkObj.setOperator_signature_image(signature);

						dailyRejectionReportF007Repository.save(checkObj);

						DailyRejectionReportHistoryF007 rejectionReportHistory = new DailyRejectionReportHistoryF007();

						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						String date1 = rejectionReportHistory.getDate();

						String shift1 = rejectionReportHistory.getShift();

						String order1 = rejectionReportHistory.getOrderNo();

						int version = dailyRejectionReportF007RepositoryHistory.getMaximumVersion(date1, shift1, order1)
								.map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						dailyRejectionReportF007RepositoryHistory.save(rejectionReportHistory);

						try {

							spunlacemailfunction.sendEmailToSupervisorsF007(checkObj);
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

				if (!role.equals("ROLE_OPERATOR")) {
					return new ResponseEntity(new ApiResponse(false, role + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = report;
//				dailyRejectionReportF007Repository.save(checkObj);
//				List<DailyRejectionDetailsF007> details = report.getReportDetails();
//				for (DailyRejectionDetailsF007 detail : details) {
//					detail.setReportId(checkObj.getReportId());
//					dailyRejectionDetailsF007Repository.save(detail);
//				}
//				checkObj.setReportDetails(details);

				checkObj.setOperator_submit_by(userName);
				checkObj.setOperator_submit_on(date);
				checkObj.setOperator_submit_id(userId);
				checkObj.setOperator_status(AppConstants.operatorApprove);
				checkObj.setOperator_sign(userName);

				checkObj.setSupervisor_status(AppConstants.waitingStatus);
				checkObj.setSupervisor_mail_status(AppConstants.waitingStatus);

//				checkObj.setHod_status(AppConstants.waitingStatus);
//				checkObj.setHod_mail_status(AppConstants.waitingStatus);

				checkObj.setHod_status("");
				checkObj.setHod_mail_status("");

				// IMAGE

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				checkObj.setOperator_signature_image(signature);

				dailyRejectionReportF007Repository.save(checkObj);

				// AUDIT

				DailyRejectionReportHistoryF007 rejectionReportHistory = new DailyRejectionReportHistoryF007();

				BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				String date1 = rejectionReportHistory.getDate();

				String shiftO = rejectionReportHistory.getShift();

				String order1 = rejectionReportHistory.getOrderNo();

				int version = dailyRejectionReportF007RepositoryHistory.getMaximumVersion(date1, shiftO, order1)
						.map(temp -> temp + 1).orElse(1);

				rejectionReportHistory.setVersion(version);

				dailyRejectionReportF007RepositoryHistory.save(rejectionReportHistory);

				try {

					spunlacemailfunction.sendEmailToSupervisorsF007(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
							HttpStatus.OK);
				}

			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);

//		return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	public ResponseEntity<?> getByDateAndShift(String date, String shift, String orderNo) {
		try {

			DailyRejectionReportF007 list = dailyRejectionReportF007Repository.findByDateShiftOrderNo(date, shift,
					orderNo);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getByDateAndShiftPrintApi(String date, String shift, String orderNo) {
		try {

			DailyRejectionReportF007 list = dailyRejectionReportF007Repository.findByDateShiftOrderNoPrintApi(date,
					shift, orderNo);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> supervisorSummaryF007() {
		try {

			List<DailyRejectionReportF007> list = dailyRejectionReportF007Repository.SummaryF007();

			if (list == null) {

				list = new ArrayList<DailyRejectionReportF007>();
			}
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

//	public ResponseEntity<?> hodSummaryF007() {
//		try {
//
//			List<DailyRejectionReportF007> list = dailyRejectionReportF007Repository.hodSummary();
//
//			if (list == null) {
//
//				list = new ArrayList<DailyRejectionReportF007>();
//			}
//			return new ResponseEntity<>(list, HttpStatus.OK);
//		} catch (Exception e) {
//			log.error("Unable to get Details!", e);
//			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
//		}
//	}

	// APPROVE OR REJECT REJECTION REPORT

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveRejectionReport(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		DailyRejectionReportF007 bleachContRawCottonF05 = new DailyRejectionReportF007();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			bleachContRawCottonF05 = dailyRejectionReportF007Repository.findFormById(approvalResponse.getId());

			DailyRejectionReportHistoryF007 bleachLayDownCheckListF42History = new DailyRejectionReportHistoryF007();

			String supervisiorStatus = bleachContRawCottonF05.getSupervisor_status();

			String hodStatus = bleachContRawCottonF05.getHod_status();

			if (supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
					&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						bleachContRawCottonF05.setHod_status(AppConstants.hodApprovedStatus);
						bleachContRawCottonF05.setHod_submit_on(date);
						bleachContRawCottonF05.setHod_submit_by(userName);
						bleachContRawCottonF05.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachContRawCottonF05.setHod_signature_image(signature);

						bleachContRawCottonF05.setHod_sign(userName);

						dailyRejectionReportF007Repository.save(bleachContRawCottonF05);

						bleachLayDownCheckListF42History = dailyRejectionReportF007RepositoryHistory
								.fetchLastSubmittedRecord(bleachContRawCottonF05.getDate(),
										bleachContRawCottonF05.getShift(), bleachContRawCottonF05.getOrderNo());

						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodApprovedStatus);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_submit_id(userId);
						bleachLayDownCheckListF42History.setHod_sign(userName);

						dailyRejectionReportF007RepositoryHistory.save(bleachLayDownCheckListF42History);

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

						dailyRejectionReportF007Repository.save(bleachContRawCottonF05);

						bleachLayDownCheckListF42History = dailyRejectionReportF007RepositoryHistory
								.fetchLastSubmittedRecord(bleachContRawCottonF05.getDate(),
										bleachContRawCottonF05.getShift(), bleachContRawCottonF05.getOrderNo());

						bleachLayDownCheckListF42History.setReason(reason);
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodRejectedStatus);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_submit_id(userId);
						bleachLayDownCheckListF42History.setHod_sign(userName);

						dailyRejectionReportF007RepositoryHistory.save(bleachLayDownCheckListF42History);

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

			else if (bleachContRawCottonF05.getOperator_status().equalsIgnoreCase(AppConstants.operatorApprove)
					&& supervisiorStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						bleachContRawCottonF05.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						bleachContRawCottonF05.setSupervisor_submit_on(date);
						bleachContRawCottonF05.setSupervisor_submit_by(userName);
						bleachContRawCottonF05.setSupervisor_submit_id(userId);
						bleachContRawCottonF05.setHod_status(AppConstants.waitingStatus);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachContRawCottonF05.setSupervisor_signature_image(signature);

						bleachContRawCottonF05.setSupervisor_sign(userName);

						dailyRejectionReportF007Repository.save(bleachContRawCottonF05);

						bleachLayDownCheckListF42History = dailyRejectionReportF007RepositoryHistory
								.fetchLastSubmittedRecord(bleachContRawCottonF05.getDate(),
										bleachContRawCottonF05.getShift(), bleachContRawCottonF05.getOrderNo());

						bleachLayDownCheckListF42History.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						bleachLayDownCheckListF42History.setSupervisor_submit_on(date);
						bleachLayDownCheckListF42History.setSupervisor_submit_by(userName);
						bleachLayDownCheckListF42History.setSupervisor_submit_id(userId);
						bleachLayDownCheckListF42History.setSupervisor_sign(userName);
						bleachLayDownCheckListF42History.setHod_status(AppConstants.waitingStatus);

						dailyRejectionReportF007RepositoryHistory.save(bleachLayDownCheckListF42History);

						try {

							spunlacemailfunction.sendEmailToHodF007(bleachContRawCottonF05);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
									HttpStatus.OK);
						}

						return new ResponseEntity<>(new ApiResponse(true, " Supervisor Approved Successfully"),
								HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						bleachContRawCottonF05.setReason(reason);
						bleachContRawCottonF05.setSupervisor_status(AppConstants.supervisorRejectedStatus);
						bleachContRawCottonF05.setSupervisor_submit_on(date);
						bleachContRawCottonF05.setSupervisor_submit_by(userName);
						bleachContRawCottonF05.setSupervisor_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachContRawCottonF05.setSupervisor_signature_image(signature);

						bleachContRawCottonF05.setSupervisor_sign(userName);

						dailyRejectionReportF007Repository.save(bleachContRawCottonF05);

						bleachLayDownCheckListF42History = dailyRejectionReportF007RepositoryHistory
								.fetchLastSubmittedRecord(bleachContRawCottonF05.getDate(),
										bleachContRawCottonF05.getShift(), bleachContRawCottonF05.getOrderNo());

//						bleachLayDownCheckListF42History = dailyRejectionReportF007RepositoryHistory
//								.fetchLastSubmittedRecord(bleachContRawCottonF05.getDate(),
//										bleachContRawCottonF05.getShift(), bleachContRawCottonF05.getOrderNo());

						bleachLayDownCheckListF42History.setReason(reason);
						bleachLayDownCheckListF42History.setSupervisor_status(AppConstants.supervisorRejectedStatus);
						bleachLayDownCheckListF42History.setSupervisor_submit_on(date);
						bleachLayDownCheckListF42History.setSupervisor_submit_by(userName);
						bleachLayDownCheckListF42History.setSupervisor_submit_id(userId);
						bleachLayDownCheckListF42History.setSupervisor_sign(userName);

						dailyRejectionReportF007RepositoryHistory.save(bleachLayDownCheckListF42History);

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
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

//	========================================== PH-PRD02/F-004 ==================================================

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SaveFilterConsumptionDetails(FilterBagConsumptionDetailsF004 details,
			HttpServletRequest http) {

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		FilterBagConsumptionDetailsF004 listObj = null;
		try {

			String value = "";

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRefSopNo() == null)
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

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getFilterId() != null) {

				listObj = filterBagConsumptionDetailsF004Repository.findFormById(details.getFilterId());

				String[] IgnoreProps = { "detailId", "createdBy", "createdAt", "supervisor_status", "hod_status",
						"operator_status", "supervisor_submit_by", "hod_submit_by", "operator_submit_by",
						"supervisor_submit_on", "hod_submit_on", "operator_submit_on", "supervisor_submit_id",
						"hod_submit_id", "operator_submit_id", "supervisor_saved_by", "hod_saved_by",
						"operator_saved_by", "supervisor_saved_on", "hod_saved_on", "operator_saved_on",
						"supervisor_saved_id", "hod_saved_id", "operator_saved_id", "supervisor_sign", "hod_sign",
						"operator_sign", "supervisor_mail_status", "hod_mail_status", "operator_signature_image",
						"supervisor_signature_image", "hod_signature_image" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

				if (role.equals("ROLE_OPERATOR")) {

					if (listObj.getOperator_status().equals(AppConstants.operatorApprove)) {
						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
								HttpStatus.BAD_REQUEST);
					}

					filterBagConsumptionDetailsF004Repository.save(listObj);

					List<FilterConsumptionDetailsF004> list = details.getDetails();

					for (FilterConsumptionDetailsF004 detail : list) {
						detail.setFilterId(listObj.getFilterId());
						filterConsumptionDetailsF004Repository.save(detail);
					}

					listObj.setDetails(list);

					listObj.setOperator_saved_by(userName);
					listObj.setOperator_saved_on(date);
					listObj.setOperator_saved_id(userId);
					listObj.setOperator_status(AppConstants.operatorSave);

					filterBagConsumptionDetailsF004Repository.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + "cannot save details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (role.equals("ROLE_OPERATOR")) {

					listObj = details;

					filterBagConsumptionDetailsF004Repository.save(listObj);

					List<FilterConsumptionDetailsF004> list = details.getDetails();

					for (FilterConsumptionDetailsF004 detail : list) {
						detail.setFilterId(listObj.getFilterId());
						filterConsumptionDetailsF004Repository.save(detail);
					}

					listObj.setDetails(list);

					listObj.setOperator_saved_by(userName);
					listObj.setOperator_saved_on(date);
					listObj.setOperator_saved_id(userId);
					listObj.setOperator_status(AppConstants.operatorSave);

					filterBagConsumptionDetailsF004Repository.save(listObj);

				} else {

					return new ResponseEntity(new ApiResponse(false, role + "cannot save details"),
							HttpStatus.BAD_REQUEST);

				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);


			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SubmitFilterConsumptionDetails(FilterBagConsumptionDetailsF004 details,
			HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getFilterId();

		FilterBagConsumptionDetailsF004 checkObj = new FilterBagConsumptionDetailsF004();

		try {
			String value = "";

			
			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRefSopNo() == null)
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

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = filterBagConsumptionDetailsF004Repository.findFormById(id);

				String[] IgnoreProps = { "detailId", "createdBy", "createdAt", "supervisor_status", "hod_status",
						"operator_status", "supervisor_submit_by", "hod_submit_by", "operator_submit_by",
						"supervisor_submit_on", "hod_submit_on", "operator_submit_on", "supervisor_submit_id",
						"hod_submit_id", "operator_submit_id", "supervisor_saved_by", "hod_saved_by",
						"operator_saved_by", "supervisor_saved_on", "hod_saved_on", "operator_saved_on",
						"supervisor_saved_id", "hod_saved_id", "operator_saved_id", "supervisor_sign", "hod_sign",
						"operator_sign", "supervisor_mail_status", "hod_mail_status", "operator_signature_image",
						"supervisor_signature_image", "hod_signature_image" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (!checkObj.getOperator_status().equals(AppConstants.operatorApprove)
						|| checkObj.getSupervisor_status().equals(AppConstants.supervisorRejectedStatus)
						|| checkObj.getHod_status().equals(AppConstants.hodRejectedStatus)) {
					if (role.equals("ROLE_OPERATOR")) {

						filterBagConsumptionDetailsF004Repository.save(checkObj);

						List<FilterConsumptionDetailsF004> list = details.getDetails();

						for (FilterConsumptionDetailsF004 detail : list) {
							detail.setFilterId(checkObj.getFilterId());
							filterConsumptionDetailsF004Repository.save(detail);
						}

						checkObj.setDetails(list);

						checkObj.setOperator_submit_by(userName);
						checkObj.setOperator_submit_on(date);
						checkObj.setOperator_submit_id(userId);
						checkObj.setOperator_status(AppConstants.operatorApprove);
						checkObj.setOperator_sign(userName);

						checkObj.setSupervisor_status(AppConstants.waitingStatus);
						checkObj.setSupervisor_mail_status(AppConstants.waitingStatus);

						checkObj.setHod_status("");
						checkObj.setHod_mail_status("");

						filterBagConsumptionDetailsF004Repository.save(checkObj);

						// IMAGE

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);

						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

						checkObj.setOperator_signature_image(signature);

						filterBagConsumptionDetailsF004Repository.save(checkObj); // ONE TABLE

						FilterBagConsumptionDetailsHistoryF004 rejectionReportHistory = new FilterBagConsumptionDetailsHistoryF004();

//						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						// getter setters fields & status

						rejectionReportHistory.setFormatName(checkObj.getFormatName());
						rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
						rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
						rejectionReportHistory.setRefSopNo(checkObj.getRefSopNo());
						rejectionReportHistory.setUnit(checkObj.getUnit());
						rejectionReportHistory.setDate(checkObj.getDate());
						rejectionReportHistory.setShift(checkObj.getShift());

						// status
						rejectionReportHistory.setOperator_submit_by(checkObj.getOperator_submit_by());
						rejectionReportHistory.setOperator_submit_id(checkObj.getOperator_submit_id());
						rejectionReportHistory.setOperator_submit_on(checkObj.getOperator_submit_on());
						rejectionReportHistory.setOperator_status(checkObj.getOperator_status());
						rejectionReportHistory.setOperator_sign(checkObj.getOperator_sign());
						rejectionReportHistory.setOperator_signature_image(checkObj.getOperator_signature_image());

						rejectionReportHistory.setSupervisor_status(checkObj.getSupervisor_status());
						rejectionReportHistory.setHod_status(checkObj.getHod_status());

						// version
						String date1 = rejectionReportHistory.getDate();

						String shift1 = rejectionReportHistory.getShift();

						int version = filterBagConsumptionDetailsF004RepositoryHistory.getMaximumVersion(date1, shift1)
								.map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						filterBagConsumptionDetailsF004RepositoryHistory.save(rejectionReportHistory); // ONE HISTORY

						List<FilterConsumptionDetailsF004> historyMapList = checkObj.getDetails();

						for (FilterConsumptionDetailsF004 obj : historyMapList) {

							FilterConsumptionDetailsHistoryF004 objHistory = new FilterConsumptionDetailsHistoryF004();

							BeanUtils.copyProperties(obj, objHistory);
							objHistory.setFilterId(rejectionReportHistory.getFilterId());
							filterConsumptionDetailsF004RepositoryHistory.save(objHistory);

						}

						try {

							spunlacemailfunction.sendEmailToSupervisorF004(checkObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, role + "cannot submit details"),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, " Invalid status."), HttpStatus.BAD_REQUEST);
				}
			} else {

				if (!role.equals("ROLE_OPERATOR")) {
					return new ResponseEntity(new ApiResponse(false, role + "cannot submit details"),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = details;

				filterBagConsumptionDetailsF004Repository.save(checkObj);

				List<FilterConsumptionDetailsF004> list = details.getDetails();

				for (FilterConsumptionDetailsF004 detail : list) {
					detail.setFilterId(checkObj.getFilterId());
					filterConsumptionDetailsF004Repository.save(detail);
				}

				checkObj.setDetails(list);

				checkObj.setOperator_submit_by(userName);
				checkObj.setOperator_submit_on(date);
				checkObj.setOperator_submit_id(userId);
				checkObj.setOperator_status(AppConstants.operatorApprove);
				checkObj.setOperator_sign(userName);

				checkObj.setSupervisor_status(AppConstants.waitingStatus);
				checkObj.setSupervisor_mail_status(AppConstants.waitingStatus);

				checkObj.setHod_status("");
				checkObj.setHod_mail_status("");

				filterBagConsumptionDetailsF004Repository.save(checkObj);

				// IMAGE

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				checkObj.setOperator_signature_image(signature);

				filterBagConsumptionDetailsF004Repository.save(checkObj); // ONE TABLE

				FilterBagConsumptionDetailsHistoryF004 rejectionReportHistory = new FilterBagConsumptionDetailsHistoryF004();

//				BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				// getter setters fields & status

				rejectionReportHistory.setFormatName(checkObj.getFormatName());
				rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
				rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
				rejectionReportHistory.setRefSopNo(checkObj.getRefSopNo());
				rejectionReportHistory.setUnit(checkObj.getUnit());
				rejectionReportHistory.setDate(checkObj.getDate());
				rejectionReportHistory.setShift(checkObj.getShift());

				// status
				rejectionReportHistory.setOperator_submit_by(checkObj.getOperator_submit_by());
				rejectionReportHistory.setOperator_submit_id(checkObj.getOperator_submit_id());
				rejectionReportHistory.setOperator_submit_on(checkObj.getOperator_submit_on());
				rejectionReportHistory.setOperator_status(checkObj.getOperator_status());
				rejectionReportHistory.setOperator_sign(checkObj.getOperator_sign());
				rejectionReportHistory.setOperator_signature_image(checkObj.getOperator_signature_image());

				rejectionReportHistory.setSupervisor_status(checkObj.getSupervisor_status());
				rejectionReportHistory.setHod_status(checkObj.getHod_status());

				// version
				String date1 = rejectionReportHistory.getDate();

				String shift1 = rejectionReportHistory.getShift();

				int version = filterBagConsumptionDetailsF004RepositoryHistory.getMaximumVersion(date1, shift1)
						.map(temp -> temp + 1).orElse(1);

				rejectionReportHistory.setVersion(version);

				filterBagConsumptionDetailsF004RepositoryHistory.save(rejectionReportHistory); // ONE HISTORY

				List<FilterConsumptionDetailsF004> historyMapList = checkObj.getDetails();

				for (FilterConsumptionDetailsF004 obj : historyMapList) {

					FilterConsumptionDetailsHistoryF004 objHistory = new FilterConsumptionDetailsHistoryF004();

					BeanUtils.copyProperties(obj, objHistory);
					objHistory.setFilterId(rejectionReportHistory.getFilterId());
					filterConsumptionDetailsF004RepositoryHistory.save(objHistory);

				}

				try {

					spunlacemailfunction.sendEmailToSupervisorF004(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
							HttpStatus.OK);
				}

			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);


			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "Operator Submitted Sucessfully"), HttpStatus.OK);

//		return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveRejectionF004(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		FilterBagConsumptionDetailsF004 object = new FilterBagConsumptionDetailsF004();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = filterBagConsumptionDetailsF004Repository.findFormById(approvalResponse.getId());

			FilterBagConsumptionDetailsHistoryF004 objHistory = new FilterBagConsumptionDetailsHistoryF004();

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

						filterBagConsumptionDetailsF004Repository.save(object);

						objHistory = filterBagConsumptionDetailsF004RepositoryHistory
								.fetchLastSubmittedRecord(object.getDate(), object.getShift());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						filterBagConsumptionDetailsF004RepositoryHistory.save(objHistory);

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

						filterBagConsumptionDetailsF004Repository.save(object);

						objHistory = filterBagConsumptionDetailsF004RepositoryHistory
								.fetchLastSubmittedRecord(object.getDate(), object.getShift());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						filterBagConsumptionDetailsF004RepositoryHistory.save(objHistory);

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

						filterBagConsumptionDetailsF004Repository.save(object);

						objHistory = filterBagConsumptionDetailsF004RepositoryHistory
								.fetchLastSubmittedRecord(object.getDate(), object.getShift());

						objHistory.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						objHistory.setSupervisor_submit_on(date);
						objHistory.setSupervisor_submit_by(userName);
						objHistory.setSupervisor_submit_id(userId);
						objHistory.setSupervisor_sign(userName);
						objHistory.setHod_status(AppConstants.waitingStatus);

						filterBagConsumptionDetailsF004RepositoryHistory.save(objHistory);

						try {

							spunlacemailfunction.sendEmailToHodF004(object);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
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

						filterBagConsumptionDetailsF004Repository.save(object);

						objHistory = filterBagConsumptionDetailsF004RepositoryHistory
								.fetchLastSubmittedRecord(object.getDate(), object.getShift());

//						bleachLayDownCheckListF42History = dailyRejectionReportF007RepositoryHistory
//								.fetchLastSubmittedRecord(bleachContRawCottonF05.getDate(),
//										bleachContRawCottonF05.getShift(), bleachContRawCottonF05.getOrderNo());

						objHistory.setReason(reason);
						objHistory.setSupervisor_status(AppConstants.supervisorRejectedStatus);
						objHistory.setSupervisor_submit_on(date);
						objHistory.setSupervisor_submit_by(userName);
						objHistory.setSupervisor_submit_id(userId);
						objHistory.setSupervisor_sign(userName);

						filterBagConsumptionDetailsF004RepositoryHistory.save(objHistory);

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
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	public ResponseEntity<?> getByDateAndShiftF004(String date, String shift) {
		try {

			FilterBagConsumptionDetailsF004 list = filterBagConsumptionDetailsF004Repository.findByDateAndShift(date,
					shift);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getByDateAndShiftPrintApiF004(String date, String shift) {
		try {

			List<FilterBagConsumptionDetailsF004> list = filterBagConsumptionDetailsF004Repository
					.findByDateAndShiftPrintApi(date, shift);

			if (list == null || list.isEmpty()) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> supervisorSummaryF004() {
		try {

			List<FilterBagConsumptionDetailsF004> list = filterBagConsumptionDetailsF004Repository
					.supervisorHodSummary();

			if (list == null) {

				list = new ArrayList<FilterBagConsumptionDetailsF004>();
			}
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

//	public ResponseEntity<?> hodSummaryF004() {
//		try {
//
//			List<FilterBagConsumptionDetailsF004> list = filterBagConsumptionDetailsF004Repository.hodSummary();
//
//			if (list == null) {
//
//				list = new ArrayList<FilterBagConsumptionDetailsF004>();
//			}
//			return new ResponseEntity<>(list, HttpStatus.OK);
//		} catch (Exception e) {
//			log.error("Unable to get Details!", e);
//			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
//		}
//	}

	public ResponseEntity<?> operatorSummaryF004() {
		try {

			List<FilterBagConsumptionDetailsF004> list = filterBagConsumptionDetailsF004Repository.operatorSummary();

			if (list == null) {

				list = new ArrayList<FilterBagConsumptionDetailsF004>();
			}
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

//	========================================== PH-PRD02/F-006 ==================================================

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SaveProductionReportDetails(DailyProductionReportF006 details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		DailyProductionReportF006 listObj = null;
		try {

			String value = "";

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRefSopNo() == null)
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
			if (details.getOrderNo() == null)
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

			if (details.getReportId() != null) {

				listObj = dailyProductionReportF006Repository.findFormById(details.getReportId());

				String[] IgnoreProps = { "reportId", "createdBy", "createdAt", "supervisor_status", "hod_status",
						"operator_status", "supervisor_submit_by", "hod_submit_by", "operator_submit_by",
						"supervisor_submit_on", "hod_submit_on", "operator_submit_on", "supervisor_submit_id",
						"hod_submit_id", "operator_submit_id", "supervisor_saved_by", "hod_saved_by",
						"operator_saved_by", "supervisor_saved_on", "hod_saved_on", "operator_saved_on",
						"supervisor_saved_id", "hod_saved_id", "operator_saved_id", "supervisor_sign", "hod_sign",
						"operator_sign", "supervisor_mail_status", "hod_mail_status", "operator_signature_image",
						"supervisor_signature_image", "hod_signature_image" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

				if (role.equals("ROLE_OPERATOR")) {

					if (listObj.getOperator_status().equals(AppConstants.operatorApprove)) {
						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
								HttpStatus.BAD_REQUEST);
					}

					dailyProductionReportF006Repository.save(listObj);

					List<DailyProductionDetailsF006> list = details.getReportDetails();

					for (DailyProductionDetailsF006 detail : list) {
						detail.setReportId(listObj.getReportId());
						dailyProductionDetailsF006Repository.save(detail);
					}

					listObj.setReportDetails(list);

					listObj.setOperator_saved_by(userName);
					listObj.setOperator_saved_on(date);
					listObj.setOperator_saved_id(userId);
					listObj.setOperator_status(AppConstants.operatorSave);

					dailyProductionReportF006Repository.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (role.equals("ROLE_OPERATOR")) {

					listObj = details;

					dailyProductionReportF006Repository.save(listObj);

					List<DailyProductionDetailsF006> list = details.getReportDetails();

					for (DailyProductionDetailsF006 detail : list) {
						detail.setReportId(listObj.getReportId());
						dailyProductionDetailsF006Repository.save(detail);
					}

					listObj.setReportDetails(list);

					listObj.setOperator_saved_by(userName);
					listObj.setOperator_saved_on(date);
					listObj.setOperator_saved_id(userId);
					listObj.setOperator_status(AppConstants.operatorSave);

					dailyProductionReportF006Repository.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);


			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SubmitProductionReportDetails(DailyProductionReportF006 details, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getReportId();

		DailyProductionReportF006 checkObj = new DailyProductionReportF006();

		try {
			String value = "";

			
			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRefSopNo() == null)
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
			if (details.getOrderNo() == null)
				value = "OrderNo";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = dailyProductionReportF006Repository.findFormById(id);

				String[] IgnoreProps = { "reportId", "createdBy", "createdAt", "supervisor_status", "hod_status",
						"operator_status", "supervisor_submit_by", "hod_submit_by", "operator_submit_by",
						"supervisor_submit_on", "hod_submit_on", "operator_submit_on", "supervisor_submit_id",
						"hod_submit_id", "operator_submit_id", "supervisor_saved_by", "hod_saved_by",
						"operator_saved_by", "supervisor_saved_on", "hod_saved_on", "operator_saved_on",
						"supervisor_saved_id", "hod_saved_id", "operator_saved_id", "supervisor_sign", "hod_sign",
						"operator_sign", "supervisor_mail_status", "hod_mail_status", "operator_signature_image",
						"supervisor_signature_image", "hod_signature_image" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (!checkObj.getOperator_status().equals(AppConstants.operatorApprove)
						|| checkObj.getSupervisor_status().equals(AppConstants.supervisorRejectedStatus)
						|| checkObj.getHod_status().equals(AppConstants.hodRejectedStatus)) {
					if (role.equals("ROLE_OPERATOR")) {

						dailyProductionReportF006Repository.save(checkObj);

						List<DailyProductionDetailsF006> list = details.getReportDetails();

						for (DailyProductionDetailsF006 detail : list) {
							detail.setReportId(checkObj.getReportId());
							dailyProductionDetailsF006Repository.save(detail);
						}

						checkObj.setReportDetails(list);

						checkObj.setOperator_submit_by(userName);
						checkObj.setOperator_submit_on(date);
						checkObj.setOperator_submit_id(userId);
						checkObj.setOperator_status(AppConstants.operatorApprove);
						checkObj.setOperator_sign(userName);

						checkObj.setSupervisor_status(AppConstants.waitingStatus);
						checkObj.setSupervisor_mail_status(AppConstants.waitingStatus);

//						checkObj.setHod_status(AppConstants.waitingStatus);
//						checkObj.setHod_mail_status(AppConstants.waitingStatus);

						checkObj.setHod_status("");
						checkObj.setHod_mail_status("");

						dailyProductionReportF006Repository.save(checkObj);

						// IMAGE

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);

						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

						checkObj.setOperator_signature_image(signature);

						dailyProductionReportF006Repository.save(checkObj); // ONE TABLE

						DailyProductionReportHistoryF006 rejectionReportHistory = new DailyProductionReportHistoryF006();

//						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						// getter setters fields & status

						rejectionReportHistory.setFormatName(checkObj.getFormatName());
						rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
						rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
						rejectionReportHistory.setRefSopNo(checkObj.getRefSopNo());
						rejectionReportHistory.setUnit(checkObj.getUnit());
						rejectionReportHistory.setDate(checkObj.getDate());
						rejectionReportHistory.setShift(checkObj.getShift());
						rejectionReportHistory.setOrderNo(checkObj.getOrderNo());
						rejectionReportHistory.setStdWidth(checkObj.getStdWidth());
						rejectionReportHistory.setStdGsm(checkObj.getStdGsm());
						rejectionReportHistory.setMixing(checkObj.getMixing());
						rejectionReportHistory.setProductName(checkObj.getProductName());
						rejectionReportHistory.setStdRollDia(checkObj.getStdRollDia());
						rejectionReportHistory.setMaterialCode(checkObj.getMaterialCode());
						rejectionReportHistory.setPattern(checkObj.getPattern());
						rejectionReportHistory.setStdThickness(checkObj.getStdThickness());

						// status
						rejectionReportHistory.setOperator_submit_by(checkObj.getOperator_submit_by());
						rejectionReportHistory.setOperator_submit_id(checkObj.getOperator_submit_id());
						rejectionReportHistory.setOperator_submit_on(checkObj.getOperator_submit_on());
						rejectionReportHistory.setOperator_status(checkObj.getOperator_status());
						rejectionReportHistory.setOperator_sign(checkObj.getOperator_sign());
						rejectionReportHistory.setOperator_signature_image(checkObj.getOperator_signature_image());

						rejectionReportHistory.setSupervisor_status(checkObj.getSupervisor_status());
						rejectionReportHistory.setHod_status(checkObj.getHod_status());

						// version
						String date1 = rejectionReportHistory.getDate();

						String shift1 = rejectionReportHistory.getShift();

						String orderNo1 = rejectionReportHistory.getOrderNo();

						int version = dailyProductionReportHistoryF006Repo.getMaximumVersion(date1, shift1, orderNo1)
								.map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						dailyProductionReportHistoryF006Repo.save(rejectionReportHistory); // ONE HISTORY

						List<DailyProductionDetailsF006> historyMapList = checkObj.getReportDetails();

						for (DailyProductionDetailsF006 obj : historyMapList) {

							DailyProductionDetailsHistoryF006 objHistory = new DailyProductionDetailsHistoryF006();

							BeanUtils.copyProperties(obj, objHistory);
							objHistory.setReportId(rejectionReportHistory.getReportId());
							dailyProductionDetailsHistoryF006Repo.save(objHistory);

						}

						try {

							spunlacemailfunction.sendEmailToSupervisorF006(checkObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, " Invalid Status."), HttpStatus.BAD_REQUEST);
				}
			} else {

				if (!role.equals("ROLE_OPERATOR")) {
					return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = details;

				dailyProductionReportF006Repository.save(checkObj);

				List<DailyProductionDetailsF006> list = details.getReportDetails();

				for (DailyProductionDetailsF006 detail : list) {
					detail.setReportId(checkObj.getReportId());
					dailyProductionDetailsF006Repository.save(detail);
				}

				checkObj.setReportDetails(list);

				checkObj.setOperator_submit_by(userName);
				checkObj.setOperator_submit_on(date);
				checkObj.setOperator_submit_id(userId);
				checkObj.setOperator_status(AppConstants.operatorApprove);
				checkObj.setOperator_sign(userName);

				checkObj.setSupervisor_status(AppConstants.waitingStatus);
				checkObj.setSupervisor_mail_status(AppConstants.waitingStatus);

//				checkObj.setHod_status(AppConstants.waitingStatus);
//				checkObj.setHod_mail_status(AppConstants.waitingStatus);

				checkObj.setHod_status("");
				checkObj.setHod_mail_status("");

				dailyProductionReportF006Repository.save(checkObj);

				// IMAGE

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				checkObj.setOperator_signature_image(signature);

				dailyProductionReportF006Repository.save(checkObj); // ONE TABLE

				DailyProductionReportHistoryF006 rejectionReportHistory = new DailyProductionReportHistoryF006();

//				BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				// getter setters fields & status

				rejectionReportHistory.setFormatName(checkObj.getFormatName());
				rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
				rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
				rejectionReportHistory.setRefSopNo(checkObj.getRefSopNo());
				rejectionReportHistory.setUnit(checkObj.getUnit());
				rejectionReportHistory.setDate(checkObj.getDate());
				rejectionReportHistory.setShift(checkObj.getShift());
				rejectionReportHistory.setOrderNo(checkObj.getOrderNo());
				rejectionReportHistory.setStdWidth(checkObj.getStdWidth());
				rejectionReportHistory.setStdGsm(checkObj.getStdGsm());
				rejectionReportHistory.setMixing(checkObj.getMixing());
				rejectionReportHistory.setProductName(checkObj.getProductName());
				rejectionReportHistory.setStdRollDia(checkObj.getStdRollDia());
				rejectionReportHistory.setMaterialCode(checkObj.getMaterialCode());
				rejectionReportHistory.setPattern(checkObj.getPattern());
				rejectionReportHistory.setStdThickness(checkObj.getStdThickness());

				// status
				rejectionReportHistory.setOperator_submit_by(checkObj.getOperator_submit_by());
				rejectionReportHistory.setOperator_submit_id(checkObj.getOperator_submit_id());
				rejectionReportHistory.setOperator_submit_on(checkObj.getOperator_submit_on());
				rejectionReportHistory.setOperator_status(checkObj.getOperator_status());
				rejectionReportHistory.setOperator_sign(checkObj.getOperator_sign());
				rejectionReportHistory.setOperator_signature_image(checkObj.getOperator_signature_image());

				rejectionReportHistory.setSupervisor_status(checkObj.getSupervisor_status());
				rejectionReportHistory.setHod_status(checkObj.getHod_status());

				// version
				String date1 = rejectionReportHistory.getDate();

				String shift1 = rejectionReportHistory.getShift();

				String orderNo1 = rejectionReportHistory.getOrderNo();

				int version = dailyProductionReportHistoryF006Repo.getMaximumVersion(date1, shift1, orderNo1)
						.map(temp -> temp + 1).orElse(1);

				rejectionReportHistory.setVersion(version);

				dailyProductionReportHistoryF006Repo.save(rejectionReportHistory); // ONE HISTORY

				List<DailyProductionDetailsF006> historyMapList = checkObj.getReportDetails();

				for (DailyProductionDetailsF006 obj : historyMapList) {

					DailyProductionDetailsHistoryF006 objHistory = new DailyProductionDetailsHistoryF006();

					BeanUtils.copyProperties(obj, objHistory);
					objHistory.setReportId(rejectionReportHistory.getReportId());
					dailyProductionDetailsHistoryF006Repo.save(objHistory);

				}

				try {

					spunlacemailfunction.sendEmailToSupervisorF006(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
							HttpStatus.OK);
				}

			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);

//		return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveRejectionF006(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		DailyProductionReportF006 object = new DailyProductionReportF006();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = dailyProductionReportF006Repository.findFormById(approvalResponse.getId());

			DailyProductionReportHistoryF006 objHistory = new DailyProductionReportHistoryF006();

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

						dailyProductionReportF006Repository.save(object);

						objHistory = dailyProductionReportHistoryF006Repo.fetchLastSubmittedRecord(object.getDate(),
								object.getShift(), object.getOrderNo());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						dailyProductionReportHistoryF006Repo.save(objHistory);

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

						dailyProductionReportF006Repository.save(object);

						objHistory = dailyProductionReportHistoryF006Repo.fetchLastSubmittedRecord(object.getDate(),
								object.getShift(), object.getOrderNo());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						dailyProductionReportHistoryF006Repo.save(objHistory);

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

						dailyProductionReportF006Repository.save(object);

						objHistory = dailyProductionReportHistoryF006Repo.fetchLastSubmittedRecord(object.getDate(),
								object.getShift(), object.getOrderNo());

						objHistory.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						objHistory.setSupervisor_submit_on(date);
						objHistory.setSupervisor_submit_by(userName);
						objHistory.setSupervisor_submit_id(userId);
						objHistory.setSupervisor_sign(userName);

						objHistory.setHod_status(AppConstants.waitingStatus);

						dailyProductionReportHistoryF006Repo.save(objHistory);

						try {

							spunlacemailfunction.sendEmailToHodF006(object);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
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

						dailyProductionReportF006Repository.save(object);

						objHistory = dailyProductionReportHistoryF006Repo.fetchLastSubmittedRecord(object.getDate(),
								object.getShift(), object.getOrderNo());

//						bleachLayDownCheckListF42History = dailyRejectionReportF007RepositoryHistory
//								.fetchLastSubmittedRecord(bleachContRawCottonF05.getDate(),
//										bleachContRawCottonF05.getShift(), bleachContRawCottonF05.getOrderNo());

						objHistory.setReason(reason);
						objHistory.setSupervisor_status(AppConstants.supervisorRejectedStatus);
						objHistory.setSupervisor_submit_on(date);
						objHistory.setSupervisor_submit_by(userName);
						objHistory.setSupervisor_submit_id(userId);
						objHistory.setSupervisor_sign(userName);

						dailyProductionReportHistoryF006Repo.save(objHistory);

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
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	public ResponseEntity<?> getByDateShiftOrderNoF006(String date, String shift, String orderNo) {
		try {

			DailyProductionReportF006 list = dailyProductionReportF006Repository.findByDateShiftOrderNo(date, shift,
					orderNo);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getByDateShiftOrderNoPrintApiF006(String date, String shift, String orderNo) {
		try {

			DailyProductionReportF006 list = dailyProductionReportF006Repository.findByDateShiftOrderNoPrintApi(date,
					shift, orderNo);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> operatorSummaryF006() {
		try {

			List<DailyProductionReportF006> list = dailyProductionReportF006Repository.operatorSummary();

			if (list == null) {

				list = new ArrayList<DailyProductionReportF006>();
			}
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> supervisorSummaryF006() {
		try {

			List<DailyProductionReportF006> list = dailyProductionReportF006Repository.supervisorHodSummary();

			if (list == null) {

				list = new ArrayList<DailyProductionReportF006>();
			}
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

//	public ResponseEntity<?> hodSummaryF006() {
//		try {
//
//			List<DailyProductionReportF006> list = dailyProductionReportF006Repository.hodSummary();
//
//			if (list == null) {
//
//				list = new ArrayList<DailyProductionReportF006>();
//			}
//			return new ResponseEntity<>(list, HttpStatus.OK);
//		} catch (Exception e) {
//			log.error("Unable to get Details!", e);
//			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
//		}
//	}

//	========================================== PH-PRD02/F-010 ==================================================

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SaveLogbookSpunlacePlan(LogbookSpunlacePlanningF010 details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		LogbookSpunlacePlanningF010 listObj = null;
		try {

			String value = "";

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRefSopNo() == null)
				value = "SopNumber";
			if (details.getRevisionNo() == null)
				value = "revisionNo";
			if (details.getFormatName() == null)
				value = "formatName";
			if (details.getUnit() == null)
				value = "unit";
			if (details.getDate() == null)
				value = "date";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getPlanId() != null) {

				listObj = logbookSpunlacePlanningF010Repository.findFormById(details.getPlanId());

				String[] IgnoreProps = { "planId", "prodId", "createdBy", "createdAt", "supervisor_status",
						"hod_status", "supervisor_submit_by", "hod_submit_by", "supervisor_submit_on", "hod_submit_on",
						"supervisor_submit_id", "hod_submit_id", "supervisor_save_by", "hod_save_by",
						"supervisor_save_on", "hod_save_on", "supervisor_save_id", "hod_save_id", "supervisor_sign",
						"hod_sign", "hod_mail_status", "prodPlanDetails", "supervisor_signature_image",
						"hod_signature_image" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

				if (role.equals("ROLE_SUPERVISOR")) {

					if (listObj.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)) {
						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
								HttpStatus.BAD_REQUEST);
					}

					logbookSpunlacePlanningF010Repository.save(listObj);

					List<DailyProdPlanF010> list = details.getProdPlanDetails();

					for (DailyProdPlanF010 detail : list) {

						if (detail.getProdId() != null) {
							DailyProdPlanF010 obj = dailyProdPlanF010Repository.findFormById(detail.getProdId());
							detail.setCreatedAt(obj.getCreatedAt());
							detail.setCreatedBy(obj.getCreatedBy());
							dailyProdPlanF010Repository.save(detail);
						}

						detail.setPlanId(listObj.getPlanId());
						dailyProdPlanF010Repository.save(detail);
					}

					listObj.setProdPlanDetails(list);

					listObj.setSupervisor_save_by(userName);
					listObj.setSupervisor_save_on(date);
					listObj.setSupervisor_save_id(userId);
					listObj.setSupervisor_status(AppConstants.supervisorSave);
//					listObj.setsupervisor_mail_status(AppConstants.waitingStatus);

					logbookSpunlacePlanningF010Repository.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (role.equals("ROLE_SUPERVISOR")) {

					listObj = details;

					logbookSpunlacePlanningF010Repository.save(listObj);

					List<DailyProdPlanF010> list = details.getProdPlanDetails();

					for (DailyProdPlanF010 detail : list) {
						detail.setPlanId(listObj.getPlanId());
						dailyProdPlanF010Repository.save(detail);
					}

					listObj.setProdPlanDetails(list);

					listObj.setSupervisor_save_by(userName);
					listObj.setSupervisor_save_on(date);
					listObj.setSupervisor_save_id(userId);
					listObj.setSupervisor_status(AppConstants.supervisorSave);
//					listObj.setsupervisor_mail_status(AppConstants.waitingStatus);

					logbookSpunlacePlanningF010Repository.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}
//		return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SubmitLogbookSpunlacePlan(LogbookSpunlacePlanningF010 details, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getPlanId();

		LogbookSpunlacePlanningF010 checkObj = new LogbookSpunlacePlanningF010();

		try {
			String value = "";

	

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRefSopNo() == null)
				value = "SopNumber";
			if (details.getRevisionNo() == null)
				value = "revisionNo";
			if (details.getFormatName() == null)
				value = "formatName";
			if (details.getUnit() == null)
				value = "unit";
			if (details.getDate() == null)
				value = "date";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			String[] IgnoreProps = { "planId", "prodId", "createdBy", "createdAt", "supervisor_status", "hod_status",
					"supervisor_submit_by", "hod_submit_by", "supervisor_submit_on", "hod_submit_on",
					"supervisor_submit_id", "hod_submit_id", "supervisor_save_by", "hod_save_by", "supervisor_save_on",
					"hod_save_on", "supervisor_save_id", "hod_save_id", "supervisor_sign", "hod_sign",
					"hod_mail_status", "prodPlanDetails", "supervisor_signature_image", "hod_signature_image" };

			if (id != null) {

				checkObj = logbookSpunlacePlanningF010Repository.findFormById(id);

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (!checkObj.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)
						|| checkObj.getHod_status().equals(AppConstants.hodRejectedStatus)) {
					if (role.equals("ROLE_SUPERVISOR")) {

						logbookSpunlacePlanningF010Repository.save(checkObj);

						List<DailyProdPlanF010> list = details.getProdPlanDetails();

						for (DailyProdPlanF010 detail : list) {

							if (detail.getProdId() != null) {
								DailyProdPlanF010 obj = dailyProdPlanF010Repository.findFormById(detail.getProdId());
								detail.setCreatedAt(obj.getCreatedAt());
								detail.setCreatedBy(obj.getCreatedBy());
							}
							detail.setPlanId(checkObj.getPlanId());
							dailyProdPlanF010Repository.save(detail);
						}

						checkObj.setProdPlanDetails(list);

						checkObj.setSupervisor_submit_by(userName);
						checkObj.setSupervisor_submit_on(date);
						checkObj.setSupervisor_submit_id(userId);
						checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						checkObj.setSupervisor_sign(userName);

						checkObj.setHod_status(AppConstants.waitingStatus);
						checkObj.setHod_mail_status(AppConstants.waitingStatus);

						logbookSpunlacePlanningF010Repository.save(checkObj);

						// IMAGE

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);

						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

						checkObj.setSupervisor_signature_image(signature);

						logbookSpunlacePlanningF010Repository.save(checkObj); // ONE TABLE

						LogbookSpunlacePlanningHistoryF010 rejectionReportHistory = new LogbookSpunlacePlanningHistoryF010();

						// getter setters fields & status

						BeanUtils.copyProperties(checkObj, rejectionReportHistory, IgnoreProps);

						// status
						rejectionReportHistory.setSupervisor_submit_by(checkObj.getSupervisor_submit_by());
						rejectionReportHistory.setSupervisor_submit_id(checkObj.getSupervisor_submit_id());
						rejectionReportHistory.setSupervisor_submit_on(checkObj.getSupervisor_submit_on());
						rejectionReportHistory.setSupervisor_status(checkObj.getSupervisor_status());
						rejectionReportHistory.setSupervisor_sign(checkObj.getSupervisor_sign());
						rejectionReportHistory.setSupervisor_signature_image(checkObj.getSupervisor_signature_image());

						rejectionReportHistory.setHod_status(checkObj.getHod_status());

						// version
						String date1 = rejectionReportHistory.getDate();

						int version = logbookSpunlacePlanningHistoryF010Repo.getMaximumVersion(date1)
								.map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						logbookSpunlacePlanningHistoryF010Repo.save(rejectionReportHistory); // ONE HISTORY

						List<DailyProdPlanF010> historyMapList = checkObj.getProdPlanDetails();

						for (DailyProdPlanF010 obj : historyMapList) {

							DailyProdPlanHistoryF010 objHistory = new DailyProdPlanHistoryF010();

							BeanUtils.copyProperties(obj, objHistory);
							objHistory.setPlanId(rejectionReportHistory.getPlanId());
							dailyProdPlanHistoryF010Repo.save(objHistory);

						}

						try {

							spunlacemailfunction.sendEmailToHodF010(checkObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, " Invalid Status."), HttpStatus.BAD_REQUEST);
				}
			} else {

				if (!role.equals("ROLE_SUPERVISOR")) {
					return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = details;

				logbookSpunlacePlanningF010Repository.save(checkObj);

				List<DailyProdPlanF010> list = details.getProdPlanDetails();

				for (DailyProdPlanF010 detail : list) {
					detail.setPlanId(checkObj.getPlanId());
					dailyProdPlanF010Repository.save(detail);
				}

				checkObj.setProdPlanDetails(list);

				checkObj.setSupervisor_submit_by(userName);
				checkObj.setSupervisor_submit_on(date);
				checkObj.setSupervisor_submit_id(userId);
				checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
				checkObj.setSupervisor_sign(userName);

				checkObj.setHod_status(AppConstants.waitingStatus);
				checkObj.setHod_mail_status(AppConstants.waitingStatus);

				logbookSpunlacePlanningF010Repository.save(checkObj);

				// IMAGE

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				checkObj.setSupervisor_signature_image(signature);

				logbookSpunlacePlanningF010Repository.save(checkObj); // ONE TABLE

				LogbookSpunlacePlanningHistoryF010 rejectionReportHistory = new LogbookSpunlacePlanningHistoryF010();

				// getter setters fields & status

				BeanUtils.copyProperties(checkObj, rejectionReportHistory, IgnoreProps);

				// status
				rejectionReportHistory.setSupervisor_submit_by(checkObj.getSupervisor_submit_by());
				rejectionReportHistory.setSupervisor_submit_id(checkObj.getSupervisor_submit_id());
				rejectionReportHistory.setSupervisor_submit_on(checkObj.getSupervisor_submit_on());
				rejectionReportHistory.setSupervisor_status(checkObj.getSupervisor_status());
				rejectionReportHistory.setSupervisor_sign(checkObj.getSupervisor_sign());
				rejectionReportHistory.setSupervisor_signature_image(checkObj.getSupervisor_signature_image());

				rejectionReportHistory.setHod_status(checkObj.getHod_status());

				// version
				String date1 = rejectionReportHistory.getDate();

				int version = logbookSpunlacePlanningHistoryF010Repo.getMaximumVersion(date1).map(temp -> temp + 1)
						.orElse(1);

				rejectionReportHistory.setVersion(version);

				logbookSpunlacePlanningHistoryF010Repo.save(rejectionReportHistory); // ONE HISTORY

				List<DailyProdPlanF010> historyMapList = checkObj.getProdPlanDetails();

				for (DailyProdPlanF010 obj : historyMapList) {

					DailyProdPlanHistoryF010 objHistory = new DailyProdPlanHistoryF010();

					BeanUtils.copyProperties(obj, objHistory);
					objHistory.setPlanId(rejectionReportHistory.getPlanId());
					dailyProdPlanHistoryF010Repo.save(objHistory);

				}

				try {

					spunlacemailfunction.sendEmailToHodF010(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
							HttpStatus.OK);
				}

			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);

//		return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveRejectionF010(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		LogbookSpunlacePlanningF010 object = new LogbookSpunlacePlanningF010();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = logbookSpunlacePlanningF010Repository.findFormById(approvalResponse.getId());

			LogbookSpunlacePlanningHistoryF010 objHistory = new LogbookSpunlacePlanningHistoryF010();

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

						logbookSpunlacePlanningF010Repository.save(object);

						objHistory = logbookSpunlacePlanningHistoryF010Repo.fetchLastSubmittedRecord(object.getDate());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						logbookSpunlacePlanningHistoryF010Repo.save(objHistory);

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

						logbookSpunlacePlanningF010Repository.save(object);

						objHistory = logbookSpunlacePlanningHistoryF010Repo.fetchLastSubmittedRecord(object.getDate());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						logbookSpunlacePlanningHistoryF010Repo.save(objHistory);

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
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}
	
	
	
		// CR - SIGN-OFF
	
		// DELETE LOGBOOK ENTRY

		@Transactional
		public ResponseEntity<?> deleteLogbookLine(Long id) {

			DailyProdPlanF010 productionDetailsLine = new DailyProdPlanF010();

			try {

				productionDetailsLine = dailyProductionPlanRepository.findFormById(id);

				if (productionDetailsLine != null) {
					dailyProductionPlanRepository.deleteLogbookLineById(id);
				} else {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST)
							.body(new ApiResponse(false, " data not found !!!"));
				}

			} catch (Exception ex) {
				String msg = ex.getMessage();

				log.error(" *** !!! Unable to delete logbook Line summary !!!*** " + msg);

				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body(new ApiResponse(false, "Failed to delete Logbook Line summary !!!" + msg));
			}

			return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Logbook Line Deleted "));
		}
	
	

	public ResponseEntity<?> getByDateF010(String date) {
		try {

			LogbookSpunlacePlanningF010 list = logbookSpunlacePlanningF010Repository.findByDate(date);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getByDatePrintApiF010(String date) {
		try {

			LogbookSpunlacePlanningF010 list = logbookSpunlacePlanningF010Repository.findByDatePrintApi(date);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getLogbookSummaryF010(HttpServletRequest http) {

		List<LogbookSpunlacePlanningF010> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_SUPERVISOR")) {

				details = logbookSpunlacePlanningF010Repository.supervisorSummary();
			}

			else if (userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {

				details = logbookSpunlacePlanningF010Repository.hodSummary();
			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

//	========================================== PH-PRD02/F-009 ==================================================

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SaveSpunlaceGsmAnalysisReport(SpunlaceGsmAnalysisReportF009 details,
			HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		SpunlaceGsmAnalysisReportF009 listObj = null;
		try {

			String value = "";

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRefSopNo() == null)
				value = "SopNumber";
			if (details.getRevisionNo() == null)
				value = "revisionNo";
			if (details.getFormatName() == null)
				value = "formatName";
			if (details.getUnit() == null)
				value = "unit";
			if (details.getDate() == null)
				value = "date";
			if (details.getOrderNo() == null)
				value = "OrderNo";
			if (details.getShift() == null)
				value = "Shift";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getReportId() != null) {

				listObj = spunlaceGsmAnalysisReportF009Repository.findFormById(details.getReportId());

				String[] IgnoreProps = { "reportId", "detailId", "createdBy", "createdAt", "supervisor_status",
						"hod_status", "supervisor_submit_by", "hod_submit_by", "supervisor_submit_on", "hod_submit_on",
						"supervisor_submit_id", "hod_submit_id", "supervisor_save_by", "hod_save_by",
						"supervisor_save_on", "hod_save_on", "supervisor_save_id", "hod_save_id", "supervisor_sign",
						"hod_sign", "hod_mail_status", "supervisor_signature_image", "hod_signature_image" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

				if (role.equals("ROLE_SUPERVISOR")) {

					if (listObj.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)) {
						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
								HttpStatus.BAD_REQUEST);
					}

//					spunlaceGsmAnalysisReportF009Repository.save(listObj);
//
//					List<GsmMoistureDetailsF009> list = details.getReportDetails();
//
//					for (GsmMoistureDetailsF009 detail : list) {
//
//						if (detail.getDetailId() != null) {
//							GsmMoistureDetailsF009 obj = gsmMoistureDetailsF009Repository
//									.findFormById(detail.getDetailId());
//							detail.setCreatedAt(obj.getCreatedAt());
//							detail.setCreatedBy(obj.getCreatedBy());
//							gsmMoistureDetailsF009Repository.save(detail);
//						}
//
//						detail.setReportId(listObj.getReportId());
//						gsmMoistureDetailsF009Repository.save(detail);
//					}
//
//					listObj.setReportDetails(list);

					listObj.setSupervisor_save_by(userName);
					listObj.setSupervisor_save_on(date);
					listObj.setSupervisor_save_id(userId);
					listObj.setSupervisor_status(AppConstants.supervisorSave);
//					listObj.setsupervisor_mail_status(AppConstants.waitingStatus);

					spunlaceGsmAnalysisReportF009Repository.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (role.equals("ROLE_SUPERVISOR")) {

					listObj = details;

//					spunlaceGsmAnalysisReportF009Repository.save(listObj);
//
//					List<GsmMoistureDetailsF009> list = details.getReportDetails();
//
//					for (GsmMoistureDetailsF009 detail : list) {
//						detail.setReportId(listObj.getReportId());
//						gsmMoistureDetailsF009Repository.save(detail);
//					}
//
//					listObj.setReportDetails(list);

					listObj.setSupervisor_save_by(userName);
					listObj.setSupervisor_save_on(date);
					listObj.setSupervisor_save_id(userId);
					listObj.setSupervisor_status(AppConstants.supervisorSave);
//					listObj.setsupervisor_mail_status(AppConstants.waitingStatus);

					spunlaceGsmAnalysisReportF009Repository.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}
//		return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SubmitSpunlaceGsmAnalysisReport(SpunlaceGsmAnalysisReportF009 details,
			HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getReportId();

		SpunlaceGsmAnalysisReportF009 checkObj = new SpunlaceGsmAnalysisReportF009();

		try {
			String value = "";

		

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRefSopNo() == null)
				value = "SopNumber";
			if (details.getRevisionNo() == null)
				value = "revisionNo";
			if (details.getFormatName() == null)
				value = "formatName";
			if (details.getUnit() == null)
				value = "unit";
			if (details.getDate() == null)
				value = "date";
			if (details.getOrderNo() == null)
				value = "OrderNo";
			if (details.getShift() == null)
				value = "Shift";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = spunlaceGsmAnalysisReportF009Repository.findFormById(id);

				String[] IgnoreProps = { "reportId", "detailId", "createdBy", "createdAt", "supervisor_status",
						"hod_status", "supervisor_submit_by", "hod_submit_by", "supervisor_submit_on", "hod_submit_on",
						"supervisor_submit_id", "hod_submit_id", "supervisor_save_by", "hod_save_by",
						"supervisor_save_on", "hod_save_on", "supervisor_save_id", "hod_save_id", "supervisor_sign",
						"hod_sign", "hod_mail_status", "supervisor_signature_image", "hod_signature_image" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (!checkObj.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)
						|| checkObj.getHod_status().equals(AppConstants.hodRejectedStatus)) {
					if (role.equals("ROLE_SUPERVISOR")) {

//						spunlaceGsmAnalysisReportF009Repository.save(checkObj);

//						List<GsmMoistureDetailsF009> list = details.getReportDetails();
//
//						for (GsmMoistureDetailsF009 detail : list) {
//
//							if (detail.getDetailId() != null) {
//								GsmMoistureDetailsF009 obj = gsmMoistureDetailsF009Repository
//										.findFormById(detail.getDetailId());
//								detail.setCreatedAt(obj.getCreatedAt());
//								detail.setCreatedBy(obj.getCreatedBy());
//								gsmMoistureDetailsF009Repository.save(detail);
//							}
//
//							detail.setReportId(checkObj.getReportId());
//							gsmMoistureDetailsF009Repository.save(detail);
//						}
//
//						checkObj.setReportDetails(list);

						checkObj.setSupervisor_submit_by(userName);
						checkObj.setSupervisor_submit_on(date);
						checkObj.setSupervisor_submit_id(userId);
						checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						checkObj.setSupervisor_sign(userName);

						checkObj.setHod_status(AppConstants.waitingStatus);
						checkObj.setHod_mail_status(AppConstants.waitingStatus);

						spunlaceGsmAnalysisReportF009Repository.save(checkObj);

						// IMAGE

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);

						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

						checkObj.setSupervisor_signature_image(signature);

						spunlaceGsmAnalysisReportF009Repository.save(checkObj);

						// AUDIT

						SpunlaceGsmAnalysisReportHistoryF009 rejectionReportHistory = new SpunlaceGsmAnalysisReportHistoryF009();

						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						String date1 = rejectionReportHistory.getDate();

						String shiftO = rejectionReportHistory.getShift();

						String order1 = rejectionReportHistory.getOrderNo();

						int version = spunlaceGsmAnalysisReportHistoryF009Repo.getMaximumVersion(date1, shiftO, order1)
								.map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						spunlaceGsmAnalysisReportHistoryF009Repo.save(rejectionReportHistory);

//                           MAIL SENDING - NEED TO IMPLEMENT

						try {

							spunlacemailfunction.sendEmailToHodF009(checkObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, " Invalid Status."), HttpStatus.BAD_REQUEST);
				}
			} else {

				if (!role.equals("ROLE_SUPERVISOR")) {
					return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = details;

//				spunlaceGsmAnalysisReportF009Repository.save(checkObj);
//
//				List<GsmMoistureDetailsF009> list = details.getReportDetails();
//
//				for (GsmMoistureDetailsF009 detail : list) {
//					detail.setReportId(checkObj.getReportId());
//					gsmMoistureDetailsF009Repository.save(detail);
//				}
//
//				checkObj.setReportDetails(list);

				checkObj.setSupervisor_submit_by(userName);
				checkObj.setSupervisor_submit_on(date);
				checkObj.setSupervisor_submit_id(userId);
				checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
				checkObj.setSupervisor_sign(userName);

				checkObj.setHod_status(AppConstants.waitingStatus);
				checkObj.setHod_mail_status(AppConstants.waitingStatus);

				spunlaceGsmAnalysisReportF009Repository.save(checkObj);

				// IMAGE

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				checkObj.setSupervisor_signature_image(signature);

				spunlaceGsmAnalysisReportF009Repository.save(checkObj);

				// AUDIT

				SpunlaceGsmAnalysisReportHistoryF009 rejectionReportHistory = new SpunlaceGsmAnalysisReportHistoryF009();

				BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				String date1 = rejectionReportHistory.getDate();

				String shiftO = rejectionReportHistory.getShift();

				String order1 = rejectionReportHistory.getOrderNo();

				int version = spunlaceGsmAnalysisReportHistoryF009Repo.getMaximumVersion(date1, shiftO, order1)
						.map(temp -> temp + 1).orElse(1);

				rejectionReportHistory.setVersion(version);

				spunlaceGsmAnalysisReportHistoryF009Repo.save(rejectionReportHistory);

				// MAIL SENDING - NEED TO IMPLEMENT

				try {

					spunlacemailfunction.sendEmailToHodF009(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
							HttpStatus.OK);
				}

			}
		} catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);

//		return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	public ResponseEntity<?> approveRejectionF009(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		SpunlaceGsmAnalysisReportF009 object = new SpunlaceGsmAnalysisReportF009();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = spunlaceGsmAnalysisReportF009Repository.findFormById(approvalResponse.getId());

			SpunlaceGsmAnalysisReportHistoryF009 objHistory = new SpunlaceGsmAnalysisReportHistoryF009();

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

						spunlaceGsmAnalysisReportF009Repository.save(object);

						objHistory = spunlaceGsmAnalysisReportHistoryF009Repo.fetchLastSubmittedRecord(object.getDate(),
								object.getShift(), object.getOrderNo());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						spunlaceGsmAnalysisReportHistoryF009Repo.save(objHistory);

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

						spunlaceGsmAnalysisReportF009Repository.save(object);

						objHistory = spunlaceGsmAnalysisReportHistoryF009Repo.fetchLastSubmittedRecord(object.getDate(),
								object.getShift(), object.getOrderNo());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						spunlaceGsmAnalysisReportHistoryF009Repo.save(objHistory);

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
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	public ResponseEntity<?> getByDateShiftOrderNoF009(String date, String shift, String orderNo) {
		try {

			SpunlaceGsmAnalysisReportF009 list = spunlaceGsmAnalysisReportF009Repository.findByDateShiftOrderNo(date,
					shift, orderNo);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getByDateShiftOrderNoPrintApiF009(String date, String shift, String orderNo) {
		try {

			SpunlaceGsmAnalysisReportF009 list = spunlaceGsmAnalysisReportF009Repository
					.findByDateShiftOrderNoPrintApi(date, shift, orderNo);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getGsmAnalysisSummaryF009(HttpServletRequest http) {

		List<SpunlaceGsmAnalysisReportF009> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_SUPERVISOR")) {

				details = spunlaceGsmAnalysisReportF009Repository.supervisorSummary();
			}

			else if (userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {

				details = spunlaceGsmAnalysisReportF009Repository.hodSummary();
			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

//	========================================== PH-PRD02/F-016 ==================================================

	public ResponseEntity<?> SaveProcessSetupVerificationSliterWinder(ProcessSetupVerificationSliterWinderF016 details,
			HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		ProcessSetupVerificationSliterWinderF016 listObj = null;
		try {

			String value = "";

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRefSopNo() == null)
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
			if (details.getOrderNo() == null)
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

			if (details.getProcessId() != null) {

				listObj = processSetupVerificationSliterWinderF016Repository.findFormById(details.getProcessId());

				String[] IgnoreProps = { "processId", "createdBy", "createdAt", "operator_status", "operator_save_by",
						"operator_save_on", "operator_save_id", "operator_submitted_by", "operator_submitted_on",
						"operator_submitted_id", "operator_sign", "supervisor_status", "supervisor_save_on",
						"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign", "supervisior_mail_status", "hod_status",
						"hod_save_on", "hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id",
						"hod_sign", "hod_mail_status", "operator_signature_image", "supervisor_signature_image",
						"hod_signature_image" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

				if (role.equals("ROLE_OPERATOR")) {

					if (listObj.getOperator_status().equals(AppConstants.operatorApprove)) {
						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
								HttpStatus.BAD_REQUEST);
					}

					listObj.setOperator_save_by(userName);
					listObj.setOperator_save_on(date);
					listObj.setOperator_save_id(userId);
					listObj.setOperator_status(AppConstants.operatorSave);

					processSetupVerificationSliterWinderF016Repository.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (role.equals("ROLE_OPERATOR")) {

					listObj = details;

					listObj.setOperator_save_by(userName);
					listObj.setOperator_save_on(date);
					listObj.setOperator_save_id(userId);
					listObj.setOperator_status(AppConstants.operatorSave);

					processSetupVerificationSliterWinderF016Repository.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, "No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}
//		return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	public ResponseEntity<?> SubmitProcessSetupVerificationSliterWinder(
			ProcessSetupVerificationSliterWinderF016 details, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getProcessId();

		ProcessSetupVerificationSliterWinderF016 checkObj = new ProcessSetupVerificationSliterWinderF016();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRefSopNo() == null)
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
			if (details.getOrderNo() == null)
				value = "OrderNo";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = processSetupVerificationSliterWinderF016Repository.findFormById(id);

				String[] IgnoreProps = { "processId", "createdBy", "createdAt", "operator_status", "operator_save_by",
						"operator_save_on", "operator_save_id", "operator_submitted_by", "operator_submitted_on",
						"operator_submitted_id", "operator_sign", "supervisor_status", "supervisor_save_on",
						"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign", "supervisior_mail_status", "hod_status",
						"hod_save_on", "hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id",
						"hod_sign", "hod_mail_status", "operator_signature_image", "supervisor_signature_image",
						"hod_signature_image" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (!checkObj.getOperator_status().equals(AppConstants.operatorApprove)
						|| checkObj.getSupervisor_status().equals(AppConstants.supervisorRejectedStatus)
						|| checkObj.getHod_status().equals(AppConstants.hodRejectedStatus)) {
					if (role.equals("ROLE_OPERATOR")) {

						checkObj.setOperator_submitted_by(userName);
						checkObj.setOperator_submitted_on(date);
						checkObj.setOperator_submitted_id(userId);
						checkObj.setOperator_status(AppConstants.operatorApprove);
						checkObj.setOperator_sign(userName);

						checkObj.setSupervisor_status(AppConstants.waitingStatus);
						checkObj.setSupervisior_mail_status(AppConstants.waitingStatus);

//						checkObj.setHod_status(AppConstants.waitingStatus);
//						checkObj.setHod_mail_status(AppConstants.waitingStatus);

						checkObj.setHod_status("");
						checkObj.setHod_mail_status("");

						processSetupVerificationSliterWinderF016Repository.save(checkObj);

						// IMAGE

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);

						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

						checkObj.setOperator_signature_image(signature);

						processSetupVerificationSliterWinderF016Repository.save(checkObj);

						ProcessSetupVerificationSliterWinderHistoryF016 rejectionReportHistory = new ProcessSetupVerificationSliterWinderHistoryF016();

						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						String date1 = rejectionReportHistory.getDate();

						String shift1 = rejectionReportHistory.getShift();

						String order1 = rejectionReportHistory.getOrderNo();

						int version = processSetupVerificationSliterWinderHistoryF016Repo
								.getMaximumVersion(date1, shift1, order1).map(temp -> temp + 1).orElse(1);
						;

						rejectionReportHistory.setVersion(version);

						processSetupVerificationSliterWinderHistoryF016Repo.save(rejectionReportHistory);

						// MAIL SENDING - NEED TO IMPLEMENT
						try {

							spunlacemailfunction.sendEmailToSupervisorF016(checkObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, role + "can not submit Details"),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, " Invalid Status."), HttpStatus.BAD_REQUEST);
				}
			} else {

				if (!role.equals("ROLE_OPERATOR")) {
					return new ResponseEntity(new ApiResponse(false, role + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = details;

				checkObj.setOperator_submitted_by(userName);
				checkObj.setOperator_submitted_on(date);
				checkObj.setOperator_submitted_id(userId);
				checkObj.setOperator_status(AppConstants.operatorApprove);
				checkObj.setOperator_sign(userName);

				checkObj.setSupervisor_status(AppConstants.waitingStatus);
				checkObj.setSupervisior_mail_status(AppConstants.waitingStatus);

//				checkObj.setHod_status(AppConstants.waitingStatus);
//				checkObj.setHod_mail_status(AppConstants.waitingStatus);

				checkObj.setHod_status("");
				checkObj.setHod_mail_status("");

				processSetupVerificationSliterWinderF016Repository.save(checkObj);

				// IMAGE

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				checkObj.setOperator_signature_image(signature);

				processSetupVerificationSliterWinderF016Repository.save(checkObj);

				ProcessSetupVerificationSliterWinderHistoryF016 rejectionReportHistory = new ProcessSetupVerificationSliterWinderHistoryF016();

				BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				String date1 = rejectionReportHistory.getDate();

				String shift1 = rejectionReportHistory.getShift();

				String order1 = rejectionReportHistory.getOrderNo();

				int version = processSetupVerificationSliterWinderHistoryF016Repo
						.getMaximumVersion(date1, shift1, order1).map(temp -> temp + 1).orElse(1);
				;

				rejectionReportHistory.setVersion(version);

				processSetupVerificationSliterWinderHistoryF016Repo.save(rejectionReportHistory);

//				MAIL SENDING - NEED TO IMPLEMENT
				try {

					spunlacemailfunction.sendEmailToSupervisorF016(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
							HttpStatus.OK);
				}
			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);

//		return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	public ResponseEntity<?> approveRejectionF016(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		ProcessSetupVerificationSliterWinderF016 object = new ProcessSetupVerificationSliterWinderF016();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = processSetupVerificationSliterWinderF016Repository.findFormById(approvalResponse.getId());

			ProcessSetupVerificationSliterWinderHistoryF016 objHistory = new ProcessSetupVerificationSliterWinderHistoryF016();

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

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						processSetupVerificationSliterWinderF016Repository.save(object);

						objHistory = processSetupVerificationSliterWinderHistoryF016Repo
								.fetchLastSubmittedRecord(object.getDate(), object.getShift(), object.getOrderNo());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						processSetupVerificationSliterWinderHistoryF016Repo.save(objHistory);

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

						processSetupVerificationSliterWinderF016Repository.save(object);

						objHistory = processSetupVerificationSliterWinderHistoryF016Repo
								.fetchLastSubmittedRecord(object.getDate(), object.getShift(), object.getOrderNo());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						processSetupVerificationSliterWinderHistoryF016Repo.save(objHistory);

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

						processSetupVerificationSliterWinderF016Repository.save(object);

						objHistory = processSetupVerificationSliterWinderHistoryF016Repo
								.fetchLastSubmittedRecord(object.getDate(), object.getShift(), object.getOrderNo());

						objHistory.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						objHistory.setSupervisor_submit_on(date);
						objHistory.setSupervisor_submit_by(userName);
						objHistory.setSupervisor_submit_id(userId);
						objHistory.setSupervisor_sign(userName);

						objHistory.setHod_status(AppConstants.waitingStatus);

						processSetupVerificationSliterWinderHistoryF016Repo.save(objHistory);

						try {

							spunlacemailfunction.sendEmailToHodF016(object);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
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

						processSetupVerificationSliterWinderF016Repository.save(object);

						objHistory = processSetupVerificationSliterWinderHistoryF016Repo
								.fetchLastSubmittedRecord(object.getDate(), object.getShift(), object.getOrderNo());

//						bleachLayDownCheckListF42History = dailyRejectionReportF007RepositoryHistory
//								.fetchLastSubmittedRecord(bleachContRawCottonF05.getDate(),
//										bleachContRawCottonF05.getShift(), bleachContRawCottonF05.getOrderNo());

						objHistory.setReason(reason);
						objHistory.setSupervisor_status(AppConstants.supervisorRejectedStatus);
						objHistory.setSupervisor_submit_on(date);
						objHistory.setSupervisor_submit_by(userName);
						objHistory.setSupervisor_submit_id(userId);
						objHistory.setSupervisor_sign(userName);

						processSetupVerificationSliterWinderHistoryF016Repo.save(objHistory);

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
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	public ResponseEntity<?> getByDateShiftOrderNoF016(String date, String shift, String orderNo) {
		try {

			ProcessSetupVerificationSliterWinderF016 list = processSetupVerificationSliterWinderF016Repository
					.findByDateShiftOrderNo(date, shift, orderNo);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getByDateShiftOrderNoPrintApiF016(String date, String shift, String orderNo) {
		try {

			ProcessSetupVerificationSliterWinderF016 list = processSetupVerificationSliterWinderF016Repository
					.findByDateShiftOrderNoPrintApi(date, shift, orderNo);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getSliterWinderSummaryF016(HttpServletRequest http) {

		List<ProcessSetupVerificationSliterWinderF016> details = new ArrayList<>();
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_OPERATOR")) {

				details = processSetupVerificationSliterWinderF016Repository.operatorSummary();

			} else if (userRole.equals("ROLE_SUPERVISOR") || userRole.equals("ROLE_HOD")
					|| userRole.equals("ROLE_DESIGNEE")) {

				details = processSetupVerificationSliterWinderF016Repository.supervisorSummary();
			}

//			else if (userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {
//
//				details = processSetupVerificationSliterWinderF016Repository.hodSummary();
//			}
			else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

//	========================================== PH-PRD02/F-013 ==================================================

	public ResponseEntity<?> SaveProcessSetupVerificationBalePress(ProcessSetupVerificationRpBalePressF013 details,
			HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		ProcessSetupVerificationRpBalePressF013 formDetails = null;
		try {

			String value = "";

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRefSopNo() == null)
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
			if (details.getOrderNo() == null)
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

			if (details.getProcessId() != null) {

				formDetails = processSetupVerificationRpBalePressF013Repository.findFormById(details.getProcessId());

				String[] IgnoreProps = { "processId", "createdBy", "createdAt", "operator_status", "operator_save_by",
						"operator_save_on", "operator_save_id", "operator_submitted_by", "operator_submitted_on",
						"operator_submitted_id", "operator_sign", "supervisor_status", "supervisor_save_on",
						"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign", "supervisior_mail_status", "hod_status",
						"hod_save_on", "hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id",
						"hod_sign", "hod_mail_status", "operator_signature_image", "supervisor_signature_image",
						"hod_signature_image" };

				BeanUtils.copyProperties(details, formDetails, IgnoreProps);

				if (role.equals("ROLE_OPERATOR")) {

					if (formDetails.getOperator_status().equals(AppConstants.operatorApprove)) {
						return new ResponseEntity(new ApiResponse(false, "No access to save details"),
								HttpStatus.BAD_REQUEST);
					}

					formDetails.setOperator_save_by(userName);
					formDetails.setOperator_save_on(date);
					formDetails.setOperator_save_id(userId);
					formDetails.setOperator_status(AppConstants.operatorSave);

					processSetupVerificationRpBalePressF013Repository.save(formDetails);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (role.equals("ROLE_OPERATOR")) {

					formDetails = details;

					formDetails.setOperator_save_by(userName);
					formDetails.setOperator_save_on(date);
					formDetails.setOperator_save_id(userId);
					formDetails.setOperator_status(AppConstants.operatorSave);

					processSetupVerificationRpBalePressF013Repository.save(formDetails);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}
//		return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(formDetails, HttpStatus.CREATED);
	}

	public ResponseEntity<?> SubmitProcessSetupVerificationBalePress(ProcessSetupVerificationRpBalePressF013 details,
			HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getProcessId();

		ProcessSetupVerificationRpBalePressF013 formDetails = new ProcessSetupVerificationRpBalePressF013();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRefSopNo() == null)
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
			if (details.getOrderNo() == null)
				value = "OrderNo";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				formDetails = processSetupVerificationRpBalePressF013Repository.findFormById(id);

				String[] IgnoreProps = { "processId", "createdBy", "createdAt", "operator_status", "operator_save_by",
						"operator_save_on", "operator_save_id", "operator_submitted_by", "operator_submitted_on",
						"operator_submitted_id", "operator_sign", "supervisor_status", "supervisor_save_on",
						"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign", "supervisior_mail_status", "hod_status",
						"hod_save_on", "hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id",
						"hod_sign", "hod_mail_status", "operator_signature_image", "supervisor_signature_image",
						"hod_signature_image" };

				BeanUtils.copyProperties(details, formDetails, IgnoreProps);

				if (!formDetails.getOperator_status().equals(AppConstants.operatorApprove)
						|| formDetails.getSupervisor_status().equals(AppConstants.supervisorRejectedStatus)
						|| formDetails.getHod_status().equals(AppConstants.hodRejectedStatus)) {
					if (role.equals("ROLE_OPERATOR")) {

						formDetails.setOperator_submitted_by(userName);
						formDetails.setOperator_submitted_on(date);
						formDetails.setOperator_submitted_id(userId);
						formDetails.setOperator_status(AppConstants.operatorApprove);
						formDetails.setOperator_sign(userName);

						formDetails.setSupervisor_status(AppConstants.waitingStatus);
						formDetails.setSupervisior_mail_status(AppConstants.waitingStatus);

//						formDetails.setHod_status(AppConstants.waitingStatus);
//						formDetails.setHod_mail_status(AppConstants.waitingStatus);

						formDetails.setHod_status("");
						formDetails.setHod_mail_status("");

						processSetupVerificationRpBalePressF013Repository.save(formDetails);

						// IMAGE

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);

						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

						formDetails.setOperator_signature_image(signature);

						processSetupVerificationRpBalePressF013Repository.save(formDetails);

						ProcessSetupVerificationRpBalePressHistoryF013 rejectionReportHistory = new ProcessSetupVerificationRpBalePressHistoryF013();

						BeanUtils.copyProperties(formDetails, rejectionReportHistory);

						String date1 = rejectionReportHistory.getDate();

						String shift1 = rejectionReportHistory.getShift();

						String order1 = rejectionReportHistory.getOrderNo();

						int version = processSetupVerificationRpBalePressHistoryF013Repo
								.getMaximumVersion(date1, shift1, order1).map(temp -> temp + 1).orElse(1);
						

						rejectionReportHistory.setVersion(version);

						processSetupVerificationRpBalePressHistoryF013Repo.save(rejectionReportHistory);

						// MAIL SENDING - NEED TO IMPLEMENT

						try {

							spunlacemailfunction.sendEmailToSupervisorF013(formDetails);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, " Invalid Status."), HttpStatus.BAD_REQUEST);
				}

			} else {

				if (!role.equals("ROLE_OPERATOR")) {
					return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
							HttpStatus.BAD_REQUEST);
				}
				formDetails = details;

				formDetails.setOperator_submitted_by(userName);
				formDetails.setOperator_submitted_on(date);
				formDetails.setOperator_submitted_id(userId);
				formDetails.setOperator_status(AppConstants.operatorApprove);
				formDetails.setOperator_sign(userName);

				formDetails.setSupervisor_status(AppConstants.waitingStatus);
				formDetails.setSupervisior_mail_status(AppConstants.waitingStatus);

//				formDetails.setHod_status(AppConstants.waitingStatus);
//				formDetails.setHod_mail_status(AppConstants.waitingStatus);

				formDetails.setHod_status("");
				formDetails.setHod_mail_status("");

				processSetupVerificationRpBalePressF013Repository.save(formDetails);

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				formDetails.setOperator_signature_image(signature);

				processSetupVerificationRpBalePressF013Repository.save(formDetails);

				ProcessSetupVerificationRpBalePressHistoryF013 rejectionReportHistory = new ProcessSetupVerificationRpBalePressHistoryF013();

				BeanUtils.copyProperties(formDetails, rejectionReportHistory);

				String date1 = rejectionReportHistory.getDate();

				String shift1 = rejectionReportHistory.getShift();

				String order1 = rejectionReportHistory.getOrderNo();

				int version = processSetupVerificationRpBalePressHistoryF013Repo
						.getMaximumVersion(date1, shift1, order1).map(temp -> temp + 1).orElse(1);
				;

				rejectionReportHistory.setVersion(version);

				processSetupVerificationRpBalePressHistoryF013Repo.save(rejectionReportHistory);

//				MAIL SENDING - NEED TO IMPLEMENT

				try {

					spunlacemailfunction.sendEmailToSupervisorF013(formDetails);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
							HttpStatus.OK);
				}
			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);

//		return new ResponseEntity(formDetails, HttpStatus.CREATED);

	}

	public ResponseEntity<?> approveRejectionF013(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		ProcessSetupVerificationRpBalePressF013 object = new ProcessSetupVerificationRpBalePressF013();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = processSetupVerificationRpBalePressF013Repository.findFormById(approvalResponse.getId());

			ProcessSetupVerificationRpBalePressHistoryF013 objHistory = new ProcessSetupVerificationRpBalePressHistoryF013();

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

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						processSetupVerificationRpBalePressF013Repository.save(object);

						objHistory = processSetupVerificationRpBalePressHistoryF013Repo
								.fetchLastSubmittedRecord(object.getDate(), object.getShift(), object.getOrderNo());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						processSetupVerificationRpBalePressHistoryF013Repo.save(objHistory);

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

						processSetupVerificationRpBalePressF013Repository.save(object);

						objHistory = processSetupVerificationRpBalePressHistoryF013Repo
								.fetchLastSubmittedRecord(object.getDate(), object.getShift(), object.getOrderNo());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						processSetupVerificationRpBalePressHistoryF013Repo.save(objHistory);

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

						processSetupVerificationRpBalePressF013Repository.save(object);

						objHistory = processSetupVerificationRpBalePressHistoryF013Repo
								.fetchLastSubmittedRecord(object.getDate(), object.getShift(), object.getOrderNo());

						objHistory.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						objHistory.setSupervisor_submit_on(date);
						objHistory.setSupervisor_submit_by(userName);
						objHistory.setSupervisor_submit_id(userId);
						objHistory.setSupervisor_sign(userName);
						objHistory.setHod_status(AppConstants.waitingStatus);
						

						processSetupVerificationRpBalePressHistoryF013Repo.save(objHistory);

						try {

							spunlacemailfunction.sendEmailToHodF013(object);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
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

						processSetupVerificationRpBalePressF013Repository.save(object);

						objHistory = processSetupVerificationRpBalePressHistoryF013Repo
								.fetchLastSubmittedRecord(object.getDate(), object.getShift(), object.getOrderNo());

//						bleachLayDownCheckListF42History = dailyRejectionReportF007RepositoryHistory
//								.fetchLastSubmittedRecord(bleachContRawCottonF05.getDate(),
//										bleachContRawCottonF05.getShift(), bleachContRawCottonF05.getOrderNo());

						objHistory.setReason(reason);
						objHistory.setSupervisor_status(AppConstants.supervisorRejectedStatus);
						objHistory.setSupervisor_submit_on(date);
						objHistory.setSupervisor_submit_by(userName);
						objHistory.setSupervisor_submit_id(userId);
						objHistory.setSupervisor_sign(userName);

						processSetupVerificationRpBalePressHistoryF013Repo.save(objHistory);

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
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	public ResponseEntity<?> getByDateShiftOrderNoF013(String date, String shift, String orderNo) {
		try {

			ProcessSetupVerificationRpBalePressF013 list = processSetupVerificationRpBalePressF013Repository
					.findByDateShiftOrderNo(date, shift, orderNo);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getByDateShiftOrderNoPrintApiF013(String date, String shift, String orderNo) {
		try {

			ProcessSetupVerificationRpBalePressF013 list = processSetupVerificationRpBalePressF013Repository
					.findByDateShiftOrderNoPrintApi(date, shift, orderNo);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getRpBalePressSummaryF013(HttpServletRequest http) {

		List<ProcessSetupVerificationRpBalePressF013> details = new ArrayList<>();
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_OPERATOR")) {

				details = processSetupVerificationRpBalePressF013Repository.operatorSummary();

			} else if (userRole.equals("ROLE_SUPERVISOR") || userRole.equals("ROLE_HOD")
					|| userRole.equals("ROLE_DESIGNEE")) {

				details = processSetupVerificationRpBalePressF013Repository.supervisorSummary();
			}

//			else if (userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {
//
//				details = processSetupVerificationRpBalePressF013Repository.hodSummary();
//			} 
			else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

//	========================================== PH-PRD02/F-020 ==================================================

	public ResponseEntity<?> SaveMetalDetectorCheckList(MetalDetectorCheckListF020 details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		MetalDetectorCheckListF020 listObj = null;
		try {

			String value = "";

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRefSopNo() == null)
				value = "SopNumber";
			if (details.getRevisionNo() == null)
				value = "revisionNo";
			if (details.getFormatName() == null)
				value = "formatName";
			if (details.getUnit() == null)
				value = "unit";
			if (details.getDate() == null)
				value = "date";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getListId() != null) {

				listObj = metalDetectorCheckListF020Repository.findFormById(details.getListId());

				String[] IgnoreProps = { "listId", "createdBy", "createdAt", "supervisor_status", "supervisor_save_on",
						"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign", "hod_status", "hod_save_on", "hod_save_by",
						"hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign", "hod_mail_status",
						"supervisor_signature_image", "hod_signature_image" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

				if (role.equals("ROLE_SUPERVISOR")) {

					if (listObj.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)) {
						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
								HttpStatus.BAD_REQUEST);
					}

					listObj.setSupervisor_save_by(userName);
					listObj.setSupervisor_save_on(date);
					listObj.setSupervisor_save_id(userId);
					listObj.setSupervisor_status(AppConstants.supervisorSave);

					metalDetectorCheckListF020Repository.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				if (role.equals("ROLE_SUPERVISOR")) {

					listObj = details;

					listObj.setSupervisor_save_by(userName);
					listObj.setSupervisor_save_on(date);
					listObj.setSupervisor_save_id(userId);
					listObj.setSupervisor_status(AppConstants.supervisorSave);
//					listObj.setsupervisor_mail_status(AppConstants.waitingStatus);

					metalDetectorCheckListF020Repository.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}
//		return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	public ResponseEntity<?> SubmitMetalDetectorCheckList(MetalDetectorCheckListF020 details, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getListId();

		MetalDetectorCheckListF020 checkObj = new MetalDetectorCheckListF020();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRefSopNo() == null)
				value = "SopNumber";
			if (details.getRevisionNo() == null)
				value = "revisionNo";
			if (details.getFormatName() == null)
				value = "formatName";
			if (details.getUnit() == null)
				value = "unit";
			if (details.getDate() == null)
				value = "date";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = metalDetectorCheckListF020Repository.findFormById(id);

				String[] IgnoreProps = { "listId", "createdBy", "createdAt", "supervisor_status", "supervisor_save_on",
						"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign", "hod_status", "hod_save_on", "hod_save_by",
						"hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign", "hod_mail_status",
						"supervisor_signature_image", "hod_signature_image" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (!checkObj.getSupervisor_status().equals(AppConstants.supervisorRejectedStatus)
						|| checkObj.getHod_status().equals(AppConstants.hodRejectedStatus)) {
					if (role.equals("ROLE_SUPERVISOR")) {

						checkObj.setSupervisor_submit_by(userName);
						checkObj.setSupervisor_submit_on(date);
						checkObj.setSupervisor_submit_id(userId);
						checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						checkObj.setSupervisor_sign(userName);

						checkObj.setHod_status(AppConstants.waitingStatus);
						checkObj.setHod_mail_status(AppConstants.waitingStatus);

						metalDetectorCheckListF020Repository.save(checkObj);

						// IMAGE

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);

						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

						checkObj.setSupervisor_signature_image(signature);

						metalDetectorCheckListF020Repository.save(checkObj);

						MetalDetectorCheckListHistoryF020 rejectionReportHistory = new MetalDetectorCheckListHistoryF020();

						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						String date1 = rejectionReportHistory.getDate();

						String month = rejectionReportHistory.getMonth();

						String year = rejectionReportHistory.getYear();

						int version = metalDetectorCheckListHistoryF020Repo.getMaximumVersion(date1, month, year)
								.map(temp -> temp + 1).orElse(1);
						;

						rejectionReportHistory.setVersion(version);

						metalDetectorCheckListHistoryF020Repo.save(rejectionReportHistory);

//                    Mail logic

						try {

							spunlacemailfunction.sendEmailToHodF020(checkObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, " Invalid Status."), HttpStatus.BAD_REQUEST);
				}
			} else {

				if (!role.equals("ROLE_SUPERVISOR")) {
					return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = details;

				checkObj.setSupervisor_submit_by(userName);
				checkObj.setSupervisor_submit_on(date);
				checkObj.setSupervisor_submit_id(userId);
				checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
				checkObj.setSupervisor_sign(userName);

				checkObj.setHod_status(AppConstants.waitingStatus);
				checkObj.setHod_mail_status(AppConstants.waitingStatus);

				metalDetectorCheckListF020Repository.save(checkObj);

				// IMAGE

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				checkObj.setSupervisor_signature_image(signature);

				metalDetectorCheckListF020Repository.save(checkObj);

				MetalDetectorCheckListHistoryF020 rejectionReportHistory = new MetalDetectorCheckListHistoryF020();

				BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				String date1 = rejectionReportHistory.getDate();

				String month = rejectionReportHistory.getMonth();

				String year = rejectionReportHistory.getYear();

				int version = metalDetectorCheckListHistoryF020Repo.getMaximumVersion(date1, month, year)
						.map(temp -> temp + 1).orElse(1);
				

				rejectionReportHistory.setVersion(version);

				metalDetectorCheckListHistoryF020Repo.save(rejectionReportHistory);

//				Mail logic

				try {

					spunlacemailfunction.sendEmailToHodF020(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
							HttpStatus.OK);
				}
			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);

//		return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	public ResponseEntity<?> approveRejectionF020(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		MetalDetectorCheckListF020 object = new MetalDetectorCheckListF020();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = metalDetectorCheckListF020Repository.findFormById(approvalResponse.getId());

			MetalDetectorCheckListHistoryF020 objHistory = new MetalDetectorCheckListHistoryF020();

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

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						metalDetectorCheckListF020Repository.save(object);

						objHistory = metalDetectorCheckListHistoryF020Repo.fetchLastSubmittedRecord(object.getDate(),
								object.getMonth(), object.getYear());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						metalDetectorCheckListHistoryF020Repo.save(objHistory);

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

						metalDetectorCheckListF020Repository.save(object);

						objHistory = metalDetectorCheckListHistoryF020Repo.fetchLastSubmittedRecord(object.getDate(),
								object.getMonth(), object.getYear());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						metalDetectorCheckListHistoryF020Repo.save(objHistory);

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
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	public ResponseEntity<?> getByDateF020(String date) {
		try {

			MetalDetectorCheckListF020 list = metalDetectorCheckListF020Repository.findByDate(date);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> findByMonthYearPrintApiF020(String month, String year) {
		try {

			List<MetalDetectorCheckListF020> list = metalDetectorCheckListF020Repository.findByMonthYearPrintApi(month,
					year);

			if (list == null || list.isEmpty()) {

//				list = new ArrayList<MetalDetectorCheckListF020>();
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getMetalDetectorSummary(HttpServletRequest http) {

		List<MetalDetectorCheckListF020> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_SUPERVISOR")) {

				details = metalDetectorCheckListF020Repository.supervisorSummary();
			}

			else if (userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {

				details = metalDetectorCheckListF020Repository.hodSummary();
			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

//	========================================== PH-PRD02/F-019 ==================================================

	public ResponseEntity<?> SaveShiftWiseWasteReport(ShiftWiseWasteReportSpunlaceF019 details,
			HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		ShiftWiseWasteReportSpunlaceF019 listObj = null;
		try {

			String value = "";

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRefSopNo() == null)
				value = "SopNumber";
			if (details.getRevisionNo() == null)
				value = "revisionNo";
			if (details.getFormatName() == null)
				value = "formatName";
			if (details.getUnit() == null)
				value = "unit";
			if (details.getDate() == null)
				value = "date";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getReportId() != null) {

				listObj = shiftWiseWasteReportSpunlaceF019Repository.findFormById(details.getReportId());

				String[] IgnoreProps = { "reportId", "createdBy", "createdAt", "supervisor_status",
						"supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
						"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "hod_status", "hod_save_on",
						"hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign",
						"hod_mail_status", "reportDetails", "supervisor_signature_image", "hod_signature_image" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

				if (role.equals("ROLE_SUPERVISOR")) {

					if (listObj.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)) {
						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
								HttpStatus.BAD_REQUEST);
					}

					shiftWiseWasteReportSpunlaceF019Repository.save(listObj);

					List<ShiftWiseWasteReportDetailsF019> list = details.getReportDetails();

					for (ShiftWiseWasteReportDetailsF019 detail : list) {

						if (detail.getDetailId() != null) {
							ShiftWiseWasteReportDetailsF019 obj = shiftWiseWasteReportDetailsF019Repository
									.findFormById(detail.getDetailId());
							detail.setCreatedAt(obj.getCreatedAt());
							detail.setCreatedBy(obj.getCreatedBy());
							shiftWiseWasteReportDetailsF019Repository.save(detail);
						}

						detail.setReportId(listObj.getReportId());
						shiftWiseWasteReportDetailsF019Repository.save(detail);
					}

					listObj.setReportDetails(list);

					listObj.setSupervisor_save_by(userName);
					listObj.setSupervisor_save_on(date);
					listObj.setSupervisor_save_id(userId);
					listObj.setSupervisor_status(AppConstants.supervisorSave);

					shiftWiseWasteReportSpunlaceF019Repository.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (role.equals("ROLE_SUPERVISOR")) {

					listObj = details;

					shiftWiseWasteReportSpunlaceF019Repository.save(listObj);

					List<ShiftWiseWasteReportDetailsF019> list = details.getReportDetails();

					for (ShiftWiseWasteReportDetailsF019 detail : list) {

						if (detail.getDetailId() != null) {
							ShiftWiseWasteReportDetailsF019 obj = shiftWiseWasteReportDetailsF019Repository
									.findFormById(detail.getDetailId());
							detail.setCreatedAt(obj.getCreatedAt());
							detail.setCreatedBy(obj.getCreatedBy());
							shiftWiseWasteReportDetailsF019Repository.save(detail);
						}

						detail.setReportId(listObj.getReportId());
						shiftWiseWasteReportDetailsF019Repository.save(detail);
					}

					listObj.setReportDetails(list);

					listObj.setSupervisor_save_by(userName);
					listObj.setSupervisor_save_on(date);
					listObj.setSupervisor_save_id(userId);
					listObj.setSupervisor_status(AppConstants.supervisorSave);
//					listObj.setsupervisor_mail_status(AppConstants.waitingStatus);

					shiftWiseWasteReportSpunlaceF019Repository.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}
//		return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	public ResponseEntity<?> SubmitShiftWiseWasteReport(ShiftWiseWasteReportSpunlaceF019 details,
			HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getReportId();

		ShiftWiseWasteReportSpunlaceF019 checkObj = new ShiftWiseWasteReportSpunlaceF019();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRefSopNo() == null)
				value = "SopNumber";
			if (details.getRevisionNo() == null)
				value = "revisionNo";
			if (details.getFormatName() == null)
				value = "formatName";
			if (details.getUnit() == null)
				value = "unit";
			if (details.getDate() == null)
				value = "date";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = shiftWiseWasteReportSpunlaceF019Repository.findFormById(id);

				String[] IgnoreProps = { "reportId", "createdBy", "createdAt", "supervisor_status",
						"supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
						"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "hod_status", "hod_save_on",
						"hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign",
						"hod_mail_status", "reportDetails", "supervisor_signature_image", "hod_signature_image" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (!checkObj.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)
						|| checkObj.getHod_status().equals(AppConstants.hodRejectedStatus)) {
					if (role.equals("ROLE_SUPERVISOR")) {

						shiftWiseWasteReportSpunlaceF019Repository.save(checkObj);

						List<ShiftWiseWasteReportDetailsF019> list = details.getReportDetails();

						for (ShiftWiseWasteReportDetailsF019 detail : list) {

							if (detail.getDetailId() != null) {
								ShiftWiseWasteReportDetailsF019 obj = shiftWiseWasteReportDetailsF019Repository
										.findFormById(detail.getDetailId());
								detail.setCreatedAt(obj.getCreatedAt());
								detail.setCreatedBy(obj.getCreatedBy());
								shiftWiseWasteReportDetailsF019Repository.save(detail);
							}

							detail.setReportId(checkObj.getReportId());
							shiftWiseWasteReportDetailsF019Repository.save(detail);
						}

						checkObj.setReportDetails(list);

						checkObj.setSupervisor_submit_by(userName);
						checkObj.setSupervisor_submit_on(date);
						checkObj.setSupervisor_submit_id(userId);
						checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						checkObj.setSupervisor_sign(userName);

						checkObj.setHod_status(AppConstants.waitingStatus);
						checkObj.setHod_mail_status(AppConstants.waitingStatus);

						shiftWiseWasteReportSpunlaceF019Repository.save(checkObj);

						// IMAGE

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);

						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

						checkObj.setSupervisor_signature_image(signature);

						shiftWiseWasteReportSpunlaceF019Repository.save(checkObj); // ONE TABLE

						ShiftWiseWasteReportSpunlaceHistoryF019 rejectionReportHistory = new ShiftWiseWasteReportSpunlaceHistoryF019();

//						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						// getter setters fields & status

						rejectionReportHistory.setFormatName(checkObj.getFormatName());
						rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
						rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
						rejectionReportHistory.setRefSopNo(checkObj.getRefSopNo());
						rejectionReportHistory.setUnit(checkObj.getUnit());
						rejectionReportHistory.setDate(checkObj.getDate());
						rejectionReportHistory.setShift(checkObj.getShift());
						rejectionReportHistory.setCompactorWasteNoOfBagsSum(checkObj.getCompactorWasteNoOfBagsSum());
						rejectionReportHistory.setCompactorWasteNWtSum(checkObj.getCompactorWasteNWtSum());
						rejectionReportHistory.setSwwsWasteNoOfBagsSum(checkObj.getSwwsWasteNoOfBagsSum());
						rejectionReportHistory.setSwwsWasteNWtSum(checkObj.getSwwsWasteNWtSum());
						rejectionReportHistory.setSwwsWasteTotalWtSum(checkObj.getSwwsWasteTotalWtSum());
						rejectionReportHistory.setExfolatingWasteNoOfBagsSum(checkObj.getExfolatingWasteNoOfBagsSum());
						rejectionReportHistory.setExfolatingWasteNWtSum(checkObj.getExfolatingWasteNWtSum());

						// status
						rejectionReportHistory.setSupervisor_submit_by(checkObj.getSupervisor_submit_by());
						rejectionReportHistory.setSupervisor_submit_id(checkObj.getSupervisor_submit_id());
						rejectionReportHistory.setSupervisor_submit_on(checkObj.getSupervisor_submit_on());
						rejectionReportHistory.setSupervisor_status(checkObj.getSupervisor_status());
						rejectionReportHistory.setSupervisor_sign(checkObj.getSupervisor_sign());
						rejectionReportHistory.setSupervisor_signature_image(checkObj.getSupervisor_signature_image());

						rejectionReportHistory.setHod_status(checkObj.getHod_status());

						// version
						String date1 = rejectionReportHistory.getDate();

						String shift1 = rejectionReportHistory.getShift();

						int version = shiftWiseWasteReportSpunlaceHistoryF019Repo.getMaximumVersion(date1, shift1)
								.map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						shiftWiseWasteReportSpunlaceHistoryF019Repo.save(rejectionReportHistory); // ONE HISTORY

						List<ShiftWiseWasteReportDetailsF019> historyMapList = checkObj.getReportDetails();

						for (ShiftWiseWasteReportDetailsF019 obj : historyMapList) {

							ShiftWiseWasteReportDetailsHistoryF019 objHistory = new ShiftWiseWasteReportDetailsHistoryF019();

							BeanUtils.copyProperties(obj, objHistory);
							objHistory.setReportId(rejectionReportHistory.getReportId());
							shiftWiseWasteReportDetailsHistoryF019Repo.save(objHistory);

						}

//                    Mail logic

						try {

							spunlacemailfunction.sendEmailToHodF019(checkObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, " Invalid Status."), HttpStatus.BAD_REQUEST);
				}
			} else {

				if (!role.equals("ROLE_SUPERVISOR")) {
					return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = details;

				shiftWiseWasteReportSpunlaceF019Repository.save(checkObj);

				List<ShiftWiseWasteReportDetailsF019> list = details.getReportDetails();

				for (ShiftWiseWasteReportDetailsF019 detail : list) {

					if (detail.getDetailId() != null) {
						ShiftWiseWasteReportDetailsF019 obj = shiftWiseWasteReportDetailsF019Repository
								.findFormById(detail.getDetailId());
						detail.setCreatedAt(obj.getCreatedAt());
						detail.setCreatedBy(obj.getCreatedBy());
						shiftWiseWasteReportDetailsF019Repository.save(detail);
					}

					detail.setReportId(checkObj.getReportId());
					shiftWiseWasteReportDetailsF019Repository.save(detail);
				}

				checkObj.setReportDetails(list);

				checkObj.setSupervisor_submit_by(userName);
				checkObj.setSupervisor_submit_on(date);
				checkObj.setSupervisor_submit_id(userId);
				checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
				checkObj.setSupervisor_sign(userName);

				checkObj.setHod_status(AppConstants.waitingStatus);
				checkObj.setHod_mail_status(AppConstants.waitingStatus);

				shiftWiseWasteReportSpunlaceF019Repository.save(checkObj);

				// IMAGE

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				checkObj.setSupervisor_signature_image(signature);

				shiftWiseWasteReportSpunlaceF019Repository.save(checkObj); // ONE TABLE

				ShiftWiseWasteReportSpunlaceHistoryF019 rejectionReportHistory = new ShiftWiseWasteReportSpunlaceHistoryF019();

//				BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				// getter setters fields & status

				rejectionReportHistory.setFormatName(checkObj.getFormatName());
				rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
				rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
				rejectionReportHistory.setRefSopNo(checkObj.getRefSopNo());
				rejectionReportHistory.setUnit(checkObj.getUnit());
				rejectionReportHistory.setDate(checkObj.getDate());
				rejectionReportHistory.setShift(checkObj.getShift());
				rejectionReportHistory.setCompactorWasteNoOfBagsSum(checkObj.getCompactorWasteNoOfBagsSum());
				rejectionReportHistory.setCompactorWasteNWtSum(checkObj.getCompactorWasteNWtSum());
				rejectionReportHistory.setSwwsWasteNoOfBagsSum(checkObj.getSwwsWasteNoOfBagsSum());
				rejectionReportHistory.setSwwsWasteNWtSum(checkObj.getSwwsWasteNWtSum());
				rejectionReportHistory.setSwwsWasteTotalWtSum(checkObj.getSwwsWasteTotalWtSum());
				rejectionReportHistory.setExfolatingWasteNoOfBagsSum(checkObj.getExfolatingWasteNoOfBagsSum());
				rejectionReportHistory.setExfolatingWasteNWtSum(checkObj.getExfolatingWasteNWtSum());

				// status
				rejectionReportHistory.setSupervisor_submit_by(checkObj.getSupervisor_submit_by());
				rejectionReportHistory.setSupervisor_submit_id(checkObj.getSupervisor_submit_id());
				rejectionReportHistory.setSupervisor_submit_on(checkObj.getSupervisor_submit_on());
				rejectionReportHistory.setSupervisor_status(checkObj.getSupervisor_status());
				rejectionReportHistory.setSupervisor_sign(checkObj.getSupervisor_sign());
				rejectionReportHistory.setSupervisor_signature_image(checkObj.getSupervisor_signature_image());

				rejectionReportHistory.setHod_status(checkObj.getHod_status());

				// version
				String date1 = rejectionReportHistory.getDate();

				String shift1 = rejectionReportHistory.getShift();

				int version = shiftWiseWasteReportSpunlaceHistoryF019Repo.getMaximumVersion(date1, shift1)
						.map(temp -> temp + 1).orElse(1);

				rejectionReportHistory.setVersion(version);

				shiftWiseWasteReportSpunlaceHistoryF019Repo.save(rejectionReportHistory); // ONE HISTORY

				List<ShiftWiseWasteReportDetailsF019> historyMapList = checkObj.getReportDetails();

				for (ShiftWiseWasteReportDetailsF019 obj : historyMapList) {

					ShiftWiseWasteReportDetailsHistoryF019 objHistory = new ShiftWiseWasteReportDetailsHistoryF019();

					BeanUtils.copyProperties(obj, objHistory);
					objHistory.setReportId(rejectionReportHistory.getReportId());
					shiftWiseWasteReportDetailsHistoryF019Repo.save(objHistory);

				}

//				Mail logic

				try {

					spunlacemailfunction.sendEmailToHodF019(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
							HttpStatus.OK);
				}

			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);

//		return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	public ResponseEntity<?> approveRejectionF019(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		ShiftWiseWasteReportSpunlaceF019 object = new ShiftWiseWasteReportSpunlaceF019();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = shiftWiseWasteReportSpunlaceF019Repository.findFormById(approvalResponse.getId());

			ShiftWiseWasteReportSpunlaceHistoryF019 objHistory = new ShiftWiseWasteReportSpunlaceHistoryF019();

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

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						shiftWiseWasteReportSpunlaceF019Repository.save(object);

						objHistory = shiftWiseWasteReportSpunlaceHistoryF019Repo
								.fetchLastSubmittedRecord(object.getDate(), object.getShift());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						shiftWiseWasteReportSpunlaceHistoryF019Repo.save(objHistory);

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

						shiftWiseWasteReportSpunlaceF019Repository.save(object);

						objHistory = shiftWiseWasteReportSpunlaceHistoryF019Repo
								.fetchLastSubmittedRecord(object.getDate(), object.getShift());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						shiftWiseWasteReportSpunlaceHistoryF019Repo.save(objHistory);

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
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	public ResponseEntity<?> getByDateShiftF019(String date, String shift) {
		try {

			ShiftWiseWasteReportSpunlaceF019 list = shiftWiseWasteReportSpunlaceF019Repository.findByDateShift(date,
					shift);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getByDateShiftPrintApiF019(String date, String shift) {
		try {

			ShiftWiseWasteReportSpunlaceF019 list = shiftWiseWasteReportSpunlaceF019Repository
					.findByDateShiftPrintApi(date, shift);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getShiftWiseWasteReportSummary(HttpServletRequest http) {

		List<ShiftWiseWasteReportSpunlaceF019> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_SUPERVISOR")) {

				details = shiftWiseWasteReportSpunlaceF019Repository.supervisorSummary();
			}

			else if (userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {

				details = shiftWiseWasteReportSpunlaceF019Repository.hodSummary();
			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

//	========================================== PH-PRD02/F-024 ==================================================

	public ResponseEntity<?> SaveSMSF024(SanitizationOfMachineAndSurfacesF024 details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		SanitizationOfMachineAndSurfacesF024 listObj = null;
		try {

			String value = "";

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRefSopNo() == null)
				value = "SopNumber";
			if (details.getRevisionNo() == null)
				value = "revisionNo";
			if (details.getFormatName() == null)
				value = "formatName";
			if (details.getUnit() == null)
				value = "unit";
			if (details.getMonth() == null)
				value = "month";
			if (details.getYear() == null)
				value = "year";
			if (details.getWeek() == null)
				value = "week";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getSmsId() != null) {

				listObj = sanitizationOfMachineAndSurfacesF024Repository.findFormById(details.getSmsId());

				String[] IgnoreProps = { "smsId", "createdBy", "createdAt", "supervisor_status", "supervisor_save_on",
						"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign", "hod_status", "hod_save_on", "hod_save_by",
						"hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign", "hod_mail_status",
						"activites", "supervisor_signature_image", "hod_signature_image" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

				if (role.equals("ROLE_SUPERVISOR")) {

					if (listObj.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)) {
						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
								HttpStatus.BAD_REQUEST);
					}

					sanitizationOfMachineAndSurfacesF024Repository.save(listObj);

					List<SpunlaceSmsActivitiesF024> list = details.getActivites();

					for (SpunlaceSmsActivitiesF024 detail : list) {

						if (detail.getActivityId() != null) {
							SpunlaceSmsActivitiesF024 obj = spunlaceSmsActivitiesF024Repository
									.findFormById(detail.getActivityId());
							detail.setCreatedAt(obj.getCreatedAt());
							detail.setCreatedBy(obj.getCreatedBy());
							spunlaceSmsActivitiesF024Repository.save(detail);
						}

						detail.setSmsId(listObj.getSmsId());
						spunlaceSmsActivitiesF024Repository.save(detail);
					}

					listObj.setActivites(list);

					listObj.setSupervisor_save_by(userName);
					listObj.setSupervisor_save_on(date);
					listObj.setSupervisor_save_id(userId);
					listObj.setSupervisor_status(AppConstants.supervisorSave);

					sanitizationOfMachineAndSurfacesF024Repository.save(listObj);
				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (role.equals("ROLE_SUPERVISOR")) {

					listObj = details;

					sanitizationOfMachineAndSurfacesF024Repository.save(listObj);

					List<SpunlaceSmsActivitiesF024> list = details.getActivites();

					for (SpunlaceSmsActivitiesF024 detail : list) {

						if (detail.getActivityId() != null) {
							SpunlaceSmsActivitiesF024 obj = spunlaceSmsActivitiesF024Repository
									.findFormById(detail.getActivityId());
							detail.setCreatedAt(obj.getCreatedAt());
							detail.setCreatedBy(obj.getCreatedBy());
							spunlaceSmsActivitiesF024Repository.save(detail);
						}

						detail.setSmsId(listObj.getSmsId());
						spunlaceSmsActivitiesF024Repository.save(detail);
					}

					listObj.setActivites(list);

					listObj.setSupervisor_save_by(userName);
					listObj.setSupervisor_save_on(date);
					listObj.setSupervisor_save_id(userId);
					listObj.setSupervisor_status(AppConstants.supervisorSave);
//					listObj.setsupervisor_mail_status(AppConstants.waitingStatus);

					sanitizationOfMachineAndSurfacesF024Repository.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}
//		return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	public ResponseEntity<?> SubmitSMSF024(SanitizationOfMachineAndSurfacesF024 details, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getSmsId();

		SanitizationOfMachineAndSurfacesF024 checkObj = new SanitizationOfMachineAndSurfacesF024();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRefSopNo() == null)
				value = "SopNumber";
			if (details.getRevisionNo() == null)
				value = "revisionNo";
			if (details.getFormatName() == null)
				value = "formatName";
			if (details.getUnit() == null)
				value = "unit";
			if (details.getMonth() == null)
				value = "month";
			if (details.getYear() == null)
				value = "year";
			if (details.getWeek() == null)
				value = "week";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = sanitizationOfMachineAndSurfacesF024Repository.findFormById(id);

				String[] IgnoreProps = { "smsId", "createdBy", "createdAt", "supervisor_status", "supervisor_save_on",
						"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign", "hod_status", "hod_save_on", "hod_save_by",
						"hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign", "hod_mail_status",
						"activites", "supervisor_signature_image", "hod_signature_image" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (!checkObj.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)
						|| checkObj.getHod_status().equals(AppConstants.hodRejectedStatus)) {
					if (role.equals("ROLE_SUPERVISOR")) {

						sanitizationOfMachineAndSurfacesF024Repository.save(checkObj);

						List<SpunlaceSmsActivitiesF024> list = details.getActivites();

						for (SpunlaceSmsActivitiesF024 detail : list) {

							if (detail.getActivityId() != null) {
								SpunlaceSmsActivitiesF024 obj = spunlaceSmsActivitiesF024Repository
										.findFormById(detail.getActivityId());
								detail.setCreatedAt(obj.getCreatedAt());
								detail.setCreatedBy(obj.getCreatedBy());
								spunlaceSmsActivitiesF024Repository.save(detail);
							}

							detail.setSmsId(checkObj.getSmsId());
							spunlaceSmsActivitiesF024Repository.save(detail);
						}

						checkObj.setActivites(list);

						checkObj.setSupervisor_submit_by(userName);
						checkObj.setSupervisor_submit_on(date);
						checkObj.setSupervisor_submit_id(userId);
						checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						checkObj.setSupervisor_sign(userName);

						checkObj.setHod_status(AppConstants.waitingStatus);
						checkObj.setHod_mail_status(AppConstants.waitingStatus);

						sanitizationOfMachineAndSurfacesF024Repository.save(checkObj);

						// IMAGE

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);

						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

						checkObj.setSupervisor_signature_image(signature);

						sanitizationOfMachineAndSurfacesF024Repository.save(checkObj); // ONE TABLE

						SanitizationOfMachineAndSurfacesHistoryF024 rejectionReportHistory = new SanitizationOfMachineAndSurfacesHistoryF024();

//						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						// getter setters fields & status

						rejectionReportHistory.setFormatName(checkObj.getFormatName());
						rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
						rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
						rejectionReportHistory.setRefSopNo(checkObj.getRefSopNo());
						rejectionReportHistory.setUnit(checkObj.getUnit());
						rejectionReportHistory.setDepartment(checkObj.getDepartment());
						rejectionReportHistory.setFrequency(checkObj.getFrequency());
						rejectionReportHistory.setMonth(checkObj.getMonth());
						rejectionReportHistory.setYear(checkObj.getYear());
						rejectionReportHistory.setWeek(checkObj.getWeek());
						rejectionReportHistory.setWeekAndDate(checkObj.getWeekAndDate());
						rejectionReportHistory.setRemarks(checkObj.getRemarks());
						rejectionReportHistory.setSanitized_by(checkObj.getSanitized_by());

						// status
						rejectionReportHistory.setSupervisor_submit_by(checkObj.getSupervisor_submit_by());
						rejectionReportHistory.setSupervisor_submit_id(checkObj.getSupervisor_submit_id());
						rejectionReportHistory.setSupervisor_submit_on(checkObj.getSupervisor_submit_on());
						rejectionReportHistory.setSupervisor_status(checkObj.getSupervisor_status());
						rejectionReportHistory.setSupervisor_sign(checkObj.getSupervisor_sign());
						rejectionReportHistory.setSupervisor_signature_image(checkObj.getSupervisor_signature_image());

						rejectionReportHistory.setHod_status(checkObj.getHod_status());

						// version
						String month = rejectionReportHistory.getMonth();

						String year = rejectionReportHistory.getYear();

						String week = rejectionReportHistory.getWeek();

						int version = sanitizationOfMachineAndSurfacesHistoryF024Repo
								.getMaximumVersion(month, year, week).map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						sanitizationOfMachineAndSurfacesHistoryF024Repo.save(rejectionReportHistory); // ONE HISTORY

						List<SpunlaceSmsActivitiesF024> historyMapList = checkObj.getActivites();

						for (SpunlaceSmsActivitiesF024 obj : historyMapList) {

							SpunlaceSmsActivitiesHistoryF024 objHistory = new SpunlaceSmsActivitiesHistoryF024();

							BeanUtils.copyProperties(obj, objHistory);
							objHistory.setSmsId(rejectionReportHistory.getSmsId());
							spunlaceSmsActivitiesHistoryF024Repo.save(objHistory);

						}

//                    Mail logic

						try {

							spunlacemailfunction.sendEmailToHodF024(checkObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, " Invalid Status."), HttpStatus.BAD_REQUEST);
				}
			} else {

				if (!role.equals("ROLE_SUPERVISOR")) {
					return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = details;

				sanitizationOfMachineAndSurfacesF024Repository.save(checkObj);

				List<SpunlaceSmsActivitiesF024> list = details.getActivites();

				for (SpunlaceSmsActivitiesF024 detail : list) {

					if (detail.getActivityId() != null) {
						SpunlaceSmsActivitiesF024 obj = spunlaceSmsActivitiesF024Repository
								.findFormById(detail.getActivityId());
						detail.setCreatedAt(obj.getCreatedAt());
						detail.setCreatedBy(obj.getCreatedBy());
						spunlaceSmsActivitiesF024Repository.save(detail);
					}

					detail.setSmsId(checkObj.getSmsId());
					spunlaceSmsActivitiesF024Repository.save(detail);
				}

				checkObj.setActivites(list);

				checkObj.setSupervisor_submit_by(userName);
				checkObj.setSupervisor_submit_on(date);
				checkObj.setSupervisor_submit_id(userId);
				checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
				checkObj.setSupervisor_sign(userName);

				checkObj.setHod_status(AppConstants.waitingStatus);
				checkObj.setHod_mail_status(AppConstants.waitingStatus);

				sanitizationOfMachineAndSurfacesF024Repository.save(checkObj);

				// IMAGE

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				checkObj.setSupervisor_signature_image(signature);

				sanitizationOfMachineAndSurfacesF024Repository.save(checkObj); // ONE TABLE

				SanitizationOfMachineAndSurfacesHistoryF024 rejectionReportHistory = new SanitizationOfMachineAndSurfacesHistoryF024();

//				BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				// getter setters fields & status

				rejectionReportHistory.setFormatName(checkObj.getFormatName());
				rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
				rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
				rejectionReportHistory.setRefSopNo(checkObj.getRefSopNo());
				rejectionReportHistory.setUnit(checkObj.getUnit());
				rejectionReportHistory.setDepartment(checkObj.getDepartment());
				rejectionReportHistory.setFrequency(checkObj.getFrequency());
				rejectionReportHistory.setMonth(checkObj.getMonth());
				rejectionReportHistory.setYear(checkObj.getYear());
				rejectionReportHistory.setWeek(checkObj.getWeek());
				rejectionReportHistory.setWeekAndDate(checkObj.getWeekAndDate());
				rejectionReportHistory.setRemarks(checkObj.getRemarks());
				rejectionReportHistory.setSanitized_by(checkObj.getSanitized_by());

				// status
				rejectionReportHistory.setSupervisor_submit_by(checkObj.getSupervisor_submit_by());
				rejectionReportHistory.setSupervisor_submit_id(checkObj.getSupervisor_submit_id());
				rejectionReportHistory.setSupervisor_submit_on(checkObj.getSupervisor_submit_on());
				rejectionReportHistory.setSupervisor_status(checkObj.getSupervisor_status());
				rejectionReportHistory.setSupervisor_sign(checkObj.getSupervisor_sign());
				rejectionReportHistory.setSupervisor_signature_image(checkObj.getSupervisor_signature_image());

				rejectionReportHistory.setHod_status(checkObj.getHod_status());

				// version
				String month = rejectionReportHistory.getMonth();

				String year = rejectionReportHistory.getYear();

				String week = rejectionReportHistory.getWeek();

				int version = sanitizationOfMachineAndSurfacesHistoryF024Repo.getMaximumVersion(month, year, week)
						.map(temp -> temp + 1).orElse(1);

				rejectionReportHistory.setVersion(version);

				sanitizationOfMachineAndSurfacesHistoryF024Repo.save(rejectionReportHistory); // ONE HISTORY

				List<SpunlaceSmsActivitiesF024> historyMapList = checkObj.getActivites();

				for (SpunlaceSmsActivitiesF024 obj : historyMapList) {

					SpunlaceSmsActivitiesHistoryF024 objHistory = new SpunlaceSmsActivitiesHistoryF024();

					BeanUtils.copyProperties(obj, objHistory);
					objHistory.setSmsId(rejectionReportHistory.getSmsId());
					spunlaceSmsActivitiesHistoryF024Repo.save(objHistory);

				}

//				Mail logic

				try {

					spunlacemailfunction.sendEmailToHodF024(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
							HttpStatus.OK);
				}
			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);

//		return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	public ResponseEntity<?> approveRejectionF024(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		SanitizationOfMachineAndSurfacesF024 object = new SanitizationOfMachineAndSurfacesF024();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = sanitizationOfMachineAndSurfacesF024Repository.findFormById(approvalResponse.getId());

			SanitizationOfMachineAndSurfacesHistoryF024 objHistory = new SanitizationOfMachineAndSurfacesHistoryF024();

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

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						sanitizationOfMachineAndSurfacesF024Repository.save(object);

						objHistory = sanitizationOfMachineAndSurfacesHistoryF024Repo
								.fetchLastSubmittedRecord(object.getMonth(), object.getYear(), object.getWeek());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						sanitizationOfMachineAndSurfacesHistoryF024Repo.save(objHistory);

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

						sanitizationOfMachineAndSurfacesF024Repository.save(object);

						objHistory = sanitizationOfMachineAndSurfacesHistoryF024Repo
								.fetchLastSubmittedRecord(object.getMonth(), object.getYear(), object.getWeek());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						sanitizationOfMachineAndSurfacesHistoryF024Repo.save(objHistory);

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
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	public ResponseEntity<?> getByMonthYearWeekF024(String month, String year, String week) {
		try {

			SanitizationOfMachineAndSurfacesF024 list = sanitizationOfMachineAndSurfacesF024Repository
					.findByMonthYearWeek(month, year, week);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> findByMonthYearPrintApiF024(String month, String year) {
		try {

			List<SanitizationOfMachineAndSurfacesF024> list = sanitizationOfMachineAndSurfacesF024Repository
					.findByMonthYearPrintApi(month, year);

			if (list == null || list.isEmpty()) {

//				list = new ArrayList<SanitizationOfMachineAndSurfacesF024>();
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getSMSSummary(HttpServletRequest http) {

		List<SanitizationOfMachineAndSurfacesF024> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_SUPERVISOR")) {

				details = sanitizationOfMachineAndSurfacesF024Repository.supervisorSummary();
			}

			else if (userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {

				details = sanitizationOfMachineAndSurfacesF024Repository.hodSummary();
			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

//	========================================== PH-PRD02/F-011 ==================================================

	public ResponseEntity<?> SaveProductChangeOver(ProductChangeOverCheckListSpunlaceF011 details,
			HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		ProductChangeOverCheckListSpunlaceF011 listObj = null;
		try {

			String value = "";

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRefSopNo() == null)
				value = "SopNumber";
			if (details.getRevisionNo() == null)
				value = "revisionNo";
			if (details.getFormatName() == null)
				value = "formatName";
			if (details.getUnit() == null)
				value = "unit";
			if (details.getDate() == null)
				value = "Date";
			if (details.getShift() == null)
				value = "Shift";
			if (details.getOrderNoFrom() == null)
				value = "OrderNoFrom";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getListId() != null) {

				listObj = productChangeOverCheckListSpunlaceF011Repository.findFormById(details.getListId());

				String[] IgnoreProps = { "listId", "createdBy", "createdAt", "supervisor_status", "supervisor_save_on",
						"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign", "hod_status", "hod_save_on", "hod_save_by",
						"hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign", "hod_mail_status",
						"qa_status", "qa_save_on", "qa_save_by", "qa_save_id", "qa_submit_on", "qa_submit_by",
						"qa_submit_id", "qa_mail_status", "qa_sign", "supervisor_signature_image",
						"hod_signature_image", "qa_signature_image" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

				if (role.equals("ROLE_SUPERVISOR")) {

					if (listObj.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)) {
						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
								HttpStatus.BAD_REQUEST);
					}

					listObj.setSupervisor_save_by(userName);
					listObj.setSupervisor_save_on(date);
					listObj.setSupervisor_save_id(userId);
					listObj.setSupervisor_status(AppConstants.supervisorSave);

					productChangeOverCheckListSpunlaceF011Repository.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (role.equals("ROLE_SUPERVISOR")) {

					listObj = details;

					listObj.setSupervisor_save_by(userName);
					listObj.setSupervisor_save_on(date);
					listObj.setSupervisor_save_id(userId);
					listObj.setSupervisor_status(AppConstants.supervisorSave);
//					listObj.setsupervisor_mail_status(AppConstants.waitingStatus);

					productChangeOverCheckListSpunlaceF011Repository.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}
//		return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	public ResponseEntity<?> SubmitProductChangeOver(ProductChangeOverCheckListSpunlaceF011 details,
			HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getListId();

		ProductChangeOverCheckListSpunlaceF011 checkObj = new ProductChangeOverCheckListSpunlaceF011();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRefSopNo() == null)
				value = "SopNumber";
			if (details.getRevisionNo() == null)
				value = "revisionNo";
			if (details.getFormatName() == null)
				value = "formatName";
			if (details.getUnit() == null)
				value = "unit";
			if (details.getDate() == null)
				value = "Date";
			if (details.getShift() == null)
				value = "Shift";
			if (details.getOrderNoFrom() == null)
				value = "OrderNoFrom";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = productChangeOverCheckListSpunlaceF011Repository.findFormById(id);

				String[] IgnoreProps = { "listId", "createdBy", "createdAt", "supervisor_status", "supervisor_save_on",
						"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign", "hod_status", "hod_save_on", "hod_save_by",
						"hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign", "hod_mail_status",
						"qa_status", "qa_save_on", "qa_save_by", "qa_save_id", "qa_submit_on", "qa_submit_by",
						"qa_submit_id", "qa_mail_status", "qa_sign", "supervisor_signature_image",
						"hod_signature_image", "qa_signature_image" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (!checkObj.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)
						|| checkObj.getHod_status().equals(AppConstants.hodRejectedStatus)
						|| checkObj.getQa_status().equals(AppConstants.qaRejectedStatus)) {
					if (role.equals("ROLE_SUPERVISOR")) {

						checkObj.setSupervisor_submit_by(userName);
						checkObj.setSupervisor_submit_on(date);
						checkObj.setSupervisor_submit_id(userId);
						checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						checkObj.setSupervisor_sign(userName);

						checkObj.setHod_status(AppConstants.waitingStatus);
						checkObj.setHod_mail_status(AppConstants.waitingStatus);

//						checkObj.setQa_status(AppConstants.waitingStatus);
//						checkObj.setQa_mail_status(AppConstants.waitingStatus);

						checkObj.setQa_status("");
						checkObj.setQa_mail_status("");

						productChangeOverCheckListSpunlaceF011Repository.save(checkObj);

						// IMAGE

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);

						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

						checkObj.setSupervisor_signature_image(signature);

						productChangeOverCheckListSpunlaceF011Repository.save(checkObj);

						ProductChangeOverCheckListSpunlaceHistoryF011 rejectionReportHistory = new ProductChangeOverCheckListSpunlaceHistoryF011();

						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						String date1 = rejectionReportHistory.getDate();

						String shift = rejectionReportHistory.getShift();

						String orderNoFrom = rejectionReportHistory.getOrderNoFrom();

						int version = productChangeOverCheckListSpunlaceHistoryF011Repo
								.getMaximumVersion(date1, shift, orderNoFrom).map(temp -> temp + 1).orElse(1);
						;

						rejectionReportHistory.setVersion(version);

						productChangeOverCheckListSpunlaceHistoryF011Repo.save(rejectionReportHistory);

//                    Mail logic

						try {

							spunlacemailfunction.sendEmailToHodF011(checkObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, " Invalid Status."), HttpStatus.BAD_REQUEST);
				}
			} else {

				if (!role.equals("ROLE_SUPERVISOR")) {
					return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = details;

				checkObj.setSupervisor_submit_by(userName);
				checkObj.setSupervisor_submit_on(date);
				checkObj.setSupervisor_submit_id(userId);
				checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
				checkObj.setSupervisor_sign(userName);

				checkObj.setHod_status(AppConstants.waitingStatus);
				checkObj.setHod_mail_status(AppConstants.waitingStatus);

//				checkObj.setQa_status(AppConstants.waitingStatus);
//				checkObj.setQa_mail_status(AppConstants.waitingStatus);

				checkObj.setQa_status("");
				checkObj.setQa_mail_status("");

				productChangeOverCheckListSpunlaceF011Repository.save(checkObj);

				// IMAGE

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				checkObj.setSupervisor_signature_image(signature);

				productChangeOverCheckListSpunlaceF011Repository.save(checkObj);

				ProductChangeOverCheckListSpunlaceHistoryF011 rejectionReportHistory = new ProductChangeOverCheckListSpunlaceHistoryF011();

				BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				String date1 = rejectionReportHistory.getDate();

				String shift = rejectionReportHistory.getShift();

				String orderNoFrom = rejectionReportHistory.getOrderNoFrom();

				int version = productChangeOverCheckListSpunlaceHistoryF011Repo
						.getMaximumVersion(date1, shift, orderNoFrom).map(temp -> temp + 1).orElse(1);
				

				rejectionReportHistory.setVersion(version);

				productChangeOverCheckListSpunlaceHistoryF011Repo.save(rejectionReportHistory);

//				Mail logic

				try {

					spunlacemailfunction.sendEmailToHodF011(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
							HttpStatus.OK);
				}

			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);

//		return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	public ResponseEntity<?> approveRejectionF011(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		ProductChangeOverCheckListSpunlaceF011 object = new ProductChangeOverCheckListSpunlaceF011();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = productChangeOverCheckListSpunlaceF011Repository.findFormById(approvalResponse.getId());

			ProductChangeOverCheckListSpunlaceHistoryF011 objHistory = new ProductChangeOverCheckListSpunlaceHistoryF011();

			String supervisiorStatus = object.getSupervisor_status();

			String hodStatus = object.getHod_status();

			String qaStatus = object.getQa_status();

			UserImageDetails imageDetails = new UserImageDetails();

			if (supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
					&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setHod_status(AppConstants.hodApprovedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);
						object.setQa_status(AppConstants.waitingStatus);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						productChangeOverCheckListSpunlaceF011Repository.save(object);

						objHistory = productChangeOverCheckListSpunlaceHistoryF011Repo
								.fetchLastSubmittedRecord(object.getDate(), object.getShift(), object.getOrderNoFrom());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);
						objHistory.setQa_status(AppConstants.waitingStatus);

						productChangeOverCheckListSpunlaceHistoryF011Repo.save(objHistory);

						try {

							spunlacemailfunction.sendEmailToQaF011(object);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
									HttpStatus.OK);
						}

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

						productChangeOverCheckListSpunlaceF011Repository.save(object);

						objHistory = productChangeOverCheckListSpunlaceHistoryF011Repo
								.fetchLastSubmittedRecord(object.getDate(), object.getShift(), object.getOrderNoFrom());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						productChangeOverCheckListSpunlaceHistoryF011Repo.save(objHistory);

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
					&& qaStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_QA")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setQa_status(AppConstants.qaApprovedStatus);
						object.setQa_submit_on(date);
						object.setQa_submit_by(userName);
						object.setQa_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setQa_signature_image(signature);

						object.setQa_sign(userName);

						productChangeOverCheckListSpunlaceF011Repository.save(object);

						objHistory = productChangeOverCheckListSpunlaceHistoryF011Repo
								.fetchLastSubmittedRecord(object.getDate(), object.getShift(), object.getOrderNoFrom());

						objHistory.setQa_status(AppConstants.qaApprovedStatus);
						objHistory.setQa_submit_on(date);
						objHistory.setQa_submit_by(userName);
						objHistory.setQa_submit_id(userId);
						objHistory.setQa_sign(userName);

						productChangeOverCheckListSpunlaceHistoryF011Repo.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, " QA Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						object.setReason(reason);
						object.setQa_status(AppConstants.qaRejectedStatus);
						object.setQa_submit_on(date);
						object.setQa_submit_by(userName);
						object.setQa_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setQa_signature_image(signature);

						object.setQa_sign(userName);

						productChangeOverCheckListSpunlaceF011Repository.save(object);

						objHistory = productChangeOverCheckListSpunlaceHistoryF011Repo
								.fetchLastSubmittedRecord(object.getDate(), object.getShift(), object.getOrderNoFrom());

//						bleachLayDownCheckListF42History = dailyRejectionReportF007RepositoryHistory
//								.fetchLastSubmittedRecord(bleachContRawCottonF05.getDate(),
//										bleachContRawCottonF05.getShift(), bleachContRawCottonF05.getOrderNo());

						objHistory.setReason(reason);
						objHistory.setQa_status(AppConstants.qaRejectedStatus);
						objHistory.setQa_submit_on(date);
						objHistory.setQa_submit_by(userName);
						objHistory.setQa_submit_id(userId);
						objHistory.setQa_sign(userName);

						productChangeOverCheckListSpunlaceHistoryF011Repo.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, " QA Rejected Successfully"), HttpStatus.OK);

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
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	public ResponseEntity<?> getByDateShiftOrderNoF011(String date, String shift, String orderNo) {
		try {

			ProductChangeOverCheckListSpunlaceF011 list = productChangeOverCheckListSpunlaceF011Repository
					.findByDateShiftOrderNo(date, shift, orderNo);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getByDateShiftOrderNoPrintF011(String date, String shift, String orderNo) {
		try {

			ProductChangeOverCheckListSpunlaceF011 list = productChangeOverCheckListSpunlaceF011Repository
					.findByDateShiftOrderNoPrintApi(date, shift, orderNo);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getProductChangeOverSummary(HttpServletRequest http) {

		List<ProductChangeOverCheckListSpunlaceF011> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_SUPERVISOR")) {

				details = productChangeOverCheckListSpunlaceF011Repository.supervisorSummary();
			}

			else if (userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE") || userRole.equals("ROLE_QA")) {

				details = productChangeOverCheckListSpunlaceF011Repository.hodQASummary();

			}
//			else if (userRole.equals("ROLE_QA")) {
//
//				details = productChangeOverCheckListSpunlaceF011Repository.qaSummary();
//			} 

			else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

//	========================================== PH-PRD02/F-025 ==================================================

	public ResponseEntity<?> SaveHandSanitizationReportF025(SpunlaceHandSanitizationReportF025 details,
			HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		SpunlaceHandSanitizationReportF025 listObj = null;
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
				value = "shift";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getHandSanitizationId() != null) {

				listObj = spunlaceHandSanitizationReportF025Repository.findFormById(details.getHandSanitizationId());

				String[] IgnoreProps = { "handSanitizationId", "createdBy", "createdAt", "supervisor_status",
						"supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
						"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "hod_status", "hod_save_on",
						"hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign",
						"hod_mail_status", "sanitizationList", "supervisor_signature_image", "hod_signature_image" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

				if (role.equals("ROLE_SUPERVISOR")) {

					if (listObj.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)) {
						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
								HttpStatus.BAD_REQUEST);
					}

					spunlaceHandSanitizationReportF025Repository.save(listObj);

					List<SpunlaceHandSanitizationListF025> list = details.getSanitizationList();

					for (SpunlaceHandSanitizationListF025 detail : list) {

						if (detail.getListId() != null) {
							SpunlaceHandSanitizationListF025 obj = spunlaceHandSanitizationListF025Repository
									.findFormById(detail.getListId());
							detail.setCreatedAt(obj.getCreatedAt());
							detail.setCreatedBy(obj.getCreatedBy());
							spunlaceHandSanitizationListF025Repository.save(detail);
						}

						detail.setHandSanitizationId(listObj.getHandSanitizationId());
						spunlaceHandSanitizationListF025Repository.save(detail);
					}

					listObj.setSanitizationList(list);

					listObj.setSupervisor_save_by(userName);
					listObj.setSupervisor_save_on(date);
					listObj.setSupervisor_save_id(userId);
					listObj.setSupervisor_status(AppConstants.supervisorSave);

					spunlaceHandSanitizationReportF025Repository.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				if (role.equals("ROLE_SUPERVISOR")) {

					listObj = details;

					spunlaceHandSanitizationReportF025Repository.save(listObj);

					List<SpunlaceHandSanitizationListF025> list = details.getSanitizationList();

					for (SpunlaceHandSanitizationListF025 detail : list) {

						if (detail.getListId() != null) {
							SpunlaceHandSanitizationListF025 obj = spunlaceHandSanitizationListF025Repository
									.findFormById(detail.getListId());
							detail.setCreatedAt(obj.getCreatedAt());
							detail.setCreatedBy(obj.getCreatedBy());
							spunlaceHandSanitizationListF025Repository.save(detail);
						}

						detail.setHandSanitizationId(listObj.getHandSanitizationId());
						spunlaceHandSanitizationListF025Repository.save(detail);
					}

					listObj.setSanitizationList(list);

					listObj.setSupervisor_save_by(userName);
					listObj.setSupervisor_save_on(date);
					listObj.setSupervisor_save_id(userId);
					listObj.setSupervisor_status(AppConstants.supervisorSave);
//					listObj.setsupervisor_mail_status(AppConstants.waitingStatus);

					spunlaceHandSanitizationReportF025Repository.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}
//		return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	public ResponseEntity<?> SubmitHandSanitizationReport(SpunlaceHandSanitizationReportF025 details,
			HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getHandSanitizationId();

		SpunlaceHandSanitizationReportF025 checkObj = new SpunlaceHandSanitizationReportF025();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

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

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = spunlaceHandSanitizationReportF025Repository.findFormById(id);

				String[] IgnoreProps = { "handSanitizationId", "createdBy", "createdAt", "supervisor_status",
						"supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
						"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "hod_status", "hod_save_on",
						"hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign",
						"hod_mail_status", "sanitizationList", "supervisor_signature_image", "hod_signature_image" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (!checkObj.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)
						|| checkObj.getHod_status().equals(AppConstants.hodRejectedStatus)) {
					if (role.equals("ROLE_SUPERVISOR")) {

						spunlaceHandSanitizationReportF025Repository.save(checkObj);

						List<SpunlaceHandSanitizationListF025> list = details.getSanitizationList();

						for (SpunlaceHandSanitizationListF025 detail : list) {

							if (detail.getListId() != null) {
								SpunlaceHandSanitizationListF025 obj = spunlaceHandSanitizationListF025Repository
										.findFormById(detail.getListId());
								detail.setCreatedAt(obj.getCreatedAt());
								detail.setCreatedBy(obj.getCreatedBy());
								spunlaceHandSanitizationListF025Repository.save(detail);
							}

							detail.setHandSanitizationId(checkObj.getHandSanitizationId());
							spunlaceHandSanitizationListF025Repository.save(detail);
						}

						checkObj.setSanitizationList(list);

						checkObj.setSupervisor_submit_by(userName);
						checkObj.setSupervisor_submit_on(date);
						checkObj.setSupervisor_submit_id(userId);
						checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						checkObj.setSupervisor_sign(userName);

						checkObj.setHod_status(AppConstants.waitingStatus);
						checkObj.setHod_mail_status(AppConstants.waitingStatus);

						spunlaceHandSanitizationReportF025Repository.save(checkObj);

						// IMAGE

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);

						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

						checkObj.setSupervisor_signature_image(signature);

						spunlaceHandSanitizationReportF025Repository.save(checkObj); // ONE TABLE

						SpunlaceHandSanitizationReportHistoryF025 rejectionReportHistory = new SpunlaceHandSanitizationReportHistoryF025();

//						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						// getter setters fields & status

						rejectionReportHistory.setFormatName(checkObj.getFormatName());
						rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
						rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
						rejectionReportHistory.setSopNumber(checkObj.getSopNumber());
						rejectionReportHistory.setUnit(checkObj.getUnit());
						rejectionReportHistory.setDate(checkObj.getDate());
						rejectionReportHistory.setShift(checkObj.getShift());

						// status
						rejectionReportHistory.setSupervisor_submit_by(checkObj.getSupervisor_submit_by());
						rejectionReportHistory.setSupervisor_submit_id(checkObj.getSupervisor_submit_id());
						rejectionReportHistory.setSupervisor_submit_on(checkObj.getSupervisor_submit_on());
						rejectionReportHistory.setSupervisor_status(checkObj.getSupervisor_status());
						rejectionReportHistory.setSupervisor_sign(checkObj.getSupervisor_sign());
						rejectionReportHistory.setSupervisor_signature_image(checkObj.getSupervisor_signature_image());

						rejectionReportHistory.setHod_status(checkObj.getHod_status());

						// version
						String date1 = rejectionReportHistory.getDate();

						String shift1 = rejectionReportHistory.getShift();

						int version = spunlaceHandSanitizationReportHistoryF025Repo.getMaximumVersion(date1, shift1)
								.map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						spunlaceHandSanitizationReportHistoryF025Repo.save(rejectionReportHistory); // ONE HISTORY

						List<SpunlaceHandSanitizationListF025> historyMapList = checkObj.getSanitizationList();

						for (SpunlaceHandSanitizationListF025 obj : historyMapList) {

							SpunlaceHandSanitizationListHistoryF025 objHistory = new SpunlaceHandSanitizationListHistoryF025();

							BeanUtils.copyProperties(obj, objHistory);
							objHistory.setHandSanitizationId(rejectionReportHistory.getHandSanitizationId());
							spunlaceHandSanitizationListHistoryF025Repo.save(objHistory);

						}

//                    Mail logic

						try {

							spunlacemailfunction.sendEmailToHodF025(checkObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, " Invalid Status."), HttpStatus.BAD_REQUEST);
				}
			} else {

				if (!role.equals("ROLE_SUPERVISOR")) {
					return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = details;

				spunlaceHandSanitizationReportF025Repository.save(checkObj);

				List<SpunlaceHandSanitizationListF025> list = details.getSanitizationList();

				for (SpunlaceHandSanitizationListF025 detail : list) {

					if (detail.getListId() != null) {
						SpunlaceHandSanitizationListF025 obj = spunlaceHandSanitizationListF025Repository
								.findFormById(detail.getListId());
						detail.setCreatedAt(obj.getCreatedAt());
						detail.setCreatedBy(obj.getCreatedBy());
						spunlaceHandSanitizationListF025Repository.save(detail);
					}

					detail.setHandSanitizationId(checkObj.getHandSanitizationId());
					spunlaceHandSanitizationListF025Repository.save(detail);
				}

				checkObj.setSanitizationList(list);

				checkObj.setSupervisor_submit_by(userName);
				checkObj.setSupervisor_submit_on(date);
				checkObj.setSupervisor_submit_id(userId);
				checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
				checkObj.setSupervisor_sign(userName);

				checkObj.setHod_status(AppConstants.waitingStatus);
				checkObj.setHod_mail_status(AppConstants.waitingStatus);

				spunlaceHandSanitizationReportF025Repository.save(checkObj);

				// IMAGE

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				checkObj.setSupervisor_signature_image(signature);

				spunlaceHandSanitizationReportF025Repository.save(checkObj); // ONE TABLE

				SpunlaceHandSanitizationReportHistoryF025 rejectionReportHistory = new SpunlaceHandSanitizationReportHistoryF025();

//				BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				// getter setters fields & status

				rejectionReportHistory.setFormatName(checkObj.getFormatName());
				rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
				rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
				rejectionReportHistory.setSopNumber(checkObj.getSopNumber());
				rejectionReportHistory.setUnit(checkObj.getUnit());
				rejectionReportHistory.setDate(checkObj.getDate());
				rejectionReportHistory.setShift(checkObj.getShift());

				// status
				rejectionReportHistory.setSupervisor_submit_by(checkObj.getSupervisor_submit_by());
				rejectionReportHistory.setSupervisor_submit_id(checkObj.getSupervisor_submit_id());
				rejectionReportHistory.setSupervisor_submit_on(checkObj.getSupervisor_submit_on());
				rejectionReportHistory.setSupervisor_status(checkObj.getSupervisor_status());
				rejectionReportHistory.setSupervisor_sign(checkObj.getSupervisor_sign());
				rejectionReportHistory.setSupervisor_signature_image(checkObj.getSupervisor_signature_image());

				rejectionReportHistory.setHod_status(checkObj.getHod_status());

				// version
				String date1 = rejectionReportHistory.getDate();

				String shift1 = rejectionReportHistory.getShift();

				int version = spunlaceHandSanitizationReportHistoryF025Repo.getMaximumVersion(date1, shift1)
						.map(temp -> temp + 1).orElse(1);

				rejectionReportHistory.setVersion(version);

				spunlaceHandSanitizationReportHistoryF025Repo.save(rejectionReportHistory); // ONE HISTORY

				List<SpunlaceHandSanitizationListF025> historyMapList = checkObj.getSanitizationList();

				for (SpunlaceHandSanitizationListF025 obj : historyMapList) {

					SpunlaceHandSanitizationListHistoryF025 objHistory = new SpunlaceHandSanitizationListHistoryF025();

					BeanUtils.copyProperties(obj, objHistory);
					objHistory.setHandSanitizationId(rejectionReportHistory.getHandSanitizationId());
					spunlaceHandSanitizationListHistoryF025Repo.save(objHistory);

				}

//				Mail logic

				try {

					spunlacemailfunction.sendEmailToHodF025(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
							HttpStatus.OK);
				}
			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);

//		return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	public ResponseEntity<?> approveRejectionF025(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		SpunlaceHandSanitizationReportF025 object = new SpunlaceHandSanitizationReportF025();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = spunlaceHandSanitizationReportF025Repository.findFormById(approvalResponse.getId());

			SpunlaceHandSanitizationReportHistoryF025 objHistory = new SpunlaceHandSanitizationReportHistoryF025();

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

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						spunlaceHandSanitizationReportF025Repository.save(object);

						objHistory = spunlaceHandSanitizationReportHistoryF025Repo
								.fetchLastSubmittedRecord(object.getDate(), object.getShift());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						spunlaceHandSanitizationReportHistoryF025Repo.save(objHistory);

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

						spunlaceHandSanitizationReportF025Repository.save(object);

						objHistory = spunlaceHandSanitizationReportHistoryF025Repo
								.fetchLastSubmittedRecord(object.getDate(), object.getShift());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						spunlaceHandSanitizationReportHistoryF025Repo.save(objHistory);

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
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	public ResponseEntity<?> getByDateShiftF025(String date, String shift) {
		try {

			SpunlaceHandSanitizationReportF025 list = spunlaceHandSanitizationReportF025Repository.findByDateShift(date,
					shift);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getByDateShiftPrintApiF025(String date, String shift) {
		try {

			SpunlaceHandSanitizationReportF025 list = spunlaceHandSanitizationReportF025Repository
					.findByDateShiftPrintApi(date, shift);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getHandSanitizationReportSummary(HttpServletRequest http) {

		List<SpunlaceHandSanitizationReportF025> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_SUPERVISOR")) {

				details = spunlaceHandSanitizationReportF025Repository.supervisorSummary();
			}

			else if (userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {

				details = spunlaceHandSanitizationReportF025Repository.hodSummary();
			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

//	========================================== PH-PRD02/F-023 ==================================================

	public ResponseEntity<?> SaveMachineCleaningRecordF023(MachineCleaningRecordF023 details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		MachineCleaningRecordF023 listObj = null;
		try {

			String value = "";

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRefSopNo() == null)
				value = "SopNumber";
			if (details.getRevisionNo() == null)
				value = "revisionNo";
			if (details.getFormatName() == null)
				value = "formatName";
			if (details.getUnit() == null)
				value = "unit";
			if (details.getDate() == null)
				value = "date";
			if (details.getMonth() == null)
				value = "Month";
			if (details.getYear() == null)
				value = "year";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getRecordId() != null) {

				listObj = machineCleaningRecordF023Repository.findFormById(details.getRecordId());

				String[] IgnoreProps = { "recordId", "createdBy", "createdAt", "supervisor_status",
						"supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
						"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "hod_status", "hod_save_on",
						"hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign",
						"hod_mail_status", "supervisor_signature_image", "hod_signature_image" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

				if (role.equals("ROLE_SUPERVISOR")) {

					if (listObj.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)) {
						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
								HttpStatus.BAD_REQUEST);
					}

					listObj.setSupervisor_save_by(userName);
					listObj.setSupervisor_save_on(date);
					listObj.setSupervisor_save_id(userId);
					listObj.setSupervisor_status(AppConstants.supervisorSave);

					machineCleaningRecordF023Repository.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				if (role.equals("ROLE_SUPERVISOR")) {

					listObj = details;

					listObj.setSupervisor_save_by(userName);
					listObj.setSupervisor_save_on(date);
					listObj.setSupervisor_save_id(userId);
					listObj.setSupervisor_status(AppConstants.supervisorSave);
//					listObj.setsupervisor_mail_status(AppConstants.waitingStatus);

					machineCleaningRecordF023Repository.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}
//		return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	public ResponseEntity<?> SubmitMachineCleaningRecordF023(MachineCleaningRecordF023 details,
			HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getRecordId();

		MachineCleaningRecordF023 checkObj = new MachineCleaningRecordF023();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRefSopNo() == null)
				value = "SopNumber";
			if (details.getRevisionNo() == null)
				value = "revisionNo";
			if (details.getFormatName() == null)
				value = "formatName";
			if (details.getUnit() == null)
				value = "unit";
			if (details.getDate() == null)
				value = "date";
			if (details.getMonth() == null)
				value = "Month";
			if (details.getYear() == null)
				value = "year";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = machineCleaningRecordF023Repository.findFormById(id);

				String[] IgnoreProps = { "recordId", "createdBy", "createdAt", "supervisor_status",
						"supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
						"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "hod_status", "hod_save_on",
						"hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign",
						"hod_mail_status", "supervisor_signature_image", "hod_signature_image" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (!checkObj.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)
						|| checkObj.getHod_status().equals(AppConstants.hodRejectedStatus)) {
					if (role.equals("ROLE_SUPERVISOR")) {

						checkObj.setSupervisor_submit_by(userName);
						checkObj.setSupervisor_submit_on(date);
						checkObj.setSupervisor_submit_id(userId);
						checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						checkObj.setSupervisor_sign(userName);

						checkObj.setHod_status(AppConstants.waitingStatus);
						checkObj.setHod_mail_status(AppConstants.waitingStatus);

						machineCleaningRecordF023Repository.save(checkObj);

						// IMAGE

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);

						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

						checkObj.setSupervisor_signature_image(signature);

						machineCleaningRecordF023Repository.save(checkObj);

						MachineCleaningRecordHistoryF023 rejectionReportHistory = new MachineCleaningRecordHistoryF023();

						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						String date1 = rejectionReportHistory.getDate();

						String month = rejectionReportHistory.getMonth();

						String year = rejectionReportHistory.getYear();

						int version = machineCleaningRecordHistoryF023Repo.getMaximumVersion(date1, month, year)
								.map(temp -> temp + 1).orElse(1);
						;

						rejectionReportHistory.setVersion(version);

						machineCleaningRecordHistoryF023Repo.save(rejectionReportHistory);

//                    Mail logic

						try {

							spunlacemailfunction.sendEmailToHodF023(checkObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, "Invalid Status."), HttpStatus.BAD_REQUEST);
				}
			} else {

				if (!role.equals("ROLE_SUPERVISOR")) {
					return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = details;

				checkObj.setSupervisor_submit_by(userName);
				checkObj.setSupervisor_submit_on(date);
				checkObj.setSupervisor_submit_id(userId);
				checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
				checkObj.setSupervisor_sign(userName);

				checkObj.setHod_status(AppConstants.waitingStatus);
				checkObj.setHod_mail_status(AppConstants.waitingStatus);

				machineCleaningRecordF023Repository.save(checkObj);

				// IMAGE

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				checkObj.setSupervisor_signature_image(signature);

				machineCleaningRecordF023Repository.save(checkObj);

				MachineCleaningRecordHistoryF023 rejectionReportHistory = new MachineCleaningRecordHistoryF023();

				BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				String date1 = rejectionReportHistory.getDate();

				String month = rejectionReportHistory.getMonth();

				String year = rejectionReportHistory.getYear();

				int version = machineCleaningRecordHistoryF023Repo.getMaximumVersion(date1, month, year)
						.map(temp -> temp + 1).orElse(1);
				;

				rejectionReportHistory.setVersion(version);

				machineCleaningRecordHistoryF023Repo.save(rejectionReportHistory);

//				Mail logic

				try {

					spunlacemailfunction.sendEmailToHodF023(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
							HttpStatus.OK);
				}
			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);

//		return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	public ResponseEntity<?> approveRejectionF023(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		MachineCleaningRecordF023 object = new MachineCleaningRecordF023();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = machineCleaningRecordF023Repository.findFormById(approvalResponse.getId());

			MachineCleaningRecordHistoryF023 objHistory = new MachineCleaningRecordHistoryF023();

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

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						machineCleaningRecordF023Repository.save(object);

						objHistory = machineCleaningRecordHistoryF023Repo.fetchLastSubmittedRecord(object.getDate(),
								object.getMonth(), object.getYear());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						machineCleaningRecordHistoryF023Repo.save(objHistory);

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

						machineCleaningRecordF023Repository.save(object);

						objHistory = machineCleaningRecordHistoryF023Repo.fetchLastSubmittedRecord(object.getDate(),
								object.getMonth(), object.getYear());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						machineCleaningRecordHistoryF023Repo.save(objHistory);

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
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	public ResponseEntity<?> getByDateF023(String date) {
		try {

			MachineCleaningRecordF023 list = machineCleaningRecordF023Repository.findByDate(date);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> findByMonthYearPrintApiF023(String month, String year) {
		try {

			List<MachineCleaningRecordF023> list = machineCleaningRecordF023Repository.findByMonthYearPrintApi(month,
					year);

			if (list == null || list.isEmpty()) {

				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getMachineCleaningRecordSummary(HttpServletRequest http) {

		List<MachineCleaningRecordF023> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_SUPERVISOR")) {

				details = machineCleaningRecordF023Repository.supervisorSummary();
			}

			else if (userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {

				details = machineCleaningRecordF023Repository.hodSummary();
			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

//	========================================== PH-PRD02/F-017 ==================================================

	public ResponseEntity<?> SaveShiftWiseSliterWinderProdReportF017(ShiftWiseSliterWinderProdReportF017 details,
			HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		ShiftWiseSliterWinderProdReportF017 listObj = null;
		try {

			String value = "";

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRefSopNo() == null)
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
			if (details.getOrderNo() == null)
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

			if (details.getReportId() != null) {

				listObj = shiftWiseSliterWinderProdReportF017Repository.findFormById(details.getReportId());

				String[] IgnoreProps = { "reportId", "createdBy", "createdAt", "operator_status", "operator_save_by",
						"operator_save_on", "operator_save_id", "operator_submitted_by", "operator_submitted_on",
						"operator_submitted_id", "operator_sign", "supervisor_status", "supervisor_save_on",
						"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign", "supervisior_mail_status", "hod_status",
						"hod_save_on", "hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id",
						"hod_sign", "hod_mail_status", "reportDetails", "sliterWinderDetails",
						"operator_signature_image", "supervisor_signature_image", "hod_signature_image" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

				if (role.equals("ROLE_OPERATOR")) {

					if (listObj.getOperator_status().equals(AppConstants.operatorApprove)) {
						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
								HttpStatus.BAD_REQUEST);
					}

					shiftWiseSliterWinderProdReportF017Repository.save(listObj);

					List<ShiftWiseSliterWinderProdDetailsF017> list = details.getReportDetails();

					for (ShiftWiseSliterWinderProdDetailsF017 detail : list) {

						if (detail.getDetailId() != null) {
							ShiftWiseSliterWinderProdDetailsF017 obj = shiftWiseSliterWinderProdDetailsF017Repository
									.findFormById(detail.getDetailId());
							detail.setCreatedAt(obj.getCreatedAt());
							detail.setCreatedBy(obj.getCreatedBy());
							shiftWiseSliterWinderProdDetailsF017Repository.save(detail);
						}

						detail.setReportId(listObj.getReportId());
						shiftWiseSliterWinderProdDetailsF017Repository.save(detail);
					}

					List<SliterWinderListF017> list1 = details.getSliterWinderDetails();

					for (SliterWinderListF017 detail : list1) {

						if (detail.getSwId() != null) {
							SliterWinderListF017 obj = sliterWinderListF017Repository.findFormById(detail.getSwId());
							detail.setCreatedAt(obj.getCreatedAt());
							detail.setCreatedBy(obj.getCreatedBy());
							sliterWinderListF017Repository.save(detail);
						}

						detail.setReportId(listObj.getReportId());
						sliterWinderListF017Repository.save(detail);
					}

					listObj.setReportDetails(list);
					listObj.setSliterWinderDetails(list1);

					listObj.setOperator_save_by(userName);
					listObj.setOperator_save_on(date);
					listObj.setOperator_save_id(userId);
					listObj.setOperator_status(AppConstants.operatorSave);

					shiftWiseSliterWinderProdReportF017Repository.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (role.equals("ROLE_OPERATOR")) {

					listObj = details;

					shiftWiseSliterWinderProdReportF017Repository.save(listObj);

					List<ShiftWiseSliterWinderProdDetailsF017> list = details.getReportDetails();

					for (ShiftWiseSliterWinderProdDetailsF017 detail : list) {

						if (detail.getDetailId() != null) {
							ShiftWiseSliterWinderProdDetailsF017 obj = shiftWiseSliterWinderProdDetailsF017Repository
									.findFormById(detail.getDetailId());
							detail.setCreatedAt(obj.getCreatedAt());
							detail.setCreatedBy(obj.getCreatedBy());
							shiftWiseSliterWinderProdDetailsF017Repository.save(detail);
						}

						detail.setReportId(listObj.getReportId());
						shiftWiseSliterWinderProdDetailsF017Repository.save(detail);
					}

					List<SliterWinderListF017> list1 = details.getSliterWinderDetails();

					for (SliterWinderListF017 detail : list1) {

						if (detail.getSwId() != null) {
							SliterWinderListF017 obj = sliterWinderListF017Repository.findFormById(detail.getSwId());
							detail.setCreatedAt(obj.getCreatedAt());
							detail.setCreatedBy(obj.getCreatedBy());
							sliterWinderListF017Repository.save(detail);
						}

						detail.setReportId(listObj.getReportId());
						sliterWinderListF017Repository.save(detail);
					}

					listObj.setReportDetails(list);
					listObj.setSliterWinderDetails(list1);

					listObj.setOperator_save_by(userName);
					listObj.setOperator_save_on(date);
					listObj.setOperator_save_id(userId);
					listObj.setOperator_status(AppConstants.operatorSave);

					shiftWiseSliterWinderProdReportF017Repository.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}
//		return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	public ResponseEntity<?> SubmitShiftWiseSliterWinderProdReportF017(ShiftWiseSliterWinderProdReportF017 details,
			HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getReportId();

		ShiftWiseSliterWinderProdReportF017 checkObj = new ShiftWiseSliterWinderProdReportF017();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getFormatNo() == null)
				value = "formatNo";
			if (details.getRefSopNo() == null)
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
			if (details.getOrderNo() == null)
				value = "OrderNo";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = shiftWiseSliterWinderProdReportF017Repository.findFormById(id);

				String[] IgnoreProps = { "reportId", "createdBy", "createdAt", "operator_status", "operator_save_by",
						"operator_save_on", "operator_save_id", "operator_submitted_by", "operator_submitted_on",
						"operator_submitted_id", "operator_sign", "supervisor_status", "supervisor_save_on",
						"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign", "supervisior_mail_status", "hod_status",
						"hod_save_on", "hod_save_by", "hod_save_id", "hod_submit_on", "hod_submit_by", "hod_submit_id",
						"hod_sign", "hod_mail_status", "reportDetails", "sliterWinderDetails",
						"operator_signature_image", "supervisor_signature_image", "hod_signature_image" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (!checkObj.getOperator_status().equals(AppConstants.operatorApprove)
						|| checkObj.getSupervisor_status().equals(AppConstants.supervisorRejectedStatus)
						|| checkObj.getHod_status().equals(AppConstants.hodRejectedStatus)) {
					if (role.equals("ROLE_OPERATOR")) {

						shiftWiseSliterWinderProdReportF017Repository.save(checkObj);

						List<ShiftWiseSliterWinderProdDetailsF017> list = details.getReportDetails();

						for (ShiftWiseSliterWinderProdDetailsF017 detail : list) {

							if (detail.getDetailId() != null) {
								ShiftWiseSliterWinderProdDetailsF017 obj = shiftWiseSliterWinderProdDetailsF017Repository
										.findFormById(detail.getDetailId());
								detail.setCreatedAt(obj.getCreatedAt());
								detail.setCreatedBy(obj.getCreatedBy());
								shiftWiseSliterWinderProdDetailsF017Repository.save(detail);
							}

							detail.setReportId(checkObj.getReportId());
							shiftWiseSliterWinderProdDetailsF017Repository.save(detail);
						}

						List<SliterWinderListF017> list1 = details.getSliterWinderDetails();

						for (SliterWinderListF017 detail : list1) {

							if (detail.getSwId() != null) {
								SliterWinderListF017 obj = sliterWinderListF017Repository
										.findFormById(detail.getSwId());
								detail.setCreatedAt(obj.getCreatedAt());
								detail.setCreatedBy(obj.getCreatedBy());
								sliterWinderListF017Repository.save(detail);
							}

							detail.setReportId(checkObj.getReportId());
							sliterWinderListF017Repository.save(detail);
						}

						checkObj.setReportDetails(list);
						checkObj.setSliterWinderDetails(list1);

						checkObj.setOperator_submitted_by(userName);
						checkObj.setOperator_submitted_on(date);
						checkObj.setOperator_submitted_id(userId);
						checkObj.setOperator_status(AppConstants.operatorApprove);
						checkObj.setOperator_sign(userName);

						checkObj.setSupervisor_status(AppConstants.waitingStatus);
						checkObj.setSupervisior_mail_status(AppConstants.waitingStatus);

//						checkObj.setHod_status(AppConstants.waitingStatus);
//						checkObj.setHod_mail_status(AppConstants.waitingStatus);

						checkObj.setHod_status("");
						checkObj.setHod_mail_status("");

						shiftWiseSliterWinderProdReportF017Repository.save(checkObj);

						// IMAGE

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);

						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

						checkObj.setOperator_signature_image(signature);

						shiftWiseSliterWinderProdReportF017Repository.save(checkObj); // ONE TABLE

						ShiftWiseSliterWinderProdReportHistoryF017 rejectionReportHistory = new ShiftWiseSliterWinderProdReportHistoryF017();

//						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						// getter setters fields & status

						rejectionReportHistory.setFormatName(checkObj.getFormatName());
						rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
						rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
						rejectionReportHistory.setRefSopNo(checkObj.getRefSopNo());
						rejectionReportHistory.setUnit(checkObj.getUnit());
						rejectionReportHistory.setDate(checkObj.getDate());
						rejectionReportHistory.setShift(checkObj.getShift());
						rejectionReportHistory.setOrderNo(checkObj.getOrderNo());
						rejectionReportHistory.setMaterialCode(checkObj.getMaterialCode());
						rejectionReportHistory.setProductName(checkObj.getProductName());
						rejectionReportHistory.setStdGsm(checkObj.getStdGsm());
						rejectionReportHistory.setPattern(checkObj.getPattern());

						// status
						rejectionReportHistory.setOperator_submitted_by(checkObj.getOperator_submitted_by());
						rejectionReportHistory.setOperator_submitted_id(checkObj.getOperator_submitted_id());
						rejectionReportHistory.setOperator_submitted_on(checkObj.getOperator_submitted_on());
						rejectionReportHistory.setOperator_status(checkObj.getOperator_status());
						rejectionReportHistory.setOperator_sign(checkObj.getOperator_sign());
						rejectionReportHistory.setOperator_signature_image(checkObj.getOperator_signature_image());

						rejectionReportHistory.setSupervisor_status(checkObj.getSupervisor_status());
						rejectionReportHistory.setHod_status(checkObj.getHod_status());

						// version
						String date1 = rejectionReportHistory.getDate();

						String shift1 = rejectionReportHistory.getShift();

						String orderNo1 = rejectionReportHistory.getOrderNo();

						int version = shiftWiseSliterWinderProdReportHistoryF017Repo
								.getMaximumVersion(date1, shift1, orderNo1).map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						shiftWiseSliterWinderProdReportHistoryF017Repo.save(rejectionReportHistory); // ONE HISTORY

						List<ShiftWiseSliterWinderProdDetailsF017> historyMapList = checkObj.getReportDetails();

						for (ShiftWiseSliterWinderProdDetailsF017 obj : historyMapList) {

							ShiftWiseSliterWinderProdDetailsHistoryF017 objHistory = new ShiftWiseSliterWinderProdDetailsHistoryF017();

							BeanUtils.copyProperties(obj, objHistory);
							objHistory.setReportId(rejectionReportHistory.getReportId());
							shiftWiseSliterWinderProdDetailsHistoryF017Repo.save(objHistory);

						}

						List<SliterWinderListF017> historyMapList1 = checkObj.getSliterWinderDetails();

						for (SliterWinderListF017 obj : historyMapList1) {

							SliterWinderListHistoryF017 objHistory = new SliterWinderListHistoryF017();

							BeanUtils.copyProperties(obj, objHistory);
							objHistory.setReportId(rejectionReportHistory.getReportId());
							sliterWinderListHistoryF017Repo.save(objHistory);

						}

						// MAIL SENDING - NEED TO IMPLEMENT

						try {

							spunlacemailfunction.sendEmailToSupervisorF017(checkObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
								HttpStatus.BAD_REQUEST);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, " Invalid Status."), HttpStatus.BAD_REQUEST);
				}
			} else {

				if (!role.equals("ROLE_OPERATOR")) {
					return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = details;

				shiftWiseSliterWinderProdReportF017Repository.save(checkObj);

				List<ShiftWiseSliterWinderProdDetailsF017> list = details.getReportDetails();

				for (ShiftWiseSliterWinderProdDetailsF017 detail : list) {

					if (detail.getDetailId() != null) {
						ShiftWiseSliterWinderProdDetailsF017 obj = shiftWiseSliterWinderProdDetailsF017Repository
								.findFormById(detail.getDetailId());
						detail.setCreatedAt(obj.getCreatedAt());
						detail.setCreatedBy(obj.getCreatedBy());
						shiftWiseSliterWinderProdDetailsF017Repository.save(detail);
					}

					detail.setReportId(checkObj.getReportId());
					shiftWiseSliterWinderProdDetailsF017Repository.save(detail);
				}

				List<SliterWinderListF017> list1 = details.getSliterWinderDetails();

				for (SliterWinderListF017 detail : list1) {

					if (detail.getSwId() != null) {
						SliterWinderListF017 obj = sliterWinderListF017Repository.findFormById(detail.getSwId());
						detail.setCreatedAt(obj.getCreatedAt());
						detail.setCreatedBy(obj.getCreatedBy());
						sliterWinderListF017Repository.save(detail);
					}

					detail.setReportId(checkObj.getReportId());
					sliterWinderListF017Repository.save(detail);
				}

				checkObj.setReportDetails(list);
				checkObj.setSliterWinderDetails(list1);

				checkObj.setOperator_submitted_by(userName);
				checkObj.setOperator_submitted_on(date);
				checkObj.setOperator_submitted_id(userId);
				checkObj.setOperator_status(AppConstants.operatorApprove);
				checkObj.setOperator_sign(userName);

				checkObj.setSupervisor_status(AppConstants.waitingStatus);
				checkObj.setSupervisior_mail_status(AppConstants.waitingStatus);

//				checkObj.setHod_status(AppConstants.waitingStatus);
//				checkObj.setHod_mail_status(AppConstants.waitingStatus);

				checkObj.setHod_status("");
				checkObj.setHod_mail_status("");

				shiftWiseSliterWinderProdReportF017Repository.save(checkObj);

				// IMAGE

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				checkObj.setOperator_signature_image(signature);

				shiftWiseSliterWinderProdReportF017Repository.save(checkObj); // ONE TABLE

				ShiftWiseSliterWinderProdReportHistoryF017 rejectionReportHistory = new ShiftWiseSliterWinderProdReportHistoryF017();

//				BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				// getter setters fields & status

				rejectionReportHistory.setFormatName(checkObj.getFormatName());
				rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
				rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
				rejectionReportHistory.setRefSopNo(checkObj.getRefSopNo());
				rejectionReportHistory.setUnit(checkObj.getUnit());
				rejectionReportHistory.setDate(checkObj.getDate());
				rejectionReportHistory.setShift(checkObj.getShift());
				rejectionReportHistory.setOrderNo(checkObj.getOrderNo());
				rejectionReportHistory.setMaterialCode(checkObj.getMaterialCode());
				rejectionReportHistory.setProductName(checkObj.getProductName());
				rejectionReportHistory.setStdGsm(checkObj.getStdGsm());
				rejectionReportHistory.setPattern(checkObj.getPattern());

				// status
				rejectionReportHistory.setOperator_submitted_by(checkObj.getOperator_submitted_by());
				rejectionReportHistory.setOperator_submitted_id(checkObj.getOperator_submitted_id());
				rejectionReportHistory.setOperator_submitted_on(checkObj.getOperator_submitted_on());
				rejectionReportHistory.setOperator_status(checkObj.getOperator_status());
				rejectionReportHistory.setOperator_sign(checkObj.getOperator_sign());
				rejectionReportHistory.setOperator_signature_image(checkObj.getOperator_signature_image());

				rejectionReportHistory.setSupervisor_status(checkObj.getSupervisor_status());
				rejectionReportHistory.setHod_status(checkObj.getHod_status());

				// version
				String date1 = rejectionReportHistory.getDate();

				String shift1 = rejectionReportHistory.getShift();

				String orderNo1 = rejectionReportHistory.getOrderNo();

				int version = shiftWiseSliterWinderProdReportHistoryF017Repo.getMaximumVersion(date1, shift1, orderNo1)
						.map(temp -> temp + 1).orElse(1);

				rejectionReportHistory.setVersion(version);

				shiftWiseSliterWinderProdReportHistoryF017Repo.save(rejectionReportHistory); // ONE HISTORY

				List<ShiftWiseSliterWinderProdDetailsF017> historyMapList = checkObj.getReportDetails();

				for (ShiftWiseSliterWinderProdDetailsF017 obj : historyMapList) {

					ShiftWiseSliterWinderProdDetailsHistoryF017 objHistory = new ShiftWiseSliterWinderProdDetailsHistoryF017();

					BeanUtils.copyProperties(obj, objHistory);
					objHistory.setReportId(rejectionReportHistory.getReportId());
					shiftWiseSliterWinderProdDetailsHistoryF017Repo.save(objHistory);

				}

				List<SliterWinderListF017> historyMapList1 = checkObj.getSliterWinderDetails();

				for (SliterWinderListF017 obj : historyMapList1) {

					SliterWinderListHistoryF017 objHistory = new SliterWinderListHistoryF017();

					BeanUtils.copyProperties(obj, objHistory);
					objHistory.setReportId(rejectionReportHistory.getReportId());
					sliterWinderListHistoryF017Repo.save(objHistory);

				}

//				MAIL SENDING - NEED TO IMPLEMENT

				try {

					spunlacemailfunction.sendEmailToSupervisorF017(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
							HttpStatus.OK);
				}
			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);

//		return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	public ResponseEntity<?> approveRejectionF017(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		ShiftWiseSliterWinderProdReportF017 object = new ShiftWiseSliterWinderProdReportF017();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = shiftWiseSliterWinderProdReportF017Repository.findFormById(approvalResponse.getId());

			ShiftWiseSliterWinderProdReportHistoryF017 objHistory = new ShiftWiseSliterWinderProdReportHistoryF017();

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

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						shiftWiseSliterWinderProdReportF017Repository.save(object);

						objHistory = shiftWiseSliterWinderProdReportHistoryF017Repo
								.fetchLastSubmittedRecord(object.getDate(), object.getShift(), object.getOrderNo());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						shiftWiseSliterWinderProdReportHistoryF017Repo.save(objHistory);

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

						shiftWiseSliterWinderProdReportF017Repository.save(object);

						objHistory = shiftWiseSliterWinderProdReportHistoryF017Repo
								.fetchLastSubmittedRecord(object.getDate(), object.getShift(), object.getOrderNo());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						shiftWiseSliterWinderProdReportHistoryF017Repo.save(objHistory);

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

						shiftWiseSliterWinderProdReportF017Repository.save(object);

						objHistory = shiftWiseSliterWinderProdReportHistoryF017Repo
								.fetchLastSubmittedRecord(object.getDate(), object.getShift(), object.getOrderNo());

						objHistory.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						objHistory.setSupervisor_submit_on(date);
						objHistory.setSupervisor_submit_by(userName);
						objHistory.setSupervisor_submit_id(userId);
						objHistory.setSupervisor_sign(userName);

						objHistory.setHod_status(AppConstants.waitingStatus);

						shiftWiseSliterWinderProdReportHistoryF017Repo.save(objHistory);

						try {

							spunlacemailfunction.sendEmailToHodF017(object);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
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

						shiftWiseSliterWinderProdReportF017Repository.save(object);

						objHistory = shiftWiseSliterWinderProdReportHistoryF017Repo
								.fetchLastSubmittedRecord(object.getDate(), object.getShift(), object.getOrderNo());

//						bleachLayDownCheckListF42History = dailyRejectionReportF007RepositoryHistory
//								.fetchLastSubmittedRecord(bleachContRawCottonF05.getDate(),
//										bleachContRawCottonF05.getShift(), bleachContRawCottonF05.getOrderNo());

						objHistory.setReason(reason);
						objHistory.setSupervisor_status(AppConstants.supervisorRejectedStatus);
						objHistory.setSupervisor_submit_on(date);
						objHistory.setSupervisor_submit_by(userName);
						objHistory.setSupervisor_submit_id(userId);
						objHistory.setSupervisor_sign(userName);

						shiftWiseSliterWinderProdReportHistoryF017Repo.save(objHistory);

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
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	public ResponseEntity<?> getByDateShiftOrderNoF017(String date, String shift, String orderNo) {
		try {

			ShiftWiseSliterWinderProdReportF017 list = shiftWiseSliterWinderProdReportF017Repository
					.findByDateShiftOrderNo(date, shift, orderNo);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getByDateShiftOrderNoPrintApiF017(String date, String shift, String orderNo) {
		try {

			ShiftWiseSliterWinderProdReportF017 list = shiftWiseSliterWinderProdReportF017Repository
					.findByDateShiftOrderNoPrintApi(date, shift, orderNo);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getSummaryF017(HttpServletRequest http) {

		List<ShiftWiseSliterWinderProdReportF017> details = new ArrayList<>();
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_OPERATOR")) {

				details = shiftWiseSliterWinderProdReportF017Repository.operatorSummary();

			} else if (userRole.equals("ROLE_SUPERVISOR") || userRole.equals("ROLE_HOD")
					|| userRole.equals("ROLE_DESIGNEE")) {

				details = shiftWiseSliterWinderProdReportF017Repository.supervisorHodSummary();
			}

//			else if (userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {
//
//				details = shiftWiseSliterWinderProdReportF017Repository.hodSummary();
//			} 
			else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
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
