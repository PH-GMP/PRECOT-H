package com.focusr.Precot.mssql.database.controller.splunance;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.model.splunance.DailyStoppageReportSpunlaceF008;
import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupDetailsJetlaceAndDryerF003;
import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupVerificationOpeningLineF002;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceSampleReportF012;
import com.focusr.Precot.mssql.database.repository.splunance.DailyStoppageReportSpunlaceF008Repository;
import com.focusr.Precot.mssql.database.repository.splunance.ProcessSetupDetailsJetlaceAndDryerF003Repository;
import com.focusr.Precot.mssql.database.repository.splunance.ProcessSetupVerificationOpeningLineF002Repository;
import com.focusr.Precot.mssql.database.repository.splunance.SpunlaceSampleReportF012Repository;
import com.focusr.Precot.mssql.database.service.splunance.SpunlaceService3;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;

@RestController
@RequestMapping("/api/spulance")
public class SpunlaceController3 {
	
	@Autowired
	private SpunlaceService3 spunlaceservice3;
	
	@Autowired
	ProcessSetupDetailsJetlaceAndDryerF003Repository  processsetupdetailsjetlaceanddryerf003repository;
	
	@Autowired
	ProcessSetupVerificationOpeningLineF002Repository processsetupverificationopeninglinef002repository;
	@Autowired
	DailyStoppageReportSpunlaceF008Repository dailystoppagereportspunlacef008repository;
	
	@Autowired
	SpunlaceSampleReportF012Repository spunlacesamplereportf012repository;
	
	//F003//
	//SAVE F003//
	  @PostMapping("/saveProcessSetupJetLaceF003")
	    public ResponseEntity<?> saveProcessSetup(@RequestBody ProcessSetupDetailsJetlaceAndDryerF003 processSetupDetails,
	                                              HttpServletRequest http) {
	       
	            ResponseEntity<?> savedDetails = spunlaceservice3.saveProcessSetupJetLaceF003(processSetupDetails, http);
	            return savedDetails;
	       
	    }

	  //SUBMIT F003//
	  @PostMapping("/submitProcessSetupJetLaceF003")
	    public ResponseEntity<?> submitProcessSetup(@RequestBody ProcessSetupDetailsJetlaceAndDryerF003 processSetupDetails,
	                                                HttpServletRequest http) {
	    
	            ResponseEntity<?> submittedDetails = spunlaceservice3.submitProcessSetupJetLaceF003(processSetupDetails, http);
	            return submittedDetails;
	       
	    }
	  
