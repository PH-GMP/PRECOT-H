package com.focusr.Precot.mssql.database.controller.drygoods;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.model.drygoods.BaleConsumptionReportDryGoodsF001;
import com.focusr.Precot.mssql.database.model.drygoods.BallpleateAndWoolRollFinishedGoodsTransferRecordF011;
import com.focusr.Precot.mssql.database.model.drygoods.DailyProductionCottonBallsF003;
import com.focusr.Precot.mssql.database.model.drygoods.DailyProductionDetailsPleateAndWoolRollF006;
import com.focusr.Precot.mssql.database.repository.drygoods.BaleConsumptionReportDryGoodsF001Repository;
import com.focusr.Precot.mssql.database.repository.drygoods.BallpleateAndWoolRollFinishedGoodsTransferRecordF011Repository;
import com.focusr.Precot.mssql.database.repository.drygoods.DailyProductionCottonBallsF003Repository;
import com.focusr.Precot.mssql.database.repository.drygoods.DailyProductionDetailsPleateAndWoolRollF006Repository;
import com.focusr.Precot.mssql.database.service.drygoods.DryGoodsService3;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;


@RestController
@RequestMapping("/api/drygoods")
public class DryGoodsController3 {

	@Autowired
	private DryGoodsService3 drygoodsservice3;
	
	@Autowired
	BaleConsumptionReportDryGoodsF001Repository baleconsumptionreportdrygoodsf001repository;
	
	@Autowired
	DailyProductionCottonBallsF003Repository dailyproductioncottonballsf003repository;
	
	@Autowired
	BallpleateAndWoolRollFinishedGoodsTransferRecordF011Repository ballpleateandwoolrollfinishedgoodstransferrecordf011repository;
	
	@Autowired
	DailyProductionDetailsPleateAndWoolRollF006Repository dailyproductiondetailspleateandwoolrollf006repository;
	
//*********************F001 PDE **************************************************************************************************
	@GetMapping("/baleReport")
	public ResponseEntity<?> fetchSpulanceOrderDetails(  @RequestParam(required = false) String date, 
            @RequestParam(required = false) String shift, @RequestParam String laydown_no) {

		ResponseEntity<?> resp = drygoodsservice3.getBaleReport(date,shift, laydown_no);
		return resp;
	}
	//----------------------F006 PDE---------------------------------------------------//
	@GetMapping("/getHeaderDetailsbyOrderNoF006")
	public ResponseEntity<?> getHeaderDetailsbyOrderNo(@RequestParam Map<String, String> requestParams) {

		String order_no = requestParams.get("order_no");
	

		ResponseEntity<?> resp = drygoodsservice3.getHeaderDetails(order_no);
		return resp;
	}
	
	@GetMapping("/OrderLovForF006")
	public ResponseEntity<?> orderLovForF006() {

		   List<String> resp = baleconsumptionreportdrygoodsf001repository.fetchOrderForF006();
		   return ResponseEntity.ok(resp);
	}
	
	@GetMapping("/FleecetDetailsF006")
	public ResponseEntity<?> fetchFleecetDetailsF006(@RequestParam Map<String, String> requestParams) {

		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		String order_no = requestParams.get("order_no");

		ResponseEntity<?> resp = drygoodsservice3.getFleecetDetails(date,shift,order_no);
		return resp;
	}
	
	@GetMapping("/getStoppageDetailsF006")
	public ResponseEntity<?> fetchStoppageDetailsF006(@RequestParam Map<String, String> requestParams) {

		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		String order_no = requestParams.get("order_no");
		String machine_name = requestParams.get("machine_name");
		ResponseEntity<?> resp = drygoodsservice3.fetchStoppageDetailsF006(date,shift,order_no,machine_name);
		return resp;
	}
	//---------------------------------------------------------------------------------------------------------//
	  //SUBMIT F001//
	  @PostMapping("/submitBaleConsumptionReportF001")
	    public ResponseEntity<?> submitBaleConsumptionReport(@RequestBody  BaleConsumptionReportDryGoodsF001 baleconsumptionreport,
	                                                HttpServletRequest http) {
	    
	            ResponseEntity<?> submittedDetails = drygoodsservice3.submitBaleConsumptionReportF001(baleconsumptionreport, http);
	            return submittedDetails;
	       
	    }
	  
