package com.focusr.Precot.mssql.database.repository.Qc.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.QAqcObservationsHistory;

@Repository
public interface qcObservationsrepohistory extends JpaRepository<QAqcObservationsHistory, Long> {

}
