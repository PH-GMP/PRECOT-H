package com.focusr.Precot.mssql.database.repository.Qc.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.MicrobiologicalTestARF001History;

@Repository
public interface MicrobiologicalTestARF001RepoHistory extends JpaRepository<MicrobiologicalTestARF001History, Long> {


}
