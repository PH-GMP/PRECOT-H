package com.focusr.Precot.mssql.database.repository.Qc.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.observationArF013History;

@Repository
public interface observationArF013HistoryRepo extends JpaRepository<observationArF013History, Long> {

}
