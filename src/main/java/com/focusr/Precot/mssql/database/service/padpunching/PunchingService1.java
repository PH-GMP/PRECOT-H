package com.focusr.Precot.mssql.database.service.padpunching;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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
import com.focusr.Precot.mssql.database.model.padpunching.BagMakingSpecificationDetailsF014;
import com.focusr.Precot.mssql.database.model.padpunching.DailyProdPackingDetailsF004;
import com.focusr.Precot.mssql.database.model.padpunching.DailyProdPackingDetailsLineF004;
import com.focusr.Precot.mssql.database.model.padpunching.DailyRollConsumptionReportF002;
import com.focusr.Precot.mssql.database.model.padpunching.MachineCleaningCheckListF005;
import com.focusr.Precot.mssql.database.model.padpunching.MachineDetailsF002;
import com.focusr.Precot.mssql.database.model.padpunching.MetalDetectorCheckList007;
import com.focusr.Precot.mssql.database.model.padpunching.ProcessProductControlDetailsLineF014;
import com.focusr.Precot.mssql.database.model.padpunching.RollConsumptionDetailsF002;
import com.focusr.Precot.mssql.database.model.padpunching.StoppageDetailsF002;
import com.focusr.Precot.mssql.database.model.padpunching.audit.BagMakingSpecificationDetailsHistoryF014;
import com.focusr.Precot.mssql.database.model.padpunching.audit.DailyProdPackingDetailsHistoryF004;
import com.focusr.Precot.mssql.database.model.padpunching.audit.DailyProdPackingDetailsLineHistoryF004;
import com.focusr.Precot.mssql.database.model.padpunching.audit.DailyRollConsumptionReportHistoryF002;
import com.focusr.Precot.mssql.database.model.padpunching.audit.MachineCleaningCheckListHistoryF005;
import com.focusr.Precot.mssql.database.model.padpunching.audit.MachineDetailsHistoryF002;
import com.focusr.Precot.mssql.database.model.padpunching.audit.MetalDetectorCheckList007History;
import com.focusr.Precot.mssql.database.model.padpunching.audit.ProcessProductControlDetailsLineHistoryF014;
import com.focusr.Precot.mssql.database.model.padpunching.audit.RollConsumptionDetailsHistoryF002;
import com.focusr.Precot.mssql.database.model.padpunching.audit.StoppageDetailsHistoryF002;
import com.focusr.Precot.mssql.database.repository.UserImageDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.padpunching.BagMakingSpecificationDetailsF014Repository;
import com.focusr.Precot.mssql.database.repository.padpunching.DailyProdPackingDetailsLineRepositoryF004;
import com.focusr.Precot.mssql.database.repository.padpunching.DailyProdPackingDetailsRepositoryF004;
import com.focusr.Precot.mssql.database.repository.padpunching.DailyRollConsumptionReportRepositoryF002;
import com.focusr.Precot.mssql.database.repository.padpunching.MachineCleaningCheckListRepositoryF005;
import com.focusr.Precot.mssql.database.repository.padpunching.MachineDetailsRepositoryF002;
import com.focusr.Precot.mssql.database.repository.padpunching.MetalDetectorCheckList007Repository;
import com.focusr.Precot.mssql.database.repository.padpunching.ProcessProductControlDetailsLineF014Repository;
import com.focusr.Precot.mssql.database.repository.padpunching.RollConsumptionDetailsRepositoryF002;
import com.focusr.Precot.mssql.database.repository.padpunching.StoppageDetailsRepositoryF002;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.BagMakingSpecificationDetailsHistoryF014Repository;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.DailyProdPackingDetailsHistoryRepositoryF004;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.DailyProdPackingDetailsLineHistoryRepositoryF004;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.DailyRollConsumptionReportHistoryRepositoryF002;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.MachineCleaningCheckListHistoryRepositoryF005;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.MachineDetailsHistoryRepositoryF002;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.MetalDetectorCheckList007HistoryRepo;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.ProcessProductControlDetailsLineHistoryF014Repository;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.RollConsumptionDetailsHistoryRepositoryF002;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.StoppageDetailsHistoryRepositoryF002;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.IdAndValuePair;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.padpunching.PadPunchingMailFunction;

/*
 * F007
 * F014
 * F004
 * F005
 * F002
 */

@Service
public class PunchingService1 {

	Logger log = LoggerFactory.getLogger(PunchingService1.class);

	@Autowired
	JwtTokenProvider tokenProvider;

	@Autowired
	private SCAUtil scaUtil;

	@Autowired
	private UserImageDetailsRepository imageRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private MetalDetectorCheckList007Repository metalDetectorCheckList007Repository;

	@Autowired
	private MetalDetectorCheckList007HistoryRepo metalDetectorCheckList007HistoryRepo;

	@Autowired
	private BagMakingSpecificationDetailsF014Repository bagMakingSpecificationDetailsF014Repository;

	@Autowired
	private ProcessProductControlDetailsLineF014Repository processProductControlDetailsLineF014Repository;

	@Autowired
	private BagMakingSpecificationDetailsHistoryF014Repository bagMakingSpecificationDetailsHistoryF014Repository;

	@Autowired
	private ProcessProductControlDetailsLineHistoryF014Repository processProductControlDetailsLineHistoryF014Repository;

	@Autowired
	private DailyProdPackingDetailsRepositoryF004 dailyProdPackingDetailsRepositoryF004;

	@Autowired
	private DailyProdPackingDetailsLineRepositoryF004 dailyProdPackingDetailsLineRepositoryF004;

	@Autowired
	private DailyProdPackingDetailsHistoryRepositoryF004 dailyProdPackingDetailsHistoryRepositoryF004;

	@Autowired
	private DailyProdPackingDetailsLineHistoryRepositoryF004 dailyProdPackingDetailsLineHistoryRepositoryF004;

	@Autowired
	private MachineCleaningCheckListRepositoryF005 machineCleaningCheckListRepositoryF005;

	@Autowired
	private MachineCleaningCheckListHistoryRepositoryF005 machineCleaningCheckListHistoryRepositoryF005;

	@Autowired
	private DailyRollConsumptionReportRepositoryF002 dailyRollConsumptionReportRepositoryF002;

	@Autowired
	private MachineDetailsRepositoryF002 machineDetailsRepositoryF002;

	@Autowired
	private RollConsumptionDetailsRepositoryF002 rollConsumptionDetailsRepositoryF002;

	@Autowired
	private StoppageDetailsRepositoryF002 stoppageDetailsRepositoryF002;

	@Autowired
	private DailyRollConsumptionReportHistoryRepositoryF002 dailyRollConsumptionReportHistoryRepositoryF002;

	@Autowired
	private MachineDetailsHistoryRepositoryF002 machineDetailsHistoryRepositoryF002;

	@Autowired
	private RollConsumptionDetailsHistoryRepositoryF002 rollConsumptionDetailsHistoryRepositoryF002;

	@Autowired
	private StoppageDetailsHistoryRepositoryF002 stoppageDetailsHistoryRepositoryF002;

	@Autowired
	private PadPunchingMailFunction padPunchingMailFunction;

//	========================================== F007 ==================================================

