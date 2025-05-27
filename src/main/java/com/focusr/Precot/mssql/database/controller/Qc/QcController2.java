package com.focusr.Precot.mssql.database.controller.Qc;

import java.security.Principal;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.model.Qc.CoaAbCottonF26;
import com.focusr.Precot.mssql.database.model.Qc.CoaCottonBallsF26B;
import com.focusr.Precot.mssql.database.model.Qc.CoaCottonPadsF26A;
import com.focusr.Precot.mssql.database.model.Qc.CoaCottonRollGoodsF26E;
import com.focusr.Precot.mssql.database.model.Qc.CoaCottonWoolPleatF26D;
import com.focusr.Precot.mssql.database.model.Qc.CoaCottonWoolRollF26C;
import com.focusr.Precot.mssql.database.model.Qc.CoaInfusedCottonPadsF26F;
import com.focusr.Precot.mssql.database.model.Qc.CoaMoistureF26G;
import com.focusr.Precot.mssql.database.model.Qc.DigitalColonyCounterF030;
import com.focusr.Precot.mssql.database.model.Qc.StandarizationOfChemicalReportF016;
import com.focusr.Precot.mssql.database.model.Qc.WaterAnalysisReportF007;
import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.mssql.database.service.Qc.QcService2;
import com.focusr.Precot.payload.ApproveResponse;

/**
 * 
 * @author Vijay.R
 * 
 *         F026 - COA AB COTTON F026A - COA COTTON PADS F002B - COA COOTON BALLS
 *
 *
 */

@RestController
@RequestMapping("/api/QcForm")
public class QcController2 {

	@Autowired
	QcService2 qcService2;

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	Logger log = LoggerFactory.getLogger(QcController7.class);

	@GetMapping("/CustomerName")
	public ResponseEntity<?> getCustomerName() {

		ResponseEntity<?> responseList = qcService2.getCustomerName();
		return responseList;
	}

	// TESTING QUERY

	@GetMapping("/getMail")
	public ResponseEntity<?> getMail() {

		ResponseEntity<?> responseList = qcService2.getMail();
		return responseList;
	}

	@GetMapping("/ProductName")
	public ResponseEntity<?> getProductName(@RequestParam Map<String, String> requestParams) {

		String customer = requestParams.get("customer");

		ResponseEntity<?> responseList = qcService2.getProductName(customer);
		return responseList;
	}

	@GetMapping("/ProductNameMedline")
	public ResponseEntity<?> ProductNameMedline(@RequestParam Map<String, String> requestParams) {

		String customer = requestParams.get("customer");

		ResponseEntity<?> responseList = qcService2.ProductNameMedline(customer);
		return responseList;
	}

	@GetMapping("/BaleNo")
	public ResponseEntity<?> getBaleNo() {

		ResponseEntity<?> responseList = qcService2.getBaleNo();
		return responseList;
	}

	@GetMapping("/PackDt")
	public ResponseEntity<?> getPackDt(@RequestParam Map<String, String> requestParams) {

		String baleNo = requestParams.get("baleNo");

		ResponseEntity<?> responseList = qcService2.getPackDt(baleNo);
		return responseList;
	}

	@GetMapping("/ChemicalName")
	public ResponseEntity<?> getChemicalName() {

		ResponseEntity<?> responseList = qcService2.getChemicalName();
		return responseList;
	}

	// ============================== F26 COA AB COTTON

	@PostMapping("/SaveAbCottonF26")
	public ResponseEntity<?> SaveAbCottonF26(HttpServletRequest http, @Valid @RequestBody CoaAbCottonF26 abCotton,
			BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qcService2.SaveAbCottonF26(abCotton, http);

		return response;
	}

	@PostMapping("/SubmitAbCottonF26")
	public ResponseEntity<?> SubmitAbCottonF26(HttpServletRequest http, @Valid @RequestBody CoaAbCottonF26 abCotton,
			BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qcService2.SubmitAbCottonF26(abCotton, http);

		return response;
	}

	@GetMapping("/AbCottonSummary")
	public ResponseEntity<?> AbCottonSummary(HttpServletRequest http) {
		return qcService2.AbCottonSummary(http);
	}

