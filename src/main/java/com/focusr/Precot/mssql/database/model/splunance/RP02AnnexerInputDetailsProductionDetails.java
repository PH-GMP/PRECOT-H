package com.focusr.Precot.mssql.database.model.splunance;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "RPB_02_INPUT_DETAILS", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "ORDER_NO", "FORM_NO" }) })
public class RP02AnnexerInputDetailsProductionDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "INPUT_ID")
	private Long input_id;

	@Column(name = "ORDER_NO")
	private String order_no;

	@Column(name = "BATCH_NO")
	private String batch_no;
	
	@Column(name = "FORM_NO")
	private String form_no;

	@Column(name = "REJECTED_ROLLS")
	private String rejected_rolls;

	@Column(name = "EDGE_TRIM_WASTE")
	private String edge_trim_waste;

	@Column(name = "SKLETEN_WASTE")
	private String skleten_waste;
	
	@Column(name = "STATUS")
	private String status;

}
