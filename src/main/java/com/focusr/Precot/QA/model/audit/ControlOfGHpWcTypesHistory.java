package com.focusr.Precot.QA.model.audit;

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
@Table(name = "CONTROL_OF_GHPWC_TYPES_HISTORY", schema = AppConstants.schema)
public class ControlOfGHpWcTypesHistory extends UserDateAudit {

	@Id
	@Column(name = "HIST_TYPES_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long hist_types_id;

	@Column(name = "HIST_ID")
	private Long hist_id;

	@Column(name = "IDENTIFICATION_NO")
	private String identification_no;

	@Column(name = "IDENTIFICATION_DETAILS")
	private String identification_details;

	@Column(name = "REMARKS")
	private String remarks;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "HIST_ID", insertable = false, updatable = false)
	@JsonIgnore
	private ControlOfGHpWcHistory details;

}
