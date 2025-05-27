package com.focusr.Precot.mssql.database.model.Qc;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "COA_MOISTURE_F26G_LINES", schema = AppConstants.schema)
public class CoaMoistureF26GLines {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long lineId;

	@Column(name = "INITIAL_WEIGHT")
	private String initial_weight;

	@Column(name = "FINAL_WEIGHT")
	private String final_weight;

	@Column(name = "RESULT")
	private String result;

	@Column(name = "REMARKS")
	private String remarks;

	@Column(name = "ID")
	private Long id;

}
