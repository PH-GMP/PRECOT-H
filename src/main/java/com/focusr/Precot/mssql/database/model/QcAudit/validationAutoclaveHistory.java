package com.focusr.Precot.mssql.database.model.QcAudit;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Entity
@Table(name = "VALIDATION_FOR_AUTOCLAVE_CLF014_HISTORY", schema = AppConstants.schema)
@Data
public class validationAutoclaveHistory extends UserDateAudit{
	
    @Id
	@Column(name = "TEST_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long test_id;

    @Column(name = "FORMAT")
    private String format;

    @Column(name = "FORMAT_NO")
    private String format_no;

    @Column(name = "REF_SOP_NO")
    private String ref_sop_no;

    @Column(name = "UNIT")
    private String unit;

    @Column(name = "MICRO_STATUS")
    private String micro_status;

    @Column(name = "MICRO_SAVED_ON")
    private Date micro_saved_on;

    @Column(name = "MICRO_SAVED_BY")
    private String micro_saved_by;

    @Column(name = "MICRO_SAVED_ID")
    private Long micro_saved_id;

    @Column(name = "MICRO_SUBMIT_ON")
    private Date micro_submit_on;

    @Column(name = "MICRO_SUBMIT_BY")
    private String micro_submit_by;

    @Column(name = "MICRO_SUBMIT_ID")
    private Long micro_submit_id;

    @Column(name = "MICRO_SIGN")
    private String micro_sign;

    @Column(name = "QC_STATUS")
    private String qc_status;

    @Column(name = "QC_SUBMIT_ON")
    private Date qc_submit_on;

    @Column(name = "QC_SUBMIT_BY")
    private String qc_submit_by;

    @Column(name = "QC_SUBMIT_ID")
    private Long qc_submit_id;

    @Column(name = "QC_SIGN")
    private String qc_sign;

    @Column(name = "REMARKS")
    private String remarks;

    @Column(name = "DATE")
    private String date;

    @Column(name = "LOAD_NO")
    private String load_no;


    @Column(name = "YEAR")
    private String year;

    @Column(name = "MONTH")
    private String month;

    @Column(name = "REASON")
    private String reason;

    @Column(name = "EXPIRY_DATE")
    private String expiry_date;

    @Column(name = "AMPLOE_STERILIZATION_A")
    private String amploe_sterilization_a;

    @Column(name = "AMPLOE_STERILIZATION_B")
    private String amploe_sterilization_b;

    @Column(name = "AMPLOE_STERILIZATION_C")
    private String amploe_sterilization_c;

    @Column(name = "AMPLOE_STERILIZATION_D")
    private String amploe_sterilization_d;

    @Column(name = "AMPLOE_STERILIZATION_OBS")
    private String amploe_sterilization_obs;

    @Column(name = "AMPLOE_STERILIZATION_RESULT")
    private String amploe_sterilization_result;

    @Column(name = "AMPLOE_DISCRAD_A")
    private String amploe_discrad_a;

    @Column(name = "AMPLOE_DISCRAD_B")
    private String amploe_discrad_b;

    @Column(name = "AMPLOE_DISCRAD_C")
    private String amploe_discrad_c;

    @Column(name = "AMPLOE_DISCRAD_D")
    private String amploe_discrad_d;

    @Column(name = "AMPLOE_DISCRAD_OBS")
    private String amploe_discrad_obs;

    @Column(name = "AMPLOE_DISCRAD_RESULT")
    private String amploe_discrad_result;

    @Column(name = "RESULT")
    private String result;

    @Column(name = "EQ_ID")
    private String eq_id;

    @Column(name = "LOT_NO")
    private String lot_no;
    
    private int version;
	
	
	
	

}
