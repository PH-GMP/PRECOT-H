package com.focusr.Precot.QA.repository.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.SummaryParametersLine1;
import com.focusr.Precot.QA.model.audit.SummaryParametersLine1History;

@Repository
public interface SummaryParametersLine1HistoryRepository extends JpaRepository<SummaryParametersLine1History, Long>{

}
