package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.PhysicalAndChemcalTestARF001History;
import com.focusr.Precot.mssql.database.model.QcAudit.physicalchemalLabCLF001History;

@Repository
public interface PhysicalAndChemcalTestARF001RepoHistory extends JpaRepository<PhysicalAndChemcalTestARF001History, Long> {


}
