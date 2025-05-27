package com.focusr.Precot.mssql.database.model.Qc;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.common.util.StringHelper;
import org.springframework.format.annotation.DateTimeFormat;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QC_CLEANING_OF_AUTOCLAVESF023", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "EQ_ID_LAB7","EQ_ID_LAB3","DATE"}) } )
public class Qc_CleaningOfAutoclavesF023 extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private String revisionNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;
	
	@Column(name = "REF_SOP_NO")
	private String refSopNo;

	@Column(name = "EQ_ID_LAB7")
	private String eqIdLab7;
	
	@Column(name = "EQ_ID_LAB3")
	private String eqIdLab3;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "LAB7_SNO")
	private Long lab7Sno;
	
	@Column(name = "LAB7_CLEANEDBY")
	private String lab7CleanedBy;
	
	@Column(name = "LAB7_VERIFIEDBY")
	private String labe7VerifiedBY;
	
	@Column(name = "LAB3_SNO")
	private Long lab3Sno;
	
	@Column(name = "LAB3_CLEANEDBY")
	private String lab3CleanedBy;
	
	@Column(name = "LAB3_VERIFIEDBY")
	private String lab3VerifiedBy;
	
	@Column(name = "MONTH")
	private String month;
	
	@Column(name = "YEAR")
	private String year;

	@Column(name = "WEEK")
	private String week;
	
	@Column(name = "MICROBIOLOGIST_STATUS")
	private String microbiologist_status;

	@Column(name = "MICROBIOLOGIST_SAVED_ON")
	private Date microbiologist_saved_on;

	@Column(name = "MICROBIOLOGIST_SAVED_BY")
	private String microbiologist_saved_by;

	@Column(name = "MICROBIOLOGIST_SAVED_ID")
	private Long microbiologist_saved_id;

	@Column(name = "MICROBIOLOGIST_SUBMIT_ON")
	private Date microbiologist_submit_on;

	@Column(name = "MICROBIOLOGIST_SUBMIT_BY")
	private String microbiologist_submit_by;

	@Column(name = "MICROBIOLOGIST_SUBMIT_ID")
	private Long microbiologist_submit_id;

	@Column(name = "MICROBIOLOGIST_SIGN")
	private String microbiologist_sign;
	
	@Column(name = "MAIL_STATUS")
	private String mail_status;
}
