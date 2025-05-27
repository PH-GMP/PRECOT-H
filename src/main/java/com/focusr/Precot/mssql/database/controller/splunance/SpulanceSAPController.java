package com.focusr.Precot.mssql.database.controller.splunance;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.repository.bleaching.DepartmentRepository;
import com.focusr.Precot.mssql.database.service.splunance.SpulanceSAPService;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.spulance.GeminiF08Approach2;
import com.focusr.Precot.payload.spulance.GeminiSplF08Response;
import com.focusr.Precot.payload.spulance.SplF08StoppageResponse;
import com.focusr.Precot.payload.spulance.SpulanceOrderResponse;
import com.focusr.Precot.payload.spulance.StoppageReportResponse;

/**
 * Spulance SAP Data
 * 
 * @author Jawahar.MR
 *
 */

@RestController
@RequestMapping("/api/spulance")
public class SpulanceSAPController {

	@Autowired
	private SpulanceSAPService spulanceService;

	@Autowired
	private DepartmentRepository departmentrepository;

	@GetMapping("/orders")
	public ResponseEntity<?> fetchSpulanceOrders() {

		ResponseEntity<?> resp = spulanceService.fetchSpulanceOrders();
		return resp;
	}
	
	@GetMapping("/ordersRbBale")
	public ResponseEntity<?> getSpulanceOrderbyDate(@RequestParam Map<String, String> requestParams, Principal principal) {
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		ResponseEntity<?> resp = spulanceService.getSpulanceOrderbyDate(date, shift);
		return resp;
	}
	
	

	@GetMapping("/orderDetails")
	public ResponseEntity<?> fetchSpulanceOrderDetails(@RequestParam Map<String, String> requestParams) {

		String order = requestParams.get("order");

		ResponseEntity<?> resp = spulanceService.getHeaderDetailsByOrder(order);
		return resp;
	}

	@GetMapping("/orderByDate")
	public ResponseEntity<?> fetchSpulanceOrderbyDate(@RequestParam Map<String, String> requestParams, Principal principal) {
		
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		
		ResponseEntity<?> resp = spulanceService.fetchSpulanceOrdersByDate(date, shift);
		return resp;
	}
	
		// GOODS BY ORDER AND DATE
	
	@GetMapping("/orderGoodsByDate")
	public ResponseEntity<?> fetchSpulanceGoodsOrderbyDate(@RequestParam Map<String, String> requestParams, Principal principal) {
		
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		
		ResponseEntity<?> resp = spulanceService.fetchSpulanceGoodsOrdersByDate(date, shift);
		return resp;
	}
	
	
	@GetMapping("/orderDetailsByDate")
	public ResponseEntity<?> fetchSpulanceProcessSetupOrdersbyDate(@RequestParam Map<String, String> requestParams, Principal principal) {
		
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		
		ResponseEntity<?> resp = spulanceService.fetchSpulanceOrdersByDate(date, shift);
		return resp;
	}
	
	@GetMapping("/baleByOrderdateshift")
	public ResponseEntity<?> fetchBaleByOrder(@RequestParam Map<String, String> requestParams) {

		String order = requestParams.get("order");
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");

		ResponseEntity<?> resp = spulanceService.fetchBaleByOrder(order, date, shift);
		return resp;
	}

	@GetMapping("/splBaleByOrder")
	public ResponseEntity<?> fetchBaleByBale(@RequestParam Map<String, String> requestParams) {

		String order = requestParams.get("order");

		ResponseEntity<?> resp = spulanceService.fetchSplBaleByOrder(order);
		return resp;
	}

	@GetMapping("/splProduction")
	public ResponseEntity<?> fetchProduction(@RequestParam Map<String, String> requestParams) {

		String order = requestParams.get("order");
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");

		ResponseEntity<?> resp = spulanceService.fetchProductionDetailsSpl(order, date, shift);
		return resp;
	}

