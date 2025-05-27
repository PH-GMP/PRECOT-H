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
@Table(name = "CONTROL_OF_GHPWC_TYPES", schema = AppConstants.schema)
public class ControlOfGHpWcTypes extends UserDateAudit {

	@Id
	@Column(name = "TYPES_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long types_id;

	@Column(name = "ID")
	private Long id;

	@Column(name = "IDENTIFICATION_NO")
	private String identification_no;

	@Column(name = "IDENTIFICATION_DETAILS")
	private String identification_details;

	@Column(name = "REMARKS")
	private String remarks;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ID", insertable = false, updatable = false)
	@JsonIgnore
	private ControlOfGHpWc details;

}
