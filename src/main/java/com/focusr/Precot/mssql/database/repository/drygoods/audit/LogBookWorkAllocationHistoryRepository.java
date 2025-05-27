package com.focusr.Precot.mssql.database.repository.drygoods.audit;

import org.springframework.data.jpa.repository.JpaRepository;

import com.focusr.Precot.mssql.database.model.drygoods.audit.LogBookWorkAllocationHistory;

public interface LogBookWorkAllocationHistoryRepository extends JpaRepository<LogBookWorkAllocationHistory, Long>{

}
