package com.focusr.Precot.QA.repository.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.SummaryLine1;
import com.focusr.Precot.QA.model.audit.SummaryLine1History;

@Repository
public interface SummaryLine1HistoryRepository extends JpaRepository<SummaryLine1History, Long>{

}
