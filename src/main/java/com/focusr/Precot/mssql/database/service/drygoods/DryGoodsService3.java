package com.focusr.Precot.mssql.database.service.drygoods;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.SortedMap;
import java.util.TreeMap;

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

import com.focusr.Precot.mssql.database.model.UserImageDetails;
import com.focusr.Precot.mssql.database.model.drygoods.BaleConsumptionReportDryGoodsF001;
import com.focusr.Precot.mssql.database.model.drygoods.BallpleateAndWoolRollFinishedGoodsTransferRecordF011;
import com.focusr.Precot.mssql.database.model.drygoods.DailyProductionCottonBallsF003;
import com.focusr.Precot.mssql.database.model.drygoods.DailyProductionDetailsPleateAndWoolRollF006;
import com.focusr.Precot.mssql.database.model.drygoods.FinishedGoodsTransferRecordLineF011;
import com.focusr.Precot.mssql.database.model.drygoods.SliverMakingLines;
import com.focusr.Precot.mssql.database.model.drygoods.SliverReceiptDetailsF003;
import com.focusr.Precot.mssql.database.model.drygoods.audit.BaleConsumptionReportDryGoodsHistoryF001;
import com.focusr.Precot.mssql.database.model.drygoods.audit.BallpleateAndWoolRollFinishedGoodsTransferRecordHistoryF011;
import com.focusr.Precot.mssql.database.model.drygoods.audit.DailyProductionCottonBallsHistoryF003;
import com.focusr.Precot.mssql.database.model.drygoods.audit.DailyProductionDetailsPleateAndWoolRollHistoryF006;
import com.focusr.Precot.mssql.database.model.drygoods.audit.FinishedGoodsTransferRecordLineHistoryF011;
import com.focusr.Precot.mssql.database.model.drygoods.audit.SliverReceiptDetailsHistoryF003;
import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupDetailsJetlaceAndDryerF003;
import com.focusr.Precot.mssql.database.repository.UserImageDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR001GoodsProductionDetailsRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BaleConsumptionReportDryGoodsF001Repository;
import com.focusr.Precot.mssql.database.repository.drygoods.BallpleateAndWoolRollFinishedGoodsTransferRecordF011Repository;
import com.focusr.Precot.mssql.database.repository.drygoods.DailyProductionCottonBallsF003Repository;
import com.focusr.Precot.mssql.database.repository.drygoods.DailyProductionDetailsPleateAndWoolRollF006Repository;
import com.focusr.Precot.mssql.database.repository.drygoods.DryGoodsLayDownGenerationRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.FinishedGoodsTransferRecordLineF011Repository;
import com.focusr.Precot.mssql.database.repository.drygoods.LayDownBaleNoMappingRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.SliverReceiptDetailsF003Repository;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.BaleConsumptionReportDryGoodsHistoryF001Repository;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.BallpleateAndWoolRollFinishedGoodsTransferRecordHistoryF011Repository;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.DailyProductionCottonBallsHistoryF003Repository;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.DailyProductionDetailsPleateAndWoolRollHistoryF006Repository;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.FinishedGoodsTransferRecordLineHistoryF011Repository;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.SliverReceiptDetailsF003HistoryRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.payload.padpunching.PackingDetailsResponse;
import com.focusr.Precot.payload.spulance.SplOrderDetailsResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.IdAndValuePair;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.drygoods.AppConstantDryGoods;
import com.focusr.Precot.util.drygoods.DryGoodsMailFunction;
import com.focusr.Precot.util.splunance.AppConstantsSplunance;

@Service
public class DryGoodsService3 {

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserImageDetailsRepository imageRepository;
	
	@Autowired
	private BMR001GoodsProductionDetailsRepository productionDetailsRepository;

	@Autowired
	BaleConsumptionReportDryGoodsF001Repository baleconsumptionreportdrygoodsf001repository;
	
	@Autowired
	BaleConsumptionReportDryGoodsHistoryF001Repository baleconsumptionreportdrygoodshistoryf001repository;
	
	@Autowired
	DailyProductionCottonBallsF003Repository dailyproductioncottonballsf003repository;
	
	@Autowired
	DailyProductionCottonBallsHistoryF003Repository dailyproductioncottonballshistoryf003repository;
	
	@Autowired
	SliverReceiptDetailsF003Repository sliverreceiptdetailsf003repository;
	
	@Autowired
	SliverReceiptDetailsF003HistoryRepository sliverreceiptdetailsf003historyrepository;
	
	@Autowired
	BallpleateAndWoolRollFinishedGoodsTransferRecordF011Repository ballpleateandwoolrollfinishedgoodstransferrecordf011repository;
	
	@Autowired
	BallpleateAndWoolRollFinishedGoodsTransferRecordHistoryF011Repository ballpleateandwoolrollfinishedgoodstransferrecordhistoryf011repository;
	
	@Autowired
	DailyProductionDetailsPleateAndWoolRollF006Repository dailyproductiondetailspleateandwoolrollf006repository;
	@Autowired
	DailyProductionDetailsPleateAndWoolRollHistoryF006Repository dailyproductiondetailspleateandwoolrollhistoryf006repository;
	@Autowired
	FinishedGoodsTransferRecordLineF011Repository finishedgoodstransferrecordlinef011repository;
	
	@Autowired
	private LayDownBaleNoMappingRepository laydownMappingRepository;
	
	@Autowired
	private DryGoodsMailFunction drygoodsmailfunction;
	
	@Autowired
	FinishedGoodsTransferRecordLineHistoryF011Repository finishedgoodstransferrecordlinehistoryf011repository;
	Logger logger = LoggerFactory.getLogger(DryGoodsService3.class);

	SCAUtil sca = new SCAUtil();
	
	//*****************************************F001 PDE*************************************************************************//
	
	public ResponseEntity<?> getBaleReport(String date, String shift, String laydownNumber) {
	    List<Map<String, Object>> responseList = new ArrayList<>();

	    try {
	        // Fetch bale numbers
	        List<String> baleNumList = laydownMappingRepository.baleNumListByLaydownNumber(laydownNumber);

	        // Log bale numbers for debugging
	        System.out.println("Bale Count: " + baleNumList.size());
	        for (String temp : baleNumList) {
	            System.out.println("Bale Number: [" + temp + "]");
	        }

	        // Validate bale number list
	        if (baleNumList == null || baleNumList.isEmpty()) {
	            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.OK);
	        }

	        // Fetch report data
	        System.out.println("Fetching details for Date: " + date + ", Shift: " + shift);
//	        List<Object[]> orderResponse = baleconsumptionreportdrygoodsf001repository.fetchBaleDetails(date, shift, baleNumList);
	        List<Object[]> orderResponse = baleconsumptionreportdrygoodsf001repository.fetchBaleDetails(baleNumList);

	        // Log and process results
	        System.out.println("Records fetched: " + orderResponse.size());
	        for (Object[] record : orderResponse) {
	            Map<String, Object> map = new HashMap<>();
	            map.put("BaleNo", record[0]);
	            map.put("NetWt", record[1]);
	            map.put("BatchNo", record[2]);
	            responseList.add(map);
	        }

	    } catch (Exception ex) {
	        String msg = ex.getMessage();
	        logger.error("Unable to get BaleConsumption Report: " + msg, ex);

	        return new ResponseEntity<>(new ApiResponse(false, "Failed to get BaleConsumption Report: " + msg),
	                HttpStatus.BAD_REQUEST);
	    }

