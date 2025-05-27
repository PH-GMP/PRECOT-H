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
import com.focusr.Precot.mssql.database.model.drygoods.BMR07GoodsManufacturingStepsCottonBalls;
import com.focusr.Precot.mssql.database.model.drygoods.BMR09GoodsProcessDevRecord;
import com.focusr.Precot.mssql.database.model.drygoods.BMR10GoodsProcessDelayEqupment;
import com.focusr.Precot.mssql.database.model.drygoods.BMR10GoodsProductReconillation;
import com.focusr.Precot.mssql.database.model.drygoods.BMR11GoodsListOfEnclouser;
import com.focusr.Precot.mssql.database.model.drygoods.BMR12GoodsPostProdReview;
import com.focusr.Precot.mssql.database.model.drygoods.BMR13GoodsQaRelease;
import com.focusr.Precot.mssql.database.model.drygoods.BMR14GoodsProductRelease;
import com.focusr.Precot.mssql.database.service.drygoods.BmrCottonBallService;

@RestController
@RequestMapping("/api/cottonBall")
public class BmrCottonBallController {

	@Autowired
	private BmrCottonBallService bmrcottonballservice;

	// ----------------01

	@PostMapping("/01.SaveProductionDetails")
	public ResponseEntity<?> SaveProductionDetails(@Valid @RequestBody BMR001GoodsProductionDetails details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrcottonballservice.SaveProductionDetails(details, http);
		return resp;
	}

	@PostMapping("/01.SubmitProductionDetails")
	public ResponseEntity<?> ProductionDetails(@Valid @RequestBody BMR001GoodsProductionDetails details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrcottonballservice.bmr001goodsproductiondetails(details, http);
		return resp;
	}

	@GetMapping("/01.GetProductionDetails")
	public ResponseEntity<?> GetPackingMeterialIssue(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = bmrcottonballservice.GetProductionDetails(batch_no);
		return resp;
	}
	
	

	// 03

	@PostMapping("/03.SavePackingMeterialIssue")
	public ResponseEntity<?> SavePackingMeterialIssue(@Valid @RequestBody BMR03GoodsPackingMeterialIssue details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrcottonballservice.SavePackingMeterialIssue(details, http);
		return resp;
	}

	@PostMapping("/03.SubmitPackingMeterialIssue")
	public ResponseEntity<?> SubmitPackingMeterialIssue(@Valid @RequestBody BMR03GoodsPackingMeterialIssue details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrcottonballservice.SubmitPackingMeterialIssue(details, http);
		return resp;
	}
	
	
	@GetMapping("/03.GetPackingMeterial")
	public ResponseEntity<?> GetPackingMeterial(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = bmrcottonballservice.GetPackingMeterial(batch_no);
		return resp;
	}
	
	
	@GetMapping("/03.GetPackingMeterialPde")
	public ResponseEntity<?> GetPackingMeterialPde(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");
		String fromdate = requestParams.get("fromdate");
		String todate = requestParams.get("todate");

		ResponseEntity<?> resp = bmrcottonballservice.GetPackingMeterialPde(batch_no,fromdate,todate);
		return resp;
	}
	
	
	


	// --------------05

	@PostMapping("/05.SaveProcessingEquipments")
	public ResponseEntity<?> SaveProcessingEquipments(@Valid @RequestBody BMR05GoodsEquipmentUsed details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrcottonballservice.SaveProcessingEquipments(details, http);
		return resp;
	}

	@PostMapping("/05.SubmitProcessingEquipments")
	public ResponseEntity<?> SubmitProcessingEquipments(@Valid @RequestBody BMR05GoodsEquipmentUsed details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrcottonballservice.SubmitProcessingEquipments(details, http);
		return resp;
	}

	@GetMapping("/05.GetProcessEqupDetails")
	public ResponseEntity<?> GetProcessEqupDetails(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = bmrcottonballservice.GetProcessEqupDetails(batch_no);
		return resp;
	}

	// -----------06

	@PostMapping("/06.SaveVerificationOfRecords")
	public ResponseEntity<?> SaveVerificationOfRecords(@Valid @RequestBody BMR06GoodsVerificationOfRecords details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrcottonballservice.SaveVerificationOfRecords(details, http);
		return resp;
	}

	@PostMapping("/06.SubmitVerificationOfRecords")
	public ResponseEntity<?> SubmitVerificationOfRecords(@Valid @RequestBody BMR06GoodsVerificationOfRecords details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrcottonballservice.SubmitVerificationOfRecords(details, http);
		return resp;
	}

	@GetMapping("/06.GetVerificationOfRecords")
	public ResponseEntity<?> GetVerificationOfRecords(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = bmrcottonballservice.GetVerificationOfRecords(batch_no);
		return resp;
	}

	// 07

