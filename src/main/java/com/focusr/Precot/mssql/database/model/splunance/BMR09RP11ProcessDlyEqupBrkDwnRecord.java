package com.focusr.Precot.mssql.database.model.splunance;

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

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_BMR_09_RP_11_EQUP_BREAK_DOWN_RECORD", schema = AppConstants.schema)
public class BMR09RP11ProcessDlyEqupBrkDwnRecord {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "ORDER_NO")
	private String order_no;

	@Column(name = "FORM_NO")
	private String form_no;

	// NEW
	@Column(name = "STATUS")
	private String status;

	@Column(name = "SUPERVISOR_ID")
	private Long supervisor_id;

	@Column(name = "BATCH_NO")
	private String batchNo;

	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "bmrstoppagedetails")
	private List<BMR09RP11ProcessDlyEqupBrkDwnRecordLine> spunlacrdetails;

}