	@PutMapping("/ApproveOrRejectF26")
	public ResponseEntity<?> approveRejectionF26(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = qcService2.approveRejectionF26(approvalResponse, http);
		return resp;
	}

	@GetMapping("PrintApi")
	public ResponseEntity<?> PrintApi(@RequestParam Map<String, String> requestParams, Principal principal) {

		String product = requestParams.get("product");
		String customer = requestParams.get("customer");

		ResponseEntity<?> resp = qcService2.PrintApiF26(product, customer);
		return resp;
	}

	@GetMapping("getAbCottton")
	public ResponseEntity<?> getAbCottton(@RequestParam Map<String, String> requestParams, Principal principal) {

		String product = requestParams.get("product");
		String customer = requestParams.get("customer");

		ResponseEntity<?> resp = qcService2.getAbCottton(product, customer);
		return resp;
	}

	// =========================== F26A COA COTTON PADS

	@PostMapping("/SaveCottonPadsF26A")
	public ResponseEntity<?> SaveCottonPadsF26A(HttpServletRequest http, @Valid @RequestBody CoaCottonPadsF26A abCotton,
			BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qcService2.SaveCottonPadsF26A(abCotton, http);

		return response;
	}

	@PostMapping("/SubmitCottonPadsF26A")
	public ResponseEntity<?> SubmitCottonPadsF26A(HttpServletRequest http,
			@Valid @RequestBody CoaCottonPadsF26A abCotton, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qcService2.SubmitCottonPadsF26A(abCotton, http);

		return response;
	}

	@GetMapping("/F26ACottonPadSummary")
	public ResponseEntity<?> F26ACottonPadSummary(HttpServletRequest http) {
		return qcService2.F26ACottonPadSummary(http);
	}

	@PutMapping("/ApproveOrRejectF26A")
	public ResponseEntity<?> approveRejectionF26A(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = qcService2.approveRejectionF26A(approvalResponse, http);
		return resp;
	}

	@GetMapping("PrintApiF26A")
	public ResponseEntity<?> PrintApiF26A(@RequestParam Map<String, String> requestParams, Principal principal) {

		String product = requestParams.get("product");
		String customer = requestParams.get("customer");

		ResponseEntity<?> resp = qcService2.PrintApiF26A(product, customer);
		return resp;
	}

	@GetMapping("getCotttonPadF26A")
	public ResponseEntity<?> getCotttonPadF26A(@RequestParam Map<String, String> requestParams, Principal principal) {

		String product = requestParams.get("product");
		String customer = requestParams.get("customer");

		ResponseEntity<?> resp = qcService2.getCotttonPadF26A(product, customer);
		return resp;
	}

	// ============================== F26-B COA COTTON PADS

	@PostMapping("/SaveCottonBallsF26B")
	public ResponseEntity<?> SaveCottonPadsF26B(HttpServletRequest http,
			@Valid @RequestBody CoaCottonBallsF26B abCotton, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qcService2.SaveCottonPadsF26B(abCotton, http);

		return response;
	}

	@PostMapping("/SubmitCottonBallsF26B")
	public ResponseEntity<?> SubmitCottonPadsF26B(HttpServletRequest http,
			@Valid @RequestBody CoaCottonBallsF26B abCotton, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qcService2.SubmitCottonPadsF26B(abCotton, http);

		return response;
	}

	@GetMapping("/F26BCottonPadSummary")
	public ResponseEntity<?> F26BCottonPadSummary(HttpServletRequest http) {
		return qcService2.F26BCottonPadSummary(http);
	}

	@PutMapping("/ApproveOrRejectF26B")
	public ResponseEntity<?> ApproveOrRejectF26B(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = qcService2.ApproveOrRejectF26B(approvalResponse, http);
		return resp;
	}

	@GetMapping("PrintApiF26B")
	public ResponseEntity<?> PrintApiF26B(@RequestParam Map<String, String> requestParams, Principal principal) {

		String product = requestParams.get("product");
		String customer = requestParams.get("customer");

		ResponseEntity<?> resp = qcService2.PrintApiF26B(product, customer);
		return resp;
	}

