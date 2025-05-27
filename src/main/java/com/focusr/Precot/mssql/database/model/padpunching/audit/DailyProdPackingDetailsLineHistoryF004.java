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
@Table(name = "PADPUNCHING_DAILY_PRODUCTION_PACKING_DETAILS_LINE_HISTORY_F004",schema=AppConstants.schema)
public class DailyProdPackingDetailsLineHistoryF004 {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
	private Long id;
	
	@Column(name = "JULIAN_CODE")
	private String julianCode ;
	
	@Column(name = "MACHINE_NAME")
	private String machineName;
	
	@Column(name = "PRODUCT_NAME")
	private String productName;
	
	@Column(name = "PO_NO")
	private String poNo;
	
	@Column(name = "BMR_NO")
	private String bmrNo ;
	
	@Column(name = "NO_OF_BAGS_CARTON")
	private String noOfBagsCarton;
	
	@Column(name = "NO_OF_CARTONS")
	private String noOfCartons;
	
	@Column(name = "NO_OF_BAGS")
	private String noOfBags;
	
	@Column(name = "HISTORY_ID")
	private Long historyId;

}
