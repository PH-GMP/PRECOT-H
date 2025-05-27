package com.focusr.Precot.mssql.database.controller.Qc;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.model.Qc.DisposalRecord;
import com.focusr.Precot.mssql.database.model.Qc.QAqcObservations;
import com.focusr.Precot.mssql.database.model.Qc.RequistionF029;
import com.focusr.Precot.mssql.database.model.Qc.absorbentbleachedcottonreportCLF005;
import com.focusr.Precot.mssql.database.model.Qc.absorbentbleachedcottonreportCLF005Parent;
import com.focusr.Precot.mssql.database.model.Qc.briquettesanalysisreportARF014;
import com.focusr.Precot.mssql.database.model.Qc.distillwaterconsumF27;
import com.focusr.Precot.mssql.database.model.Qc.exfoliatingfabricanalysisreport;
import com.focusr.Precot.mssql.database.model.Qc.finishedproductanalysisreportF006;
import com.focusr.Precot.mssql.database.model.Qc.fumigationARF011;
import com.focusr.Precot.mssql.database.model.Qc.fungalIncubatorReportCLF013;
import com.focusr.Precot.mssql.database.model.Qc.mediaDisposalCLF022;
import com.focusr.Precot.mssql.database.model.Qc.microbiologicalAnalyisisReportF20;
import com.focusr.Precot.mssql.database.model.Qc.non_woven_F005;
import com.focusr.Precot.mssql.database.model.Qc.physicalandchemicaltest;
import com.focusr.Precot.mssql.database.model.Qc.potableWaterARF013Report;
import com.focusr.Precot.mssql.database.model.Qc.spectrophotometerReportClF011;
import com.focusr.Precot.mssql.database.model.Qc.temperatureRelativeF018;
import com.focusr.Precot.mssql.database.model.Qc.turbiditycalibrationreportCLF009;
import com.focusr.Precot.mssql.database.model.Qc.validationAutoclave;
import com.focusr.Precot.mssql.database.model.Qc.weighingscalecalibrationreportCLF007;
import com.focusr.Precot.mssql.database.service.Qc.qcService8;
import com.focusr.Precot.payload.ApproveResponse;

/**
 * ARF-F002
 * ARF-F004
 * ARF-F005post
 * ARF-F006
 * AR -F011
 * AR -F013
 * ARF-F014
 * CL -F007
 * CL -F005
 * CL -F009
 * CL -F011
 * CL -F013  
 * CL -F024
 * CL -F015
 * @author Gokul.B
 *
 */




@RestController
@RequestMapping("/api/chemicaltest")
public class QcController8 {
	
	@Autowired
	qcService8 chemicalTest;
	

	
	@PostMapping("/ARF002/saveChemicalTest")
	public ResponseEntity<?> saveRPProdReport(
			@Valid @RequestBody physicalandchemicaltest physicalchemicaltest, HttpServletRequest http) {


		ResponseEntity<?> resp = chemicalTest.saveChemicalTest(physicalchemicaltest, http);
		return resp;

	}
	
	@PostMapping("/ARF002/submitChemicalTest")
	public ResponseEntity<?> submitRPProdReport(
			 @RequestBody physicalandchemicaltest physicalchemicaltest, HttpServletRequest http) {

		
	
		List<QAqcObservations> qaqcl = new ArrayList<>();

		ResponseEntity<?> resp = chemicalTest.submitChemicalTest(physicalchemicaltest, http);
		return resp;

	}
	
	@GetMapping("/ARF002/getchemical/{id}")
	public ResponseEntity<?> getchemical(@PathVariable Long id) {

		ResponseEntity<?> resp = chemicalTest.getTestById(id);
		return resp;

	}
	
	@GetMapping("/ARF002/getchemicalTestbyBatch/{sub_batch_id}")
	public ResponseEntity<?> getchemicalbyBatch(@PathVariable String sub_batch_id) {

		ResponseEntity<?> resp = chemicalTest.getTestByBatchId(sub_batch_id);
		return resp;

	}
	
	@GetMapping("/ARF002/getchemicalTestbyBatch/PDE")
	public ResponseEntity<?> getchemicalbyBatchPDE(@RequestParam(required = false) String sub_batch_id) {

		ResponseEntity<?> resp = chemicalTest.getTestByBatchIdPDE(sub_batch_id);
		return resp;

	}
	
	@GetMapping("/ARF002/print/{sub_batch_id}")
	public ResponseEntity<?> printARF002(@PathVariable String sub_batch_id) {

		ResponseEntity<?> resp = chemicalTest.print(sub_batch_id);
		return resp;

	}
	
	@GetMapping("/ARF002/BMR/{bmr}")
	public ResponseEntity<?> bmrF002(@PathVariable String bmr) {

		ResponseEntity<?> resp = chemicalTest.getByBmrF002(bmr);
		return resp;

	}
	
	@GetMapping("/ARF002/approveList")
	public ResponseEntity<?> approveListARF002() {

		ResponseEntity<?> resp = chemicalTest.approveListtF002();
		return resp;

	}
	
	@GetMapping("/ARF002/GETALL")
	public ResponseEntity<?> getAllListARF002(HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.getAllListtF002(http);
		return resp;

	}
	
	@PostMapping("/ARF002/approval")
	public ResponseEntity<?> approve(@RequestBody   ApproveResponse approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.approveChemicalTestF02(approvalResponse, http);
		return resp;

	}

	
	@GetMapping("/ARF002/getAllchemicalTest")
	public ResponseEntity<?> getallchemical() {

		ResponseEntity<?> resp = chemicalTest.getallTestF002();
		return resp;

	}
	

	
	@GetMapping("/ARF002/PDE-Data/{batchNo}")
	public ResponseEntity<?> getPdeData(@PathVariable String batchNo) {

		ResponseEntity<?> resp = chemicalTest.pdeData(batchNo);
		return resp;
	}
	
//  ------------------------------------------------------- AR F004 ----------------------------------------------------------

