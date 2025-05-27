package com.focusr.Precot.QA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.InwardInspectionReportLine1;

@Repository
public interface InwardInspectionReportLine1Repository extends JpaRepository<InwardInspectionReportLine1, Long>{

}
