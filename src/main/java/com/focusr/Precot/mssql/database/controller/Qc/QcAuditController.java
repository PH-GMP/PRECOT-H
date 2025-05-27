package com.focusr.Precot.mssql.database.controller.Qc;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.mssql.database.service.Qc.QcAuditService;
import com.focusr.Precot.util.Qc.QcAuditRequest;
import com.focusr.Precot.util.Qc.qc8Audit;

@RestController
@RequestMapping("/api/Qc/audit")
public class QcAuditController {


	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@Autowired
	private QcAuditService qcAuditService;

	@PostMapping("/getAuditSummary")
	public ResponseEntity<?> getAuditSummary(@RequestBody QcAuditRequest summeryrequest , HttpServletResponse res) {

		ResponseEntity<?> message = qcAuditService.getAuditSummary(summeryrequest , res);

		return message;
	}
	
//	@PostMapping("/getAudit02Summary")
//	public void getAudit02Summary(@RequestBody qc8Audit qc8Aud, HttpServletResponse response) throws SQLException, IOException, JSONException {
//
//		qcAuditService.downloadExcel(qc8Aud,response);
//
//		
//	}
//	
//	@PostMapping("/getAudit03Summary")
//	public void getAudit03Summary(@RequestBody qc8Audit qc8Aud, HttpServletResponse response) throws SQLException, IOException, JSONException {
//
//		qcAuditService.downloadExcel02(qc8Aud,response);
//
//		
//	}
//	
//	@PostMapping("/getAudit04Summary")
//	public void getAudit04Summary(@RequestBody qc8Audit qc8Aud, HttpServletResponse response) throws SQLException, IOException, JSONException {
//
//		qcAuditService.downloadExcel04(qc8Aud,response);
//
//		
//	}
//	
//	@PostMapping("/getAudit05Summary")
//	public void getAudit05Summary(@RequestBody qc8Audit qc8Aud, HttpServletResponse response) throws SQLException, IOException, JSONException {
//
//		qcAuditService.downloadExcel05(qc8Aud,response);
//
//		
//	}
//	
//	@PostMapping("/getAudit06Summary")
//	public void getAudit06Summary(@RequestBody qc8Audit qc8Aud, HttpServletResponse response) throws SQLException, IOException, JSONException {
//
//		qcAuditService.downloadExcel06(qc8Aud,response);
//
//		
//	}

}

