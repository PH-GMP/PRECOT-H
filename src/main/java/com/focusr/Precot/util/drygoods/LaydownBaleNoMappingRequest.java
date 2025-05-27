package com.focusr.Precot.util.drygoods;

import java.util.List;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class LaydownBaleNoMappingRequest {
	
	  @NotNull
	    private String laydownNo;

	    @NotEmpty
	    private List<String> baleNumbers;
	    
	    private String startDate;
	    
	    private String endDate;
	    
	    private String shift;
	    
}
