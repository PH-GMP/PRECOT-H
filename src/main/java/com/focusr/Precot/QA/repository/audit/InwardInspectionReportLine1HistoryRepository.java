package com.focusr.Precot.QA.repository.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.InwardInspectionReportLine1History;

@Repository
public interface InwardInspectionReportLine1HistoryRepository extends JpaRepository<InwardInspectionReportLine1History, Long>{

}
