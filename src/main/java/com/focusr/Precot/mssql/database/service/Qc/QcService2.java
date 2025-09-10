package com.focusr.Precot.mssql.database.service.Qc;

import java.text.SimpleDateFormat;
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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.focusr.Precot.mssql.database.model.Qc.CoaAbCottonF26;
import com.focusr.Precot.mssql.database.model.Qc.CoaCottonBallsF26B;
import com.focusr.Precot.mssql.database.model.Qc.CoaCottonPadsF26A;
import com.focusr.Precot.mssql.database.model.Qc.CoaCottonRollGoodsF26E;
import com.focusr.Precot.mssql.database.model.Qc.CoaCottonWoolPleatF26D;
import com.focusr.Precot.mssql.database.model.Qc.CoaCottonWoolRollF26C;
import com.focusr.Precot.mssql.database.model.Qc.CoaInfusedCottonPadsF26F;
import com.focusr.Precot.mssql.database.model.Qc.CoaMoistureF26G;
import com.focusr.Precot.mssql.database.model.Qc.CoaMoistureF26GLines;
import com.focusr.Precot.mssql.database.model.Qc.DigitalColonyCounterF030;
import com.focusr.Precot.mssql.database.model.Qc.StandarizationOfChemicalReportF016;
import com.focusr.Precot.mssql.database.model.Qc.WaterAnalysisReportChemistF007;
import com.focusr.Precot.mssql.database.model.Qc.WaterAnalysisReportF007;
import com.focusr.Precot.mssql.database.model.Qc.WaterAnalysisReportMicroF007;
import com.focusr.Precot.mssql.database.model.QcAudit.CoaAbCottonF26History;
import com.focusr.Precot.mssql.database.model.QcAudit.CoaCottonBallsF26BHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.CoaCottonPadsF26AHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.CoaCottonRollGoodsF26EHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.CoaCottonWoolPleatF26DHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.CoaCottonWoolRollF26CHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.CoaInfusedCottonPadsF26FHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.CoaMoistureF26GHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.CoaMoistureF26GLinesHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.DigitalColonyCounterF030History;
import com.focusr.Precot.mssql.database.model.QcAudit.StandarizationOfChemicalReportF016History;
import com.focusr.Precot.mssql.database.model.QcAudit.WaterAnalysisReportChemistF007History;
import com.focusr.Precot.mssql.database.model.QcAudit.WaterAnalysisReportF007History;
import com.focusr.Precot.mssql.database.model.QcAudit.WaterAnalysisReportMicroF007History;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.Qc.CoaAbCottonF26Repo;
import com.focusr.Precot.mssql.database.repository.Qc.CoaCottonBallsF26BRepo;
import com.focusr.Precot.mssql.database.repository.Qc.CoaCottonPadsF2A6Repo;
import com.focusr.Precot.mssql.database.repository.Qc.CoaCottonRollGoodsF26ERepo;
import com.focusr.Precot.mssql.database.repository.Qc.CoaCottonWoolPleatF26DRepo;
import com.focusr.Precot.mssql.database.repository.Qc.CoaCottonWoolRollF26CRepo;
import com.focusr.Precot.mssql.database.repository.Qc.CoaInfusedCottonPadsF26FRepo;
import com.focusr.Precot.mssql.database.repository.Qc.CoaMoistureF26GLineRepo;
import com.focusr.Precot.mssql.database.repository.Qc.CoaMoistureF26GRepo;
import com.focusr.Precot.mssql.database.repository.Qc.DigitalColonyCounterF030Repo;
import com.focusr.Precot.mssql.database.repository.Qc.StandarizationOfChemicalReportF016Repo;
import com.focusr.Precot.mssql.database.repository.Qc.WaterAnalysisReportChemistF007Repo;
import com.focusr.Precot.mssql.database.repository.Qc.WaterAnalysisReportF007Repo;
import com.focusr.Precot.mssql.database.repository.Qc.WaterAnalysisReportMicroF007Repo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.CoaAbCottonF26HistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.CoaCottonBallsF26BHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.CoaCottonPadsF2A6HistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.CoaCottonRollGoodsF26EHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.CoaCottonWoolPleatF26DHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.CoaCottonWoolRollF26CHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.CoaInfusedCottonPadsF26FHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.CoaMoistureF26GHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.CoaMoistureF26GLinesHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.DigitalColonyCounterF030HistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.StandarizationOfChemicalReportF016HistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.WaterAnalysisReportChemistF007HistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.WaterAnalysisReportF007HistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.WaterAnalysisReportMicroF007HistoryRepo;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.BleachHodHrQaDetails;
import com.focusr.Precot.util.IdAndValuePair;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.Qc.AppConstantsQc;
import com.focusr.Precot.util.Qc.QcMailFunction;

@Service
public class QcService2 {

	@Autowired
	private SCAUtil scaUtil;

	@Autowired
	JwtTokenProvider tokenProvider;

	@Autowired
	private UserRepository userRepository;

	// F26

	@Autowired
	private CoaAbCottonF26Repo coaAbCottonF26Repo;

	@Autowired
	private CoaAbCottonF26HistoryRepo coaAbCottonF26HistoryRepo;

	// F26 A

	@Autowired
	private CoaCottonPadsF2A6Repo coaCottonPadsF2A6Repo;

	@Autowired
	private CoaCottonPadsF2A6HistoryRepo coaCottonPadsF2A6HistoryRepo;

	// F26 B

	@Autowired
	private CoaCottonBallsF26BRepo coaCottonBallsF26BRepo;

	@Autowired
	private CoaCottonBallsF26BHistoryRepo coaCottonBallsF26BHistoryRepo;

	// F26 C

	@Autowired
	private CoaCottonWoolRollF26CRepo coaCottonWoolRollF26CRepo;
	@Autowired
	private CoaCottonWoolRollF26CHistoryRepo coaCottonWoolRollF26CHistoryRepo;

	// F26D

	@Autowired
	private CoaCottonWoolPleatF26DRepo coaCottonWoolPleatF26DRepo;

	@Autowired
	private CoaCottonWoolPleatF26DHistoryRepo coaCottonWoolPleatF26DHistoryRepo;

	// F26E

	@Autowired
	private CoaCottonRollGoodsF26ERepo coaCottonRollGoodsF26ERepo;

	@Autowired
	private CoaCottonRollGoodsF26EHistoryRepo coaCottonRollGoodsF26EHistoryRepo;

	// F26 F

	@Autowired
	private CoaInfusedCottonPadsF26FRepo coaInfusedCottonPadsF26FRepo;

	@Autowired
	private CoaInfusedCottonPadsF26FHistoryRepo coaInfusedCottonPadsF26FHistoryRepo;

	// F26 G

	@Autowired
	private CoaMoistureF26GRepo coaMoistureF26GRepo;

	@Autowired
	private CoaMoistureF26GLineRepo coaMoistureF26GLineRepo;

	@Autowired
	private CoaMoistureF26GHistoryRepo coaMoistureF26GHistoryRepo;

	@Autowired
	private CoaMoistureF26GLinesHistoryRepo coaMoistureF26GLinesHistoryRepo;

	// F016 STANDARD

	@Autowired
	private StandarizationOfChemicalReportF016Repo standarizationOfChemicalReportF016Repo;

	@Autowired
	private StandarizationOfChemicalReportF016HistoryRepo standarizationOfChemicalReportF016HistoryRepo;

	// WATER ANALYSIS REPORT

	@Autowired
	private WaterAnalysisReportF007Repo waterAnalysisReportF007Repo;

	@Autowired
	private WaterAnalysisReportChemistF007Repo waterAnalysisReportChemistF007Repo;

	@Autowired
	private WaterAnalysisReportMicroF007Repo waterAnalysisReportMicroF007Repo;

	// WATER ANALYSIS REPORT HISTORY

	@Autowired
	private WaterAnalysisReportF007HistoryRepo waterAnalysisReportF007HistoryRepo;

	@Autowired
	private WaterAnalysisReportChemistF007HistoryRepo waterAnalysisReportChemistF007HistoryRepo;

	@Autowired
	private WaterAnalysisReportMicroF007HistoryRepo waterAnalysisReportMicroF007HistoryRepo;

	// DIGITAL COLONY COUNTER CALIBRATION REPORT

	@Autowired
	private DigitalColonyCounterF030Repo digitalColonyCounterF030Repo;

	@Autowired
	private DigitalColonyCounterF030HistoryRepo digitalColonyCounterF030HistoryRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private QcMailFunction qcMailFunction;

	// CODE

	Logger log = LoggerFactory.getLogger(QcService2.class);