	@PostMapping("/07.SaveManufacturingSteps")
	public ResponseEntity<?> SaveManufacturingSteps(@Valid @RequestBody BMR07GoodsManufacturingStepsCottonBalls details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrcottonballservice.SaveManufacturingSteps(details, http);
		return resp;
	}

	@PostMapping("/07.SubmitManufacturingSteps")
	public ResponseEntity<?> SubmitManufacturingSteps(
			@Valid @RequestBody BMR07GoodsManufacturingStepsCottonBalls details, HttpServletRequest http) {

		ResponseEntity<?> resp = bmrcottonballservice.SubmitManufacturingSteps(details, http);
		return resp;
	}

	// 08

	@GetMapping("/07.GetManufacturingSteps")
	public ResponseEntity<?> GetManufacturingSteps(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = bmrcottonballservice.GetManufacturingSteps(batch_no);
		return resp;
	}
	//

	@PostMapping("/09.SaveProcessDevRecord")
	public ResponseEntity<?> SaveProcessDevRecord(@Valid @RequestBody BMR09GoodsProcessDevRecord details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrcottonballservice.SaveProcessDevRecord(details, http);
		return resp;
	}

	@PostMapping("/09.SubmitProcessDevRecord")
	public ResponseEntity<?> submitProcessDevRecord(@Valid @RequestBody BMR09GoodsProcessDevRecord details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrcottonballservice.submitProcessDevRecord(details, http);
		return resp;
	}

	@GetMapping("/09.GetProcessDevRecord")
	public ResponseEntity<?> GetProcessDevRecord(@RequestParam Map<String, String> requestParams, Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = bmrcottonballservice.GetProcessDevRecord(batch_no);
		return resp;
	}

	@PostMapping("/10.SaveProcessDelayEqupment")
	public ResponseEntity<?> ProcessDelayEqupment(@Valid @RequestBody BMR10GoodsProcessDelayEqupment details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrcottonballservice.SaveProcessDelayEqupment(details, http);
		return resp;
	}

	@PostMapping("/10.SubmitProcessDelayEqupment")
	public ResponseEntity<?> SubmitProcessDelayEqupment(@Valid @RequestBody BMR10GoodsProcessDelayEqupment details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrcottonballservice.SubmitProcessDelayEqupment(details, http);
		return resp;
	}

	@GetMapping("/10.GetProcessDelayEqupment")
	public ResponseEntity<?> GetProcessDelayEqupment(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = bmrcottonballservice.GetProcessDelayEqupment(batch_no);
		return resp;
	}

	@PostMapping("/11.SaveListOfEnclosurs")
	public ResponseEntity<?> SaveLinstOfEnclosurs(@Valid @RequestBody BMR11GoodsListOfEnclouser details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrcottonballservice.SaveListOfEnclosurs(details, http);
		return resp;
	}

	@PostMapping("/11.submitListOfEnclosurs")
	public ResponseEntity<?> submitListOfEnclosurs(@Valid @RequestBody BMR11GoodsListOfEnclouser details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrcottonballservice.submitListOfEnclosurs(details, http);
		return resp;
	}

	@GetMapping("/11.GetListOfEnclosurs")
	public ResponseEntity<?> GetListOfEnclosurs(@RequestParam Map<String, String> requestParams, Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = bmrcottonballservice.GetListOfEnclosurs(batch_no);
		return resp;
	}

	@PostMapping("/12.SavePostProductionReview")
	public ResponseEntity<?> SavePostProductionReview(@Valid @RequestBody BMR12GoodsPostProdReview details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrcottonballservice.SavePostProductionReview(details, http);
		return resp;
	}

	@PostMapping("/12.SubmitPostProductionReview")
	public ResponseEntity<?> SubmitPostProductionReview(@Valid @RequestBody BMR12GoodsPostProdReview details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrcottonballservice.SubmitPostProductionReview(details, http);
		return resp;
	}

	@GetMapping("/12.GetPostProductionReview")
	public ResponseEntity<?> GetPostProductionReview(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = bmrcottonballservice.GetPostProductionReview(batch_no);
		return resp;
	}

	
	@PostMapping("/13.SaveQaRelease")
	public ResponseEntity<?> SaveQaRelease(@Valid @RequestBody BMR13GoodsQaRelease details, HttpServletRequest http) {

		ResponseEntity<?> resp = bmrcottonballservice.SaveQaRelease(details, http);
		return resp;
	}
	
	@PostMapping("/13.SubmitQaRelease")
	public ResponseEntity<?> SubmitQaRelease(@Valid @RequestBody BMR13GoodsQaRelease details, HttpServletRequest http) {

		ResponseEntity<?> resp = bmrcottonballservice.SubmitQaRelease(details, http);
		return resp;
	}
	
	
	

