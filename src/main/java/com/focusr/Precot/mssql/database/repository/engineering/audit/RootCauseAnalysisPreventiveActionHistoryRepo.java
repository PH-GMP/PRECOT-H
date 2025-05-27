package com.focusr.Precot.mssql.database.repository.engineering.audit;

import org.springframework.data.jpa.repository.JpaRepository;

import com.focusr.Precot.mssql.database.model.engineering.audit.RootCauseAnalysisPreventiveActionHistory;

public interface RootCauseAnalysisPreventiveActionHistoryRepo extends JpaRepository<RootCauseAnalysisPreventiveActionHistory, Long>{

}