	  @GetMapping("/getdetailsForPrintF003")
	    public ResponseEntity<?> getdetailsForPrintF003(
	            @RequestParam (required = false)String order_no, 
	            @RequestParam(required = false) String date, 
	            @RequestParam(required = false) String shift) {
		  try {
	        List<ProcessSetupDetailsJetlaceAndDryerF003> records = processsetupdetailsjetlaceanddryerf003repository.printParam(order_no, date, shift);
	        
	        return new ResponseEntity<>(records, HttpStatus.OK);
	        
		  } catch (Exception ex) {
	            return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()), HttpStatus.BAD_REQUEST);
	        }
	    }
	  @GetMapping("/getdetailsbyParamF003")
	    public ResponseEntity<?> getdetailsByParamF003(
	            @RequestParam String order_no, 
	            @RequestParam String date, 
	            @RequestParam String shift) {
		  try {
	        ProcessSetupDetailsJetlaceAndDryerF003 records = processsetupdetailsjetlaceanddryerf003repository.getdetailsbyParam(order_no, date, shift);
	        
	        return new ResponseEntity<>(records, HttpStatus.OK);
	        
		  } catch (Exception ex) {
	            return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()), HttpStatus.BAD_REQUEST);
	        }
	    }
	  
	  @GetMapping("/getSummarydetailsF003")
	    public ResponseEntity<?> getSummarydetailsF003() {
		 
	    ResponseEntity<?> records = spunlaceservice3.summaryProcessSetupJetLaceF003();
	        
	        return records;
	        
		 
	    }
	  //approve or reject
	  @PutMapping("/ProcessSetupJetLaceF003/approveOrReject")
		public ResponseEntity<?> approveRejectionReportF003(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
			
			ResponseEntity<?> resp = spunlaceservice3.approveRejectProcessSetupJetLaceF003(approvalResponse, http);
			return resp;
		}
		
	  //---------------------------------------------------------------------F002-------------------------------------------------------------------------------------//
	  
	//SAVE F002//
	  @PostMapping("/saveProcessSetupVerificationOpeningLineF002")
	    public ResponseEntity<?> saveProcessSetupVerificationOpeningLineF002 (@RequestBody ProcessSetupVerificationOpeningLineF002 processSetupDetails,
	                                              HttpServletRequest http) {
	       
	            ResponseEntity<?> savedDetails = spunlaceservice3.saveProcessVerificationF002(processSetupDetails, http);
	            return savedDetails;
	       
	    }

	  //SUBMIT F002//
	  @PostMapping("/submitProcessSetupVerificationOpeningLineF002")
	    public ResponseEntity<?> submitProcessSetupVerificationOpeningLineF002 (@RequestBody ProcessSetupVerificationOpeningLineF002 processSetupDetails,
	                                                HttpServletRequest http) {
	    
	            ResponseEntity<?> submittedDetails = spunlaceservice3.submitProcessVerificationF002(processSetupDetails, http);
	            return submittedDetails;
	       
	    }
	  
	  @GetMapping("/getdetailsForPrintF002")
	    public ResponseEntity<?> getdetailsForPrintF002(
	            @RequestParam(required = false) String order_no, 
	            @RequestParam(required = false) String date, 
	            @RequestParam(required = false) String shift) {
		  try {
	        List<ProcessSetupVerificationOpeningLineF002> records = processsetupverificationopeninglinef002repository.printParam(order_no, date, shift);
	        
	        return new ResponseEntity<>(records, HttpStatus.OK);
	        
		  } catch (Exception ex) {
	            return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()), HttpStatus.BAD_REQUEST);
	        }
	    }
	  @GetMapping("/getdetailsbyParamF002")
	    public ResponseEntity<?> getdetailsByParamF002(
	            @RequestParam String order_no, 
	            @RequestParam String date, 
	            @RequestParam String shift) {
		  try {
			  ProcessSetupVerificationOpeningLineF002 records = processsetupverificationopeninglinef002repository.getdetailsbyParam(order_no, date, shift);
	        
	        return new ResponseEntity<>(records, HttpStatus.OK);
	        
		  } catch (Exception ex) {
	            return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()), HttpStatus.BAD_REQUEST);
	        }
	    }
	  
	  @GetMapping("/getSummarydetailsF002")
	    public ResponseEntity<?> getSummarydetailsF002() {
		 
	    ResponseEntity<?> records = spunlaceservice3.summaryProcessVerificationF002();
	        
	    return records;
	        
		 
	    }
	  //approve or reject
	  @PutMapping("/ProcessSetupVerificationOpeningLineF002/approveOrReject")
		public ResponseEntity<?> approveRejectionReportF07(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
			
			ResponseEntity<?> resp = spunlaceservice3.approveRejectProcessVerificationF002(approvalResponse, http);
			return resp;
		}
		
	  //---------------------------------------------------------------------F008-------------------------------------------------------------------------------------//
	  
		//SAVE F008//
		  @PostMapping("/saveDailyStoppageDetailsF008")
		    public ResponseEntity<?> saveDailyStoppageDetailsF008 (@RequestBody DailyStoppageReportSpunlaceF008 dailyStoppageReport,
		                                              HttpServletRequest http) {
		       
		            ResponseEntity<?> savedDetails = spunlaceservice3.saveDailyStoppageReport(dailyStoppageReport, http);
		            return savedDetails;
		       
		    }

		  //SUBMIT F008//
		  @PostMapping("/submitDailyStoppageDetailsF008")
		    public ResponseEntity<?> submitDailyStoppageDetailsF008 (@RequestBody DailyStoppageReportSpunlaceF008 dailyStoppageReport,
		                                                HttpServletRequest http) {
		    
		            ResponseEntity<?> submittedDetails = spunlaceservice3.submitDailyStoppageReport(dailyStoppageReport, http);
		            return submittedDetails;
		       
		    }
		  
		  @GetMapping("/getdetailsForPrintF008")
		    public ResponseEntity<?> getdetailsForPrintF008(@RequestParam String date) {
			  try {
		        List<DailyStoppageReportSpunlaceF008> records = dailystoppagereportspunlacef008repository.printParam( date);
		        
		        return new ResponseEntity<>(records, HttpStatus.OK);
		        
			  } catch (Exception ex) {
		            return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()), HttpStatus.BAD_REQUEST);
		        }
		    }
		  @GetMapping("/getdetailsbyParamF008")
		    public ResponseEntity<?> getdetailsByParamF008(@RequestParam String date) {
			  try {
				  List<DailyStoppageReportSpunlaceF008> records = dailystoppagereportspunlacef008repository.getdetailsbyParam(date);
		        
		        return new ResponseEntity<>(records, HttpStatus.OK);
		        
			  } catch (Exception ex) {
		            return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()), HttpStatus.BAD_REQUEST);
		        }
		    }
		  
		  @GetMapping("/getSummarydetailsF008")
		    public ResponseEntity<?> getSummarydetailsF008() {
			 
		    ResponseEntity<?> records = spunlaceservice3.summarydailyStoppageReport();
		        
		    return records;
		        
			 
		    }
		  //approve or reject
		  @PutMapping("/DailyStoppageDetailsF008/approveOrReject")
			public ResponseEntity<?> approveRejectionReportF008(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
				
				ResponseEntity<?> resp = spunlaceservice3.approveRejectDailyStoppageReport(approvalResponse, http);
				return resp;
			}
		  //---------------------------------------------------------------------F012-------------------------------------------------------------------------------------//
		  
			//SAVE F012//
			  @PostMapping("/saveSampleReportDetailsF012")
			    public ResponseEntity<?> saveSampleReportDetailsF012 (@RequestBody SpunlaceSampleReportF012 sampleReport,
			                                              HttpServletRequest http) {
			       
			            ResponseEntity<?> savedDetails = spunlaceservice3.saveSpunlaceSampleReportF012(sampleReport, http);
			            return savedDetails;
			       
			    }

			  //SUBMIT F012//
			  @PostMapping("/submitSampleReportDetailsF012")
			    public ResponseEntity<?> submitSampleReportDetailsF012 (@RequestBody SpunlaceSampleReportF012 sampleReport,
			                                                HttpServletRequest http) {
			    
			            ResponseEntity<?> submittedDetails = spunlaceservice3.submitSampleReportF012(sampleReport, http);
			            return submittedDetails;
			       
			    }
			  
			  @GetMapping("/getSampleReportDetailsF012")
			    public ResponseEntity<?> getSampleReportDetailsF012(@RequestParam String order_no,@RequestParam String shift,@RequestParam String date) {
				  try {
			        List<SpunlaceSampleReportF012> records = spunlacesamplereportf012repository.printParam(order_no,shift,date);
			        
			        return new ResponseEntity<>(records, HttpStatus.OK);
			        
				  } catch (Exception ex) {
			            return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()), HttpStatus.BAD_REQUEST);
			        }
			    }
			  @GetMapping("/getdetailsbyParamF012")
			    public ResponseEntity<?> getdetailsbyParamF012(@RequestParam String order_no,@RequestParam String shift,@RequestParam String date) {
				  try {
					  List<SpunlaceSampleReportF012> records = spunlacesamplereportf012repository.getdetailsbyParam(order_no,shift,date);
			        
			        return new ResponseEntity<>(records, HttpStatus.OK);
			        
				  } catch (Exception ex) {
			            return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()), HttpStatus.BAD_REQUEST);
			        }
			    }
			  
			  @GetMapping("/getSummarydetailsF012")
			    public ResponseEntity<?> getSummarydetailsF012() {
				 
			    ResponseEntity<?> records = spunlaceservice3.summarySampleReportF012();
			        
			    return records;
			        
				 
			    }
	  
			  //approve or reject
			  @PutMapping("/SummarydetailsF012/approveOrReject")
				public ResponseEntity<?> approveRejectionReportF012(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
					
					ResponseEntity<?> resp = spunlaceservice3.approveRejectSpunlaceSampleReportF012(approvalResponse, http);
					return resp;
				}
}