	@GetMapping("/13.GetQaRelease")
	public ResponseEntity<?> GetQaRelease(@RequestParam Map<String, String> requestParams, Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = bmrcottonballservice.GetQaRelease(batch_no);
		return resp;
	}
	
	
	

//	@PostMapping("/14.SaveProductRelease")
//	public ResponseEntity<?> SaveProductRelease(@Valid @RequestBody BMR14GoodsProductRelease details,
//			HttpServletRequest http) {
//
//		ResponseEntity<?> resp = bmrcottonballservice.SaveProductRelease(details, http);
//		return resp;
//	}
	
	

	@PostMapping("/14.SubmitProductRelease")
	public ResponseEntity<?> SubmitProductRelease(@Valid @RequestBody BMR14GoodsProductRelease details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrcottonballservice.SubmitProductRelease(details, http);
		return resp;
	}

	@GetMapping("/14.GetProductRelease")
	public ResponseEntity<?> GetProductRelease(@RequestParam Map<String, String> requestParams, Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = bmrcottonballservice.GetProductRelease(batch_no);
		return resp;
	}
	
	
	// CR - PRODUCT RECONILLATION
	
	
	@PostMapping("/SubmitProductReconillation")
	public ResponseEntity<?> SubmitProductReconillation(@Valid @RequestBody BMR10GoodsProductReconillation details,
			HttpServletRequest http) {

		ResponseEntity<?> resp = bmrcottonballservice.submitProductReconillation(details, http);
		return resp;
	}
	
	
	@GetMapping("/getReconillationByBatchNo")
	public ResponseEntity<?> getReconillationByBatchNo(@RequestParam Map<String, String> requestParams, Principal principal) {

		String batchNo = requestParams.get("batchNo");
		ResponseEntity<?> resp = bmrcottonballservice.getProductReconillationForBallsByBatchNumber(batchNo);
		return resp;
	}
	
	

	//// Sap Details

	@GetMapping("/fetchBatchNo")
	public ResponseEntity<?> fetchProductionDetailsBatchNumber(Principal principal) {

		ResponseEntity<?> resp = bmrcottonballservice.getProductionLOV();
		return resp;
	}

	@GetMapping("/getOrderByBatchNo")
	public ResponseEntity<?> getOrderByBatchNo(@RequestParam Map<String, String> requestParams, Principal principal) {

		String batchNo = requestParams.get("batchNo");
		ResponseEntity<?> resp = bmrcottonballservice.getOrderLovOnBatchNo(batchNo);
		return resp;
	}

	@GetMapping("/getProductionDetailsBatchOrder")
	public ResponseEntity<?> getProductionDetailsBatchOrder(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String batchNo = requestParams.get("batchNo");
		String orderNo = requestParams.get("orderNo");
		String fromdate = requestParams.get("fromdate");
		String todate = requestParams.get("todate");

		ResponseEntity<?> resp = bmrcottonballservice.getProductionResponseByBatchOrder(batchNo, orderNo, fromdate,
				todate);
		return resp;
	}

	// get Print

	@GetMapping("/GetCottonBallPrint")
	public ResponseEntity<?> GetBmrPrint(@RequestParam Map<String, String> requestParams, Principal principal) {
		String batch_no = requestParams.get("batch_no");

		ResponseEntity<?> resp = bmrcottonballservice.GetBmrPrint(batch_no);
		return resp;
	}

	// 08
	@GetMapping("/productReconillation")
	public ResponseEntity<?> productReconillation(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String order = requestParams.get("order");
		String fromdate = requestParams.get("fromdate");
		String todate = requestParams.get("todate");

		ResponseEntity<?> resp = bmrcottonballservice.productReconillation(order, fromdate, todate);
		return resp;
	}

	// 10
	@GetMapping("/stoppageReports")
	public ResponseEntity<?> getStoppageReports(@RequestParam Map<String, String> requestParams, Principal principal) {

		String fromdate = requestParams.get("fromdate");
		String todate = requestParams.get("todate");
		String machine = requestParams.get("machine");

		ResponseEntity<?> resp = bmrcottonballservice.getStoppageOrders(fromdate, todate, machine);
		return resp;
	}

	// 02 (NO NEED STOPAGE)
	@GetMapping("/getDrygoodsStoppageDetailsF003")
	public ResponseEntity<?> getDrygoodsStoppageDetailsF003(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String fromdate = requestParams.get("fromdate");
		String todate = requestParams.get("todate");
		String orderNo = requestParams.get("orderNo");
		String machine_name = requestParams.get("machine_name");

		ResponseEntity<?> resp = bmrcottonballservice.getDrygoodsStoppageDetailsF003(fromdate, todate, orderNo,
				machine_name);
		return resp;
	}

	@GetMapping("/getDrygoodsFleece")
	public ResponseEntity<?> getDrygoodsFleece(@RequestParam Map<String, String> requestParams, Principal principal) {

		String fromdate = requestParams.get("fromdate");
		String todate = requestParams.get("todate");
		String orderNo = requestParams.get("orderNo");

		ResponseEntity<?> resp = bmrcottonballservice.getDrygoodsFleece(fromdate, todate, orderNo);
		return resp;
	}
}
