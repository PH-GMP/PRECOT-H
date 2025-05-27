package com.focusr.Precot.mssql.database.repository.Qc.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.observationsF006history;

@Repository
public interface observationF006HistoryRepo extends JpaRepository<observationsF006history, Long> {

}