	@GetMapping("getCotttonPadF26B")
	public ResponseEntity<?> getCotttonPadF26B(@RequestParam Map<String, String> requestParams, Principal principal) {

		String product = requestParams.get("product");
		String customer = requestParams.get("customer");

		ResponseEntity<?> resp = qcService2.getCotttonPadF26B(product, customer);
		return resp;
	}

	// ============================== F26-C COA COTTON WOOL ROLL

	@PostMapping("/SaveCottonWoolRollF26C")
	public ResponseEntity<?> SaveCottonWoolRollF26C(HttpServletRequest http,
			@Valid @RequestBody CoaCottonWoolRollF26C abCotton, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qcService2.SaveCottonWoolRollF26C(abCotton, http);

		return response;
	}

	@PostMapping("/SubmitCottonWoolRollF26C")
	public ResponseEntity<?> SubmitCottonWoolRollF26C(HttpServletRequest http,
			@Valid @RequestBody CoaCottonWoolRollF26C abCotton, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qcService2.SubmitCottonWoolRollF26C(abCotton, http);

		return response;
	}

	@GetMapping("/F26CCottonWoolRollSummary")
	public ResponseEntity<?> F26CottonWoolRollSummary(HttpServletRequest http) {
		return qcService2.F26CottonWoolRollSummary(http);
	}

	@PutMapping("/ApproveOrRejectF26C")
	public ResponseEntity<?> ApproveOrRejectF26C(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = qcService2.ApproveOrRejectF26C(approvalResponse, http);
		return resp;
	}

	@GetMapping("PrintApiF26C")
	public ResponseEntity<?> PrintApiF26C(@RequestParam Map<String, String> requestParams, Principal principal) {

		String product = requestParams.get("product");
		String customer = requestParams.get("customer");

		ResponseEntity<?> resp = qcService2.PrintApiF26C(product, customer);
		return resp;
	}

	@GetMapping("getCotttonWoolRollF26C")
	public ResponseEntity<?> getCotttonWoolRollF26C(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String product = requestParams.get("product");
		String customer = requestParams.get("customer");

		ResponseEntity<?> resp = qcService2.getCotttonWoolRollF26C(product, customer);
		return resp;
	}

	// ============================== F26-D COA COTTON WOOL PLEAT

	@PostMapping("/SaveCottonWoolPleatF26D")
	public ResponseEntity<?> SaveCottonWoolPleatF26D(HttpServletRequest http,
			@Valid @RequestBody CoaCottonWoolPleatF26D abCotton, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qcService2.SaveCottonWoolPleatF26D(abCotton, http);

		return response;
	}

	@PostMapping("/SubmitCottonWoolPleatF26D")
	public ResponseEntity<?> SubmitCottonWoolPleatF26D(HttpServletRequest http,
			@Valid @RequestBody CoaCottonWoolPleatF26D abCotton, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qcService2.SubmitCottonWoolPleatF26D(abCotton, http);

		return response;
	}

	@GetMapping("/F26DCottonWoolPleatSummary")
	public ResponseEntity<?> F26DCottonWoolPleatSummary(HttpServletRequest http) {
		return qcService2.F26DCottonWoolPleatSummary(http);
	}

	@PutMapping("/ApproveOrRejectF26D")
	public ResponseEntity<?> ApproveOrRejectF26D(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = qcService2.ApproveOrRejectF26D(approvalResponse, http);
		return resp;
	}

	@GetMapping("PrintApiF26D")
	public ResponseEntity<?> PrintApiF26D(@RequestParam Map<String, String> requestParams, Principal principal) {

		String product = requestParams.get("product");
		String customer = requestParams.get("customer");

		ResponseEntity<?> resp = qcService2.PrintApiF26D(product, customer);
		return resp;
	}

	@GetMapping("getCotttonWoolPleatF26D")
	public ResponseEntity<?> getCotttonWoolPleatF26D(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String product = requestParams.get("product");
		String customer = requestParams.get("customer");

		ResponseEntity<?> resp = qcService2.getCotttonWoolPleatF26D(product, customer);
		return resp;
	}

