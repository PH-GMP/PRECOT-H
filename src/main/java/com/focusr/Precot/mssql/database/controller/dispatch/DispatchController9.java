package com.focusr.Precot.mssql.database.controller.dispatch;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.model.Store.ReceptionCheckListF003;
import com.focusr.Precot.mssql.database.model.dispatch.FinishedGoodsStockRegisterF001;
import com.focusr.Precot.mssql.database.service.Store.StoreService9;
import com.focusr.Precot.mssql.database.service.dispatch.DispatchService9;
import com.focusr.Precot.payload.StoreAuditRequest;

@RestController
@RequestMapping("/api/Dispatch")
public class DispatchController9 {

	@Autowired 
	private DispatchService9 DispatchService;
	
	
	@GetMapping("/getProductname")
	public ResponseEntity<?> getProductname() {

		ResponseEntity<?> responseList = DispatchService.getProductName();
		return responseList;
	}
	
	@GetMapping("/getCustomerName")
	public ResponseEntity<?> getCustomer() {

		ResponseEntity<?> responseList = DispatchService.getCustomer();
		return responseList;
	}
	
	@GetMapping("/fetchProductCode")
	public ResponseEntity<?> fetchProductCode() {

		ResponseEntity<?> responseList = DispatchService.fetchProductCode();
		return responseList;
	}
	
	
	@GetMapping("/getcustomer")
	public ResponseEntity<?> getCustomer(@RequestParam Map<String, String> requestParams) {

		String customer = requestParams.get("Productname");

		ResponseEntity<?> responseList = DispatchService.getCustomer(customer);
		return responseList;
	}
	
	
	@GetMapping("/filter")
    public ResponseEntity<?> getFilteredData(
            @RequestParam(required = false) String productName,
            @RequestParam(required = false) String customer,
            @RequestParam(required = false) String material) {
		
//		productName = productName != null ? productName : "";
//	    customer = customer != null ? customer : "";
//	    material = material != null ? material : "";
		
        ResponseEntity<?> filteredData = DispatchService.getFilteredData1(productName, customer, material);
        return filteredData;
    }
	
	@GetMapping("/filters")
    public ResponseEntity<?> getFilteredData(@RequestParam Map<String, String> requestParams) {
		
		String productname = requestParams.get("Productname");
		String customer = requestParams.get("customer");
		String material = requestParams.get("material");
		
        ResponseEntity<?> filteredData = DispatchService.getFilteredData1(productname, customer, material);
        return filteredData;
    } 
	
	// 18-02-2025 ENHANCEMENT
	
	@GetMapping("/fetchAllDetails")
    public ResponseEntity<?> fetchAllDetails(@RequestParam Map<String, String> requestParams) {
		
		String productname = requestParams.get("Productname");
		String customer = requestParams.get("customer");
		String material = requestParams.get("material");
		
        ResponseEntity<?> filteredData = DispatchService.fetchAllDetails(productname, customer, material);
        return filteredData;
    }
	
	
	@GetMapping("/getProductcode")
	public ResponseEntity<?> getmaterial(@RequestParam Map<String, String> requestParams) {

		String material = requestParams.get("Productname");

		ResponseEntity<?> responseList = DispatchService.getmaterial(material);
		return responseList;
	}
	
	
	@PostMapping("/FinishedGoodsStock/Save")
	public ResponseEntity<?> saveReceptionChecklist(HttpServletRequest http,
			@Valid @RequestBody FinishedGoodsStockRegisterF001 SaveFinishedGoodsStock, BindingResult result,
			Principal principal) {

		ResponseEntity<?> response = DispatchService.SaveFinishedGoodsStock(SaveFinishedGoodsStock, http);
		return response;

	}
	
	@PostMapping("/FinishedGoodsStock/Submit")
	public ResponseEntity<?> submitHandSanitization(HttpServletRequest http,
			@Valid @RequestBody FinishedGoodsStockRegisterF001 SubmitFinishedGoodsStock, BindingResult result,
			Principal principal) {

		ResponseEntity<?> response = DispatchService.SubmitFinishedGoodsStock(SubmitFinishedGoodsStock, http);
		return response;

		
	}
	
	 @GetMapping("/getFinishedGoodsStockSummary")
		public ResponseEntity<?> getFinishedGoodsStockSummary() {
			
			ResponseEntity<?> resp = DispatchService.getFinishedGoodsStockSummary();
			return resp;
		}

	 @GetMapping("/GetPrintFinishedGoodsPrint")
	 public ResponseEntity<?> getprintFinishedGoodsStock(@RequestParam Map<String, String> requestParams, Principal principal) {
	     String fromDate = requestParams.get("fromDate");
	     String toDate = requestParams.get("toDate");

	     // Validate and parse year and month
	     Integer year = (requestParams.containsKey("year") && !requestParams.get("year").isEmpty()) ? Integer.parseInt(requestParams.get("year")) : null;
	     Integer month = (requestParams.containsKey("month") && !requestParams.get("month").isEmpty()) ? Integer.parseInt(requestParams.get("month")) : null;

	     String productCode = requestParams.get("productCode");
	     String productName = requestParams.get("productName");
	     String customerName = requestParams.get("customerName");

	     ResponseEntity<?> resp = DispatchService.getprintFinishedGoodsStock(fromDate, toDate, year, month, productCode, productName, customerName);
	     return resp;
	 }


	 
	 @GetMapping("/finishedgoods/{id}")
	    public ResponseEntity<FinishedGoodsStockRegisterF001> getFinishedGoodsById(@PathVariable Long id) {
	        FinishedGoodsStockRegisterF001 finishedGoods = DispatchService.getFinishedGoodsById(id);
	        return ResponseEntity.ok(finishedGoods);
	    }
	 
	 
//	 @GetMapping("/closingstock")
//	    public Integer getClosingStock(
//	            @RequestParam("product") String product,
//	            @RequestParam("productName") String productName,
//	            @RequestParam("customer") String customer) {
//	        return DispatchService.getClosingStock(product, productName, customer);
//	    }
	 
	 @GetMapping("/closingstock")
	 public List<Integer> getClosingStock(
	         @RequestParam("product") String product,
	         @RequestParam("productName") String productName,
	         @RequestParam("customer") String customer) {
	     return DispatchService.getClosingStock(product, productName, customer);
	 }

	 @GetMapping("/fetchreceivedname")
		public ResponseEntity<?> getHandSanitation(@RequestParam Map<String, String> requestParams, Principal principal) {
			ResponseEntity<?> resp = DispatchService.getHandSanitationByDepartment();
			return resp;
		}
	 
}

