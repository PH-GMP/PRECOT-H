package com.focusr.Precot.QA.model.audit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.QA.model.BatchReleaseNotesLines;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_BATCH_RELEASE_NOTE_LINES_HISTORY", schema = AppConstants.schema)
public class BatchReleaseNotesLinesHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "BMR_NO")
	private String bmrNo;
	
	@Column(name = "PRODUCT_NAME")
	private String productName;
	
	@Column(name = "LOT_NO")
	private String lotNo;
	
	@Column(name = "TOTAL_QTY")
	private String totalQty;
	
	@Column(name = "RELEASED_QTY")
	private String releasedQty;
	
	@Column(name = "HISTORY_ID")
	private Long historyId;


}
