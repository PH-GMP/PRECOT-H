package com.focusr.Precot.mssql.database.repository.bleaching.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachContaminationTypesHistoryF04;

@Repository
public interface BleachContaminationTypesF04RepositoryHistory extends JpaRepository<BleachContaminationTypesHistoryF04, Long>{

}
