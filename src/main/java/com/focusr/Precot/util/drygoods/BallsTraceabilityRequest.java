package com.focusr.Precot.util.drygoods;

import java.util.List;

import com.focusr.Precot.QA.model.FinalInspectionReportF037;
import com.focusr.Precot.QA.model.QaOnlineInspectionReport;
import com.focusr.Precot.mssql.database.model.bleaching.BmrSummary;
import com.focusr.Precot.mssql.database.model.drygoods.BMR001GoodsProductionDetails;
import com.focusr.Precot.mssql.database.model.drygoods.BMR03GoodsPackingMeterialIssue;

import lombok.Data;

@Data
public class BallsTraceabilityRequest {

	private BMR001GoodsProductionDetails productionDetails;

	private List<BMR03GoodsPackingMeterialIssue> packingMaterial;

	private List<SliverLineDetails> sliverLineDetails;

	private List<QaOnlineInspectionReport> onlineInspection;

	private List<FinalInspectionReportF037> finalInspection;

	private List<GoodsAbCons> goodsAbcons;
	
	private List<List<BmrSummary>> bmrSummary ;

	public static class SliverLineDetails {

		private String canNo;
		private String cardingMcNo;
		private String netWt;
		private String prod_date;
		private String gpm;
		private String orderNo;
		private String laydownNo;

		public String getCanNo() {
			return canNo;
		}

		public void setCanNo(String canNo) {
			this.canNo = canNo;
		}

		public String getCardingMcNo() {
			return cardingMcNo;
		}

		public void setCardingMcNo(String cardingMcNo) {
			this.cardingMcNo = cardingMcNo;
		}

		public String getNetWt() {
			return netWt;
		}

		public void setNetWt(String netWt) {
			this.netWt = netWt;
		}

		public String getOrderNo() {
			return orderNo;
		}

		public void setOrderNo(String orderNo) {
			this.orderNo = orderNo;
		}

		public String getLaydownNo() {
			return laydownNo;
		}

		public void setLaydownNo(String laydownNo) {
			this.laydownNo = laydownNo;
		}

		public String getGpm() {
			return gpm;
		}

		public void setGpm(String gpm) {
			this.gpm = gpm;
		}

		public String getProd_date() {
			return prod_date;
		}

		public void setProd_date(String prod_date) {
			this.prod_date = prod_date;
		}

	}
	
}
