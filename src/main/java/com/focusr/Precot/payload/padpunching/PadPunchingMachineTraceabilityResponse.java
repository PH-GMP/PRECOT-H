package com.focusr.Precot.payload.padpunching;

import java.util.List;
import java.util.Map;
import java.util.Set;

import com.focusr.Precot.payload.spulance.SplBaleTraceResponse;
import com.focusr.Precot.payload.spulance.SplTraceResponse;

import lombok.Data;

@Data
public class PadPunchingMachineTraceabilityResponse {

	private List<PadPunchingMachineTraceResponse> machineList;
	
	private List<Map<String, Object>> details;
	
	private List<PadPunchingMachineTraceResponse> rollConsumption;
	
	private Set<SplBaleTraceResponse> bleachConsumption;
	
	private Set<SplBaleTraceResponse> spulanceConsumption;
	
	private List<String> packingMaterial;
}
