package com.focusr.Precot.mssql.database.controller.drygoods;

import java.security.Principal;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.model.drygoods.BMR001GoodsProductionDetails;
import com.focusr.Precot.mssql.database.model.drygoods.BMR03GoodsPackingMeterialIssue;
import com.focusr.Precot.mssql.database.model.drygoods.BMR05GoodsEquipmentUsed;
import com.focusr.Precot.mssql.database.model.drygoods.BMR06GoodsVerificationOfRecords;
import com.focusr.Precot.mssql.database.model.drygoods.BMR07ManufacturingStepsCottonWoolRoll;
import com.focusr.Precot.mssql.database.model.drygoods.BMR09GoodsProcessDevRecord;
import com.focusr.Precot.mssql.database.model.drygoods.BMR10GoodsProcessDelayEqupment;
import com.focusr.Precot.mssql.database.model.drygoods.BMR10GoodsProductReconillation;
import com.focusr.Precot.mssql.database.model.drygoods.BMR11GoodsListOfEnclouser;
import com.focusr.Precot.mssql.database.model.drygoods.BMR12GoodsPostProdReview;
import com.focusr.Precot.mssql.database.model.drygoods.BMR13GoodsQaRelease;
import com.focusr.Precot.mssql.database.model.drygoods.BMR14GoodsProductRelease;
import com.focusr.Precot.mssql.database.service.drygoods.BmrCottonWoolRollService;

@RestController
@RequestMapping("/api/CottonWoolRall")
public class BmrCottonWoolRollController {

	@Autowired
	private BmrCottonWoolRollService bmrCottonWoolRollService;

	@PostMapping("/01.SaveProductionDetails")
	public ResponseEntity<?> SaveProductionDetails(@Valid @RequestBody BMR001GoodsProductionDetails details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrCottonWoolRollService.SaveProductionDetails(details, http);
		return resp;
	}

	@PostMapping("/01.SubmitProductionDetails")
	public ResponseEntity<?> ProductionDetails(@Valid @RequestBody BMR001GoodsProductionDetails details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrCottonWoolRollService.bmr001goodsproductiondetails(details, http);
		return resp;
	}
	@GetMapping("/01.GetProductionDetails")
	public ResponseEntity<?> GetProductionDetails(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = bmrCottonWoolRollService.GetProductionDetails(batch_no);
		return resp;
	}

	
	@PostMapping("/03.SavePackingMeterialIssue")
	public ResponseEntity<?> SavePackingMeterialIssue(@Valid @RequestBody BMR03GoodsPackingMeterialIssue details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrCottonWoolRollService.SavePackingMeterialIssue(details, http);
		return resp;
	}

	@PostMapping("/03.SubmitPackingMeterialIssue")
	public ResponseEntity<?> SubmitPackingMeterialIssue(@Valid @RequestBody BMR03GoodsPackingMeterialIssue details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrCottonWoolRollService.SubmitPackingMeterialIssue(details, http);
		return resp;
	}
	
	
	@GetMapping("/03.GetPackingMeterial")
	public ResponseEntity<?> GetPackingMeterial(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = bmrCottonWoolRollService.GetPackingMeterial(batch_no);
		return resp;
	}
	
	
	@GetMapping("/03.GetPackingMeterialPde")
	public ResponseEntity<?> GetPackingMeterialPde(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");
		String fromdate = requestParams.get("fromdate");
		String todate = requestParams.get("todate");

		ResponseEntity<?> resp = bmrCottonWoolRollService.GetPackingMeterialPde(batch_no,fromdate,todate);
		return resp;
	}
	
	// 5.0 SUBMIT

	@PostMapping("/05.SaveProcessingEquipments")
	public ResponseEntity<?> SaveProcessingEquipments(@Valid @RequestBody BMR05GoodsEquipmentUsed details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrCottonWoolRollService.SaveProcessingEquipments(details, http);
		return resp;
	}

	@PostMapping("/05.SubmitProcessingEquipments")
	public ResponseEntity<?> SubmitProcessingEquipments(@Valid @RequestBody BMR05GoodsEquipmentUsed details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrCottonWoolRollService.SubmitProcessingEquipments(details, http);
		return resp;
	}

