package com.focusr.Precot.QA.repository.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.AnnualPlanLinesHistory;

@Repository
public interface AnnualPlanLinesHistoryRepository extends JpaRepository<AnnualPlanLinesHistory, Long>{

}
