package com.focusr.Precot.QA.model;

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
@Table(name = "QA_RAW_MATERIALS_DETAILS_LINE_2", schema = AppConstants.schema)
public class RawMaterialsDetailsLine2 {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long lineId;
	
	@Column(name = "RM_CODE")
	private String rmCode;
	
	@Column(name = "NAME_OF_MATERIAL_RAW")
	private String nameOfMaterialRaw;
	
	@Column(name = "SUPPLIER_RAW")
	private String supplierRaw;
	
	@Column(name = "MANUFACTURER_RAW")
	private String manufacturerRaw;
	
	@Column(name = "NO_OF_LOTS_RAW")
	private String noOfLotsRaw;
	
	@Column(name = "REJECTED_RAW")
	private String rejectedRaw;
	
	@Column(name = "APPROVED_RAW")
	private String approvedRaw;
	
	@Column(name = "ID")
	private Long id;

}
