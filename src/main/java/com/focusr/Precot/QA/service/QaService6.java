package com.focusr.Precot.QA.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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

import com.focusr.Precot.QA.model.MetalDetectorCalibrationRecord;
import com.focusr.Precot.QA.model.MetalDetectorCalibrationRecordLines;
import com.focusr.Precot.QA.model.MetalDetectorPassReport;
import com.focusr.Precot.QA.model.MetalDetectorPassReportLines;
import com.focusr.Precot.QA.model.TemplateForRecall;
import com.focusr.Precot.QA.model.TrainingRecord;
import com.focusr.Precot.QA.model.TrainingRecordLines;
import com.focusr.Precot.QA.model.audit.MetalDetectorCalibrationRecordHistory;
import com.focusr.Precot.QA.model.audit.MetalDetectorCalibrationRecordLinesHistory;
import com.focusr.Precot.QA.model.audit.MetalDetectorPassReportHistory;
import com.focusr.Precot.QA.model.audit.MetalDetectorPassReportLinesHistory;
import com.focusr.Precot.QA.model.audit.TemplateForRecallHistory;
import com.focusr.Precot.QA.payload.OnlineInspectionPadsPleatsRolls;
import com.focusr.Precot.QA.repository.MetalDetectorCalibrationRecordLinesRepository;
import com.focusr.Precot.QA.repository.MetalDetectorCalibrationRecordRepository;
import com.focusr.Precot.QA.repository.MetalDetectorPassReportLinesRepo;
import com.focusr.Precot.QA.repository.MetalDetectorPassReportRepo;
import com.focusr.Precot.QA.repository.TemplateForRecallRepo;
import com.focusr.Precot.QA.repository.TrainingRecordLineRepo;
import com.focusr.Precot.QA.repository.TrainingRecordRepo;
import com.focusr.Precot.QA.repository.audit.MetalDetectorCalibrationRecordHistoryRepository;
import com.focusr.Precot.QA.repository.audit.MetalDetectorCalibrationRecordLinesHistoryRepository;
import com.focusr.Precot.QA.repository.audit.MetalDetectorPassReportHistoryRepo;
import com.focusr.Precot.QA.repository.audit.MetalDetectorPassReportLinesHistoryRepo;
import com.focusr.Precot.QA.repository.audit.TemplateForRecallHistoryRepo;
import com.focusr.Precot.QA.util.QaAppConstants;
import com.focusr.Precot.QA.util.mail.QAMailFunction;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.IdAndValuePair;
import com.focusr.Precot.util.SCAUtil;

@Service
public class QaService6 {

	Logger log = LoggerFactory.getLogger(QaService1.class);

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private SCAUtil scaUtil;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TemplateForRecallRepo templateForRecallRepo;

	@Autowired
	private TemplateForRecallHistoryRepo templateForRecallHistoryRepo;

	@Autowired
	QAMailFunction qamailfunction;

	// NEW METAL DETECTOR CALIBRATION REPORT

	@Autowired
	private MetalDetectorCalibrationRecordRepository metalDetectorCalibrationRecordRepository;

	@Autowired
	private MetalDetectorCalibrationRecordLinesRepository metalDetectorCalibrationRecordLinesRepository;

	@Autowired
	private MetalDetectorCalibrationRecordHistoryRepository metalDetectorCalibrationRecordHistoryRepository;

	@Autowired
	private MetalDetectorCalibrationRecordLinesHistoryRepository metalDetectorCalibrationRecordLinesHistoryRepository;

	// METAL DETECTOR PASS REPORT

	@Autowired
	private MetalDetectorPassReportRepo metalDetectorPassReportRepo;

	@Autowired
	private MetalDetectorPassReportLinesRepo metalDetectorPassReportLinesRepo;

	@Autowired
	private MetalDetectorPassReportHistoryRepo metalDetectorPassReportHistoryRepo;

	@Autowired
	private MetalDetectorPassReportLinesHistoryRepo metalDetectorPassReportLinesHistoryRepo;

	// TRAINING RECORD

	@Autowired
	private TrainingRecordRepo trainingRecordRepo;

	@Autowired
	private TrainingRecordLineRepo trainingRecordLineRepo;

	// LOV

