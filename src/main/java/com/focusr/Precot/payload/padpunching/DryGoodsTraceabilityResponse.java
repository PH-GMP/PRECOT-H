package com.focusr.Precot.payload.padpunching;

import java.util.List;
import java.util.Map;
import java.util.Set;

import com.focusr.Precot.payload.spulance.SplBaleTraceResponse;

import lombok.Data;

@Data
public class DryGoodsTraceabilityResponse {

	private List<Map<String, Object>> details;
	
	private List<String> packingMaterial;
	
	private Set<SplBaleTraceResponse> bleachConsumption;
	
	private List<Map<String, Object>> sliverList;
	
}