	// ============================== F26-E COA COTTON ROLL GOODS

	@PostMapping("/SaveCottonRollGoodsF26E")
	public ResponseEntity<?> SaveCottonRollGoodsF26E(HttpServletRequest http,
			@Valid @RequestBody CoaCottonRollGoodsF26E abCotton, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qcService2.SaveCottonRollGoodsF26E(abCotton, http);

		return response;
	}

	@PostMapping("/SubmitCottonRollGoodsF26E")
	public ResponseEntity<?> SubmitCottonRollGoodsF26E(HttpServletRequest http,
			@Valid @RequestBody CoaCottonRollGoodsF26E abCotton, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qcService2.SubmitCottonRollGoodsF26E(abCotton, http);

		return response;
	}

	@GetMapping("/F26ECottonRoolGoodsSummary")
	public ResponseEntity<?> F26ECottonRoolGoodsSummary(HttpServletRequest http) {
		return qcService2.F26ECottonRoolGoodsSummary(http);
	}

	@PutMapping("/ApproveOrRejectF26E")
	public ResponseEntity<?> ApproveOrRejectF26E(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = qcService2.ApproveOrRejectF26E(approvalResponse, http);
		return resp;
	}

	@GetMapping("/PrintApiF26E")
	public ResponseEntity<?> PrintApiF26E(@RequestParam Map<String, String> requestParams, Principal principal) {

		String product = requestParams.get("product");
		String customer = requestParams.get("customer");

		ResponseEntity<?> resp = qcService2.PrintApiF26E(product, customer);
		return resp;
	}

	@GetMapping("/getCotttonRoolGoodsF26E")
	public ResponseEntity<?> getCotttonRoolGoodsF26E(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String product = requestParams.get("product");
		String customer = requestParams.get("customer");

		ResponseEntity<?> resp = qcService2.getCotttonRoolGoodsF26E(product, customer);
		return resp;
	}

	// ============================== F26-F COA INFUSED COTTON PADS

	@PostMapping("/SaveInfusedCottonPadsF26F")
	public ResponseEntity<?> SaveInfusedCottonPadsF26F(HttpServletRequest http,
			@Valid @RequestBody CoaInfusedCottonPadsF26F abCotton, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qcService2.SaveInfusedCottonPadsF26F(abCotton, http);

		return response;
	}

	@PostMapping("/SubmitInfusedCottonPadsF26F")
	public ResponseEntity<?> SubmitInfusedCottonPadsF26F(HttpServletRequest http,
			@Valid @RequestBody CoaInfusedCottonPadsF26F abCotton, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qcService2.SubmitInfusedCottonPadsF26F(abCotton, http);

		return response;
	}

	@GetMapping("/F26FInfusedCottonPadsSummary")
	public ResponseEntity<?> F26FInfusedCottonPadsSummary(HttpServletRequest http) {
		return qcService2.F26FInfusedCottonPadsSummary(http);
	}

	@PutMapping("/ApproveOrRejectF26F")
	public ResponseEntity<?> ApproveOrRejectF26F(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = qcService2.ApproveOrRejectF26F(approvalResponse, http);
		return resp;
	}

	@GetMapping("/PrintApiF26F")
	public ResponseEntity<?> PrintApiF26F(@RequestParam Map<String, String> requestParams, Principal principal) {

		String product = requestParams.get("product");
		String customer = requestParams.get("customer");

		ResponseEntity<?> resp = qcService2.PrintApiF26F(product, customer);
		return resp;
	}

	@GetMapping("/getInfusedCottonPadsF26F")
	public ResponseEntity<?> getInfusedCottonPadsF26F(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String product = requestParams.get("product");
		String customer = requestParams.get("customer");

		ResponseEntity<?> resp = qcService2.getInfusedCottonPadsF26F(product, customer);
		return resp;
	}

	// ============================== F26-D COA MOISTURES

	@PostMapping("/SaveMoisturesF26G")
	public ResponseEntity<?> SaveMoisturesF26G(HttpServletRequest http, @Valid @RequestBody CoaMoistureF26G abCotton,
			BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qcService2.SaveMoisturesF26G(abCotton, http);

		return response;
	}

