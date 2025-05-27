package com.focusr.Precot.mssql.database.model.PPC;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Entity
@Table(name = "PPC_PRE_PRODUCTION_DEPARTMENT_DETAIL_F004", schema = AppConstants.schema)
@Data
public class PreProductionMeetingDepartmentMember {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "REVIEW_DEPARTMENT_ID")
	private Long reviewDepartmentId;

	@Column(name = "DEPARTMENT")
	private String department;

	@Column(name = "PARTICIPATE_NAME")
	private String participate_name;

	@Lob
	@Column(name = "SIGNATURE")
	private byte[] Signature;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "PREPRODUCTION_MEETING_ID")
	@JsonBackReference
	private PreProductionMeetingF004 preProductionMeeting;

	public PreProductionMeetingDepartmentMember() {

	}
}
