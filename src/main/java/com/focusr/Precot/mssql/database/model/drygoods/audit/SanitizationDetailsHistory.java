package com.focusr.Precot.mssql.database.model.drygoods.audit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.mssql.database.model.DryGoodsSuperHodSubmit;
import com.focusr.Precot.mssql.database.model.drygoods.SanitizationDetails;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;
@Data
@Entity
@Table(name = "DRYGOODS_MC_SANITIZATION_HISTORY", schema = AppConstants.schema)
public class SanitizationDetailsHistory extends DryGoodsSuperHodSubmit{
	@Id
	@Column(name = "MC_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long mc_id;

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "REVISION_NO")
	private String revisionNo;

	@Column(name = "SOP_NO")
	private String sopNumber;

	//
	@Column(name = "WEEK")
	private String week;

	@Column(name = "MONTH")
	private String month;

	@Column(name = "YEAR")
	private String year;

	@Column(name = "NAME_OF_CHEMICAL")
	private String name_of_chemical;

	@Column(name = "CHEMICAL_BATCH_NO")
	private String chemical_batch_no;

	@Column(name = "EXP_DATE")
	private String exp_date;
	//

	@Column(name = "BALLS_MC_NO_01")
	private String balls_mc_no_01;

	@Column(name = "BALLS_MC_NO_02")
	private String balls_mc_no_02;

	@Column(name = "SLIVER_MAKING_MC")
	private String sliver_making_mc;

	@Column(name = "ROLLS_MC")
	private String rolls_mc;

	@Column(name = "PLEAT_MC")
	private String pleat_mc;

	@Column(name = "ROLL_PLEAT_LINE")
	private String roll_pleat_line;

	//

	@Column(name = "SLIVER_OUTPUT_AREA")
	private String sliver_output_area;

	@Column(name = "SLIVER_CARRYING_DRUMS")
	private String sliver_carrying_drums;

	@Column(name = "SLIVER_FEEDING_MECHANISMS")
	private String sliver_feeding_mechanisms;

	@Column(name = "BALLS_OUTPUT_AREA")
	private String balls_output_area;

	@Column(name = "PACKING_TABLES_BALLS")
	private String packing_tables_balls;
//

	@Column(name = "CARDED_WEB_OUTPUT_AREA")
	private String carded_web_output_area;

	@Column(name = "CONVEYOR")
	private String conveyor;

	@Column(name = "ROLL_WINDER")
	private String roll_winder;

	@Column(name = "TROLLEYS")
	private String trolleys;

	@Column(name = "ROLL_PLEAT_MACHINE")
	private String roll_pleat_machine;

	@Column(name = "PACKING_TABLES")
	private String packing_tables;

	@Column(name = "REMARKS")
	private String remarks;

	@Column(name = "SANITIZED_BY")
	private String sanitized_by;
	
	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "VERSION")
	private int version;

}
