package com.focusr.Precot.mssql.database.repository.Qc.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.WaterAnalysisReportChemistF007History;


@Repository
public interface WaterAnalysisReportChemistF007HistoryRepo
		extends JpaRepository<WaterAnalysisReportChemistF007History, Long> {
	
	
	

}
