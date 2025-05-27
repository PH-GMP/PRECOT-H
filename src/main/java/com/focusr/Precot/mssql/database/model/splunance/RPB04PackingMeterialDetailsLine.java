package com.focusr.Precot.mssql.database.model.splunance;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_RPB_04_PACKING_METERIAL_DETAILS_LINE", schema = AppConstants.schema)
public class RPB04PackingMeterialDetailsLine {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "PACKING_ID")
	private Long packing_id;

	@Column(name = "NAME_OF_PCK_METERIAL")
	private String name_of_pck_meterial;

	@Column(name = "BATCH_NO")
	private String batch_no;

	@Column(name = "QUANTITY")
	private String quantity;

	@Column(name = "UNIT")
	private String unit;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "PACKING_ID", insertable = false, updatable = false)
	@JsonIgnore
	private RPB04PackingMeterialDetails packingDetails;

}
