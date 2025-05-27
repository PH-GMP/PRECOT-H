package com.focusr.Precot.mssql.database.repository.Qc.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.SwabMicrobiologicalDetailsHistory;

@Repository
public interface SwabMicrobiologicalDetailsRepoHistory extends JpaRepository<SwabMicrobiologicalDetailsHistory, Long> {
    
   
}
