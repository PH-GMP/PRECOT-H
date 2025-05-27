package com.focusr.Precot.QA.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.focusr.Precot.QA.model.ControlOfGHpWc;
import com.focusr.Precot.QA.model.ControlOfGHpWcTypes;
import com.focusr.Precot.QA.model.ListOfGHpWc;
import com.focusr.Precot.QA.model.ListOfGHpWcTypes;
import com.focusr.Precot.QA.model.MomMocKRecallHeader;
import com.focusr.Precot.QA.model.MomMockRecall;
import com.focusr.Precot.QA.model.MomMockRecallLines;
import com.focusr.Precot.QA.model.QaBreakageReport;
import com.focusr.Precot.QA.model.audit.ControlOfGHpWcHistory;
import com.focusr.Precot.QA.model.audit.ControlOfGHpWcTypesHistory;
import com.focusr.Precot.QA.model.audit.ListOfGHpWcHistory;
import com.focusr.Precot.QA.model.audit.ListOfGHpWcTypesHistory;
import com.focusr.Precot.QA.model.audit.MomMocKRecallHeaderHistory;
import com.focusr.Precot.QA.model.audit.MomMockRecallHistory;
import com.focusr.Precot.QA.model.audit.MomMockRecallLinesHistory;
import com.focusr.Precot.QA.model.audit.QaBreakageReportHistory;
import com.focusr.Precot.QA.repository.ControlOfGHpWcRepository;
import com.focusr.Precot.QA.repository.ControlOfGHpWcTypesRepository;
import com.focusr.Precot.QA.repository.ListOfGHpWcRepository;
import com.focusr.Precot.QA.repository.ListOfGHpWcTypesRepository;
import com.focusr.Precot.QA.repository.MomMocKRecallHeaderRepository;
import com.focusr.Precot.QA.repository.MomMockRecallLinesRepository;
import com.focusr.Precot.QA.repository.MomMockRecallRepository;
import com.focusr.Precot.QA.repository.QaBreakageReportRepository;
import com.focusr.Precot.QA.repository.audit.ControlOfGHpWcHistoryRepository;
import com.focusr.Precot.QA.repository.audit.ControlOfGHpWcTypesHistoryRepository;
import com.focusr.Precot.QA.repository.audit.ListOfGHpWcHistoryRepository;
import com.focusr.Precot.QA.repository.audit.ListOfGHpWcTypesHistoryRepository;
import com.focusr.Precot.QA.repository.audit.MomMocKRecallHeaderHistoryRepository;
import com.focusr.Precot.QA.repository.audit.MomMockRecallHistoryRepository;
import com.focusr.Precot.QA.repository.audit.MomMockRecallLinesHistoryRepository;
import com.focusr.Precot.QA.repository.audit.QaBreakageReportRepositoryHistory;
import com.focusr.Precot.QA.util.QaAppConstants;
import com.focusr.Precot.QA.util.mail.QAMailFunction;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.SCAUtil;

@Service
public class QaService9 {

	Logger log = LoggerFactory.getLogger(QaService9.class);

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private SCAUtil scaUtil;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private QAMailFunction qamailfunction;

	@Autowired
	private QaBreakageReportRepository qabreakagereportrepository;

	@Autowired
	private ControlOfGHpWcRepository controlofghpwcrepository;

	@Autowired
	private ControlOfGHpWcTypesRepository controlofghpwctypesrepository;

	@Autowired
	private ListOfGHpWcRepository listofghpwcrepository;

	@Autowired
	private ListOfGHpWcTypesRepository listofghpwctypesrepository;

	@Autowired
	private QaBreakageReportRepositoryHistory qabreakagereportrepositoryhistory;

	@Autowired
	private ControlOfGHpWcHistoryRepository controlofghpwchistoryrepository;

	@Autowired
	private ControlOfGHpWcTypesHistoryRepository controlofghpwctypeshistoryrepository;

	@Autowired
	private ListOfGHpWcHistoryRepository listofghpwchistoryrepository;

	@Autowired
	private ListOfGHpWcTypesHistoryRepository listofghpwctypeshistoryrepository;

//Mom

	@Autowired
	private MomMockRecallRepository mommockrecallrepository;

	@Autowired
	private MomMocKRecallHeaderRepository mommockrecallheaderrepository;

	@Autowired
	private MomMockRecallLinesRepository mommockrecalllinesrepository;

	//

	@Autowired
	private MomMockRecallHistoryRepository mommockrecallhistoryrepository;

	@Autowired
	private MomMocKRecallHeaderHistoryRepository mommockrecallheaderhistoryrepository;

	@Autowired
	private MomMockRecallLinesHistoryRepository mommockrecalllineshistoryrepository;

