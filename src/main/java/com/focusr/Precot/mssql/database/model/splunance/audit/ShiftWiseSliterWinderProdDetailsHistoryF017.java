package com.focusr.Precot.mssql.database.model.splunance.audit;

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
@Table(name = "SPUNLACE_SHIFT_WISE_SLITER_WINDER_PRODUCTION_DETAILS_HISTORY_F017",schema=AppConstants.schema)
public class ShiftWiseSliterWinderProdDetailsHistoryF017 {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DETAIL_ID")
	private Long detailId;
	
	//SPUNLACE
	
	@Column(name = "SPL_SHAFT_NO")
	private String splShaftNo;
	
	@Column(name = "SPL_ROLL_NO")
	private String splRollNo;
	
	@Column(name = "SPL_ROLL_WEIGHT")
	private String splRollWeight;
	
	@Column(name = "SPL_ROLL_WIDTH")
	private String splRollWidth;
	
	@Column(name = "SPL_ROLL_LENGTH")
	private String splRollLength;
	
	@Column(name = "REPORT_ID")
	private Long reportId;

}
