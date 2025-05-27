package com.focusr.Precot.mssql.database.controller.engineering;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.model.Store.NonReturnableGatePassF006;
import com.focusr.Precot.mssql.database.model.Store.ReceptionCheckListF003;
import com.focusr.Precot.mssql.database.model.engineering.BreakdownIntimationSlipF003;
import com.focusr.Precot.mssql.database.model.engineering.RootCauseAnalysisF004;
import com.focusr.Precot.mssql.database.model.engineering.WeightScalesCalibrationF016;
import com.focusr.Precot.mssql.database.model.engineering.WorkOrderRequestFormF020;
import com.focusr.Precot.mssql.database.model.productDevelopment.ProductDevelopmentSheetF001;
import com.focusr.Precot.mssql.database.repository.engineering.BreakdownIntimationSlipRepoF003;
import com.focusr.Precot.mssql.database.repository.engineering.RootCauseAnalysisRepoF004;
import com.focusr.Precot.mssql.database.repository.engineering.WorkOrderRequestFormRepoF020;
import com.focusr.Precot.mssql.database.service.engineering.EngineeringService9;
import com.focusr.Precot.payload.ApproveResponse;



@RestController
@RequestMapping("/api/Engineering")
public class EngineeringController9 {
	
	@Autowired 
	private EngineeringService9 engService;
	
	
	@Autowired 
	private BreakdownIntimationSlipRepoF003 breakdownSlipRepo;
	
	@Autowired 
	private RootCauseAnalysisRepoF004 rootCauseRepo;
	
	@Autowired 
	private WorkOrderRequestFormRepoF020 workOrderRepo;
	
	
	
	 @GetMapping("/lastBsiNo")
	 public ResponseEntity<?> BsiNOGenerationController() {
	     ResponseEntity<?> resp = engService.generatebsiNo();
	     return resp;
	 }
	 
	 @GetMapping("/lastRcaNo")
	 public ResponseEntity<?> grcNOsGenerationController() {
	     ResponseEntity<?> resp = engService.generateRcaNo();
	     return resp;
	 }
	 
	 @GetMapping("/lastWoRNo")
	 public ResponseEntity<?> WorNoGenerationController() {
	     ResponseEntity<?> resp = engService.generateWorNo();
	     return resp;
	 }
	
	
	@PostMapping("/weightScale/Save")
	public ResponseEntity<?> SaveWeightCalibration(HttpServletRequest http,
			@Valid @RequestBody WeightScalesCalibrationF016 weightScalesF016, BindingResult result,
			Principal principal) {

		ResponseEntity<?> response = engService.SaveWeightCalibration(weightScalesF016, http);
		return response;

		
	}
	
	  @GetMapping("/getMachinesByDepartment")
	    public ResponseEntity<?> getMachinesByDepartment(@RequestParam String department) {
	        List<WeightScalesCalibrationF016> calibrations = engService.getMachinesByDepartment(department);
	        
	        if (calibrations.isEmpty()) {
	            return ResponseEntity.status(404).body("No machines found for department: " + department);
	        }

	        // Return only the MACHINE_ID_NO as a list
	        List<String> machineIds = calibrations.stream()
	                                              .map(WeightScalesCalibrationF016::getMachineIdNo)
	                                              .collect(Collectors.toList());
	        return ResponseEntity.ok(machineIds);
	    }
	
	@PostMapping("/weightScale/Submit")
	public ResponseEntity<?> submitHandSanitization(HttpServletRequest http,
			@Valid @RequestBody WeightScalesCalibrationF016 weightScalesF016, BindingResult result,
			Principal principal) {

		ResponseEntity<?> response = engService.SubmitWeightCalibration(weightScalesF016, http);
		return response;

	}
	
	@PutMapping("/weightScale/approveOrReject")
	public ResponseEntity<?> approveOrRejectF41(@Valid @RequestBody ApproveResponse approveResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = engService.approveRejectWeightCalibration(approveResponse, http);
		return resp;
	}
	
//	@GetMapping("/getweightScale")
//	 public ResponseEntity<?> getweightScale(@RequestParam("date") String date,  @RequestParam("department") String department) {
//	     return engService.getweightScale(date, department);
//	 }
	