	public ResponseEntity<?> SaveBreakageReport(QaBreakageReport details, HttpServletRequest http) {

		if (details == null) {

			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			if (role.equals("ROLE_QA")) {

				details.setQa_inspector_status(QaAppConstants.qaInspectorSave);
				details.setQa_inspector_saved_on(date);
				details.setQa_inspector_saved_by(userName);
				details.setQa_inspector_saved_id(userId);
				details.setHod_status(QaAppConstants.WaitingForManager);
				details.setManager_status(QaAppConstants.WaitingForManager);
				qabreakagereportrepository.save(details);

			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Unauthorized!"), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {
			log.error("***************** Unable to Save !*********************\n" + e);
			String msg = scaUtil.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save !" + msg), HttpStatus.BAD_REQUEST);
		}

	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SubmitBreakageReport(QaBreakageReport details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		Long id = details.getId();
		QaBreakageReport checkObj = new QaBreakageReport();
		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			if (id != null) {

				if (!role.equals("ROLE_QA")) {
					return new ResponseEntity(new ApiResponse(false, "Unauthorized!"), HttpStatus.BAD_REQUEST);
				}

				checkObj = qabreakagereportrepository.findFormById(details.getId());

				String[] IgnoreProps = { "qa_inspector_status", "qa_inspector_saved_on", "qa_inspector_saved_by",
						"qa_inspector_saved_id", "qa_inspector_submitted_on", "qa_inspector_submitted_by",
						"qa_inspector_submitted_id", "qa_inspector_sign", "hod_status", "hod_submitted_on",
						"hod_submitted_by", "hod_submitted_id", "hod_sign", "manager_status", "manager_submitted_on",
						"manager_submitted_by", "manager_submitted_id", "manager_sign" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				checkObj.setQa_inspector_status(QaAppConstants.qaInspectorApprove);
				checkObj.setQa_inspector_submitted_on(date);
				checkObj.setQa_inspector_submitted_by(userName);
				checkObj.setQa_inspector_submitted_id(userId);
				checkObj.setQa_inspector_sign(userName);
				checkObj.setHod_status(QaAppConstants.WaitingForManager);
				checkObj.setManager_status(QaAppConstants.WaitingForManager);

				qabreakagereportrepository.save(checkObj);

				// History

				QaBreakageReportHistory rejectionReportHistory = new QaBreakageReportHistory();

				BeanUtils.copyProperties(checkObj, rejectionReportHistory, "his_id");

				String seqNo = rejectionReportHistory.getRep_seq_no();
				String department = rejectionReportHistory.getDepartment();

				int version = qabreakagereportrepositoryhistory.getMaximumVersion(department, seqNo)
						.map(temp -> temp + 1).orElse(1);

				rejectionReportHistory.setVersion(version);

				qabreakagereportrepositoryhistory.save(rejectionReportHistory);

				// MAIL
				try {

					qamailfunction.sendMailToBreakageReportDepartmentHod(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
							HttpStatus.OK);
				}

			}

			else {

				if (role.equals("ROLE_QA")) {

					checkObj = details;

					checkObj.setQa_inspector_status(QaAppConstants.qaInspectorApprove);
					checkObj.setQa_inspector_submitted_on(date);
					checkObj.setQa_inspector_submitted_by(userName);
					checkObj.setQa_inspector_submitted_id(userId);
					checkObj.setQa_inspector_sign(userName);
					checkObj.setHod_status(QaAppConstants.WaitingForManager);
					checkObj.setManager_status(QaAppConstants.WaitingForManager);

					qabreakagereportrepository.save(checkObj);

					// History

					QaBreakageReportHistory rejectionReportHistory = new QaBreakageReportHistory();

					BeanUtils.copyProperties(checkObj, rejectionReportHistory, "his_id");

					String seqNo = rejectionReportHistory.getRep_seq_no();
					String department = rejectionReportHistory.getDepartment();

					int version = qabreakagereportrepositoryhistory.getMaximumVersion(department, seqNo)
							.map(temp -> temp + 1).orElse(1);

					rejectionReportHistory.setVersion(version);

					qabreakagereportrepositoryhistory.save(rejectionReportHistory);

					// MAIL
					try {

						qamailfunction.sendMailToBreakageReportDepartmentHod(checkObj);

					} catch (Exception ex) {
						return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
								HttpStatus.OK);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, "Unauthorized!"), HttpStatus.BAD_REQUEST);
				}
			}
			return new ResponseEntity<>(checkObj, HttpStatus.OK);
		} catch (Exception e) {
			log.error("***************** Unable to Save !*********************\n" + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save !" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> summary(HttpServletRequest http) {
		List<QaBreakageReport> details = null;

		try {

			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equalsIgnoreCase(QaAppConstants.qaInspector)) {

				details = qabreakagereportrepository.qaInspectorSummary();

			}

			else if (userRole.equalsIgnoreCase(QaAppConstants.qaManager)
					|| userRole.equalsIgnoreCase(QaAppConstants.prodDesignee)) {

				details = qabreakagereportrepository.QaSummary();

			}

			else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("***************** Unable to get Details!*********************\n" + e);
			String msg = scaUtil.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to get Details!" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> GetHodummary(String department, HttpServletRequest http) {

		List<QaBreakageReport> details = null;

		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equalsIgnoreCase(QaAppConstants.prodHod)
					|| userRole.equalsIgnoreCase(QaAppConstants.prodDesignee)) {

				details = qabreakagereportrepository.hodSummary(department);

			}

			else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("*****************Unable to get Details!*********************\n" + e);
			String msg = scaUtil.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to get Details!" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> approveReject(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		QaBreakageReport object = new QaBreakageReport();

		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		Long departmentId = qabreakagereportrepository.fetchDepartmentIdByUsername(userName);
		String departmentName = qabreakagereportrepository.fetchDepartmentByUsernameId(departmentId);

		try {

			object = qabreakagereportrepository.findFormById(approvalResponse.getId());

			QaBreakageReportHistory objHistory = new QaBreakageReportHistory();

			String qaIns = object.getQa_inspector_status();
			String getHodStatus = object.getHod_status();
			String getQaStatus = object.getManager_status();

			if (userRole.equalsIgnoreCase(QaAppConstants.prodHod)
					|| (userRole.equalsIgnoreCase(QaAppConstants.prodDesignee)
							&& !departmentName.equalsIgnoreCase("QUALITY_ASSURANCE"))) {

				if (qaIns.equalsIgnoreCase(QaAppConstants.qaInspectorApprove)
						&& getHodStatus.equalsIgnoreCase(QaAppConstants.WaitingForManager)) {

					object.setHod_submitted_on(date);
					object.setHod_submitted_by(userName);
					object.setHod_submitted_id(userId);
					object.setHod_sign(userName);

					objHistory = qabreakagereportrepositoryhistory.fetchLastSubmittedRecord(object.getDepartment(),
							object.getRep_seq_no());

					objHistory.setHod_submitted_on(date);
					objHistory.setHod_submitted_by(userName);
					objHistory.setHod_submitted_id(userId);
					objHistory.setHod_sign(userName);

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setHod_status(QaAppConstants.HodApprove);
						objHistory.setHod_status(QaAppConstants.HodApprove);

						// MAIL

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						object.setHod_status(QaAppConstants.HodReject);
						object.setReason(approvalResponse.getRemarks());

						objHistory.setHod_status(QaAppConstants.HodReject);
						objHistory.setReason(approvalResponse.getRemarks());

					}

					qabreakagereportrepository.save(object);

					qabreakagereportrepositoryhistory.save(objHistory);

					try {

						if (object.getHod_status().equals("HOD_APPROVED"))

						{
							qamailfunction.sendMailToBreakageReportDepartmentManager(object);

						}

					} catch (Exception ex) {
						return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
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

			else if (userRole.equalsIgnoreCase(QaAppConstants.qaManager)
					|| (userRole.equalsIgnoreCase(QaAppConstants.prodDesignee)
							&& departmentName.equalsIgnoreCase("QUALITY_ASSURANCE"))) {

				if (getHodStatus.equalsIgnoreCase(QaAppConstants.HodApprove)
						&& getQaStatus.equalsIgnoreCase(QaAppConstants.WaitingForManager)) {

					object.setManager_submitted_on(date);
					object.setManager_submitted_by(userName);
					object.setManager_submitted_id(userId);
					object.setManager_sign(userName);

					objHistory = qabreakagereportrepositoryhistory.fetchLastSubmittedRecord(object.getDepartment(),
							object.getRep_seq_no());

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

					qabreakagereportrepository.save(object);

					qabreakagereportrepositoryhistory.save(objHistory);

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
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	public ResponseEntity<?> Print(String month, String year, String reportNo, String date) {
		try {

			List<QaBreakageReport> list = qabreakagereportrepository.Print(month, year, reportNo, date);

			if (list == null) {

				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> param(String reportNo, String department) {
		try {

			QaBreakageReport obj = qabreakagereportrepository.findByparam(reportNo, department);

			if (obj == null) {

				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(obj, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getLastSubbatchNo13() {

		List<Map<String, Object>> getAllSeqNo;

		try {

			getAllSeqNo = qabreakagereportrepository.getAllSeqNo();

		} catch (Exception ex) {

			String msg = ex.getMessage();

			log.error("Unable to get Ladt Sub Batch Details" + msg);

			return new ResponseEntity(new ApiResponse(false, "Unable to get Ladt Sub Batch Details" + msg),

					HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(getAllSeqNo, HttpStatus.OK);

	}

	public ResponseEntity<?> getApproveSeqNo() {

		List<Map<String, Object>> getApproveSeqNo;

		try {

			getApproveSeqNo = qabreakagereportrepository.getApproveSeqNo();

		} catch (Exception ex) {

			String msg = ex.getMessage();

			log.error("Unable to get " + msg);

			return new ResponseEntity(new ApiResponse(false, "Unable to get " + msg),

					HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(getApproveSeqNo, HttpStatus.OK);

	}

	public ResponseEntity<?> getUsersByDepartment(String rollNames) {
		List<Map<String, String>> userList = new ArrayList<>();

		try {
			List<Object[]> results = userRepository.getUsersByRoleName(rollNames);

			for (Object[] result : results) {
				Map<String, String> userMap = new HashMap<>();
				userMap.put("username", (String) result[0]);
				userMap.put("name", (String) result[1]);
				userMap.put("role", (String) result[2]);
				userList.add(userMap);
			}

			return new ResponseEntity<>(userList, HttpStatus.OK);

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to get " + msg), HttpStatus.BAD_REQUEST);
		}
	}

	///////////////////////////

	public ResponseEntity<?> SaveControlOfGHpWc(ControlOfGHpWc details, HttpServletRequest http) {

		if (details == null) {

			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			if (role.equals("ROLE_SUPERVISOR")) {

				details.setSupervisor_status(QaAppConstants.SupervisorSave);
				details.setSupervisor_saved_by(userName);
				details.setSupervisor_saved_id(userId);
				details.setSupervisor_saved_on(date);
				details.setHod_status(QaAppConstants.WaitingForManager);
				controlofghpwcrepository.save(details);

				for (ControlOfGHpWcTypes lineDetails : details.getGhpwcTypes()) {

					Long Id = details.getId();

					lineDetails.setId(Id);

					controlofghpwctypesrepository.save(lineDetails);

				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Unauthorized!"), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {
			log.error("***************** Unable to Save !*********************\n" + e);
			String msg = scaUtil.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save !" + msg), HttpStatus.BAD_REQUEST);
		}

	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SubmitControlOfGHpWc(ControlOfGHpWc details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		Long id = details.getId();
		ControlOfGHpWc checkObj = new ControlOfGHpWc();
		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			if (id != null) {

				if (!role.equals("ROLE_SUPERVISOR")) {
					return new ResponseEntity(new ApiResponse(false, "Unauthorized!"), HttpStatus.BAD_REQUEST);
				}

				checkObj = controlofghpwcrepository.findFormById(details.getId());

				String[] IgnoreProps = { "supervisor_status", "supervisor_saved_on", "supervisor_saved_by",
						"supervisor_saved_id", "supervisor_submit_on", "supervisor_submit_by", "supervisor_submit_id",
						"supervisor_sign", "hod_status", "hod_submitted_on", "hod_submitted_by", "hod_submitted_id",
						"hod_sign", "manager_status", "manager_submitted_on", "manager_submitted_by",
						"manager_submitted_id", "manager_sign", "ghpwcTypes" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				checkObj.setSupervisor_status(QaAppConstants.SupervisorApprove);
				checkObj.setSupervisor_submit_by(role);
				checkObj.setSupervisor_submit_id(id);
				checkObj.setSupervisor_submit_on(date);
				checkObj.setSupervisor_sign(userName);
//				checkObj.sethodst(QaAppConstants.WaitingForManager);
				checkObj.setHod_status(QaAppConstants.WaitingForManager);

				controlofghpwcrepository.save(checkObj);

				List<ControlOfGHpWcTypes> list = details.getGhpwcTypes();

				for (ControlOfGHpWcTypes lineDetails : list) {

					Long Id = details.getId();
					lineDetails.setId(Id);
					controlofghpwctypesrepository.save(lineDetails);
				}

				// HISTORY AUDIT

				ControlOfGHpWcHistory rejectionReportHistory = new ControlOfGHpWcHistory();

				rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
				rejectionReportHistory.setFormatName(checkObj.getFormatName());
				rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
				rejectionReportHistory.setSopNumber(checkObj.getSopNumber());
				rejectionReportHistory.setUnit(checkObj.getUnit());
				rejectionReportHistory.setDepartment(checkObj.getDepartment());
				rejectionReportHistory.setDate(checkObj.getDate());
				rejectionReportHistory.setMonth(checkObj.getMonth());
				rejectionReportHistory.setYear(checkObj.getYear());
//				rejectionReportHistory.setHist_id(checkObj.getId());

				rejectionReportHistory.setReason(checkObj.getReason());

				rejectionReportHistory.setChecked_by(checkObj.getChecked_by());

				rejectionReportHistory.setSupervisor_saved_by(checkObj.getSupervisor_saved_by());
				rejectionReportHistory.setSupervisor_saved_id(checkObj.getSupervisor_saved_id());
				rejectionReportHistory.setSupervisor_saved_on(checkObj.getSupervisor_saved_on());
				rejectionReportHistory.setSupervisor_submit_by(checkObj.getSupervisor_submit_by());
				rejectionReportHistory.setSupervisor_submit_id(checkObj.getSupervisor_submit_id());
				rejectionReportHistory.setSupervisor_submit_on(checkObj.getSupervisor_submit_on());
				rejectionReportHistory.setSupervisor_sign(checkObj.getSupervisor_sign());
				rejectionReportHistory.setSupervisor_status(checkObj.getSupervisor_status());

				rejectionReportHistory.setHod_status(checkObj.getHod_status());
				rejectionReportHistory.setHod_submitted_on(checkObj.getHod_submitted_on());
				rejectionReportHistory.setHod_submitted_on(checkObj.getHod_submitted_on());
				rejectionReportHistory.setHod_submitted_by(checkObj.getHod_submitted_by());
				rejectionReportHistory.setHod_submitted_id(checkObj.getHod_submitted_id());
				rejectionReportHistory.setHod_sign(checkObj.getHod_sign());

//				// VERSION
//
				String versDate = rejectionReportHistory.getDate();

				String versDepart = rejectionReportHistory.getDepartment();

				int version = controlofghpwchistoryrepository.getMaximumVersion(versDate, versDepart)
						.map(temp -> temp + 1).orElse(1);

				rejectionReportHistory.setVersion(version);

				controlofghpwchistoryrepository.save(rejectionReportHistory);

				List<ControlOfGHpWcTypes> historyMapList = checkObj.getGhpwcTypes();

				for (ControlOfGHpWcTypes obj : historyMapList) {

					ControlOfGHpWcTypesHistory objHistory = new ControlOfGHpWcTypesHistory();

					BeanUtils.copyProperties(obj, objHistory, "hist_id");

					objHistory.setHist_id(rejectionReportHistory.getHist_id());

					controlofghpwctypeshistoryrepository.save(objHistory);

				}

				// MAIL
				try {

					qamailfunction.sendMailToControlOfGHpWc(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
							HttpStatus.OK);
				}

			}

			else {

				if (role.equals("ROLE_SUPERVISOR")) {

					checkObj = details;

					checkObj.setSupervisor_status(QaAppConstants.SupervisorApprove);
					checkObj.setSupervisor_submit_by(role);
					checkObj.setSupervisor_submit_id(id);
					checkObj.setSupervisor_submit_on(date);
					checkObj.setSupervisor_sign(userName);
//					checkObj.sethodst(QaAppConstants.WaitingForManager);
					checkObj.setHod_status(QaAppConstants.WaitingForManager);

					controlofghpwcrepository.save(checkObj);

					List<ControlOfGHpWcTypes> list = details.getGhpwcTypes();

					for (ControlOfGHpWcTypes lineDetails : list) {

						Long Id = details.getId();
						lineDetails.setId(Id);
						controlofghpwctypesrepository.save(lineDetails);
					}

					// HISTORY AUDIT

					ControlOfGHpWcHistory rejectionReportHistory = new ControlOfGHpWcHistory();

					rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
					rejectionReportHistory.setFormatName(checkObj.getFormatName());
					rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
					rejectionReportHistory.setSopNumber(checkObj.getSopNumber());
					rejectionReportHistory.setUnit(checkObj.getUnit());
					rejectionReportHistory.setDepartment(checkObj.getDepartment());
					rejectionReportHistory.setDate(checkObj.getDate());
					rejectionReportHistory.setMonth(checkObj.getMonth());
					rejectionReportHistory.setYear(checkObj.getYear());
//					rejectionReportHistory.setHist_id(checkObj.getId());

					rejectionReportHistory.setSupervisor_saved_by(checkObj.getSupervisor_saved_by());
					rejectionReportHistory.setSupervisor_saved_id(checkObj.getSupervisor_saved_id());
					rejectionReportHistory.setSupervisor_saved_on(checkObj.getSupervisor_saved_on());
					rejectionReportHistory.setSupervisor_submit_by(checkObj.getSupervisor_submit_by());
					rejectionReportHistory.setSupervisor_submit_id(checkObj.getSupervisor_submit_id());
					rejectionReportHistory.setSupervisor_submit_on(checkObj.getSupervisor_submit_on());
					rejectionReportHistory.setSupervisor_sign(checkObj.getSupervisor_sign());
					rejectionReportHistory.setSupervisor_status(checkObj.getSupervisor_status());

					rejectionReportHistory.setHod_submitted_on(checkObj.getHod_submitted_on());
					rejectionReportHistory.setHod_submitted_by(checkObj.getHod_submitted_by());
					rejectionReportHistory.setHod_submitted_id(checkObj.getHod_submitted_id());
					rejectionReportHistory.setHod_sign(checkObj.getHod_sign());

					// VERSION

					String versDate = rejectionReportHistory.getDate();

					String versDepart = rejectionReportHistory.getDepartment();

					int version = controlofghpwchistoryrepository.getMaximumVersion(versDate, versDepart)
							.map(temp -> temp + 1).orElse(1);

					rejectionReportHistory.setVersion(version);

					controlofghpwchistoryrepository.save(rejectionReportHistory);

					List<ControlOfGHpWcTypes> historyMapList = checkObj.getGhpwcTypes();

					for (ControlOfGHpWcTypes obj : historyMapList) {

						ControlOfGHpWcTypesHistory objHistory = new ControlOfGHpWcTypesHistory();

						BeanUtils.copyProperties(obj, objHistory, "hist_id");

						objHistory.setHist_id(rejectionReportHistory.getHist_id());

						controlofghpwctypeshistoryrepository.save(objHistory);

					}

					// MAIL
					try {

						qamailfunction.sendMailToControlOfGHpWc(checkObj);
					} catch (Exception ex) {
						return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
								HttpStatus.OK);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, "Unauthorized!"), HttpStatus.BAD_REQUEST);
				}
			}
			return new ResponseEntity<>(checkObj, HttpStatus.OK);
		} catch (Exception e) {
			log.error("***************** Unable to Save !*********************\n" + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save !" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> ControlOfGHpWcGetHodummary(String department, HttpServletRequest http) {

		List<ControlOfGHpWc> details = null;

		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_SUPERVISOR") || userRole.equalsIgnoreCase(QaAppConstants.prodHod)
					|| userRole.equalsIgnoreCase(QaAppConstants.prodDesignee)) {

				details = controlofghpwcrepository.hodSummary(department);

			}

			else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("*****************Unable to get Details!*********************\n" + e);
			String msg = scaUtil.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to get Details!" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> GetSupervisorHodControlOfGHpWc(String department, HttpServletRequest http) {

		List<ControlOfGHpWc> details = null;

		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_SUPERVISOR")) {

				details = controlofghpwcrepository.supSummary(department);

			}

			else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("*****************Unable to get Details!*********************\n" + e);
			String msg = scaUtil.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to get Details!" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> GetHodummaryControlOfGHpWc(HttpServletRequest http) {
		List<ControlOfGHpWc> details = null;

		try {

			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equalsIgnoreCase(QaAppConstants.prodHod)
					|| userRole.equalsIgnoreCase(QaAppConstants.prodDesignee)) {

				details = controlofghpwcrepository.QaSummary();

			}

			else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("***************** Unable to get Details!*********************\n" + e);
			String msg = scaUtil.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to get Details!" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	//

	public ResponseEntity<?> PrintControlOfGHpWc(String month, String year, String department) {
		try {

			List<ControlOfGHpWc> list = controlofghpwcrepository.PrintControlOfGHpWc(month, year, department);

			if (list == null) {

				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> ControlOfGHpWcapproveOrReject(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		ControlOfGHpWc object = new ControlOfGHpWc();

		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = controlofghpwcrepository.findFormById(approvalResponse.getId());

			ControlOfGHpWcHistory objHistory = new ControlOfGHpWcHistory();

			String supStatus = object.getSupervisor_status();
			String getHodStatus = object.getHod_status();

			if (userRole.equalsIgnoreCase(QaAppConstants.prodHod)
					|| userRole.equalsIgnoreCase(QaAppConstants.prodDesignee)) {

				if (supStatus.equalsIgnoreCase(QaAppConstants.SupervisorApprove)
						&& getHodStatus.equalsIgnoreCase(QaAppConstants.WaitingForManager)) {

					object.setHod_submitted_on(date);
					object.setHod_submitted_by(userName);
					object.setHod_submitted_id(userId);
					object.setHod_sign(userName);

					objHistory = controlofghpwchistoryrepository.fetchLastSubmittedRecord(object.getDate(),
							object.getDepartment());

					objHistory.setHod_submitted_on(date);
					objHistory.setHod_submitted_by(userName);
					objHistory.setHod_submitted_id(userId);
					objHistory.setHod_sign(userName);

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setHod_status(QaAppConstants.HodApprove);
						objHistory.setHod_status(QaAppConstants.HodApprove);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						object.setHod_status(QaAppConstants.HodReject);
						object.setReason(approvalResponse.getRemarks());

						objHistory.setHod_status(QaAppConstants.HodReject);
						objHistory.setReason(approvalResponse.getRemarks());

					}

					controlofghpwcrepository.save(object);

					controlofghpwchistoryrepository.save(objHistory);

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
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	public ResponseEntity<?> ParamControlOfGHpWc(String date, String department) {
		try {

			ControlOfGHpWc obj = controlofghpwcrepository.findByparam(date, department);

			if (obj == null) {

				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(obj, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	// delete api
	public ResponseEntity<?> ControlOfGHpWcdelete(Long id) {
		try {

			ControlOfGHpWcTypes details = controlofghpwctypesrepository.findFormById(id);

			if (details == null) {
				return new ResponseEntity(new ApiResponse(false, "No data for the id : " + id), HttpStatus.BAD_REQUEST);
			}

			controlofghpwctypesrepository.deleteById(id);

		} catch (Exception ex) {

			log.error(" **** Unable to delete details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////

	public ResponseEntity<?> SaveListOfGHpWc(ListOfGHpWc details, HttpServletRequest http) {

		if (details == null) {

			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			if (role.equals("ROLE_QA")) {

				details.setQa_inspector_status(QaAppConstants.qaInspectorSave);
				details.setQa_inspector_saved_on(date);
				details.setQa_inspector_saved_by(userName);
				details.setQa_inspector_saved_id(userId);
				details.setManager_status(QaAppConstants.WaitingForManager);

				listofghpwcrepository.save(details);

				for (ListOfGHpWcTypes lineDetails : details.getTypeslist()) {

					Long Id = details.getId();

					lineDetails.setId(Id);

					listofghpwctypesrepository.save(lineDetails);

				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Unauthorized!"), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {
			log.error("***************** Unable to Save !*********************\n" + e);
			String msg = scaUtil.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save !" + msg), HttpStatus.BAD_REQUEST);
		}

	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SubmitListOfGHpWc(ListOfGHpWc details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		Long id = details.getId();
		ListOfGHpWc checkObj = new ListOfGHpWc();
		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			if (id != null) {

				if (!role.equals("ROLE_QA")) {
					return new ResponseEntity(new ApiResponse(false, "Unauthorized!"), HttpStatus.BAD_REQUEST);
				}

				checkObj = listofghpwcrepository.findFormById(details.getId());

				String[] IgnoreProps = { "qa_inspector_status", "qa_inspector_saved_on", "qa_inspector_saved_by",
						"qa_inspector_saved_id", "qa_inspector_submitted_on", "qa_inspector_submitted_by",
						"qa_inspector_submitted_id", "qa_inspector_sign", "hod_status", "hod_submitted_on",
						"hod_submitted_by", "hod_submitted_id", "hod_sign", "manager_status", "manager_submitted_on",
						"manager_submitted_by", "manager_submitted_id", "manager_sign", "typeslist" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				checkObj.setQa_inspector_status(QaAppConstants.qaInspectorApprove);
				checkObj.setQa_inspector_submitted_on(date);
				checkObj.setQa_inspector_submitted_by(userName);
				checkObj.setQa_inspector_submitted_id(userId);
				checkObj.setQa_inspector_sign(userName);
				checkObj.setManager_status(QaAppConstants.WaitingForManager);

				listofghpwcrepository.save(checkObj);

				List<ListOfGHpWcTypes> list = details.getTypeslist();

				for (ListOfGHpWcTypes lineDetails : list) {

					Long Id = details.getId();
					lineDetails.setId(Id);
					listofghpwctypesrepository.save(lineDetails);

				}

				// HISTORY AUDIT

				ListOfGHpWcHistory rejectionReportHistory = new ListOfGHpWcHistory();

				rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
				rejectionReportHistory.setFormatName(checkObj.getFormatName());
				rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
				rejectionReportHistory.setSopNumber(checkObj.getSopNumber());
				rejectionReportHistory.setUnit(checkObj.getUnit());
				rejectionReportHistory.setDepartment(checkObj.getDepartment());
				rejectionReportHistory.setDate(checkObj.getDate());
				rejectionReportHistory.setMonth(checkObj.getMonth());
				rejectionReportHistory.setYear(checkObj.getYear());
//				rejectionReportHistory.setHist_id(checkObj.getId());

				rejectionReportHistory.setRej_reason(checkObj.getRej_reason());
				rejectionReportHistory.setTo_no_glass(checkObj.getTo_no_glass());
				rejectionReportHistory.setTo_no_hp(checkObj.getTo_no_hp());
				rejectionReportHistory.setTo_no_wood(checkObj.getTo_no_wood());
				rejectionReportHistory.setTo_no_ceramic(checkObj.getTo_no_ceramic());

				rejectionReportHistory.setQa_inspector_saved_by(checkObj.getQa_inspector_saved_by());
				rejectionReportHistory.setQa_inspector_saved_id(checkObj.getQa_inspector_saved_id());
				rejectionReportHistory.setQa_inspector_saved_on(checkObj.getQa_inspector_saved_on());
				rejectionReportHistory.setQa_inspector_submitted_on(checkObj.getQa_inspector_submitted_on());
				rejectionReportHistory.setQa_inspector_submitted_by(checkObj.getQa_inspector_submitted_by());
				rejectionReportHistory.setQa_inspector_submitted_id(checkObj.getQa_inspector_submitted_id());
				rejectionReportHistory.setQa_inspector_sign(checkObj.getQa_inspector_sign());
				rejectionReportHistory.setQa_inspector_status(checkObj.getQa_inspector_status());

				rejectionReportHistory.setManager_status(checkObj.getManager_status());
				rejectionReportHistory.setManager_submitted_on(checkObj.getManager_submitted_on());
				rejectionReportHistory.setManager_submitted_by(checkObj.getManager_submitted_by());
				rejectionReportHistory.setManager_submitted_id(checkObj.getManager_submitted_id());
				rejectionReportHistory.setManager_sign(checkObj.getManager_sign());

//				// VERSION

				String versDate = rejectionReportHistory.getDate();

				String versDepart = rejectionReportHistory.getDepartment();

				int version = listofghpwchistoryrepository.getMaximumVersion(versDate, versDepart).map(temp -> temp + 1)
						.orElse(1);

				rejectionReportHistory.setVersion(version);

				listofghpwchistoryrepository.save(rejectionReportHistory);

				List<ListOfGHpWcTypes> historyMapList = checkObj.getTypeslist();

				for (ListOfGHpWcTypes obj : historyMapList) {

					ListOfGHpWcTypesHistory objHistory = new ListOfGHpWcTypesHistory();

					BeanUtils.copyProperties(obj, objHistory, "hist_id");

					objHistory.setHist_id(rejectionReportHistory.getHist_id());

					listofghpwctypeshistoryrepository.save(objHistory);

				}

				// MAIL
				try {

					qamailfunction.sendMailToListOfGHpWc(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
							HttpStatus.OK);
				}

			}

			else {

				if (role.equals("ROLE_QA")) {

					checkObj = details;

					checkObj.setQa_inspector_status(QaAppConstants.qaInspectorApprove);
					checkObj.setQa_inspector_submitted_on(date);
					checkObj.setQa_inspector_submitted_by(userName);
					checkObj.setQa_inspector_submitted_id(userId);
					checkObj.setQa_inspector_sign(userName);
					checkObj.setManager_status(QaAppConstants.WaitingForManager);

					listofghpwcrepository.save(checkObj);

					List<ListOfGHpWcTypes> list = details.getTypeslist();

					for (ListOfGHpWcTypes lineDetails : list) {

						Long Id = details.getId();
						lineDetails.setId(Id);
						listofghpwctypesrepository.save(lineDetails);

					}

					// HISTORY AUDIT

					ListOfGHpWcHistory rejectionReportHistory = new ListOfGHpWcHistory();

					rejectionReportHistory.setFormatNo(checkObj.getFormatNo());
					rejectionReportHistory.setFormatName(checkObj.getFormatName());
					rejectionReportHistory.setRevisionNo(checkObj.getRevisionNo());
					rejectionReportHistory.setSopNumber(checkObj.getSopNumber());
					rejectionReportHistory.setUnit(checkObj.getUnit());
					rejectionReportHistory.setDepartment(checkObj.getDepartment());
					rejectionReportHistory.setDate(checkObj.getDate());
					rejectionReportHistory.setMonth(checkObj.getMonth());
					rejectionReportHistory.setYear(checkObj.getYear());
//					rejectionReportHistory.setHist_id(checkObj.getId());

					rejectionReportHistory.setRej_reason(checkObj.getRej_reason());
					rejectionReportHistory.setTo_no_glass(checkObj.getTo_no_glass());
					rejectionReportHistory.setTo_no_hp(checkObj.getTo_no_hp());
					rejectionReportHistory.setTo_no_wood(checkObj.getTo_no_wood());
					rejectionReportHistory.setTo_no_ceramic(checkObj.getTo_no_ceramic());

					rejectionReportHistory.setQa_inspector_saved_by(checkObj.getQa_inspector_saved_by());
					rejectionReportHistory.setQa_inspector_saved_id(checkObj.getQa_inspector_saved_id());
					rejectionReportHistory.setQa_inspector_saved_on(checkObj.getQa_inspector_saved_on());
					rejectionReportHistory.setQa_inspector_submitted_on(checkObj.getQa_inspector_submitted_on());
					rejectionReportHistory.setQa_inspector_submitted_by(checkObj.getQa_inspector_submitted_by());
					rejectionReportHistory.setQa_inspector_submitted_id(checkObj.getQa_inspector_submitted_id());
					rejectionReportHistory.setQa_inspector_sign(checkObj.getQa_inspector_sign());
					rejectionReportHistory.setQa_inspector_status(checkObj.getQa_inspector_status());

					rejectionReportHistory.setManager_status(checkObj.getManager_status());
					rejectionReportHistory.setManager_submitted_on(checkObj.getManager_submitted_on());
					rejectionReportHistory.setManager_submitted_by(checkObj.getManager_submitted_by());
					rejectionReportHistory.setManager_submitted_id(checkObj.getManager_submitted_id());
					rejectionReportHistory.setManager_sign(checkObj.getManager_sign());

//					// VERSION

					String versDate = rejectionReportHistory.getDate();

					String versDepart = rejectionReportHistory.getDepartment();

					int version = listofghpwchistoryrepository.getMaximumVersion(versDate, versDepart)
							.map(temp -> temp + 1).orElse(1);

					rejectionReportHistory.setVersion(version);

					listofghpwchistoryrepository.save(rejectionReportHistory);

					List<ListOfGHpWcTypes> historyMapList = checkObj.getTypeslist();

					for (ListOfGHpWcTypes obj : historyMapList) {

						ListOfGHpWcTypesHistory objHistory = new ListOfGHpWcTypesHistory();

						BeanUtils.copyProperties(obj, objHistory, "hist_id");

						objHistory.setHist_id(rejectionReportHistory.getHist_id());

						listofghpwctypeshistoryrepository.save(objHistory);

					}

					// MAIL
					try {

						qamailfunction.sendMailToListOfGHpWc(checkObj);
					} catch (Exception ex) {
						return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
								HttpStatus.OK);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, "Unauthorized!"), HttpStatus.BAD_REQUEST);
				}
			}
			return new ResponseEntity<>(checkObj, HttpStatus.OK);
		} catch (Exception e) {
			log.error("***************** Unable to Save !*********************\n" + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save !" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> ListOfGHpWcsummary(HttpServletRequest http) {
		List<ListOfGHpWc> details = null;

		try {

			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equalsIgnoreCase(QaAppConstants.qaInspector)) {

				details = listofghpwcrepository.qaInspectorSummary();

			}

			else if (userRole.equalsIgnoreCase(QaAppConstants.qaManager)
					|| userRole.equalsIgnoreCase(QaAppConstants.prodDesignee)
					|| userRole.equalsIgnoreCase(QaAppConstants.RoleMr)) {

				details = listofghpwcrepository.QaSummary();

			}

			else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("***************** Unable to get Details!*********************\n" + e);
			String msg = scaUtil.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to get Details!" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> ListOfGHpWcapproveOrReject(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		ListOfGHpWc object = new ListOfGHpWc();

		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = listofghpwcrepository.findFormById(approvalResponse.getId());

			ListOfGHpWcHistory objHistory = new ListOfGHpWcHistory();

			String qaIns = object.getQa_inspector_status();
			String getQaStatus = object.getManager_status();

			if (userRole.equalsIgnoreCase(QaAppConstants.qaManager)
					|| userRole.equalsIgnoreCase(QaAppConstants.prodDesignee)) {

				if (qaIns.equalsIgnoreCase(QaAppConstants.qaInspectorApprove)
						&& getQaStatus.equalsIgnoreCase(QaAppConstants.WaitingForManager)) {

					object.setManager_submitted_on(date);
					object.setManager_submitted_by(userName);
					object.setManager_submitted_id(userId);
					object.setManager_sign(userName);

					objHistory = listofghpwchistoryrepository.fetchLastSubmittedRecord(object.getDate(),
							object.getDepartment());

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
						object.setRej_reason(approvalResponse.getRemarks());

						objHistory.setManager_status(QaAppConstants.ManagerReject);
						objHistory.setRej_reason(approvalResponse.getRemarks());

					}

					listofghpwcrepository.save(object);

					listofghpwchistoryrepository.save(objHistory);

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
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	public ResponseEntity<?> ListOfGHpWcPrint(String date, String month, String year, String department) {
		try {

			List<ListOfGHpWc> list = listofghpwcrepository.Print(date, month, year, department);

			if (list == null) {

				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> ListOfGHpWcParam(String date, String department) {
		try {

			ListOfGHpWc obj = listofghpwcrepository.findByparam(date, department);

			if (obj == null) {

				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(obj, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	// delete api
	public ResponseEntity<?> ListOfGHpWcdelete(Long id) {
		try {

			ListOfGHpWcTypes details = listofghpwctypesrepository.findFormById(id);

			if (details == null) {
				return new ResponseEntity(new ApiResponse(false, "No data for the id : " + id), HttpStatus.BAD_REQUEST);
			}

			listofghpwctypesrepository.deleteById(id);

		} catch (Exception ex) {

			log.error(" **** Unable to delete details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
	}

	///////////////////

	public ResponseEntity<?> SaveMomMocRecall(MomMockRecall details, HttpServletRequest http) {

		if (details == null) {

			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (role.equalsIgnoreCase("QA_MANAGER") || role.equalsIgnoreCase("ROLE_DESIGNEE")) {

				details.setManager_status(QaAppConstants.QaManagerSaved);
				details.setManager_saved_by(userName);
				details.setManager_saved_id(userId);
				details.setManager_saved_on(date);
				details.setPlant_head_status("");

				MomMockRecall savedDetails = mommockrecallrepository.save(details);

				if (savedDetails.getMomHeaderDetails() != null) {

					for (MomMocKRecallHeader headDetails : savedDetails.getMomHeaderDetails()) {
						headDetails.setMom_id(savedDetails.getMom_id());

						mommockrecallheaderrepository.save(headDetails);
					}
				}

				if (savedDetails.getMomLineDetails() != null) {
					for (MomMockRecallLines lineDetails : savedDetails.getMomLineDetails()) {

						lineDetails.setMom_id(savedDetails.getMom_id());

						mommockrecalllinesrepository.save(lineDetails);
					}
				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Unauthorized!"), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {
			log.error("***************** Unable to Save !*********************\n" + e);
			String msg = scaUtil.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save !" + msg), HttpStatus.BAD_REQUEST);
		}

	}

	/////////////////

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SubmitMomMocRecall(MomMockRecall details, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		Long id = details.getMom_id();
		MomMockRecall checkObj = new MomMockRecall();
		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			System.out.println(role);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			if (id != null) {

				checkObj = mommockrecallrepository.findFormById(details.getMom_id());

				String[] IgnoreProps = { "manager_status", "manager_saved_on", "manager_saved_by", "manager_saved_id",
						"manager_submitted_on", "manager_submitted_by", "manager_submitted_id", "manager_sign",
						"plant_head_status", "plant_head_approved_on", "plant_head_approved_by",
						"plant_head_approver_id", "mom_id" };

				BeanUtils.copyProperties(details, checkObj, IgnoreProps);

				checkObj.setManager_status(QaAppConstants.ManagerApprove);
				checkObj.setManager_submitted_by(userName);
				checkObj.setManager_sign(userName);
				checkObj.setManager_submitted_id(userId);
				checkObj.setManager_submitted_on(date);
				checkObj.setPlant_head_status(QaAppConstants.waitingStatus);

				//

				MomMockRecall savedDetails = mommockrecallrepository.save(checkObj);

				List<MomMocKRecallHeader> Headlist = details.getMomHeaderDetails();

				if (Headlist != null) {

					for (MomMocKRecallHeader headDetails : Headlist) {

						headDetails.setMom_id(savedDetails.getMom_id());

						mommockrecallheaderrepository.save(headDetails);
					}
				}

				List<MomMockRecallLines> Linelist = details.getMomLineDetails();
				if (Linelist != null) {
					for (MomMockRecallLines lineDetails : Linelist) {

						lineDetails.setMom_id(savedDetails.getMom_id());

						mommockrecalllinesrepository.save(lineDetails);
					}
				}

				// HISTORY AUDIT

				MomMockRecallHistory recallReportHistory = new MomMockRecallHistory();

				recallReportHistory.setFormatNo(checkObj.getFormatNo());
				recallReportHistory.setFormatName(checkObj.getFormatName());
				recallReportHistory.setRevisionNo(checkObj.getRevisionNo());
				recallReportHistory.setSopNumber(checkObj.getSopNumber());
				recallReportHistory.setUnit(checkObj.getUnit());
				recallReportHistory.setDate(checkObj.getDate());
				recallReportHistory.setYear(checkObj.getYear());
				recallReportHistory.setAgenda(checkObj.getAgenda());
				recallReportHistory.setVenue(checkObj.getAgenda());
				recallReportHistory.setReason(checkObj.getReason());
				recallReportHistory.setReason(checkObj.getReason());
				recallReportHistory.setMonth(checkObj.getMonth());

//

				// Manager Details
				recallReportHistory.setManager_status(checkObj.getManager_status());
				recallReportHistory.setManager_saved_on(checkObj.getManager_saved_on());
				recallReportHistory.setManager_saved_by(checkObj.getManager_saved_by());
				recallReportHistory.setManager_saved_id(checkObj.getManager_saved_id());
				recallReportHistory.setManager_submitted_on(checkObj.getManager_submitted_on());
				recallReportHistory.setManager_submitted_by(checkObj.getManager_submitted_by());
				recallReportHistory.setManager_submitted_id(checkObj.getManager_submitted_id());
				recallReportHistory.setManager_sign(checkObj.getManager_sign());

				// Plant Head Details
				recallReportHistory.setPlant_head_status(checkObj.getPlant_head_status());
				recallReportHistory.setPlant_head_approved_on(checkObj.getPlant_head_approved_on());
				recallReportHistory.setPlant_head_approved_by(checkObj.getPlant_head_approved_by());
				recallReportHistory.setPlant_head_approver_id(checkObj.getPlant_head_approver_id());
				recallReportHistory.setPlant_head_sign(checkObj.getPlant_head_sign());

//				// VERSION

				String versyear = recallReportHistory.getYear();
				String versDate = recallReportHistory.getDate();

				int version = mommockrecallhistoryrepository.getMaximumVersion(versyear, versDate).map(temp -> temp + 1)
						.orElse(1);

				recallReportHistory.setVersion(version);

				mommockrecallhistoryrepository.save(recallReportHistory);

				List<MomMocKRecallHeader> historyHeader = checkObj.getMomHeaderDetails();

				for (MomMocKRecallHeader obj : historyHeader) {

					MomMocKRecallHeaderHistory objHistory = new MomMocKRecallHeaderHistory();

					BeanUtils.copyProperties(obj, objHistory, "hist_hed_id");

					objHistory.setMom_hist_id(recallReportHistory.getMom_hist_id());

					mommockrecallheaderhistoryrepository.save(objHistory);

				}

				List<MomMockRecallLines> historyLines = checkObj.getMomLineDetails();

				for (MomMockRecallLines obj : historyLines) {

					MomMockRecallLinesHistory objHistory = new MomMockRecallLinesHistory();

					BeanUtils.copyProperties(obj, objHistory, "hist_lin_id");

					objHistory.setMom_hist_id(recallReportHistory.getMom_hist_id());

					mommockrecalllineshistoryrepository.save(objHistory);

				}

				// MAIL
				try {

					qamailfunction.sendMailToPlantHead(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
							HttpStatus.OK);
				}

			}

			else {

				if (role.equalsIgnoreCase("QA_MANAGER") || role.equalsIgnoreCase("ROLE_DESIGNEE")) {

					checkObj = details;

					checkObj.setManager_status(QaAppConstants.ManagerApprove);
					checkObj.setManager_submitted_by(userName);
					checkObj.setManager_submitted_id(userId);
					checkObj.setManager_submitted_on(date);
					checkObj.setManager_sign(userName);
					checkObj.setPlant_head_status(QaAppConstants.waitingStatus);

					//

					MomMockRecall savedDetails = mommockrecallrepository.save(checkObj);

					List<MomMocKRecallHeader> Headlist = details.getMomHeaderDetails();

					if (Headlist != null) {

						for (MomMocKRecallHeader headDetails : Headlist) {

							headDetails.setMom_id(savedDetails.getMom_id());

							mommockrecallheaderrepository.save(headDetails);
						}
					}

					List<MomMockRecallLines> Linelist = details.getMomLineDetails();
					if (Linelist != null) {
						for (MomMockRecallLines lineDetails : Linelist) {

							lineDetails.setMom_id(savedDetails.getMom_id());

							mommockrecalllinesrepository.save(lineDetails);
						}
					}

					// HISTORY AUDIT

					MomMockRecallHistory recallReportHistory = new MomMockRecallHistory();

					recallReportHistory.setFormatNo(checkObj.getFormatNo());
					recallReportHistory.setFormatName(checkObj.getFormatName());
					recallReportHistory.setRevisionNo(checkObj.getRevisionNo());
					recallReportHistory.setSopNumber(checkObj.getSopNumber());
					recallReportHistory.setUnit(checkObj.getUnit());
					recallReportHistory.setDate(checkObj.getDate());
					recallReportHistory.setYear(checkObj.getYear());
					recallReportHistory.setAgenda(checkObj.getAgenda());
					recallReportHistory.setVenue(checkObj.getAgenda());
					recallReportHistory.setReason(checkObj.getReason());
					recallReportHistory.setReason(checkObj.getReason());
					recallReportHistory.setMonth(checkObj.getMonth());

					//

					// Manager Details
					recallReportHistory.setManager_status(checkObj.getManager_status());
					recallReportHistory.setManager_saved_on(checkObj.getManager_saved_on());
					recallReportHistory.setManager_saved_by(checkObj.getManager_saved_by());
					recallReportHistory.setManager_saved_id(checkObj.getManager_saved_id());
					recallReportHistory.setManager_submitted_on(checkObj.getManager_submitted_on());
					recallReportHistory.setManager_submitted_by(checkObj.getManager_submitted_by());
					recallReportHistory.setManager_submitted_id(checkObj.getManager_submitted_id());
					recallReportHistory.setManager_sign(checkObj.getManager_sign());

					// Plant Head Details
					recallReportHistory.setPlant_head_status(checkObj.getPlant_head_status());
					recallReportHistory.setPlant_head_approved_on(checkObj.getPlant_head_approved_on());
					recallReportHistory.setPlant_head_approved_by(checkObj.getPlant_head_approved_by());
					recallReportHistory.setPlant_head_approver_id(checkObj.getPlant_head_approver_id());
					recallReportHistory.setPlant_head_sign(checkObj.getPlant_head_sign());

//					// VERSION

					String versyear = recallReportHistory.getYear();
					String versDate = recallReportHistory.getDate();

					int version = mommockrecallhistoryrepository.getMaximumVersion(versyear, versDate)
							.map(temp -> temp + 1).orElse(1);

					recallReportHistory.setVersion(version);

					mommockrecallhistoryrepository.save(recallReportHistory);

					List<MomMocKRecallHeader> historyHeader = checkObj.getMomHeaderDetails();

					for (MomMocKRecallHeader obj : historyHeader) {

						MomMocKRecallHeaderHistory objHistory = new MomMocKRecallHeaderHistory();

						BeanUtils.copyProperties(obj, objHistory, "hist_hed_id");

						objHistory.setMom_hist_id(recallReportHistory.getMom_hist_id());

						mommockrecallheaderhistoryrepository.save(objHistory);

					}

					List<MomMockRecallLines> historyLines = checkObj.getMomLineDetails();

					for (MomMockRecallLines obj : historyLines) {

						MomMockRecallLinesHistory objHistory = new MomMockRecallLinesHistory();

						BeanUtils.copyProperties(obj, objHistory, "mom_hist_id");

						objHistory.setMom_hist_id(recallReportHistory.getMom_hist_id());

						mommockrecalllineshistoryrepository.save(objHistory);

					}

					// MAIL
					try {

						qamailfunction.sendMailToPlantHead(checkObj);
					} catch (Exception ex) {
						return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
								HttpStatus.OK);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, "Unauthorized!"), HttpStatus.BAD_REQUEST);
				}
			}
			return new ResponseEntity<>(checkObj, HttpStatus.OK);
		} catch (Exception e) {
			log.error("***************** Unable to Save !*********************\n" + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save !" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> MomMocRecallapproveOrReject(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		MomMockRecall object = new MomMockRecall();

		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = mommockrecallrepository.findFormById(approvalResponse.getId());

			MomMockRecallHistory objHistory = new MomMockRecallHistory();

			String managerStatus = object.getManager_status();

			if (userRole.equalsIgnoreCase("ROLE_PLANT_HEAD")) {

				if (managerStatus.equalsIgnoreCase(QaAppConstants.ManagerApprove)) {

					object.setPlant_head_approved_on(date);
					object.setPlant_head_approved_by(userName);
					object.setPlant_head_approver_id(userId);
					object.setPlant_head_sign(userName);

					objHistory = mommockrecallhistoryrepository.fetchLastSubmittedRecord(object.getYear(),
							object.getDate());

					objHistory.setPlant_head_approved_on(date);
					objHistory.setPlant_head_approved_by(userName);
					objHistory.setPlant_head_approver_id(userId);
					objHistory.setPlant_head_sign(userName);

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setPlant_head_status(QaAppConstants.plantHeadApprove);
						objHistory.setPlant_head_status(QaAppConstants.plantHeadApprove);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						object.setPlant_head_status(QaAppConstants.plantHeadReject);
						object.setReason(approvalResponse.getRemarks());

						objHistory.setPlant_head_status(QaAppConstants.plantHeadReject);
						objHistory.setReason(approvalResponse.getRemarks());

					}

					mommockrecallrepository.save(object);
					mommockrecallhistoryrepository.save(objHistory);

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
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	public ResponseEntity<?> ListOfMomRecallsummary(HttpServletRequest http) {
		List<MomMockRecall> details = null;

		try {

			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equalsIgnoreCase("QA_MANAGER") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

				details = mommockrecallrepository.qaManagerSummary();

			}

			else if (userRole.equalsIgnoreCase("ROLE_PLANT_HEAD")) {

				details = mommockrecallrepository.PlantHeadSummary();

			}

			else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("***************** Unable to get Details!*********************\n" + e);
			String msg = scaUtil.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to get Details!" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> ListOfMomRecallParam(String date) {
		try {

			MomMockRecall obj = mommockrecallrepository.findByparam(date);

			if (obj == null) {

				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(obj, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> ListOfMomRecallPrint(String year, String month, String date) {
		try {

			List<MomMockRecall> list = mommockrecallrepository.Print(year, month, date);

			if (list == null) {

				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<ApiResponse> deleteMomRecall(Long id, String key) {
		try {
			if (key.equalsIgnoreCase("HEADER")) {
				MomMocKRecallHeader details = mommockrecallheaderrepository.findFormById(id);

				if (details == null) {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST)
							.body(new ApiResponse(false, "No data found for HEADER with id: " + id));
				}

				mommockrecallheaderrepository.deleteById(id);

			} else if (key.equalsIgnoreCase("LINE")) {
				MomMockRecallLines details = mommockrecalllinesrepository.findFormById(id);

				if (details == null) {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST)
							.body(new ApiResponse(false, "No data found for LINE with id: " + id));
				}

				mommockrecalllinesrepository.deleteById(id);

			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false,
						"Invalid key: " + key + ". Please select a correct key (HEADER or LINE)."));
			}

		} catch (Exception ex) {
			log.error("**** Unable to delete details! ****", ex);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ApiResponse(false, "Unable to delete details due to an error."));
		}

		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Deleted successfully"));
	}

}
