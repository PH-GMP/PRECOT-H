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
public class DashboardRequest {

	private String deptName;
	
	private String formName;
	
	private int month;
	
	private int year;
}