	public ResponseEntity<?> SaveMetalDetectorCheckList(MetalDetectorCheckList007 details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		MetalDetectorCheckList007 listObj = null;
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

				listObj = metalDetectorCheckList007Repository.findFormById(details.getListId());

				String[] IgnoreProps = { "listId", "createdBy", "createdAt", "supervisor_status", "supervisor_save_on",
						"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign", "hod_status", "hod_submit_on", "hod_submit_by",
						"hod_submit_id", "hod_sign", "supervisor_signature_image", "hod_signature_image" };

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

					metalDetectorCheckList007Repository.save(listObj);

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

					metalDetectorCheckList007Repository.save(listObj);

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

	public ResponseEntity<?> SubmitMetalDetectorCheckList(MetalDetectorCheckList007 details, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getListId();

		MetalDetectorCheckList007 checkObj = new MetalDetectorCheckList007();

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

				checkObj = metalDetectorCheckList007Repository.findFormById(id);

				String[] IgnoreProps = { "listId", "createdBy", "createdAt", "supervisor_status", "supervisor_save_on",
						"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign", "hod_status", "hod_submit_on", "hod_submit_by",
						"hod_submit_id", "hod_sign", "supervisor_signature_image", "hod_signature_image" };

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

						metalDetectorCheckList007Repository.save(checkObj);

						// IMAGE

//						Optional<UserImageDetails> imageDetailsOpt = imageRepository
//								.fetchItemDetailsByUsername(userName);
//
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//
//						checkObj.setSupervisor_signature_image(signature);
//
//						metalDetectorCheckList007Repository.save(checkObj);

						MetalDetectorCheckList007History rejectionReportHistory = new MetalDetectorCheckList007History();

						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						String date1 = rejectionReportHistory.getDate();

						int version = metalDetectorCheckList007HistoryRepo.getMaximumVersion(date1)
								.map(temp -> temp + 1).orElse(1);
						;

						rejectionReportHistory.setVersion(version);

						metalDetectorCheckList007HistoryRepo.save(rejectionReportHistory);

//                    Mail logic

						try {

							padPunchingMailFunction.sendEmailToHodF007(checkObj);
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

				metalDetectorCheckList007Repository.save(checkObj);

				// IMAGE

//				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//
//				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//
//				checkObj.setSupervisor_signature_image(signature);
//
//				metalDetectorCheckList007Repository.save(checkObj);

				MetalDetectorCheckList007History rejectionReportHistory = new MetalDetectorCheckList007History();

				BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				String date1 = rejectionReportHistory.getDate();

				int version = metalDetectorCheckList007HistoryRepo.getMaximumVersion(date1).map(temp -> temp + 1)
						.orElse(1);
				;

				rejectionReportHistory.setVersion(version);

				metalDetectorCheckList007HistoryRepo.save(rejectionReportHistory);

//				Mail logic

				try {

					padPunchingMailFunction.sendEmailToHodF007(checkObj);
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

	public ResponseEntity<?> approveRejectionF007(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		MetalDetectorCheckList007 object = new MetalDetectorCheckList007();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = metalDetectorCheckList007Repository.findFormById(approvalResponse.getId());

			MetalDetectorCheckList007History objHistory = new MetalDetectorCheckList007History();

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

//						Optional<UserImageDetails> imageDetailsOpt = imageRepository
//								.fetchItemDetailsByUsername(userName);
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						metalDetectorCheckList007Repository.save(object);

						objHistory = metalDetectorCheckList007HistoryRepo.fetchLastSubmittedRecord(object.getDate());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						metalDetectorCheckList007HistoryRepo.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						object.setReason(reason);
						object.setHod_status(AppConstants.hodRejectedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);

//						Optional<UserImageDetails> imageDetailsOpt = imageRepository
//								.fetchItemDetailsByUsername(userName);
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						metalDetectorCheckList007Repository.save(object);

						objHistory = metalDetectorCheckList007HistoryRepo.fetchLastSubmittedRecord(object.getDate());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						metalDetectorCheckList007HistoryRepo.save(objHistory);

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

	public ResponseEntity<?> getByDateF007(String date) {
		try {

			MetalDetectorCheckList007 list = metalDetectorCheckList007Repository.findByDate(date);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> findByMonthPrintApiF007(String month, String year) {
		try {

			List<MetalDetectorCheckList007> list = metalDetectorCheckList007Repository.findByMonthPrintApi(month, year);

			if (list == null) {

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

		List<MetalDetectorCheckList007> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_SUPERVISOR")) {

				details = metalDetectorCheckList007Repository.supervisorSummary();
			}

			else if (userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {

				details = metalDetectorCheckList007Repository.hodSummary();
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

//	========================================== F014 ==================================================

	public ResponseEntity<?> SaveBagMakingF014(BagMakingSpecificationDetailsF014 details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		BagMakingSpecificationDetailsF014 listObj = null;
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

			if (details.getBagId() != null) {

				listObj = bagMakingSpecificationDetailsF014Repository.findFormById(details.getBagId());

				String[] IgnoreProps = { "bagId", "createdBy", "createdAt", "operator_status", "operator_save_by",
						"operator_save_on", "operator_save_id", "operator_submitted_by", "operator_submitted_on",
						"operator_submitted_id", "operator_sign", "hod_status", "hod_submit_on", "hod_submit_by",
						"hod_submit_id", "hod_sign", "hod_signature_image", "operator_signature_image" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

				if (role.equals("ROLE_OPERATOR")) {

					if (listObj.getOperator_status().equals(AppConstants.operatorApprove)) {
						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
								HttpStatus.BAD_REQUEST);
					}

					bagMakingSpecificationDetailsF014Repository.save(listObj);

					List<ProcessProductControlDetailsLineF014> list = details.getDetails();

					for (ProcessProductControlDetailsLineF014 detail : list) {
						detail.setBagId(listObj.getBagId());
						processProductControlDetailsLineF014Repository.save(detail);
					}

					listObj.setDetails(list);

					listObj.setOperator_save_by(userName);
					listObj.setOperator_save_on(date);
					listObj.setOperator_save_id(userId);
					listObj.setOperator_status(AppConstants.operatorSave);

					bagMakingSpecificationDetailsF014Repository.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + "cannot save details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (role.equals("ROLE_OPERATOR")) {

					listObj = details;

					bagMakingSpecificationDetailsF014Repository.save(listObj);

					List<ProcessProductControlDetailsLineF014> list = details.getDetails();

					for (ProcessProductControlDetailsLineF014 detail : list) {
						detail.setBagId(listObj.getBagId());
						processProductControlDetailsLineF014Repository.save(detail);
					}

					listObj.setDetails(list);

					listObj.setOperator_save_by(userName);
					listObj.setOperator_save_on(date);
					listObj.setOperator_save_id(userId);
					listObj.setOperator_status(AppConstants.operatorSave);

					bagMakingSpecificationDetailsF014Repository.save(listObj);

				} else {

					return new ResponseEntity(new ApiResponse(false, role + "cannot save details"),
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

	public ResponseEntity<?> SubmitBagMakingF014(BagMakingSpecificationDetailsF014 details, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getBagId();

		BagMakingSpecificationDetailsF014 checkObj = new BagMakingSpecificationDetailsF014();

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

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = bagMakingSpecificationDetailsF014Repository.findFormById(id);

				String[] IgnoreProps = { "bagId", "createdBy", "createdAt", "operator_status", "operator_save_by",
						"operator_save_on", "operator_save_id", "operator_submitted_by", "operator_submitted_on",
						"operator_submitted_id", "operator_sign", "hod_status", "hod_submit_on", "hod_submit_by",
						"hod_submit_id", "hod_sign", "hod_signature_image", "operator_signature_image" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (!checkObj.getOperator_status().equals(AppConstants.operatorApprove)
						|| checkObj.getHod_status().equals(AppConstants.hodRejectedStatus)) {
					if (role.equals("ROLE_OPERATOR")) {

						bagMakingSpecificationDetailsF014Repository.save(checkObj);

						List<ProcessProductControlDetailsLineF014> list = details.getDetails();

						for (ProcessProductControlDetailsLineF014 detail : list) {
							detail.setBagId(checkObj.getBagId());
							processProductControlDetailsLineF014Repository.save(detail);
						}

						checkObj.setDetails(list);

						checkObj.setOperator_submitted_by(userName);
						checkObj.setOperator_submitted_on(date);
						checkObj.setOperator_submitted_id(userId);
						checkObj.setOperator_status(AppConstants.operatorApprove);
						checkObj.setOperator_sign(userName);

						checkObj.setHod_status(AppConstants.waitingStatus);

						bagMakingSpecificationDetailsF014Repository.save(checkObj);

						// IMAGE

//						Optional<UserImageDetails> imageDetailsOpt = imageRepository
//								.fetchItemDetailsByUsername(userName);
//
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//
//						checkObj.setOperator_signature_image(signature);
//
//						bagMakingSpecificationDetailsF014Repository.save(checkObj); // ONE TABLE

						BagMakingSpecificationDetailsHistoryF014 rejectionReportHistory = new BagMakingSpecificationDetailsHistoryF014();

//						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						// getter setters fields & status

						rejectionReportHistory.setFormatName(checkObj.getFormatName());
						rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
						rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
						rejectionReportHistory.setRefSopNo(checkObj.getRefSopNo());
						rejectionReportHistory.setUnit(checkObj.getUnit());
						rejectionReportHistory.setDate(checkObj.getDate());
						rejectionReportHistory.setShift(checkObj.getShift());
						rejectionReportHistory.setMachineName(checkObj.getMachineName());
						rejectionReportHistory.setProductName(checkObj.getProductName());
						rejectionReportHistory.setRemarks(checkObj.getRemarks());

						// status
						rejectionReportHistory.setOperator_submitted_by(checkObj.getOperator_submitted_by());
						rejectionReportHistory.setOperator_submitted_id(checkObj.getOperator_submitted_id());
						rejectionReportHistory.setOperator_submitted_on(checkObj.getOperator_submitted_on());
						rejectionReportHistory.setOperator_status(checkObj.getOperator_status());
						rejectionReportHistory.setOperator_sign(checkObj.getOperator_sign());
						rejectionReportHistory.setOperator_signature_image(checkObj.getOperator_signature_image());

						rejectionReportHistory.setHod_status(checkObj.getHod_status());

						// version
						String date1 = rejectionReportHistory.getDate();

						String shift1 = rejectionReportHistory.getShift();

						String machineName = rejectionReportHistory.getMachineName();

						String productName = rejectionReportHistory.getProductName();

						int version = bagMakingSpecificationDetailsHistoryF014Repository
								.getMaximumVersion(date1, shift1, machineName, productName).map(temp -> temp + 1)
								.orElse(1);

						rejectionReportHistory.setVersion(version);

						bagMakingSpecificationDetailsHistoryF014Repository.save(rejectionReportHistory); // ONE HISTORY

						List<ProcessProductControlDetailsLineF014> historyMapList = checkObj.getDetails();

						for (ProcessProductControlDetailsLineF014 obj : historyMapList) {

							ProcessProductControlDetailsLineHistoryF014 objHistory = new ProcessProductControlDetailsLineHistoryF014();

							BeanUtils.copyProperties(obj, objHistory);
							objHistory.setId(rejectionReportHistory.getId());
							processProductControlDetailsLineHistoryF014Repository.save(objHistory);

						}

						bagMakingSpecificationDetailsHistoryF014Repository.save(rejectionReportHistory);

						try {

							padPunchingMailFunction.sendEmailToHodF014(checkObj);
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

				bagMakingSpecificationDetailsF014Repository.save(checkObj);

				List<ProcessProductControlDetailsLineF014> list = details.getDetails();

				for (ProcessProductControlDetailsLineF014 detail : list) {
					detail.setBagId(checkObj.getBagId());
					processProductControlDetailsLineF014Repository.save(detail);
				}

				checkObj.setDetails(list);

				checkObj.setOperator_submitted_by(userName);
				checkObj.setOperator_submitted_on(date);
				checkObj.setOperator_submitted_id(userId);
				checkObj.setOperator_status(AppConstants.operatorApprove);
				checkObj.setOperator_sign(userName);

				checkObj.setHod_status(AppConstants.waitingStatus);

				bagMakingSpecificationDetailsF014Repository.save(checkObj);

				// IMAGE

//				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//
//				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//
//				checkObj.setOperator_signature_image(signature);
//
//				bagMakingSpecificationDetailsF014Repository.save(checkObj); // ONE TABLE

				BagMakingSpecificationDetailsHistoryF014 rejectionReportHistory = new BagMakingSpecificationDetailsHistoryF014();

//				BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				// getter setters fields & status

				rejectionReportHistory.setFormatName(checkObj.getFormatName());
				rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
				rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
				rejectionReportHistory.setRefSopNo(checkObj.getRefSopNo());
				rejectionReportHistory.setUnit(checkObj.getUnit());
				rejectionReportHistory.setDate(checkObj.getDate());
				rejectionReportHistory.setShift(checkObj.getShift());
				rejectionReportHistory.setMachineName(checkObj.getMachineName());
				rejectionReportHistory.setProductName(checkObj.getProductName());
				rejectionReportHistory.setRemarks(checkObj.getRemarks());

				// status
				rejectionReportHistory.setOperator_submitted_by(checkObj.getOperator_submitted_by());
				rejectionReportHistory.setOperator_submitted_id(checkObj.getOperator_submitted_id());
				rejectionReportHistory.setOperator_submitted_on(checkObj.getOperator_submitted_on());
				rejectionReportHistory.setOperator_status(checkObj.getOperator_status());
				rejectionReportHistory.setOperator_sign(checkObj.getOperator_sign());
				rejectionReportHistory.setOperator_signature_image(checkObj.getOperator_signature_image());

				rejectionReportHistory.setHod_status(checkObj.getHod_status());

				// version
				String date1 = rejectionReportHistory.getDate();

				String shift1 = rejectionReportHistory.getShift();

				String machineName = rejectionReportHistory.getMachineName();

				String productName = rejectionReportHistory.getProductName();

				int version = bagMakingSpecificationDetailsHistoryF014Repository
						.getMaximumVersion(date1, shift1, machineName, productName).map(temp -> temp + 1).orElse(1);

				rejectionReportHistory.setVersion(version);

				bagMakingSpecificationDetailsHistoryF014Repository.save(rejectionReportHistory); // ONE HISTORY

				List<ProcessProductControlDetailsLineF014> historyMapList = checkObj.getDetails();

				for (ProcessProductControlDetailsLineF014 obj : historyMapList) {

					ProcessProductControlDetailsLineHistoryF014 objHistory = new ProcessProductControlDetailsLineHistoryF014();

					BeanUtils.copyProperties(obj, objHistory);
					objHistory.setId(rejectionReportHistory.getId());
					processProductControlDetailsLineHistoryF014Repository.save(objHistory);

				}

				bagMakingSpecificationDetailsHistoryF014Repository.save(rejectionReportHistory);

				try {

					padPunchingMailFunction.sendEmailToHodF014(checkObj);
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

		return new ResponseEntity(new ApiResponse(true, "Operator Submitted Sucessfully"), HttpStatus.OK);

//		return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	public ResponseEntity<?> approveRejectionF014(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		BagMakingSpecificationDetailsF014 object = new BagMakingSpecificationDetailsF014();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = bagMakingSpecificationDetailsF014Repository.findFormById(approvalResponse.getId());

			BagMakingSpecificationDetailsHistoryF014 objHistory = new BagMakingSpecificationDetailsHistoryF014();

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

//						Optional<UserImageDetails> imageDetailsOpt = imageRepository
//								.fetchItemDetailsByUsername(userName);
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						bagMakingSpecificationDetailsF014Repository.save(object);

						objHistory = bagMakingSpecificationDetailsHistoryF014Repository.fetchLastSubmittedRecord(
								object.getDate(), object.getShift(), object.getMachineName(), object.getProductName());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						bagMakingSpecificationDetailsHistoryF014Repository.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						object.setReason(reason);
						object.setHod_status(AppConstants.hodRejectedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);

//						Optional<UserImageDetails> imageDetailsOpt = imageRepository
//								.fetchItemDetailsByUsername(userName);
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						bagMakingSpecificationDetailsF014Repository.save(object);

						objHistory = bagMakingSpecificationDetailsHistoryF014Repository.fetchLastSubmittedRecord(
								object.getDate(), object.getShift(), object.getMachineName(), object.getProductName());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						bagMakingSpecificationDetailsHistoryF014Repository.save(objHistory);

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

	public ResponseEntity<?> getByDateShiftF014(String date, String shift, String machineName, String productName) {
		try {

			BagMakingSpecificationDetailsF014 list = bagMakingSpecificationDetailsF014Repository.findByDateShift(date,
					shift, machineName, productName);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getByDateShiftPrintApiF014(String date, String shift) {
		try {

			List<BagMakingSpecificationDetailsF014> list = bagMakingSpecificationDetailsF014Repository
					.findByDateShiftPrintApi(date, shift);

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

	public ResponseEntity<?> getBagMakingSpecificationSummaryF014(HttpServletRequest http) {

		List<BagMakingSpecificationDetailsF014> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_OPERATOR")) {

				details = bagMakingSpecificationDetailsF014Repository.operatorSummary();
			}

			else if (userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {

				details = bagMakingSpecificationDetailsF014Repository.hodSummary();
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

	
		// CR
	
public ResponseEntity<?> productNameLOV() {
		
		List<String> productNameList = new ArrayList<String>();
		
		List<IdAndValuePair> productPairList = new ArrayList<IdAndValuePair>();
		
		try {
			
			productNameList =  bagMakingSpecificationDetailsF014Repository.productNamelistSAP();
			
			Long id = (long) 1;
			
			for(String temp : productNameList) {
				
				IdAndValuePair value = new IdAndValuePair();
				value.setValue(temp);
				value.setId(id);
				
				productPairList.add(value);
				
				id++;
			}
			
		} catch(Exception ex) {
			
			SCAUtil sca = new SCAUtil();
			
			log.error(" *** !!! Unable to fetch Product Name !!! ***" + ex);
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Unable to get Product Name List !!!" + ex.getMessage()));
			
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(productPairList);
		
	}

public ResponseEntity<?> productNamesBags() {
	
	List<String> productNameList = new ArrayList<String>();
	
	List<IdAndValuePair> productPairList = new ArrayList<IdAndValuePair>();
	
	try {
		
		productNameList =  bagMakingSpecificationDetailsF014Repository.productNamesBags();
		
		Long id = (long) 1;
		
		for(String temp : productNameList) {
			
			IdAndValuePair value = new IdAndValuePair();
			value.setValue(temp);
			value.setId(id);
			
			productPairList.add(value);
			
			id++;
		}
		
	} catch(Exception ex) {
		
		SCAUtil sca = new SCAUtil();
		
		log.error(" *** !!! Unable to fetch Product Name !!! ***" + ex);
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Unable to get Product Name List !!!" + ex.getMessage()));
		
	}
	
	return ResponseEntity.status(HttpStatus.OK).body(productPairList);
	
}
	
	
//	========================================== F004 ==================================================

	public ResponseEntity<?> SubmitPackingDetails(DailyProdPackingDetailsF004 details, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getDetailId();

		DailyProdPackingDetailsF004 checkObj = new DailyProdPackingDetailsF004();

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

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = dailyProdPackingDetailsRepositoryF004.findFormById(id);

				String[] IgnoreProps = { "detailId", "createdBy", "createdAt", "supervisor_status",
						"supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
						"supervisor_submit_by", "supervisor_submit_id", "supervisor_sign", "hod_status",
						"hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign", "supervisor_signature_image",
						"hod_signature_image" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (!checkObj.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)
						|| checkObj.getHod_status().equals(AppConstants.hodRejectedStatus)) {
					if (role.equals("ROLE_SUPERVISOR")) {

						dailyProdPackingDetailsRepositoryF004.save(checkObj);

						List<DailyProdPackingDetailsLineF004> list = details.getDetails();

						for (DailyProdPackingDetailsLineF004 detail : list) {
							detail.setDetailId(checkObj.getDetailId());
							dailyProdPackingDetailsLineRepositoryF004.save(detail);
						}

						checkObj.setDetails(list);

						checkObj.setSupervisor_submit_by(userName);
						checkObj.setSupervisor_submit_on(date);
						checkObj.setSupervisor_submit_id(userId);
						checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						checkObj.setSupervisor_sign(userName);

						checkObj.setHod_status(AppConstants.waitingStatus);

						dailyProdPackingDetailsRepositoryF004.save(checkObj);

						// IMAGE

//						Optional<UserImageDetails> imageDetailsOpt = imageRepository
//								.fetchItemDetailsByUsername(userName);
//
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//
//						checkObj.setOperator_signature_image(signature);
//
//						bagMakingSpecificationDetailsF014Repository.save(checkObj); // ONE TABLE

						DailyProdPackingDetailsHistoryF004 rejectionReportHistory = new DailyProdPackingDetailsHistoryF004();

						// getter setters fields & status
						rejectionReportHistory.setFormatName(checkObj.getFormatName());
						rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
						rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
						rejectionReportHistory.setRefSopNo(checkObj.getRefSopNo());
						rejectionReportHistory.setUnit(checkObj.getUnit());
						rejectionReportHistory.setDate(checkObj.getDate());
						rejectionReportHistory.setShift(checkObj.getShift());
						rejectionReportHistory.setDepartment(checkObj.getDepartment());
						rejectionReportHistory.setNoOfCartonPacked(checkObj.getNoOfCartonPacked());
						rejectionReportHistory.setNoOfBagsPacked(checkObj.getNoOfBagsPacked());
						rejectionReportHistory.setRemarks(checkObj.getRemarks());

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

						int version = dailyProdPackingDetailsHistoryRepositoryF004.getMaximumVersion(date1, shift1)
								.map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						dailyProdPackingDetailsHistoryRepositoryF004.save(rejectionReportHistory); // ONE HISTORY

						List<DailyProdPackingDetailsLineF004> historyMapList = checkObj.getDetails();

						for (DailyProdPackingDetailsLineF004 obj : historyMapList) {

							DailyProdPackingDetailsLineHistoryF004 objHistory = new DailyProdPackingDetailsLineHistoryF004();

							BeanUtils.copyProperties(obj, objHistory);
							objHistory.setHistoryId(rejectionReportHistory.getHistoryId());
							dailyProdPackingDetailsLineHistoryRepositoryF004.save(objHistory);

						}

						dailyProdPackingDetailsHistoryRepositoryF004.save(rejectionReportHistory);

						try {

							padPunchingMailFunction.sendEmailToHodF004(checkObj);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
									HttpStatus.OK);
						}

					} else {
						return new ResponseEntity(new ApiResponse(false, role + " cannot submit details"),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, " Invalid status."), HttpStatus.BAD_REQUEST);
				}
			} else {

				if (!role.equals("ROLE_SUPERVISOR")) {
					return new ResponseEntity(new ApiResponse(false, role + " cannot submit details"),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = details;

				dailyProdPackingDetailsRepositoryF004.save(checkObj);

				List<DailyProdPackingDetailsLineF004> list = details.getDetails();

				for (DailyProdPackingDetailsLineF004 detail : list) {
					detail.setDetailId(checkObj.getDetailId());
					dailyProdPackingDetailsLineRepositoryF004.save(detail);
				}

				checkObj.setDetails(list);

				checkObj.setSupervisor_submit_by(userName);
				checkObj.setSupervisor_submit_on(date);
				checkObj.setSupervisor_submit_id(userId);
				checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
				checkObj.setSupervisor_sign(userName);

				checkObj.setHod_status(AppConstants.waitingStatus);

				dailyProdPackingDetailsRepositoryF004.save(checkObj);

				// IMAGE

//				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//
//				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//
//				checkObj.setSupervisor_signature_image(signature);
//
//				dailyProdPackingDetailsRepositoryF004.save(checkObj); // ONE TABLE

				DailyProdPackingDetailsHistoryF004 rejectionReportHistory = new DailyProdPackingDetailsHistoryF004();

				// getter setters fields & status

				rejectionReportHistory.setFormatName(checkObj.getFormatName());
				rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
				rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
				rejectionReportHistory.setRefSopNo(checkObj.getRefSopNo());
				rejectionReportHistory.setUnit(checkObj.getUnit());
				rejectionReportHistory.setDate(checkObj.getDate());
				rejectionReportHistory.setShift(checkObj.getShift());
				rejectionReportHistory.setDepartment(checkObj.getDepartment());
				rejectionReportHistory.setNoOfCartonPacked(checkObj.getNoOfCartonPacked());
				rejectionReportHistory.setNoOfBagsPacked(checkObj.getNoOfBagsPacked());
				rejectionReportHistory.setRemarks(checkObj.getRemarks());

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

				int version = dailyProdPackingDetailsHistoryRepositoryF004.getMaximumVersion(date1, shift1)
						.map(temp -> temp + 1).orElse(1);

				rejectionReportHistory.setVersion(version);

				dailyProdPackingDetailsHistoryRepositoryF004.save(rejectionReportHistory); // ONE HISTORY

				List<DailyProdPackingDetailsLineF004> historyMapList = checkObj.getDetails();

				for (DailyProdPackingDetailsLineF004 obj : historyMapList) {

					DailyProdPackingDetailsLineHistoryF004 objHistory = new DailyProdPackingDetailsLineHistoryF004();

					BeanUtils.copyProperties(obj, objHistory);
					objHistory.setHistoryId(rejectionReportHistory.getHistoryId());
					dailyProdPackingDetailsLineHistoryRepositoryF004.save(objHistory);

				}

				dailyProdPackingDetailsHistoryRepositoryF004.save(rejectionReportHistory);

				try {

					padPunchingMailFunction.sendEmailToHodF004(checkObj);
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

		return new ResponseEntity(new ApiResponse(true, "Supervisor Submitted Sucessfully"), HttpStatus.OK);

	}

	public ResponseEntity<?> approveRejectionF004(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		DailyProdPackingDetailsF004 object = new DailyProdPackingDetailsF004();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = dailyProdPackingDetailsRepositoryF004.findFormById(approvalResponse.getId());

			DailyProdPackingDetailsHistoryF004 objHistory = new DailyProdPackingDetailsHistoryF004();

			String supervisorStatus = object.getSupervisor_status();

			String hodStatus = object.getHod_status();

			UserImageDetails imageDetails = new UserImageDetails();

			if (supervisorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
					&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setHod_status(AppConstants.hodApprovedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);

//						Optional<UserImageDetails> imageDetailsOpt = imageRepository
//								.fetchItemDetailsByUsername(userName);
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						dailyProdPackingDetailsRepositoryF004.save(object);

						objHistory = dailyProdPackingDetailsHistoryRepositoryF004
								.fetchLastSubmittedRecord(object.getDate(), object.getShift());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						dailyProdPackingDetailsHistoryRepositoryF004.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						object.setReason(reason);
						object.setHod_status(AppConstants.hodRejectedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);

//						Optional<UserImageDetails> imageDetailsOpt = imageRepository
//								.fetchItemDetailsByUsername(userName);
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						dailyProdPackingDetailsRepositoryF004.save(object);

						objHistory = dailyProdPackingDetailsHistoryRepositoryF004
								.fetchLastSubmittedRecord(object.getDate(), object.getShift());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						dailyProdPackingDetailsHistoryRepositoryF004.save(objHistory);

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

	public ResponseEntity<?> getByDateShiftF004(String date, String shift) {
		try {

			DailyProdPackingDetailsF004 list = dailyProdPackingDetailsRepositoryF004.findByDateShift(date, shift);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getByDatePrintApiF004(String date) {
		try {

			List<DailyProdPackingDetailsF004> list = dailyProdPackingDetailsRepositoryF004.findByDatePrintApi(date);

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

	public ResponseEntity<?> getPackingDetailsSummaryF004(HttpServletRequest http) {

		List<DailyProdPackingDetailsF004> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_SUPERVISOR") || userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {

				details = dailyProdPackingDetailsRepositoryF004.supervisorHodSummary();
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

//	========================================== F005 ==================================================

	public ResponseEntity<?> SaveMachineCleaningCheckList(MachineCleaningCheckListF005 details,
			HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		MachineCleaningCheckListF005 listObj = null;
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
//			if (details.getShift() == null)
//				value = "shift";
			if (details.getMachineName() == null)
				value = "MachineName";

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

				listObj = machineCleaningCheckListRepositoryF005.findFormById(details.getListId());

				String[] IgnoreProps = { "listId", "createdBy", "createdAt", "supervisor_status", "supervisor_save_on",
						"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign", "hod_status", "hod_submit_on", "hod_submit_by",
						"hod_submit_id", "hod_sign", "supervisor_signature_image", "hod_signature_image" };

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

					machineCleaningCheckListRepositoryF005.save(listObj);

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

					machineCleaningCheckListRepositoryF005.save(listObj);

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

	public ResponseEntity<?> SubmitMachineCleaningCheckList(MachineCleaningCheckListF005 details,
			HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getListId();

		MachineCleaningCheckListF005 checkObj = new MachineCleaningCheckListF005();

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
//			if (details.getShift() == null)
//				value = "shift";
			if (details.getMachineName() == null)
				value = "MachineName";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = machineCleaningCheckListRepositoryF005.findFormById(id);

				String[] IgnoreProps = { "listId", "createdBy", "createdAt", "supervisor_status", "supervisor_save_on",
						"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
						"supervisor_submit_id", "supervisor_sign", "hod_status", "hod_submit_on", "hod_submit_by",
						"hod_submit_id", "hod_sign", "supervisor_signature_image", "hod_signature_image" };

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

						machineCleaningCheckListRepositoryF005.save(checkObj);

						// IMAGE

//						Optional<UserImageDetails> imageDetailsOpt = imageRepository
//								.fetchItemDetailsByUsername(userName);
//
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//
//						checkObj.setSupervisor_signature_image(signature);
//
//						metalDetectorCheckList007Repository.save(checkObj);

						MachineCleaningCheckListHistoryF005 rejectionReportHistory = new MachineCleaningCheckListHistoryF005();

						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						String date1 = rejectionReportHistory.getDate();

//						String shift = rejectionReportHistory.getShift();

						String machineName = rejectionReportHistory.getMachineName();

						int version = machineCleaningCheckListHistoryRepositoryF005
								.getMaximumVersion(date1, machineName).map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						machineCleaningCheckListHistoryRepositoryF005.save(rejectionReportHistory);

//                    Mail logic

						try {

							padPunchingMailFunction.sendEmailToHodF005(checkObj);
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

				machineCleaningCheckListRepositoryF005.save(checkObj);

				// IMAGE

//				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//
//				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//
//				checkObj.setSupervisor_signature_image(signature);
//
//				machineCleaningCheckListRepositoryF005.save(checkObj);

				MachineCleaningCheckListHistoryF005 rejectionReportHistory = new MachineCleaningCheckListHistoryF005();

				BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				String date1 = rejectionReportHistory.getDate();

//				String shift = rejectionReportHistory.getShift();

				String machineName = rejectionReportHistory.getMachineName();

				int version = machineCleaningCheckListHistoryRepositoryF005.getMaximumVersion(date1, machineName)
						.map(temp -> temp + 1).orElse(1);

				rejectionReportHistory.setVersion(version);

				machineCleaningCheckListHistoryRepositoryF005.save(rejectionReportHistory);

//				Mail logic

				try {

					padPunchingMailFunction.sendEmailToHodF005(checkObj);
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

	public ResponseEntity<?> approveRejectionF005(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		MachineCleaningCheckListF005 object = new MachineCleaningCheckListF005();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = machineCleaningCheckListRepositoryF005.findFormById(approvalResponse.getId());

			MachineCleaningCheckListHistoryF005 objHistory = new MachineCleaningCheckListHistoryF005();

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

//						Optional<UserImageDetails> imageDetailsOpt = imageRepository
//								.fetchItemDetailsByUsername(userName);
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						machineCleaningCheckListRepositoryF005.save(object);

						objHistory = machineCleaningCheckListHistoryRepositoryF005
								.fetchLastSubmittedRecord(object.getDate(), object.getMachineName());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						machineCleaningCheckListHistoryRepositoryF005.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						object.setReason(reason);
						object.setHod_status(AppConstants.hodRejectedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);

//						Optional<UserImageDetails> imageDetailsOpt = imageRepository
//								.fetchItemDetailsByUsername(userName);
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						machineCleaningCheckListRepositoryF005.save(object);

						objHistory = machineCleaningCheckListHistoryRepositoryF005
								.fetchLastSubmittedRecord(object.getDate(), object.getMachineName());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						machineCleaningCheckListHistoryRepositoryF005.save(objHistory);

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

	public ResponseEntity<?> getByDateMachineF005(String date, String machineName) {
		try {

			MachineCleaningCheckListF005 list = machineCleaningCheckListRepositoryF005.findByDate(date, machineName);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> findByMonthPrintApiF005(String month, String year) {
		try {

			List<MachineCleaningCheckListF005> list = machineCleaningCheckListRepositoryF005.findByMonthPrintApi(month,
					year);

			if (list == null || list.isEmpty()) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			
			Map<String, List<MachineCleaningCheckListF005>> groupedByMachine = list.stream()
					.collect(Collectors.groupingBy(MachineCleaningCheckListF005::getMachineName));

			// Converting the grouped map to a list of lists
			List<List<MachineCleaningCheckListF005>> responseList = new ArrayList<>(groupedByMachine.values());

			return new ResponseEntity<>(responseList, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getMachineCleaningSummary(HttpServletRequest http) {

		List<MachineCleaningCheckListF005> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_SUPERVISOR")) {

				details = machineCleaningCheckListRepositoryF005.supervisorSummary();
			}

			else if (userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {

				details = machineCleaningCheckListRepositoryF005.hodSummary();
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

//	========================================== F002 ==================================================

	public ResponseEntity<?> SaveRollConsumptionDetailsF002(DailyRollConsumptionReportF002 details,
			HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		DailyRollConsumptionReportF002 listObj = null;
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
			if (details.getMachineName() == null)
				value = "MachineName";

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

				listObj = dailyRollConsumptionReportRepositoryF002.findFormById(details.getReportId());

				String[] IgnoreProps = { "bagId", "createdBy", "createdAt", "operator_status", "operator_save_by",
						"operator_save_on", "operator_save_id", "operator_submitted_by", "operator_submitted_on",
						"operator_submitted_id", "operator_sign", "hod_status", "hod_submit_on", "hod_submit_by",
						"hod_submit_id", "hod_sign", "hod_signature_image", "operator_signature_image",
						"supervisor_status", "supervisor_submit_on", "supervisor_submit_by", "supervisor_submit_id",
						"supervisor_sign", "supervisor_signature_image" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

				if (role.equals("ROLE_OPERATOR")) {

					if (listObj.getOperator_status().equals(AppConstants.operatorApprove)) {
						return new ResponseEntity(new ApiResponse(false, "No access to save details."),
								HttpStatus.BAD_REQUEST);
					}

					dailyRollConsumptionReportRepositoryF002.save(listObj);

					List<MachineDetailsF002> list = details.getMachineDetails();

					for (MachineDetailsF002 detail : list) {
						detail.setReportId(listObj.getReportId());
						machineDetailsRepositoryF002.save(detail);
					}

					listObj.setMachineDetails(list);

					List<RollConsumptionDetailsF002> list1 = details.getRollConsumptionDetails();

					for (RollConsumptionDetailsF002 detail : list1) {
						detail.setReportId(listObj.getReportId());
						rollConsumptionDetailsRepositoryF002.save(detail);
					}

					listObj.setRollConsumptionDetails(list1);

					List<StoppageDetailsF002> list2 = details.getStoppageDetails();

					for (StoppageDetailsF002 detail : list2) {
						detail.setReportId(listObj.getReportId());
						stoppageDetailsRepositoryF002.save(detail);
					}

					listObj.setStoppageDetails(list2);

					listObj.setOperator_save_by(userName);
					listObj.setOperator_save_on(date);
					listObj.setOperator_save_id(userId);
					listObj.setOperator_status(AppConstants.operatorSave);

					dailyRollConsumptionReportRepositoryF002.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + "cannot save details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (role.equals("ROLE_OPERATOR")) {

					listObj = details;

					dailyRollConsumptionReportRepositoryF002.save(listObj);

					List<MachineDetailsF002> list = details.getMachineDetails();

					for (MachineDetailsF002 detail : list) {
						detail.setReportId(listObj.getReportId());
						machineDetailsRepositoryF002.save(detail);
					}

					listObj.setMachineDetails(list);

					List<RollConsumptionDetailsF002> list1 = details.getRollConsumptionDetails();

					for (RollConsumptionDetailsF002 detail : list1) {
						detail.setReportId(listObj.getReportId());
						rollConsumptionDetailsRepositoryF002.save(detail);
					}

					listObj.setRollConsumptionDetails(list1);

					List<StoppageDetailsF002> list2 = details.getStoppageDetails();

					for (StoppageDetailsF002 detail : list2) {
						detail.setReportId(listObj.getReportId());
						stoppageDetailsRepositoryF002.save(detail);
					}

					listObj.setStoppageDetails(list2);

					listObj.setOperator_save_by(userName);
					listObj.setOperator_save_on(date);
					listObj.setOperator_save_id(userId);
					listObj.setOperator_status(AppConstants.operatorSave);

					dailyRollConsumptionReportRepositoryF002.save(listObj);

				} else {

					return new ResponseEntity(new ApiResponse(false, role + " cannot save details"),
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

	public ResponseEntity<?> SubmitRollConsumptionDetailsF002(DailyRollConsumptionReportF002 details,
			HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getReportId();

		DailyRollConsumptionReportF002 checkObj = new DailyRollConsumptionReportF002();

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
			if (details.getMachineName() == null)
				value = "MachineName";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = dailyRollConsumptionReportRepositoryF002.findFormById(id);

				String[] IgnoreProps = { "bagId", "createdBy", "createdAt", "operator_status", "operator_save_by",
						"operator_save_on", "operator_save_id", "operator_submitted_by", "operator_submitted_on",
						"operator_submitted_id", "operator_sign", "hod_status", "hod_submit_on", "hod_submit_by",
						"hod_submit_id", "hod_sign", "hod_signature_image", "operator_signature_image",
						"supervisor_status", "supervisor_submit_on", "supervisor_submit_by", "supervisor_submit_id",
						"supervisor_sign", "supervisor_signature_image" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				if (!checkObj.getOperator_status().equals(AppConstants.operatorApprove)
						|| checkObj.getSupervisor_status().equals(AppConstants.supervisorRejectedStatus)
						|| checkObj.getHod_status().equals(AppConstants.hodRejectedStatus)) {
					if (role.equals("ROLE_OPERATOR")) {

						dailyRollConsumptionReportRepositoryF002.save(checkObj);

						List<MachineDetailsF002> list = details.getMachineDetails();

						for (MachineDetailsF002 detail : list) {
							detail.setReportId(checkObj.getReportId());
							machineDetailsRepositoryF002.save(detail);
						}

						checkObj.setMachineDetails(list);

						List<RollConsumptionDetailsF002> list1 = details.getRollConsumptionDetails();

						for (RollConsumptionDetailsF002 detail : list1) {
							detail.setReportId(checkObj.getReportId());
							rollConsumptionDetailsRepositoryF002.save(detail);
						}

						checkObj.setRollConsumptionDetails(list1);

						List<StoppageDetailsF002> list2 = details.getStoppageDetails();

						for (StoppageDetailsF002 detail : list2) {
							detail.setReportId(checkObj.getReportId());
							stoppageDetailsRepositoryF002.save(detail);
						}

						checkObj.setStoppageDetails(list2);

						checkObj.setOperator_submitted_by(userName);
						checkObj.setOperator_submitted_on(date);
						checkObj.setOperator_submitted_id(userId);
						checkObj.setOperator_status(AppConstants.operatorApprove);
						checkObj.setOperator_sign(userName);

						checkObj.setSupervisor_status(AppConstants.waitingStatus);
						checkObj.setHod_status("");

						dailyRollConsumptionReportRepositoryF002.save(checkObj);

						// IMAGE

//						Optional<UserImageDetails> imageDetailsOpt = imageRepository
//								.fetchItemDetailsByUsername(userName);
//
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//
//						checkObj.setOperator_signature_image(signature);
//
//						bagMakingSpecificationDetailsF014Repository.save(checkObj); // ONE TABLE

						DailyRollConsumptionReportHistoryF002 rejectionReportHistory = new DailyRollConsumptionReportHistoryF002();

						// getter setters fields & status

						rejectionReportHistory.setFormatName(checkObj.getFormatName());
						rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
						rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
						rejectionReportHistory.setRefSopNo(checkObj.getRefSopNo());
						rejectionReportHistory.setUnit(checkObj.getUnit());
						rejectionReportHistory.setDate(checkObj.getDate());
						rejectionReportHistory.setShift(checkObj.getShift());
						rejectionReportHistory.setMachineName(checkObj.getMachineName());
						rejectionReportHistory.setProdDetailsInBags(checkObj.getProdDetailsInBags());
						rejectionReportHistory.setRemarks(checkObj.getRemarks());

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

						String machineName = rejectionReportHistory.getMachineName();

						int version = dailyRollConsumptionReportHistoryRepositoryF002
								.getMaximumVersion(date1, shift1, machineName).map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						dailyRollConsumptionReportHistoryRepositoryF002.save(rejectionReportHistory); // ONE HISTORY

						List<MachineDetailsF002> historyMapList = checkObj.getMachineDetails();

						for (MachineDetailsF002 obj : historyMapList) {

							MachineDetailsHistoryF002 objHistory = new MachineDetailsHistoryF002();

							BeanUtils.copyProperties(obj, objHistory);
							objHistory.setHistoryId(rejectionReportHistory.getHistoryId());
							machineDetailsHistoryRepositoryF002.save(objHistory);

						}

						List<RollConsumptionDetailsF002> historyMapList1 = checkObj.getRollConsumptionDetails();

						for (RollConsumptionDetailsF002 obj : historyMapList1) {

							RollConsumptionDetailsHistoryF002 objHistory = new RollConsumptionDetailsHistoryF002();

							BeanUtils.copyProperties(obj, objHistory);
							objHistory.setHistoryId(rejectionReportHistory.getHistoryId());
							rollConsumptionDetailsHistoryRepositoryF002.save(objHistory);

						}

						List<StoppageDetailsF002> historyMapList2 = checkObj.getStoppageDetails();

						for (StoppageDetailsF002 obj : historyMapList2) {

							StoppageDetailsHistoryF002 objHistory = new StoppageDetailsHistoryF002();

							BeanUtils.copyProperties(obj, objHistory);
							objHistory.setHistoryId(rejectionReportHistory.getHistoryId());
							stoppageDetailsHistoryRepositoryF002.save(objHistory);

						}

						dailyRollConsumptionReportHistoryRepositoryF002.save(rejectionReportHistory);

						try {

							padPunchingMailFunction.sendEmailToSupervisorF002(checkObj);
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

				dailyRollConsumptionReportRepositoryF002.save(checkObj);

				List<MachineDetailsF002> list = details.getMachineDetails();

				for (MachineDetailsF002 detail : list) {
					detail.setReportId(checkObj.getReportId());
					machineDetailsRepositoryF002.save(detail);
				}

				checkObj.setMachineDetails(list);

				List<RollConsumptionDetailsF002> list1 = details.getRollConsumptionDetails();

				for (RollConsumptionDetailsF002 detail : list1) {
					detail.setReportId(checkObj.getReportId());
					rollConsumptionDetailsRepositoryF002.save(detail);
				}

				checkObj.setRollConsumptionDetails(list1);

				List<StoppageDetailsF002> list2 = details.getStoppageDetails();

				for (StoppageDetailsF002 detail : list2) {
					detail.setReportId(checkObj.getReportId());
					stoppageDetailsRepositoryF002.save(detail);
				}

				checkObj.setStoppageDetails(list2);

				checkObj.setOperator_submitted_by(userName);
				checkObj.setOperator_submitted_on(date);
				checkObj.setOperator_submitted_id(userId);
				checkObj.setOperator_status(AppConstants.operatorApprove);
				checkObj.setOperator_sign(userName);

				checkObj.setSupervisor_status(AppConstants.waitingStatus);
				checkObj.setHod_status("");

				dailyRollConsumptionReportRepositoryF002.save(checkObj);

				// IMAGE

//				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//
//				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//
//				checkObj.setOperator_signature_image(signature);
//
//				bagMakingSpecificationDetailsF014Repository.save(checkObj); // ONE TABLE

				DailyRollConsumptionReportHistoryF002 rejectionReportHistory = new DailyRollConsumptionReportHistoryF002();

				rejectionReportHistory.setFormatName(checkObj.getFormatName());
				rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
				rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
				rejectionReportHistory.setRefSopNo(checkObj.getRefSopNo());
				rejectionReportHistory.setUnit(checkObj.getUnit());
				rejectionReportHistory.setDate(checkObj.getDate());
				rejectionReportHistory.setShift(checkObj.getShift());
				rejectionReportHistory.setMachineName(checkObj.getMachineName());
				rejectionReportHistory.setProdDetailsInBags(checkObj.getProdDetailsInBags());
				rejectionReportHistory.setRemarks(checkObj.getRemarks());

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

				String machineName = rejectionReportHistory.getMachineName();

				int version = dailyRollConsumptionReportHistoryRepositoryF002
						.getMaximumVersion(date1, shift1, machineName).map(temp -> temp + 1).orElse(1);

				rejectionReportHistory.setVersion(version);

				dailyRollConsumptionReportHistoryRepositoryF002.save(rejectionReportHistory); // ONE HISTORY

				List<MachineDetailsF002> historyMapList = checkObj.getMachineDetails();

				for (MachineDetailsF002 obj : historyMapList) {

					MachineDetailsHistoryF002 objHistory = new MachineDetailsHistoryF002();

					BeanUtils.copyProperties(obj, objHistory);
					objHistory.setHistoryId(rejectionReportHistory.getHistoryId());
					machineDetailsHistoryRepositoryF002.save(objHistory);

				}

				List<RollConsumptionDetailsF002> historyMapList1 = checkObj.getRollConsumptionDetails();

				for (RollConsumptionDetailsF002 obj : historyMapList1) {

					RollConsumptionDetailsHistoryF002 objHistory = new RollConsumptionDetailsHistoryF002();

					BeanUtils.copyProperties(obj, objHistory);
					objHistory.setHistoryId(rejectionReportHistory.getHistoryId());
					rollConsumptionDetailsHistoryRepositoryF002.save(objHistory);

				}

				List<StoppageDetailsF002> historyMapList2 = checkObj.getStoppageDetails();

				for (StoppageDetailsF002 obj : historyMapList2) {

					StoppageDetailsHistoryF002 objHistory = new StoppageDetailsHistoryF002();

					BeanUtils.copyProperties(obj, objHistory);
					objHistory.setHistoryId(rejectionReportHistory.getHistoryId());
					stoppageDetailsHistoryRepositoryF002.save(objHistory);

				}

				dailyRollConsumptionReportHistoryRepositoryF002.save(rejectionReportHistory);

				try {

					padPunchingMailFunction.sendEmailToSupervisorF002(checkObj);
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

		return new ResponseEntity(new ApiResponse(true, "Operator Submitted Sucessfully"), HttpStatus.OK);

//		return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	public ResponseEntity<?> approveRejectionF002(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		DailyRollConsumptionReportF002 object = new DailyRollConsumptionReportF002();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = dailyRollConsumptionReportRepositoryF002.findFormById(approvalResponse.getId());

			DailyRollConsumptionReportHistoryF002 objHistory = new DailyRollConsumptionReportHistoryF002();

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

//						Optional<UserImageDetails> imageDetailsOpt = imageRepository
//								.fetchItemDetailsByUsername(userName);
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						dailyRollConsumptionReportRepositoryF002.save(object);

						objHistory = dailyRollConsumptionReportHistoryRepositoryF002
								.fetchLastSubmittedRecord(object.getDate(), object.getShift(), object.getMachineName());

						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						dailyRollConsumptionReportHistoryRepositoryF002.save(objHistory);

						return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();

						object.setReason(reason);
						object.setHod_status(AppConstants.hodRejectedStatus);
						object.setHod_submit_on(date);
						object.setHod_submit_by(userName);
						object.setHod_submit_id(userId);

//						Optional<UserImageDetails> imageDetailsOpt = imageRepository
//								.fetchItemDetailsByUsername(userName);
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						object.setHod_signature_image(signature);

						object.setHod_sign(userName);

						dailyRollConsumptionReportRepositoryF002.save(object);

						objHistory = dailyRollConsumptionReportHistoryRepositoryF002
								.fetchLastSubmittedRecord(object.getDate(), object.getShift(), object.getMachineName());

						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setHod_submit_on(date);
						objHistory.setHod_submit_by(userName);
						objHistory.setHod_submit_id(userId);
						objHistory.setHod_sign(userName);

						dailyRollConsumptionReportHistoryRepositoryF002.save(objHistory);

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

//						Optional<UserImageDetails> imageDetailsOpt = imageRepository
//								.fetchItemDetailsByUsername(userName);
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						object.setSupervisor_signature_image(signature);
						
						
//						PROD 
						 String attendBy = approvalResponse.getAttendBy();
			                String remark = approvalResponse.getRemark();

			                // Find existing StoppageDetailsF002 using the parent ID and update the fields for rejection

			                Optional<StoppageDetailsF002> stoppageDetailsOpt = stoppageDetailsRepositoryF002.findFormById(approvalResponse.getId());

			                if (stoppageDetailsOpt.isPresent()) {
			                    // Update the existing record
			                    StoppageDetailsF002 stoppageDetails = stoppageDetailsOpt.get();
			                    stoppageDetails.setAttendBy(attendBy);
			                    stoppageDetails.setRemarks(remark);

			                    // Save the updated record
			                    stoppageDetailsRepositoryF002.save(stoppageDetails);
			                } else {
			                    // Handle the case where no record exists (create a new one)
			                    StoppageDetailsF002 stoppageDetails = new StoppageDetailsF002();
			                    
			                    // Set parent entity and other fields
			                    DailyRollConsumptionReportF002 parent = dailyRollConsumptionReportRepositoryF002.findFormById(approvalResponse.getId());
			                    

			                    stoppageDetails.setAttendBy(attendBy);
			                    stoppageDetails.setRemarks(remark);

			                    // Save the new record
			                    stoppageDetailsRepositoryF002.save(stoppageDetails);
			                }

						
						

						object.setSupervisor_sign(userName);

						dailyRollConsumptionReportRepositoryF002.save(object);

						objHistory = dailyRollConsumptionReportHistoryRepositoryF002
								.fetchLastSubmittedRecord(object.getDate(), object.getShift(), object.getMachineName());

						objHistory.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						objHistory.setSupervisor_submit_on(date);
						objHistory.setSupervisor_submit_by(userName);
						objHistory.setSupervisor_submit_id(userId);
						objHistory.setSupervisor_sign(userName);
						objHistory.setHod_status(AppConstants.waitingStatus);

						dailyRollConsumptionReportHistoryRepositoryF002.save(objHistory);

						try {

							padPunchingMailFunction.sendEmailToHodF002(object);
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

//						Optional<UserImageDetails> imageDetailsOpt = imageRepository
//								.fetchItemDetailsByUsername(userName);
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						object.setSupervisor_signature_image(signature);
						
						
						
//						PROD 
						 String attendBy = approvalResponse.getAttendBy();
			                String remark = approvalResponse.getRemark();

			                // Find existing StoppageDetailsF002 using the parent ID and update the fields for rejection

			                Optional<StoppageDetailsF002> stoppageDetailsOpt = stoppageDetailsRepositoryF002.findFormById(approvalResponse.getId());

			                if (stoppageDetailsOpt.isPresent()) {
			                    // Update the existing record
			                    StoppageDetailsF002 stoppageDetails = stoppageDetailsOpt.get();
			                    stoppageDetails.setAttendBy(attendBy);
			                    stoppageDetails.setRemarks(remark);

			                    // Save the updated record
			                    stoppageDetailsRepositoryF002.save(stoppageDetails);
			                } else {
			                    // Handle the case where no record exists (create a new one)
			                    StoppageDetailsF002 stoppageDetails = new StoppageDetailsF002();
			                    
			                    // Set parent entity and other fields
			                    DailyRollConsumptionReportF002 parent = dailyRollConsumptionReportRepositoryF002.findFormById(approvalResponse.getId());
			                    

			                    stoppageDetails.setAttendBy(attendBy);
			                    stoppageDetails.setRemarks(remark);

			                    // Save the new record
			                    stoppageDetailsRepositoryF002.save(stoppageDetails);
			                }

						object.setSupervisor_sign(userName);

						dailyRollConsumptionReportRepositoryF002.save(object);

						objHistory = dailyRollConsumptionReportHistoryRepositoryF002
								.fetchLastSubmittedRecord(object.getDate(), object.getShift(), object.getMachineName());

//						bleachLayDownCheckListF42History = dailyRejectionReportF007RepositoryHistory
//								.fetchLastSubmittedRecord(bleachContRawCottonF05.getDate(),
//										bleachContRawCottonF05.getShift(), bleachContRawCottonF05.getOrderNo());

						objHistory.setReason(reason);
						objHistory.setSupervisor_status(AppConstants.supervisorRejectedStatus);
						objHistory.setSupervisor_submit_on(date);
						objHistory.setSupervisor_submit_by(userName);
						objHistory.setSupervisor_submit_id(userId);
						objHistory.setSupervisor_sign(userName);

						dailyRollConsumptionReportHistoryRepositoryF002.save(objHistory);

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

	public ResponseEntity<?> getByDateShiftMachineF002(String date, String shift, String machineName) {
		try {

			DailyRollConsumptionReportF002 list = dailyRollConsumptionReportRepositoryF002.findByDateShiftMachine(date,
					shift, machineName);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getByDateShiftMachinePrintApiF002(String date, String shift, String machineName) {
		try {

			List<DailyRollConsumptionReportF002> list = dailyRollConsumptionReportRepositoryF002
					.findByDateShiftPrintApi(date, shift, machineName);

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

	public ResponseEntity<?> getDailyRollConsumptionSummaryF002(HttpServletRequest http) {

		List<DailyRollConsumptionReportF002> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_OPERATOR")) {

				details = dailyRollConsumptionReportRepositoryF002.operatorSummary();
			}

			else if (userRole.equals("ROLE_SUPERVISOR") || userRole.equals("ROLE_HOD")
					|| userRole.equals("ROLE_DESIGNEE")) {

				details = dailyRollConsumptionReportRepositoryF002.supervisorHodSummary();
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

//	============================================================================================================================

	private String getUserRole() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst()
					.orElse(null);
		}
		return null;
	}

}
