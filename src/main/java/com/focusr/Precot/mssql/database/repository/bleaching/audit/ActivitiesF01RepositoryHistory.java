package com.focusr.Precot.mssql.database.repository.bleaching.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachSMSActivitiesHistoryF01;

@Repository
public interface ActivitiesF01RepositoryHistory extends JpaRepository<BleachSMSActivitiesHistoryF01, Long>{

}