	@GetMapping("/splRejection")
	public ResponseEntity<?> fetchRejection(@RequestParam Map<String, String> requestParams) {
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		String order = requestParams.get("order");

		ResponseEntity<?> resp = spulanceService.fetchRejectionDetailsSpl(date, shift, order);
		return resp;
	}

	@GetMapping("/splStoppage")
	public ResponseEntity<?> fetchStoppage(@RequestParam Map<String, String> requestParams) {
		String date = requestParams.get("date");

		ResponseEntity<?> resp = spulanceService.fetchStoppageDetails(date);
		return resp;
	}

//	@GetMapping("/splnetweight")
//    public ResponseEntity<?> getMaxNetWeightOrder(@RequestParam String date) {
//        List<SpulanceOrderResponse> resp = spulanceService.getMaxNetWeightOrder(date);
//        return ResponseEntity.ok(resp);
//    }

//	@GetMapping("/splWeight")
//	public ResponseEntity<?> getWeightSpl(@RequestParam Map<String, String> requestParams) {
//		String date = requestParams.get("date");
//		
//		ResponseEntity<?> resp = spulanceService.fetchSplWeight(date);
//		return resp;
//	}

	@GetMapping("/splResponse1")
	public ResponseEntity<?> getSplResponse1(@RequestParam Map<String, String> requestParams) {
		String date = requestParams.get("date");

		ResponseEntity<?> resp = spulanceService.fetchStoppage1Response1(date);
		return resp;
	}
	
	
	
	@GetMapping("/splResponseJ")
	public ResponseEntity<?> getSplResponse1J(@RequestParam Map<String, String> requestParams) {
		String date = requestParams.get("date");

		ResponseEntity<?> resp = spulanceService.fetchStoppageReports(date);
		return resp;
	}
	

	
	@GetMapping("/getStoppageOrders")
	public StoppageReportResponse getStoppageOrders(@RequestParam Map<String, String> requestParams) {
		
		String date = requestParams.get("date");
		StoppageReportResponse resp = spulanceService.getStoppageReport1(date);
		return resp;
	}
	
	
	@GetMapping("/gemini")
	public List<GeminiSplF08Response> getGeminiStoppage(@RequestParam Map<String, String> requestParams) {
		
		String date = requestParams.get("date");
		
		List<GeminiSplF08Response> list = spulanceService.geminiApproach(date);
		return list;
	}
	
	@GetMapping("/gemini2")
	public List<GeminiF08Approach2> getGeminiStoppage1(@RequestParam Map<String, String> requestParams) {
		
		String date = requestParams.get("date");
		
		List<GeminiF08Approach2> list = spulanceService.getProductionData(date);
		return list;
	}
	
	
	
	
	
	
//	@GetMapping("/getStoppageOrders")
//	public Map<String, Object> getStoppageOrders(@RequestParam Map<String, String> requestParams) {
//		
//		String date = requestParams.get("date");
//		Map<String, Object> resp =  spulanceService.approach2StoppageData(date);
//		return resp;
//	}
	
	
	@GetMapping("/sampleReportOrders")
	public ResponseEntity<?> fetchSampleReportOrders() {

		ResponseEntity<?> resp = spulanceService.fetchSampleReportOrders();
		return resp;
	}

	@GetMapping("/splSampleOrders")
	public ResponseEntity<?> fetchSampleReports(@RequestParam Map<String, String> requestParams) {
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		String order = requestParams.get("order");

		ResponseEntity<?> resp = spulanceService.fetchSampleReportOrders(date, shift, order);
		return resp;
	}

	// F13
	@GetMapping("/processSetupOrders")
	public ResponseEntity<?> processSetupOrders() {

		ResponseEntity<?> resp = spulanceService.processSetupWinder();
		return resp;
	}
	
	
	@GetMapping("/processSetupOrdersByDate")
	public ResponseEntity<?> processSetupWinderByDate(@RequestParam Map<String, String> requestParams, Principal principal) {
		
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		ResponseEntity<?> resp = spulanceService.processSetupWinderByDate(date, shift);
		return resp;
		
	}

