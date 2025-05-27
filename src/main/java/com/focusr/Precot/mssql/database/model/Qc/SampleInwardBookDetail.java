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
@Table(name = "SAMPLE_INWARD_BOOK_DETAIL", schema = AppConstants.schema)
public class SampleInwardBookDetail extends UserDateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "SHIFT")
    private Long shift;

    @Column(name = "DESCRIPTION_OF_MATERIAL")
    private String descriptionOfMaterial;

    @Column(name = "QUANTITY")
    private Long quantity;

    @Column(name = "BMR_NO")
    private String bmrNo;

    @Column(name = "UOM")
    private String uom;

    @Column(name = "SAMPLE_GIVEN_BY")
    private String sampleGivenBy;

    @Column(name = "SAMPLE_RECEIVED_BY")
    private String sampleReceivedBy;

    @Column(name = "REMARK")
    private String remark;

    @Column(name = "PARENT_ID")
    private Long parentId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID", insertable = false, updatable = false)
    @JsonIgnore
    private SampleInwardBookF001_F002_F003 sampleInwardBookF001F002F003;

}
