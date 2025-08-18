package com.focusr.Precot.mssql.database.repository.Qc.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.NonWovenF005LinesHistory;

@Repository
public interface NonWovenF005LinesHistoryRepo extends JpaRepository<NonWovenF005LinesHistory, Long> {

}
