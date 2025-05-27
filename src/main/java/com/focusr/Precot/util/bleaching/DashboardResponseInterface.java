package com.focusr.Precot.util.bleaching;

public interface DashboardResponseInterface {

	String getformatName();
	
	Long getsupervisiorSubmitted();
	
	Long gethodApproved();
	
	Long gethodRejected();
	
	Long getqaApproved();
	
	Long getqaRejected();
	
	Long gethrApproved();
	
	Long gethrRejected();
	
}
