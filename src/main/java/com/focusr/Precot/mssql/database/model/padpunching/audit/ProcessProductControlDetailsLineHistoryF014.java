package com.focusr.Precot.mssql.database.model.padpunching.audit;

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
@Table(name = "PADPUNCHING_PROCESS_AND_PRODUCT_CONTROL_DETAILS_HISTORY_F014",schema=AppConstants.schema)
public class ProcessProductControlDetailsLineHistoryF014 {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LINE_ID")
	private Long lineId;
	
//	PROCESS CONTROL 
	@Column(name = "SIDE_SEAL_TEMP")
	private int sideSealTemp;
	
	@Column(name = "THREAD_SEAL_TEMP")
	private int threadSealTemp;
	
	@Column(name = "THREAD_SEAL_PRESSURE")
	private float threadSealPressure;
	
	@Column(name = "MAIN_AIR_PRESSURE")
	private int mainAirPressure;
	
	
//	PRODUCT CONTROL 
	
	@Column(name = "LENGTH_SPECIFICATION")
	private String lenSpecification;
	
	@Column(name = "LENGTH_1")
	private String length1;
	
	@Column(name = "LENGTH_2")
	private String length2;
	
	@Column(name = "LENGTH_3")
	private String length3;
	
	@Column(name = "LENGTH_4")
	private String length4;
	
	@Column(name = "LENGTH_5")
	private String length5;
	
	@Column(name = "LENGTH_6")
	private String length6;
	
	@Column(name = "LENGTH_7")
	private String length7;
	
	@Column(name = "LENGTH_8")
	private String length8;
	
	@Column(name = "WIDTH_SPECIFICATION")
	private String widthSpecification;
	
	@Column(name = "WIDTH_1")
	private String widht1;
	
	@Column(name = "WIDTH_2")
	private String widht2;
	
	@Column(name = "WIDTH_3")
	private String widht3;
	
	@Column(name = "WIDTH_4")
	private String widht4;
	
	@Column(name = "WIDTH_5")
	private String widht5;
	
	@Column(name = "WIDTH_6")
	private String widht6;
	
	@Column(name = "WIDTH_7")
	private String widht7;
	
	@Column(name = "WIDTH_8")
	private String widht8;
	
	@Column(name = "BOTTOM_GUSSET_SPECIFICATION")
	private String bottomGussetSpecification;
	
	@Column(name = "BOTTOM_GUSSET_1")
	private String bottomGusset1;
	
	@Column(name = "BOTTOM_GUSSET_2")
	private String bottomGusset2;
	
	@Column(name = "BOTTOM_GUSSET_3")
	private String bottomGusset3;
	
	@Column(name = "BOTTOM_GUSSET_4")
	private String bottomGusset4;
	
	@Column(name = "BOTTOM_GUSSET_5")
	private String bottomGusset5;
	
	@Column(name = "BOTTOM_GUSSET_6")
	private String bottomGusset6;
	
	@Column(name = "BOTTOM_GUSSET_7")
	private String bottomGusset7;
	
	@Column(name = "BOTTOM_GUSSET_8")
	private String bottomGusset8;
	
	@Column(name = "TOP_GUSSET_SPECIFICATION")
	private String topGussetSpecification;
	
	@Column(name = "TOP_GUSSET_1")
	private String topGusset1;
	
	@Column(name = "TOP_GUSSET_2")
	private String topGusset2;
	
	@Column(name = "TOP_GUSSET_3")
	private String topGusset3;
	
	@Column(name = "TOP_GUSSET_4")
	private String topGusset4;
	
	@Column(name = "TOP_GUSSET_5")
	private String topGusset5;
	
	@Column(name = "TOP_GUSSET_6")
	private String topGusset6;
	
	@Column(name = "TOP_GUSSET_7")
	private String topGusset7;
	
	@Column(name = "TOP_GUSSET_8")
	private String topGusset8;
	
	@Column(name = "FILM_THICKNESS_SPECIFICATION")
	private String filmThicknessSpecification;
	
	@Column(name = "FILM_THICKNESS_1")
	private String filmThickness1;
	
	@Column(name = "FILM_THICKNESS_2")
	private String filmThickness2;
	
	@Column(name = "FILM_THICKNESS_3")
	private String filmThickness3;
	
	@Column(name = "FILM_THICKNESS_4")
	private String filmThickness4;
	
	@Column(name = "FILM_THICKNESS_5")
	private String filmThickness5;
	
	@Column(name = "FILM_THICKNESS_6")
	private String filmThickness6;
	
	@Column(name = "FILM_THICKNESS_7")
	private String filmThickness7;
	
	@Column(name = "FILM_THICKNESS_8")
	private String filmThickness8;
	
	@Column(name = "EMPTY_BAG_WEIGHT_SPECIFICATION")
	private String emptyBagWtSpecification;

	@Column(name = "EMPTY_BAG_WEIGHT_1")
	private String emptyBagWt1;
	
	@Column(name = "EMPTY_BAG_WEIGHT_2")
	private String emptyBagWt2;
	
	@Column(name = "EMPTY_BAG_WEIGHT_3")
	private String emptyBagWt3;
	
	@Column(name = "EMPTY_BAG_WEIGHT_4")
	private String emptyBagWt4;
	
	@Column(name = "EMPTY_BAG_WEIGHT_5")
	private String emptyBagWt5;
	
	@Column(name = "EMPTY_BAG_WEIGHT_6")
	private String emptyBagWt6;
	
	@Column(name = "EMPTY_BAG_WEIGHT_7")
	private String emptyBagWt7;
	
	@Column(name = "EMPTY_BAG_WEIGHT_8")
	private String emptyBagWt8;
	
	@Column(name = "ID")
	private Long id;
}
