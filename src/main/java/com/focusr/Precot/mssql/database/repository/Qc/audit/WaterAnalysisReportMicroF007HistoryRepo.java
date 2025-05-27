package com.focusr.Precot.mssql.database.repository.Qc.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.WaterAnalysisReportMicroF007History;

@Repository
public interface WaterAnalysisReportMicroF007HistoryRepo
		extends JpaRepository<WaterAnalysisReportMicroF007History, Long> {

}
