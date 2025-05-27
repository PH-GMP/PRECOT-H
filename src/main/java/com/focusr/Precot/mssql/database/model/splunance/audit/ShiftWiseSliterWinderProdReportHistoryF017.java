package com.focusr.Precot.mssql.database.model.splunance.audit;

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

import com.focusr.Precot.mssql.database.model.SpulanceSaveSubmitOperator;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_SHIFT_WISE_SLITER_WINDER_PRODUCTION_REPORT_HISTORY_F017",schema=AppConstants.schema)
public class ShiftWiseSliterWinderProdReportHistoryF017 extends SpulanceSaveSubmitOperator{

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
	
	@OneToMany(targetEntity = ShiftWiseSliterWinderProdDetailsHistoryF017.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "REPORT_ID", referencedColumnName = "REPORT_ID")
	private List<ShiftWiseSliterWinderProdDetailsHistoryF017> reportDetails;
	
	@OneToMany(targetEntity = SliterWinderListHistoryF017.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "REPORT_ID", referencedColumnName = "REPORT_ID")
	private List<SliterWinderListHistoryF017> sliterWinderDetails;

	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "VERSION")
	private int version;
}
