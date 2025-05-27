package com.focusr.Precot.mssql.database.model.splunance;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_BMR_13_RP_14_QA_RELEASE_LINE", schema = AppConstants.schema)
public class BMR13RP14QaReleaseLine {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "RLS_ID")
	private Long rls_id;

	@Column(name = "DATE")
	private String date;

	@Column(name = "TIME")
	private String time;

	@Column(name = "NAME")
	private String name;

	@Column(name = "SIGN")
	private String sign;

	@Column(name = "STATUS_1")
	private String status_1;

	@Column(name = "STATUS_2")
	private String status_2;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "RLS_ID", insertable = false, updatable = false)
	@JsonIgnore
	private BMR13RP14QaRelease bmrdetails;

}
