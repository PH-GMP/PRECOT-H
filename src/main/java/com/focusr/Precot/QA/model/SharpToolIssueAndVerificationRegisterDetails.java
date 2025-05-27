package com.focusr.Precot.QA.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data

@Entity

@Table(name = "SHARP_TOOLS_ISSUE_AND_VERIFICATION_REGISTER_DETAILS", schema = AppConstants.schema)

public class SharpToolIssueAndVerificationRegisterDetails {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "DETAILS_ID")
	    private Long detailsId;

	    @Column(name = "SNO")
	    private Long sno;

	    @Column(name = "NAME_OF_ITEM")
	    private String nameOfItem;

	    @Column(name = "MONTH")
	    private String month;

	    @Column(name = "YEAR")
	    private String year;

	    @Column(name = "ISSUE_DETAILS_NAME")
	    private String issueDetailsName;

	    @Column(name = "ISSUE_DETAILS_DATE")
	    private String issueDetailsDate;

	    @Column(name = "ISSUE_DETAILS_RECIVERS_SIGN")
	    private String issueDetailsReciversSign;

	    @Column(name = "VERIFICATION_LOCATION")
	    private String VerificationLocation;

	    @Column(name = "VERIFICATION_DATE")
	    private String VerificationDate;

	    @Column(name = "VERIFICATION_TIME")
	    private String VerificationTime;

	    @Column(name = "RECEIVED_BACK_ON_DATE")
	    private String RecivedBackOnDate;

	    @Column(name = "RECEIVED_BACK_ON_RECIVERS_SIGN")
	    private String RecivedBackOnReciversSign;

	    @Column(name = "REMARKS")
	    private String remarks;

	    @Column(name = "SUPERVISOR_STATUS")
	    private String supervisorStatus;

	    @Column(name = "SUPERVISOR_SAVED_ON")
	    private Date supervisorSavedOn;

	    @Column(name = "SUPERVISOR_SAVED_BY")
	    private String supervisorSavedBy;

	    @Column(name = "SUPERVISOR_SAVED_ID")
	    private Long supervisorSavedId;

	    @Column(name = "SUPERVISOR_SUBMITTED_ON")
	    private Date supervisorSubmittedOn;

	    @Column(name = "SUPERVISOR_SUBMITTED_BY")
	    private String supervisorSubmittedBy;

	    @Column(name = "SUPERVISOR_SUBMITTED_ID")
	    private Long supervisorSubmittedId;

	    @Column(name = "SUPERVISOR_SIGN")
	    private String supervisorSign;

	    @ManyToOne
	    @JsonIgnore
	    @JoinColumn(name = "ID", nullable = false)
	    private QaSharpToolsIssueAndVerificationRegisterF062 parentReport;


}