	@PostMapping("/SubmitMoisturesF26G")
	public ResponseEntity<?> SubmitMoisturesF26G(HttpServletRequest http, @Valid @RequestBody CoaMoistureF26G abCotton,
			BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qcService2.SubmitMoisturesF26G(abCotton, http);

		return response;
	}

	@GetMapping("/F26GMoistureSummary")
	public ResponseEntity<?> F26GMoistureSummary(HttpServletRequest http) {
		return qcService2.F26GMoistureSummary(http);
	}

	@PutMapping("/ApproveOrRejectF26G")
	public ResponseEntity<?> ApproveOrRejectF26G(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = qcService2.ApproveOrRejectF26G(approvalResponse, http);
		return resp;
	}

	@GetMapping("/PrintApiF26G")
	public ResponseEntity<?> PrintApiF26G(@RequestParam Map<String, String> requestParams, Principal principal) {

		String product = requestParams.get("product");
		String customer = requestParams.get("customer");
		String testingDate = requestParams.get("testingDate");

		ResponseEntity<?> resp = qcService2.PrintApiF26G(product, customer, testingDate);
		return resp;
	}

	@GetMapping("/getMoisturesF26G")
	public ResponseEntity<?> getMoisturesF26G(@RequestParam Map<String, String> requestParams, Principal principal) {

		String product = requestParams.get("product");
		String customer = requestParams.get("customer");
		String testingDate = requestParams.get("testingDate");

		ResponseEntity<?> resp = qcService2.getMoisturesF26G(product, customer, testingDate);
		return resp;
	}

	// ============================== F016 STANDARIZATION OF CHEMICAL

	@PostMapping("/SaveStandardOfChemicalF016")
	public ResponseEntity<?> SaveStandardOfChemicalF016(HttpServletRequest http,
			@Valid @RequestBody StandarizationOfChemicalReportF016 abCotton, BindingResult result,
			Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qcService2.SaveStandardOfChemicalF016(abCotton, http);

		return response;
	}

	@PostMapping("/SubmitStandardOfChemicalF016")
	public ResponseEntity<?> SubmitStandardOfChemicalF016(HttpServletRequest http,
			@Valid @RequestBody StandarizationOfChemicalReportF016 abCotton, BindingResult result,
			Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qcService2.SubmitStandardOfChemicalF016(abCotton, http);

		return response;
	}

	@GetMapping("/F016StandardOfChemicalSummary")
	public ResponseEntity<?> F016StandardOfChemicalSummary(HttpServletRequest http) {
		return qcService2.F016StandardOfChemicalSummary(http);
	}

	@PutMapping("/ApproveOrRejectF016")
	public ResponseEntity<?> ApproveOrRejectF016(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = qcService2.ApproveOrRejectF016(approvalResponse, http);
		return resp;
	}

	@GetMapping("/PrintApiF016")
	public ResponseEntity<?> PrintApiF016(@RequestParam Map<String, String> requestParams, Principal principal) {

		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		String chemical = requestParams.get("chemical");

		ResponseEntity<?> resp = qcService2.PrintApiF016(date, shift, chemical);
		return resp;
	}

	@GetMapping("/getStandardOfChemicalF016")
	public ResponseEntity<?> getStandardOfChemicalF016(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		String chemical = requestParams.get("chemical");

		ResponseEntity<?> resp = qcService2.getStandardOfChemicalF016(date, shift, chemical);
		return resp;
	}

	// ============================== F007 WATER ANALYSIS REPORT

	@PostMapping("/SaveWaterAnalysisReportF007")
	public ResponseEntity<?> SaveWaterAnalysisReportF007(HttpServletRequest http,
			@Valid @RequestBody WaterAnalysisReportF007 abCotton, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qcService2.SaveWaterAnalysisReportF007(abCotton, http);

		return response;
	}

	@PostMapping("/SubmitWaterAnalysisReportF007")
	public ResponseEntity<?> SubmitWaterAnalysisReportF007(HttpServletRequest http,
			@Valid @RequestBody WaterAnalysisReportF007 abCotton, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qcService2.SubmitWaterAnalysisReportF007(abCotton, http);

		return response;
	}