	@GetMapping("/getweightScale")
	 public ResponseEntity<?> getweightScale(@RequestParam("date") String date,  @RequestParam("machineIdNo") String machineIdNo, @RequestParam("department") String department ) {
	     return engService.getweightScale(date, machineIdNo,department);
	 }
	
//	 @GetMapping("/getweightScaleSummary")
//		public ResponseEntity<?> getweightScaleSummary() {
//			
//			ResponseEntity<?> resp = engService.getweightScaleSummary();
//			return resp;
//		}
	 
	@GetMapping("/getWeightScaleSummary")
	public ResponseEntity<?> getWeightScaleSummary(@RequestParam String username) {
	    ResponseEntity<?> resp = engService.getWeightScaleSummary(username);
	    return resp;
	}

	 
	 @GetMapping("/getweightScalePrint")
	 public ResponseEntity<?> getWeightScalePrint(
	         @RequestParam("machineIdNo") String machineIdNo,
	         @RequestParam("year") String year,
	         @RequestParam("month") String month) {
	     return engService.getWeightScalePrint(machineIdNo, year, month);
	 }
	 
	 @PostMapping("/RootCause/Save")
		public ResponseEntity<?> SaverootAnalysis(HttpServletRequest http,
				@Valid @RequestBody RootCauseAnalysisF004 RootCauseAnalysis, BindingResult result,
				Principal principal) {

			ResponseEntity<?> response = engService.SaverootAnalysis(RootCauseAnalysis, http);
			return response;

		}
	 
	   @PostMapping("/RootCause/Submit")
			public ResponseEntity<?> SubmitrootAnalysis(HttpServletRequest http,
					@Valid @RequestBody RootCauseAnalysisF004 RootCauseAnalysis, BindingResult result,
					Principal principal) {

				ResponseEntity<?> response = engService.SubmitRootCauseAnalysis(RootCauseAnalysis, http);
				return response;

			}
	   
	   @PutMapping("/RootCause/approveOrReject")
		public ResponseEntity<?> rootapproveOrReject(@Valid @RequestBody ApproveResponse approveResponse, HttpServletRequest http) {
			
			ResponseEntity<?> resp = engService.approveRejectrootAnalysis(approveResponse, http);
			return resp;
		}
	   
	   @GetMapping("/getRootCause")
		 public ResponseEntity<?> getrootAnalysis(@RequestParam("date") String date,  @RequestParam("rcaNo") String rcaNo) {
		     return engService.getrootAnalysis(date, rcaNo);
		 }
	   
	   
	   @GetMapping("/getRootCauseSummary")
		public ResponseEntity<?> getRootCauseSummary( @RequestParam String username) {
			
			ResponseEntity<?> resp = engService.getRootCauseSummary(username);
			return resp;
		}
	   
	   
	   
		 @GetMapping("/getRootCausePrint")
		 public ResponseEntity<?> getRootCausePrint(
		         @RequestParam("RcaNo") String RcaNo,
		         @RequestParam("year") String year,
		         @RequestParam("month") String month) {
		     return engService.getRootCausePrint(RcaNo, year, month);
		 }
		 
		 @PostMapping("/Workorder/Save")
			public ResponseEntity<?> SaveWorkorder(HttpServletRequest http,
					@Valid @RequestBody WorkOrderRequestFormF020 WorkOrderRequest, BindingResult result,
					Principal principal) {

				ResponseEntity<?> response = engService.SaveWorkorder(WorkOrderRequest, http);
				return response;
				
				
			}
		 
		 @PostMapping("/Workorder/Submit")
			public ResponseEntity<?> SubmitWorkorder(HttpServletRequest http,
					@Valid @RequestBody WorkOrderRequestFormF020 WorkOrderRequest, BindingResult result,
					Principal principal) {

				ResponseEntity<?> response = engService.SubmitWorkOrderRequest(WorkOrderRequest, http);
				return response;

		}
		 
