package com.focusr.Precot.mssql.database.controller.bleaching;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.mssql.database.service.bleaching.Dashboard2;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

//	@Autowired
//	private DashboardService dashboardService;

	@Autowired
	private Dashboard2 dashboard;

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@GetMapping("/dahsboardNewApproach")
	public ResponseEntity<?> dahsboardNewApproach(HttpServletRequest http) {

		ResponseEntity<?> response = dashboard.dashboard2(http);

		return response;

	}

	@GetMapping("/dahsboardBmr")
	public ResponseEntity<?> dahsboardBmr(HttpServletRequest http) {

		ResponseEntity<?> response = dashboard.dahsboardBmr(http);

		return response;

	}

}
