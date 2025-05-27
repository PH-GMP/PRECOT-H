package com.focusr.Precot.QA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.InwardInspectionReportLine2;

@Repository
public interface InwardInspectionReportLine2Repository extends JpaRepository<InwardInspectionReportLine2, Long>{

}