	public ResponseEntity<?> getCustomerName() {

		List<String> orderProductResponse = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();

		try {
			orderProductResponse = coaAbCottonF26Repo.getCustomerName();

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

	// TESTING

	public ResponseEntity<?> getMail() {

		List<BleachHodHrQaDetails> orderProductResponse = null;

		try {

			orderProductResponse = userRepo.getQcDepartQaQcManager();

		} catch (Exception ex) {
			String msg = ex.getMessage();
			log.error("Error fetching Order Number Details with Pads category : " + msg);
			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to get Order Number Details with Pads category. "),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(orderProductResponse, HttpStatus.OK);
	}

	public ResponseEntity<?> getProductName(String customer) {

		List<String> orderProductResponse = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();

		try {
			orderProductResponse = coaAbCottonF26Repo.getProductName(customer);

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

	// MEDLINE

	public ResponseEntity<?> ProductNameMedline(String customer) {

		List<String> orderProductResponse = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();

		try {
			orderProductResponse = coaAbCottonF26Repo.getProductNameMedline(customer);

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

	public ResponseEntity<?> getBaleNo() {

		List<String> orderProductResponse = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();

		try {
			orderProductResponse = coaAbCottonF26Repo.getBaleNo();

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

	// PACK DT

	public ResponseEntity<?> getPackDt(String baleNo) {

		List<Date> orderProductResponse = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();

		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

		try {
			orderProductResponse = coaAbCottonF26Repo.getPacDt(baleNo);

			if (orderProductResponse.isEmpty() || orderProductResponse == null) {

			} else {

				Long id = (long) 1;

				for (Date order : orderProductResponse) {

					IdAndValuePair values = new IdAndValuePair();
					values.setId(id);

					String formattedDate = dateFormat.format(order);

					values.setType(formattedDate);
					values.setValue(formattedDate);

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

	public ResponseEntity<?> getChemicalName() {

		List<String> orderProductResponse = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();

		try {
			orderProductResponse = coaAbCottonF26Repo.getChemicalName();

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

//	=======================================

	public ResponseEntity<?> SaveAbCottonF26(CoaAbCottonF26 abCotton, HttpServletRequest http) {

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		CoaAbCottonF26 listObj = null;

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getId() != null) {

				Long id = abCotton.getId();

				listObj = coaAbCottonF26Repo.findFormById(id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "chemist_status", "chemist_saved_on",
						"chemist_saved_by", "chemist_saved_id", "chemist_submit_on", "chemist_submit_by",
						"chemist_submit_id", "chemist_sign", "qa_exe_status", "qa_exe_submit_on", "qa_exe_submit_by",
						"qa_exe_submit_id", "qa_exe_sign", "manager_status", "manager_submit_on", "manager_submit_by",
						"manager_submit_id", "manager_sign" };

				BeanUtils.copyProperties(abCotton, listObj, IgnoreProps);

				if (role.equals("ROLE_CHEMIST")) {

					listObj.setChemist_saved_by(userName);
					listObj.setChemist_saved_on(date);
					listObj.setChemist_saved_id(userId);
					listObj.setChemist_status(AppConstantsQc.chemistSave);

					listObj.setQa_exe_status("");
					listObj.setManager_status("");

					coaAbCottonF26Repo.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				if (role.equals("ROLE_CHEMIST")) {

					listObj = abCotton;

					listObj.setChemist_saved_by(userName);
					listObj.setChemist_saved_on(date);
					listObj.setChemist_saved_id(userId);
					listObj.setChemist_status(AppConstantsQc.chemistSave);

					listObj.setQa_exe_status("");
					listObj.setManager_status("");

					coaAbCottonF26Repo.save(listObj);

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

	public ResponseEntity<?> SubmitAbCottonF26(CoaAbCottonF26 abCotton, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = abCotton.getId();

		CoaAbCottonF26 checkObj = new CoaAbCottonF26();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getFormatNo() == null)
				value = "formatNo";
			if (abCotton.getRefSopNo() == null)
				value = "SopNumber";
			if (abCotton.getRevisionNo() == null)
				value = "revisionNo";
			if (abCotton.getFormatName() == null)
				value = "formatName";
			if (abCotton.getDate() == null)
				value = "date";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = coaAbCottonF26Repo.findFormById(id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "chemist_status", "chemist_saved_on",
						"chemist_saved_by", "chemist_saved_id", "chemist_submit_on", "chemist_submit_by",
						"chemist_submit_id", "chemist_sign", "qa_exe_status", "qa_exe_submit_on", "qa_exe_submit_by",
						"qa_exe_submit_id", "qa_exe_sign", "manager_status", "manager_submit_on", "manager_submit_by",
						"manager_submit_id", "manager_sign" };

				BeanUtils.copyProperties(abCotton, checkObj, IgnoreProps);

				String qz = checkObj.getQa_exe_status();
				String man = checkObj.getManager_status();

				if (!checkObj.getChemist_status().equals(AppConstantsQc.chemistSubmitted)
						|| checkObj.getQa_exe_status().equals(AppConstantsQc.QAExeReject)
						|| checkObj.getManager_status().equals(AppConstantsQc.QAReject)
						|| checkObj.getManager_status().equals(AppConstantsQc.QCRejected)) {

					if (role.equals("ROLE_CHEMIST")) {

						checkObj.setChemist_submit_by(userName);
						checkObj.setChemist_submit_on(date);
						checkObj.setChemist_submit_id(userId);
						checkObj.setChemist_status(AppConstantsQc.chemistSubmitted);
						checkObj.setChemist_sign(userName);
						checkObj.setQa_exe_status(AppConstantsQc.QAExeWaiting);
						checkObj.setManager_status("");

						coaAbCottonF26Repo.save(checkObj);

						// HISTORY

						CoaAbCottonF26History rejectionReportHistory = new CoaAbCottonF26History();

						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						String product = rejectionReportHistory.getProduct();
						String customer = rejectionReportHistory.getCustomer();

						int version = coaAbCottonF26HistoryRepo.getMaximumVersion(product, customer)
								.map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						coaAbCottonF26HistoryRepo.save(rejectionReportHistory);

//                    Mail logic

						try {

							qcMailFunction.sendEmailToQaExeF26(checkObj);
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

				if (!role.equals("ROLE_CHEMIST")) {
					return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = abCotton;

				checkObj.setChemist_submit_by(userName);
				checkObj.setChemist_submit_on(date);
				checkObj.setChemist_submit_id(userId);
				checkObj.setChemist_status(AppConstantsQc.chemistSubmitted);
				checkObj.setChemist_sign(userName);
				checkObj.setQa_exe_status(AppConstantsQc.QAExeWaiting);
				checkObj.setManager_status("");

				coaAbCottonF26Repo.save(checkObj);

				CoaAbCottonF26History rejectionReportHistory = new CoaAbCottonF26History();

				BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				String product = rejectionReportHistory.getProduct();
				String customer = rejectionReportHistory.getCustomer();

				int version = coaAbCottonF26HistoryRepo.getMaximumVersion(product, customer).map(temp -> temp + 1)
						.orElse(1);

				rejectionReportHistory.setVersion(version);

				coaAbCottonF26HistoryRepo.save(rejectionReportHistory);

//				Mail logic

				try {

					qcMailFunction.sendEmailToQaExeF26(checkObj);
				} catch (Exception ex) {

					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
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

	// PRINT

	public ResponseEntity<?> PrintApiF26(String product, String customer) {
		try {

			List<CoaAbCottonF26> list = coaAbCottonF26Repo.PrintApiF26(product, customer);

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

	public ResponseEntity<?> getAbCottton(String product, String customer) {
		try {

			List<CoaAbCottonF26> list = coaAbCottonF26Repo.GetAbCottonF26(product, customer);

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

	// APPROVE OR REJECT

	public ResponseEntity<?> approveRejectionF26(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		CoaAbCottonF26 object = new CoaAbCottonF26();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = coaAbCottonF26Repo.findFormById(approvalResponse.getId());

			CoaAbCottonF26History objHistory = new CoaAbCottonF26History();

			String cheStatus = object.getChemist_status();
			String qaExeStatus = object.getQa_exe_status();
			String qcStatus = object.getManager_status();

			if (userRole.equalsIgnoreCase("QA_EXECUTIVE")) {

				object.setQa_exe_submit_on(date);
				object.setQa_exe_submit_by(userName);
				object.setQa_exe_submit_id(userId);
				object.setQa_exe_sign(userName);
				object.setManager_status(AppConstantsQc.ManWaiting);

				objHistory = coaAbCottonF26HistoryRepo.fetchLastSubmittedRecord(object.getProduct(),
						object.getCustomer());
				objHistory.setQa_exe_submit_on(date);
				objHistory.setQa_exe_submit_by(userName);
				objHistory.setQa_exe_submit_id(userId);
				objHistory.setQa_exe_sign(userName);
				objHistory.setManager_status(AppConstantsQc.ManWaiting);

				if (cheStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
						&& qaExeStatus.equalsIgnoreCase(AppConstantsQc.QAExeWaiting)) {

					if (approvalResponse.getStatus().equals("Approve")) {
						object.setQa_exe_status(AppConstantsQc.QAExeApprove);
						objHistory.setQa_exe_status(AppConstantsQc.QAExeApprove);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {
						object.setQa_exe_status(AppConstantsQc.QAExeReject);
						object.setReason(approvalResponse.getRemarks());
						objHistory.setQa_exe_status(AppConstantsQc.QAExeReject);
						object.setReason(approvalResponse.getRemarks());
					}

					coaAbCottonF26Repo.save(object);

					coaAbCottonF26HistoryRepo.save(objHistory);

					try {

						if (object.getQa_exe_status().equals("QA_EXE_APPROVED"))

						{
							qcMailFunction.sendEmailToManagerF26(object);
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

			else if (userRole.equalsIgnoreCase("QC_MANAGER") || userRole.equalsIgnoreCase("QA_MANAGER")) {

				if (qaExeStatus.equalsIgnoreCase(AppConstantsQc.QAExeApprove)
						&& qcStatus.equalsIgnoreCase(AppConstantsQc.ManWaiting)) {

					object.setManager_submit_on(date);
					object.setManager_submit_by(userName);
					object.setManager_submit_id(userId);
					object.setManager_sign(userName);

					objHistory = coaAbCottonF26HistoryRepo.fetchLastSubmittedRecord(object.getProduct(),
							object.getCustomer());
					objHistory.setManager_submit_on(date);
					objHistory.setManager_submit_by(userName);
					objHistory.setManager_submit_id(userId);
					objHistory.setManager_sign(userName);

					if (approvalResponse.getStatus().equals("Approve")) {

						if (userRole.equalsIgnoreCase("QC_MANAGER")) {
							object.setManager_status(AppConstantsQc.QCApprove);
							objHistory.setManager_status(AppConstantsQc.QCApprove);

						} else if (userRole.equalsIgnoreCase("QA_MANAGER")) {
							object.setManager_status(AppConstantsQc.QAApprove);
							objHistory.setManager_status(AppConstantsQc.QAApprove);

						}

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						if (userRole.equalsIgnoreCase("QC_MANAGER")) {
							object.setManager_status(AppConstantsQc.QCRejected);
							object.setReason(approvalResponse.getRemarks());

							objHistory.setManager_status(AppConstantsQc.QCRejected);
							objHistory.setReason(approvalResponse.getRemarks());

						} else if (userRole.equalsIgnoreCase("QA_MANAGER")) {
							object.setManager_status(AppConstantsQc.QAReject);
							object.setReason(approvalResponse.getRemarks());

							objHistory.setManager_status(AppConstantsQc.QAReject);
							objHistory.setReason(approvalResponse.getRemarks());

						}

					}

					coaAbCottonF26Repo.save(object);

					coaAbCottonF26HistoryRepo.save(objHistory);

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

	// SUMMARY

	public ResponseEntity<?> AbCottonSummary(HttpServletRequest http) {

		List<CoaAbCottonF26> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_CHEMIST")) {

				details = coaAbCottonF26Repo.chemistSummary();
			}

			else if (userRole.equalsIgnoreCase("QA_EXECUTIVE") || userRole.equalsIgnoreCase("QC_MANAGER")
					|| userRole.equalsIgnoreCase("QA_MANAGER")) {
				details = coaAbCottonF26Repo.exeManagerSummary();
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

//	==================================  F026-A ======================================

	public ResponseEntity<?> SaveCottonPadsF26A(CoaCottonPadsF26A abCotton, HttpServletRequest http) {

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		CoaCottonPadsF26A listObj = null;

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getId() != null) {

				Long id = abCotton.getId();

				listObj = coaCottonPadsF2A6Repo.findFormById(id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "chemist_status", "chemist_saved_on",
						"chemist_saved_by", "chemist_saved_id", "chemist_submit_on", "chemist_submit_by",
						"chemist_submit_id", "chemist_sign", "qa_exe_status", "qa_exe_submit_on", "qa_exe_submit_by",
						"qa_exe_submit_id", "qa_exe_sign", "manager_status", "manager_submit_on", "manager_submit_by",
						"manager_submit_id", "manager_sign" };

				BeanUtils.copyProperties(abCotton, listObj, IgnoreProps);

				if (role.equals("ROLE_CHEMIST")) {

					listObj.setChemist_saved_by(userName);
					listObj.setChemist_saved_on(date);
					listObj.setChemist_saved_id(userId);
					listObj.setChemist_status(AppConstantsQc.chemistSave);

					listObj.setQa_exe_status("");
					listObj.setManager_status("");

					coaCottonPadsF2A6Repo.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				if (role.equals("ROLE_CHEMIST")) {

					listObj = abCotton;

					listObj.setChemist_saved_by(userName);
					listObj.setChemist_saved_on(date);
					listObj.setChemist_saved_id(userId);
					listObj.setChemist_status(AppConstantsQc.chemistSave);

					listObj.setQa_exe_status("");
					listObj.setManager_status("");

					coaCottonPadsF2A6Repo.save(listObj);

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

	public ResponseEntity<?> SubmitCottonPadsF26A(CoaCottonPadsF26A abCotton, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = abCotton.getId();

		CoaCottonPadsF26A checkObj = new CoaCottonPadsF26A();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getFormatNo() == null)
				value = "formatNo";
			if (abCotton.getRefSopNo() == null)
				value = "SopNumber";
			if (abCotton.getRevisionNo() == null)
				value = "revisionNo";
			if (abCotton.getFormatName() == null)
				value = "formatName";
			if (abCotton.getDate() == null)
				value = "date";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = coaCottonPadsF2A6Repo.findFormById(id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "chemist_status", "chemist_saved_on",
						"chemist_saved_by", "chemist_saved_id", "chemist_submit_on", "chemist_submit_by",
						"chemist_submit_id", "chemist_sign", "qa_exe_status", "qa_exe_submit_on", "qa_exe_submit_by",
						"qa_exe_submit_id", "qa_exe_sign", "manager_status", "manager_submit_on", "manager_submit_by",
						"manager_submit_id", "manager_sign" };

				BeanUtils.copyProperties(abCotton, checkObj, IgnoreProps);

				if (!checkObj.getChemist_status().equals(AppConstantsQc.chemistSubmitted)
						|| checkObj.getQa_exe_status().equals(AppConstantsQc.QAExeReject)
						|| checkObj.getManager_status().equals(AppConstantsQc.QAReject)
						|| checkObj.getManager_status().equals(AppConstantsQc.QCRejected)) {

					if (role.equals("ROLE_CHEMIST")) {

						checkObj.setChemist_submit_by(userName);
						checkObj.setChemist_submit_on(date);
						checkObj.setChemist_submit_id(userId);
						checkObj.setChemist_status(AppConstantsQc.chemistSubmitted);
						checkObj.setChemist_sign(userName);
						checkObj.setQa_exe_status(AppConstantsQc.QAExeWaiting);
						checkObj.setManager_status("");

						coaCottonPadsF2A6Repo.save(checkObj);

						// HISTORY

						CoaCottonPadsF26AHistory rejectionReportHistory = new CoaCottonPadsF26AHistory();

						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						String product = rejectionReportHistory.getProduct();
						String customer = rejectionReportHistory.getCustomer();

						int version = coaCottonPadsF2A6HistoryRepo.getMaximumVersion(product, customer)
								.map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						coaCottonPadsF2A6HistoryRepo.save(rejectionReportHistory);

//                    Mail logic

						try {

							qcMailFunction.sendEmailToQaExeF26A(checkObj);
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

				if (!role.equals("ROLE_CHEMIST")) {
					return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = abCotton;

				checkObj.setChemist_submit_by(userName);
				checkObj.setChemist_submit_on(date);
				checkObj.setChemist_submit_id(userId);
				checkObj.setChemist_status(AppConstantsQc.chemistSubmitted);
				checkObj.setChemist_sign(userName);
				checkObj.setQa_exe_status(AppConstantsQc.QAExeWaiting);
				checkObj.setManager_status("");

				coaCottonPadsF2A6Repo.save(checkObj);

				CoaCottonPadsF26AHistory rejectionReportHistory = new CoaCottonPadsF26AHistory();

				BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				String product = rejectionReportHistory.getProduct();
				String customer = rejectionReportHistory.getCustomer();

				int version = coaCottonPadsF2A6HistoryRepo.getMaximumVersion(product, customer).map(temp -> temp + 1)
						.orElse(1);

				rejectionReportHistory.setVersion(version);

				coaCottonPadsF2A6HistoryRepo.save(rejectionReportHistory);

//				Mail logic

				try {

					qcMailFunction.sendEmailToQaExeF26A(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
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

	// PRINT

	public ResponseEntity<?> PrintApiF26A(String product, String customer) {
		try {

			List<CoaCottonPadsF26A> list = coaCottonPadsF2A6Repo.PrintApiF26(product, customer);

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

	public ResponseEntity<?> getCotttonPadF26A(String product, String customer) {
		try {

			List<CoaCottonPadsF26A> list = coaCottonPadsF2A6Repo.GetAbCottonF26(product, customer);

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

	// APPROVE OR REJECT

	public ResponseEntity<?> approveRejectionF26A(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		CoaCottonPadsF26A object = new CoaCottonPadsF26A();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = coaCottonPadsF2A6Repo.findFormById(approvalResponse.getId());

			CoaCottonPadsF26AHistory objHistory = new CoaCottonPadsF26AHistory();

			String cheStatus = object.getChemist_status();
			String qaExeStatus = object.getQa_exe_status();
			String qcStatus = object.getManager_status();

			if (userRole.equalsIgnoreCase("QA_EXECUTIVE")) {

				object.setQa_exe_submit_on(date);
				object.setQa_exe_submit_by(userName);
				object.setQa_exe_submit_id(userId);
				object.setQa_exe_sign(userName);
				object.setManager_status(AppConstantsQc.ManWaiting);

				objHistory = coaCottonPadsF2A6HistoryRepo.fetchLastSubmittedRecord(object.getProduct(),
						object.getCustomer());
				objHistory.setQa_exe_submit_on(date);
				objHistory.setQa_exe_submit_by(userName);
				objHistory.setQa_exe_submit_id(userId);
				objHistory.setQa_exe_sign(userName);
				objHistory.setManager_status(AppConstantsQc.ManWaiting);

				if (cheStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
						&& qaExeStatus.equalsIgnoreCase(AppConstantsQc.QAExeWaiting)) {

					if (approvalResponse.getStatus().equals("Approve")) {
						object.setQa_exe_status(AppConstantsQc.QAExeApprove);
						objHistory.setQa_exe_status(AppConstantsQc.QAExeApprove);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {
						object.setQa_exe_status(AppConstantsQc.QAExeReject);
						object.setReason(approvalResponse.getRemarks());
						objHistory.setQa_exe_status(AppConstantsQc.QAExeReject);
						object.setReason(approvalResponse.getRemarks());
					}

					coaCottonPadsF2A6Repo.save(object);

					coaCottonPadsF2A6HistoryRepo.save(objHistory);

					try {

						if (object.getQa_exe_status() != null) {

							if (object.getQa_exe_status().equals("QA_EXE_APPROVED"))

							{
								qcMailFunction.sendEmailToManagerF26A(object);
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

			else if (userRole.equalsIgnoreCase("QC_MANAGER") || userRole.equalsIgnoreCase("QA_MANAGER")) {

				if (qaExeStatus.equalsIgnoreCase(AppConstantsQc.QAExeApprove)
						&& qcStatus.equalsIgnoreCase(AppConstantsQc.ManWaiting)) {

					object.setManager_submit_on(date);
					object.setManager_submit_by(userName);
					object.setManager_submit_id(userId);
					object.setManager_sign(userName);

					objHistory = coaCottonPadsF2A6HistoryRepo.fetchLastSubmittedRecord(object.getProduct(),
							object.getCustomer());

					objHistory.setManager_submit_on(date);
					objHistory.setManager_submit_by(userName);
					objHistory.setManager_submit_id(userId);
					objHistory.setManager_sign(userName);

					if (approvalResponse.getStatus().equals("Approve")) {

						if (userRole.equalsIgnoreCase("QC_MANAGER")) {
							object.setManager_status(AppConstantsQc.QCApprove);
							objHistory.setManager_status(AppConstantsQc.QCApprove);

						} else if (userRole.equalsIgnoreCase("QA_MANAGER")) {
							object.setManager_status(AppConstantsQc.QAApprove);
							objHistory.setManager_status(AppConstantsQc.QAApprove);
						}
					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						if (userRole.equalsIgnoreCase("QC_MANAGER")) {
							object.setManager_status(AppConstantsQc.QCRejected);
							object.setReason(approvalResponse.getRemarks());

							objHistory.setManager_status(AppConstantsQc.QCRejected);
							objHistory.setReason(approvalResponse.getRemarks());

						} else if (userRole.equalsIgnoreCase("QA_MANAGER")) {
							object.setManager_status(AppConstantsQc.QAReject);
							object.setReason(approvalResponse.getRemarks());
							objHistory.setManager_status(AppConstantsQc.QAReject);
							objHistory.setReason(approvalResponse.getRemarks());
						}
					}

					coaCottonPadsF2A6Repo.save(object);

					coaCottonPadsF2A6HistoryRepo.save(objHistory);

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

	// SUMMARY

	public ResponseEntity<?> F26ACottonPadSummary(HttpServletRequest http) {

		List<CoaCottonPadsF26A> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_CHEMIST")) {

				details = coaCottonPadsF2A6Repo.chemistSummary();
			}

			else if (userRole.equalsIgnoreCase("QA_EXECUTIVE") || userRole.equalsIgnoreCase("QC_MANAGER")
					|| userRole.equalsIgnoreCase("QA_MANAGER")) {
				details = coaCottonPadsF2A6Repo.exeManagerSummary();
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

//	==================================  F026-B ======================================

	public ResponseEntity<?> SaveCottonPadsF26B(CoaCottonBallsF26B abCotton, HttpServletRequest http) {

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		CoaCottonBallsF26B listObj = null;

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getId() != null) {

				Long id = abCotton.getId();

				listObj = coaCottonBallsF26BRepo.findFormById(id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "chemist_status", "chemist_saved_on",
						"chemist_saved_by", "chemist_saved_id", "chemist_submit_on", "chemist_submit_by",
						"chemist_submit_id", "chemist_sign", "qa_exe_status", "qa_exe_submit_on", "qa_exe_submit_by",
						"qa_exe_submit_id", "qa_exe_sign", "manager_status", "manager_submit_on", "manager_submit_by",
						"manager_submit_id", "manager_sign" };

				BeanUtils.copyProperties(abCotton, listObj, IgnoreProps);

				if (role.equals("ROLE_CHEMIST")) {

					listObj.setChemist_saved_by(userName);
					listObj.setChemist_saved_on(date);
					listObj.setChemist_saved_id(userId);
					listObj.setChemist_status(AppConstantsQc.chemistSave);

					listObj.setQa_exe_status("");
					listObj.setManager_status("");

					coaCottonBallsF26BRepo.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				if (role.equals("ROLE_CHEMIST")) {

					listObj = abCotton;

					listObj.setChemist_saved_by(userName);
					listObj.setChemist_saved_on(date);
					listObj.setChemist_saved_id(userId);
					listObj.setChemist_status(AppConstantsQc.chemistSave);

					listObj.setQa_exe_status("");
					listObj.setManager_status("");

					coaCottonBallsF26BRepo.save(listObj);

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

	public ResponseEntity<?> SubmitCottonPadsF26B(CoaCottonBallsF26B abCotton, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = abCotton.getId();

		CoaCottonBallsF26B checkObj = new CoaCottonBallsF26B();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getFormatNo() == null)
				value = "formatNo";
			if (abCotton.getRefSopNo() == null)
				value = "SopNumber";
			if (abCotton.getRevisionNo() == null)
				value = "revisionNo";
			if (abCotton.getFormatName() == null)
				value = "formatName";
			if (abCotton.getDate() == null)
				value = "date";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = coaCottonBallsF26BRepo.findFormById(id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "chemist_status", "chemist_saved_on",
						"chemist_saved_by", "chemist_saved_id", "chemist_submit_on", "chemist_submit_by",
						"chemist_submit_id", "chemist_sign", "qa_exe_status", "qa_exe_submit_on", "qa_exe_submit_by",
						"qa_exe_submit_id", "qa_exe_sign", "manager_status", "manager_submit_on", "manager_submit_by",
						"manager_submit_id", "manager_sign" };

				BeanUtils.copyProperties(abCotton, checkObj, IgnoreProps);

				if (!checkObj.getChemist_status().equals(AppConstantsQc.chemistSubmitted)
						|| checkObj.getQa_exe_status().equals(AppConstantsQc.QAExeReject)
						|| checkObj.getManager_status().equals(AppConstantsQc.QAReject)
						|| checkObj.getManager_status().equals(AppConstantsQc.QCRejected)) {

					if (role.equals("ROLE_CHEMIST")) {

						checkObj.setChemist_submit_by(userName);
						checkObj.setChemist_submit_on(date);
						checkObj.setChemist_submit_id(userId);
						checkObj.setChemist_status(AppConstantsQc.chemistSubmitted);
						checkObj.setChemist_sign(userName);
						checkObj.setQa_exe_status(AppConstantsQc.QAExeWaiting);
						checkObj.setManager_status("");

						coaCottonBallsF26BRepo.save(checkObj);

						// HISTORY

						CoaCottonBallsF26BHistory rejectionReportHistory = new CoaCottonBallsF26BHistory();

						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						String product = rejectionReportHistory.getProduct();
						String customer = rejectionReportHistory.getCustomer();

						int version = coaCottonBallsF26BHistoryRepo.getMaximumVersion(product, customer)
								.map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						coaCottonBallsF26BHistoryRepo.save(rejectionReportHistory);

//                    Mail logic

						try {

							qcMailFunction.sendEmailToQaExeF26B(checkObj);
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

				if (!role.equals("ROLE_CHEMIST")) {
					return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = abCotton;

				checkObj.setChemist_submit_by(userName);
				checkObj.setChemist_submit_on(date);
				checkObj.setChemist_submit_id(userId);
				checkObj.setChemist_status(AppConstantsQc.chemistSubmitted);
				checkObj.setChemist_sign(userName);
				checkObj.setQa_exe_status(AppConstantsQc.QAExeWaiting);
				checkObj.setManager_status("");

				coaCottonBallsF26BRepo.save(checkObj);

				CoaCottonBallsF26BHistory rejectionReportHistory = new CoaCottonBallsF26BHistory();

				BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				String product = rejectionReportHistory.getProduct();
				String customer = rejectionReportHistory.getCustomer();

				int version = coaCottonBallsF26BHistoryRepo.getMaximumVersion(product, customer).map(temp -> temp + 1)
						.orElse(1);

				rejectionReportHistory.setVersion(version);

				coaCottonBallsF26BHistoryRepo.save(rejectionReportHistory);

//				Mail logic

				try {

					qcMailFunction.sendEmailToQaExeF26B(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
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

	// PRINT

	public ResponseEntity<?> PrintApiF26B(String product, String customer) {
		try {

			List<CoaCottonBallsF26B> list = coaCottonBallsF26BRepo.PrintApiF26(product, customer);

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

	public ResponseEntity<?> getCotttonPadF26B(String product, String customer) {
		try {

			List<CoaCottonBallsF26B> list = coaCottonBallsF26BRepo.GetAbCottonF26(product, customer);

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

	// APPROVE OR REJECT

	public ResponseEntity<?> ApproveOrRejectF26B(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		CoaCottonBallsF26B object = new CoaCottonBallsF26B();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = coaCottonBallsF26BRepo.findFormById(approvalResponse.getId());

			CoaCottonBallsF26BHistory objHistory = new CoaCottonBallsF26BHistory();

			String cheStatus = object.getChemist_status();
			String qaExeStatus = object.getQa_exe_status();
			String qcStatus = object.getManager_status();

			if (userRole.equalsIgnoreCase("QA_EXECUTIVE")) {

				object.setQa_exe_submit_on(date);
				object.setQa_exe_submit_by(userName);
				object.setQa_exe_submit_id(userId);
				object.setQa_exe_sign(userName);
				object.setManager_status(AppConstantsQc.ManWaiting);

				objHistory = coaCottonBallsF26BHistoryRepo.fetchLastSubmittedRecord(object.getProduct(),
						object.getCustomer());
				objHistory.setQa_exe_submit_on(date);
				objHistory.setQa_exe_submit_by(userName);
				objHistory.setQa_exe_submit_id(userId);
				objHistory.setQa_exe_sign(userName);
				objHistory.setManager_status(AppConstantsQc.ManWaiting);

				if (cheStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
						&& qaExeStatus.equalsIgnoreCase(AppConstantsQc.QAExeWaiting)) {

					if (approvalResponse.getStatus().equals("Approve")) {
						object.setQa_exe_status(AppConstantsQc.QAExeApprove);
						objHistory.setQa_exe_status(AppConstantsQc.QAExeApprove);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {
						object.setQa_exe_status(AppConstantsQc.QAExeReject);
						object.setReason(approvalResponse.getRemarks());
						objHistory.setQa_exe_status(AppConstantsQc.QAExeReject);
						object.setReason(approvalResponse.getRemarks());
					}

					coaCottonBallsF26BRepo.save(object);

					coaCottonBallsF26BHistoryRepo.save(objHistory);

					try {

						if (object.getQa_exe_status() != null) {

							if (object.getQa_exe_status().equals("QA_EXE_APPROVED"))

							{
								qcMailFunction.sendEmailToManagerF26B(object);
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

			else if (userRole.equalsIgnoreCase("QC_MANAGER") || userRole.equalsIgnoreCase("QA_MANAGER")) {

				if (qaExeStatus.equalsIgnoreCase(AppConstantsQc.QAExeApprove)
						&& qcStatus.equalsIgnoreCase(AppConstantsQc.ManWaiting)) {

					object.setManager_submit_on(date);
					object.setManager_submit_by(userName);
					object.setManager_submit_id(userId);
					object.setManager_sign(userName);

					objHistory = coaCottonBallsF26BHistoryRepo.fetchLastSubmittedRecord(object.getProduct(),
							object.getCustomer());

					objHistory.setManager_submit_on(date);
					objHistory.setManager_submit_by(userName);
					objHistory.setManager_submit_id(userId);
					objHistory.setManager_sign(userName);

					if (approvalResponse.getStatus().equals("Approve")) {

						if (userRole.equalsIgnoreCase("QC_MANAGER")) {
							object.setManager_status(AppConstantsQc.QCApprove);
							objHistory.setManager_status(AppConstantsQc.QCApprove);

						} else if (userRole.equalsIgnoreCase("QA_MANAGER")) {
							object.setManager_status(AppConstantsQc.QAApprove);
							objHistory.setManager_status(AppConstantsQc.QAApprove);
						}
					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						if (userRole.equalsIgnoreCase("QC_MANAGER")) {
							object.setManager_status(AppConstantsQc.QCRejected);
							object.setReason(approvalResponse.getRemarks());

							objHistory.setManager_status(AppConstantsQc.QCRejected);
							objHistory.setReason(approvalResponse.getRemarks());

						} else if (userRole.equalsIgnoreCase("QA_MANAGER")) {
							object.setManager_status(AppConstantsQc.QAReject);
							object.setReason(approvalResponse.getRemarks());
							objHistory.setManager_status(AppConstantsQc.QAReject);
							objHistory.setReason(approvalResponse.getRemarks());
						}
					}

					coaCottonBallsF26BRepo.save(object);

					coaCottonBallsF26BHistoryRepo.save(objHistory);

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

	// SUMMARY

	public ResponseEntity<?> F26BCottonPadSummary(HttpServletRequest http) {

		List<CoaCottonBallsF26B> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_CHEMIST")) {

				details = coaCottonBallsF26BRepo.chemistSummary();
			}

			else if (userRole.equalsIgnoreCase("QA_EXECUTIVE") || userRole.equalsIgnoreCase("QC_MANAGER")
					|| userRole.equalsIgnoreCase("QA_MANAGER")) {
				details = coaCottonBallsF26BRepo.exeManagerSummary();
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

//	=============================  F026-C COTTON WOOL ROLL ============================

	public ResponseEntity<?> SaveCottonWoolRollF26C(CoaCottonWoolRollF26C abCotton, HttpServletRequest http) {

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		CoaCottonWoolRollF26C listObj = null;

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getId() != null) {

				Long id = abCotton.getId();

				listObj = coaCottonWoolRollF26CRepo.findFormById(id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "chemist_status", "chemist_saved_on",
						"chemist_saved_by", "chemist_saved_id", "chemist_submit_on", "chemist_submit_by",
						"chemist_submit_id", "chemist_sign", "qa_exe_status", "qa_exe_submit_on", "qa_exe_submit_by",
						"qa_exe_submit_id", "qa_exe_sign", "manager_status", "manager_submit_on", "manager_submit_by",
						"manager_submit_id", "manager_sign" };

				BeanUtils.copyProperties(abCotton, listObj, IgnoreProps);

				if (role.equals("ROLE_CHEMIST")) {

					listObj.setChemist_saved_by(userName);
					listObj.setChemist_saved_on(date);
					listObj.setChemist_saved_id(userId);
					listObj.setChemist_status(AppConstantsQc.chemistSave);

					listObj.setQa_exe_status("");
					listObj.setManager_status("");

					coaCottonWoolRollF26CRepo.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				if (role.equals("ROLE_CHEMIST")) {

					listObj = abCotton;

					listObj.setChemist_saved_by(userName);
					listObj.setChemist_saved_on(date);
					listObj.setChemist_saved_id(userId);
					listObj.setChemist_status(AppConstantsQc.chemistSave);

					listObj.setQa_exe_status("");
					listObj.setManager_status("");

					coaCottonWoolRollF26CRepo.save(listObj);

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

	public ResponseEntity<?> SubmitCottonWoolRollF26C(CoaCottonWoolRollF26C abCotton, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = abCotton.getId();

		CoaCottonWoolRollF26C checkObj = new CoaCottonWoolRollF26C();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getFormatNo() == null)
				value = "formatNo";
			if (abCotton.getRefSopNo() == null)
				value = "SopNumber";
			if (abCotton.getRevisionNo() == null)
				value = "revisionNo";
			if (abCotton.getFormatName() == null)
				value = "formatName";
			if (abCotton.getDate() == null)
				value = "date";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = coaCottonWoolRollF26CRepo.findFormById(id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "chemist_status", "chemist_saved_on",
						"chemist_saved_by", "chemist_saved_id", "chemist_submit_on", "chemist_submit_by",
						"chemist_submit_id", "chemist_sign", "qa_exe_status", "qa_exe_submit_on", "qa_exe_submit_by",
						"qa_exe_submit_id", "qa_exe_sign", "manager_status", "manager_submit_on", "manager_submit_by",
						"manager_submit_id", "manager_sign" };

				BeanUtils.copyProperties(abCotton, checkObj, IgnoreProps);

				if (!checkObj.getChemist_status().equals(AppConstantsQc.chemistSubmitted)
						|| checkObj.getQa_exe_status().equals(AppConstantsQc.QAExeReject)
						|| checkObj.getManager_status().equals(AppConstantsQc.QAReject)
						|| checkObj.getManager_status().equals(AppConstantsQc.QCRejected)) {

					if (role.equals("ROLE_CHEMIST")) {

						checkObj.setChemist_submit_by(userName);
						checkObj.setChemist_submit_on(date);
						checkObj.setChemist_submit_id(userId);
						checkObj.setChemist_status(AppConstantsQc.chemistSubmitted);
						checkObj.setChemist_sign(userName);
						checkObj.setQa_exe_status(AppConstantsQc.QAExeWaiting);
						checkObj.setManager_status("");

						coaCottonWoolRollF26CRepo.save(checkObj);

						// HISTORY

						CoaCottonWoolRollF26CHistory rejectionReportHistory = new CoaCottonWoolRollF26CHistory();

						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						String product = rejectionReportHistory.getProduct();
						String customer = rejectionReportHistory.getCustomer();

						int version = coaCottonWoolRollF26CHistoryRepo.getMaximumVersion(product, customer)
								.map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						coaCottonWoolRollF26CHistoryRepo.save(rejectionReportHistory);

//                    Mail logic

						try {

							qcMailFunction.sendEmailToQaExeF026C(checkObj);
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

				if (!role.equals("ROLE_CHEMIST")) {
					return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = abCotton;

				checkObj.setChemist_submit_by(userName);
				checkObj.setChemist_submit_on(date);
				checkObj.setChemist_submit_id(userId);
				checkObj.setChemist_status(AppConstantsQc.chemistSubmitted);
				checkObj.setChemist_sign(userName);
				checkObj.setQa_exe_status(AppConstantsQc.QAExeWaiting);
				checkObj.setManager_status("");

				coaCottonWoolRollF26CRepo.save(checkObj);

				CoaCottonWoolRollF26CHistory rejectionReportHistory = new CoaCottonWoolRollF26CHistory();

				BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				String product = rejectionReportHistory.getProduct();
				String customer = rejectionReportHistory.getCustomer();

				int version = coaCottonWoolRollF26CHistoryRepo.getMaximumVersion(product, customer)
						.map(temp -> temp + 1).orElse(1);

				rejectionReportHistory.setVersion(version);

				coaCottonWoolRollF26CHistoryRepo.save(rejectionReportHistory);

//				Mail logic

				try {

					qcMailFunction.sendEmailToQaExeF026C(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
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

	// PRINT

	public ResponseEntity<?> PrintApiF26C(String product, String customer) {
		try {

			List<CoaCottonWoolRollF26C> list = coaCottonWoolRollF26CRepo.PrintApiF26(product, customer);

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

	public ResponseEntity<?> getCotttonWoolRollF26C(String product, String customer) {
		try {

			List<CoaCottonWoolRollF26C> list = coaCottonWoolRollF26CRepo.GetAbCottonF26(product, customer);

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

	// APPROVE OR REJECT

	public ResponseEntity<?> ApproveOrRejectF26C(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		CoaCottonWoolRollF26C object = new CoaCottonWoolRollF26C();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = coaCottonWoolRollF26CRepo.findFormById(approvalResponse.getId());

			CoaCottonWoolRollF26CHistory objHistory = new CoaCottonWoolRollF26CHistory();

			String cheStatus = object.getChemist_status();
			String qaExeStatus = object.getQa_exe_status();
			String qcStatus = object.getManager_status();

			if (userRole.equalsIgnoreCase("QA_EXECUTIVE")) {

				object.setQa_exe_submit_on(date);
				object.setQa_exe_submit_by(userName);
				object.setQa_exe_submit_id(userId);
				object.setQa_exe_sign(userName);
				object.setManager_status(AppConstantsQc.ManWaiting);

				objHistory = coaCottonWoolRollF26CHistoryRepo.fetchLastSubmittedRecord(object.getProduct(),
						object.getCustomer());
				objHistory.setQa_exe_submit_on(date);
				objHistory.setQa_exe_submit_by(userName);
				objHistory.setQa_exe_submit_id(userId);
				objHistory.setQa_exe_sign(userName);
				objHistory.setManager_status(AppConstantsQc.ManWaiting);

				if (cheStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
						&& qaExeStatus.equalsIgnoreCase(AppConstantsQc.QAExeWaiting)) {

					if (approvalResponse.getStatus().equals("Approve")) {
						object.setQa_exe_status(AppConstantsQc.QAExeApprove);
						objHistory.setQa_exe_status(AppConstantsQc.QAExeApprove);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {
						object.setQa_exe_status(AppConstantsQc.QAExeReject);
						object.setReason(approvalResponse.getRemarks());
						objHistory.setQa_exe_status(AppConstantsQc.QAExeReject);
						object.setReason(approvalResponse.getRemarks());
					}

					coaCottonWoolRollF26CRepo.save(object);

					coaCottonWoolRollF26CHistoryRepo.save(objHistory);

					try {

						if (object.getQa_exe_status() != null) {

							if (object.getQa_exe_status().equals("QA_EXE_APPROVED"))

							{
								qcMailFunction.sendEmailToManagerF26C(object);
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

			else if (userRole.equalsIgnoreCase("QC_MANAGER") || userRole.equalsIgnoreCase("QA_MANAGER")) {

				if (qaExeStatus.equalsIgnoreCase(AppConstantsQc.QAExeApprove)
						&& qcStatus.equalsIgnoreCase(AppConstantsQc.ManWaiting)) {

					object.setManager_submit_on(date);
					object.setManager_submit_by(userName);
					object.setManager_submit_id(userId);
					object.setManager_sign(userName);

					objHistory = coaCottonWoolRollF26CHistoryRepo.fetchLastSubmittedRecord(object.getProduct(),
							object.getCustomer());

					objHistory.setManager_submit_on(date);
					objHistory.setManager_submit_by(userName);
					objHistory.setManager_submit_id(userId);
					objHistory.setManager_sign(userName);

					if (approvalResponse.getStatus().equals("Approve")) {

						if (userRole.equalsIgnoreCase("QC_MANAGER")) {
							object.setManager_status(AppConstantsQc.QCApprove);
							objHistory.setManager_status(AppConstantsQc.QCApprove);

						} else if (userRole.equalsIgnoreCase("QA_MANAGER")) {
							object.setManager_status(AppConstantsQc.QAApprove);
							objHistory.setManager_status(AppConstantsQc.QAApprove);
						}
					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						if (userRole.equalsIgnoreCase("QC_MANAGER")) {
							object.setManager_status(AppConstantsQc.QCRejected);
							object.setReason(approvalResponse.getRemarks());

							objHistory.setManager_status(AppConstantsQc.QCRejected);
							objHistory.setReason(approvalResponse.getRemarks());

						} else if (userRole.equalsIgnoreCase("QA_MANAGER")) {
							object.setManager_status(AppConstantsQc.QAReject);
							object.setReason(approvalResponse.getRemarks());
							objHistory.setManager_status(AppConstantsQc.QAReject);
							objHistory.setReason(approvalResponse.getRemarks());
						}
					}

					coaCottonWoolRollF26CRepo.save(object);

					coaCottonWoolRollF26CHistoryRepo.save(objHistory);

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

	// SUMMARY

	public ResponseEntity<?> F26CottonWoolRollSummary(HttpServletRequest http) {

		List<CoaCottonWoolRollF26C> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_CHEMIST")) {

				details = coaCottonWoolRollF26CRepo.chemistSummary();
			}

			else if (userRole.equalsIgnoreCase("QA_EXECUTIVE") || userRole.equalsIgnoreCase("QC_MANAGER")
					|| userRole.equalsIgnoreCase("QA_MANAGER")) {
				details = coaCottonWoolRollF26CRepo.exeManagerSummary();
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

//	=============================  F026-D COTTON WOOL PLEAT ============================

	public ResponseEntity<?> SaveCottonWoolPleatF26D(CoaCottonWoolPleatF26D abCotton, HttpServletRequest http) {

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		CoaCottonWoolPleatF26D listObj = null;

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getId() != null) {

				Long id = abCotton.getId();

				listObj = coaCottonWoolPleatF26DRepo.findFormById(id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "chemist_status", "chemist_saved_on",
						"chemist_saved_by", "chemist_saved_id", "chemist_submit_on", "chemist_submit_by",
						"chemist_submit_id", "chemist_sign", "qa_exe_status", "qa_exe_submit_on", "qa_exe_submit_by",
						"qa_exe_submit_id", "qa_exe_sign", "manager_status", "manager_submit_on", "manager_submit_by",
						"manager_submit_id", "manager_sign" };

				BeanUtils.copyProperties(abCotton, listObj, IgnoreProps);

				if (role.equals("ROLE_CHEMIST")) {

					listObj.setChemist_saved_by(userName);
					listObj.setChemist_saved_on(date);
					listObj.setChemist_saved_id(userId);
					listObj.setChemist_status(AppConstantsQc.chemistSave);

					listObj.setQa_exe_status("");
					listObj.setManager_status("");

					coaCottonWoolPleatF26DRepo.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				if (role.equals("ROLE_CHEMIST")) {

					listObj = abCotton;

					listObj.setChemist_saved_by(userName);
					listObj.setChemist_saved_on(date);
					listObj.setChemist_saved_id(userId);
					listObj.setChemist_status(AppConstantsQc.chemistSave);

					listObj.setQa_exe_status("");
					listObj.setManager_status("");

					coaCottonWoolPleatF26DRepo.save(listObj);

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

	public ResponseEntity<?> SubmitCottonWoolPleatF26D(CoaCottonWoolPleatF26D abCotton, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = abCotton.getId();

		CoaCottonWoolPleatF26D checkObj = new CoaCottonWoolPleatF26D();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getFormatNo() == null)
				value = "formatNo";
			if (abCotton.getRefSopNo() == null)
				value = "SopNumber";
			if (abCotton.getRevisionNo() == null)
				value = "revisionNo";
			if (abCotton.getFormatName() == null)
				value = "formatName";
			if (abCotton.getDate() == null)
				value = "date";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = coaCottonWoolPleatF26DRepo.findFormById(id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "chemist_status", "chemist_saved_on",
						"chemist_saved_by", "chemist_saved_id", "chemist_submit_on", "chemist_submit_by",
						"chemist_submit_id", "chemist_sign", "qa_exe_status", "qa_exe_submit_on", "qa_exe_submit_by",
						"qa_exe_submit_id", "qa_exe_sign", "manager_status", "manager_submit_on", "manager_submit_by",
						"manager_submit_id", "manager_sign" };

				BeanUtils.copyProperties(abCotton, checkObj, IgnoreProps);

				if (!checkObj.getChemist_status().equals(AppConstantsQc.chemistSubmitted)
						|| checkObj.getQa_exe_status().equals(AppConstantsQc.QAExeReject)
						|| checkObj.getManager_status().equals(AppConstantsQc.QAReject)
						|| checkObj.getManager_status().equals(AppConstantsQc.QCRejected)) {

					if (role.equals("ROLE_CHEMIST")) {

						checkObj.setChemist_submit_by(userName);
						checkObj.setChemist_submit_on(date);
						checkObj.setChemist_submit_id(userId);
						checkObj.setChemist_status(AppConstantsQc.chemistSubmitted);
						checkObj.setChemist_sign(userName);
						checkObj.setQa_exe_status(AppConstantsQc.QAExeWaiting);
						checkObj.setManager_status("");

						coaCottonWoolPleatF26DRepo.save(checkObj);

						// HISTORY

						CoaCottonWoolPleatF26DHistory rejectionReportHistory = new CoaCottonWoolPleatF26DHistory();

						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						String product = rejectionReportHistory.getProduct();
						String customer = rejectionReportHistory.getCustomer();

						int version = coaCottonWoolPleatF26DHistoryRepo.getMaximumVersion(product, customer)
								.map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						coaCottonWoolPleatF26DHistoryRepo.save(rejectionReportHistory);

//                    Mail logic

						try {

							qcMailFunction.sendEmailToQaExeF026D(checkObj);

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

				if (!role.equals("ROLE_CHEMIST")) {
					return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = abCotton;

				checkObj.setChemist_submit_by(userName);
				checkObj.setChemist_submit_on(date);
				checkObj.setChemist_submit_id(userId);
				checkObj.setChemist_status(AppConstantsQc.chemistSubmitted);
				checkObj.setChemist_sign(userName);
				checkObj.setQa_exe_status(AppConstantsQc.QAExeWaiting);
				checkObj.setManager_status("");

				coaCottonWoolPleatF26DRepo.save(checkObj);

				CoaCottonWoolPleatF26DHistory rejectionReportHistory = new CoaCottonWoolPleatF26DHistory();

				BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				String product = rejectionReportHistory.getProduct();
				String customer = rejectionReportHistory.getCustomer();

				int version = coaCottonWoolPleatF26DHistoryRepo.getMaximumVersion(product, customer)
						.map(temp -> temp + 1).orElse(1);

				rejectionReportHistory.setVersion(version);

				coaCottonWoolPleatF26DHistoryRepo.save(rejectionReportHistory);

//				Mail logic

				try {

					qcMailFunction.sendEmailToQaExeF026D(checkObj);

				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
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

	// PRINT

	public ResponseEntity<?> PrintApiF26D(String product, String customer) {
		try {

			List<CoaCottonWoolPleatF26D> list = coaCottonWoolPleatF26DRepo.PrintApiF26(product, customer);

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

	public ResponseEntity<?> getCotttonWoolPleatF26D(String product, String customer) {
		try {

			List<CoaCottonWoolPleatF26D> list = coaCottonWoolPleatF26DRepo.GetAbCottonF26(product, customer);

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

	// APPROVE OR REJECT

	public ResponseEntity<?> ApproveOrRejectF26D(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		CoaCottonWoolPleatF26D object = new CoaCottonWoolPleatF26D();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = coaCottonWoolPleatF26DRepo.findFormById(approvalResponse.getId());

			CoaCottonWoolPleatF26DHistory objHistory = new CoaCottonWoolPleatF26DHistory();

			String cheStatus = object.getChemist_status();
			String qaExeStatus = object.getQa_exe_status();
			String qcStatus = object.getManager_status();

			if (userRole.equalsIgnoreCase("QA_EXECUTIVE")) {

				object.setQa_exe_submit_on(date);
				object.setQa_exe_submit_by(userName);
				object.setQa_exe_submit_id(userId);
				object.setQa_exe_sign(userName);
				object.setManager_status(AppConstantsQc.ManWaiting);

				objHistory = coaCottonWoolPleatF26DHistoryRepo.fetchLastSubmittedRecord(object.getProduct(),
						object.getCustomer());
				objHistory.setQa_exe_submit_on(date);
				objHistory.setQa_exe_submit_by(userName);
				objHistory.setQa_exe_submit_id(userId);
				objHistory.setQa_exe_sign(userName);
				objHistory.setManager_status(AppConstantsQc.ManWaiting);

				if (cheStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
						&& qaExeStatus.equalsIgnoreCase(AppConstantsQc.QAExeWaiting)) {

					if (approvalResponse.getStatus().equals("Approve")) {
						object.setQa_exe_status(AppConstantsQc.QAExeApprove);
						objHistory.setQa_exe_status(AppConstantsQc.QAExeApprove);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {
						object.setQa_exe_status(AppConstantsQc.QAExeReject);
						object.setReason(approvalResponse.getRemarks());
						objHistory.setQa_exe_status(AppConstantsQc.QAExeReject);
						object.setReason(approvalResponse.getRemarks());
					}

					coaCottonWoolPleatF26DRepo.save(object);

					coaCottonWoolPleatF26DHistoryRepo.save(objHistory);

					try {

						if (object.getQa_exe_status() != null) {

							if (object.getQa_exe_status().equals("QA_EXE_APPROVED"))

							{
								qcMailFunction.sendEmailToManagerF26D(object);
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

			else if (userRole.equalsIgnoreCase("QC_MANAGER") || userRole.equalsIgnoreCase("QA_MANAGER")) {

				if (qaExeStatus.equalsIgnoreCase(AppConstantsQc.QAExeApprove)
						&& qcStatus.equalsIgnoreCase(AppConstantsQc.ManWaiting)) {

					object.setManager_submit_on(date);
					object.setManager_submit_by(userName);
					object.setManager_submit_id(userId);
					object.setManager_sign(userName);

					objHistory = coaCottonWoolPleatF26DHistoryRepo.fetchLastSubmittedRecord(object.getProduct(),
							object.getCustomer());

					objHistory.setManager_submit_on(date);
					objHistory.setManager_submit_by(userName);
					objHistory.setManager_submit_id(userId);
					objHistory.setManager_sign(userName);

					if (approvalResponse.getStatus().equals("Approve")) {

						if (userRole.equalsIgnoreCase("QC_MANAGER")) {
							object.setManager_status(AppConstantsQc.QCApprove);
							objHistory.setManager_status(AppConstantsQc.QCApprove);

						} else if (userRole.equalsIgnoreCase("QA_MANAGER")) {
							object.setManager_status(AppConstantsQc.QAApprove);
							objHistory.setManager_status(AppConstantsQc.QAApprove);
						}
					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						if (userRole.equalsIgnoreCase("QC_MANAGER")) {
							object.setManager_status(AppConstantsQc.QCRejected);
							object.setReason(approvalResponse.getRemarks());

							objHistory.setManager_status(AppConstantsQc.QCRejected);
							objHistory.setReason(approvalResponse.getRemarks());

						} else if (userRole.equalsIgnoreCase("QA_MANAGER")) {
							object.setManager_status(AppConstantsQc.QAReject);
							object.setReason(approvalResponse.getRemarks());
							objHistory.setManager_status(AppConstantsQc.QAReject);
							objHistory.setReason(approvalResponse.getRemarks());
						}
					}

					coaCottonWoolPleatF26DRepo.save(object);

					coaCottonWoolPleatF26DHistoryRepo.save(objHistory);

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

	// SUMMARY

	public ResponseEntity<?> F26DCottonWoolPleatSummary(HttpServletRequest http) {

		List<CoaCottonWoolPleatF26D> details = null;

		try {

			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_CHEMIST")) {

				details = coaCottonWoolPleatF26DRepo.chemistSummary();
			}

			else if (userRole.equalsIgnoreCase("QA_EXECUTIVE") || userRole.equalsIgnoreCase("QC_MANAGER")
					|| userRole.equalsIgnoreCase("QA_MANAGER")) {
				details = coaCottonWoolPleatF26DRepo.exeManagerSummary();
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

//	=============================  F026-E COTTON ROOL GOODS ============================

	public ResponseEntity<?> SaveCottonRollGoodsF26E(CoaCottonRollGoodsF26E abCotton, HttpServletRequest http) {

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		CoaCottonRollGoodsF26E listObj = null;

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getId() != null) {

				Long id = abCotton.getId();

				listObj = coaCottonRollGoodsF26ERepo.findFormById(id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "chemist_status", "chemist_saved_on",
						"chemist_saved_by", "chemist_saved_id", "chemist_submit_on", "chemist_submit_by",
						"chemist_submit_id", "chemist_sign", "qa_exe_status", "qa_exe_submit_on", "qa_exe_submit_by",
						"qa_exe_submit_id", "qa_exe_sign", "manager_status", "manager_submit_on", "manager_submit_by",
						"manager_submit_id", "manager_sign" };

				BeanUtils.copyProperties(abCotton, listObj, IgnoreProps);

				if (role.equals("ROLE_CHEMIST")) {

					listObj.setChemist_saved_by(userName);
					listObj.setChemist_saved_on(date);
					listObj.setChemist_saved_id(userId);
					listObj.setChemist_status(AppConstantsQc.chemistSave);

					listObj.setQa_exe_status("");
					listObj.setManager_status("");

					coaCottonRollGoodsF26ERepo.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				if (role.equals("ROLE_CHEMIST")) {

					listObj = abCotton;

					listObj.setChemist_saved_by(userName);
					listObj.setChemist_saved_on(date);
					listObj.setChemist_saved_id(userId);
					listObj.setChemist_status(AppConstantsQc.chemistSave);

					listObj.setQa_exe_status("");
					listObj.setManager_status("");

					coaCottonRollGoodsF26ERepo.save(listObj);

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

	public ResponseEntity<?> SubmitCottonRollGoodsF26E(CoaCottonRollGoodsF26E abCotton, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = abCotton.getId();

		CoaCottonRollGoodsF26E checkObj = new CoaCottonRollGoodsF26E();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getFormatNo() == null)
				value = "formatNo";
			if (abCotton.getRefSopNo() == null)
				value = "SopNumber";
			if (abCotton.getRevisionNo() == null)
				value = "revisionNo";
			if (abCotton.getFormatName() == null)
				value = "formatName";
			if (abCotton.getDate() == null)
				value = "date";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = coaCottonRollGoodsF26ERepo.findFormById(id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "chemist_status", "chemist_saved_on",
						"chemist_saved_by", "chemist_saved_id", "chemist_submit_on", "chemist_submit_by",
						"chemist_submit_id", "chemist_sign", "qa_exe_status", "qa_exe_submit_on", "qa_exe_submit_by",
						"qa_exe_submit_id", "qa_exe_sign", "manager_status", "manager_submit_on", "manager_submit_by",
						"manager_submit_id", "manager_sign" };

				BeanUtils.copyProperties(abCotton, checkObj, IgnoreProps);

				if (!checkObj.getChemist_status().equals(AppConstantsQc.chemistSubmitted)
						|| checkObj.getQa_exe_status().equals(AppConstantsQc.QAExeReject)
						|| checkObj.getManager_status().equals(AppConstantsQc.QAReject)
						|| checkObj.getManager_status().equals(AppConstantsQc.QCRejected)) {

					if (role.equals("ROLE_CHEMIST")) {

						checkObj.setChemist_submit_by(userName);
						checkObj.setChemist_submit_on(date);
						checkObj.setChemist_submit_id(userId);
						checkObj.setChemist_status(AppConstantsQc.chemistSubmitted);
						checkObj.setChemist_sign(userName);
						checkObj.setQa_exe_status(AppConstantsQc.QAExeWaiting);
						checkObj.setManager_status("");

						coaCottonRollGoodsF26ERepo.save(checkObj);

						// HISTORY

						CoaCottonRollGoodsF26EHistory rejectionReportHistory = new CoaCottonRollGoodsF26EHistory();

						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						String product = rejectionReportHistory.getProduct();
						String customer = rejectionReportHistory.getCustomer();

						int version = coaCottonRollGoodsF26EHistoryRepo.getMaximumVersion(product, customer)
								.map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						coaCottonRollGoodsF26EHistoryRepo.save(rejectionReportHistory);

//                    Mail logic

						try {

							qcMailFunction.sendEmailToQaExeF026E(checkObj);

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

				if (!role.equals("ROLE_CHEMIST")) {
					return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = abCotton;

				checkObj.setChemist_submit_by(userName);
				checkObj.setChemist_submit_on(date);
				checkObj.setChemist_submit_id(userId);
				checkObj.setChemist_status(AppConstantsQc.chemistSubmitted);
				checkObj.setChemist_sign(userName);
				checkObj.setQa_exe_status(AppConstantsQc.QAExeWaiting);
				checkObj.setManager_status("");

				coaCottonRollGoodsF26ERepo.save(checkObj);

				CoaCottonRollGoodsF26EHistory rejectionReportHistory = new CoaCottonRollGoodsF26EHistory();

				BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				String product = rejectionReportHistory.getProduct();
				String customer = rejectionReportHistory.getCustomer();

				int version = coaCottonRollGoodsF26EHistoryRepo.getMaximumVersion(product, customer)
						.map(temp -> temp + 1).orElse(1);

				rejectionReportHistory.setVersion(version);

				coaCottonRollGoodsF26EHistoryRepo.save(rejectionReportHistory);

//				Mail logic

				try {

					qcMailFunction.sendEmailToQaExeF026E(checkObj);

				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
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

	// PRINT

	public ResponseEntity<?> PrintApiF26E(String product, String customer) {
		try {

			List<CoaCottonRollGoodsF26E> list = coaCottonRollGoodsF26ERepo.PrintApiF26(product, customer);

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

	public ResponseEntity<?> getCotttonRoolGoodsF26E(String product, String customer) {
		try {

			List<CoaCottonRollGoodsF26E> list = coaCottonRollGoodsF26ERepo.GetAbCottonF26(product, customer);

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

	// APPROVE OR REJECT

	public ResponseEntity<?> ApproveOrRejectF26E(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		CoaCottonRollGoodsF26E object = new CoaCottonRollGoodsF26E();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = coaCottonRollGoodsF26ERepo.findFormById(approvalResponse.getId());

			CoaCottonRollGoodsF26EHistory objHistory = new CoaCottonRollGoodsF26EHistory();

			String cheStatus = object.getChemist_status();
			String qaExeStatus = object.getQa_exe_status();
			String qcStatus = object.getManager_status();

			if (userRole.equalsIgnoreCase("QA_EXECUTIVE")) {

				object.setQa_exe_submit_on(date);
				object.setQa_exe_submit_by(userName);
				object.setQa_exe_submit_id(userId);
				object.setQa_exe_sign(userName);
				object.setManager_status(AppConstantsQc.ManWaiting);

				objHistory = coaCottonRollGoodsF26EHistoryRepo.fetchLastSubmittedRecord(object.getProduct(),
						object.getCustomer());
				objHistory.setQa_exe_submit_on(date);
				objHistory.setQa_exe_submit_by(userName);
				objHistory.setQa_exe_submit_id(userId);
				objHistory.setQa_exe_sign(userName);
				objHistory.setManager_status(AppConstantsQc.ManWaiting);

				if (cheStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
						&& qaExeStatus.equalsIgnoreCase(AppConstantsQc.QAExeWaiting)) {

					if (approvalResponse.getStatus().equals("Approve")) {
						object.setQa_exe_status(AppConstantsQc.QAExeApprove);
						objHistory.setQa_exe_status(AppConstantsQc.QAExeApprove);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {
						object.setQa_exe_status(AppConstantsQc.QAExeReject);
						object.setReason(approvalResponse.getRemarks());
						objHistory.setQa_exe_status(AppConstantsQc.QAExeReject);
						object.setReason(approvalResponse.getRemarks());
					}

					coaCottonRollGoodsF26ERepo.save(object);

					coaCottonRollGoodsF26EHistoryRepo.save(objHistory);

					try {

						if (object.getQa_exe_status() != null) {

							if (object.getQa_exe_status().equals("QA_EXE_APPROVED"))

							{
								qcMailFunction.sendEmailToManagerF26E(object);
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

			else if (userRole.equalsIgnoreCase("QC_MANAGER") || userRole.equalsIgnoreCase("QA_MANAGER")) {

				if (qaExeStatus.equalsIgnoreCase(AppConstantsQc.QAExeApprove)
						&& qcStatus.equalsIgnoreCase(AppConstantsQc.ManWaiting)) {

					object.setManager_submit_on(date);
					object.setManager_submit_by(userName);
					object.setManager_submit_id(userId);
					object.setManager_sign(userName);

					objHistory = coaCottonRollGoodsF26EHistoryRepo.fetchLastSubmittedRecord(object.getProduct(),
							object.getCustomer());

					objHistory.setManager_submit_on(date);
					objHistory.setManager_submit_by(userName);
					objHistory.setManager_submit_id(userId);
					objHistory.setManager_sign(userName);

					if (approvalResponse.getStatus().equals("Approve")) {

						if (userRole.equalsIgnoreCase("QC_MANAGER")) {
							object.setManager_status(AppConstantsQc.QCApprove);
							objHistory.setManager_status(AppConstantsQc.QCApprove);

						} else if (userRole.equalsIgnoreCase("QA_MANAGER")) {
							object.setManager_status(AppConstantsQc.QAApprove);
							objHistory.setManager_status(AppConstantsQc.QAApprove);
						}
					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						if (userRole.equalsIgnoreCase("QC_MANAGER")) {
							object.setManager_status(AppConstantsQc.QCRejected);
							object.setReason(approvalResponse.getRemarks());

							objHistory.setManager_status(AppConstantsQc.QCRejected);
							objHistory.setReason(approvalResponse.getRemarks());

						} else if (userRole.equalsIgnoreCase("QA_MANAGER")) {
							object.setManager_status(AppConstantsQc.QAReject);
							object.setReason(approvalResponse.getRemarks());
							objHistory.setManager_status(AppConstantsQc.QAReject);
							objHistory.setReason(approvalResponse.getRemarks());
						}
					}

					coaCottonRollGoodsF26ERepo.save(object);

					coaCottonRollGoodsF26EHistoryRepo.save(objHistory);

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

	// SUMMARY

	public ResponseEntity<?> F26ECottonRoolGoodsSummary(HttpServletRequest http) {

		List<CoaCottonRollGoodsF26E> details = null;

		try {

			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_CHEMIST")) {

				details = coaCottonRollGoodsF26ERepo.chemistSummary();
			}

			else if (userRole.equalsIgnoreCase("QA_EXECUTIVE") || userRole.equalsIgnoreCase("QC_MANAGER")
					|| userRole.equalsIgnoreCase("QA_MANAGER")) {
				details = coaCottonRollGoodsF26ERepo.exeManagerSummary();
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

//	=============================  F026-F INFUSED COTTON PADS ============================

	public ResponseEntity<?> SaveInfusedCottonPadsF26F(CoaInfusedCottonPadsF26F abCotton, HttpServletRequest http) {

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		CoaInfusedCottonPadsF26F listObj = null;

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getId() != null) {

				Long id = abCotton.getId();

				listObj = coaInfusedCottonPadsF26FRepo.findFormById(id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "chemist_status", "chemist_saved_on",
						"chemist_saved_by", "chemist_saved_id", "chemist_submit_on", "chemist_submit_by",
						"chemist_submit_id", "chemist_sign", "qa_exe_status", "qa_exe_submit_on", "qa_exe_submit_by",
						"qa_exe_submit_id", "qa_exe_sign", "manager_status", "manager_submit_on", "manager_submit_by",
						"manager_submit_id", "manager_sign" };

				BeanUtils.copyProperties(abCotton, listObj, IgnoreProps);

				if (role.equals("ROLE_CHEMIST")) {

					listObj.setChemist_saved_by(userName);
					listObj.setChemist_saved_on(date);
					listObj.setChemist_saved_id(userId);
					listObj.setChemist_status(AppConstantsQc.chemistSave);

					listObj.setQa_exe_status("");
					listObj.setManager_status("");

					coaInfusedCottonPadsF26FRepo.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				if (role.equals("ROLE_CHEMIST")) {

					listObj = abCotton;

					listObj.setChemist_saved_by(userName);
					listObj.setChemist_saved_on(date);
					listObj.setChemist_saved_id(userId);
					listObj.setChemist_status(AppConstantsQc.chemistSave);

					listObj.setQa_exe_status("");
					listObj.setManager_status("");

					coaInfusedCottonPadsF26FRepo.save(listObj);

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

	public ResponseEntity<?> SubmitInfusedCottonPadsF26F(CoaInfusedCottonPadsF26F abCotton, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = abCotton.getId();

		CoaInfusedCottonPadsF26F checkObj = new CoaInfusedCottonPadsF26F();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getFormatNo() == null)
				value = "formatNo";
			if (abCotton.getRefSopNo() == null)
				value = "SopNumber";
			if (abCotton.getRevisionNo() == null)
				value = "revisionNo";
			if (abCotton.getFormatName() == null)
				value = "formatName";
			if (abCotton.getDate() == null)
				value = "date";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = coaInfusedCottonPadsF26FRepo.findFormById(id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "chemist_status", "chemist_saved_on",
						"chemist_saved_by", "chemist_saved_id", "chemist_submit_on", "chemist_submit_by",
						"chemist_submit_id", "chemist_sign", "qa_exe_status", "qa_exe_submit_on", "qa_exe_submit_by",
						"qa_exe_submit_id", "qa_exe_sign", "manager_status", "manager_submit_on", "manager_submit_by",
						"manager_submit_id", "manager_sign" };

				BeanUtils.copyProperties(abCotton, checkObj, IgnoreProps);

				if (!checkObj.getChemist_status().equals(AppConstantsQc.chemistSubmitted)
						|| checkObj.getQa_exe_status().equals(AppConstantsQc.QAExeReject)
						|| checkObj.getManager_status().equals(AppConstantsQc.QAReject)
						|| checkObj.getManager_status().equals(AppConstantsQc.QCRejected)) {

					if (role.equals("ROLE_CHEMIST")) {

						checkObj.setChemist_submit_by(userName);
						checkObj.setChemist_submit_on(date);
						checkObj.setChemist_submit_id(userId);
						checkObj.setChemist_status(AppConstantsQc.chemistSubmitted);
						checkObj.setChemist_sign(userName);
						checkObj.setQa_exe_status(AppConstantsQc.QAExeWaiting);
						checkObj.setManager_status("");

						coaInfusedCottonPadsF26FRepo.save(checkObj);

						// HISTORY

						CoaInfusedCottonPadsF26FHistory rejectionReportHistory = new CoaInfusedCottonPadsF26FHistory();

						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						String product = rejectionReportHistory.getProduct();
						String customer = rejectionReportHistory.getCustomer();

						int version = coaInfusedCottonPadsF26FHistoryRepo.getMaximumVersion(product, customer)
								.map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						coaInfusedCottonPadsF26FHistoryRepo.save(rejectionReportHistory);

//                    Mail logic

						try {

							qcMailFunction.sendEmailToQaExeF026F(checkObj);

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

				if (!role.equals("ROLE_CHEMIST")) {
					return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = abCotton;

				checkObj.setChemist_submit_by(userName);
				checkObj.setChemist_submit_on(date);
				checkObj.setChemist_submit_id(userId);
				checkObj.setChemist_status(AppConstantsQc.chemistSubmitted);
				checkObj.setChemist_sign(userName);
				checkObj.setQa_exe_status(AppConstantsQc.QAExeWaiting);
				checkObj.setManager_status("");

				coaInfusedCottonPadsF26FRepo.save(checkObj);

				CoaInfusedCottonPadsF26FHistory rejectionReportHistory = new CoaInfusedCottonPadsF26FHistory();

				BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				String product = rejectionReportHistory.getProduct();
				String customer = rejectionReportHistory.getCustomer();

				int version = coaInfusedCottonPadsF26FHistoryRepo.getMaximumVersion(product, customer)
						.map(temp -> temp + 1).orElse(1);

				rejectionReportHistory.setVersion(version);

				coaInfusedCottonPadsF26FHistoryRepo.save(rejectionReportHistory);

//				Mail logic

				try {

					qcMailFunction.sendEmailToQaExeF026F(checkObj);

				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
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

	// PRINT

	public ResponseEntity<?> PrintApiF26F(String product, String customer) {
		try {

			List<CoaInfusedCottonPadsF26F> list = coaInfusedCottonPadsF26FRepo.PrintApiF26(product, customer);

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

	public ResponseEntity<?> getInfusedCottonPadsF26F(String product, String customer) {
		try {

			List<CoaInfusedCottonPadsF26F> list = coaInfusedCottonPadsF26FRepo.GetAbCottonF26(product, customer);

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

	// APPROVE OR REJECT

	public ResponseEntity<?> ApproveOrRejectF26F(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		CoaInfusedCottonPadsF26F object = new CoaInfusedCottonPadsF26F();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = coaInfusedCottonPadsF26FRepo.findFormById(approvalResponse.getId());

			CoaInfusedCottonPadsF26FHistory objHistory = new CoaInfusedCottonPadsF26FHistory();

			String cheStatus = object.getChemist_status();
			String qaExeStatus = object.getQa_exe_status();
			String qcStatus = object.getManager_status();

			if (userRole.equalsIgnoreCase("QA_EXECUTIVE")) {

				object.setQa_exe_submit_on(date);
				object.setQa_exe_submit_by(userName);
				object.setQa_exe_submit_id(userId);
				object.setQa_exe_sign(userName);
				object.setManager_status(AppConstantsQc.ManWaiting);

				objHistory = coaInfusedCottonPadsF26FHistoryRepo.fetchLastSubmittedRecord(object.getProduct(),
						object.getCustomer());
				objHistory.setQa_exe_submit_on(date);
				objHistory.setQa_exe_submit_by(userName);
				objHistory.setQa_exe_submit_id(userId);
				objHistory.setQa_exe_sign(userName);
				objHistory.setManager_status(AppConstantsQc.ManWaiting);

				if (cheStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
						&& qaExeStatus.equalsIgnoreCase(AppConstantsQc.QAExeWaiting)) {

					if (approvalResponse.getStatus().equals("Approve")) {
						object.setQa_exe_status(AppConstantsQc.QAExeApprove);
						objHistory.setQa_exe_status(AppConstantsQc.QAExeApprove);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {
						object.setQa_exe_status(AppConstantsQc.QAExeReject);
						object.setReason(approvalResponse.getRemarks());
						objHistory.setQa_exe_status(AppConstantsQc.QAExeReject);
						object.setReason(approvalResponse.getRemarks());
					}

					coaInfusedCottonPadsF26FRepo.save(object);

					coaInfusedCottonPadsF26FHistoryRepo.save(objHistory);

					try {

						if (approvalResponse.getStatus().equals("Approve")) {
							qcMailFunction.sendEmailToManagerF26F(object);
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

			else if (userRole.equalsIgnoreCase("QC_MANAGER") || userRole.equalsIgnoreCase("QA_MANAGER")) {

				if (qaExeStatus.equalsIgnoreCase(AppConstantsQc.QAExeApprove)
						&& qcStatus.equalsIgnoreCase(AppConstantsQc.ManWaiting)) {

					object.setManager_submit_on(date);
					object.setManager_submit_by(userName);
					object.setManager_submit_id(userId);
					object.setManager_sign(userName);

					objHistory = coaInfusedCottonPadsF26FHistoryRepo.fetchLastSubmittedRecord(object.getProduct(),
							object.getCustomer());

					objHistory.setManager_submit_on(date);
					objHistory.setManager_submit_by(userName);
					objHistory.setManager_submit_id(userId);
					objHistory.setManager_sign(userName);

					if (approvalResponse.getStatus().equals("Approve")) {

						if (userRole.equalsIgnoreCase("QC_MANAGER")) {
							object.setManager_status(AppConstantsQc.QCApprove);
							objHistory.setManager_status(AppConstantsQc.QCApprove);

						} else if (userRole.equalsIgnoreCase("QA_MANAGER")) {
							object.setManager_status(AppConstantsQc.QAApprove);
							objHistory.setManager_status(AppConstantsQc.QAApprove);
						}
					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						if (userRole.equalsIgnoreCase("QC_MANAGER")) {
							object.setManager_status(AppConstantsQc.QCRejected);
							object.setReason(approvalResponse.getRemarks());

							objHistory.setManager_status(AppConstantsQc.QCRejected);
							objHistory.setReason(approvalResponse.getRemarks());

						} else if (userRole.equalsIgnoreCase("QA_MANAGER")) {
							object.setManager_status(AppConstantsQc.QAReject);
							object.setReason(approvalResponse.getRemarks());
							objHistory.setManager_status(AppConstantsQc.QAReject);
							objHistory.setReason(approvalResponse.getRemarks());
						}
					}

					coaInfusedCottonPadsF26FRepo.save(object);

					coaInfusedCottonPadsF26FHistoryRepo.save(objHistory);

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

	// SUMMARY

	public ResponseEntity<?> F26FInfusedCottonPadsSummary(HttpServletRequest http) {

		List<CoaInfusedCottonPadsF26F> details = null;

		try {

			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_CHEMIST")) {

				details = coaInfusedCottonPadsF26FRepo.chemistSummary();
			}

			else if (userRole.equalsIgnoreCase("QA_EXECUTIVE") || userRole.equalsIgnoreCase("QC_MANAGER")
					|| userRole.equalsIgnoreCase("QA_MANAGER")) {
				details = coaInfusedCottonPadsF26FRepo.exeManagerSummary();
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

//	=============================  F026-G MOISTURES ============================

	public ResponseEntity<?> SaveMoisturesF26G(CoaMoistureF26G abCotton, HttpServletRequest http) {

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		CoaMoistureF26G listObj = null;

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getId() != null) {

				Long id = abCotton.getId();

				listObj = coaMoistureF26GRepo.findFormById(id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "chemist_status", "chemist_saved_on",
						"chemist_saved_by", "chemist_saved_id", "chemist_submit_on", "chemist_submit_by",
						"chemist_submit_id", "chemist_sign", "qa_exe_status", "qa_exe_submit_on", "qa_exe_submit_by",
						"qa_exe_submit_id", "qa_exe_sign", "manager_status", "manager_submit_on", "manager_submit_by",
						"manager_submit_id", "manager_sign" };

				BeanUtils.copyProperties(abCotton, listObj, IgnoreProps);

				if (role.equals("ROLE_CHEMIST")) {

					listObj.setChemist_saved_by(userName);
					listObj.setChemist_saved_on(date);
					listObj.setChemist_saved_id(userId);
					listObj.setChemist_status(AppConstantsQc.chemistSave);

					listObj.setQa_exe_status("");
					listObj.setManager_status("");

					CoaMoistureF26G ss = coaMoistureF26GRepo.save(listObj);

					if (ss.getDetails() != null) {

						for (CoaMoistureF26GLines lines : ss.getDetails()) {

							lines.setId(ss.getId());
							coaMoistureF26GLineRepo.save(lines);
						}
					}

					coaMoistureF26GRepo.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				if (role.equals("ROLE_CHEMIST")) {

					listObj = abCotton;

					listObj.setChemist_saved_by(userName);
					listObj.setChemist_saved_on(date);
					listObj.setChemist_saved_id(userId);
					listObj.setChemist_status(AppConstantsQc.chemistSave);

					listObj.setQa_exe_status("");
					listObj.setManager_status("");

					CoaMoistureF26G ss = coaMoistureF26GRepo.save(listObj);

					if (ss.getDetails() != null) {

						for (CoaMoistureF26GLines lines : ss.getDetails()) {

							lines.setId(ss.getId());
							coaMoistureF26GLineRepo.save(lines);
						}
					}

					coaMoistureF26GRepo.save(listObj);

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

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	// SUBMIT

	public ResponseEntity<?> SubmitMoisturesF26G(CoaMoistureF26G abCotton, HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = abCotton.getId();

		CoaMoistureF26G checkObj = new CoaMoistureF26G();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getFormatNo() == null)
				value = "formatNo";
			if (abCotton.getRefSopNo() == null)
				value = "SopNumber";
			if (abCotton.getRevisionNo() == null)
				value = "revisionNo";
			if (abCotton.getFormatName() == null)
				value = "formatName";
			if (abCotton.getDate() == null)
				value = "date";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = coaMoistureF26GRepo.findFormById(id);

				String[] ignoreHistory = { "his_id", "details" };

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "chemist_status", "chemist_saved_on",
						"chemist_saved_by", "chemist_saved_id", "chemist_submit_on", "chemist_submit_by",
						"chemist_submit_id", "chemist_sign", "qa_exe_status", "qa_exe_submit_on", "qa_exe_submit_by",
						"qa_exe_submit_id", "qa_exe_sign", "manager_status", "manager_submit_on", "manager_submit_by",
						"manager_submit_id", "manager_sign" };

				BeanUtils.copyProperties(abCotton, checkObj, IgnoreProps);

				if (!checkObj.getChemist_status().equals(AppConstantsQc.chemistSubmitted)
						|| checkObj.getQa_exe_status().equals(AppConstantsQc.QAExeReject)
						|| checkObj.getManager_status().equals(AppConstantsQc.QAReject)
						|| checkObj.getManager_status().equals(AppConstantsQc.QCRejected)) {

					if (role.equals("ROLE_CHEMIST")) {

						checkObj.setChemist_submit_by(userName);
						checkObj.setChemist_submit_on(date);
						checkObj.setChemist_submit_id(userId);
						checkObj.setChemist_status(AppConstantsQc.chemistSubmitted);
						checkObj.setChemist_sign(userName);
						checkObj.setQa_exe_status(AppConstantsQc.QAExeWaiting);
						checkObj.setManager_status("");

						CoaMoistureF26G ss = coaMoistureF26GRepo.save(checkObj);

						if (ss.getDetails() != null) {

							for (CoaMoistureF26GLines lines : ss.getDetails()) {

								lines.setId(ss.getId());
								coaMoistureF26GLineRepo.save(lines);
							}
						}

						coaMoistureF26GRepo.save(checkObj);

						// HISTORY

						CoaMoistureF26GHistory rejectionReportHistory = new CoaMoistureF26GHistory();

						BeanUtils.copyProperties(checkObj, rejectionReportHistory, ignoreHistory);

						String product = rejectionReportHistory.getProduct();
						String customer = rejectionReportHistory.getCustomer();
						String testingDate = rejectionReportHistory.getTesting_date();

						int version = coaMoistureF26GHistoryRepo.getMaximumVersion(product, customer, testingDate)
								.map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						coaMoistureF26GHistoryRepo.save(rejectionReportHistory);

						// AMC

						List<CoaMoistureF26GLines> historyMapList = checkObj.getDetails();

						for (CoaMoistureF26GLines obj : historyMapList) {

							CoaMoistureF26GLinesHistory objHistory = new CoaMoistureF26GLinesHistory();

							BeanUtils.copyProperties(obj, objHistory);

							objHistory.setHis_id(rejectionReportHistory.getHis_id());

							coaMoistureF26GLinesHistoryRepo.save(objHistory);

						}

//                    Mail logic

						try {

							qcMailFunction.sendEmailToQaExeF026G(checkObj);

						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail ! "),
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

				if (!role.equals("ROLE_CHEMIST")) {
					return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = abCotton;

				String[] ignoreHistory = { "his_id", "details" };

				checkObj.setChemist_submit_by(userName);
				checkObj.setChemist_submit_on(date);
				checkObj.setChemist_submit_id(userId);
				checkObj.setChemist_status(AppConstantsQc.chemistSubmitted);
				checkObj.setChemist_sign(userName);
				checkObj.setQa_exe_status(AppConstantsQc.QAExeWaiting);
				checkObj.setManager_status("");

				CoaMoistureF26G ss = coaMoistureF26GRepo.save(checkObj);

				if (ss.getDetails() != null) {

					for (CoaMoistureF26GLines lines : ss.getDetails()) {

						lines.setId(ss.getId());
						coaMoistureF26GLineRepo.save(lines);
					}
				}

				coaMoistureF26GRepo.save(checkObj);

				// History

				CoaMoistureF26GHistory rejectionReportHistory = new CoaMoistureF26GHistory();

				BeanUtils.copyProperties(checkObj, rejectionReportHistory, ignoreHistory);

				String product = rejectionReportHistory.getProduct();
				String customer = rejectionReportHistory.getCustomer();
				String testingDate = rejectionReportHistory.getTesting_date();

				int version = coaMoistureF26GHistoryRepo.getMaximumVersion(product, customer, testingDate)
						.map(temp -> temp + 1).orElse(1);

				rejectionReportHistory.setVersion(version);

				coaMoistureF26GHistoryRepo.save(rejectionReportHistory);

				// AMC

				List<CoaMoistureF26GLines> historyMapList = checkObj.getDetails();

				for (CoaMoistureF26GLines obj : historyMapList) {

					CoaMoistureF26GLinesHistory objHistory = new CoaMoistureF26GLinesHistory();

					BeanUtils.copyProperties(obj, objHistory);

					objHistory.setHis_id(rejectionReportHistory.getHis_id());

					coaMoistureF26GLinesHistoryRepo.save(objHistory);

				}

//				Mail logic

				try {

					qcMailFunction.sendEmailToQaExeF026G(checkObj);

				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
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

	// PRINT

	public ResponseEntity<?> PrintApiF26G(String product, String customer, String testingDate) {
		try {

			List<CoaMoistureF26G> list = coaMoistureF26GRepo.PrintApiF26(product, customer, testingDate);

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

	public ResponseEntity<?> getMoisturesF26G(String product, String customer, String testingDate) {
		try {

			List<CoaMoistureF26G> list = coaMoistureF26GRepo.GetAbCottonF26(product, customer, testingDate);

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

	// APPROVE OR REJECT

	public ResponseEntity<?> ApproveOrRejectF26G(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		CoaMoistureF26G object = new CoaMoistureF26G();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = coaMoistureF26GRepo.findFormById(approvalResponse.getId());

			CoaMoistureF26GHistory objHistory = new CoaMoistureF26GHistory();

			String cheStatus = object.getChemist_status();
			String qaExeStatus = object.getQa_exe_status();
			String qcStatus = object.getManager_status();

			if (userRole.equalsIgnoreCase("QA_EXECUTIVE")) {

				object.setQa_exe_submit_on(date);
				object.setQa_exe_submit_by(userName);
				object.setQa_exe_submit_id(userId);
				object.setQa_exe_sign(userName);
				object.setManager_status(AppConstantsQc.ManWaiting);

				objHistory = coaMoistureF26GHistoryRepo.fetchLastSubmittedRecord(object.getProduct(),
						object.getCustomer(), object.getTesting_date());
				objHistory.setQa_exe_submit_on(date);
				objHistory.setQa_exe_submit_by(userName);
				objHistory.setQa_exe_submit_id(userId);
				objHistory.setQa_exe_sign(userName);
				objHistory.setManager_status(AppConstantsQc.ManWaiting);

				if (cheStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
						&& qaExeStatus.equalsIgnoreCase(AppConstantsQc.QAExeWaiting)) {

					if (approvalResponse.getStatus().equals("Approve")) {
						object.setQa_exe_status(AppConstantsQc.QAExeApprove);
						objHistory.setQa_exe_status(AppConstantsQc.QAExeApprove);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {
						object.setQa_exe_status(AppConstantsQc.QAExeReject);
						object.setReason(approvalResponse.getRemarks());
						objHistory.setQa_exe_status(AppConstantsQc.QAExeReject);
						object.setReason(approvalResponse.getRemarks());
					}

					coaMoistureF26GRepo.save(object);

					coaMoistureF26GHistoryRepo.save(objHistory);

					try {

						if (object.getQa_exe_status() != null) {

							if (object.getQa_exe_status().equals("QA_EXE_APPROVED"))

							{
								qcMailFunction.sendEmailToManagerF26G(object);
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

			else if (userRole.equalsIgnoreCase("QC_MANAGER") || userRole.equalsIgnoreCase("QA_MANAGER")) {

				if (qaExeStatus.equalsIgnoreCase(AppConstantsQc.QAExeApprove)
						&& qcStatus.equalsIgnoreCase(AppConstantsQc.ManWaiting)) {

					object.setManager_submit_on(date);
					object.setManager_submit_by(userName);
					object.setManager_submit_id(userId);
					object.setManager_sign(userName);

					objHistory = coaMoistureF26GHistoryRepo.fetchLastSubmittedRecord(object.getProduct(),
							object.getCustomer(), object.getTesting_date());

					objHistory.setManager_submit_on(date);
					objHistory.setManager_submit_by(userName);
					objHistory.setManager_submit_id(userId);
					objHistory.setManager_sign(userName);

					if (approvalResponse.getStatus().equals("Approve")) {

						if (userRole.equalsIgnoreCase("QC_MANAGER")) {
							object.setManager_status(AppConstantsQc.QCApprove);
							objHistory.setManager_status(AppConstantsQc.QCApprove);

						} else if (userRole.equalsIgnoreCase("QA_MANAGER")) {
							object.setManager_status(AppConstantsQc.QAApprove);
							objHistory.setManager_status(AppConstantsQc.QAApprove);
						}
					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						if (userRole.equalsIgnoreCase("QC_MANAGER")) {
							object.setManager_status(AppConstantsQc.QCRejected);
							object.setReason(approvalResponse.getRemarks());

							objHistory.setManager_status(AppConstantsQc.QCRejected);
							objHistory.setReason(approvalResponse.getRemarks());

						} else if (userRole.equalsIgnoreCase("QA_MANAGER")) {
							object.setManager_status(AppConstantsQc.QAReject);
							object.setReason(approvalResponse.getRemarks());
							objHistory.setManager_status(AppConstantsQc.QAReject);
							objHistory.setReason(approvalResponse.getRemarks());
						}
					}

					coaMoistureF26GRepo.save(object);

					coaMoistureF26GHistoryRepo.save(objHistory);

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

	// SUMMARY

	public ResponseEntity<?> F26GMoistureSummary(HttpServletRequest http) {

		List<CoaMoistureF26G> details = null;

		try {

			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_CHEMIST")) {

				details = coaMoistureF26GRepo.chemistSummary();
			}

			else if (userRole.equalsIgnoreCase("QA_EXECUTIVE") || userRole.equalsIgnoreCase("QC_MANAGER")
					|| userRole.equalsIgnoreCase("QA_MANAGER")) {
				details = coaMoistureF26GRepo.exeManagerSummary();
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

	// ============== F016 STANDARD OF CHEMICAL ==============

	public ResponseEntity<?> SaveStandardOfChemicalF016(StandarizationOfChemicalReportF016 abCotton,
			HttpServletRequest http) {

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		StandarizationOfChemicalReportF016 listObj = null;

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getId() != null) {

				Long id = abCotton.getId();

				listObj = standarizationOfChemicalReportF016Repo.findFormById(id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "chemist_status", "chemist_saved_on",
						"chemist_saved_by", "chemist_saved_id", "chemist_submit_on", "chemist_submit_by",
						"chemist_submit_id", "chemist_sign", "qa_exe_status", "qa_exe_submit_on", "qa_exe_submit_by",
						"qa_exe_submit_id", "qa_exe_sign", "manager_status", "manager_submit_on", "manager_submit_by",
						"manager_submit_id", "manager_sign" };

				BeanUtils.copyProperties(abCotton, listObj, IgnoreProps);

				if (role.equals("ROLE_CHEMIST")) {

					listObj.setChemist_saved_by(userName);
					listObj.setChemist_saved_on(date);
					listObj.setChemist_saved_id(userId);
					listObj.setChemist_status(AppConstantsQc.chemistSave);

					listObj.setManager_status("");

					standarizationOfChemicalReportF016Repo.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				if (role.equals("ROLE_CHEMIST")) {

					listObj = abCotton;

					listObj.setChemist_saved_by(userName);
					listObj.setChemist_saved_on(date);
					listObj.setChemist_saved_id(userId);
					listObj.setChemist_status(AppConstantsQc.chemistSave);

					listObj.setManager_status("");

					standarizationOfChemicalReportF016Repo.save(listObj);

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
//				return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	// SUBMIT

	public ResponseEntity<?> SubmitStandardOfChemicalF016(StandarizationOfChemicalReportF016 abCotton,
			HttpServletRequest http) {
		SCAUtil scaUtil = new SCAUtil();

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = abCotton.getId();

		StandarizationOfChemicalReportF016 checkObj = new StandarizationOfChemicalReportF016();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getFormatNo() == null)
				value = "formatNo";
			if (abCotton.getRefSopNo() == null)
				value = "SopNumber";
			if (abCotton.getRevisionNo() == null)
				value = "revisionNo";
			if (abCotton.getFormatName() == null)
				value = "formatName";
			if (abCotton.getDate() == null)
				value = "date";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = standarizationOfChemicalReportF016Repo.findFormById(id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt", "chemist_status", "chemist_saved_on",
						"chemist_saved_by", "chemist_saved_id", "chemist_submit_on", "chemist_submit_by",
						"chemist_submit_id", "chemist_sign", "qa_exe_status", "qa_exe_submit_on", "qa_exe_submit_by",
						"qa_exe_submit_id", "qa_exe_sign", "manager_status", "manager_submit_on", "manager_submit_by",
						"manager_submit_id", "manager_sign" };

				BeanUtils.copyProperties(abCotton, checkObj, IgnoreProps);

				if (!checkObj.getChemist_status().equals(AppConstantsQc.chemistSubmitted)
						|| checkObj.getManager_status().equals(AppConstantsQc.QAReject)
						|| checkObj.getManager_status().equals(AppConstantsQc.QCRejected)) {

					if (role.equals("ROLE_CHEMIST")) {

						checkObj.setChemist_submit_by(userName);
						checkObj.setChemist_submit_on(date);
						checkObj.setChemist_submit_id(userId);
						checkObj.setChemist_status(AppConstantsQc.chemistSubmitted);
						checkObj.setChemist_sign(userName);
						checkObj.setManager_status(AppConstantsQc.ManWaiting);

						standarizationOfChemicalReportF016Repo.save(checkObj);

						// HISTORY

						StandarizationOfChemicalReportF016History rejectionReportHistory = new StandarizationOfChemicalReportF016History();

						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						String date1 = rejectionReportHistory.getDate();
						String shift = rejectionReportHistory.getShift();
						String chemical = rejectionReportHistory.getTo_be_name_of_solution();

						int version = standarizationOfChemicalReportF016HistoryRepo
								.getMaximumVersion(date1, shift, chemical).map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						standarizationOfChemicalReportF016HistoryRepo.save(rejectionReportHistory);

//		                    Mail logic

						try {

							qcMailFunction.sendEmailToQaExeF016(checkObj);
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

				if (!role.equals("ROLE_CHEMIST")) {
					return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = abCotton;

				checkObj.setChemist_submit_by(userName);
				checkObj.setChemist_submit_on(date);
				checkObj.setChemist_submit_id(userId);
				checkObj.setChemist_status(AppConstantsQc.chemistSubmitted);
				checkObj.setChemist_sign(userName);
				checkObj.setManager_status(AppConstantsQc.ManWaiting);

				standarizationOfChemicalReportF016Repo.save(checkObj);

				StandarizationOfChemicalReportF016History rejectionReportHistory = new StandarizationOfChemicalReportF016History();

				BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				String date1 = rejectionReportHistory.getDate();
				String shift = rejectionReportHistory.getShift();
				String chemical = rejectionReportHistory.getTo_be_name_of_solution();

				int version = standarizationOfChemicalReportF016HistoryRepo.getMaximumVersion(date1, shift, chemical)
						.map(temp -> temp + 1).orElse(1);

				rejectionReportHistory.setVersion(version);

				standarizationOfChemicalReportF016HistoryRepo.save(rejectionReportHistory);

//						Mail logic

				try {

					qcMailFunction.sendEmailToQaExeF016(checkObj);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
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

//				return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	// PRINT

	public ResponseEntity<?> PrintApiF016(String date, String shift, String chemical) {
		try {

			List<StandarizationOfChemicalReportF016> list = standarizationOfChemicalReportF016Repo.PrintApiF016(date,
					shift, chemical);

			if (list == null) {

//						list = new ArrayList<MetalDetectorCheckListF020>();

				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getStandardOfChemicalF016(String date, String shift, String chemical) {
		try {

			List<StandarizationOfChemicalReportF016> list = standarizationOfChemicalReportF016Repo.GetAbCottonF26(date,
					shift, chemical);

			if (list == null) {

//						list = new ArrayList<MetalDetectorCheckListF020>();

				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	// APPROVE OR REJECT

	public ResponseEntity<?> ApproveOrRejectF016(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		StandarizationOfChemicalReportF016 object = new StandarizationOfChemicalReportF016();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = standarizationOfChemicalReportF016Repo.findFormById(approvalResponse.getId());

			StandarizationOfChemicalReportF016History objHistory = new StandarizationOfChemicalReportF016History();

			String cheStatus = object.getChemist_status();
			String qcStatus = object.getManager_status();

			if (userRole.equalsIgnoreCase("QC_MANAGER") || userRole.equalsIgnoreCase("QA_MANAGER")) {

				if (cheStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
						&& qcStatus.equalsIgnoreCase(AppConstantsQc.ManWaiting)) {

					object.setManager_submit_on(date);
					object.setManager_submit_by(userName);
					object.setManager_submit_id(userId);
					object.setManager_sign(userName);

					String date1 = object.getDate();
					String shift = object.getShift();
					String chemical = object.getTo_be_name_of_solution();

					objHistory = standarizationOfChemicalReportF016HistoryRepo.fetchLastSubmittedRecord(date1, shift,
							chemical);

					objHistory.setManager_submit_on(date);
					objHistory.setManager_submit_by(userName);
					objHistory.setManager_submit_id(userId);
					objHistory.setManager_sign(userName);

					if (approvalResponse.getStatus().equals("Approve")) {

						if (userRole.equalsIgnoreCase("QC_MANAGER")) {
							object.setManager_status(AppConstantsQc.QCApprove);
							objHistory.setManager_status(AppConstantsQc.QCApprove);

						} else if (userRole.equalsIgnoreCase("QA_MANAGER")) {
							object.setManager_status(AppConstantsQc.QAApprove);
							objHistory.setManager_status(AppConstantsQc.QAApprove);
						}
					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						if (userRole.equalsIgnoreCase("QC_MANAGER")) {
							object.setManager_status(AppConstantsQc.QCRejected);
							object.setReason(approvalResponse.getRemarks());

							objHistory.setManager_status(AppConstantsQc.QCRejected);
							objHistory.setReason(approvalResponse.getRemarks());

						} else if (userRole.equalsIgnoreCase("QA_MANAGER")) {
							object.setManager_status(AppConstantsQc.QAReject);
							object.setReason(approvalResponse.getRemarks());
							objHistory.setManager_status(AppConstantsQc.QAReject);
							objHistory.setReason(approvalResponse.getRemarks());
						}
					}

					standarizationOfChemicalReportF016Repo.save(object);

					standarizationOfChemicalReportF016HistoryRepo.save(objHistory);

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

	// SUMMARY

	public ResponseEntity<?> F016StandardOfChemicalSummary(HttpServletRequest http) {

		List<StandarizationOfChemicalReportF016> details = null;

		try {

			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_CHEMIST")) {

				details = standarizationOfChemicalReportF016Repo.chemistSummary();
			}

			else if (userRole.equalsIgnoreCase("QA_EXECUTIVE") || userRole.equalsIgnoreCase("QC_MANAGER")
					|| userRole.equalsIgnoreCase("QA_MANAGER")) {
				details = standarizationOfChemicalReportF016Repo.exeManagerSummary();
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

	// NEW

	// ============== F016 STANDARD OF CHEMICAL ==============

	public ResponseEntity<?> SaveWaterAnalysisReportF007(WaterAnalysisReportF007 abCotton, HttpServletRequest http) {

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		WaterAnalysisReportF007 listObj = null;

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getWater_id() != null) {

				Long id = abCotton.getWater_id();

				listObj = waterAnalysisReportF007Repo.findFormById(id);

				String[] IgnoreProps = { "water_id", "createdBy", "createdAt",
						// Chemist fields
						"chemist_status", "chemist_saved_on", "chemist_saved_by", "chemist_saved_id",
						"chemist_submit_on", "chemist_submit_by", "chemist_submit_id", "chemist_sign",

						// Microbiologist fields
						"micro_status", "micro_saved_on", "micro_saved_by", "micro_saved_id", "micro_submit_on",
						"micro_submit_by", "micro_submit_id", "micro_sign",

						// QA Executive fields
						"qa_exe_status", "qa_exe_submit_on", "qa_exe_submit_by", "qa_exe_submit_id", "qa_exe_sign",

						// Chemist Manager fields
						"manager_status", "manager_submit_on", "manager_submit_by", "manager_submit_id",
						"manager_sign" };

				BeanUtils.copyProperties(abCotton, listObj, IgnoreProps);

				if (role.equals("ROLE_CHEMIST")) {

					listObj.setChemist_saved_by(userName);
					listObj.setChemist_saved_on(date);
					listObj.setChemist_saved_id(userId);
					listObj.setChemist_status(AppConstantsQc.chemistSave);
					listObj.setQa_exe_status("");
					listObj.setManager_status("");

					WaterAnalysisReportF007 ss = waterAnalysisReportF007Repo.save(listObj);

					if (ss.getChemistDetails() != null) {

						for (WaterAnalysisReportChemistF007 chemist : ss.getChemistDetails()) {

							chemist.setWater_id(ss.getWater_id());
							waterAnalysisReportChemistF007Repo.save(chemist);
						}
					}

				} else if (role.equals("ROLE_MICROBIOLOGIST")) {

					listObj.setMicro_saved_by(userName);
					listObj.setMicro_saved_on(date);
					listObj.setMicro_saved_id(userId);
					listObj.setMicro_status(AppConstantsQc.microBiologistSave);
					listObj.setManager_status("");

					waterAnalysisReportF007Repo.save(listObj);

					List<WaterAnalysisReportMicroF007> lines = abCotton.getMicroDetails();

					for (WaterAnalysisReportMicroF007 line : lines) {

						line.setWater_id(listObj.getWater_id());

						waterAnalysisReportMicroF007Repo.save(line);
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}

			} else {

				if (role.equals("ROLE_CHEMIST")) {

					abCotton.setChemist_saved_by(userName);
					abCotton.setChemist_saved_on(date);
					abCotton.setChemist_saved_id(userId);
					abCotton.setChemist_status(AppConstantsQc.chemistSave);
					abCotton.setQa_exe_status("");
					abCotton.setManager_status("");

					WaterAnalysisReportF007 ss = waterAnalysisReportF007Repo.save(abCotton);

					if (ss.getChemistDetails() != null) {
						for (WaterAnalysisReportChemistF007 chemist : ss.getChemistDetails()) {

							chemist.setWater_id(ss.getWater_id());
							waterAnalysisReportChemistF007Repo.save(chemist);
						}
					}

				} else if (role.equals("ROLE_MICROBIOLOGIST")) {

					abCotton.setMicro_saved_by(userName);
					abCotton.setMicro_saved_on(date);
					abCotton.setMicro_saved_id(userId);
					abCotton.setMicro_status(AppConstantsQc.microBiologistSave);
					abCotton.setQa_exe_status("");
					abCotton.setManager_status("");

					WaterAnalysisReportF007 ss = waterAnalysisReportF007Repo.save(abCotton);

					if (ss.getMicroDetails() != null) {
						for (WaterAnalysisReportMicroF007 chemist : ss.getMicroDetails()) {

							chemist.setWater_id(ss.getWater_id());
							waterAnalysisReportMicroF007Repo.save(chemist);
						}
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (

		Exception ex) {

			log.error(" **** Unable to Save Water Analysis Report Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Water Analysis Report Details!"),
					HttpStatus.BAD_REQUEST);
		}
//					return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(abCotton, HttpStatus.CREATED);
	}

	/// SUBMIT WATER ANALYSIS REPORT

	public ResponseEntity<?> SubmitWaterAnalysisReportF007(WaterAnalysisReportF007 abCotton, HttpServletRequest http) {

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		WaterAnalysisReportF007 listObj = new WaterAnalysisReportF007();

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getWater_id() != null) {

				Long id = abCotton.getWater_id();

				listObj = waterAnalysisReportF007Repo.findFormById(id);

				String[] IgnoreProps = { "water_id", "createdBy", "createdAt",
						// Chemist fields
						"chemist_status", "chemist_saved_on", "chemist_saved_by", "chemist_saved_id",
						"chemist_submit_on", "chemist_submit_by", "chemist_submit_id", "chemist_sign",

						// Microbiologist fields
						"micro_status", "micro_saved_on", "micro_saved_by", "micro_saved_id", "micro_submit_on",
						"micro_submit_by", "micro_submit_id", "micro_sign",

						// QA Executive fields
						"qa_exe_status", "qa_exe_submit_on", "qa_exe_submit_by", "qa_exe_submit_id", "qa_exe_sign",

						// Chemist Manager fields
						"manager_status", "manager_submit_on", "manager_submit_by", "manager_submit_id",
						"manager_sign" };

				BeanUtils.copyProperties(abCotton, listObj, IgnoreProps);

				if (role.equals("ROLE_CHEMIST")) {

					listObj.setChemist_submit_by(userName);
					listObj.setChemist_submit_on(date);
					listObj.setChemist_submit_id(userId);
					listObj.setChemist_sign(userName);

					listObj.setChemist_status(AppConstantsQc.chemistSubmitted);
					listObj.setQa_exe_status(AppConstantsQc.ManWaiting);

					if (listObj.getMicro_status() != null)

					{

						if (listObj.getMicro_status().equals("MICROBIOLOGIST_APPROVED")
								&& listObj.getQa_exe_status().equals("QA_EXE_APPROVED")) {

							listObj.setManager_status(AppConstantsQc.ManWaiting);
						} else {

							listObj.setManager_status("");
						}

					}

					else {
						listObj.setManager_status("");

					}

					WaterAnalysisReportF007 ss = waterAnalysisReportF007Repo.save(listObj);

					if (ss.getChemistDetails() != null) {

						for (WaterAnalysisReportChemistF007 chemist : ss.getChemistDetails()) {

							chemist.setWater_id(ss.getWater_id());
							waterAnalysisReportChemistF007Repo.save(chemist);
						}
					}

					waterAnalysisReportF007Repo.save(listObj);

					// HISTORY AUDIT

					WaterAnalysisReportF007History rejectionReportHistory = new WaterAnalysisReportF007History();

					rejectionReportHistory.setFormatNo(listObj.getFormatNo());
					rejectionReportHistory.setFormatName(listObj.getFormatName());
					rejectionReportHistory.setRevisionNo(listObj.getRevisionNo());
					rejectionReportHistory.setRefSopNo(listObj.getRefSopNo());
					rejectionReportHistory.setAr_no(listObj.getAr_no());
					rejectionReportHistory.setDate(listObj.getDate());

					// NEW
					rejectionReportHistory.setChemist_saved_by(listObj.getChemist_saved_by());
					rejectionReportHistory.setChemist_saved_id(listObj.getChemist_saved_id());
					rejectionReportHistory.setChemist_saved_on(listObj.getChemist_saved_on());

					rejectionReportHistory.setChemist_submit_by(listObj.getChemist_submit_by());
					rejectionReportHistory.setChemist_submit_id(listObj.getChemist_submit_id());
					rejectionReportHistory.setChemist_submit_on(listObj.getChemist_submit_on());
					rejectionReportHistory.setChemist_status(listObj.getChemist_status());
					rejectionReportHistory.setChemist_sign(listObj.getChemist_sign());

					rejectionReportHistory.setMicro_saved_by(listObj.getMicro_saved_by());
					rejectionReportHistory.setMicro_saved_id(listObj.getMicro_saved_id());
					rejectionReportHistory.setMicro_saved_on(listObj.getMicro_saved_on());
					rejectionReportHistory.setMicro_submit_by(listObj.getManager_submit_by());
					rejectionReportHistory.setMicro_submit_by(listObj.getMicro_submit_by());
					rejectionReportHistory.setMicro_submit_id(listObj.getMicro_submit_id());
					rejectionReportHistory.setMicro_status(listObj.getMicro_status());
					rejectionReportHistory.setMicro_sign(listObj.getMicro_sign());

					rejectionReportHistory.setQa_exe_submit_by(listObj.getQa_exe_submit_by());
					rejectionReportHistory.setQa_exe_submit_id(listObj.getQa_exe_submit_id());
					rejectionReportHistory.setQa_exe_submit_on(listObj.getQa_exe_submit_on());
					rejectionReportHistory.setQa_exe_status(listObj.getQa_exe_status());
					rejectionReportHistory.setQa_exe_sign(listObj.getQa_exe_sign());

					rejectionReportHistory.setManager_submit_by(listObj.getManager_submit_by());
					rejectionReportHistory.setManager_submit_id(listObj.getManager_submit_id());
					rejectionReportHistory.setManager_submit_on(listObj.getManager_submit_on());
					rejectionReportHistory.setManager_sign(listObj.getManager_sign());
					rejectionReportHistory.setManager_status(listObj.getManager_status());

					// VERSION

					String date1 = rejectionReportHistory.getDate();

					int version = waterAnalysisReportF007HistoryRepo.getMaximumVersion(date1).map(temp -> temp + 1)
							.orElse(1);

					rejectionReportHistory.setVersion(version);

					waterAnalysisReportF007HistoryRepo.save(rejectionReportHistory);

					List<WaterAnalysisReportChemistF007> historyMapList = listObj.getChemistDetails();

					for (WaterAnalysisReportChemistF007 obj : historyMapList) {
						WaterAnalysisReportChemistF007History objHistory = new WaterAnalysisReportChemistF007History();

						BeanUtils.copyProperties(obj, objHistory);
						objHistory.setHis_water_id(rejectionReportHistory.getHis_water_id());
						waterAnalysisReportChemistF007HistoryRepo.save(objHistory);

					}

					// MAIL

					try {

						qcMailFunction.sendEmailToQaExeF007(listObj);

					} catch (Exception ex) {
						return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
								HttpStatus.OK);
					}

				} else if (role.equals("ROLE_MICROBIOLOGIST")) {

					listObj.setMicro_submit_by(userName);
					listObj.setMicro_submit_on(date);
					listObj.setMicro_submit_id(userId);
					listObj.setMicro_sign(userName);

					listObj.setMicro_status(AppConstantsQc.microBiologistSubmitted);

					String abs = listObj.getQa_exe_status();

					if (listObj.getQa_exe_status().equals("QA_EXE_APPROVED")) {

						listObj.setManager_status(AppConstantsQc.ManWaiting);

					} else {
						listObj.setManager_status("");
					}

					waterAnalysisReportF007Repo.save(listObj);

					List<WaterAnalysisReportMicroF007> lines = abCotton.getMicroDetails();

					for (WaterAnalysisReportMicroF007 line : lines) {

						line.setWater_id(listObj.getWater_id());

						waterAnalysisReportMicroF007Repo.save(line);
					}

					WaterAnalysisReportF007 ss = waterAnalysisReportF007Repo.save(listObj);

					// HISTORY AUDIT

					WaterAnalysisReportF007History rejectionReportHistory = new WaterAnalysisReportF007History();

					rejectionReportHistory.setFormatNo(listObj.getFormatNo());
					rejectionReportHistory.setRevisionNo(listObj.getRevisionNo());
					rejectionReportHistory.setRefSopNo(listObj.getRefSopNo());
					rejectionReportHistory.setAr_no(listObj.getAr_no());
					rejectionReportHistory.setDate(listObj.getDate());

					rejectionReportHistory.setChemist_saved_by(listObj.getChemist_saved_by());
					rejectionReportHistory.setChemist_saved_id(listObj.getChemist_saved_id());
					rejectionReportHistory.setChemist_saved_on(listObj.getChemist_saved_on());

					rejectionReportHistory.setChemist_submit_by(listObj.getChemist_submit_by());
					rejectionReportHistory.setChemist_submit_id(listObj.getChemist_submit_id());
					rejectionReportHistory.setChemist_submit_on(listObj.getChemist_submit_on());
					rejectionReportHistory.setChemist_status(listObj.getChemist_status());
					rejectionReportHistory.setChemist_sign(listObj.getChemist_sign());

					rejectionReportHistory.setMicro_saved_by(listObj.getMicro_saved_by());
					rejectionReportHistory.setMicro_saved_id(listObj.getMicro_saved_id());
					rejectionReportHistory.setMicro_saved_on(listObj.getMicro_saved_on());
					rejectionReportHistory.setMicro_submit_by(listObj.getManager_submit_by());
					rejectionReportHistory.setMicro_submit_by(listObj.getMicro_submit_by());
					rejectionReportHistory.setMicro_submit_id(listObj.getMicro_submit_id());
					rejectionReportHistory.setMicro_status(listObj.getMicro_status());
					rejectionReportHistory.setMicro_sign(listObj.getMicro_sign());

					rejectionReportHistory.setQa_exe_submit_by(listObj.getQa_exe_submit_by());
					rejectionReportHistory.setQa_exe_submit_id(listObj.getQa_exe_submit_id());
					rejectionReportHistory.setQa_exe_submit_on(listObj.getQa_exe_submit_on());
					rejectionReportHistory.setQa_exe_status(listObj.getQa_exe_status());
					rejectionReportHistory.setQa_exe_sign(listObj.getQa_exe_sign());

					rejectionReportHistory.setManager_submit_by(listObj.getManager_submit_by());
					rejectionReportHistory.setManager_submit_id(listObj.getManager_submit_id());
					rejectionReportHistory.setManager_submit_on(listObj.getManager_submit_on());
					rejectionReportHistory.setManager_sign(listObj.getManager_sign());
					rejectionReportHistory.setManager_status(listObj.getManager_status());

					// VERSION

					String date1 = rejectionReportHistory.getDate();

					int version = waterAnalysisReportF007HistoryRepo.getMaximumVersion(date1).map(temp -> temp + 1)
							.orElse(1);

					rejectionReportHistory.setVersion(version);

					waterAnalysisReportF007HistoryRepo.save(rejectionReportHistory);

					List<WaterAnalysisReportMicroF007> historyMapList = listObj.getMicroDetails();

					for (WaterAnalysisReportMicroF007 obj : historyMapList) {
						WaterAnalysisReportMicroF007History objHistory = new WaterAnalysisReportMicroF007History();

						BeanUtils.copyProperties(obj, objHistory);
						objHistory.setHis_water_id(rejectionReportHistory.getHis_water_id());
						waterAnalysisReportMicroF007HistoryRepo.save(objHistory);

					}

					// MAIL

					try {

						if (listObj.getQa_exe_status() != null) {

							if (listObj.getQa_exe_status().equals("QA_EXE_APPROVED")) {

								qcMailFunction.sendEmailToMicroManagerF007(listObj);

							}

						}

					} catch (Exception ex) {
						return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
								HttpStatus.OK);
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}

			} else {

				if (role.equals("ROLE_CHEMIST")) {

					abCotton.setChemist_submit_by(userName);
					abCotton.setChemist_submit_on(date);
					abCotton.setChemist_submit_id(userId);
					abCotton.setChemist_sign(userName);

					abCotton.setChemist_status(AppConstantsQc.chemistSubmitted);
					abCotton.setQa_exe_status(AppConstantsQc.ManWaiting);

					if (abCotton.getMicro_status() != null) {

						if (abCotton.getMicro_status().equals("MICRO_SUBMITTED")
								&& abCotton.getQa_exe_status().equals("QA_EXE_APPROVED")) {

							abCotton.setManager_status(AppConstantsQc.ManWaiting);
						} else {

							abCotton.setManager_status("");
						}

					} else {
						abCotton.setManager_status("");

					}

					WaterAnalysisReportF007 ss = waterAnalysisReportF007Repo.save(abCotton);

					if (ss.getChemistDetails() != null) {
						for (WaterAnalysisReportChemistF007 chemist : ss.getChemistDetails()) {

							chemist.setWater_id(ss.getWater_id());
							waterAnalysisReportChemistF007Repo.save(chemist);
						}
					}

					waterAnalysisReportF007Repo.save(abCotton);

					// HISTORY AUDIT

					WaterAnalysisReportF007History rejectionReportHistory = new WaterAnalysisReportF007History();

					rejectionReportHistory.setFormatNo(listObj.getFormatNo());
					rejectionReportHistory.setRevisionNo(listObj.getRevisionNo());
					rejectionReportHistory.setRefSopNo(listObj.getRefSopNo());
					rejectionReportHistory.setAr_no(listObj.getAr_no());
					rejectionReportHistory.setDate(listObj.getDate());

					// NEW
					rejectionReportHistory.setChemist_saved_by(listObj.getChemist_saved_by());
					rejectionReportHistory.setChemist_saved_id(listObj.getChemist_saved_id());
					rejectionReportHistory.setChemist_saved_on(listObj.getChemist_saved_on());

					rejectionReportHistory.setChemist_submit_by(listObj.getChemist_submit_by());
					rejectionReportHistory.setChemist_submit_id(listObj.getChemist_submit_id());
					rejectionReportHistory.setChemist_submit_on(listObj.getChemist_submit_on());
					rejectionReportHistory.setChemist_status(listObj.getChemist_status());
					rejectionReportHistory.setChemist_sign(listObj.getChemist_sign());

					rejectionReportHistory.setMicro_saved_by(listObj.getMicro_saved_by());
					rejectionReportHistory.setMicro_saved_id(listObj.getMicro_saved_id());
					rejectionReportHistory.setMicro_saved_on(listObj.getMicro_saved_on());
					rejectionReportHistory.setMicro_submit_by(listObj.getManager_submit_by());
					rejectionReportHistory.setMicro_submit_by(listObj.getMicro_submit_by());
					rejectionReportHistory.setMicro_submit_id(listObj.getMicro_submit_id());
					rejectionReportHistory.setMicro_status(listObj.getMicro_status());
					rejectionReportHistory.setMicro_sign(listObj.getMicro_sign());

					rejectionReportHistory.setQa_exe_submit_by(listObj.getQa_exe_submit_by());
					rejectionReportHistory.setQa_exe_submit_id(listObj.getQa_exe_submit_id());
					rejectionReportHistory.setQa_exe_submit_on(listObj.getQa_exe_submit_on());
					rejectionReportHistory.setQa_exe_status(listObj.getQa_exe_status());
					rejectionReportHistory.setQa_exe_sign(listObj.getQa_exe_sign());

					rejectionReportHistory.setManager_submit_by(listObj.getManager_submit_by());
					rejectionReportHistory.setManager_submit_id(listObj.getManager_submit_id());
					rejectionReportHistory.setManager_submit_on(listObj.getManager_submit_on());
					rejectionReportHistory.setManager_sign(listObj.getManager_sign());
					rejectionReportHistory.setManager_status(listObj.getManager_status());

					// VERSION

					String date1 = rejectionReportHistory.getDate();

					int version = waterAnalysisReportF007HistoryRepo.getMaximumVersion(date1).map(temp -> temp + 1)
							.orElse(1);

					rejectionReportHistory.setVersion(version);

					waterAnalysisReportF007HistoryRepo.save(rejectionReportHistory);

					List<WaterAnalysisReportChemistF007> historyMapList = listObj.getChemistDetails();

					for (WaterAnalysisReportChemistF007 obj : historyMapList) {
						WaterAnalysisReportChemistF007History objHistory = new WaterAnalysisReportChemistF007History();

						BeanUtils.copyProperties(obj, objHistory);
						objHistory.setHis_water_id(rejectionReportHistory.getHis_water_id());
						waterAnalysisReportChemistF007HistoryRepo.save(objHistory);

					}

					// MAIL

					try {

						qcMailFunction.sendEmailToQaExeF007(listObj);

					} catch (Exception ex) {
						return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
								HttpStatus.OK);
					}

				} else if (role.equals("ROLE_MICROBIOLOGIST")) {

					abCotton.setMicro_submit_by(userName);
					abCotton.setMicro_submit_on(date);
					abCotton.setMicro_submit_id(userId);
					abCotton.setMicro_sign(userName);

					abCotton.setMicro_status(AppConstantsQc.microBiologistSubmitted);

					if (abCotton.getQa_exe_status() != null) {

						if (abCotton.getQa_exe_status().equals("QA_EXE_APPROVED")) {

							abCotton.setManager_status(AppConstantsQc.ManWaiting);

						} else {
							abCotton.setManager_status("");
						}

					} else {
						abCotton.setManager_status("");
					}

					WaterAnalysisReportF007 ss = waterAnalysisReportF007Repo.save(abCotton);

					if (ss.getMicroDetails() != null) {
						for (WaterAnalysisReportMicroF007 chemist : ss.getMicroDetails()) {

							chemist.setWater_id(ss.getWater_id());
							waterAnalysisReportMicroF007Repo.save(chemist);
						}
					}

					waterAnalysisReportF007Repo.save(abCotton);

					// HISTORY AUDIT

					WaterAnalysisReportF007History rejectionReportHistory = new WaterAnalysisReportF007History();

					rejectionReportHistory.setFormatNo(listObj.getFormatNo());
					rejectionReportHistory.setRevisionNo(listObj.getRevisionNo());
					rejectionReportHistory.setRefSopNo(listObj.getRefSopNo());
					rejectionReportHistory.setAr_no(listObj.getAr_no());
					rejectionReportHistory.setDate(listObj.getDate());

					rejectionReportHistory.setChemist_saved_by(listObj.getChemist_saved_by());
					rejectionReportHistory.setChemist_saved_id(listObj.getChemist_saved_id());
					rejectionReportHistory.setChemist_saved_on(listObj.getChemist_saved_on());

					rejectionReportHistory.setChemist_submit_by(listObj.getChemist_submit_by());
					rejectionReportHistory.setChemist_submit_id(listObj.getChemist_submit_id());
					rejectionReportHistory.setChemist_submit_on(listObj.getChemist_submit_on());
					rejectionReportHistory.setChemist_status(listObj.getChemist_status());
					rejectionReportHistory.setChemist_sign(listObj.getChemist_sign());

					rejectionReportHistory.setMicro_saved_by(listObj.getMicro_saved_by());
					rejectionReportHistory.setMicro_saved_id(listObj.getMicro_saved_id());
					rejectionReportHistory.setMicro_saved_on(listObj.getMicro_saved_on());
					rejectionReportHistory.setMicro_submit_by(listObj.getManager_submit_by());
					rejectionReportHistory.setMicro_submit_by(listObj.getMicro_submit_by());
					rejectionReportHistory.setMicro_submit_id(listObj.getMicro_submit_id());
					rejectionReportHistory.setMicro_status(listObj.getMicro_status());
					rejectionReportHistory.setMicro_sign(listObj.getMicro_sign());

					rejectionReportHistory.setQa_exe_submit_by(listObj.getQa_exe_submit_by());
					rejectionReportHistory.setQa_exe_submit_id(listObj.getQa_exe_submit_id());
					rejectionReportHistory.setQa_exe_submit_on(listObj.getQa_exe_submit_on());
					rejectionReportHistory.setQa_exe_status(listObj.getQa_exe_status());
					rejectionReportHistory.setQa_exe_sign(listObj.getQa_exe_sign());

					rejectionReportHistory.setManager_submit_by(listObj.getManager_submit_by());
					rejectionReportHistory.setManager_submit_id(listObj.getManager_submit_id());
					rejectionReportHistory.setManager_submit_on(listObj.getManager_submit_on());
					rejectionReportHistory.setManager_sign(listObj.getManager_sign());
					rejectionReportHistory.setManager_status(listObj.getManager_status());

					// VERSION

					String date1 = rejectionReportHistory.getDate();

					int version = waterAnalysisReportF007HistoryRepo.getMaximumVersion(date1).map(temp -> temp + 1)
							.orElse(1);

					rejectionReportHistory.setVersion(version);

					waterAnalysisReportF007HistoryRepo.save(rejectionReportHistory);

					List<WaterAnalysisReportMicroF007> historyMapList = listObj.getMicroDetails();

					for (WaterAnalysisReportMicroF007 obj : historyMapList) {
						WaterAnalysisReportMicroF007History objHistory = new WaterAnalysisReportMicroF007History();

						BeanUtils.copyProperties(obj, objHistory);
						objHistory.setHis_water_id(rejectionReportHistory.getHis_water_id());
						waterAnalysisReportMicroF007HistoryRepo.save(objHistory);

					}

					// MAIL

					try {

						if (listObj.getQa_exe_status() != null) {

							if (listObj.getQa_exe_status().equals("QA_EXE_APPROVED")) {

								qcMailFunction.sendEmailToMicroManagerF007(listObj);

							}

						}

					} catch (Exception ex) {
						return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
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

			log.error(" **** Unable to Save Water Analysis Report Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Water Analysis Report Details!"),
					HttpStatus.BAD_REQUEST);
		}
//					return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(abCotton, HttpStatus.CREATED);
	}

	// GET WATER ANALYSIS REPORT

	public ResponseEntity<?> getWaterAnalysisReport(String date) {
		try {

			List<WaterAnalysisReportF007> list = waterAnalysisReportF007Repo.GetAbCottonF26(date);

			if (list == null) {

//						list = new ArrayList<MetalDetectorCheckListF020>();

				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> WaterAnalysisPrintApi(String date) {
		try {

			List<WaterAnalysisReportF007> list = waterAnalysisReportF007Repo.PrintApi(date);

			if (list == null) {

//						list = new ArrayList<MetalDetectorCheckListF020>();

				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	// SUMMARY

	public ResponseEntity<?> WaterAnalysisSummary(HttpServletRequest http) {

		List<WaterAnalysisReportF007> details = null;

		List<WaterAnalysisReportF007> chemistFilteredReports = new ArrayList<>();
		List<WaterAnalysisReportF007> microFilteredReports = new ArrayList<>();

		try {

			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_CHEMIST")) {

				details = waterAnalysisReportF007Repo.chemistSummary();

				for (WaterAnalysisReportF007 report : details) {
					report.setMicroDetails(null);
				}
//				return new ResponseEntity<>(details, HttpStatus.OK);

			}

			else if (userRole.equals("ROLE_MICROBIOLOGIST")) {

				details = waterAnalysisReportF007Repo.microSummary();

				for (WaterAnalysisReportF007 report : details) {
					report.setChemistDetails(null);
				}
//				return new ResponseEntity<>(details, HttpStatus.OK);

			}

			else if (userRole.equals("QA_EXECUTIVE")) {

				details = waterAnalysisReportF007Repo.executiveSummary();

				for (WaterAnalysisReportF007 report : details) {
					report.setMicroDetails(null);
				}

//				return new ResponseEntity<>(details, HttpStatus.OK);
			}

			else if (userRole.equals("QC_MANAGER") || userRole.equals("QA_MANAGER")) {

				details = waterAnalysisReportF007Repo.Summary();

			}
//			else if (userRole.equalsIgnoreCase("QC_MANAGER") || userRole.equalsIgnoreCase("QA_MANAGER")) {
//
//				details = waterAnalysisReportF007Repo.exeManagerSummary();
//
//				Map<String, List<WaterAnalysisReportF007>> response = new HashMap<>();
//
//				for (WaterAnalysisReportF007 report : details) {
//
//					String cheSta = report.getChemist_status();
//					String micSta = report.getMicro_status();
//					String exeStatus = report.getQa_exe_status();
//
////					Map<String, List<WaterAnalysisReportF007>> response = new HashMap<>();
//
//					if (cheSta.equals("CHEMIST_APPROVED") && exeStatus.equals("QA_EXE_APPROVED")) {
//
////						report.setMicroDetails(null);
//						chemistFilteredReports.add(report);
//
////						response.put("chemistFilteredReports", chemistFilteredReports);
//
//					}
//
//					if (micSta.equals("MICROBIOLOGIST_APPROVED")) {
//
////						report.setChemistDetails(null);
//						microFilteredReports.add(report);
//
////						response.put("microFilteredReports", microFilteredReports);
//
//					}
//
//					response.put("chemistFilteredReports", chemistFilteredReports);
//					response.put("microFilteredReports", microFilteredReports);
//
//				}
//
//				return new ResponseEntity<>(response, HttpStatus.OK);
//			}

//			else {
//				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
//						HttpStatus.FORBIDDEN);
//			}

			// Return both lists as part of the response
//			Map<String, List<WaterAnalysisReportF007>> response = new HashMap<>();
//			response.put("chemistFilteredReports", chemistFilteredReports);
//			response.put("microFilteredReports", microFilteredReports);

			return new ResponseEntity<>(details, HttpStatus.OK);

//			return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
//					HttpStatus.FORBIDDEN);

		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> WaterAnalysisManagerSummary(HttpServletRequest http) {

		List<WaterAnalysisReportF007> details = null;

		List<WaterAnalysisReportF007> chemistFilteredReports = new ArrayList<>();
		List<WaterAnalysisReportF007> microFilteredReports = new ArrayList<>();

		try {

			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

//			if (userRole.equals("ROLE_CHEMIST")) {
//
//				details = waterAnalysisReportF007Repo.chemistSummary();
//
//				for (WaterAnalysisReportF007 report : details) {
//					report.setMicroDetails(null);
//				}
//				return new ResponseEntity<>(details, HttpStatus.OK);
//
//			}
//
//			else if (userRole.equals("ROLE_MICROBIOLOGIST")) {
//				details = waterAnalysisReportF007Repo.microSummary();
//
//				for (WaterAnalysisReportF007 report : details) {
//					report.setChemistDetails(null);
//				}
//				return new ResponseEntity<>(details, HttpStatus.OK);
//
//			}
//
//			else if (userRole.equals("QA_EXECUTIVE")) {
//
//				details = waterAnalysisReportF007Repo.executiveSummary();
//
//				for (WaterAnalysisReportF007 report : details) {
//					report.setMicroDetails(null);
//				}
//
//				return new ResponseEntity<>(details, HttpStatus.OK);
//			}

			if (userRole.equalsIgnoreCase("QC_MANAGER") || userRole.equalsIgnoreCase("QA_MANAGER")) {

				details = waterAnalysisReportF007Repo.exeManagerSummary();

				Map<String, List<WaterAnalysisReportF007>> response = new HashMap<>();

				for (WaterAnalysisReportF007 report : details) {

					String cheSta = report.getChemist_status();
					String micSta = report.getMicro_status();
					String exeStatus = report.getQa_exe_status();

//					Map<String, List<WaterAnalysisReportF007>> response = new HashMap<>();

					if (cheSta.equals("CHEMIST_APPROVED") && exeStatus.equals("QA_EXE_APPROVED")) {

//						report.setMicroDetails(null);
						chemistFilteredReports.add(report);

//						response.put("chemistFilteredReports", chemistFilteredReports);

					}

					if (micSta.equals("MICROBIOLOGIST_APPROVED")) {

//						report.setChemistDetails(null);
						microFilteredReports.add(report);

//						response.put("microFilteredReports", microFilteredReports);

					}

					response.put("chemistFilteredReports", chemistFilteredReports);
					response.put("microFilteredReports", microFilteredReports);

				}

				return new ResponseEntity<>(response, HttpStatus.OK);
			}

//			else {
//				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
//						HttpStatus.FORBIDDEN);
//			}

			// Return both lists as part of the response
//			Map<String, List<WaterAnalysisReportF007>> response = new HashMap<>();
//			response.put("chemistFilteredReports", chemistFilteredReports);
//			response.put("microFilteredReports", microFilteredReports);

//			return new ResponseEntity<>(response, HttpStatus.OK);

			return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
					HttpStatus.FORBIDDEN);

		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

	// APPROVE OR REJECT

	public ResponseEntity<?> ApproveOrRejectF007(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		WaterAnalysisReportF007 object = new WaterAnalysisReportF007();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = waterAnalysisReportF007Repo.findFormById(approvalResponse.getId());

			WaterAnalysisReportF007History objHistory = new WaterAnalysisReportF007History();

			String cheStatus = object.getChemist_status();
			String qaExeStatus = object.getQa_exe_status();
			String qcStatus = object.getManager_status();

			if (userRole.equalsIgnoreCase("QA_EXECUTIVE")) {

				object.setQa_exe_submit_on(date);
				object.setQa_exe_submit_by(userName);
				object.setQa_exe_submit_id(userId);
				object.setQa_exe_sign(userName);

				objHistory = waterAnalysisReportF007HistoryRepo.fetchLastSubmittedRecord(object.getDate());

				objHistory.setQa_exe_submit_on(date);
				objHistory.setQa_exe_submit_by(userName);
				objHistory.setQa_exe_submit_id(userId);
				objHistory.setQa_exe_sign(userName);

				if (cheStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
						&& qaExeStatus.equalsIgnoreCase(AppConstantsQc.QAExeWaiting)) {

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setQa_exe_status(AppConstantsQc.QAExeApprove);
						objHistory.setQa_exe_status(AppConstantsQc.QAExeApprove);

						if (object.getMicro_status() != null) {

							if (object.getMicro_status().equals("MICROBIOLOGIST_APPROVED"))

							{
								object.setManager_status(AppConstantsQc.ManWaiting);

							} else {
								object.setManager_status("");

							}

						} else {

							if (object.getMicro_status().equals("MICROBIOLOGIST_APPROVED"))

							{
								object.setManager_status(AppConstantsQc.ManWaiting);

							} else {
								object.setManager_status("");

							}

						}

						// HISTORY

						if (objHistory.getMicro_status() != null) {

							if (objHistory.getMicro_status().equals("MICROBIOLOGIST_APPROVED"))

							{
								objHistory.setManager_status(AppConstantsQc.ManWaiting);

							} else {
								objHistory.setManager_status("");

							}

						}

						else {
							objHistory.setManager_status("");

						}

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						object.setQa_exe_status(AppConstantsQc.QAExeReject);
						object.setReason(approvalResponse.getRemarks());
						objHistory.setQa_exe_status(AppConstantsQc.QAExeReject);
						object.setReason(approvalResponse.getRemarks());

						object.setManager_status("");
						objHistory.setManager_status("");
					}

					waterAnalysisReportF007Repo.save(object);

					waterAnalysisReportF007HistoryRepo.save(objHistory);

					try {

						if (object.getQa_exe_status() != null && object.getMicro_status() != null) {

							if (object.getQa_exe_status().equals("QA_EXE_APPROVED")
									&& object.getMicro_status().equals("MICROBIOLOGIST_APPROVED")) {
								qcMailFunction.sendEmailToQaExeToManagerF007(object);
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

			else if (userRole.equalsIgnoreCase("QC_MANAGER") || userRole.equalsIgnoreCase("QA_MANAGER")) {

				if (qaExeStatus.equalsIgnoreCase(AppConstantsQc.QAExeApprove)
						&& qcStatus.equalsIgnoreCase(AppConstantsQc.ManWaiting)) {

					object.setManager_submit_on(date);
					object.setManager_submit_by(userName);
					object.setManager_submit_id(userId);
					object.setManager_sign(userName);

					objHistory = waterAnalysisReportF007HistoryRepo.fetchLastSubmittedRecord(object.getDate());

					objHistory.setManager_submit_on(date);
					objHistory.setManager_submit_by(userName);
					objHistory.setManager_submit_id(userId);
					objHistory.setManager_sign(userName);

					if (approvalResponse.getStatus().equals("Approve")) {

						if (userRole.equalsIgnoreCase("QC_MANAGER")) {

							object.setManager_status(AppConstantsQc.QCApprove);
							objHistory.setManager_status(AppConstantsQc.QCApprove);

						} else if (userRole.equalsIgnoreCase("QA_MANAGER")) {
							object.setManager_status(AppConstantsQc.QAApprove);
							objHistory.setManager_status(AppConstantsQc.QAApprove);
						}
					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						if (userRole.equalsIgnoreCase("QC_MANAGER")) {
							object.setManager_status(AppConstantsQc.QCRejected);
							object.setReason(approvalResponse.getRemarks());

							objHistory.setManager_status(AppConstantsQc.QCRejected);
							objHistory.setReason(approvalResponse.getRemarks());

						} else if (userRole.equalsIgnoreCase("QA_MANAGER")) {
							object.setManager_status(AppConstantsQc.QAReject);
							object.setReason(approvalResponse.getRemarks());
							objHistory.setManager_status(AppConstantsQc.QAReject);
							objHistory.setReason(approvalResponse.getRemarks());
						}
					}

					waterAnalysisReportF007Repo.save(object);

					waterAnalysisReportF007HistoryRepo.save(objHistory);

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

	// ======= DIGITAL COLONY COUNTER CALIBRATION REPORT

	public ResponseEntity<?> SaveDigitalColonyF030(DigitalColonyCounterF030 abCotton, HttpServletRequest http) {

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		DigitalColonyCounterF030 listObj = null;

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getId() != null) {

				Long id = abCotton.getId();

				listObj = digitalColonyCounterF030Repo.findFormById(id);

//				String[] IgnoreProps = { "id", "createdBy", "createdAt", "chemist_status", "chemist_saved_on",
//						"chemist_saved_by", "chemist_saved_id", "chemist_submit_on", "chemist_submit_by",
//						"chemist_submit_id", "chemist_sign", "qa_exe_status", "qa_exe_submit_on", "qa_exe_submit_by",
//						"qa_exe_submit_id", "qa_exe_sign", "manager_status", "manager_submit_on", "manager_submit_by",
//						"manager_submit_id", "manager_sign" };

				String[] IgnoreProps = { "id", "createdBy", "createdAt",
						// Micro-related fields
						"micro_status", "micro_saved_on", "micro_saved_by", "micro_saved_id", "micro_submit_on",
						"micro_submit_by", "micro_submit_id", "micro_sign",
						// Micro Designee-related fields
						"micro_designee_status", "micro_designee_saved_on", "micro_designee_saved_by",
						"micro_designee_saved_id", "micro_designee_submit_on", "micro_designee_submit_by",
						"micro_designee_submit_id", "micro_designee_sign" };

				BeanUtils.copyProperties(abCotton, listObj, IgnoreProps);

				if (role.equals("ROLE_MICROBIOLOGIST")) {

					listObj.setMicro_status(userName);
					listObj.setMicro_saved_on(date);
					listObj.setMicro_saved_id(userId);
					listObj.setMicro_saved_by(userName);
					listObj.setMicro_status(AppConstantsQc.microBiologistSave);
					listObj.setMicro_designee_status("");

					digitalColonyCounterF030Repo.save(listObj);

				} else {
					return new ResponseEntity(new ApiResponse(false, role + " No access to save details."),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				if (role.equals("ROLE_MICROBIOLOGIST")) {

					listObj = abCotton;

					listObj.setMicro_status(userName);
					listObj.setMicro_saved_on(date);
					listObj.setMicro_saved_id(userId);
					listObj.setMicro_saved_by(userName);
					listObj.setMicro_status(AppConstantsQc.microBiologistSave);
					listObj.setMicro_designee_status("");

					digitalColonyCounterF030Repo.save(listObj);

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
//				return new ResponseEntity(new ApiResponse(true, "Saved Sucessfully"), HttpStatus.OK);

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

	// SUMBIT

	public ResponseEntity<?> SubmitDigitalColonyF030(DigitalColonyCounterF030 abCotton, HttpServletRequest http) {

		SCAUtil scaUtil = new SCAUtil();

		if (abCotton == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields !"), HttpStatus.BAD_REQUEST);
		}

		Long id = abCotton.getId();

		DigitalColonyCounterF030 checkObj = new DigitalColonyCounterF030();

		try {
			String value = "";

			String createdBy = "";
			Date createdAt = null;

			LocalDateTime currentDate = LocalDateTime.now();

			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (abCotton.getFormatNo() == null)
				value = "formatNo";
			if (abCotton.getRefSopNo() == null)
				value = "SopNumber";
			if (abCotton.getRevisionNo() == null)
				value = "revisionNo";
			if (abCotton.getFormatName() == null)
				value = "formatName";
			if (abCotton.getDate() == null)
				value = "date";

			if (!"".equals(value)) {
				return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields ! " + value),
						HttpStatus.BAD_REQUEST);
			}

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = digitalColonyCounterF030Repo.findFormById(id);

				String[] IgnoreProps = { "id", "createdBy", "createdAt",
						// Micro-related fields
						"micro_status", "micro_saved_on", "micro_saved_by", "micro_saved_id", "micro_submit_on",
						"micro_submit_by", "micro_submit_id", "micro_sign",
						// Micro Designee-related fields
						"micro_designee_status", "micro_designee_saved_on", "micro_designee_saved_by",
						"micro_designee_saved_id", "micro_designee_submit_on", "micro_designee_submit_by",
						"micro_designee_submit_id", "micro_designee_sign" };

				BeanUtils.copyProperties(abCotton, checkObj, IgnoreProps);

				if (!checkObj.getMicro_status().equals(AppConstantsQc.microBiologistSubmitted)
						|| checkObj.getMicro_designee_status().equals(AppConstantsQc.MicroDesigneeReject)) {

					if (role.equals("ROLE_MICROBIOLOGIST")) {

						checkObj.setMicro_submit_by(userName);
						checkObj.setMicro_submit_on(date);
						checkObj.setMicro_submit_id(userId);
						checkObj.setMicro_status(AppConstantsQc.microBiologistSubmitted);
						checkObj.setMicro_sign(userName);
						checkObj.setMicro_designee_status(AppConstantsQc.ManWaiting);

						digitalColonyCounterF030Repo.save(checkObj);

						// HISTORY

						DigitalColonyCounterF030History rejectionReportHistory = new DigitalColonyCounterF030History();

						BeanUtils.copyProperties(checkObj, rejectionReportHistory);

						String month = rejectionReportHistory.getMonth();
						String year = rejectionReportHistory.getYear();
						String eq_id = rejectionReportHistory.getEquip_id();

						int version = digitalColonyCounterF030HistoryRepo.getMaximumVersion(month, year, eq_id)
								.map(temp -> temp + 1).orElse(1);

						rejectionReportHistory.setVersion(version);

						digitalColonyCounterF030HistoryRepo.save(rejectionReportHistory);

//		                    Mail logic

						try {

							qcMailFunction.sendEmailToQaExeF030(checkObj);
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

				if (!role.equals("ROLE_MICROBIOLOGIST")) {

					return new ResponseEntity(new ApiResponse(false, role + " No access to submit details."),
							HttpStatus.BAD_REQUEST);
				}
				checkObj = abCotton;

				checkObj.setMicro_submit_by(userName);
				checkObj.setMicro_submit_on(date);
				checkObj.setMicro_submit_id(userId);
				checkObj.setMicro_status(AppConstantsQc.microBiologistSubmitted);
				checkObj.setMicro_sign(userName);
				checkObj.setMicro_designee_status(AppConstantsQc.ManWaiting);

				digitalColonyCounterF030Repo.save(checkObj);

				DigitalColonyCounterF030History rejectionReportHistory = new DigitalColonyCounterF030History();

				BeanUtils.copyProperties(checkObj, rejectionReportHistory);

				String month = rejectionReportHistory.getMonth();
				String year = rejectionReportHistory.getYear();
				String eq_id = rejectionReportHistory.getEquip_id();

				int version = digitalColonyCounterF030HistoryRepo.getMaximumVersion(month, year, eq_id)
						.map(temp -> temp + 1).orElse(1);

				rejectionReportHistory.setVersion(version);

				digitalColonyCounterF030HistoryRepo.save(rejectionReportHistory);

//				Mail logic

				try {

					qcMailFunction.sendEmailToQaExeF030(checkObj);

				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
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

//				return new ResponseEntity(checkObj, HttpStatus.CREATED);

	}

	// PRINT

	public ResponseEntity<?> PrintApiF030(String month, String year, String eq_id) {
		try {

			List<DigitalColonyCounterF030> list = digitalColonyCounterF030Repo.PrintApiF016(month, year, eq_id);

			if (list == null) {

//						list = new ArrayList<MetalDetectorCheckListF020>();

				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getDigitalF030(String month, String year, String eq_id) {
		try {

			List<DigitalColonyCounterF030> list = digitalColonyCounterF030Repo.GetAbCottonF26(month, year, eq_id);

			if (list == null) {

//						list = new ArrayList<MetalDetectorCheckListF020>();

				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);

		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	// APPROVE OR REJECT

	public ResponseEntity<?> ApproveOrRejectF030(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		DigitalColonyCounterF030 object = new DigitalColonyCounterF030();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			object = digitalColonyCounterF030Repo.findFormById(approvalResponse.getId());

			DigitalColonyCounterF030History objHistory = new DigitalColonyCounterF030History();

			String microStatus = object.getMicro_status();
			String microDesigneeStatus = object.getMicro_designee_status();

			if (userRole.equalsIgnoreCase("MICRO_DESIGNEE")) {

				if (microStatus.equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted)
						&& microDesigneeStatus.equalsIgnoreCase(AppConstantsQc.ManWaiting)) {

					object.setMicro_designee_submit_on(date);
					object.setMicro_designee_submit_by(userName);
					object.setMicro_designee_submit_id(userId);
					object.setMicro_designee_sign(userName);

					String month = object.getMonth();
					String year = object.getYear();
					String eq_id = object.getEquip_id();

					objHistory = digitalColonyCounterF030HistoryRepo.fetchLastSubmittedRecord(month, year, eq_id);

					objHistory.setMicro_designee_submit_on(date);
					objHistory.setMicro_designee_submit_by(userName);
					objHistory.setMicro_designee_submit_id(userId);
					objHistory.setMicro_designee_sign(userName);

					if (approvalResponse.getStatus().equals("Approve")) {

						object.setMicro_designee_status(AppConstantsQc.MicroDesigneeApprove);
						objHistory.setMicro_designee_status(AppConstantsQc.MicroDesigneeApprove);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						object.setMicro_designee_status(AppConstantsQc.MicroDesigneeReject);
						object.setReason(approvalResponse.getRemarks());

						objHistory.setMicro_designee_status(AppConstantsQc.MicroDesigneeReject);
						objHistory.setReason(approvalResponse.getRemarks());

					}

					digitalColonyCounterF030Repo.save(object);

					digitalColonyCounterF030HistoryRepo.save(objHistory);

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

	// SUMMARY

	public ResponseEntity<?> DigitalSummary(HttpServletRequest http) {

		List<DigitalColonyCounterF030> details = null;

		try {

			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_MICROBIOLOGIST")) {

				details = digitalColonyCounterF030Repo.microSummary();
			}

			else if (userRole.equalsIgnoreCase("MICRO_DESIGNEE")) {

				details = digitalColonyCounterF030Repo.microDesigneeSummary();
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

	public ResponseEntity<?> getProductF26G() {

		List<String> orderProductResponse = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();

		try {
			orderProductResponse = coaMoistureF26GRepo.getProductF26G();

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

	public ResponseEntity<?> getCustomer() {

		List<String> orderProductResponse = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();

		try {
			orderProductResponse = coaMoistureF26GRepo.getCustomerF26G();

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

	// COMMON BASED ON FORM NO

	public ResponseEntity<?> ProductF26(String customer, String formNo) {

		List<String> orderProductResponse = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();

		try {

			if (formNo.equals("F26A")) {
				orderProductResponse = coaCottonPadsF2A6Repo.ProductF26A(customer);
			} else if (formNo.equals("F26B")) {
				orderProductResponse = coaCottonBallsF26BRepo.ProductF26B(customer);
			} else if (formNo.equals("F26C")) {
				orderProductResponse = coaCottonWoolRollF26CRepo.ProductF26C(customer);
			} else if (formNo.equals("F26D")) {
				orderProductResponse = coaCottonWoolPleatF26DRepo.ProductF26D(customer);
			} else if (formNo.equals("F26E")) {
				orderProductResponse = coaCottonRollGoodsF26ERepo.ProductF26E(customer);
			} else if (formNo.equals("F26F")) {
				orderProductResponse = coaInfusedCottonPadsF26FRepo.ProductF26F(customer);
			} else if (formNo.equals("F26G")) {
				orderProductResponse = coaMoistureF26GRepo.ProductF26G(customer);
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

	// AMC

	public ResponseEntity<?> ProductDescription() {

		List<String> orderProductResponse = new ArrayList<>();
		List<IdAndValuePair> responseList = new ArrayList<>();

		try {
			orderProductResponse = coaAbCottonF26Repo.getProductDescription();

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
			log.error("Error fetching Product Description : " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to get Product Description "),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(responseList, HttpStatus.OK);
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