	@PostMapping("/ARF004/saveChemicalTest")
	public ResponseEntity<?> saveExfoliaReport(
			@Valid @RequestBody exfoliatingfabricanalysisreport exfo, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.saveexfoliatingTest(exfo, http);
		return resp;

	}
	
	@PostMapping("/ARF004/submitChemicalTest")
	public ResponseEntity<?> submitExfoliaReport(
			@Valid @RequestBody exfoliatingfabricanalysisreport exfo, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.submitExfoliatingF004(exfo, http);
		return resp;

	}
	
	@PostMapping("/ARF004/approve")
	public ResponseEntity<?> approveexfolia( @Valid @RequestBody  ApproveResponse approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.approveExfoliating(approvalResponse, http);
		return resp;

	}
	
	@GetMapping("/ARF004/getAll")
	public ResponseEntity<?> getAll(HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.getallF004Test(http);
		return resp;
	}
	
	
	@GetMapping("/ARF004/approveList")
	public ResponseEntity<?> approvelistARF004() {

		ResponseEntity<?> resp = chemicalTest.getapproveLisrF004();
		return resp;
	}
	
	@GetMapping("/ARF004/getByInvoice")
	public ResponseEntity<?> getByInvoice(@RequestParam(required = false) String invoice) {

		ResponseEntity<?> resp = chemicalTest.getByInvoiceF004(invoice);
		return resp;
	}
	
	@GetMapping("/ARF004/getByInvoice/PDE")
	public ResponseEntity<?> getByInvoicePDE(@RequestParam(required = false) String invoice) {

		ResponseEntity<?> resp = chemicalTest.getByInvoiceF004PDE(invoice);
		return resp;
	}
	
	@GetMapping("/ARF004/print")
	public ResponseEntity<?> printARF004(@RequestParam(required = false) String invoice) {

		ResponseEntity<?> resp = chemicalTest.printF004(invoice);
		return resp;
	}
	
	@GetMapping("/ARF004/ById/{invoice}")
	public ResponseEntity<?> getByF004(@PathVariable Long invoice) {

		ResponseEntity<?> resp = chemicalTest.getByIdF004(invoice);
		return resp;
	}

	@GetMapping("/ARF004/PDE")
	public ResponseEntity<?> PDEARF004() {

		ResponseEntity<?> resp = chemicalTest.PdeARF004();
		return resp;
	}
	
	@GetMapping("/ARF004/PDEData")
	public ResponseEntity<?> PDEARF004(@RequestParam(required = false) String pde) {

		ResponseEntity<?> resp = chemicalTest.PdeARF004(pde);
		return resp;
	}


//  ------------------------------------------------------- AR F006 ----------------------------------------------------------
	
	@PostMapping("/ARF006/save/finishedReport")
	public ResponseEntity<?> save(
			@Valid @RequestBody finishedproductanalysisreportF006 fpr, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.saveTest(fpr, http);
		return resp;

	}
	
	@PostMapping("/ARF006/Submit/finishedReport")
	public ResponseEntity<?> submit(
			@Valid @RequestBody finishedproductanalysisreportF006 fpr, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.submitFinished(fpr, http);
		return resp;

	}
	
//	@GetMapping("/ARF006/{bmr}")
//	public ResponseEntity<?> getByBmr(@PathVariable String bmr) {
//
//		ResponseEntity<?> resp = chemicalTest.getTestByBmrF006(bmr);
//		return resp;
//
//	}
//	
//	@GetMapping("/ARF006/ID/{id}")
//	public ResponseEntity<?> getByIdARF006(@PathVariable Long id) {
//
//		ResponseEntity<?> resp = chemicalTest.findByIdF006(id);
//		return resp;
//
//	}
//	
//	@GetMapping("/ARF006/PDE/{bmr}")
//	public ResponseEntity<?> pde(@PathVariable String bmr) {
//
//		ResponseEntity<?> resp = chemicalTest.pdeDataARF006(bmr);
//		return resp;	
//
//	}
//	
//	@GetMapping("/ARF006/print/{bmr}")
//	public ResponseEntity<?> printARF006(@PathVariable String bmr) {
//
//		ResponseEntity<?> resp = chemicalTest.printF006(bmr);
//		return resp;
//
//	}
	
	// get mapping with bmr and date
	@GetMapping("/ARF006")
	public ResponseEntity<?> getByBmrAndDate(@RequestParam String bmr,@RequestParam String date) {

		ResponseEntity<?> resp = chemicalTest.getTestByBmrAndDateF006(bmr,date);
		return resp;

	}
	
	@GetMapping("/ARF006/ID/{id}")
	public ResponseEntity<?> getByIdARF006(@PathVariable Long id) {

		ResponseEntity<?> resp = chemicalTest.findByIdF006(id);
		return resp;

	}
	
	@GetMapping("/ARF006/PDE")
	public ResponseEntity<?> pde(@RequestParam String bmr,@RequestParam String date) {

		ResponseEntity<?> resp = chemicalTest.pdeDataARF006(bmr,date);
		return resp;	

	}
	
	@GetMapping("/ARF006/print")
	public ResponseEntity<?> printARF006(@RequestParam String bmr,@RequestParam String date) {

		ResponseEntity<?> resp = chemicalTest.printF006(bmr,date);
		return resp;

	}
		