	@GetMapping("/05.GetProcessingEquipments")
	public ResponseEntity<?> GetProcessingEquipments(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = bmrCottonWoolRollService.GetProcessingEquipments(batch_no);
		return resp;
	}

	// 6.0 SAVE VERIFICATION OF RECORDS

	@PostMapping("/06.SaveVerificationOfRecords")
	public ResponseEntity<?> SaveVerificationOfRecords(@Valid @RequestBody BMR06GoodsVerificationOfRecords details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrCottonWoolRollService.SaveVerificationOfRecords(details, http);
		return resp;
	}

	@PostMapping("/06.SubmitVerificationOfRecords")
	public ResponseEntity<?> SubmitVerificationOfRecords(@Valid @RequestBody BMR06GoodsVerificationOfRecords details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrCottonWoolRollService.SubmitVerificationOfRecords(details, http);
		return resp;
	}

	// GET 6.0 GET VERIFICATION OF RECORDS

	@GetMapping("/06.GetVerificationOfRecords")
	public ResponseEntity<?> GetVerificationOfRecords(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = bmrCottonWoolRollService.GetVerificationOfRecords(batch_no);
		return resp;
	}

	@PostMapping("/07.SaveManufacturingSteps")
	public ResponseEntity<?> SaveManufacturingSteps(@Valid @RequestBody BMR07ManufacturingStepsCottonWoolRoll details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrCottonWoolRollService.SaveManufacturingSteps(details, http);
		return resp;
	}

	@PostMapping("/07.SubmitManufacturingSteps")
	public ResponseEntity<?> SubmitManufacturingSteps(@Valid @RequestBody BMR07ManufacturingStepsCottonWoolRoll details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrCottonWoolRollService.SubmitManufacturingSteps(details, http);
		return resp;
	}

	// 7.0 GET MANUFACTURING STEPS

	@GetMapping("/07.GetManufacturingSteps")
	public ResponseEntity<?> GetManufacturingSteps(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = bmrCottonWoolRollService.GetManufacturingSteps(batch_no);
		return resp;
	}

	// 9.0 PROCESS DEVIATION RECORDS

	@PostMapping("/09.SaveProcessDevRecord")
	public ResponseEntity<?> SaveProcessDevRecord(@Valid @RequestBody BMR09GoodsProcessDevRecord details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrCottonWoolRollService.SaveProcessDevRecord(details, http);
		return resp;
	}

	@PostMapping("/09.SubmitProcessDevRecord")
	public ResponseEntity<?> submitProcessDevRecord(@Valid @RequestBody BMR09GoodsProcessDevRecord details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrCottonWoolRollService.submitProcessDevRecord(details, http);
		return resp;
	}

	// 9.0 GET PROCESS DEVIATION RECORDS

	@GetMapping("/09.GetProcessDevRecord")
	public ResponseEntity<?> GetProcessDevRecord(@RequestParam Map<String, String> requestParams, Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = bmrCottonWoolRollService.GetProcessDevRecord(batch_no);
		return resp;
	}

	// 10.0

	@PostMapping("/10.SaveProcessDelayEqupment")
	public ResponseEntity<?> ProcessDelayEqupment(@Valid @RequestBody BMR10GoodsProcessDelayEqupment details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrCottonWoolRollService.SaveProcessDelayEqupment(details, http);
		return resp;
	}

	@PostMapping("/10.SubmitProcessDelayEqupment")
	public ResponseEntity<?> SubmitProcessDelayEqupment(@Valid @RequestBody BMR10GoodsProcessDelayEqupment details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrCottonWoolRollService.SubmitProcessDelayEqupment(details, http);
		return resp;
	}

	@GetMapping("/10.GetProcessDelayEquipment")
	public ResponseEntity<?> GetProcessDelayEquipment(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = bmrCottonWoolRollService.GetProcessDelayEquipment(batch_no);
		return resp;
	}

	@PostMapping("/11.SaveListOfEnclosurs")
	public ResponseEntity<?> SaveLinstOfEnclosurs(@Valid @RequestBody BMR11GoodsListOfEnclouser details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrCottonWoolRollService.SaveListOfEnclosurs(details, http);
		return resp;
	}

