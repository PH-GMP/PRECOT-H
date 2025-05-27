package com.focusr.Precot.util.Qc;

import javax.persistence.Column;

import com.focusr.Precot.payload.padpunching.PadPunchingAuditRequest;

import lombok.Data;

@Data
public class ShelfLifePeriodLotPayload {

	@Column(name = "CUSTOMER")
	private String customer;

	@Column(name = "BRAND")
	private String brand;

	@Column(name = "PRODUCTION_DESCRIPTION")
	private String productDescription;
}
