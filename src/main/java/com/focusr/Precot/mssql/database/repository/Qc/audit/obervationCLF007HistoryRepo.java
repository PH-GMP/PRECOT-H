package com.focusr.Precot.mssql.database.repository.Qc.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.obervationCLF007;
import com.focusr.Precot.mssql.database.model.QcAudit.obervationHistoryCLF007;

@Repository
public interface obervationCLF007HistoryRepo extends JpaRepository<obervationHistoryCLF007, Long>{

}
