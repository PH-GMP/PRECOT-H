package com.focusr.Precot.mssql.database.service.engineering;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.engineering.audit.WeightScalesCalibrationDetailHistory;


@Repository
public interface WeightScalesCalibrationDetailHistoryRepo extends JpaRepository<WeightScalesCalibrationDetailHistory, Long>{

}
