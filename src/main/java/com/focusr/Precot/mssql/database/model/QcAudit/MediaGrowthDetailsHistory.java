package com.focusr.Precot.mssql.database.model.QcAudit;

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
@Table(name = "MEDIA_GROWTH_DETAILS_HISTORY", schema = AppConstants.schema)
public class MediaGrowthDetailsHistory extends UserDateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "MEDIA_NAME")
    private String mediaName;

    @Column(name = "MANUFACTURED_DATE")
    private String manufacturedDate;

    @Column(name = "LOT_NO")
    private String lotNo;

    @Column(name = "EXPIRY_DATE")
    private String expiryDate;

    @Column(name = "NAME_OF_CULTURE")
    private String nameOfCulture;

    @Column(name = "TEST_COMPLETION_DATE")
    private String testCompletionDate;

    @Column(name = "TESTED_BY")
    private String testedBy;

    @Column(name = "APPROVED_BY")
    private String approvedBy;

    @Column(name = "REMARKS")
    private String remarks;

    @Column(name = "PARENT_ID")
    private Long parentId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID", insertable = false, updatable = false)
    @JsonIgnore
    private Qc_MediaGrowthPromotionTestReportF021History mediaGrowthPromotionTestReportF021History;

}
