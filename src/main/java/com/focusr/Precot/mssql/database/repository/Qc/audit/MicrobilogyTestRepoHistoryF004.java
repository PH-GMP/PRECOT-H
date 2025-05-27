package com.focusr.Precot.mssql.database.repository.Qc.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.MicrobilogyTestF004History;

@Repository
public interface MicrobilogyTestRepoHistoryF004 extends JpaRepository<MicrobilogyTestF004History, Long> {

}
