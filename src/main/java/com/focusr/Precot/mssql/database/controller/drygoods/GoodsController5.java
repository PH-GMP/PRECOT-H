package com.focusr.Precot.mssql.database.controller.drygoods;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.focusr.Precot.mssql.database.model.drygoods.GoodsHandSanitationF06;
import com.focusr.Precot.mssql.database.model.drygoods.GoodsProductChangeOverF09;
import com.focusr.Precot.mssql.database.repository.drygoods.GoodsProductChangeRepositoryF09;
import com.focusr.Precot.mssql.database.service.drygoods.GoodsService5;
import com.focusr.Precot.payload.ApproveResponse;

/*
 * HAND SANITATION
 */

@RestController
@RequestMapping("/api/goods")
public class GoodsController5 {

	@Autowired
	private GoodsService5 goodsService5;
	
	@Autowired
	private GoodsProductChangeRepositoryF09 productChangeOverRepositoryF09;
	
	// HAND SANITATION LIST - F013
	
		@PostMapping("/saveHandSanitationF013")
		public ResponseEntity<?> saveHandSanitationList(@Valid @RequestBody GoodsHandSanitationF06 handSanitationF06, HttpServletRequest http) {
			
			ResponseEntity<?> resp = goodsService5.saveHandSanitation(handSanitationF06, http);
			return resp;
			
		}
		
		
		@PostMapping("/submitHandSanitationF013")
		public ResponseEntity<?> submitHandSanitationList(@Valid @RequestBody GoodsHandSanitationF06 handSanitationF06, HttpServletRequest http) {
			
			ResponseEntity<?> resp = goodsService5.submitHandSanitationReport(handSanitationF06, http);
			return resp;
			
		}
		
		@GetMapping("/getHandSanitationF013")
		public ResponseEntity<?> getHandSanitationByParams(@RequestParam Map<String, String> requestParams,
				Principal principal) {
			
			String date = requestParams.get("date");
			String shift = requestParams.get("shift");
			
			ResponseEntity<?> resp = goodsService5.getHandSanitationByDateShift(date, shift);
			return resp;
		}
		
		
		@GetMapping("/getHandSanitationSummaryF013")
		public ResponseEntity<?> getHandSanitationSummarry() {
			
			ResponseEntity<?> resp = goodsService5.getHandSanitationSummary();
			return resp;
		}
		
		@PutMapping("/approveHandSanitationF013")
		public ResponseEntity<?> approveOrRejectHandSanitation(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
			
			ResponseEntity<?> resp = goodsService5.approveOrRejectHandSanitation(approvalResponse, http);
			return resp;
			
		}
		
		@GetMapping("/getHandSanitationPrintF013")
		public ResponseEntity<?> getHandSanitationByPrintParams(@RequestParam Map<String, String> requestParams,
				Principal principal) {
			
			String date = requestParams.get("date");
			String shift = requestParams.get("shift");
			
			ResponseEntity<?> resp = goodsService5.handSanitationPrint(date, shift);
			return resp;
		}
	
		// PRODUCT CHANGE OVER - F09
		
		@PostMapping("/saveProductChangeOverF09")
		public ResponseEntity<?> saveProductChangeOver(
				@Valid @RequestBody GoodsProductChangeOverF09 productChangeOver, HttpServletRequest http) {

			ResponseEntity<?> resp = goodsService5.saveProductChangeOver(productChangeOver, http);
			return resp;
		}

		@PostMapping("/submitProductChangeOverF09")
		public ResponseEntity<?> submitProductChangeOver(
				@Valid @RequestBody GoodsProductChangeOverF09 productChangeOver, HttpServletRequest http) {

			ResponseEntity<?> resp = goodsService5.submitProductChangeOver(productChangeOver, http);
			return resp;
		}

		@GetMapping("/summaryproductChangeOverF09")
		public ResponseEntity<?> getSummary() {
			ResponseEntity<?> resp = goodsService5.getSummaryRoles();
			return resp;
		}

		@GetMapping("/getproductChangeOverF09")
		public ResponseEntity<?> getProductChangeDetails(@RequestParam Map<String, String> requestParams,
				Principal principal) {

			String date = requestParams.get("date");
			String shift = requestParams.get("shift");
			String machine = requestParams.get("machine");

			ResponseEntity<?> resp = goodsService5.getProductDetailsbyUniquefIELD(date, shift, machine);
			return resp;
		}
		
		
		@GetMapping("/getproductChangeOverUniqueF09")
		public ResponseEntity<?> getProductChangeDetailsBynewuNIQue(@RequestParam Map<String, String> requestParams,
				Principal principal) {

			String date = requestParams.get("date");
			String order = requestParams.get("order");
			String machine = requestParams.get("machine");

			ResponseEntity<?> resp = goodsService5.getProductDetailsbyUniqueOrder(date, order, machine);
			return resp;
		}
		

		@PutMapping("/approveProductChangeOverF09")
		public ResponseEntity<?> approveOrRejectProductChangeOver(@Valid @RequestBody ApproveResponse approvalResponse,
				HttpServletRequest http) {

			ResponseEntity<?> resp = goodsService5.approveRejectProductChangeOver(approvalResponse, http);
			return resp;

		}

