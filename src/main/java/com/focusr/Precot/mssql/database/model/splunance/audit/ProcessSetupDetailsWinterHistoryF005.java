package com.focusr.Precot.mssql.database.model.splunance.audit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.mssql.database.model.SpulanceApprovalOperator;
import com.focusr.Precot.mssql.database.model.SpulanceSaveSubmitOperator;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_PROCESS_SETUP_DETAILS_WINTER_HISTORY_F005", schema = AppConstants.schema)
public class ProcessSetupDetailsWinterHistoryF005 extends SpulanceSaveSubmitOperator {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "HIST_ID")
	private Long hist_id;

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

	@Column(name = "DATE")
	private String date;

	@Column(name = "SHIFT")
	private String shift;

	@Column(name = "ORDER_NO")
	private String order_no;

	@Column(name = "MIXING")
	private String mixing;

	@Column(name = "PRODUCT_NAME")
	private String product_name;

	@Column(name = "SDT_GSM")
	private String sdt_gsm;

	@Column(name = "WIDTH")
	private String width;

	@Column(name = "PATTERN")
	private String pattern;

	@Column(name = "MOISTURT")
	private String moisturt;

	@Column(name = "THICKNESS")
	private String thickness;

	@Column(name = "LINE_SPEED")
	private String line_speed;

	@Column(name = "ROLLER_SPEED")
	private String roller_speed;

	@Column(name = "LINE_DRAW")
	private String line_draw;

	@Column(name = "GROUP_SPEED")
	private String group_speed;

	@Column(name = "WIND_GRP_DRAW")
	private String wind_grp_draw;

	@Column(name = "WIND_ARMS_PRESSUER")
	private String wind_arms_pressuer;

	@Column(name = "SROLLS_WINDER_DRAW")
	private String srolls_winder_draw;

	@Column(name = "TENSION")
	private String tension;

	@Column(name = "TAPER_ON")
	private String taper_on;

	@Column(name = "TENS_PER_CUT")
	private String tens_per_cut;

	@Column(name = "TENS_POST_CUT")
	private String tens_post_cut;

	@Column(name = "LENGTH")
	private String length;

	//

	@Column(name = "REASON")
	private String reason;

	@Column(name = "VERSION")
	private Integer version;

	@Lob
	@Column(name = "HOD_SIGNATURE_IMAGE")
	private byte[] hod_signature_image;

	@Lob
	@Column(name = "OPERATOR_SIGNATURE_IMAGE")
	private byte[] operator_signature_image;

	@Lob
	@Column(name = "SUPERVISOR_SIGNATURE_IMAGE")
	private byte[] supervisor_signature_image;

}
