package com.focusr.Precot.QA.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_REQUEST_AND_ISSUNCE_OF_LINE_DOCUMENT_F002", schema = AppConstants.schema)
public class RequestAndIssunceOfLineDocumentsF002 {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long lineId;
	
	@Column(name = "DEPARTMENT")
	private String department;
	
	@Column(name = "DOCUMENT_NAME")
	private String documentName;
	
	@Column(name = "DOCUMENT_NO")
	private String documentNo;
	
	@Column(name = "REVISION_NO")
	private String revisionNo;
	
	@Column(name = "TYPEOF_COPY")
	private String typeOfCopy;
	
	@Column(name = "NUMBEROF_COPIES")
	private String numberOfCopies;
	
	@Column(name = "DOCUMENT_GIVENBY")
	private String documentGivenBy;
	
	@Column(name = "DOCUMENT_COLLECTEDBY")
	private String documentCollectedBy;
	
	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "REMARK")
	private String remark;
	
	@Column(name = "STATUS")
	private String status;
	
	@Column(name = "REQUEST_ID")
	private Long requestId;

}
