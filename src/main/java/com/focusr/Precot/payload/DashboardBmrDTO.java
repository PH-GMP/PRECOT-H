package com.focusr.Precot.payload;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DashboardBmrDTO {


	private String departmentName;

	private String departmentId;
	
	private String formName; 
	
	private List<String> pendingBmrNos;

	private int pendingCount;
	
	private List<String> closedBmrNos;

	private int closedCount;

}
