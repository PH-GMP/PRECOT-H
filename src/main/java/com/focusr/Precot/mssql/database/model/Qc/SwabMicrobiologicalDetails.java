package com.focusr.Precot.mssql.database.model.Qc;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SWAB_MICROBIOLOGICAL_DETAILS", schema = AppConstants.schema)
public class SwabMicrobiologicalDetails extends UserDateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
    
//    @Column(name = "AR_NUMBER")
//    private Long arNumber;
    
	@Column(name = "AR_NUMBER")
    private String arNumber;
    
    @Column(name = "LOCATION")
    private String location;
    
    @Column(name = "EMPLOYEE_ID")
    private Long employeeIdNo;
    
    @Column(name = "TOTAL_VIABLE_COUNT")
    private Long totalViableCount;
    
    @Column(name = "TOTAL_FUNGAL_COUNT")
    private Long totalFungalCount;
    
    @Column(name = "TEST_COMPLETION_DATE")
    private String testCompletionDate;
    
    @Column(name = "REMARK")
    private String remark;
    
    @Column(name = "TESTED_BY")
    private String testedBy;
    
    @Column(name = "APPROVED_BY")
    private String approvedBy;
    
    @Column(name = "PARENT_ID")
    private Long parentId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID", insertable = false, updatable = false)
    @JsonIgnore
    private SwabMicrobiologicalAnalysisARF008_009_010 swabMicrobiologicalAnalysisARF008_009_010;

}
