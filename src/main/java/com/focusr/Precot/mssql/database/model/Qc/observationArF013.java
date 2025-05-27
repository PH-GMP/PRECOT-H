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

@Table(name = "OBSERVATION_ARF013", schema = AppConstants.schema)
@Entity
@Data
public class observationArF013 extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "TEST_ON")
	private String test_on;
	
	@Column(name = "AR_NO")
	private String ar_no;
	
	@Column(name = "PH_LEVEL")
	private String ph_level;
	
	@Column(name = "HARDNESS")
	private String hardness;

	@Column(name = "TURBIDITY")
	private String turbidity;

	@Column(name = "TOTAL_DISSOLVED")
	private String TOTAL_DISSOLVED;

	@Column(name = "INTERPRETATION")
	private String interpretation;

	@Column(name = "TEST_COMPLETION")
	private String test_completion;

	@Column(name = "TEST_ID")
	private long test_id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TEST_ID", insertable = false, updatable = false)
	@JsonIgnore
	private potableWaterARF013Report potableWaterARF013Report;

}
