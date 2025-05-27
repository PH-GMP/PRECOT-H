package com.focusr.Precot.mssql.database.model.drygoods;

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

import com.focusr.Precot.mssql.database.model.DryGoodsOperatorHodOperator;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "DRYGOODS_SLIVER_MAKING", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "MACHINE_NAME", "DATE", "SHIFT","ORDER_NO" }) })
public class SliverMakingHeader extends DryGoodsOperatorHodOperator {

	@Id
	@Column(name = "SLIVER_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long sliver_id;

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "SOP_NO")
	private String sopNumber;

	@Column(name = "REVISION_NO")
	private String revisionNo;

	//

	@Column(name = "STD_WT")
	private String std_wt;

	@Column(name = "MACHINE_NAME")
	private String machine_name;

	@Column(name = "DATE")
	private String date;

	@Column(name = "SHIFT")
	private String shift;

	@Column(name = "LAYDOWN_NO")
	private String laydown_no;

	@Column(name = "ORDER_NO")
	private String order_no;

	@Column(name = "MIXING")
	private String mixing;

	//

	@Column(name = "GMP")
	private String gmp;

	@Column(name = "DRAFT")
	private String draft;

	@Column(name = "DOFFER_SPEED")
	private String doffer_speed;

	@Column(name = "SLIVER_LENGTH")
	private String sliver_length;

	//

	@Column(name = "HOURS_01")
	private String hours_01;

	@Column(name = "HOURS_02")
	private String hours_02;

	@Column(name = "HOURS_03")
	private String hours_03;

	@Column(name = "HOURS_04")
	private String hours_04;

	@Column(name = "HOURS_05")
	private String hours_05;

	@Column(name = "HOURS_06")
	private String hours_06;

	@Column(name = "HOURS_07")
	private String hours_07;

	@Column(name = "HOURS_08")
	private String hours_08;

	@Column(name = "TOTAL_SUM")
	private String total_sum;

	@Column(name = "COMPACTOR_WT")
	private String compactor_wt;

	@Column(name = "SLIVER_WT")
	private String sliver_wt;

	@Column(name = "REASON")
	private String reason;

	@Column(name = "OPERATOR_SIGN")
	private String operator_sign;

	@Column(name = "HOD_SIGN")
	private String hod_sign;

	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "sliverDetails")
	private List<SliverMakingLines> details;

}
