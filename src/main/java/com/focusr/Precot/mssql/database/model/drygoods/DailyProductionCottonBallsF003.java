package com.focusr.Precot.mssql.database.model.drygoods;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.mssql.database.model.SpulanceSaveSubmitOperator;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "DRYGOODS_DAILY_PRODUCTION_COTTONBALLS_F003", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = {"MACHINE_NAME", "DATE", "SHIFT","ORDER_NO"})})
public class DailyProductionCottonBallsF003 extends SpulanceSaveSubmitOperator{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "COTTONBALLS_ID")
	private Long cottonballs_id;

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
	
	@Column(name = "MACHINE_NAME")
	private String machine_name;
	
	@Column(name = "PRODUCT_NAME")
	private String product_name;
	
	@Column(name = "ORDER_NO")
	private String order_no;
	
	@Column(name = "COUSTOMER_NAME")
	private String coustomer_name;
	
	@Column(name = "BALL_OR_BAG")
	private String ball_or_bag;
	
	@Column(name = "SALE_ORDER_NO")
	private String sale_order_no;
	
	@Column(name = "BRAND")
	private String brand;
	
	@Column(name = "BAG_OR_BOX")
	private String bag_or_box;
	
	// MACHINE PARAMETERS
	@Column(name = "CUTTING_LENGTH")
	private String cutting_length;
	
	@Column(name = "FEED_ROLLER")
	private String feed_roller;
	
	@Column(name = "CUTTING_ROLLER")
	private String cutting_roller;
	
	@Column(name = "SLIVER_WEIGHT_GRAMS")
	private String sliver_weight_grams;
	
	@Column(name = "BALL_WEIGHT_GRAMS")
	private String ball_weight_grams;
	
	@Column(name = "BAG_COUNTS")
	private String bag_counts;
	
	@Column(name = "STD_BAGS_PER_HR")
	private String std_bags_per_hr;
	
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
	@Column(name = "SLIVER_WEIGHT_KG")
	private String sliver_weight_kg;
	
	@Column(name = "BALL_WEIGHT_KG")
	private String ball_weight_kg;
	
	@Column(name = "REASON")
	private String reason;
	
	 @OneToMany(mappedBy = "dailyproductioncottonballs", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	    private List<SliverReceiptDetailsF003> sliverreceiptdetails;


}
