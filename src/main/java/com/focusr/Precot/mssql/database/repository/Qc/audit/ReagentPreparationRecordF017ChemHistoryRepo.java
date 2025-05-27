package com.focusr.Precot.mssql.database.repository.Qc.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.QcReagentPreparationRecordF017ChemTableHistory;

@Repository
public interface ReagentPreparationRecordF017ChemHistoryRepo extends JpaRepository<QcReagentPreparationRecordF017ChemTableHistory, Long>{

}
