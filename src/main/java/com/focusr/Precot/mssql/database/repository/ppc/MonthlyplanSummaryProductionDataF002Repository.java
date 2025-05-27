package com.focusr.Precot.mssql.database.repository.ppc;
import com.focusr.Precot.mssql.database.model.PPC.MonthlyplanSummary_ProductionData_F_002;
import com.focusr.Precot.mssql.database.model.PPC.PreProductionMeetingF004;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MonthlyplanSummaryProductionDataF002Repository extends JpaRepository<MonthlyplanSummary_ProductionData_F_002, Long> {
	
	
}