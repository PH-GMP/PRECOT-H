package com.focusr.Precot.mssql.database.model.engineering.audit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.focusr.Precot.mssql.database.model.engineering.RootCauseAnalysisF004;
import com.focusr.Precot.mssql.database.model.engineering.RootCauseAnalysisPreventiveAction;
import com.focusr.Precot.util.productDevelopment.AppConstantsproductdevelopment;

import lombok.Data;
import lombok.ToString;

@Entity
@Table(name = "ENG_ROOT_CAUSE_ANALYSIS_PREVENTIVE_HISTORY_FOO4",schema = AppConstantsproductdevelopment.schema)
@Data
public class RootCauseAnalysisPreventiveActionHistory {
	
	
	  @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "ID")
	    private Long id;

	    @ManyToOne
	    @JoinColumn(name = "RCA_ID")
	    @JsonBackReference
	    @ToString.Exclude
	    private RootCauseAnalysisF004 rootCauseAnalysis;

	    @Column(name = "PREVENTIVE_ACTION")
	    private String preventiveaction;

	    @Column(name = "PREVENTIVE_TARGET_DATE")
	    private String preventivetargetDate;

	    @Column(name = "PREVENTIVE_RESPONSIBILITY")
	    private String preventiveresponsibility;

	    @Column(name = "PREVENTIVE_STATUS")
	    private String preventivestatus;

		
	    
	    

	


}