	@GetMapping("/ARF006/approveList")
	public ResponseEntity<?> approveList(
			) {

		ResponseEntity<?> resp = chemicalTest.getApproveListF006();
		return resp;

	}
	
	@GetMapping("/ARF006/getAll")
	public ResponseEntity<?> getAllList(HttpServletRequest http
			) {

		ResponseEntity<?> resp = chemicalTest.getallTestF006(http);
		return resp;

	}
	
	
	
	@PostMapping("/ARF006/approval")
	public ResponseEntity<?> approveF006(
			@RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.approveF006(approvalResponse,http);
		return resp;

	}
	
	
	// AR F005
//  ------------------------------------------------------- AR F005 ----------------------------------------------------------
	
	@PostMapping("/ARF005/save/nonwovenReport")
	public ResponseEntity<?> saveF005(
			@Valid @RequestBody non_woven_F005 nonwoven, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.saveNonWoven(nonwoven, http);
		return resp;

	}
	
	@PostMapping("/ARF005/Submit/nonwovenReport")
	public ResponseEntity<?> submitF005(
			@Valid @RequestBody non_woven_F005 nonwoven, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.submitNonwoven(nonwoven, http);
		return resp;

	}
	
	@GetMapping("/ARF005/{bmr}")
	public ResponseEntity<?> getByBmrF005(@PathVariable String bmr) {

		ResponseEntity<?> resp = chemicalTest.getByBmrF005(bmr);
		return resp;

	}
	
	@GetMapping("/ARF005/print/{bmr}")
	public ResponseEntity<?> printF005(@PathVariable String bmr) {

		ResponseEntity<?> resp = chemicalTest.printF005(bmr);
		return resp;

	}
	@GetMapping("/ARF005/Id/{id}")
	public ResponseEntity<?> getById(@PathVariable Long id) {

		ResponseEntity<?> resp = chemicalTest.getByIdF005(id);
		return resp;

	}
	
	@GetMapping("/ARF005/approveList")
	public ResponseEntity<?> approveListF005() {

		ResponseEntity<?> resp = chemicalTest.getapproveListF005();
		return resp;

	}
	
	@GetMapping("/ARF005/getAll")
	public ResponseEntity<?> getAllListF005() {

		ResponseEntity<?> resp = chemicalTest.getAllF005();
		return resp;

	}
	
	@GetMapping("/ARF005/submitList")
	public ResponseEntity<?> submitListF005() {

		ResponseEntity<?> resp = chemicalTest.getsubmitListF005();
		return resp;

	}
	
	
	
	@PostMapping("/ARF005/approval")
	public ResponseEntity<?> approveF005(
			@RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.approveF05(approvalResponse,http);
		return resp;

	}
	
	@GetMapping("/ARF005/PDE/{bmr}")
	public ResponseEntity<?> pdeF005(@PathVariable String bmr) {

		ResponseEntity<?> resp = chemicalTest.pdeDataARF005(bmr);
		return resp;

	}
	
	@GetMapping("/ARF005/BMR")
	public ResponseEntity<?> BMRF005() {

		ResponseEntity<?> resp = chemicalTest.getBatchNumbersForLast45Days();
		return resp;

	}
	
	//AR F011
//  ------------------------------------------------------- AR F011 ----------------------------------------------------------
	
	
	@PostMapping("/ARF011/save/fumigationReport")
	public ResponseEntity<?> saveF011(
			@Valid @RequestBody fumigationARF011 fumigation, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.saveFumigation(fumigation, http);
		return resp;

	}
	
	@PostMapping("/ARF011/Submit/fumigationReport")
	public ResponseEntity<?> submitF011(
			@Valid @RequestBody fumigationARF011 fumigation, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.submitFumigation(fumigation, http);
		return resp;

	}
	
	@GetMapping("/ARF011")
	public ResponseEntity<?> getByDateF011(@RequestParam(required = false) String year, @RequestParam(required = false) String month, @RequestParam(required = false) String date) {

		ResponseEntity<?> resp = chemicalTest.getByFumigationDate(year,month,date);
		return resp;

	}
	
	@GetMapping("/ARF011/print")
	public ResponseEntity<?> printF011(@RequestParam(required = false) String year, @RequestParam(required = false) String month, @RequestParam(required = false) String date) {

		ResponseEntity<?> resp = chemicalTest.printF011(year,month,date);
		return resp;

	}
	
	@GetMapping("/ARF011/Id/{id}")
	public ResponseEntity<?> printF011(@PathVariable Long id) {

		ResponseEntity<?> resp = chemicalTest.getByIdF011(id);
		return resp;

	}
	

	
	@GetMapping("/ARF011/approveList")
	public ResponseEntity<?> approveF011() {

		ResponseEntity<?> resp = chemicalTest.approveListF011();
		return resp;

	}
	
	@GetMapping("/ARF011/getAll")
	public ResponseEntity<?> getAllF011(HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.getF011All(http);
		return resp;

	}
	
	@PostMapping("/ARF011/approval")
	public ResponseEntity<?> approveF011(
			@RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.approveF011(approvalResponse,http);
		return resp;

	}
	
 	//  ------------------------------------------------------- AR F013 ----------------------------------------------------------
	
	@PostMapping("/ARF013/save/potableWaterARF013Report")
	public ResponseEntity<?> saveF013(
			@Valid @RequestBody potableWaterARF013Report potableWaterARF013Report, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.savePotableWaterReport(potableWaterARF013Report, http);
		return resp;

	}
	
	@PostMapping("/ARF013/Submit/potableWaterARF013Report")
	public ResponseEntity<?> submitF013(
			@Valid @RequestBody potableWaterARF013Report potableWaterARF013Report, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.submitPotableWaterARF013Report(potableWaterARF013Report, http);
		return resp;

	}
	
