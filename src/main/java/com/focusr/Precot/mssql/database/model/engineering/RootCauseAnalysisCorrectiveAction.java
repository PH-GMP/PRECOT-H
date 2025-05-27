package com.focusr.Precot.mssql.database.model.engineering;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.util.productDevelopment.AppConstantsproductdevelopment;

import lombok.Data;


@Entity
@Table(name = "ENG_ROOT_CAUSE_ANALYSIS_CORRECTIVE_FOO4",schema = AppConstantsproductdevelopment.schema)
@Data
public class RootCauseAnalysisCorrectiveAction {

	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "ID")
	    private Long id; 
	 
	 
	@ManyToOne
    @JoinColumn(name = "RCA_ID")
	@JsonBackReference
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
