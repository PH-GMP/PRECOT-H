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
@Table(name = "QA_PACKING_MATERIALS_DETAILS_LINE_3", schema = AppConstants.schema)
public class PackingMaterialDetailsLine3 {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long lineId;
	
	@Column(name = "PM_CODE")
	private String pmCode;
	
	@Column(name = "NAME_OF_MATERIAL_PACK")
	private String nameOfMaterialPack;
	
	@Column(name = "SUPPLIER_PACK")
	private String supplierPack;
	
	@Column(name = "MANUFACTURER_PACK")
	private String manufacturerPack;
	
	@Column(name = "NO_OF_LOTS_PACK")
	private String noOfLotsPack;
	
	@Column(name = "REJECTED_PACK")
	private String rejectedPack;
	
	@Column(name = "APPROVED_PACK")
	private String approvedPack;
	
	@Column(name = "ID")
	private Long id;

}
