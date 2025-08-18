package com.focusr.Precot.QA.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.focusr.Precot.QA.model.QaChangeControlAssessmentAndCreation;
import com.focusr.Precot.QA.model.QaChangeControlForm;
import com.focusr.Precot.QA.model.QaCustomerComplaintRegisterForm;
import com.focusr.Precot.QA.model.QaNonConformityReport;
import com.focusr.Precot.QA.model.QaPestController;
import com.focusr.Precot.QA.model.QaPestControllerAreaOfTreatments;
import com.focusr.Precot.QA.model.QaPestControllerTreatments;
import com.focusr.Precot.QA.model.QaRodentBoxCheckList;
import com.focusr.Precot.QA.model.QaRodentBoxDetails;
import com.focusr.Precot.QA.model.QaTrainingCard;
import com.focusr.Precot.QA.model.QaTrainingCardDetails;
import com.focusr.Precot.QA.model.QaTrainingNeedIdentificationForm;
import com.focusr.Precot.QA.model.QaTrainingNeedIdentificationFormLine;
import com.focusr.Precot.QA.model.QaTrainingSessionAllotmentRegister;
import com.focusr.Precot.QA.model.QaTrainingSessionAllotmentRegisterLine;
import com.focusr.Precot.QA.model.audit.QaCustomerComplaintRegisterFormHistory;
import com.focusr.Precot.QA.model.audit.QaNonConformityReportHistory;
import com.focusr.Precot.QA.model.audit.QaPestControllerHistory;
import com.focusr.Precot.QA.model.audit.QaPestControllerTreatmentsHistory;
import com.focusr.Precot.QA.model.audit.QaRodentBoxCheckListHistory;
import com.focusr.Precot.QA.model.audit.QaRodentBoxDetailsHistory;
import com.focusr.Precot.QA.model.audit.QaTrainingNeedIdentificationFormHistory;
import com.focusr.Precot.QA.model.audit.QaTrainingNeedIdentificationFormLineHistory;
import com.focusr.Precot.QA.payload.TabName;
import com.focusr.Precot.QA.repository.QaChangeControlAssessmentAndCreationRepository;
import com.focusr.Precot.QA.repository.QaChangeControlFormRepository;
import com.focusr.Precot.QA.repository.QaCustomerComplaintRegisterFormRepository;
import com.focusr.Precot.QA.repository.QaNonConformityReportRepository;
import com.focusr.Precot.QA.repository.QaPestControllerAreaOfTreatmentsRepository;
import com.focusr.Precot.QA.repository.QaPestControllerRepository;
import com.focusr.Precot.QA.repository.QaPestControllerTreatmentsRepository;
import com.focusr.Precot.QA.repository.QaRodentBoxCheckListRepository;
import com.focusr.Precot.QA.repository.QaRodentBoxDetailsRepository;
import com.focusr.Precot.QA.repository.QaTrainingCardDetailsRepository;
import com.focusr.Precot.QA.repository.QaTrainingCardRepository;
import com.focusr.Precot.QA.repository.QaTrainingNeedIdentificationFormLineRepository;
import com.focusr.Precot.QA.repository.QaTrainingNeedIdentificationFormRepository;
import com.focusr.Precot.QA.repository.QaTrainingSessionAllotmentRegisterLineRepository;
import com.focusr.Precot.QA.repository.QaTrainingSessionAllotmentRegisterRepository;
import com.focusr.Precot.QA.repository.TrainingRecordRepo;
import com.focusr.Precot.QA.repository.audit.QaCustomerComplaintRegisterFormHistoryRepository;
import com.focusr.Precot.QA.repository.audit.QaNonConformityReportHistoryRepository;
import com.focusr.Precot.QA.repository.audit.QaPestControllerHistoryRepository;
import com.focusr.Precot.QA.repository.audit.QaPestControllerTreatmentsHistoryRepository;
import com.focusr.Precot.QA.repository.audit.QaRodentBoxCheckListHistoryRepository;
import com.focusr.Precot.QA.repository.audit.QaRodentBoxDetailsHistoryRepository;
import com.focusr.Precot.QA.repository.audit.QaTrainingNeedIdentificationFormHistoryRepository;
import com.focusr.Precot.QA.repository.audit.QaTrainingNeedIdentificationFormLineHistoryRepository;
import com.focusr.Precot.QA.util.QaAppConstants;
import com.focusr.Precot.QA.util.mail.QAMailFunction;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.IdAndValuePair;
import com.focusr.Precot.util.SCAUtil;

/*
 * TRAINING CARD
 * PEST CONTROLLER
 * RODENT BOX CHECK LIST
 * CUSTOMER COMPLAINT REGISTER FORM
 * CUSTOMER COMPLAINT REGISTER
 * NON CONFORMITY REPORT
 * CHANGE CONTROL FORM
 * TRAINING SESSION ALLOTMENT REGISTER
 * TRAINING NEED IDENTIFICATION FORM
 */

@Service
public class QaService1 {

	Logger log = LoggerFactory.getLogger(QaService1.class);

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private SCAUtil scaUtil;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private QaTrainingCardRepository qaTrainingCardRepository;

	@Autowired
	private QaTrainingCardDetailsRepository qaTrainingCardDetailsRepository;

	@Autowired
	private QaPestControllerRepository qaPestControllerRepository;

	@Autowired
	private QaPestControllerTreatmentsRepository qaPestControllerTreatmentsRepository;

	@Autowired
	private QaPestControllerHistoryRepository qaPestControllerHistoryRepository;

	@Autowired
	private QaPestControllerTreatmentsHistoryRepository qaPestControllerTreatmentsHistoryRepository;

	@Autowired
	private QaPestControllerAreaOfTreatmentsRepository qaPestControllerAreaOfTreatmentsRepository;

	@Autowired
	private QaRodentBoxCheckListRepository qaRodentBoxCheckListRepository;

	@Autowired
	private QaRodentBoxDetailsRepository qaRodentBoxDetailsRepository;

	@Autowired
	private QaRodentBoxCheckListHistoryRepository qaRodentBoxCheckListHistoryRepository;

	@Autowired
	private QaRodentBoxDetailsHistoryRepository qaRodentBoxDetailsHistoryRepository;

	@Autowired
	private QaCustomerComplaintRegisterFormRepository qaCustomerComplaintRegisterFormRepository;

	@Autowired
	private QaCustomerComplaintRegisterFormHistoryRepository qaCustomerComplaintRegisterFormHistoryRepository;

	@Autowired
	private QaNonConformityReportRepository qaNonConformityReportRepository;

	@Autowired
	private QaNonConformityReportHistoryRepository qaNonConformityReportHistoryRepository;

	@Autowired
	private QaChangeControlFormRepository qaChangeControlFormRepository;

	@Autowired
	private QaChangeControlAssessmentAndCreationRepository qaChangeControlAssessmentAndCreationRepository;

	@Autowired
	QAMailFunction qamailfunction;

	@Autowired
	private QaTrainingSessionAllotmentRegisterRepository qaTrainingSessionAllotmentRegisterRepository;

	@Autowired
	private QaTrainingSessionAllotmentRegisterLineRepository qaTrainingSessionAllotmentRegisterLineRepository;

	@Autowired
	private QaTrainingNeedIdentificationFormRepository qaTrainingNeedIdentificationFormRepository;

	@Autowired
	private QaTrainingNeedIdentificationFormLineRepository qaTrainingNeedIdentificationFormLineRepository;

	@Autowired
	private QaTrainingNeedIdentificationFormHistoryRepository qaTrainingNeedIdentificationFormHistoryRepository;

	@Autowired
	private QaTrainingNeedIdentificationFormLineHistoryRepository qaTrainingNeedIdentificationFormLineHistoryRepository;

	@Autowired
	private TrainingRecordRepo trainingRecordRepo;
	// Date
//	LocalDateTime currentDate = LocalDateTime.now();

	// ***************************************************** PEST CONTROLLER
	// *********************************************************

