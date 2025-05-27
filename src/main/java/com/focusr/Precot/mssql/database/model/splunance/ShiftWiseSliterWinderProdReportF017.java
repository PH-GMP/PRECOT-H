package com.focusr.Precot.mssql.database.model.splunance;

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

import com.focusr.Precot.mssql.database.model.SpulanceSaveSubmitOperator;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_SHIFT_WISE_SLITER_WINDER_PRODUCTION_REPORT_F017",schema=AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE","SHIFT","ORDER_NO" }) })
public class ShiftWiseSliterWinderProdReportF017 extends SpulanceSaveSubmitOperator {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REPORT_ID")
	private Long reportId;
	
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
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "SHIFT")
	private String shift;
	
	@Column(name = "ORDER_NO")
	private String orderNo;
	
	@Column(name = "MATERIAL_CODE")
	private String materialCode;
	
	@Column(name = "PRODUCT_NAME")
	private String productName;
	
	@Column(name = "STD_GSM")
	private String stdGsm;
	
	@Column(name = "PATTERN")
	private String pattern;
	
	@OneToMany(targetEntity = ShiftWiseSliterWinderProdDetailsF017.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "REPORT_ID", referencedColumnName = "REPORT_ID")
	private List<ShiftWiseSliterWinderProdDetailsF017> reportDetails;
	
	@OneToMany(targetEntity = SliterWinderListF017.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "REPORT_ID", referencedColumnName = "REPORT_ID")
	private List<SliterWinderListF017> sliterWinderDetails;

	@Column(name = "REASON")
	private String reason;
}
