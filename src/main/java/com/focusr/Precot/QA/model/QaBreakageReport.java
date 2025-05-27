package com.focusr.Precot.QA.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_BREAKAGE_REPORT", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "department", "rep_seq_no" }) })
public class QaBreakageReport extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "FORMAT_NAME")
	private String format_name;

	@Column(name = "FORMAT_NO")
	private String format_no;

	@Column(name = "REVISION_NO")
	private String revision_no;

	@Column(name = "REF_SOP_NO")
	private String ref_sop_no;

	//

	@Column(name = "REP_SEQ_NO")
	private String rep_seq_no;

	@Column(name = "DATE")
	private String date;

	@Column(name = "TIME")
	private String time;

	@Column(name = "MONTH")
	private String month;

	@Column(name = "YEAR")
	private String year;

	@Column(name = "DEPARTMENT")
	private String department;

//

	@Column(name = "INC_REP_ON")
	private String inc_rep_on;

	@Column(name = "ITEM")
	private String item;

	@Column(name = "IDENTIFICATION")
	private String identification;

	@Column(name = "LOCATION")
	private String location;

	@Column(name = "REASON")
	private String reason;

	@Column(name = "SAME_PORTAL")
	private String same_portal;

	@Column(name = "ANY_METERIAL")
	private String any_meterial;

	@Column(name = "COMMUNICATE_TO")
	private String communicate_to;

	@Column(name = "REPORTED_BY")
	private String reported_by;

	@Column(name = "DEP_ACTN_ONE_STATUS")
	private String dep_actn_one_status;

	@Column(name = "DEP_ACTN_ONE_VERIFI_STATUS")
	private String dep_actn_one_verifi_status;

	@Column(name = "DEP_ACTN_TWO_STATUS")
	private String dep_actn_two_status;

	@Column(name = "DEP_ACTN_TWO_VERIFI_STATUS")
	private String dep_actn_two_verifi_status;

	@Column(name = "DEP_ACTN_THERR_STATUS")
	private String dep_actn_therr_status;

	@Column(name = "DEP_ACTN_THREE_VERIFI_STATUS")
	private String dep_actn_three_verifi_status;

	@Column(name = "DEP_ACTN_FOUR_STATUS")
	private String dep_actn_four_status;

	@Column(name = "DEP_ACTN_FOUR_VERIFI_STATUS")
	private String dep_actn_four_verifi_status;

	@Column(name = "DEP_ACTN_FIVE_STATUS")
	private String dep_actn_five_status;

	@Column(name = "DEP_ACTN_FIVE_VERIFI_STATUS")
	private String dep_actn_five_verifi_status;

	@Column(name = "DEP_ACTN_SIX_STATUS")
	private String dep_actn_six_status;

	@Column(name = "DEP_ACTN_SIX_VERIFI_STATUS")
	private String dep_actn_six_verifi_status;

	@Column(name = "COR_PREV_ACTN_ONE_NAME")
	private String cor_prev_actn_one_name;

	@Column(name = "COR_PREV_ACTN_ONE_DATE")
	private String cor_prev_actn_one_date;

	@Column(name = "COR_PREV_ACTN_ONE_VERIFI_STATUS")
	private String cor_prev_actn_one_verifi_status;

	@Column(name = "COR_PREV_ACTN_TWO_NAME")
	private String cor_prev_actn_two_name;

	@Column(name = "COR_PREV_ACTN_TWO_DATE")
	private String cor_prev_actn_two_date;

	@Column(name = "COR_PREV_ACTN_TWO_VERIFI_STATUS")
	private String cor_prev_actn_two_verifi_status;

	@Column(name = "COR_PREV_ACTN_THREE_NAME")
	private String cor_prev_actn_three_name;

	@Column(name = "COR_PREV_ACTN_THREE_DATE")
	private String cor_prev_actn_three_date;

	@Column(name = "COR_PREV_ACTN_TWO_THREE_STATUS")
	private String cor_prev_actn_two_three_status;

	@Column(name = "REMARKS")
	private String remarks;

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

	// HOD STATUS

	@Column(name = "HOD_STATUS")
	private String hod_status;

	@Column(name = "HOD_SUBMITTED_ON")
	private Date hod_submitted_on;

	@Column(name = "HOD_SUBMITTED_BY")
	private String hod_submitted_by;

	@Column(name = "HOD_SUBMITTED_ID")
	private Long hod_submitted_id;

	@Column(name = "HOD_SIGN")
	private String hod_sign;

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

	//

	@Column(name = "DEP_ACTN_ONE_VERIFI_DATE")
	private String dep_actn_one_verifi_date;

	@Column(name = "DEP_ACTN_TWO_VERIFI_DATE")
	private String dep_actn_two_verifi_date;

	@Column(name = "DEP_ACTN_THREE_VERIFI_DATE")
	private String dep_actn_three_verifi_date;

	@Column(name = "DEP_ACTN_FOUR_VERIFI_DATE")
	private String dep_actn_four_verifi_date;

	@Column(name = "DEP_ACTN_FIVE_VERIFI_DATE")
	private String dep_actn_five_verifi_date;

	@Column(name = "DEP_ACTN_SIX_VERIFI_DATE")
	private String dep_actn_six_verifi_date;

	@Column(name = "AREA")
	private String area;
	
	@Column(name = "INCIDENT_REASON")
	private String incident_reason;
 
	@Column(name = "TYPE_OF_MATERIAL")
	private String type_of_material;

}
