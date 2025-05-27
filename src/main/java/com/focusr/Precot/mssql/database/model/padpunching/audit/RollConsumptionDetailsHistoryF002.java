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
@Table(name = "PADPUNCHING_ROLL_CONSUMPTION_DETAILS_HISTORY_F002", schema = AppConstants.schema)
public class RollConsumptionDetailsHistoryF002 {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "DATE")
	private String date;

	@Column(name = "TIME")
	private String time;

	@Column(name = "BMR_NO")
	private String bmrNo;

	@Column(name = "ROLL_NO")
	private String rollNo;

	@Column(name = "SHAFT_NO")
	private String shaftNo;
	
	@Column(name = "NET_WT")
	private String netWt;
	
	@Column(name = "BALANCE_WT")
	private String balanceWt;
	
	@Column(name = "HISTORY_ID")
	private Long historyId;

}
