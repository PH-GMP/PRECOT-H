package com.focusr.Precot.QA.model;

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
@Table(name = "QA_PRODUCT_DISPOSITION_LOGBOOK_LINE_DETAILS_F049", schema = AppConstants.schema)
public class ProductDispositionLogBookLineDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long line_id;
	
	@Column(name = "SNO")
	private String sNo;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "BATCH_NO")
	private String batchNo;
	
	@Column(name = "PRODUCT_NAME")
	private String productName;
	
	@Column(name = "QUANTITY")
	private String quantity;
	
	@Column(name = "UOM")
	private String uom;	
	
	@Column(name = "REASONFOR_DISPOSAL")
	private String reasonForDisposal;	
	
	@Column(name = "DONE_BY")
	private String doneBy;
	
	@Column(name = "CHECKED_BY")
	private String checkedBy;
	
	@Column(name = "PRODUCT_ID")
	private Long productId;
	
}
