package com.focusr.Precot.QA.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_SHARP_TOOLS_ISSUE_AND_VERIFICATION_REGISTER_F062", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = {"DEPARTMENT"}) })
public class QaSharpToolsIssueAndVerificationRegisterF062 extends UserDateAudit{

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "UNIT")
    private String unit;

    @Column(name = "FORMAT_NO")
    private String formatNo;

    @Column(name = "FORMAT_NAME")
    private String formatName;

    @Column(name = "REF_SOP_NO")
    private String sop_number; 

    @Column(name = "REVISION_NO")
    private String revisionNo;

    @Column(name = "DEPARTMENT")
    private String department;

    @OneToMany(mappedBy = "parentReport", cascade = CascadeType.ALL)
    private List<SharpToolIssueAndVerificationRegisterDetails> details;



}
