package com.focusr.Precot.payload;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BleachingWasteBaleResponseNew {

	String getbale_no();
	String getwaste_code();
	String getnet_weight();
	String getgross_weight();
	String getdate();
	
	
}
