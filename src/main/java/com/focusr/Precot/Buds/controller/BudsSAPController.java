package com.focusr.Precot.Buds.controller;

import java.security.Principal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.Buds.service.BudsSAPService;
import com.focusr.Precot.Buds.service.BudsService;

@RestController
@RequestMapping("/api/buds/sap/Service")
public class BudsSAPController {

	@Autowired
	private BudsSAPService budsSAPService;
	
	@GetMapping("/orderLOV")
	public ResponseEntity<?> getOrderLov(Principal principal) {
		
		ResponseEntity<?> resp = budsSAPService.getOrderLOV();
		return resp;
	}
	
	@GetMapping("/orderInfo")
	public ResponseEntity<?> getBudsOrderInfo(Principal principal) {
		
		ResponseEntity<?> resp = budsSAPService.getBudsOrderInfo();
		return resp;
	}
	
	@GetMapping("/orderInfoDetails")
	public ResponseEntity<?> getBudsOrderInfoDetails(Principal principal) {
		
		ResponseEntity<?> resp = budsSAPService.getBudsOrderDetailsOrderInfo();
		return resp;
	}
	
	@GetMapping("/orderDetails")
	public ResponseEntity<?> getOrderDetailsbyOrder(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String orderNumber = requestParams.get("orderNumber");
		
		ResponseEntity<?> resp = budsSAPService.getOrderDetailsByOrder(orderNumber);
		return resp;
		
	}
	
	
	@GetMapping("/machineList")
	public ResponseEntity<?> getMachineList(Principal principal) {
		
		ResponseEntity<?> resp = budsSAPService.getMachineMaster();
		return resp;
	}
	
	@GetMapping("/productChangeDetails")
	public ResponseEntity<?> getProductChangebyOrder(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String orderNumber = requestParams.get("orderNumber");
		
		ResponseEntity<?> resp = budsSAPService.fetchproductChangeOverDetails(orderNumber);
		return resp;
		
	}
	
}
