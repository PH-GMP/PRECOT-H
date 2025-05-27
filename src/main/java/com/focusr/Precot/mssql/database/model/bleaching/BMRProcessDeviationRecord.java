package com.focusr.Precot.mssql.database.model.bleaching;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "PROCESS_DEVIATION_RECORD",schema=AppConstants.schema)
public class BMRProcessDeviationRecord extends UserDateAudit {
	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(name = "DEVIATION_LOG_NO", nullable = false)
	    private String deviationLogNo;

	    @Column(name = "QA_REMARKS")
	    private String qaRemarks;
	    
	    @Column(name = "BMR_NO")
	    private String bmr_no;

	    @Column(name = "SIGN")
	    private String sign;
	    
	    @Column(name = "SIGN_DATE")
//	    @Temporal(TemporalType.TIMESTAMP)
	    private String signDate;
	    
	    @Column(name = "STATUS")
		private String status;
	    
		@Column(name = "QA_SAVED_ON")
		private Date qa_saved_on;

		@Column(name = "QA_SAVED_BY")
		private String qa_saved_by;

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getDeviationLogNo() {
			return deviationLogNo;
		}

		public void setDeviationLogNo(String deviationLogNo) {
			this.deviationLogNo = deviationLogNo;
		}

		public String getQaRemarks() {
			return qaRemarks;
		}

		public void setQaRemarks(String qaRemarks) {
			this.qaRemarks = qaRemarks;
		}

		public String getBmr_no() {
			return bmr_no;
		}

		public void setBmr_no(String bmr_no) {
			this.bmr_no = bmr_no;
		}

		public String getSign() {
			return sign;
		}

		public void setSign(String sign) {
			this.sign = sign;
		}

		public String getSignDate() {
			return signDate;
		}

		public void setSignDate(String signDate) {
			this.signDate = signDate;
		}

		public Date getQa_saved_on() {
			return qa_saved_on;
		}

		public void setQa_saved_on(Date qa_saved_on) {
			this.qa_saved_on = qa_saved_on;
		}

		public String getQa_saved_by() {
			return qa_saved_by;
		}

		public void setQa_saved_by(String qa_saved_by) {
			this.qa_saved_by = qa_saved_by;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

	
		
		
}
