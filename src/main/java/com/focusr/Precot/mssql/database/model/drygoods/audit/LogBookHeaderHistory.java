package com.focusr.Precot.mssql.database.model.drygoods.audit;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.focusr.Precot.mssql.database.model.DryGoodsSuperHodSubmit;
import com.focusr.Precot.mssql.database.model.drygoods.LogBookHeader;
import com.focusr.Precot.mssql.database.model.drygoods.LogBookManPowerDetails;
import com.focusr.Precot.mssql.database.model.drygoods.LogBookPlanProdDetails;
import com.focusr.Precot.mssql.database.model.drygoods.LogBookWorkAllocation;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "DRYGOODS_LOGBOOK_DETAILS_HISTORY", schema = AppConstants.schema)
public class LogBookHeaderHistory extends DryGoodsSuperHodSubmit{
	@Id
	@Column(name = "HISTORY_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long history_id;

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

	@Column(name = "DATE")
	private String date;

	@Column(name = "SHIFT")
	private String shift;

	@Column(name = "OTHER_COMMUNICATION")
	private String other_communication;

	@Column(name = "JULAIN_DATE")
	private String julain_date;

	@Column(name = "NO_OF_SLIVER")
	private String no_of_sliver;

	@Column(name = "NO_OF_WOLL_ROLL")
	private String no_of_woll_roll;

	@Column(name = "PLANED_PROD_DETAILS")
	private String planed_prod_details;

	//

	@Column(name = "TC_A")
	private String tc_a;

	@Column(name = "TC_B")
	private String tc_b;

	@Column(name = "TC_TOTAL")
	private String tc_total;

	@Column(name = "TC_A_BRK")
	private String tc_a_brk;

	@Column(name = "TC_B_BRK")
	private String tc_b_brk;

	@Column(name = "TC_BRL_TOTAL")
	private String hours_06;

	@Column(name = "BALL_MC_ONE_A")
	private String ball_mc_one_a;

	@Column(name = "BALL_MC_ONE_B")
	private String ball_mc_one_b;

	@Column(name = "BALL_MC_ONE_C")
	private String ball_mc_one_c;

	@Column(name = "BALL_MC_ONE_TOTAL")
	private String ball_mc_one_total;

	@Column(name = "BALL_MC_TWO_A")
	private String ball_mc_two_a;

	@Column(name = "BALL_MC_TWO_B")
	private String ball_mc_two_b;

	@Column(name = "BALL_MC_TWO_C")
	private String ball_mc_two_c;

	@Column(name = "BALL_MC_TWO_TOTAL")
	private String ball_mc_two_total;

	@Column(name = "PO_NO_ONE")
	private String po_no_one;

	@Column(name = "PO_NO_TWO")
	private String po_no_two;

	@Column(name = "PO_NO_THREE")
	private String po_no_three;

	@Column(name = "PRODUCT_NAME_ONE")
	private String product_name_one;

	@Column(name = "PRODUCT_NAME_TWO")
	private String product_name_two;

	@Column(name = "PRODUCT_NAME_THREE")
	private String product_name_three;

	@Column(name = "NXT_PROD_SUP_DATE")
	private String nxt_prod_sup_date;

	@Column(name = "NXT_PROD_SUP_SIGN")
	private String nxt_prod_sup_sign;

	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "VERSION")
	private int version;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "allocation")
	private List<LogBookWorkAllocationHistory> workAllocationDetails;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "manpower")
	private List<LogBookManPowerDetailsHistory> manpowerDetails;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "planProdDetails")
	private List<LogBookPlanProdDetailsHistory> prodDetails;

}
