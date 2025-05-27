package com.focusr.Precot.QA.model;

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
@Table(name = "LIST_OF_GHPWC_TYPES", schema = AppConstants.schema)
public class ListOfGHpWcTypes extends UserDateAudit {

	@Id
	@Column(name = "TYPES_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long types_id;

	@Column(name = "ID")
	private Long id;

	@Column(name = "TYPES")
	private String types;

	// Add extra Fields

	@Column(name = "IDENTIFICATION_NO")
	private String identification_no;

	@Column(name = "LOCATION")
	private String location;

	@Column(name = "PROTECTION_SAFERT_FLIM")
	private String protection_safert_flim;

	@Column(name = "RISK_SEVERITY")
	private String risk_severity;

	@Column(name = "FREQUENCY_OF_CHECK")
	private String frequency_of_check;

	@Column(name = "REMARKS")
	private String remarks;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ID", insertable = false, updatable = false)
	@JsonIgnore
	private ListOfGHpWc details;

}
