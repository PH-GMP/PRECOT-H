package com.focusr.Precot.QA.model.audit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.QA.model.RequestAndIssunceOfLineDocumentsF002;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_DISTRIBUTION_AND_ISSUNCE_OF_LINE_DOCUMENT_HISTORY_F003", schema = AppConstants.schema)

public class DistributionAndDestructionRecordLinesHistoryF003 {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "DISTRUCTIONLINE_ID")
	private Long distructionLineId;
	
	
	@Column(name = "DEPARTMENT")
	private String department;
	
	@Column(name = "Date")
	private String disdate;
	
	@Column(name = "LINE_ID")
	private Long lineId;	
	
	@Column(name = "REQUEST_ID")
	private Long requestId;
	
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
	
//	DESTRUCTION RECORD
	
	@Column(name = "NOOFCOPIES_RETURNED")
	private String noOfCopiesReturned;
	
	@Column(name = "RETURNEDBY_DATEANDSIGN")
	private String returnedByDateAndSign;
	
	@Column(name = "DESTROYEDBY_DATEANDSIGN")
	private String DestroyedByDateAndSign;
	
	@Column(name = "DISTRUCTION_ID")
	private Long distructionId;
	

}
