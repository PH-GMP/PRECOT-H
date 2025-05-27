package com.focusr.Precot.mssql.database.model.Qc;



import java.sql.Date;

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
import com.fasterxml.jackson.annotation.JsonProperty;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;
@Table(name = "MICROBIOLOGICAL_TEST ",schema=AppConstants.schema)
@Entity
@Data
public class microbiologicalTestF002 extends UserDateAudit{
	
	@Id
	@Column(name = "MICRO_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	 @JsonProperty("micro_id")
    private Long micro_id;

    @JsonProperty("test_id")
    @Column(name = "TEST_ID")
    private Long test_id;

    @JsonProperty("sampled_on")
    @Column(name = "SAMPLED_ON")
    private String sampled_on;

    @JsonProperty("tested")
    @Column(name = "TESTED")
    private String tested;

    @JsonProperty("tf_count")
    @Column(name = "TF_COUNT")
    private String tf_count;

    @JsonProperty("tf_viable_count")
    @Column(name = "TF_VIABLE_COUNT")
    private String tf_viable_count;

    @JsonProperty("p_field_a")
    @Column(name = "P_FIELD_A")
    private String p_field_a;

    @JsonProperty("p_field_b")
    @Column(name = "P_FIELD_B")
    private String p_field_b;

    @JsonProperty("p_field_c")
    @Column(name = "P_FIELD_C")
    private String p_field_c;

    @JsonProperty("p_field_d")
    @Column(name = "P_FIELD_D")
    private String p_field_d;

    @JsonProperty("p_field_e")
    @Column(name = "P_FIELD_E")
    private String p_field_e;

    @JsonProperty("moisture")
    @Column(name = "MOISTURE")
    private String moisture;

    @JsonProperty("sub_batch_no")
    @Column(name = "SUB_BATCH_NO")
    private String sub_batch_no;

    @JsonProperty("completion_date")
    @Column(name = "COMPLETION_DATE")
    private String completion_date;

    @JsonProperty("remarks")
    @Column(name = "REMARKS")
    private String remarks;

    @JsonProperty("product")
    @Column(name = "PRODUCT")
    private String product;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TEST_ID", insertable = false, updatable = false)
	@JsonIgnore
	private physicalandchemicaltest physicalandchemicaltest;

	
	
}
