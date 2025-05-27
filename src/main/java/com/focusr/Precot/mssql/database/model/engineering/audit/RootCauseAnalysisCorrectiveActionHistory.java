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
import com.focusr.Precot.mssql.database.model.engineering.RootCauseAnalysisCorrectiveAction;
import com.focusr.Precot.mssql.database.model.engineering.RootCauseAnalysisF004;
import com.focusr.Precot.util.productDevelopment.AppConstantsproductdevelopment;

import lombok.Data;
import lombok.ToString;

@Entity
@Table(name = "ENG_ROOT_CAUSE_ANALYSIS_CORRECTIVE_HISTORY_FOO4",schema = AppConstantsproductdevelopment.schema)
@Data
public class RootCauseAnalysisCorrectiveActionHistory {
	
	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "ID")
	    private Long id; 
	 
	 
	@ManyToOne
 @JoinColumn(name = "RCA_ID")
	@JsonBackReference
	@ToString.Exclude
 private RootCauseAnalysisF004 rootCauseAnalysis;

 @Column(name = "COTTECTIVE_ACTION")
 private String correctiveaction;

 
 @Column(name = "COTTECTIVE_TARGET_DATE")
 private String correctivetargetDate;

 @Column(name = "COTTECTIVE_RESPONSIBILITY")
 private String correctiveresponsibility;

 @Column(name = "COTTECTIVE_STATUS")
 private String correctivestatus;


 
 
 

}