		 @PostMapping("/Workorder/Accept")
			public ResponseEntity<?> AcceptWorkorder(HttpServletRequest http,
					@Valid @RequestBody WorkOrderRequestFormF020 WorkOrderRequest, BindingResult result,
					Principal principal) {

				ResponseEntity<?> response = engService.AcceptWorkOrderRequest(WorkOrderRequest, http);
				return response;

		}
		 
		 @PostMapping("/Workorder/Completed")
			public ResponseEntity<?> CompletedWorkorder(HttpServletRequest http,
					@Valid @RequestBody WorkOrderRequestFormF020 WorkOrderRequest, BindingResult result,
					Principal principal) {

				ResponseEntity<?> response = engService.CompletedWorkorder(WorkOrderRequest, http);
				return response;

		}
		 
		 
		 @PutMapping("/Workorder/approve")
			public ResponseEntity<?> approve(@Valid @RequestBody ApproveResponse approveResponse, HttpServletRequest http) {
				
				ResponseEntity<?> resp = engService.AppoveWorkorder(approveResponse, http);
				return resp;
			}
		 
		 @GetMapping("/getWorkorderlist")
		 public ResponseEntity<?> getWorkorder(@RequestParam("dateOfRequest") String dateOfRequest,  @RequestParam("worNo") String worNo) {
		     return engService.getWorkorder(dateOfRequest, worNo);
		 }
		 
//		 @GetMapping("/getWorkorderlistSummary")
//			public ResponseEntity<?> getWorkorderlistSummary() {
//				
//				ResponseEntity<?> resp = engService.getWorkorderlistSummary();
//				return resp;
//			}
		 
		 @GetMapping("/getWorkorderlistSummary")
		 public ResponseEntity<?> getWorkorderlistSummary(@RequestParam String username) {
		     ResponseEntity<?> resp = engService.getWorkorderlistSummary(username);
		     return resp;
		 }


		 
		 @GetMapping("/getWorkorderlistPrint")
		 public ResponseEntity<?> getWorkorderlistPrint(
		         @RequestParam("worNo") String worNo,
		         @RequestParam("year") String year,
		         @RequestParam("month") String month) {
		     return engService.getWorkorderlistPrint(worNo, year, month);
		 }
		 
		 
		 @PostMapping("/Breakdown/Save")
			public ResponseEntity<?> SaveBreakdown(HttpServletRequest http,
					@Valid @RequestBody BreakdownIntimationSlipF003 BreakdownSlip, BindingResult result,
					Principal principal) {

				ResponseEntity<?> response = engService.SaveBreakdown(BreakdownSlip, http);
				return response;

				
			}
		 
		 @PostMapping("/Breakdown/Submit")
			public ResponseEntity<?> SubmitBreakdown(HttpServletRequest http,
					@Valid @RequestBody BreakdownIntimationSlipF003 BreakdownSlip, BindingResult result,
					Principal principal) {

				ResponseEntity<?> response = engService.SubmitBreakdown(BreakdownSlip, http);
				return response;

		}
		 
		 @PostMapping("/Breakdown/EngineerSubmit")
			public ResponseEntity<?>EngineerSubmitBreakdown(HttpServletRequest http,
					@Valid @RequestBody BreakdownIntimationSlipF003 BreakdownSlip, BindingResult result,
					Principal principal) {

				ResponseEntity<?> response = engService.EngineerSubmitBreakdown(BreakdownSlip, http);
				return response;

		}
		 
		 
		 @PostMapping("/Breakdown/ReceiverSubmit")
			public ResponseEntity<?> ReceiverSubmitBreakdown(HttpServletRequest http,
					@Valid @RequestBody BreakdownIntimationSlipF003 BreakdownSlip, BindingResult result,
					Principal principal) {

				ResponseEntity<?> response = engService.ReceiverSubmitBreakdown(BreakdownSlip, http);
				return response;

		}
		 