	@GetMapping("/ARF013")
	public ResponseEntity<?> getByDateF013(@RequestParam(required = false) String year, @RequestParam(required = false) String month, @RequestParam(required = false) String date) {

		ResponseEntity<?> resp = chemicalTest.getBySampledDate(year , month , date);
		return resp;

	}
	
	@GetMapping("/ARF013/{id}")
	public ResponseEntity<?> getByIdF013(@PathVariable Long id) {

		ResponseEntity<?> resp = chemicalTest.getById(id);
		return resp;

	}
	
	@GetMapping("/ARF013/print")
	public ResponseEntity<?> printF013(@RequestParam(required = false) String year, @RequestParam(required = false) String month, @RequestParam(required = false) String date) {

		ResponseEntity<?> resp = chemicalTest.printF013(year , month , date);
		return resp;

	}
	
	@PutMapping("/ARF013/approval")
	public ResponseEntity<?> approveF013(
			@RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.approveF013(approvalResponse,http);
		return resp;

	}
	
	@GetMapping("/ARF013/approvalList")
	public ResponseEntity<?> approveListF013() {

		ResponseEntity<?> resp = chemicalTest.getapproveListF013();
		return resp;

	}
	
	@GetMapping("/ARF013/getAll")
	public ResponseEntity<?> getAllF013(HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.getAllF013(http);
		return resp;

	}
	
	// ----------------------------------------AR-F0014--------------------------------------------
	
	@PostMapping("/ARF014/save/briquettesanalysisreportARF014")
	public ResponseEntity<?> saveF014(
			@Valid @RequestBody briquettesanalysisreportARF014 briquettesanalysisreportARF014, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.saveChemicalTestARF014(briquettesanalysisreportARF014, http);
		return resp;

	}
	
	@PostMapping("/ARF014/Submit/briquettesanalysisreportARF014")
	public ResponseEntity<?> submitF014(
			@Valid @RequestBody briquettesanalysisreportARF014 briquettesanalysisreportARF014, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.submitChemicalTestARF014(briquettesanalysisreportARF014, http);
		return resp;

	}
	
	@GetMapping("/ARF014/{supplier}")
	public ResponseEntity<?> getByDateF014(@PathVariable String supplier) {

		ResponseEntity<?> resp = chemicalTest.getTestByBatchIdF014(supplier);
		return resp;

	}
	
	@GetMapping("/ARF014/Id/{id}")
	public ResponseEntity<?> getByDateF014(@PathVariable Long id) {

		ResponseEntity<?> resp = chemicalTest.getTestByIdF014(id);
		return resp;

	}
	
	@GetMapping("/ARF014/PDE")
	public ResponseEntity<?> getPDEF014() {

		ResponseEntity<?> resp = chemicalTest.getPDEF014();
		return resp;

	}
	
	@PostMapping("/ARF014/approve")
	public ResponseEntity<?> approveCLF014(@RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.approveCLF014(approvalResponse , http);
		return resp;

	}
	
	@GetMapping("/ARF014/getAll")
	public ResponseEntity<?> getALlF014(HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.getallTestF014(http);
		return resp;

	}
	
	@GetMapping("/ARF014/print")
	public ResponseEntity<?> printF014(@RequestParam(required = false) String invoice,@RequestParam(required = false) String year, @RequestParam(required = false) String supplier) {

		ResponseEntity<?> resp = chemicalTest.printF014(invoice,supplier);
		return resp;

	}
	
	
//  ------------------------------------------------------- CL-F007 ----------------------------------------------------------
	

	@PostMapping("/CLF007/save/wigClf007")
	public ResponseEntity<?> saveCLF007(
			@Valid @RequestBody weighingscalecalibrationreportCLF007 wigClf007, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.saveCLF007(wigClf007, http);
		return resp;

	}
	
	@PostMapping("/CLF007/Submit/wigClf007")
	public ResponseEntity<?> submitClf007(
			@Valid @RequestBody weighingscalecalibrationreportCLF007 wigClf007, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.submitCLF007(wigClf007, http);
		return resp;

	}
	
	@GetMapping("/CLF007")
	public ResponseEntity<?> getByDateCLF007(@RequestParam(required = false) String eq_no,@RequestParam(required = false) String year, @RequestParam(required = false) String month, @RequestParam(required = false) String date) {

		ResponseEntity<?> resp = chemicalTest.getbyDate(eq_no,year,month,date);
		return resp;

	}
	
	@GetMapping("/CLF007/PDE")
	public ResponseEntity<?> weighPDE(@RequestParam(required = false) String eq_no) {

		ResponseEntity<?> resp = chemicalTest.weighScalePDE(eq_no);
		return resp;

	}
	
	@GetMapping("/CLF007/PDE-EQID")
	public ResponseEntity<?> WEIGHPDEEQ_NO() {

		ResponseEntity<?> resp = chemicalTest.weighScalePDE();
		return resp;

	}
	
	@GetMapping("/CLF007/print")
	public ResponseEntity<?> printCLF007(@RequestParam(required = false) String eq_no,@RequestParam(required = false) String year, @RequestParam(required = false) String month, @RequestParam(required = false) String date) {

		ResponseEntity<?> resp = chemicalTest.printCLF007(eq_no,year,month,date);
		return resp;

	}
	
	@GetMapping("/CLF007/Id/{id}")
	public ResponseEntity<?> getByIdCLF007(@PathVariable Long id) {

		ResponseEntity<?> resp = chemicalTest.getTestByIdCLF007(id);
		return resp;

	}
	
	@GetMapping("/CLF007/approveList")
	public ResponseEntity<?> getApproveList() {

		ResponseEntity<?> resp = chemicalTest.getapproveListCLF007();
		return resp;

	}
	
