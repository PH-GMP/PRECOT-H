package com.focusr.Precot.mssql.database.model.splunance;

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
@Table(name = "SPUNLACE_SLITER_WINDER_PRODUCTION_DETAILS_F017", schema = AppConstants.schema)
public class SliterWinderListF017 extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SW_ID")
	private Long swId;

	@Column(name = "SLITER_WINDER_ROLL_NO")
	private String swRollNo;

	@Column(name = "SLITER_WINDER_ROLL_LENGTH")
	private String swRollLength;

	@Column(name = "SLITER_WINDER_SINGLE_ROLL_WEIGHT")
	private String swSingleRollWeight;

	@Column(name = "SLITER_WINDER_NO_OF_ROLLS")
	private String splNoOfRolls;

	@Column(name = "SLITER_WINDER_TOTAL_WEIGHT")
	private String swTotalWeight;

	@Column(name = "SLITER_WINDER_SIDE_TRIM_WASTE")
	private String swSideTrimWaste;

	@Column(name = "REMARKS")
	private String remarks;

	@Column(name = "REPORT_ID")
	private Long reportId;
}
