package com.focusr.Precot.mssql.database.model.drygoods;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.mssql.database.model.SpulanceSaveSubmitOperator;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "DRYGOODS_DAILY_PRODUCTION_PLEATE_AND_WOOL_ROLL_F006", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = {"PRODUCT_NAME", "DATE", "SHIFT","ORDER_NO"})})
public class DailyProductionDetailsPleateAndWoolRollF006 extends SpulanceSaveSubmitOperator  {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PLEATE_ID")
	private Long pleate_id;

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

	@Column(name = "DATE")
	private String date;

	@Column(name = "SHIFT")
	private String shift;
	
	@Column(name = "PRODUCT_NAME")
	private String product_name;
	
	@Column(name = "ORDER_NO")
	private String order_no;
	
	@Column(name = "COUSTOMER_NAME")
	private String coustomer_name;
	
	@Column(name = "PERFORATE_TYPE")
	private String perforate_type;
	
	@Column(name = "NON_PERFORATE_TYPE")
	private String non_perforate_type;
	
	@Column(name = "BRAND")
	private String brand;
	
	@Column(name = "BAG_OR_BOX")
	private String bag_or_box;
	
	// PARAMETERS
	@Column(name = "GRAMS")
	private String grams;
	
	@Column(name = "WIDTH")
	private String width;
	
	@Column(name = "HEIGHT")
	private String height;
	
	//OUT PUT DETAILS
	//BAG
	@Column(name = "BAG_HOUR1")
	private String bag_hour1;
	
	@Column(name = "BAG_HOUR2")
	private String bag_hour2;
	
	@Column(name = "BAG_HOUR3")
	private String bag_hour3;
	
	@Column(name = "BAG_HOUR4")
	private String bag_hour4;
	
	@Column(name = "BAG_HOUR5")
	private String bag_hour5;
	
	@Column(name = "BAG_HOUR6")
	private String bag_hour6;
	
	@Column(name = "BAG_HOUR7")
	private String bag_hour7;
	
	@Column(name = "BAG_HOUR8")
	private String bag_hour8;
	
	@Column(name = "BAG_TOTAL_HOUR")
	private String bag_total_hour;
	
	
	//BOX
	@Column(name = "BOX_HOUR1")
	private String box_hour1;
	
	@Column(name = "BOX_HOUR2")
	private String box_hour2;
	
	@Column(name = "BOX_HOUR3")
	private String box_hour3;
	
	@Column(name = "BOX_HOUR4")
	private String box_hour4;
	
	@Column(name = "BOX_HOUR5")
	private String box_hour5;
	
	@Column(name = "BOX_HOUR6")
	private String box_hour6;
	
	@Column(name = "BOX_HOUR7")
	private String box_hour7;
	
	@Column(name = "BOX_HOUR8")
	private String box_hour8;
	
	@Column(name = "BOX_TOTAL_HOUR")
	private String box_total_hour;
	
	// WASTE IN KG
	@Column(name = "WASTE_KG")
	private String waste_kg;
	
	@Column(name = "REASON")
	private String reason;

}
