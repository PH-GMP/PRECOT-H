package com.focusr.Precot.mssql.database.repository.drygoods.audit;

import org.springframework.data.jpa.repository.JpaRepository;

import com.focusr.Precot.mssql.database.model.drygoods.SliverMakingLines;
import com.focusr.Precot.mssql.database.model.drygoods.audit.SliverMakingLinesHistory;

public interface SliverMakingLinesHisoryRepository  extends JpaRepository<SliverMakingLinesHistory, Long>{

}