	    return new ResponseEntity<>(responseList, HttpStatus.OK);
	}

	
	//----------------------PDE F006--------------------------------
	public ResponseEntity<?> getHeaderDetails(String order_no) {

	    List<Map<String, Object>> responseList = new ArrayList<>();

	    try {
	        List<Object[]> orderResponse = baleconsumptionreportdrygoodsf001repository.fetchheaderdetailsForF006(order_no);

	        // Convert each Object[] to a Map<String, Object>
	        for (Object[] record : orderResponse) {
	            Map<String, Object> map = new HashMap<>();
//	            map.put("customerName", record[0]);
//	            map.put("brand", record[1]);
//	            map.put("bagByBox", record[2]);
//	            map.put("grams", record[3]);
	            
	            map.put("brand", record[0]);
	            map.put("material", record[1]);
	            map.put("bagByBox", record[2]);
	            map.put("grams", record[3]);
	          
	            responseList.add(map);
	        }

	    } catch (Exception ex) {
	        String msg = ex.getMessage();
	        logger.error("Unable to get Production Report: " + msg);

	        return new ResponseEntity<>(new ApiResponse(false, "Failed to get Production Report: " + msg),
	                HttpStatus.BAD_REQUEST);
	    }

	    return new ResponseEntity<>(responseList, HttpStatus.OK);
	}
	
	public ResponseEntity<?> getFleecetDetails(String date, String shift, String order_no) {

	    List<Map<String, Object>> responseList = new ArrayList<>();

	    double totalNetWt = 0;
	    
	    try {
	        List<Object[]> orderResponse = baleconsumptionreportdrygoodsf001repository.fetchfleecetReceiptForF006(date, shift, order_no);

	        // Convert each Object[] to a Map<String, Object>
	        for (Object[] record : orderResponse) {
//	            Map<String, Object> map = new HashMap<>();
	        	
	        	SortedMap<String, Object> map = new TreeMap<>();
	        	
	            map.put("rollNo", record[0]);
	            map.put("net_wt", record[1]);
	            map.put("gsm", record[2]);
	            map.put("width_in_mm", record[3]);
	          
	            if (record[1] != null) {
	                totalNetWt += ((Number) record[1]).doubleValue();
	            }

	            responseList.add(map);
	        }
	        
	        SortedMap<String, Object> totalMap = new TreeMap<>();
	        totalMap.put("rollNo", "TOTAL");
	        totalMap.put("net_wt", totalNetWt);
	        totalMap.put("gsm", null);
	        totalMap.put("width_in_mm", null);

	        responseList.add(totalMap);

	    } catch (Exception ex) {
	        String msg = ex.getMessage();
	        logger.error("Unable to get Production Report: " + msg);

	        return new ResponseEntity<>(new ApiResponse(false, "Failed to get Production Report: " + msg),
	                HttpStatus.BAD_REQUEST);
	    }

	    return new ResponseEntity<>(responseList, HttpStatus.OK);
	}

	public ResponseEntity<?> fetchStoppageDetailsF006(String date, String shift, String order_no,String machine_name) {
	    List<Map<String, Object>> stoppageResponse = new ArrayList<>();

	    try {
	        List<Object[]> results = baleconsumptionreportdrygoodsf001repository.fetchStoppagedetailsForF006(date, shift, order_no,machine_name);

	        for (Object[] result : results) {
	            Map<String, Object> rowMap = new HashMap<>();
	            rowMap.put("SCAUSE", result[0]);
	            rowMap.put("FTime", result[1]);
	            rowMap.put("TTime", result[2]);
	            rowMap.put("TotHrs", result[3]);
	            rowMap.put("Remarks", result[4]);
	            stoppageResponse.add(rowMap);
	        }

	    } catch (Exception ex) {
	        String msg = ex.getMessage();
	        logger.error("Unable to get stoppage Details: " + msg);
	        return new ResponseEntity<>(new ApiResponse(false, "Failed to get stoppage details: " + msg), HttpStatus.BAD_REQUEST);
	    }

	    return new ResponseEntity<>(stoppageResponse, HttpStatus.OK);
	}
	//------------------F001--------------------------------------------------------------------------------------//
	// SUBMIT BALE CONSUMPTION REPORT DRYGOODS F001
	public ResponseEntity<?> submitBaleConsumptionReportF001(BaleConsumptionReportDryGoodsF001 baleConsumptionReport, HttpServletRequest http) {

	    BaleConsumptionReportDryGoodsF001 report = new BaleConsumptionReportDryGoodsF001();
	    Long id = baleConsumptionReport.getBale_report_id();

	    try {
	        String value = "";
	        String userRole = getUserRole();
	        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	        String userName = userRepository.getUserName(userId);
	        LocalDateTime currentDate = LocalDateTime.now();
	        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

	        // Validate mandatory fields
	        if (baleConsumptionReport.getFormatNo() == null) value = "formatNo";
	        if (baleConsumptionReport.getSopNumber() == null) value = "SopNumber";
	        if (baleConsumptionReport.getRevisionNo() == null) value = "revisionNo";
	        if (baleConsumptionReport.getFormatName() == null) value = "formatName";
	        if (baleConsumptionReport.getUnit() == null) value = "Unit";
	        if (baleConsumptionReport.getShift() == null) value = "Shift";
	        if (baleConsumptionReport.getDate() == null) value = "Date";
	        if (baleConsumptionReport.getLaydown_no() == null) value = "LaydownNo";

	        if (!"".equals(value)) {
	            return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields! " + value), HttpStatus.BAD_REQUEST);
	        }

	        if (id != null) {
	            report = baleconsumptionreportdrygoodsf001repository.findById(id).orElse(new BaleConsumptionReportDryGoodsF001());

	            String[] ignoreProps = { "bale_report_id", "createdBy", "createdAt", 
	                                     "operator_submitted_by", "operator_submitted_on", 
	                                     "operator_submitted_id", "operator_sign", "hod_status", 
	                                     "hod_save_on", "hod_save_by", "hod_save_id", "hod_submit_on", 
	                                     "hod_submit_by", "hod_submit_id", "hod_sign", "hod_mail_status",
	                                     "operator_signature_image", "hod_signature_image" };

	            BeanUtils.copyProperties(baleConsumptionReport, report, ignoreProps);

	            if (!report.getOperator_status().equals(AppConstants.operatorApprove)
	                    || report.getHod_status().equals(AppConstants.hodRejectedStatus)) {

	                if (userRole.equalsIgnoreCase(AppConstantDryGoods.operatorRole)) {
	                    // Update the status and submission details
	                    report.setOperator_status(AppConstants.operatorApprove);
	                    report.setOperator_submitted_by(userName);
	                    report.setOperator_submitted_on(date);
	                    report.setOperator_submitted_id(userId);
	                    report.setOperator_sign(userName);
	                    report.setHod_status(AppConstants.waitingStatus);
	                  

	                    // Fetch and set the operator's signature
	                    Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
	                    byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
	                    report.setOperator_signature_image(signature);

	                    baleconsumptionreportdrygoodsf001repository.save(report);

	                    // Create audit history record
	                    BaleConsumptionReportDryGoodsHistoryF001 historyRecord = new BaleConsumptionReportDryGoodsHistoryF001();
	                    BeanUtils.copyProperties(report, historyRecord);

	                    String date1 = historyRecord.getDate();
		                String shift = historyRecord.getShift();
		                String laydownNo = historyRecord.getLaydown_no();
	                    int version = baleconsumptionreportdrygoodshistoryf001repository.getMaximumVersion(date1,shift,laydownNo)
	                            .map(temp -> temp + 1).orElse(1);
	                    historyRecord.setVersion(version);

	                    baleconsumptionreportdrygoodshistoryf001repository.save(historyRecord);

	                    // Send notification email
	                    try {
	                    	drygoodsmailfunction.sendEmailToHodF001(report);
	                    } catch (Exception ex) {
	                        return new ResponseEntity<>(new ApiResponse(false, "Submitted but unable to send email!"), HttpStatus.OK);
	                    }

	                } else {
	                    return new ResponseEntity<>(new ApiResponse(false, "Unauthorized to submit Bale Consumption Report"), HttpStatus.FORBIDDEN);
	                }
	            } else {
	                return new ResponseEntity<>(new ApiResponse(false, "Invalid status."), HttpStatus.BAD_REQUEST);
	            }
	        } else {
	            if (!userRole.equals(AppConstantDryGoods.operatorRole)) {
	                return new ResponseEntity<>(new ApiResponse(false, userRole + " cannot submit details"), HttpStatus.BAD_REQUEST);
	            }

	            if (userRole.equalsIgnoreCase(AppConstantDryGoods.operatorRole)) {
	                baleConsumptionReport.setOperator_status(AppConstants.operatorApprove);
	                baleConsumptionReport.setOperator_submitted_by(userName);
	                baleConsumptionReport.setOperator_submitted_on(date);
	                baleConsumptionReport.setOperator_submitted_id(userId);
	                baleConsumptionReport.setOperator_sign(userName);
	                baleConsumptionReport.setHod_status(AppConstants.waitingStatus);
	               

	                // Fetch and set the operator's signature
	                Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
	                byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
	                baleConsumptionReport.setOperator_signature_image(signature);

	                baleconsumptionreportdrygoodsf001repository.save(baleConsumptionReport);

	                // Create audit history record
	                BaleConsumptionReportDryGoodsHistoryF001 historyRecord = new BaleConsumptionReportDryGoodsHistoryF001();
	                BeanUtils.copyProperties(baleConsumptionReport, historyRecord);

	                String date1 = historyRecord.getDate();
	                String shift = historyRecord.getShift();
	                String laydownNo = historyRecord.getLaydown_no();
	                int version = baleconsumptionreportdrygoodshistoryf001repository.getMaximumVersion(date1,shift,laydownNo)
	                        .map(temp -> temp + 1).orElse(1);
	                historyRecord.setVersion(version);

	                baleconsumptionreportdrygoodshistoryf001repository.save(historyRecord);

	                // Send notification email
	                try {
	                	drygoodsmailfunction.sendEmailToHodF001(baleConsumptionReport);
	                } catch (Exception ex) {
	                    return new ResponseEntity<>(new ApiResponse(false, "Submitted but unable to send email!"), HttpStatus.OK);
	                }
	            }
	        }
	    } catch (Exception ex) {
	        String msg = ex.getMessage();
	        logger.error("Unable to submit Bale Consumption Report: " + msg);
	        return new ResponseEntity<>(new ApiResponse(false, "Failed to submit Bale Consumption Report: " + msg), HttpStatus.BAD_REQUEST);
	    }

	    return new ResponseEntity<>(new ApiResponse(true, "Submitted successfully"), HttpStatus.OK);
	}
	
	//Summary
	// Summary for hod f001

		public ResponseEntity<?> summarybaleconsumptionreportF001() {
			String userRole = getUserRole();
			List<BaleConsumptionReportDryGoodsF001> processSetupDetails = new ArrayList<>();
			try {
				
			 if (userRole.equalsIgnoreCase(AppConstantsSplunance.hodRole)
						|| userRole.equalsIgnoreCase(AppConstantDryGoods.designeeRole)|| userRole.equalsIgnoreCase(AppConstantDryGoods.operatorRole)) {
					processSetupDetails = baleconsumptionreportdrygoodsf001repository.hodSummary();
				}
				else {
					return new ResponseEntity<>(userRole +" "+"Not authorised to access the form", HttpStatus.BAD_REQUEST);
				}

				return new ResponseEntity<>(processSetupDetails, HttpStatus.OK);
			} catch (Exception ex) {
				return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
						HttpStatus.BAD_REQUEST);
			}
		}
		

	//APPROVE/REJECT
	public ResponseEntity<?> approveRejectBaleConsumptionReport(ApproveResponse approvalResponse, HttpServletRequest http) {
	    BaleConsumptionReportDryGoodsF001 baleConsumptionReport = new BaleConsumptionReportDryGoodsF001();
	    Long id = approvalResponse.getId();

	    try {
	        // Retrieve user details and current date
	        String userRole = getUserRole();
	        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	        String userName = userRepository.getUserName(userId);
	        LocalDateTime currentDate = LocalDateTime.now();
	        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

	        // Find the bale consumption report by ID
	        baleConsumptionReport = baleconsumptionreportdrygoodsf001repository.fetchBaleDetailsbyid(id);

	        // Create a new history record
	        BaleConsumptionReportDryGoodsHistoryF001 history = new BaleConsumptionReportDryGoodsHistoryF001();

	        // Check current status
	        String currentStatus = baleConsumptionReport.getHod_status();

	        if (currentStatus.equalsIgnoreCase(AppConstantDryGoods.waitingstatus)) {
	            if (userRole.equalsIgnoreCase("ROLE_HOD")|| userRole.equalsIgnoreCase(AppConstantsSplunance.designeeRole)) {
	                if (approvalResponse.getStatus().equalsIgnoreCase("Approve")) {
	                    // Set approved status and other details
	                    baleConsumptionReport.setHod_status(AppConstantDryGoods.hodApprovedStatus);
	                    baleConsumptionReport.setHod_submit_on(date);
	                    baleConsumptionReport.setHod_submit_by(userName);
	                    baleConsumptionReport.setHod_submit_id(userId);
	                    

	                    Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
	                    byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
	                    baleConsumptionReport.setHod_signature_image(signature);
	                    baleConsumptionReport.setHod_sign(userName);

	                    // Save updated bale consumption report
	                    baleconsumptionreportdrygoodsf001repository.save(baleConsumptionReport);
	                    String date1 = baleConsumptionReport.getDate();
		                String shift = baleConsumptionReport.getShift();
		                String laydownNo = baleConsumptionReport.getLaydown_no();
	                    // Update history with the approval details
	                    history = baleconsumptionreportdrygoodshistoryf001repository.fetchLastSubmittedRecord(date1,shift,laydownNo);

	                    history.setHod_status(AppConstantDryGoods.hodApprovedStatus);
	                    history.setHod_submit_on(date);
	                    history.setHod_submit_by(userName);
	                    history.setHod_submit_id(userId);
	                    history.setHod_sign(userName);

	                    baleconsumptionreportdrygoodshistoryf001repository.save(history);

	                    return new ResponseEntity<>(new ApiResponse(true, "Report Approved Successfully"), HttpStatus.OK);

	                } else if (approvalResponse.getStatus().equalsIgnoreCase("Reject")) {
	                    // Set rejected status and reason
	                    String reason = approvalResponse.getRemarks();
	                    baleConsumptionReport.setHod_status(AppConstants.hodRejectedStatus);
	                    baleConsumptionReport.setHod_submit_on(date);
	                    baleConsumptionReport.setHod_submit_by(userName);
	                    baleConsumptionReport.setHod_submit_id(userId);
	                    baleConsumptionReport.setReason(reason);

	                    Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
	                    byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
	                    baleConsumptionReport.setHod_signature_image(signature);
	                    baleConsumptionReport.setHod_sign(userName);

	                    // Save updated bale consumption report
	                    baleconsumptionreportdrygoodsf001repository.save(baleConsumptionReport);

	                    String date1 = baleConsumptionReport.getDate();
		                String shift = baleConsumptionReport.getShift();
		                String laydownNo = baleConsumptionReport.getLaydown_no();
	                    // Update history with the rejection details
	                    history = baleconsumptionreportdrygoodshistoryf001repository.fetchLastSubmittedRecord(date1,shift,laydownNo);

	                    history.setHod_status(AppConstants.hodRejectedStatus);
	                    history.setHod_submit_on(date);
	                    history.setHod_submit_by(userName);
	                    history.setHod_submit_id(userId);
	                    history.setHod_sign(userName);

	                    baleconsumptionreportdrygoodshistoryf001repository.save(history);

	                    return new ResponseEntity<>(new ApiResponse(true, "Report Rejected Successfully"), HttpStatus.OK);

	                } else {
	                    return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
	                }

	            } else {
	                return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"), HttpStatus.BAD_REQUEST);
	            }

	        } else {
	            return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
	        }

	    } catch (Exception e) {
	        String msg = e.getMessage();
	        logger.error("Unable to Approve/Reject Bale Consumption Report: " + msg);
	        return new ResponseEntity<>(new ApiResponse(false, "Failed to Approve/Reject Bale Consumption Report " + msg), HttpStatus.BAD_REQUEST);
	    }
	}