	@GetMapping("/CLF007/getAll")
	public ResponseEntity<?> getALlListClF007(HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.getallTestCLF007(http);
		return resp;

	}
	
	@PostMapping("/CLF007/approval")
	public ResponseEntity<?> approveCLF07(
			@RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.approveCLF07(approvalResponse,http);
		return resp;

	}
	
	//-----------------------------------------------------------CL-F005--------------------------------------------------------------
	
	@PostMapping("/CLF005/save/absorbentbleachedcotton")
	public ResponseEntity<?> saveCLF005(
			@Valid @RequestBody  absorbentbleachedcottonreportCLF005Parent absorbentbleachedcottonreportCLF005, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.saveChemicalTestCLF005(absorbentbleachedcottonreportCLF005, http);
		return resp;

	}
	
	
	
	
	@PostMapping("/CLF005/submit/absorbentbleachedcotton")
	public ResponseEntity<?> submitCLF005(
			@Valid @RequestBody absorbentbleachedcottonreportCLF005Parent absorbentbleachedcottonreportCLF005, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.submitChemicalTestCLF005(absorbentbleachedcottonreportCLF005, http);
		return resp;

	}
	
	@PostMapping("/CLF005/approval")
	public ResponseEntity<?> approveCLF005(
			@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.approveChemicalTestCLF05(approvalResponse, http);
		return resp;

	}

	
	@GetMapping("/CLF005/getAll")
	public ResponseEntity<?> getAllCLF005(HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.getallTestCLF005(http);
		return resp;

	}
	
	
	@GetMapping("/CLF005/getById")
	public ResponseEntity<?> getbyIdCLF005(@RequestParam(required = false) Long id) {

		ResponseEntity<?> resp = chemicalTest.getTestByIdCLF05(id);
		return resp;

	}
	
	@GetMapping("/CLF005/PDE")
	public ResponseEntity<?> pdeCLF005(@RequestParam(required = false) String bmr) {

		ResponseEntity<?> resp = chemicalTest.getPDECLF05(bmr);
		return resp;

	}
	
	@GetMapping("/CLF005/print")
	public ResponseEntity<?> printCLF005(@RequestParam(required = false) String id, @RequestParam(required = false) String rg) {

		ResponseEntity<?> resp = chemicalTest.printCLF05(id,rg);
		return resp;

	}
	
	@GetMapping("/CLF005")
	public ResponseEntity<?> getCLF005(@RequestParam(required = false) String id, @RequestParam(required = false) String rg) {

		ResponseEntity<?> resp = chemicalTest.getTestByBatchIdCLF05(id,rg);
		return resp;

	}
	
	// ------------------------------------------CL_F09--------------------------------
	
	@PostMapping("/CLF009/save/turbiditycreport")
	public ResponseEntity<?> saveCLF009(
			@Valid @RequestBody turbiditycalibrationreportCLF009  turbidity, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.saveChemicalTestCL09(turbidity, http);
		return resp;

	}
	
	
	@PostMapping("/CLF009/submit/turbiditycreport")
	public ResponseEntity<?> submitCLF009(
			@Valid @RequestBody turbiditycalibrationreportCLF009  turbidity, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.submitChemicalTestCLF09(turbidity, http);
		return resp;

	}
	
	@PostMapping("/CLF009/approval")
	public ResponseEntity<?> approveCLF009(
			@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.approveCLF09(approvalResponse, http);
		return resp;

	}
	
	@GetMapping("/CLF009/getAll")
	public ResponseEntity<?> getApproveListCLF009(HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.getallTestClF09(http);
		return resp;

	}
	
	@GetMapping("/CLF009/approveList")
	public ResponseEntity<?> getAllCLF009() {

		ResponseEntity<?> resp = chemicalTest.approveListClF09();
		return resp;

	}
	
	
	@GetMapping("/CLF009/getById/{id}")
	public ResponseEntity<?> getbyIdCLF009(@PathVariable Long id) {

		ResponseEntity<?> resp = chemicalTest.getTestByIdClF09(id);
		return resp;

	}
	
	@GetMapping("/CLF009/print")
	public ResponseEntity<?> printClF09(@RequestParam(required = false) String eq_no,@RequestParam(required = false) String year, @RequestParam(required = false) String month, @RequestParam(required = false) String date) {

		ResponseEntity<?> resp = chemicalTest.printClF09(eq_no,year,month,date);
		return resp;

	}
	
	@GetMapping("/CLF009")
	public ResponseEntity<?> byDateClF09(@RequestParam(required = false) String eq_no,
	    @RequestParam(required = false) String year, @RequestParam(required = false) String month, @RequestParam(required = false) String date) {

	    return chemicalTest.getTestByBatchClF09(eq_no,year, month, date);
	}
	
	

	//------------------------------------------------------------CL-F011---------------------------------------------------------------

	@PostMapping("/CLF011/save/spectrometerreport")
	public ResponseEntity<?> saveCLF011(
			@Valid @RequestBody spectrophotometerReportClF011 spectrometer, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.saveChemicalTestCLF011(spectrometer, http);
		return resp;

	}
	
	
	@PostMapping("/CLF011/submit/spectrometerreport")
	public ResponseEntity<?> submitCLF011(
			@Valid @RequestBody spectrophotometerReportClF011 spectrometer, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.submitChemicalTestCLF011(spectrometer, http);
		return resp;

	}
	
	@PutMapping("/CLF011/approval")
	public ResponseEntity<?> approveCLF011(
			@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.approveCLF011(approvalResponse, http);
		return resp;

	}
	
