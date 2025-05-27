package com.focusr.Precot.mssql.database.model.drygoods.audit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.mssql.database.model.OperatorHodApproval;
import com.focusr.Precot.mssql.database.model.drygoods.BaleConsumptionReportDryGoodsF001;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "DRYGOODS_BALE_CONSUMPTION_REPORT_F001_HISTORY",schema=AppConstants.schema)
public class BaleConsumptionReportDryGoodsHistoryF001 extends OperatorHodApproval{
	    @Id
		@Column(name = "BALE_REPORT_ID")
		private Long bale_report_id;
		
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
		
		@Column(name = "MIXING")
		private String mixing;
		
		@Column(name = "LAYDOWN_NO")
		private String laydown_no;
		
		@Column(name = "AB_COTTON_IN_KG")
		private String ab_cotton_in_kg;
		
		@Column(name = "REASON")
		private String reason;
		
		@Column(name = "VERSION")
		private int version;
}
