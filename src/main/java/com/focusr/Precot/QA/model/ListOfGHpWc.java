package com.focusr.Precot.QA.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "LIST_OF_GHPWC", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE","DEPARTMENT" }) })
public class ListOfGHpWc extends UserDateAudit {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "SOP_NO")
	private String sopNumber;

	@Column(name = "REVISION_NO")
	private String revisionNo;

	@Column(name = "DATE")
	private String date;

	@Column(name = "MONTH")
	private String month;

	@Column(name = "YEAR")
	private String year;

	@Column(name = "DEPARTMENT")
	private String department;

	@Column(name = "REJ_REASON")
	private String rej_reason;




	@Column(name = "TO_NO_GLASS")
	private String to_no_glass;

	@Column(name = "TO_NO_HP")
	private String to_no_hp;

	@Column(name = "TO_NO_WOOD")
	private String to_no_wood;

	@Column(name = "TO_NO_CERAMIC")
	private String to_no_ceramic;

	// INSP

	@Column(name = "QA_INSPECTOR_STATUS")
	private String qa_inspector_status;

	@Column(name = "QA_INSPECTOR_SAVED_ON")
	private Date qa_inspector_saved_on;

	@Column(name = "QA_INSPECTOR_SAVED_BY")
	private String qa_inspector_saved_by;

	@Column(name = "QA_INSPECTOR_SAVED_ID")
	private Long qa_inspector_saved_id;

	@Column(name = "QA_INSPECTOR_SUBMITTED_ON")
	private Date qa_inspector_submitted_on;

	@Column(name = "QA_INSPECTOR_SUBMITTED_BY")
	private String qa_inspector_submitted_by;

	@Column(name = "QA_INSPECTOR_SUBMITTED_ID")
	private Long qa_inspector_submitted_id;

	@Column(name = "QA_INSPECTOR_SIGN")
	private String qa_inspector_sign;

	// MANAGER STATUS

	@Column(name = "MANAGER_STATUS")
	private String manager_status;

	@Column(name = "MANAGER_SUBMITTED_ON")
	private Date manager_submitted_on;

	@Column(name = "MANAGER_SUBMITTED_BY")
	private String manager_submitted_by;

	@Column(name = "MANAGER_SUBMITTED_ID")
	private Long manager_submitted_id;

	@Column(name = "MANAGER_SIGN")
	private String manager_sign;

	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "details")
	private List<ListOfGHpWcTypes> typeslist;

}
