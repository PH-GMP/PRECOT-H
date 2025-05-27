package com.focusr.Precot.QA.repository.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.QaContainerInspectionReportLines;
import com.focusr.Precot.QA.model.audit.QaContainerInspectionReportLinesHistory;

@Repository
public interface QaContainerInspectionReportLinesHisotryRepository extends JpaRepository<QaContainerInspectionReportLinesHistory, Long>{

}
