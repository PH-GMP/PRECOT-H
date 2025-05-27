package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.SampleInwardBookDetail;
import com.focusr.Precot.mssql.database.model.QcAudit.SampleInwardBookDetailHistory;

@Repository
public interface SampleInwardBookDetailRepositoryHistory extends JpaRepository<SampleInwardBookDetailHistory, Long> {
    
   
}
