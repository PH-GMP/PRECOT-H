package com.focusr.Precot.payload;

import java.util.List;

import lombok.Data;

@Data
public class UpdateBMRResponse {

	private String bmrNo;
    private List<String> batchNos;
    private String endDate;
    
}
