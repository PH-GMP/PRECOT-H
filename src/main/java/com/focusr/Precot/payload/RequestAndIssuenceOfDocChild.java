package com.focusr.Precot.payload;

import lombok.Data;

@Data
public class RequestAndIssuenceOfDocChild {

	//Request and Issuence Of Document
	
		private Long lineId;
		
		private String documentGivenBy;
		
		private String documentCollectedBy;
		
		private String remark;
		
		private String comments;
}