	@GetMapping("/CLF011/getAll")
	public ResponseEntity<?> getAllCLF011(HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.getallTestClF011(http);
		return resp;

	}
	
	@GetMapping("/CLF011/approveList")
	public ResponseEntity<?> getApproveListCLF011() {

		ResponseEntity<?> resp = chemicalTest.approvelistF011();
		return resp;

	}
	
	
	@GetMapping("/CLF011/getById/{id}")
	public ResponseEntity<?> getbyIdCLF011(@PathVariable Long id) {

		ResponseEntity<?> resp = chemicalTest.getTestByIdClF011(id);
		return resp;

	}
	
	@GetMapping("/CLF011/print")
	public ResponseEntity<?> printClF011(@RequestParam(required = false) String eq_no,@RequestParam(required = false)@PathVariable String year, @RequestParam(required = false) String month ,@RequestParam(required = false) String date) {

		ResponseEntity<?> resp = chemicalTest.printClF011(eq_no,year,month,date);
		return resp;

	}
	
	@GetMapping("/CLF011")
	public ResponseEntity<?> ClF011(@RequestParam(required = false) String eq_no,@RequestParam(required = false)@PathVariable String year, @RequestParam(required = false) String month ,@RequestParam(required = false) String date) {

		ResponseEntity<?> resp = chemicalTest.getTestByBatchClF011(eq_no,year,month,date);
		return resp;

	}

	//-----------------------------------------------CL-F013---------------------------------------------------------
	
	@PostMapping("/CLF013/save/fungalIncubator")
	public ResponseEntity<?> saveCLF013(
			@Valid @RequestBody fungalIncubatorReportCLF013 fungalIncubator, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.saveChemicalTestCLF013(fungalIncubator, http);
		return resp;

	}
	
	
	@PostMapping("/CLF013/submit/fungalIncubator")
	public ResponseEntity<?> submitCLF011(
			@Valid @RequestBody fungalIncubatorReportCLF013 fungalIncubator, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.submitChemicalTestCLF013(fungalIncubator, http);
		return resp;

	}
	
	@PutMapping("/CLF013/approval")
	public ResponseEntity<?> approveCLF013(
			@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.approveCLF013(approvalResponse, http);
		return resp;

	}
	
	@GetMapping("/CLF013/getAll")
	public ResponseEntity<?> getAllCLF013(HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.getallTestClF013(http);
		return resp;

	}
	
	@GetMapping("/CLF013/approveList")
	public ResponseEntity<?> getApproveListCLF013() {

		ResponseEntity<?> resp = chemicalTest.getapproveF013();
		return resp;

	}
	
	
	@GetMapping("/CLF013/getById/{id}")
	public ResponseEntity<?> getbyIdCLF013(@PathVariable Long id) {

		ResponseEntity<?> resp = chemicalTest.getTestByIdClF013(id);
		return resp;

	}
	
	@GetMapping("/CLF013/print")
	public ResponseEntity<?> printClF013(@RequestParam(required = false) String eq_no,@RequestParam(required = false)@PathVariable String year, @RequestParam(required = false) String month ,@RequestParam(required = false) String date) {

		ResponseEntity<?> resp = chemicalTest.printClF013(eq_no,year,month,date);
		return resp;

	}
	
	@GetMapping("/CLF013")
	public ResponseEntity<?> getClF013(@RequestParam(required = false) String eq_no,@RequestParam(required = false)@PathVariable String year, @RequestParam(required = false) String month ,@RequestParam(required = false) String date) {

		ResponseEntity<?> resp = chemicalTest.getTestByBatchClF013(eq_no,year,month,date);
		return resp;

	}
	//--------------------------------------------------------------------------------F024------------------------------------------------------------
	
	@PostMapping("/CLF024/save/disposalRecord")
	public ResponseEntity<?> saveCLF024(
			@Valid @RequestBody DisposalRecord disposalRecord, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.saveChemicalTestCLF024(disposalRecord, http);
		return resp;

	}
	
	
	@PostMapping("/CLF024/submit/disposalRecord")
	public ResponseEntity<?> submitCLF024(
			@Valid @RequestBody DisposalRecord disposalRecord, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.submitChemicalTestCLF024(disposalRecord, http);
		return resp;

	}
	
	@PutMapping("/CLF024/approval")
	public ResponseEntity<?> approveCLF024(
			@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.approveCLF024(approvalResponse, http);
		return resp;

	}
	
	@GetMapping("/CLF024/getAll")
	public ResponseEntity<?> getAllCLF024(HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.getallTestClF024(http);
		return resp;

	}
	
	@GetMapping("/CLF024/getById/{id}")
	public ResponseEntity<?> getbyIdCLF024(@PathVariable Long id) {

		ResponseEntity<?> resp = chemicalTest.getTestByIdClF024(id);
		return resp;

	}
	
	@GetMapping("/CLF024/print")
	public ResponseEntity<?> printClF024(@RequestParam(required = false) String year, @RequestParam(required = false) String month, @RequestParam(required = false) String date) {

		ResponseEntity<?> resp = chemicalTest.printClF024(year,month,date);
		return resp;

	}
	
	@GetMapping("/CLF024")
	public ResponseEntity<?> getClF024(@RequestParam(required = false) String year, @RequestParam(required = false) String month, @RequestParam(required = false) String date) {

		ResponseEntity<?> resp = chemicalTest.getTestByBatchClF024(year,month,date);
		return resp;

	}
	
	//------------------------------------------------------------CLF015-------------------------------------------------------------
	
	@PostMapping("/CLF015/save/VAC")
	public ResponseEntity<?> saveCLF015(
			@Valid @RequestBody validationAutoclave validation, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.saveChemicalTestCLF015(validation, http);
		return resp;

	}
	
