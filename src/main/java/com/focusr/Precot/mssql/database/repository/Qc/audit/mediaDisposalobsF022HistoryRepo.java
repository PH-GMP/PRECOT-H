package com.focusr.Precot.mssql.database.repository.Qc.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.mediaDisposalobsF022;
import com.focusr.Precot.mssql.database.model.QcAudit.mediaDisposalobsHistoryF022;

@Repository
public interface mediaDisposalobsF022HistoryRepo extends JpaRepository<mediaDisposalobsHistoryF022, Long>{

}
