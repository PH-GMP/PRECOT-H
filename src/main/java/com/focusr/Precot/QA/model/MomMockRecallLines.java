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
@Table(name = "MOM_MOC_RECALL_TBL_LINES", schema = AppConstants.schema)
public class MomMockRecallLines {

	@Id
	@Column(name = "LIN_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long lin_id;

	@Column(name = "MOM_ID")
	private Long mom_id;

	@Column(name = "DETAILS_DISCUSSION")
	private String details_discussion;

	@Column(name = "ACTN_TAKEN")
	private String actn_taken;

	@Column(name = "RESPONSIBILITY")
	private String responsibility;

	@Column(name = "TARGET_DATE")
	private String target_date;

	@Column(name = "STATUS")
	private String status;

//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "MOM_ID", referencedColumnName = "MOM_ID", insertable = false, updatable = false)
//	@JsonIgnore
//	private MomMockRecall momLines;

}