	@GetMapping("/getWaterAnalysisReport")
	public ResponseEntity<?> getWaterAnalysisReport(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String date = requestParams.get("date");

		ResponseEntity<?> resp = qcService2.getWaterAnalysisReport(date);
		return resp;
	}

	@GetMapping("/WaterAnalysisPrintApi")
	public ResponseEntity<?> WaterAnalysisPrintApi(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String date = requestParams.get("date");

		ResponseEntity<?> resp = qcService2.WaterAnalysisPrintApi(date);
		return resp;
	}

	@GetMapping("/WaterAnalysisSummary")
	public ResponseEntity<?> WaterAnalysisSummary(HttpServletRequest http) {
		return qcService2.WaterAnalysisSummary(http);
	}

	@GetMapping("/WaterAnalysisManagerSummary")
	public ResponseEntity<?> WaterAnalysisManagerSummary(HttpServletRequest http) {
		return qcService2.WaterAnalysisManagerSummary(http);
	}

	@PutMapping("/ApproveOrRejectF007")
	public ResponseEntity<?> ApproveOrRejectF007(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = qcService2.ApproveOrRejectF007(approvalResponse, http);
		return resp;
	}

	// =================== DIGITAL COLONY COUNTER CALIBRATION REPORT F030

	@PostMapping("/SaveDigitalColonyF030")
	public ResponseEntity<?> SaveDigitalColonyF030(HttpServletRequest http,
			@Valid @RequestBody DigitalColonyCounterF030 abCotton, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qcService2.SaveDigitalColonyF030(abCotton, http);

		return response;
	}

	@PostMapping("/SubmitDigitalColonyF030")
	public ResponseEntity<?> SubmitDigitalColonyF030(HttpServletRequest http,
			@Valid @RequestBody DigitalColonyCounterF030 abCotton, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qcService2.SubmitDigitalColonyF030(abCotton, http);

		return response;
	}

	@GetMapping("/DigitalSummary")
	public ResponseEntity<?> DigitalSummary(HttpServletRequest http) {
		return qcService2.DigitalSummary(http);
	}

	@PutMapping("/ApproveOrRejectF030")
	public ResponseEntity<?> ApproveOrRejectF030(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = qcService2.ApproveOrRejectF030(approvalResponse, http);
		return resp;
	}

	@GetMapping("/PrintApiF030")
	public ResponseEntity<?> PrintApiF030(@RequestParam Map<String, String> requestParams, Principal principal) {

		String month = requestParams.get("month");
		String year = requestParams.get("year");
		String eq_id = requestParams.get("eq_id");

		ResponseEntity<?> resp = qcService2.PrintApiF030(month, year, eq_id);
		return resp;
	}

	@GetMapping("/getDigitalF030")
	public ResponseEntity<?> getDigitalF030(@RequestParam Map<String, String> requestParams, Principal principal) {

		String month = requestParams.get("month");
		String year = requestParams.get("year");
		String eq_id = requestParams.get("eq_id");

		ResponseEntity<?> resp = qcService2.getDigitalF030(month, year, eq_id);
		return resp;
	}

	@GetMapping("Product")
	public ResponseEntity<?> getProduct() {

		ResponseEntity<?> resp = qcService2.getProductF26G();
		return resp;
	}

	@GetMapping("/Customer")
	public ResponseEntity<?> getCustomer() {

		ResponseEntity<?> responseList = qcService2.getCustomer();
		return responseList;
	}

	// COMMON BASED ON FORM NO F26A - F26G

	@GetMapping("/ProductF26")
	public ResponseEntity<?> ProductF26(@RequestParam Map<String, String> requestParams) {

		String customer = requestParams.get("customer");
		String formNo = requestParams.get("formNo");

		ResponseEntity<?> responseList = qcService2.ProductF26(customer, formNo);
		return responseList;
	}

	// AMC

	@GetMapping("/ProductDescription")
	public ResponseEntity<?> ProductDescription() {

		ResponseEntity<?> responseList = qcService2.ProductDescription();
		return responseList;
	}

}
