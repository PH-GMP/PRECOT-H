package com.focusr.Precot.mssql.database.repository.Qc.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.observationArF011History;

@Repository
public interface observationArF011HistoryRepo extends JpaRepository<observationArF011History, Long>{

}
