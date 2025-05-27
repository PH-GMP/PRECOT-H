package com.focusr.Precot.mssql.database.model.engineering;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.productDevelopment.AppConstantsproductdevelopment;

import lombok.Data;

@Entity
@Table(name = "ENG_ROOT_CAUSE_ANALYSIS_FOO4",schema = AppConstantsproductdevelopment.schema, uniqueConstraints = {
        @UniqueConstraint(columnNames = {"DATE","RCA_NO"})
})
@Data
public class RootCauseAnalysisF004  extends UserDateAudit {
	
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

	    @Column(name = "RCA_NO")
	    private String rcaNo;

	    @Column(name = "BIS_NO")
	    private String bisNo;

	  
	    @Column(name = "DATE")
	    private String date;

	    @Column(name = "DEPARTMENT")
	    private String department;

	    @Column(name = "PRODUCT")
	    private String product;

	    @Column(name = "PRODUCTION_LOSS_MT")
	    private String productionLossMt;

	    @Column(name = "BATCH_TIME_LOST")
	    private String batchTimeLost;

	    @Column(name = "RCA_OWNER")
	    private String rcaOwner;

	    @Column(name = "RCA_TEAM_MEMBERS")
	    private String rcaTeamMembers;

	    @Column(name = "PROBLEM_DESCRIPTION")
	    private String problemDescription;

	    @Column(name = "WHY_1")
	    private String why1;

	    @Column(name = "WHY_2")
	    private String why2;

	    @Column(name = "WHY_3")
	    private String why3;

	    @Column(name = "WHY_4")
	    private String why4;

	    @Column(name = "WHY_5")
	    private String why5;

	    @Column(name = "ROOT_CAUSE")
	    private String rootCause;
	    
	    @Column(name = "ASSIGNED_DEPARTMENT")
	    private String assignedDepartment;

	    @OneToMany(mappedBy = "rootCauseAnalysis", cascade = CascadeType.ALL, orphanRemoval = true)
	    @JsonManagedReference
	    private List<RootCauseAnalysisCorrectiveAction> correctiveActions;

	    @OneToMany(mappedBy = "rootCauseAnalysis", cascade = CascadeType.ALL, orphanRemoval = true)
	    @JsonManagedReference
	    private List<RootCauseAnalysisPreventiveAction> preventiveActions;
	    
	    
	    @Column(name = "REASON")
	    private String reason;
	    
	    
	    

	    
	    
	    @Column(name = "SUPERVISOR_STATUS")
	    private String SupervisorStatus;

	    @Column(name = "SUPERVISOR_SAVED_ON")
	    private Date SupervisorSavedOn;

	    @Column(name = "SUPERVISOR_SAVED_BY")
	    private String SupervisorSavedBy;

	    @Column(name = "SUPERVISOR_SAVED_ID")
	    private Long   SupervisorSavedId;

	    @Column(name = "SUPERVISOR_SUBMIT_ON")
	    private Date SupervisorSubmitOn;

	    @Column(name = "SUPERVISOR_SUBMIT_BY")
	    private String SupervisorSubmitBy;

	    @Column(name = "SUPERVISOR_SUBMIT_ID")
	    private Long  SupervisorSubmitId;

	    @Column(name = "SUPERVISOR_SIGN")
	    private String SupervisorSign;
	    
	    
	    
	    
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