		@GetMapping("/getproductChangeOverPrintF09")
		public ResponseEntity<?> getProductChangeDetailsPrint(@RequestParam Map<String, String> requestParams,
				Principal principal) {

			String date = requestParams.get("date");
			String machine = requestParams.get("machine");

			ResponseEntity<?> resp = goodsService5.fetchPunchingPrintParameters(date, machine);
			return resp;
		}
		
	//--------------------------------------PDE-----------------------------------------------------------------------------------------------//
		  @GetMapping("/getLogBookMechineNoLov")
		  public ResponseEntity<List<String>> getProductChangeMechineNoLov() {
		      List<String> records = productChangeOverRepositoryF09.mechineLov();
		      return ResponseEntity.ok(records);
		  }
		  
		@GetMapping("/machinedetailsF009")
		public ResponseEntity<?> getMachineBasedDetails(
			@RequestParam("date") String date,
			@RequestParam("shift") String shift,
			@RequestParam("machine_name") String machine_name) {
			ResponseEntity<?> resp = goodsService5.fetchMachineBasedDetails(date, shift, machine_name);
			return resp;

		}
		
		  @GetMapping("/getDrygoodsProductChangeOrderNoLov")
		  public ResponseEntity<List<String>> getProductChangeOrderNoLov() {
		      List<String> records = productChangeOverRepositoryF09.productOrderLov();
		      return ResponseEntity.ok(records);
		  }
		  
		  @GetMapping("/getDrygoodsProductChangeOrderDetails")
		  public ResponseEntity<?> getProductChangeOrderDetails(
				  @RequestParam("orderNo") String orderNo) {
			  ResponseEntity<?> resp = goodsService5.fetchProductChangeOverDetails(orderNo);
				return resp;
		  }
		  
		  //----------------------------------MiniRollPDE------------------------------------------------------------------------------//
		//Mini Roll
			
			@GetMapping("/api/dryGoodsMiniROll1")
			public ResponseEntity<?> getDryGoodsMiniRoll(@RequestParam String date,
					@RequestParam String shift , @RequestParam String oderno) {

				try {

					return goodsService5.getMiniRoll(date, shift , oderno);

				} catch (Exception e) {
					// TODO: handle exception
					e.printStackTrace(); // You can replace this with a proper logging statement

					Map<String, Object> errorMap = new HashMap<>();
					errorMap.put("error", "Unable to retrieve LogBookBagMakingStoppage details");
					errorMap.put("message", e.getMessage());

					List<Map<String, Object>> errorList = new ArrayList<>();
					errorList.add(errorMap);
					
					return new ResponseEntity<>(errorList, HttpStatus.OK);

				}
			}
			
			@GetMapping("/api/dryGoodsOderNo")
			public ResponseEntity<?> getOrderNo(@RequestParam String date,
					@RequestParam String shift) {

				try {

					return goodsService5.getOder(date, shift);

				} catch (Exception e) {
					// TODO: handle exception
					e.printStackTrace(); // You can replace this with a proper logging statement

					Map<String, Object> errorMap = new HashMap<>();
					errorMap.put("error", "Unable to retrieve LogBookBagMakingStoppage details");
					errorMap.put("message", e.getMessage());

					List<Map<String, Object>> errorList = new ArrayList<>();
					errorList.add(errorMap);
					
					return new ResponseEntity<>(errorList, HttpStatus.OK);

				}
			}
			
			
			
			@GetMapping("/api/dryGoodsMiniROllStoppage")
			public List<Map<String, Object>> getDryGoodsMiniRollStoppage(@RequestParam String date,
					@RequestParam String shift,@RequestParam String order_no) {

				try {

					return goodsService5.getMiniRollStoppage(date, shift,order_no);

				} catch (Exception e) {
					// TODO: handle exception
					e.printStackTrace(); // You can replace this with a proper logging statement

					Map<String, Object> errorMap = new HashMap<>();
					errorMap.put("error", "Unable to retrieve LogBookBagMakingStoppage details");
					errorMap.put("message", e.getMessage());

					List<Map<String, Object>> errorList = new ArrayList<>();
					errorList.add(errorMap);
					return errorList;

				}
			}
	//	-------------------------Sliver F002 PDE------------------------------------------------------------------------------------------------------	
			//Sliver
			
			@GetMapping("/getSliver")
			public ResponseEntity<?> getSliverPde(){
				
				ResponseEntity<?> responseList = goodsService5.getSliver();
				return responseList;
				
			}	
			
			
			
			@GetMapping("/api/sliverStoppage")
			public List<Map<String, Object>> getSliverStoppage(@RequestParam String date,
					@RequestParam String shift,@RequestParam String machine_name) {
		 
				try {
		 
					return goodsService5.getSliverStoppage(date, shift,machine_name);
		 
				} catch (Exception e) {
					// TODO: handle exception
					e.printStackTrace(); // You can replace this with a proper logging statement
		 
					Map<String, Object> errorMap = new HashMap<>();
					errorMap.put("error", "Unable to retrieve LogBookBagMakingStoppage details");
					errorMap.put("message", e.getMessage());
		 
					List<Map<String, Object>> errorList = new ArrayList<>();
					errorList.add(errorMap);
					return errorList;
		 
				}
			}
			
}
