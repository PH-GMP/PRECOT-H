package com.focusr.Precot.QA.model.audit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_REVIEW_OF_PRODUCT_RECALL_LINE_10_HISTORY", schema = AppConstants.schema)
public class ReviewOfProductRecallLine10History {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "RECALL_NO")
	private String recallNo;
	
	@Column(name = "RECALL_DATE")
	private String recallDate;
	
	@Column(name = "BATCH_NO")
	private String batchNo;
	
	@Column(name = "REASON_FOR_RECALL")
	private String reasonForRecall;
	
	@Column(name = "INVESTIGATION_SUMMARY")
	private String investigationSummary;
	
	@Column(name = "RECALL_REMARKS")
	private String recallRemarks;
	
	@Column(name = "HISTORY_ID")
	private Long historyId;

}
