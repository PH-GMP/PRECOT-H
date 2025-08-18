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

@Table(name = "ANALYSISREQUEST_F005", schema = AppConstants.schema)
@Entity
@Data
public class analysisRequest_F005 extends UserDateAudit{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
    @Column(name = "TEST_ID")
    private Long test_id;
    @Column(name = "S_NO")
    private Long s_no;

    @Column(name = "ANALYSIS_REQUEST_NUMBER")
    private String analysis_request_number;

    @Column(name = "BMR_NO")
    private String bmr_no;

    @Column(name = "DATE_SHIFT")
    private String date_shift;

    @Column(name = "PRODUCT_NAME")
    private String product_name;

    @Column(name = "SHAFT_NO")
    private String shaft_no;

    @Column(name = "JETLACE_PARAMETERS_PRESSURE")
    private String jetlace_parameters_pressure;
    
    @Column(name = "JETLACE_PARAMETERS_TEXT")
    private String jetlace_parameters_text;

    @Column(name = "MIXING")
    private String mixing;

    @Column(name = "GSM")
    private String gsm;

    @Column(name = "PATTERN")
    private String pattern;

    @Column(name = "MOISTURE_MAHLO")
    private String moisture_mahlo;
    
    @Column(name = "MOISTURE_PHOBE")
    private String moisture_phobe;

    @Column(name = "THICKNESS")
    private String thickness;

    @Column(name = "STRENGTH_CROSS_DIRECTION")
    private String strength_cross_direction;

    @Column(name = "STRENGTH_MACHINE_DIRECTION")
    private String strength_machine_direction;

    @Column(name = "FRICTION")
    private String friction;
    
    @Column(name = "APPEARANCE")
    private String appearance;
    
//    @ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "TEST_ID", insertable = false, updatable = false)
//	@JsonIgnore
//	private non_woven_F005 non_woven_F005;
}
