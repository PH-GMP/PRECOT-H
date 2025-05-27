package com.focusr.Precot.Buds.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.model.audit.BudsDailyProductionSliverLineHistory;

@Repository
public interface BudsDailyProductionSliveLineRepositoryHistory extends JpaRepository<BudsDailyProductionSliverLineHistory, Long>{

}
