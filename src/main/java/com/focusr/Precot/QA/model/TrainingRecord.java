package com.focusr.Precot.QA.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.dom4j.util.UserDataAttribute;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "TRAINING_RECORD", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE", "DEPARTMENT" }) })

public class TrainingRecord extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TRAINING_ID")
	private Long training_id;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private Long revisionNo;

	@Column(name = "REF_SOP_NO")
	private String refSopNo;

	@Column(name = "UNIT")
	private String unit;

	// FORM FIELDS

	@Column(name = "DATE")
	private String date;

	@Column(name = "MONTH")
	private String month;

	@Column(name = "YEAR")
	private String year;

	@Column(name = "DEPARTMENT")
	private String department;

	@Column(name = "MODE_OF_TRAINING")
	private String mode_of_training;

	@Column(name = "TOPIC")
	private String topic;

	@Column(name = "TRAINING_SESSION_NO")
	private String training_session_no;

	@Column(name = "CONTENT")
	private String content;

	@Column(name = "VENUE")
	private String venue;

	@Column(name = "START_TIME")
	private String start_time;

	@Column(name = "END_TIME")
	private String end_time;

	@Column(name = "NAME_OF_TRAINER")
	private String name_of_trainer;

	@Column(name = "REFERENCE_DOCUMENT")
	private String reference_document;

	@Column(name = "TRAINER_SIGNATURE_AND_DATE")
	private String trainer_signature_and_date;

	@Column(name = "REASON")
	private String reason;

	// INITIATOR

	@Column(name = "HOD_STATUS")
	private String hod_status;

	@Column(name = "HOD_SAVED_ON")
	private Date hod_saved_on;

	@Column(name = "HOD_SAVED_BY")
	private String hod_saved_by;

	@Column(name = "HOD_SAVED_ID")
	private Long hod_saved_id;

	@Column(name = "HOD_SUBMITTED_ON")
	private Date hod_submitted_on;

	@Column(name = "HOD_SUBMITTED_BY")
	private String hod_submitted_by;

	@Column(name = "HOD_SUBMITTED_ID")
	private Long hod_submitted_id;

	@Column(name = "HOD_SIGN")
	private String hod_sign;

	@OneToMany(targetEntity = TrainingRecordLines.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "TRAINING_ID", referencedColumnName = "TRAINING_ID ")
	private List<TrainingRecordLines> details;

}
