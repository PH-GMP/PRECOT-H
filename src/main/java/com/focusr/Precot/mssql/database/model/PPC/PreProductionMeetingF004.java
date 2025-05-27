package com.focusr.Precot.mssql.database.model.PPC;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Entity
@Table(name = "PPC_PRE_PRODUCTIONS_F004", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE" }) })

@Data
public class PreProductionMeetingF004 extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private Long revisionNo;

	@Column(name = "REF_SOP_NO")
	private String refSopNo;

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "DATE")
	private String date;

	@Column(name = "CUSTOMER")
	private String customer;

	@Column(name = "BRAND")
	private String brand;

	@Column(name = "PRODUCT_CODE")
	private String productCode;

	@Column(name = "PRODUCT_DESCRIPTION")
	private String productDescription;

	@Column(name = "PDS_NO")
	private String PdsNo;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "preproductionMeeting")
	@JsonManagedReference
	private List<PreproductionMeetingDetailsF004> detailsMeeting;

	// AMC

	@OneToMany(mappedBy = "preProductionMeeting", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonManagedReference
	private List<PreProductionMeetingDepartmentMember> memberDetails;

	@Column(name = "NOTE")
	private String note;

	@Column(name = "CHALLENGES")
	private String challenges;

	@Column(name = "MAIL_STATUS")
	private String mailStatus;

	@Column(name = "ASSISTANT_SIGNATURE")
	private byte[] assistantSignature;

	@Column(name = "REASON")
	private String reason;

	@Column(name = "ASSISTANT_STATUS")
	private String assistantStatus;

	@Column(name = "ASSISTANT_SAVED_ON")
	private Date assistantSavedOn;

	@Column(name = "ASSISTANT_SAVED_BY")
	private String assistantSavedBy;

	@Column(name = "ASSISTANT_ID")
	private Long assistantSavedId;

	@Column(name = "ASSISTANT_SUBMIT_ON")
	private Date assistantSubmitOn;

	@Column(name = "ASSISTANT_SUBMIT_BY")
	private String assistantSubmitBy;

	@Column(name = "ASSISTANT_SUBMIT_ID")
	private Long assistantSubmitId;

	@Column(name = "ASSISTANT_SIGN")
	private String assistantSign;

	public PreProductionMeetingF004() {
	}

}
