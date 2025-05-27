package com.focusr.Precot.mssql.database.model.QcAudit;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "STANDARIZATION_OF_CHEMICAL_REPORT_F016_HISTORY", schema = AppConstants.schema)

public class StandarizationOfChemicalReportF016History extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "HIS_ID")
	private Long his_id;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private String revisionNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "REF_SOP_NO")
	private String refSopNo;

	@Column(name = "DATE")
	private String date;

	@Column(name = "SHIFT")
	private String shift;

	// STANDARDIZED SOLUTION

	@Column(name = "NAME_OF_SOLUTION")
	private String name_of_solution;

//	@Column(name = "WEIGHT_OF_CHEMICAL")
//	private String weight_of_chemical;
	
	@Column(name = "STANDARDIZED_LOT_NUMBER")
	private String standardized_lot_number;

	@Column(name = "VOLUME_OF_SOLUTION")
	private String volume_of_solution;

	@Column(name = "NORMALITY")
	private String normality;

	// TO BE STANDARDIZED SOLUTION

	@Column(name = "TO_BE_NAME_OF_SOLUTION")
	private String to_be_name_of_solution;

	@Column(name = "TO_BE_WEIGHT_OF_CHEMICAL")
	private String to_be_weight_of_chemical;

	@Column(name = "TO_BE_VOLUME_OF_SOLUTION")
	private String to_be_volume_of_solution;

//	@Column(name = "VOLUME_OF_SAMPLE_SOLUTION ")
//	private String volume_of_sample_solution;

	@Column(name = "TRAIL_01")
	private String trail_01;

	@Column(name = "TRAIL_02")
	private String trail_02;

	@Column(name = "TRAIL_03")
	private String trail_03;

	@Column(name = "AVERAGE")
	private String average;

	@Column(name = "NORMAL_OF_REQ_SOLUTION")
	private String normal_of_req_solution;

	@Column(name = "LOT_NO")
	private String lot_no;

	@Column(name = "EXPIRY_DATE")
	private String expiry_date;

	@Column(name = "REASON")
	private String reason;

	// CHEMIST

	@Column(name = "CHEMIST_STATUS")
	private String chemist_status;

	@Column(name = "CHEMIST_SAVED_ON")
	private Date chemist_saved_on;

	@Column(name = "CHEMIST_SAVED_BY")
	private String chemist_saved_by;

	@Column(name = "CHEMIST_SAVED_ID")
	private Long chemist_saved_id;

	@Column(name = "CHEMIST_SUBMIT_ON")
	private Date chemist_submit_on;

	@Column(name = "CHEMIST_SUBMIT_BY")
	private String chemist_submit_by;

	@Column(name = "CHEMIST_SUBMIT_ID")
	private Long chemist_submit_id;

	@Column(name = "CHEMIST_SIGN")
	private String chemist_sign;

	// QC

	@Column(name = "MANAGER_STATUS")
	private String manager_status;

	@Column(name = "MANAGER_SUBMIT_ON")
	private Date manager_submit_on;

	@Column(name = "MANAGER_SUBMIT_BY")
	private String manager_submit_by;

	@Column(name = "MANAGER_SUBMIT_ID")
	private Long manager_submit_id;

	@Column(name = "MANAGER_SIGN")
	private String manager_sign;

	// VERSION

	@Column(name = "VERSION")
	private int version;

}
