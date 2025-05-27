package com.focusr.Precot.mssql.database.repository.drygoods.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.drygoods.audit.SliverReceiptDetailsHistoryF003;



@Repository
public interface SliverReceiptDetailsF003HistoryRepository extends JpaRepository<SliverReceiptDetailsHistoryF003, Long> {

}