	@PostMapping("/CLF015/submit/VAC")
	public ResponseEntity<?> submitCLF015(
			@Valid @RequestBody validationAutoclave validation, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.submitChemicalTestCLF015(validation, http);
		return resp;

	}
	
	@PutMapping("/CLF015/approval")
	public ResponseEntity<?> approveCLF015(
			@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.approveCLF015(approvalResponse, http);
		return resp;

	}
	
	@GetMapping("/CLF015/getAll")
	public ResponseEntity<?> getAllCLF015(HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.getallTestCLF015(http);
		return resp;

	}
	
	@GetMapping("/CLF015/getById/{id}")
	public ResponseEntity<?> getbyCLF015(@PathVariable Long id) {

		ResponseEntity<?> resp = chemicalTest.getTestByIdCLF015(id);
		return resp;

	}
	
	@GetMapping("/CLF015/print")
	public ResponseEntity<?> printCLF015(@RequestParam(required = false) String year, @RequestParam(required = false) String month, @RequestParam(required = false) String date ,@RequestParam(required = false) String eqid) {

		ResponseEntity<?> resp = chemicalTest.printCLF015(year,month,date,eqid);
		return resp;

	}
	
	@GetMapping("/CLF015")
	public ResponseEntity<?> geCLF015(@RequestParam(required = false) String year, @RequestParam(required = false) String month, @RequestParam(required = false) String date ,@RequestParam(required = false) String eqid) {

		ResponseEntity<?> resp = chemicalTest.getTestByBatchCLF015(year,month,date,eqid);
		return resp;

	}
	
	//--------------------------------------------------CL-F018---------------------------------------------------------
	
	@PostMapping("/CLF018/save/temp")
	public ResponseEntity<?> saveCLF018(
			@Valid @RequestBody temperatureRelativeF018 temperatureRelat, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.saveChemicalTestCLF018(temperatureRelat, http);
		return resp;

	}
	
	@PostMapping("/CLF018/submit/temp")
	public ResponseEntity<?> submitCLF015(
			@Valid @RequestBody temperatureRelativeF018 temperatureRelat, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.submitChemicalTestCLF018(temperatureRelat, http);
		return resp;

	}
	
	@PutMapping("/CLF018/approval")
	public ResponseEntity<?> approveCLF018(
			@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.approveCLF018(approvalResponse, http);
		return resp;

	}
	
	@GetMapping("/CLF018/getAll")
	public ResponseEntity<?> getAllCLF018(HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.getallTestCLF018(http);
		return resp;

	}
	
	@GetMapping("/CLF018/getById/{id}")
	public ResponseEntity<?> getbyCLF018(@PathVariable Long id) {

		ResponseEntity<?> resp = chemicalTest.getTestByIdCLF018(id);
		return resp;

	}
	
	@GetMapping("/CLF018/print")
	public ResponseEntity<?> printCLF018(@RequestParam(required = false) String eq_no,@RequestParam(required = false) String year, @RequestParam(required = false) String month, @RequestParam(required = false) String date) {

		ResponseEntity<?> resp = chemicalTest.printCLF018(eq_no,year,month,date);
		return resp;

	}
	
	@GetMapping("/CLF018")
	public ResponseEntity<?> geCLF018(@RequestParam(required = false) String eq_no,@RequestParam(required = false) String year, @RequestParam(required = false) String month, @RequestParam(required = false) String date) {

		ResponseEntity<?> resp = chemicalTest.getTestByBatchCLF018(eq_no,year,month,date);
		return resp;

	}
	
	//---------------------------------------------------------------CLF027-----------------------
	
	@PostMapping("/CLF027/save/temp")
	public ResponseEntity<?> saveCLF027(
			@Valid @RequestBody distillwaterconsumF27 distillwat, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.saveChemicalTestCLF027( distillwat, http);
		return resp;

	}
	
	@PostMapping("/CLF027/submit/temp")
	public ResponseEntity<?> submitCLF027(
			@Valid @RequestBody distillwaterconsumF27 distillwat, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.submitChemicalTestCLF027(distillwat, http);
		return resp;

	}
	
	@PutMapping("/CLF027/approval")
	public ResponseEntity<?> approveCLF027(
			@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.approveCLF027(approvalResponse, http);
		return resp;

	}
	
	@GetMapping("/CLF027/getAll")
	public ResponseEntity<?> getAllCLF027(HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.getallTestCLF027(http);
		return resp;

	}
	
	@GetMapping("/CLF027/getById/{id}")
	public ResponseEntity<?> getbyCLF027(@PathVariable Long id) {

		ResponseEntity<?> resp = chemicalTest.getTestByIdCLF027(id);
		return resp;

	}
	
	@GetMapping("/CLF027/print")
	public ResponseEntity<?> printCLF027(@RequestParam(required = false) String eq_no,@RequestParam(required = false) String year, @RequestParam(required = false) String month, @RequestParam(required = false) String date) {

		ResponseEntity<?> resp = chemicalTest.printCLF027(eq_no,year,month,date);
		return resp;

	}
	
	@GetMapping("/CLF027")
	public ResponseEntity<?> geCLF027(@RequestParam(required = false) String eq_no,@RequestParam(required = false) String year, @RequestParam(required = false) String month, @RequestParam(required = false) String date) {

		ResponseEntity<?> resp = chemicalTest.getTestByBatchCLF027(eq_no,year,month,date);
		return resp;

	}
	
	//-------------------------------------------------------------------------CLF020---------------------------------------------------------
	
