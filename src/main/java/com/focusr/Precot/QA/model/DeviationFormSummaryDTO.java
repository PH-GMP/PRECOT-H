package com.focusr.Precot.QA.model;

import java.time.LocalDate;
import lombok.Data;

@Data
public class DeviationFormSummaryDTO 
{
	private Long deviationId;
	private String year;
	private String month;
	private String department;
	private LocalDate dateOfIniation;
	private String deviationNumber;
	private String sec1SupervisorStatus;
	private String sec1HodDesigneeStatus;
	private String sec1QaManagerMrReviewStatus;
	private String sec1QaManagerMrInvgStatus;
	private String sec2SupervisorStatus;
	private String sec2HodDesigneeStatus;
	private String sec2QaManagerMrStatus;
	private String sec3SupervisorStatus;
	private String sec3HodDesigneeStatus;
	private String sec3QaManagerMrStatus;
	private String reason;
	
	public DeviationFormSummaryDTO(Long deviationId,String year,String month,String department ,
			LocalDate dateOfIniation,String deviationNumber,String sec1SupervisorStatus,
			String sec1HodDesigneeStatus,String sec1QaManagerMrReviewStatus,
			String sec1QaManagerMrInvgStatus,String sec2SupervisorStatus,
			String sec2HodDesigneeStatus,String sec2QaManagerMrStatus,
			String sec3SupervisorStatus, String sec3HodDesigneeStatus,
			String sec3QaManagerMrStatus, String reason) 
	{
		this.deviationId = deviationId;
		this.year = year;
		this.month = month;
		this.department = department;
		this.dateOfIniation = dateOfIniation;
		this.deviationNumber = deviationNumber;
		this.sec1SupervisorStatus = sec1SupervisorStatus;
		this.sec1HodDesigneeStatus = sec1HodDesigneeStatus;
		this.sec1QaManagerMrReviewStatus = sec1QaManagerMrReviewStatus;
		this.sec1QaManagerMrInvgStatus = sec1QaManagerMrInvgStatus;
		this.sec2SupervisorStatus = sec2SupervisorStatus;
		this.sec2HodDesigneeStatus = sec2HodDesigneeStatus;
		this.sec2QaManagerMrStatus = sec2QaManagerMrStatus;
		this.sec3SupervisorStatus = sec3SupervisorStatus;
		this.sec3HodDesigneeStatus = sec3HodDesigneeStatus;
		this.sec3QaManagerMrStatus = sec3QaManagerMrStatus;
		this.reason = reason;
	}
}