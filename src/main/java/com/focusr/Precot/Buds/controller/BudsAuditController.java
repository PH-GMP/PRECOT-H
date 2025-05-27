package com.focusr.Precot.Buds.controller;

import java.io.IOException;
import java.security.Principal; 
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.Buds.Payload.BudsAuditRequest;
import com.focusr.Precot.Buds.model.audit.BudsDailyProductionSliverHeaderHistory;
import com.focusr.Precot.Buds.model.audit.BudsEquipmentUsuageHeaderHistory;
import com.focusr.Precot.Buds.model.audit.BudsLogbookHeaderHistory;
import com.focusr.Precot.Buds.model.audit.BudsProductChangeOverHistory;
import com.focusr.Precot.Buds.repository.BudsDailyProductionSliverHeaderHistoryRepository;
import com.focusr.Precot.Buds.repository.BudsEquipmentUsuageHeaderRepositoryHistory;
import com.focusr.Precot.Buds.repository.BudsLogbookHeaderRepositoryHistory;
import com.focusr.Precot.Buds.repository.BudsProductChangeOverRepositoryHistory;
import com.focusr.Precot.Buds.util.AppConstantsBuds;
import com.focusr.Precot.Buds.util.BudsAuditGenerationService;
import com.focusr.Precot.QA.model.audit.FinalInspectionReportHistoryF037;
import com.focusr.Precot.QA.payload.QaAuditRequest;
import com.focusr.Precot.QA.repository.audit.FinalInspectionReportHistoryRepository;
import com.focusr.Precot.mssql.database.model.drygoods.audit.LogBookHeaderHistory;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.spulance.SpunlaceAuditRequest;

@RestController
@RequestMapping("/api/buds/audit")
public class BudsAuditController {

//	@Autowired
//	private BudsAuditService auditService;
	
	@Autowired
	private BudsAuditGenerationService excelGenerationService;
	
		// REPOSITORY
	
	@Autowired
	private BudsLogbookHeaderRepositoryHistory budsLogbookHeaderRepositoryHistory;
	
	@Autowired
	private BudsEquipmentUsuageHeaderRepositoryHistory budsEquipmentUsuageHeaderRepositoryHistory;
	
	@Autowired
	private BudsDailyProductionSliverHeaderHistoryRepository budsDailyProductionSliverHeaderHistoryRepository;
	
	@Autowired
	private BudsProductChangeOverRepositoryHistory budsProductChangeOverRepositoryHistory;
	
	@Autowired
	private FinalInspectionReportHistoryRepository inspectionRepositoryHistory;
	
	
//	@PostMapping("/generateExcel")
//	public ResponseEntity<?> generateAuditReport(@Valid @RequestBody BudsAuditRequest auditRequest, Principal principal) {
//		
//		ResponseEntity<?> resp = auditService.getAuditSummary(auditRequest);
//		return resp;
//	}
	
		// EXCEL FIELDS
	
	@PostMapping("/download")
	public ResponseEntity<?> downloadExcel(@RequestBody BudsAuditRequest summeryrequest, HttpServletResponse response)
			throws IOException {

		// Get the appropriate repository and entity class dynamically based on the
		// entityName
		Class<?> entityClass = getEntityClass(summeryrequest.getFormName());
		JpaRepository<?, ?> repository = getRepository(summeryrequest.getFormName());

		// Fetch the filtered entities by date range
		List<?> entities = fetchEntitiesByDateRange(summeryrequest, repository);
		
		// Check if entities list is empty
	    if (entities == null || entities.isEmpty()) {
	    	return new ResponseEntity(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
	    }

		// Call the generic Excel generator with the dynamic entity class and list of
		// entities
		return excelGenerationService.generateExcel(response, entities, entityClass, summeryrequest.getFormName());
	}
	
	private Class<?> getEntityClass(String entityName) {
		
		switch (entityName.toLowerCase()) {
		
		case "buds_logbook" :
			return BudsLogbookHeaderHistory.class;
			
		case "buds_equipment_usage" :
			return BudsEquipmentUsuageHeaderHistory.class;
		
		case "buds_daily_production_sliver" : 
			return BudsDailyProductionSliverHeaderHistory.class;
			
		case "buds_product_changeover" : 
			return BudsProductChangeOverHistory.class;
			
		case "inspection" :
			return FinalInspectionReportHistoryF037.class;
			
		default:
			throw new IllegalArgumentException("Entity not found: " + entityName);
		
		}
		
	}
	
	
	private JpaRepository<?, ?> getRepository(String entityName) {
		
		switch (entityName.toLowerCase()) {
		
		case "buds_logbook" : 
			return budsLogbookHeaderRepositoryHistory;
		
		case "buds_equipment_usage" :
			return budsEquipmentUsuageHeaderRepositoryHistory;
		
		case "buds_daily_production_sliver" : 
			return budsDailyProductionSliverHeaderHistoryRepository;
			
		case "buds_product_changeover" : 
			return budsProductChangeOverRepositoryHistory;
			
		case "inspection" : 
			
			return inspectionRepositoryHistory;
			
		default:
			throw new IllegalArgumentException("Repository not found for entity: " + entityName);
			
		}
		
	}
	
	
	private List<?> fetchEntitiesByDateRange(BudsAuditRequest summeryrequest, JpaRepository<?, ?> repository) {
		
		if("buds_logbook".equalsIgnoreCase(summeryrequest.getFormName())) {
			
			return ( (BudsLogbookHeaderRepositoryHistory) repository).logbookHeaderExcel(summeryrequest.getShift(), summeryrequest.getFromDate(), summeryrequest.getToDate());
			
		} else if("buds_equipment_usage".equalsIgnoreCase(summeryrequest.getFormName())) {
			
			return ( (BudsEquipmentUsuageHeaderRepositoryHistory) repository).generateExcel(summeryrequest.getShift(), summeryrequest.getBmrNumber(), summeryrequest.getFromDate(), summeryrequest.getToDate());
			
		} else if("buds_daily_production_sliver".equalsIgnoreCase(summeryrequest.getFormName())) {
			
			return ( (BudsDailyProductionSliverHeaderHistoryRepository) repository).generateExcel(summeryrequest.getFromDate(), summeryrequest.getToDate(), summeryrequest.getMachineName(), summeryrequest.getShift());
			
		} else if("buds_product_changeover".equalsIgnoreCase(summeryrequest.getFormName())) {
			
			return ( (BudsProductChangeOverRepositoryHistory) repository).productChangeOverExcel(summeryrequest.getFromDate(), summeryrequest.getToDate(), summeryrequest.getOrderNumber());
			
		} else if("inspection".equalsIgnoreCase(summeryrequest.getFormName())) {
			
			return ( (FinalInspectionReportHistoryRepository) repository).excelReportBuds(summeryrequest.getShift(), summeryrequest.getOrderNumber(), summeryrequest.getFromDate(), summeryrequest.getToDate());
			
		}
		
		else {
			throw new IllegalArgumentException("Invalid entity for date filtering: " + summeryrequest.getFormName());
		}
		
	}
	
	@PostMapping("/getAuditSummary")
	public ResponseEntity<?> getAuditSummary(@RequestBody BudsAuditRequest summeryrequest) {

		ResponseEntity<?> message = excelGenerationService.getAuditSummary(summeryrequest);

		return message;
	}
	
}
