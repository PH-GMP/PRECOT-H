package com.focusr.Precot.QA.model.audit;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.DateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Entity
@Table(name = "NEW_SAMPLE_REQUEST_F029_HISTORY", schema = AppConstants.schema)
@Data
public class newamplerequestQAhistory extends DateAudit{
	
	@Id
	@Column(name = "TEST_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long test_id;

	@Column(name = "FORMAT")
	private String format;

	@Column(name = "FORMAT_NO")
	private String format_no;

	@Column(name = "REF_SOP_NO")
	private String ref_sop_no;

	@Column(name = "DATE")
	private String date;
	
	@Column(name = "MONTH")
	private String month;
	
	@Column(name = "YEAR")
	private String year;

	@Column(name = "REQUISITION_NO")
	private String requisitionNo;

	@Column(name = "SAMPLE_REQUISITION_POSTED_BY")
	private String sampleRequisitionPostedBy;

	@Column(name = "REMARKS_BY_UNIT")
	private String remarksByUnit;

	@Column(name = "DISPATCH_DATE")
	private String dispatchString;

	@Column(name = "CUSTOMER_NAME")
	private String customerName;

	@Column(name = "PRODUCT_TYPE")
	private String productType;

	@Column(name = "TYPE_OF_RAW_MATERIAL")
	private String typeOfRawMaterial;

	@Column(name = "RAW_MATERIAL_CERTIFICATE")
	private String rawMaterialCertificate;

	@Column(name = "SHAPE")
	private String shape;

	@Column(name = "WIDTH_AND_LENGTH")
	private String widthAndLength;

	@Column(name = "GSM")
	private String gsm;

	@Column(name = "PATTERN")
	private String pattern;

	@Column(name = "EDGE")
	private String edge;

	@Column(name = "NO_OF_PIECES_BAG")
	private String noOfPiecesBag;

	@Column(name = "BAG_TYPE")
	private String bagType;

	@Column(name = "NO_OF_PACKS_REQUIRED")
	private String noOfPacksRequired;

	@Column(name = "CUSTOMER_REQUIREMENT_FEEDBACK")
	private String customerRequirementFeedback;

	@Column(name = "SAMPLE_CATEGORY_FOR_COST")
	private String sampleCategoryForCost;

	@Column(name = "SALE_ORDER_NO")
	private String saleOrderNo;

	@Column(name = "REFERENCE_IMAGE")
	@Lob
	private byte[] referenceImage;

	@Column(name = "SAMPLE_REFERENCE_NO")
	private String sampleReferenceNo;

	@Column(name = "SAMPLE_PREPARED_BY")
	private String samplePreparedBy;

	@Column(name = "SAMPLE_APPROVED_BY")
	private String sampleApprovedBy;

	@Column(name = "SAMPLE_RECEIVED_BY_AT_CO_OFFICE")
	private String sampleReceivedByAtCoOffice;

	@Column(name = "STATUS")
	private String status;

	@Column(name = "COMMENTS")
	private String comments;

	@Column(name = "IS_IMAGE_UPLOADED")
	private String is_image_uploaded;

	@Column(name = "MARK_REP_STATUS")
	private String mark_rep_status;

	@Column(name = "MARK_REP_SAVED_ON")
	private Date mark_rep_saved_on;

	@Column(name = "MARK_REP_SAVED_BY")
	private String mark_rep_saved_by;

	@Column(name = "MARK_REP_SAVED_ID")
	private Long mark_rep_saved_id;

	@Column(name = "MARK_REP_SAVED_ON_B")
	private Date mark_rep_saved_on_b;

	@Column(name = "MARK_REP_SAVED_BY_B")
	private String mark_rep_saved_by_b;

	@Column(name = "MARK_REP_SAVED_ID_B")
	private Long mark_rep_saved_id_b;

	@Column(name = "MARK_REP_SUBMIT_ON")
	private Date mark_rep_submit_on;

	@Column(name = "MARK_REP_SUBMIT_BY")
	private String mark_rep_submit_by;

	@Column(name = "MARK_REP_SUBMIT_ID")
	private Long mark_rep_submit_id;

	@Column(name = "MARK_REP_SIGN")
	private String mark_rep_sign;

	// ---------------------------------------

	@Column(name = "MARK_REP_SUBMIT_ON_B")
	private Date mark_rep_submit_on_b;

	@Column(name = "MARK_REP_SUBMIT_BY_B")
	private String mark_rep_submit_by_b;

	@Column(name = "MARK_REP_SUBMIT_ID_B")
	private Long mark_rep_submit_id_b;

	@Column(name = "MARK_REP_SIGN_B")
	private String mark_rep_sign_b;

	@Column(name = "MARK_REP_STATUS_B")
	private String mark_rep_status_b;

	@Column(name = "QC_STATUS")
	private String qc_status;

	@Column(name = "QC_SUBMIT_ON")
	private Date qc_submit_on;

	@Column(name = "QC_SUBMIT_BY")
	private String qc_submit_by;

	@Column(name = "QC_SUBMIT_ID")
	private Long qc_submit_id;

	@Column(name = "QC_SIGN")
	private String qc_sign;

	@Column(name = "REMARKS")
	private String remarks;

	@Column(name = "VERSION")
	private int version;


}