	@PostMapping("/11.submitListOfEnclosurs")
	public ResponseEntity<?> submitListOfEnclosurs(@Valid @RequestBody BMR11GoodsListOfEnclouser details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrCottonWoolRollService.submitListOfEnclosurs(details, http);
		return resp;
	}

	// 11.0 GET LIST OF ENCLOSURES

	@GetMapping("/11.GetListOfEnclosurs")
	public ResponseEntity<?> GetListOfEnclosurs(@RequestParam Map<String, String> requestParams, Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = bmrCottonWoolRollService.GetListOfEnclosurs(batch_no);
		return resp;
	}

	@PostMapping("/12.SavePostProductionReview")
	public ResponseEntity<?> SavePostProductionReview(@Valid @RequestBody BMR12GoodsPostProdReview details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrCottonWoolRollService.SavePostProductionReview(details, http);
		return resp;
	}

	@PostMapping("/12.SubmitPostProductionReview")
	public ResponseEntity<?> SubmitPostProductionReview(@Valid @RequestBody BMR12GoodsPostProdReview details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrCottonWoolRollService.SubmitPostProductionReview(details, http);
		return resp;
	}

	// 12.0 GET POST PRODUCTION REVIEW

	@GetMapping("/12.GetPostProductionReview")
	public ResponseEntity<?> GetPostProductionReview(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = bmrCottonWoolRollService.GetPostProductionReview(batch_no);
		return resp;
	}

	@PostMapping("/13.SaveQaRelease")
	public ResponseEntity<?> SaveQaRelease(@Valid @RequestBody BMR13GoodsQaRelease details, HttpServletRequest http) {

		ResponseEntity<?> resp = bmrCottonWoolRollService.SaveQaRelease(details, http);
		return resp;
	}
	
	@PostMapping("/13.SubmitQaRelease")
	public ResponseEntity<?> SubmitQaRelease(@Valid @RequestBody BMR13GoodsQaRelease details, HttpServletRequest http) {

		ResponseEntity<?> resp = bmrCottonWoolRollService.SubmitQaRelease(details, http);
		return resp;
	}
	// 13.0 GET QA RELEASE

	@GetMapping("/13.GetQaRelease")
	public ResponseEntity<?> GetQaRelease(@RequestParam Map<String, String> requestParams, Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = bmrCottonWoolRollService.GetQaRelease(batch_no);
		return resp;
	}

//	@PostMapping("/14.SaveProductRelease")
//	public ResponseEntity<?> SaveProductRelease(@Valid @RequestBody BMR14GoodsProductRelease details,
//			HttpServletRequest http) {
//
//		ResponseEntity<?> resp = bmrCottonWoolRollService.SaveProductRelease(details, http);
//		return resp;
//	}

	@PostMapping("/14.SubmitProductRelease")
	public ResponseEntity<?> SubmitProductRelease(@Valid @RequestBody BMR14GoodsProductRelease details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrCottonWoolRollService.SubmitProductRelease(details, http);
		return resp;
	}

	// 14.0 GET PRODUCT RELEASE

	@GetMapping("/13.GetProductRelease")
	public ResponseEntity<?> GetProductRelease(@RequestParam Map<String, String> requestParams, Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = bmrCottonWoolRollService.GetProductRelease(batch_no);
		return resp;
	}

	// PRINT COTTON WOLL ROLL

	@GetMapping("/GetCottonWoolRollPrint")
	public ResponseEntity<?> GetCottonWoolRollPrint(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String order_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = bmrCottonWoolRollService.GetCottonWoolRollPrint(order_no);
		return resp;
	}

	// 2.0 BALE CONSUMPTION FOR MINI ROLL

//		@GetMapping("/GetBaleConsumtion")
//		public ResponseEntity<?> getBaleConsumtion(@RequestParam Map<String, String> requestParams,
//				Principal principal) {
//
//			String start = requestParams.get("start");
//			String end = requestParams.get("end");
//
//			ResponseEntity<?> resp = bmrCottonWoolRollService.getBaleConsumtion(start, end);
//
//			return resp;
//		}

	//// Sap Details

