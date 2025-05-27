package com.focusr.Precot.mssql.database.service.ppc;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.focusr.Precot.mssql.database.model.PPC.audit.MonthlyplanSummaryHistoryF_002;
import com.focusr.Precot.mssql.database.repository.ppc.audit.MonthlyplanSummaryHistoryF_002Repository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.PpcAuditRequest;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.ppc.AppConstantPpc;
import com.focusr.Precot.util.ppc.PpcExcelUtil;


@Service
public class PpcAuditService {

	
	Logger logger = LoggerFactory.getLogger(PpcAuditService.class);

	SCAUtil sca = new SCAUtil();
	
	@Autowired 
	 private MonthlyplanSummaryHistoryF_002Repository MonthlyplanSummaryHistory;
	
	
	public ResponseEntity<?> getAuditSummary(PpcAuditRequest summeryrequest) {
		List<MonthlyplanSummaryHistoryF_002> summaryF01;
		
		try {
			String department = summeryrequest.getDepartment();
			String formName = summeryrequest.getForm_name();
			
			
			if (AppConstantPpc.departmentName.equals(department)
					&& AppConstantPpc.F003.equalsIgnoreCase(formName)) {

//				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
//				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				
				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : LocalDate.parse(summeryrequest.getFrom_date(), DateTimeFormatter.ofPattern("yyyy-MM-dd")).toString();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : LocalDate.parse(summeryrequest.getTo_date(), DateTimeFormatter.ofPattern("yyyy-MM-dd")).toString();


				summaryF01 = MonthlyplanSummaryHistory.findByParams001(fromDate, toDate);

				if (!summaryF01.isEmpty()) {
					ByteArrayResource resource = PpcExcelUtil.generateF003Excel(summaryF01);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=MonthlyplanSummaryF_003.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
				
			}
			else {
				return new ResponseEntity<>(new ApiResponse(false, "Invalid department or form name"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {
			logger.error("*** Unable to Get Audit History ***", e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "*** Unable to Get Audit History ***" + msg),
					HttpStatus.BAD_REQUEST);
		}

	}
}