		 @PostMapping("/Breakdown/CloserSubmit")
			public ResponseEntity<?> CloserSubmitBreakdown(HttpServletRequest http,
					@Valid @RequestBody BreakdownIntimationSlipF003 BreakdownSlip, BindingResult result,
					Principal principal) {

				ResponseEntity<?> response = engService.CloserSubmitBreakdown(BreakdownSlip, http);
				return response;

		}
		 
		 @GetMapping("/getBreakdown")
		 public ResponseEntity<?> getBreakdown(@RequestParam("date") String date,  @RequestParam("bisNo") String bisNo) {
		     return engService.getBreakdown(date, bisNo);
		 }
		 
		 @GetMapping("/getBreakdownPrint")
		 public ResponseEntity<?> getBreakdownPrint(
		         @RequestParam("bisNo") String bisNo,
		         @RequestParam("year") String year,
		         @RequestParam("month") String month) {
		     return engService.getBreakdownPrint(bisNo, year, month);
		 }
		 
		 @GetMapping("/getBreakdownSummary")
		 public ResponseEntity<?> getBreakdownSummary(@RequestParam String username) {
		     ResponseEntity<?> resp = engService.getBreakdownSummary(username);
		     return resp;
		 }
		 
		 @GetMapping("/departmentbasedbsino")
		    public ResponseEntity<List<String>> getBisNoByIssuerDepartment(
		            @RequestParam("issuerDepartment") String issuerDepartment) {
		        
		        List<String> bisNoList = breakdownSlipRepo.findBisNoByIssuerDepartment(issuerDepartment);
		        
		        if (bisNoList.isEmpty()) {
		            return ResponseEntity.noContent().build();
		        }
		        
		        return ResponseEntity.ok(bisNoList);
		    }
		 
		 @GetMapping("/departmentbasedRcano")
		    public ResponseEntity<List<String>> getrcanoByIssuerDepartment(
		            @RequestParam("department") String department) {
		        
		        List<String> bisNoList = rootCauseRepo.findrcaNoByIssuerDepartment(department);
		        
		        if (bisNoList.isEmpty()) {
		            return ResponseEntity.noContent().build();
		        }
		        
		        return ResponseEntity.ok(bisNoList);
		    }
		 @GetMapping("/departmentbasedworno")
		    public ResponseEntity<List<String>> getwronoByIssuerDepartment(
		            @RequestParam("department") String department) {
		        
		        List<String> bisNoList = workOrderRepo.findworNoByIssuerDepartment(department);
		        
		        if (bisNoList.isEmpty()) {
		            return ResponseEntity.noContent().build();
		        }
		        
		        return ResponseEntity.ok(bisNoList);
		    }
		 


		 
		  @GetMapping("/getbisnos/print")
		    public ResponseEntity<List<String>> getAllDistinctBisNos() {
		        List<String> bisNos = engService.getAllDistinctBisNo();
		        return ResponseEntity.ok(bisNos);
		    }
		  
		 
		 @GetMapping("/getbisnos")
		    public ResponseEntity<List<String>> getFilteredDistinctBisNos() {
		        List<String> bisNos = engService.getFilteredDistinctBisNo();
		        return ResponseEntity.ok(bisNos);
		    }
		  @GetMapping("/getRcano")
		    public ResponseEntity<List<String>> getAllDistinctRcaNos() {
		        List<String> rcano = engService.getAllDistinctRcaNo();
		        return ResponseEntity.ok(rcano);
		    }
		  
		  @GetMapping("/getworno")
		    public ResponseEntity<List<String>> getAllDistinctworNos() {
		        List<String> rcano = engService.getAllDistinctworNos();
		        return ResponseEntity.ok(rcano);
		    }
		  
		  @GetMapping("/getProductionDetails")
		    public ResponseEntity<?> getProductionDetails(@RequestParam("department") String department) {
		        return engService.getProductionDetails(department);
		    }
		   
		 
		 
	 

	
	
	
	

	
}
