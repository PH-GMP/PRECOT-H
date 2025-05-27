package com.focusr.Precot.mssql.database.repository.padpunching.bmr;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrManufacturingStepsLine;

@Repository
public interface PunchingBmrManufacturingStepsLineRepository extends JpaRepository<PunchingBmrManufacturingStepsLine, Long>{

}