	// F14
	@GetMapping("/baleWeight")
	public ResponseEntity<?> fetchBaleWeightByDateOrderShift(@RequestParam Map<String, String> requestParams) {
		String order = requestParams.get("order");
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		ResponseEntity<?> resp = spulanceService.fetchBaleWeightByOrderDateShift(order, date, shift);
		return resp;
	}

	// F17 &F16
	@GetMapping("/silterWinderProductionDetails")
	public ResponseEntity<?> getDailySliterWinderProductionByOrderNo(@RequestParam Map<String, String> requestParams) {
		String order = requestParams.get("order");
		ResponseEntity<?> resp = spulanceService.getDailySliterWinderProductionByOrder(order);
		return resp;
	}

	// F17
	@GetMapping("/roleGoodDetails")
	public ResponseEntity<?> getRolegoodDetails(@RequestParam Map<String, String> requestParams) {
		String order = requestParams.get("order");
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		ResponseEntity<?> resp = spulanceService.getRoleGoodsInfo(order, date, shift);
		return resp;
	}

	// f15
	@GetMapping("/aggregatedResults")
	public ResponseEntity<?> getAggregatedResults(@RequestParam Map<String, String> requestParams) {
		String date = requestParams.get("date");
		ResponseEntity<?> resp = spulanceService.getAggregatedResults(date);
		return resp;
	}

	// F11

	@GetMapping("/mixingChangeOverDetails")
	public ResponseEntity<?> getOrderDetails(@RequestParam("fromOrderNo") String fromOrderNo,
			@RequestParam("toOrderNo") String toOrderNo, @RequestParam("baleNo") String baleNo) {
		return spulanceService.getOrderDetails(fromOrderNo, toOrderNo, baleNo);
	}

	// get baleno lov by orderno

	@GetMapping("/getBaleLovByOrderNo")
	public ResponseEntity<?> getBaleNoLOV(@RequestParam("order") String order) {
		return spulanceService.getBaleLov(order);
	}

	// F18
	@GetMapping("/sliterwinderStoppageReport")
	public ResponseEntity<?> getStoppageDetails(@RequestParam("date") String date) {
		return spulanceService.getStoppageDetailsF18(date);
	}

	// k
	@GetMapping("/OrderLovsliterwinder")
	public ResponseEntity<?> getOrderLov() {
		try {

			List<String> orderLov = departmentrepository.getOrderNoLovSliderWinder();

			return new ResponseEntity<>(orderLov, HttpStatus.OK);
		} catch (Exception ex) {

			String msg = ex.getMessage();
			return new ResponseEntity<>(new ApiResponse(false, "Failed to get Order Lov: " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}
	
		// SLITER WINDER PRODUCTION - F18
	
	@GetMapping("/sliterWinderOrderByDate")
	public ResponseEntity<?> sliterWinderOrderByDate(@RequestParam Map<String, String> requestParams) {
		
		String date = requestParams.get("date");
		String shift = requestParams.get("shift");
		
		ResponseEntity<?> resp = spulanceService.processSliterWinderByDate(date, shift);
		return resp;
	}
	
	
	@GetMapping("/StoppageOrdersRpBalef11")
	public ResponseEntity<?> getOrderStoppageF11(@RequestParam("order") String order) {
		
		ResponseEntity<?> resp = spulanceService.getOrderStoppageF11(order);
		return resp;
	}
	

	// GET ORDER

	@GetMapping("/stoppageOrdersRoolGoodsF09")
	public ResponseEntity<?> getOrderStoppageF09(@RequestParam("order") String order) {

		ResponseEntity<?> resp = spulanceService.getOrderStoppageF09(order);
		return resp;

	}

	// productReconciliation
	@GetMapping("/productReconciliationRoolGoogsF08")
	public ResponseEntity<?> getproductReconciliationBMR(@RequestParam("order") String order) {
		return spulanceService.getProductReconciliation(order);
	}
}
