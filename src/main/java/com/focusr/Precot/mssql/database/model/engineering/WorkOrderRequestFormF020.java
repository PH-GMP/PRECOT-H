package com.focusr.Precot.mssql.database.model.engineering;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.productDevelopment.AppConstantsproductdevelopment;

import lombok.Data;

@Entity
@Table(name = "ENG_WORK_ORDER_REQUEST_FORM_FO20", schema = AppConstantsproductdevelopment.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "WOR_NO" }) })
@Data
public class WorkOrderRequestFormF020 extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "FORMAT")
	private String format;

	@Column(name = "FORMAT_NO")
	private String format_no;

	@Column(name = "REF_SOP_NO")
	private String ref_sop_no;

	@Column(name = "REVISION_NUMBER")
	private String revisionNo;

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "DATE_OF_REQUEST")
	private String dateOfRequest;

	@Column(name = "TENTATIVE_DATE")
	private String TentativeDate;

	@Column(name = "WOR_NO")
	private String worNo;

	@Column(name = "DEPARTMENT")
	private String department;

	@Column(name = "AREA")
	private String area;

	@Column(name = "TARGET_DATE")
	private String targetDate;

	@Column(name = "DETAILS_OF_WORK", columnDefinition = "TEXT")
	private String detailsOfWork;

	@Column(name = "ASSIGNED_DEPARTMENT")
	private String assignedDepartment;

	@Column(name = "CLOSURE_DATE")
	private String closureDate;

	@Column(name = "COMMENTS")
	private String comments;

	@Column(name = "INITIAL_COMMENTS")
	private String InitialComments;

	@Column(name = "CLOSURE_COMMENTS")
	private String ClosureComments;

	@Column(name = "REQUESTER_STATUS")
	private String requesterStatus;

	@Column(name = "REQUESTER_SAVED_ON")
	private Date requesterSavedOn;

	@Column(name = "REQUESTER_SAVED_BY")
	private String requesterSavedBy;

	@Column(name = "REQUESTER_SAVED_ID")
	private Long requesterSavedId;

	@Column(name = "REQUESTER_SUBMIT_ON")
	private Date requesterSubmitOn;

	@Column(name = "REQUESTER_SUBMIT_BY")
	private String requesterSubmitBy;

	@Column(name = "REQUESTER_SUBMIT_ID")
	private Long requesterSubmitId;

	@Column(name = "REQUESTER_SIGN")
	private String requesterSign;

	@Column(name = "RECEIVER")
	private String receiver;

	@Column(name = "RECEIVER_STATUS")
	private String receiverstatus;

	@Column(name = "RECEIVER_SUBMIT_BY")
	private String receiverSubmitBy;

	@Column(name = "RECEIVER_SUBMIT_ID")
	private Long receiverSubmitId;

	@Column(name = "RECEIVER_SUBMIT_ON")
	private Date receiverSubmiton;

	@Column(name = "RECEIVER_SIGN")
	private String receiverSign;

	@Column(name = "ACCEPTER_STATUS")
	private String accepterStatus;

	@Column(name = "ACCEPTER_SUBMIT_BY")
	private String accepterSubmitBy;

	@Column(name = "ACCEPTER_SUBMIT_ID")
	private Long accepterSubmitId;

	@Column(name = "ACCEPTER_SUBMIT_ON")
	private Date accepterSubmitOn;

	@Column(name = "ACCEPTER_SIGN")
	private String accepterSign;

	@Column(name = "HOD_STATUS")
	private String hodStatus;

	@Column(name = "HOD_SUBMIT_ON")
	private Date hodSubmitOn;

	@Column(name = "HOD_SUBMIT_BY")
	private String hodSubmitBy;

	@Column(name = "HOD_SUBMIT_ID")
	private Long hodSubmitId;

	@Column(name = "HOD_SIGN")
	private String hodSign;

}