	@PostMapping("/CLF020/save/micro")
	public ResponseEntity<?> saveCLF020(
			@Valid @RequestBody microbiologicalAnalyisisReportF20 microbipReportF20, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.saveChemicalTestCLF020( microbipReportF20, http);
		return resp;

	}
	
	@PostMapping("/CLF020/submit/micro")
	public ResponseEntity<?> submitCLF020(
			@Valid @RequestBody microbiologicalAnalyisisReportF20 microbipReportF20, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.submitChemicalTestCLF020(microbipReportF20, http);
		return resp;

	}
	
	@PutMapping("/CLF020/approval")
	public ResponseEntity<?> approveCLF020(
			@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.approveCLF020(approvalResponse, http);
		return resp;

	}
	
	@GetMapping("/CLF020/getAll")
	public ResponseEntity<?> getAllCLF020(HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.getallTestCLF020(http);
		return resp;

	}
	
	@GetMapping("/CLF020/getById/{id}")
	public ResponseEntity<?> getbyCLF020(@PathVariable Long id) {

		ResponseEntity<?> resp = chemicalTest.getTestByIdCLF020(id);
		return resp;

	}
	
	@GetMapping("/CLF020/print")
	public ResponseEntity<?> printCLF020(@RequestParam(required = false) String year, @RequestParam(required = false) String month, @RequestParam(required = false) String date) {

		ResponseEntity<?> resp = chemicalTest.printCLF020(year,month,date);
		return resp;

	}
	
	@GetMapping("/CLF020")
	public ResponseEntity<?> geCLF020(@RequestParam(required = false) String year, @RequestParam(required = false) String month, @RequestParam(required = false) String date) {

		ResponseEntity<?> resp = chemicalTest.getTestByBatchCLF020(year,month,date);
		return resp;

	}
	
	//-------------------------------------------------------------------------CLF022---------------------------------------------------------
	
	@PostMapping("/CLF022/save/media")
	public ResponseEntity<?> saveCLF022(
			@Valid @RequestBody mediaDisposalCLF022 mediaDis, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.saveCLF022( mediaDis, http);
		return resp;

	}
	
	@PostMapping("/CLF022/submit/media")
	public ResponseEntity<?> submitCLF022(
			@Valid @RequestBody mediaDisposalCLF022 mediaDis, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.submitCLF022(mediaDis, http);
		return resp;

	}
	
	@PutMapping("/CLF022/approval")
	public ResponseEntity<?> approveCLF022(
			@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.approveCLF022(approvalResponse, http);
		return resp;

	}
	
	@GetMapping("/CLF022/getAll")
	public ResponseEntity<?> getAllCLF022(HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.getallTestCLF022(http);
		return resp;

	}
	
	@GetMapping("/CLF022/getById/{id}")
	public ResponseEntity<?> getbyCLF022(@PathVariable Long id) {

		ResponseEntity<?> resp = chemicalTest.getTestByIdCLF022(id);
		return resp;

	}
	
	@GetMapping("/CLF022/print")
	public ResponseEntity<?> printCLF022(@RequestParam(required = false) String fromdate, @RequestParam(required = false) String toDate, @RequestParam(required = false) String date) {

		ResponseEntity<?> resp = chemicalTest.printCLF022(fromdate,toDate,date);
		return resp;

	}
	
	@GetMapping("/CLF022")
	public ResponseEntity<?> geCLF022(@RequestParam(required = false) String year, @RequestParam(required = false) String month, @RequestParam(required = false) String date) {

		ResponseEntity<?> resp = chemicalTest.getbyDateF022(year,month,date);
		return resp;

	}
	
	//-------------------------------------------------------CLF029---------------------------------------------------
	
	@PostMapping("/CLF029/save/requis")
	public ResponseEntity<?> saveCLF029(
			@Valid @RequestBody RequistionF029 requis, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.saveChemicalTestCLF029( requis, http);
		return resp;

	}
	
	@PostMapping("/CLF029/submit/requis")
	public ResponseEntity<?> submitCLF029(
			@Valid @RequestBody RequistionF029 requis, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.submitChemicalTestCLF029(requis, http);
		return resp;

	}
	
	@PutMapping("/CLF029/approval")
	public ResponseEntity<?> approveCLF029(
			@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.approveCLF029(approvalResponse, http);
		return resp;

	}
	
	@PutMapping("/CLF029/SEC/approval")
	public ResponseEntity<?> approveSECCLF029(
			@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = chemicalTest.approveCLF029_2(approvalResponse, http);
		return resp;

	}
	
	@GetMapping("/CLF029/getAll")
	public ResponseEntity<?> getAllCLF029(HttpServletRequest http , @RequestParam(required = false) String requis_num) {

		ResponseEntity<?> resp = chemicalTest.getallTestCLF029(http,requis_num);
		return resp;

	}
	
	@GetMapping("/CLF029/summary")
	public ResponseEntity<?> summaryCLF029(HttpServletRequest http ) {

		ResponseEntity<?> resp = chemicalTest.getallSummary(http);
		return resp;

	}
	
	@GetMapping("/CLF029/getById/{id}")
	public ResponseEntity<?> getbyCLF029(@PathVariable Long id) {

		ResponseEntity<?> resp = chemicalTest.getTestByIdCLF029(id);
		return resp;

	}
	
	@GetMapping("/CLF029/print")
	public ResponseEntity<?> printCLF029(@RequestParam(required = false) String requis_num) {

		ResponseEntity<?> resp = chemicalTest.printCLF029(requis_num);
		return resp;

	}
	
	@GetMapping("/CLF029")
	public ResponseEntity<?> geCLF029(@RequestParam(required = false) String requis_num) {

		ResponseEntity<?> resp = chemicalTest.getTestByBatchCLF029(requis_num);
		return resp;

	}
	
}
