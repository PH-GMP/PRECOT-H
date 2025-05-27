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
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "MOM_MOC_RECALL_HEADER", schema = AppConstants.schema)
public class MomMocKRecallHeader {

	@Id
	@Column(name = "HED_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long hed_id;

	@Column(name = "MOM_ID")
	private Long mom_id;

	@Column(name = "SO_NO")
	private String so_no;

	@Column(name = "NAME")
	private String name;

	@Column(name = "DEPARTMENT")
	private String department;

	@Column(name = "SIGN")
	private String sign;

//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "MOM_ID", referencedColumnName = "MOM_ID", insertable = false, updatable = false)
//	@JsonIgnore
//	private MomMockRecall momHeader;

}
