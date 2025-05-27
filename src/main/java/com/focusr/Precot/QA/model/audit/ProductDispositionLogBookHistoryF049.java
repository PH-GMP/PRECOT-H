package com.focusr.Precot.QA.model.audit;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.focusr.Precot.QA.model.ProductDispositionLogBookLineDetails;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_PRODUCT_DISPOSITION_LOGBOOK_HISTORY_F039", schema = AppConstants.schema)
public class ProductDispositionLogBookHistoryF049 {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "HISTORY_ID")
	private Long historyId;
	

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "SOP_NO")
	private String sopNumber;

	@Column(name = "REVISION_NO")
	private String revisionNo;
	
	@Column(name = "VERSION")
	private int version;
	
	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "MONTH")
	private String month;
	
	@Column(name = "YEAR")
	private String year;
	
	

	//QA Inspector
	
		@Column(name = "QA_INSPECTOR_STATUS")
		private String qa_inspector_status;

		@Column(name = "QA_INSPECTOR_SAVE_ON")
		private Date qa_inspector_save_on;

		@Column(name = "QA_INSPECTOR_SAVE_BY")
		private String qa_inspector_save_by;

		@Column(name = "QA_INSPECTOR_SAVE_ID")
		private Long qa_inspector_save_id;

		@Column(name = "QA_INSPECTOR_SUBMIT_ON")
		private Date qa_inspector_submit_on;

		@Column(name = "QA_INSPECTOR_SUBMIT_BY")
		private String qa_inspector_submit_by;

		@Column(name = "QA_INSPECTOR_SUBMIT_ID")
		private Long qa_inspector_submit_id;

		@Column(name = "QA_INSPECTOR_SIGN")
		private String qa_inspector_sign;
		
		//QA MANAGER
		
		@Column(name = "QA_MR_STATUS")
		private String qa_mr_status;

		@Column(name = "QA_MR_SUBMIT_ON")
		private Date qa_mr_submit_on;

		@Column(name = "QA_MR_SUBMIT_BY")
		private String qa_mr_submit_by;

		@Column(name = "QA_MR_SUBMIT_ID")
		private Long qa_mr_submit_id;

		@Column(name = "QA_MR_SIGN")
		private String qa_mr_sign;
		
		@Lob
		@Column(name = "QA_INSPECTOR_SIGNATURE_IMAGE")
		private byte[] qa_inspector_signature_image;

		@Lob
		@Column(name = "QA_MR_SIGNATURE_IMAGE")
		private byte[] qa_mr_signature_image;
		
		
		@OneToMany(targetEntity = ProductDispositionLogBookHistoryLineDetailsF049.class, cascade = CascadeType.ALL)
		@JoinColumn(name = "HISTORY_ID", referencedColumnName = "HISTORY_ID")
		private List<ProductDispositionLogBookHistoryLineDetailsF049> details;


}
