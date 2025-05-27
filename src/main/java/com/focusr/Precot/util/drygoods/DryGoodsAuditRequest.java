package com.focusr.Precot.util.drygoods;

import com.focusr.Precot.payload.spulance.SpunlaceAuditRequest;

import lombok.Data;

@Data
public class DryGoodsAuditRequest {
	private String department;
	private String form_name;
	private String from_date;
	private String to_date;

	//F001
	private String f01_shift;
	private String f01_laydown_no;
	
	//F001
	private String f02_shift;
	private String f02_machine_name;
	
	//F003
		private String f03_shift;
		private String f03_machine_name;
		
		//F005
		private String f05_shift;
		//F006
		private String f06_shift;
		private String f06_machine_name;
		
//		F009
		
		
		private String f09_orderNo1;
		private String f09_machineName;
		
		//F010

	 private String f10_shift;

		//F011
		private String f11_shift;
		
		//F012
	  private String f12_year;
	  private String f12_month;
	  private String f12_week;
//		F013

		private String f13_shift;
		
//		F014
		
		private String F014_date;
}