	public ResponseEntity<?> SavePestController(QaPestController details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		QaPestController listObj = null;
		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getControl_id() != null) {

				listObj = qaPestControllerRepository.findFormById(details.getControl_id());

				String[] IgnoreProps = { "control_id", "createdBy", "createdAt", "pci_status", "pci_save_on",
						"pci_save_by", "pci_save_id", "pci_submit_on", "pci_submit_by", "pci_submit_id", "pci_sign",
						"qa_mr_status", "qa_mr_submit_on", "qa_mr_submit_by", "qa_mr_submit_id", "qa_mr_sign",
						"details" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

			} else {
				listObj = details;
			}

			if (role.equals("ROLE_PCI_TRAINED_PERSON")) {

				qaPestControllerRepository.save(listObj);

				List<QaPestControllerTreatments> list = details.getDetails();

				for (QaPestControllerTreatments detail : list) {
					detail.setControl_id(listObj.getControl_id());
					qaPestControllerTreatmentsRepository.save(detail);
				}

				listObj.setDetails(list);

				listObj.setPci_save_by(userName);
				listObj.setPci_save_on(date);
				listObj.setPci_save_id(userId);
				listObj.setPci_status(QaAppConstants.pciSave);

				qaPestControllerRepository.save(listObj);

			} else {
				return new ResponseEntity(new ApiResponse(false, role + " cannot save details"),
						HttpStatus.BAD_REQUEST);
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

	public ResponseEntity<?> SubmitPestController(QaPestController details, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getControl_id();

		QaPestController checkObj = new QaPestController();

		try {
			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = qaPestControllerRepository.findFormById(id);

				String[] IgnoreProps = { "control_id", "createdBy", "createdAt", "pci_status", "pci_save_on",
						"pci_save_by", "pci_save_id", "pci_submit_on", "pci_submit_by", "pci_submit_id", "pci_sign",
						"qa_mr_status", "qa_mr_submit_on", "qa_mr_submit_by", "qa_mr_submit_id", "qa_mr_sign",
						"details" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

			} else {
				checkObj = details;
			}

			if ((id == null) || (!checkObj.getPci_status().equals(QaAppConstants.pciSubmit)
					|| checkObj.getQa_mr_status().equals(QaAppConstants.qaMrRejectedStatus))) {
				if (role.equals("ROLE_PCI_TRAINED_PERSON")) {

					qaPestControllerRepository.save(checkObj);

					List<QaPestControllerTreatments> list = details.getDetails();

					for (QaPestControllerTreatments detail : list) {
						detail.setControl_id(checkObj.getControl_id());
						qaPestControllerTreatmentsRepository.save(detail);
					}

					checkObj.setDetails(list);

					checkObj.setPci_submit_by(userName);
					checkObj.setPci_submit_on(date);
					checkObj.setPci_submit_id(userId);
					checkObj.setPci_status(QaAppConstants.pciSubmit);
					checkObj.setPci_sign(checkObj.getPci_trained_person());

					checkObj.setQa_mr_status(AppConstants.waitingStatus);

					qaPestControllerRepository.save(checkObj);

					QaPestControllerHistory reportHistory = new QaPestControllerHistory();

					// getter setters fields & status

					reportHistory.setFormat_name(checkObj.getFormat_name());
					reportHistory.setFormat_no(checkObj.getFormat_no());
					reportHistory.setRevision_no(checkObj.getRevision_no());
					reportHistory.setSop_number(checkObj.getSop_number());
					reportHistory.setUnit(checkObj.getUnit());

					reportHistory.setFrequency(checkObj.getFrequency());
					reportHistory.setDate(checkObj.getDate());
					reportHistory.setYear(checkObj.getYear());
					reportHistory.setMonth(checkObj.getMonth());
					reportHistory.setNext_due_date(checkObj.getNext_due_date());
					reportHistory.setType_of_service(checkObj.getType_of_service());
					reportHistory.setName_of_chemical(checkObj.getName_of_chemical());
					reportHistory.setPci_trained_person(checkObj.getPci_trained_person());
					reportHistory.setRemark(checkObj.getRemarks());

					// status
					reportHistory.setPci_submit_by(checkObj.getPci_submit_by());
					reportHistory.setPci_submit_id(checkObj.getPci_submit_id());
					reportHistory.setPci_submit_on(checkObj.getPci_submit_on());
					reportHistory.setPci_status(checkObj.getPci_status());
					reportHistory.setPci_sign(checkObj.getPci_sign());

					reportHistory.setQa_mr_status(checkObj.getQa_mr_status());

					// version
					String date1 = reportHistory.getDate();

					String month = reportHistory.getMonth();

					String year = reportHistory.getYear();

					String format_no = reportHistory.getFormat_no();

					int version = 0;

					if (format_no.equals(QaAppConstants.PC_Format) || format_no.equals(QaAppConstants.PC_Format_1)
							|| format_no.equals(QaAppConstants.PC_Format_5)) {
						version = qaPestControllerHistoryRepository.getMaximumVersion1(format_no, month, year, date1)
								.map(temp -> temp + 1).orElse(1);
					}

					else if (format_no.equals(QaAppConstants.PC_Format_2)
							|| format_no.equals(QaAppConstants.PC_Format_3)
							|| format_no.equals(QaAppConstants.PC_Format_4)) {
						version = qaPestControllerHistoryRepository.getMaximumVersion2(format_no, month, year)
								.map(temp -> temp + 1).orElse(1);
					}

					reportHistory.setVersion(version);

					qaPestControllerHistoryRepository.save(reportHistory); // ONE HISTORY

					List<QaPestControllerTreatments> historyMapList = checkObj.getDetails();

					for (QaPestControllerTreatments obj : historyMapList) {

						QaPestControllerTreatmentsHistory objHistory = new QaPestControllerTreatmentsHistory();

						BeanUtils.copyProperties(obj, objHistory);
						objHistory.setHistory_id(reportHistory.getHistory_id());
						qaPestControllerTreatmentsHistoryRepository.save(objHistory);

					}

					qaPestControllerHistoryRepository.save(reportHistory);

					// MAIL
					try {

						qamailfunction.sendMailToQaManagerPestController(checkObj);
					} catch (Exception ex) {
						return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
								HttpStatus.OK);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " cannot submit details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity(new ApiResponse(false, " Invalid status."), HttpStatus.BAD_REQUEST);
			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "PCI Submitted Sucessfully"), HttpStatus.OK);

//		return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	public ResponseEntity<?> approveRejectPestController(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		QaPestController object = new QaPestController();

		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = qaPestControllerRepository.findFormById(approvalResponse.getId());

			QaPestControllerHistory objHistory = new QaPestControllerHistory();

			String pciStatus = object.getPci_status();

			String qaMrStatus = object.getQa_mr_status();

			String status = "";

			if (pciStatus.equalsIgnoreCase(QaAppConstants.pciSubmit)
					&& qaMrStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("QA_MANAGER")) {

					String reason = approvalResponse.getRemarks();

					String format_no = object.getFormat_no();

					if (format_no.equals(QaAppConstants.PC_Format) || format_no.equals(QaAppConstants.PC_Format_1)
							|| format_no.equals(QaAppConstants.PC_Format_5)) {
						objHistory = qaPestControllerHistoryRepository.fetchLastSubmittedRecord1(object.getFormat_no(),
								object.getMonth(), object.getYear(), object.getDate());
					}

					else if (format_no.equals(QaAppConstants.PC_Format_2)
							|| format_no.equals(QaAppConstants.PC_Format_3)
							|| format_no.equals(QaAppConstants.PC_Format_4)) {
						objHistory = qaPestControllerHistoryRepository.fetchLastSubmittedRecord2(object.getFormat_no(),
								object.getMonth(), object.getYear());
					}

					if (approvalResponse.getStatus().equals("Approve")) {
						object.setQa_mr_status(QaAppConstants.qaMrApprovedStatus);
						objHistory.setQa_mr_status(QaAppConstants.qaMrApprovedStatus);
						status = "Approved";
					} else if (approvalResponse.getStatus().equals("Reject")) {
						object.setReason(reason);
						object.setQa_mr_status(QaAppConstants.qaMrRejectedStatus);
						objHistory.setReason(reason);
						objHistory.setQa_mr_status(QaAppConstants.qaMrRejectedStatus);
						status = "Rejected";
					}

					object.setQa_mr_submit_on(date);
					object.setQa_mr_submit_by(userName);
					object.setQa_mr_submit_id(userId);
					object.setQa_mr_sign(userName);

					qaPestControllerRepository.save(object);

					objHistory.setQa_mr_submit_on(date);
					objHistory.setQa_mr_submit_by(userName);
					objHistory.setQa_mr_submit_id(userId);
					objHistory.setQa_mr_sign(userName);

					qaPestControllerHistoryRepository.save(objHistory);

					return new ResponseEntity<>(new ApiResponse(true, "QA_MANAGER " + status + " Successfully"),
							HttpStatus.OK);

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

	public ResponseEntity<?> getByParamPestController(String formatNo, String month, String year, String date) {
		try {

			QaPestController list = qaPestControllerRepository.findByparam(formatNo, month, year, date);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getByPrintPestController(String formatNo, String month, String year, String date) {
		try {

			List<QaPestController> list = qaPestControllerRepository.printApi(formatNo, month, year, date);

			if (list == null || list.isEmpty()) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getPestControllerSummary(String formatNo, HttpServletRequest http) {

		List<QaPestController> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_PCI_TRAINED_PERSON")) {

				details = qaPestControllerRepository.pciSummary(formatNo);
			} else if (userRole.equals("QA_MANAGER")) {

				details = qaPestControllerRepository.qaMrSummary(formatNo);
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

	// delete api
	public ResponseEntity<?> deletePestControllerTreatments(Long id) {
		try {

			QaPestControllerTreatments details = qaPestControllerTreatmentsRepository.findFormById(id);

			if (details == null) {
				return new ResponseEntity(new ApiResponse(false, "No data for the id : " + id), HttpStatus.BAD_REQUEST);
			}

			qaPestControllerTreatmentsRepository.deleteById(id);

		} catch (Exception ex) {

			log.error(" **** Unable to delete details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
	}

	// AREA OF TREATMENTS

	public ResponseEntity<?> SaveAreaOfTreatments(QaPestControllerAreaOfTreatments details, HttpServletRequest http) {

		try {

			qaPestControllerAreaOfTreatmentsRepository.save(details);

		} catch (Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	public ResponseEntity<?> getAreaOfTreatments(String formatNo) {
		try {

			List<QaPestControllerAreaOfTreatments> list = qaPestControllerAreaOfTreatmentsRepository
					.findByFormatNo(formatNo);

			if (list == null || list.isEmpty()) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> deleteAreaOfTreatments(Long id) {
		try {

			QaPestControllerAreaOfTreatments details = qaPestControllerAreaOfTreatmentsRepository.findFormById(id);

			if (details == null) {
				return new ResponseEntity(new ApiResponse(false, "No data for the id : " + id), HttpStatus.BAD_REQUEST);
			}

			qaPestControllerAreaOfTreatmentsRepository.deleteById(id);

		} catch (Exception ex) {

			log.error(" **** Unable to delete details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
	}

	// ***************************************************** RODENT BOX CHECK LIST
	// *********************************************************

	public ResponseEntity<?> SaveRodentBox(QaRodentBoxCheckList details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		QaRodentBoxCheckList listObj = null;
		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

//			Date date = QAUtil.convertLocalDateTimeToDate(currentDate);

			if (details.getList_id() != null) {

				listObj = qaRodentBoxCheckListRepository.findFormById(details.getList_id());

				String[] IgnoreProps = { "list_id", "createdBy", "createdAt", "pci_status", "pci_save_on",
						"pci_save_by", "pci_save_id", "pci_submit_on", "pci_submit_by", "pci_submit_id", "pci_sign",
						"qa_mr_status", "qa_mr_submit_on", "qa_mr_submit_by", "qa_mr_submit_id", "qa_mr_sign",
						"details" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

			} else {
				listObj = details;
			}

			if (role.equals("ROLE_PCI_TRAINED_PERSON")) {

				qaRodentBoxCheckListRepository.save(listObj);

				List<QaRodentBoxDetails> list = details.getDetails();

				for (QaRodentBoxDetails detail : list) {
					detail.setList_id(listObj.getList_id());
					qaRodentBoxDetailsRepository.save(detail);
				}

				listObj.setDetails(list);

				listObj.setPci_save_by(userName);
				listObj.setPci_save_on(date);
				listObj.setPci_save_id(userId);
				listObj.setPci_status(QaAppConstants.pciSave);

				qaRodentBoxCheckListRepository.save(listObj);

			} else {
				return new ResponseEntity(new ApiResponse(false, role + " cannot save details"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}
//			return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	public ResponseEntity<?> SubmitRodentBox(QaRodentBoxCheckList details, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getList_id();

		QaRodentBoxCheckList checkObj = new QaRodentBoxCheckList();

		try {
			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = qaRodentBoxCheckListRepository.findFormById(id);

				String[] IgnoreProps = { "list_id", "createdBy", "createdAt", "pci_status", "pci_save_on",
						"pci_save_by", "pci_save_id", "pci_submit_on", "pci_submit_by", "pci_submit_id", "pci_sign",
						"qa_mr_status", "qa_mr_submit_on", "qa_mr_submit_by", "qa_mr_submit_id", "qa_mr_sign",
						"details" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

			} else {
				checkObj = details;
			}

			if ((id == null) || (!checkObj.getPci_status().equals(QaAppConstants.pciSubmit)
					|| checkObj.getQa_mr_status().equals(QaAppConstants.qaMrRejectedStatus))) {
				if (role.equals("ROLE_PCI_TRAINED_PERSON")) {

					qaRodentBoxCheckListRepository.save(checkObj);

					List<QaRodentBoxDetails> list = details.getDetails();

					for (QaRodentBoxDetails detail : list) {
						detail.setList_id(checkObj.getList_id());
						qaRodentBoxDetailsRepository.save(detail);
					}

					checkObj.setDetails(list);

					checkObj.setPci_submit_by(userName);
					checkObj.setPci_submit_on(date);
					checkObj.setPci_submit_id(userId);
					checkObj.setPci_status(QaAppConstants.pciSubmit);
					checkObj.setPci_sign(userName);

					checkObj.setQa_mr_status(AppConstants.waitingStatus);

					qaRodentBoxCheckListRepository.save(checkObj);

					QaRodentBoxCheckListHistory reportHistory = new QaRodentBoxCheckListHistory();

					// getter setters fields & status

					reportHistory.setFormat_name(checkObj.getFormat_name());
					reportHistory.setFormat_no(checkObj.getFormat_no());
					reportHistory.setRevision_no(checkObj.getRevision_no());
					reportHistory.setSop_number(checkObj.getSop_number());
					reportHistory.setUnit(checkObj.getUnit());

					reportHistory.setFrequency(checkObj.getFrequency());
					reportHistory.setDate(checkObj.getDate());
					reportHistory.setYear(checkObj.getYear());
					reportHistory.setMonth(checkObj.getMonth());
					reportHistory.setRemarks(checkObj.getRemarks());

					// status
					reportHistory.setPci_submit_by(checkObj.getPci_submit_by());
					reportHistory.setPci_submit_id(checkObj.getPci_submit_id());
					reportHistory.setPci_submit_on(checkObj.getPci_submit_on());
					reportHistory.setPci_status(checkObj.getPci_status());
					reportHistory.setPci_sign(checkObj.getPci_sign());

					reportHistory.setQa_mr_status(checkObj.getQa_mr_status());

					// version
					String date1 = reportHistory.getDate();

					String month = reportHistory.getMonth();

					String year = reportHistory.getYear();

					int version = qaRodentBoxCheckListHistoryRepository.getMaximumVersion(month, year, date1)
							.map(temp -> temp + 1).orElse(1);

					reportHistory.setVersion(version);

					qaRodentBoxCheckListHistoryRepository.save(reportHistory); // ONE HISTORY

					List<QaRodentBoxDetails> historyMapList = checkObj.getDetails();

					for (QaRodentBoxDetails obj : historyMapList) {

						QaRodentBoxDetailsHistory objHistory = new QaRodentBoxDetailsHistory();

						BeanUtils.copyProperties(obj, objHistory);
						objHistory.setHistory_id(reportHistory.getHistory_id());
						qaRodentBoxDetailsHistoryRepository.save(objHistory);

					}

					qaRodentBoxCheckListHistoryRepository.save(reportHistory);

					// MAIL
					try {

						qamailfunction.sendMailToQaManagerRodentBox(checkObj);
					} catch (Exception ex) {
						return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
								HttpStatus.OK);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " cannot submit details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity(new ApiResponse(false, " Invalid status."), HttpStatus.BAD_REQUEST);
			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "PCI Submitted Sucessfully"), HttpStatus.OK);

//		return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	public ResponseEntity<?> approveRejectRodentBox(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		QaRodentBoxCheckList object = new QaRodentBoxCheckList();

		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = qaRodentBoxCheckListRepository.findFormById(approvalResponse.getId());

			QaRodentBoxCheckListHistory objHistory = new QaRodentBoxCheckListHistory();

			String pciStatus = object.getPci_status();

			String qaMrStatus = object.getQa_mr_status();

			String status = "";

			if (pciStatus.equalsIgnoreCase(QaAppConstants.pciSubmit)
					&& qaMrStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("QA_MANAGER") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					String reason = approvalResponse.getRemarks();

					objHistory = qaRodentBoxCheckListHistoryRepository.fetchLastSubmittedRecord(object.getMonth(),
							object.getYear(), object.getDate());

					if (approvalResponse.getStatus().equals("Approve")) {
						object.setQa_mr_status(QaAppConstants.qaMrApprovedStatus);
						objHistory.setQa_mr_status(QaAppConstants.qaMrApprovedStatus);
						status = "Approved";
					} else if (approvalResponse.getStatus().equals("Reject")) {
						object.setReason(reason);
						object.setQa_mr_status(QaAppConstants.qaMrRejectedStatus);
						objHistory.setReason(reason);
						objHistory.setQa_mr_status(QaAppConstants.qaMrRejectedStatus);
						status = "Rejected";
					}

					object.setQa_mr_submit_on(date);
					object.setQa_mr_submit_by(userName);
					object.setQa_mr_submit_id(userId);
					object.setQa_mr_sign(userName);

					qaRodentBoxCheckListRepository.save(object);

					objHistory.setQa_mr_submit_on(date);
					objHistory.setQa_mr_submit_by(userName);
					objHistory.setQa_mr_submit_id(userId);
					objHistory.setQa_mr_sign(userName);

					qaRodentBoxCheckListHistoryRepository.save(objHistory);

					return new ResponseEntity<>(
							new ApiResponse(true, "QA_MANAGER / ROLE_DESIGNEE " + status + " Successfully"),
							HttpStatus.OK);

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

	public ResponseEntity<?> getByParamRodentBox(String month, String year, String date) {
		try {

			QaRodentBoxCheckList list = qaRodentBoxCheckListRepository.findByparam(month, year, date);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getByPrintRodentBox(String month, String year, String date) {
		try {

			List<QaRodentBoxCheckList> list = qaRodentBoxCheckListRepository.printApi(month, year, date);

			if (list == null || list.isEmpty()) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getRodentBoxSummary(HttpServletRequest http) {

		List<QaRodentBoxCheckList> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_PCI_TRAINED_PERSON")) {

				details = qaRodentBoxCheckListRepository.pciSummary();
			} else if (userRole.equals("QA_MANAGER") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

				details = qaRodentBoxCheckListRepository.qaMrSummary();
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

	// delete api
	public ResponseEntity<?> deleteRodentBoxLine(Long id) {
		try {

			QaRodentBoxDetails details = qaRodentBoxDetailsRepository.findFormById(id);

			if (details == null) {
				return new ResponseEntity(new ApiResponse(false, "No data for the id : " + id), HttpStatus.BAD_REQUEST);
			}

			qaRodentBoxDetailsRepository.deleteById(id);

		} catch (Exception ex) {

			log.error(" **** Unable to delete details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
	}

	// RODENT BOX FIELDS

//	public ResponseEntity<?> SaveRodentBoxFields(QaRodentBoxFields details, HttpServletRequest http) {
//
//		try {
//
//			qaRodentBoxFieldsRepository.save(details);
//
//		} catch (Exception ex) {
//
//			log.error(" **** Unable to save Details! **** " + ex);
//
//			String msg = ex.getMessage();
//
//			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
//		}
//
//		return new ResponseEntity(details, HttpStatus.CREATED);
//	}
//
//	public ResponseEntity<?> getRodentBoxFields() {
//		try {
//
//			List<QaRodentBoxFields> list = qaRodentBoxFieldsRepository.findAll();
//					
//			if (list == null || list.isEmpty()) {
//				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
//			}
//
//			return new ResponseEntity<>(list, HttpStatus.OK);
//		} catch (Exception e) {
//			log.error("Unable to get Details!", e);
//			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
//		}
//	}
//
//	public ResponseEntity<?> deleteRodentBoxFields(Long id) {
//		try {
//
//			QaRodentBoxFields details = qaRodentBoxFieldsRepository.findFormById(id);
//
//			if (details == null) {
//				return new ResponseEntity(new ApiResponse(false, "No data for the id : " + id), HttpStatus.BAD_REQUEST);
//			}
//
//			qaRodentBoxFieldsRepository.deleteById(id);
//
//		} catch (Exception ex) {
//
//			log.error(" **** Unable to delete details! **** " + ex);
//
//			String msg = ex.getMessage();
//
//			return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
//		}
//
//		return new ResponseEntity(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
//	}

	// ***************************************************** CUSTOMER COMPLAINT
	// REGISTER FORM
	// *********************************************************

	public ResponseEntity<?> SaveCustomerComplaintRegForm(QaCustomerComplaintRegisterForm details,
			HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		QaCustomerComplaintRegisterForm listObj = null;
		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

//			Date date = QAUtil.convertLocalDateTimeToDate(currentDate);

			if (details.getComplaint_id() != null) {

				listObj = qaCustomerComplaintRegisterFormRepository.findFormById(details.getComplaint_id());

				String[] IgnoreProps = { "complaint_id", "createdBy", "createdAt", "hod_status", "hod_submit_on",
						"hod_submit_by", "hod_submit_id", "hod_sign", "qa_mr_status", "qa_mr_save_id", "qa_mr_save_by",
						"qa_mr_save_on", "qa_mr_submit_on", "qa_mr_submit_by", "qa_mr_submit_id", "qa_mr_sign",
						"status" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

			} else {
				listObj = details;
			}

			if (role.equals("QA_MANAGER") || role.equals("ROLE_DESIGNEE")) {

				listObj.setStatus("OPEN");
				listObj.setQa_mr_save_by(userName);
				listObj.setQa_mr_save_on(date);
				listObj.setQa_mr_save_id(userId);
				listObj.setQa_mr_status(QaAppConstants.qaMrSaved);

				qaCustomerComplaintRegisterFormRepository.save(listObj);

			} else {
				return new ResponseEntity(new ApiResponse(false, role + " cannot save details"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	public ResponseEntity<?> SubmitCustomerComplaintRegForm(QaCustomerComplaintRegisterForm details,
			HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getComplaint_id();

		QaCustomerComplaintRegisterForm checkObj = new QaCustomerComplaintRegisterForm();

		try {
			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			String[] IgnoreProps = { "complaint_id", "createdBy", "createdAt", "hod_status", "hod_submit_on",
					"hod_submit_by", "hod_submit_id", "hod_sign", "qa_mr_status", "qa_mr_save_id", "qa_mr_save_by",
					"qa_mr_save_on", "qa_mr_submit_on", "qa_mr_submit_by", "qa_mr_submit_id", "qa_mr_sign", "status" };

			if (id != null) {

				checkObj = qaCustomerComplaintRegisterFormRepository.findFormById(id);

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

			} else {
				checkObj = details;
			}

			if ((id == null) || (checkObj.getQa_mr_status().equals(QaAppConstants.qaMrSaved))
					|| checkObj.getHod_status().equals(AppConstants.hodRejectedStatus)) {
				if (role.equals("QA_MANAGER") || role.equals("ROLE_DESIGNEE")) {

					checkObj.setStatus("OPEN");
					checkObj.setQa_mr_submit_by(userName);
					checkObj.setQa_mr_submit_on(date);
					checkObj.setQa_mr_submit_id(userId);
					checkObj.setQa_mr_status(QaAppConstants.qaMrSubmitted);
//					checkObj.setQa_mr_sign(userName);

					checkObj.setHod_status(AppConstants.waitingStatus);

					qaCustomerComplaintRegisterFormRepository.save(checkObj);

					QaCustomerComplaintRegisterFormHistory reportHistory = new QaCustomerComplaintRegisterFormHistory();

					// getter setters fields & status

					BeanUtils.copyProperties(checkObj, reportHistory);

					// version

					int version = qaCustomerComplaintRegisterFormHistoryRepository
							.getMaximumVersion(reportHistory.getFormat_no(), reportHistory.getCcf_no())
							.map(temp -> temp + 1).orElse(1);

					reportHistory.setVersion(version);

					qaCustomerComplaintRegisterFormHistoryRepository.save(reportHistory);

					// MAIL
					try {

						qamailfunction.sendMailToHodCustomerComplaint(checkObj);
					} catch (Exception ex) {
						return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
								HttpStatus.OK);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " cannot submit details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity(new ApiResponse(false, " Invalid status."), HttpStatus.BAD_REQUEST);
			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "QA_MR Submitted Sucessfully"), HttpStatus.OK);

//		return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	public ResponseEntity<?> approveRejectCustomerComplaintRegForm(ApproveResponse approvalResponse,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		QaCustomerComplaintRegisterForm object = new QaCustomerComplaintRegisterForm();

		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = qaCustomerComplaintRegisterFormRepository.findFormById(approvalResponse.getId());

			QaCustomerComplaintRegisterFormHistory objHistory = new QaCustomerComplaintRegisterFormHistory();

			String hodStatus = object.getHod_status();

			String qaMrStatus = object.getQa_mr_status();

			String status = "";

			if (hodStatus.equalsIgnoreCase(AppConstants.hodApprovedStatus)
					&& qaMrStatus.equalsIgnoreCase(QaAppConstants.qaMrSubmitted)) {

				if (userRole.equalsIgnoreCase("QA_MANAGER") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					String reason = approvalResponse.getRemarks();

					objHistory = qaCustomerComplaintRegisterFormHistoryRepository
							.fetchLastSubmittedRecord(object.getFormat_no(), object.getCcf_no());

					if (approvalResponse.getStatus().equals("Approve")) {
						object.setStatus("CLOSED");
						objHistory.setStatus("CLOSED");
						object.setQa_mr_status(QaAppConstants.qaMrApprovedStatus);
						objHistory.setQa_mr_status(QaAppConstants.qaMrApprovedStatus);
						status = "Approved";
					} else if (approvalResponse.getStatus().equals("Reject")) {
						object.setReason(reason);
						object.setQa_mr_status(QaAppConstants.qaMrRejectedStatus);
						objHistory.setReason(reason);
						objHistory.setQa_mr_status(QaAppConstants.qaMrRejectedStatus);
						status = "Rejected";
					}

					object.setQa_mr_submit_on(date);
					object.setQa_mr_submit_by(userName);
					object.setQa_mr_submit_id(userId);
					object.setQa_mr_sign(userName);

					qaCustomerComplaintRegisterFormRepository.save(object);

					objHistory.setQa_mr_submit_on(date);
					objHistory.setQa_mr_submit_by(userName);
					objHistory.setQa_mr_submit_id(userId);
					objHistory.setQa_mr_sign(userName);

					qaCustomerComplaintRegisterFormHistoryRepository.save(objHistory);

					return new ResponseEntity<>(
							new ApiResponse(true, "QA_MANAGER / DESIGNEE " + status + " Successfully"), HttpStatus.OK);

				} else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}
			} else if (hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)
					&& qaMrStatus.equalsIgnoreCase(QaAppConstants.qaMrSubmitted)) {

				if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					String reason = approvalResponse.getRemarks();

					objHistory = qaCustomerComplaintRegisterFormHistoryRepository
							.fetchLastSubmittedRecord(object.getFormat_no(), object.getCcf_no());

					if (approvalResponse.getStatus().equals("Approve")) {
						object.setHod_status(AppConstants.hodApprovedStatus);
						objHistory.setHod_status(AppConstants.hodApprovedStatus);
						status = "Approved";

//						// MAIL
//						try {
//
//							qamailfunction.sendMailToQaManagerCustomerComplaint(object);
//						} catch (Exception ex) {
//							return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
//									HttpStatus.OK);
//						}

					} else if (approvalResponse.getStatus().equals("Reject")) {
						object.setReason(reason);
						object.setHod_status(AppConstants.hodRejectedStatus);
						objHistory.setReason(reason);
						objHistory.setHod_status(AppConstants.hodRejectedStatus);
						status = "Rejected";
					}

					object.setHod_submit_on(date);
					object.setHod_submit_by(userName);
					object.setHod_submit_id(userId);
					object.setHod_sign(userName);

					qaCustomerComplaintRegisterFormRepository.save(object);

					objHistory.setHod_submit_on(date);
					objHistory.setHod_submit_by(userName);
					objHistory.setHod_submit_id(userId);
					objHistory.setHod_sign(userName);

					qaCustomerComplaintRegisterFormHistoryRepository.save(objHistory);

					if (approvalResponse.getStatus().equals("Approve")) {

						try {

							qamailfunction.sendMailToQaManagerCustomerComplaint(object);
						} catch (Exception ex) {
							return new ResponseEntity<>(
									new ApiResponse(false, "HOD / DESIGNEE " + status + " Successfully "),
									HttpStatus.OK);
						}

					}

					return new ResponseEntity<>(new ApiResponse(true, "HOD / DESIGNEE " + status + " Successfully"),
							HttpStatus.OK);

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

	public ResponseEntity<?> getByParamCustomerComplaintRegForm(String ccf_no) {
		try {

			QaCustomerComplaintRegisterForm list = qaCustomerComplaintRegisterFormRepository.findByparam(ccf_no);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getByPrintCustomerComplaintRegForm(String month, String year, String dpt) {
		try {

			List<QaCustomerComplaintRegisterForm> list = qaCustomerComplaintRegisterFormRepository.printApi(month, year,
					dpt);

			if (list == null || list.isEmpty()) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

//	public ResponseEntity<?> getCustomerComplaintRegFormSummary(String dpt, HttpServletRequest http) {
//
//		List<QaCustomerComplaintRegisterForm> details = null;
//		try {
//			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
//
//			if (userRole.equalsIgnoreCase("ROLE_HOD")||userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
//
//				details = qaCustomerComplaintRegisterFormRepository.hodSummary(dpt);
//
//			} else if (userRole.equalsIgnoreCase("QA_MANAGER") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
//
//				details = qaCustomerComplaintRegisterFormRepository.qaMrSummary();
//			} else {
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

	// summary for QA Manager / Designee
	public ResponseEntity<?> getCustomerComplaintRegFormSummaryQaManager(HttpServletRequest http) {

		List<QaCustomerComplaintRegisterForm> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equalsIgnoreCase("QA_MANAGER") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

				details = qaCustomerComplaintRegisterFormRepository.qaMrSummary();
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

	// symmary for HOD / Designee
	public ResponseEntity<?> getCustomerComplaintRegFormSummaryHod(String dpt, HttpServletRequest http) {

		List<QaCustomerComplaintRegisterForm> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
				
				List<String> departmentList = Arrays.asList(dpt.split(","));
				
				List<String> departments = departmentList ;
				
				System.out.println("Multiple Department :" + departments);

				details = qaCustomerComplaintRegisterFormRepository.hodSummary(departments);

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

	// SUMMARY for Customer Complaint Register
	public ResponseEntity<?> getForCustomerComplaintRegister(String month, String year, HttpServletRequest http) {
		try {

			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("QA_MANAGER") || userRole.equals("ROLE_DESIGNEE")) {

				List<Map<String, Object>> list = qaCustomerComplaintRegisterFormRepository
						.getForCustomerComplaintRegister(month, year);

				if (list == null || list.isEmpty()) {
					return new ResponseEntity<>(new ApiResponse(true, "No data"), HttpStatus.OK);
				}

				return new ResponseEntity<>(list, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// Trend chart
	public ResponseEntity<?> getComplaintCountsByMonth(String financialYear) {
		try {
			List<Object[]> results = qaCustomerComplaintRegisterFormRepository.getComplaintCountsByMonth(financialYear);

			Map<String, Long> response = results.stream().collect(Collectors.toMap(result -> (String) result[0], // Month
					result -> ((Number) result[1]).longValue() // Total complaints as Long
			));

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getComplaintCounts(String financialYear) {
		try {
			List<Object[]> results = qaCustomerComplaintRegisterFormRepository.getComplaintCounts(financialYear);

			if (!results.isEmpty()) {
				Object[] counts = results.get(0);
				Map<String, Object> response = new HashMap<>();
				response.put("strength_of_product", counts[0]);
				response.put("packing", counts[1]);
				response.put("grammage", counts[2]);
				response.put("chemical", counts[3]);
				response.put("lesser_count", counts[4]);
				response.put("contamination", counts[5]);
				response.put("less_qty", counts[6]);
				response.put("others", counts[7]);

				// Calculate total complaints
				long total = Stream.of(counts).mapToLong(count -> count != null ? (long) count : 0).sum();
				response.put("total", total);

				return new ResponseEntity<>(response, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// PRINT for Customer Complaint Register Financial year based
	public ResponseEntity<?> getCustomerComplaintRegisterPrint(String financial_year) {
		try {

			List<Map<String, Object>> list = qaCustomerComplaintRegisterFormRepository.printApiRegister(financial_year);

			if (list == null || list.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// CCF LOV

	public ResponseEntity<?> getCcfLov() {
		List<String> response = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();

		try {
			response = qaCustomerComplaintRegisterFormRepository.ccfLov();

			if (response.isEmpty() || response == null) {
				return new ResponseEntity<>(new ApiResponse(true, "No data"), HttpStatus.OK);
			} else {
				Long id = (long) 1;

				for (String ccf_no : response) {
					IdAndValuePair values = new IdAndValuePair();
					values.setId(id);
					values.setValue(ccf_no);

					responseList.add(values);
					id++;
				}
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();
			log.error("Error Getting Details." + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Error Getting Details."), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}

	// ***************************************************** NON CONFORMITY REPORT
	// *********************************************************

	// GET LIST BY NCR NUMBER
	public ResponseEntity<?> getNonConformityReportbYNCRnumber(String ncrNumber) {

		QaNonConformityReport ncrList;
		try {

			ncrList = qaNonConformityReportRepository.getByparam(ncrNumber);

			if (ncrList == null) {
				return new ResponseEntity<>(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity(ncrList, HttpStatus.OK);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			log.error("*** !!! Unable to fetch Non Conformity Report by ncr number !!! ***" + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Error Getting Details."), HttpStatus.BAD_REQUEST);
		}
	}

	// NCR LOV
	public ResponseEntity<?> getNcrLov() {
		List<String> response = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();

		try {
			response = qaNonConformityReportRepository.ncrNoLov();
			if (response.isEmpty() || response == null) {
				return new ResponseEntity<>(new ApiResponse(true, "No data"), HttpStatus.OK);
			} else {
				Long id = (long) 1;
				for (String ncrNo : response) {
					IdAndValuePair values = new IdAndValuePair();
					values.setId(id);
					values.setValue(ncrNo);

					responseList.add(values);
					id++;
				}
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();
			log.error("*** !!! Error Getting Details. !!! ***" + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Error Getting Details."), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}

	public ResponseEntity<?> saveNonConformityReport(QaNonConformityReport nonConformityReport,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		String actions = nonConformityReport.getAction(); // ***** SAVED / SUBMITTED / APPROVED / REJECTED *****

		QaNonConformityReport report = new QaNonConformityReport();

		try {

			String tabName = nonConformityReport.getTabName();

			System.out.println(tabName);

			String[] IgnoreProps = { "id", "createdBy", "createdAt", "qaInspectorA", "qaInspectorIdA",
					"qaInspectorDateA", "productionSupervisorA", "productionSupervisorIdA", "productionSupervisorDateA",
					"qaInspectorBCD", "qaInspectorIdBCD", "qaInspectorDateBCD", "qaInspectorE", "qaInspectorIdE",
					"qaInspectorDateE", "productionSupervisorSign", "qaInspectorSign", "productionHeadSign",
					"qaManagerSign", "productionSupervisorStatus", "qaInspectorStatus", "productionHeadStatus",
					"qaManagerStatus", "productionSupervisorSubmittedDate", "qaInspectorSubmittedDate",
					"productionHeadSubmittedDate", "qaManagerSubmittedDate", "productionSupervisorSubmittedId",
					"qaInspectorSubmittedId", "productionHeadSubmittedId", "qaManagerSubmittedId", "tabStatusA",
					"tabStatusBCD", "tabStatusE", "status", "productionSupervisorBCD", "productionSupervisorIdBCD",
					"productionSupervisorDateBCD", "productionSupervisorSubmittedBy", "qaInspectorSubmittedBy",
					"productionHeadSubmittedBy", "qaManagerSubmittedBy", "tabStatus", "tabInternalStatus" };

			String[] IgnorePropsHistory = { "id", "createdBy", "createdAt" };

			QaNonConformityReportHistory objHistory = new QaNonConformityReportHistory();

			if (nonConformityReport.getId() != null) {

				report = qaNonConformityReportRepository.findFormById(nonConformityReport.getId());

				BeanUtils.copyProperties(nonConformityReport, report, IgnoreProps);

			} else {
				report = nonConformityReport;
			}

			String status = "";

			if (report.getProductionSupervisorStatus() != null
					&& report.getProductionSupervisorStatus().contains("REJECTED")
					|| report.getQaInspectorStatus() != null && report.getQaInspectorStatus().contains("REJECTED")
					|| report.getProductionHeadStatus() != null && report.getProductionHeadStatus().contains("REJECTED")
					|| report.getQaManagerStatus() != null && report.getQaManagerStatus().contains("REJECTED")) {
				status = "REJECTED";
			}

			switch (TabName.fromValue(nonConformityReport.getTabName())) {

			case A:
				// VALIDATE USER ROLE
				if (!userRole.equalsIgnoreCase(QaAppConstants.qaInspector)
						&& !userRole.equalsIgnoreCase(QaAppConstants.qcChecmist)) {
					return new ResponseEntity<>(
							new ApiResponse(false, userRole + " is not authorized to access this tab."),
							HttpStatus.BAD_REQUEST);
				}

				if (report.getTabStatusA() != null && report.getTabStatusA().equalsIgnoreCase("SUBMITTED")
						&& !report.getTabStatusE().equalsIgnoreCase("REJECTED")
						&& !status.equalsIgnoreCase("REJECTED")) {
					return new ResponseEntity<>(new ApiResponse(false, " Already submitted."), HttpStatus.BAD_REQUEST);
				}

				handleTabA(report, userRole, userName, date, actions);
				break;

			case BCD:
				// VALIDATE USER ROLE
				if (!userRole.equalsIgnoreCase(QaAppConstants.prodSupervisor)) {
					return new ResponseEntity<>(
							new ApiResponse(false, userRole + " is not authorized to access this tab."),
							HttpStatus.BAD_REQUEST);
				}

				// VALIDATE PREVIOUS TAB STATUS
				if (!validateTabSubmitted(report.getTabStatusA(), "Tab A", "SUBMITTED")) {
					return new ResponseEntity<>(new ApiResponse(false, "Tab A is not yet submitted."),
							HttpStatus.BAD_REQUEST);
				}

				if (report.getTabStatusBCD() != null && report.getTabStatusBCD().equalsIgnoreCase("SUBMITTED")) {
					return new ResponseEntity<>(new ApiResponse(false, " Already submitted."), HttpStatus.BAD_REQUEST);
				}

				handleTabBCD(report, userRole, userName, date, actions);

				// History

				if (report.getTabStatusBCD().equalsIgnoreCase("SUBMITTED")) {
					BeanUtils.copyProperties(report, objHistory, IgnorePropsHistory);

					// version
					int version = qaNonConformityReportHistoryRepository.getMaximumVersion(report.getNcrNumber())
							.map(temp -> temp + 1).orElse(1);

					objHistory.setVersion(version);

					qaNonConformityReportHistoryRepository.save(objHistory);
				}

				break;

			case E:
				// VALIDATE USER ROLE
				if (!userRole.equalsIgnoreCase(QaAppConstants.qaInspector)
						&& !userRole.equalsIgnoreCase(QaAppConstants.qcChecmist)) {
					return new ResponseEntity<>(
							new ApiResponse(false, userRole + " is not authorized to access this tab."),
							HttpStatus.BAD_REQUEST);
				}

				// VALIDATE PREVIOUS TAB STATUS
				if (!validateTabSubmitted(report.getTabStatusA(), "Tab A", "SUBMITTED")) {
					return new ResponseEntity<>(new ApiResponse(false, "Tab A is not yet submitted."),
							HttpStatus.BAD_REQUEST);
				}
				if (!validateTabSubmitted(report.getTabStatusBCD(), "Tab BCD", "SUBMITTED")) {
					return new ResponseEntity<>(new ApiResponse(false, "Tab BCD is not yet submitted."),
							HttpStatus.BAD_REQUEST);
				}

				if (report.getTabStatusE() != null && (report.getTabStatusE().equalsIgnoreCase("APPROVED")
						|| report.getTabStatusE().equalsIgnoreCase("REJECTED"))) {
					return new ResponseEntity<>(new ApiResponse(false, " Already Approved or Rejected."),
							HttpStatus.BAD_REQUEST);
				}

				handleTabE(report, userRole, userName, date, actions);

				objHistory = qaNonConformityReportHistoryRepository.fetchLastSubmittedRecord(report.getNcrNumber());

				BeanUtils.copyProperties(report, objHistory, IgnorePropsHistory);

				qaNonConformityReportHistoryRepository.save(objHistory);

				// MAIL
				if (report.getTabStatusE() != null && (report.getTabStatusE().equalsIgnoreCase("APPROVED"))) {
					try {

						qamailfunction.sendMailToProdSupervisor2ndLevel(report);
					} catch (Exception ex) {
						return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
								HttpStatus.OK);
					}
				}

//			default:
//				return new ResponseEntity<>(new ApiResponse(false, "Invalid tab name"), HttpStatus.BAD_REQUEST);
			}

			report.setStatus("OPEN");

			qaNonConformityReportRepository.save(report);

			return new ResponseEntity<>(report, HttpStatus.OK);

		} catch (Exception ex) {
			log.error("Error saving Non-Conformity Report: ", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to save Non-Conformity Report"),
					HttpStatus.BAD_REQUEST);
		}
	}

	private void handleHistory(QaNonConformityReport report, String tabName) {
		String ncrNumber = report.getNcrNumber();

		QaNonConformityReportHistory objHistory = new QaNonConformityReportHistory();

		String[] IgnoreProps = { "id", "createdBy", "createdAt" };

		if (tabName.equals("BCD")) {
			BeanUtils.copyProperties(report, objHistory);

			// version
			int version = qaNonConformityReportHistoryRepository.getMaximumVersion(ncrNumber).map(temp -> temp + 1)
					.orElse(1);

			objHistory.setVersion(version);
		} else if (tabName.equals("E")) {
			objHistory = qaNonConformityReportHistoryRepository.fetchLastSubmittedRecord(ncrNumber);

			BeanUtils.copyProperties(report, objHistory, IgnoreProps);

		}

		qaNonConformityReportHistoryRepository.save(objHistory);

	}
	// HANDLE TAB A

	private ResponseEntity<?> handleTabA(QaNonConformityReport report, String role, String userName, Date date,
			String action) throws Exception {

		report.setTabStatusA(action);
		report.setQaInspectorA(userName);
		Long inspectorId = userRepository.getUsernameByUserId(userName);
		report.setQaInspectorIdA(inspectorId);
		report.setQaInspectorDateA(date);

		report.setTabStatusE("");
		report.setTabStatusBCD("");

		report.setProductionSupervisorStatus("");
		report.setQaManagerStatus("");
		report.setProductionHeadStatus("");
		report.setQaInspectorStatus("");

		if (report.getTabStatus() != null && report.getTabStatus().equalsIgnoreCase("SUMBITTED_FOR_APPROVAL")) {
			report.setQaInspectorStatus(AppConstants.waitingStatus);
		}
		qaNonConformityReportRepository.save(report);

		return new ResponseEntity<>(report, HttpStatus.OK);

	}

	// HANDLE TAB BCD

	private ResponseEntity<?> handleTabBCD(QaNonConformityReport report, String role, String userName, Date date,
			String action) throws Exception {

		Long supervisorId = userRepository.getUsernameByUserId(userName);

		report.setTabStatusBCD(action);
		report.setProductionSupervisorBCD(userName);
		report.setProductionSupervisorIdBCD(supervisorId);
		report.setProductionSupervisorDateBCD(date);

		if (action.equalsIgnoreCase("SUBMITTED")) {
			report.setProductionSupervisorA(userName);
			report.setProductionSupervisorIdA(supervisorId);
			report.setProductionSupervisorDateA(date);
		}

		qaNonConformityReportRepository.save(report);

		return new ResponseEntity<>(report, HttpStatus.OK);
	}

	// HANDLE TAB E & DISPOSITION

	private ResponseEntity<?> handleTabE(QaNonConformityReport report, String role, String userName, Date date,
			String action) throws Exception {

		Long qaInspectorId = userRepository.getUsernameByUserId(userName);
		report.setQaInspectorBCD(userName);
		report.setQaInspectorIdBCD(qaInspectorId);
		report.setQaInspectorDateBCD(date);

		report.setTabStatusE(action);
		report.setQaInspectorE(userName);
		report.setQaInspectorIdE(qaInspectorId);
		report.setQaInspectorDateE(date);

		if (action.equalsIgnoreCase("REJECTED")) {
			report.setReason(report.getReason());

			report.setTabInternalStatus("REJECTED");

//			report.setTabStatusA("");
//			report.setTabStatusBCD("");
		} else if (action.equalsIgnoreCase("APPROVED")) {
			report.setQaInspectorSubmittedBy(userName);
			report.setQaInspectorSign(userName);
			report.setQaInspectorStatus(QaAppConstants.qaInspectorApprove);
			report.setQaInspectorSubmittedDate(date);
			report.setQaInspectorSubmittedId(qaInspectorId);

			report.setProductionSupervisorStatus(AppConstants.waitingStatus);
			report.setQaManagerStatus("");
			report.setProductionHeadStatus("");

			report.setTabStatus("SUMBITTED_FOR_APPROVAL");

			report.setTabInternalStatus("APPROVED");
		}

		qaNonConformityReportRepository.save(report);

		return new ResponseEntity<>(report, HttpStatus.OK);

	}

	// VALIDATE PREVIOUS TAB STATUS

	private Boolean validateTabSubmitted(String tabStatus, String tabName, String statusToNextStep) throws Exception {
		if (!statusToNextStep.equalsIgnoreCase(tabStatus)) {
			return false;
		}
		return true;
	}

	public ResponseEntity<?> approveRejectNcReport(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		QaNonConformityReport object = new QaNonConformityReport();

		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		String[] IgnoreProps = { "id", "createdBy", "createdAt", "version" };

		try {

			object = qaNonConformityReportRepository.findFormById(approvalResponse.getId());

			QaNonConformityReportHistory objHistory = new QaNonConformityReportHistory();

			String qaInspectorStatus = object.getQaInspectorStatus();

			String qaMrStatus = object.getQaManagerStatus();

			String supervisorStatus = object.getProductionSupervisorStatus();

			String hodStatus = object.getProductionHeadStatus();

			String status = "";

			if (qaInspectorStatus.equalsIgnoreCase(QaAppConstants.qaInspectorApprove)
					&& !(supervisorStatus.equalsIgnoreCase(QaAppConstants.prodSupApprove))) {

				if (userRole.equalsIgnoreCase(QaAppConstants.prodSupervisor)) {

					String reason = approvalResponse.getRemarks();

					objHistory = qaNonConformityReportHistoryRepository.fetchLastSubmittedRecord(object.getNcrNumber());

					if (approvalResponse.getStatus().equals("Approve")) {
						object.setProductionSupervisorStatus(QaAppConstants.prodSupApprove);
						object.setProductionHeadStatus(AppConstants.waitingStatus);
						status = "Approved";
						// MAIL
//						try {
//
//							qamailfunction.sendMailToProdHead(object);
//						} catch (Exception ex) {
//							return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
//									HttpStatus.OK);
//						}
					} else if (approvalResponse.getStatus().equals("Reject")) {
						object.setReason(reason);
						object.setProductionSupervisorStatus(QaAppConstants.prodSupReject);
						status = "Rejected";
					}

					object.setProductionSupervisorSubmittedBy(userName);
					object.setProductionSupervisorSubmittedId(userId);
					object.setProductionSupervisorSubmittedDate(date);
					object.setProductionSupervisorSign(userName);

					qaNonConformityReportRepository.save(object);

					BeanUtils.copyProperties(object, objHistory, IgnoreProps);

					qaNonConformityReportHistoryRepository.save(objHistory);

					if (status.equals("Approved")) {

						try {

							qamailfunction.sendMailToProdHead(object);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
									HttpStatus.OK);
						}

					}

					return new ResponseEntity<>(
							new ApiResponse(true, "PRODUCTION SUPERVISOR " + status + " Successfully"), HttpStatus.OK);

				} else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}
			} else if (supervisorStatus.equalsIgnoreCase(QaAppConstants.prodSupApprove)
					&& !(hodStatus.equalsIgnoreCase(QaAppConstants.prodHeadApprove))) {

				if (userRole.equalsIgnoreCase(QaAppConstants.prodHod)) {

					String reason = approvalResponse.getRemarks();

					objHistory = qaNonConformityReportHistoryRepository.fetchLastSubmittedRecord(object.getNcrNumber());

					if (approvalResponse.getStatus().equals("Approve")) {
						object.setProductionHeadStatus(QaAppConstants.prodHeadApprove);
						object.setQaManagerStatus(AppConstants.waitingStatus);
						status = "Approved";
						// MAIL

					} else if (approvalResponse.getStatus().equals("Reject")) {
						object.setReason(reason);
						object.setProductionHeadStatus(QaAppConstants.prodHeadReject);
						status = "Rejected";
					}

					object.setProductionHeadSubmittedBy(userName);
					object.setProductionHeadSubmittedId(userId);
					object.setProductionHeadSubmittedDate(date);
					object.setProductionHeadSign(userName);

					qaNonConformityReportRepository.save(object);

					BeanUtils.copyProperties(object, objHistory, IgnoreProps);

					qaNonConformityReportHistoryRepository.save(objHistory);

					if (status.equals("Approved")) {

						try {

							qamailfunction.sendMailToQaManager(object);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
									HttpStatus.OK);
						}

					}

					return new ResponseEntity<>(new ApiResponse(true, "PRODUCTION HEAD " + status + " Successfully"),
							HttpStatus.OK);

				} else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}
			} else if (hodStatus.equalsIgnoreCase(QaAppConstants.prodHeadApprove)
					&& !(qaMrStatus.equalsIgnoreCase(QaAppConstants.qaMrApprovedStatus))) {

				if (userRole.equalsIgnoreCase(QaAppConstants.qaManager)
						|| userRole.equalsIgnoreCase(QaAppConstants.qcManager)) {

					String reason = approvalResponse.getRemarks();

					objHistory = qaNonConformityReportHistoryRepository.fetchLastSubmittedRecord(object.getNcrNumber());

					if (approvalResponse.getStatus().equals("Approve")) {
						object.setStatus("CLOSED");
						object.setQaManagerStatus(QaAppConstants.qaMrApprovedStatus);
						status = "Approved";
					} else if (approvalResponse.getStatus().equals("Reject")) {
						object.setReason(reason);
						object.setQaManagerStatus(QaAppConstants.qaMrRejectedStatus);
						status = "Rejected";
					}

					object.setQaManagerSubmittedBy(userName);
					object.setQaManagerSubmittedId(userId);
					object.setQaManagerSubmittedDate(date);
					object.setQaManagerSign(userName);

					qaNonConformityReportRepository.save(object);

					BeanUtils.copyProperties(object, objHistory, IgnoreProps);

					qaNonConformityReportHistoryRepository.save(objHistory);

					return new ResponseEntity<>(
							new ApiResponse(true, "QA_MANAGER / QC_MANAGER " + status + " Successfully"),
							HttpStatus.OK);

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

	// SUMMARY

//	public ResponseEntity<?> getNcReportSummary(HttpServletRequest http) {
//
//		List<QaNonConformityReport> details = null;
//		try {
//			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
//
//			if (userRole.equalsIgnoreCase(QaAppConstants.qaInspector)
//					|| userRole.equalsIgnoreCase(QaAppConstants.qcChecmist)) {
//
//				details = qaNonConformityReportRepository.qaInspectorSummary();
//
//			} else if (userRole.equalsIgnoreCase(QaAppConstants.prodSupervisor)) {
//
//				details = qaNonConformityReportRepository.ProdSupSummary();
//
//			} else if (userRole.equalsIgnoreCase(QaAppConstants.prodHod)
//					|| userRole.equalsIgnoreCase(QaAppConstants.qaManager)
//					|| userRole.equalsIgnoreCase(QaAppConstants.qcManager)) {
//
//				details = qaNonConformityReportRepository.prodHeadQaMrSummary();
//
//			} else {
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

	public ResponseEntity<?> getNcReportSummary(String department, HttpServletRequest http) {

		List<QaNonConformityReport> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equalsIgnoreCase(QaAppConstants.qaInspector)
					|| userRole.equalsIgnoreCase(QaAppConstants.qcChecmist)) {

				details = qaNonConformityReportRepository.qaInspectorSummary();

			} else if (userRole.equalsIgnoreCase(QaAppConstants.prodSupervisor)) {

				details = qaNonConformityReportRepository.ProdSupSummary(department);

			} else if (userRole.equalsIgnoreCase(QaAppConstants.prodHod)) {

				details = qaNonConformityReportRepository.prodHeadSummary(department);

			} else if (userRole.equalsIgnoreCase(QaAppConstants.qaManager)
					|| userRole.equalsIgnoreCase(QaAppConstants.qcManager)) {

				details = qaNonConformityReportRepository.qaMrSummary();

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

	// Print API
	public ResponseEntity<?> getNCReportPrint(String year, String ncrNumber) {

		List<QaNonConformityReport> list;
		try {

			list = qaNonConformityReportRepository.printApi(year, ncrNumber);

			if (list == null || list.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity(list, HttpStatus.OK);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			log.error("*** !!! Error Getting Details. !!! ***" + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Error Getting Details."), HttpStatus.BAD_REQUEST);
		}
	}

	// NCR LOV Print
	public ResponseEntity<?> ncrNumberPrintLov(String financialYear) {
		List<String> response = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();

		try {
			response = qaNonConformityReportRepository.ncrNumberPrintLov(financialYear);
			if (response.isEmpty() || response == null) {
				return new ResponseEntity<>(new ApiResponse(true, "No data"), HttpStatus.OK);
			} else {
				Long id = (long) 1;
				for (String ncrNo : response) {
					IdAndValuePair values = new IdAndValuePair();
					values.setId(id);
					values.setValue(ncrNo);

					responseList.add(values);
					id++;
				}
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();
			log.error("*** !!! Error Getting Details. !!! ***" + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Error Getting Details."), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}

	// SUMMARY FOR NC LOGBOOK
	public ResponseEntity<?> getForNCLogbook(String year, HttpServletRequest http) {
		try {

			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("QA_MANAGER") || userRole.equals("ROLE_DESIGNEE")) {

				List<Map<String, Object>> list = qaNonConformityReportRepository.getForNCLogbook(year);

				if (list == null || list.isEmpty()) {
					return new ResponseEntity<>(new ApiResponse(true, "No data"), HttpStatus.OK);
				}

				return new ResponseEntity<>(list, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// Print API NC LOGBOOK
	public ResponseEntity<?> getNCLogbookPrint(String year) {

		List<QaNonConformityReport> list;
		try {

			list = qaNonConformityReportRepository.printApiForNCLogbook(year);

			if (list == null || list.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity(list, HttpStatus.OK);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			log.error("*** !!! Error Getting Details. !!! ***" + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Error Getting Details."), HttpStatus.BAD_REQUEST);
		}
	}

	// Trend chart

	public ResponseEntity<?> trendChartApi(String financialYear) {
		try {
			List<Object[]> results = qaNonConformityReportRepository.trendChartApi(financialYear);

			Map<String, Long> response = results.stream().collect(
					Collectors.toMap(result -> (String) result[0], result -> ((Number) result[1]).longValue()));

			// Calculate the total count
			long total = response.values().stream().mapToLong(Long::longValue).sum();

			// Add the total to the response map
			response.put("Total", total);

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// BMR LOV
	public ResponseEntity<?> bleachingBmrLov() {
		List<String> response = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();

		try {
			response = qaNonConformityReportRepository.bleachingBmrLov();
			if (response.isEmpty() || response == null) {
				return new ResponseEntity<>(new ApiResponse(true, "No data"), HttpStatus.OK);
			} else {
				Long id = (long) 1;
				for (String ncrNo : response) {
					IdAndValuePair values = new IdAndValuePair();
					values.setId(id);
					values.setValue(ncrNo);

					responseList.add(values);
					id++;
				}
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();
			log.error("*** !!! Error Getting Details. !!! ***" + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Error Getting Details."), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}

	// ------------------------------------------------------ CHANGE CONTROL FORM
	// ------------------------------------------------------------

	public ResponseEntity<?> SaveSubmitChangeControlForm(QaChangeControlForm details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		QaChangeControlForm listObj = null;
		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			Long departmentId = qaChangeControlFormRepository.fetchDepartmentIdByUsername(userName);

//				System.out.println("departmentId" + departmentId);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			String tabName = details.getTabName();
			String action = details.getAction();

			if (details.getFormId() != null) {

				listObj = qaChangeControlFormRepository.findFormById(details.getFormId());

				String[] IgnoreProps = { "formId", "createdBy", "createdAt", "statusTab1", "hodSaveOnTab1",
						"hodSaveByTab1", "hodSaveIdTab1", "hodSubmitOnTab1", "hodSubmitByTab1", "hodSubmitIdTab1",
						"hodSignTab1", "statusTab2", "qaManagerSaveOnTab2", "qaManagerSaveByTab2",
						"qaManagerSaveIdTab2", "qaManagerSubmitOnTab2", "qaManagerSubmitByTab2",
						"qaManagerSubmitIdTab2", "qaManagerSignTab2", "statusTab3", "qaManagerSaveOnTab3",
						"qaManagerSaveByTab3", "qaManagerSaveIdTab3", "qaManagerSubmitOnTab3", "qaManagerSubmitByTab3",
						"qaManagerSubmitIdTab3", "qaManagerSignTab3", "statusTab4", "statusTab5", "qaManagerSaveOnTab5",
						"qaManagerSaveByTab5", "qaManagerSaveIdTab5", "qaManagerSubmitOnTab5", "qaManagerSubmitByTab5",
						"qaManagerSubmitIdTab5", "qaManagerSignTab5", "statusTab6", "qaManagerSaveOnTab6",
						"qaManagerSaveByTab6", "qaManagerSaveIdTab6", "qaManagerSubmitOnTab6", "qaManagerSubmitByTab6",
						"qaManagerSubmitIdTab6", "qaManagerSignTab6", "statusTab7", "qaManagerSaveOnTab7",
						"qaManagerSaveByTab7", "qaManagerSaveIdTab7", "qaManagerSubmitOnTab7", "qaManagerSubmitByTab7",
						"qaManagerSubmitIdTab7", "qaManagerSignTab7", "statusTab8", "hodStatusTab8", "hodSaveOnTab8",
						"hodSaveByTab8", "hodSaveIdTab8", "hodSubmitOnTab8", "hodSubmitByTab8", "hodSubmitIdTab8",
						"hodSignTab8", "qaManagerStatusTab8", "qaManagerSubmitOnTab8", "qaManagerSubmitByTab8",
						"qaManagerSubmitIdTab8", "qaManagerSignTab8", "statusTab9", "hodSaveOnTab9", "hodSaveByTab9",
						"hodSaveIdTab9", "hodSubmitOnTab9", "hodSubmitByTab9", "hodSubmitIdTab9", "hodSignTab9",
						"statusTab10", "hodSaveOnTab10", "hodSaveByTab10", "hodSaveIdTab10", "hodSubmitOnTab10",
						"hodSubmitByTab10", "hodSubmitIdTab10", "hodSignTab10", "statusTab11", "hodSaveOnTab11",
						"hodSaveByTab11", "hodSaveIdTab11", "hodSubmitOnTab11", "hodSubmitByTab11", "hodSubmitIdTab11",
						"hodSignTab11", "statusTab12", "qaManagerSaveOnTab12", "qaManagerSaveByTab12",
						"qaManagerSaveIdTab12", "qaManagerSubmitOnTab12", "qaManagerSubmitByTab12",
						"qaManagerSubmitIdTab12", "qaManagerSignTab12", "details" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

			} else {
				listObj = details;
			}

			if (listObj.getStatusTab12() != null && listObj.getStatusTab12().equalsIgnoreCase("SUBMITTED")) {
				return new ResponseEntity<>(new ApiResponse(false, "Already Submitted."), HttpStatus.BAD_REQUEST);
			}

			if (tabName.equalsIgnoreCase("TAB_1")) {
				if (!role.equalsIgnoreCase("ROLE_HOD")
						&& (!role.equalsIgnoreCase("ROLE_DESIGNEE") || departmentId == 6)) {
					return new ResponseEntity<>(new ApiResponse(false, role + " is not authorized to access this tab."),
							HttpStatus.BAD_REQUEST);
				}

				if (listObj.getStatusTab1() != null && listObj.getStatusTab1().equalsIgnoreCase("SUBMITTED")) {
					return new ResponseEntity<>(new ApiResponse(false, "Already Submitted."), HttpStatus.BAD_REQUEST);
				}

				if (action.equalsIgnoreCase("SAVED")) {
					listObj.setHodSaveByTab1(userName);
					listObj.setHodSaveOnTab1(date);
					listObj.setHodSaveIdTab1(userId);
				} else if (action.equalsIgnoreCase("SUBMITTED")) {
					listObj.setHodSubmitByTab1(userName);
					listObj.setHodSubmitOnTab1(date);
					listObj.setHodSubmitIdTab1(userId);
					listObj.setHodSignTab1(userName);
				}

				listObj.setStatusTab1(action);

			} else if (tabName.equalsIgnoreCase("TAB_2")) {

				if (!role.equalsIgnoreCase("QA_MANAGER")
						&& !(role.equalsIgnoreCase("ROLE_DESIGNEE") && departmentId == 6)) {
					return new ResponseEntity<>(new ApiResponse(false, role + " is not authorized to access this tab."),
							HttpStatus.BAD_REQUEST);
				}

				if (listObj.getStatusTab2() != null && listObj.getStatusTab2().equalsIgnoreCase("SUBMITTED")) {
					return new ResponseEntity<>(new ApiResponse(false, "Already Submitted."), HttpStatus.BAD_REQUEST);
				}

				if (action.equalsIgnoreCase("SAVED")) {
					listObj.setQaManagerSaveByTab2(userName);
					listObj.setQaManagerSaveOnTab2(date);
					listObj.setQaManagerSaveIdTab2(userId);
				} else if (action.equalsIgnoreCase("SUBMITTED")) {
					listObj.setQaManagerSubmitByTab2(userName);
					listObj.setQaManagerSubmitOnTab2(date);
					listObj.setQaManagerSubmitIdTab2(userId);
					listObj.setQaManagerSignTab2(userName);
				}

				listObj.setStatusTab2(action);

			} else if (tabName.equalsIgnoreCase("TAB_3")) {

				if (!role.equalsIgnoreCase("QA_MANAGER")
						&& !(role.equalsIgnoreCase("ROLE_DESIGNEE") && departmentId == 6)) {
					return new ResponseEntity<>(new ApiResponse(false, role + " is not authorized to access this tab."),
							HttpStatus.BAD_REQUEST);
				}

				if (listObj.getStatusTab3() != null && listObj.getStatusTab3().equalsIgnoreCase("SUBMITTED")) {
					return new ResponseEntity<>(new ApiResponse(false, "Already Submitted."), HttpStatus.BAD_REQUEST);
				}

				if (action.equalsIgnoreCase("SAVED")) {
					listObj.setQaManagerSaveByTab3(userName);
					listObj.setQaManagerSaveOnTab3(date);
					listObj.setQaManagerSaveIdTab3(userId);
				} else if (action.equalsIgnoreCase("SUBMITTED")) {
					listObj.setQaManagerSubmitByTab3(userName);
					listObj.setQaManagerSubmitOnTab3(date);
					listObj.setQaManagerSubmitIdTab3(userId);
					listObj.setQaManagerSignTab3(userName);
				}

				listObj.setStatusTab3(action);

			} else if (tabName.equalsIgnoreCase("TAB_4")) {

				listObj.setStatusTab4(action);

			} else if (tabName.equalsIgnoreCase("TAB_5")) {

				if (!role.equalsIgnoreCase("QA_MANAGER")
						&& !(role.equalsIgnoreCase("ROLE_DESIGNEE") && departmentId == 6)) {
					return new ResponseEntity<>(new ApiResponse(false, role + " is not authorized to access this tab."),
							HttpStatus.BAD_REQUEST);
				}

				if (listObj.getStatusTab5() != null && listObj.getStatusTab5().equalsIgnoreCase("SUBMITTED")) {
					return new ResponseEntity<>(new ApiResponse(false, "Already Submitted."), HttpStatus.BAD_REQUEST);
				}

				qaChangeControlFormRepository.save(listObj);

				List<QaChangeControlAssessmentAndCreation> list = details.getDetails();

				for (QaChangeControlAssessmentAndCreation detail : list) {
					detail.setFormId(listObj.getFormId());
					qaChangeControlAssessmentAndCreationRepository.save(detail);
				}

				listObj.setStatusTab5(action);
				listObj.setDetails(list);

				if (action.equalsIgnoreCase("SAVED")) {
					listObj.setQaManagerSaveByTab5(userName);
					listObj.setQaManagerSaveOnTab5(date);
					listObj.setQaManagerSaveIdTab5(userId);
				} else if (action.equalsIgnoreCase("SUBMITTED")) {
					listObj.setQaManagerSubmitByTab5(userName);
					listObj.setQaManagerSubmitOnTab5(date);
					listObj.setQaManagerSubmitIdTab5(userId);
					listObj.setQaManagerSignTab5(userName);
				}

			} else if (tabName.equalsIgnoreCase("TAB_6")) {

				if (!role.equalsIgnoreCase("QA_MANAGER")
						&& !(role.equalsIgnoreCase("ROLE_DESIGNEE") && departmentId == 6)) {
					return new ResponseEntity<>(new ApiResponse(false, role + " is not authorized to access this tab."),
							HttpStatus.BAD_REQUEST);
				}

				if (listObj.getStatusTab6() != null && listObj.getStatusTab6().equalsIgnoreCase("SUBMITTED")) {
					return new ResponseEntity<>(new ApiResponse(false, "Already Submitted."), HttpStatus.BAD_REQUEST);
				}

				listObj.setStatusTab6(action);

				if (action.equalsIgnoreCase("SAVED")) {
					listObj.setQaManagerSaveByTab6(userName);
					listObj.setQaManagerSaveOnTab6(date);
					listObj.setQaManagerSaveIdTab6(userId);
				} else if (action.equalsIgnoreCase("SUBMITTED")) {
					listObj.setQaManagerSubmitByTab6(userName);
					listObj.setQaManagerSubmitOnTab6(date);
					listObj.setQaManagerSubmitIdTab6(userId);
					listObj.setQaManagerSignTab6(userName);
				}

			} else if (tabName.equalsIgnoreCase("TAB_7")) {

				if (!role.equalsIgnoreCase("QA_MANAGER")
						&& !(role.equalsIgnoreCase("ROLE_DESIGNEE") && departmentId == 6)) {
					return new ResponseEntity<>(new ApiResponse(false, role + " is not authorized to access this tab."),
							HttpStatus.BAD_REQUEST);
				}

				if (listObj.getStatusTab7() != null && listObj.getStatusTab7().equalsIgnoreCase("SUBMITTED")) {
					return new ResponseEntity<>(new ApiResponse(false, "Already Submitted."), HttpStatus.BAD_REQUEST);
				}

				listObj.setStatusTab7(action);

				if (action.equalsIgnoreCase("SAVED")) {
					listObj.setQaManagerSaveByTab7(userName);
					listObj.setQaManagerSaveOnTab7(date);
					listObj.setQaManagerSaveIdTab7(userId);
				} else if (action.equalsIgnoreCase("SUBMITTED")) {
					listObj.setQaManagerSubmitByTab7(userName);
					listObj.setQaManagerSubmitOnTab7(date);
					listObj.setQaManagerSubmitIdTab7(userId);
					listObj.setQaManagerSignTab7(userName);
				}

			} else if (tabName.equalsIgnoreCase("TAB_8")) {

				if (listObj.getHodStatusTab8() == null || !listObj.getHodStatusTab8().equalsIgnoreCase("SUBMITTED")) {
					if (role.equalsIgnoreCase("ROLE_HOD")
							|| (role.equalsIgnoreCase("ROLE_DESIGNEE") && departmentId != 6)) {

						if (action.equalsIgnoreCase("SAVED")) {
							listObj.setHodSaveByTab8(userName);
							listObj.setHodSaveOnTab8(date);
							listObj.setHodSaveIdTab8(userId);
							listObj.setHodStatusTab8(action);
						} else if (action.equalsIgnoreCase("SUBMITTED")) {
							listObj.setHodSubmitByTab8(userName);
							listObj.setHodSubmitOnTab8(date);
							listObj.setHodSubmitIdTab8(userId);
							listObj.setHodSignTab8(userName);
							listObj.setHodStatusTab8(action);
							listObj.setQaManagerStatusTab8(AppConstants.waitingStatus);
						} else {
							return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
						}

						listObj.setStatusTab8(action);

					} else {
						return new ResponseEntity<>(
								new ApiResponse(false, role + " is not authorized to access this tab."),
								HttpStatus.BAD_REQUEST);
					}
				} else if (listObj.getHodStatusTab8().equalsIgnoreCase("SUBMITTED")
						&& listObj.getQaManagerStatusTab8() != null
						&& !listObj.getQaManagerStatusTab8().equalsIgnoreCase("APPROVED")) {
					if (role.equalsIgnoreCase("QA_MANAGER")
							|| (role.equalsIgnoreCase("ROLE_DESIGNEE") && departmentId == 6)) {

						if (action.equalsIgnoreCase("APPROVED")) {
							listObj.setQaManagerSubmitByTab8(userName);
							listObj.setQaManagerSubmitOnTab8(date);
							listObj.setQaManagerSubmitIdTab8(userId);
							listObj.setStatusTab8(action);
							listObj.setQaManagerStatusTab8(action);
							listObj.setQaManagerSignTab8(userName);
						} else {
							return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
						}
					} else {
						return new ResponseEntity<>(
								new ApiResponse(false, role + " is not authorized to access this tab."),
								HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
				}

			} else if (tabName.equalsIgnoreCase("TAB_9")) {

				if (!role.equalsIgnoreCase("ROLE_HOD")
						&& (!role.equalsIgnoreCase("ROLE_DESIGNEE") || departmentId == 6)) {
					return new ResponseEntity<>(new ApiResponse(false, role + " is not authorized to access this tab."),
							HttpStatus.BAD_REQUEST);
				}

				if (listObj.getStatusTab9() != null && listObj.getStatusTab9().equalsIgnoreCase("SUBMITTED")) {
					return new ResponseEntity<>(new ApiResponse(false, "Already Submitted."), HttpStatus.BAD_REQUEST);
				}

				listObj.setStatusTab9(action);

				if (action.equalsIgnoreCase("SAVED")) {
					listObj.setHodSaveByTab9(userName);
					listObj.setHodSaveOnTab9(date);
					listObj.setHodSaveIdTab9(userId);
				} else if (action.equalsIgnoreCase("SUBMITTED")) {
					listObj.setHodSubmitByTab9(userName);
					listObj.setHodSubmitOnTab9(date);
					listObj.setHodSubmitIdTab9(userId);
					listObj.setHodSignTab9(userName);
				}

			} else if (tabName.equalsIgnoreCase("TAB_10")) {

				if (!role.equalsIgnoreCase("ROLE_HOD")
						&& (!role.equalsIgnoreCase("ROLE_DESIGNEE") || departmentId == 6)) {
					return new ResponseEntity<>(new ApiResponse(false, role + " is not authorized to access this tab."),
							HttpStatus.BAD_REQUEST);
				}

				if (listObj.getStatusTab10() != null && listObj.getStatusTab10().equalsIgnoreCase("SUBMITTED")) {
					return new ResponseEntity<>(new ApiResponse(false, "Already Submitted."), HttpStatus.BAD_REQUEST);
				}

				listObj.setStatusTab10(action);

				if (action.equalsIgnoreCase("SAVED")) {
					listObj.setHodSaveByTab10(userName);
					listObj.setHodSaveOnTab10(date);
					listObj.setHodSaveIdTab10(userId);
				} else if (action.equalsIgnoreCase("SUBMITTED")) {
					listObj.setHodSubmitByTab10(userName);
					listObj.setHodSubmitOnTab10(date);
					listObj.setHodSubmitIdTab10(userId);
					listObj.setHodSignTab10(userName);
				}

			} else if (tabName.equalsIgnoreCase("TAB_11")) {

				if (!role.equalsIgnoreCase("ROLE_HOD")
						&& (!role.equalsIgnoreCase("ROLE_DESIGNEE") || departmentId == 6)) {
					return new ResponseEntity<>(new ApiResponse(false, role + " is not authorized to access this tab."),
							HttpStatus.BAD_REQUEST);
				}

				if (listObj.getStatusTab11() != null && listObj.getStatusTab11().equalsIgnoreCase("SUBMITTED")) {
					return new ResponseEntity<>(new ApiResponse(false, "Already Submitted."), HttpStatus.BAD_REQUEST);
				}

				listObj.setStatusTab11(action);

				if (action.equalsIgnoreCase("SAVED")) {
					listObj.setHodSaveByTab11(userName);
					listObj.setHodSaveOnTab11(date);
					listObj.setHodSaveIdTab11(userId);
				} else if (action.equalsIgnoreCase("SUBMITTED")) {
					listObj.setHodSubmitByTab11(userName);
					listObj.setHodSubmitOnTab11(date);
					listObj.setHodSubmitIdTab11(userId);
					listObj.setHodSignTab11(userName);
				}

			} else if (tabName.equalsIgnoreCase("TAB_12")) {

				if (!role.equalsIgnoreCase("QA_MANAGER")
						&& !(role.equalsIgnoreCase("ROLE_DESIGNEE") && departmentId == 6)) {
					return new ResponseEntity<>(new ApiResponse(false, role + " is not authorized to access this tab."),
							HttpStatus.BAD_REQUEST);
				}

				if (listObj.getStatusTab12() != null && listObj.getStatusTab12().equalsIgnoreCase("SUBMITTED")) {
					return new ResponseEntity<>(new ApiResponse(false, "Already Submitted."), HttpStatus.BAD_REQUEST);
				}

				listObj.setStatusTab12(action);

				if (action.equalsIgnoreCase("SAVED")) {
					listObj.setQaManagerSaveByTab12(userName);
					listObj.setQaManagerSaveOnTab12(date);
					listObj.setQaManagerSaveIdTab12(userId);
				} else if (action.equalsIgnoreCase("SUBMITTED")) {
					listObj.setQaManagerSubmitByTab12(userName);
					listObj.setQaManagerSubmitOnTab12(date);
					listObj.setQaManagerSubmitIdTab12(userId);
					listObj.setQaManagerSignTab12(userName);
				}

			} else {

				return new ResponseEntity<>(new ApiResponse(false, "Invalid tab name"), HttpStatus.BAD_REQUEST);
			}

			qaChangeControlFormRepository.save(listObj);

		} catch (Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	// get by param
	public ResponseEntity<?> getByParamChangeControlForm(String date, String changeControlTo) {

		QaChangeControlForm list;
		try {

			list = qaChangeControlFormRepository.getByParam(date, changeControlTo);

			if (list == null) {
				return new ResponseEntity<>(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity(list, HttpStatus.OK);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			log.error("*** !!! Error Getting Details. !!! ***" + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Error Getting Details."), HttpStatus.BAD_REQUEST);
		}
	}

	// hod summary
	public ResponseEntity<?> getChangeControlHodSummary(HttpServletRequest http) {

		List<QaChangeControlForm> details = null;
		try {
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (role.equalsIgnoreCase("ROLE_HOD") || role.equalsIgnoreCase("ROLE_DESIGNEE")) {

				details = qaChangeControlFormRepository.hodSummary();

			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

	// QA summary
	public ResponseEntity<?> getChangeControlQASummary(HttpServletRequest http) {

		List<QaChangeControlForm> details = null;
		try {
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (role.equalsIgnoreCase("QA_MANAGER") || role.equalsIgnoreCase("ROLE_DESIGNEE")) {

				details = qaChangeControlFormRepository.qaSummary();

			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getChangeControlPrint(String month, String year, String department,
			String changeControlNumber) {

		List<QaChangeControlForm> list;
		try {

			list = qaChangeControlFormRepository.printApi(month, year, department, changeControlNumber);

			if (list == null || list.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity(list, HttpStatus.OK);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			log.error("*** !!! Error Getting Details. !!! ***" + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Error Getting Details."), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> changeControlNumberLov() {
		List<String> response = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();

		try {
			response = qaChangeControlFormRepository.changeControlNumberLov();
			if (response.isEmpty() || response == null) {
				return new ResponseEntity<>(new ApiResponse(true, "No data"), HttpStatus.OK);
			} else {
				Long id = (long) 1;
				for (String ncrNo : response) {
					IdAndValuePair values = new IdAndValuePair();
					values.setId(id);
					values.setValue(ncrNo);

					responseList.add(values);
					id++;
				}
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();
			log.error("*** !!! Error Getting Details. !!! ***" + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Error Getting Details."), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}

	// delete api
	public ResponseEntity<?> deleteChangeControlLine(Long id) {
		try {

			QaChangeControlAssessmentAndCreation details = qaChangeControlAssessmentAndCreationRepository
					.findFormById(id);

			if (details == null) {
				return new ResponseEntity(new ApiResponse(false, "No data for the id : " + id), HttpStatus.BAD_REQUEST);
			}

			qaChangeControlAssessmentAndCreationRepository.deleteById(id);

		} catch (Exception ex) {

			log.error(" **** Unable to delete details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
	}

	// ------------------------------------------------------ TRAINING SESSION
	// ALLOTMENT REGISTER
	// ------------------------------------------------------------

	public ResponseEntity<?> SaveTrainingSessionRegister(QaTrainingSessionAllotmentRegister details,
			HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		QaTrainingSessionAllotmentRegister listObj = null;
		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getFormId() != null) {

				listObj = qaTrainingSessionAllotmentRegisterRepository.findFormById(details.getFormId());

				String[] IgnoreProps = { "formId", "createdBy", "createdAt", "hodStatus", "hodSaveOn", "hodSaveBy",
						"hodSaveId", "hodSubmitOn", "hodSubmitBy", "hodSubmitId", "hodSign", "details" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

			} else {
				listObj = details;
			}

			if (role.equalsIgnoreCase("ROLE_HOD") || role.equalsIgnoreCase("ROLE_DESIGNEE")) {

				qaTrainingSessionAllotmentRegisterRepository.save(listObj);

				List<QaTrainingSessionAllotmentRegisterLine> list = details.getDetails();

				for (QaTrainingSessionAllotmentRegisterLine detail : list) {
					detail.setFormId(listObj.getFormId());
					qaTrainingSessionAllotmentRegisterLineRepository.save(detail);
				}

				listObj.setDetails(list);

				listObj.setHodSaveBy(userName);
				listObj.setHodSaveOn(date);
				listObj.setHodSaveId(userId);
				listObj.setHodStatus(QaAppConstants.hodSaved);

				qaTrainingSessionAllotmentRegisterRepository.save(listObj);

			} else {
				return new ResponseEntity(new ApiResponse(false, role + " is not authorize to access the form."),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	public ResponseEntity<?> SubmitTrainingSessionRegister(QaTrainingSessionAllotmentRegister details,
			HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getFormId();

		QaTrainingSessionAllotmentRegister checkObj = new QaTrainingSessionAllotmentRegister();

		try {
			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = qaTrainingSessionAllotmentRegisterRepository.findFormById(id);

				String[] IgnoreProps = { "formId", "createdBy", "createdAt", "hodStatus", "hodSaveOn", "hodSaveBy",
						"hodSaveId", "hodSubmitOn", "hodSubmitBy", "hodSubmitId", "hodSign", "details" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

			} else {
				checkObj = details;
			}

			if (checkObj.getHodStatus() != null
					&& checkObj.getHodStatus().equalsIgnoreCase(QaAppConstants.hodSubmitted)) {
				return new ResponseEntity<>(new ApiResponse(false, "Already Submitted."), HttpStatus.BAD_REQUEST);
			}

			if (role.equalsIgnoreCase("ROLE_HOD") || role.equalsIgnoreCase("ROLE_DESIGNEE")) {

				qaTrainingSessionAllotmentRegisterRepository.save(checkObj);

				List<QaTrainingSessionAllotmentRegisterLine> list = details.getDetails();

				for (QaTrainingSessionAllotmentRegisterLine detail : list) {
					detail.setFormId(checkObj.getFormId());
					qaTrainingSessionAllotmentRegisterLineRepository.save(detail);
				}

				checkObj.setDetails(list);

				checkObj.setHodSubmitBy(userName);
				checkObj.setHodSubmitOn(date);
				checkObj.setHodSubmitId(userId);
				checkObj.setHodStatus(QaAppConstants.hodSubmitted);
				checkObj.setHodSign(userName);

				qaTrainingSessionAllotmentRegisterRepository.save(checkObj);

			} else {
				return new ResponseEntity(new ApiResponse(false, role + " is not authorize to access the form."),
						HttpStatus.BAD_REQUEST);
			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "HOD / DESIGNEE Submitted Sucessfully"), HttpStatus.OK);

//			return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	public ResponseEntity<?> getTrainingSessionRegisterSummary(String department, HttpServletRequest http) {

		List<QaTrainingSessionAllotmentRegister> details = null;

		try {
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (role.equalsIgnoreCase("ROLE_HOD") || role.equalsIgnoreCase("ROLE_DESIGNEE")) {

				details = qaTrainingSessionAllotmentRegisterRepository.hodSummary(department);

			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

	// get by param
	public ResponseEntity<?> getByParamTrainingSessionRegister(String date, String department) {

		QaTrainingSessionAllotmentRegister list;
		try {

			list = qaTrainingSessionAllotmentRegisterRepository.findByparam(date, department);

			if (list == null) {
				return new ResponseEntity<>(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity(list, HttpStatus.OK);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			log.error("*** !!! Error Getting Details. !!! ***" + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Error Getting Details."), HttpStatus.BAD_REQUEST);
		}
	}

	// Print
	public ResponseEntity<?> getTrainingSessionRegisterPrint(String month, String year, String department) {
		try {

			List<QaTrainingSessionAllotmentRegister> details = qaTrainingSessionAllotmentRegisterRepository
					.printApi(month, year, department);

			if (details == null || details.isEmpty()) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Unable to get Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// delete by id
	public ResponseEntity<?> deleteTrainingSessionRegisterLine(Long id) {
		try {

			QaTrainingSessionAllotmentRegisterLine details = qaTrainingSessionAllotmentRegisterLineRepository
					.findFormById(id);

			if (details == null) {
				return new ResponseEntity(new ApiResponse(false, "No data for the id : " + id), HttpStatus.BAD_REQUEST);
			}

			qaTrainingSessionAllotmentRegisterLineRepository.deleteById(id);

		} catch (Exception ex) {

			log.error(" **** Unable to delete details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
	}

	// ------------------------------------------------------------------- TRAINING
	// NEED IDENTIFICATION FORM
	// ---------------------------------------------------------------------

	public ResponseEntity<?> SaveTrainingNeedIdentificationForm(QaTrainingNeedIdentificationForm details,
			HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		QaTrainingNeedIdentificationForm listObj = null;
		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getFormId() != null) {

				listObj = qaTrainingNeedIdentificationFormRepository.findFormById(details.getFormId());

				String[] IgnoreProps = { "formId", "createdBy", "createdAt", "hodStatus", "hodSaveOn", "hodSaveBy",
						"hodSaveId", "hodSubmitOn", "hodSubmitBy", "hodSubmitId", "hodSign", "qaManagerStatus",
						"qaManagerSubmitOn", "qaManagerSubmitBy", "qaManagerSubmitId", "qaManagerSign", "details" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

			} else {
				listObj = details;
			}

			if (role.equalsIgnoreCase("ROLE_HOD") || role.equalsIgnoreCase("ROLE_DESIGNEE")) {

				qaTrainingNeedIdentificationFormRepository.save(listObj);

				List<QaTrainingNeedIdentificationFormLine> list = details.getDetails();

				for (QaTrainingNeedIdentificationFormLine detail : list) {
					detail.setFormId(listObj.getFormId());
					qaTrainingNeedIdentificationFormLineRepository.save(detail);
				}

				listObj.setDetails(list);

				listObj.setHodSaveBy(userName);
				listObj.setHodSaveOn(date);
				listObj.setHodSaveId(userId);
				listObj.setHodStatus(QaAppConstants.hodSaved);

				listObj.setQaManagerStatus("");

				qaTrainingNeedIdentificationFormRepository.save(listObj);

			} else {
				return new ResponseEntity(new ApiResponse(false, role + " is not authorize to access the form."),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	public ResponseEntity<?> SubmitTrainingNeedIdentificationForm(QaTrainingNeedIdentificationForm details,
			HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getFormId();

		QaTrainingNeedIdentificationForm checkObj = new QaTrainingNeedIdentificationForm();

		try {
			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = qaTrainingNeedIdentificationFormRepository.findFormById(id);

				String[] IgnoreProps = { "formId", "createdBy", "createdAt", "hodStatus", "hodSaveOn", "hodSaveBy",
						"hodSaveId", "hodSubmitOn", "hodSubmitBy", "hodSubmitId", "hodSign", "qaManagerStatus",
						"qaManagerSubmitOn", "qaManagerSubmitBy", "qaManagerSubmitId", "qaManagerSign", "details" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

			} else {
				checkObj = details;
			}

			if ((id == null) || (!checkObj.getHodStatus().equals(QaAppConstants.hodSubmitted)
					|| checkObj.getQaManagerStatus().equals(QaAppConstants.QaManagerReject))) {
				if (role.equalsIgnoreCase("ROLE_HOD") || role.equalsIgnoreCase("ROLE_DESIGNEE")) {

					qaTrainingNeedIdentificationFormRepository.save(checkObj);

					List<QaTrainingNeedIdentificationFormLine> list = details.getDetails();

					for (QaTrainingNeedIdentificationFormLine detail : list) {
						detail.setFormId(checkObj.getFormId());
						qaTrainingNeedIdentificationFormLineRepository.save(detail);
					}

					checkObj.setDetails(list);

					checkObj.setHodSubmitBy(userName);
					checkObj.setHodSubmitOn(date);
					checkObj.setHodSubmitId(userId);
					checkObj.setHodStatus(QaAppConstants.hodSubmitted);
					checkObj.setHodSign(userName);

					checkObj.setQaManagerStatus(AppConstants.waitingStatus);

					qaTrainingNeedIdentificationFormRepository.save(checkObj);

					QaTrainingNeedIdentificationFormHistory reportHistory = new QaTrainingNeedIdentificationFormHistory();

					// getter setters fields & status

					reportHistory.setFormatName(checkObj.getFormatName());
					reportHistory.setFormatNo(checkObj.getFormatNo());
					reportHistory.setRevisionNo(checkObj.getRevisionNo());
					reportHistory.setSopNumber(checkObj.getSopNumber());
					reportHistory.setUnit(checkObj.getUnit());

					reportHistory.setDate(checkObj.getDate());
					reportHistory.setYear(checkObj.getYear());
					reportHistory.setDepartment(checkObj.getDepartment());

					// status
					reportHistory.setHodSubmitBy(checkObj.getHodSubmitBy());
					reportHistory.setHodSubmitId(checkObj.getHodSubmitId());
					reportHistory.setHodSubmitOn(checkObj.getHodSubmitOn());
					reportHistory.setHodStatus(checkObj.getHodStatus());
					reportHistory.setHodSign(checkObj.getHodSign());

					reportHistory.setQaManagerStatus(checkObj.getQaManagerStatus());

					// version
//					String date1 = reportHistory.getDate();

					String department = reportHistory.getDepartment();

					String year = reportHistory.getYear();

					int version = qaTrainingNeedIdentificationFormHistoryRepository.getMaximumVersion(department, year)
							.map(temp -> temp + 1).orElse(1);

					reportHistory.setVersion(version);

					qaTrainingNeedIdentificationFormHistoryRepository.save(reportHistory); // ONE HISTORY

					List<QaTrainingNeedIdentificationFormLine> historyMapList = checkObj.getDetails();

					for (QaTrainingNeedIdentificationFormLine obj : historyMapList) {

						QaTrainingNeedIdentificationFormLineHistory objHistory = new QaTrainingNeedIdentificationFormLineHistory();

						BeanUtils.copyProperties(obj, objHistory);
						objHistory.setHistoryId(reportHistory.getHistoryId());
						qaTrainingNeedIdentificationFormLineHistoryRepository.save(objHistory);

					}

					qaTrainingNeedIdentificationFormHistoryRepository.save(reportHistory);

					// MAIL
					try {

						qamailfunction.sendMailToQaManagerF005(checkObj);
						qamailfunction.sendMailToDesigneeF005(checkObj);

					} catch (Exception ex) {
						return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
								HttpStatus.OK);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " is not authorize to access the form."),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity(new ApiResponse(false, " Invalid status."), HttpStatus.BAD_REQUEST);
			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "HOD / DESIGNEE Submitted Sucessfully"), HttpStatus.OK);

//		return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	public ResponseEntity<?> approveRejectTrainingNeedIdentificationForm(ApproveResponse approvalResponse,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		QaTrainingNeedIdentificationForm object = new QaTrainingNeedIdentificationForm();

		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = qaTrainingNeedIdentificationFormRepository.findFormById(approvalResponse.getId());

			QaTrainingNeedIdentificationFormHistory objHistory = new QaTrainingNeedIdentificationFormHistory();

			String hodStatus = object.getHodStatus();

			String qaManagerStatus = object.getQaManagerStatus();

			String status = "";

			if (hodStatus.equalsIgnoreCase(QaAppConstants.hodSubmitted)
					&& qaManagerStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("QA_MANAGER") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					String reason = approvalResponse.getRemarks();

					objHistory = qaTrainingNeedIdentificationFormHistoryRepository
							.fetchLastSubmittedRecord(object.getDepartment(), object.getYear());

					if (approvalResponse.getStatus().equals("Approve")) {
						object.setQaManagerStatus(QaAppConstants.QaManagerApproved);
						objHistory.setQaManagerStatus(QaAppConstants.QaManagerApproved);
						status = "Approved";
					} else if (approvalResponse.getStatus().equals("Reject")) {
						object.setReason(reason);
						object.setQaManagerStatus(QaAppConstants.QaManagerReject);
						objHistory.setReason(reason);
						objHistory.setQaManagerStatus(QaAppConstants.QaManagerReject);
						status = "Rejected";
					}

					object.setQaManagerSubmitOn(date);
					object.setQaManagerSubmitBy(userName);
					object.setQaManagerSubmitId(userId);
					object.setQaManagerSign(userName);

					qaTrainingNeedIdentificationFormRepository.save(object);

					objHistory.setQaManagerSubmitOn(date);
					objHistory.setQaManagerSubmitBy(userName);
					objHistory.setQaManagerSubmitId(userId);
					objHistory.setQaManagerSign(userName);

					qaTrainingNeedIdentificationFormHistoryRepository.save(objHistory);

					return new ResponseEntity<>(new ApiResponse(true, status + " Successfully"), HttpStatus.OK);

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

	// Print
	public ResponseEntity<?> getTrainingNeedIdentificationFormPrint(String year) {
		try {

			List<QaTrainingNeedIdentificationForm> details = qaTrainingNeedIdentificationFormRepository.printApi(year);

			if (details == null || details.isEmpty()) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Unable to get Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// get by param
	public ResponseEntity<?> getByParamTrainingNeedIdentificationForm(String year, String department) {

		QaTrainingNeedIdentificationForm list;
		try {

			list = qaTrainingNeedIdentificationFormRepository.findByparam(year, department);

			if (list == null) {
				return new ResponseEntity<>(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity(list, HttpStatus.OK);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			log.error("*** !!! Error Getting Details. !!! ***" + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Error Getting Details."), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getTrainingNeedIdentificationFormSummaryHod(String department, HttpServletRequest http) {

		List<QaTrainingNeedIdentificationForm> details = null;

		try {
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (role.equalsIgnoreCase("ROLE_HOD") || role.equalsIgnoreCase("ROLE_DESIGNEE")) {

				details = qaTrainingNeedIdentificationFormRepository.hodSummary(department);

			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getTrainingNeedIdentificationFormSummaryQaManager(HttpServletRequest http) {

		List<QaTrainingNeedIdentificationForm> details = null;

		try {
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (role.equalsIgnoreCase("QA_MANAGER") || role.equalsIgnoreCase("ROLE_DESIGNEE")) {

				details = qaTrainingNeedIdentificationFormRepository.qaManagerSummary();

			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

	// delete by id
	public ResponseEntity<?> deleteTrainingNeedIdentificationFormLine(Long id) {
		try {

			QaTrainingNeedIdentificationFormLine details = qaTrainingNeedIdentificationFormLineRepository
					.findFormById(id);

			if (details == null) {
				return new ResponseEntity(new ApiResponse(false, "No data for the id : " + id), HttpStatus.BAD_REQUEST);
			}

			qaTrainingNeedIdentificationFormLineRepository.deleteById(id);

		} catch (Exception ex) {

			log.error(" **** Unable to delete details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(true, "Deleted successfully."), HttpStatus.OK);
	}

	// ***************************************************** TRAINING CARD
	// *********************************************************

	public ResponseEntity<?> SaveTrainingCard(QaTrainingCard details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		QaTrainingCard listObj = null;
		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (details.getCard_id() != null) {

				listObj = qaTrainingCardRepository.findFormById(details.getCard_id());

				String[] IgnoreProps = { "card_id", "createdBy", "createdAt", "hodStatus", "hodSaveOn", "hodSaveBy",
						"hodSaveId", "hodSubmitOn", "hodSubmitBy", "hodSubmitId", "hodSign", "details" };

				BeanUtils.copyProperties(details, listObj, IgnoreProps);

			} else {
				listObj = details;
			}

			if (role.equalsIgnoreCase("ROLE_HOD") || role.equalsIgnoreCase("ROLE_DESIGNEE")) {

				qaTrainingCardRepository.save(listObj);

				List<QaTrainingCardDetails> list = details.getDetails();

				for (QaTrainingCardDetails detail : list) {
					detail.setCard_id(listObj.getCard_id());
					qaTrainingCardDetailsRepository.save(detail);
				}

				listObj.setDetails(list);

				listObj.setHodSaveBy(userName);
				listObj.setHodSaveOn(date);
				listObj.setHodSaveId(userId);
				listObj.setHodStatus(QaAppConstants.hodSaved);

				qaTrainingCardRepository.save(listObj);

			} else {
				return new ResponseEntity(new ApiResponse(false, role + " is not authorize to access the form."),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	public ResponseEntity<?> SubmitTrainingCard(QaTrainingCard details, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = details.getCard_id();

		QaTrainingCard checkObj = new QaTrainingCard();

		try {
			LocalDateTime currentDate = LocalDateTime.now();

			// Convert LocalDateTime to Date
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = qaTrainingCardRepository.findFormById(id);

				String[] IgnoreProps = { "card_id", "createdBy", "createdAt", "hodStatus", "hodSaveOn", "hodSaveBy",
						"hodSaveId", "hodSubmitOn", "hodSubmitBy", "hodSubmitId", "hodSign", "details" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

			} else {
				checkObj = details;
			}

			if (checkObj.getHodStatus() != null
					&& checkObj.getHodStatus().equalsIgnoreCase(QaAppConstants.hodSubmitted)) {
				return new ResponseEntity<>(new ApiResponse(false, "Already Submitted."), HttpStatus.BAD_REQUEST);
			}

			if (role.equalsIgnoreCase("ROLE_HOD") || role.equalsIgnoreCase("ROLE_DESIGNEE")) {

				qaTrainingCardRepository.save(checkObj);

				List<QaTrainingCardDetails> list = details.getDetails();

				for (QaTrainingCardDetails detail : list) {
					detail.setCard_id(checkObj.getCard_id());
					qaTrainingCardDetailsRepository.save(detail);
				}

				checkObj.setDetails(list);

				checkObj.setHodSubmitBy(userName);
				checkObj.setHodSubmitOn(date);
				checkObj.setHodSubmitId(userId);
				checkObj.setHodStatus(QaAppConstants.hodSubmitted);
				checkObj.setHodSign(userName);

				qaTrainingCardRepository.save(checkObj);

			} else {
				return new ResponseEntity(new ApiResponse(false, role + " is not authorize to access the form."),
						HttpStatus.BAD_REQUEST);
			}
		}

		catch (Exception ex) {

			log.error(" **** Unable to Submit Details **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Details"), HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(new ApiResponse(true, "HOD / DESIGNEE Submitted Sucessfully."), HttpStatus.OK);

//			return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	public ResponseEntity<?> getTrainingCardSummary(String department, HttpServletRequest http) {

		List<QaTrainingCard> details = null;

		try {
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (role.equalsIgnoreCase("ROLE_HOD") || role.equalsIgnoreCase("ROLE_DESIGNEE")) {

				details = qaTrainingCardRepository.hodSummary(department);

			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getByParamTrainingCard(String employeeNo, String department) {

		QaTrainingCard list;
		try {

			list = qaTrainingCardRepository.getByParam(employeeNo, department);

			if (list == null) {
				return new ResponseEntity<>(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity(list, HttpStatus.OK);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			log.error("*** !!! Error Getting Details. !!! ***" + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Error Getting Details."), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> trainingCardPrint(String month, String year, String employeeNo, String department) {

		List<QaTrainingCard> list;
		try {

			list = qaTrainingCardRepository.printApi(month, year, employeeNo, department);

			if (list == null || list.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity(list, HttpStatus.OK);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			log.error("*** !!! Error Getting Details. !!! ***" + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Error Getting Details."), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> trainingSessionNumberLov(String department) {
		List<Object> response = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();

		try {
			response = qaTrainingSessionAllotmentRegisterLineRepository.trainingSessionLov(department);
			if (response.isEmpty() || response == null) {
				return new ResponseEntity<>(new ApiResponse(true, "No data"), HttpStatus.OK);
			} else {
				Long id = (long) 1;
				for (Object ncrNo : response) {
					IdAndValuePair values = new IdAndValuePair();
					values.setId(id);
					values.setValue((String) ncrNo);

					responseList.add(values);
					id++;
				}
			}

		} catch (Exception ex) {
			String msg = ex.getMessage();
			log.error("*** !!! Error Getting Details. !!! ***" + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Error Getting Details."), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}

	// delete by id
	public ResponseEntity<?> deleteTrainingCardLine(Long id) {
		try {

			QaTrainingCardDetails details = qaTrainingCardDetailsRepository.findFormById(id);

			if (details == null) {
				return new ResponseEntity(new ApiResponse(false, "No data for the id : " + id), HttpStatus.BAD_REQUEST);
			}

			qaTrainingCardDetailsRepository.deleteById(id);

		} catch (Exception ex) {

			log.error(" **** Unable to delete details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(true, "Deleted successfully."), HttpStatus.OK);
	}

	public ResponseEntity<?> GetTrainerName(String trainingSessionNo) {

		String trainer;
		try {

			trainer = trainingRecordRepo.GetTrainerName(trainingSessionNo);

			if (trainer == null || trainer.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(new ApiResponse(true, trainer), HttpStatus.OK);

		} catch (Exception ex) {

			String msg = ex.getMessage();
			log.error("*** !!! Error Getting Details. !!! ***" + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Error Getting Details."), HttpStatus.BAD_REQUEST);
		}
	}
}