	@GetMapping("/fetchBatchNo")
	public ResponseEntity<?> fetchProductionDetailsBatchNumber(Principal principal) {

		ResponseEntity<?> resp = bmrCottonWoolRollService.getProductionLOV();
		return resp;
	}

	@GetMapping("/getOrderByBatchNo")
	public ResponseEntity<?> getOrderByBatchNo(@RequestParam Map<String, String> requestParams, Principal principal) {

		String batchNo = requestParams.get("batchNo");
		ResponseEntity<?> resp = bmrCottonWoolRollService.getOrderLovOnBatchNo(batchNo);
		return resp;
	}

	@GetMapping("/getProductionDetailsBatchOrder")
	public ResponseEntity<?> getProductionDetailsBatchOrder(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String batchNo = requestParams.get("batchNo");
		String orderNo = requestParams.get("orderNo");
		String fromdate = requestParams.get("fromdate");
		String todate = requestParams.get("todate");
		
		ResponseEntity<?> resp = bmrCottonWoolRollService.getProductionResponseByBatchOrder(batchNo, orderNo, fromdate, todate);
		return resp;
	}

	
	
	@GetMapping("/productReconillation")
	public ResponseEntity<?> productReconillation(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String order = requestParams.get("order");
		String fromdate = requestParams.get("fromdate");
		String todate = requestParams.get("todate");

		
		ResponseEntity<?> resp = bmrCottonWoolRollService.productReconillation(order,fromdate,todate);
		return resp;
	}
	
	
	@GetMapping("/stoppageReports")
	public ResponseEntity<?> getStoppageReports(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String fromdate = requestParams.get("fromdate");
		String todate = requestParams.get("todate");
		String machine = requestParams.get("machine");
		
		ResponseEntity<?> resp = bmrCottonWoolRollService.getStoppageOrders(fromdate, todate, machine);
		return resp;
	}
	
	
	// 2.0 BALE CONSUMPTION FOR MINI ROLL

	// 02
	
		//Stoppage(No need)
		@GetMapping("/dailyProductionDetails")
		public ResponseEntity<?> dailyProductionDetails(@RequestParam Map<String, String> requestParams,
				Principal principal) {
			
			String fromdate = requestParams.get("fromdate");
			String todate = requestParams.get("todate");
			String orderNo = requestParams.get("orderNo");
			String machine_name = requestParams.get("machine_name");
			
			ResponseEntity<?> resp = bmrCottonWoolRollService.dailyProductionDetails(fromdate,todate,orderNo,machine_name);
			return resp;
		}
		
		// FLEECE
		@GetMapping("/FleecetDetailsF006")
		public ResponseEntity<?> fetchFleecetDetailsF006(@RequestParam Map<String, String> requestParams) {

			String fromdate = requestParams.get("fromdate");
			String todate = requestParams.get("todate");
			String orderNo = requestParams.get("orderNo");

			ResponseEntity<?> resp = bmrCottonWoolRollService.getFleecetDetails(fromdate,todate,orderNo);
			return resp;
		}
		
		// HEADER
		
		@GetMapping("/getHeaderDetailsbyOrderNoF006")
		public ResponseEntity<?> getHeaderDetailsbyOrderNo(@RequestParam Map<String, String> requestParams) {

			String orderNo = requestParams.get("orderNo");
		

			ResponseEntity<?> resp = bmrCottonWoolRollService.getHeaderDetails(orderNo);
			return resp;
		}
		
		// CR 
		
		@PostMapping("/SubmitProductReconillation")
		public ResponseEntity<?> SubmitProductReconillation(@Valid @RequestBody BMR10GoodsProductReconillation details,
				HttpServletRequest http) {

			ResponseEntity<?> resp = bmrCottonWoolRollService.submitProductReconillation(details, http);
			return resp;
		}
		
		
		@GetMapping("/getReconillationByBatchNo")
		public ResponseEntity<?> getReconillationByBatchNo(@RequestParam Map<String, String> requestParams, Principal principal) {

			String batchNo = requestParams.get("batchNo");
			ResponseEntity<?> resp = bmrCottonWoolRollService.getProductReconillationForWoolRollByBatchNumber(batchNo);
			return resp;
		}

}
