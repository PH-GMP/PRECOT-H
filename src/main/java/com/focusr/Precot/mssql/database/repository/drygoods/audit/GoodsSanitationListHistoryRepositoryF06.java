package com.focusr.Precot.mssql.database.repository.drygoods.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.drygoods.audit.GoodsSanitationListHistoryF06;


@Repository
public interface GoodsSanitationListHistoryRepositoryF06 extends JpaRepository<GoodsSanitationListHistoryF06, Long>{

}