	  @GetMapping("/getdetailsForPrintF001")
	    public ResponseEntity<?> getdetailsForPrintF001(
	            @RequestParam(required = false) String date, 
	            @RequestParam(required = false) String shift ,
	            @RequestParam (required = false)String laydown_no){
		  try {
	        List<BaleConsumptionReportDryGoodsF001> records = baleconsumptionreportdrygoodsf001repository.printParam(date, shift,laydown_no);
	        
	        return new ResponseEntity<>(records, HttpStatus.OK);
	        
		  } catch (Exception ex) {
	            return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()), HttpStatus.BAD_REQUEST);
	        }
	    }
	  @GetMapping("/getdetailsbyParamF001")
	    public ResponseEntity<?> getdetailsByParamF001( 
	            @RequestParam String date, 
	            @RequestParam String shift,
	            @RequestParam String laydown_no) {
		  try {
			  BaleConsumptionReportDryGoodsF001 records = baleconsumptionreportdrygoodsf001repository.getdetailsbyParam(date, shift,laydown_no);
	        
	        return new ResponseEntity<>(records, HttpStatus.OK);
	        
		  } catch (Exception ex) {
	            return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()), HttpStatus.BAD_REQUEST);
	        }
	    }
	  
	  @GetMapping("/getSummarydetailsF001")
	    public ResponseEntity<?> getSummarydetailsF001() {
		 
	    ResponseEntity<?> records = drygoodsservice3.summarybaleconsumptionreportF001();
	        
	        return records;
	        
		 
	    }
	  //approve or reject
	  @PutMapping("/BaleConsumptionReportF001/approveOrReject")
		public ResponseEntity<?> approveRejectionReportF001(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
			
			ResponseEntity<?> resp = drygoodsservice3.approveRejectBaleConsumptionReport(approvalResponse, http);
			return resp;
		}
	  
