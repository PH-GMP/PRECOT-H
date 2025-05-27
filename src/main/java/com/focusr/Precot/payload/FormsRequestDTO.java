package com.focusr.Precot.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class FormsRequestDTO {

	private String department;
	
	private String formNumber;
	
	private String formName;
	
	private String date;
	
	private String todate;
	
	private long count;
	
}