	public ResponseEntity<?> ProductDescription(String department) {

		List<String> orderProductResponse = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();

		try {

			if (department.equals("PadPunching")) {
				orderProductResponse = templateForRecallRepo.getPadpunching();

			} else if (department.equals("DryGoods")) {
				orderProductResponse = templateForRecallRepo.getDryGoods();

			}

			else if (department.equals("CottonBuds")) {
				orderProductResponse = templateForRecallRepo.getCottonBuds();

			}

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

	public ResponseEntity<?> Machine(String department) {

		List<String> orderProductResponse = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();

		try {

			if (department.equals("PadPunching")) {

				orderProductResponse = templateForRecallRepo.getMcnPadpunching();

			} else if (department.equals("DryGoods")) {

				orderProductResponse = templateForRecallRepo.getMcnDryGoods();

			}

			else if (department.equals("CottonBuds")) {

				orderProductResponse = templateForRecallRepo.getMcnCottonBuds();

			}

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

	// EQUIPMENT ID

	public ResponseEntity<?> getEquipmentId0() {

		List<String> orderProductResponse = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();

		try {

			orderProductResponse = templateForRecallRepo.getEquipmentID();

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

	public ResponseEntity<?> getEquipmentId() {
		List<String> orderProductResponse = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();

		try {
			orderProductResponse = templateForRecallRepo.getEquipmentID();

			if (!orderProductResponse.isEmpty()) {
				Long id = 1L;

				for (String order : orderProductResponse) {
					IdAndValuePair values = new IdAndValuePair();
					// Remove unwanted characters and trim
					String cleanedOrder = order.replace("\r", "").replace("\n", "").trim();
					values.setId(id);
					values.setType(cleanedOrder);
					values.setValue(cleanedOrder);

					responseList.add(values);
					id++;
				}
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();
			log.error("Error fetching Order Number Details with Pads category: " + msg);
			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to get Order Number Details with Pads category."),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}

	/// CODE

	public ResponseEntity<?> SaveTemplate(TemplateForRecall templateForRecall, HttpServletRequest http) {

		if (templateForRecall == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		TemplateForRecall listObj = null;

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (templateForRecall.getId() != null) {

				Long id = templateForRecall.getId();

				listObj = templateForRecallRepo.findFormById(id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt",

						"qa_inspector_status", "qa_inspector_saved_on", "qa_inspector_saved_by",
						"qa_inspector_saved_id", "qa_inspector_submitted_on", "qa_inspector_submitted_by",
						"qa_inspector_submitted_id", "qa_inspector_sign",

						"manager_status", "manager_submit_on", "manager_submit_by", "manager_submit_id",
						"manager_sign" };

				BeanUtils.copyProperties(templateForRecall, listObj, IgnoreProps);

				if (role.equals("ROLE_QA")) {

					listObj.setQa_inspector_saved_by(userName);
					listObj.setQa_inspector_saved_on(date);
					listObj.setQa_inspector_saved_id(userId);
					listObj.setQa_inspector_status(QaAppConstants.qaInspectorSave);
					listObj.setManager_status("");

					templateForRecallRepo.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				if (role.equals("ROLE_QA")) {

					listObj = templateForRecall;

					listObj.setQa_inspector_saved_by(userName);
					listObj.setQa_inspector_saved_on(date);
					listObj.setQa_inspector_saved_id(userId);
					listObj.setQa_inspector_status(QaAppConstants.qaInspectorSave);
					listObj.setManager_status("");

					templateForRecallRepo.save(listObj);

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

	// SUBMIT

	public ResponseEntity<?> SubmitTemplate(TemplateForRecall templateForRecall, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (templateForRecall == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = templateForRecall.getId();

		TemplateForRecall checkObj = new TemplateForRecall();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (templateForRecall.getFormatNo() == null)
				value = "formatNo";
			if (templateForRecall.getRefSopNo() == null)
				value = "SopNumber";
			if (templateForRecall.getRevisionNo() == null)
				value = "revisionNo";
			if (templateForRecall.getFormatName() == null)
				value = "formatName";
			if (templateForRecall.getDate() == null)
				value = "date";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = templateForRecallRepo.findFormById(id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt",

						"qa_inspector_status", "qa_inspector_saved_on", "qa_inspector_saved_by",
						"qa_inspector_saved_id", "qa_inspector_submitted_on", "qa_inspector_submitted_by",
						"qa_inspector_submitted_id", "qa_inspector_sign",

						"manager_status", "manager_submit_on", "manager_submit_by", "manager_submit_id",
						"manager_sign" };

				BeanUtils.copyProperties(templateForRecall, checkObj, IgnoreProps);

				String man = checkObj.getManager_status();

				if (!checkObj.getQa_inspector_status().equals(QaAppConstants.qaInspectorApprove)
						|| checkObj.getManager_status().equals(QaAppConstants.ManagerReject)) {

					if (role.equals("ROLE_QA")) {

						checkObj.setQa_inspector_submitted_by(userName);
						checkObj.setQa_inspector_submitted_on(date);
						checkObj.setQa_inspector_submitted_id(userId);
						checkObj.setQa_inspector_sign(userName);
						checkObj.setQa_inspector_status(QaAppConstants.qaInspectorApprove);
						checkObj.setManager_status(QaAppConstants.WaitingForManager);

						templateForRecallRepo.save(checkObj);

						// HISTORY

						TemplateForRecallHistory rejectionReportHistory = new TemplateForRecallHistory();

						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						String formDate = rejectionReportHistory.getDate();

						int version = templateForRecallHistoryRepo.getMaximumVersion(formDate).map(temp -> temp + 1)
								.orElse(1);

						rejectionReportHistory.setVersion(version);

						templateForRecallHistoryRepo.save(rejectionReportHistory);

						// MAIL

						try {

							qamailfunction.sendMailToQaManagerTemplate(checkObj);

						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
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

				if (!role.equals("ROLE_QA")) {

					return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = templateForRecall;

				checkObj.setQa_inspector_submitted_by(userName);
				checkObj.setQa_inspector_submitted_on(date);
				checkObj.setQa_inspector_submitted_id(userId);
				checkObj.setQa_inspector_sign(userName);
				checkObj.setQa_inspector_status(QaAppConstants.qaInspectorApprove);
				checkObj.setManager_status(QaAppConstants.WaitingForManager);

				templateForRecallRepo.save(checkObj);

				TemplateForRecallHistory rejectionReportHistory = new TemplateForRecallHistory();

				BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				String formDate = rejectionReportHistory.getDate();

				int version = templateForRecallHistoryRepo.getMaximumVersion(formDate).map(temp -> temp + 1).orElse(1);

				rejectionReportHistory.setVersion(version);

				templateForRecallHistoryRepo.save(rejectionReportHistory);

				// MAIL
				try {

					qamailfunction.sendMailToQaManagerTemplate(checkObj);

				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
							HttpStatus.OK);
				}
			}
		}

		catch (

		Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);

//		return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	public ResponseEntity<?> getTemplate(String date) {
		try {

			List<TemplateForRecall> list = templateForRecallRepo.GetTemplateRecall(date);

			if (list == null) {

				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> TemplateSummary(HttpServletRequest http) {

		List<TemplateForRecall> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_QA")) {

				details = templateForRecallRepo.qaInsSummary();
			}

			else if (userRole.equalsIgnoreCase("ROLE_DESIGNEE") || userRole.equalsIgnoreCase("QA_MANAGER")
					|| userRole.equalsIgnoreCase("ROLE_MR")) {

				details = templateForRecallRepo.managerSummary();
			}

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

	public ResponseEntity<?> approveRejectTemplate(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		TemplateForRecall object = new TemplateForRecall();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = templateForRecallRepo.findFormById(approvalResponse.getId());

			TemplateForRecallHistory objHistory = new TemplateForRecallHistory();

			String qaIns = object.getQa_inspector_status();
			String manStatus = object.getManager_status();

			if (userRole.equalsIgnoreCase("QA_MANAGER") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
					|| userRole.equalsIgnoreCase("ROLE_MR")) {

				if (qaIns.equalsIgnoreCase(QaAppConstants.qaInspectorApprove)
						&& manStatus.equalsIgnoreCase(QaAppConstants.WaitingForManager)) {

					object.setManager_submitted_on(date);
					object.setManager_submitted_by(userName);
					object.setManager_submitted_id(userId);
					object.setManager_sign(userName);

					objHistory = templateForRecallHistoryRepo.fetchLastSubmittedRecord(object.getDate());

					objHistory.setManager_submitted_on(date);
					objHistory.setManager_submitted_by(userName);
					objHistory.setManager_submitted_id(userId);
					objHistory.setManager_sign(userName);

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setManager_status(QaAppConstants.ManagerApprove);
						objHistory.setManager_status(QaAppConstants.ManagerApprove);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						object.setManager_status(QaAppConstants.ManagerReject);
						object.setReason(approvalResponse.getRemarks());

						objHistory.setManager_status(QaAppConstants.ManagerReject);
						objHistory.setReason(approvalResponse.getRemarks());
					}

					templateForRecallRepo.save(object);

					templateForRecallHistoryRepo.save(objHistory);

					return new ResponseEntity<>(
							new ApiResponse(true, userRole + " " + approvalResponse.getStatus() + " " + "Successfully"),
							HttpStatus.OK);

				} else {

					return new ResponseEntity(new ApiResponse(false, "Invalid Status"), // invalid
							HttpStatus.BAD_REQUEST);

				}
			}

			else {
				return new ResponseEntity(new ApiResponse(false, userRole + " Not authroized to Approve"),
						HttpStatus.BAD_REQUEST); // User not authorize
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	public ResponseEntity<?> TemplatePrint(String month, String year) {
		try {

			List<TemplateForRecall> list = templateForRecallRepo.templatePrint(month, year);

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

	// ------------------------- METAL DETECTOR CALIBRATION REPORT
	// -------------------------------------

	// SAVE

	public ResponseEntity<?> SaveMetalDetector(MetalDetectorCalibrationRecord abCotton, HttpServletRequest http) {

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		MetalDetectorCalibrationRecord listObj = new MetalDetectorCalibrationRecord();

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getMetal_id() != null) {

				Long id = abCotton.getMetal_id();

				listObj = metalDetectorCalibrationRecordRepository.findFormById(id);

				String[] IgnoreProps = { "metal_id", "createdBy", "createdAt",

						// Operator fields
						"operator_status", "operator_save_by", "operator_save_on", "operator_save_id",
						"operator_submitted_by", "operator_submitted_on", "operator_submitted_id", "operator_sign",

						// Supervisor fields
						"supervisor_status", "supervisor_submit_on", "supervisor_submit_by", "supervisor_submit_id",
						"supervisor_sign",

						// Updated Manager fields
						"manager_status", "manager_submitted_on", "manager_submitted_by", "manager_submitted_id",
						"manager_sign" };

				BeanUtils.copyProperties(abCotton, listObj, IgnoreProps);

				if (role.equals("ROLE_OPERATOR")) {

					listObj.setOperator_save_by(userName);
					listObj.setOperator_save_on(date);
					listObj.setOperator_save_id(userId);

					listObj.setOperator_status(QaAppConstants.OperatorSave);
					listObj.setSupervisor_status("");
					listObj.setQa_inspector_status("");

					MetalDetectorCalibrationRecord ss = metalDetectorCalibrationRecordRepository.save(listObj);

					if (ss.getDetails() != null) {

						for (MetalDetectorCalibrationRecordLines chemist : ss.getDetails()) {

							chemist.setMetal_id(ss.getMetal_id());
							metalDetectorCalibrationRecordLinesRepository.save(chemist);
						}
					}

					metalDetectorCalibrationRecordRepository.save(listObj);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}

			} else {

				if (role.equals("ROLE_OPERATOR")) {

					abCotton.setOperator_save_by(userName);
					abCotton.setOperator_save_on(date);
					abCotton.setOperator_save_id(userId);
					abCotton.setOperator_status(QaAppConstants.OperatorSave);
					abCotton.setSupervisor_status("");
					abCotton.setQa_inspector_status("");

					MetalDetectorCalibrationRecord ss = metalDetectorCalibrationRecordRepository.save(abCotton);

					if (ss.getDetails() != null) {

						for (MetalDetectorCalibrationRecordLines chemist : ss.getDetails()) {

							chemist.setMetal_id(ss.getMetal_id());
							metalDetectorCalibrationRecordLinesRepository.save(chemist);
						}
					}

					metalDetectorCalibrationRecordRepository.save(abCotton);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to submit Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to submit Details!"), HttpStatus.BAD_REQUEST);
		}
//					return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(abCotton, HttpStatus.CREATED);
	}

	// SUBMIT METAL DETECTOR CALIBRATION REPORT

	public ResponseEntity<?> SubmitMetalDetector(MetalDetectorCalibrationRecord abCotton, HttpServletRequest http) {

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		MetalDetectorCalibrationRecord listObj = new MetalDetectorCalibrationRecord();

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getMetal_id() != null) {

				Long id = abCotton.getMetal_id();

				listObj = metalDetectorCalibrationRecordRepository.findFormById(id);

				String[] IgnoreProps = { "metal_id", "createdBy", "createdAt",

						// Operator fields
						"operator_status", "operator_save_by", "operator_save_on", "operator_save_id",
						"operator_submitted_by", "operator_submitted_on", "operator_submitted_id", "operator_sign",

						// Supervisor fields
						"supervisor_status", "supervisor_submit_on", "supervisor_submit_by", "supervisor_submit_id",
						"supervisor_sign",

						// Updated Manager fields
						"manager_status", "manager_submitted_on", "manager_submitted_by", "manager_submitted_id",
						"manager_sign" };

				BeanUtils.copyProperties(abCotton, listObj, IgnoreProps);

				if (role.equals("ROLE_OPERATOR")) {

					listObj.setOperator_submitted_by(userName);
					listObj.setOperator_submitted_on(date);
					listObj.setOperator_submitted_id(userId);
					listObj.setOperator_sign(userName);

					listObj.setOperator_status(QaAppConstants.OperatorSubmit);
					listObj.setSupervisor_status(QaAppConstants.SupervisorApproval);
					listObj.setQa_inspector_status("");

					MetalDetectorCalibrationRecord ss = metalDetectorCalibrationRecordRepository.save(listObj);

					if (ss.getDetails() != null) {

						for (MetalDetectorCalibrationRecordLines chemist : ss.getDetails()) {

							chemist.setMetal_id(ss.getMetal_id());
							metalDetectorCalibrationRecordLinesRepository.save(chemist);
						}
					}

					metalDetectorCalibrationRecordRepository.save(listObj);

					// HISTORY AUDIT

					MetalDetectorCalibrationRecordHistory rejectionReportHistory = new MetalDetectorCalibrationRecordHistory();

					rejectionReportHistory.setFormatNo(listObj.getFormatNo());
					rejectionReportHistory.setFormatName(listObj.getFormatName());
					rejectionReportHistory.setRevisionNo(listObj.getRevisionNo());
					rejectionReportHistory.setSopNumber(listObj.getSopNumber());
					rejectionReportHistory.setUnit(listObj.getUnit());
					rejectionReportHistory.setDepartment(listObj.getDepartment());
					rejectionReportHistory.setEq_id(listObj.getEq_id());
					rejectionReportHistory.setMetal_id(listObj.getMetal_id());
					rejectionReportHistory.setDate(listObj.getDate());
					rejectionReportHistory.setMonth(listObj.getMonth());
					rejectionReportHistory.setYear(listObj.getYear());

					rejectionReportHistory.setOperator_save_by(listObj.getOperator_save_by());
					rejectionReportHistory.setOperator_save_id(listObj.getOperator_save_id());
					rejectionReportHistory.setOperator_save_on(listObj.getOperator_save_on());
					rejectionReportHistory.setOperator_submitted_by(listObj.getOperator_submitted_by());
					rejectionReportHistory.setOperator_submitted_id(listObj.getOperator_submitted_id());
					rejectionReportHistory.setOperator_submitted_on(listObj.getOperator_submitted_on());
					rejectionReportHistory.setOperator_status(listObj.getOperator_status());
					rejectionReportHistory.setOperator_sign(listObj.getOperator_sign());

					rejectionReportHistory.setSupervisor_submit_by(listObj.getSupervisor_submit_by());
					rejectionReportHistory.setSupervisor_submit_id(listObj.getSupervisor_submit_id());
					rejectionReportHistory.setSupervisor_submit_on(listObj.getSupervisor_submit_on());
					rejectionReportHistory.setSupervisor_sign(listObj.getSupervisor_sign());
					rejectionReportHistory.setSupervisor_status(listObj.getSupervisor_status());

					rejectionReportHistory.setQa_inspector_submitted_by(listObj.getQa_inspector_submitted_by());
					rejectionReportHistory.setQa_inspector_submitted_id(listObj.getQa_inspector_submitted_id());
					rejectionReportHistory.setQa_inspector_submitted_on(listObj.getQa_inspector_submitted_on());
					rejectionReportHistory.setQa_inspector_sign(listObj.getQa_inspector_sign());
					rejectionReportHistory.setQa_inspector_status(listObj.getQa_inspector_status());

					// VERSION

					Long metal_id = rejectionReportHistory.getMetal_id();

					int version = metalDetectorCalibrationRecordHistoryRepository.getMaximumVersion(metal_id)
							.map(temp -> temp + 1).orElse(1);

					rejectionReportHistory.setVersion(version);

					metalDetectorCalibrationRecordHistoryRepository.save(rejectionReportHistory);

					List<MetalDetectorCalibrationRecordLines> historyMapList = listObj.getDetails();

					for (MetalDetectorCalibrationRecordLines obj : historyMapList) {

						MetalDetectorCalibrationRecordLinesHistory objHistory = new MetalDetectorCalibrationRecordLinesHistory();

						BeanUtils.copyProperties(obj, objHistory);

						objHistory.setHis_metal_id(rejectionReportHistory.getHis_metal_id());

						metalDetectorCalibrationRecordLinesHistoryRepository.save(objHistory);

					}

					// MAIL

					try {

						qamailfunction.sendMailToSupervisor(listObj);

					} catch (Exception ex) {

						return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
								HttpStatus.OK);
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}

			} else {

				if (role.equals("ROLE_OPERATOR")) {

					abCotton.setOperator_submitted_by(userName);
					abCotton.setOperator_submitted_on(date);
					abCotton.setOperator_submitted_id(userId);
					abCotton.setOperator_sign(userName);

					abCotton.setOperator_status(QaAppConstants.OperatorSubmit);
					abCotton.setSupervisor_status(QaAppConstants.SupervisorApproval);
					abCotton.setQa_inspector_status("");

					MetalDetectorCalibrationRecord ss = metalDetectorCalibrationRecordRepository.save(abCotton);

					if (ss.getDetails() != null) {

						for (MetalDetectorCalibrationRecordLines chemist : ss.getDetails()) {

							chemist.setMetal_id(ss.getMetal_id());
							metalDetectorCalibrationRecordLinesRepository.save(chemist);
						}
					}

					metalDetectorCalibrationRecordRepository.save(abCotton);

					// HISTORY AUDIT

					MetalDetectorCalibrationRecordHistory rejectionReportHistory = new MetalDetectorCalibrationRecordHistory();

					rejectionReportHistory.setFormatNo(abCotton.getFormatNo());
					rejectionReportHistory.setFormatName(abCotton.getFormatName());
					rejectionReportHistory.setRevisionNo(abCotton.getRevisionNo());
					rejectionReportHistory.setSopNumber(abCotton.getSopNumber());
					rejectionReportHistory.setDepartment(abCotton.getDepartment());
					rejectionReportHistory.setEq_id(abCotton.getEq_id());
					rejectionReportHistory.setMetal_id(abCotton.getMetal_id());
					rejectionReportHistory.setDate(listObj.getDate());
					rejectionReportHistory.setMonth(listObj.getMonth());
					rejectionReportHistory.setYear(listObj.getYear());

					rejectionReportHistory.setOperator_save_by(abCotton.getOperator_save_by());
					rejectionReportHistory.setOperator_save_id(abCotton.getOperator_save_id());
					rejectionReportHistory.setOperator_save_on(abCotton.getOperator_save_on());
					rejectionReportHistory.setOperator_submitted_by(abCotton.getOperator_submitted_by());
					rejectionReportHistory.setOperator_submitted_id(abCotton.getOperator_submitted_id());
					rejectionReportHistory.setOperator_submitted_on(abCotton.getOperator_submitted_on());
					rejectionReportHistory.setOperator_status(abCotton.getOperator_status());
					rejectionReportHistory.setOperator_sign(abCotton.getOperator_sign());

					rejectionReportHistory.setSupervisor_submit_by(abCotton.getSupervisor_submit_by());
					rejectionReportHistory.setSupervisor_submit_id(abCotton.getSupervisor_submit_id());
					rejectionReportHistory.setSupervisor_submit_on(abCotton.getSupervisor_submit_on());
					rejectionReportHistory.setSupervisor_sign(abCotton.getSupervisor_sign());
					rejectionReportHistory.setSupervisor_status(abCotton.getSupervisor_status());

					rejectionReportHistory.setQa_inspector_submitted_by(abCotton.getQa_inspector_submitted_by());
					rejectionReportHistory.setQa_inspector_submitted_id(abCotton.getQa_inspector_submitted_id());
					rejectionReportHistory.setQa_inspector_submitted_on(abCotton.getQa_inspector_submitted_on());
					rejectionReportHistory.setQa_inspector_sign(abCotton.getQa_inspector_sign());
					rejectionReportHistory.setQa_inspector_status(abCotton.getQa_inspector_status());

					// VERSION

//					Long metal_id = rejectionReportHistory.getMetal_id();
//
//					int version = metalDetectorCalibrationRecordHistoryRepository.getMaximumVersion(metal_id)
//							.map(temp -> temp + 1).orElse(1);
//
//					rejectionReportHistory.setVersion(version);

					int version = 1;

					rejectionReportHistory.setVersion(1);

					metalDetectorCalibrationRecordHistoryRepository.save(rejectionReportHistory);

					List<MetalDetectorCalibrationRecordLines> historyMapList = abCotton.getDetails();

					for (MetalDetectorCalibrationRecordLines obj : historyMapList) {

						MetalDetectorCalibrationRecordLinesHistory objHistory = new MetalDetectorCalibrationRecordLinesHistory();

						BeanUtils.copyProperties(obj, objHistory);

						objHistory.setHis_metal_id(rejectionReportHistory.getHis_metal_id());

						metalDetectorCalibrationRecordLinesHistoryRepository.save(objHistory);

					}

// MAIL

					try {

						qamailfunction.sendMailToSupervisor(abCotton);

					} catch (Exception ex) {

						return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
								HttpStatus.OK);
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to submit Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to submit Details!"), HttpStatus.BAD_REQUEST);
		}
//					return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(abCotton, HttpStatus.CREATED);
	}

	// METAL DETECTOR SUMMARY

	public ResponseEntity<?> MetalDetectorSummary(String department, HttpServletRequest http) {

		List<MetalDetectorCalibrationRecord> details = null;

		try {

			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_OPERATOR")) {

//				details = metalDetectorCalibrationRecordRepository.operatorSummary();

				details = metalDetectorCalibrationRecordRepository.operatorSummary(department);

			} else if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {

				details = metalDetectorCalibrationRecordRepository.supervisorSummary(department);
			}

//			else if (userRole.equalsIgnoreCase("ROLE_QA")) {
//
//				details = metalDetectorCalibrationRecordRepository.qaInspectorSummary();
//			}
			
			else if (userRole.equalsIgnoreCase("ROLE_QA") || userRole.equalsIgnoreCase("ROLE_MR") || userRole.equalsIgnoreCase("QA_MANAGER")) {

				details = metalDetectorCalibrationRecordRepository.qaInspectorSummary();
				
			}

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

	public ResponseEntity<?> MetalDetectorPrint(String month, String year, String date, String eq_id) {
		try {

			List<MetalDetectorCalibrationRecord> list = metalDetectorCalibrationRecordRepository
					.metalDetectorPrint(month, year, date, eq_id);

			if (list == null) {

				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> ApproveOrRejectMetalDetector(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		MetalDetectorCalibrationRecord object = new MetalDetectorCalibrationRecord();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = metalDetectorCalibrationRecordRepository.findFormById(approvalResponse.getId());

			MetalDetectorCalibrationRecordHistory objHistory = new MetalDetectorCalibrationRecordHistory();

			String opStatus = object.getOperator_status();
			String supStatus = object.getSupervisor_status();
			String qaInsStatus = object.getQa_inspector_status();

			// SUPERVISOR

			if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {

				if (opStatus.equalsIgnoreCase(QaAppConstants.OperatorSubmit)
						&& supStatus.equalsIgnoreCase(QaAppConstants.SupervisorApproval)) {

					object.setSupervisor_submit_on(date);
					object.setSupervisor_submit_by(userName);
					object.setSupervisor_submit_id(userId);
					object.setSupervisor_sign(userName);

					objHistory = metalDetectorCalibrationRecordHistoryRepository
							.fetchLastSubmittedRecord(object.getMetal_id());

					objHistory.setSupervisor_submit_on(date);
					objHistory.setSupervisor_submit_by(userName);
					objHistory.setSupervisor_submit_id(userId);
					objHistory.setSupervisor_sign(userName);

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setSupervisor_status(QaAppConstants.SupervisorApprove);
						objHistory.setSupervisor_status(QaAppConstants.SupervisorApprove);

						object.setQa_inspector_status(QaAppConstants.QaApproval);
						objHistory.setQa_inspector_status(QaAppConstants.QaApproval);
					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						object.setSupervisor_status(QaAppConstants.SupervisorReject);
						object.setReason(approvalResponse.getRemarks());

						objHistory.setSupervisor_status(QaAppConstants.SupervisorReject);
						objHistory.setReason(approvalResponse.getRemarks());
					}

					metalDetectorCalibrationRecordRepository.save(object);

					metalDetectorCalibrationRecordHistoryRepository.save(objHistory);

					try {

						if (object.getSupervisor_status() != null) {

							if (object.getSupervisor_status().equals("SUPERVISOR_APPROVED"))

							{
								qamailfunction.sendMailToQaInspector(object);
							}

						}

					} catch (Exception ex) {
						return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
								HttpStatus.OK);
					}

					return new ResponseEntity<>(
							new ApiResponse(true, userRole + " " + approvalResponse.getStatus() + " " + "Successfully"),
							HttpStatus.OK);

				} else {

					return new ResponseEntity(new ApiResponse(false, "Invalid Status"), // invalid
							HttpStatus.BAD_REQUEST);

				}
			}

			else if (userRole.equalsIgnoreCase("ROLE_QA")) {

				if (supStatus.equalsIgnoreCase(QaAppConstants.SupervisorApprove)
						&& qaInsStatus.equalsIgnoreCase(QaAppConstants.WaitingForManager)) {

					object.setQa_inspector_submitted_on(date);
					object.setQa_inspector_submitted_by(userName);
					object.setQa_inspector_submitted_id(userId);
					object.setQa_inspector_sign(userName);

					objHistory = metalDetectorCalibrationRecordHistoryRepository
							.fetchLastSubmittedRecord(object.getMetal_id());

					objHistory.setQa_inspector_submitted_on(date);
					objHistory.setQa_inspector_submitted_by(userName);
					objHistory.setQa_inspector_submitted_id(userId);
					objHistory.setQa_inspector_sign(userName);

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setQa_inspector_status(QaAppConstants.qaInspectorApprove);
						objHistory.setQa_inspector_status(QaAppConstants.qaInspectorApprove);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						object.setQa_inspector_status(QaAppConstants.qaInspectorReject);
						object.setReason(approvalResponse.getRemarks());

						objHistory.setQa_inspector_status(QaAppConstants.qaInspectorReject);
						objHistory.setReason(approvalResponse.getRemarks());
					}

					metalDetectorCalibrationRecordRepository.save(object);

					metalDetectorCalibrationRecordHistoryRepository.save(objHistory);

					return new ResponseEntity<>(
							new ApiResponse(true, userRole + " " + approvalResponse.getStatus() + " " + "Successfully"),
							HttpStatus.OK);

				} else {

					return new ResponseEntity(new ApiResponse(false, "Invalid Status"), // invalid
							HttpStatus.BAD_REQUEST);

				}
			}

			else {
				return new ResponseEntity(new ApiResponse(false, userRole + " Not authroized to Approve"),
						HttpStatus.BAD_REQUEST); // User not authorize
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	public ResponseEntity<?> getById(Long id) {
		try {

			MetalDetectorCalibrationRecord list = metalDetectorCalibrationRecordRepository.getById(id);

			if (list == null) {

				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	// SAVE

	public ResponseEntity<?> SaveMetalDetectorPass(MetalDetectorPassReport abCotton, HttpServletRequest http) {

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		MetalDetectorPassReport listObj = new MetalDetectorPassReport();

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getMetal_id() != null) {

				Long id = abCotton.getMetal_id();

				listObj = metalDetectorPassReportRepo.findFormById(id);

				String[] IgnoreProps = { "metal_id", "createdBy", "createdAt",

						// Supervisor fields
						"supervisor_status", "supervisor_saved_on", "supervisor_saved_by", "supervisor_saved_id",
						"supervisor_submit_on", "supervisor_submit_by", "supervisor_submit_id", "supervisor_sign",

						// Updated Manager fields
						"manager_status", "manager_submitted_on", "manager_submitted_by", "manager_submitted_id",
						"manager_sign" };

				BeanUtils.copyProperties(abCotton, listObj, IgnoreProps);

				if (role.equals("ROLE_SUPERVISOR")) {

					listObj.setSupervisor_saved_by(userName);
					listObj.setSupervisor_saved_on(date);
					listObj.setSupervisor_saved_id(userId);
					listObj.setSupervisor_status(QaAppConstants.SupervisorSave);
					listObj.setQa_inspector_status("");

//					MetalDetectorPassReport ss = metalDetectorPassReportRepo.save(listObj);

					metalDetectorPassReportRepo.save(listObj);

//					if (ss.getDetails() != null) {

					for (MetalDetectorPassReportLines line : listObj.getDetails()) {

						line.setMetal_id(listObj.getMetal_id());
						metalDetectorPassReportLinesRepo.save(line);
					}
//					}

//					metalDetectorPassReportRepo.save(listObj);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}

			} else {

				if (role.equals("ROLE_SUPERVISOR")) {

					abCotton.setSupervisor_saved_by(userName);
					abCotton.setSupervisor_saved_on(date);
					abCotton.setSupervisor_saved_id(userId);
					abCotton.setSupervisor_status(QaAppConstants.SupervisorSave);
					abCotton.setQa_inspector_status("");

//					MetalDetectorPassReport ss = metalDetectorPassReportRepo.save(abCotton);

					metalDetectorPassReportRepo.save(abCotton);

//					if (ss.getDetails() != null) {

					for (MetalDetectorPassReportLines line : abCotton.getDetails()) {

						line.setMetal_id(abCotton.getMetal_id());
						metalDetectorPassReportLinesRepo.save(line);
					}
//					}

//					metalDetectorPassReportRepo.save(listObj);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to submit Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to submit Details!"), HttpStatus.BAD_REQUEST);
		}
//						return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(abCotton, HttpStatus.CREATED);
	}

	// SUBMIT METAL DETECTOR CALIBRATION REPORT

	public ResponseEntity<?> SubmitMetalDetectorPass(MetalDetectorPassReport abCotton, HttpServletRequest http) {

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		MetalDetectorPassReport listObj = new MetalDetectorPassReport();

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getMetal_id() != null) {

				Long id = abCotton.getMetal_id();

				listObj = metalDetectorPassReportRepo.findFormById(id);

				String[] IgnoreProps = { "metal_id", "createdBy", "createdAt",

						// Supervisor fields
						"supervisor_status", "supervisor_saved_on", "supervisor_saved_by", "supervisor_saved_id",
						"supervisor_submit_on", "supervisor_submit_by", "supervisor_submit_id", "supervisor_sign",

						// Updated Manager fields
						"manager_status", "manager_submitted_on", "manager_submitted_by", "manager_submitted_id",
						"manager_sign" };

				BeanUtils.copyProperties(abCotton, listObj, IgnoreProps);

				if (role.equals("ROLE_SUPERVISOR")) {

					listObj.setSupervisor_submit_by(userName);
					listObj.setSupervisor_submit_on(date);
					listObj.setSupervisor_submit_id(userId);
					listObj.setSupervisor_status(QaAppConstants.SupervisorApprove);
					listObj.setSupervisor_sign(userName);
					listObj.setQa_inspector_status(QaAppConstants.QaApproval);

					MetalDetectorPassReport ss = metalDetectorPassReportRepo.save(listObj);

					if (ss.getDetails() != null) {

						for (MetalDetectorPassReportLines chemist : ss.getDetails()) {

							chemist.setMetal_id(ss.getMetal_id());
							metalDetectorPassReportLinesRepo.save(chemist);
						}
					}

					metalDetectorPassReportRepo.save(listObj);

					// HISTORY AUDIT

					MetalDetectorPassReportHistory rejectionReportHistory = new MetalDetectorPassReportHistory();

					rejectionReportHistory.setFormatNo(listObj.getFormatNo());
					rejectionReportHistory.setFormatName(listObj.getFormatName());
					rejectionReportHistory.setRevisionNo(listObj.getRevisionNo());
					rejectionReportHistory.setSopNumber(listObj.getSopNumber());
					rejectionReportHistory.setUnit(listObj.getUnit());
					rejectionReportHistory.setDepartment(listObj.getDepartment());
					rejectionReportHistory.setDate(listObj.getDate());
					rejectionReportHistory.setShift(listObj.getShift());
					rejectionReportHistory.setMetal_id(listObj.getMetal_id());

					rejectionReportHistory.setSupervisor_saved_by(listObj.getSupervisor_saved_by());
					rejectionReportHistory.setSupervisor_saved_id(listObj.getSupervisor_saved_id());
					rejectionReportHistory.setSupervisor_saved_on(listObj.getSupervisor_saved_on());
					rejectionReportHistory.setSupervisor_submit_by(listObj.getSupervisor_submit_by());
					rejectionReportHistory.setSupervisor_submit_id(listObj.getSupervisor_submit_id());
					rejectionReportHistory.setSupervisor_submit_on(listObj.getSupervisor_submit_on());
					rejectionReportHistory.setSupervisor_sign(listObj.getSupervisor_sign());
					rejectionReportHistory.setSupervisor_status(listObj.getSupervisor_status());

					rejectionReportHistory.setQa_inspector_submitted_by(listObj.getQa_inspector_submitted_by());
					rejectionReportHistory.setQa_inspector_submitted_id(listObj.getQa_inspector_submitted_id());
					rejectionReportHistory.setQa_inspector_submitted_on(listObj.getQa_inspector_submitted_on());
					rejectionReportHistory.setQa_inspector_sign(listObj.getQa_inspector_sign());
					rejectionReportHistory.setQa_inspector_status(listObj.getQa_inspector_status());

					// VERSION

					Long metal_id = rejectionReportHistory.getMetal_id();

					int version = metalDetectorPassReportHistoryRepo.getMaximumVersion(metal_id).map(temp -> temp + 1)
							.orElse(1);

					rejectionReportHistory.setVersion(version);

					metalDetectorPassReportHistoryRepo.save(rejectionReportHistory);

					List<MetalDetectorPassReportLines> historyMapList = listObj.getDetails();

					for (MetalDetectorPassReportLines obj : historyMapList) {

						MetalDetectorPassReportLinesHistory objHistory = new MetalDetectorPassReportLinesHistory();

						BeanUtils.copyProperties(obj, objHistory);

						objHistory.setHis_metal_id(rejectionReportHistory.getHis_metal_id());

						metalDetectorPassReportLinesHistoryRepo.save(objHistory);

					}

					// MAIL

					try {

						qamailfunction.sendMailToQaInspectorMetalDetectorPass(listObj);

					} catch (Exception ex) {

						return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
								HttpStatus.OK);
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}

			} else {

				if (role.equals("ROLE_SUPERVISOR")) {

					abCotton.setSupervisor_submit_by(userName);
					abCotton.setSupervisor_submit_on(date);
					abCotton.setSupervisor_submit_id(userId);
					abCotton.setSupervisor_status(QaAppConstants.SupervisorApprove);
					abCotton.setSupervisor_sign(userName);
					abCotton.setQa_inspector_status(QaAppConstants.QaApproval);

					MetalDetectorPassReport ss = metalDetectorPassReportRepo.save(abCotton);

					if (ss.getDetails() != null) {

						for (MetalDetectorPassReportLines chemist : ss.getDetails()) {

							chemist.setMetal_id(ss.getMetal_id());
							metalDetectorPassReportLinesRepo.save(chemist);
						}
					}

					metalDetectorPassReportRepo.save(abCotton);

					Long mid = abCotton.getMetal_id();

					// HISTORY AUDIT

					MetalDetectorPassReportHistory rejectionReportHistory = new MetalDetectorPassReportHistory();

					rejectionReportHistory.setFormatNo(abCotton.getFormatNo());
					rejectionReportHistory.setFormatName(abCotton.getFormatName());
					rejectionReportHistory.setRevisionNo(abCotton.getRevisionNo());
					rejectionReportHistory.setSopNumber(abCotton.getSopNumber());
					rejectionReportHistory.setUnit(abCotton.getUnit());

					rejectionReportHistory.setDepartment(abCotton.getDepartment());
					rejectionReportHistory.setDate(abCotton.getDate());
					rejectionReportHistory.setShift(abCotton.getShift());
					rejectionReportHistory.setMetal_id(abCotton.getMetal_id());

					rejectionReportHistory.setSupervisor_saved_by(abCotton.getSupervisor_saved_by());
					rejectionReportHistory.setSupervisor_saved_id(abCotton.getSupervisor_saved_id());
					rejectionReportHistory.setSupervisor_saved_on(abCotton.getSupervisor_saved_on());
					rejectionReportHistory.setSupervisor_submit_by(abCotton.getSupervisor_submit_by());
					rejectionReportHistory.setSupervisor_submit_id(abCotton.getSupervisor_submit_id());
					rejectionReportHistory.setSupervisor_submit_on(abCotton.getSupervisor_submit_on());
					rejectionReportHistory.setSupervisor_sign(abCotton.getSupervisor_sign());
					rejectionReportHistory.setSupervisor_status(abCotton.getSupervisor_status());

					rejectionReportHistory.setQa_inspector_submitted_by(abCotton.getQa_inspector_submitted_by());
					rejectionReportHistory.setQa_inspector_submitted_id(abCotton.getQa_inspector_submitted_id());
					rejectionReportHistory.setQa_inspector_submitted_on(abCotton.getQa_inspector_submitted_on());
					rejectionReportHistory.setQa_inspector_sign(abCotton.getQa_inspector_sign());
					rejectionReportHistory.setQa_inspector_status(abCotton.getQa_inspector_status());

					// VERSION

					Long metal_id = rejectionReportHistory.getMetal_id();

//					int version = metalDetectorPassReportHistoryRepo.getMaximumVersion(metal_id)
//							.map(temp -> temp + 1).orElse(1);
//
//					rejectionReportHistory.setVersion(version);

					int version = 1;

					rejectionReportHistory.setVersion(version);

					metalDetectorPassReportHistoryRepo.save(rejectionReportHistory);

					List<MetalDetectorPassReportLines> historyMapList = abCotton.getDetails();

					for (MetalDetectorPassReportLines obj : historyMapList) {

						MetalDetectorPassReportLinesHistory objHistory = new MetalDetectorPassReportLinesHistory();

						BeanUtils.copyProperties(obj, objHistory);

						objHistory.setHis_metal_id(rejectionReportHistory.getHis_metal_id());

						metalDetectorPassReportLinesHistoryRepo.save(objHistory);

					}
				}

				else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to submit Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to submit Details!"), HttpStatus.BAD_REQUEST);
		}
//						return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(abCotton, HttpStatus.CREATED);
	}

//	// METAL DETECTOR SUMMARY
//
//	public ResponseEntity<?> MetalDetectorPassSummary(String department, HttpServletRequest http) {
//
//		List<MetalDetectorPassReport> details = null;
//
//		try {
//
//			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
//
//			if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {
//
//				details = metalDetectorPassReportRepo.supervisorSummary(department);
//			}
//
//			else if (userRole.equalsIgnoreCase("ROLE_QA")) {
//
//				details = metalDetectorPassReportRepo.qaInspectorSummary();
//			}
//
//			else {
//				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
//						HttpStatus.FORBIDDEN);
//			}
//
//			return new ResponseEntity<>(details, HttpStatus.OK);
//		} catch (Exception e) {
//
//			log.error("Unable to get Details!", e);
//
//			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
//		}
//	}

	public ResponseEntity<?> MetalDetectorPassPrint(String date) {
		try {

			List<MetalDetectorPassReport> list = metalDetectorPassReportRepo.metalDetectorPassPrint(date);

			if (list == null) {

				return new ResponseEntity(new ApiResponse(true, "No data found"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> ApproveOrRejectMetalDetectorPass(ApproveResponse approvalResponse,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		MetalDetectorPassReport object = new MetalDetectorPassReport();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = metalDetectorPassReportRepo.findFormById(approvalResponse.getId());

			MetalDetectorPassReportHistory objHistory = new MetalDetectorPassReportHistory();

			String supStatus = object.getSupervisor_status();
			String qaInsStatus = object.getQa_inspector_status();

			// SUPERVISOR

			if (userRole.equalsIgnoreCase("ROLE_QA")) {

				if (supStatus.equalsIgnoreCase(QaAppConstants.SupervisorApprove)
						&& qaInsStatus.equalsIgnoreCase(QaAppConstants.WaitingForManager)) {

					object.setQa_inspector_submitted_on(date);
					object.setQa_inspector_submitted_by(userName);
					object.setQa_inspector_submitted_id(userId);
					object.setQa_inspector_sign(userName);

					objHistory = metalDetectorPassReportHistoryRepo.fetchLastSubmittedRecord(object.getMetal_id());

					objHistory.setQa_inspector_submitted_on(date);
					objHistory.setQa_inspector_submitted_by(userName);
					objHistory.setQa_inspector_submitted_id(userId);
					objHistory.setQa_inspector_sign(userName);

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setQa_inspector_status(QaAppConstants.qaInspectorApprove);
						objHistory.setQa_inspector_status(QaAppConstants.qaInspectorApprove);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						object.setQa_inspector_status(QaAppConstants.qaInspectorReject);
						object.setReason(approvalResponse.getRemarks());

						objHistory.setQa_inspector_status(QaAppConstants.qaInspectorReject);
						objHistory.setReason(approvalResponse.getRemarks());
					}

					metalDetectorPassReportRepo.save(object);

					metalDetectorPassReportHistoryRepo.save(objHistory);

					return new ResponseEntity<>(
							new ApiResponse(true, userRole + " " + approvalResponse.getStatus() + " " + "Successfully"),
							HttpStatus.OK);

				} else {

					return new ResponseEntity(new ApiResponse(false, "Invalid Status"), // invalid
							HttpStatus.BAD_REQUEST);

				}
			}

			else {
				return new ResponseEntity(new ApiResponse(false, userRole + " Not authroized to Approve"),
						HttpStatus.BAD_REQUEST); // User not authorize
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	public ResponseEntity<?> getByIdPass(Long id) {
		try {

			MetalDetectorPassReport list = metalDetectorPassReportRepo.getByIdPass(id);

			if (list == null) {

				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> MetalPassSummary(String department, HttpServletRequest http) {

		List<MetalDetectorPassReport> details = null;

		try {

			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {

				details = metalDetectorPassReportRepo.supervisorSummary(department);
			}

//			else if (userRole.equalsIgnoreCase("ROLE_QA")) {
//
//				details = metalDetectorPassReportRepo.qaInspectorSummary();
//			}
			
			else if (userRole.equalsIgnoreCase("ROLE_QA") || userRole.equalsIgnoreCase("ROLE_MR") || userRole.equalsIgnoreCase("QA_MANAGER")) {

				details = metalDetectorPassReportRepo.qaInspectorSummary();
		}

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

	public ResponseEntity<?> deleteMetalPass(Long line_id) {
		try {

			MetalDetectorPassReportLines details = metalDetectorPassReportLinesRepo.findFormById(line_id);

			if (details == null) {
				return new ResponseEntity(new ApiResponse(false, "No data for the id : " + line_id),
						HttpStatus.BAD_REQUEST);
			}

			metalDetectorPassReportLinesRepo.delete(details);

		} catch (Exception ex) {

			log.error(" **** Unable to delete details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
	}

	public ResponseEntity<?> deleteMetalCalibration(Long line_id) {
		try {

			MetalDetectorCalibrationRecordLines details = metalDetectorCalibrationRecordLinesRepository
					.findFormById(line_id);

			if (details == null) {
				return new ResponseEntity(new ApiResponse(false, "No data for the id : " + line_id),
						HttpStatus.BAD_REQUEST);
			}

			metalDetectorCalibrationRecordLinesRepository.delete(details);

		} catch (Exception ex) {

			log.error(" **** Unable to delete details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
	}

	//
	//
	//
	//

	public ResponseEntity<?> SaveTrainingRecord(TrainingRecord abCotton, HttpServletRequest http) {

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		TrainingRecord listObj = new TrainingRecord();

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getTraining_id() != null) {

				Long id = abCotton.getTraining_id();

				listObj = trainingRecordRepo.findFormById(id);

				String[] IgnoreProps = { "training_id", "createdBy", "createdAt",

						// Supervisor fields
						"hod_status", "hod_saved_on", "hod_saved_by", "hod_saved_id", "hod_submit_on", "hod_submit_by",
						"hod_submit_id", "hod_sign" };

				BeanUtils.copyProperties(abCotton, listObj, IgnoreProps);

				if (role.equals("ROLE_HOD") || role.equals("ROLE_DESIGNEE") || role.equals("EXTERNAL_TRAINER")||
						role.equals("QA_MANAGER") || role.equals("ROLE_MR")|| role.equals("HR_EXECUTIVE")) {
					

					listObj.setHod_saved_by(userName);
					listObj.setHod_saved_on(date);
					listObj.setHod_saved_id(userId);
					listObj.setHod_status(QaAppConstants.hodSaved);

					trainingRecordRepo.save(listObj);

					for (TrainingRecordLines line : listObj.getDetails()) {

						line.setTraining_id(listObj.getTraining_id());

						trainingRecordLineRepo.save(line);
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}

			} else {

				if (role.equals("ROLE_HOD") || role.equals("ROLE_DESIGNEE") || role.equals("EXTERNAL_TRAINER") ||
						role.equals("QA_MANAGER") || role.equals("ROLE_MR")|| role.equals("HR_EXECUTIVE")) {

					abCotton.setHod_saved_by(userName);
					abCotton.setHod_saved_on(date);
					abCotton.setHod_saved_id(userId);
					abCotton.setHod_status(QaAppConstants.hodSaved);

					trainingRecordRepo.save(abCotton);

					for (TrainingRecordLines line : abCotton.getDetails()) {

						line.setTraining_id(abCotton.getTraining_id());

						trainingRecordLineRepo.save(line);
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to submit Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Training Record Details!"),
					HttpStatus.BAD_REQUEST);
		}
//						return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(abCotton, HttpStatus.CREATED);
	}

	// SUBMIT

	public ResponseEntity<?> SubmitTrainingRecord(TrainingRecord abCotton, HttpServletRequest http) {

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		TrainingRecord listObj = new TrainingRecord();

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getTraining_id() != null) {

				Long id = abCotton.getTraining_id();

				listObj = trainingRecordRepo.findFormById(id);

				String[] IgnoreProps = { "training_id", "createdBy", "createdAt",

						// Supervisor fields
						"hod_status", "hod_saved_on", "hod_saved_by", "hod_saved_id", "hod_submit_on", "hod_submit_by",
						"hod_submit_id", "hod_sign" };

				BeanUtils.copyProperties(abCotton, listObj, IgnoreProps);

				if (role.equals("ROLE_HOD") || role.equals("ROLE_DESIGNEE") || role.equals("EXTERNAL_TRAINER")
						|| role.equals("QA_MANAGER") || role.equals("ROLE_MR")|| role.equals("HR_EXECUTIVE")) {
					

					listObj.setHod_submitted_by(userName);
					listObj.setHod_submitted_on(date);
					listObj.setHod_submitted_id(userId);
					listObj.setHod_status(QaAppConstants.hodApproved);
					listObj.setHod_sign(userName);

					trainingRecordRepo.save(listObj);

					for (TrainingRecordLines line : listObj.getDetails()) {

						line.setTraining_id(listObj.getTraining_id());

						trainingRecordLineRepo.save(line);
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}

			} else {

				if (role.equals("ROLE_HOD") || role.equals("ROLE_DESIGNEE") || role.equals("EXTERNAL_TRAINER")
						|| role.equals("QA_MANAGER") || role.equals("ROLE_MR")|| role.equals("HR_EXECUTIVE")) {

					abCotton.setHod_submitted_by(userName);
					abCotton.setHod_submitted_on(date);
					abCotton.setHod_submitted_id(userId);
					abCotton.setHod_status(QaAppConstants.hodApproved);
					abCotton.setHod_sign(userName);

					trainingRecordRepo.save(abCotton);

					for (TrainingRecordLines line : abCotton.getDetails()) {

						line.setTraining_id(abCotton.getTraining_id());

						trainingRecordLineRepo.save(line);
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to submit Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Training Record Details!"),
					HttpStatus.BAD_REQUEST);
		}
//						return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(abCotton, HttpStatus.CREATED);
	}

	// SUMMARY

	public ResponseEntity<?> TrainingRecordSummary(String department, HttpServletRequest http) {

		List<TrainingRecord> details = null;

		try {

			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")||
					userRole.equals("QA_MANAGER") || userRole.equals("ROLE_MR")|| userRole.equals("HR_EXECUTIVE")) {

				details = trainingRecordRepo.hodSummary(department);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

	// PRINT

	public ResponseEntity<?> TrainingRecordPrint(String month, String year, String department) {
		try {

			List<TrainingRecord> list = trainingRecordRepo.trainingRecordPrint(month, year, department);

			if (list == null) {

				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getTrainingRecord(String date, String department) {
		try {

			List<TrainingRecord> list = trainingRecordRepo.GetTrainingRecord(date, department);

			if (list == null) {

				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> deleteTrainingRecordLines(Long line_id) {
		try {

			TrainingRecordLines details = trainingRecordLineRepo.findFormById(line_id);

			if (details == null) {
				return new ResponseEntity(new ApiResponse(false, "No data for the id : " + line_id),
						HttpStatus.BAD_REQUEST);
			}

			trainingRecordLineRepo.delete(details);

		} catch (Exception ex) {

			log.error(" **** Unable to delete details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
	}
	
	// AMC

		public ResponseEntity<?> getDataByBatchNo(String batchNo) {
			try {

				OnlineInspectionPadsPleatsRolls list = trainingRecordLineRepo.getDataByBatchNo(batchNo);

				if (list == null) {
					return new ResponseEntity<>(new ApiResponse(true, "No data found for this Batch No: " + batchNo),
							HttpStatus.OK);
				}

				return new ResponseEntity<>(list, HttpStatus.OK);

			} catch (Exception e) {
				log.error("Unable to get Details!", e);
				return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
			}
		}

		public ResponseEntity<?> getItemCode(String porder) {
			try {

				List<String> list = trainingRecordLineRepo.getItemCode(porder);

				if (list == null) {
					return new ResponseEntity<>(new ApiResponse(true, "No data found for this OrderNo: " + porder),
							HttpStatus.OK);
				}

				return new ResponseEntity<>(list, HttpStatus.OK);

			} catch (Exception e) {
				log.error("Unable to get Details!", e);
				return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
			}
		}

		public ResponseEntity<?> getCustomerName(String material) {
			try {

				List<String> list = trainingRecordLineRepo.getCustomerName(material);

				if (list == null) {
					return new ResponseEntity<>(new ApiResponse(true, "No data found for this Material: " + material),
							HttpStatus.OK);
				}

				return new ResponseEntity<>(list, HttpStatus.OK);

			} catch (Exception e) {
				log.error("Unable to get Details!", e);
				return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
			}
		}

//	================================== USER ROLE =====================================

	private String getUserRole() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst()
					.orElse(null);
		}
		return null;
	}

}
