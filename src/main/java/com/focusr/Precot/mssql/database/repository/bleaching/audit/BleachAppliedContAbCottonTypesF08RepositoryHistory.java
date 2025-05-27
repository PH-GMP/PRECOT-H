package com.focusr.Precot.mssql.database.repository.bleaching.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachAppliedContAbCottonTypesHistoryF08;

@Repository
public interface BleachAppliedContAbCottonTypesF08RepositoryHistory extends JpaRepository<BleachAppliedContAbCottonTypesHistoryF08, Long>{

}
