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

import org.hibernate.annotations.common.util.StringHelper;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "hod_DISTILLED_WATER_ANALYSIS_DETAILS", schema = AppConstants.schema)
public class QcDistilledWaterAnlaysisDetails extends UserDateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
    
    @Column(name = "SNO")
    private Long sno;
    
    @Column(name = "ANALYTICAL_REQUEST_NO")
    private Long analyticalRequestNo;
    
    @Column(name = "PH")
    private Double ph;
    
    @Column(name = "TURBIDITY_IN_NTU")
    private Double turbidityInNtu;
    
    @Column(name = "TOTAL_DISSOLVED_SOLIDS_IN_PPM")
    private Double totalDissolvedSolidsInPpm;
    
    @Column(name = "HARDNESS_IN_PPM")
    private Double hardnessInPpm;
 
    @Column(name = "REMARK")
    private String remark;
    
    @Column(name = "PARENT_ID")
    private Long parentId;
    
    @Column(name = "CHECKED_BY")
    private String checkedBy;
    
    @Column(name = "VERIFIED_BY")
    private String verifiedBy;
    
    @Column(name = "APPROVED_BY")
    private String approvedBy;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID", insertable = false, updatable = false)
    @JsonIgnore
    private QcDistilledWaterAnalysisReportARF012 qcDistilledWaterAnalysisReportARF012;

}
