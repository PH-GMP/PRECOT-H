package com.focusr.Precot.payload;

public class ApproveResponseContainerInspection {
	

		private Long id;
		
		private String formatNo;
		
		private String status;
		
		private String remarks;	
		
		private String finalConclusion;
		

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getFormatNo() {
			return formatNo;
		}

		public void setFormatNo(String formatNo) {
			this.formatNo = formatNo;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		public String getRemarks() {
			return remarks;
		}

		public void setRemarks(String remarks) {
			this.remarks = remarks;
		}

		public String getFinalConclusion() {
			return finalConclusion;
		}

		public void setFinalConclusion(String finalConclusion) {
			this.finalConclusion = finalConclusion;
		}
		
		
}
