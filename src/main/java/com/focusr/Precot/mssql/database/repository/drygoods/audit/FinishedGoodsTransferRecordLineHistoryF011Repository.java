package com.focusr.Precot.mssql.database.repository.drygoods.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.drygoods.audit.FinishedGoodsTransferRecordLineHistoryF011;
@Repository
public interface FinishedGoodsTransferRecordLineHistoryF011Repository extends JpaRepository<FinishedGoodsTransferRecordLineHistoryF011, Long>{

}
