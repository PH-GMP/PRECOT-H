package com.focusr.Precot.QA.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.QA.model.audit.MetalDetectorCalibrationRecordHistory;
import com.focusr.Precot.QA.model.audit.MetalDetectorCalibrationRecordLinesHistory;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_TRAINING_NEED_IDENTIFICATION_RECORD_LINES", schema = AppConstants.schema)
public class TrainingNeedIdentificationFormLines {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long line_id;

    @Column(name = "EMPLOYEE_NAME", nullable = false)
    private String employeeName;

    @Column(name = "EMPLOYEE_ID", nullable = false, unique = true)
    private String employeeId;

    @Column(name = "CATEGORY")
    private String category;

    @Column(name = "ISO_9001_AWARENESS")
    private String iso9001Awareness;

    @Column(name = "ISO_14001_AWARENESS")
    private String iso14001Awareness;

    @Column(name = "BRCGS_AWARENESS")
    private String brcgsAwareness;

    @Column(name = "SA8000_AWARENESS")
    private String sa8000Awareness;

    @Column(name = "GOTS_AWARENESS")
    private String gotsAwareness;

    @Column(name = "BSCI_AWARENESS")
    private String bsciAwareness;

    @Column(name = "ETI_AWARENESS")
    private String etiAwareness;

    @Column(name = "INTERNAL_AUDITORS_TRAINING")
    private String internalAuditorsTraining;

    @Column(name = "GOOD_HOUSEKEEPING_5S_SYSTEM")
    private String goodHousekeeping5SSystem;

    @Column(name = "CHEMICAL_HANDLING_SPILLAGE_SYSTEM")
    private String chemicalHandlingSpillageSystem;

    @Column(name = "WASTE_MANAGEMENT_SYSTEM")
    private String wasteManagementSystem;

    @Column(name = "ENVIRONMENT")
    private String environment;

    @Column(name = "HACCP")
    private String haccp;

    @Column(name = "GMP")
    private String gmp;

    @Column(name = "ROOT_CAUSE_ANALYSIS_CAPA")
    private String rootCauseAnalysisCapa;

    @Column(name = "FIRST_AID")
    private String firstAid;

    @Column(name = "FIRE_SAFETY_FIGHTING")
    private String fireSafetyFighting;

    @Column(name = "MACHINE_OPERATION_SAFETY")
    private String machineOperationSafety;

    @Column(name = "USAGE_PPE")
    private String usagePpe;

    @Column(name = "COMPANIES_POLICIES")
    private String companiesPolicies;

    @Column(name = "QUALITY_PRODUCTIVITY_WASTE_CONTROL")
    private String qualityProductivityWasteControl;

    @Column(name = "ATTITUDE_BEHAVIOR")
    private String attitudeBehavior;
}
