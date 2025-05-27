package com.focusr.Precot.payload.spulance;

import lombok.Data;

@Data
public class SpunlaceAuditRequest {

	private String department;
	private String from_name;
	private String from_date;
	private String to_date;

	// 01
	private String f01_shift;
	private String f01_order_no;

	// 02

	private String f02_shift;
	private String f02_order_no;

	// 03

	private String f03_shift;
	private String f03_order_no;

	// 04
	private String f04_shift;

	// 05

	private String f05_shift;
	private String f05_order_no;

	// F06

	private String f06_shift;
	private String f06_order_no;

//	//F07
	private String f07_shift;
	private String f07_order_no;

	// F08(date only)

	// F09

	private String f09_shift;
	private String f09_order_no;

	// f10(date only)
	// kaviya
	// 11
	private String f011_shift;
	private String f011_order_no;

	// 12
	private String f012_shift;
	private String f012_order_no;

	// 13
	private String f013_shift;
	private String f013_order_no;

	// 14
	private String f014_shift;
	private String f014_order_no;

	// 15
	private String f015_shift;
	private String f015_order_no;

	// 16
	private String f016_shift;
	private String f016_order_no;

	// 17
	private String f017_shift;
	private String f017_order_no;

	// Gayathri
	// F023
	private String f023_month;
	private String f023_year;

	// F025
	private String f025_shift;

	// F020
	private String f020_month;
	private String f020_year;

	// F024
	private String f024_month;
	private String f024_year;
	private String f024_week;

	// F019
	private String f019_shift;
}