//***************************************************************************F003 PDE***************************************************************************************************************
	//-----------------------------------------------------------------------------------------------------------------------------------//
	//Save F003
	public ResponseEntity<?> saveDailyProductionCottonBalls(DailyProductionCottonBallsF003 cottonBallsDetails, HttpServletRequest http) {

	    DailyProductionCottonBallsF003 cottonBalls = new DailyProductionCottonBallsF003();
	    Long id = cottonBallsDetails.getCottonballs_id();
	    try {
	        String value = "";
	        String createdBy = "";
	        Date createdAt = null;

	        String userRole = getUserRole();
	        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	        String userName = userRepository.getUserName(userId);
	        LocalDateTime currentDate = LocalDateTime.now();
	        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

	        // Mandatory fields validation
	        if (cottonBallsDetails.getFormatNo() == null)
	            value = "formatNo";
	        if (cottonBallsDetails.getSopNumber() == null)
	            value = "SopNumber";
	        if (cottonBallsDetails.getRevisionNo() == null)
	            value = "revisionNo";
	        if (cottonBallsDetails.getFormatName() == null)
	            value = "formatName";
	        if (cottonBallsDetails.getUnit() == null)
	            value = "Unit";
	        if (cottonBallsDetails.getDate() == null)
	            value = "Date";

	        if (!"".equals(value)) {
	            return new ResponseEntity<>(new ApiResponse(false, "Should Fill mandatory Fields! " + value),
	                    HttpStatus.BAD_REQUEST);
	        }

	        if (id != null) {
	            cottonBalls = dailyproductioncottonballsf003repository.findById(id).orElse(null);

	            if (cottonBalls != null) {
	                String[] ignoreProps = { "cottonballs_id", "createdBy", "createdAt",
	                		"operator_status", "operator_save_by", "operator_save_on", "operator_save_id", 
                            "operator_submitted_by", "operator_submitted_on", 
                            "operator_submitted_id", "operator_sign", "supervisor_status",
	                        "supervisor_save_on", "supervisor_save_by", "supervisor_save_id", "supervisor_submit_on",
	                        "supervisor_submit_by", "supervisor_submit_id", "supervisor_sign",
	                        "supervisior_mail_status", "hod_status", "hod_save_on", "hod_save_by", "hod_save_id",
	                        "hod_submit_on", "hod_submit_by", "hod_submit_id", "hod_sign", "hod_mail_status", 
	                        "supervisor_signature_image", "hod_signature_image"};

	                BeanUtils.copyProperties(cottonBallsDetails, cottonBalls, ignoreProps);

	                if (userRole.equalsIgnoreCase(AppConstantDryGoods.operatorRole)) {

	                	cottonBalls.setOperator_status(AppConstants.operatorSave);
	                	cottonBalls.setOperator_save_by(userName);
	                	cottonBalls.setOperator_save_on(date);
	                	cottonBalls.setOperator_save_id(userId);
	                	cottonBalls.setSupervisor_status(AppConstants.waitingStatus);
	                	cottonBalls.setHod_status("");

	                    dailyproductioncottonballsf003repository.save(cottonBalls);

	                    List<SliverReceiptDetailsF003> lineDetails = cottonBallsDetails.getSliverreceiptdetails();

	                    for (SliverReceiptDetailsF003 lineDetail : lineDetails) {
	                        Long cottonBallsId = cottonBalls.getCottonballs_id();
	                        lineDetail.setCottonballs_id(cottonBallsId);
	                        sliverreceiptdetailsf003repository.save(lineDetail);
	                    }
	                    cottonBalls.setSliverreceiptdetails(lineDetails);
	                    dailyproductioncottonballsf003repository.save(cottonBalls);

	                } else {
	                    return new ResponseEntity<>(new ApiResponse(false, "Unauthorized to save Cotton Balls Report"),
	                            HttpStatus.FORBIDDEN);
	                }
	            }

	        } else {
	            if (!userRole.equalsIgnoreCase(AppConstantDryGoods.operatorRole)) {
	                return new ResponseEntity<>(new ApiResponse(false,userRole + " Unauthorized to save Cotton Balls Report"),
	                        HttpStatus.BAD_REQUEST);
	            }
	            
	            BeanUtils.copyProperties(cottonBallsDetails, cottonBalls);
	            if (userRole.equalsIgnoreCase(AppConstantDryGoods.operatorRole)) {

	            	cottonBalls.setOperator_status(AppConstants.operatorSave);
                	cottonBalls.setOperator_save_by(userName);
                	cottonBalls.setOperator_save_on(date);
                	cottonBalls.setOperator_save_id(userId);
                	cottonBalls.setSupervisor_status(AppConstants.waitingStatus);
                	cottonBalls.setHod_status("");

                    dailyproductioncottonballsf003repository.save(cottonBalls);

                    List<SliverReceiptDetailsF003> lineDetails = cottonBallsDetails.getSliverreceiptdetails();

                    for (SliverReceiptDetailsF003 lineDetail : lineDetails) {
                        Long cottonBallsId = cottonBalls.getCottonballs_id();
                        lineDetail.setCottonballs_id(cottonBallsId);
                        sliverreceiptdetailsf003repository.save(lineDetail);
                    }
                    cottonBalls.setSliverreceiptdetails(lineDetails);
                    dailyproductioncottonballsf003repository.save(cottonBalls);
	        }
	        }
	    } catch (Exception ex) {
	        String msg = ex.getMessage();
	        logger.error("Unable to save Cotton Balls Report: " + msg);
	        return new ResponseEntity<>(new ApiResponse(false, "Failed to save Cotton Balls Report: " + msg),
	                HttpStatus.BAD_REQUEST);
	    }

	    return new ResponseEntity<>(cottonBalls, HttpStatus.CREATED);
	}

	    //Submit F003
	    
	public ResponseEntity<?> submitDailyProductionCottonBallsF003(DailyProductionCottonBallsF003 dailyproductioncottonballs, HttpServletRequest http) {

	    DailyProductionCottonBallsF003 report = new DailyProductionCottonBallsF003();
	    Long id = dailyproductioncottonballs.getCottonballs_id();

	    try {
	        String value = "";
	        String userRole = getUserRole();
	        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	        String userName = userRepository.getUserName(userId);
	        LocalDateTime currentDate = LocalDateTime.now();
	        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

	        // Validate mandatory fields
	        if (dailyproductioncottonballs.getFormatNo() == null) value = "formatNo";
	        if (dailyproductioncottonballs.getSopNumber() == null) value = "SopNumber";
	        if (dailyproductioncottonballs.getRevisionNo() == null) value = "revisionNo";
	        if (dailyproductioncottonballs.getFormatName() == null) value = "formatName";
	        if (dailyproductioncottonballs.getUnit() == null) value = "Unit";
	        if (dailyproductioncottonballs.getShift() == null) value = "Shift";
	        if (dailyproductioncottonballs.getDate() == null) value = "Date";

	        if (!"".equals(value)) {
	            return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields! " + value), HttpStatus.BAD_REQUEST);
	        }

	        if (id != null) {
	            report = dailyproductioncottonballsf003repository.findById(id).orElse(new DailyProductionCottonBallsF003());

	            String[] ignoreProps = { 
	                "cottonballs_id", "createdBy", "createdAt", "operator_status", 
	                "operator_save_by", "operator_save_on", "operator_save_id", 
	                "operator_submitted_by", "operator_submitted_on", 
	                "operator_submitted_id", "operator_sign", "supervisor_status",
	                "supervisor_save_on", "supervisor_save_by", "supervisor_save_id", 
	                "supervisor_submit_on", "supervisor_submit_by", 
	                "supervisor_submit_id", "supervisor_sign",
	                "supervisior_mail_status", "hod_status", "hod_save_on", 
	                "hod_save_by", "hod_save_id", "hod_submit_on", 
	                "hod_submit_by", "hod_submit_id", "hod_sign", 
	                "hod_mail_status", "supervisor_signature_image", 
	                "hod_signature_image"
	            };

	            BeanUtils.copyProperties(dailyproductioncottonballs, report, ignoreProps);

	            if (!report.getOperator_status().equals(AppConstants.operatorApprove)
	                    || report.getHod_status().equals(AppConstants.hodRejectedStatus)
	                    || report.getSupervisor_status().equals(AppConstants.supervisorRejectedStatus)) {

	                if (userRole.equalsIgnoreCase(AppConstantDryGoods.operatorRole)) {
	                    report.setOperator_status(AppConstants.operatorApprove);
	                    report.setOperator_submitted_by(userName);
	                    report.setOperator_submitted_on(date);
	                    report.setOperator_submitted_id(userId);
	                    report.setOperator_sign(userName);
	                    report.setSupervisor_status(AppConstants.waitingStatus);
	                    report.setHod_status("");

	                    // Fetch and set the operator's signature
	                    Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
	                    byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
	                    report.setOperator_signature_image(signature);

	                    dailyproductioncottonballsf003repository.save(report);
	                    List<SliverReceiptDetailsF003> lines = report.getSliverreceiptdetails();
		                if (lines != null && !lines.isEmpty()) {
	                    for (SliverReceiptDetailsF003 lineDetails : lines) {
	                        lineDetails.setCottonballs_id(report.getCottonballs_id());
	                        sliverreceiptdetailsf003repository.save(lineDetails);
	                    }
		                }

	                    // Create audit history record
	                    DailyProductionCottonBallsHistoryF003 historyRecord = new DailyProductionCottonBallsHistoryF003();
	                    BeanUtils.copyProperties(report, historyRecord);

	                    String date1 = report.getDate();
	                    String shift = report.getShift();
	                    String machineName = report.getMachine_name();
	                    String order_no = report.getOrder_no();
	                    int version = dailyproductioncottonballshistoryf003repository.getMaximumVersion(date1, shift, machineName, order_no)
	                            .map(temp -> temp + 1).orElse(1);
	                    historyRecord.setVersion(version);

	                    dailyproductioncottonballshistoryf003repository.save(historyRecord);
	                    for (SliverReceiptDetailsF003 line : lines) {
	                    	SliverReceiptDetailsHistoryF003 lineHistory = new SliverReceiptDetailsHistoryF003();
	                    	 BeanUtils.copyProperties(line, lineHistory);
	                    	 lineHistory.setCottonballs_id(historyRecord.getCottonballs_id());
	                        sliverreceiptdetailsf003historyrepository.save(lineHistory);
	                    }

	                    // Send notification email (uncomment and implement if needed)
	                     try {
	                         drygoodsmailfunction.sendEmailSupervisorF003(report);
	                     } catch (Exception ex) {
	                         return new ResponseEntity<>(new ApiResponse(false, "Submitted but unable to send email!"), HttpStatus.OK);
	                     }

	                } else {
	                    return new ResponseEntity<>(new ApiResponse(false, "Unauthorized to submit Bale Consumption Report"), HttpStatus.FORBIDDEN);
	                }
	            } else {
	                return new ResponseEntity<>(new ApiResponse(false, "Invalid status."), HttpStatus.BAD_REQUEST);
	            }

	        } else {
	            if (!userRole.equals(AppConstantDryGoods.operatorRole)) {
	                return new ResponseEntity<>(new ApiResponse(false, userRole + " cannot submit details"), HttpStatus.BAD_REQUEST);
	            }
	            BeanUtils.copyProperties(dailyproductioncottonballs, report);
	            if (userRole.equalsIgnoreCase(AppConstantDryGoods.operatorRole)) {
	                report.setOperator_status(AppConstants.operatorApprove);
	                report.setOperator_submitted_by(userName);
	                report.setOperator_submitted_on(date);
	                report.setOperator_submitted_id(userId);
	                report.setOperator_sign(userName);
	                report.setSupervisor_status(AppConstants.waitingStatus);
	                report.setHod_status("");

	                // Fetch and set the operator's signature
	                Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
	                byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//	                report.setOperator_signature_image(signature);

	                dailyproductioncottonballsf003repository.save(report);
	                List<SliverReceiptDetailsF003> lines = report.getSliverreceiptdetails();
	                if (lines != null && !lines.isEmpty()) {
                    for (SliverReceiptDetailsF003 lineDetails : lines) {
                        lineDetails.setCottonballs_id(report.getCottonballs_id());
                        sliverreceiptdetailsf003repository.save(lineDetails);
                    }
	                }

	                // Create audit history record
	               DailyProductionCottonBallsHistoryF003 historyRecord = new DailyProductionCottonBallsHistoryF003();
	                BeanUtils.copyProperties(report, historyRecord);

	                String date1 = report.getDate();
	                String shift = report.getShift();
	                String machineName = report.getMachine_name();
	                String order_no = report.getOrder_no();
	                int version = dailyproductioncottonballshistoryf003repository.getMaximumVersion(date1, shift, machineName,order_no)
	                        .map(temp -> temp + 1).orElse(1);
	                historyRecord.setVersion(version);

	                dailyproductioncottonballshistoryf003repository.save(historyRecord);
	                for (SliverReceiptDetailsF003 line : lines) {
                    	SliverReceiptDetailsHistoryF003 lineHistory = new SliverReceiptDetailsHistoryF003();
                    	 BeanUtils.copyProperties(line, lineHistory);
                    	 lineHistory.setCottonballs_id(historyRecord.getCottonballs_id());
                        sliverreceiptdetailsf003historyrepository.save(lineHistory);
                    }

	                // Send notification email (uncomment and implement if needed)
	                 try {
	                     drygoodsmailfunction.sendEmailSupervisorF003(report);
	                 } catch (Exception ex) {
	                     return new ResponseEntity<>(new ApiResponse(false, "Submitted but unable to send email!"), HttpStatus.OK);
	                 }

	            } else {
	                return new ResponseEntity<>(new ApiResponse(false, "Unauthorized to submit Daily ProductionT Report"), HttpStatus.FORBIDDEN);
	            }
	        }

	    } catch (Exception ex) {
	        return new ResponseEntity<>(new ApiResponse(false, "Unable to submit details! " + ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	    return new ResponseEntity<>(new ApiResponse(true, "Submitted successfully!"), HttpStatus.OK);
	}

	
	//APPROVE/REJECT
		public ResponseEntity<?> approveRejectDailyProduction(ApproveResponse approvalResponse, HttpServletRequest http) {
			DailyProductionCottonBallsF003 dailyproductionReport = new DailyProductionCottonBallsF003();
		    Long id = approvalResponse.getId();

		    try {
		        // Retrieve user details and current date
		        String userRole = getUserRole();
		        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		        String userName = userRepository.getUserName(userId);
		        LocalDateTime currentDate = LocalDateTime.now();
		        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		        // Find the bale consumption report by ID
		        dailyproductionReport = dailyproductioncottonballsf003repository.fetchBaleDetailsbyid(id);

		        // Create a new history record
		        DailyProductionCottonBallsHistoryF003 history = new DailyProductionCottonBallsHistoryF003();

		        // Check current status
//		        String currentStatus = dailyproductionReport.getHod_status();

		        if (dailyproductionReport.getSupervisor_status().equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
    					&&dailyproductionReport.getHod_status().equalsIgnoreCase(AppConstants.waitingStatus)) {
		            if (userRole.equalsIgnoreCase("ROLE_HOD")|| userRole.equalsIgnoreCase(AppConstantsSplunance.designeeRole)) {
		                if (approvalResponse.getStatus().equalsIgnoreCase("Approve")) {
		                    // Set approved status and other details
		                	dailyproductionReport.setHod_status(AppConstantDryGoods.hodApprovedStatus);
		                	dailyproductionReport.setHod_submit_on(date);
		                	dailyproductionReport.setHod_submit_by(userName);
		                	dailyproductionReport.setHod_submit_id(userId);
		                    

		                    Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
		                    byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//		                    dailyproductionReport.setHod_signature_image(signature);
		                    dailyproductionReport.setHod_sign(userName);

		                    // Save updated bale consumption report
		                    dailyproductioncottonballsf003repository.save(dailyproductionReport);
		                    String date1 = dailyproductionReport.getDate();
			                String shift = dailyproductionReport.getShift();
			                String laydownNo = dailyproductionReport.getMachine_name();
			                String order_no = dailyproductionReport.getOrder_no();
		                    // Update history with the approval details
		                    history = dailyproductioncottonballshistoryf003repository.fetchLastSubmittedRecord(date1,shift,laydownNo,order_no);

		                    history.setHod_status(AppConstantDryGoods.hodApprovedStatus);
		                    history.setHod_submit_on(date);
		                    history.setHod_submit_by(userName);
		                    history.setHod_submit_id(userId);
		                    history.setHod_sign(userName);

		                    dailyproductioncottonballshistoryf003repository.save(history);
		                    
		                    try {
			                     drygoodsmailfunction.sendEmailToHodF003(dailyproductionReport);
			                 } catch (Exception ex) {
			                     return new ResponseEntity<>(new ApiResponse(false, "Submitted but unable to send email!"), HttpStatus.OK);
			                 }

		                    return new ResponseEntity<>(new ApiResponse(true, "Report Approved Successfully"), HttpStatus.OK);

		                } else if (approvalResponse.getStatus().equalsIgnoreCase("Reject")) {
		                    // Set rejected status and reason
		                    String reason = approvalResponse.getRemarks();
		                    dailyproductionReport.setHod_status(AppConstants.hodRejectedStatus);
		                    dailyproductionReport.setHod_submit_on(date);
		                    dailyproductionReport.setHod_submit_by(userName);
		                    dailyproductionReport.setHod_submit_id(userId);
		                    dailyproductionReport.setReason(reason);

		                    Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
		                    byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//		                    baleConsumptionReport.setHod_signature_image(signature);
		                    dailyproductionReport.setHod_sign(userName);

		                    // Save updated bale consumption report
		                    dailyproductioncottonballsf003repository.save(dailyproductionReport);

		                    String date1 = dailyproductionReport.getDate();
			                String shift = dailyproductionReport.getShift();
			                String machine_name = dailyproductionReport.getMachine_name();
			                String order_no = dailyproductionReport.getOrder_no();
			                
		                    // Update history with the rejection details
		                    history = dailyproductioncottonballshistoryf003repository.fetchLastSubmittedRecord(date1,shift,machine_name,order_no);

		                    history.setHod_status(AppConstants.hodRejectedStatus);
		                    history.setHod_submit_on(date);
		                    history.setHod_submit_by(userName);
		                    history.setHod_submit_id(userId);
		                    history.setHod_sign(userName);

		                    dailyproductioncottonballshistoryf003repository.save(history);

		                    return new ResponseEntity<>(new ApiResponse(true, "Production Report Rejected Successfully"), HttpStatus.OK);

		                }
		            }
		            }else if (dailyproductionReport.getOperator_status().equalsIgnoreCase(AppConstants.operatorApprove)
		    					&&dailyproductionReport.getSupervisor_status().equalsIgnoreCase(AppConstants.waitingStatus)) {

		    				if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {

		    					if (approvalResponse.getStatus().equals("Approve")) {
		    						dailyproductionReport.setSupervisor_status(AppConstants.supervisorApprovedStatus);
		    						dailyproductionReport.setSupervisor_submit_on(date);
		    						dailyproductionReport.setSupervisor_submit_by(userName);
		    						dailyproductionReport.setSupervisor_submit_id(userId);

		    						dailyproductionReport.setHod_status(AppConstants.waitingStatus);		
		    						
		    						Optional<UserImageDetails> imageDetailsOpt = imageRepository
		    								.fetchItemDetailsByUsername(userName);
		    						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//		    						dailyproductionReport.setSupervisor_signature_image(signature);
		    						dailyproductionReport.setSupervisor_sign(userName);

		    						dailyproductioncottonballsf003repository.save(dailyproductionReport);
		    						 String date1 = dailyproductionReport.getDate();
		 			                String shift = dailyproductionReport.getShift();
		 			                String machine_name = dailyproductionReport.getMachine_name();
		 			               String order_no = dailyproductionReport.getOrder_no();
		    						history = dailyproductioncottonballshistoryf003repository.fetchLastSubmittedRecord(date1,shift,machine_name,order_no);

		    						history.setSupervisor_status(AppConstants.supervisorApprovedStatus);
		    						history.setSupervisor_submit_on(date);
		    						history.setSupervisor_submit_by(userName);
		    						history.setSupervisor_submit_id(userId);
		    						history.setSupervisor_sign(userName);

		    						history.setHod_status(AppConstants.waitingStatus);		
		    						
		    						dailyproductioncottonballshistoryf003repository.save(history);
		    						try {

//		    							spunlacemailfunction.sendEmailToHodF002(dailyproductionReport);
		    								} catch (Exception ex) {
		    									return new ResponseEntity<>(
		    											new ApiResponse(false, "Approved but Unable to send mail! "),
		    											HttpStatus.OK);
		    								}
		    						
		    						return new ResponseEntity<>(new ApiResponse(true, "Supervisor Approved Successfully"),
		    								HttpStatus.OK);

		    					} else if (approvalResponse.getStatus().equals("Reject")) {
		    						String reason = approvalResponse.getRemarks();
		    						dailyproductionReport.setReason(reason);
		    						dailyproductionReport.setSupervisor_status(AppConstants.supervisorRejectedStatus);
		    						dailyproductionReport.setSupervisor_submit_on(date);
		    						dailyproductionReport.setSupervisor_submit_by(userName);
		    						dailyproductionReport.setSupervisor_submit_id(userId);

		    						Optional<UserImageDetails> imageDetailsOpt = imageRepository
		    								.fetchItemDetailsByUsername(userName);
		    						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//		    						dailyproductionReport.setSupervisor_signature_image(signature);
		    						dailyproductionReport.setSupervisor_sign(userName);

		    						dailyproductioncottonballsf003repository.save(dailyproductionReport);
		    						String date1 = dailyproductionReport.getDate();
		 			                String shift = dailyproductionReport.getShift();
		 			                String machine_name = dailyproductionReport.getMachine_name();
		 			                String order_no = dailyproductionReport.getOrder_no();
		    						history = dailyproductioncottonballshistoryf003repository.fetchLastSubmittedRecord(date1,shift,machine_name,order_no);

		    						history.setReason(reason);
		    						history.setSupervisor_status(AppConstants.supervisorRejectedStatus);
		    						history.setSupervisor_submit_on(date);
		    						history.setSupervisor_submit_by(userName);
		    						history.setSupervisor_submit_id(userId);
		    						history.setSupervisor_sign(userName);

		    						dailyproductioncottonballshistoryf003repository.save(history);

		    					} else {
		    						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
		    					}

		    				} else {
		    					return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to Approve"),
		    							HttpStatus.BAD_REQUEST);
		    				}
		            }
		                else {
		                    return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
		                }

		            
		    } catch (Exception e) {
		        String msg = e.getMessage();
		        logger.error("Unable to Approve/Reject Bale Consumption Report: " + msg);
		        return new ResponseEntity<>(new ApiResponse(false, "Failed to Approve/Reject Bale Consumption Report " + msg), HttpStatus.BAD_REQUEST);
		    }

			return new ResponseEntity<>(new ApiResponse(true, "Supervisor Rejected Successfully"),
					HttpStatus.OK);

		}
		
		//Summary
		// Summary for hod f003

			public ResponseEntity<?> summaryDailyProductionCottonF003() {
				String userRole = getUserRole();
				List<DailyProductionCottonBallsF003> processSetupDetails = new ArrayList<>();
				try {
					
				 if (userRole.equalsIgnoreCase(AppConstantsSplunance.hodRole)
							|| userRole.equalsIgnoreCase(AppConstantDryGoods.designeeRole)|| userRole.equalsIgnoreCase(AppConstantDryGoods.supervisiorRole)) {
						processSetupDetails = dailyproductioncottonballsf003repository.hodSummary();
					}
				 else if (userRole.equalsIgnoreCase(AppConstantDryGoods.operatorRole)) {
						processSetupDetails = dailyproductioncottonballsf003repository.operatorSummary();
					}
					else {
						return new ResponseEntity<>(userRole +" "+"Not authorised to access the form", HttpStatus.BAD_REQUEST);
					}

					return new ResponseEntity<>(processSetupDetails, HttpStatus.OK);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
							HttpStatus.BAD_REQUEST);
				}
			}
			//**********************************************************PDE******************************************************************************************//
			public ResponseEntity<?> fetchpdeDetailsF003(String order_no) {
			    List<Map<String, Object>> pdeResponse = new ArrayList<>();

			    try {
			        List<Object[]> results = dailyproductioncottonballsf003repository.fetchpdeF003(order_no);

			        for (Object[] result : results) {
			            Map<String, Object> rowMap = new HashMap<>();
			            rowMap.put("Material", result[0]);
			            rowMap.put("customer_name", result[1]);
			            rowMap.put("Qty", result[2]);
			            rowMap.put("Saleorder", result[3]);
			            rowMap.put("Bags", result[4]);
			            rowMap.put("MaterialAfterDash", result[5]);
			            rowMap.put("bag_by_box", result[6]);
			            pdeResponse.add(rowMap);
			        }

			    } catch (Exception ex) {
			        String msg = ex.getMessage();
			        logger.error("Unable to get Order Details: " + msg);
			        return new ResponseEntity<>(new ApiResponse(false, "Failed to get Order details: " + msg), HttpStatus.BAD_REQUEST);
			    }

			    return new ResponseEntity<>(pdeResponse, HttpStatus.OK);
			}

			
			public ResponseEntity<?> fetchStoppageDetailsF003(String date, String shift, String order_no,String machine_name) {
			    List<Map<String, Object>> stoppageResponse = new ArrayList<>();

			    try {
			        List<Object[]> results = dailyproductioncottonballsf003repository.fetchStoppageF003(date, shift, order_no,machine_name);

			        for (Object[] result : results) {
			            Map<String, Object> rowMap = new HashMap<>();
			            rowMap.put("SCAUSE", result[0]);
			            rowMap.put("FTime", result[1]);
			            rowMap.put("TTime", result[2]);
			            rowMap.put("TotHrs", result[3]);
			            rowMap.put("Remarks", result[4]);
			            stoppageResponse.add(rowMap);
			        }

			    } catch (Exception ex) {
			        String msg = ex.getMessage();
			        logger.error("Unable to get stoppage Details: " + msg);
			        return new ResponseEntity<>(new ApiResponse(false, "Failed to get stoppage details: " + msg), HttpStatus.BAD_REQUEST);
			    }

			    return new ResponseEntity<>(stoppageResponse, HttpStatus.OK);
			}
//--------------------------------------------------------------------------------------F011--------------------------------------------------------------------------------
		//save
		/*	public ResponseEntity<?> saveBallpleateAndWoolRollFinishedGoodsTransferRecordF011(
			        BallpleateAndWoolRollFinishedGoodsTransferRecordF011 transferRecordDetails, HttpServletRequest http) {

			    BallpleateAndWoolRollFinishedGoodsTransferRecordF011 transferRecord = new BallpleateAndWoolRollFinishedGoodsTransferRecordF011();
			    Long id = transferRecordDetails.getFinished_goods_id();
			    try {
			        String value = "";
			        String createdBy = "";
			        Date createdAt = null;

			        String userRole = getUserRole();
			        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			        String userName = userRepository.getUserName(userId);
			        LocalDateTime currentDate = LocalDateTime.now();
			        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			        // Mandatory fields validation
			        if (transferRecordDetails.getDate() == null)
			            value = "Date";
			        if (transferRecordDetails.getShift() == null)
			            value = "Shift";
			        if (transferRecordDetails.getPo_no() == null)
			            value = "PO No";
			        if (transferRecordDetails.getProduct_name() == null)
			            value = "Product Name";

			        if (!"".equals(value)) {
			            return new ResponseEntity<>(new ApiResponse(false, "Should Fill Mandatory Fields! " + value),
			                    HttpStatus.BAD_REQUEST);
			        }

			        if (id != null) {
			            transferRecord = ballpleateandwoolrollfinishedgoodstransferrecordf011repository.findById(id).orElse(null);

			            if (transferRecord != null) {
			                String[] ignoreProps = { "finished_goods_id", "supervisor_status", "supervisor_save_by",
			                        "supervisor_save_on", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
			                        "supervisor_submit_id", "supervisor_sign" };

			                BeanUtils.copyProperties(transferRecordDetails, transferRecord, ignoreProps);

			                if (userRole.equalsIgnoreCase(AppConstantDryGoods.supervisiorRole)) {

			                    transferRecord.setSupervisor_status(AppConstants.supervisorSave);
			                    transferRecord.setSupervisor_save_by(userName);
			                    transferRecord.setSupervisor_save_on(date);
			                    transferRecord.setSupervisor_save_id(userId);

			                    ballpleateandwoolrollfinishedgoodstransferrecordf011repository.save(transferRecord);

			                } else {
			                    return new ResponseEntity<>(new ApiResponse(false, "Unauthorized to save Finished Goods Transfer Record"),
			                            HttpStatus.FORBIDDEN);
			                }
			            }

			        } else {
			            if (!userRole.equalsIgnoreCase(AppConstantDryGoods.supervisiorRole)) {
			                return new ResponseEntity<>(new ApiResponse(false, userRole + " Unauthorized to save Finished Goods Transfer Record"),
			                        HttpStatus.BAD_REQUEST);
			            }

			            BeanUtils.copyProperties(transferRecordDetails, transferRecord);
			            if (userRole.equalsIgnoreCase(AppConstantDryGoods.supervisiorRole)) {

			                transferRecord.setSupervisor_status(AppConstants.supervisorSave);
			                transferRecord.setSupervisor_save_by(userName);
			                transferRecord.setSupervisor_save_on(date);
			                transferRecord.setSupervisor_save_id(userId);

			                ballpleateandwoolrollfinishedgoodstransferrecordf011repository.save(transferRecord);
			            }
			        }
			    } catch (Exception ex) {
			        String msg = ex.getMessage();
			        logger.error("Unable to save Finished Goods Transfer Record: " + msg);
			        return new ResponseEntity<>(new ApiResponse(false, "Failed to save Finished Goods Transfer Record: " + msg),
			                HttpStatus.BAD_REQUEST);
			    }

			    return new ResponseEntity<>(transferRecord, HttpStatus.CREATED);
			}
			//Submit F011
			public ResponseEntity<?> submitBallpleateAndWoolRollFinishedGoodsTransferRecordF011(
			        BallpleateAndWoolRollFinishedGoodsTransferRecordF011 transferRecordDetails, HttpServletRequest http) {

			    BallpleateAndWoolRollFinishedGoodsTransferRecordF011 transferRecord = new BallpleateAndWoolRollFinishedGoodsTransferRecordF011();
			    Long id = transferRecordDetails.getFinished_goods_id();

			    try {
			        String value = "";
			        String userRole = getUserRole();
			        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			        String userName = userRepository.getUserName(userId);
			        LocalDateTime currentDate = LocalDateTime.now();
			        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			        // Validate mandatory fields
			        if (transferRecordDetails.getDate() == null) value = "Date";
			        if (transferRecordDetails.getShift() == null) value = "Shift";
			        if (transferRecordDetails.getPo_no() == null) value = "PO No";
			        if (transferRecordDetails.getProduct_name() == null) value = "Product Name";

			        if (!"".equals(value)) {
			            return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields! " + value), HttpStatus.BAD_REQUEST);
			        }

			        if (id != null) {
			            transferRecord = ballpleateandwoolrollfinishedgoodstransferrecordf011repository.findById(id)
			                    .orElse(new BallpleateAndWoolRollFinishedGoodsTransferRecordF011());

			            String[] ignoreProps = { "finished_goods_id", "createdBy", "createdAt",
			                    "supervisor_status", "supervisor_save_by", "supervisor_save_on",
			                    "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
			                    "supervisor_submit_id", "supervisor_sign", "supervisor_signature_image" };

			            BeanUtils.copyProperties(transferRecordDetails, transferRecord, ignoreProps);

			            if (!transferRecord.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)
			                    || transferRecord.getSupervisor_status().equals(AppConstants.supervisorRejectedStatus)) {

			                if (userRole.equalsIgnoreCase(AppConstantDryGoods.supervisiorRole)) {
			                    // Update the status and submission details
			                    transferRecord.setSupervisor_status(AppConstants.supervisorApprovedStatus);
			                    transferRecord.setSupervisor_submit_by(userName);
			                    transferRecord.setSupervisor_submit_on(date);
			                    transferRecord.setSupervisor_submit_id(userId);
			                    transferRecord.setSupervisor_sign(userName);

			                    // Fetch and set the supervisor's signature
			                    Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
			                    byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//			                    transferRecord.setSupervisor_signature_image(signature);

			                    ballpleateandwoolrollfinishedgoodstransferrecordf011repository.save(transferRecord);

			                    // Create audit history record
			                    BallpleateAndWoolRollFinishedGoodsTransferRecordHistoryF011 historyRecord = new BallpleateAndWoolRollFinishedGoodsTransferRecordHistoryF011();
			                    BeanUtils.copyProperties(transferRecord, historyRecord);

			                    String date1 = historyRecord.getDate();
			                    String shift = historyRecord.getShift();
			                   
			                    int version = ballpleateandwoolrollfinishedgoodstransferrecordhistoryf011repository.getMaximumVersion(date1, shift)
			                            .map(temp -> temp + 1).orElse(1);
			                    historyRecord.setVersion(version);

			                    ballpleateandwoolrollfinishedgoodstransferrecordhistoryf011repository.save(historyRecord);

			                    // Send notification email
			                    try {
//			                        drygoodsmailfunction.sendEmailToHODF011(transferRecord);
			                    } catch (Exception ex) {
			                        return new ResponseEntity<>(new ApiResponse(false, "Submitted but unable to send email!"), HttpStatus.OK);
			                    }

			                } else {
			                    return new ResponseEntity<>(new ApiResponse(false, "Unauthorized to submit Finished Goods Transfer Record"), HttpStatus.FORBIDDEN);
			                }
			            } else {
			                return new ResponseEntity<>(new ApiResponse(false, "Invalid status."), HttpStatus.BAD_REQUEST);
			            }
			        } else {
			            if (!userRole.equals(AppConstantDryGoods.supervisiorRole)) {
			                return new ResponseEntity<>(new ApiResponse(false, userRole + " cannot submit details"), HttpStatus.BAD_REQUEST);
			            }

			            if (userRole.equalsIgnoreCase(AppConstantDryGoods.supervisiorRole)) {
			                transferRecordDetails.setSupervisor_status(AppConstants.supervisorApprovedStatus);
			                transferRecordDetails.setSupervisor_submit_by(userName);
			                transferRecordDetails.setSupervisor_submit_on(date);
			                transferRecordDetails.setSupervisor_submit_id(userId);
			                transferRecordDetails.setSupervisor_sign(userName);

			                // Fetch and set the supervisor's signature
			                Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
			                byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//			                transferRecordDetails.setSupervisor_signature_image(signature);

			                ballpleateandwoolrollfinishedgoodstransferrecordf011repository.save(transferRecordDetails);

			                // Create audit history record
			                BallpleateAndWoolRollFinishedGoodsTransferRecordHistoryF011 historyRecord = new BallpleateAndWoolRollFinishedGoodsTransferRecordHistoryF011();
			                BeanUtils.copyProperties(transferRecordDetails, historyRecord);

			                String date1 = historyRecord.getDate();
			                String shift = historyRecord.getShift();
			                
			                int version = ballpleateandwoolrollfinishedgoodstransferrecordhistoryf011repository.getMaximumVersion(date1, shift)
			                        .map(temp -> temp + 1).orElse(1);
			                historyRecord.setVersion(version);

			                ballpleateandwoolrollfinishedgoodstransferrecordhistoryf011repository.save(historyRecord);

			                // Send notification email
			                try {
//			                    drygoodsmailfunction.sendEmailToHODF011(transferRecordDetails);
			                } catch (Exception ex) {
			                    return new ResponseEntity<>(new ApiResponse(false, "Submitted but unable to send email!"), HttpStatus.OK);
			                }
			            }
			        }
			    } catch (Exception ex) {
			        String msg = ex.getMessage();
			        logger.error("Unable to submit Finished Goods Transfer Record: " + msg);
			        return new ResponseEntity<>(new ApiResponse(false, "Failed to submit Finished Goods Transfer Record: " + msg), HttpStatus.BAD_REQUEST);
			    }

			    return new ResponseEntity<>(new ApiResponse(true, "Submitted successfully"), HttpStatus.OK);
			}*/
			// one to many
			// Save F011
			public ResponseEntity<?> saveBallpleateAndWoolRollFinishedGoodsTransferRecordF011(
			        BallpleateAndWoolRollFinishedGoodsTransferRecordF011 transferRecordDetails, HttpServletRequest http) {

			    BallpleateAndWoolRollFinishedGoodsTransferRecordF011 transferRecord = new BallpleateAndWoolRollFinishedGoodsTransferRecordF011();
			    Long id = transferRecordDetails.getFinished_goods_id();
			    try {
			        String value = "";
			        String userRole = getUserRole();
			        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			        String userName = userRepository.getUserName(userId);
			        LocalDateTime currentDate = LocalDateTime.now();
			        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			        // Mandatory fields validation
			        if (transferRecordDetails.getDate() == null)
			            value = "Date";
			        if (transferRecordDetails.getShift() == null)
			            value = "Shift";

			        if (!"".equals(value)) {
			            return new ResponseEntity<>(new ApiResponse(false, "Should Fill Mandatory Fields! " + value), HttpStatus.BAD_REQUEST);
			        }

			        if (id != null) {
			            transferRecord = ballpleateandwoolrollfinishedgoodstransferrecordf011repository.findById(id).orElse(null);

			            if (transferRecord != null) {
			                String[] ignoreProps = { "finished_goods_id", "supervisor_status", "supervisor_save_by", "supervisor_save_on",
			                        "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by", "supervisor_submit_id", "supervisor_sign" };

			                BeanUtils.copyProperties(transferRecordDetails, transferRecord, ignoreProps);

			                if (userRole.equalsIgnoreCase(AppConstantDryGoods.supervisiorRole)) {
			                    transferRecord.setSupervisor_status(AppConstants.supervisorSave);
			                    transferRecord.setSupervisor_save_by(userName);
			                    transferRecord.setSupervisor_save_on(date);
			                    transferRecord.setSupervisor_save_id(userId);

			                    ballpleateandwoolrollfinishedgoodstransferrecordf011repository.save(transferRecord);
			                    // Save associated records
			                    List<FinishedGoodsTransferRecordLineF011> lines = transferRecordDetails.getFinishedLines();
			                    if (lines != null && !lines.isEmpty()) {
			                        for (FinishedGoodsTransferRecordLineF011 line : lines) {
			                            line.setFinished_goods_id(transferRecordDetails.getFinished_goods_id());		                            
			                            finishedgoodstransferrecordlinef011repository.save(line);
			                        }
			                    }

			                 

			                } else {
			                    return new ResponseEntity<>(new ApiResponse(false, "Unauthorized to save Finished Goods Transfer Record"), HttpStatus.FORBIDDEN);
			                }
			            }

			        } else {
			            if (!userRole.equalsIgnoreCase(AppConstantDryGoods.supervisiorRole)) {
			                return new ResponseEntity<>(new ApiResponse(false, userRole + " Unauthorized to save Finished Goods Transfer Record"), HttpStatus.BAD_REQUEST);
			            }

			            BeanUtils.copyProperties(transferRecordDetails, transferRecord);
			            if (userRole.equalsIgnoreCase(AppConstantDryGoods.supervisiorRole)) {
			                transferRecord.setSupervisor_status(AppConstants.supervisorSave);
			                transferRecord.setSupervisor_save_by(userName);
			                transferRecord.setSupervisor_save_on(date);
			                transferRecord.setSupervisor_save_id(userId);

			                ballpleateandwoolrollfinishedgoodstransferrecordf011repository.save(transferRecord);
			                // Save associated records
			                List<FinishedGoodsTransferRecordLineF011> lines = transferRecord.getFinishedLines();
			                if (lines != null && !lines.isEmpty()) {
			                    for (FinishedGoodsTransferRecordLineF011 line : lines) {
			                    	 line.setFinished_goods_id(transferRecord.getFinished_goods_id());		                            
			                            finishedgoodstransferrecordlinef011repository.save(line);
			                    }
			                }

			              
			            }
			        }
			    } catch (Exception ex) {
			        String msg = ex.getMessage();
			        logger.error("Unable to save Finished Goods Transfer Record: " + msg);
			        return new ResponseEntity<>(new ApiResponse(false, "Failed to save Finished Goods Transfer Record: " + msg), HttpStatus.BAD_REQUEST);
			    }

			    return new ResponseEntity<>(transferRecord, HttpStatus.CREATED);
			}

			// Submit F011
			public ResponseEntity<?> submitBallpleateAndWoolRollFinishedGoodsTransferRecordF011(
			        BallpleateAndWoolRollFinishedGoodsTransferRecordF011 transferRecordDetails, HttpServletRequest http) {

			    BallpleateAndWoolRollFinishedGoodsTransferRecordF011 transferRecord = new BallpleateAndWoolRollFinishedGoodsTransferRecordF011();
			    Long id = transferRecordDetails.getFinished_goods_id();

			    try {
			        String value = "";
			        String userRole = getUserRole();
			        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			        String userName = userRepository.getUserName(userId);
			        LocalDateTime currentDate = LocalDateTime.now();
			        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			        // Validate mandatory fields
			        if (transferRecordDetails.getDate() == null) value = "Date";
			        if (transferRecordDetails.getShift() == null) value = "Shift";

			        if (!"".equals(value)) {
			            return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields! " + value), HttpStatus.BAD_REQUEST);
			        }

			        if (id != null) {
			            transferRecord = ballpleateandwoolrollfinishedgoodstransferrecordf011repository.findById(id)
			                    .orElse(new BallpleateAndWoolRollFinishedGoodsTransferRecordF011());

			            String[] ignoreProps = { "finished_goods_id", "createdBy", "createdAt", "supervisor_status", "supervisor_save_by",
			                    "supervisor_save_on", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
			                    "supervisor_submit_id", "supervisor_sign", "supervisor_signature_image" };

			            BeanUtils.copyProperties(transferRecordDetails, transferRecord, ignoreProps);

			            if (!transferRecord.getSupervisor_status().equals(AppConstants.supervisorApprovedStatus)
			                    || transferRecord.getSupervisor_status().equals(AppConstants.supervisorRejectedStatus)) {

			                if (userRole.equalsIgnoreCase(AppConstantDryGoods.supervisiorRole)) {
			                    // Update the status and submission details
			                    transferRecord.setSupervisor_status(AppConstants.supervisorApprovedStatus);
			                    transferRecord.setSupervisor_submit_by(userName);
			                    transferRecord.setSupervisor_submit_on(date);
			                    transferRecord.setSupervisor_submit_id(userId);
			                    transferRecord.setSupervisor_sign(userName);

			                    // Fetch and set the supervisor's signature
			                    Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
			                    byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//			                    transferRecord.setSupervisor_signature_image(signature);
			                    ballpleateandwoolrollfinishedgoodstransferrecordf011repository.save(transferRecord);
			                    // Save associated records
			                    List<FinishedGoodsTransferRecordLineF011> lines = transferRecordDetails.getFinishedLines();		                    if (lines != null && !lines.isEmpty()) {
			                        for (FinishedGoodsTransferRecordLineF011 line : lines) {
			                        	 line.setFinished_goods_id(transferRecordDetails.getFinished_goods_id());		                            
				                            finishedgoodstransferrecordlinef011repository.save(line);
			                    }
			                    
			                 

			                    // Create audit history record
			                    BallpleateAndWoolRollFinishedGoodsTransferRecordHistoryF011 historyRecord = new BallpleateAndWoolRollFinishedGoodsTransferRecordHistoryF011();
			                    BeanUtils.copyProperties(transferRecord, historyRecord);

			                    String date1 = historyRecord.getDate();
			                    String shift = historyRecord.getShift();

			                    int version = ballpleateandwoolrollfinishedgoodstransferrecordhistoryf011repository.getMaximumVersion(date1, shift)
			                            .map(temp -> temp + 1).orElse(1);
			                    historyRecord.setVersion(version);

			                    ballpleateandwoolrollfinishedgoodstransferrecordhistoryf011repository.save(historyRecord);
			                    // Create audit history records for line items
			                    for (FinishedGoodsTransferRecordLineF011 line : lines) {
			                        FinishedGoodsTransferRecordLineHistoryF011 lineHistory = new FinishedGoodsTransferRecordLineHistoryF011();
			                        BeanUtils.copyProperties(line, lineHistory);
			                        lineHistory.setFinished_goods_id(historyRecord.getFinished_goods_id());
			                        finishedgoodstransferrecordlinehistoryf011repository.save(lineHistory);
			                    }
			                    
			                    // Send notification email
			                    try {
//			                        drygoodsmailfunction.sendEmailToHODF011(transferRecord);
			                    } catch (Exception ex) {
			                        return new ResponseEntity<>(new ApiResponse(false, "Submitted but unable to send email!"), HttpStatus.OK);
			                    }

			            }
			                }
			                else {
			                    return new ResponseEntity<>(new ApiResponse(false, "Unauthorized to submit Finished Goods Transfer Record"), HttpStatus.FORBIDDEN);
			                }
			            } else {
			                return new ResponseEntity<>(new ApiResponse(false, "Invalid status."), HttpStatus.BAD_REQUEST);
			            }
			        
			            
			        } else {
			            if (!userRole.equals(AppConstantDryGoods.supervisiorRole)) {
			                return new ResponseEntity<>(new ApiResponse(false, userRole + " cannot submit details"), HttpStatus.BAD_REQUEST);
			            }

			            if (userRole.equalsIgnoreCase(AppConstantDryGoods.supervisiorRole)) {
			                transferRecordDetails.setSupervisor_status(AppConstants.supervisorApprovedStatus);
			                transferRecordDetails.setSupervisor_submit_by(userName);
			                transferRecordDetails.setSupervisor_submit_on(date);
			                transferRecordDetails.setSupervisor_submit_id(userId);
			                transferRecordDetails.setSupervisor_sign(userName);

			                // Fetch and set the supervisor's signature
			                Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
			                byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//			                transferRecordDetails.setSupervisor_signature_image(signature);
			                ballpleateandwoolrollfinishedgoodstransferrecordf011repository.save(transferRecordDetails);
			                // Save associated records
			                List<FinishedGoodsTransferRecordLineF011> lines = transferRecordDetails.getFinishedLines();
			                if (lines != null && !lines.isEmpty()) {
			                    for (FinishedGoodsTransferRecordLineF011 line : lines) {
			                    	 line.setFinished_goods_id(transferRecordDetails.getFinished_goods_id());		                            
			                            finishedgoodstransferrecordlinef011repository.save(line);
		                    }
			                }

			              

			                // Create audit history record
			                BallpleateAndWoolRollFinishedGoodsTransferRecordHistoryF011 historyRecord = new BallpleateAndWoolRollFinishedGoodsTransferRecordHistoryF011();
			                BeanUtils.copyProperties(transferRecordDetails, historyRecord);

			                String date1 = historyRecord.getDate();
			                String shift = historyRecord.getShift();

			                int version = ballpleateandwoolrollfinishedgoodstransferrecordhistoryf011repository.getMaximumVersion(date1, shift)
			                        .map(temp -> temp + 1).orElse(1);
			                historyRecord.setVersion(version);

			                ballpleateandwoolrollfinishedgoodstransferrecordhistoryf011repository.save(historyRecord);
			                // Create audit history records for line items
		                    for (FinishedGoodsTransferRecordLineF011 line : lines) {
		                        FinishedGoodsTransferRecordLineHistoryF011 lineHistory = new FinishedGoodsTransferRecordLineHistoryF011();
		                        BeanUtils.copyProperties(line, lineHistory);
		                        lineHistory.setFinished_goods_id(historyRecord.getFinished_goods_id());
		                        finishedgoodstransferrecordlinehistoryf011repository.save(lineHistory);
		                    }
			            
			                // Send notification email
			                try {
//			                    drygoodsmailfunction.sendEmailToHODF011(transferRecordDetails);
			                } catch (Exception ex) {
			                    return new ResponseEntity<>(new ApiResponse(false, "Submitted but unable to send email!"), HttpStatus.OK);
			                }
			            }
			        }
			        
			    } catch (Exception ex) {
			        String msg = ex.getMessage();
			        logger.error("Unable to submit Finished Goods Transfer Record: " + msg);
			        return new ResponseEntity<>(new ApiResponse(false, "Failed to submit Finished Goods Transfer Record: " + msg), HttpStatus.BAD_REQUEST);
			    }

			    return new ResponseEntity<>(new ApiResponse(true, "Submitted successfully"), HttpStatus.OK);
			}

			
			//Summary
			// Summary for hod f011

				public ResponseEntity<?> summaryGoodsTranferRecordF011() {
					String userRole = getUserRole();
					List<BallpleateAndWoolRollFinishedGoodsTransferRecordF011> processSetupDetails = new ArrayList<>();
					try {
						
					 if ( userRole.equalsIgnoreCase(AppConstantDryGoods.supervisiorRole)) {
							processSetupDetails = ballpleateandwoolrollfinishedgoodstransferrecordf011repository.supervisorSummary();
						}
						else {
							return new ResponseEntity<>(userRole +" "+"Not authorised to access the form", HttpStatus.BAD_REQUEST);
						}

						return new ResponseEntity<>(processSetupDetails, HttpStatus.OK);
					} catch (Exception ex) {
						return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
								HttpStatus.BAD_REQUEST);
					}
				}
				
				
					// PROD CR
				
				// DELETE API FOR LINE 
				
				@Transactional
				public ResponseEntity<?> deleteGoodsTransferRecord(Long id) {

					FinishedGoodsTransferRecordLineF011 transferRecordLine = new FinishedGoodsTransferRecordLineF011();

					try {

						transferRecordLine = finishedgoodstransferrecordlinef011repository.productionLineById(id);

						if (transferRecordLine != null) {
							finishedgoodstransferrecordlinef011repository.deleteProductionLineById(id);
						} else {
							return ResponseEntity.status(HttpStatus.BAD_REQUEST)
									.body(new ApiResponse(false, " data not found !!!"));
						}

					} catch (Exception ex) {
						String msg = ex.getMessage();

						logger.error(" *** !!! Unable to delete Goods Transfer Line summary !!!*** " + msg);

						return ResponseEntity.status(HttpStatus.BAD_REQUEST)
								.body(new ApiResponse(false, "Failed to delete Goods Transfer Line summary !!!" + msg));
					}

					return ResponseEntity.status(HttpStatus.OK)
							.body(new ApiResponse(true, "Finished Goods Transfer Record Line Deleted "));
				}
				
				
				// LOV FOR RECORD TRANSFER LINE 
				
	
		public ResponseEntity<?> recordTransferList() {
			
			List<String> recordTransferList = new LinkedList<String>();
			
			List<IdAndValuePair> recordValuePair = new LinkedList<IdAndValuePair>();
			
			try {
				
				recordTransferList = finishedgoodstransferrecordlinef011repository.fetchFinishTransferSignature();
				
				Long id = (long) 1;
				
				for(String temp : recordTransferList) {
					
					IdAndValuePair value = new IdAndValuePair();
					value.setValue(temp);
					value.setId(id);
					
					id++;
					
					recordValuePair.add(value);
					
				}
				
			} catch (Exception e) {
				SCAUtil sca = new SCAUtil();
				logger.error("*** Unable to get Hand Sanitation *** " + e);
				String msg = sca.getErrorMessage(e);
				return new ResponseEntity<>(new ApiResponse(false, "Unable to get Hand Sanitation " + msg),
						HttpStatus.BAD_REQUEST);
			}
			
			return new ResponseEntity(recordValuePair, HttpStatus.OK);
		}
				
				
				
		//--------------------------------------------------------------F006----------------------------------------------------------------
				// Save API for DailyProductionDetailsPleateAndWoolRollF006
				public ResponseEntity<?> saveDailyProductionDetailsPleateAndWoolRollF006(
				        DailyProductionDetailsPleateAndWoolRollF006 productionDetails, HttpServletRequest http) {

				    DailyProductionDetailsPleateAndWoolRollF006 productionRecord = new DailyProductionDetailsPleateAndWoolRollF006();
				    Long id = productionDetails.getPleate_id();
				    try {
				        String value = "";
				        String createdBy = "";
				        Date createdAt = null;

				        String userRole = getUserRole();
				        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
				        String userName = userRepository.getUserName(userId);
				        LocalDateTime currentDate = LocalDateTime.now();
				        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

				        // Mandatory fields validation
				        if (productionDetails.getDate() == null)
				            value = "Date";
				        if (productionDetails.getShift() == null)
				            value = "Shift";
				        if (productionDetails.getProduct_name() == null)
				            value = "Product Name";

				        if (!"".equals(value)) {
				            return new ResponseEntity<>(new ApiResponse(false, "Should Fill Mandatory Fields! " + value),
				                    HttpStatus.BAD_REQUEST);
				        }

				        if (id != null) {
				            productionRecord = dailyproductiondetailspleateandwoolrollf006repository.findById(id).orElse(null);

				            if (productionRecord != null) {
				                String[] ignoreProps = { "pleate_id", "operator_status",   "operator_save_by", "operator_save_on", "operator_save_id", 
				    	                "operator_submitted_by", "operator_submitted_on", 
				    	                "operator_submitted_id", "operator_sign", "supervisor_status",
				    	                "supervisor_save_on", "supervisor_save_by", "supervisor_save_id", 
				    	                "supervisor_submit_on", "supervisor_submit_by", 
				    	                "supervisor_submit_id", "supervisor_sign",
				    	                "supervisior_mail_status", "hod_status", "hod_save_on", 
				    	                "hod_save_by", "hod_save_id", "hod_submit_on", 
				    	                "hod_submit_by", "hod_submit_id", "hod_sign", 
				    	                "hod_mail_status", "supervisor_signature_image", 
				    	                "hod_signature_image"};

				                BeanUtils.copyProperties(productionDetails, productionRecord, ignoreProps);

				                if (userRole.equalsIgnoreCase(AppConstantDryGoods.operatorRole)) {

				                    productionRecord.setOperator_status(AppConstants.operatorSave);
				                    productionRecord.setOperator_save_by(userName);
				                    productionRecord.setOperator_save_on(date);
				                    productionRecord.setOperator_save_id(userId);

				                    dailyproductiondetailspleateandwoolrollf006repository.save(productionRecord);

				                } else {
				                    return new ResponseEntity<>(new ApiResponse(false, "Unauthorized to save Production Record"),
				                            HttpStatus.FORBIDDEN);
				                }
				            }

				        } else {
				            if (!userRole.equalsIgnoreCase(AppConstantDryGoods.operatorRole)) {
				                return new ResponseEntity<>(new ApiResponse(false, userRole + " Unauthorized to save Production Record"),
				                        HttpStatus.BAD_REQUEST);
				            }

				            BeanUtils.copyProperties(productionDetails, productionRecord);
				            if (userRole.equalsIgnoreCase(AppConstantDryGoods.operatorRole)) {

				                productionRecord.setOperator_status(AppConstants.operatorSave);
				                productionRecord.setOperator_save_by(userName);
				                productionRecord.setOperator_save_on(date);
				                productionRecord.setOperator_save_id(userId);

				                dailyproductiondetailspleateandwoolrollf006repository.save(productionRecord);
				            }
				        }
				    } catch (Exception ex) {
				        String msg = ex.getMessage();
				        logger.error("Unable to save Production Record: " + msg);
				        return new ResponseEntity<>(new ApiResponse(false, "Failed to save Production Record: " + msg),
				                HttpStatus.BAD_REQUEST);
				    }

				    return new ResponseEntity<>(productionRecord, HttpStatus.CREATED);
				}

					//Submit
				
				public ResponseEntity<?> submitDailyProductionPleateAndWoolRollF006(DailyProductionDetailsPleateAndWoolRollF006 dailyProductionDetails, HttpServletRequest http) {

				    DailyProductionDetailsPleateAndWoolRollF006 report = new DailyProductionDetailsPleateAndWoolRollF006();
				    Long id = dailyProductionDetails.getPleate_id();

				    try {
				        String value = "";
				        String userRole = getUserRole();
				        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
				        String userName = userRepository.getUserName(userId);
				        LocalDateTime currentDate = LocalDateTime.now();
				        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

				        // Validate mandatory fields
				        if (dailyProductionDetails.getFormatNo() == null) value = "formatNo";
				        if (dailyProductionDetails.getSopNumber() == null) value = "SopNumber";
				        if (dailyProductionDetails.getRevisionNo() == null) value = "revisionNo";
				        if (dailyProductionDetails.getFormatName() == null) value = "formatName";
				        if (dailyProductionDetails.getUnit() == null) value = "Unit";
				        if (dailyProductionDetails.getShift() == null) value = "Shift";
				        if (dailyProductionDetails.getDate() == null) value = "Date";

				        if (!"".equals(value)) {
				            return new ResponseEntity<>(new ApiResponse(false, "Should fill mandatory fields! " + value), HttpStatus.BAD_REQUEST);
				        }

				        if (id != null) {
				            report = dailyproductiondetailspleateandwoolrollf006repository.findById(id).orElse(new DailyProductionDetailsPleateAndWoolRollF006());

				            String[] ignoreProps = { 
				                "pleate_id", "createdBy", "createdAt", "operator_status", 
				                "operator_save_by", "operator_save_on", "operator_save_id", 
				                "operator_submitted_by", "operator_submitted_on", 
				                "operator_submitted_id", "operator_sign", "supervisor_status",
				                "supervisor_save_on", "supervisor_save_by", "supervisor_save_id", 
				                "supervisor_submit_on", "supervisor_submit_by", 
				                "supervisor_submit_id", "supervisor_sign",
				                "supervisior_mail_status", "hod_status", "hod_save_on", 
				                "hod_save_by", "hod_save_id", "hod_submit_on", 
				                "hod_submit_by", "hod_submit_id", "hod_sign", 
				                "hod_mail_status", "supervisor_signature_image", 
				                "hod_signature_image"
				            };

				            BeanUtils.copyProperties(dailyProductionDetails, report, ignoreProps);

				            if (!report.getOperator_status().equals(AppConstants.operatorApprove)
				                    || report.getHod_status().equals(AppConstants.hodRejectedStatus)
				                    || report.getSupervisor_status().equals(AppConstants.supervisorRejectedStatus)) {

				                if (userRole.equalsIgnoreCase(AppConstantDryGoods.operatorRole)) {
				                    report.setOperator_status(AppConstants.operatorApprove);
				                    report.setOperator_submitted_by(userName);
				                    report.setOperator_submitted_on(date);
				                    report.setOperator_submitted_id(userId);
				                    report.setOperator_sign(userName);
				                    report.setSupervisor_status(AppConstants.waitingStatus);
				                    report.setHod_status("");

				                    // Fetch and set the operator's signature
				                    Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
				                    byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
				                    report.setOperator_signature_image(signature);

				                    dailyproductiondetailspleateandwoolrollf006repository.save(report);

				                    // Create audit history record
				                    DailyProductionDetailsPleateAndWoolRollHistoryF006 historyRecord = new DailyProductionDetailsPleateAndWoolRollHistoryF006();
				                    BeanUtils.copyProperties(report, historyRecord);

				                    String date1 = report.getDate();
				                    String shift = report.getShift();
				                    String productName = report.getProduct_name();
				                    
				                    String order_no = report.getOrder_no();
				                    
				                    int version = dailyproductiondetailspleateandwoolrollhistoryf006repository.getMaximumVersion(date1, shift, productName, order_no)
				                            .map(temp -> temp + 1).orElse(1);
				                    historyRecord.setVersion(version);

				                    dailyproductiondetailspleateandwoolrollhistoryf006repository.save(historyRecord);

				                    // Send notification email (uncomment and implement if needed)
//				                     try {
//				                         drygoodsmailfunction.sendEmailToSupervisorF005(report);
//				                     } catch (Exception ex) {
//				                         return new ResponseEntity<>(new ApiResponse(false, "Submitted but unable to send email!"), HttpStatus.OK);
//				                     }

				                } else {
				                    return new ResponseEntity<>(new ApiResponse(false, "Unauthorized to submit Report"), HttpStatus.FORBIDDEN);
				                }
				            } else {
				                return new ResponseEntity<>(new ApiResponse(false, "Invalid status."), HttpStatus.BAD_REQUEST);
				            }

				        } else {
				            if (!userRole.equals(AppConstantDryGoods.operatorRole)) {
				                return new ResponseEntity<>(new ApiResponse(false, userRole + " cannot submit details"), HttpStatus.BAD_REQUEST);
				            }
				            BeanUtils.copyProperties(dailyProductionDetails, report);
				            if (userRole.equalsIgnoreCase(AppConstantDryGoods.operatorRole)) {
				                report.setOperator_status(AppConstants.operatorApprove);
				                report.setOperator_submitted_by(userName);
				                report.setOperator_submitted_on(date);
				                report.setOperator_submitted_id(userId);
				                report.setOperator_sign(userName);
				                report.setSupervisor_status(AppConstants.waitingStatus);
				                report.setHod_status("");

				                // Fetch and set the operator's signature
				                Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
				                byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
				                report.setOperator_signature_image(signature);

				                dailyproductiondetailspleateandwoolrollf006repository.save(report);

				                // Create audit history record
				                DailyProductionDetailsPleateAndWoolRollHistoryF006 historyRecord = new DailyProductionDetailsPleateAndWoolRollHistoryF006();
				                BeanUtils.copyProperties(report, historyRecord);

				                String date1 = report.getDate();
				                String shift = report.getShift();
				                String productName = report.getProduct_name();
				                String order_no = report.getOrder_no();
				                
				                int version = dailyproductiondetailspleateandwoolrollhistoryf006repository.getMaximumVersion(date1, shift, productName,order_no)
				                .map(temp -> temp + 1).orElse(1);historyRecord.setVersion(version);

				                dailyproductiondetailspleateandwoolrollhistoryf006repository.save(historyRecord);

				                // Send notification email (uncomment and implement if needed)
				                 try {
				                     drygoodsmailfunction.sendEmailToSupervisorF005(report);
				                 } catch (Exception ex) {
				                     return new ResponseEntity<>(new ApiResponse(false, "Submitted but unable to send email!"), HttpStatus.OK);
				                 }

				            } else {
				                return new ResponseEntity<>(new ApiResponse(false, "Unauthorized to submit Daily Production Report"), HttpStatus.FORBIDDEN);
				            }
				        }

				    } catch (Exception ex) {
				        return new ResponseEntity<>(new ApiResponse(false, "Unable to submit details! " + ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
				    }
				    return new ResponseEntity<>(new ApiResponse(true, "Submitted successfully!"), HttpStatus.OK);
				}
				
				//Summary
				// Summary for hod f003

					public ResponseEntity<?> summaryDailyProductionF006() {
						String userRole = getUserRole();
						List<DailyProductionDetailsPleateAndWoolRollF006> processSetupDetails = new ArrayList<>();
						try {
							
						 if (userRole.equalsIgnoreCase(AppConstantsSplunance.hodRole)
									|| userRole.equalsIgnoreCase(AppConstantDryGoods.designeeRole)|| userRole.equalsIgnoreCase(AppConstantDryGoods.supervisiorRole)) {
								processSetupDetails = dailyproductiondetailspleateandwoolrollf006repository.hodSummary();
							}
						 else if (userRole.equalsIgnoreCase(AppConstantDryGoods.operatorRole)) {
								processSetupDetails = dailyproductiondetailspleateandwoolrollf006repository.operatorSummary();
							}
							else {
								return new ResponseEntity<>(userRole +" "+"Not authorised to access the form", HttpStatus.BAD_REQUEST);
							}

							return new ResponseEntity<>(processSetupDetails, HttpStatus.OK);
						} catch (Exception ex) {
							return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()),
									HttpStatus.BAD_REQUEST);
						}
					}	

					// Approve/reject
					
					public ResponseEntity<?> approveRejectDailyProductionPletaeAndWool(ApproveResponse approvalResponse, HttpServletRequest http) {
						DailyProductionDetailsPleateAndWoolRollF006 dailyproductionReport = new DailyProductionDetailsPleateAndWoolRollF006();
					    Long id = approvalResponse.getId();

					    try {
					        // Retrieve user details and current date
					        String userRole = getUserRole();
					        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
					        String userName = userRepository.getUserName(userId);
					        LocalDateTime currentDate = LocalDateTime.now();
					        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

					        // Find the bale consumption report by ID
					        dailyproductionReport = dailyproductiondetailspleateandwoolrollf006repository.fetchBaleDetailsbyid(id);

					        // Create a new history record
					        DailyProductionDetailsPleateAndWoolRollHistoryF006 history = new DailyProductionDetailsPleateAndWoolRollHistoryF006();

					        // Check current status
//					        String currentStatus = dailyproductionReport.getHod_status();

					        if (dailyproductionReport.getSupervisor_status().equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
			    					&&dailyproductionReport.getHod_status().equalsIgnoreCase(AppConstants.waitingStatus)) {
					            if (userRole.equalsIgnoreCase("ROLE_HOD")|| userRole.equalsIgnoreCase(AppConstantsSplunance.designeeRole)) {
					                if (approvalResponse.getStatus().equalsIgnoreCase("Approve")) {
					                    // Set approved status and other details
					                	dailyproductionReport.setHod_status(AppConstantDryGoods.hodApprovedStatus);
					                	dailyproductionReport.setHod_submit_on(date);
					                	dailyproductionReport.setHod_submit_by(userName);
					                	dailyproductionReport.setHod_submit_id(userId);
					                    

					                    Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
					                    byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					                    dailyproductionReport.setHod_signature_image(signature);
					                    dailyproductionReport.setHod_sign(userName);

					                    // Save updated bale consumption report
					                    dailyproductiondetailspleateandwoolrollf006repository.save(dailyproductionReport);
					                    String date1 = dailyproductionReport.getDate();
						                String shift = dailyproductionReport.getShift();
						                String laydownNo = dailyproductionReport.getProduct_name();
						                
						                String order_no = dailyproductionReport.getOrder_no();
						                
					                    // Update history with the approval details
					                    history = dailyproductiondetailspleateandwoolrollhistoryf006repository.fetchLastSubmittedRecord(date1,shift,laydownNo,order_no);

					                    history.setHod_status(AppConstantDryGoods.hodApprovedStatus);
					                    history.setHod_submit_on(date);
					                    history.setHod_submit_by(userName);
					                    history.setHod_submit_id(userId);
					                    history.setHod_sign(userName);

					                    dailyproductiondetailspleateandwoolrollhistoryf006repository.save(history);
//Mail Function
					                    
//					                    try {
//						                     drygoodsmailfunction.sendEmailToHodF005(dailyproductionReport);
//						                 } catch (Exception ex) {
//						                     return new ResponseEntity<>(new ApiResponse(false, "Submitted but unable to send email!"), HttpStatus.OK);
//						                 }
					                    return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);

					                } else if (approvalResponse.getStatus().equalsIgnoreCase("Reject")) {
					                    // Set rejected status and reason
					                    String reason = approvalResponse.getRemarks();
					                    dailyproductionReport.setHod_status(AppConstants.hodRejectedStatus);
					                    dailyproductionReport.setHod_submit_on(date);
					                    dailyproductionReport.setHod_submit_by(userName);
					                    dailyproductionReport.setHod_submit_id(userId);
					                    dailyproductionReport.setReason(reason);

					                    Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
					                    byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					                    baleConsumptionReport.setHod_signature_image(signature);
					                    dailyproductionReport.setHod_sign(userName);

					                    // Save updated bale consumption report
					                    dailyproductiondetailspleateandwoolrollf006repository.save(dailyproductionReport);

					                    String date1 = dailyproductionReport.getDate();
						                String shift = dailyproductionReport.getShift();
						                String machine_name = dailyproductionReport.getProduct_name();
						                
						                String order_no = dailyproductionReport.getOrder_no();
						                
					                    // Update history with the rejection details
						                
					                    history = dailyproductiondetailspleateandwoolrollhistoryf006repository.fetchLastSubmittedRecord(date1,shift,machine_name,order_no);

					                    history.setHod_status(AppConstants.hodRejectedStatus);
					                    history.setHod_submit_on(date);
					                    history.setHod_submit_by(userName);
					                    history.setHod_submit_id(userId);
					                    history.setHod_sign(userName);

					                    dailyproductiondetailspleateandwoolrollhistoryf006repository.save(history);

					                    return new ResponseEntity<>(new ApiResponse(true, "Production Report Rejected Successfully"), HttpStatus.OK);

					                }
					            }
					            }else if (dailyproductionReport.getOperator_status().equalsIgnoreCase(AppConstants.operatorApprove)
					    					&&dailyproductionReport.getSupervisor_status().equalsIgnoreCase(AppConstants.waitingStatus)) {

					    				if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {

					    					if (approvalResponse.getStatus().equals("Approve")) {
					    						dailyproductionReport.setSupervisor_status(AppConstants.supervisorApprovedStatus);
					    						dailyproductionReport.setSupervisor_submit_on(date);
					    						dailyproductionReport.setSupervisor_submit_by(userName);
					    						dailyproductionReport.setSupervisor_submit_id(userId);

					    						dailyproductionReport.setHod_status(AppConstants.waitingStatus);		
					    						
					    						Optional<UserImageDetails> imageDetailsOpt = imageRepository
					    								.fetchItemDetailsByUsername(userName);
					    						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					    						dailyproductionReport.setSupervisor_signature_image(signature);
					    						dailyproductionReport.setSupervisor_sign(userName);

					    						dailyproductiondetailspleateandwoolrollf006repository.save(dailyproductionReport);
					    						 String date1 = dailyproductionReport.getDate();
					 			                String shift = dailyproductionReport.getShift();
					 			                String machine_name = dailyproductionReport.getProduct_name();
					 			                
					 			               String order_no = dailyproductionReport.getOrder_no();
					 			               
					    						history = dailyproductiondetailspleateandwoolrollhistoryf006repository.fetchLastSubmittedRecord(date1,shift,machine_name,order_no);

					    						history.setSupervisor_status(AppConstants.supervisorApprovedStatus);
					    						history.setSupervisor_submit_on(date);
					    						history.setSupervisor_submit_by(userName);
					    						history.setSupervisor_submit_id(userId);
					    						history.setSupervisor_sign(userName);

					    						history.setHod_status(AppConstants.waitingStatus);		
					    						
					    						dailyproductiondetailspleateandwoolrollhistoryf006repository.save(history);
					    						try {

					    							drygoodsmailfunction.sendEmailToHodF005(dailyproductionReport);
					    								} catch (Exception ex) {
					    									return new ResponseEntity<>(
					    											new ApiResponse(false, "Approved but Unable to send mail! "),
					    											HttpStatus.OK);
					    								}
					    						
					    						return new ResponseEntity<>(new ApiResponse(true, "Supervisor Approved Successfully"),
					    								HttpStatus.OK);

					    					} else if (approvalResponse.getStatus().equals("Reject")) {
					    						String reason = approvalResponse.getRemarks();
					    						dailyproductionReport.setReason(reason);
					    						dailyproductionReport.setSupervisor_status(AppConstants.supervisorRejectedStatus);
					    						dailyproductionReport.setSupervisor_submit_on(date);
					    						dailyproductionReport.setSupervisor_submit_by(userName);
					    						dailyproductionReport.setSupervisor_submit_id(userId);

					    						Optional<UserImageDetails> imageDetailsOpt = imageRepository
					    								.fetchItemDetailsByUsername(userName);
					    						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//					    						dailyproductionReport.setSupervisor_signature_image(signature);
					    						dailyproductionReport.setSupervisor_sign(userName);

					    						dailyproductiondetailspleateandwoolrollf006repository.save(dailyproductionReport);
					    						 String date1 = dailyproductionReport.getDate();
					 			                String shift = dailyproductionReport.getShift();
					 			                String machine_name = dailyproductionReport.getProduct_name();
					 			                
					 			               String order_no = dailyproductionReport.getOrder_no();			               
					 			       
					    						history = dailyproductiondetailspleateandwoolrollhistoryf006repository.fetchLastSubmittedRecord(date1,shift,machine_name,order_no);

					    						history.setReason(reason);
					    						history.setSupervisor_status(AppConstants.supervisorRejectedStatus);
					    						history.setSupervisor_submit_on(date);
					    						history.setSupervisor_submit_by(userName);
					    						history.setSupervisor_submit_id(userId);
					    						history.setSupervisor_sign(userName);

					    						dailyproductiondetailspleateandwoolrollhistoryf006repository.save(history);

					    					} else {
					    						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					    					}

					    				} else {
					    					return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to Approve"),
					    							HttpStatus.BAD_REQUEST);
					    				}
					            }
					                else {
					                    return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					                }

					            
					    } catch (Exception e) {
					        String msg = e.getMessage();
					        logger.error("Unable to Approve/Reject Production Report: " + msg);
					        return new ResponseEntity<>(new ApiResponse(false, "Failed to Approve/Reject Production Report " + msg), HttpStatus.BAD_REQUEST);
					    }

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"),
								HttpStatus.OK);

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
		
		
		
	// GET CUSTOMER NAME 
		
	public ResponseEntity<?> fetchCustomerName(String orderNumber) {
		
		String value = "";
		
		List<String> valueList = new ArrayList<String>();
		
		List<IdAndValuePair> valuePairList = new ArrayList<IdAndValuePair>();
		
		try {
			
			valueList = productionDetailsRepository.getProductCode(orderNumber);
			
			IdAndValuePair idValuePair = new IdAndValuePair();
			
			Long id = (long) 1;
			
			for(String temp : valueList) {
				
				IdAndValuePair pair = new IdAndValuePair();
				pair.setValue(temp);
				pair.setId(id);
				
				valuePairList.add(pair);
				id++;
			}
			
		} catch (Exception e) {
	        String msg = e.getMessage();
	        logger.error("Unable to get Production Report: " + msg);
	        return new ResponseEntity<>(new ApiResponse(false, "Failed to get Production Report " + msg), HttpStatus.BAD_REQUEST);
	    }
	
		return new ResponseEntity(valuePairList, HttpStatus.OK);
		
	}
	
	
		
	
}
