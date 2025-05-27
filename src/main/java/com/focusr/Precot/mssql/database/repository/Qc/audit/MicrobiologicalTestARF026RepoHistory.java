package com.focusr.Precot.mssql.database.repository.Qc.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.MicrobiologicalTestF026History;

@Repository
public interface MicrobiologicalTestARF026RepoHistory extends JpaRepository<MicrobiologicalTestF026History, Long> {


}
