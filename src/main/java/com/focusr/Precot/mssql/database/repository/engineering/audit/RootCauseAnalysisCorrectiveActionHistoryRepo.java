package com.focusr.Precot.mssql.database.repository.engineering.audit;

import org.springframework.data.jpa.repository.JpaRepository;

import com.focusr.Precot.mssql.database.model.engineering.RootCauseAnalysisCorrectiveAction;
import com.focusr.Precot.mssql.database.model.engineering.audit.RootCauseAnalysisCorrectiveActionHistory;
import com.focusr.Precot.mssql.database.model.engineering.audit.WeightScalesCalibrationHistoryF016;

public interface RootCauseAnalysisCorrectiveActionHistoryRepo extends JpaRepository<RootCauseAnalysisCorrectiveActionHistory, Long> {

}
