package com.focusr.Precot.mssql.database.repository.Qc.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.MicrobilogyTestF006History;

@Repository
public interface microbiologyF006HistoryRepo extends JpaRepository<MicrobilogyTestF006History, Long>{

}
