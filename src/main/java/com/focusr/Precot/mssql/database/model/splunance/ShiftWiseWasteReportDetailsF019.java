package com.focusr.Precot.mssql.database.model.splunance;

import java.util.List;

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
@Table(name = "SPUNLACE_SHIFT_WISE_COTTON_WASTE_REPORT_DETAILS_F019", schema = AppConstants.schema)
public class ShiftWiseWasteReportDetailsF019 extends UserDateAudit{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DETAIL_ID")
	private Long detailId;
	
	@Column(name = "COMPACTOR_WASTE_NO_OF_BAGS")
	private Long compactorWasteNoOfBags;
	
	@Column(name = "COMPACTOR_WASTE_NET_WEIGHT")
	private Double compactorWasteNWt;
	
	@Column(name = "SWWS_WASTE_NO_OF_BAGS")
	private Long swwsWasteNoOfBags;
	
	@Column(name = "SWWS_WASTE_NET_WEIGHT")
	private Double swwsWasteNWt;
	
	@Column(name = "SWWS_WASTE_TOTAL_WEIGHT")
	private Double swwsWasteTotalWt;
	
	@Column(name = "EXFOLATING_WASTE_NO_OF_BAGS")
	private Long exfolatingWasteNoOfBags;
	
	@Column(name = "EXFOLATING_WASTE_NET_WEIGHT")
	private Double exfolatingWasteNWt;
	
	@Column(name = "MICRO_WASTE_NO_OF_BAGS")
	private Long microWasteNoOfBags;
	
	@Column(name = "MICRO_WASTE_TOTAL_WEIGHT")
	private Double microWasteTotalWt;
	
	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "REPORT_ID")
	private Long reportId;

}
