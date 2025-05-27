package com.focusr.Precot.QA.repository.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.InwardInspectionReportLine2History;

@Repository
public interface InwardInspectionReportLine2HistoryRepository extends JpaRepository<InwardInspectionReportLine2History, Long>{

}
