package com.focusr.Precot.util.bleaching;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

	private String formatName;
	
	private Long supervisiorSubmitted;
	
	private Long hodApproved;
	
	private Long hodRejected;
	
	private Long qaApproved;
	
	private Long qaRejected;
	
	private Long hrApproved;
	
	private Long hrRejected;
	
}
