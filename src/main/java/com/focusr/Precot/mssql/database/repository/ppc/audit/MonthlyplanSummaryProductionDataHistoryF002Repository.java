package com.focusr.Precot.mssql.database.repository.ppc.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.PPC.MonthlyplanSummaryF002;
import com.focusr.Precot.mssql.database.model.PPC.audit.MonthlyplanSummaryHistoryF_002;
import com.focusr.Precot.mssql.database.model.PPC.audit.MonthlyplanSummaryProductHistoryF_002;


public interface MonthlyplanSummaryProductionDataHistoryF002Repository  extends JpaRepository<MonthlyplanSummaryProductHistoryF_002, Long>{

	
}