//***********************************************************F003*******************************************************************************//
	 //*****************************************************PDE************************************************************************************//
	  @GetMapping("/getDrygoodsOrderNoLov")
	  public ResponseEntity<List<String>> getCottonOrderLov() {
	      List<String> records = dailyproductioncottonballsf003repository.cottonOrderLov();
	      return ResponseEntity.ok(records);
	  }
	  
	  @GetMapping("/getDrygoodsOrderDetailsPdeF003")
	  public ResponseEntity<?> getOrderDetailsPdeF003( @RequestParam String order_no) {
		  ResponseEntity<?> records = drygoodsservice3.fetchpdeDetailsF003(order_no);
	      return records;
	  }
	  
	  @GetMapping("/getDrygoodsStoppageDetailsF003")
	  public ResponseEntity<?> getStoppageDetailsF003(@RequestParam String date,@RequestParam String shift, @RequestParam String order_no,@RequestParam String machine_name) {
		  ResponseEntity<?> records = drygoodsservice3.fetchStoppageDetailsF003(date,shift,order_no,machine_name);
	      return records;
	  }  
		 
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------//	    
  //SAVE F003//
	  @PostMapping("/saveDailyProductionCottonBallsF003")
	    public ResponseEntity<?> saveDailyProductionCottonBallsF003(@RequestBody  DailyProductionCottonBallsF003 dailyproductioncottonballsf003,
	                                                HttpServletRequest http) {
	    
	            ResponseEntity<?> submittedDetails = drygoodsservice3.saveDailyProductionCottonBalls(dailyproductioncottonballsf003, http);
	            return submittedDetails;
	       
	    }
	  //SUBMIT F003//
	  @PostMapping("/submitDailyProductionCottonBallsF003")
	    public ResponseEntity<?> submitDailyProductionCottonBallsF003(@RequestBody  DailyProductionCottonBallsF003 dailyproductioncottonballsf003,
	                                                HttpServletRequest http) {
	    
	            ResponseEntity<?> submittedDetails = drygoodsservice3.submitDailyProductionCottonBallsF003(dailyproductioncottonballsf003, http);
	            return submittedDetails;
	       
	    }
	  
	  @GetMapping("/getdetailsForPrintF003")
	    public ResponseEntity<?> getdetailsForPrintF003(
	           
	            @RequestParam(required = false) String date, 
	            @RequestParam(required = false) String shift,
	            @RequestParam (required = false)String machine_name,
	            @RequestParam (required = false)String order_no
	            ) {
		  try {
	        List<DailyProductionCottonBallsF003> records = dailyproductioncottonballsf003repository.printParam(date, shift,machine_name,order_no);
	        
	        return new ResponseEntity<>(records, HttpStatus.OK);
	        
		  } catch (Exception ex) {
	            return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()), HttpStatus.BAD_REQUEST);
	        }
	    }
	  @GetMapping("/getdetailsbyParamF003")
	    public ResponseEntity<?> getdetailsByParamF003(
	           
	            @RequestParam String date, 
	            @RequestParam String shift,
	            @RequestParam String machine_name,
	            @RequestParam String order_no ) {
		  try {
			  DailyProductionCottonBallsF003 records = dailyproductioncottonballsf003repository.getdetailsbyParam(date, shift,machine_name,order_no);
	        
	        return new ResponseEntity<>(records, HttpStatus.OK);
	        
		  } catch (Exception ex) {
	            return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()), HttpStatus.BAD_REQUEST);
	        }
	    }
	  
	  @GetMapping("/getSummarydetailsF003")
	    public ResponseEntity<?> getSummarydetailsF003() {
		 
	    ResponseEntity<?> records = drygoodsservice3.summaryDailyProductionCottonF003();
	        
	        return records;
	        
		 
	    }
	  //approve or reject
	  @PutMapping("/DailyProductionCottonBallsF003/approveOrReject")
		public ResponseEntity<?> approveRejectionReportF003(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
			
			ResponseEntity<?> resp = drygoodsservice3.approveRejectDailyProduction(approvalResponse, http);
			return resp;
		}
	  
	  //--------------------------------------------------F011---------------------------------------------------------------------------------------------------------------//
	  
	  //SAVE F011//
	  @PostMapping("/savefinishedgoodsDetailsF011")
	    public ResponseEntity<?> savefinishedgoodsDetailsF011(@RequestBody BallpleateAndWoolRollFinishedGoodsTransferRecordF011 finishedgoods,
	                                                HttpServletRequest http) {
	    
	            ResponseEntity<?> submittedDetails = drygoodsservice3.saveBallpleateAndWoolRollFinishedGoodsTransferRecordF011(finishedgoods, http);
	            return submittedDetails;
	       
	    }
  @PostMapping("/submitfinishedgoodsDetailsF011")
	    public ResponseEntity<?> submitfinishedgoodsDetailsF011(@RequestBody  BallpleateAndWoolRollFinishedGoodsTransferRecordF011 finishedgoods,
	                                                HttpServletRequest http) {
	    
	            ResponseEntity<?> submittedDetails = drygoodsservice3.submitBallpleateAndWoolRollFinishedGoodsTransferRecordF011(finishedgoods, http);
	            return submittedDetails;
	       
	    }
	  @GetMapping("/getdetailsbyParamF011")
	    public ResponseEntity<?> getdetailsByParamF011(
	           
	            @RequestParam String date, 
	            @RequestParam String shift
	           ) {
		  try {
			  BallpleateAndWoolRollFinishedGoodsTransferRecordF011 records = ballpleateandwoolrollfinishedgoodstransferrecordf011repository.getdetailsbyParam(date, shift);
	        
	        return new ResponseEntity<>(records, HttpStatus.OK);
	        
		  } catch (Exception ex) {
	            return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()), HttpStatus.BAD_REQUEST);
	        }
	    }
	  
	  @GetMapping("/getSummarydetailsF011")
	    public ResponseEntity<?> getSummarydetailsF011() {
		 
	    ResponseEntity<?> records = drygoodsservice3.summaryGoodsTranferRecordF011();
	        
	        return records;
	        
		 
	    }
	  
	  @GetMapping("/getdetailsForPrintF011")
	    public ResponseEntity<?> getdetailsForPrintF011(
	           
	            @RequestParam(required = false) String date, 
	            @RequestParam(required = false) String shift
	           ) {
		  try {
	        List<BallpleateAndWoolRollFinishedGoodsTransferRecordF011> records = ballpleateandwoolrollfinishedgoodstransferrecordf011repository.printParam( date, shift);
	        
	        return new ResponseEntity<>(records, HttpStatus.OK);
	        
		  } catch (Exception ex) {
	            return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()), HttpStatus.BAD_REQUEST);
	        }
	    }
	  
	  
	  	// DELETE API 
	  
	  @DeleteMapping("/deleteGoodsTransferLine")
		public ResponseEntity<?> deleteStoppageProductionLine(@RequestParam Map<String, String> requestParams, Principal principal) {
			
			Long id = Long.parseLong(requestParams.get("id"));
			
			ResponseEntity<?> resp = drygoodsservice3.deleteGoodsTransferRecord(id);
			return resp;
		}
	  
	  
	  @GetMapping("/fetchRecordSignature")
	  public ResponseEntity<?> fetchFGSignature() {
		  
		  ResponseEntity<?> resp = drygoodsservice3.recordTransferList();
		  return resp;
	  }
	  
	  
	  
	//----------------------------------F006  ----------------------------------------------------------------
	  //SAVE F003//
	  @PostMapping("/saveDailyProductionWoolRollAndPleateF006")
	    public ResponseEntity<?> saveDailyProductionWoolRollAndPleateF006(@RequestBody  DailyProductionDetailsPleateAndWoolRollF006 dailyproductioncottonballsf003,
	                                                HttpServletRequest http) {
	    
	            ResponseEntity<?> submittedDetails = drygoodsservice3.saveDailyProductionDetailsPleateAndWoolRollF006(dailyproductioncottonballsf003, http);
	            return submittedDetails;
	       
	    }
	  //SUBMIT F003//
	  @PostMapping("/submitDailyProductionWoolRollAndPleateF006")
	    public ResponseEntity<?> submitDailyProductionWoolRollAndPleateF006(@RequestBody  DailyProductionDetailsPleateAndWoolRollF006 dailyproductioncottonballsf003,
	                                                HttpServletRequest http) {
	    
	            ResponseEntity<?> submittedDetails = drygoodsservice3.submitDailyProductionPleateAndWoolRollF006(dailyproductioncottonballsf003, http);
	            return submittedDetails;
	       
	    }
	  
	  @GetMapping("/getdetailsForPrintF006")
	    public ResponseEntity<?> getdetailsForPrintF006(
	           
	            @RequestParam(required = false) String date, 
	            @RequestParam(required = false) String shift,
	            @RequestParam (required = false)String machine_name,
	            @RequestParam (required = false) String order_no ) {
		  try {
	        List<DailyProductionDetailsPleateAndWoolRollF006> records = dailyproductiondetailspleateandwoolrollf006repository.printParam( date, shift,machine_name, order_no);
	        
	        return new ResponseEntity<>(records, HttpStatus.OK);
	        
		  } catch (Exception ex) {
	            return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()), HttpStatus.BAD_REQUEST);
	        }
	    }
	  @GetMapping("/getdetailsbyParamF006")
	    public ResponseEntity<?> getdetailsByParamF006(
	           
	            @RequestParam String date, 
	            @RequestParam String shift,
	            @RequestParam String machine_name,
	            @RequestParam String order_no) {
		  try {
			  DailyProductionDetailsPleateAndWoolRollF006 records = dailyproductiondetailspleateandwoolrollf006repository.getdetailsbyParam(date, shift,machine_name, order_no);
	        
	        return new ResponseEntity<>(records, HttpStatus.OK);
	        
		  } catch (Exception ex) {
	            return new ResponseEntity<>(new ApiResponse(false, "unable to get the details: " + ex.getMessage()), HttpStatus.BAD_REQUEST);
	        }
	    }
	  
	  @GetMapping("/getSummarydetailsF006")
	    public ResponseEntity<?> getSummarydetailsF006() {
		 
	    ResponseEntity<?> records = drygoodsservice3.summaryDailyProductionF006();
	        
	        return records;
	        
		 
	    }
	  //approve or reject
	  @PutMapping("/DailyProductionCottonBallsF006/approveOrReject")
		public ResponseEntity<?> approveRejectionReportF006(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
			
			ResponseEntity<?> resp = drygoodsservice3.approveRejectDailyProductionPletaeAndWool(approvalResponse, http);
			return resp;
		}
	  
	  
	  
	  // CUSTOMER NAME 
	  
	  @GetMapping("/fetchCustomers")
	  public ResponseEntity<?> fetchCustomer(@RequestParam Map<String, String> requestParams, Principal principal) {
		  
		  String orderNumber = requestParams.get("orderNumber");
		  ResponseEntity<?> resp = drygoodsservice3.fetchCustomerName(orderNumber);
		  
		  return resp;
	  }
	  
	  
}
